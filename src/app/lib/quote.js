export const fetchRandomShortQuote = async () => {
  console.log("fetch short quote");

  try {
    const response = await fetch(
      "https://api.quotable.io/quotes/random?maxLength=200"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("data: ", data);
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error fetching quote: ", error);
    return null;
  }
};

export const fetchRandomMediumQuote = async () => {
  console.log("fetch medium quote");

  try {
    const response = await fetch(
      "https://api.quotable.io/quotes/random?minLength=200&maxLength=400"
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("data: ", data);
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error fetching quote: ", error);
    return null;
  }
};

export const fetchRandomLongQuote = async () => {
  console.log("fetch long quote");

  try {
    const response = await fetch(
      "https://api.quotable.io/quotes/random?minLength=400"
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("data: ", data);
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error fetching quote: ", error);
    return null;
  }
};
