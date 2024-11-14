import React, { Component } from 'react';
import api from './Api';

class Team extends Component {
    constructor(props) {
        super(props);
        this.state = {
            team: []
        };
    }

    // Chama a função loadHandler quando o componente é montado
    componentDidMount() {
        this.loadHandler();
    }

    loadHandler = async () => {
        try {
            // Remove o evento, pois agora não é necessário
            const response = await api.get('/team');
            this.setState({
                team: response.data
            });
        } catch (error) {
            console.error("Execution error :", error);
        }
    }

    deleteHandler = async (poke) => {
        try {
            const response = await api.delete(`/team/${poke.nome.toLowerCase()}`, {});
            this.loadHandler()

        } catch (error) {
            console.error("Execution error :", error);
        }
    }

    render() {
        const team = this.state.team;
        return (
            <div className="container py-2 mb-2">
                <h4>Seu Time Pokemon:</h4>
                <div class="row">
                    <div id="pokeTeam" className="pokeTeam col">
                        {team.map((poke, index) => (
                            <div onClick={() => { this.deleteHandler(poke) }} key={index} class="button">
                                <img
                                    src={poke.img}
                                    alt={`foto ${poke.nome}`}
                                    id={poke.nome}
                                    title={(index+1) + "-" + poke.nome}
                                    height="60"
                                />
                            </div>
                        ))}
                    </div>
                    <button class="btn btn-primary col-1">
                        +
                    </button>
                </div>
            </div>
        );
    }
}

export default Team;
