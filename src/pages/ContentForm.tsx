import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const ContentForm: React.FC = () => {
  const { t } = useTranslation();

  const contentSchema = z.object({
    title: z.string().min(1, t('content.title_required')),
    description: z.string().min(1, t('content.description_required')),
    type: z.enum(['story', 'craft', 'music', 'language', 'ritual'], { message: t('content.invalid_type') }),
    ethnicity: z.string().min(1, t('content.ethnicity_required')),
    region: z.string().min(1, t('content.region_required')),
    imageUrl: z.string().url(t('content.invalid_image_url')).min(1, t('content.image_url_required')),
    creator: z.string().optional(),
  });

  type ContentFormValues = z.infer<typeof contentSchema>;

  const API_URL = 'http://localhost:8080/api/conteudos';

  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ContentFormValues>({
    resolver: zodResolver(contentSchema),
  });

  useEffect(() => {
    if (isEditMode) {
      axios.get(`${API_URL}/${id}`)
        .then(response => {
          const content = response.data;
          reset(content);
        })
        .catch(error => console.error("Erro ao buscar conteúdo:", error));
    }
  }, [id, isEditMode, reset]);

  const onSubmit = async (data: ContentFormValues) => {
    try {
      if (isEditMode) {
        await axios.put(`${API_URL}/${id}`, data);
      } else {
        await axios.post(API_URL, data);
      }
      navigate('/conteudos');
    } catch (error) {
      console.error("Erro ao salvar conteúdo:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">{isEditMode ? t('content.edit_content') : t('content.new_content_form')}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="title">{t('content.title')}</Label>
          <Input id="title" {...register('title')} />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>
        <div>
          <Label htmlFor="description">{t('content.description')}</Label>
          <Textarea id="description" {...register('description')} />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>
        <div>
          <Label htmlFor="type">{t('content.type')}</Label>
          <Select onValueChange={(value) => setValue('type', value as any)} defaultValue={isEditMode ? '' : undefined}>
            <SelectTrigger>
              <SelectValue placeholder={t('content.select_type')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="story">{t('content.story')}</SelectItem>
              <SelectItem value="craft">{t('content.craft')}</SelectItem>
              <SelectItem value="music">{t('content.music')}</SelectItem>
              <SelectItem value="language">{t('content.language')}</SelectItem>
              <SelectItem value="ritual">{t('content.ritual')}</SelectItem>
            </SelectContent>
          </Select>
          {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
        </div>
        <div>
          <Label htmlFor="ethnicity">{t('content.ethnicity')}</Label>
          <Input id="ethnicity" {...register('ethnicity')} />
          {errors.ethnicity && <p className="text-red-500 text-sm">{errors.ethnicity.message}</p>}
        </div>
        <div>
          <Label htmlFor="region">{t('content.region')}</Label>
          <Input id="region" {...register('region')} />
          {errors.region && <p className="text-red-500 text-sm">{errors.region.message}</p>}
        </div>
        <div>
          <Label htmlFor="imageUrl">{t('content.image_url')}</Label>
          <Input id="imageUrl" {...register('imageUrl')} />
          {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>}
        </div>
        <div>
          <Label htmlFor="creator">{t('content.creator_optional')}</Label>
          <Input id="creator" {...register('creator')} />
        </div>
        <Button type="submit">{isEditMode ? t('content.save_changes') : t('content.create_content')}</Button>
      </form>
    </div>
  );
};

export default ContentForm; 