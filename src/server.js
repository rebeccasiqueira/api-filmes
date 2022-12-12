const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const AuthController = require("./controllers/AuthControllerU");
const AdminController = require("./controllers/AdminController");
const authenticateMiddleware = require("./middleware/authenticate");
const authmovies = require('./controllers/AuthControllerM');
const movies = require('./routers/movie.router');
const actors = require('./routers/actor.router') ;

const app = express();

app.use(express.json());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));

app.use("/auth", AuthController)
app.use("/admin", authenticateMiddleware, AdminController);
app.use("/movies", validateUser, authmovies, movies);
app.use("/actors", actors);

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