import { Card, CardContent } from "../../ui/card";
import plain from "./../../../../public/Objects.png";
import { ChartPieLabelList } from "./DonatChart";
import { ChartLineDotsCustom } from "./LineChart";
import { ChartBarLabel } from "./TableChart";

export default function Dashboard() {
  return (
    <div className="bg-gradient-to-br from-sky-50 to-sky-100 min-h-screen p-4 sm:p-6 lg:p-8" dir="rtl">
      <div className="flex flex-col gap-8">
        {/* Top Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="relative bg-gradient-to-tr from-orange-400 to-yellow-500 text-white p-6 rounded-2xl shadow-lg overflow-hidden transform transition hover:scale-105">
            <CardContent className="relative z-10">
              <h3 className="text-lg font-semibold">Boeing 708</h3>
              <p className="text-3xl font-bold">#850</p>
            </CardContent>
            <img src={plain} alt="Boeing" className="absolute bottom-0 right-0 w-32 opacity-70 animate-pulse" />
          </Card>

          <Card className="relative bg-gradient-to-tr from-teal-700 to-cyan-600 text-white p-6 rounded-2xl shadow-lg overflow-hidden transform transition hover:scale-105">
            <CardContent className="relative z-10">
              <h3 className="text-lg font-semibold">Airbus 768</h3>
              <p className="text-3xl font-bold">#920</p>
            </CardContent>
            <img src={plain} alt="Airbus" className="absolute bottom-0 right-0 w-32 opacity-70" />
          </Card>

          <Card className="relative bg-gradient-to-tr from-sky-800 to-sky-600 text-white p-6 rounded-2xl shadow-lg overflow-hidden">
            <CardContent className="relative z-10">
              <h3 className="text-lg font-semibold">Total Flights</h3>
              <p className="text-3xl font-bold">750</p>
            </CardContent>
            <img src="https://img.icons8.com/ios-filled/200/world-map.png" alt="Map" className="absolute bottom-0 right-0 w-32 opacity-30" />
          </Card>
        </div>

        {/* Trips & Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Last Trips */}
          <Card className="p-6 rounded-2xl shadow-lg bg-white/80 backdrop-blur-md overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4">Last Trips</h3>
            <div className="flex flex-col gap-4">
              {[
                { name: "John", email: "john987@gmail.com", country: "India", trips: 2, amount: 520, img: "https://i.pravatar.cc/40?img=1" },
                { name: "Smith", email: "smith123@gmail.com", country: "USA", trips: 3, amount: 750, img: "https://i.pravatar.cc/40?img=2" },
              ].map((user, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 gap-2 sm:gap-0">
                  <div className="flex items-center gap-3">
                    <img src={user.img} alt={user.name} className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <p className="font-medium">{user.country}</p>
                  <span className={`px-2 py-1 rounded-full text-sm ${user.trips === 2 ? "bg-orange-500 text-white" : "bg-blue-500 text-white"}`}>
                    {user.trips}
                  </span>
                  <p className="font-semibold text-green-600">${user.amount}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Statistics Chart */}
          <Card className="p-6 rounded-2xl  backdrop-blur-md">
            <h3 className="text-lg font-semibold mb-4">Statistics</h3>
            <div className="w-full h-48 flex items-center justify-center text-gray-400 overflow-x-auto">
              <ChartPieLabelList />
            </div>
          </Card>
        </div>

        {/* Bottom Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 rounded-2xl shadow-lg bg-white/80 backdrop-blur-md">
            <h3 className="text-lg font-semibold mb-4">Flight Share</h3>
            <div className="w-full h-48 flex items-center justify-center text-gray-400 overflow-x-auto">
              <ChartBarLabel />
            </div>
          </Card>
          <Card className="p-6 rounded-2xl shadow-lg bg-white/80 backdrop-blur-md">
            <h3 className="text-lg font-semibold mb-4">Daily Flights</h3>
            <div className="w-full h-48 flex items-center justify-center text-gray-400 overflow-x-auto">
              <ChartLineDotsCustom />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
