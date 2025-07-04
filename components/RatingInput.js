import { useState } from "react";
import { Star } from "lucide-react";

export default function Rating({ max = 5, value = 0, onChange }) {
  const [hover, setHover] = useState(null);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }, (_, index) => {
        const ratingValue = index + 1;
        const isFilled = hover ? ratingValue <= hover : ratingValue <= value;

        return (
          <button
            key={ratingValue}
            type="button"
            onClick={() => onChange(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
            className="p-1 cursor-pointer"
          >
            <Star
              className={`w-6 h-6 transition-colors ${
                isFilled ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
