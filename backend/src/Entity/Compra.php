<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\CompraRepository;

#[ORM\Entity(repositoryClass: CompraRepository::class)]
class Compra
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Usuario::class)]
    #[ORM\JoinColumn(nullable: false)]
    private ?Usuario $usuario = null;

    #[ORM\Column(type: "json")]
    private array $productos = [];

    #[ORM\Column(type: "float")]
    private float $total;

    #[ORM\Column(type: "datetime")]
    private \DateTimeInterface $fecha;

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
    public function getProductos(): array
    {
        return $this->productos;
    }
    public function setProductos(array $productos): static
    {
        $this->productos = $productos;
        return $this;
    }
    public function getTotal(): float
    {
        return $this->total;
    }
    public function setTotal(float $total): static
    {
        $this->total = $total;
        return $this;
    }
    public function getFecha(): \DateTimeInterface
    {
        return $this->fecha;
    }
    public function setFecha(\DateTimeInterface $fecha): static
    {
        $this->fecha = $fecha;
        return $this;
    }

}