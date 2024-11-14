import React, { Component } from 'react';
import api from './Api';


class Pokemon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            id: '',
            image: '',
            cardImage: '',
            types: [],
        };
    }

    searchSubmitHandler = async (event) => {
        try {

            event.preventDefault();

            const query = document.getElementById('query').value;

            const response = await api.get(`/api/${query}`, {});

            // Atualizamos a lista de filmes
            this.setState({
                name: '',
                id: '',
                image: '',
                cardImage: '',
                types: '',
            });
            this.setState({
                name: response.data.pokemonNome,
                id: response.data.pokemonPokedex,
                image: response.data.pokemonImg,
                cardImage: response.data.cardImg,
                types: response.data.pokemonTipo,
            });
        } catch (error) {
            console.error("Execution error :", error);
        }
    }

    postSubmitHandler = async (event) => {
        try {

            const pokemon = this.state;

            const response = api.post(`/api/${pokemon.name.toLowerCase()}`, {});

            return response;

        } catch (error) {
            console.error("Execution error :", error);
        }
    }

    render() {
        // Vamos buscar os dados de this.state e jogar para a posição movies
        const pokemon  = this.state;

        return (
            <div class="container py-2">
                <h4 className='mt-2'>Buscar Pokemon:</h4>
                <form className="container row" onSubmit={this.searchSubmitHandler}>
                    <div className="col-10">
                        <input
                            type="text"
                            id="query"
                            className="form-control"
                            placeholder="Digite o Nome do Pokemon ou Número da Pokedex:"
                        />
                    </div>
                    <button className="col btn btn-warning" type='submit'>
                        Buscar
                    </button>
                </form>

                <div id="pokemonSearched" className="container mx-auto pokemonSearched mt-5">
                    <img
                        id="pokemonImage"
                        className="mx-auto"
                        src={pokemon.image}
                        alt={pokemon.name}
                        height="300px"
                    />
                    <img
                        id="cardImage"
                        className="mx-auto"
                        src={pokemon.cardImage}
                        alt={pokemon.name}
                        height="300px"
                    />
                    <form className="pokemonInfo align-self-center mx-auto" onSubmit={this.postSubmitHandler}>
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
        );
    }
}
export default Pokemon;