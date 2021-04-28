const express = require('express');

const OngControllers = require ('./controllers/OngControllers');
const IncidentsControllers = require ('./controllers/IncidentsControllers');
const ProfileController = require ('./controllers/ProfileControllers');
const SessionControllers = require('./controllers/SessionControllers');

const routes = express.Router();

routes.post('/sessions', SessionControllers.create);

routes.get('/ongs' , OngControllers.index);
routes.post('/ongs', OngControllers.create);

routes.post('/incidents' , IncidentsControllers.create);
routes.get('/incidents' , IncidentsControllers.index);
routes.delete('/incidents/:id', IncidentsControllers.delete);
routes.get('/profile', ProfileController.index);


module.exports = routes;