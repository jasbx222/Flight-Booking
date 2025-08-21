import Home from "./components/pages/home/Home";
import AdsDashboard from "./pages/ads/Ads";
import BookingsDashboard from "./pages/books/Books";
import EmployeesDashboard from "./pages/employe/Employes";
import HotelsDashboard from "./pages/hotels/Hotels";
import TripsDashboard from "./pages/trips/TripsDashboard";
import UmrahDashboard from "./pages/umra_trips/UmrahDashboard";

export const routes = [
  {
    id: 1,
    element: <Home />,
    href: "/",
  },
  {
    id: 2,
    element: <UmrahDashboard />,
    href: "/umra",
  },
  {
      id: 3,
    element: <HotelsDashboard />,
    href: "/hotels",
  },
  {
      id: 4,
    element: <AdsDashboard />,
    href: "/ads",
  },
  {
      id: 5,
    element: <TripsDashboard />,
    href: "/trips",
  },
  {
      id: 6,
    element: <BookingsDashboard />,
    href: "/bookings",
  },
  {
      id: 7,
    element: <EmployeesDashboard />,
    href: "/employes",
  },
];
