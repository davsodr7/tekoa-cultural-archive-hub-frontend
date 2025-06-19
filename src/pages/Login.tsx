import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { UserLoginDTO, UserDTO } from '@/lib/types';

const API_URL = 'http://localhost:8000/api/usuarios/login';

export const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserLoginDTO>({
    email: '',
    password: ''
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
        body: JSON.stringify(formData as UserLoginDTO),
      });

      if (response.ok) {
        const user: any = await response.json();
        // Salvar dados do usuário no localStorage
        localStorage.setItem('user', JSON.stringify(user));
        // Redirecionar conforme o tipo de perfil
        if (user.profileType === 'indigenous') {
          navigate('/publicar'); // exemplo: rota para publicar conteúdo
        } else if (user.profileType === 'educator') {
          navigate('/materiais-exclusivos'); // exemplo: rota para materiais exclusivos
        } else {
          navigate('/explore'); // público geral
        }
      } else if (response.status === 401) {
        setError(t('login.invalid_credentials'));
      } else {
        setError(t('login.server_error'));
      }
    } catch (err) {
      setError(t('login.network_error'));
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 cultural-pattern">
      <div className="w-full max-w-md mx-4">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full cultural-gradient"></div>
            </div>
            <CardTitle className="text-2xl font-bold text-primary">
              {t('login.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('login.email')}</Label>
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
                <Label htmlFor="password">{t('login.password')}</Label>
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

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t('login.loading') : t('login.submit')}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {t('login.no_account')}{' '}
                <Link to="/register" className="text-primary hover:underline">
                  {t('login.register_link')}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
