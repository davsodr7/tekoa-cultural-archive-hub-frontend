import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserWithProfile } from '@/lib/types';

const MateriaisExclusivos: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/login');
      return;
    }
    const user: UserWithProfile = JSON.parse(userStr);
    if (user.profileType !== 'educator') {
      navigate('/explore');
    }
  }, [navigate]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-primary">Materiais Exclusivos para Educadores</h1>
      <p className="mb-6 text-muted-foreground">Esta área é exclusiva para educadores. Aqui você pode acessar conteúdos, planos de aula e materiais didáticos sobre cultura indígena.</p>
      {/* Aqui você pode adicionar a listagem de materiais */}
      <div className="bg-white p-6 rounded shadow">
        <p>Materiais em construção...</p>
      </div>
    </div>
  );
};

export default MateriaisExclusivos; 