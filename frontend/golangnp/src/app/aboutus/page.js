"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "/public/logo.png";

export default function Welcome() {
  return (
    <div className="w-full h-[1080px] bg-[#FFFF]" dir="rtl">
      <div className="w-[800px] h-[800px] m-auto">
        <div className="w-full flex justify-center">
          <div className="flex justify-center w-[400px] h-[300px]">
            <Image src={logo} alt="Logo" />
          </div>
        </div>
        <div className="flex justify-center items-center text-[2rem] font-bold">
          یکی از مجرب ترین آکادمی های زبان خارجی در شمال غرب کشور
        </div>
        <div className="font-bold text-[2rem] flex justify-center">
          با یک دهه تجربه
        </div>
        <div className="border-1 border-[1px] mx-2 my-2 rounded-md shadow-lg font-medium text-[1.5rem]">
          <div className="mx-2 my-2">
            ما از سال ۱۳۹۳ در سطح کلانشهر تبریز شروع به کار کردیم و با پشتوانه
            راسخ و ایمان به خدای متعال در این راه قدم برداشتیم تا امیدی برای نسل
            پر انرژی و جوان کشور باشیم برای رسیدن به بهترین قله های موفقیت و
            ارمغانی برای کشور عزیزمان ایران
          </div>
        </div>
        <div className="flex justify-center mx-2 my-2  bg-slate-400 rounded-md">
          <div className="text-bold text-[1.25rem] mx-2 ">
            هدف از آکادمی زبان های خارجی گردآوری بهترین استادن شمالغرب کشور برای
            ایجاد یک محیط برای پرورش زبان های خارجی می باشد همانطور که مشاهده می
            کنید ما با داشتن یک دهه تجربه توانستیم به یکی از بهترین موسسه ها
            آموزش زبان خارجی در سطح شمالغرب کشور برسیم ما تلاش می کنیم تا هر روز
            به موفقیت های بیشتری برسیم
          </div>
        </div>
        <div>شماره تماس:</div>
        <div>آدرس:</div>
        <div>ایمیل:</div>
        <div className="flex justify-center my-4">
          <Link href="/welcome">
            <div className="text-[2rem] font-bold text-blue-500">
              برگشت به صحفه قبلی
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
