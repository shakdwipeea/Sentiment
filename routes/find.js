/**
 * Created by akash on 28/3/15.
 */

var express = require('express');
var router = express.Router();

var bayesUtil = require('../lib/bayesClassifierCategorizer');

router.post('/', function (req, res) {
    console.log(req.body);
    bayesUtil(req.body.query, function (Category) {
        console.log('cata',Category)
        res.render('index', { title: 'Sentiment', category: Category });
    });

});

module.exports = router;
