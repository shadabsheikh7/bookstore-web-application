/** @format */

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaBookOpen,
  FaCartShopping,
  FaMinus,
  FaPlus,
  FaTrash,
} from "react-icons/fa6";

const API = import.meta.env.VITE_API_URL;

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState("");

  const getHeaders = () => ({
    id: localStorage.getItem("id"),
    authorization: localStorage.getItem("token"),
  });

  const getCart = async () => {
    try {
      setLoading(true);
      setError("");

      if (!API) {
        throw new Error("VITE_API_URL is not configured.");
      }

      const response = await axios.get(`${API}/api/v1/get-cart-item`, {
        headers: getHeaders(),
      });

      setCartItems(response.data.data || []);
    } catch (error) {
      console.error("GET CART ERROR:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Unable to load your cart. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const increaseQuantity = async (bookId) => {
    try {
      setUpdating(bookId);

      if (!API) {
        throw new Error("VITE_API_URL is not configured.");
      }

      await axios.put(
        `${API}/api/v1/increase-cart/${bookId}`,
        {},
        {
          headers: getHeaders(),
        },
      );

      await getCart();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.message ||
          "Unable to increase quantity.",
      );
    } finally {
      setUpdating("");
    }
  };

  const decreaseQuantity = async (bookId) => {
    try {
      setUpdating(bookId);

      if (!API) {
        throw new Error("VITE_API_URL is not configured.");
      }

      await axios.put(
        `${API}/api/v1/decrease-cart/${bookId}`,
        {},
        {
          headers: getHeaders(),
        },
      );

      await getCart();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.message ||
          "Unable to decrease quantity.",
      );
    } finally {
      setUpdating("");
    }
  };

  const removeItem = async (bookId) => {
    try {
      setUpdating(bookId);

      if (!API) {
        throw new Error("VITE_API_URL is not configured.");
      }

      await axios.put(
        `${API}/api/v1/rem-from-cart/${bookId}`,
        {},
        {
          headers: getHeaders(),
        },
      );

      await getCart();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.message ||
          "Unable to remove book.",
      );
    } finally {
      setUpdating("");
    }
  };

  const total = cartItems.reduce((sum, item) => {
    const book = item.book;

    if (!book) return sum;

    return sum + Number(book.price || 0) * Number(item.quantity || 1);
  }, 0);

  const totalBooks = cartItems.reduce(
    (sum, item) => sum + Number(item.quantity || 1),
    0,
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f3eb] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f6f3eb] flex items-center justify-center px-4">
        <div className="bg-white border border-red-200 rounded-2xl p-8 text-center max-w-md">
          <FaCartShopping className="text-4xl text-red-400 mx-auto mb-4" />

          <h2 className="text-2xl font-bold text-[#173d2b] mb-2">
            Unable to load cart
          </h2>

          <p className="text-red-500 mb-5">{error}</p>

          <button
            onClick={getCart}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f6f3eb] px-4 py-12">
        <div className="max-w-5xl mx-auto text-center">
          <FaCartShopping className="text-6xl text-green-300 mx-auto mb-5" />

          <h1 className="text-3xl font-bold text-[#173d2b]">
            Your Cart is Empty
          </h1>

          <p className="text-gray-500 mt-2 mb-6">
            Add some books to your cart.
          </p>

          <button
            onClick={() => navigate("/all-books")}
            className="bg-green-600 hover:bg-green-700 text-white px-7 py-3 rounded-xl font-semibold"
          >
            Browse Books
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f3eb] px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-green-700 mb-5"
        >
          <FaArrowLeft />
          Continue Shopping
        </button>

        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-green-600 font-semibold mb-2">
              🛒 SHOPPING CART
            </p>

            <h1 className="text-4xl font-bold text-[#173d2b]">
              Your Cart
            </h1>

            <p className="text-gray-500 mt-2">
              Review your selected books before placing your order.
            </p>
          </div>

          <div className="bg-green-50 text-green-700 px-5 py-3 rounded-full font-semibold">
            🛒 {totalBooks} {totalBooks === 1 ? "Book" : "Books"}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-7">
          {/* CART */}

          <div className="space-y-5">
            {cartItems.map((item) => {
              const book = item.book;

              if (!book) return null;

              const bookId = book._id;
              const quantity = Number(item.quantity || 1);
              const price = Number(book.price || 0);
              const itemTotal = price * quantity;

              return (
                <div
                  key={bookId}
                  className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row gap-5">
                    {/* IMAGE */}

                    <div className="w-full sm:w-32 h-44 bg-[#f6f3eb] rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0">
                      {book.url ? (
                        <img
                          src={book.url}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FaBookOpen className="text-5xl text-green-300" />
                      )}
                    </div>

                    {/* DETAILS */}

                    <div className="flex-1">
                      <div className="flex justify-between gap-4">
                        <div>
                          <h2 className="text-xl font-bold text-[#173d2b]">
                            {book.title}
                          </h2>

                          <p className="text-gray-500 mt-1">
                            By {book.author}
                          </p>
                        </div>

                        <div className="text-lg font-bold text-green-600">
                          ₹{itemTotal.toLocaleString("en-IN")}
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap items-center gap-6">
                        {/* PRICE */}

                        <div>
                          <p className="text-sm text-gray-400">
                            Price per book
                          </p>

                          <p className="text-lg font-bold text-green-600">
                            ₹{price.toLocaleString("en-IN")}
                          </p>
                        </div>

                        {/* QUANTITY */}

                        <div>
                          <p className="text-sm text-gray-400 mb-2">
                            Quantity
                          </p>

                          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                            <button
                              disabled={updating === bookId}
                              onClick={() => decreaseQuantity(bookId)}
                              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                            >
                              <FaMinus className="text-xs" />
                            </button>

                            <span className="w-12 h-10 flex items-center justify-center font-bold border-x border-gray-200">
                              {quantity}
                            </span>

                            <button
                              disabled={updating === bookId}
                              onClick={() => increaseQuantity(bookId)}
                              className="w-10 h-10 flex items-center justify-center text-green-600 hover:bg-green-50 disabled:opacity-50"
                            >
                              <FaPlus className="text-xs" />
                            </button>
                          </div>
                        </div>

                        {/* REMOVE */}

                        <button
                          disabled={updating === bookId}
                          onClick={() => removeItem(bookId)}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 disabled:opacity-50"
                        >
                          <FaTrash />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* SUMMARY */}

          <div className="h-fit bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-[#173d2b]">
                Order Summary
              </h2>

              <p className="text-gray-500 mt-1">
                Your selected books
              </p>
            </div>

            <div className="p-6">
              <div className="flex justify-between mb-5 text-gray-600">
                <span>Books ({totalBooks})</span>

                <span className="font-semibold text-gray-800">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between mb-5 text-gray-600">
                <span>Delivery</span>

                <span className="text-green-600 font-semibold">
                  Free
                </span>
              </div>

              <div className="border-t border-dashed pt-5">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-[#173d2b]">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-green-600">
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate("/profile/orderHistory")}
                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold"
              >
                🛒 Place Your Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;