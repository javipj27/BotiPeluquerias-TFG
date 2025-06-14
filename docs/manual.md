# 💈BotiPeluquerias

BotiPeluquerias es una aplicación web diseñada para la gestión de múltiples peluquerías.  
Facilita la gestión de citas y compras de peluquerías con una interfaz sencilla e intuitiva.

---

## 📑 Índice

1. [📝 Descripción general](#-descripción-general)
2. [⚙️ Instalación y ejecución](#️-instalación-y-ejecución)
   - [🔧 Requisitos previos](#-requisitos-previos)
   - [📥 Clonación del repositorio](#-clonación-del-repositorio)
   - [⚛️ Frontend - React](#️-frontend---react)
   - [🔙 Backend - Symfony API con Docker](#-backend---symfony-api-con-docker)
   - [🚀 Despliegue en producción](#-despliegue-en-producción)
3. [🧭 Uso de la aplicación](#-uso-de-la-aplicación)
4. [💻 Tecnologías usadas](#-tecnologías-usadas)
5. [:accessibility: Usos principales](#accessibility-usos-principales)
6. [🏗️ Estructura del proyecto](#️-estructura-del-proyecto)

---

## 📝 Descripción general

BotiPeluquerias es una plataforma web para la gestión integral de peluquerías, permitiendo a usuarios y administradores gestionar reservas, productos, compras y mucho más desde una interfaz moderna y sencilla.

---

## ⚙️ Instalación y ejecución

### 🔧 Requisitos previos

- [Node.js](https://nodejs.org/) (v18+)
- [Composer](https://getcomposer.org/)
- [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/)
- [Symfony CLI](https://symfony.com/download) (opcional para desarrollo local)
- [Terraform](https://www.terraform.io/) (para despliegue en AWS)
- Cuenta de AWS (para producción)
- 
### 📥 Clonación del repositorio

```sh
git clone https://github.com/tuusuario/BotiPeluquerias-TFG.git
cd BotiPeluquerias-TFG

⚛️ Frontend - React
  cd frontend
  npm install
  npm run dev
Accede a http://localhost:5173

🔙 Backend - Symfony API con Docker
  cd backend
  docker compose up -d --build
API disponible en http://localhost:8000/api

🚀 Despliegue en producción
  cd infra
  terraform init
  terraform apply
Esto desplegará la infraestructura en AWS y levantará todos los servicios automáticamente.
````
---------------------------------------
🧭 Uso de la aplicación
+ Registro e inicio de sesión: Regístrate o inicia sesión para acceder a todas las funcionalidades. El sistema gestiona roles de usuario y administrador.
+ Gestión de peluquerías: Crea, edita y elimina peluquerías. Añade peluqueros, productos, imágenes y galería. Administra desde el panel de administración.
+ Gestión de usuarios y roles: Diferenciación entre usuarios normales y administradores. Los administradores pueden gestionar todas las peluquerías.
+ Reservas de citas: Reserva citas seleccionando peluquería, peluquero, fecha y hora. Control de disponibilidad en tiempo real. Descarga de PDF de confirmación.
+ Compra de productos: Añade productos al carrito y realiza compras. Descarga de PDF de confirmación de compra. Historial de compras disponible.
+ Subida de imágenes y galería: Sube imágenes para productos, logos y galería de la peluquería.
+ Exportación/Importación de datos: Exporta e importa peluquerías en formato JSON desde el panel de administración.
+ Descarga de PDFs: Descarga comprobantes de citas y compras en PDF.
+ Información meteorológica: Consulta el clima actual en la vista de detalle de cada peluquería.
+ Cambio de tema (Theme Toggle): Cambia entre modo claro y oscuro desde la interfaz.

-------------------------------------------
💻 Tecnologías usadas
+ Frontend:
  + React : Librería principal.
  + Vite : Herramienta de desarrollo y bundler.
  + Tailwind CSS : Framework para estilos.
  + DaisyUI : Componentes diseñados de Tailwind CSS.
+ Backend:
  + Symfony : Framework principal para la API REST.
  + Doctrine ORM : Mapeo objeto-relacional para la BBDD.
  + MySQL : Base de datos relacional.
+ Infraestructura y despliegue:
  + Docker : Contenerización de servicios (frontend, backend, base de datos, nginx).
  + Nginx : Proxy inverso, gestión de HTTPS y archivos estáticos.
  + Terraform : Aprovisionamiento de infraestructura en AWS (EC2, redes, etc).
  + AWS EC2: Servidor cloud para el despliegue de la aplicación.
  + Git : Control de versiones.
--------------------------------------------

:accessibility: Usos principales
+ Creación y administración de peluquerías (Galería, productos, citas, peluqueros)
+ Registro e inicio de sesión
+ Compra de productos con PDF de confirmación
+ Reserva de citas con PDF de confirmación
+ Historial de citas
+ Historial de compras
+ Theme Toggle (cambio de tema)
+ Gestión de usuarios y roles
+ Importación y exportación de peluquerías
+ Carrito de la compra
+ Visualización de información meteorológica
+ Feedback visual al usuario
----------------------------------------------
🏗️ Estructura del proyecto
---------------------------------------------
````ssh
BotiPeluquerias-TFG/
├── [backend]                 # Código fuente del backend (Symfony, PHP)
│   ├── src/
│   │   ├── Controller/        # Controladores de la API
│   │   └── Entity/            # Entidades de Doctrine 
│   └── public/uploads/        # Carpeta para archivos subidos 
├── [frontend]                # Código fuente del frontend (React)
│   └── src/
│       ├── components/        # Componentes reutilizables 
│       └── pages/             # Páginas principales
├── [infra]                   # Infraestructura como código
│   ├── main.tf                # Script principal de Terraform para AWS
│   └── dump.sql               # Volcado de la base de datos MySQL
├── [docker-compose.yml]        # Orquestación de contenedores Docker
├── [nginx.conf])                 # Configuración de Nginx como proxy inverso
├── [certs]                   # Certificados SSL para Nginx
└── [README.md]                 # Documentación principal del proyecto
`````


