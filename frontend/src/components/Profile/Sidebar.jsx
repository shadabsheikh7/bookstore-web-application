/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaHeart,
  FaClipboardList,
  FaGear,
  FaPlus,
  FaBoxOpen,
  FaRightFromBracket,
} from "react-icons/fa6";

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const role = useSelector((state) => state.auth.role);

  const handleLogout = () => {
    dispatch(authActions.logout());
    dispatch(authActions.changerole("user"));

    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm lg:sticky lg:top-24">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          {data?.avtar ? (
            <img
              src={data.avtar}
              alt={data?.username || "User"}
              className="h-24 w-24 rounded-full border-4 border-green-100 bg-[#f5f2e9] object-cover shadow-sm"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-green-100 bg-green-50 text-green-600">
              <FaUser className="text-3xl" />
            </div>
          )}

          <div className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-green-500 text-white">
            <FaUser className="text-[10px]" />
          </div>
        </div>

        <h2 className="mt-3 max-w-full truncate px-2 text-lg font-bold text-[#173d2b]">
          {data?.username || "User"}
        </h2>

        <p className="mt-1 max-w-full truncate px-2 text-xs text-gray-500">
          {data?.email || "No email available"}
        </p>
      </div>

      {/* Divider */}
      <div className="my-5 h-px bg-gray-200" />

      {/* User Menu */}
      {role === "user" && (
        <div className="space-y-2">
          <p className="mb-3 px-2 text-xs font-bold uppercase tracking-wider text-gray-400">
            My Account
          </p>

          <Link
            to="/profile"
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
              isActive("/profile")
                ? "bg-green-50 text-green-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-green-700"
            }`}
          >
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                isActive("/profile")
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              <FaHeart />
            </span>

            <span>Favourite</span>
          </Link>

          <Link
            to="/profile/orderHistory"
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
              isActive("/profile/orderHistory")
                ? "bg-green-50 text-green-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-green-700"
            }`}
          >
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                isActive("/profile/orderHistory")
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              <FaClipboardList />
            </span>

            <span>Order History</span>
          </Link>

          <Link
            to="/profile/settings"
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
              isActive("/profile/settings")
                ? "bg-green-50 text-green-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-green-700"
            }`}
          >
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                isActive("/profile/settings")
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              <FaGear />
            </span>

            <span>Settings</span>
          </Link>
        </div>
      )}

      {/* Admin Menu */}
      {role === "admin" && (
        <div className="space-y-2">
          <p className="mb-3 px-2 text-xs font-bold uppercase tracking-wider text-gray-400">
            Admin Panel
          </p>

          <Link
            to="/profile"
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
              isActive("/profile")
                ? "bg-green-50 text-green-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-green-700"
            }`}
          >
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                isActive("/profile")
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              <FaBoxOpen />
            </span>

            <span>All Orders</span>
          </Link>

          <Link
            to="/profile/add-book"
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
              isActive("/profile/add-book")
                ? "bg-green-50 text-green-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-green-700"
            }`}
          >
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                isActive("/profile/add-book")
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              <FaPlus />
            </span>

            <span>Add Book</span>
          </Link>
        </div>
      )}

      {/* Logout */}
      <div className="mt-6 border-t border-gray-100 pt-5">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-100 hover:text-red-600"
        >
          <FaRightFromBracket />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;