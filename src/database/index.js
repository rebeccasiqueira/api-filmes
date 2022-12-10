const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://rebecca:123@api.hny2csc.mongodb.net/api-mongodb?retryWrites=true&w=majority", {}, (error)=>{
    if(error){
        console.log('Falha ao autenticar com mongodb');
        console.log(error);
        return;
    }
    console.log('Conexão com mongodb estável');
})

mongoose.Promise = global.Promise;

module.exports = mongoose;
