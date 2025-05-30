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

class CompraController extends AbstractController
{
    #[Route('/api/compras', name: 'api_compras_usuario', methods: ['GET'])]
    #[IsGranted('IS_AUTHENTICATED_FULLY')]
    public function historialCompras(CompraRepository $compraRepository): JsonResponse
    {
        /** @var \App\Entity\Usuario $usuario */
        $usuario = $this->getUser();
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
    public function crearCompra(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        /** @var \App\Entity\Usuario $usuario */
        $usuario = $this->getUser();

        if (!isset($data['productos']) || !isset($data['total'])) {
            return $this->json(['error' => 'Faltan datos'], 400);
        }

        $compra = new Compra();
        $compra->setUsuario($usuario);
        $compra->setProductos($data['productos']);
        $compra->setTotal($data['total']);
        $compra->setFecha(new \DateTime());

        $em->persist($compra);
        $em->flush();

        return $this->json(['success' => true, 'id' => $compra->getId()]);
    }
}