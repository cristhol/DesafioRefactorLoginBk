const authSession = (req, res, next)=>{
    if (req.session?.user?.username !== 'federico1' && !req.session?.user?.admin) {
        return res.status(401).send('error de autenticación')        
    }

    next()
}

module.exports = {
    authSession
}


