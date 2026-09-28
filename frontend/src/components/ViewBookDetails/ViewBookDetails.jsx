/** @format */

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  FaArrowLeft,
  FaEdit,
  FaHeart,
  FaRegHeart,
  FaShoppingCart,
  FaStar,
  FaTrash,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const API_URL = "http://localhost:8080";

const ViewBookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  // ==========================================
  // FETCH BOOK
  // ==========================================

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${API_URL}/api/v1/get-book-by-id/${id}`,
        );

        console.log("Book API Response:", res.data);

        const bookData = res.data.data || res.data.book || res.data;

        setData(bookData || null);
      } catch (error) {
        console.error("Error fetching book:", error);

        setMessage({
          type: "error",
          text:
            error.response?.data?.message ||
            "Unable to load book details.",
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  // ==========================================
  // AUTO HIDE MESSAGE
  // ==========================================

  useEffect(() => {
    if (!message.text) return;

    const timer = setTimeout(() => {
      setMessage({
        type: "",
        text: "",
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  // ==========================================
  // HEADERS
  // ==========================================

  const headers = {
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  // ==========================================
  // PRICE
  // ==========================================

  const price = Number(data?.price || 0);
  const discount = Number(data?.discount || 0);

  const originalPrice =
    discount > 0
      ? Math.round(price / (1 - discount / 100))
      : price;

  const stock =
    data?.stock !== undefined ? Number(data.stock) : null;

  const isOutOfStock = stock !== null && stock <= 0;

  // ==========================================
  // QUANTITY
  // ==========================================

  const increaseQuantity = () => {
    if (stock !== null && quantity >= stock) {
      return;
    }

    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  // ==========================================
  // FAVOURITE
  // ==========================================

  const handleFavourite = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (role !== "user") {
      setMessage({
        type: "error",
        text: "Only users can add books to favourites.",
      });
      return;
    }

    try {
      setActionLoading(true);

      const response = await axios.put(
        `${API_URL}/api/v1/add-to-fav`,
        {},
        { headers },
      );

      setIsFavourite(true);

      setMessage({
        type: "success",
        text: response.data.message || "Added to favourites ❤️",
      });
    } catch (error) {
      console.error("Favourite error:", error);

      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Unable to add this book to favourites.",
      });
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================
  // ADD TO CART
  // ==========================================

  const handleCart = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (role !== "user") {
      setMessage({
        type: "error",
        text: "Only users can add books to cart.",
      });
      return;
    }

    if (isOutOfStock) {
      setMessage({
        type: "error",
        text: "This book is currently out of stock.",
      });
      return;
    }

    try {
      setActionLoading(true);

      const response = await axios.put(
        `${API_URL}/api/v1/add-to-cart`,
        {},
        { headers },
      );

      setMessage({
        type: "success",
        text: response.data.message || "Book added to cart 🛒",
      });
    } catch (error) {
      console.error("Cart error:", error);

      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Unable to add this book to cart.",
      });
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================
  // BUY NOW
  // ==========================================

  const handleBuyNow = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (role !== "user") {
      setMessage({
        type: "error",
        text: "Only users can purchase books.",
      });
      return;
    }

    if (isOutOfStock) {
      setMessage({
        type: "error",
        text: "This book is currently out of stock.",
      });
      return;
    }

    try {
      setActionLoading(true);

      await axios.put(
        `${API_URL}/api/v1/add-to-cart`,
        {},
        { headers },
      );

      navigate("/cart");
    } catch (error) {
      console.error("Buy now error:", error);

      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Unable to proceed to checkout.",
      });
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================
  // DELETE BOOK
  // ==========================================

  const deleteBook = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setActionLoading(true);

      const res = await axios.delete(
        `${API_URL}/api/v1/delete-book`,
        {
          headers,
        },
      );

      alert(res.data.message || "Book deleted successfully.");

      navigate("/all-books");
    } catch (error) {
      console.error("Delete error:", error);

      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Unable to delete this book.",
      });
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f3eb]">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-green-100 border-t-green-600" />

          <p className="mt-4 font-medium text-gray-600">
            Loading book details...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // BOOK NOT FOUND
  // ==========================================

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f3eb] px-5">
        <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-lg">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-3xl text-red-500">
            !
          </div>

          <h1 className="mt-5 text-2xl font-bold text-[#173d2b]">
            Book Not Found
          </h1>

          <p className="mt-2 text-gray-500">
            Sorry, we couldn't find the book you're looking for.
          </p>

          <button
            type="button"
            onClick={() => navigate("/all-books")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            <FaArrowLeft />
            Back to Books
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // MAIN UI
  // ==========================================

  return (
    <div className="min-h-screen bg-[#f6f3eb]">
      {/* Toast */}
      {message.text && (
        <div
          className={`fixed right-5 top-5 z-50 max-w-sm rounded-xl px-5 py-4 font-medium text-white shadow-2xl ${
            message.type === "success"
              ? "bg-green-600"
              : "bg-red-600"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-5 pt-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link
            to="/"
            className="transition hover:text-green-700"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            to="/all-books"
            className="transition hover:text-green-700"
          >
            Books
          </Link>

          <span>/</span>

          <span className="truncate font-medium text-gray-800">
            {data.title}
          </span>
        </div>
      </div>

      {/* Main Product */}
      <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-12">
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-2">
            {/* IMAGE */}
            <div className="relative flex min-h-[450px] items-center justify-center bg-[#f1eee4] p-8 lg:min-h-[620px] lg:p-12">
              {/* Wishlist */}
              {role === "user" && (
                <button
                  type="button"
                  onClick={handleFavourite}
                  disabled={actionLoading}
                  className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl text-red-500 shadow-md transition hover:scale-110 disabled:opacity-50"
                  title="Add to favourites"
                >
                  {isFavourite ? <FaHeart /> : <FaRegHeart />}
                </button>
              )}

              {!imageError ? (
                <img
                  src={data.url}
                  alt={data.title}
                  onError={() => setImageError(true)}
                  className="max-h-[520px] max-w-full object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <div className="flex h-80 w-64 flex-col items-center justify-center rounded-2xl bg-gray-200 text-gray-400">
                  <span className="text-5xl">📚</span>

                  <span className="mt-3">
                    Image unavailable
                  </span>
                </div>
              )}
            </div>

            {/* DETAILS */}
            <div className="flex flex-col p-7 lg:p-12">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-green-700">
                  Book
                </span>

                {discount > 0 && (
                  <span className="inline-flex rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600">
                    {discount}% OFF
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="mt-5 text-3xl font-extrabold leading-tight text-[#173d2b] lg:text-5xl">
                {data.title}
              </h1>

              {/* Author */}
              <p className="mt-3 text-lg text-gray-500">
                Written by{" "}
                <span className="font-semibold text-gray-800">
                  {data.author}
                </span>
              </p>

              {/* Rating */}
              <div className="mt-5 flex items-center gap-3">
                <div className="flex gap-1 text-yellow-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} />
                  ))}
                </div>

                <span className="text-sm font-semibold text-gray-600">
                  5.0
                </span>

                <span className="text-sm text-gray-400">
                  Customer Rating
                </span>
              </div>

              <div className="my-7 h-px bg-gray-200" />

              {/* Description */}
              <div>
                <h2 className="mb-2 text-lg font-bold text-[#173d2b]">
                  About this book
                </h2>

                <p className="text-base leading-7 text-gray-600">
                  {data.desc ||
                    "Discover an amazing reading experience with this book."}
                </p>
              </div>

              {/* Price */}
              <div className="mt-7">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-4xl font-extrabold text-green-700">
                    ₹{price}
                  </span>

                  {discount > 0 && (
                    <span className="text-xl text-gray-400 line-through">
                      ₹{originalPrice}
                    </span>
                  )}

                  {discount > 0 && (
                    <span className="text-sm font-bold text-green-600">
                      Save ₹{Math.max(originalPrice - price, 0)}
                    </span>
                  )}
                </div>

                <p className="mt-1 text-sm text-gray-400">
                  Inclusive of all applicable taxes
                </p>
              </div>

              {/* Stock */}
              <div className="mt-5">
                {isOutOfStock ? (
                  <div className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 font-semibold text-red-600">
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    Out of Stock
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 font-semibold text-green-700">
                    <span className="h-2 w-2 rounded-full bg-green-500" />

                    {stock !== null
                      ? `In Stock • ${stock} available`
                      : "Available"}
                  </div>
                )}
              </div>

              {/* USER ACTIONS */}
              {role === "user" && (
                <div className="mt-7">
                  {/* Quantity */}
                  {!isOutOfStock && (
                    <div className="mb-5 flex items-center gap-4">
                      <span className="font-semibold text-gray-700">
                        Quantity:
                      </span>

                      <div className="flex items-center overflow-hidden rounded-xl border border-gray-300 bg-white">
                        <button
                          type="button"
                          onClick={decreaseQuantity}
                          className="h-11 w-11 font-bold text-xl text-gray-700 transition hover:bg-gray-100"
                        >
                          −
                        </button>

                        <span className="w-12 text-center font-bold text-gray-800">
                          {quantity}
                        </span>

                        <button
                          type="button"
                          onClick={increaseQuantity}
                          className="h-11 w-11 font-bold text-xl text-gray-700 transition hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleCart}
                      disabled={actionLoading || isOutOfStock}
                      className="flex flex-1 items-center justify-center gap-3 rounded-xl bg-green-600 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-green-100 transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <FaShoppingCart />

                      {actionLoading
                        ? "Please wait..."
                        : "Add to Cart"}
                    </button>

                    <button
                      type="button"
                      onClick={handleBuyNow}
                      disabled={actionLoading || isOutOfStock}
                      className="flex-1 rounded-xl border border-green-600 bg-white px-6 py-4 text-lg font-bold text-green-700 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              )}

              {/* ADMIN */}
              {role === "admin" && (
                <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <p className="mb-4 font-bold text-[#173d2b]">
                    Admin Controls
                  </p>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                      to={`/update-book/${id}`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                      <FaEdit />
                      Edit Book
                    </Link>

                    <button
                      type="button"
                      onClick={deleteBook}
                      disabled={actionLoading}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
                    >
                      <FaTrash />
                      Delete Book
                    </button>
                  </div>
                </div>
              )}

              {/* Book Information */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-[#f7f5ef] p-4">
                  <p className="text-xs font-bold uppercase text-gray-400">
                    Language
                  </p>

                  <p className="mt-1 font-semibold text-gray-800">
                    {data.language || "English"}
                  </p>
                </div>

                <div className="rounded-xl bg-[#f7f5ef] p-4">
                  <p className="text-xs font-bold uppercase text-gray-400">
                    Availability
                  </p>

                  <p className="mt-1 font-semibold text-gray-800">
                    {isOutOfStock ? "Unavailable" : "Available"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <section className="mt-8 rounded-3xl border border-gray-200 bg-white p-7 shadow-sm lg:p-10">
          <h2 className="text-2xl font-bold text-[#173d2b]">
            Book Description
          </h2>

          <div className="mb-5 mt-3 h-1 w-14 rounded-full bg-green-600" />

          <p className="leading-8 text-gray-600">
            {data.desc || "No description is available for this book."}
          </p>
        </section>

        {/* Back */}
        <div className="mt-8">
          <button
            type="button"
            onClick={() => navigate("/all-books")}
            className="inline-flex items-center gap-2 font-semibold text-gray-600 transition hover:text-green-700"
          >
            <FaArrowLeft />
            Back to all books
          </button>
        </div>
      </main>
    </div>
  );
};

export default ViewBookDetails;