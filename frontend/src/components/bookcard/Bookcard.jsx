/** @format */

import React from "react";
import { Link } from "react-router-dom";
import Favourite from "../Profile/Favourite";
import axios from "axios";
import { FaIndianRupeeSign } from "react-icons/fa6";

const Bookcard = ({ dataprops, favourite }) => {
  const headers = {
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: dataprops._id,
  };

  const handleremovebook = async () => {
    const res = await axios.put(
      import.meta.env.VITE_API_URL + "/api/v1/rem-from-fav",
      {},
      { headers },
    );
    alert(res.data.message);
  };

  return (
    <div className="bg-gray-300 p-4 rounded flex flex-col gap-2">
      <div>
        <Link to={`/view-book-details/${dataprops._id}`}>
          <div className="bg-white flex justify-center items-center rounded overflow-hidden">
            <img
              src={dataprops.url}
              alt="Book Cover"
              className="h-[25vh] object-cover"
            />
          </div>

          <h2 className="text-xl font-semibold mt-2">
            Title: {dataprops.title}
          </h2>
          <p className="font-semibold">By {dataprops.author}</p>
          {dataprops.discount ? (
            <p className="text-xl font-semibold flex items-center">
              <FaIndianRupeeSign />{" "}
              <span style={{ fontSize: "25px" }}>
                {" "}
                {parseInt(dataprops.price) -
                  (parseInt(dataprops.price) * parseInt(dataprops.discount)) /
                    100}
              </span>
              <span
                style={{ textDecoration: "line-through", marginLeft: "5px" }}
              >
                {" "}
                {dataprops.price}
              </span>
              <span style={{ marginLeft: "10px" }}>
                {dataprops.discount}%off
              </span>
            </p>
          ) : (
            <p className="text-xl font-semibold flex items-center">
              <FaIndianRupeeSign /> {dataprops.price}
            </p>
          )}
          {/* Stock Information */}
          {dataprops.stock > 0 ? (
            <p className="text-green-700 font-semibold">
              In Stock ({dataprops.stock})
            </p>
          ) : (
            <p className="text-red-600 font-semibold">Out of Stock</p>
          )}
        </Link>
      </div>

      {/* Remove Button */}
      {favourite && (
        <button
          className="bg-yellow-100 hover:bg-red-600 hover:cursor-pointer transition ease-in-out duration-300 text-black p-2 rounded"
          onClick={handleremovebook}
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default Bookcard;
