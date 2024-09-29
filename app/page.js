'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [counts, setCounts] = useState({
    eventsOfDay: 0,
    eventsOfWeek: 0,
    eventsOfMonth: 0,
    eventsOfYear: 0,
    totalEvents: 0,
    averageEventsPerDay: 0,
  });

  // Function to fetch event counts
  const fetchCounts = async () => {
    const res = await fetch(`/api/events/count?timestamp=${Date.now()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store', // Desativa qualquer cache
        'Pragma': 'no-cache', // Para navegadores antigos
        'Expires': '0', // Para navegadores que respeitam o cabeçalho de expiração
      }
    });
    const data = await res.json();
    setCounts(data);
  };

  // Function to register a new event
  const registerEvent = async () => {
    await fetch('/api/events/new', { method: 'POST' });
    fetchCounts();
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">{`Minha esposa me chamou ${counts.eventsOfDay} vezes hoje`}</h1>

      <button
        onClick={registerEvent}
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-200"
      >
        Contar
      </button>

      <div className="grid grid-cols-1 mt-8 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold">Hoje</h2>
          <p className="text-2xl mt-2 text-gray-700">{counts.eventsOfDay}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold">Semana</h2>
          <p className="text-2xl mt-2 text-gray-700">{counts.eventsOfWeek}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold">Mês</h2>
          <p className="text-2xl mt-2 text-gray-700">{counts.eventsOfMonth}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold">Ano</h2>
          <p className="text-2xl mt-2 text-gray-700">{counts.eventsOfYear}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold">Todo</h2>
          <p className="text-2xl mt-2 text-gray-700">{counts.totalEvents}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold">Média diária</h2>
          <p className="text-2xl mt-2 text-gray-700">{counts.averageEventsPerDay}</p>
        </div>
      </div>
    </div>
  );
}