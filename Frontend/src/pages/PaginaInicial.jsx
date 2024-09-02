import '../styles/inicial.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import epn from '../assets/epn.jpg'

export const PaginaInicial = () => {
    const [darkMode, setDarkMode] = useState(true);

    return (
        <div className={darkMode ? "dark" : ""}>
            <main className="main">
                <section>
                    <nav>
                        <h1></h1>
                        <ul>
                            <li>
                                <Link to="/ingresar">Ingresar</Link>
                            </li>
                            <li>
                                <Link to="/registrar">Registrarse</Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="text-center">
                        <h2>SISTEMA DE GESTIÓN DE RENDTA DE CARROS.</h2>
                        <h3>Aquí podrás rentar un vehiculo segun tus necesidades en Quito</h3>
                        <p>Encuentra variedad de automóviles y reserva tus tickets.</p>
                    </div>

                    <div className="bg-gradient">
                        <img src={epn} alt="EPN" />
                    </div>
                </section>
                <section>
                    {/* Aquí puedes agregar más secciones con contenido */}
                </section>
            </main>
        </div>
    );
};
