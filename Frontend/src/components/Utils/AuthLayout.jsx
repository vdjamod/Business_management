import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AuthLayout({ children }) {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  console.log(authStatus);
  useEffect(() => {
    if (!authStatus) {
      alert("Token NOT Found");
      navigate("/owner/login");
    }
  }, []);
  return <div>{children}</div>;
}
