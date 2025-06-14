💈BotiPeluquerias💈
-------------------------------------------
BotiPeluquerias es una aplicación web diseñada para la gestión de múltiples peluquerías.

Facilita la gestion de las citas y compras de peluquerias con una interfaz sencilla e intuitiva.
-------------------------------------------
💻 Tecnologías usadas
-------------------------------------------

+ Frontend:
  + React : Librería principal.
  + Vite : Herramienta de desarrollo y bundler.
+ Backend:
  + Symfony: Framework principal para la API REST.
  + Doctrine ORM: Mapeo objeto-relacional para la BBDD.
  + MySQL: Base de datos relacional.
+ Infraestructura y despliegue:
  + Docker: Contenerización de servicios (frontend, backend, base de datos, nginx).
  + Nginx: Proxy inverso, gestión de HTTPS y archivos estáticos.
  + Terraform: Aprovisionamiento de infraestructura en AWS (EC2,redes,etc).
  + AWS EC2: Servidor cloud para el despliegue de la aplicación
  + Git: Control de versiones
+ Diseño de interfaces:
  + Tailwind CSS: Framework para estilos.
  + DaisyUI: Componentes diseñados de Tailwind CSS

 ------------------------------------------

:accessibility: Usos principales
-------------------------------------------

+ Creacion y administración de peluquerias (Galería,productos,Citas,Peluqueros)
+ Registro e inicio de sesion
+ Compra de productos con pdf de confirmación
+ Reserva de citas con pdf de confirmación
+ Historial de citas
+ Historial de compras
+ Theme Thoggle
+ Gestión de usuarios y roles
+ Importación y exportación de peluquerías
+ Carrito de la compra
+ Visualización de información meteorológica
+ Feedback visual al usuario

------------------------------------------
🏗️ Estructura del proyecto
------------------------------------------

BotiPeluquerias-TFG/
│
├── backend/                   # Código fuente del backend (Symfony, PHP)
│   ├── src/
│   │   └── Controller/        # Controladores de la API
│   │   └── Entity/            # Entidades de Doctrine 
│   └── public/uploads/        # Carpeta para archivos subidos 
│
├── frontend/                  # Código fuente del frontend (React)
│   └── src/
│       └── components/        # Componentes reutilizables 
│       └── pages/             # Páginas principales
│
├── infra/                     # Infraestructura como código
│   ├── main.tf                # Script principal de Terraform para AWS
│   └── dump.sql               # Volcado de la base de datos MySQL
│
├── docker-compose.yml         # Orquestación de contenedores Docker
├── nginx.conf                 # Configuración de Nginx como proxy inverso
├── certs/                     # Certificados SSL para Nginx
└── README.md                  # Documentación principal del proyecto






 
