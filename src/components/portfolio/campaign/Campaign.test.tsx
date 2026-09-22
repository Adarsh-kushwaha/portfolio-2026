import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderHome } from "@/test/render-home";
import { towers } from "@/content/campaign";

const campaign = () => within(screen.getByRole("region", { name: /campaign/i }));

describe("Campaign", () => {
  it("walks the Levels oldest to newest, each cleared", () => {
    renderHome();
    const levels = within(campaign().getByRole("list", { name: /levels/i }))
      .getAllByRole("heading", { level: 3 })
      .map((h) => h.textContent);
    expect(levels).toEqual([
      expect.stringContaining("Verstile"),
      expect.stringContaining("MiBi Services"),
      expect.stringContaining("Coding Sheep"),
      expect.stringContaining("Frontend Developer Intern · Bajaj Finserv Health"),
      expect.stringContaining("SDE I"),
      expect.stringContaining("SDE II"),
    ]);
    expect(campaign().getAllByText("LEVEL CLEARED")).toHaveLength(5);
    expect(campaign().getByText("CURRENT LEVEL")).toBeInTheDocument();
  });

  it("raises every Tower with its banner and a linkable anchor", () => {
    renderHome();
    for (const tower of towers) {
      const card = document.getElementById(`tower-${tower.id}`);
      expect(card).not.toBeNull();
      expect(within(card!).getByText(tower.banner)).toBeInTheDocument();
    }
  });

  it("marks Call Pulse as a Side Quest, outside the Bajaj Finserv Health Levels", () => {
    renderHome();
    const sideQuest = within(screen.getByRole("region", { name: /side quest/i }));
    expect(sideQuest.getByText(/call pulse/i)).toBeInTheDocument();
  });

  it("opens a Tower's full story from the keyboard", async () => {
    const user = userEvent.setup();
    renderHome();
    const open = campaign().getByRole("button", { name: /open tower: campaign management system/i });
    open.focus();
    await user.keyboard("{Enter}");
    const dialog = screen.getByRole("dialog", { name: /campaign management system/i });
    expect(within(dialog).getByText(/zustand over redux/i)).toBeInTheDocument();
    expect(within(dialog).getByText("100K+ records at 60fps")).toBeInTheDocument();
  });

  it("ends at the Fortress with every Tower", () => {
    renderHome();
    const fortress = within(screen.getByRole("region", { name: /fortress/i }));
    expect(fortress.getAllByRole("listitem")).toHaveLength(towers.length);
  });

  it("replaces the old Journey and Work sections", () => {
    renderHome();
    expect(document.getElementById("journey")).toBeNull();
    expect(document.getElementById("work")).toBeNull();
  });
});
