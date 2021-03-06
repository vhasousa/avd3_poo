import { getRepository } from 'typeorm';

import Events from '../models/Events';

interface Request {
  event_id: string;
}

class LikeController {
  public async store({ event_id }: Request): Promise<Events | null> {
    const eventsRepository = getRepository(Events);

    const event = await eventsRepository.findOne(event_id);

    console.log(event);

    if (!event) {
      return null;
    }

    event.likes += 1;

    console.log(event);

    await eventsRepository.save(event);

    return event;
  }
}

export default LikeController;
