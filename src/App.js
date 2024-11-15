import React, { Component } from 'react';
import './App.css';
import Pokemon from './Pokemon';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
    };
  }

  render() {
    return (
      <div>
        <div className="container py-3 my-2">
          <div className='row '>
            <div className='col-2'>
              <h1>Pika Pika</h1>
            </div>
            <form className='d-flex col align-items-center'>
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
        <Pokemon />
      </div >
    );
  }

}



export default App;
