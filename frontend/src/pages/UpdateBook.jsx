
/** @format */

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [BData, setBData] = useState({
    url: "",
    title: "",
    author: "",
    language: "",
    price: "",
    discount: 0,
    desc: "",
    stock: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // GET BOOK DETAILS
  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);

        if (!API_URL) {
          throw new Error("VITE_API_URL is not configured.");
        }

        const response = await axios.get(
          `${API_URL}/api/v1/get-book-by-id/${id}`,
        );

        console.log("BOOK DATA:", response.data);

        const book = response.data.data;

        if (!book) {
          alert("Book not found");
          navigate("/all-books");
          return;
        }

        setBData({
          url: book.url || "",
          title: book.title || "",
          author: book.author || "",
          language: book.language || "",
          price: book.price ?? "",
          discount: book.discount ?? 0,
          desc: book.desc || "",
          stock: book.stock ?? "",
        });
      } catch (error) {
        console.error("FETCH BOOK ERROR:", error);

        alert(
          error.response?.data?.message ||
            error.message ||
            "Unable to load book details",
        );

        navigate("/all-books");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id, navigate]);

  // INPUT CHANGE
  const change = (e) => {
    const { name, value } = e.target;

    setBData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // SELLING PRICE
  const originalPrice = Number(BData.price || 0);

  const discountPercent = Math.min(
    Math.max(Number(BData.discount || 0), 0),
    100,
  );

  const sellingPrice = Math.round(
    originalPrice * (1 - discountPercent / 100),
  );

  const savings = Math.max(originalPrice - sellingPrice, 0);

  // UPDATE BOOK
  const booksubmit = async () => {
    if (
      !BData.url.trim() ||
      !BData.title.trim() ||
      !BData.author.trim() ||
      !BData.language.trim() ||
      BData.price === "" ||
      !BData.desc.trim() ||
      BData.stock === ""
    ) {
      alert("All fields are required.");
      return;
    }

    if (Number(BData.price) < 0) {
      alert("Price cannot be negative.");
      return;
    }

    if (
      Number(BData.discount) < 0 ||
      Number(BData.discount) > 100
    ) {
      alert("Discount must be between 0 and 100.");
      return;
    }

    if (Number(BData.stock) < 0) {
      alert("Stock cannot be negative.");
      return;
    }

    try {
      setSaving(true);

      if (!API_URL) {
        throw new Error("VITE_API_URL is not configured.");
      }

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${API_URL}/api/v1/update-book`,
        {
          url: BData.url.trim(),
          title: BData.title.trim(),
          author: BData.author.trim(),
          language: BData.language.trim(),
          price: Number(BData.price),
          discount: Number(BData.discount),
          desc: BData.desc.trim(),
          stock: Number(BData.stock),
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
            bookid: id,
          },
        },
      );

      console.log("UPDATE RESPONSE:", response.data);

      alert(
        response.data.message ||
          "Book updated successfully!",
      );

      navigate(`/view-book-details/${id}`);
    } catch (error) {
      console.error("UPDATE BOOK ERROR:", error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Unable to update book.",
      );
    } finally {
      setSaving(false);
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f3eb] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto rounded-full border-4 border-green-100 border-t-green-600 animate-spin"></div>

          <p className="mt-4 text-gray-600 font-medium">
            Loading book details...
          </p>
        </div>
      </div>
    );
  }

  // FORM
  return (
    <div className="min-h-screen bg-[#f6f3eb] px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* BACK BUTTON */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 text-gray-600 hover:text-green-700 font-semibold"
        >
          ← Back
        </button>

        {/* MAIN CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          {/* HEADER */}
          <div className="bg-[#173d2b] px-6 py-6 text-white">
            <h1 className="text-3xl font-bold">
              Edit Book
            </h1>

            <p className="mt-1 text-green-100">
              Update book information, price and discount
            </p>
          </div>

          {/* FORM */}
          <div className="p-6 md:p-8 space-y-6">
            {/* IMAGE URL */}
            <div>
              <label className="block mb-2 font-semibold text-[#173d2b]">
                Image URL
              </label>

              <input
                type="text"
                name="url"
                value={BData.url}
                onChange={change}
                placeholder="Enter image URL"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* TITLE */}
            <div>
              <label className="block mb-2 font-semibold text-[#173d2b]">
                Book Title
              </label>

              <input
                type="text"
                name="title"
                value={BData.title}
                onChange={change}
                placeholder="Enter book title"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* AUTHOR */}
            <div>
              <label className="block mb-2 font-semibold text-[#173d2b]">
                Author
              </label>

              <input
                type="text"
                name="author"
                value={BData.author}
                onChange={change}
                placeholder="Enter author name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* LANGUAGE */}
            <div>
              <label className="block mb-2 font-semibold text-[#173d2b]">
                Language
              </label>

              <input
                type="text"
                name="language"
                value={BData.language}
                onChange={change}
                placeholder="English / Hindi"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* PRICE / DISCOUNT / STOCK */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* ORIGINAL PRICE */}
              <div>
                <label className="block mb-2 font-semibold text-[#173d2b]">
                  Original Price (₹)
                </label>

                <input
                  type="number"
                  min="0"
                  name="price"
                  value={BData.price}
                  onChange={change}
                  placeholder="500"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </div>

              {/* DISCOUNT */}
              <div>
                <label className="block mb-2 font-semibold text-[#173d2b]">
                  Discount (%)
                </label>

                <input
                  type="number"
                  min="0"
                  max="100"
                  name="discount"
                  value={BData.discount}
                  onChange={change}
                  placeholder="20"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />

                <p className="mt-2 text-sm text-green-600 font-semibold">
                  You save: ₹{savings}
                </p>
              </div>

              {/* STOCK */}
              <div>
                <label className="block mb-2 font-semibold text-[#173d2b]">
                  Stock
                </label>

                <input
                  type="number"
                  min="0"
                  name="stock"
                  value={BData.stock}
                  onChange={change}
                  placeholder="20"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </div>
            </div>

            {/* LIVE PRICE PREVIEW */}
            <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
              <p className="text-sm font-semibold text-gray-500">
                Customer will pay
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <span className="text-3xl font-extrabold text-green-700">
                  ₹{sellingPrice}
                </span>

                {discountPercent > 0 && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      ₹{originalPrice}
                    </span>

                    <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-bold text-red-600">
                      {discountPercent}% OFF
                    </span>
                  </>
                )}
              </div>

              <p className="mt-2 text-sm text-gray-600">
                Original Price ₹{originalPrice} −{" "}
                {discountPercent}% Discount = ₹
                {sellingPrice}
              </p>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block mb-2 font-semibold text-[#173d2b]">
                Description
              </label>

              <textarea
                name="desc"
                value={BData.desc}
                onChange={change}
                rows={7}
                placeholder="Enter book description"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-7 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={booksubmit}
                disabled={saving}
                className="px-8 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 disabled:opacity-60"
              >
                {saving ? "Updating..." : "Update Book"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBook;