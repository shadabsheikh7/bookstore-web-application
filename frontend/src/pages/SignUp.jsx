/** @format */

import axios from "axios";
import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [showp, setShowp] = useState(false);
  const [showp2, setShowp2] = useState(false);

  const [data, setData] = useState({
    username: "",
    email: "",
    address: "",
    password: "",
  });

  function handleonchange(e) {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  async function handlesubmit(e) {
    e.preventDefault();
    await postdata();
  }

  const navigate = useNavigate();

  // * STORE THE DATA IN THE DATABASE
  const postdata = async () => {
    try {
      if (
        data.username === "" ||
        data.address === "" ||
        data.email === "" ||
        data.password === ""
      ) {
        alert("all fields are required ");
        return;
      }

      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/api/v1/sign-up",
        data,
      );
      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Error: " + error.message);
      }
    }
  };

  return (
    <section className="bg-lime-800 h-screen py-8">
      <div className="container mx-auto p-5  ">
        <div className="w-full max-w-md bg-gray-300 mx-auto p-4 border-2 rounded ">
          <h1 className="grid place-items-center mb-5 text-3xl font-semibold ">
            SignUp
          </h1>
          <form
            action=""
            onSubmit={handlesubmit}
            className="flex flex-col gap-2"
          >
            <div className="grid ">
              <label htmlFor="username">Name:</label>
              <div className="bg-slate-200 p-2 rounded-sm">
                <input
                  type="text"
                  name="username"
                  placeholder="enter your name"
                  onChange={handleonchange}
                  value={data.username}
                  className="w-full outline-none h-full bg-transparent"
                />
              </div>
            </div>

            <div className="grid  ">
              <label htmlFor="email">Email:</label>
              <div className="bg-slate-200 p-2 rounded-sm">
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
            <div className="grid  ">
              <label htmlFor="address">Address</label>
              <div className="bg-slate-200 p-2 rounded-sm">
                <input
                  type="text"
                  name="address"
                  placeholder="la  "
                  onChange={handleonchange}
                  value={data.address}
                  className="w-full outline-none h-full bg-transparent"
                />
              </div>
            </div>
            <div className="grid ">
              <label htmlFor="password">Create Password:</label>
              <div className="bg-slate-200 p-2 flex items-center rounded-sm   ">
                <input
                  type={showp ? "password" : "text"}
                  name="password"
                  placeholder="************"
                  onChange={handleonchange}
                  value={data.password}
                  className="w-full outline-none h-full  bg-transparent "
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setShowp(!showp)}
                >
                  <span> {showp ? <FaRegEyeSlash /> : <FaRegEye />}</span>
                </div>
              </div>
            </div>

            <button className="w-full max-w-[150px] rounded-md bg-red-600 text-white py-2 block mx-auto mt-5 hover:bg-red-700 hover:scale-110 hover:transition-all">
              SignUp
            </button>
          </form>
          <p className="  py-5">
            Already have an account ?
            <Link
              to={"/login"}
              className="hover:underline text-lg ms-3 hover:text-red-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
