


const checkAuthentication = (req, res, next) => {
	if (req.isAuthenticated()) next() // con el method isAuthenticated de passport se fija directamente con el login si está autenticado el usuario
	else res.redirect('/login')
}

module.exports = checkAuthentication