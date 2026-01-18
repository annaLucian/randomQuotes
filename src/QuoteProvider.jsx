import { useState, useEffect } from "react";
import { QuoteContext } from "./QuoteContext";
import { fetchApiQuote, fetchApiGiphy } from "./servicios";

const getThreeWords = (words) => {
  const sliceWords = words.split(" ").slice(-3);
  const threeWords = sliceWords.join(" ").toLowerCase();
  return threeWords;
};

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
    if (!newQuote || typeof newQuote !== "string") return;
    const words = getThreeWords(newQuote);
    fetchApiGiphy(words)
      .then((data) => setGyphi(data))
      .catch((error) => setError(error.message));
  }, [newQuote]);

  return (
    <QuoteContext.Provider value={{ error, gyphi, newQuote, getApiQuote }}>
      {children}
    </QuoteContext.Provider>
  );
};
