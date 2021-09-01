import React, { useState, useEffect } from 'react';
import {  Button, Row,  Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movieDetails.css'



function MovieDetails (props) {

    const id = props.match.params.id;


    const [ isLoading, setIsLoading ] = useState(true);
    const [ movies, setMovies ] = useState([]);
   
   

   useEffect(() => {
    const getData = async () =>{
        let endPoint =  `https://api.themoviedb.org/3/movie/${id}?api_key=fb6347fd6c56bdb6a17dca07b0c83079&language=en-US`; 
        let response = await fetch(endPoint);
        let data = await response.json();
        return data;  
       } 
        getData().then(data =>{
           setMovies(data);
           setIsLoading(false);
       });
       
},[id])


let imagenMovie = `https://image.tmdb.org/t/p/w500${movies.poster_path}`;
    
let genres= movies.genres ? movies.genres : [];

return(
    <Row className="movieDetails">
      
          {isLoading && <h3> Loading...</h3> }
          <Col md={4} >
          <img className="imgMovie"  alt="" src = {imagenMovie}  />
          </Col>
          <Col md={8} >
          <h1 className="title">{movies.original_title}</h1>
          <h3>Genres:</h3>
            <ul className = "genres">
              {genres.map((genre,i)=><li key = {i}>{genre.name}</li>) } 
           </ul>
          <h3>Review:</h3>
          <p className="overview">{movies.overview}</p>
          
           <h3>Rating: {movies.vote_average} ⭐</h3>
           
          <Button className="goBack" as={Link} to="/">Go Back</Button>
          </Col>
      
    </Row>  
   )

}

export default MovieDetails;