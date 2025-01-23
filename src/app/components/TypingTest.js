"use client";

import { useEffect, useState } from "react";
import {
  fetchRandomShortQuote,
  fetchRandomMediumQuote,
  fetchRandomLongQuote,
} from "../lib/quote";
import Keyboard from "./Keyboard";
import Quote from "./Quote";

const TypingTest = () => {
  const [quote, setQuote] = useState(null);
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mistakes, setMistakes] = useState([]); // Track indices of mistakes
  const [finishedQuote, setFinishedQuote] = useState(false);
  const [stats, setStats] = useState({}); // Track mistake stats
  const [quoteLength, setQuoteLength] = useState(null); // Track quote length selection

  const fetchQuoteByLength = async (length) => {
    let fetchedQuote;

    switch (length) {
      case "short":
        fetchedQuote = await fetchRandomShortQuote();
        break;
      case "medium":
        fetchedQuote = await fetchRandomMediumQuote();
        break;
      case "long":
        fetchedQuote = await fetchRandomLongQuote();
        break;
      default:
        fetchedQuote = await fetchRandomShortQuote(); // Default to short if no length is selected
    }

    setQuote(fetchedQuote);
    setTypedText(""); // Reset typed text
    setCurrentIndex(0); // Reset index
    setMistakes([]); // Clear mistakes
    setFinishedQuote(false); // Reset completion flag
  };

  const handleLengthSelection = (length) => {
    // Always re-fetch the quote, even if the length is the same
    setQuoteLength(length); // Update quote length
    fetchQuoteByLength(length); // Immediately fetch a new quote
  };

  useEffect(() => {
    if (quoteLength) {
      fetchQuoteByLength(quoteLength);
    }
  }, []); // Remove dependency to avoid double-fetching on state changes

  const handleKeyPress = (key) => {
    if (!quote) return;

    const pressedKey = key.toUpperCase(); // Ensure consistent case comparison

    if (key === "BACKSPACE") {
      if (typedText.length > 0) {
        setTypedText((prev) => prev.slice(0, -1));
        setCurrentIndex((prev) => Math.max(0, prev - 1));
        setMistakes((prev) =>
          prev.filter((mistakeIndex) => mistakeIndex !== currentIndex - 1)
        );
      }
      return;
    }

    if (!finishedQuote) {
      const expectedChar = quote.content[currentIndex].toUpperCase();

      if (key !== "RSHIFT" && key !== "LSHIFT") {
        setTypedText((prev) => prev + key);

        if (pressedKey === expectedChar) {
          setMistakes((prev) =>
            prev.filter((mistakeIndex) => mistakeIndex !== currentIndex)
          );
        } else {
          if (!mistakes.includes(currentIndex)) {
            setMistakes((prev) => [...prev, currentIndex]);

            // Dynamically update stats
            setStats((prevStats) => {
              const char = quote.content[currentIndex].toUpperCase();
              return {
                ...prevStats,
                [char]: (prevStats[char] || 0) + 1,
              };
            });
          }
        }

        setCurrentIndex((prev) => prev + 1);

        if (currentIndex === quote.content.length - 1) {
          setFinishedQuote(true);
        }
      }
    }
  };

  const handleKeyRelease = (key) => {
    // Handle key release if needed
  };

  return (
    <div className="flex min-h-screen flex-col justify-between">
      {/* If no quote length is selected, or if the user finishes a quote, show length options */}
      {!quoteLength || finishedQuote ? (
        <div className="text-center text-gray-400 p-4">
          <h1 className="text-2xl font-bold mb-4">
            {finishedQuote
              ? "Finished! Select a New Quote Length"
              : "Select Quote Length"}
          </h1>
          <div className="flex justify-center gap-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => handleLengthSelection("short")}
            >
              Short
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => handleLengthSelection("medium")}
            >
              Medium
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => handleLengthSelection("long")}
            >
              Long
            </button>
          </div>
        </div>
      ) : (
        <>
          <Quote
            quote={quote}
            currentIndex={currentIndex}
            typedText={typedText}
            mistakes={mistakes}
          />
          {/* Results appear here */}
          <Keyboard
            onKeyPress={handleKeyPress}
            onKeyRelease={handleKeyRelease}
            stats={stats} // Pass stats to Keyboard
          />
        </>
      )}
    </div>
  );
};

export default TypingTest;
