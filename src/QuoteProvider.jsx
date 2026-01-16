import { useState, useEffect } from "react";
import { QuoteContext } from "./QuoteContext";
import { fetchApiQuote, getThreeWords, API_KEY_GYPHI } from "./servicios";

export const QuoteProvider = ({ children }) => {
  const [newQuote, setNewQuote] = useState("");
  const [gyphi, setGyphi] = useState(null);
  const [error, setError] = useState(null);

  const getApiQuote = async () => {
    try {
      const quoteData = await fetchApiQuote();
      setNewQuote(quoteData.quote);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchApiQuote()
      .then((data) => setNewQuote(data.quote))
      .catch((error) => setError(error.message));
  }, []);

  useEffect(() => {
    const words = getThreeWords(newQuote);

    const fetchApiGiphy = async () => {
      try {
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY_GYPHI}&q=${words}&limit=1&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
        );
        if (!response.ok) throw new Error("La imagen no se puede encontrar");

        const data = await response.json();
        setGyphi(data?.data[0]?.images?.fixed_height?.url);
      } catch (error) {
        console.error("La imagen no se puede mostrar", error);
      }
    };

    fetchApiGiphy();
  }, [newQuote]);

  return (
    <QuoteContext.Provider value={{ error, gyphi, newQuote, getApiQuote }}>
      {children}
    </QuoteContext.Provider>
  );
};
