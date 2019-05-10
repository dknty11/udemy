import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-app-88ce4.firebaseio.com/'
});

export default instance;