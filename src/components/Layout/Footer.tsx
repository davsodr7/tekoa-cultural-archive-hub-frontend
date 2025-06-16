
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t bg-muted/50 cultural-pattern">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-full cultural-gradient"></div>
              <span className="font-bold text-xl text-primary">{t('home.title')}</span>
            </div>
            <p className="text-muted-foreground max-w-md">
              {t('home.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('nav.explore')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/explore?filter=stories" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('explore.filter.stories')}
                </Link>
              </li>
              <li>
                <Link to="/explore?filter=crafts" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('explore.filter.crafts')}
                </Link>
              </li>
              <li>
                <Link to="/explore?filter=music" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('explore.filter.music')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.about')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.contact')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 {t('home.title')}. Preserving indigenous cultures with respect and honor.</p>
        </div>
      </div>
    </footer>
  );
};
