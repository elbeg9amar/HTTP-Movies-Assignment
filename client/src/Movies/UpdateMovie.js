import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'

const initialValue = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: '',
}
const UpdateMovie = ({movieList, setMovieList, getMovieList}) => {
    const {id} = useParams()
    const history = useHistory()
   
    
    const [movies, setMovies] = useState(initialValue)
  

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => setMovies(res.data))
        .catch(err => console.log(err))
    },[id])

    const changeHandler = e => {
        setMovies({...movies,[e.target.name]:e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault();
        const editMovie = {
            id: id,
            title: movies.title.trim(),
            director: movies.director.trim(),
            metascore: movies.metascore,
            stars: movies.stars.split(',')
        }
        const updateMovie = movieList.find(movie => movie.id === id);

       
    
        axios.put(`http://localhost:5000/api/movies/${id}`,editMovie)
        .then(res => {
                setMovieList[updateMovie] = res.data; 
                history.push("/"); 
                getMovieList();
            })
        .catch(err => console.log(err))
    }

   
    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="title"
                    value={movies.title}
                />
                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder="director"
                    value={movies.director}
                />
                <input
                    type="number"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="metascore"
                    value={movies.metascore}
                />
                <input
                    type="text"
                    name="stars"
                    onChange={changeHandler}
                    placeholder="stars"
                    value={movies.stars}
                />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default UpdateMovie