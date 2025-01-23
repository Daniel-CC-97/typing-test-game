import React from "react";

const Quote = ({ quote, currentIndex, mistakes }) => {
  if (!quote) {
    return <h1 className="text-2xl font-bold text-center">No Quote</h1>;
  }

  const { content } = quote;
  return (
    <div className="flex flex-wrap justify-center text-center gap-1 p-4">
      {content.split("").map((char, index) => {
        let className = "text-text"; // Default styling for untyped characters
        let letter = char;

        if (letter === " ") {
          letter = "_";
          className = "text-gray-400"; // Style for spaces
        }

        if (index < currentIndex && mistakes.includes(index)) {
          className = "text-incorrect"; // Red for mistakes
        } else if (index < currentIndex) {
          className = "text-correct"; // Light green for correctly typed characters (similar to the previous #90ee90)
        } else if (index === currentIndex) {
          className = "text-current underline"; // Yellow for the current character
        }

        return (
          <span
            key={index}
            className={`text-lg flex justify-center items-center ${className}`}
          >
            {letter}
          </span>
        );
      })}
    </div>
  );
};

export default Quote;
