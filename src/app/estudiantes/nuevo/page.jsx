'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NuevoEstudiante() {
  const router = useRouter();
  const [form, setForm] = useState({
    codigo: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    fechaNacimiento: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch('/api/estudiantes', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    });
    router.push('/estudiantes');
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Nuevo Estudiante</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['codigo', 'nombre', 'apellido', 'email', 'telefono', 'fechaNacimiento'].map((field) => (
          <div key={field}>
            <label className="block mb-1 capitalize">{field}</label>
            <input
              name={field}
              type={field === 'fechaNacimiento' ? 'date' : 'text'}
              value={form[field]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required={['codigo', 'nombre', 'apellido', 'email', 'fechaNacimiento'].includes(field)}
            />
          </div>
        ))}
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Guardar</button>
      </form>
    </div>
  );
}
