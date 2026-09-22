import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderHome } from "@/test/render-home";
import { bosses, skills } from "@/content/arena";

const arena = () => within(screen.getByRole("region", { name: /arena/i }));

describe("Arena", () => {
  it("shows six Stats as meters with a real spread", () => {
    renderHome();
    const meters = within(arena().getByRole("list", { name: /^stats$/i })).getAllByRole("meter");
    expect(meters.map((m) => [m.getAttribute("aria-label"), m.getAttribute("aria-valuenow")])).toEqual([
      ["Architecture", "90"],
      ["Performance", "95"],
      ["Leadership", "80"],
      ["State & Data", "85"],
      ["Testing", "60"],
      ["Backend", "55"],
    ]);
  });

  it("takes Weaknesses from the two lowest Stats, with honest notes", () => {
    renderHome();
    const weaknesses = within(arena().getByRole("list", { name: /weaknesses/i }));
    expect(weaknesses.getAllByRole("listitem").map((li) => li.textContent)).toEqual([
      expect.stringMatching(/Testing — 60.*building toward test-first/),
      expect.stringMatching(/Backend — 55/),
    ]);
    const strengths = within(arena().getByRole("list", { name: /strengths/i }));
    expect(strengths.getAllByRole("listitem").map((li) => li.textContent)).toEqual([
      expect.stringContaining("Performance"),
      expect.stringContaining("Architecture"),
      expect.stringContaining("State & Data"),
    ]);
  });

  it("keeps all 30 skills as Arsenal or Tools, with level badges", () => {
    renderHome();
    const arsenal = within(arena().getByRole("list", { name: /^arsenal$/i }));
    const tools = within(arena().getByRole("list", { name: /^tools$/i }));
    expect(arsenal.getAllByRole("listitem").length + tools.getAllByRole("listitem").length).toBe(30);
    expect(skills).toHaveLength(30);
    expect(tools.getByText("Testing (Vitest / RTL)").closest("li")).toHaveTextContent("Intermediate");
  });

  it("shows every Boss's before → after and links it to the Tower where it was fought", () => {
    renderHome();
    for (const boss of bosses.filter((b) => b.towerId)) {
      const card = within(arena().getByRole("article", { name: boss.name }));
      expect(card.getByText(boss.before)).toBeInTheDocument();
      expect(card.getByText(boss.after!)).toBeInTheDocument();
      expect(card.getByRole("link", { name: /fought at/i })).toHaveAttribute("href", `#tower-${boss.towerId}`);
    }
  });

  it("shows this site's own LCP as a Boss", () => {
    renderHome();
    const card = within(arena().getByRole("article", { name: "This Site" }));
    expect(card.getByText("10.8 s")).toBeInTheDocument();
  });

  it("lets a visitor fight a Boss and see its health drain to the after value", async () => {
    const user = userEvent.setup();
    renderHome();
    const card = within(arena().getByRole("article", { name: "Slow LCP" }));
    await user.click(card.getByRole("button", { name: /fight slow lcp/i }));
    expect(card.getByRole("meter", { name: /slow lcp health/i })).toHaveAttribute("aria-valuenow", "23");
    expect(card.getByText(/lighthouse uppercut/i)).toBeInTheDocument();
  });

  it("replaces the old Skills section", () => {
    renderHome();
    expect(document.getElementById("skills")).toBeNull();
  });
});
