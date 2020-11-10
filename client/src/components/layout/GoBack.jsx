import React from 'react';
import { useHistory } from 'react-router-dom';

const GoBack = ({ text = "Go Back" }) => {
    const history = useHistory();
    const handleClick = () => history.goBack();

    return <div className="go-back-btn">
        <button onClick={handleClick}>
            {text}
        </button>
    </div>
}

export default GoBack;