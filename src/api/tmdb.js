import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZGUxZjgwNWE4YTY1MTIzOGVkNDMyMGJkMGFhZTc4YiIsInN1YiI6IjVlNjY3MmYyNTVjOTI2MDAxMzYyZjk3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s6AeXnH_uihCiCC9j19Dvxp5ifZpoqo8lJ5bwbyxJ3s',
    'Content-Type': 'application/json;charset=utf-8'
  }
});