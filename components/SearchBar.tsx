"use client";

import { scrapeAndStoreProduct } from "@/lib/actions";
import { useState, FormEvent } from "react";

const isValidAmazonProductUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;

    if (
      hostname.includes("amazon.com") ||
      hostname.includes("amazon.") ||
      hostname.endsWith("amazon")
    ) {
      return true;
    }
  } catch (error) {
    return false;
  }

  return false;
};

const SearchBar = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValidLink = isValidAmazonProductUrl(searchPrompt);

    if (!isValidLink) return alert("Please provide a valid amazon link!");

    try {
      setIsLoading(true);

      // Scrapping the product
      const product = await scrapeAndStoreProduct(searchPrompt);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-wrap gap-5 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Product Link.."
        className="searchbar_input"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
      />

      <button
        type="submit"
        className="searchbar_btn"
        disabled={searchPrompt === ""}
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default SearchBar;
