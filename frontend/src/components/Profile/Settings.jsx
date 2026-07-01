import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
const Settings = () => {
  const [userdata, setuserData] = useState();
  const [address, setAddress] = useState({ address: " " });

  const headers = {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  //   useEffect(() => {
  //     const fetch = async () => {
  //       try {
  //         const res = await axios.get(
  //           "http://localhost:8080/api/v1/user-details",
  //           { headers }
  //         );
  //         setuserData(res.data);
  //         setAddress({ address: res.data.address });
  //         console.log(res);
  //       } catch (error) {
  //         if (error.response && error.response.status === 401) {
  //           localStorage.clear();
  //         }
  //         console.log("Catch");

  //         console.log("error in orderhistory", error);
  //       }
  //     };
  //     fetch();
  //   }, []);
  useEffect(() => {
    const fetch = async () => {
      axios
        .get("http://localhost:8080/api/v1/user-details", { headers })
        .then((res) => {
          setuserData(res.data);
          setAddress({ address: res.data.address });
          console.log(res);
        })
        .catch((error) => {
          console.log("Catch block running");
          console.log("error", error);

          if (error.response && error.response.status === 401) {
            localStorage.clear();
            window.location.href = "/login";
          }
        });
    };
    fetch();
  }, []);

  const submitaddress = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8080/api/v1/update-address",
        address,
        { headers }
      );
      console.log(response);
      alert(response.data.message);
    } catch (error) {
      console.log("error ", error, error.message);
    }
  };

  return (
    <>
      {!userdata && <Loader />}
      {""}
      {userdata && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-yellow-500 mx-auto mb-8">
            Settings
          </h1>
          <div className="flex gap-12   ">
            <div>
              <label htmlFor="">Username</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold px-4">
                {userdata.username}
              </p>
            </div>
            <div>
              <label htmlFor=" ">Email</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold px-4">
                {userdata.email}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            <label htmlFor="">Address</label>
            <textarea
              className="p-2 rounded bg-zinc-8-- mt-2 font-semibold text-black"
              name="address"
              rows={5}
              value={address.address}
              placeholder="address here"
              onChange={change}
            ></textarea>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-yellow-500
                         text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400"
              onClick={submitaddress}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
