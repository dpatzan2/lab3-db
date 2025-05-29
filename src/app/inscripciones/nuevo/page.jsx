'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NuevaInscripcion() {
  const router = useRouter();
  const [estudiantes, setEstudiantes] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [form, setForm] = useState({
    estudianteId: '',
    cursoId: '',
    periodo: '',
    notaFinal: '',
    asistencia: 0,
    aprobado: false,
  });

  useEffect(() => {
    fetch('/api/estudiantes').then(res => res.json()).then(setEstudiantes);
    fetch('/api/cursos').then(res => res.json()).then(setCursos);
  }, []);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch('/api/inscripciones', {
      method: 'POST',
      body: JSON.stringify({ ...form, asistencia: parseInt(form.asistencia) }),
      headers: { 'Content-Type': 'application/json' },
    });
    router.push('/inscripciones');
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Nueva Inscripción</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Estudiante</label>
          <select name="estudianteId" value={form.estudianteId} onChange={handleChange} required className="w-full p-2 border rounded">
            <option value="">-- Seleccionar --</option>
            {estudiantes.map(e => (
              <option key={e.id} value={e.id}>{e.nombre} {e.apellido}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Curso</label>
          <select name="cursoId" value={form.cursoId} onChange={handleChange} required className="w-full p-2 border rounded">
            <option value="">-- Seleccionar --</option>
            {cursos.map(c => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </div>
        <input type="text" name="periodo" value={form.periodo} onChange={handleChange} placeholder="Periodo (Ej. 2025-1)" className="w-full p-2 border rounded" required />
        <input type="number" step="0.01" name="notaFinal" value={form.notaFinal} onChange={handleChange} placeholder="Nota final" className="w-full p-2 border rounded" />
        <input type="number" name="asistencia" value={form.asistencia} onChange={handleChange} placeholder="Asistencia (%)" className="w-full p-2 border rounded" />
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" name="aprobado" checked={form.aprobado} onChange={handleChange} />
          Aprobado
        </label>
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Guardar</button>
      </form>
    </div>
  );
}
