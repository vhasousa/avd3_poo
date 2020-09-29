import { getRepository } from 'typeorm';

import Events from '../models/Events';

interface Request {
  event_id: string;
}

class EventController {
  public async store({ event_id }: Request): Promise<void> {
    const eventsRepository = getRepository(Events);

    // const events = await eventsRepository.update(E

    // console.log(events)
  }
}

export default EventController;
