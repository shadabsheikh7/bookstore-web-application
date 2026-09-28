/** @format */

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ImMenu, ImCross } from "react-icons/im";
import {
  FaBookOpen,
  FaHome,
  FaShoppingCart,
  FaUser,
  FaBook,
  FaUserShield,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobile, setMobile] = useState(false);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  const closeMobileMenu = () => {
    setMobile(false);
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    dispatch(authActions.changerole("user"));

    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    closeMobileMenu();
    navigate("/");
  };

  const links = [
    {
      title: "Home",
      link: "/",
      icon: <FaHome />,
      show: true,
    },
    {
      title: "All Books",
      link: "/all-books",
      icon: <FaBook />,
      show: true,
    },
    {
      title: "Cart",
      link: "/cart",
      icon: <FaShoppingCart />,
      show: isLoggedIn,
    },
    {
      title: "Profile",
      link: "/profile",
      icon: <FaUser />,
      show: isLoggedIn && role === "user",
    },
    {
      title: "Admin Profile",
      link: "/profile",
      icon: <FaUserShield />,
      show: isLoggedIn && role === "admin",
    },
  ];

  const visibleLinks = links.filter((item) => item.show);

  return (
    <>
      {/* ================= MAIN NAVBAR ================= */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white shadow-md shadow-green-600/20">
              <FaBookOpen className="text-xl" />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight text-[#173d2b]">
                Book<span className="text-green-600">Store</span>
              </h1>

              <p className="hidden text-[10px] font-medium uppercase tracking-widest text-gray-400 sm:block">
                Read • Discover • Enjoy
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {visibleLinks.map((item) => {
              const isActive = location.pathname === item.link;

              return (
                <Link
                  key={item.title}
                  to={item.link}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-green-50 text-green-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-green-700"
                  }`}
                >
                  <span className="text-sm">{item.icon}</span>
                  {item.title}
                </Link>
              );
            })}
          </div>

          {/* Desktop Auth */}
          <div className="hidden items-center gap-2 md:flex">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/sign-up"
                  className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-green-400 hover:bg-green-50 hover:text-green-700"
                >
                  <FaUserPlus />
                  Sign Up
                </Link>

                <Link
                  to="/login"
                  className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  <FaSignInAlt />
                  Login
                </Link>
              </>
            ) : (
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
              >
                <FaSignOutAlt />
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobile(!mobile)}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-700 transition hover:bg-green-100 md:hidden"
            aria-label="Toggle menu"
          >
            {mobile ? <ImCross /> : <ImMenu />}
          </button>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      {mobile && (
        <div className="fixed inset-x-0 top-16 z-40 border-b border-gray-200 bg-white shadow-xl md:hidden">
          <div className="max-h-[calc(100vh-4rem)] overflow-y-auto px-4 py-5">
            {/* Mobile Navigation */}
            <div className="space-y-2">
              {visibleLinks.map((item) => {
                const isActive = location.pathname === item.link;

                return (
                  <Link
                    key={item.title}
                    to={item.link}
                    onClick={closeMobileMenu}
                    className={`flex items-center gap-4 rounded-xl px-4 py-3.5 text-base font-semibold transition ${
                      isActive
                        ? "bg-green-50 text-green-700"
                        : "text-gray-600 hover:bg-gray-100 hover:text-green-700"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.title}
                  </Link>
                );
              })}
            </div>

            {/* Divider */}
            <div className="my-5 h-px bg-gray-200" />

            {/* Mobile Auth */}
            {!isLoggedIn ? (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/sign-up"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  <FaUserPlus />
                  Sign Up
                </Link>

                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  <FaSignInAlt />
                  Login
                </Link>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-100"
              >
                <FaSignOutAlt />
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;