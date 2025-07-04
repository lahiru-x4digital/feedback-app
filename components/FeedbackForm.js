"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion"; // <-- import motion
import Rating from "@/components/RatingInput";
import { toast } from "sonner";
// Default theme
const DEFAULT_THEME = {
  primaryColor: "#2A5C46",
  backgroundColor: "#E0EFEA",
  logo: "/img/parkers.png",
  brandName: "PARKER'S",
};
const SOMEWHERE_THEME = {
  primaryColor: "#C26C15",
  backgroundColor: "#FFF9F2",
  logo: "/img/somewhere.png",
  brandName: "SOMEWHERE'S",
};
const PUBLIC_THEME = {
  primaryColor: "#f97743",
  backgroundColor: "#FFF9F2",
  logo: "/img/public.png",
  brandName: "PUBLIC'S",
};
//SALT
const SALT_THEME = {
  primaryColor: "#000000",
  backgroundColor: "#F5F5F5",
  logo: "/img/salt.png",
  brandName: "SALT'S",
};

export default function Page({ data }) {
  const searchParams = useSearchParams();
  const [selected, setSelected] = React.useState(null);
  const [comments, setComments] = React.useState("");
  const [theme, setTheme] = React.useState(DEFAULT_THEME);
  const [rating, setRating] = React.useState(0);

  useEffect(() => {
    // Get theme from URL parameter or use default
    const themeName = searchParams.get("theme") || "parkers";
    switch (themeName) {
      case "parkers":
        setTheme(DEFAULT_THEME);
        break;
      case "somewhere":
        setTheme(SOMEWHERE_THEME);
        break;
      case "public":
        setTheme(PUBLIC_THEME);
        break;
      case "salt":
        setTheme(SALT_THEME);
        break;
      default:
        setTheme(DEFAULT_THEME);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (rating === 0) {
      toast.error("Please rate your experience by selecting stars.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/customer/feedback/${data?.data?.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            feedback: comments,
            stars: rating,
            // token: searchParams.get("token") || "",
          }),
        }
      );

      const res = await response.json();

      if (response.ok) {
        // Handle successful submission
        toast.success("Feedback submitted successfully!");
        window.location.reload(); // This will show the success message
      } else {
        toast.error(res.message || "Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error(
        error.message || "An error occurred while submitting your feedback."
      );
    }
  };

  return (
    <div
      className="w-full min-h-screen px-2"
      style={{
        backgroundColor: theme.backgroundColor,
        border: `16px solid ${theme.primaryColor}`,
        boxSizing: "border-box",
      }}
    >
      <div className="max-w-[600px] mx-auto">
        <div className="flex justify-center">
          <Image
            src={theme.logo}
            alt={`${theme.brandName} Logo`}
            width={200}
            height={180}
            className="object-contain"
          />
        </div>

        {!data?.data?.submited && (
          <>
            <h1
              className="text-3xl font-extrabold text-center leading-tight tracking-tight"
              style={{ color: theme.primaryColor }}
            >
              Your opinion matters to us
            </h1>
            <p className="text-center text-gray-600 mb-4 text-[17px] leading-relaxed font-medium">
              Thank you for taking the time to share your feedback.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="mb-4">
                <h2
                  className="text-lg font-semibold mb-2 leading-snug"
                  style={{ color: theme.primaryColor }}
                >
                  How satisfied were you with your recent visit to {theme.brandName}?
                </h2>
                <div className="grid grid-cols-5 gap-1 sm:gap-2 max-w-[600px] mx-auto">
                  <motion.button 
                    type="button" 
                    className={`flex flex-col items-center justify-center p-1 sm:p-2 md:p-3 rounded-lg border ${
                      rating === 5 ? 'border-[var(--hover-color)]' : 'border-gray-200'
                    } cursor-pointer`}
                    style={{ '--hover-color': theme.primaryColor }}
                    animate={{
                      scale: rating === 5 ? 1.1 : 1,
                      backgroundColor: rating === 5 ? `${theme.primaryColor}0d` : 'transparent'
                    }}
                    whileHover={{ 
                      scale: rating === 5 ? 1.1 : 1.05, 
                      backgroundColor: `${theme.primaryColor}1a` 
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    onClick={() => setRating(5)}
                  >
                    <span className={`text-lg sm:text-xl md:text-2xl ${rating === 5 ? 'text-[var(--hover-color)]' : ''}`}>😃</span>
                    <span className={`text-xs text-center ${rating === 5 ? 'text-[var(--hover-color)] font-medium' : ''}`}>
                      Very Satisfied
                    </span>
                  </motion.button>
                  <motion.button 
                    type="button" 
                    className={`flex flex-col items-center justify-center p-1 sm:p-2 md:p-3 rounded-lg border ${
                      rating === 4 ? 'border-[var(--hover-color)]' : 'border-gray-200'
                    } cursor-pointer`}
                    style={{ '--hover-color': theme.primaryColor }}
                    animate={{
                      scale: rating === 4 ? 1.1 : 1,
                      backgroundColor: rating === 4 ? `${theme.primaryColor}0d` : 'transparent'
                    }}
                    whileHover={{ 
                      scale: rating === 4 ? 1.1 : 1.05, 
                      backgroundColor: `${theme.primaryColor}1a` 
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    onClick={() => setRating(4)}
                  >
                    <span className={`text-lg sm:text-xl md:text-2xl ${rating === 4 ? 'text-[var(--hover-color)]' : ''}`}>🙂</span>
                    <span className={`text-xs text-center ${rating === 4 ? 'text-[var(--hover-color)] font-medium' : ''}`}>
                      Satisfied
                    </span>
                  </motion.button>

                  <motion.button 
                    type="button" 
                    className={`flex flex-col items-center justify-center p-1 sm:p-2 md:p-3 rounded-lg border ${
                      rating === 3 ? 'border-[var(--hover-color)]' : 'border-gray-200'
                    } cursor-pointer`}
                    style={{ '--hover-color': theme.primaryColor }}
                    animate={{
                      scale: rating === 3 ? 1.1 : 1,
                      backgroundColor: rating === 3 ? `${theme.primaryColor}0d` : 'transparent'
                    }}
                    whileHover={{ 
                      scale: rating === 3 ? 1.1 : 1.05, 
                      backgroundColor: `${theme.primaryColor}1a` 
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    onClick={() => setRating(3)}
                  >
                    <span className={`text-lg sm:text-xl md:text-2xl ${rating === 3 ? 'text-[var(--hover-color)]' : ''}`}>😐</span>
                    <span className={`text-xs text-center ${rating === 3 ? 'text-[var(--hover-color)] font-medium' : ''}`}>
                      Neutral
                    </span>
                  </motion.button>

                  <motion.button 
                    type="button" 
                    className={`flex flex-col items-center justify-center p-1 sm:p-2 md:p-3 rounded-lg border ${
                      rating === 2 ? 'border-[var(--hover-color)]' : 'border-gray-200'
                    } cursor-pointer`}
                    style={{ '--hover-color': theme.primaryColor }}
                    animate={{
                      scale: rating === 2 ? 1.1 : 1,
                      backgroundColor: rating === 2 ? `${theme.primaryColor}0d` : 'transparent'
                    }}
                    whileHover={{ 
                      scale: rating === 2 ? 1.1 : 1.05, 
                      backgroundColor: `${theme.primaryColor}1a` 
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    onClick={() => setRating(2)}
                  >
                    <span className={`text-lg sm:text-xl md:text-2xl ${rating === 2 ? 'text-[var(--hover-color)]' : ''}`}>🙁</span>
                    <span className={`text-xs text-center ${rating === 2 ? 'text-[var(--hover-color)] font-medium' : ''}`}>
                      Dissatisfied
                    </span>
                  </motion.button>

                  <motion.button 
                    type="button" 
                    className={`flex flex-col items-center justify-center p-1 sm:p-2 md:p-3 rounded-lg border ${
                      rating === 1 ? 'border-[var(--hover-color)]' : 'border-gray-200'
                    } cursor-pointer`}
                    style={{ '--hover-color': theme.primaryColor }}
                    animate={{
                      scale: rating === 1 ? 1.1 : 1,
                      backgroundColor: rating === 1 ? `${theme.primaryColor}0d` : 'transparent'
                    }}
                    whileHover={{ 
                      scale: rating === 1 ? 1.1 : 1.05, 
                      backgroundColor: `${theme.primaryColor}1a` 
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    onClick={() => setRating(1)}
                  >
                    <span className={`text-lg sm:text-xl md:text-2xl ${rating === 1 ? 'text-[var(--hover-color)]' : ''}`}>😠</span>
                    <span className={`text-xs text-center ${rating === 1 ? 'text-[var(--hover-color)] font-medium' : ''}`}>
                      Very Dissatisfied
                    </span>
                  </motion.button>
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
                  className="w-full h-20 border border-gray-300 rounded-md p-2 text-[15px] leading-relaxed font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2A5C46]"
                  placeholder="Enter your comments here"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#2A5C46] text-white py-2 rounded-md font-semibold text-base hover:brightness-110 transition cursor-pointer"
                style={{ backgroundColor: theme.primaryColor }}
              >
                Submit Feedback
              </button>
            </form>
          </>
        )}
        {data?.data?.submited && (
          <>
            <h1
              className="text-3xl font-extrabold text-center leading-tight tracking-tight"
              style={{ color: theme.primaryColor }}
            >
              Thank you for your feedback!
            </h1>
            <p className="text-center text-gray-600 mb-4 text-[17px] leading-relaxed font-medium">
              Your feedback has been submitted successfully.
            </p>
          </>
        )}
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
        scale: isSelected ? 1.15 : 1,
        backgroundColor: isSelected ? color : "#f3f4f6", // Tailwind bg-gray-100 hex
        borderColor: isSelected ? color : "#d1d5db", // Tailwind border-gray-300 hex
        color: isSelected ? "#fff" : "#1f2937", // Tailwind text-gray-800 hex or white
        boxShadow: isSelected ? `0 0 8px 2px ${color}aa` : "none",
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
          backgroundColor: { duration: 0.3 },
          color: { duration: 0.3 },
          boxShadow: { duration: 0.3 },
        },
      }}
      whileHover={{
        scale: 0.95,
        boxShadow: `0 4px 12px 0 ${color}55`,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
      className="w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-[12px] font-semibold border focus:outline-none focus:ring-4 p-0 m-0.5"
      style={{
        borderStyle: "solid",
        borderColor: isSelected ? color : "#d1d5db",
        boxSizing: "border-box",
        outlineOffset: "2px",
      }}
      tabIndex={0}
      aria-pressed={isSelected}
    >
      {number}
    </motion.button>
  );
};
