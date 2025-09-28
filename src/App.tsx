import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { Dashboard } from "./components/Dashboard";
import { NamasteCodes } from "./components/pages/NamasteCodes";
import { TM2Codes } from "./components/pages/TM2Codes";
import { Mappings } from "./components/pages/Mappings";
import { ProfileList } from "./components/pages/ProfileList";
import { FHIRDownloads } from "./components/pages/FHIRDownloads";
import { AdminPage } from "./components/pages/AdminPage";
import { HelpPage } from "./components/pages/HelpPage";
import { SettingsPage } from "./components/pages/SettingsPage";
import Landing from "./components/Landing";


export default function App() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "landing":
        return <Landing onNavigate={setCurrentPage} />;
      case "home":
        return <Dashboard />;
      case "namaste-codes":
        return <NamasteCodes />;
      case "tm2-codes":
        return <TM2Codes />;
      case "mappings":
        return <Mappings />;
      case "profiles":
        return <ProfileList />;
      case "downloads":
        return <FHIRDownloads />;
      case "admin":
        return <AdminPage />;
      case "help":
        return <HelpPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#f6f5fb] via-[#fdf8f1] to-[#edf2ff] text-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,_rgba(34,94,201,0.14),_transparent_58%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_12%,_rgba(250,209,150,0.18),_transparent_60%)]" />

      <div className="relative flex min-h-screen">
        {currentPage !== "landing" && (
          <Navigation
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onToggle={setSidebarOpen}
          />
        )}

        <main
          className={
            currentPage !== "landing"
              ? `flex-1 transition-all duration-300 ease-out ${
                  sidebarOpen ? "md:ml-0" : ""
                }`
              : "flex-1"
          }
        >
          <div
            className={
              currentPage !== "landing"
                ? "mx-auto w-full max-w-6xl px-4 py-10 sm:px-8"
                : ""
            }
          >
            {renderCurrentPage()}
          </div>
        </main>
      </div>
    </div>
  );

}