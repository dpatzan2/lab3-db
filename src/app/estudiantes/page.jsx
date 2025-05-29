'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ListaEstudiantes() {
  const [estudiantes, setEstudiantes] = useState([]);

  useEffect(() => {
    fetch('/api/estudiantes')
      .then(res => res.json())
      .then(setEstudiantes);
  }, []);

  const handleDelete = async (id, nombre) => {
    if (!confirm(`¿Estás seguro de que quieres eliminar al estudiante ${nombre}?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/estudiantes/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        alert('Estudiante eliminado exitosamente');
        
        setEstudiantes(estudiantes.filter(est => est.id !== id));
      } else {
        alert('Error al eliminar el estudiante');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar el estudiante');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="px-4 py-2 bg-gray-600 text-white rounded">
            ← Volver
          </Link>
          <h1 className="text-xl font-bold">Estudiantes</h1>
        </div>
        <Link href="/estudiantes/nuevo" className="px-4 py-2 bg-blue-600 text-white rounded">
          Nuevo Estudiante
        </Link>
      </div>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Código</th>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map(est => (
            <tr key={est.id} className="border-t">
              <td className="p-2 border">{est.codigo}</td>
              <td className="p-2 border">{est.nombre} {est.apellido}</td>
              <td className="p-2 border">{est.email}</td>
              <td className="p-2 border">
                <Link href={`/estudiantes/${est.id}`} className="text-blue-600 underline mr-2">Editar</Link>
                <button 
                  onClick={() => handleDelete(est.id, `${est.nombre} ${est.apellido}`)}
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
