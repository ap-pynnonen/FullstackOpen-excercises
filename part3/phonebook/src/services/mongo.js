const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://Fullstack:${password}@fullstack.oi1by.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Fullstack`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Note = mongoose.model('Note', noteSchema)

if(process.argv[3] === undefined) {
    console.log("phonebook:")
    Note.find({}).then(result => {
        result.forEach(note => {
            console.log(`${note.name} ${note.number}`)
        })
        mongoose.connection.close()
    })
}

else {
const Name = process.argv[3]
const Number = process.argv[4]

const note = new Note({
    name: Name,
    number: Number,
})

note.save().then(result => {
    console.log(`added ${Name} number ${Number} to phonebook`)
    mongoose.connection.close()
})
}