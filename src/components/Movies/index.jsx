import React, { useState, useEffect } from 'react';
import { Card, Button, Row,  Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movies.css'



function Movies (){

    const [ isLoading, setIsLoading ] = useState(true);
    const [ movies, setMovies ] = useState([]);
    
  const baseURL = 'https://api.themoviedb.org/3/movie/';
  const apiKey = 'fb6347fd6c56bdb6a17dca07b0c83079';
  
    
    //component did mount

    useEffect(() => {
        const getData = async () =>{
            let endPoint =  `${baseURL}popular?api_key=${apiKey}&language=en-US&page=1`; 
            let response = await fetch(endPoint);
            let data = await response.json();
            return data;  
           } 
            getData().then(data =>{
               setMovies(data.results);
               console.log(data);
               setIsLoading(false);
           });
           
    },[])
    

    return(
        
            
             <Row>
              
                  {isLoading && <h3> Loading...</h3> }
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
 export default Movies;