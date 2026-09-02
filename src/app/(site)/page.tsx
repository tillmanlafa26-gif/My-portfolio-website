import type { Metadata } from "next";
import Portfolio from "@/components/Portfolio/ResumePortfolio";

export const metadata: Metadata = {
  title: "Nate | Portfolio",
  description: "The professional portfolio of Nate — thoughtful work, built with purpose.",
};

export default function Home() {
  return (
    <Portfolio />
  );
}
