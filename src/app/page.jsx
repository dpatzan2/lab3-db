'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/vista')
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error en la respuesta: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('✅ Data recibida de /api/vista:', data);
        setData(data);
      })
      .catch(err => {
        console.error('❌ Error al obtener /api/vista:', err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Panel de navegación */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-800 p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-6">Panel de Administración Académica</h1>
          
          <div className="flex flex-wrap gap-4">
            <Link href="/estudiantes" className="transform hover:scale-105 transition-all">
              <div className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl p-4 border border-white/20 flex items-center space-x-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-white font-semibold">Estudiantes</h2>
                  <p className="text-white/70 text-sm">Gestión de registros</p>
                </div>
              </div>
            </Link>

            <Link href="/cursos" className="transform hover:scale-105 transition-all">
              <div className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl p-4 border border-white/20 flex items-center space-x-3">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-white font-semibold">Cursos</h2>
                  <p className="text-white/70 text-sm">Catálogo académico</p>
                </div>
              </div>
            </Link>

            <Link href="/inscripciones" className="transform hover:scale-105 transition-all">
              <div className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl p-4 border border-white/20 flex items-center space-x-3">
                <div className="bg-green-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-white font-semibold">Inscripciones</h2>
                  <p className="text-white/70 text-sm">Registro académico</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Contenido principal - Tabla original */}
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Vista de Estudiantes y Cursos</h1>
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Estudiante</th>
              <th className="p-2 border">Código</th>
              <th className="p-2 border">Curso</th>
              <th className="p-2 border">Código Curso</th>
              <th className="p-2 border">Periodo</th>
              <th className="p-2 border">Nota Final</th>
              <th className="p-2 border">Estado</th>
              <th className="p-2 border">Asistencia</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i} className="border-t">
                <td className="p-2 border">{item.nombre_completo}</td>
                <td className="p-2 border">{item.codigo_estudiante}</td>
                <td className="p-2 border">{item.nombre_curso}</td>
                <td className="p-2 border">{item.codigo_curso}</td>
                <td className="p-2 border">{item.periodo}</td>
                <td className="p-2 border">{item.notaFinal}</td>
                <td className="p-2 border">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    item.estado_academico === 'Aprobado' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.estado_academico}
                  </span>
                </td>
                <td className="p-2 border">{item.porcentaje_asistencia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}