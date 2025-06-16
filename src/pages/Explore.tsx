import React, { useState, useEffect, useMemo } from 'react';
import { ExploreHeader } from '@/components/ExploreHeader';
import { ContentGrid } from '@/components/ContentGrid';
import { useTranslation } from 'react-i18next';
import { ContentItem } from '@/lib/types';
import { mockContent } from '@/data/mockContent';

export const Explore: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [allContent, setAllContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento de dados
    const loadContent = async () => {
      setLoading(true);
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500));
      setAllContent(mockContent);
      setLoading(false);
    };

    loadContent();
  }, []);

  const filters = [
    { key: 'all', label: t('explore.filter.all') },
    { key: 'stories', label: t('explore.filter.stories'), type: 'story' },
    { key: 'crafts', label: t('explore.filter.crafts'), type: 'craft' },
    { key: 'music', label: t('explore.filter.music'), type: 'music' },
    { key: 'language', label: t('explore.filter.language'), type: 'language' },
    { key: 'rituals', label: t('explore.filter.rituals'), type: 'ritual' }
  ];

  const filteredContent = useMemo(() => {
    let filtered = allContent;

    // Filter by type
    if (selectedFilter !== 'all') {
      const filterType = filters.find(f => f.key === selectedFilter)?.type;
      if (filterType) {
        filtered = filtered.filter(item => item.type === filterType);
      }
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item => {
        const { t } = useTranslation();
        const translatedTitle = t(`content.${item.id}.title`, item.title);
        const translatedDescription = t(`content.${item.id}.description`, item.description);
        
        return translatedTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
               translatedDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
               item.ethnicity.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    return filtered;
  }, [searchTerm, selectedFilter, filters, allContent]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-primary">
        Carregando conteúdos...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ExploreHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        filters={filters}
      />

      <ContentGrid
        filteredContent={filteredContent}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        setSearchTerm={setSearchTerm}
        filters={filters}
      />
    </div>
  );
};