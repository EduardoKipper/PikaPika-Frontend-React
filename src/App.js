import React, { Component } from 'react';
import './App.css';
import Pokemon from './Pokemon';
import api from './Api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
    };

    this.pokemon = React.createRef();
  }

  getTeam = async (event) => {
    try {
      event.preventDefault();

      const query = document.getElementById('user').value;

      const response = await api.get(`/user/${query}}`, {});

      const teamData = response.data;
      let newTeam = this.pokemon.current.state.team.slice();

      teamData.forEach((pokemon, index) => {
        if (index < 6) {
          newTeam[index] = {
            id: index,
            nome: pokemon.nome,
            img: pokemon.img
          };
        }
      });

      this.pokemon.current.setState({
        userName: query,
        team: newTeam
      });

      console.log(response);

    } catch (error) {
      console.error("Error:", error);
    }
  }

  render() {
    return (
      <div>
        <div className="container py-3 my-2">
          <div className='row '>
            <div className='col-2'>
              <h1>Pika Pika</h1>
            </div>
            <form className='d-flex col align-items-center' onSubmit={this.getTeam}>
              <div className='row'>
                <div className='col'>
                  <input
                    type="text"
                    id="user"
                    className="form-control"
                    placeholder="Digite o seu usuário:"
                  />
                </div>
                <button className="col-3 btn btn-primary" type='submit'>
                  Buscar
                </button>
              </div>

            </form>
          </div>
        </div>
        <Pokemon ref={this.pokemon} />
      </div >
    );
  }

}



export default App;
