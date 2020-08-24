import React, { useState } from 'react';
import { useEffect } from 'react';

const Filters = ({ changeFilters }) => {
    const [state, setState] = useState({
        name: '',
        email: '',
        city: '',
        skills: []
    })
    const [filtre, setFiltre] = useState('')

    const handleChange = e => {
        const key = e.target.name, val = e.target.value;
        if (Array.isArray(state[key])) {
            const newArr = state[key].includes(val) ? state[key].filter(a => a === val) : [...state[key], val]
            setState({ ...state, [key]: newArr });
        } else {
            setState({ ...state, [key]: val })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(filtre)
        changeFilters(filtre)
    }

    useEffect(() => { console.log(state) }, [state])

    return <div>
        <form onSubmit={handleSubmit}>
            <input type="text" name='filtre' onChange={(e) => setFiltre(e.target.value)} value={filtre} />
            {/* <input type="text" name='name' onChange={handleChange} value={state.name} />
            <input type="text" name='email' onChange={handleChange} value={state.email} />
            <input type="text" name='city' onChange={handleChange} value={state.city} /> */}
            <label htmlFor="">
                label
                <select value={state.skills} name="skills" id="" onChange={handleChange}>
                    <option value="1">un</option>
                    <option value="2">deux</option>
                    <option value="3">trois</option>
                </select>
            </label>

            <input type="submit" value="Filter" />
        </form>
    </div>
}

export default Filters;