/** @format */

import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateBook = () => {
  const navigate = useNavigate();
  const [BData, setBData] = useState({
    url: "",
    title: "",
    author: "",
    language: "",
    price: "",
    discount: 0,
    desc: "",
    stock: "",
  });
  const { id } = useParams();
  const headers = {
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  useEffect(() => {
    const fetchbookdata = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/get-book-by-id/${id}`,
        );
        setBData(res.data.data);
      } catch (error) {
        console.log("error ", error);
      }
    };
    fetchbookdata();
  }, [id]);

  const change = (e) => {
    const { name, value } = e.target;
    setBData({ ...BData, [name]: value });
  };

  const booksubmit = async () => {
    try {
      if (
        BData.url === "" ||
        BData.title === "" ||
        BData.author === "" ||
        BData.language === "" ||
        BData.price === "" ||
        BData.desc === "" ||
        BData.stock === ""
      ) {
        alert("all fields are required ");
        return;
      }
      const res = await axios.post(
        "http://localhost:8080/api/v1/update-book",
        BData,
        { headers },
      );
      console.log("res in update", res.data);
      alert(res.data.message);

      navigate("/all-books");
    } catch (error) {
      console.log("error in addbook", error, error.message);
    }
  };

  return (
    <div className="h-[100%] p-0 md:p-4">
      <h1 className="py-2 font-semibold text-3xl text-white">Add Book form</h1>
      <div className="p-4 bg-zinc-600">
        <div>
          <label htmlFor="">Image</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            name="url"
            placeholder="url of image"
            required
            value={BData.url}
            onChange={change}
          />
        </div>

        <div className="mt-2">
          <label htmlFor="">title</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            name="title"
            placeholder="title of the book"
            required
            value={BData.title}
            onChange={change}
          />
        </div>
        <div className="mt-2">
          <label htmlFor="">author</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            name="author"
            placeholder="author name"
            required
            value={BData.author}
            onChange={change}
          />
        </div>
        <div className="mt-2 flex justify-between">
          <div>
            <label htmlFor="">language</label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              name="language"
              placeholder="language type"
              required
              value={BData.language}
              onChange={change}
            />
          </div>
          <div>
            <label htmlFor="">Price</label>
            <input
              type="number"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              name="price"
              placeholder="price "
              required
              onChange={change}
              value={BData.price}
            />
          </div>
          <div>
            <label htmlFor="">Discount</label>
            <input
              type="number"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              name="discount"
              placeholder="discount"
              required
              onChange={change}
              value={BData.discount}
            />
          </div>
          <div>
            <label htmlFor="">Stock</label>
            <input
              type="number"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              name="stock"
              placeholder="stock quantity"
              required
              onChange={change}
              value={BData.stock}
            />
          </div>
        </div>

        <div className="mt-2">
          <label htmlFor="">Description of Book</label>
          <textarea
            type="textarea"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            name="desc"
            placeholder="Description"
            rows={6}
            cols={5}
            required
            value={BData.desc}
            onChange={change}
          />
        </div>
      </div>
      <button
        onClick={booksubmit}
        className="bg-red-400 text-black float-right p-2 font-semibold"
      >
        updatebook
      </button>
    </div>
  );
};

export default UpdateBook;
