
import ReduxProvider from "../components/ReduxProvider/ReduxProvider";
import ClientLayout from "./ClientLayout";
import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}