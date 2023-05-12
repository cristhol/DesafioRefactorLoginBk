const GitHubStrategy = require('passport-github2');
const LocalStrategy = require("passport-local").Strategy;
const passport = require('passport');
const User = require('../models/User')
const bcrypt = require('bcrypt')


const isValidLogin = (user, password) => bcrypt.compareSync(password, user.password) // ==> checkea si la pw es correcta (lo hace todo bcrypt)
const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10), null) // ==> encripta la contraseña que recibe por parámetro en el signup con passport (bcrypt)


const initializePassport = () => {

passport.use('login', new LocalStrategy(
	(username, password, done) => {
		User.findOne({ username }, (error, user) => {
			if (error) return done(error)
			if (!user) return done(null, false, { message: 'El usuario no existe' })
			if (!isValidLogin(user, password)) return done(null, false, { message: 'Usuario y/o contraseña no válidos' })
			return done(null, user)
		})
	}
))

passport.use('signup', new LocalStrategy({
	passReqToCallback: true
},
	(req, username, password, done) => {
		User.findOne({ 'username': username }, (error, user) => {
			if (error) return done(error, user, { message: 'Error al intentar registrar el usuario' })
			if (user) return done(null, false, { message: 'El usuario ya existe'})
			const newUser = { username, password: createHash(password) }
			User.create(newUser, (error, userWithId) => {
				if (error) return done(error, user, { message: 'Error creando usuario' })
				return done(null, userWithId, { message: 'Usuario registrado correctamente!' })
			})
		})
	}
))


    passport.use( 'github', new GitHubStrategy ({
        clientID: "Iv1.eebb727ea991ecac",
        clientSecret: "daeb7da60fb4681157af04d8e9b2c0dd3a3ec0b7",
        callbackURL: "http://localhost:8080/session/githubcallback",
        scope: ["user:email"],
        },  
        async (accessToken, refreshToken, profile, done) => {
            try {
              console.log({ email: profile.emails[0].value });
              const user = await User.findOne({ email: profile.emails[0].value });
              if (!user) {
                const newUser = {
                  first_name: profile._json.name,
                  last_name: profile._json.name,
                  username: profile.username,
                  email: profile.emails[0].value,
                };
                console.log({ newUser });
                const result = await User.create(newUser);
                return done(null, result);
              } else {
                return done(null, user);
              }
            } catch (error) {
              return done(error);
            }
          }
        )
      );

      passport.serializeUser((user, done) => {
        done(null, user._id);
      });
      passport.deserializeUser(async (id, done) => {
        try {
          const user = await User.findById(id);
          done(null, user);
        } catch (error) {
          done(error);
        }
      });
    };

module.exports = { initializePassport, }; 