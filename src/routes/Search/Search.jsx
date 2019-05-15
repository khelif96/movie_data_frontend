import React, { PureComponent } from 'react';
import {
  Form, Button, Card, ListGroup,
} from 'react-bootstrap';
import axios from 'axios';
import styles from './Search.module.css';

class Search extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      fetchedData: false,
      fetchedSuggestions: false,
      suggestions: '',
      movieData: {
        title: '',
        belongs_to_collection: '',
        budget: 0,
        revenue: 0,
        status: 'Released',
        vote_average: 0,
        movie_genres: [],
        overview: '',


      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  formatMoney = input => (input).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')

  displaySuggestions = (suggestions) => {
    if (!suggestions) return null;
    const {
      query,
      movies,
    } = suggestions;
    return (
      <Card bg="danger" style={{ width: '44rem', marginTop: '5rem' }}>
        <Card.Header>
Movies Similar to
          {' '}
          {query}
        </Card.Header>
        <ListGroup variant="flush">
          {movies.map(movie => <ListGroup.Item>{movie}</ListGroup.Item>)}
        </ListGroup>
      </Card>

    );
  }

  movieInfo = (movieData) => {
    const {
      title,
      belongs_to_collection,
      budget,
      revenue,
      vote_average,
      overview,
      genres,
      day,
      month,
      year,
    } = movieData;
    return (
      <div className={styles.description}>
        <h3>{title}</h3>
        {
        // eslint-disable-next-line react/jsx-no-target-blank
        }
        <Card bg="primary" text="white" style={{ width: '44rem' }}>
          <Card.Body>
            <Card.Title>
              {title}
              {' '}
Stats
            </Card.Title>
            <Card.Text>
              {belongs_to_collection ? 'Belongs to the ' : null}
              {belongs_to_collection
                ? <b>{belongs_to_collection}</b>
                : null}
            </Card.Text>
            <Card.Text>
                Release Date:
              <br />
              {month}
              {' '}
/
              {day}
/
              {year}
            </Card.Text>
            <Card.Text>
                Average Rating:
              {' '}
              {vote_average}
            </Card.Text>
            <Card.Text>
                Budget:
              <br />
              {' $ '}
              {this.formatMoney(budget)}
            </Card.Text>
            <Card.Text>
                Revenue:
              <br />
              {' $ '}
              {this.formatMoney(revenue)}
            </Card.Text>
            <Card.Text>
              Genres:
              <br />
              {genres}
            </Card.Text>
            <Card.Text>
                Overview:
              <br />

              {overview}
            </Card.Text>
          </Card.Body>
        </Card>

      </div>
    );
  }

  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  handleSubmit(event) {
    const {
      searchTerm,
    } = this.state;
    this.setState({ fetchedData: false, fetchedSuggestions: false });
    axios.get(`http://localhost:3001/api/movieInfo?searchTerm=${searchTerm}`)
      .then((response) => {
        // handle success
        // alert(response.data);
        // console.log(response.data);
        this.setState({ movieData: response.data.movieData, fetchedData: true });
      })
      .catch((error) => {
        // handle error
        alert(error);
        console.log(error);
      })
      .finally(() => {
        // always executed
      });
    axios.get(`http://localhost:3001/api/suggestions?searchTerm=${searchTerm}`)
      .then((response) => {
        // handle success
        // alert(response.data);
        // console.log(response.data);
        this.setState({ suggestions: response.data.movieData, fetchedSuggestions: true });
      })
      .catch((error) => {
        // handle error
        alert(error);
        console.log(error);
      })
      .finally(() => {
        // always executed
      });
    event.preventDefault();
  }


  render() {
    const {
      searchTerm,
      fetchedData,
      movieData,
      fetchedSuggestions,
      suggestions,
    } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.form}>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <h2>Enter a Movie Title to learn more</h2>
              <Form.Control value={searchTerm} onChange={this.handleChange} type="text" placeholder="Enter movie title" />

            </Form.Group>
            <Button variant="primary" type="submit" onClick={this.handleSubmit}>
            Search
            </Button>
          </Form>
        </div>
        <center>
          {fetchedData ? this.movieInfo(movieData) : null}
          {fetchedSuggestions ? (
            <div>
              {' '}
              {this.displaySuggestions(suggestions)}
            </div>
          ) : <b>Suggestions take a while to load</b>}
        </center>

      </div>
    );
  }
}

export default Search;
