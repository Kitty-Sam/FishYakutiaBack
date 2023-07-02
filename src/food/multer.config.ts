import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig = {
  dest: './uploads',

  storage: diskStorage({
    destination: './uploads',

    filename: (req, file, callback) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      callback(
        null,
        `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
      );
    },
  }),

  fileFilter: (req, file, callback) => {
    const allowedExtensions = ['.jpg', '.jpeg'];

    const fileExtension = extname(file.originalname).toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      return callback(new Error('Only jpg/jpeg files are allowed!'), false);
    }
    callback(null, true);
  },
};
