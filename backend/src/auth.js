const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


require('dotenv').config()

//Generate Token 
const generateToken = (payload) => {
   return jwt.sign(payload, process.env.JWT_KEY, {expiresIn: '5h'})
}

module.exports = function (db) {
    const router = express.Router()

    router.post('/signup', async (req, res) => {
        try {
            const {name, email, password} = req.body 

            const query = 'SELECT * FROM users WHERE email = ?'
            const existingUser = await db.get(query, [email])

            if(existingUser) return res.status(400).json({message: 'User already exist'})

            const hashedPassword = await bcrypt.hash(password, 10)

            const insertquery = 'INSERT INTO users (name, email, password) VALUES ( ?, ?, ?)'
            const result = await db.run(insertquery, [name, email, hashedPassword])

            const newUserId = result.lastID

            const userQuery = 'SELECT id, email, name FROM users WHERE id = ?';
            const newUser = await db.get(userQuery, [newUserId]);

            const token = await generateToken({id: newUser.id, email: newUser.email})
            return res.status(200).json({message: 'User successfully registered', token: token, user: newUser})
        } catch (error) {
            console.log('Error while signup user: ', error.message)
            return res.status(500).json({message: 'Something went wrong! Try again later'})
        }
    })

    router.post('/login', async (req, res) => {
        try {
            const {email, password} = req.body 

            const query = 'SELECT * FROM users WHERE email = ?'
            const existingUser = await db.get(query, [email]) 

            if(!existingUser) return res.status(400).json({message: 'User not found'})

            const matchPassword = await bcrypt.compare( password, existingUser.password)
            
            if(!matchPassword) return res.status(400).json({message: 'Invalid Password'})

            const token = generateToken({ id: existingUser.id, email: existingUser.email })

            const userQuery = 'SELECT id, email, name FROM users WHERE id = ?'
            const user = await db.get(userQuery, [existingUser.id])

            return res.status(200).json({message: 'Successfully Logged In', token: token, user: user})
            
        } catch (error) {
            console.log('Error while Login user: ', error.message)
            return res.status(500).json({message: 'Something went wrong! Try again later'})
        }
    })

    return router

}

