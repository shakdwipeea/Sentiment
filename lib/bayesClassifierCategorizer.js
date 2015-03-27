
var bayes = require('bayes');

var fs = require('fs');

var categorize = function (text, callback) {

    fs.readFile(__dirname + '/Classifier.json', function (err, data) {
        if (err)
        {
            console.log(err);
        }
        else
        {
            var revivedClassifier = bayes.fromJson(data);
            var answer = revivedClassifier.categorize(text);
            console.log('Answer is', answer);
            callback(answer);
        }
    });
}

module.exports = categorize;