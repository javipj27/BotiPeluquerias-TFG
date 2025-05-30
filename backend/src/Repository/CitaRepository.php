<?php

namespace App\Repository;

use App\Entity\Cita;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Cita>
 */
class CitaRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Cita::class);
    }

    /**
     * @param int $usuarioId
     * @return Cita[]
     */
    public function findByUsuarioId(int $usuarioId): array
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.usuario = :usuarioId')
            ->setParameter('usuarioId', $usuarioId)
            ->orderBy('c.fechaHora', 'DESC')
            ->getQuery()
            ->getResult();
    }
}