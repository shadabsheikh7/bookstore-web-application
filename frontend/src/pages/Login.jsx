/** @format */

import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;
const Login = () => {
  const [showp, setShowp] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  function handleonchange(e) {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  }

  function setNormalUser() {
    setData({
      email: "user@gmail.com",
      password: "user",
    });
  }
  function setAdmin() {
    setData({
      email: "alpha@gmail.com",
      password: "alpha",
    });
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handlesubmit(e) {
    e.preventDefault();
    await postdata();
  }
  // ^ post the login api
  const postdata = async () => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/api/v1/sign-in",
        data,
      );
      console.log(res.data);
      dispatch(authActions.login());
      dispatch(authActions.changerole(res.data.role));

      localStorage.setItem("id", res.data.id);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      navigate("/profile");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Login failed");
        console.log("Error response:", error.response.data);
      } else {
        alert("Error: " + error.message);
        console.log("Error:", error.message);
      }
    }
  };

  return (
    <section className="h-screen bg-lime-800 py-8  ">
      <div className="container mx-auto p-5   grid place-items-center bg-lime-800">
        <div className="w-full max-w-md bg-gray-300 mx-auto p-4 border-2 rounded">
          <h1 className="grid place-items-center mb-5 text-3xl font-semibold ">
            Login
          </h1>
          <p className="bg-red-500 p-1">
            Here are two button just login as you want
          </p>
          <div className="flex justify-evenly mt-2">
            <button
              className=" font-semibold rounded py-0 px-6 text-1xl border bg-blue-400 "
              onClick={() => {
                setNormalUser();
              }}
            >
              User
            </button>
            <button
              className="font-semibold   py-2 px-4 text-1xl border bg-blue-400 rounded"
              onClick={() => {
                setAdmin();
              }}
            >
              Admin
            </button>
          </div>
          <form
            action=""
            onSubmit={handlesubmit}
            className="flex flex-col gap-5"
          >
            <div className="grid  ">
              <label htmlFor="email">Email:</label>
              <div className="bg-slate-200 p-2">
                <input
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  onChange={handleonchange}
                  value={data.email}
                  className="w-full outline-none h-full bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label htmlFor="password">Password:</label>
              <div className="bg-slate-200 p-2 flex items-center ">
                <input
                  type={showp ? "password" : "text"}
                  name="password"
                  placeholder="************"
                  onChange={handleonchange}
                  value={data.password}
                  className="w-full outline-none h-full  bg-transparent"
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setShowp(!showp)}
                >
                  <span> {showp ? <FaRegEyeSlash /> : <FaRegEye />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="hover:underline w-fit ml-auto block mt-2  hover:text-red-500"
              >
                {" "}
                forgot password
              </Link>
            </div>
            <button className="w-full max-w-[150px] rounded-md bg-red-600 text-white py-2 block mx-auto mt-5 hover:bg-red-700 hover:scale-110 hover:transition-all">
              Login
            </button>
          </form>
          <p className="  py-5">
            Don't have an account ?
            <Link
              to={"/sign-up"}
              className="hover:underline text-lg ms-3 hover:text-red-500"
            >
              Sign-Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
