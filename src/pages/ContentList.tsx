import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const API_URL = 'http://localhost:8080/api/conteudos';

const ContentList: React.FC = () => {
  const [contents, setContents] = useState<any[]>([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Buscar conteúdos da API ao carregar a página
  useEffect(() => {
    axios.get(API_URL) // Usa axios.get
      .then(response => setContents(response.data))
      .catch(error => {
        console.error("Erro ao buscar conteúdos:", error);
        setContents([]);
      });
  }, []);

  // Função para excluir conteúdo
  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este conteúdo?')) {
      try {
        await axios.delete(`${API_URL}/${id}`); // Usa axios.delete
        setContents(contents.filter(content => content.id !== id));
      } catch (error) {
        console.error("Erro ao excluir conteúdo:", error);
      }
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{t('content.title')}s</h2>
        <Link to="/conteudos/novo" className="bg-blue-500 text-white px-4 py-2 rounded">{t('content.new_content')}</Link>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">{t('content.title')}</th>
            <th className="py-2 px-4 border">{t('content.type')}</th>
            <th className="py-2 px-4 border">{t('content.ethnicity')}</th>
            <th className="py-2 px-4 border">{t('content.region')}</th>
            <th className="py-2 px-4 border">{t('content.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {contents.map((content) => (
            <tr key={content.id}>
              <td className="py-2 px-4 border">{content.id}</td>
              <td className="py-2 px-4 border">{content.title}</td>
              <td className="py-2 px-4 border">{content.type}</td>
              <td className="py-2 px-4 border">{content.ethnicity}</td>
              <td className="py-2 px-4 border">{content.region}</td>
              <td className="py-2 px-4 border">
                <button className="text-blue-500 mr-2" onClick={() => navigate(`/conteudos/${content.id}/editar`)}>{t('content.edit')}</button>
                <button className="text-red-500" onClick={() => handleDelete(content.id)}>{t('content.delete')}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContentList; 