import { Metadata } from "next";

export const generatePageMetadata = (title: string, description: string):Metadata => ({
  title,
  description,
});
