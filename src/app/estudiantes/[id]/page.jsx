'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditarEstudiante({ params }) {
  const router = useRouter();
  const [estudiante, setEstudiante] = useState({
    carnet: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    fechaNacimiento: '',
    direccion: '',
    activo: true
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEstudiante = async () => {
      const { id } = await params;
      fetch(`/api/estudiantes/${id}`)
        .then(res => res.json())
        .then(data => {
          // Format date for input field
          if (data.fechaNacimiento) {
            data.fechaNacimiento = new Date(data.fechaNacimiento).toISOString().split('T')[0];
          }
          setEstudiante(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error:', error);
          setLoading(false);
        });
    };
    
    fetchEstudiante();
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { id } = await params;
      const res = await fetch(`/api/estudiantes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(estudiante)
      });

      if (res.ok) {
        alert('Estudiante actualizado exitosamente');
        router.push('/estudiantes');
      } else {
        alert('Error al actualizar el estudiante');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar el estudiante');
    }
  };

  if (loading) return <div className="p-6">Cargando...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Editar Estudiante</h1>
        <Link href="/estudiantes" className="px-4 py-2 bg-gray-600 text-white rounded">
          Volver
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium">Carnet</label>
          <input
            type="text"
            value={estudiante.carnet}
            onChange={(e) => setEstudiante({...estudiante, carnet: e.target.value})}
            className="w-full p-2 border rounded"
            required
            disabled
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input
            type="text"
            value={estudiante.nombre}
            onChange={(e) => setEstudiante({...estudiante, nombre: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Apellido</label>
          <input
            type="text"
            value={estudiante.apellido}
            onChange={(e) => setEstudiante({...estudiante, apellido: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={estudiante.email}
            onChange={(e) => setEstudiante({...estudiante, email: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Teléfono</label>
          <input
            type="text"
            value={estudiante.telefono || ''}
            onChange={(e) => setEstudiante({...estudiante, telefono: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Fecha de Nacimiento</label>
          <input
            type="date"
            value={estudiante.fechaNacimiento || ''}
            onChange={(e) => setEstudiante({...estudiante, fechaNacimiento: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Dirección</label>
          <textarea
            value={estudiante.direccion || ''}
            onChange={(e) => setEstudiante({...estudiante, direccion: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={estudiante.activo}
              onChange={(e) => setEstudiante({...estudiante, activo: e.target.checked})}
              className="mr-2"
            />
            Activo
          </label>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Actualizar Estudiante
        </button>
      </form>
    </div>
  );
}
