
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../Redux/userSlice";

export default function AppWrapper({ children }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    if (!userData) {
      dispatch(fetchUserData());
    }
  }, [dispatch, userData]);

  return <>{children}</>;
}
