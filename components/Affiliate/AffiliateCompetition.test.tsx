import { render, screen } from "@testing-library/react";
import AffiliateCompetition from "./AffiliateCompetition";

jest.mock("next/image", () => {
  return function MockNextImage(props: any) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || ""} />;
  };
});

describe("AffiliateCompetition", () => {
  it("renders comparison columns", () => {
    const t = (key: string, options?: Record<string, unknown>) => {
      if (key === "affiliate:days") return `${options?.days} days`;
      return key;
    };

    render(<AffiliateCompetition t={t} />);

    expect(screen.getByAltText("dekitabi-logo")).toBeInTheDocument();
    expect(screen.getByAltText("get-your-guide-logo")).toBeInTheDocument();
    expect(screen.getByText("9%")).toBeInTheDocument();
  });
});
