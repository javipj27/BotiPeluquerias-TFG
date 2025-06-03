<?php

namespace App\Controller;

use App\Entity\Usuario;
use App\Repository\UsuarioRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\String\ByteString;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpKernel\Log\Logger;

class AuthController extends AbstractController
{
    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(
        Request $request,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $passwordHasher,
        UsuarioRepository $usuarioRepository,
        LoggerInterface $logger 

    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        if (
            !isset($data['email']) ||
            !isset($data['password']) ||
            !isset($data['username']) ||
            !isset($data['nombre'])
        ) {
            $logger->warning('Registro fallido: faltan campos');
            return $this->json(['error' => 'Faltan campos obligatorios'], 400);
        }

        // Comprobar si el email o username ya existen
        if ($usuarioRepository->findOneBy(['email' => $data['email']])) {
            $logger->warning('Registro fallido: email ya registrado', ['email' => $data['email']]);
            return $this->json(['error' => 'El email ya está registrado'], 409);
        }
        if ($usuarioRepository->findOneBy(['username' => $data['username']])) {
            $logger->warning('Registro fallido: username ya registrado', ['username' => $data['username']]);
            return $this->json(['error' => 'El nombre de usuario ya está registrado'], 409);
        }

        $usuario = new Usuario();
        $usuario->setEmail($data['email']);
        $usuario->setUsernameField($data['username']);
        $usuario->setNombre($data['nombre']);
        $usuario->setTelefono($data['telefono'] ?? null);
        $usuario->setRoles(['ROLE_USER']);
        $hashedPassword = $passwordHasher->hashPassword($usuario, $data['password']);
        $usuario->setPassword($hashedPassword);
        $usuario->setApiToken(ByteString::fromRandom(40)->toString());
        $em->persist($usuario);
        $em->flush();

        $logger->info('Usuario registrado correctamente', ['email' => $usuario->getEmail()]);
        return $this->json([
            'token' => $usuario->getApiToken(),
            'roles' => $usuario->getRoles(),
            'email' => $usuario->getEmail(),
            'telefono' => $usuario->getTelefono(),
            'username' => $usuario->getUsernameField(),
        ]);
    }

    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(
        Request $request,
        UsuarioRepository $usuarioRepository,
        UserPasswordHasherInterface $passwordHasher,
        EntityManagerInterface $em,
        LoggerInterface $logger
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        $logger->info('Intento de login', ['email' => $data['email'] ?? null]);

        if (!isset($data['email']) || !isset($data['password'])) {
            $logger->warning('Login fallido: faltan datos');
            return $this->json(['error' => 'Email o nombre de usuario y contraseña son obligatorios'], 400);
        }

        // Buscar por email o username
        $usuario = $usuarioRepository->findOneBy(['email' => $data['email']]);
        if (!$usuario) {
                $logger->warning('Login fallido: usuario no encontrado', ['email' => $data['email']]);
            $usuario = $usuarioRepository->findOneBy(['username' => $data['email']]);
        }
        if (!$usuario) {
            return $this->json(['error' => 'Credenciales incorrectas'], 401);
        }

        if (!$passwordHasher->isPasswordValid($usuario, $data['password'])) {
            $logger->warning('Login fallido: contraseña incorrecta', ['email' => $data['email']]);
            return $this->json(['error' => 'Credenciales incorrectas'], 401);
        }

        // Si el usuario no tiene token, lo generamos
        if (!$usuario->getApiToken()) {
            $usuario->setApiToken(ByteString::fromRandom(40)->toString());
            $em->flush();
        }

        $logger->info('Login correcto', ['email' => $usuario->getEmail()]);
        return $this->json([
            'token' => $usuario->getApiToken(),
            'roles' => $usuario->getRoles(),
            'email' => $usuario->getEmail(),
            'telefono' => $usuario->getTelefono(),
            'username' => $usuario->getUsernameField(),
        ]);
    }
}