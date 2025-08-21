import { useState } from "react";
import { Plus, Trash2, Edit } from "lucide-react";
import img from './../../../public/Objects.png';

export default function AdsDashboard() {
  const [ads, setAds] = useState<any>([
    { id: 1, type: "slider", image: img, link: img, hotel: "", active: true },
    { id: 2, type: "banner", image: img, link: "#", hotel: "Hilton", active: false },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const openModal = (item: any = null) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleDelete = (id: any) => {
    setAds(ads.filter((a: any) => a.id !== id));
  };

  const handleSave = (item: any) => {
    if (item.id) {
      setAds(ads.map((a: any) => (a.id === item.id ? item : a)));
    } else {
      setAds([...ads, { ...item, id: Date.now() }]);
    }
    setModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">إدارة الإعلانات</h1>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-5 py-2 rounded-2xl bg-gradient-to-b from-sky-900 via-teal-900 to-[#002f2a] text-white font-semibold shadow-md hover:scale-105 transition-transform duration-300"
        >
          <Plus size={18} /> إضافة إعلان
        </button>
      </div>

      <div className="overflow-x-auto shadow-md rounded-2xl bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">النوع</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">الصورة</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">الرابط</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">الفندق</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ads.map((ad: any) => (
              <tr key={ad.id} className="hover:bg-gray-50 transition-all duration-300">
                <td className="px-6 py-4 whitespace-nowrap">{ad.type === "slider" ? "سلايدر" : "بانر"}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={ad.image} alt="ad" className="w-20 h-12 object-cover rounded-lg shadow" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap break-all">{ad.link}</td>
                <td className="px-6 py-4 whitespace-nowrap">{ad.hotel || "-"}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${ad.active ? "bg-green-500" : "bg-gray-400"}`}>
                    {ad.active ? "نشط" : "غير نشط"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center flex justify-center gap-2">
                  <button onClick={() => openModal(ad)} className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDelete(ad.id)} className="p-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && <AdModal item={editingItem} onClose={() => setModalOpen(false)} onSave={handleSave} />}
    </div>
  );
}

function AdModal({ item, onClose, onSave }: any) {
  const [type, setType] = useState(item?.type || "slider");
  const [image, setImage] = useState(item?.image || "");
  const [link, setLink] = useState(item?.link || "");
  const [hotel, setHotel] = useState(item?.hotel || "");
  const [active, setActive] = useState(item?.active ?? true);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSave({ ...item, type, image, link, hotel, active });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-11/12 md:w-1/2 p-6 animate-slide-in">
        <h2 className="text-xl font-bold mb-4">{item ? "تعديل الإعلان" : "إضافة إعلان جديد"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">نوع الإعلان</label>
            <select value={type} onChange={e => setType(e.target.value)} className="w-full border rounded-lg px-3 py-2">
              <option value="slider">سلايدر</option>
              <option value="banner">بانر</option>
            </select>
          </div>
          {type === "banner" && (
            <div>
              <label className="block mb-1 font-semibold">الفندق (اختياري)</label>
              <input type="text" value={hotel} onChange={e => setHotel(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
            </div>
          )}
          <div>
            <label className="block mb-1 font-semibold">رابط الصورة</label>
            <input type="text" value={image} onChange={e => setImage(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block mb-1 font-semibold">رابط الإعلان</label>
            <input type="text" value={link} onChange={e => setLink(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={active} onChange={e => setActive(e.target.checked)} />
            <span>نشط</span>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition">إلغاء</button>
            <button type="submit" className="px-4 py-2 bg-gradient-to-b from-sky-900 via-teal-900 to-[#002f2a] text-white rounded-lg hover:scale-105 transition-transform">حفظ</button>
          </div>
        </form>
      </div>
    </div>
  );
}
