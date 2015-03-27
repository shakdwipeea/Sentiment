/**
 * Created by akash on 28/3/15.
 */
var bayes = require('bayes');
var fs = require('fs');

var async = require('async');

var classifier = bayes();

var teachNegative = function (callback) {
    fs.readdir('../txt_sentoken/neg', function (err, filesNeg) {
        if (err)
        {
            console.log("Error ", err)
        }

        else
        {
            console.log(filesNeg);

            var totalTaskNeg = filesNeg.length - 1;
            var completeTaskNeg = 0;

            for(var i = 0; i < filesNeg.length; i++)
            {
                fs.readFile('../txt_sentoken/neg/' + filesNeg[i], 'utf8', function (err,data) {
                    if (err) {
                        return console.log(err);
                    }
                    //All data will eventually come here. Now train the classifier
                    classifier.learn(data, 'Negative');
                    completeTaskNeg++;

                    if (completeTaskNeg === totalTaskNeg)
                    {
                        callback(null, null);
                    }
                });

            }
        }
    });
}

var teachPositive = function (callback) {
    fs.readdir('../txt_sentoken/pos', function (err, filesPos) {
        if (err)
        {
            console.log("Error ", err)
        }

        else
        {
            console.log(filesPos);

            var totalTaskPos = filesPos.length - 1;
            var completeTaskPos = 0;

            for(var i = 0; i < filesPos.length; i++)
            {
                fs.readFile('../txt_sentoken/pos/' + filesPos[i], 'utf8', function (err,data) {
                    if (err) {
                        return console.log(err);
                    }
                    //All data will eventually come here. Now train the classifier
                    classifier.learn(data, 'Positive');

                    completeTaskPos++;

                    if (completeTaskPos === totalTaskPos)
                    {
                        callback(null, null);
                    }

                });

            }
        }
    });
}

async.parallel([teachNegative,teachPositive], function (e,d) {
    console.log('Called');
    var bayesClassifier = classifier.toJson();

    fs.writeFile('Classifier.json',bayesClassifier, function (err) {
        if(err)
        {
            console.log('Error occured', err);
        }
        else
        {
            console.log('Done');
        }
    })
});


// teach it positive phrases

//classifier.learn('amazing, awesome movie!! Yeah!! Oh boy.', 'positive')
//classifier.learn('Sweet, this is incredibly, amazing, perfect, great!!', 'positive')

// teach it a negative phrase

//classifier.learn('terrible, shitty thing. Damn. Sucks!!', 'negative')

// now ask it to categorize a document it has never seen before

//classifier.categorize('awesome, cool, amazing!! Yay.')
// => 'positive'

// serialize the classifier's state as a JSON string.
//var stateJson = classifier.toJson()



// load the classifier back from its JSON representation.
//var revivedClassifier = bayes.fromJson(stateJson)