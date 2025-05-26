<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\PeluqueriaRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ApiResource()]
#[ORM\Entity(repositoryClass: PeluqueriaRepository::class)]
class Peluqueria
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nombre = null;

    #[ORM\Column(length: 255)]
    private ?string $direccion = null;

    #[ORM\Column(length: 255)]
    private ?string $telefono = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $descripcion = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $imagen = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $logo = null;

    #[ORM\Column(type: "json", nullable: true)]
    private ?array $peluqueros = [];

    #[ORM\Column(type: "json", nullable: true)]
    private ?array $productos = [];

    #[ORM\Column(type: "json", nullable: true)]
    private ?array $galeria = [];

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNombre(): ?string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre): self
    {
        $this->nombre = $nombre;
        return $this;
    }

    public function getDireccion(): ?string
    {
        return $this->direccion;
    }

    public function setDireccion(string $direccion): self
    {
        $this->direccion = $direccion;
        return $this;
    }

    public function getTelefono(): ?string
    {
        return $this->telefono;
    }

    public function setTelefono(string $telefono): self
    {
        $this->telefono = $telefono;
        return $this;
    }

    public function getDescripcion(): ?string
    {
        return $this->descripcion;
    }

    public function setDescripcion(string $descripcion): self
    {
        $this->descripcion = $descripcion;
        return $this;
    }

    public function getImagen(): ?string
    {
        return $this->imagen;
    }

    public function setImagen(?string $imagen): self
    {
        $this->imagen = $imagen;
        return $this;
    }
    public function getLogo(): ?string
    {
        return $this->logo;
    }
    public function setLogo(?string $logo): self
    {
        $this->logo = $logo;
        return $this;
    }

    public function getPeluqueros(): ?array
    {
        return $this->peluqueros;
    }
    public function setPeluqueros(?array $peluqueros): self
    {
        $this->peluqueros = $peluqueros;
        return $this;
    }

    public function getProductos(): ?array
    {
        return $this->productos;
    }
    public function setProductos(?array $productos): self
    {
        $this->productos = $productos;
        return $this;
    }

    public function getGaleria(): ?array
    {
        return $this->galeria;
    }
    public function setGaleria(?array $galeria): self
    {
        $this->galeria = $galeria;
        return $this;
    }
}
