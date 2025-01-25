const BASE_URL = "https://api.quotable.io/quotes/random";

// Utility function to handle fetch with error handling
const fetchQuote = async (url) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error fetching quote: ", error);
    return null;
  }
};

// Fetch short quote
export const fetchRandomShortQuote = async () => {
  const url = `${BASE_URL}?maxLength=200`;
  return fetchQuote(url);
};

// Fetch medium quote
export const fetchRandomMediumQuote = async () => {
  const url = `${BASE_URL}?minLength=200&maxLength=400`;
  return fetchQuote(url);
};

// Fetch long quote
export const fetchRandomLongQuote = async () => {
  const url = `${BASE_URL}?minLength=400`;
  return fetchQuote(url);
};
