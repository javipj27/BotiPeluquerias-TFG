<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Psr\Log\LoggerInterface;

class UploadController extends AbstractController
{
    #[Route('/upload', name: 'upload', methods: ['POST'])]
    public function upload(Request $request, LoggerInterface $logger)
    {
        $file = $request->files->get('file');
        if (!$file) {
            $logger->warning('Intento de subida sin fichero.');
            return new JsonResponse(['error' => 'No file uploaded'], 400);
        }

        //define directorio
        $uploadsDir = $this->getParameter('kernel.project_dir') . '/public/uploads';
        if (!is_dir($uploadsDir)) {
            // Crea el directorio si no existe
            mkdir($uploadsDir, 0777, true);
            $logger->info('Directorio de uploads creado: ' . $uploadsDir);
        }

        //sano para evitar problemas con nombres de archivos
        $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFilename = preg_replace('/[^a-zA-Z0-9-_]/', '_', $originalFilename);
        // Genera un nombre único para el archivo
        $newFilename = $safeFilename . '-' . uniqid() . '.' . $file->guessExtension();

        try {
            // Mueve el archivo a la carpeta de uploads
            $file->move($uploadsDir, $newFilename);
            $logger->info("Archivo subido correctamente: $newFilename");
        } catch (FileException $e) {
            $logger->error('Error subiendo archivo: ' . $e->getMessage());
            return new JsonResponse(['error' => 'Error uploading file'], 500);
        }

        // Devuelve la URL pública del archivo
        $url = $request->getSchemeAndHttpHost() . '/uploads/' . $newFilename;
        $logger->debug("URL pública generada: $url");
        return new JsonResponse(['url' => $url]);
    }
}