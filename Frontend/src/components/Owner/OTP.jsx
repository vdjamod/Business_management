import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function OTP() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOTP, setIsOTP] = useState(false);
  const [time, setTime] = useState(120);
  const [isResend, setIsResend] = useState(false);
  const navigate = useNavigate();
  const intervalId = useRef(null);

  // Also, cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, []);

  const timer = () => {
    if (intervalId.current) clearInterval(intervalId.current);
    setTime(120);
    setIsResend(false);

    intervalId.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalId.current);
          setIsResend(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleResend = () => {
    sendOTP();
  };

  const sendOTP = async () => {
    const res = await axios.post(
      "/API/owner/send-mail",
      {
        email,
      },
      {
        withCredentials: true,
      }
    );

    console.log(res);

    if (res.data.success) {
      setIsOTP(true);
      timer();
    } else {
      alert(res.data.message);
    }
  };

  const verifyOTP = async () => {
    const res1 = await axios.post(
      "/API/owner/verify-otp",
      {
        email,
        otp,
      },
      {
        withCredentials: true,
      }
    );

    if (res1.data.success) {
      navigate("/owner/forget-password");
    } else {
      alert(`OTP NOT match`);
    }
  };

  const handleClick = async (event) => {
    event.preventDefault();

    isOTP ? verifyOTP() : sendOTP();
  };

  return (
    <>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Forget Password
          </h2>
        </div>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {isResend && (
            <p className="text-red-500">
              OTP Expired!!!{" "}
              <button
                type="button"
                onClick={handleResend}
                className="text-blue-500 ml-32"
              >
                Resend OTP
              </button>
            </p>
          )}

          {isOTP && !isResend ? (
            <div>
              <label
                htmlFor="opt"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                OTP
              </label>
              <input
                id="opt"
                type="number"
                autoComplete="current-opt"
                onChange={(e) => setOtp(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {!isResend && <p>OTP expire in: {time} </p>}
            </div>
          ) : (
            ""
          )}

          <div>
            <button
              onClick={handleClick}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isOTP ? "Verify OTP" : "Send OTP"}

            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default OTP;
