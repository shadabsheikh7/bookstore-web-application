/** @format */

import library from "../../assets/library2.png";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaBookOpen,
  FaStar,
  FaSearch,
} from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#f6f3eb]">
      {/* Soft Background Decoration */}
      <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-green-200/40 blur-3xl" />
      <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-yellow-100/50 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center gap-8 px-5 py-12 sm:px-8 lg:flex-row lg:px-10 lg:py-14">
        {/* LEFT CONTENT */}
        <div className="flex w-full flex-col justify-center lg:w-1/2">
          {/* Badge */}
          <div className="mb-5 flex w-fit items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
            <FaBookOpen />
            Discover Your Next Great Read
          </div>

          {/* Heading */}
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-[#173d2b] sm:text-5xl lg:text-6xl">
            Books that inspire.
            <span className="block text-green-600">
              Stories that stay.
            </span>
          </h1>

          {/* Quote */}
          <div className="mt-6 max-w-2xl border-l-4 border-green-500 pl-5">
            <p className="text-lg italic leading-relaxed text-gray-700 sm:text-xl">
              "A room without books is like a body without a soul."
            </p>

            <p className="mt-2 text-sm font-semibold text-gray-500">
              — Marcus Tullius Cicero
            </p>
          </div>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
            Explore our collection of books, discover new stories, learn
            something valuable, and find the perfect book for your next
            journey.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/all-books"
              className="group flex items-center justify-center gap-3 rounded-xl bg-green-600 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-green-600/20 transition-all duration-300 hover:bg-green-700"
            >
              <FaSearch />
              Explore Books
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              to="/all-books"
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-7 py-3.5 text-base font-semibold text-gray-700 transition-all duration-300 hover:border-green-400 hover:bg-green-50 hover:text-green-700"
            >
              <FaBookOpen />
              View Collection
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-10 grid max-w-lg grid-cols-3 divide-x divide-gray-200 border-y border-gray-200 py-5">
            <div className="px-3">
              <h3 className="text-xl font-bold text-[#173d2b]">100+</h3>
              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Books
              </p>
            </div>

            <div className="px-3">
              <h3 className="text-xl font-bold text-[#173d2b]">50+</h3>
              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Authors
              </p>
            </div>

            <div className="px-3">
              <div className="flex items-center gap-1">
                <h3 className="text-xl font-bold text-[#173d2b]">4.8</h3>
                <FaStar className="text-sm text-yellow-500" />
              </div>

              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Reader Rating
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex w-full items-center justify-center lg:w-1/2">
          {/* Image Background */}
          <div className="absolute h-72 w-72 rounded-full bg-green-100 blur-3xl sm:h-96 sm:w-96" />

          <div className="relative flex w-full max-w-xl items-center justify-center rounded-3xl bg-white/50 p-5 shadow-sm">
            <img
              src={library}
              alt="BookStore Library"
              className="relative z-10 w-full max-w-lg object-contain transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>

          {/* Floating Card */}
          <div className="absolute bottom-0 left-0 z-20 hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-xl sm:block lg:left-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600">
                <FaBookOpen />
              </div>

              <div>
                <p className="text-xs text-gray-500">Your next</p>
                <p className="text-sm font-bold text-gray-800">
                  favorite book awaits
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;