import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs'

import uploadConfig from '../../config/upload';

import Events from '../models/Events';

interface Request {
  event_id: string;
  FileName: string;
}

class ImageController {
  public async update({ event_id, FileName }: Request): Promise<void> {
    const eventsRepository = getRepository(Events);

    const event = await eventsRepository.findOne(event_id);

    console.log(event);

    if(!event) {
      throw new Error('Event does not exists');
    }

    if (event.eventImage) {
      const eventImagePath = path.join(uploadConfig.directory, event.eventImage);
      const eventImageExists = await fs.promises.stat(eventImagePath);
      if (eventImageExists) {
        await fs.promises.unlink(eventImagePath)
      }
    }

    event.eventImage = FileName;

    await eventsRepository.save(event);

    return;
  }
}

export default ImageController;
