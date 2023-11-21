import React from 'react'
import "./notfound.css"
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className='container-fluid'>
            <div className='Caja'>
                <span className="loader2 h1"></span>
                <div className='cargador'>
                    <span class="loader"></span>
                </div>
                <div className='Link'>

                    <p className='Link'>toca para ir a pagina principal</p>
                    <Link to="/course">Pagina Principal</Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound;