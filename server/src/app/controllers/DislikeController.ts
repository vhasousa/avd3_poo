import { getRepository } from 'typeorm';

import Events from '../models/Events';

interface Request {
  event_id: string;
}

class DislikeController {
  public async store({ event_id }: Request): Promise<Events | null> {
    const eventsRepository = getRepository(Events);

    const event = await eventsRepository.findOne(event_id);

    if (!event) {
      return null;
    }

    event.dislikes += 1;

    await eventsRepository.save(event);

    return event;
  }
}

export default DislikeController;
