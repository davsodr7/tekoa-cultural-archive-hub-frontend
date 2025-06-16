import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';

const userSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres").optional().or(z.literal("")),
});

type UserFormValues = z.infer<typeof userSchema>;

const API_URL = 'http://localhost:8000/api/usuarios'; // Ajustado para porta 8000

const UserForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const { register, handleSubmit, reset, formState: { errors } } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    if (isEditMode) {
      axios.get(`${API_URL}/${id}`) // Usa axios.get para buscar
        .then(response => {
          const user = response.data;
          reset({ name: user.name, email: user.email });
        })
        .catch(error => console.error("Erro ao buscar usuário:", error));
    }
  }, [id, isEditMode, reset]);

  const onSubmit = async (data: UserFormValues) => {
    try {
      if (isEditMode) {
        await axios.put(`${API_URL}/${id}`, data); // Usa axios.put para atualizar
      } else {
        await axios.post(API_URL, data); // Usa axios.post para criar
      }
      navigate('/usuarios');
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">{isEditMode ? 'Editar Usuário' : 'Novo Usuário'}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">Nome</Label>
          <Input id="name" {...register('name')} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register('email')} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        {!isEditMode && (
          <div>
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" {...register('password')} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
        )}
        <Button type="submit">{isEditMode ? 'Salvar Alterações' : 'Criar Usuário'}</Button>
      </form>
    </div>
  );
};

export default UserForm; 