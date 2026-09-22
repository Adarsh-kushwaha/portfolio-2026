import { screen, within } from "@testing-library/react";
import { renderHome } from "@/test/render-home";
import { profile } from "@/content/profile";

const about = () => within(screen.getByRole("region", { name: /the engineer behind the pixels/i }));

describe("About", () => {
  it("introduces the engineer with the portrait and four highlights", () => {
    renderHome();
    expect(about().getByRole("img", { name: /portrait of adarsh/i })).toBeInTheDocument();
    for (const chip of ["System Design", "Pune-based", "Mentorship", "Shipping Culture"]) {
      expect(about().getByText(chip)).toBeInTheDocument();
    }
  });

  it("shows the Human Behind the Screen with what he's working on", () => {
    renderHome();
    expect(about().getByRole("heading", { name: /the human behind the screen/i })).toBeInTheDocument();
    expect(about().getByRole("img", { name: /adarsh at home/i })).toBeInTheDocument();
    expect(about().getByText(profile.workingOn)).toBeInTheDocument();
  });

  it("leaves hobbies and values to Beyond the Code", () => {
    renderHome();
    const text = screen.getByRole("region", { name: /the engineer behind the pixels/i }).textContent ?? "";
    expect(text).not.toMatch(/cooking|kitchen|books|music|films|honesty/i);
  });
});
