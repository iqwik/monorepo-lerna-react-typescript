import '@core/polyfills'

import React from 'react'
import ReactDOM from 'react-dom'

import logoSvg from '@core/assets/img/logo.svg'

import '@core/styles/theme.scss'

ReactDOM.render(
    <React.StrictMode>
        <>
            <h1>WORK!!!</h1>
            <img src={logoSvg} width="100" height="100" alt="logo" />
        </>
    </React.StrictMode>,
    document.getElementById('root'),
)
