import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, Plane, MapPin, FileText, Settings, Truck, Hotel, Menu, X, BookImageIcon, User, Users } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { to: "/", label: "الرئيسية", icon: Home },
    { to: "/umra", label: "الحج والعمرة", icon: Plane },
    { to: "/hotels", label: "الفنادق", icon: Hotel },
    { to: "/trips", label: "الرحلات البرية", icon: Truck },
    { to: "/ads", label: "الإعلانات", icon: FileText },
    { to: "/bookings", label: "الحجوزات ", icon: BookImageIcon },
    { to: "/employes", label: "الموظفين ", icon: Users },
  ];

  return (
    <>
      {/* Button to open sidebar on mobile */}
      <button
        onClick={() => setOpen(true)}
        className="sm:hidden fixed top-4 right-4 z-50 p-2 rounded-md bg-white text-blue-600 shadow-lg hover:bg-gray-100 transition"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        dir="rtl"
        className={`fixed top-0 right-0 h-full w-72 bg-gradient-to-b from-sky-900 via-teal-900 to-[#002f2a] text-white flex flex-col justify-between py-8 shadow-2xl overflow-hidden z-50 transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"} 
          sm:translate-x-0 sm:relative sm:shadow-none`}
      >
        {/* Close button for mobile */}
        <div className="sm:hidden flex justify-start px-6 mb-6">
          <button onClick={() => setOpen(false)} className="p-2 rounded-md hover:bg-white/10 transition">
            <X size={24} />
          </button>
        </div>

        {/* Profile */}
        <div className="px-6 relative z-10">
          <div className="flex flex-col items-center mb-12">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-2xl font-bold shadow-xl ring-4 ring-cyan-300/30">
              H
            </div>
            <p className="mt-4 font-semibold text-lg">H. Sukashani</p>
            <p className="text-xs text-cyan-200">haris@skyline.com</p>
          </div>

          {/* Menu */}
          <nav className="space-y-4">
            {menuItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `group flex items-center gap-3 p-3 rounded-xl transition-all duration-300 relative ${
                    isActive
                      ? "bg-white/10 text-cyan-300 shadow-lg"
                      : "hover:bg-white/5 hover:translate-x-1"
                  }`
                }
                onClick={() => setOpen(false)} // close sidebar on menu click (mobile)
              >
                <Icon
                  size={20}
                  className="text-cyan-200 group-hover:text-cyan-300 transition duration-300"
                />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
