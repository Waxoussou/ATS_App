import React from 'react';
import { useState } from 'react';
import { json } from 'body-parser';

const Modal = ({ username }) => {
    return <div >
        <h1>MODAL</h1>
        <h3>{username}</h3>
    </div>
}

const asyncFetchData = async (url, token) => {
    const body = { title: 'max' };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "authorization": token
        },
        body: JSON.stringify(body),
    };

    const res = await fetch(url, options);
    const json = await res.json()
    return json

}

const AddBtn = ({ token }) => {

    const [isOpen, setOpen] = useState(false)
    const [username, setUsername] = useState('')
    const handleClick = async () => {
        const result = await asyncFetchData('/api/projects/new', token)
        console.log('result ', result)
        setUsername(result.username);
        setOpen(!isOpen);
    }

    return <div>
        <button onClick={handleClick} type="submit">
            Ajouter un job
            </button>

        {isOpen && <Modal username={username} />}
    </div>
}
export default AddBtn;