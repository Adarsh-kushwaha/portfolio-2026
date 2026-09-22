import { screen } from "@testing-library/react";
import { renderHome } from "@/test/render-home";

describe("home page", () => {
  it("shows the Hero heading and a link to the Blog", () => {
    renderHome();
    expect(screen.getByRole("heading", { level: 1, name: /adarsh kushwaha/i })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /blog/i }).length).toBeGreaterThan(0);
  });
});
