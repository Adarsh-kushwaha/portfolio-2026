import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Index from "@/pages/Index";

/** The single test seam: the home page as a visitor sees it (jsdom has no WebGL, so 2D mode). */
export function renderHome() {
  return render(
    <MemoryRouter>
      <Index />
    </MemoryRouter>,
  );
}
