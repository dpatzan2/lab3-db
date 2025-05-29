'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditarCurso({ params }) {
  const router = useRouter();
  const [curso, setCurso] = useState({
    codigo: '',
    nombre: '',
    descripcion: '',
    creditos: '',
    nivel: '',
    horasSemanales: '',
    activo: true
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/cursos/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setCurso(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch(`/api/cursos/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(curso)
      });

      if (res.ok) {
        alert('Curso actualizado exitosamente');
        router.push('/cursos');
      } else {
        alert('Error al actualizar el curso');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar el curso');
    }
  };

  if (loading) return <div className="p-6">Cargando...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Editar Curso</h1>
        <Link href="/cursos" className="px-4 py-2 bg-gray-600 text-white rounded">
          Volver
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium">Código</label>
          <input
            type="text"
            value={curso.codigo}
            onChange={(e) => setCurso({...curso, codigo: e.target.value})}
            className="w-full p-2 border rounded"
            required
            disabled
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input
            type="text"
            value={curso.nombre}
            onChange={(e) => setCurso({...curso, nombre: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Descripción</label>
          <textarea
            value={curso.descripcion || ''}
            onChange={(e) => setCurso({...curso, descripcion: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Créditos</label>
          <input
            type="number"
            value={curso.creditos}
            onChange={(e) => setCurso({...curso, creditos: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Nivel</label>
          <select
            value={curso.nivel}
            onChange={(e) => setCurso({...curso, nivel: e.target.value})}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Seleccionar nivel</option>
            <option value="INTERMEDIO">INTERMEDIO</option>
            <option value="BASICO">BASICO</option>
            <option value="AVANZADO">AVANZADO</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Horas Semanales</label>
          <input
            type="number"
            value={curso.horasSemanales}
            onChange={(e) => setCurso({...curso, horasSemanales: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={curso.activo}
              onChange={(e) => setCurso({...curso, activo: e.target.checked})}
              className="mr-2"
            />
            Activo
          </label>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Actualizar Curso
        </button>
      </form>
    </div>
  );
}
