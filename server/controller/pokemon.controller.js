const express = require('express');
const router = express.Router();

const PokemonAccessor = require('../model/pokemon.model');

const authParser = require('../middleware/middleware_auth.middleware');


router.get('/', authParser, function(req, res) {
    PokemonAccessor.findPokemonByOwner(req.username)
        .then((response) => res.status(200).send(response),
            (error) =>  res.status(404).send(`Error finding Pokemon:${error}`));
});

router.post('/', authParser, (req, res) => {
    req.body.owner = req.username;
    return PokemonAccessor.insertPokemon(req.body)
        .then((response) => res.status(200).send(response),
            (error) => res.status(404).send(`Error finding Pokemon:${error}`))
});

router.get('/:id', function (req, res) {
    return PokemonAccessor.findPokemonById(req.params.id)
        .then((response) => res.status(200).send(response),
            (error) =>  res.status(404).send(`Error finding Pokemon:${error}`));
});

router.delete('/:id', function (req, res) {
    return PokemonAccessor.deletePokemonById(req.params.id)
        .then((response) => res.status(200).send(response),
            (error) =>  res.status(404).send(`Error finding Pokemon:${error}`));

});

module.exports = router;