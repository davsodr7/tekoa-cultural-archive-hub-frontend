declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.gif';
declare module '*.svg';

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
<<<<<<< HEAD
  // adicione outras variáveis de ambiente aqui se necessário
=======
>>>>>>> recupera-alteracoes
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 