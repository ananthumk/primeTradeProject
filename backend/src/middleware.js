
const jwt = require('jsonwebtoken')


const middleware = async (req, res, next) => {
    
        const authHeader = req.headers.authorization 
        if (!authHeader) return res.status(401).json({message: 'Token is required'})

        const token = authHeader.split(' ')[1]
        if(!token) return res.status(401).json({message: "Invalid token format"})

        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY)
            req.user = decoded 
            next()
        } catch (error) {
            console.log('middleware: ', error.message)
            return res.status(401).json({message: 'Invalid or expired token'})
        }

        
    
} 

module.exports = middleware