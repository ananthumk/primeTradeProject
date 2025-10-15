const express = require('express')
const bcrypt = require('bcrypt')

module.exports = function(db){
    const router = express.Router()
    
    //Get User
    router.get('/', async(req, res) => {
        try {
            const query = 'SELECT * FROM users WHERE id = ?'
            const user = await db.get(query, [req.user.id])

            if(!user) return res.status(404).json({message: 'User not found'})

            return res.status(200).json({user})
        } catch (error) {
            console.log('Error while fetching user: ', error.message)
            return res.status(500).json({message: 'Something went wrong! Try again later'})
        }
    })

    // router.put('/', async (req, res) => {
    //     try {
    //         const {name, email, oldPassword, newPassword} = req.body
            
    //         const query = 'SELECT * FROM users WHERE email = ?'
    //         const user = await db.get(query, [email])

    //         if(user) return res.status(401).json({message: 'User already exists'})

    //         const matchPassword = await bcrypt.compare(user.password, oldPassword)
    //         if(!matchPassword) return res.status(401).json({message: 'Incorrect old password'}) 

    //         const hashedPassword = await bcrypt.hash(newPassword, 10)
            
    //         const updateQuery = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?'
    //         await db.run(updateQuery, [name, email, hashedPassword, req.user.id]) 

    //         return res.status(200).json({message: 'Updated successfully'})
            
    //     } catch (error) {
    //         console.log('Error while updating user: ', error.message)
    //         return res.status(500).json({message: 'Something went wrong! Try again later'})
    //     }
    // })


    // Edit User
    router.put('/', async (req, res) => {
        try {
            
            const { name, email, oldPassword, newPassword } = req.body;
            
           
            if (!name || !email || !oldPassword || !newPassword) {
                return res.status(400).json({ 
                    message: 'All fields are required (name, email, oldPassword, newPassword)' 
                });
            }
            
            
            const query = 'SELECT * FROM users WHERE id = ?';
            const user = await db.get(query, [req.user.id]);
            
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            
            // Verify old password 
            const matchPassword = await bcrypt.compare(oldPassword, user.password);
            if (!matchPassword) {
                return res.status(401).json({ message: 'Incorrect old password' });
            }
            
            // Check if new email is already taken by another user
            if (email !== user.email) {
                const emailQuery = 'SELECT * FROM users WHERE email = ? AND id != ?';
                const existingUser = await db.get(emailQuery, [email, req.user.id]);
                if (existingUser) {
                    return res.status(409).json({ message: 'Email already in use' });
                }
            }
            
            // Hash new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            
            // Update user
            const updateQuery = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';
            await db.run(updateQuery, [name, email, hashedPassword, req.user.id]);
            
            return res.status(200).json({ message: 'Updated successfully' });
            
        } catch (error) {
            console.log('Error while updating user:', error.message);
            return res.status(500).json({ message: 'Something went wrong! Try again later' });
        }
    });

    return router
}