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

const contentSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  type: z.enum(['story', 'craft', 'music', 'language', 'ritual'], { message: "Tipo inválido" }),
  ethnicity: z.string().min(1, "Etnia é obrigatória"),
  region: z.string().min(1, "Região é obrigatória"),
  imageUrl: z.string().url("URL da imagem inválida").min(1, "URL da imagem é obrigatória"),
  creator: z.string().optional(),
});

type ContentFormValues = z.infer<typeof contentSchema>;

const API_URL = 'http://localhost:8000/api/conteudos';

const ContentForm: React.FC = () => {
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
      <h2 className="text-2xl font-bold mb-4">{isEditMode ? 'Editar Conteúdo' : 'Novo Conteúdo'}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="title">Título</Label>
          <Input id="title" {...register('title')} />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>
        <div>
          <Label htmlFor="description">Descrição</Label>
          <Textarea id="description" {...register('description')} />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>
        <div>
          <Label htmlFor="type">Tipo</Label>
          <Select onValueChange={(value) => setValue('type', value as any)} defaultValue={isEditMode ? '' : undefined}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="story">História</SelectItem>
              <SelectItem value="craft">Artesanato</SelectItem>
              <SelectItem value="music">Música</SelectItem>
              <SelectItem value="language">Linguagem</SelectItem>
              <SelectItem value="ritual">Ritual</SelectItem>
            </SelectContent>
          </Select>
          {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
        </div>
        <div>
          <Label htmlFor="ethnicity">Etnia</Label>
          <Input id="ethnicity" {...register('ethnicity')} />
          {errors.ethnicity && <p className="text-red-500 text-sm">{errors.ethnicity.message}</p>}
        </div>
        <div>
          <Label htmlFor="region">Região</Label>
          <Input id="region" {...register('region')} />
          {errors.region && <p className="text-red-500 text-sm">{errors.region.message}</p>}
        </div>
        <div>
          <Label htmlFor="imageUrl">URL da Imagem</Label>
          <Input id="imageUrl" {...register('imageUrl')} />
          {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>}
        </div>
        <div>
          <Label htmlFor="creator">Criador (Opcional)</Label>
          <Input id="creator" {...register('creator')} />
        </div>
        <Button type="submit">{isEditMode ? 'Salvar Alterações' : 'Criar Conteúdo'}</Button>
      </form>
    </div>
  );
};

export default ContentForm; 