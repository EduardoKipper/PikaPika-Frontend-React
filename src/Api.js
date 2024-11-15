// Vamos importar o axios para nosso projeto
import axios from 'axios';

/* Aqui criamos uma constante chamada api, mas o nome pode
ser qualquer outro. Nela, vamos colocar um axios.create,
genérico para a chamada da url. */
const api = axios.create({
    baseURL: 'http://localhost:3300'
});

// Agora exportamos essa nossa api.
export default api;