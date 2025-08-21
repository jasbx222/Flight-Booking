import { useState } from "react";
import { Plus, Hotel, BedDouble, FileText } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";


export default function HotelsDashboard() {
  const [hotels, setHotels] = useState([
    {
      id: 1,
      name: "فندق مكة جراند",
      location: "مكة المكرمة",
      description: "فندق فاخر قريب من الحرم",
      price: 250,
      status: "مراجعة",
      rooms: [
        { type: "غرفة مفردة", price: 250 },
        { type: "غرفة مزدوجة", price: 400 },
      ],
    },
  ]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-blue-700">
          <Hotel className="w-6 h-6" />
          إدارة الفنادق
        </h1>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
          <Plus className="w-4 h-4" /> إضافة فندق جديد
        </Button>
      </div>

      {/* Hotels List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <Card
            key={hotel.id}
            className="rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition"
          >
            <CardContent className="p-5 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  {hotel.name}
                </h2>
                {hotel.status === "مراجعة" && (
                  <span className="text-sm px-3 py-1 rounded-full bg-yellow-100 text-yellow-600">
                    مراجعة
                  </span>
                )}
                {hotel.status === "تثبيت" && (
                  <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-600">
                    تثبيت
                  </span>
                )}
                {hotel.status === "إلغاء" && (
                  <span className="text-sm px-3 py-1 rounded-full bg-red-100 text-red-600">
                    إلغاء
                  </span>
                )}
              </div>

              <p className="text-gray-500">{hotel.location}</p>
              <p className="text-gray-600 text-sm">{hotel.description}</p>

              <div className="space-y-2">
                {hotel.rooms.map((room, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between text-sm text-gray-700 bg-gray-50 p-2 rounded-lg"
                  >
                    <span className="flex items-center gap-2">
                      <BedDouble className="w-4 h-4 text-blue-500" />
                      {room.type}
                    </span>
                    <span>{room.price} </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-3 border-t">
                <span className="text-blue-600 font-bold">
                  السعر الأساسي: {hotel.price} 
                </span>
                <Button variant="outline" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" /> الحجوزات
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
