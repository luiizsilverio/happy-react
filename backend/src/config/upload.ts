import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

const tmpFolder = path.resolve(__dirname, '..', '..', 'uploads');
// const tmpFolder = path.join(__dirname, '..', '..', 'uploads');

export default {
  directory: tmpFolder,

  storage: multer.diskStorage({
    destination: tmpFolder,    
    filename(request, file, callback) {
      const hash = crypto.randomBytes(6).toString('hex')
      const fileName = `${hash}-${file.originalname}`
      
      // outra maneira de gerar o nome seria com a data:
      // const fileName = `${Date.now()}-${file.originalname}`
      
      return callback(null, fileName)
    }
  })
}

// o nome original do arquivo do cliente vem no parâmetro file.
// se der erro, callback passa o erro no primeiro parâmetro