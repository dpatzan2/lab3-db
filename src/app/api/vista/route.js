import { obtenerVistaEstudiantesCursos } from '@/libs/db';

export async function GET() {
  try {
    const estudiantes = await obtenerVistaEstudiantesCursos();
    return Response.json(estudiantes);
  } catch (error) {
    return Response.json({ error: 'Error fetching estudiantes' }, { status: 500 });
  }
}