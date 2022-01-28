import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import NavbarComp from "./components/miNavbar";
import Footer from "./components/Footer";
import Movies from "./components/Movies";
import Favoritos from "./components/Favoritos";
import NotFound from "./components/NotFound";
import SearchResults from "./components/SearchResults";
import MovieDetails from "./components/MovieDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="myPage">
        <NavbarComp />
        <Container>
          <Switch>
            <Route exact path="/" component={Movies} />
            <Route path="/favoritos" component={Favoritos} />
            <Route path="/search-results" component={SearchResults} />
            <Route path="/movie-details/:id" component={MovieDetails} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Container>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
