import crypto from 'node:crypto';
import multer from 'fastify-multer';
import {resolve} from 'node:path';

export default {
  upload(folder:string){
    return {
      storage: multer.diskStorage({
        destination:resolve(__dirname,"..","..","..",folder),
        filename: (req, file, callback)=> {
          const fileHash = crypto.randomBytes(16).toString('hex');
          const filename = `${fileHash}-${file.originalname}`;
          callback(null,filename);
        },
      }),
    };
  },
}