import React, { Fragment } from 'react';

const Jobseeker = ({ unselectCandidate, current }) => {

    const CurrentCandidate = ({ current }) => Object.keys(current).map(k => typeof current[k] !== 'object' ?
        <Fragment key={current[k] + Math.random()}><p>{k} : {current[k]} </p></Fragment> :
        <CurrentCandidate key={current[k] + Math.random()} current={current[k]} />)

    return <div>
        <div className='current-candidate-header'>
            <div>
                <p>FICHE CANDIDAT</p>
                <button>edit</button>
            </div>
            <button onClick={unselectCandidate}> close </button>
        </div>
        <div className='current-candidate'>
            {/* <p>{current.name} {current.lastname}</p> */}
            <CurrentCandidate current={current} />
        </div>
    </div>
}

export default Jobseeker;