import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import uuid from 'node-uuid'

const app = express()

const messages = []
const members = []

app.use(bodyParser.json())
app.use(cors())

app.get('/api', (req, res) => {
  const html = `
    <div>
      <h1>
        Chat API
      </h1>
      <ul>
        <li>
          <a href="/api/messages">/api/messages</a>
          <ul>
            <li><strong>GET</strong> Lista de mensajes</li>
            <li><strong>POST</strong> Enviar un mensaje</li>
          </ul>
        </li>
        <li>
          <a href="/api/members">/api/members</a>
          <ul>
            <li><strong>GET</strong> Lista de participantes</li>
            <li><strong>POST</strong> Ingresar al chat</li>
          </ul>
        </li>
      </ul>
    </div>
  `
  res.send(html)
})

app.get('/api/messages', (req, res) => {
  const { since } = req.query
  const index = messages.findIndex(m => m.id === since)
  if (index === -1) {
    return res.send(messages)
  } else {
    return res.send(messages.slice(index))
  }
})

app.post('/api/messages', (req, res) => {
  const { text, author } = req.body

  const error = {}

  if (!text) {
    error.text = 'Debe indicar el texto del mensaje'
  }

  let member

  if (!author) {
    error.author = 'Debe indicar el autor del mensaje'
  } else {
    member = members.find(
      m => m.id === author
    )
    if (!member) {
      error.author = 'No existe el participante'
    }
  }

  if (Object.keys(error).length) {
    return res.status(400).send({ error })
  }

  const newMessage = {
    id: uuid.v4(),
    text,
    member
  }

  messages.push(newMessage)

  res.send(newMessage)
})

app.get('/api/members', (req, res) => {
  res.send(members)
})

app.post('/api/members', (req, res) => {
  const { username } = req.body

  if (!username) {
    return res.status(400).send({
      error: { username: 'Debe ingresar un nombre de usuario' }
    })
  }

  const memberExists = members.some(
    m => m.username === username
  )

  if (memberExists) {
    return res.status(400).send({
      error: { username: 'Ya existe un participante con ese nombre' }
    })
  }

  const newMember = {
    id: uuid.v4(),
    username
  }
  members.push(newMember)

  res.send(newMember)
})

const server = app.listen(8080, '0.0.0.0', () => {
  console.log('http://localhost:%d/api', server.address().port)
})
