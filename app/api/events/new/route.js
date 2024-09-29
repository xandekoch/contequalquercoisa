import Event from '@/models/Event';
import { connectToDB } from '@/utils/database';

export const POST = async (req) => {
  try {
    await connectToDB();

    const newEvent = new Event();
    await newEvent.save();

    return new Response(JSON.stringify(newEvent, {status: 201}))
  } catch (error) {
    return new Response(JSON.stringify('Failed to create a new event', {status: 500}))
  }
}
