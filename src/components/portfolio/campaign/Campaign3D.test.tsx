import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderHome } from "@/test/render-home";
import { restoreDevice, stubCapableDevice, stubDesktop } from "@/test/devices";
import { towers } from "@/content/campaign";

const campaign = () => within(screen.getByRole("region", { name: /campaign/i }));

describe("Campaign in 3D on desktop", () => {
  beforeEach(() => {
    stubCapableDevice();
    stubDesktop();
  });
  afterEach(restoreDevice);

  it("offers a level bar to jump to any Level or the Fortress, and a Skip link", () => {
    renderHome();
    const bar = within(campaign().getByRole("navigation", { name: /levels/i }));
    expect(bar.getAllByRole("button").map((b) => b.getAttribute("aria-label"))).toEqual([
      "Go to Level 1: Verstile",
      "Go to Level 2: MiBi Services",
      "Go to Level 3: Coding Sheep Technologies LLP",
      "Go to Level 4: Bajaj Finserv Health",
      "Go to Level 5: Bajaj Finserv Health",
      "Go to Level 6: Bajaj Finserv Health",
      "Go to Side Quest",
      "Go to the Fortress",
    ]);
    expect(campaign().getByRole("link", { name: /skip/i })).toHaveAttribute("href", "#beyond");
  });

  it("keeps every Tower linkable for the Arena's Boss links", () => {
    renderHome();
    for (const t of towers) expect(document.getElementById(`tower-${t.id}`)).not.toBeNull();
  });

  it("starts at Level 1 and opens Towers from the panel", async () => {
    const user = userEvent.setup();
    renderHome();
    const panel = within(campaign().getByRole("region", { name: /current stop/i }));
    expect(panel.getByRole("heading", { name: /verstile/i })).toBeInTheDocument();
    await user.click(campaign().getByRole("button", { name: "Go to Level 5: Bajaj Finserv Health" }));
    await user.click(await panel.findByRole("button", { name: /open tower: lab booking portal/i }));
    expect(screen.getByRole("dialog", { name: /lab booking portal/i })).toBeInTheDocument();
  });
});
