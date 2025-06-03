<?php

namespace App\Controller;

use Dompdf\Dompdf;
use Dompdf\Options;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Psr\Log\LoggerInterface;


class PdfController extends AbstractController
{
    #[Route('/api/pdf/cita', name: 'pdf_cita', methods: ['POST'])]
    public function citaPdf(Request $request,LoggerInterface $logger): Response
    {
        $data = json_decode($request->getContent(), true);
        $logger->info('Generación de PDF de cita', ['nombre' => $data['nombre'] ?? null]);

        $html = $this->renderView('pdf/cita.html.twig', [
            'nombre' => $data['nombre'],
            'peluqueria' => $data['peluqueria'],
            'hora' => $data['hora'],
            'peluquero' => $data['peluquero'],
        ]);

        $options = new Options();
        $options->set('defaultFont', 'Arial');
        $dompdf = new Dompdf($options);
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();

        return new Response(
            $dompdf->output(),
            200,
            [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'attachment; filename="cita.pdf"',
            ]
        );
    }

    #[Route('/api/pdf/compra', name: 'pdf_compra', methods: ['POST'])]
    public function compraPdf(Request $request,LoggerInterface $logger): Response
    {
        $data = json_decode($request->getContent(), true);
        $logger->info('Generación de PDF de compra');

        $html = $this->renderView('pdf/compra.html.twig', [
            'productos' => $data['productos'],
            'total' => $data['total'],
        ]);

        $options = new Options();
        $options->set('defaultFont', 'Arial');
        $dompdf = new Dompdf($options);
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();

        return new Response(
            $dompdf->output(),
            200,
            [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'attachment; filename="compra.pdf"',
            ]
        );
    }
}