"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import logo from "/public/logo.png";
import { FaCheckSquare } from "react-icons/fa";
import { FaCircleExclamation } from "react-icons/fa6";
import { FaExclamationTriangle } from "react-icons/fa";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  //   const router = useRouter();

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        loginData,
        { withCredentials: true }
      );

      const persianMessage = translateMessageToPersian(response.data.message);

      setMessage(
        <div className="border-[1px] mt-2 flex justify-center items-center gap-2 px-2 border-green-600 bg-green-500 rounded-lg">
          <div>
            <FaCheckSquare className="text-[1rem] text-white" />
          </div>
          <div className="text-white font-bold">{persianMessage}</div>
        </div>
      );
      // Redirect to the dashboard
      //   router.push("/dashboard");
      window.location.href = "/dashboard";
    } catch (error) {
      setMessage(
        <div className="border-[1px] mt-2 flex justify-center items-center gap-2 px-2 border-yellow-600 bg-yellow-500 rounded-lg">
          <div>
            <FaExclamationTriangle className="text-[1rem] text-white" />
          </div>
          <div className="text-white font-bold">
            نام کاربری یا رمز عبور اشتباه است!
          </div>
        </div>
      );
    }
  };

  const translateMessageToPersian = (message) => {
    const translations = {
      "Login successful!": "ورود با موفقیت انجام شد!",
      // Add other translations as needed
    };

    return translations[message] || message;
  };

  return (
    <div className="w-full h-[1080px] bg-[#FFFF]" dir="rtl">
      <div className="w-[800px] h-full m-auto">
        <div className="w-full flex justify-center">
          <div className="flex justify-center w-[400px] h-[300px]">
            <Image src={logo} alt="Logo" />
          </div>
        </div>
        <div className="flex items-center px-4 gap-2">
          <div>
            <FaCheckSquare className="text-green-500 text-[1.5rem]" />
          </div>
          <div className="text-[2rem] font-mono text-red-800"> ورود</div>
        </div>
        <div className=" border-2 border-gray-200 w-full m-auto rounded-[14px] p-4">
          <div className="w-full rounded-[14px] border-1 border-[1px] border-gray-300 shadow-md p-4">
            <div>
              <div className="flex items-center border-[1px] border-blue-500 bg-blue-500 gap-2 rounded-[16px] px-2">
                <div>
                  <FaCircleExclamation className="text-white text-[1.25rem]" />
                </div>
                <div className="font-bold text-[1.25rem] text-white">
                  <div>لطفا اطلاعات را با دقت وارد نمایید.</div>
                </div>
              </div>

              <form onSubmit={handleLogin}>
                <div className=" px-4 border-[1px] border-gray-300 rounded-md mt-2 py-4">
                  <label>کد ملی :</label>
                  <input
                    type="text"
                    name="username"
                    value={loginData.username}
                    onChange={handleLoginChange}
                    required
                    className="w-full p-2 border-[1px] border-gray-300 rounded"
                  />
                  <div className="mt-2">
                    <label>رمز عبور :</label>
                    <input
                      type="password"
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      required
                      className="w-full p-2 border-[1px] border-gray-300 rounded"
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-2 border-[1px] bg-green-600 border-green-900 rounded-lg ">
                  <div className="text-[2rem] text-white">
                    <button type="submit">ورود</button>
                  </div>
                </div>
              </form>
              <div>{message && <p>{message}</p>}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
