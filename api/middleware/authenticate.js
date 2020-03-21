const jsonwebtoken = require('jsonwebtoken')
const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jsonwebtoken.verify(token, 'SECRET')
        req.user = decode
        next()
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Error Occured',
            err
        })
    }
}
module.exports = authenticate