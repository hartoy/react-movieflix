import React, { useState, useEffect } from "react";

import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import imgLoading from "../../img/imgLoading.png";
import "./movies.css";

function Movies() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  const ArrayIds = [];

  const baseURL = "https://api.themoviedb.org/3/movie/";
  const apiKey = "fb6347fd6c56bdb6a17dca07b0c83079";

  const getData = async () => {
    let response = await Axios(
      `${baseURL}popular?api_key=${apiKey}&language=en-US&page=1`
    );
    setMovies(response.data.results);
    setFavoritos(localStorage.favoritos);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, [ArrayIds]);

  const addFavHandler = (e) => {
    const elementoPadre = e.currentTarget.parentElement;
    const myFav = elementoPadre.querySelector(".lopo").innerText;
    if (localStorage.length === 0) {
      ArrayIds.push(myFav);
      localStorage.setItem("favoritos", JSON.stringify(ArrayIds));
    } else {
      let localList = localStorage.getItem("favoritos");
      let list = JSON.parse(localList);
      list.push(myFav);
      localStorage.setItem("favoritos", JSON.stringify(list));
    }
  };

  const RemoveFavHandler = (e) => {
    const elementoPadre = e.currentTarget.parentElement;
    const myFav = elementoPadre.querySelector(".lopo").innerText;
    let localList = localStorage.getItem("favoritos");
    let list = JSON.parse(localList);
    list.splice(list.indexOf(myFav), 1); // Elimina el elemento myFav del array ​list
    localStorage.setItem("favoritos", JSON.stringify(list)); // Sobrescribe el array de favoritos en el localStorage
  };

  return (
    <Row>
      {isLoading && (
        <div className="cargando">
          <h3 className="loading"> Loading...</h3>
          <img className="imgLoading" src={imgLoading} alt="" />
        </div>
      )}
      {movies.map((oneMovie) => {
        let imagenMovie = `https://image.tmdb.org/t/p/w500${oneMovie.poster_path}`;
        return (
          <Col key={oneMovie.id} lg={3} sm={6} xs={12}>
            <div>
              <Card className="my-2 h-100">
                <Card.Img
                  className="hovereffect"
                  variant="top"
                  src={imagenMovie}
                />
                <Card.Body>
                  <Card.Title className="titulo d-inline-block">
                    {oneMovie.title.substr(0, 25).trim()}
                  </Card.Title>
                  <p className="lopo">{oneMovie.id}</p>
                  <Card.Text className="resumen">
                    {oneMovie.overview.substr(0, 90).trim()}...
                  </Card.Text>
                  <Button
                    className="detalles"
                    as={Link}
                    to={`/movie-details/${oneMovie.id}`}
                  >
                    Details
                  </Button>

                  {favoritos.includes(oneMovie.id) ? (
                    <p
                      className=" heart d-inline-block"
                      onClick={RemoveFavHandler}
                    >
                      ❤️
                    </p>
                  ) : (
                    <p
                      className=" heart d-inline-block"
                      onClick={addFavHandler}
                    >
                      🤍
                    </p>
                  )}
                </Card.Body>
              </Card>
            </div>
          </Col>
        );
      })}
    </Row>
  );
}
export default Movies;
