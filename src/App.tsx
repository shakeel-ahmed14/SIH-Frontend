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
      <div className="min-h-screen flex bg-[#2e392e] text-foreground antialiased">
        {currentPage !== "landing" && (
          <Navigation
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onToggle={setSidebarOpen} // track sidebar state
          />
        )}
        <main
          className={
            currentPage !== "landing"
              ? `px-4 py-8 transition-all duration-300 ${sidebarOpen ? "container mx-auto max-w-7xl" : "w-full"
              } m-2 rounded-lg bg-white`
              : "container"
          }
        >
          {renderCurrentPage()}
        </main>


      </div>
    </>
  );

}