import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderHome } from "@/test/render-home";
import { socials } from "@/content/profile";
import { stats, weaknesses } from "@/content/arena";

describe("home page", () => {
  it("shows the Hero heading and a link to the Blog", () => {
    renderHome();
    expect(screen.getByRole("heading", { level: 1, name: /adarsh\s*kushwaha/i })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /blog/i }).length).toBeGreaterThan(0);
  });

  it("tells the story in order, one chapter per section", () => {
    renderHome();
    const chapters = ["About", "Impact", "Skills", "Journey", "Selected work", "Beyond the code", "Contact"];
    const headings = screen.getAllByRole("heading", { level: 2 }).map((h) => h.closest("section")?.id);
    expect(headings).toEqual(["about", "impact", "skills", "journey", "work", "beyond", "contact"]);
    chapters.forEach((c) => expect(screen.getAllByText(c).length).toBeGreaterThan(0));
  });

  it("links to every social and the résumé", () => {
    renderHome();
    socials
      .filter((s) => s.id !== "email")
      .forEach((s) => expect(screen.getAllByRole("link", { name: new RegExp(s.label, "i") })[0]).toHaveAttribute("href", s.href));
    expect(screen.getAllByRole("link", { name: /résumé/i }).length).toBeGreaterThan(0);
  });

  it("shows Pune local time", () => {
    renderHome();
    expect(screen.getAllByLabelText(/local time in pune/i).length).toBeGreaterThan(0);
  });
});

describe("career levels", () => {
  it("shows SDE I starting after the internship ends", () => {
    renderHome();
    expect(screen.getByText(/Jul 2023 — Oct 2024/)).toBeInTheDocument();
    expect(screen.queryByText(/Jan 2023 — Oct 2024/)).not.toBeInTheDocument();
  });

  it("lists the current role first", () => {
    renderHome();
    const journey = document.getElementById("journey")!;
    const roles = within(journey).getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(roles[0]).toMatch(/SDE II/);
    expect(roles.at(-1)).toMatch(/Co-Founder/);
  });
});

describe("skills", () => {
  it("shows every stat as a meter and labels the two weakest as growing", () => {
    renderHome();
    expect(screen.getAllByRole("meter")).toHaveLength(stats.length);
    weaknesses.forEach((w) => expect(screen.getByText(w.note!)).toBeInTheDocument());
    expect(screen.getAllByText("Growing")).toHaveLength(weaknesses.length);
  });
});

describe("work", () => {
  it("opens a project's case study from the keyboard and closes it with Escape", async () => {
    const user = userEvent.setup();
    renderHome();
    const card = screen.getByRole("button", { name: /performance & bundle optimization: read the case study/i });
    card.focus();
    await user.keyboard("{Enter}");
    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByText(/the decision/i)).toBeInTheDocument();
    expect(within(dialog).getByText("2.5 MB → 600 KB")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens a case study from the role where it was built", async () => {
    const user = userEvent.setup();
    renderHome();
    await user.click(screen.getByRole("button", { name: /^lab booking portal$/i }));
    expect(await screen.findByRole("dialog", { name: /lab booking portal/i })).toBeInTheDocument();
  });

  it("marks Call Pulse as a side project", () => {
    renderHome();
    const card = screen.getByRole("button", { name: /call pulse/i });
    expect(within(card).getByText("Side project")).toBeInTheDocument();
  });
});

describe("contact", () => {
  it("shows errors next to each field instead of sending an empty form", async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    renderHome();
    await user.click(screen.getByRole("button", { name: /send message/i }));
    expect(await screen.findByText(/tell me your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true");
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });
});
