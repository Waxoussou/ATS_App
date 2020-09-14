import React, { useState, useEffect } from 'react';

const URL = {
    CITIES: 'https://geo.api.gouv.fr/communes?nom=',
    COMPANY_LOGO: 'https://clearbit.com/'
}

const FetchInput = ({ type_url }) => {
    const [fetchResult, setFetchResult] = useState([]);
    const [param, setParam] = useState('');

    return <div>
        <input type="text" name="param" id="param" placeholder={type_url} />
        <div className="options">
            {fetchResult && fetchResult.map((res, i) => <div key={i}>
                <button></button>
            </div>)}
        </div>
    </div>
}

export default FetchInput;