import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { siteMetaData } from "@/config/site"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = siteMetaData;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-blueprint-azure/30 selection:text-blueprint-azure flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="grow flex flex-col">{children}</main>
        <Footer />

        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          theme="dark"
          toastClassName="relative flex p-4 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-blueprint-surface border border-blueprint-line text-blueprint-text font-sans text-sm shadow-xl mb-4"
        />
      </body>
    </html>
  );
}
