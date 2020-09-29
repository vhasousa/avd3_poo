import { getRepository } from 'typeorm';

import Events from '../models/Events';

interface Request {
  user_id: string;
  eventName: string;
  place: string;
}

class EventController {
  public async store({ user_id, eventName, place}: Request): Promise<Events> {
    const eventsRepository = getRepository(Events);

    const events = eventsRepository.create({
      user_id,
      eventName,
      place,
    });

    await eventsRepository.save(events);

    return events;
  }
}

export default EventController;
