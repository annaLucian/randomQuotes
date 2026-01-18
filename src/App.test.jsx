import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { QuoteProvider } from "./QuoteProvider.jsx";
import App from "./App.jsx";

globalThis.fetch = vi.fn(); // creamos al "actor" que respondera por el fetch

vi.mock("./servicios", async () => {
  const actualServices = await vi.importActual("./servicios");

  return {
    ...actualServices,
    fetchApiQuote: vi.fn(() =>
      Promise.resolve({
        quote: "Deceive not thy physician confessor nor lawyer",
      }),
    ),
    fetchApiGiphy: vi.fn(() => Promise.resolve("https://giphy.com/test.gif")),
  };
});

describe("Render <App/>", () => {
  it("should there be a random quote", async () => {
    render(
      <QuoteProvider>
        <App />
      </QuoteProvider>,
    );

    // 3. Verificamos la frase (Esta viene del vi.mock de servicios)
    const quoteText = await screen.findByText(/Deceive not thy physician/i);
    expect(quoteText).toBeInTheDocument();

    // 4. Verificamos el GIF
    const giftImage = await screen.findByAltText(/gif de la frase/i);

    // Usamos waitFor para darle un respiro a React para que pinte la URL

    expect(giftImage).toHaveAttribute("src", "https://giphy.com/test.gif");

    const button = screen.getByText(/new quote/i);
    await userEvent.click(button);
  });
});
