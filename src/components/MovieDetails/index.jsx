import React, { useState, useEffect } from 'react';
import {  Button, Row,  Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movieDetails.css'



function MovieDetails (props) {

    const id = props.match.params.id;


    const [ isLoading, setIsLoading ] = useState(true);
    const [ movies, setMovies ] = useState([]);
   
   //component did mount

   useEffect(() => {
    const getData = async () =>{
        let endPoint =  `https://api.themoviedb.org/3/movie/${id}?api_key=fb6347fd6c56bdb6a17dca07b0c83079&language=en-US`; 
        let response = await fetch(endPoint);
        let data = await response.json();
        return data;  
       } 
        getData().then(data =>{
           setMovies(data);
           console.log(data.genres.length);
           
           setIsLoading(false);
       });
       
},[])
let imagenMovie = `https://image.tmdb.org/t/p/w500${movies.poster_path}`;
    


return(
    <Row className="movieDetails">
      
          {isLoading && <h3> Loading...</h3> }
          <Col md={4} >
          <img className="imgMovie"  src = {imagenMovie}  />
          </Col>
          <Col md={8} >
          <h1>{movies.original_title}</h1>
          <h3>Review:</h3>
          <p className="overview">{movies.overview}</p>
          <p className="rating">Rating: {movies.vote_average}⭐</p>
          
          <Button className="goBack" as={Link} to="/">Go Back</Button>
          </Col>
      
    </Row>  
   )

}

export default MovieDetails;