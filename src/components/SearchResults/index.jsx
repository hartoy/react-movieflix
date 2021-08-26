import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Card, Button, Row,  Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


import './searchResults.css'

function SearchResults (){
    
    const [ validator, setValidator ] = useState(true);
    const [ movies, setMovies ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    const location = useLocation();
    const query = location.search;
    
    let word= query.substring(8);
    console.log(word);
    
    //component did mount

    useEffect(() => {
        if (word.length<=3) {
            setValidator(false)
        }else{
            const getData = async () =>{
                let endPoint =  `
                https://api.themoviedb.org/3/search/movie?api_key=fb6347fd6c56bdb6a17dca07b0c83079&language=en-US&query=${word}&page=1&include_adult=false`; 
                let response = await fetch(endPoint);
                let data = await response.json();
                return data;  
               } 
                getData().then(data =>{
                   setMovies(data.results);
                   console.log(data.results);
                   setIsLoading(false);
    
               });
        }
           
    },[])



   
    
    return(
        
            
        <Row>
          {isLoading && <h3> Loading...</h3> }
          {!validator && <h3> Tu busqueda debe tener mas de 3 caracteres</h3>} 
          {movies.map(oneMovie =>{
           let imagenMovie = `https://image.tmdb.org/t/p/w500${oneMovie.poster_path}`;
           return(
               <Col lg={3} sm={6} xs ={12} >
               <div key={oneMovie.id}>
                   
                   
                   
                 <Card className="my-2 h-100">
                  <Card.Img variant="top" src = {imagenMovie} />
                  <Card.Body>
                   <Card.Title className="titulo d-inline-block">{oneMovie.title}</Card.Title>
                     <p className=" heart d-inline-block">❤</p>
                     <p className="star d-inline-block">⭐{oneMovie.vote_average}</p>
                   <Card.Text className="resumen" >{oneMovie.overview.substr(0, 80).trim()}...</Card.Text>
                  </Card.Body>
                  <Button className="detalles" as={Link} to={`/movie-details/${oneMovie.id}`}>Ver detalle</Button>
                 </Card>
                 
                 
                 
               </div>
               </Col>
           )
       } )}
       
       </Row>
       
  
    
)
}

export default SearchResults;




