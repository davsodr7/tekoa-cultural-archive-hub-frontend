import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/usuarios';

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const navigate = useNavigate();

  // Buscar usuários da API ao carregar a página
  useEffect(() => {
    axios.get(API_URL)
      .then(response => setUsers(response.data))
      .catch(error => {
        console.error("Erro ao buscar usuários:", error);
        setUsers([]);
      });
  }, []);

  // Função para excluir usuário
  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setUsers(users.filter(user => user.id !== id));
      } catch (error) {
        console.error("Erro ao excluir usuário:", error);
      }
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Usuários</h2>
        <Link to="/usuarios/novo" className="bg-blue-500 text-white px-4 py-2 rounded">Novo Usuário</Link>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Nome</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border">{user.id}</td>
              <td className="py-2 px-4 border">{user.name}</td>
              <td className="py-2 px-4 border">{user.email}</td>
              <td className="py-2 px-4 border">
                <button className="text-blue-500 mr-2" onClick={() => navigate(`/usuarios/${user.id}/editar`)}>Editar</button>
                <button className="text-red-500" onClick={() => handleDelete(user.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList; 