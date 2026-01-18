import { useContext } from "react";
import { QuoteContext } from "./QuoteContext";
import "./App.css";

function App() {
  const { error, gyphi, newQuote, getApiQuote } = useContext(QuoteContext);

  return (
    <>
      <h1>Random Quote</h1>
      <section className="quote-container">
        {error ? (
          <p>ALgo anda mal, intentalo mas tarde!!</p>
        ) : (
          <>
            <img src={gyphi} alt="gif de la frase" />
            <p className="quote-text">{newQuote}</p>
            <button onClick={getApiQuote}>New Quote</button>
          </>
        )}
      </section>
    </>
  );
}
export default App;
