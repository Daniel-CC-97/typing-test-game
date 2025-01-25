"use client";

import { useEffect, useRef, useState } from "react";
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
  const inputRef = useRef(null); // Ref for the hidden input

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
    setQuoteLength(length); // Update quote length
    fetchQuoteByLength(length); // Immediately fetch a new quote
  };

  useEffect(() => {
    if (quoteLength) {
      fetchQuoteByLength(quoteLength);
    }
  }, []); // Initial fetch

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

  const handleInputKeyDown = () => {
    // Prevent the default behaviour of the input and propagate the key to the handler
    return;
  };

  // Focus the hidden input on component mount or when the quote length changes
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [quoteLength]);

  return (
    <div
      className="flex min-h-screen flex-col justify-between"
      onClick={() => inputRef.current && inputRef.current.focus()} // Ensure focus on click
    >
      {/* Hidden input to trigger mobile keyboard */}
      <input
        ref={inputRef}
        type="text"
        onKeyDown={handleInputKeyDown} // Delegate to key press handler
        className="absolute top-0 left-0 opacity-0"
        autoComplete="off"
        autoFocus
      />

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
          <Keyboard
            onKeyPress={handleKeyPress}
            onKeyRelease={() => {}} // No-op for now
            stats={stats} // Pass stats to Keyboard
          />
        </>
      )}
    </div>
  );
};

export default TypingTest;
