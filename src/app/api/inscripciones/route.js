import prisma from '@/libs/db';

export async function GET() {
  const inscripciones = await prisma.inscripcion.findMany({
    include: {
      estudiante: true,
      curso: true,
    }
  });
  return Response.json(inscripciones);
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.estudianteId || !body.cursoId || !body.periodo) {
      return new Response(JSON.stringify({ error: 'Faltan campos obligatorios' }), { status: 400 });
    }

    const inscripcion = await prisma.inscripcion.create({
      data: {
        estudianteId: parseInt(body.estudianteId),
        cursoId: parseInt(body.cursoId),
        periodo: body.periodo,
        notaFinal: body.notaFinal ?? null,
        asistencia: body.asistencia ?? 0,
        aprobado: body.aprobado ?? false
      }
    });

    return Response.json(inscripcion);
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
