
// "use client";

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserData } from "../../Redux/userSlice";

// export default function AppWrapper({ children }) {
//   const dispatch = useDispatch();  // Update global state
//   const userData = useSelector((state) => state.user.userData); // Read global state

//   useEffect(() => {
//     if (!userData) {
//       dispatch(fetchUserData());
//     }
//   }, [dispatch, userData]);

//   return <>{children}</>;
// }
// components/ReduxProvider/ReduxProvider.js
// components/ReduxProvider/ReduxProvider.js
"use client";

import { Provider } from "react-redux";
import { store } from "../../Redux/store";

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}