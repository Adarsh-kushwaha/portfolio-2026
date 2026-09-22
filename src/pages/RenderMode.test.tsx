import { renderHome } from "@/test/render-home";

/** Makes the environment capable of 3D, then lets each test knock out one trigger. */
function stubCapableDevice() {
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
    ((type: string) => (type === "webgl2" || type === "webgl" ? ({} as RenderingContext) : null)) as never,
  );
  vi.spyOn(navigator, "hardwareConcurrency", "get").mockReturnValue(8);
  Object.defineProperty(navigator, "connection", { value: { saveData: false, effectiveType: "4g" }, configurable: true });
}

const renderMode = () => document.querySelector("[data-render-mode]")?.getAttribute("data-render-mode");

describe("render mode", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    Reflect.deleteProperty(navigator, "connection");
  });

  it("uses 3D on a capable device", () => {
    stubCapableDevice();
    renderHome();
    expect(renderMode()).toBe("3d");
  });

  it("falls back to 2D without WebGL", () => {
    renderHome();
    expect(renderMode()).toBe("2d");
  });

  it("falls back to 2D when the visitor prefers reduced motion", () => {
    stubCapableDevice();
    vi.spyOn(window, "matchMedia").mockImplementation(
      (q: string) => ({ matches: q.includes("reduce"), media: q, addEventListener() {}, removeEventListener() {} }) as never,
    );
    renderHome();
    expect(renderMode()).toBe("2d");
  });

  it("falls back to 2D with Save-Data on", () => {
    stubCapableDevice();
    Object.defineProperty(navigator, "connection", { value: { saveData: true, effectiveType: "4g" }, configurable: true });
    renderHome();
    expect(renderMode()).toBe("2d");
  });

  it("falls back to 2D on a slow connection", () => {
    stubCapableDevice();
    Object.defineProperty(navigator, "connection", { value: { saveData: false, effectiveType: "3g" }, configurable: true });
    renderHome();
    expect(renderMode()).toBe("2d");
  });

  it("falls back to 2D on a device with few CPU cores", () => {
    stubCapableDevice();
    vi.spyOn(navigator, "hardwareConcurrency", "get").mockReturnValue(2);
    renderHome();
    expect(renderMode()).toBe("2d");
  });
});
