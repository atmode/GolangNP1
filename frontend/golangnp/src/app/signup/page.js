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

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    age: "",
    phone_number: "",
    address: "",
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
        "http://127.0.0.1:8000/api/register",
        formData,
        { withCredentials: true }
      );

      setMessage(
        <div className="border-[1px] mt-2 flex justify-center items-center gap-2 px-2 border-green-600 bg-green-500 rounded-lg">
          <div>
            <FaCheckSquare className="text-[1rem] text-white" />
          </div>
          <div className="text-white font-bold">{response.data.message}</div>
        </div>
      );

      // Automatically log in the user after successful registration
      const loginResponse = await axios.post(
        "http://127.0.0.1:8000/api/login",
        { username: formData.username, password: formData.password },
        { withCredentials: true }
      );

      if (loginResponse.data.message === "Login successful!") {
        window.location.href = "/dashboard";
      }
      // Redirect to the dashboard
      // router.push("/dashboard");
    } catch (error) {
      setMessage(
        <div className="border-[1px] mt-2 flex justify-center items-center gap-2 px-2 border-yellow-600 bg-yellow-500 rounded-lg">
          <div>
            <FaExclamationTriangle className="text-[1rem] text-red-600" />
          </div>
          <div className="text-white font-bold">
            خطا رخ داد. لطفا دوباره تلاش بکنید!
          </div>
        </div>
      );
    }
  };

  return (
    <div className="w-full h-[1680px] bg-[#FFFF]" dir="rtl">
      <div className="flex justify-center ">
        <div className="flex justify-center w-[400px] h-[400px]">
          <Image src={logo} alt="Logo" />
        </div>
      </div>
      <div className="w-[800px] h-[800px] m-auto">
        <div className="flex items-center px-4 gap-2">
          <div>
            <FaCheckSquare className="text-green-500 text-[1.5rem]" />
          </div>
          <div className="text-[2rem] font-mono text-red-800"> ثبت نام</div>
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

              <form onSubmit={handleSubmit}>
                <div className=" px-4 border-[1px] border-gray-300 rounded-md mt-2 py-4">
                  <div className="flex justify-center items-center gap-16 ">
                    <div className="flex justify-center gap-2">
                      <div className="mt-2">
                        <label>کد ملی :</label>
                      </div>
                      <div>
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          required
                          className="w-full p-2 border-[1px] border-black rounded"
                        />
                      </div>
                    </div>

                    <div className=" flex justify-center gap-2">
                      <div className="mt-2">
                        <label>ایمیل : </label>
                      </div>
                      <div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full p-2 border-[1px] border-black rounded"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <label>رمز عبور :</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border-[1px] border-black rounded"
                    />
                  </div>
                  <div className="mt-2">
                    <label>نام :</label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border-[1px] border-black rounded"
                    />
                  </div>
                  <div className="mt-2">
                    <label>نام خانوادگی :</label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border-[1px] border-black rounded"
                    />
                  </div>
                  <div className="mt-2">
                    <label>سن :</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border-[1px] border-black rounded"
                    />
                  </div>
                  <div className="mt-2">
                    <label>شماره تلفن :</label>
                    <input
                      type="number"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border-[1px] border-black rounded"
                    />
                  </div>
                  <div className="mt-2">
                    <label>آدرس :</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border-[1px] border-black rounded"
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-2 border-[1px] bg-green-600 border-green-900 rounded-lg ">
                  <div className="text-[2rem] text-white">
                    <button type="submit">ثبت نام</button>
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

export default SignUp;

//this line
// import { useState } from "react";
// import axios from "axios";
// import Image from "next/image";
// import logo from "/public/logo.png";
// import { FaCheckSquare } from "react-icons/fa";
// import { FaCircleExclamation } from "react-icons/fa6";
// import { FaExclamationTriangle } from "react-icons/fa";

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     first_name: "",
//     last_name: "",
//     age: "",
//     address: "",
//   });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/register",
//         formData
//       );

//       const persianMessage = translateMessageToPersian(response.data.message);

//       setMessage(
//         <div className="border-[1px] mt-2 flex justify-center items-center gap-2 px-2 border-green-600 bg-green-500 rounded-lg">
//           <div>
//             <FaCheckSquare className="text-[1rem] text-white" />
//           </div>
//           <div className="text-white font-bold">{persianMessage}</div>
//         </div>
//       );
//     } catch (error) {
//       setMessage(
//         <div className="border-[1px] mt-2 flex justify-center items-center gap-2 px-2 border-yellow-600 bg-yellow-500 rounded-lg">
//           <div>
//             <FaExclamationTriangle className="text-[1rem] text-white" />
//           </div>
//           <div className="text-white font-bold">
//             خطا رخ داد. لطفا دوباره تلاش بکنید!
//           </div>
//         </div>
//       );
//     }
//   };

//   const translateMessageToPersian = (message) => {
//     const translations = {
//       "User signed up successfully!": "کاربر با موفقیت ثبت نام شد!",
//       // Add other translations as needed
//     };

//     return translations[message] || message;
//   };

//   return (
//     <div className="w-full h-full bg-[#FFFF]" dir="rtl">
//       <div className="w-[800px] h-full m-auto">
//         <div className="w-full flex justify-center mt-8">
//           <div className="flex justify-center w-[400px] h-[300px]">
//             <Image src={logo} alt="Logo" />
//           </div>
//         </div>
//         <div className="flex items-center px-4 gap-2">
//           <div>
//             <FaCheckSquare className="text-green-500 text-[1.5rem]" />
//           </div>
//           <div className="text-[2rem] font-mono text-red-800"> ثبت نام</div>
//         </div>
//         <div className=" border-2 border-gray-200 w-full m-auto rounded-[14px] p-4">
//           <div className="w-full rounded-[14px] border-1 border-[1px] border-gray-300 shadow-md p-4">
//             <div>
//               <div className="flex items-center border-[1px] border-blue-500 bg-blue-500 gap-2 rounded-[16px] px-2">
//                 <div>
//                   <FaCircleExclamation className="text-white text-[1.25rem]" />
//                 </div>
//                 <div className="font-bold text-[1.25rem] text-white">
//                   <div>لطفا اطلاعات را با دقت وارد نمایید.</div>
//                 </div>
//               </div>

//               <form onSubmit={handleSubmit}>
//                 <div className=" px-4 border-[1px] border-gray-300 rounded-md mt-2 py-4">
//                   <label>کد ملی :</label>
//                   <input
//                     type="text"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-2 border rounded"
//                   />
//                   <div className="mt-2">
//                     <label>ایمیل : </label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                       className="w-full p-2 border rounded"
//                     />
//                   </div>
//                   <div className="mt-2">
//                     <label>رمز عبور :</label>
//                     <input
//                       type="password"
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       required
//                       className="w-full p-2 border rounded"
//                     />
//                   </div>
//                   <div className="mt-2">
//                     <label>نام :</label>
//                     <input
//                       type="text"
//                       name="first_name"
//                       value={formData.first_name}
//                       onChange={handleChange}
//                       required
//                       className="w-full p-2 border rounded"
//                     />
//                   </div>
//                   <div className="mt-2">
//                     <label>نام خانوادگی :</label>
//                     <input
//                       type="text"
//                       name="last_name"
//                       value={formData.last_name}
//                       onChange={handleChange}
//                       required
//                       className="w-full p-2 border rounded"
//                     />
//                   </div>
//                   <div className="mt-2">
//                     <label>سن :</label>
//                     <input
//                       type="number"
//                       name="age"
//                       value={formData.age}
//                       onChange={handleChange}
//                       required
//                       className="w-full p-2 border rounded"
//                     />
//                   </div>
//                   <div className="mt-2">
//                     <label>آدرس :</label>
//                     <input
//                       type="text"
//                       name="address"
//                       value={formData.address}
//                       onChange={handleChange}
//                       required
//                       className="w-full p-2 border rounded"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex justify-center mt-2 border-[1px] bg-green-600 border-green-900 rounded-lg ">
//                   <div className="text-[2rem] text-white">
//                     <button type="submit">ثبت نام </button>
//                   </div>
//                 </div>
//               </form>
//               <div>{message && <p>{message}</p>}</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
