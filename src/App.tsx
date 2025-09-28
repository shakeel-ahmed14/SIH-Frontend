import React, { useState } from 'react';
// import { Layout } from './components/Layout';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { NamasteCodes } from './components/pages/NamasteCodes';
import { TM2Codes } from './components/pages/TM2Codes';
import { Mappings } from './components/pages/Mappings';
import { ProfileList } from './components/pages/ProfileList';
import { FHIRDownloads } from './components/pages/FHIRDownloads';
import { AdminPage } from './components/pages/AdminPage';
import { HelpPage } from './components/pages/HelpPage';
import { SettingsPage } from './components/pages/SettingsPage';
import Landing from './components/Landing';


export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [sidebarOpen, setSidebarOpen] = useState(true);



  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <Landing onNavigate={setCurrentPage} />;
      case 'home':
        return <Dashboard />;
      case 'namaste-codes':
        return <NamasteCodes />;
      case 'tm2-codes':
        return <TM2Codes />;
      case 'mappings':
        return <Mappings />;
      case 'profiles':
        return <ProfileList />;
      case 'downloads':
        return <FHIRDownloads />;
      case 'admin':
        return <AdminPage />;
      case 'help':
        return <HelpPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <>
      <div className="relative min-h-screen flex text-foreground antialiased">
        {/* Blurred background image */}
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-md z-0"
          style={{ backgroundImage: "url('/morning-scenery-wallpaper-1920x1200_6.jpg')" }}
        ></div>

        {/* Content */}
        <div className="relative z-10 flex w-full">
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
                ? `px-4 py-8 transition-all duration-300 ${sidebarOpen ? "container max-w-full m-5" : "w-full m-5"} m-2 rounded-lg bg-[#eefae8]/70`
                : "flex-1 min-h-screen"
            }
          >
            {renderCurrentPage()}
          </main>
        </div>
      </div>

    </>
  );

}