import { Request } from 'express';

export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  // console.log(file);

  if (!file) return callback(new Error('File id empty'), false);

  const fileExtension = file.mimetype.split('/')[1];
  const validExtensions = ['png', 'gif', 'jpg', 'jpeg'];

  if (validExtensions.includes(fileExtension)) {
    return callback(null, true);
  }

  callback(null, false);
};
