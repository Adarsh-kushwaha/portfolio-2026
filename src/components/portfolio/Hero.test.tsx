import { screen, within } from "@testing-library/react";
import { renderHome } from "@/test/render-home";

const hero = () => within(screen.getByRole("region", { name: /adarsh kushwaha/i }));

describe("Hero", () => {
  it("positions Adarsh as SDE II with numbers, not a job-hunt badge", () => {
    renderHome();
    expect(hero().getByText("SDE II · Frontend Systems · Pune")).toBeInTheDocument();
    expect(hero().getByText(/1\.25L\+ API calls a month, 200\+ form variants from one schema, Lighthouse 60 → 95/)).toBeInTheDocument();
    expect(screen.queryByText(/open for opportunities/i)).not.toBeInTheDocument();
  });

  it("links to all five socials and the resume", () => {
    renderHome();
    for (const name of ["GitHub", "LinkedIn", "Twitter / X", "Instagram", "Email"]) {
      expect(hero().getByRole("link", { name })).toBeInTheDocument();
    }
    expect(hero().getByRole("link", { name: /download resume/i })).toHaveAttribute("href", expect.stringContaining("drive.google.com"));
  });

  it("shows the Avatar poster straight away", () => {
    renderHome();
    expect(hero().getByRole("img", { name: /avatar at a desk/i })).toBeInTheDocument();
  });

  it("shows Pune local time", () => {
    renderHome();
    expect(hero().getByText(/📍 Pune/)).toBeInTheDocument();
    expect(hero().getByText(/\d{1,2}:\d{2}\s?(AM|PM)/i)).toBeInTheDocument();
  });
});
