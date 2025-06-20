import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from './LanguageSelector';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  const navLinkClasses = `
    text-sm font-medium transition-all duration-300
    hover:text-foreground hover:scale-105
    focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background rounded-sm
  `;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-gradient-to-r from-[#2A2A2A] to-[#1a1a1a] shadow-md">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src="/logo.svg" alt="Tekoá Logo" className="h-8 w-8" />
            <span className="font-bold text-xl text-foreground">{t('home.title')}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`${navLinkClasses} ${isActive('/') && location.pathname === '/' ? 'text-foreground' : 'text-muted-foreground'
                }`}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/explore"
              className={`${navLinkClasses} ${isActive('/explore') ? 'text-foreground' : 'text-muted-foreground'
                }`}
            >
              {t('nav.explore')}
            </Link>
            <Link
              to="/about"
              className={`${navLinkClasses} ${isActive('/about') ? 'text-foreground' : 'text-muted-foreground'
                }`}
            >
              {t('nav.about')}
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            <LanguageSelector />
            <Button size="sm" asChild>
              <Link to="/admin/conteudos">Admin</Link>
            </Button>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
