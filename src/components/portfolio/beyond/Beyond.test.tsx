import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderHome } from "@/test/render-home";
import { restoreDevice, stubCapableDevice } from "@/test/devices";
import { hobbies, reading, thoughts } from "@/content/beyond";

const beyond = () => within(screen.getByRole("region", { name: /beyond the code/i }));

describe("Beyond the Code", () => {
  afterEach(restoreDevice);

  it("shares the quiet side in pieces: hobbies, thoughts, fun facts and a Sunday in Pune", () => {
    renderHome();
    for (const h of hobbies) expect(beyond().getByText(h.label)).toBeInTheDocument();
    for (const t of thoughts) expect(beyond().getByText(t.title)).toBeInTheDocument();
    expect(beyond().getByRole("heading", { name: /what i love/i })).toBeInTheDocument();
    expect(beyond().getByRole("heading", { name: /a sunday in pune/i })).toBeInTheDocument();
  });

  it("opens the book to a new Dostoevsky quote on each click, stamped in Pune", async () => {
    const user = userEvent.setup();
    renderHome();
    const book = beyond().getByRole("button", { name: /crime and punishment/i });
    await user.click(book);
    const quote = beyond().getByRole("blockquote");
    const first = quote.textContent;
    expect(reading.quotes.some((q) => first?.includes(q))).toBe(true);
    expect(beyond().getByText(/read in pune, maharashtra/i)).toBeInTheDocument();
    await user.click(book);
    expect(beyond().getByRole("blockquote").textContent).not.toBe(first);
  });

  it("spins the vinyl and starts the song in a visible Spotify player", async () => {
    const user = userEvent.setup();
    const play = vi.fn();
    const createController = vi.fn((_el: Element, _opts: unknown, cb: (c: { play: () => void }) => void) => cb({ play }));
    vi.spyOn(document.head, "appendChild").mockImplementation((node) => {
      // The Spotify iFrame API script "loads" and announces itself.
      queueMicrotask(() => (window as unknown as { onSpotifyIframeApiReady: (api: unknown) => void }).onSpotifyIframeApiReady({ createController }));
      return node;
    });
    renderHome();
    await user.click(beyond().getByRole("button", { name: /take my true love by the hand/i }));
    await vi.waitFor(() => expect(play).toHaveBeenCalled());
    expect(createController.mock.calls[0][1]).toMatchObject({ uri: "spotify:track:7C6DRuY8wXG0XhwGPy5PpE" });
    expect(beyond().getByRole("region", { name: /now playing/i })).toBeVisible();
  });

  it("keeps the Currently Shelf out of the Letterbox", () => {
    renderHome();
    const letterbox = document.getElementById("letterbox");
    expect(letterbox).not.toBeNull();
    expect(letterbox!.textContent).not.toMatch(/crime and punishment|limeliters/i);
  });

  it("offers a Skip link past the pinned pieces in 3D", () => {
    stubCapableDevice();
    renderHome();
    expect(beyond().getByRole("link", { name: /skip/i })).toHaveAttribute("href", "#letterbox");
  });
});
