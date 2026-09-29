/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaArrowRight, FaBookOpen } from "react-icons/fa";
import Bookcard from "../bookcard/Bookcard";
import Loader from "../Loader/Loader";

const RecentlyAdded = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(`${API_URL}/api/v1/get-recent-books`);

      setData(res.data?.data || []);
    } catch (error) {
      console.error("Recently added books error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load recently added books.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="bg-[#f6f3eb] px-4 py-14 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-green-600">
              <FaBookOpen />
              <span className="text-sm font-semibold uppercase tracking-wider">
                New Arrivals
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-[#173d2b] sm:text-4xl">
              Recently Added Books
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
              Explore the latest books added to our collection and discover
              something new to read.
            </p>
          </div>

          <Link
            to="/all-books"
            className="group flex w-fit items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-green-400 hover:bg-green-50 hover:text-green-700"
          >
            View All Books
            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[250px] items-center justify-center rounded-2xl border border-gray-200 bg-white">
            <Loader />
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex min-h-[250px] flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-6 text-center">
            <p className="mb-4 text-sm text-red-600">{error}</p>

            <button
              type="button"
              onClick={fetchData}
              className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Books */}
        {!loading && !error && data.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.map((book) => (
              <div
                key={book._id}
                className="transition duration-300 hover:-translate-y-1"
              >
                <Bookcard dataprops={book} />
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && data.length === 0 && (
          <div className="flex min-h-[250px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600">
              <FaBookOpen className="text-xl" />
            </div>

            <h3 className="text-lg font-semibold text-gray-800">
              No recently added books
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              New books will appear here when they are added.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentlyAdded;