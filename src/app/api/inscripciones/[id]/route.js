import prisma from '@/libs/db';

export async function GET(_, { params }) {
  const { id } = await params;
  const inscripcion = await prisma.inscripcion.findUnique({
    where: { id: parseInt(id) },
    include: { 
      estudiante: true,
      curso: true 
    }
  });

  if (!inscripcion) return new Response('No encontrado', { status: 404 });
  return Response.json(inscripcion);
}

export async function PUT(request, { params }) {
  const body = await request.json();

  try {
    const updated = await prisma.inscripcion.update({
      where: { id: body.id },
      data: {
        estudianteId: parseInt(body.estudianteId),
        cursoId: parseInt(body.cursoId),
        fechaInscripcion: new Date(body.fechaInscripcion),
        notaFinal: body.notaFinal,
        asistencia: parseInt(body.asistencia),
        aprobado: body.aprobado,
        periodo: body.periodo
      }
    });

    return Response.json(updated);
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  const { id } = await params;
  try {
    await prisma.inscripcion.delete({
      where: { id: parseInt(id) },
    });

    return new Response('Inscripción eliminada correctamente');
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
