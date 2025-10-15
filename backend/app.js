const express = require('express')
const cors = require('cors')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')

require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())

const dbPath = path.join(__dirname, 'myDatabase.db')
const PORT = process.env.PORT || 4000

let db 
const intializeDbAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        })

        console.log('Database connected')
        
        //Routes
        const authRoutes = require('./src/auth')(db)
        const middleware = require('./src/middleware')
        const userRoutes = require('./src/user')(db)
        const taskRoutes = require('./src/tasks')(db)
        app.use('/auth', authRoutes)
        app.use('/user', middleware, userRoutes)
        app.use('/task', middleware, taskRoutes)

        app.listen(PORT, () => console.log(`The server is running on http://localhost:${PORT}`))

    } catch (error) {
        console.log('Error while intializing db and server: ', error)
        process.exit(1)
    }
}

intializeDbAndServer()



