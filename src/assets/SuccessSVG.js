import * as React from 'react';

function SuccessModalSVG({width, height}) {
    return (
        <svg width={width ? width : "4rem"} height={height ? height : "4rem"} viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M33 0C51.2254 0 66 14.7746 66 33C66 51.2254 51.2254 66 33 66C14.7746 66 0 51.2254 0 33C0 14.7746 14.7746 0 33 0Z" fill="#CEF8E3" />
            <path d="M21 32.2727L29.8235 41L45.1875 26" stroke="#21C273" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    );
}

export default SuccessModalSVG;
