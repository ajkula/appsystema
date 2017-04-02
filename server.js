/**
 * Created by Greg JEFTIC on 19/11/2016.
 */
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var ejs = require('ejs');

app.use(bodyparser.json());
app.set('view engine', 'ejs');

app.use('/assets', express.static(__dirname + '/public'));

Students = require('./models/students');
// connect to mongoose
    mongoose.connect('mongodb://cercle:tedrzi@ds159737.mlab.com:59737/cercle');
//    mongoose.connect('mongodb://localhost:27017/cercle');
var db = mongoose.connection;

// Compile the source code
//  const compiledFunction = pug.compileFile('index.pug');

app.get('/systema', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    Students.getStudents(function (err, students) {
            if (err) {
                res.send(err);
            }
            res.render('index', { Sstudents: students });
            
        });
    

});

app.get('/', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send('UNKNOWN!!');
});

app.get('/api/cercle', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 //   if (rep.params.api == "zfaAEGf232sgs56eRRE5663") {
        Students.getStudents(function (err, students) {
            if (err) {
                res.send(err);
            }
            res.json(students);
        })
    //} else {
    //    res.send('UNKNOWN!!');
    //}
});

app.get('/api/cercle/:_id', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //  if (rep.params.api == "zfaAEGf232sgs56eRRE5663") {
        Students.getStudentById(req.params._id, function (err, student) {
            if (err) {
                res.send(err);
            }
            res.json(student);
        });
    //} else {
    //    res.send('UNKNOWN!!');
    //}
});

app.post('/api/cercle', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    var students = req.body;
  //  if (rep.params.api == "zfaAEGf232sgs56eRRE5663") {
    if(req.body){
        Students.addStudents(students, function (err, students) {
            if (err) {
                res.send(err);
            }
            res.json(students);
        });
    }
    //} else {
    //    res.send('UNKNOWN!!');
    //}
});

app.put('/api/cercle/:_id', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
           var id = req.params._id;
           var students = req.body;

    //  if (rep.params.api == "zfaAEGf232sgs56eRRE5663") {
            Students.updateStudents(id, students, {}, function (err, students) {
                if (err) {
                    res.write(err);
                }
                res.json(students);
            //    res.json(student);
            });
       
        //} else {
        //    res.send('UNKNOWN!!');
        //}
});

app.delete('/api/cercle/:_id', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if(!req.params._id) res.send("requête incorrecte, aucun objet en paramêtre!")
    else {
        var id = req.params._id;
    //   if (rep.params.api == "zfaAEGf232sgs56eRRE5663") {
            Students.deleteStudent(id, function (err, students) {
                if (err) {
                    res.send(err);
                }
                res.json(students);
            });
        }
        //} else {
        //    res.send('UNKNOWN!!');
        //}
});

//  app.listen(3000);
var port = process.env.PORT || 1337;
console.log('running on port %s', port);

app.listen(port);