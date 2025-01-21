export const fetchRandomQuote = async () => {
  try {
    const response = await fetch("http://api.quotable.io/quotes/random");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error fetching quote: ", error);
    return null;
  }
};
