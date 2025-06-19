import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserWithProfile } from '@/lib/types';

const Publicar: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/login');
      return;
    }
    const user: UserWithProfile = JSON.parse(userStr);
    if (user.profileType !== 'indigenous') {
      navigate('/explore');
    }
  }, [navigate]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-primary">Compartilhe sua história, arte ou cultura</h1>
      <p className="mb-6 text-muted-foreground">Esta área é exclusiva para membros indígenas da comunidade. Aqui você pode publicar conteúdos que valorizam e preservam sua cultura.</p>
      {/* Aqui você pode adicionar um formulário de publicação */}
      <div className="bg-white p-6 rounded shadow">
        <p>Formulário de publicação em construção...</p>
      </div>
    </div>
  );
};

export default Publicar; 