import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from './LanguageSelector';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full cultural-gradient"></div>
            <span className="font-bold text-xl text-primary">{t('home.title')}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/') ? 'text-primary' : 'text-muted-foreground'
                }`}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/explore"
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/explore') ? 'text-primary' : 'text-muted-foreground'
                }`}
            >
              {t('nav.explore')}
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/about') ? 'text-primary' : 'text-muted-foreground'
                }`}
            >
              {t('nav.about')}
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            <LanguageSelector />
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">
                <User className="h-4 w-4 mr-2" />
                {t('nav.login')}
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/register">{t('nav.register')}</Link>
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
