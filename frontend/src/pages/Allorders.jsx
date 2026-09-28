/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaBoxOpen,
  FaIndianRupeeSign,
  FaEye,
  FaClipboardList,
} from "react-icons/fa6";
import SeeUserData from "./SeeUserData.jsx";

const Allorders = () => {
  const [orderdata, setOrderdata] = useState(null);
  const [userDiv, setUserDiv] = useState("hidden");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const headers = {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetchOrderData = async () => {
    try {
      setError("");

      const res = await axios.get(`${API_URL}/api/v1/get-all-order`, {
        headers,
      });

      setOrderdata(res.data?.data || []);
    } catch (error) {
      console.error("Order history error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load order history.",
      );
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "order Placed":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";

      case "cancelled":
        return "bg-red-50 text-red-600 border-red-200";

      case "out of delivery":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "Delivered":
        return "bg-green-50 text-green-700 border-green-200";

      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <>
      <div className="w-full min-h-full bg-[#f6f3eb] p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2 text-green-600">
            <FaClipboardList />
            <span className="text-xs font-bold uppercase tracking-wider">
              Order Management
            </span>
          </div>

          <h1 className="text-2xl font-bold text-[#173d2b] sm:text-3xl">
            All Orders History
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            View and manage all customer orders.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-600">{error}</p>

            <button
              type="button"
              onClick={fetchOrderData}
              className="mt-3 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Loading */}
        {!orderdata && !error && (
          <div className="flex min-h-[250px] items-center justify-center rounded-2xl border border-gray-200 bg-white">
            <div className="text-center">
              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />

              <p className="text-sm text-gray-500">
                Loading orders...
              </p>
            </div>
          </div>
        )}

        {/* Empty */}
        {orderdata && orderdata.length === 0 && (
          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 text-center shadow-sm">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
              <FaBoxOpen className="text-2xl" />
            </div>

            <h2 className="text-xl font-bold text-[#173d2b]">
              No Orders
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              There are currently no orders available.
            </p>
          </div>
        )}

        {/* Desktop / Tablet Orders */}
        {orderdata && orderdata.length > 0 && (
          <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block">
            {/* Table Header */}
            <div className="grid grid-cols-[60px_1.4fr_2fr_110px_180px_70px] items-center gap-3 border-b border-gray-200 bg-gray-50 px-4 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
              <div>Sr.</div>
              <div>Book</div>
              <div>Description</div>
              <div>Price</div>
              <div>Status</div>
              <div className="text-center">
                <FaUser />
              </div>
            </div>

            {/* Orders */}
            {orderdata.map((items, index) => {
              const book = items?.book;
              const status = items?.status || "Unknown";
              const price = Number(book?.price) || 0;

              return (
                <div
                  key={items?._id || index}
                  className="grid grid-cols-[60px_1.4fr_2fr_110px_180px_70px] items-center gap-3 border-b border-gray-100 px-4 py-4 text-sm last:border-b-0 hover:bg-green-50/40"
                >
                  {/* Sr */}
                  <div className="font-semibold text-gray-500">
                    {index + 1}.
                  </div>

                  {/* Book */}
                  <div className="min-w-0">
                    <p
                      className="truncate font-semibold text-[#173d2b]"
                      title={book?.title}
                    >
                      {book?.title || "Unknown Book"}
                    </p>
                  </div>

                  {/* Description */}
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-xs leading-5 text-gray-500">
                      {book?.desc
                        ? `${book.desc.slice(0, 80)}${
                            book.desc.length > 80 ? "..." : ""
                          }`
                        : "No description available."}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="flex items-center font-bold text-green-600">
                    <FaIndianRupeeSign className="mr-1 text-xs" />
                    {price}
                  </div>

                  {/* Status */}
                  <div>
                    <span
                      className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusClass(
                        status,
                      )}`}
                    >
                      {status}
                    </span>

                    <select
                      defaultValue={status}
                      className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs text-gray-600 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    >
                      {[
                        "order Placed",
                        "cancelled",
                        "out of delivery",
                        "Delivered",
                      ].map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* User */}
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        setUserDiv("fixed");
                        setUserData(items?.user);
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600 transition hover:bg-green-100 hover:text-green-700"
                      title="View user"
                    >
                      <FaEye />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Mobile Orders */}
        {orderdata && orderdata.length > 0 && (
          <div className="space-y-4 md:hidden">
            {orderdata.map((items, index) => {
              const book = items?.book;
              const status = items?.status || "Unknown";
              const price = Number(book?.price) || 0;

              return (
                <div
                  key={items?._id || index}
                  className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <span className="text-xs font-semibold text-gray-400">
                        ORDER #{index + 1}
                      </span>

                      <h2 className="mt-1 line-clamp-2 text-lg font-bold text-[#173d2b]">
                        {book?.title || "Unknown Book"}
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setUserDiv("fixed");
                        setUserData(items?.user);
                      }}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600"
                    >
                      <FaEye />
                    </button>
                  </div>

                  <div className="rounded-xl bg-[#f8f7f2] p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Description
                    </p>

                    <p className="mt-1 text-sm leading-5 text-gray-600">
                      {book?.desc
                        ? `${book.desc.slice(0, 100)}${
                            book.desc.length > 100 ? "..." : ""
                          }`
                        : "No description available."}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">Price</p>

                      <p className="mt-1 flex items-center text-xl font-bold text-green-600">
                        <FaIndianRupeeSign className="mr-1 text-sm" />
                        {price}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="mb-1 text-xs text-gray-400">Status</p>

                      <span
                        className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusClass(
                          status,
                        )}`}
                      >
                        {status}
                      </span>
                    </div>
                  </div>

                  <select
                    defaultValue={status}
                    className="mt-4 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-600 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  >
                    {[
                      "order Placed",
                      "cancelled",
                      "out of delivery",
                      "Delivered",
                    ].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* User Details Popup */}
      {userData && (
        <SeeUserData
          userData={userData}
          userDiv={userDiv}
          setUserDiv={setUserDiv}
        />
      )}
    </>
  );
};

export default Allorders;