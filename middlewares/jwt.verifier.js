var jwt = require('jsonwebtoken');

const jwtVerifier = ((req, res, next)=>{
    const token = req.headers.auth;
    jwt.verify(token, 'masai', (err, decoded)=>{
        if(decoded){
            console.log(decoded.ID);
            next()
        }
        else if(err.message==='jwt must be provided')
        {
            res.send('You are not authenticated')
        }
        else res.send(err.message)
    })

})

module.exports = { jwtVerifier }