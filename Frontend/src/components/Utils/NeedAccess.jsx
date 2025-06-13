import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function NeedAccess({ children, requiredWorkpage = "all" }) {
  const role = useSelector((state) => state.auth.role);
  const workpage = useSelector((state) => state.auth.workpage);

  const navigate = useNavigate();
  const [allowed, setAllowed] = useState();

  useEffect(() => {
    if (role == "owner" || workpage === requiredWorkpage) {
      setAllowed(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "UnAuthorized User!!! <br> Access Denied",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate(-1);
      });
    }
  }, []);
  return allowed ? (
    <>{children}</>
  ) : (
    <div className="text-center py-4">Checking access...</div>
  );
}

export default NeedAccess;
