
import { useState, useEffect } from 'react';
import BottomNavigation from './BottomNavigation';
import HomeTab from './tabs/HomeTab';
import CreateTab from './tabs/CreateTab';
import ViewTab from './tabs/ViewTab';
import SettingsTab from './tabs/SettingsTab';

interface UserData {
  whatsapp: string;
  name: string;
  photo: string;
}

interface MainAppProps {
  userData: UserData;
}

const MainApp = ({ userData }: MainAppProps) => {
  const [currentTab, setCurrentTab] = useState('home');

  const renderCurrentTab = () => {
    switch (currentTab) {
      case 'home':
        return <HomeTab userData={userData} />;
      case 'create':
        return <CreateTab userData={userData} />;
      case 'view':
        return <ViewTab userData={userData} />;
      case 'settings':
        return <SettingsTab userData={userData} />;
      default:
        return <HomeTab userData={userData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-google-blue/5 via-google-green/5 to-google-yellow/5">
      <div className="pb-20">
        {renderCurrentTab()}
      </div>
      <BottomNavigation currentTab={currentTab} onTabChange={setCurrentTab} />
    </div>
  );
};

export default MainApp;
