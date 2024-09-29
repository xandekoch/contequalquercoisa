import Event from '@/models/Event';
import { connectToDB } from '@/utils/database';

// Função para corrigir datas em UTC para MongoDB
const toUTCStartOfDay = (date) => {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
};

export const GET = async (req) => {
  try {
    await connectToDB();

    const now = new Date();
    
    // Ajustar o cálculo para os diferentes períodos
    const startOfDayUTC = toUTCStartOfDay(now);
    const startOfWeekUTC = toUTCStartOfDay(new Date(now.setUTCDate(now.getUTCDate() - now.getUTCDay())));
    const startOfMonthUTC = toUTCStartOfDay(new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)));
    const startOfYearUTC = toUTCStartOfDay(new Date(Date.UTC(now.getUTCFullYear(), 0, 1)));

    // Debugging: Mostrar as datas geradas
    console.log({
      startOfDay: startOfDayUTC,
      startOfWeek: startOfWeekUTC,
      startOfMonth: startOfMonthUTC,
      startOfYear: startOfYearUTC
    });

    // Consultar a contagem de eventos no MongoDB usando 'createdAt' como campo
    const eventsOfDay = await Event.countDocuments({ createdAt: { $gte: startOfDayUTC } });
    const eventsOfWeek = await Event.countDocuments({ createdAt: { $gte: startOfWeekUTC } });
    const eventsOfMonth = await Event.countDocuments({ createdAt: { $gte: startOfMonthUTC } });
    const eventsOfYear = await Event.countDocuments({ createdAt: { $gte: startOfYearUTC } });
    const totalEvents = await Event.countDocuments();

    // Calcular média de eventos por dia
    const firstEvent = await Event.findOne().sort({ createdAt: 1 });
    const daysSinceFirstEvent = firstEvent ? Math.ceil((now - firstEvent.createdAt) / (1000 * 60 * 60 * 24)) : 0;
    const averageEventsPerDay = daysSinceFirstEvent ? totalEvents / daysSinceFirstEvent : 0;

    // Retornar a resposta com os dados
    return new Response(
      JSON.stringify({
        eventsOfDay,
        eventsOfWeek,
        eventsOfMonth,
        eventsOfYear,
        totalEvents,
        averageEventsPerDay: averageEventsPerDay.toFixed(2),
      }), 
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to retrieve event counts' }), { status: 500 });
  }
};