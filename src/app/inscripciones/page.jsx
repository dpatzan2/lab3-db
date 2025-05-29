'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ListaInscripciones() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/inscripciones')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Data recibida:', data); // ← Validación en consola
        setData(data); // Actualiza el estado
      })
      .catch(error => {
        console.error('Error al obtener datos:', error); // ← Manejo de errores
      });
  }, []);

  const handleDelete = async (id, estudiante, curso) => {
    if (!confirm(`¿Estás seguro de que quieres eliminar la inscripción de ${estudiante} en ${curso}?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/inscripciones/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        alert('Inscripción eliminada exitosamente');
        // Recargar la lista de inscripciones
        setData(data.filter(inscripcion => inscripcion.id !== id));
      } else {
        alert('Error al eliminar la inscripción');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar la inscripción');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="px-4 py-2 bg-gray-600 text-white rounded">
            ← Volver
          </Link>
          <h1 className="text-xl font-bold">Inscripciones</h1>
        </div>
        <Link href="/inscripciones/nuevo" className="px-4 py-2 bg-blue-600 text-white rounded">
          Nueva Inscripción
        </Link>
      </div>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Estudiante</th>
            <th className="p-2 border">Curso</th>
            <th className="p-2 border">Periodo</th>
            <th className="p-2 border">Nota</th>
            <th className="p-2 border">Aprobado</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-t">
              <td className="p-2 border">{row.estudiante?.nombre} {row.estudiante?.apellido}</td>
              <td className="p-2 border">{row.curso?.nombre}</td>
              <td className="p-2 border">{row.periodo}</td>
              <td className="p-2 border">{row.notaFinal ?? 'N/A'}</td>
              <td className="p-2 border">{row.aprobado ? 'Sí' : 'No'}</td>
              <td className="p-2 border">
                <Link href={`/inscripciones/${row.id}`} className="text-blue-600 underline mr-2">Editar</Link>
                <button 
                  onClick={() => handleDelete(row.id, `${row.estudiante?.nombre} ${row.estudiante?.apellido}`, row.curso?.nombre)}
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
