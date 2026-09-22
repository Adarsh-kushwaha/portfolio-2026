/** Makes jsdom look like a device that gets the 3D experience. Pair with vi.restoreAllMocks(). */
export function stubCapableDevice() {
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
    ((type: string) => (type === "webgl2" || type === "webgl" ? ({} as RenderingContext) : null)) as never,
  );
  vi.spyOn(navigator, "hardwareConcurrency", "get").mockReturnValue(8);
  Object.defineProperty(navigator, "connection", { value: { saveData: false, effectiveType: "4g" }, configurable: true });
}

export function restoreDevice() {
  vi.restoreAllMocks();
  Reflect.deleteProperty(navigator, "connection");
}
