import { Router } from 'express';

import DislikeController  from '../app/controllers/DislikeController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const dislikesRouter = Router();
dislikesRouter.use(ensureAuthenticated);

dislikesRouter.get('/:event_id', async (request, response) => {
  try {
    const { event_id } = request.params;

    const dislikeController = new DislikeController();

    const dislikes = await dislikeController.store({
      event_id,
    })

    return response.json(dislikes);
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
});

export default dislikesRouter;
