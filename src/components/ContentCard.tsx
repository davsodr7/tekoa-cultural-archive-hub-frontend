import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

interface ContentCard {
  id: string;
  title: string;
  description: string;
  type: 'story' | 'craft' | 'music' | 'language' | 'ritual';
  ethnicity: string;
  region: string;
  imageUrl: string;
  creator?: string;
  translationSlug?: string;
}

export const ContentCard: React.FC<ContentCard> = ({
  id,
  title: propTitle,
  description: propDescription,
  type,
  ethnicity,
  region,
  imageUrl,
  creator,
  translationSlug
}) => {
  const { t } = useTranslation();

  const translationKeyMap: Record<string, string> = {
    story: 'stories',
    craft: 'crafts',
    music: 'music',
    language: 'language',
    ritual: 'rituals',
  };

  const typeColors = {
    story: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    craft: 'bg-green-100 text-green-800 hover:bg-green-200',
    music: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
    language: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
    ritual: 'bg-red-100 text-red-800 hover:bg-red-200'
  };

<<<<<<< HEAD
  const translatedTitle = t(`content.${translationSlug || id}.title`, { defaultValue: propTitle });
  const translatedDescription = t(`content.${translationSlug || id}.description`, { defaultValue: propDescription });
=======
  const translatedTitle = t(`content.${id}.title`, { defaultValue: propTitle });
  const translatedDescription = t(`content.${id}.description`, { defaultValue: propDescription });
>>>>>>> recupera-alteracoes

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <div className="aspect-video relative overflow-hidden">
        <img 
<<<<<<< HEAD
          src={`${import.meta.env.VITE_BACKEND_URL}/assets/${imageUrl}`} 
=======
          src={imageUrl.startsWith('/assets/')
            ? `${import.meta.env.VITE_BACKEND_URL}${imageUrl}`
            : `${import.meta.env.VITE_BACKEND_URL}/assets/${imageUrl}`}
>>>>>>> recupera-alteracoes
          alt={translatedTitle}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 left-2">
          <Badge className={typeColors[type]}>
            {t(`explore.filter.${translationKeyMap[type] || type}`)}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{translatedTitle}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-3">{translatedDescription}</p>
        
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge variant="outline" className="text-xs">
            {t('content.ethnicity')}: {ethnicity}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {t('content.region')}: {region}
          </Badge>
        </div>
        
        {creator && (
          <p className="text-xs text-muted-foreground">
            {t('content.created_by')}: {creator}
          </p>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Link 
          to={`/content/${id}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          {t('content.learn_more')} →
        </Link>
      </CardFooter>
    </Card>
  );
};