// ClientLayout.js
"use client";

import ReduxProvider from "../components/ReduxProvider/ReduxProvider";
import AppWrapper from "../components/AddWrapper/AddWrapper";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../Redux/store";
import { useEffect, useState } from "react";

export default function ClientLayout({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <ReduxProvider>
      {isClient && persistor ? (
        <PersistGate loading={null} persistor={persistor}>
          <AppWrapper>{children}</AppWrapper>
        </PersistGate>
      ) : (
        <AppWrapper>{children}</AppWrapper>
      )}
    </ReduxProvider>
  );
}