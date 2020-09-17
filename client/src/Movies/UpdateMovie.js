import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'

const initialValue = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: [],
}
const UpdateMovie = ({movieList, setMovieList, getMovieList}) => {
    const {id} = useParams()
    const history = useHistory()
   
    
    const [movie, setMovie] = useState(initialValue)
  

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => setMovie(res.data))
        .catch(err => console.log(err))
    },[id])

    const changeHandler = e => {
        setMovie({...movie,[e.target.name]:e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault();
        const editMovie = {
            id: id,
            title: movie.title.trim(),
            director: movie.director.trim(),
            metascore: movie.metascore,
            stars: movie.stars
        }

        const updateMovie = movieList.find(movie => movie.id === id)
        
    
           
            
        
        axios.put(`http://localhost:5000/api/movies/${id}`,editMovie)
        .then(res => {setMovieList[updateMovie] = res.date; history.push("/"); getMovieList()})
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
                    value={movie.title}
                />
                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder="director"
                    value={movie.director}
                />
                <input
                    type="number"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="metascore"
                    value={movie.metascore}
                />
                <input
                    type="text"
                    name="stars"
                    onChange={changeHandler}
                    placeholder="stars"
                    value={movie.stars}
                />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default UpdateMovie