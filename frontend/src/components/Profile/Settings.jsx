/** @format */

import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaLocationDot,
  FaGear,
  FaPenToSquare,
} from "react-icons/fa6";
import Loader from "../Loader/Loader";

const Settings = () => {
  const [userdata, setUserData] = useState(null);
  const [address, setAddress] = useState({ address: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const headers = {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(`${API_URL}/api/v1/user-details`, {
        headers,
      });

      setUserData(res.data);

      setAddress({
        address: res.data?.address || "",
      });
    } catch (error) {
      console.error("User details error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        window.location.href = "/login";
        return;
      }

      setError(
        error.response?.data?.message ||
          "Unable to load your settings.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const submitAddress = async () => {
    if (!address.address.trim()) {
      alert("Please enter your address.");
      return;
    }

    try {
      setSaving(true);

      const response = await axios.put(
        `${API_URL}/api/v1/update-address`,
        {
          address: address.address.trim(),
        },
        { headers },
      );

      alert(response.data?.message || "Address updated successfully.");

      await fetchUserData();
    } catch (error) {
      console.error("Update address error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to update your address.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center bg-[#f6f3eb]">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center bg-[#f6f3eb] px-6 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
          <FaGear className="text-2xl" />
        </div>

        <h2 className="text-2xl font-bold text-[#173d2b]">
          Unable to load settings
        </h2>

        <p className="mt-2 max-w-md text-sm text-red-600">
          {error}
        </p>

        <button
          type="button"
          onClick={fetchUserData}
          className="mt-5 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#f6f3eb] px-4 py-6 sm:px-6">
      {/* Header */}
      <div className="mb-7">
        <div className="mb-2 flex items-center gap-2 text-green-600">
          <FaGear />
          <span className="text-xs font-bold uppercase tracking-wider">
            Account Settings
          </span>
        </div>

        <h1 className="text-2xl font-bold text-[#173d2b] sm:text-3xl">
          Settings
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your account information and delivery address.
        </p>
      </div>

      {/* Account Information */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-[#173d2b]">
            <FaUser className="text-green-600" />
            Account Information
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Your account details are shown below.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 sm:p-6">
          {/* Username */}
          <div className="rounded-xl border border-gray-100 bg-[#faf9f5] p-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gray-400">
              <FaUser />
              Username
            </div>

            <p className="break-words text-sm font-semibold text-gray-800">
              {userdata?.username || "Not available"}
            </p>
          </div>

          {/* Email */}
          <div className="rounded-xl border border-gray-100 bg-[#faf9f5] p-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gray-400">
              <FaEnvelope />
              Email
            </div>

            <p className="break-all text-sm font-semibold text-gray-800">
              {userdata?.email || "Not available"}
            </p>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-[#173d2b]">
            <FaLocationDot className="text-green-600" />
            Delivery Address
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Update the address where you want your books delivered.
          </p>
        </div>

        <div className="p-5 sm:p-6">
          <label
            htmlFor="address"
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700"
          >
            <FaPenToSquare className="text-green-600" />
            Address
          </label>

          <textarea
            id="address"
            name="address"
            rows={5}
            value={address.address}
            placeholder="Enter your complete delivery address..."
            onChange={change}
            className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100"
          />

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={submitAddress}
              disabled={saving}
              className="rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Updating..." : "Update Address"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;