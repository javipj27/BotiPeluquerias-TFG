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

class CitaController extends AbstractController
{
    #[Route('/api/citas', name: 'api_citas_usuario', methods: ['GET'])]
    #[IsGranted('IS_AUTHENTICATED_FULLY')]
    public function historialCitas(CitaRepository $citaRepository): JsonResponse
    {
        /** @var \App\Entity\Usuario $usuario */
        $usuario = $this->getUser();
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
    public function crearCita(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        /** @var \App\Entity\Usuario $usuario */
        $usuario = $this->getUser();

        if (!isset($data['peluqueria'], $data['peluquero'], $data['fechaHora'], $data['nombreCliente'])) {
            return $this->json(['error' => 'Faltan datos'], 400);
        }

        $cita = new Cita();
        $cita->setUsuario($usuario);
        $cita->setPeluqueria($data['peluqueria']);
        $cita->setPeluquero($data['peluquero']);
        $cita->setFechaHora(new \DateTime($data['fechaHora']));
        $cita->setNombreCliente($data['nombreCliente']);

        $em->persist($cita);
        $em->flush();

        return $this->json(['success' => true, 'id' => $cita->getId()]);
    }
}