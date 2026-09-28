/** @format */

import React from "react";
import { RxCross1 } from "react-icons/rx";
import {
  FaUser,
  FaEnvelope,
  FaLocationDot,
} from "react-icons/fa6";

const SeeUserData = ({ userData, setUserDiv, userDiv }) => {
  if (!userData) {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`${userDiv} fixed inset-0 z-[100] bg-[#173d2b]/30 backdrop-blur-sm`}
        onClick={() => setUserDiv("hidden")}
      />

      {/* Modal */}
      <div
        className={`${userDiv} fixed inset-0 z-[110] flex items-center justify-center px-4`}
      >
        <div
          className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <FaUser />
              </div>

              <div>
                <h1 className="text-lg font-bold text-[#173d2b]">
                  User Information
                </h1>

                <p className="text-xs text-gray-400">
                  Customer details
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setUserDiv("hidden")}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 text-gray-500 transition hover:bg-red-50 hover:text-red-500"
              aria-label="Close"
            >
              <RxCross1 />
            </button>
          </div>

          {/* User Details */}
          <div className="space-y-3 p-5">
            {/* Username */}
            <div className="flex items-start gap-4 rounded-xl border border-gray-100 bg-[#faf9f5] p-4">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
                <FaUser className="text-sm" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Username
                </p>

                <p className="mt-1 break-words text-sm font-semibold text-gray-800">
                  {userData?.username || "Not available"}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4 rounded-xl border border-gray-100 bg-[#faf9f5] p-4">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
                <FaEnvelope className="text-sm" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Email
                </p>

                <p className="mt-1 break-all text-sm font-semibold text-gray-800">
                  {userData?.email || "Not available"}
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4 rounded-xl border border-gray-100 bg-[#faf9f5] p-4">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
                <FaLocationDot className="text-sm" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Address
                </p>

                <p className="mt-1 break-words text-sm font-semibold leading-6 text-gray-800">
                  {userData?.address || "Not available"}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
            <button
              type="button"
              onClick={() => setUserDiv("hidden")}
              className="w-full rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeeUserData;