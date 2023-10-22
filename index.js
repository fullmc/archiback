// init server express
require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const path = require('path')
const port = 3000
const booksRouter = require('./router/booksRouter')
const usersRouter = require('./router/usersRouter')

// init mongoose
const mongoose = require('mongoose')

// Connection à la base de données
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, writeConcern: { w: 'majority' }, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB !')) // 'then' = quand ça marche
  .catch(err => console.error(err + 'Could not connect to MongoDB ')) // 'catch'np = quand ça marche pas

// init cookie-parser
app.use(cookieParser())

// init cors
const cors = require('cors')
app.use(cors())

// body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// router sur lequel il va afficher les infos
app.use('/books', booksRouter)
app.use('/users', usersRouter)
app.use(express.static((path.join(__dirname, '/frontend'))))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/index.html')) // dirname = directory name = dossier dans lequel on veut aller
})

// listen server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
