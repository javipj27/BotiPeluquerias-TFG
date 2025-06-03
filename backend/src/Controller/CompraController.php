<?php

namespace App\Controller;

use App\Entity\Compra;
use App\Repository\CompraRepository;
use App\Repository\UsuarioRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Psr\Log\LoggerInterface;


class CompraController extends AbstractController
{
    #[Route('/api/compras', name: 'api_compras_usuario', methods: ['GET'])]
    #[IsGranted('IS_AUTHENTICATED_FULLY')]
    public function historialCompras(CompraRepository $compraRepository, LoggerInterface $logger): JsonResponse
    {
        /** @var \App\Entity\Usuario $usuario */
        $usuario = $this->getUser();
        $logger->info('Consulta de historial de compras', ['usuario_id' => $usuario->getId()]);
        $compras = $compraRepository->findByUsuarioId($usuario->getId());

        $data = [];
        foreach ($compras as $compra) {
            $data[] = [
                'id' => $compra->getId(),
                'productos' => $compra->getProductos(),
                'total' => $compra->getTotal(),
                'fecha' => $compra->getFecha()->format('Y-m-d H:i:s'),
            ];
        }
        return $this->json($data);
    }

    #[Route('/api/compras', name: 'api_compras_create', methods: ['POST'])]
    #[IsGranted('IS_AUTHENTICATED_FULLY')]
    public function crearCompra(Request $request, EntityManagerInterface $em,  LoggerInterface $logger): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        /** @var \App\Entity\Usuario $usuario */
        $usuario = $this->getUser();

        $logger->info('Intento de crear compra', ['usuario_id' => $usuario->getId()]);

        if (!isset($data['productos']) || !isset($data['total'])) {
            $logger->warning('Creación de compra fallida: faltan datos');
            return $this->json(['error' => 'Faltan datos'], 400);
        }

        $compra = new Compra();
        $compra->setUsuario($usuario);
        $compra->setProductos($data['productos']);
        $compra->setTotal($data['total']);
        $compra->setFecha(new \DateTime());

        $em->persist($compra);
        $em->flush();

        $logger->info('Compra creada correctamente', ['compra_id' => $compra->getId()]);
        return $this->json(['success' => true, 'id' => $compra->getId()]);
    }
}