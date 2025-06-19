export interface ContentItem {
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

export interface UserDTO {
  id: number;
  name: string;
  email: string;
}

export interface UserRegisterDTO {
  name: string;
  email: string;
  password: string;
  profileType?: 'indigenous' | 'educator' | 'general';
}