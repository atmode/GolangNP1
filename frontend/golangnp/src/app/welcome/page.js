"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "/public/logo.png";
import { MdOutlineSupportAgent } from "react-icons/md";

export default function Welcome() {
  return (
    <div className="w-full h-[1080px] bg-[#FFFF]" dir="rtl">
      <div className="w-[800px] h-full m-auto">
        <div className="w-full flex justify-center">
          <div className="flex justify-center w-[400px] h-[300px]">
            <Image src={logo} alt="Logo" />
          </div>
        </div>
        <div className="flex justify-center items-center text-[2rem] font-bold">
          <div className="font-bold text-purple-900">
            به آموزشگاه نور سهند خوش آمدید
          </div>
        </div>
        <div className="border-1 border-[1px] border-black rounded-lg ">
          <div className="border-1 bg-slate-500 rounded-md mx-2 ">
            <div className="font-bold text-white mx-2 my-2">
              کاربر گرامی جهت ثبت نام یا ورود به حساب کاربری اقدام نمایید!
            </div>
          </div>

          <div className="border-1 border-[1px] border-black mx-2 my-2 rounded-md shadow-md">
            <div className="flex justify-center  my-4">
              <div className="w-1/2 border-1 border-blue-400 border-[1px] bg-slate-300 flex justify-center mx-2 rounded-md shadow-lg">
                <Link href="/signup">
                  <div className="text-[2rem] font-bold text-blue-500">
                    ثبت نام
                  </div>
                </Link>
              </div>
              <div className="w-1/2 border-1 border-blue-400 border-[1px] bg-slate-300 flex justify-center mx-2 rounded-md shadow-lg">
                <Link href="/login">
                  <div className="text-[2rem] font-bold text-gray-500">
                    ورود
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="border-1 border-[1px] border-black mx-2 my-2 rounded-md shadow-md">
            <div className=" flex border-1 bg-yellow-600 rounded-md mx-2 mt-2 ">
              <div className="text-[4rem]">
                <MdOutlineSupportAgent />
              </div>
              <div className="font-bold text-white mx-2 my-2 h-[50px]">
                در صورت وجود هر گونه مشکل می توانیید از پشتیبانی در خواست
                پشتیبانی بکنید همکاران ما در کمتر از ۲۴ ساعت در تماس با شما
                خواهند قرار گرفت.
              </div>
            </div>
            <div className=" my-4">
              <div className=" border-1 border-blue-400 border-[1px] my-2 bg-slate-300 flex justify-center mx-2 rounded-md shadow-lg">
                <Link href="/support">
                  <div className="text-[2rem] font-bold text-blue-500">
                    پشتیبانی
                  </div>
                </Link>
              </div>
              <div className=" border-1 border-blue-400 border-[1px] my-2 bg-slate-300 flex justify-center mx-2 rounded-md shadow-lg">
                <Link href="/aboutus">
                  <div className="text-[2rem] font-bold text-gray-500">
                    About Us
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
