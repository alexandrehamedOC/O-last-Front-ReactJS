// AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';

// Définir le type du contexte
interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

// Créer un contexte pour stocker l'état de l'authentification
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Créer un composant AuthProvider pour gérer l'état de l'authentification
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Récupérer le token dans le localStorage
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token') || null;
  });

  // Fonction pour se connecter
  const login = (token: string) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  // Fonction pour se déconnecter
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  // Vérifier si un token est présent dans le localStorage et le récupérer pour initialiser l'état
  // de l'authentification lors du chargement du composant AuthProvider
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Rendre le contexte accessible aux composants enfants
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
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
