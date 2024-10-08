require('dotenv').config();
const express = require('express')
const Person = require('./models/person')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())

morgan.token('body', req => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
  })

  app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
     .then(person => {
      if(person) {
        response.json(person)
      }
      else {
        response.status(404).end()
      }
     })
     .catch(error => next(error))
  })

  app.delete('/api/persons/:id', (request, response, next) => {

    Person.findByIdAndDelete(request.params.id)
     .then(result => {
      response.status(204).end()
     })
     .catch(error => next(error))
  })

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    const person = new Person ({
        name: body.name,
        number: body.number,
    })
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(request.params.id, person, { new : true })
   .then(updatedPerson => {
    response.json(updatedPerson)
   })
   .catch(error => next(error))
})

app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
      const personlength = persons.length
      const datenow = new Date()
      response.send(`<p>Phonebook has info for ${personlength} people</p> <p>${datenow}</p>`)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id'})
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})