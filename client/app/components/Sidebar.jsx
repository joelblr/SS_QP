"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, createContext, useState, useEffect } from "react";
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { LayoutDashboard, Package, Settings, Boxes } from "lucide-react";


const side_menu = [
  { id: 1, icon: <LayoutDashboard size={24} />, text: "Dashboard", link: "/" },
  { id: 2, icon: <Package size={24} />, text: "Upload PDFs", link: "/uploads" },
  { id: 3, icon: <Package size={24} />, text: "Product_2", link: "" },
  { id: 4, icon: <Settings size={24} />, text: "Settings", link: "" },
];
const gaps_idx = new Set([1, 3,]);
const SidebarContext = createContext()


// export default function Sidebar({ children }) {
export default function Sidebar() {

  const [selectedProduct, setSelectedProduct] = useState(1);
  const [expanded, setExpanded] = useState(true)
  const router = useRouter();

  // Ensure the correct sidebar item is highlighted based on the current URL
  useEffect(() => {
    const currentRoute = window.location.pathname;
    const matchingItem = side_menu.find((menu) => menu.link === currentRoute);

    if (matchingItem) setSelectedProduct(matchingItem.id);
    else setSelectedProduct(null);

  }, [router]); // Listen to route changes

  const handleOptionClick = (menu) => {
    setSelectedProduct(menu.id); // Highlight the selected product
    router.push(menu.link); // Navigate to the selected page
  };


  return (

    <aside className="inline-flex h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            // src="https://img.logoipsum.com/243.svg"
            src="https://sample-papers.com/assets/uploads/logo/joblal.png"
            className={`overflow-hidden transition-all ${expanded ? "w-13 h-12" : "w-0"
              }`}
            alt="Logo"
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded, setSelectedProduct }}>
          <div className="flex-1 px-3">
            {side_menu.map((menu) => (
              <div key={`menu-item-${menu.id}`}>
                {gaps_idx.has(menu.id) && (
                  <hr key={`gap-${menu.id}`} className="my-3" />
                )}
                <SidebarItem
                  key={`item-${menu.id}`}
                  icon={menu.icon}
                  text={menu.text}
                  active={selectedProduct === menu.id}
                  pathLink={menu.link}
                  trigger={() => handleOptionClick(menu)}
                />
              </div>
            ))}
          </div>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt="Profile Img"
            className="w-10 h-10 rounded-md"
          />
          <div className={`flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Joel A</h4>
              <span className="text-xs text-gray-600">joelblr52@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  )
}


export function SidebarItem({ icon, text, active, alert, pathLink, trigger }) {
  const { expanded } = useContext(SidebarContext)

  return (
    <Link href={pathLink} onClick={trigger}>
      <li
        className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
          }
    `}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
            }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"
              }`}
          />
        )}

        {!expanded && (
          <div
            className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  )
}
