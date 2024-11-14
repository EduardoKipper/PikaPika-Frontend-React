import React, { Component } from 'react';
import api from './Api';


class Team extends Component {
    constructor(props) {
        super(props);
        this.state = {
            team: [
                { img: '', nome: '' },
                { img: '', nome: '' },
                { img: '', nome: '' },
                { img: '', nome: '' },
                { img: '', nome: '' },
                { img: '', nome: '' }
            ],
        };
    }
    myChangeHandler = (event) => {
        this.setState({ username: event.target.value });
    }
    render() {
        return <div>
            <h4>Seu Time Pokemon:</h4>
            <div id="pokeTeam" className="pokeTeam">
                <img
                    src={team[0].poke.img}
                    alt={`foto ${poke.nome}`}
                    id={poke.nome}
                    title={poke.nome}
                    height="60"
                />
                <img
                    src={poke.img}
                    alt={`foto ${poke.nome}`}
                    id={poke.nome}
                    title={poke.nome}
                    height="60"
                />
                <img
                    src={poke.img}
                    alt={`foto ${poke.nome}`}
                    id={poke.nome}
                    title={poke.nome}
                    height="60"
                />
                <img
                    src={poke.img}
                    alt={`foto ${poke.nome}`}
                    id={poke.nome}
                    title={poke.nome}
                    height="60"
                />
                <img
                    src={poke.img}
                    alt={`foto ${poke.nome}`}
                    id={poke.nome}
                    title={poke.nome}
                    height="60"
                />
                <img
                    src={poke.img}
                    alt={`foto ${poke.nome}`}
                    id={poke.nome}
                    title={poke.nome}
                    height="60"
                />
            </div>
        </div>
    }
}
export default Team;