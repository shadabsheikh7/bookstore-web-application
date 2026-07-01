/** @format */

import axios from "axios";
import React, { useState } from "react";

const AddBook = () => {
  const [BData, setBData] = useState({
    url: "",
    title: "",
    author: "",
    language: "",
    price: "",
    discount: 0,
    desc: "",
    stock: "", // 🆕 added stock
  });

  const headers = {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setBData({ ...BData, [name]: value });
  };

  const booksubmit = async () => {
    try {
      console.log(BData);
      if (
        BData.url === "" ||
        BData.title === "" ||
        BData.author === "" ||
        BData.language === "" ||
        BData.price === "" ||
        BData.desc === "" ||
        BData.stock === ""
      ) {
        alert("All fields are required!");
        return;
      }
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/api/v1/add-book",
        BData,
        { headers },
      );
      setBData({
        url: "",
        title: "",
        author: "",
        language: "",
        price: "",
        discount: 0,
        desc: "",
        stock: "",
      });
      alert(res.data.message);
    } catch (error) {
      console.log("error in addbook", error, error.message);
    }
  };

  return (
    <div className="h-[100%] p-0 md:p-4">
      <h1 className="py-2 font-semibold text-3xl grid place-items-center text-white">
        Add Book Form
      </h1>
      <div className="p-4 bg-zinc-600 rounded-lg">
        <div>
          <label>Image URL</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            name="url"
            placeholder="URL of image"
            value={BData.url}
            onChange={change}
          />
        </div>

        <div className="mt-4">
          <label>Title</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            name="title"
            placeholder="Title of the book"
            value={BData.title}
            onChange={change}
          />
        </div>

        <div className="mt-4">
          <label>Author</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            name="author"
            placeholder="Author name"
            value={BData.author}
            onChange={change}
          />
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label>Language</label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              name="language"
              placeholder="Language type"
              value={BData.language}
              onChange={change}
            />
          </div>

          <div>
            <label>Price</label>
            <input
              type="number"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              name="price"
              placeholder="Price"
              value={BData.price}
              onChange={change}
            />
          </div>
          <div>
            <label>Discount</label>
            <input
              type="number"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              name="discount"
              placeholder="Discount"
              value={BData.discount}
              onChange={change}
            />
          </div>

          {/* 🆕 Added Stock Field */}
          <div>
            <label>Stock</label>
            <input
              type="number"
              min="0"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              name="stock"
              placeholder="Stock"
              value={BData.stock}
              onChange={change}
            />
          </div>
        </div>

        <div className="mt-4">
          <label>Description of Book</label>
          <textarea
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            name="desc"
            placeholder="Description"
            rows={6}
            value={BData.desc}
            onChange={change}
          />
        </div>

        <div className="mt-6 grid place-items-center">
          <button
            onClick={booksubmit}
            className="bg-blue-400 px-6 py-2 rounded text-black font-semibold hover:bg-blue-500 transition"
          >
            Add Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
