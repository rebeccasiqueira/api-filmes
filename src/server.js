const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const movies = require('./controllers/AuthControllerM') ;
const users = require('./controllers/AuthControllerU');

const AuthControllerU = require("./controllers/AuthControllerU");
const AdminController = require("./controllers/AdminController");
const authenticateMiddleware = require("./middleware/authenticate");

const app = express();

app.use(express.json());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));

app.use("/auth", AuthControllerU)
app.use("/admin", authenticateMiddleware, AdminController);
app.use("/users", users);
app.use("/movies", validateUser, movies);

function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secret'), function(err, decoded) {
      if (err) {
        res.json({status:"error", message: err.message, data:null});
      } else
      {
        req.body.userId = decoded.id;
        next();
      }
    });
  }

app.use(function(req, res, next) {
    let err = new Error("Não encontrado");
       err.status = 404;
       next(err);
   });

app.use(function(err, req, res, next) {
    console.log(err);
    
     if(err.status === 404)
      res.status(404).json({message: "Não encontrado"});
     else 
       res.status(500).json({message: "Algo parece errado :("});
   });

app.listen(3001, ()=>{
    console.log('O servidor está rodando');
})