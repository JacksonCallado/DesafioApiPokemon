const fs = require('fs');
const bodyParser = require('body-parser');
const pokemonDB = 'C:/Users/lytt1/Desktop/ApiPokemon/pokemon.json'

const jsonParser = bodyParser.json();

//POST --> Adiciona a lista um pokemon informado no corpo da requisição e mostra os dados inseridos no corpo da resposta
exports.post = (req, res, next) => {

   const pokemon = req.body;
   let obj = fs.readFileSync(pokemonDB, "utf-8", function (err, data) {
      if (err) throw err;
   });   
   let listaDePokemon = JSON.parse(obj)

   listaDePokemon.push(pokemon)

   fs.writeFileSync(pokemonDB, JSON.stringify(listaDePokemon), function(err){
      if(err) throw err;
   })

   res.status(200).json(pokemon);
};

//GET --> Tras a lista de todos os pokemons e envia no corpo da resposta
exports.get = (req, res, next) => {

   let obj = fs.readFileSync(pokemonDB, "utf-8", function (err, data) {
      if (err) throw err;
   });
   let listaDePokemon = JSON.parse(obj)
   
   res.status(200).json(listaDePokemon);
};

//GET --> Procura um pokemon especifico e retorna ele no corpo da resposta
exports.getById = (req, res, next) => {

   let id = req.params.id;
   let obj = fs.readFileSync(pokemonDB, "utf-8", function (err, data) {
      if (err) throw err;
   });
   let listaDePokemon = JSON.parse(obj)

   let procuraPokemon = listaDePokemon.find(numero => numero.number == id)

   if(procuraPokemon == undefined){      
   let naoEncontrado = {
      "statusCode": 404,
      "message": "Pokémon not found",
      "error": "Not Found"
    }
      res.status(404).json(naoEncontrado)

   } else {

      res.status(200).json(procuraPokemon);

   }   
};

exports.delete = (req, res, next) => {

   let id = req.params.id;
   let obj = fs.readFileSync(pokemonDB, "utf-8", function (err, data) {
      if (err) throw err;
   });
   let listaDePokemon = JSON.parse(obj)

   let pokemonASerDeletado = listaDePokemon.indexOf(listaDePokemon.find(numero => numero.number == id))

   if(pokemonASerDeletado > -1){
      let pokemonDeletado = listaDePokemon.find(numero => numero.number == id)

      listaDePokemon.splice(pokemonASerDeletado, 1)

      fs.writeFileSync(pokemonDB, JSON.stringify(listaDePokemon), function(err){
         if(err) throw err;
      })

      res.status(200).json(pokemonDeletado);

   } else {      

      let naoEncontrado = {
         "statusCode": 404,
         "message": "Pokémon not found",
         "error": "Not Found"
      }

      res.status(404).json(naoEncontrado);

};
}
