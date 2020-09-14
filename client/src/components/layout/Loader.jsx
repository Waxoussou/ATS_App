import React from 'react';

function Loader() {
    return <div>
        <h1>  Loading...    </h1>
        <svg viewBox='0 0 700 700'>
            <rect x='20' y='30' width="50" height="6">
                <animate attributeName="width" from="0" to="100" dur="0.5s" repeatCount='indefinite' />
            </rect>
            <rect x='30' y='40' width="50" height="6" >
                <animate attributeName="width" from="50" to="100" dur="0.5s" repeatCount='indefinite' />
            </rect>
            <rect x='20' y='50' width="50" height="6" >
                <animate attributeName="width" from="0" to="100" dur="0.5s" repeatCount='indefinite' />
            </rect>
        </svg>
    </div >
}

export default Loader;