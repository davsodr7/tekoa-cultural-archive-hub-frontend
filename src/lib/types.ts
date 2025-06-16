export interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: 'story' | 'craft' | 'music' | 'language' | 'ritual';
  ethnicity: string;
  region: string;
  imageUrl: string;
  creator?: string;
} 