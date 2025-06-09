<?php

namespace App\Controller;

use App\Entity\Cita;
use App\Repository\CitaRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Psr\Log\LoggerInterface;

class CitaController extends AbstractController
{
    #[Route('/api/citas', name: 'api_citas_usuario', methods: ['GET'])]
    #[IsGranted('IS_AUTHENTICATED_FULLY')]
    public function historialCitas(CitaRepository $citaRepository, LoggerInterface $logger): JsonResponse
    {
        /** @var \App\Entity\Usuario $usuario */
        $usuario = $this->getUser();
        $logger->info('Consulta de historial de citas', ['usuario_id' => $usuario->getId()]);
        $citas = $citaRepository->findByUsuarioId($usuario->getId());

        $data = [];
        foreach ($citas as $cita) {
            $data[] = [
                'id' => $cita->getId(),
                'peluqueria' => $cita->getPeluqueria(),
                'peluquero' => $cita->getPeluquero(),
                'fechaHora' => $cita->getFechaHora()->format('Y-m-d H:i:s'),
                'nombreCliente' => $cita->getNombreCliente(),
            ];
        }
        return $this->json($data);
    }

    #[Route('/api/citas', name: 'api_citas_create', methods: ['POST'])]
    #[IsGranted('IS_AUTHENTICATED_FULLY')]
    public function crearCita(Request $request, EntityManagerInterface $em, LoggerInterface $logger): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        /** @var \App\Entity\Usuario $usuario */
        $usuario = $this->getUser();
        $logger->info('Intento de crear cita', ['usuario_id' => $usuario->getId()]);

        if (!isset($data['peluqueria'], $data['peluquero'], $data['fechaHora'], $data['nombreCliente'])) {
            $logger->warning('Creación de cita fallida: faltan datos');
            return $this->json(['error' => 'Faltan datos'], 400);
        }

        // Comprobar si ya existe una cita para ese peluquero, peluquería y fecha/hora
        $existe = $em->getRepository(Cita::class)->findOneBy([
            'peluqueria' => $data['peluqueria'],
            'peluquero' => $data['peluquero'],
            'fechaHora' => new \DateTime($data['fechaHora']),
        ]);
        if ($existe) {
            $logger->warning('Creación de cita fallida: horario ocupado', [
                'peluqueria' => $data['peluqueria'],
                'peluquero' => $data['peluquero'],
                'fechaHora' => $data['fechaHora'],
            ]);
            return $this->json(['error' => 'Ese horario ya está reservado'], 409);
        }

        $cita = new Cita();
        $cita->setUsuario($usuario);
        $cita->setPeluqueria($data['peluqueria']);
        $cita->setPeluquero($data['peluquero']);
        $cita->setFechaHora(new \DateTime($data['fechaHora']));
        $cita->setNombreCliente($data['nombreCliente']);

        $em->persist($cita);
        $em->flush();

        $logger->info('Cita creada correctamente', ['cita_id' => $cita->getId()]);
        return $this->json(['success' => true, 'id' => $cita->getId()]);
    }

    #[Route('/api/citas/ocupadas', name: 'api_citas_ocupadas', methods: ['GET'])]
    public function horariosOcupados(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $peluqueria = $request->query->get('peluqueria');
        $peluquero = $request->query->get('peluquero');
        $fecha = $request->query->get('fecha'); // formato: Y-m-d

        if (!$peluqueria || !$peluquero || !$fecha) {
            return $this->json(['error' => 'Parámetros requeridos: peluqueria, peluquero, fecha'], 400);
        }

        $qb = $em->getRepository(Cita::class)->createQueryBuilder('c')
            ->select('c.fechaHora')
            ->where('c.peluqueria = :peluqueria')
            ->andWhere('c.peluquero = :peluquero')
            ->andWhere('DATE(c.fechaHora) = :fecha')
            ->setParameter('peluqueria', $peluqueria)
            ->setParameter('peluquero', $peluquero)
            ->setParameter('fecha', $fecha);

        $result = $qb->getQuery()->getResult();
        $horasOcupadas = array_map(fn($row) => $row['fechaHora']->format('H:i'), $result);

        return $this->json($horasOcupadas);
    }
}