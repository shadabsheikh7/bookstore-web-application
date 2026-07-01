/** @format */

import React, { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import Bookcard from "../components/bookcard/Bookcard";

const AllBooks = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchdata = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/get-all-books");
      setData(res.data.data);
    } catch (error) {
      console.log("error ", error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = data?.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <div className="px-10 py-8 bg-lime-900">
        <div className="p-4 mt-8 bg-zinc-700">
          <h4 className="text-3xl grid place-items-center font-semibold text-green-200">
            All Books
          </h4>

          {/* Search Bar */}
          <div className="flex justify-center my-6">
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={handleSearch}
              className="px-4 py-2 w-full sm:w-1/2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {!data.length && (
            <div className="flex items-center justify-center my-4">
              <Loader />
            </div>
          )}

          {data.length > 0 && (
            <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
              {filteredBooks?.length > 0 ? (
                filteredBooks.map((items, i) => (
                  <div key={i}>
                    <Bookcard dataprops={items} />
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-96 w-full col-span-full">
                  <p className="text-center text-white text-2xl">
                    No books found.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllBooks;
