"use client";
import RichTextEditor from "@/components/TextEditor";
import { useState } from "react";

export default function Page() {
  const [post, setPost] = useState("");

  const onChange = (content: string) => {
    setPost(content);
    console.log(content);
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <RichTextEditor content={post} onChange={onChange} />
    </div>
  );
}