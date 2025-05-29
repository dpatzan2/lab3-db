'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditarInscripcion({ params }) {
  const router = useRouter();
  const [inscripcion, setInscripcion] = useState({
    estudianteId: '',
    cursoId: '',
    fechaInscripcion: '',
    notaFinal: '',
    asistencia: '',
    aprobado: false,
    periodo: ''
  });
  const [estudiantes, setEstudiantes] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { id } = await params;
      
      // Cargar inscripción, estudiantes y cursos
      const [inscripcionRes, estudiantesRes, cursosRes] = await Promise.all([
        fetch(`/api/inscripciones/${id}`),
        fetch('/api/estudiantes'),
        fetch('/api/cursos')
      ]);

      const [inscripcionData, estudiantesData, cursosData] = await Promise.all([
        inscripcionRes.json(),
        estudiantesRes.json(),
        cursosRes.json()
      ]);

      // Formatear fecha para input
      if (inscripcionData.fechaInscripcion) {
        inscripcionData.fechaInscripcion = new Date(inscripcionData.fechaInscripcion).toISOString().split('T')[0];
      }

      setInscripcion(inscripcionData);
      setEstudiantes(estudiantesData);
      setCursos(cursosData);
      setLoading(false);
    };

    fetchData();
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { id } = await params;
      const res = await fetch(`/api/inscripciones/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inscripcion)
      });

      if (res.ok) {
        alert('Inscripción actualizada exitosamente');
        router.push('/inscripciones');
      } else {
        alert('Error al actualizar la inscripción');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar la inscripción');
    }
  };

  if (loading) return <div className="p-6">Cargando...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Editar Inscripción</h1>
        <Link href="/inscripciones" className="px-4 py-2 bg-gray-600 text-white rounded">
          Volver
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium">Estudiante</label>
          <select
            value={inscripcion.estudianteId}
            onChange={(e) => setInscripcion({...inscripcion, estudianteId: e.target.value})}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Seleccionar estudiante</option>
            {estudiantes.map(est => (
              <option key={est.id} value={est.id}>
                {est.nombre} {est.apellido} - {est.carnet}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Curso</label>
          <select
            value={inscripcion.cursoId}
            onChange={(e) => setInscripcion({...inscripcion, cursoId: e.target.value})}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Seleccionar curso</option>
            {cursos.map(curso => (
              <option key={curso.id} value={curso.id}>
                {curso.codigo} - {curso.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Fecha de Inscripción</label>
          <input
            type="date"
            value={inscripcion.fechaInscripcion}
            onChange={(e) => setInscripcion({...inscripcion, fechaInscripcion: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Nota Final</label>
          <input
            type="number"
            min="0"
            max="100"
            value={inscripcion.notaFinal}
            onChange={(e) => setInscripcion({...inscripcion, notaFinal: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Asistencia</label>
          <input
            type="number"
            min="0"
            value={inscripcion.asistencia}
            onChange={(e) => setInscripcion({...inscripcion, asistencia: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Período</label>
          <input
            type="text"
            value={inscripcion.periodo}
            onChange={(e) => setInscripcion({...inscripcion, periodo: e.target.value})}
            className="w-full p-2 border rounded"
            placeholder="Ej: 2024-1"
            required
          />
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={inscripcion.aprobado}
              onChange={(e) => setInscripcion({...inscripcion, aprobado: e.target.checked})}
              className="mr-2"
            />
            Aprobado
          </label>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Actualizar Inscripción
        </button>
      </form>
    </div>
  );
}
