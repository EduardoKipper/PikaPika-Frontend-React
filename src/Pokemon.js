import React, { Component } from 'react';
import api from './Api';
import Team from './Team';

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

        // Ref para acessar o componente Team
        this.teamRef = React.createRef();
    }

    // Manipulador da busca
    searchSubmitHandler = async (event) => {
        try {
            event.preventDefault();

            const query = document.getElementById('query').value;

            const response = await api.get(`/api/${query}`, {});

            this.setState({
                name: response.data.pokemonNome,
                id: response.data.pokemonPokedex,
                image: response.data.pokemonImg,
                cardImage: response.data.cardImg,
                types: response.data.pokemonTipo,
            });
        } catch (error) {
            console.error("Execution error:", error);
        }
    }

    // Manipulador do envio do formulário para adicionar o Pokémon
    postSubmitHandler = async (event) => {
        try {
            event.preventDefault();

            const { name } = this.state;

            // Realiza a requisição para adicionar o Pokémon
            const response = await api.post(`/api/${name.toLowerCase()}`, {});

            // Após adicionar, recarrega os dados do time
            this.teamRef.current.loadHandler(); // Chama o método loadHandler do componente Team
        } catch (error) {
            console.error("Execution error:", error);
        }
    }

    render() {
        const pokemon = this.state;

        return (
            <div>
                <div className="container py-3 my-2">
                    <h1>Pika Pika</h1>
                </div>
                <div className="container py-2" id="fundo">
                    <Team ref={this.teamRef} />
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
                        {pokemon.image && (
                            <>
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
                            </>
                        )}
                        <form className="pokemonInfo align-self-center mx-auto" onSubmit={this.postSubmitHandler}>
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
