'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ListaCursos() {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    fetch('/api/cursos')
      .then(res => res.json())
      .then(setCursos);
  }, []);

  const handleDelete = async (id, nombre) => {
    if (confirm(`¿Estás seguro de eliminar el curso "${nombre}"?`)) {
      try {
        const res = await fetch(`/api/cursos/${id}`, {
          method: 'DELETE'
        });
        
        if (res.ok) {
          setCursos(cursos.filter(curso => curso.id !== id));
          alert('Curso eliminado exitosamente');
        } else {
          alert('Error al eliminar el curso');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar el curso');
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="px-4 py-2 bg-gray-600 text-white rounded">
            ← Volver
          </Link>
          <h1 className="text-xl font-bold">Cursos</h1>
        </div>
        <Link href="/cursos/nuevo" className="px-4 py-2 bg-blue-600 text-white rounded">
          Nuevo Curso
        </Link>
      </div>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Código</th>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Créditos</th>
            <th className="p-2 border">Nivel</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map(curso => (
            <tr key={curso.id} className="border-t">
              <td className="p-2 border">{curso.codigo}</td>
              <td className="p-2 border">{curso.nombre}</td>
              <td className="p-2 border">{curso.creditos}</td>
              <td className="p-2 border">{curso.nivel}</td>
              <td className="p-2 border">
                <Link href={`/cursos/${curso.id}`} className="text-blue-600 underline mr-2">
                  Editar
                </Link>
                <button 
                  onClick={() => handleDelete(curso.id, curso.nombre)}
                  className="text-red-600 underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
