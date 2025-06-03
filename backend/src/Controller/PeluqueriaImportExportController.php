<?php

namespace App\Controller;

use App\Repository\PeluqueriaRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Psr\Log\LoggerInterface;


class PeluqueriaImportExportController extends AbstractController
{
    #[Route('/api/peluquerias/export', name: 'peluquerias_export', methods: ['GET'])]
    public function export(PeluqueriaRepository $repo,LoggerInterface $logger): Response
    {
        $logger->info('Exportación de peluquerías');
        $peluquerias = $repo->findAll();
        $data = [];
        foreach ($peluquerias as $p) {
            $data[] = [
                'nombre' => $p->getNombre(),
                'direccion' => $p->getDireccion(),
                'telefono' => $p->getTelefono(),
                'descripcion' => $p->getDescripcion(),
                'imagen' => $p->getImagen(),
                'logo' => $p->getLogo(),
                'peluqueros' => $p->getPeluqueros(),
                'productos' => $p->getProductos(),
                'galeria' => $p->getGaleria(),
            ];
        }
        $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        return new Response(
            $json,
            200,
            [
                'Content-Type' => 'application/json',
                'Content-Disposition' => 'attachment; filename="peluquerias_export.json"',
            ]
        );
    }

    #[Route('/api/peluquerias/import', name: 'peluquerias_import', methods: ['POST'])]
    public function import(Request $request, EntityManagerInterface $em,LoggerInterface $logger): JsonResponse
    {
        $logger->info('Importación de peluquerías');
        $data = json_decode($request->getContent(), true);
        if (!is_array($data)) {
            $logger->warning('Importación fallida: formato inválido');
            return $this->json(['error' => 'Formato inválido'], 400);
        }
        foreach ($data as $item) {
            $peluqueria = new \App\Entity\Peluqueria();
            $peluqueria->setNombre($item['nombre'] ?? '');
            $peluqueria->setDireccion($item['direccion'] ?? '');
            $peluqueria->setTelefono($item['telefono'] ?? '');
            $peluqueria->setDescripcion($item['descripcion'] ?? '');
            $peluqueria->setImagen($item['imagen'] ?? null);
            $peluqueria->setLogo($item['logo'] ?? null);
            $peluqueria->setPeluqueros($item['peluqueros'] ?? []);
            $peluqueria->setProductos($item['productos'] ?? []);
            $peluqueria->setGaleria($item['galeria'] ?? []);
            $em->persist($peluqueria);
        }
        $em->flush();
        $logger->info('Importación completada');
        return $this->json(['success' => true]);
    }
}