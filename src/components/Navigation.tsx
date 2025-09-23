import React, { useState } from 'react';
import { Button } from './ui/button';
import {
  Home,
  Code,
  Map,
  Users,
  Download,
  Shield,
  HelpCircle,
  Settings,
  Menu,
  X
} from 'lucide-react';

interface NavigationProps {
  currentPage?: string;
  onPageChange?: (page: string) => void;
}

export function Navigation({ currentPage = 'home', onPageChange }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'namaste-codes', label: 'Namaste Codes', icon: Code },
    { id: 'tm2-codes', label: 'TM2/ICD-11', icon: Code },
    { id: 'mappings', label: 'Mappings', icon: Map },
    { id: 'profiles', label: 'Patient Records', icon: Users },
    { id: 'downloads', label: 'FHIR Downloads', icon: Download },
    { id: 'admin', label: 'Admin', icon: Shield },
    { id: 'help', label: 'Help', icon: HelpCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (pageId: string) => {
    if (onPageChange) {
      onPageChange(pageId);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-red">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="bg-primary text-primary-foreground px-3 py-1 rounded-lg">
              <span className="font-semibold">Code Mapping Portal</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.slice(0, 4).map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-2 
                  ${currentPage === item.id ? "bg-zinc-700 text-white" : "hover:bg-zinc-300"}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>

              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Desktop Right Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.slice(4).map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  onClick={() => handleNavClick(item.id)}
                  size="sm"
                >
                  <Icon className="w-4 h-4" />
                </Button>
              );
            })}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "default" : "ghost"}
                    onClick={() => handleNavClick(item.id)}
                    className="justify-start"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}