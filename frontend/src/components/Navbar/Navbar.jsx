import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImMenu } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Admin Profile",
      link: "/profile",
    },
  ];
  let dispatch = useDispatch();
  const history = useNavigate();

  const [mobile, setMobile] = useState("hidden");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  if (isLoggedIn === false) {
    links.splice(2, 3);
  }
  if (isLoggedIn === true && role === "user") {
    links.splice(4, 1);
  }
  if (isLoggedIn === true && role === "admin") {
    links.splice(2, 2);
  }
  return (
    <>
      <nav className=" relative z-30 bg-slate-400 px-8 py-4 flex items-center justify-between">
        {/* for logo div left side */}
        <div>
          <h4 className="text-2xl font-semibold">BookStore</h4>
        </div>
        {/* for right side navbar links  */}
        <div className="block md:flex justify-between items-center gap-4">
          {/* links  */}
          <div className=" hidden md:flex gap-4 ">
            {links.map((item, i) => (
              <div className="flex items-center" key={i}>
                <Link
                  className="px-4 py-1 border border-blue-500 rounded"
                  to={item.link}
                >
                  {item.title}
                </Link>
              </div>
            ))}
          </div>
          {/* buttons */}
          {isLoggedIn === false ? (
            <div className=" hidden md:flex justify-between gap-4 items-center">
              <Link
                to="/sign-up"
                className="bg-slate-400 border-2  hover:bg-white border-orange-500  rounded px-3 py-1"
              >
                Sign-Up
              </Link>
              <Link
                to="/login"
                className="bg-orange-500 px-3 hover:bg-white py-1 rounded"
              >
                Login
              </Link>
            </div>
          ) : (
            <button
              onClick={() => {
                dispatch(authActions.logout());
                dispatch(authActions.changerole("user"));
                localStorage.clear("id");
                localStorage.clear("token");
                localStorage.clear("role");
                history("/");
              }}
            >
              Log Out
            </button>
          )}

          <button
            className="block text-white md:hidden text-2xl"
            onClick={() =>
              mobile === "hidden" ? setMobile("block") : setMobile("hidden")
            }
          >
            <ImMenu />
          </button>
        </div>
      </nav>

      {/* mobile nav bar  */}

      <div
        className={`${mobile} bg-green-500 h-screen w-full absolute z-20 flex flex-col items-center justify-start gap-8 py-10`}
      >
        <div className="  flex flex-col gap-8 items-center justify-between">
          {links.map((item, i) => (
            <Link
              to={item.link}
              key={i}
              className="text-4xl px-6 py-2 font-semibold "
              onClick={() =>
                mobile === "hidden" ? setMobile("block") : setMobile("hidden")
              }
            >
              {" "}
              {item.title}
            </Link>
          ))}
        </div>
        {/* https://www.youtube.com/watch?v=EwzWg-Joxq0 */}
        <div className=" flex flex-col justify-between gap-8 items-center w-full text-center">
          {isLoggedIn === false && (
            <>
              <Link
                to="/sign-up"
                className="text-4xl px-6 py-2 w-[80%]  font-semibold  rounded hover:bg-red-700 hover:text-black "
                onClick={() =>
                  mobile === "hidden" ? setMobile("block") : setMobile("hidden")
                }
              >
                Sign-Up
              </Link>
              <Link
                to="/login"
                className="text-4xl px-6 py-2 w-[80%] font-semibold border-2 rounded border-yellow-400 "
                onClick={() =>
                  mobile === "hidden" ? setMobile("block") : setMobile("hidden")
                }
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
