const express = require('express');
const router = express.Router();

const UrlAccessor = require('../model/url.model');

router.post('/', (req, res) => {
    return UrlAccessor.insertUrl(req.body)
        .then((response) => res.status(200).send(response),
            (error) => res.status(404).send(`Error finding Url:${error}`))
});

router.get('/', function (req, res) {
    UrlAccessor.getAllUrl()
        .then((response) => res.status(200).send(response),
            (error) => res.status(404).send(`Error finding Url:${error}`));
});

router.delete('/:id', function (req, res) {
    const id = req.params.id;
    return UrlAccessor.deleteUrlById(id)
        .then((response) => res.status(200).send(response),
            (error) => res.status(404).send(`Error finding Url:${error}`));
});

router.get('/shorten/:shortenUrl', function (req, res) {
    const shortenUrl = req.params.shortenUrl;
    return UrlAccessor.findUrl(shortenUrl)
        .then((response) => res.status(200).send(response),
            (error) => res.status(404).send(`Error finding Url:${error}`));
})

module.exports = router;