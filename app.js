/**
 * Auteur:  christopher
 * Date:    16/05/16
 * Objet:	Configuration de l'application Express
 */

/**
 * Imports
 */
var express        = require('express');
var expressLayouts = require('express-ejs-layouts')
var ejs            = require('ejs');
var path           = require('path');

/**
 * Application
 */
var app = express();

/**
 * Utilisation des session et des champs de formulaire
 */
app
	.use(express.cookieParser())
	.use(express.session({secret : 'todosecre'}))
	.use(express.bodyParser())
	.use(express.static(path.join(__dirname, 'public')))
	.use(expressLayouts)
	.use(function(req, res, next)
	{
		if (typeof (req.session.tache) == 'undefined')
		{
			req.session.tache = [];
		}
		next();
	});

/**
 * Utilisation du gestionnaire de template
 */
app
	.set('view engine', 'ejs')
	.set('layout', 'layout');


/**
 * Routes
 */
app
	.get('/',  function (req, res)
	{
		res.redirect('/todo');
	})
	.get('/todo', function(req, res)
	{
		res.render('index',{"todolist" : req.session.tache});
	})
	.post('/todo/ajouter', function (req, res)
	{
		req.session.tache.push(req.body.todo);
		res.render('ajout', {"tache" : req.body.todo, "todolist" : req.session.tache});
	})
	.get('/todo/supprimer/:id', function(req, res)
	{
		var tache = req.session.tache[req.params.id];
		req.session.tache.splice(req.params.id, 1);
		res.render('suppression', {"tache" : tache, "todolist" : req.session.tache});
	})
	.use(function(req, res, next)
	{
		res.render({layout :'404'});
	});

/**
 * Lancement
 */

app.listen(8080);


