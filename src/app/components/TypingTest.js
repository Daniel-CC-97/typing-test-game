"use client";

import { useEffect, useState } from "react";
import { fetchRandomQuote } from "../lib/quote";
import Keyboard from "./Keyboard";
import Quote from "./Quote";

const TypingTest = () => {
  const [quote, setQuote] = useState(null);
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mistakes, setMistakes] = useState([]); // Track indices of mistakes
  const [finishedQuote, setFinishedQuote] = useState(false);

  useEffect(() => {
    const fetchQuote = async () => {
      const fetchedQuote = await fetchRandomQuote();
      setQuote(fetchedQuote);
    };
    fetchQuote();
  }, []);

  const handleKeyPress = (key) => {
    if (!quote) return;

    if (key === "BACKSPACE") {
      if (typedText.length > 0) {
        setTypedText((prev) => prev.slice(0, -1)); // Remove last typed character
        setMistakes((prev) => prev.slice(0, -1)); // Remove mistake tracking for last character
        setCurrentIndex((prev) => Math.max(0, prev - 1)); // Move back in the quote
      }
      return; // Exit early if backspace is pressed
    }

    if (!finishedQuote) {
      const expectedChar = quote.content[currentIndex].toUpperCase();

      if (key !== "RSHIFT" && key !== "LSHIFT") {
        if (key === expectedChar) {
          setTypedText((prev) => prev + key);
        } else {
          setMistakes((prev) => [...prev, currentIndex]); // Track mistakes
        }

        setCurrentIndex((prev) => prev + 1); // Move to the next character either way
        if (currentIndex === quote.content.length - 1) {
          setFinishedQuote(true);
        }
      }
    }
  };

  // console.log("typed text: ", typedText);
  // console.log("mistakes: ", mistakes);

  const handleKeyRelease = (key) => {
    // Handle key release if needed
  };

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Quote
        quote={quote}
        currentIndex={currentIndex}
        typedText={typedText}
        mistakes={mistakes}
      />
      <Keyboard onKeyPress={handleKeyPress} onKeyRelease={handleKeyRelease} />
    </div>
  );
};

export default TypingTest;
