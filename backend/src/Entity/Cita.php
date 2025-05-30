<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\CitaRepository;

#[ORM\Entity(repositoryClass: CitaRepository::class)]
class Cita
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Usuario::class)]
    #[ORM\JoinColumn(nullable: false)]
    private ?Usuario $usuario = null;

    #[ORM\Column(length: 255)]
    private string $peluqueria;

    #[ORM\Column(length: 100)]
    private string $peluquero;

    #[ORM\Column(type: "datetime")]
    private \DateTimeInterface $fechaHora;

    #[ORM\Column(length: 100)]
    private string $nombreCliente;


    public function getId(): ?int
    {
        return $this->id;
    }
    public function getUsuario(): ?Usuario
    {
        return $this->usuario;
    }
    public function setUsuario(?Usuario $usuario): static
    {
        $this->usuario = $usuario;
        return $this;
    }
    public function getPeluqueria(): string
    {
        return $this->peluqueria;
    }
    public function setPeluqueria(string $peluqueria): static
    {
        $this->peluqueria = $peluqueria;
        return $this;
    }
    public function getPeluquero(): string
    {
        return $this->peluquero;
    }
    public function setPeluquero(string $peluquero): static
    {
        $this->peluquero = $peluquero;
        return $this;
    }
    public function getFechaHora(): \DateTimeInterface
    {
        return $this->fechaHora;
    }
    public function setFechaHora(\DateTimeInterface $fechaHora): static
    {
        $this->fechaHora = $fechaHora;
        return $this;
    }
    public function getNombreCliente(): string
    {
        return $this->nombreCliente;
    }
    public function setNombreCliente(string $nombreCliente): static
    {
        $this->nombreCliente = $nombreCliente;
        return $this;
    }
    

}