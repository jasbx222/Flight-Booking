import { useState } from "react";
import { Calendar, FileText, Plane, Users } from "lucide-react";

export default function UmrahDashboard() {
  const [trips] = useState([
    {
      id: 1,
      name: "رحلة مكة VIP",
      date: "2025-09-10",
      price: "1200$",
      status: "مراجعة",
      seats: "متبقي 15/50",
    },
    {
      id: 2,
      name: "رحلة المدينة الاقتصادية",
      date: "2025-09-20",
      price: "850$",
      status: "مثبتة",
      seats: "مكتمل",
    },
  ]);

  const statusColors:any = {
    مراجعة: "bg-yellow-100 text-yellow-700",
    مثبتة: "bg-green-100 text-green-700",
    ملغاة: "bg-red-100 text-red-700",
    مكتملة: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="p-6 space-y-10">
      {/* 👇 البطاقات */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800">الرحلات</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="p-6 bg-white rounded-2xl shadow hover:shadow-xl transition-all border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Plane className="w-5 h-5 text-blue-500" />
                {trip.name}
              </h3>
              <span
                className={`px-3 py-1 text-sm rounded-full ${statusColors[trip.status]}`}
              >
                {trip.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              {trip.date}
            </p>
            <p className="text-sm text-gray-600 flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-gray-400" />
              {trip.seats}
            </p>
            <p className="text-base font-bold text-green-600">{trip.price}</p>
          </div>
        ))}
      </div>

      {/* 👇 جدول الحجوزات */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800">الحجوزات</h2>
      <div className="overflow-x-auto rounded-2xl shadow border border-gray-100">
        <table className="w-full text-right border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3">اسم الحاج</th>
              <th className="p-3">رقم الحجز</th>
              <th className="p-3">الحالة</th>
              <th className="p-3">فاتورة</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-3">أحمد علي</td>
              <td className="p-3">#1024</td>
              <td className="p-3">
                <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                  مدفوع
                </span>
              </td>
              <td className="p-3">
                <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                  <FileText className="w-4 h-4" />
                  عرض
                </button>
              </td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-3">زينب محمد</td>
              <td className="p-3">#1025</td>
              <td className="p-3">
                <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700">
                  قيد المراجعة
                </span>
              </td>
              <td className="p-3">
                <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                  <FileText className="w-4 h-4" />
                  عرض
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
