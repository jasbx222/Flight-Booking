import { useState } from "react";
import { Plus, UserCheck, UserX, Edit, Trash2 } from "lucide-react";

interface Employee {
  id: number;
  name: string;
  email: string;
  role: "موظف" | "مشرف";
  active: boolean;
}

export default function EmployeesDashboard() {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: "أحمد علي", email: "ahmed@gmail.com", role: "موظف", active: true },
    { id: 2, name: "ليلى محمد", email: "laila@gmail.com", role: "مشرف", active: false },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", role: "موظف" });

  const handleSave = () => {
    const newEmployee: any = {
      id: Date.now(),
      ...formData,
      active: true,
    };
    setEmployees([newEmployee, ...employees]);
    setModalOpen(false);
    setFormData({ name: "", email: "", role: "موظف" });
  };

  const toggleActive = (id: number) => {
    setEmployees(employees.map(e => e.id === id ? { ...e, active: !e.active } : e));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-sky-50 min-h-screen" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">إدارة الموظفين</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0824071a] to-[#011b0341] text-white rounded-xl shadow hover:scale-105 transition-transform"
        >
          <Plus size={18} /> إضافة موظف
        </button>
      </div>

      {/* Employees Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
        <table className="min-w-full divide-y divide-gray-200 text-right">
          <thead className="bg-sky-100">
            <tr>
              <th className="px-4 py-2">الاسم</th>
              <th className="px-4 py-2">الإيميل</th>
              <th className="px-4 py-2">الدور</th>
              <th className="px-4 py-2">الحالة</th>
              <th className="px-4 py-2">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {employees.map(emp => (
              <tr key={emp.id} className="hover:bg-sky-50">
                <td className="px-4 py-2">{emp.name}</td>
                <td className="px-4 py-2">{emp.email}</td>
                <td className="px-4 py-2">{emp.role}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => toggleActive(emp.id)}
                    className={`px-2 py-1 rounded-full text-white text-sm ${
                      emp.active ? "bg-green-500" : "bg-red-500"
                    } flex items-center gap-1`}
                  >
                    {emp.active ? <UserCheck size={14} /> : <UserX size={14} />}
                    {emp.active ? "مفعل" : "غير مفعل"}
                  </button>
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button className="p-2 bg-blue-100 rounded hover:bg-blue-200">
                    <Edit size={16} />
                  </button>
                  <button className="p-2 bg-red-100 rounded hover:bg-red-200">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-slide-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">إضافة موظف جديد</h2>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded-full hover:bg-gray-100 transition">
                ✖
              </button>
            </div>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <div>
                <label className="block mb-1 font-semibold">الاسم</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-right"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">الإيميل</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-right"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">الدور</label>
                <select
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-right"
                >
                  <option value="موظف">موظف</option>
                  <option value="مشرف">مشرف</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">إلغاء</button>
                <button type="submit" className="px-4 py-2 bg-gradient-to-r from-[#0F5BFF] to-[#41BC4C] text-white rounded-lg hover:scale-105 transition-transform">حفظ</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
