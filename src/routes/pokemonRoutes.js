const fs = require('fs');
const PokemonController = require('../controllers/pokemonControllers');



module.exports = (app, fs) => {
   app.post('/pokemon', PokemonController.post);
   app.delete('/pokemon/:id', PokemonController.delete);
   app.get('/pokemon', PokemonController.get);
   app.get('/pokemon/:id', PokemonController.getById);
}