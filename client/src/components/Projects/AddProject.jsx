import React from 'react';
import { Link, useHistory } from 'react-router-dom'

const AddProject = () => {
    const history = useHistory();
    const handleBack = () => {
        history.goBack()
    }
    return <div> <form action="" method="post">
        <input type="text" name="" id="" />
        <input type="text" name="" id="" />
        <input type="text" name="" id="" />
        <input type="text" name="" id="" />
        <input type="text" name="" id="" />
        <input type="text" name="" id="" />

    </form>
        <div>
            <button onClick={handleBack}>Back</button>
        </div>
    </div>

}

export default AddProject;