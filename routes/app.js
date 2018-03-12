var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var server = require('http').createServer(express).listen(4555);
var io = require('socket.io').listen(server);
var bodyParser = require('body-parser');
var app = express();

var Array = require('../model/array');

router.get('/', function (req, res) {
        res.render('index');
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
var router = express.Router();

router.post('/armazena', function(req, res){
    var body = req.body;

    var data = {
        porcentagem: body.porcentagem,
        litros: body.litros
    };

    var a = [];
    a.push(data);

    Array.count(function(err, count){
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }else if(count == 0){

            var array = new Array ({
                array: a
            });
            array.save(function (err, result) {
                console.log(data)
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                } else {
                    res.status(200).json({
                        message: 'Salvou geral!',
                        obj: result
                    });
                }
            });
        }else{
            Array.findOne({}, function(err, a){
                if(err){
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });

                }else{
                    var aux = a.array;
                    aux.push(data)
                    var novoArray = new Array({
                        array: aux
                    });

                    Array.remove({_id: a.id}, function (err, result) {
                        if (err) {
                            return res.status(500).json({
                                title: 'An error occurred',
                                error: err
                            });
                        } else {
                        }
                    });

                    novoArray.save(function (err, result, next) {
                        console.log(result);
                        if (err) {
                            return res.status(500).json({
                                title: 'An error occurred',
                                error: err
                            });
                        } else {
                            io.emit('notificacao',JSON.stringify(result.array[result.array.length - 1]));
                            res.status(200).json({
                                message: 'Salvou geral!',
                                obj: result
                            });
                        }
                    });
                }
            });
        }
    });
});

app.listen(port);

module.exports = router;