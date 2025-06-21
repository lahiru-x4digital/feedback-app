"use client";
import React from "react";
import Image from "next/image";

const PRIMARY_COLOR = "rgb(42, 92, 70)";
const BG_COLOR = "rgb(224, 239, 234)";

export default function Page() {
  const [selected, setSelected] = React.useState(null);
  const [comments, setComments] = React.useState("");

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
        backgroundColor: BG_COLOR,
        border: `16px solid ${PRIMARY_COLOR}`,
        boxSizing: "border-box",
      }}
    >
      <div className="max-w-[600px] mx-auto my-4">
        <div className="flex justify-center mb-4">
          <Image
            src="/img/parkers.png"
            alt="PARKER'S Logo"
            width={180}
            height={180}
            className="object-contain"
          />
        </div>

        <h1 className="text-3xl font-extrabold text-center mb-2 leading-tight tracking-tight text-[#2A5C46]">
          Your opinion matters to us
        </h1>
        <p className="text-center text-gray-600 mb-6 text-[17px] leading-relaxed font-medium">
          Thank you for taking the time to share your feedback.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-3 text-center leading-snug text-[#2A5C46]">
              How likely are you to recommend PARKER'S to your family and
              friends?
            </h2>
            <div className="grid grid-cols-10 gap-1 max-w-[600px] mx-auto">
              {Array.from({ length: 10 }).map((_, index) => (
                <NPSButton
                  key={index}
                  number={index + 1}
                  selected={selected === index + 1}
                  onSelect={setSelected}
                  color={PRIMARY_COLOR}
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
              className="block text-sm font-semibold mb-1 tracking-wide text-[#2A5C46]"
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
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}

const NPSButton = ({ number, selected, onSelect, color }) => {
  return (
    <button
      type="button"
      className={`w-full aspect-square rounded-full flex items-center justify-center text-[15px] font-semibold border transition
        ${
          selected === number
            ? `${color} text-white border-[#2A5C46]`
            : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2A5C46]"
        }
      `}
      onClick={() => onSelect(number)}
    >
      {number}
    </button>
  );
};
