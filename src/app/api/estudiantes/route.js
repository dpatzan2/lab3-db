import prisma from '@/libs/db';

export async function GET() {
  const estudiantes = await prisma.estudiante.findMany({
    include: { inscripciones: true }
  });
  return Response.json(estudiantes);
}

export async function POST(request) {
  try {
    const body = await request.json();

    
    if (!body.codigo || !body.nombre || !body.apellido || !body.email) {
      return new Response(JSON.stringify({ error: 'Faltan campos obligatorios' }), { status: 400 });
    }

    const estudiante = await prisma.estudiante.create({
      data: {
        codigo: body.codigo,
        nombre: body.nombre,
        apellido: body.apellido,
        email: body.email,
        telefono: body.telefono || null,
        fechaNacimiento: new Date(body.fechaNacimiento),
        estado: body.estado || 'ACTIVO',
      },
    });

    return Response.json(estudiante);
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
