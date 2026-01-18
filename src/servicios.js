const API_KEY = "rHcX3hvQCpI5onu7bi79Me7iao1zOiprqnDzvlON";
const API_KEY_GYPHI = "XqJMUaAwwcFgd0VWfCWYA33cx4VHevxC";

export const fetchApiQuote = async () => {
  const response = await fetch(
    "https://api.api-ninjas.com/v2/randomquotes?category=happiness",
    {
      method: "GET",
      headers: {
        "x-Api-Key": API_KEY,
      },
    },
  );

  const dataApi = await response.json();
  return dataApi[0];
};

export const fetchApiGiphy = async (words) => {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY_GYPHI}&q=${words}&limit=1&offset=0&rating=g&lang=en&bundle=messaging_non_clips`,
  );

  if (!response.ok) throw new Error("La imagen no se puede encontrar");

  const data = await response.json();
  return data.data[0].images.fixed_height.url;
};
