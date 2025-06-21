"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion"; // <-- import motion

// Default theme
const DEFAULT_THEME = {
  primaryColor: "#2A5C46",
  backgroundColor: "#E0EFEA",
  logo: "/img/parkers.png",
  brandName: "PARKER'S",
};

// Theme configurations for different brands
const THEMES = {
  parkers: {
    ...DEFAULT_THEME,
    // Default theme is already set for parkers
  },
  // Add more themes as needed
  // anotherBrand: {
  //   primaryColor: "#COLOR_CODE",
  //   backgroundColor: "#BG_COLOR_CODE",
  //   logo: "/img/another-brand-logo.png",
  //   brandName: "ANOTHER BRAND"
  // }
};

export default function Page() {
  const searchParams = useSearchParams();
  const [selected, setSelected] = React.useState(null);
  const [comments, setComments] = React.useState("");
  const [theme, setTheme] = React.useState(DEFAULT_THEME);

  useEffect(() => {
    // Get theme from URL parameter or use default
    const themeName = searchParams.get("theme") || "parkers";
    setTheme(THEMES[themeName] || DEFAULT_THEME);
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected) {
      alert("Please select a score before submitting.");
      return;
    }
    console.log("NPS Score:", selected, "Comments:", comments);
    // TODO: Connect to API endpoint here
  };

  return (
    <div
      className="w-full min-h-screen"
      style={{
        backgroundColor: theme.backgroundColor,
        border: `16px solid ${theme.primaryColor}`,
        boxSizing: "border-box",
      }}
    >
      <div className="max-w-[600px] mx-auto my-4">
        <div className="flex justify-center mb-4">
          <Image
            src={theme.logo}
            alt={`${theme.brandName} Logo`}
            width={180}
            height={180}
            className="object-contain"
          />
        </div>

        <h1
          className="text-3xl font-extrabold text-center mb-2 leading-tight tracking-tight"
          style={{ color: theme.primaryColor }}
        >
          Your opinion matters to us
        </h1>
        <p className="text-center text-gray-600 mb-6 text-[17px] leading-relaxed font-medium">
          Thank you for taking the time to share your feedback.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2
              className="text-lg font-semibold mb-3 text-center leading-snug"
              style={{ color: theme.primaryColor }}
            >
              How likely are you to recommend {theme.brandName} to your family
              and friends?
            </h2>
            <div className="grid grid-cols-10 gap-1 max-w-[600px] mx-auto">
              {Array.from({ length: 10 }).map((_, index) => (
                <NPSButton
                  key={index}
                  number={index + 1}
                  selected={selected}
                  onSelect={setSelected}
                  color={theme.primaryColor}
                />
              ))}
            </div>
            <div className="grid grid-cols-10 text-[11px] text-gray-500 mt-1 max-w-[600px] mx-auto leading-tight">
              <div className="col-span-2 text-left">Not Likely at All</div>
              <div className="col-start-5 col-span-2 text-center">Likely</div>
              <div className="col-start-9 col-span-2 text-right">
                Very Likely
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="comments"
              className="block text-sm font-semibold mb-1 tracking-wide"
              style={{ color: theme.primaryColor }}
            >
              Additional Comments
            </label>
            <textarea
              id="comments"
              className="w-full h-20 border border-gray-300 rounded-md p-3 text-[15px] leading-relaxed font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2A5C46]"
              placeholder="Enter your comments here"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#2A5C46] text-white py-2 rounded-md font-semibold text-base hover:brightness-110 transition"
            style={{ backgroundColor: theme.primaryColor }}
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}
const NPSButton = ({ number, selected, onSelect, color }) => {
  const isSelected = selected === number;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(number)}
      initial={{ scale: 1 }}
      animate={{
        scale: isSelected ? 1.1 : 1,
        backgroundColor: isSelected ? color : "#f3f4f6", // Tailwind bg-gray-100 hex
        borderColor: isSelected ? color : "#d1d5db", // Tailwind border-gray-300 hex
        color: isSelected ? "#fff" : "#1f2937", // Tailwind text-gray-800 hex or white
      }}
      whileHover={{ scale: 1.15 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-full aspect-square rounded-full flex items-center justify-center text-[15px] font-semibold border focus:outline-none focus:ring-2"
      style={{ borderStyle: "solid" }}
    >
      {number}
    </motion.button>
  );
};
