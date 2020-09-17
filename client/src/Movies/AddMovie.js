import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const initialValue = {
    id: 8,
    title: '',
    director: '',
    metascore: '',
    stars: '',
}

const AddMovie = ({setMovieList}) => {
    const history = useHistory();
    const [values, setValues] = useState(initialValue)

    const changeHandler = e => {
        setValues({...values,[e.target.name]:e.target.value})
    }
    

    const onSubmit = e => {
        e.preventDefault();
        const newMovie =  {
            id: values.id + 1,
            title:values.title.trim(), 
            director: values.director.trim(),
            metascore: values.metascore,
            stars: values.stars.split(',')
        }
        axios.post("http://localhost:5000/api/movies",newMovie)
        .then(res => {setMovieList(res.data); history.push('/')})
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
                    value={values.title}
                />
                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder="director"
                    value={values.director}
                />
                <input
                    type="number"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="metascore"
                    value={values.metascore}
                />
                <input
                    type="text"
                    name="stars"
                    onChange={changeHandler}
                    placeholder="stars"
                    value={values.stars}
                />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default AddMovie