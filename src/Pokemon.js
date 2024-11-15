import React, { Component } from 'react';
import api from './Api';
import logo from './assets/logo.png'


class Pokemon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            name: 'Pika Pika',
            id: '0',
            image: logo,
            types: [],
            team: [
                { id: 0, nome: "", img: "" },
                { id: 1, nome: "", img: "" },
                { id: 2, nome: "", img: "" },
                { id: 3, nome: "", img: "" },
                { id: 4, nome: "", img: "" },
                { id: 5, nome: "", img: "" },
            ]
        };
    }

    postPokemon = (event) => {
        event.preventDefault();

        const { team, name, image } = this.state;

        try {
            // Verifica se há um slot vazio
            const emptySlot = team.findIndex(pokemon => pokemon.nome === "");

            if (emptySlot !== -1) {
                let newTeam = team.slice();
                newTeam[emptySlot] = {
                    id: emptySlot,
                    nome: name,
                    img: image
                };

                this.setState({ team: newTeam }, () => { });

                alert("Pokémon adicionado ao time com sucesso");
            } else {
                alert("Excedeu o limite máximo do time");
            }
        } catch (error) {
            alert('Erro ao adicionar Pokémon ao time');
        }
    }

    deletePokemon = (index) => {
        const { team } = this.state;
        if (team[index].nome !== "") {
            if (index !== -1) {
                let newTeam = team.slice();
                newTeam[index] = { id: index, nome: "", img: "" };
                this.setState({ team: newTeam }, () => {
                    console.log(this.state.team);
                });
                alert(`Pokemon removido do time com sucesso`);
            } else {
                alert('Pokémon não encontrado');
            }
        }
    }

    searchSubmitHandler = async (event) => {
        try {
            event.preventDefault();

            const query = document.getElementById('pokemon').value;

            const response = await api.get(`/api/${query}`, {});

            this.setState({
                name: response.data.pokemonNome,
                id: response.data.pokemonPokedex,
                image: response.data.pokemonImg,
                cardImage: response.data.cardImg,
                types: response.data.pokemonTipo,
            });
        } catch (error) {
            alert(error + "- Pokemon não encontrado")
            console.error("Error:", error);
        }
    }

    postTeam = async (userName) => {
        try {
            const { team } = this.state
            const response = await api.post(`/api/${userName}`, {
                team
            });
            alert(response.status + "- Time adicionado com sucesso")
        } catch (error) {
            alert(error + "- Não foi possivel salvar o time")
            console.error("Error:", error);
        }
    }

    deleteTeam = async (userName) => {
        try {
            console.log(userName)
            const response = await api.delete(`/api/${userName}`, {});
            this.setState({
                team: [
                    { id: 0, nome: "", img: "" },
                    { id: 1, nome: "", img: "" },
                    { id: 2, nome: "", img: "" },
                    { id: 3, nome: "", img: "" },
                    { id: 4, nome: "", img: "" },
                    { id: 5, nome: "", img: "" },
                ]
            })
            alert(response + "- Time excluído com sucesso")

        } catch (error) {
            alert(error + "- Não foi possivel excluir o time")
            console.error("Error:", error);
        }
    }

    render() {
        const pokemon = this.state;

        return (
            <div>
                <div className="container py-2" id="fundo">
                    <div className="container py-2 mb-2">
                        <h4>Time Pokemon: {pokemon.userName}</h4>

                        <div className="row">
                            <ul id="pokeTeam" className="pokeTeam col">
                                {this.state.team.map((poke, index) => (
                                    <li onClick={() => this.deletePokemon(index)} key={index} className="button">
                                        <img
                                            src={poke.img}
                                            alt={poke.nome}
                                            id={index}
                                            title={`${(index + 1)} - ${poke.nome}`}
                                            height="60"
                                        />
                                    </li>)
                                )}
                            </ul>
                            <button className="btn btn-danger col-1" onClick={() => this.deleteTeam(pokemon.userName)}>
                                X
                            </button>
                            <button className="btn btn-primary col-1" onClick={() => this.postTeam(pokemon.userName)}>
                                +
                            </button>
                        </div>
                    </div>
                    <h4 className='mt-2'>Buscar Pokemon:</h4>
                    <form className="container row" onSubmit={this.searchSubmitHandler}>
                        <div className="col-10">
                            <input
                                type="text"
                                id="pokemon"
                                className="form-control"
                                placeholder="Digite o Nome do Pokemon ou Número da Pokedex:"
                            />
                        </div>
                        <button className="col btn btn-warning" type='submit'>
                            Buscar
                        </button>
                    </form>

                    <div id="pokemonSearched" className="container mx-auto pokemonSearched mt-5">
                        {pokemon.image && (
                            <>
                                <img
                                    id="pokemonImage"
                                    className="mx-auto"
                                    src={pokemon.image}
                                    alt={pokemon.name}
                                    height="300px"
                                />
                            </>
                        )}
                        <form className="pokemonInfo align-self-center mx-auto" onSubmit={this.postPokemon}>
                            <h3>Dados Pokemon</h3>
                            <p>
                                <strong>Número da Pokedex: </strong>
                                <span id="pokedexNumber">{pokemon.id}</span>
                            </p>
                            <p>
                                <strong>Nome do Pokemon: </strong>
                                <span id="pokemonName">{pokemon.name}</span>
                            </p>
                            <div className="d-flex">
                                <strong>Tipagens: </strong>
                                <div id="pokemonTypes" className="types d-flex justify-content-between">
                                    {pokemon.types.map((type, index) => (
                                        <div key={index} className={`ms-1 ${type}`}>
                                            {type}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button className="btn btn-primary" type="submit">
                                Adicionar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Pokemon;
