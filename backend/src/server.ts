import express from 'express'
import './database'

const app = express()

app.use(express.json()) 

app.get('/', (req, res) => {
  return res.json({ message: 'Happy' })
})

app.listen(3333, () => {
  console.log('Back-end Happy rodando na porta 3333')
})
