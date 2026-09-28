/** @format */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaIndianRupeeSign,
  FaHeart,
  FaTrash,
  FaStar,
} from "react-icons/fa6";

const Bookcard = ({ dataprops, favourite }) => {
  const [imageError, setImageError] = useState(false);
  const [removing, setRemoving] = useState(false);

  const headers = {
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: dataprops?._id,
  };

  const price = Number(dataprops?.price) || 0;
  const discount = Number(dataprops?.discount) || 0;
  const stock = Number(dataprops?.stock) || 0;

  const discountedPrice =
    discount > 0
      ? Math.round(price - (price * discount) / 100)
      : price;

  const handleremovebook = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setRemoving(true);

      const res = await axios.put(
        "http://localhost:8080/api/v1/rem-from-fav",
        {},
        { headers },
      );

      alert(res.data.message);
      window.location.reload();
    } catch (error) {
      console.error("Remove favourite error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to remove book from favourites.",
      );
    } finally {
      setRemoving(false);
    }
  };

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-xl">
      {/* Favourite Badge */}
      {favourite && (
        <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-pink-50 px-3 py-1.5 text-xs font-semibold text-pink-600 shadow-sm">
          <FaHeart />
          Favourite
        </div>
      )}

      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute right-3 top-3 z-10 rounded-full bg-red-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm">
          {discount}% OFF
        </div>
      )}

      <Link
        to={`/view-book-details/${dataprops?._id}`}
        className="flex h-full flex-col"
      >
        {/* Book Image */}
        <div className="relative flex h-64 items-center justify-center overflow-hidden bg-[#f5f2e9] sm:h-72">
          {!imageError && dataprops?.url ? (
            <img
              src={dataprops.url}
              alt={dataprops?.title || "Book Cover"}
              onError={() => setImageError(true)}
              className="h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <div className="text-center">
                <div className="mb-2 text-5xl">📚</div>

                <p className="text-sm text-gray-400">
                  No Image Available
                </p>
              </div>
            </div>
          )}

          {/* Soft Image Overlay */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/5 to-transparent" />
        </div>

        {/* Book Information */}
        <div className="flex flex-1 flex-col p-5">
          {/* Rating */}
          <div className="mb-2 flex items-center gap-1 text-sm">
            <FaStar className="text-yellow-500" />

            <span className="font-semibold text-gray-700">5.0</span>

            <span className="text-gray-300">•</span>

            <span className="text-gray-400">Book</span>
          </div>

          {/* Title */}
          <h2
            className="line-clamp-2 min-h-[52px] text-lg font-bold text-[#173d2b] transition-colors group-hover:text-green-600"
            title={dataprops?.title}
          >
            {dataprops?.title || "Untitled Book"}
          </h2>

          {/* Author */}
          <p
            className="mt-1 truncate text-sm text-gray-500"
            title={dataprops?.author}
          >
            By {dataprops?.author || "Unknown Author"}
          </p>

          {/* Price */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <div className="flex items-center text-xl font-bold text-green-600">
              <FaIndianRupeeSign className="text-base" />
              {discountedPrice}
            </div>

            {discount > 0 && (
              <div className="flex items-center text-sm text-gray-400 line-through">
                <FaIndianRupeeSign className="text-xs" />
                {price}
              </div>
            )}

            {discount > 0 && (
              <span className="text-xs font-semibold text-green-600">
                Save ₹{price - discountedPrice}
              </span>
            )}
          </div>

          {/* Stock */}
          <div className="mt-3">
            {stock > 0 ? (
              <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-500" />
                In Stock
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
                Out of Stock
              </span>
            )}
          </div>

          {/* View Details */}
          <div className="mt-auto pt-5">
            <div className="rounded-lg border border-gray-200 bg-gray-50 py-2.5 text-center text-sm font-semibold text-gray-700 transition-all duration-300 group-hover:border-green-300 group-hover:bg-green-50 group-hover:text-green-700">
              View Details
            </div>
          </div>
        </div>
      </Link>

      {/* Remove Favourite */}
      {favourite && (
        <div className="border-t border-gray-100 p-3">
          <button
            type="button"
            disabled={removing}
            onClick={handleremovebook}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-50 py-2.5 text-sm font-semibold text-gray-600 transition-all duration-300 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaTrash />

            {removing ? "Removing..." : "Remove from Favourites"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Bookcard;