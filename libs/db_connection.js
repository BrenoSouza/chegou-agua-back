var mongoose = require ('mongoose');
mongoose.connect("mongodb://localhost/SAD-EE");
var db = mongoose.connection;
db.on("error", function(err){
    console.log("Erro");
    console.log(err);
});
db.once("open", function(){});

module.exports = db;