import React, { useState } from 'react';
import { useEffect } from 'react';

const URL = {
    CITIES: 'https://geo.api.gouv.fr/communes?nom=',
    COMPANY_LOGO: 'https://clearbit.com/'
}

const FetchInput = ({ handleLocalisation }) => {
    const [localisation, setLocalisation] = useState('');
    const [cities, setCities] = useState([])
    const [fetchOk, setFetchOk] = useState(true)

    useEffect(() => {
        fetchOk && fetchApi(URL.CITIES)
    }, [localisation])

    const fetchApi = async (url) => {
        try {
            const res = await fetch(url + localisation)
            const json = await res.json()
            const list_of_cities = json.reduce((cities, city, index) => {
                return city.population > 50000 ?
                    [...cities, { name: city.nom, cp: city.codeDepartement }] : cities
            }, []).slice(0, 9)
            setCities(list_of_cities)
        } catch (error) {
            console.log(error)
        }

    }
    const handleChange = e => {
        setFetchOk(true)
        setLocalisation(e.target.value)
    }

    const handleClick = (e) => {
        setLocalisation(e.target.name);
        handleLocalisation(e.target.name)
        setFetchOk(false);
        setCities([]);
    }

    return <div style={style.div}>
        <input onChange={handleChange} style={style.input} type="text" name="localisation" id="localisation" value={localisation} />
        <div className="options" style={style.options}>
            {cities ? cities.map((city, index) => {
                return <div key={city.name + index}>
                    <button onClick={handleClick} name={city.name + ' - ' + city.cp}>
                        {city.name} - {city.cp}
                    </button>
                </div>
            }) : null
            }
        </div>
    </div>
}

export default FetchInput;

const style = {
    div: {
        position: 'relative',
        width: '100%'
    },
    input: {
        width: '100%'

    },
    options: {
        position: 'absolute',
        top: '100%'

    }
}