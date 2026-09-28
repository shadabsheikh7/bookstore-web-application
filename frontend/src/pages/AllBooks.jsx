/** @format */

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { FaSearch, FaBookOpen, FaTimes } from "react-icons/fa";
import Loader from "../components/Loader/Loader";
import Bookcard from "../components/bookcard/Bookcard";

const AllBooks = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "http://localhost:8080";

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(`${API_URL}/api/v1/get-all-books`);

      setData(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching books:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load books. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const filteredBooks = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) {
      return data;
    }

    return data.filter((book) => {
      const title = book?.title?.toLowerCase() || "";
      const author = book?.author?.toLowerCase() || "";
      const category = book?.category?.toLowerCase() || "";

      return (
        title.includes(search) ||
        author.includes(search) ||
        category.includes(search)
      );
    });
  }, [data, searchTerm]);

  return (
    <main className="min-h-screen bg-[#f6f3eb] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* ================= HEADER ================= */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600">
              <FaBookOpen className="text-2xl" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-[#173d2b] sm:text-4xl">
            Explore Our Books
          </h1>

          <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">
            Discover your next favorite book from our collection.
          </p>
        </div>

        {/* ================= SEARCH ================= */}
        <div className="mb-10 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mx-auto max-w-3xl">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Search by title, author or category..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-12 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100 sm:text-base"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-red-500"
                  aria-label="Clear search"
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ================= LOADING ================= */}
        {loading && (
          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-gray-200 bg-white">
            <Loader />
          </div>
        )}

        {/* ================= ERROR ================= */}
        {!loading && error && (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-6 text-center">
            <p className="mb-4 text-lg font-medium text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchData}
              className="rounded-lg bg-green-600 px-6 py-2.5 font-medium text-white transition hover:bg-green-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* ================= BOOKS ================= */}
        {!loading && !error && data.length > 0 && (
          <>
            {/* Result Information */}
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#173d2b]">
                  All Books
                </h2>

                <p className="text-sm text-gray-500">
                  {searchTerm
                    ? `${filteredBooks.length} result${
                        filteredBooks.length !== 1 ? "s" : ""
                      } found`
                    : `${data.length} book${
                        data.length !== 1 ? "s" : ""
                      } available`}
                </p>
              </div>

              {searchTerm && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="w-fit text-sm font-semibold text-green-600 transition hover:text-green-700"
                >
                  Clear Search
                </button>
              )}
            </div>

            {/* Books Grid */}
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredBooks.map((book) => (
                  <div
                    key={book._id}
                    className="transition duration-300 hover:-translate-y-1"
                  >
                    <Bookcard dataprops={book} />
                  </div>
                ))}
              </div>
            ) : (
              /* No Search Results */
              <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 text-center shadow-sm">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
                  <FaSearch className="text-2xl" />
                </div>

                <h3 className="text-xl font-semibold text-[#173d2b]">
                  No books found
                </h3>

                <p className="mt-2 max-w-md text-sm text-gray-500">
                  We couldn't find any books matching{" "}
                  <span className="font-semibold text-gray-700">
                    "{searchTerm}"
                  </span>
                  .
                </p>

                <button
                  type="button"
                  onClick={clearSearch}
                  className="mt-5 rounded-lg bg-green-600 px-5 py-2.5 font-medium text-white transition hover:bg-green-700"
                >
                  Show All Books
                </button>
              </div>
            )}
          </>
        )}

        {/* ================= EMPTY DATABASE ================= */}
        {!loading && !error && data.length === 0 && (
          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 text-center shadow-sm">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
              <FaBookOpen className="text-2xl" />
            </div>

            <h3 className="text-xl font-semibold text-[#173d2b]">
              No books available
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              There are currently no books in the store.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default AllBooks;