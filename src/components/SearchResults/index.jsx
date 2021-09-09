import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Card, Button, Row,  Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import imgLoading from "../../img/imgLoading.png";
import noResult from "../../img/noMovie.png";
import noMovieImg from "../../img/noimg.png";
import './searchResults.css'

function SearchResults (){
    
    const [ validator, setValidator ] = useState(true);
    const [ movies, setMovies ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ results, setResults ] = useState(true);
   

    const location = useLocation();
    const query = location.search;
    
    let word= query.substring(8);
   
    
    

    useEffect(() => {
        if (word.length<=2) {
            setValidator(false)
            setIsLoading(false);
        }else{
            const getData = async () =>{
                let endPoint =  `
                https://api.themoviedb.org/3/search/movie?api_key=fb6347fd6c56bdb6a17dca07b0c83079&language=en-US&query=${word}&page=1&include_adult=false`; 
                let response = await fetch(endPoint);
                let data = await response.json();
                return data;  
               } 
                getData().then(data =>{
                    if (data.results.length === 0){
                        setResults(false);
                        setIsLoading(false)
                    }else{
                        setMovies(data.results);
                        setIsLoading(false);
                        setValidator(true);
                        setResults(true);
                    } 
               });
        }
           
    },[word])


  
   
    
    return(
        
            
        <Row>
          { isLoading && 
            <div className= "cargando">
              <h3 className="loading"> Loading...</h3>  
              <img className="imgLoading" src={imgLoading} alt="" />
              
           </div>
          }

          {!validator && <h3 className="validator"> ❌ At least 3 characters are required for your search ❌</h3>} 
          { results? movies.map(oneMovie =>{
           let imagenMovie = oneMovie.poster_path ? `https://image.tmdb.org/t/p/w500${oneMovie.poster_path}` : `${noMovieImg}`;
           return(
               <Col lg={3} sm={6} xs ={12} >
               <div key={oneMovie.id}>
                   
                   
                   
                 <Card className="my-2 h-100">
                  <Card.Img variant="top" src = {imagenMovie} />
                  <Card.Body>
                   <Card.Title className="titulo d-inline-block">{oneMovie.title.substr(0, 25).trim()}</Card.Title>
                     
                   <Card.Text className="resumen" >{oneMovie.overview.substr(0, 90).trim()}...</Card.Text>
                   <Button className="detalles" as={Link} to={`/movie-details/${oneMovie.id}`}>Details</Button>
                   <p className=" heart d-inline-block">🤍</p>
                  </Card.Body>
                  
                 </Card>
                 
                 
                 
               </div>
               </Col>
           )
       } ):
       <div className="noResults">
       <h1 className="validator">It looks like there aren't any  matches for your search</h1>
       <img className="noMovieImg" src={noResult} alt="" />
       </div>
       }
        
       </Row>
       
  
    
)
}

export default SearchResults;




