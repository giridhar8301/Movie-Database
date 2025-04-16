import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import NavBar from '../NavBar'
import './index.css'

const MovieDetails = () => {
  const {id} = useParams()
  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const API_KEY = 'f32b79895b21468afbdd6d5342cbf3da'

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      const creditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`

      const [movieResponse, creditsResponse] = await Promise.all([
        fetch(movieUrl),
        fetch(creditsUrl),
      ])

      const movieData = await movieResponse.json()
      const creditsData = await creditsResponse.json()

      setMovie(movieData)
      setCast(creditsData.cast)
      setIsLoading(false)
    }

    fetchMovieDetails()
  }, [id])

  const renderMovieDetails = () => (
    <div className="movie-details-wrapper">
      <div className="movie-details-container">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="details-poster"
        />
        <div className="details-content">
          <h1>{movie.title}</h1>
          <p>
            <strong>Rating:</strong> ⭐ {movie.vote_average}
          </p>
          <p>
            <strong>Duration:</strong> {movie.runtime} min
          </p>
          <p>
            <strong>Genre:</strong>{' '}
            {movie.genres.map(genre => genre.name).join(', ')}
          </p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Overview:</strong> {movie.overview}
          </p>
        </div>
      </div>

      <h2 className="section-title">Cast</h2>
      <div className="cast-grid">
        {cast.map(member => (
          <div key={member.cast_id} className="cast-card">
            <img
              src={
                member.profile_path
                  ? `https://image.tmdb.org/t/p/w185${member.profile_path}`
                  : 'https://via.placeholder.com/185x278?text=No+Image'
              }
              alt={member.original_name}
              className="cast-image"
            />
            <p className="cast-name">{member.original_name}</p>
            <p className="cast-character">as {member.character}</p>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <>
      <NavBar />
      <div className="route-page-body">
        {isLoading ? (
          <div className="loader-container">
            <Loader type="TailSpin" color="#032541" />
          </div>
        ) : (
          renderMovieDetails()
        )}
      </div>
    </>
  )
}

export default MovieDetails
