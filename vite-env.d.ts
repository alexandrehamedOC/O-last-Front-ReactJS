/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // Ajoutez d'autres variables d'environnement ici si nécessaire
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}
