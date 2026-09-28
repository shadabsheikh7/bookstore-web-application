/** @format */

import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Profile/Sidebar";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import MobileNav from "../components/Profile/MobileNav";
import { FaUser } from "react-icons/fa6";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const headers = {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetchData = async () => {
    try {
      setError("");

      const res = await axios.get(`${API_URL}/api/v1/user-details`, {
        headers,
      });

      setProfile(res.data);
    } catch (error) {
      console.error("Profile error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load your profile. Please try again.",
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Loading
  if (!profile && !error) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#f6f3eb] px-4 py-8">
        <div className="flex min-h-[300px] w-full max-w-7xl items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm">
          <Loader />
        </div>
      </main>
    );
  }

  // Error
  if (error) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#f6f3eb] px-4 py-8">
        <div className="flex min-h-[350px] w-full max-w-2xl flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-6 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-500">
            <FaUser className="text-2xl" />
          </div>

          <h2 className="text-2xl font-bold text-[#173d2b]">
            Unable to load profile
          </h2>

          <p className="mt-2 text-sm text-red-600">{error}</p>

          <button
            type="button"
            onClick={fetchData}
            className="mt-6 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#f6f3eb] px-2 py-5 sm:px-4 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 md:flex-row">
          {/* Sidebar */}
          <aside className="w-full md:w-64 lg:w-72">
            <div className="hidden md:block">
              <Sidebar data={profile} />
            </div>

            <div className="block md:hidden">
              <MobileNav />
            </div>
          </aside>

          {/* Profile Content */}
          <section className="min-w-0 flex-1">
            <div className="min-h-[calc(100vh-8rem)] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <Outlet />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Profile;