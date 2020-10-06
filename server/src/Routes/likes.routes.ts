import { Router } from 'express';

import LikeController  from '../app/controllers/LikeController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const likesRouter = Router();
likesRouter.use(ensureAuthenticated);

likesRouter.get('/:event_id', async (request, response) => {
  try {
    const { event_id } = request.params;

    const likeController = new LikeController();

    const likes = await likeController.store({
      event_id,
    })

    return response.json(likes);
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
});

export default likesRouter;
