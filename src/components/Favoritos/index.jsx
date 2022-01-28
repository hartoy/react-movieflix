import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import imgLoading from "../../img/imgLoading.png";
import noMovieImg from "../../img/noimg.png";
import "./favoritos.css";

function Favoritos() {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [lopo, setLopo] = useState(false);

  let localData = JSON.parse(localStorage.getItem("favoritos"));

  const id = localData;

  console.log(localStorage.favoritos);

  useEffect(() => {
    if (localData.length === 0) {
      setLopo(true);
    } else {
      id.forEach(async (unId) => {
        let endPoint = `https://api.themoviedb.org/3/movie/${unId}?api_key=fb6347fd6c56bdb6a17dca07b0c83079&language=en-US`;
        await fetch(endPoint)
          .then((response) => response.json())
          .then((data) => {
            setMovies((movies) => [...movies, data]);
          });
      });
    }
  }, []);

  const removeAllFav = (e) => {
    let localList = localStorage.getItem("favoritos");
    let list = JSON.parse(localList);
    console.log(list);
    list = [];
    localStorage.setItem("favoritos", JSON.stringify(list));
    window.location.reload();
  };

  const RemoveFavHandler = (e) => {
    console.log(localData);
    const elementoPadre = e.currentTarget.parentElement;
    const myFav = elementoPadre.querySelector(".lopo").innerText;
    let localList = localStorage.getItem("favoritos");
    let list = JSON.parse(localList);
    list.splice(list.indexOf(myFav), 1); // Elimina el elemento myFav del array ​list
    localStorage.setItem("favoritos", JSON.stringify(list)); // Sobrescribe el array de favoritos en el localStorage
    window.location.reload();
  };

  return (
    <Row>
      <div>
        <Button className="delFav" onClick={removeAllFav}>
          Clear Favorites
        </Button>
      </div>

      {lopo && (
        <div className="clearFav">
          <h3>You don't have favorite movies</h3>
        </div>
      )}
      {isLoading && (
        <div className="cargando">
          <h3 className="loading"> Loading...</h3>
          <img className="imgLoading" src={imgLoading} alt="" />
        </div>
      )}

      {movies.map((oneMovie) => {
        let imagenMovie = oneMovie.poster_path
          ? `https://image.tmdb.org/t/p/w500${oneMovie.poster_path}`
          : `${noMovieImg}`;
        return (
          <Col lg={3} sm={6} xs={12}>
            <div key={oneMovie.id}>
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
                    className="detallesFav"
                    as={Link}
                    to={`/movie-details/${oneMovie.id}`}
                  >
                    Details
                  </Button>
                  <Button className="delFav2" onClick={RemoveFavHandler}>
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </Col>
        );
      })}
    </Row>
  );
}

export default Favoritos;
