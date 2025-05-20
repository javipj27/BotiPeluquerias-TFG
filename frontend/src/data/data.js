import logoClasico from "../assets/B-ElClasico.png";
import logoGentlemens from "../assets/B-Gentlemen.png";
import foto1 from "../assets/foto1.jpg";
import foto2 from "../assets/foto2.jpg";
import foto3 from "../assets/foto3.jpg";
import foto4 from "../assets/foto4.jpg";
import foto5 from "../assets/foto5.jpg";
import foto6 from "../assets/foto6.jpg";
import foto7 from "../assets/foto7.jpg";
import foto8 from "../assets/foto8.jpg";
import pomada from "../assets/pomada.jpg";
import champu from "../assets/champu.jpeg";
import cepillo from "../assets/cepillo.jpg";
import cera from "../assets/cera.jpeg";
import aftershave from "../assets/aftershave.webp";

export const peluquerias = [
  {
    id: 1,
    nombre: "Barbería El Clásico",
    direccion: "Calle Mayor 12",
    peluqueros: ["Carlos", "David"],
    productos: [
      { nombre: "Pomada", imagen: pomada },
      { nombre: "Champú", imagen: champu },
      { nombre: "Cepillo", imagen: cepillo },
    ],
    permitePagoOnline: true,
    galeria: [foto1, foto2, foto3],
    logo: logoClasico,
  },
  {
    id: 2,
    nombre: "Gentlemen's Cut",
    direccion: "Av. Libertad 45",
    peluqueros: ["Marco", "Álvaro"],
    productos: [
      { nombre: "Cera", imagen: cera },
      { nombre: "Aftershave", imagen: aftershave },
    ],
    permitePagoOnline: false,
    galeria: [foto4, foto5, foto6, foto7, foto8],
    logo: logoGentlemens,
  },
];