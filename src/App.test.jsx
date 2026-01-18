import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { QuoteProvider } from "./QuoteProvider.jsx";
import * as servicios from "./servicios";
import App from "./App.jsx";

const spyQuoteText = {
  first: "Deceive not thy physician",
  second: "Segunda frase: ¡Adiós!",
};

const spyImageUrl = {
  first: "https://giphy.com/test.gif",
  second: "https://giphy.com/test2.gif",
};

const spyQuote = vi
  .spyOn(servicios, "fetchApiQuote")
  .mockImplementationOnce(() => {
    return Promise.resolve({ quote: spyQuoteText.first });
  })
  .mockImplementationOnce(() => {
    return Promise.resolve({ quote: spyQuoteText.second });
  });

const spyGyphi = vi
  .spyOn(servicios, "fetchApiGiphy")
  .mockImplementationOnce(() => {
    return Promise.resolve(spyImageUrl.first);
  })
  .mockImplementationOnce(() => {
    return Promise.resolve(spyImageUrl.second);
  });

describe("Render <App/>", () => {
  it("should there be a random quote", async () => {
    const user = userEvent.setup();
    render(
      <QuoteProvider>
        <App />
      </QuoteProvider>,
    );

    // 3. Verificamos la frase (Esta viene del vi.mock de servicios)

    expect(await screen.findByText(spyQuoteText.first)).toBeInTheDocument();

    const giftImage = await screen.findByAltText(/gif de la frase/i);

    expect(giftImage).toHaveAttribute("src", spyImageUrl.first);

    const button = screen.getByText(/new quote/i);
    await user.click(button);

    expect(await screen.findByText(spyQuoteText.second)).toBeInTheDocument();
    expect(spyQuote).toHaveBeenCalledTimes(2);
    expect(spyGyphi).toHaveBeenCalledTimes(2);
  });
});
