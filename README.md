# Sistema de Gestión Académica - Laboratorio 3

Un sistema web completo para la gestión académica desarrollado con Next.js 15, Prisma ORM y PostgreSQL, permite administrar estudiantes, cursos e inscripciones de manera eficiente, para ver la pantalla de los diferentes CRUD: [Pantallas del laboratorio.pdf](https://github.com/user-attachments/files/20515433/Pantallas.del.laboratorio.pdf)


## 🚀 Características Principales

- **Gestión de Estudiantes**: CRUD completo para el manejo de información estudiantil
- **Administración de Cursos**: Creación y gestión de cursos académicos
- **Sistema de Inscripciones**: Gestión de inscripciones estudiantiles a cursos
- **Vista Integrada**: Vista completa de estudiantes y cursos con información académica
- **API RESTful**: Endpoints completos para todas las operaciones
- **Base de Datos Relacional**: Modelo de datos robusto con PostgreSQL

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 15 (App Router)
- **Backend**: Next.js API Routes
- **Base de Datos**: PostgreSQL
- **ORM**: Prisma
- **Lenguaje**: JavaScript
- **Styling**: Tailwind CSS (según implementación)

## 📋 Requisitos Previos

- Node.js 18.x o superior
- PostgreSQL 12.x o superior
- npm o yarn como gestor de paquetes

## 🔧 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/dpatzan2/lab3-db.git
   cd lab3-next-prisma
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Editar el archivo `.env` con tu configuración de base de datos:
   ```env
   DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/lab3?schema=public"
   ```

4. **Levantar proyecto**

   ### Opción A: Con Docker (Recomendado)
   ```bash
    docker compose up --build
   ```

   ### Opción B: De manera local
   Asegúrate de tener PostgreSQL instalado localmente y crea una base de datos llamada `lab3`.

   ### Configuración de Prisma
   ```bash
   # Generar el cliente de Prisma
   npx prisma generate
   
   # Ejecutar migraciones
    npx prisma migrate dev 
   
   #Cargar data
   psql -U postgres -d lab3 -f prisma/migrations/20250529172944_ddl/data.sql
   ```

5. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:3000`

## 📊 Modelo de Base de Datos

### Entidades Principales

- Estudiantes
- Cursos
- Inscripciones
- Vista unificando lo anterior

### Diagrama ER
![Diagrama ER](https://github.com/user-attachments/assets/d45d565e-52cd-4aaf-8e0b-9c3b9b3d8b91)

### Relaciones

- **Estudiante → Inscripciones**: One-to-Many
- **Curso → Inscripciones**: One-to-Many

## 🔌 API Endpoints

### Estudiantes
- `GET /api/estudiantes` - Obtener todos los estudiantes
- `GET /api/estudiantes/[id]` - Obtener estudiante por ID
- `POST /api/estudiantes` - Crear nuevo estudiante
- `PUT /api/estudiantes/[id]` - Actualizar estudiante
- `DELETE /api/estudiantes/[id]` - Eliminar estudiante

### Cursos
- `GET /api/cursos` - Obtener todos los cursos
- `GET /api/cursos/[id]` - Obtener curso por ID
- `POST /api/cursos` - Crear nuevo curso
- `PUT /api/cursos/[id]` - Actualizar curso
- `DELETE /api/cursos/[id]` - Eliminar curso

### Inscripciones
- `GET /api/inscripciones` - Obtener todas las inscripciones
- `GET /api/inscripciones/[id]` - Obtener inscripción por ID
- `POST /api/inscripciones` - Crear nueva inscripción
- `PUT /api/inscripciones/[id]` - Actualizar inscripción
- `DELETE /api/inscripciones/[id]` - Eliminar inscripción

### Endpoints Especiales
- `GET /api/vista` - Vista completa con estudiantes, cursos e inscripciones

## 📁 Estructura del Proyecto

```bash
lab3-next-prisma/
├── app/                     # Carpeta principal de la aplicación Next.js
│   ├── api/                 # Rutas de la API
│   │   ├── estudiantes/     # CRUD estudiantes
│   │   ├── cursos/          # CRUD cursos
│   │   ├── inscripciones/   # CRUD inscripciones
│   │   └── vista/           # Vista integrada
│   ├── cursos/              # Vista cursos
│   ├── estudiantes/         # vista estudiantes
│   ├── inscripciones/       # vista inscripciones           
├── prisma/                  # Configuración y esquema de Prisma
│   ├── schema.prisma        # Esquema de la base de datos
├── public/                  # Archivos estáticos
│   └── images/              # Imágenes
├── .env                     # Variables de entorno
├── .gitignore               # Archivos y carpetas a ignorar por Git
├── package.json             # Dependencias y scripts del proyecto
└── README.md                # Documentación del proyecto
```

## 📚 Documentación Adicional

- [Next.js Documentation](https://nextjs.org/docs) - Aprende sobre las características y API de Next.js.
- [Prisma Documentation](https://www.prisma.io/docs) - Aprende sobre cómo usar Prisma ORM.
- [PostgreSQL Documentation](https://www.postgresql.org/docs/) - Documentación oficial de PostgreSQL.
