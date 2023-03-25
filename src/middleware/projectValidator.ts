/* eslint-disable consistent-return */
import { NextFunction, Response, Request } from 'express';
import { UploadedFile } from 'express-fileupload';
import { AnyZodObject, z } from 'zod';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@utils/image-size-types';

const dataSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  description: z.string({
    required_error: 'Description is required',
  }),

  image_url: z
    .object({
      mimetype: z.string().nonempty(),
      size: z.number(),
    })
    .refine(file => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      file => ACCEPTED_IMAGE_TYPES.includes(file?.mimetype),
      '.jpg, .jpeg, .png, .webp and .svg files are accepted.'
    )
    .array(),
});

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description } = req.body;

    const image_url = req.files?.image_url as UploadedFile[];

    try {
      await schema.parseAsync({
        name,
        description,
        image_url,
      });
      next();
    } catch (error) {
      let err = error;
      // console.log('zod err', err);

      if (err instanceof z.ZodError) {
        err = err.issues.map(e => ({ path: e.path[0], message: e.message }));
      }
      return res.status(409).json({
        status: 'failed',
        error: err,
      });
    }
  };

export const validateProjectCreate = validate(dataSchema);
