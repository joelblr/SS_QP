"use client";

import { Menu, Search, Bell } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex justify-between items-center h-16 px-4 bg-white shadow-sm border-b">
      {/* Left Section: Menu and Branding */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => console.log("Toggle Sidebar")}
          className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 md:hidden"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-lg font-semibold text-gray-700">MyApp</h1>
      </div>

      {/* Middle Section: Search Bar */}
      <div className="hidden md:flex items-center gap-2 bg-gray-100 p-2 rounded-md">
        <Search size={20} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-gray-700 placeholder-gray-400 w-64"
        />
      </div>

      {/* Right Section: Notifications & Profile */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-md bg-gray-100 hover:bg-gray-200">
          <Bell size={24} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-2">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div className="hidden md:flex flex-col text-sm">
            <span className="font-semibold text-gray-700">Joel A</span>
            <span className="text-gray-500">joelblr52@gmail.com</span>
          </div>
        </div>
      </div>
    </header>
  );
}


// import React from 'react'
// import Link from "next/link";


// export default function Navbar() {
//   return (
//     <div>
//       <h1>Nav-Bar</h1>
//       <Link href="/"> Home </Link> |
//       <Link href="/uploads"> File-Uploads </Link> |
//       <Link href="/about"> About </Link> |
//     </div>
//   )
// }
