<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class UsuarioController extends AbstractController
{
    #[Route('/api/usuario/avatar', name: 'api_usuario_avatar', methods: ['POST'])]
    #[IsGranted('IS_AUTHENTICATED_FULLY')]
    public function actualizarAvatar(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        /** @var \App\Entity\Usuario $usuario */
        $usuario = $this->getUser();
        $usuario->setFotoPerfil($data['fotoPerfil'] ?? null);
        $em->persist($usuario);
        $em->flush();
        return $this->json(['success' => true, 'fotoPerfil' => $usuario->getFotoPerfil()]);
    }
}