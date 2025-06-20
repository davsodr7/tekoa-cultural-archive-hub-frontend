import React, { useState, useEffect, useMemo } from 'react';
import { ExploreHeader } from '@/components/ExploreHeader';
import ContentGrid from '@/components/ContentGrid';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Content } from '@/lib/types';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/conteudos`;

export const Explore: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [allContent, setAllContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<'createdAt'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Mapeamento dos títulos da API para os slugs de tradução
  const contentSlugMap: Record<string, string> = {
    "Uirapuru: O Pássaro Místico": "uirapuru",
    "Arte Marajoara: Cerâmica da Ilha": "marajoara",
    "Toré dos Fulni-ô: Dança Sagrada": "tore",
    "Mandioca: Raiz da Vida Indígena": "mandioca",
    "Trançado Yanomami: Arte da Floresta": "trancado",
    "Pintura Corporal Kadiwéu: A Arte de Ser": "pintura",
    "Ritual do Quarup: A Celebração da Vida e Morte": "quarup",
    "Língua Guarani: Herança Viva": "guarani",
  };

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<Content[]>(API_URL);
        console.log('Dados recebidos da API:', response.data);
        
        // Adicionar o translationSlug a cada item de conteúdo
        const contentsWithSlugs = response.data.map(item => ({
          ...item,
          translationSlug: contentSlugMap[item.title] || item.title.toLowerCase().replace(/[^a-z0-9]+/g, '') // Fallback para slug simples
        }));
        setAllContent(contentsWithSlugs);
      } catch (err) {
        console.error("Erro ao buscar conteúdos:", err);
        setError("Não foi possível carregar os conteúdos. Tente novamente mais tarde.");
        setAllContent([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
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
        const searchTargetTitle = item.translationSlug ? t(`content.${item.translationSlug}.title`, { defaultValue: item.title }) : item.title;
        const searchTargetDescription = item.translationSlug ? t(`content.${item.translationSlug}.description`, { defaultValue: item.description }) : item.description;
        
        return searchTargetTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
               searchTargetDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
               (item.ethnicity && item.ethnicity.toLowerCase().includes(searchTerm.toLowerCase())) ||
               (item.region && item.region.toLowerCase().includes(searchTerm.toLowerCase()));
      });
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      const aDate = a[sortField] ? new Date(a[sortField]!).getTime() : 0;
      const bDate = b[sortField] ? new Date(b[sortField]!).getTime() : 0;
      return sortOrder === 'asc' ? aDate - bDate : bDate - aDate;
    });

    return filtered;
  }, [searchTerm, selectedFilter, filters, allContent, t, sortField, sortOrder]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-xl text-primary">Carregando conteúdos culturais...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Tentar novamente
          </button>
        </div>
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
        sortField={sortField}
        setSortField={setSortField}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
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