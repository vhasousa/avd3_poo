import { Router } from 'express';
import multer from 'multer';
import { getRepository } from 'typeorm';

import EventController  from '../app/controllers/EventController';
import ImageController  from '../app/controllers/ImageController';
import Event from '../app/models/Events';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';

const eventsRouter = Router();
const upload = multer(uploadConfig);


eventsRouter.use(ensureAuthenticated);

eventsRouter.post('/', async (request, response) => {
  try {
    const { id } = request.user;
    const { eventName, place } = request.body;

    const eventsController = new EventController();

    const events = await eventsController.store({
      user_id: id,
      eventName,
      place,
    })

    return response.json(events);
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
});

eventsRouter.get('/', async (request, response) => {
  const eventRepository = getRepository(Event);
  const event = await eventRepository.find();
  return response.json(event);
})

eventsRouter.patch('/upload/:event_id', upload.single('eventImage'), async (request, response) => {
  try {
    const { id } = request.params;
    const imageController = new ImageController();
    const event = await imageController.update({
      event_id: id,
      FileName: request.file.filename,
    })

    return response.json(event)
  } catch(err) {
    return response.status(400).json({ error: err.message })
  }
})

export default eventsRouter;
