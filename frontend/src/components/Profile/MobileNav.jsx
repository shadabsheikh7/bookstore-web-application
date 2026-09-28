/** @format */

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaHeart,
  FaClipboardList,
  FaGear,
  FaBoxOpen,
  FaPlus,
} from "react-icons/fa6";

const MobileNav = () => {
  const role = useSelector((state) => state.auth.role);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-full lg:hidden">
      {/* User Navigation */}
      {role === "user" && (
        <div className="grid grid-cols-3 gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm">
          <Link
            to="/profile"
            className={`flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-3 text-center transition ${
              isActive("/profile")
                ? "bg-green-50 text-green-700"
                : "text-gray-500 hover:bg-gray-50 hover:text-green-600"
            }`}
          >
            <FaHeart className="text-lg" />
            <span className="text-[11px] font-semibold">Favourite</span>
          </Link>

          <Link
            to="/profile/orderHistory"
            className={`flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-3 text-center transition ${
              isActive("/profile/orderHistory")
                ? "bg-green-50 text-green-700"
                : "text-gray-500 hover:bg-gray-50 hover:text-green-600"
            }`}
          >
            <FaClipboardList className="text-lg" />
            <span className="text-[11px] font-semibold">Orders</span>
          </Link>

          <Link
            to="/profile/settings"
            className={`flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-3 text-center transition ${
              isActive("/profile/settings")
                ? "bg-green-50 text-green-700"
                : "text-gray-500 hover:bg-gray-50 hover:text-green-600"
            }`}
          >
            <FaGear className="text-lg" />
            <span className="text-[11px] font-semibold">Settings</span>
          </Link>
        </div>
      )}

      {/* Admin Navigation */}
      {role === "admin" && (
        <div className="grid grid-cols-2 gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm">
          <Link
            to="/profile"
            className={`flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition ${
              isActive("/profile")
                ? "bg-green-50 text-green-700"
                : "text-gray-500 hover:bg-gray-50 hover:text-green-600"
            }`}
          >
            <FaBoxOpen />
            All Orders
          </Link>

          <Link
            to="/profile/add-book"
            className={`flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition ${
              isActive("/profile/add-book")
                ? "bg-green-50 text-green-700"
                : "text-gray-500 hover:bg-gray-50 hover:text-green-600"
            }`}
          >
            <FaPlus />
            Add Book
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileNav;