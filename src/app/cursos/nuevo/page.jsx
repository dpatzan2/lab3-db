'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NuevoCurso() {
  const router = useRouter();
  const [form, setForm] = useState({
    codigo: '',
    nombre: '',
    descripcion: '',
    creditos: '',
    nivel: 'BASICO',
    horasSemanales: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch('/api/cursos', {
      method: 'POST',
      body: JSON.stringify({ ...form, creditos: parseInt(form.creditos), horasSemanales: parseInt(form.horasSemanales) }),
      headers: { 'Content-Type': 'application/json' },
    });
    router.push('/cursos');
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Nuevo Curso</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['codigo', 'nombre', 'descripcion', 'creditos', 'horasSemanales'].map(field => (
          <div key={field}>
            <label className="block mb-1 capitalize">{field}</label>
            <input
              name={field}
              type={field === 'creditos' || field === 'horasSemanales' ? 'number' : 'text'}
              value={form[field]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required={field !== 'descripcion'}
            />
          </div>
        ))}
        <div>
          <label className="block mb-1">Nivel</label>
          <select name="nivel" value={form.nivel} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="BASICO">Básico</option>
            <option value="INTERMEDIO">Intermedio</option>
            <option value="AVANZADO">Avanzado</option>
          </select>
        </div>
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Guardar</button>
      </form>
    </div>
  );
}
