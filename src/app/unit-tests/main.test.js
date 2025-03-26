import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Converter } from "../components/Converter";

global.fetch = jest.fn();

describe("Converter component", () => {
  beforeEach(() => {
    fetch.mockClear();
    fetch.mockResolvedValue({
      ok: true,
      blob: async () => new Blob(["PDF content"], { type: "application/pdf" }),
    });
    global.URL.createObjectURL = jest.fn(() => "mocked-url");
    global.alert = jest.fn();
  });

  test("renders textarea and button", () => {
    render(<Converter />);
    expect(screen.getByLabelText(/Write your text here/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Convert to PDF/i })
    ).toBeInTheDocument();
  });

  test("calls fetch and check if PDF created and visible in the list", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      blob: async () => new Blob(["PDF content"], { type: "application/pdf" }),
    });

    render(<Converter />);
    const textarea = screen.getByLabelText(/Write your text here/i);
    fireEvent.change(textarea, { target: { value: "Test PDF content" } });

    const button = screen.getByRole("button", { name: /Convert to PDF/i });
    fireEvent.click(button);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    await waitFor(() => {
      expect(screen.getByText(/Document 1/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      const iframe = screen.getByRole("iframe");
      expect(iframe).toBeInTheDocument();
    });
  });

  test("shows error alert if PDF creation fails", async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    jest.spyOn(window, "alert").mockImplementation(() => {});

    render(<Converter />);
    const textarea = screen.getByLabelText(/Write your text here/i);
    fireEvent.change(textarea, { target: { value: "Test PDF content" } });

    const button = screen.getByRole("button", { name: /Convert to PDF/i });
    fireEvent.click(button);

    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith(
        "Failed to create PDF. Try again."
      )
    );
  });
});
