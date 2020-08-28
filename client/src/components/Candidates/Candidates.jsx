import React, { useEffect, useState, useContext, useReducer } from 'react';
import Filters from '../Filters'
import Usercard from './Usercard';
import Jobseeker from './Jobseeker';

import AuthContext from '../../context/auth/authContext';

import './temporary.css';

const Candidates = () => {
    const [users, setUsers] = useState([]);
    const [selectedCandidate, setSelection] = useState({ uid: '' });

    const selectUser = () => {
        setSelection({ uid: 1 })
    }

    const unselectCandidate = () => {
        setSelection({ uid: null })
    }

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setUsers(res)
            })
            .catch(err => console.log(err)
            )
    }, [])

    const [filter, setFilter] = useState('')

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(res => {
                const flt = new RegExp(filter, "gi")
                const newResult = res.reduce((a, c) => {
                    return Object.values(c).some(el => flt.test(el)) ? [...a, c] : a
                }, [])
                setUsers(newResult)
            })
        // .then(res => res.filter(u => Object.values(u).includes(filter)))
        // .then(userFilter => setUsers(userFilter))
    }, [filter])

    const changeFilters = (filtre) => setFilter(filtre)

    return <div>
        <Filters changeFilters={changeFilters}></Filters>
        <h1 className="section-title">CANDIDATS</h1>
        {selectedCandidate.uid ? <Jobseeker unselectCandidate={unselectCandidate} /> : <div>
            {
                users.map((user, i) => (
                    <Usercard
                        key={user.id + i}
                        user={user}
                        selectUser={selectUser}
                    />
                ))
            }</div>
        }
    </div >
}

export default Candidates;
