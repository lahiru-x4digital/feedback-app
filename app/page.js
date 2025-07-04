import React from "react";
import FeedbackForm from "@/components/FeedbackForm";

export default async function page({ searchParams }) {
  const token = searchParams.token || "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/customer/feedback?token=${token}`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
      },
    }
  );
  const data = await res.json();

  return <div>{<FeedbackForm data={data} />}</div>;
}
