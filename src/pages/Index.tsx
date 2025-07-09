
import { useState, useEffect } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import Auth from '../components/Auth';
import MainApp from '../components/MainApp';

interface UserData {
  whatsapp: string;
  name: string;
  photo: string;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleAuthSuccess = (data: UserData) => {
    setUserData(data);
    setIsAuthenticated(true);
    
    // Sauvegarder dans localStorage pour persistance
    localStorage.setItem('gdg_user_data', JSON.stringify(data));
  };

  // Vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    const savedUserData = localStorage.getItem('gdg_user_data');
    if (savedUserData) {
      try {
        const parsedData = JSON.parse(savedUserData);
        setUserData(parsedData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Erreur lors du parsing des données utilisateur:', error);
        localStorage.removeItem('gdg_user_data');
      }
    }
  }, []);

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  if (!isAuthenticated || !userData) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  return <MainApp userData={userData} />;
};

export default Index;
