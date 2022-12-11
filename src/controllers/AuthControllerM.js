const express = require('express');
const router = express.Router();
const movieModel = require('../models/movies');

module.exports = {
 getById: function(req, res, next) {
  console.log(req.body);
  movieModel.findById(req.params.movieId, function(err, movieInfo){
   if (err) {
    next(err);
   } 
   else {
    res.json({status:"sucesso", message: "Filme encontrado com sucesso", data:{movies: movieInfo}});
   }
});
 },
getAll: function(req, res, next) {
  let moviesList = [];
movieModel.find({}, function(err, movies){
   if (err){
    next(err);
   } 
   else{
    for (let movie of movies) {
     moviesList.push({id: movie._id, name: movie.name, released_on: movie.released_on});
    }
    res.json({status:"sucesso", message: "Lista de filmes encontrada com sucesso", data:{movies: moviesList}});
       
   }
});
 },
updateById: function(req, res, next) {
  movieModel.findByIdAndUpdate(req.params.movieId,{name:req.body.name}, function(err, movieInfo){
if(err)
    next(err);
   else {
    res.json({status:"sucesso", message: "Filme atualizado com sucesso", data:null});
   }
  });
 },
deleteById: function(req, res, next) {
  movieModel.findByIdAndRemove(req.params.movieId, function(err, movieInfo){
   if(err)
    next(err);
   else {
    res.json({status:"sucesso", message: "Filme deletado com sucesso", data:null});
   }
  });
 },
create: function(req, res, next) {
  movieModel.create({ name: req.body.name, released_on: req.body.released_on }, function (err, result) {
      if (err) 
       next(err);
      else
       res.json({status: "sucesso", message: "Filme adicionado com sucesso", data: null});
      
    });
 },
}

module.exports = router;
