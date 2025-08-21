// App.tsx
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import MainContent from "./MainContent";
import HeaderWithNotifications from "./pages/header/Header";


function App() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        {/* Header with Notifications */}
        <HeaderWithNotifications />

        {/* Main Dashboard Content */}
        <div className="p-6">
          <MainContent />
        </div>
      </main>
    </div>
  );
}

export default App;
