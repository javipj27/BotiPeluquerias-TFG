<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class WeatherController extends AbstractController
{
    #[Route('/api/weather', name: 'api_weather', methods: ['GET'])]
    public function weather(HttpClientInterface $client): JsonResponse
    {
        $lat = 40.4168; // Madrid
        $lon = -3.7038;
        $response = $client->request('GET', 'https://api.open-meteo.com/v1/forecast', [
            'query' => [
                'latitude' => $lat,
                'longitude' => $lon,
                'current_weather' => true,
            ]
        ]);
        $data = $response->toArray();
        return $this->json([
            'temperature' => $data['current_weather']['temperature'],
            'windspeed' => $data['current_weather']['windspeed'],
        ]);
    }
}