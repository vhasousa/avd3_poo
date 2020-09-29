import { Router } from 'express';

import EventController  from '../app/controllers/EventController';

const eventsRouter = Router();

eventsRouter.post('/:user_id', async (request, response) => {
  try {
    const { user_id } = request.params;
    const { eventName, place } = request.body;

    const eventsController = new EventController();

    const events = await eventsController.store({
      user_id,
      eventName,
      place,
    })

    return response.json(events);
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
});

export default eventsRouter;
