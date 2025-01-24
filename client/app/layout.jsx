// import React from 'react';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from 'react-toastify';

// Components
import Navbar from "./components/Navbar";
import Sidebar from './components/Sidebar';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastContainer newestOnTop />
        <div className="flex">
          <Sidebar />
          <div className="flex flex-col flex-grow">
            <Navbar />
            <main className="flex-grow p-4">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
