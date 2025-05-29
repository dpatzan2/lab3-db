import prisma from '@/libs/db';

export async function GET(_, { params }) {
  const estudiante = await prisma.estudiante.findUnique({
    where: { id: parseInt(params.id) },
    include: { inscripciones: true }
  });

  if (!estudiante) return new Response('No encontrado', { status: 404 });
  return Response.json(estudiante);
}

export async function PUT(request, { params }) {
  const body = await request.json();

  try {
    const updated = await prisma.estudiante.update({
      where: { id: body.id },
      data: {
        nombre: body.nombre,
        apellido: body.apellido,
        telefono: body.telefono,
        estado: body.estado,
      },
    });

    return Response.json(updated);
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    await prisma.estudiante.delete({
      where: { id: parseInt(params.id) },
    });

    return new Response('Eliminado correctamente');
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
