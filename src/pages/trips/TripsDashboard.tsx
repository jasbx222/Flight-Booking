import { useState } from "react";
import { Plus, Edit, Trash2, Eye, X } from "lucide-react";
import placeholderImg from './../../../public/Objects.png';

interface Booking {
  user: string;
  seats: number;
  total: number;
}

interface Trip {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  status: "مراجعة" | "تثبيت" | "إلغاء";
  bookings: Booking[];
}

export default function TripsDashboard() {
  const [trips, setTrips] = useState<Trip[]>([
    {
      id: 1,
      name: "رحلة الجبال",
      description: "استمتع بالمناظر الطبيعية الخلابة.",
      price: 120,
      image: placeholderImg,
      status: "مراجعة",
      bookings: [
        { user: "أحمد", seats: 2, total: 240 },
        { user: "ليلى", seats: 1, total: 120 },
      ],
    },
    {
      id: 2,
      name: "رحلة الصحراء",
      description: "تجربة سفاري مثيرة في قلب الصحراء.",
      price: 200,
      image: placeholderImg,
      status: "تثبيت",
      bookings: [{ user: "سعيد", seats: 3, total: 600 }],
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [bookingModal, setBookingModal] = useState<Trip | null>(null);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "", price: 0, image: "" });

  const openModal = (trip: Trip | null = null) => {
    setEditingTrip(trip);
    if (trip) setFormData({ name: trip.name, description: trip.description, price: trip.price, image: trip.image });
    else setFormData({ name: "", description: "", price: 0, image: "" });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editingTrip) {
      setTrips(trips.map(t => (t.id === editingTrip.id ? { ...t, ...formData } : t)));
    } else {
      const newTrip: Trip = { id: Date.now(), ...formData, status: "مراجعة", bookings: [] };
      setTrips([newTrip, ...trips]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: number) => setTrips(trips.filter(t => t.id !== id));

  const statusColors: Record<Trip["status"], string> = {
    مراجعة: "bg-yellow-400",
    تثبيت: "bg-green-500",
    إلغاء: "bg-red-500",
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">إدارة الرحلات البرية</h1>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} /> إضافة رحلة جديدة
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full text-right text-gray-800">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-sm font-semibold">اسم الرحلة</th>
              <th className="p-3 text-sm font-semibold">الوصف</th>
              <th className="p-3 text-sm font-semibold">السعر</th>
              <th className="p-3 text-sm font-semibold">الحالة</th>
              <th className="p-3 text-sm font-semibold">الحجوزات</th>
              <th className="p-3 text-sm font-semibold">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {trips.map(trip => (
              <tr key={trip.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3 font-semibold">{trip.name}</td>
                <td className="p-3">{trip.description}</td>
                <td className="p-3">${trip.price}</td>
                <td className="p-3">
                  <span className={`px-3 py-1 rounded-full text-white text-sm ${statusColors[trip.status]}`}>
                    {trip.status}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => setBookingModal(trip)}
                    className="px-3 py-1 bg-green-100 rounded-lg hover:bg-green-200 transition"
                  >
                    عرض الحجوزات
                  </button>
                </td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => openModal(trip)} className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDelete(trip.id)} className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                    <Trash2 size={16} />
                  </button>
                  <button onClick={() => setBookingModal(trip)} className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Add/Edit */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-slide-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{editingTrip ? "تعديل الرحلة" : "إضافة رحلة جديدة"}</h2>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded-full hover:bg-gray-100 transition">
                <X size={20} />
              </button>
            </div>
            <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleSave(); }}>
              <input
                type="text"
                placeholder="اسم الرحلة"
                className="w-full border rounded-lg px-3 py-2 text-right"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <textarea
                placeholder="وصف الرحلة"
                className="w-full border rounded-lg px-3 py-2 text-right"
                rows={3}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="السعر"
                className="w-full border rounded-lg px-3 py-2 text-right"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                required
              />
              <input
                type="text"
                placeholder="رابط الصورة"
                className="w-full border rounded-lg px-3 py-2 text-right"
                value={formData.image}
                onChange={e => setFormData({ ...formData, image: e.target.value })}
              />
              <div className="flex justify-start gap-3 flex-wrap">
                <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition">إلغاء</button>
                <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">حفظ</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Bookings */}
      {bookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 animate-slide-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">الحجوزات - {bookingModal.name}</h2>
              <button onClick={() => setBookingModal(null)} className="p-1 rounded-full hover:bg-gray-100 transition">
                <X size={20} />
              </button>
            </div>
            <div className="overflow-y-auto max-h-96">
              {bookingModal.bookings.length === 0 ? (
                <p className="text-gray-500 text-center">لا توجد حجوزات</p>
              ) : (
                <table className="w-full text-right border-separate border-spacing-2">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 text-sm font-semibold">المستخدم</th>
                      <th className="p-2 text-sm font-semibold">عدد المقاعد</th>
                                      <th className="p-2 text-sm font-semibold">المجموع</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingModal.bookings.map((b, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition">
                        <td className="p-2">{b.user}</td>
                        <td className="p-2">{b.seats}</td>
                        <td className="p-2">${b.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

