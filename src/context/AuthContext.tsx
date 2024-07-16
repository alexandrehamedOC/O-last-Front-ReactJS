// AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';

// Définir le type du contexte
export interface AuthContextType {
  userId: string | null;
  login: (userId: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
  value?: AuthContextType; // Ajoutez cette ligne
}

// Créer un contexte pour stocker l'état de l'authentification
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Créer un composant AuthProvider pour gérer l'état de l'authentification
export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  value,
}) => {
  // Récupérer le token dans le localStorage
  const [userId, setUserId] = useState<string | null>(() => {
    return localStorage.getItem('userId') || null;
  });

  // Fonction pour se connecter
  const login = (userId: string) => {
    setUserId(userId);
    localStorage.setItem('userId', userId);
  };

  // Fonction pour se déconnecter
  const logout = () => {
    setUserId(null);
    localStorage.removeItem('userId');
  };

  // Vérifier si un token est présent dans le localStorage et le récupérer pour initialiser l'état
  // de l'authentification lors du chargement du composant AuthProvider
  useEffect(() => {
    const storeduserId = localStorage.getItem('userId');
    if (storeduserId) {
      setUserId(storeduserId);
    }
  }, []);

  // Rendre le contexte accessible aux composants enfants
  return (
    <AuthContext.Provider value={value || { userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Créer un hook pour accéder au contexte de l'authentification
export const useAuth = () => {
  // Récupérer le contexte de l'authentification
  const context = useContext(AuthContext);
  // Vérifier si le hook est utilisé en dehors du AuthProvider
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
