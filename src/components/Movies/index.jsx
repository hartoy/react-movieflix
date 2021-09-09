import React, { useState, useEffect } from 'react';
import { Card, Button, Row,  Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import imgLoading from "../../img/imgLoading.png";
import './movies.css'



function Movies (){
   
    const [ isLoading, setIsLoading ] = useState(true);
    const [ movies, setMovies ] = useState([]);
    const [ favorites, setFavorites ] = useState(false);
   
    const ArrayIds = [];





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
               console.log(data.results);
               setIsLoading(false);
           });
           
    },[])
    
    const addFavHandler = (e) => {
      const elementoPadre = e.currentTarget.parentElement;
      const myFav = elementoPadre.querySelector(".lopo").innerText;
      ArrayIds.push(myFav);
      setFavorites(true);
      console.log(ArrayIds);
      localStorage.setItem("favourites",JSON.stringify(ArrayIds));
      
   }


    return(
        
            
             <Row>
              
              { isLoading && 
            <div className= "cargando">
              <h3 className="loading"> Loading...</h3>  
              <img className="imgLoading" src={imgLoading} alt="" />
              
           </div>
          }
               {movies.map(oneMovie =>{
                let imagenMovie = `https://image.tmdb.org/t/p/w500${oneMovie.poster_path}`;
                return(
                    <Col lg={3} sm={6} xs ={12} >
                    <div key ={oneMovie.id}>
                        
                    <Card className="my-2 h-100">
                    
                  <Card.Img className="hovereffect" variant="top" src = {imagenMovie} />
                  <Card.Body>
                   <Card.Title className="titulo d-inline-block">{oneMovie.title.substr(0, 25).trim()}</Card.Title>
                     <p className="lopo">{oneMovie.id}</p>
                   <Card.Text className="resumen" >{oneMovie.overview.substr(0, 90).trim()}...</Card.Text>
                   <Button className="detalles" as={Link} to={`/movie-details/${oneMovie.id}`}>Details</Button>
                   
                     
                       <p className=" heart d-inline-block" onClick={addFavHandler}>🤍</p>
                       
                  </Card.Body>
                  
                 </Card>
                 
                 
                 
               </div>
               </Col>
           )
       } )}
       
       </Row>
            
       
         
     )
 }
 export default Movies;