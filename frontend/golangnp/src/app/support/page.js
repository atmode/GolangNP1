"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import logo from "/public/logo.png";
import { MdOutlineSupportAgent } from "react-icons/md";
const Support = () => {
  const [formData, setFormData] = useState({
    email: "",
    problem: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/support",
        formData
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        <div className="border-1 border-[1px] rounded-md bg-green-600 shadow-lg">
          <div>با موفقیت پیام ارسال شد.</div>
        </div>
      );
    }
  };

  return (
    <div className="w-full h-[1080px] bg-[#FFFF]" dir="rtl">
      <div className="flex justify-center ">
        <div className="flex justify-center w-[400px] h-[400px]">
          <Image src={logo} alt="Logo" />
        </div>
      </div>
      <div className="w-[800px] h-full m-auto">
        <div className="flex items-center gap-2">
          <div className="text-[4rem] text-green-800">
            <MdOutlineSupportAgent />
          </div>
          <div className="text-[2rem] text-green-800 font-bold">پشتیبانی</div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-4 border-2 border-gray-600 rounded-md"
        >
          <div className="mb-4 ">
            <div className="">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 "
                htmlFor="email"
              >
                ایمیل:
              </label>
            </div>

            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border-[1px] border-gray-400 rounded shadow-lg"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="problem"
            >
              مشکل:
            </label>
            <textarea
              id="problem"
              name="problem"
              value={formData.problem}
              onChange={handleChange}
              required
              className="w-full p-2 border-[1px] shadow-lg border-gray-400  rounded"
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              ارسال
            </button>
          </div>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default Support;
