'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local');

/* Initialize Passport to use local strategy; */
/* use a hard-coded list of users.            */
const users = {
	admin : {
		pw : 'admin',
		info: { name: 'Administrator' }
	}
};

passport.use(new LocalStrategy(( un, pw, done ) => {
	return (users[un] && users[un].pw === pw) ?
		done(null, users[un].info) :
		done(null, false);
}));

module.exports = app => (router => {

	/* COnfigure router to */

	router.use(passport.initialize());
	router.use(passport.session());

	passport.serializeUser(( user, done ) => done(null, JSON.stringify(user)));
	passport.deserializeUser(( user, done ) => done(null, JSON.parse(user)));

	/**/

	router.get('/passport-local/login', function(req, res) {
		res.render('../vulnerabilities/ato/views/passport-local-login');
	});

	router.post(
		'/passport-local/login',
		passport.authenticate('local', { failureRedirect : '/ato/passport-local/login'}),
		( req, res ) => res.redirect('/ato/passport-local/index'));

	router.get(
		'/passport-local/index',
		(req, res) => res.send(JSON.stringify(req.user || 'not logged in')));

	return router;

})(require('express').Router());
