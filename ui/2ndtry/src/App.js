import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Materias from './components/Materias';
import Aulas from './components/Aulas';
import Asignaciones from './components/Asignaciones';
import Consulta from './components/Consulta';

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/materias" component={Materias} />
                    <Route path="/aulas" component={Aulas} />
                    <Route path="/asignaciones" component={Asignaciones} />
                    <Route path="/consulta" component={Consulta} />
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        </Router>
    );
}

const Home = () => (
    <div>
        <h1>Sistema de Asignación de Aulas</h1>
        <nav>
            <ul>
                <li><a href="/materias">Materias</a></li>
                <li><a href="/aulas">Aulas</a></li>
                <li><a href="/asignaciones">Asignaciones</a></li>
                <li><a href="/consulta">Consulta</a></li>
            </ul>
        </nav>
    </div>
);

export default App;