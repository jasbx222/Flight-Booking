import { useState } from "react";
import { Bell, Plus, X, Menu } from "lucide-react";

interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export default function HeaderWithNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: "رحلة جديدة", message: "تم إضافة رحلة جديدة إلى النظام", date: "21-08-2025", read: false },
    { id: 2, title: "تذكير دفع", message: "لم يتم دفع حجزك الأخير", date: "20-08-2025", read: true },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [newNotification, setNewNotification] = useState({ title: "", message: "" });
  const [mobileMenu, setMobileMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleAddNotification = () => {
    const nextId = notifications.length + 1;
    setNotifications([{ ...newNotification, id: nextId, date: new Date().toLocaleDateString(), read: false }, ...notifications]);
    setNewNotification({ title: "", message: "" });
    setModalOpen(false);
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <header className="w-full bg-white shadow-md px-4 sm:px-6 py-4 flex justify-between items-center sticky top-0 z-40" dir="rtl">
      {/* Logo / Title */}
      <div className="flex items-center gap-2">
        <button className="sm:hidden p-2 rounded-md hover:bg-gray-100" onClick={() => setMobileMenu(!mobileMenu)}>
          <Menu size={24} />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">لوحة التحكم</h1>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 relative">
        {/* Notifications Bell */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="relative p-2 rounded-full hover:bg-gray-100 transition"
        >
          <Bell size={24} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -left-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute left-0 top-12 w-72 sm:w-80 bg-white shadow-xl rounded-2xl overflow-hidden z-50 max-h-[60vh]">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-semibold text-gray-700">الإشعارات</h3>
              <button onClick={() => setModalOpen(true)} className="flex items-center gap-1 text-sm text-blue-600 font-semibold hover:underline">
                <Plus size={16} /> إنشاء جديد
              </button>
            </div>
            <div className="overflow-y-auto">
              {notifications.length === 0 && <p className="p-4 text-gray-500 text-center">لا توجد إشعارات</p>}
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-3 border-b cursor-pointer hover:bg-gray-50 transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 ${n.read ? "bg-gray-50" : "bg-white"}`}
                  onClick={() => markAsRead(n.id)}
                >
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">{n.title}</p>
                    <p className="text-sm text-gray-500 break-words">{n.message}</p>
                  </div>
                  <span className="text-xs text-gray-400">{n.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal for New Notification */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-slide-in" dir="rtl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">إضافة إشعار جديد</h2>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded-full hover:bg-gray-100 transition">
                <X size={20} />
              </button>
            </div>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleAddNotification(); }}>
              <div>
                <label className="block mb-1 font-semibold">العنوان</label>
                <input
                  type="text"
                  value={newNotification.title}
                  onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-right"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">الرسالة</label>
                <textarea
                  value={newNotification.message}
                  onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-right"
                  rows={4}
                  required
                />
              </div>
              <div className="flex justify-start gap-2 flex-wrap">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition">إلغاء</button>
                <button type="submit" className="px-4 py-2 bg-gradient-to-r from-[#0F5BFF] to-[#41BC4C] text-white rounded-lg hover:scale-105 transition-transform">إرسال</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
