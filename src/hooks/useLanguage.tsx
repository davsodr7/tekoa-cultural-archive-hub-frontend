import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'pt' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.explore': 'Explore',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.about': 'About',
    'home.title': 'Tekoá Conectada',
    'home.subtitle': 'Preserving and Sharing Brazilian Indigenous Cultures',
    'home.description': 'Discover the rich cultural heritage of Brazilian indigenous peoples through stories, art, music, and ancestral traditions.',
    'home.explore_btn': 'Explore Content',
    'home.learn_more': 'Learn More',
    'explore.title': 'Explore Brazilian Indigenous Heritage',
    'explore.search_placeholder': 'Search stories, crafts, languages...',
    'explore.filter.all': 'All Content',
    'explore.filter.stories': 'Stories & Legends',
    'explore.filter.crafts': 'Traditional Crafts',
    'explore.filter.music': 'Music & Dance',
    'explore.filter.language': 'Languages',
    'explore.filter.rituals': 'Ceremonies & Rituals',
    'login.title': 'Welcome Back',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.submit': 'Sign In',
    'login.no_account': "Don't have an account?",
    'login.register_link': 'Register here',
    'register.title': 'Join Our Community',
    'register.name': 'Full Name',
    'register.email': 'Email',
    'register.password': 'Password',
    'register.profile_type': 'Profile Type',
    'register.profile.indigenous': 'Indigenous Community Member',
    'register.profile.educator': 'Educator',
    'register.profile.general': 'General Public',
    'register.submit': 'Create Account',
    'register.have_account': 'Already have an account?',
    'register.login_link': 'Sign in here',
    'content.ethnicity': 'Ethnicity',
    'content.region': 'Region',
    'content.created_by': 'Shared by',
    'content.learn_more': 'Learn More',
    'footer.about': 'About Tekoá Conectada',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Use',
    'about.mission.title': 'Our Mission',
    'about.mission.1': 'The Tekoá Cultural Archive Hub serves as a bridge between Brazilian Indigenous communities and the modern world, promoting understanding, respect, and appreciation of the rich cultural heritage of the original peoples of Brazil.',
    'about.mission.2': 'Our platform offers a space for cultural preservation, education, and intercultural dialogue, supporting the Sustainable Development Goals of the United Nations, especially SDG 4 (Quality Education) and SDG 16 (Peace, Justice, and Strong Institutions).',
    'about.mission.3': 'We recognize the importance of the 305 Indigenous peoples of Brazil and their 274 languages, contributing to the maintenance of this unique diversity in the world.'
  },
  pt: {
    'nav.home': 'Início',
    'nav.explore': 'Explorar',
    'nav.login': 'Entrar',
    'nav.register': 'Registrar',
    'nav.about': 'Sobre',
    'home.title': 'Tekoá Conectada',
    'home.subtitle': 'Preservando e Compartilhando Culturas Indígenas Brasileiras',
    'home.description': 'Descubra a rica herança cultural dos povos indígenas brasileiros através de histórias, arte, música e tradições ancestrais.',
    'home.explore_btn': 'Explorar Conteúdo',
    'home.learn_more': 'Saiba Mais',
    'explore.title': 'Explorar Patrimônio Indígena Brasileiro',
    'explore.search_placeholder': 'Buscar histórias, artesanato, línguas...',
    'explore.filter.all': 'Todo Conteúdo',
    'explore.filter.stories': 'Histórias e Lendas',
    'explore.filter.crafts': 'Artesanato Tradicional',
    'explore.filter.music': 'Música e Dança',
    'explore.filter.language': 'Línguas',
    'explore.filter.rituals': 'Cerimônias e Rituais',
    'login.title': 'Bem-vindo de Volta',
    'login.email': 'Email',
    'login.password': 'Senha',
    'login.submit': 'Entrar',
    'login.no_account': 'Não tem uma conta?',
    'login.register_link': 'Registre-se aqui',
    'register.title': 'Junte-se à Nossa Comunidade',
    'register.name': 'Nome Completo',
    'register.email': 'Email',
    'register.password': 'Senha',
    'register.profile_type': 'Tipo de Perfil',
    'register.profile.indigenous': 'Membro da Comunidade Indígena',
    'register.profile.educator': 'Educador',
    'register.profile.general': 'Público Geral',
    'register.submit': 'Criar Conta',
    'register.have_account': 'Já tem uma conta?',
    'register.login_link': 'Entre aqui',
    'content.ethnicity': 'Etnia',
    'content.region': 'Região',
    'content.created_by': 'Compartilhado por',
    'content.learn_more': 'Saiba Mais',
    'footer.about': 'Sobre Tekoá Conectada',
    'footer.contact': 'Contato',
    'footer.privacy': 'Política de Privacidade',
    'footer.terms': 'Termos de Uso',
    'about.mission.title': 'Nossa Missão',
    'about.mission.1': 'O Tekoá Cultural Archive Hub serve como uma ponte entre as comunidades indígenas brasileiras e o mundo moderno, promovendo compreensão, respeito e valorização da rica herança cultural dos povos originários do Brasil.',
    'about.mission.2': 'Nossa plataforma oferece um espaço para preservação cultural, educação e diálogo intercultural, apoiando os Objetivos de Desenvolvimento Sustentável da ONU, especialmente o ODS 4 (Educação de Qualidade) e ODS 16 (Paz, Justiça e Instituições Fortes).',
    'about.mission.3': 'Reconhecemos a importância dos 305 povos indígenas brasileiros e suas 274 línguas, contribuindo para a manutenção dessa diversidade única no mundo.',
    'home.feature.stories': 'Narrativas ancestrais que revelam a sabedoria e a cosmovisão dos povos indígenas.',
    'home.feature.crafts': 'Peças únicas que expressam a criatividade e a conexão com a natureza de cada etnia.',
    'home.feature.music': 'Ritmos e movimentos que celebram a vida, rituais e a identidade cultural dos povos originários.'
  },
  es: {
    'nav.home': 'Inicio',
    'nav.explore': 'Explorar',
    'nav.login': 'Iniciar Sesión',
    'nav.register': 'Registrarse',
    'nav.about': 'Acerca de',
    'home.title': 'Tekoá Conectada',
    'home.subtitle': 'Preservando y Compartiendo Culturas Indígenas Brasileñas',
    'home.description': 'Descubre el rico patrimonio cultural de los pueblos indígenas brasileños a través de historias, arte, música y tradiciones ancestrales.',
    'home.explore_btn': 'Explorar Contenido',
    'home.learn_more': 'Saber Más',
    'explore.title': 'Explorar Patrimonio Indígena Brasileño',
    'explore.search_placeholder': 'Buscar historias, artesanías, lenguas...',
    'explore.filter.all': 'Todo el Contenido',
    'explore.filter.stories': 'Historias y Leyendas',
    'explore.filter.crafts': 'Artesanías Tradicionales',
    'explore.filter.music': 'Música y Danza',
    'explore.filter.language': 'Lenguas',
    'explore.filter.rituals': 'Ceremonias y Rituales',
    'login.title': 'Bienvenido de Nuevo',
    'login.email': 'Correo Electrónico',
    'login.password': 'Contraseña',
    'login.submit': 'Iniciar Sesión',
    'login.no_account': '¿No tienes una cuenta?',
    'login.register_link': 'Regístrate aquí',
    'register.title': 'Únete a Nuestra Comunidad',
    'register.name': 'Nombre Completo',
    'register.email': 'Correo Electrónico',
    'register.password': 'Contraseña',
    'register.profile_type': 'Tipo de Perfil',
    'register.profile.indigenous': 'Miembro de Comunidad Indígena',
    'register.profile.educator': 'Educador',
    'register.profile.general': 'Público General',
    'register.submit': 'Crear Cuenta',
    'register.have_account': '¿Ya tienes una cuenta?',
    'register.login_link': 'Inicia sesión aquí',
    'content.ethnicity': 'Etnia',
    'content.region': 'Región',
    'content.created_by': 'Compartido por',
    'content.learn_more': 'Saber Más',
    'footer.about': 'Acerca de Tekoá Conectada',
    'footer.contact': 'Contacto',
    'footer.privacy': 'Política de Privacidad',
    'footer.terms': 'Términos de Uso',
    'about.mission.title': 'Nuestra Misión',
    'about.mission.1': 'El Tekoá Cultural Archive Hub sirve como puente entre las comunidades indígenas brasileñas y el mundo moderno, promoviendo la comprensión, el respeto y el valoración del rico patrimonio cultural de los pueblos originarios de Brasil.',
    'about.mission.2': 'Nuestra plataforma ofrece un espacio para la preservación cultural, la educación y el diálogo intercultural, apoyando los Objetivos de Desarrollo Sostenible de la ONU, especialmente el Objetivo de Desarrollo Sostenible 4 (Educación de Calidad) y el Objetivo de Desarrollo Sostenible 16 (Paz, Justicia y Establecimientos Fuertes).',
    'about.mission.3': 'Reconocemos la importancia de los 305 pueblos indígenas brasileños y sus 274 idiomas, contribuyendo a la conservación de esta diversidad única en el mundo.'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
