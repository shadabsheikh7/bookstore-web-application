/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaBookOpen,
  FaArrowRight,
} from "react-icons/fa6";

import Bookcard from "../bookcard/Bookcard.jsx";
import Loader from "../Loader/Loader";

const Favourite = () => {
  const [favbook, setFavbook] = useState(null);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const headers = {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetchFavouriteBooks = async () => {
    try {
      setError("");

      if (!API_URL) {
        throw new Error("VITE_API_URL is not configured.");
      }

      const response = await axios.get(`${API_URL}/api/v1/get-fav`, {
        headers,
      });

      setFavbook(response.data?.data || []);
    } catch (error) {
      console.error("Favourite books error:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Unable to load your favourite books.",
      );
    }
  };

  useEffect(() => {
    fetchFavouriteBooks();
  }, []);

  // Loading
  if (!favbook && !error) {
    return (
      <div className="flex min-h-[500px] items-center justify-center bg-[#f6f3eb]">
        <Loader />
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center bg-[#f6f3eb] px-6 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
          <FaHeart className="text-2xl" />
        </div>

        <h2 className="text-2xl font-bold text-[#173d2b]">
          Unable to load favourites
        </h2>

        <p className="mt-2 max-w-md text-sm text-red-600">
          {error}
        </p>

        <button
          type="button"
          onClick={fetchFavouriteBooks}
          className="mt-5 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Empty favourites
  if (favbook.length === 0) {
    return (
      <div className="min-h-[500px] bg-[#f6f3eb] px-4 py-8 sm:px-6">
        <div className="flex min-h-[450px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 text-center shadow-sm">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-pink-50 text-pink-500">
            <FaHeart className="text-3xl" />
          </div>

          <h1 className="text-2xl font-bold text-[#173d2b] sm:text-3xl">
            Your Favourite List is Empty
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
            You haven't added any books to your favourites yet. Explore
            our collection and save the books you love.
          </p>

          <Link
            to="/all-books"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700"
          >
            <FaBookOpen />
            Explore Books
            <FaArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#f6f3eb] px-4 py-6 sm:px-6">
      {/* Header */}
      <div className="mb-7">
        <div className="mb-2 flex items-center gap-2 text-pink-500">
          <FaHeart />
          <span className="text-xs font-bold uppercase tracking-wider">
            Saved Books
          </span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#173d2b] sm:text-3xl">
              My Favourite Books
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Books you've saved for later.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-600">
            <FaHeart />
            {favbook.length}{" "}
            {favbook.length === 1 ? "Book" : "Books"}
          </div>
        </div>
      </div>

      {/* Favourite Books */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {favbook.map((item) => (
          <div
            key={item?._id}
            className="transition duration-300 hover:-translate-y-1"
          >
            <Bookcard
              dataprops={item}
              favourite={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourite;