import express from 'express';
import {
  getAllComments,
  updateCommentById,
} from '@controller/comment.controller';

const commentRouter = express.Router();

commentRouter.route('/').get(getAllComments);
commentRouter.route('/:id').patch(updateCommentById);

export default commentRouter;
