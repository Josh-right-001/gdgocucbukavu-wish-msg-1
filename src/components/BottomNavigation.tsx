
import { Home, Plus, Eye, Settings } from 'lucide-react';

interface BottomNavigationProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation = ({ currentTab, onTabChange }: BottomNavigationProps) => {
  const tabs = [
    { id: 'home', label: 'Accueil', icon: Home, color: 'text-google-blue' },
    { id: 'create', label: 'Créer', icon: Plus, color: 'text-google-green' },
    { id: 'view', label: 'Voir', icon: Eye, color: 'text-google-yellow' },
    { id: 'settings', label: 'Paramètres', icon: Settings, color: 'text-google-red' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? `${tab.color} bg-gray-100 scale-110` 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'animate-bounce-slow' : ''}`} />
              <span className={`text-xs font-medium ${isActive ? 'font-bold' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
