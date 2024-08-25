"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import logo2 from "/public/logo2.png";
import { LuFlower2 } from "react-icons/lu";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/dashboard",
          {
            withCredentials: true,
          }
        );
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data", error);
        setIsLoggedOut(true);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        { withCredentials: true }
      );
      setIsLoggedOut(true);
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div className="w-full h-[1080px] m-auto">
        <div className="w-full h-[1080px]">
          <Image src={logo2} alt="Logo" />
        </div>
        {/* <div className="flex justify-center items-center">
          <div>
            <div className="text-[4rem]">این گل تقدیم شما</div>
          </div>
        </div> */}
        {/* <div className="text-[4rem] text-red-700 flex justify-center">
          <LuFlower2 />
        </div> */}
      </div>
    );
  }

  if (isLoggedOut) {
    return (
      <div className="w-full h-full bg-[#FFFF]" dir="rtl">
        <div className="w-[800px] h-full m-auto">
          <h1 className="text-[2rem] font-bold">You have been logged out.</h1>
          <a href="/login" className="text-[2rem] font-bold text-blue-500">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#FFFF]" dir="rtl">
      <div className="w-[800px] h-full m-auto">
        <h1 className="text-[2rem] font-bold">داشبورد</h1>
        <div className="p-4 border-2 border-gray-300 rounded-md">
          <p>
            <strong>نام:</strong> {user.first_name}
          </p>
          <p>
            <strong>نام خانوادگی:</strong> {user.last_name}
          </p>
          <p>
            <strong>کد ملی:</strong> {user.username}
          </p>
          <p>
            <strong>ایمیل:</strong> {user.email}
          </p>
          <p>
            <strong>سن:</strong> {user.age}
          </p>
          <p>
            <strong>شماره تلفن:</strong> {user.phone_number}
          </p>
          <p>
            <strong>آدرس:</strong> {user.address}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          خروج
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
