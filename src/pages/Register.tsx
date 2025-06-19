import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from 'react-i18next';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { UserRegisterDTO, UserDTO } from '@/lib/types';

const API_URL = 'http://localhost:8000/api/usuarios/register';

export const Register: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserRegisterDTO>({
    name: '',
    email: '',
    password: '',
    profileType: undefined
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const user: any = await response.json();
        localStorage.setItem('user', JSON.stringify(user));
        // Redirecionar conforme o tipo de perfil
        if (user.profileType === 'indigenous') {
          navigate('/publicar');
        } else if (user.profileType === 'educator') {
          navigate('/materiais-exclusivos');
        } else {
          navigate('/explore');
        }
      } else if (response.status === 400) {
        setError(t('register.validation_error'));
      } else {
        setError(t('register.server_error'));
      }
    } catch (err) {
      setError(t('register.network_error'));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (value: 'indigenous' | 'educator' | 'general') => {
    setFormData(prev => ({
      ...prev,
      profileType: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 cultural-pattern py-8">
      <div className="w-full max-w-md mx-4">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full cultural-gradient"></div>
            </div>
            <CardTitle className="text-2xl font-bold text-primary">
              Crie sua conta para participar da comunidade
            </CardTitle>
            <p className="mt-2 text-muted-foreground text-sm">
              Escolha seu perfil: indígena (compartilhe histórias, arte e cultura), educador (acesse materiais exclusivos) ou público geral (descubra e apoie a cultura indígena).
            </p>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label>Tipo de perfil</Label>
                <Select onValueChange={handleSelectChange} required disabled={loading} value={formData.profileType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione seu perfil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="indigenous">
                      Indígena (quero compartilhar histórias, arte e cultura)
                    </SelectItem>
                    <SelectItem value="educator">
                      Educador (quero acessar materiais exclusivos)
                    </SelectItem>
                    <SelectItem value="general">
                      Público geral (quero conhecer e apoiar a cultura indígena)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Criando conta...' : 'Criar conta'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Já tem uma conta?{' '}
                <Link to="/login" className="text-primary hover:underline">
                  Entrar
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
