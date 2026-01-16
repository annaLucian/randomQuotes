const API_KEY = "rHcX3hvQCpI5onu7bi79Me7iao1zOiprqnDzvlON";
export const API_KEY_GYPHI = "XqJMUaAwwcFgd0VWfCWYA33cx4VHevxC";

export const fetchApiQuote = async () => {
  const response = await fetch(
    "https://api.api-ninjas.com/v2/randomquotes?category=happiness",
    {
      method: "GET",
      headers: {
        "x-Api-Key": API_KEY,
      },
    }
  );

  const dataApi = await response.json();
  return dataApi[0];
};

export const getThreeWords = (words) => {
  console.log("words", { words });
  const sliceWords = words.split(" ").slice(-3);
  const threeWords = sliceWords.join(" ").toLowerCase();
  return threeWords;
};
