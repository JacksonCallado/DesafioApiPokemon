const bodyParser = require('body-parser');
const PokemonRoute = require('./pokemonRoutes');

module.exports = (app) => {
   app.use(bodyParser.json());
   PokemonRoute(app)
}