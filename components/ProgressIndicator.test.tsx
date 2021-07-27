import React from "react";
import { render } from "../testUtils";
import ProgressIndicator from "./ProgressIndicator"

describe("ProgressIndicator", () => {

  it('displays value, title and subtitle', () => {
    const subtitle = 'Sub';
    const name = '10d';
    const progress = 50;
    const title = 'Title';
    const { getByText, getByRole } = render(<ProgressIndicator title={title} status={{ progress, subtitle, name }} />, {});
    expect(getByText(subtitle)).toBeInTheDocument();
    expect(getByText(progress.toFixed(1))).toBeInTheDocument();
    expect(getByRole('title')).toHaveTextContent(title);
  })
});