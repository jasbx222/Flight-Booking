import { useState } from "react";
import { Eye, Edit, Download, Upload } from "lucide-react";
import img from './../../../public/Objects.png'

interface Booking {
  id: number;
  name: string;
  phone: string;
  type: "عمرة" | "فندق" | "رحلة برية";
  paymentStatus: "دفعة أولية" | "دفعة مكتملة";
  invoice?: string;
  passportImages?: string[];
  ocrData?: string;
}

export default function BookingsDashboard() {
const bookings :Booking[]=[
    {
      id: 1,
      name: "أحمد علي",
      phone: "0781234567",
      type: "عمرة",
      paymentStatus: "دفعة أولية",
      invoice: "/invoices/1.pdf",
      passportImages: [img],
      ocrData: "Ahmed Ali, 01/01/1990, Iraq"
    },
    {
      id: 2,
      name: "ليلى محمد",
      phone: "0789876543",
      type: "فندق",
      paymentStatus: "دفعة مكتملة",
      passportImages: [img],
      ocrData: "Laila Mohamed, 02/02/1992, Iraq"
    },
  ]

  const [filters, setFilters] = useState({ name: "", phone: "", type: "" });

  const filteredBookings = bookings.filter(b =>
    b.name.includes(filters.name) &&
    b.phone.includes(filters.phone) &&
    (filters.type ? b.type === filters.type : true)
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-sky-50 min-h-screen" dir="rtl">
      <h1 className="text-2xl font-bold mb-6">إدارة الحجوزات</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="بحث بالاسم"
          value={filters.name}
          onChange={e => setFilters({ ...filters, name: e.target.value })}
          className="px-3 py-2 rounded-lg border w-full sm:w-1/3"
        />
        <input
          type="text"
          placeholder="بحث برقم الجوال"
          value={filters.phone}
          onChange={e => setFilters({ ...filters, phone: e.target.value })}
          className="px-3 py-2 rounded-lg border w-full sm:w-1/3"
        />
        <select
          value={filters.type}
          onChange={e => setFilters({ ...filters, type: e.target.value })}
          className="px-3 py-2 rounded-lg border w-full sm:w-1/3"
        >
          <option value="">الكل</option>
          <option value="عمرة">عمرة</option>
          <option value="فندق">فندق</option>
          <option value="رحلة برية">رحلة برية</option>
        </select>
      </div>

      {/* Responsive Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBookings.map(booking => (
          <div key={booking.id} className="bg-white rounded-2xl shadow-lg p-4 flex flex-col gap-2 hover:shadow-2xl transition transform hover:-translate-y-1">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">{booking.name}</h3>
                <p className="text-sm text-gray-500">{booking.phone}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-white text-sm ${booking.paymentStatus === "دفعة مكتملة" ? "bg-green-500" : "bg-yellow-500"}`}>
                {booking.paymentStatus}
              </span>
            </div>

            <p className="text-gray-600 font-medium">نوع الحجز: {booking.type}</p>

            {/* Invoice */}
            <div className="flex items-center gap-2">
              {booking.invoice ? (
                <>
                  <a href={booking.invoice} target="_blank" className="text-blue-600 hover:underline flex items-center gap-1">
                    <Download size={16} /> تحميل
                  </a>
                  <button className="p-1 bg-gray-100 rounded hover:bg-gray-200">
                    <Upload size={16} />
                  </button>
                </>
              ) : (
                <button className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1">
                  <Upload size={16} /> رفع
                </button>
              )}
            </div>

            {/* Passport Images */}
            <div className="flex gap-2 overflow-x-auto py-1">
              {booking.passportImages?.map((img, idx) => (
                <a key={idx} href={img} target="_blank">
                  <img src={img} alt="passport" className="w-16 h-16 rounded-lg border" />
                </a>
              ))}
            </div>

            {/* OCR Data */}
            <p className="text-sm text-gray-700 truncate">OCR: {booking.ocrData || "-"}</p>

            {/* Actions */}
            <div className="flex gap-2 mt-2">
              <button className="p-2 bg-green-100 rounded hover:bg-green-200 flex-1 flex justify-center">
                <Eye size={16} />
              </button>
              <button className="p-2 bg-blue-100 rounded hover:bg-blue-200 flex-1 flex justify-center">
                <Edit size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
