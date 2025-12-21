export const userRequests = {
  login: '/auth/login',
  logout: '/users/logout',
  register: '/users/register',
}

export const movieRequests = {
  movies: '/movies',
  movieDetails: (id) => `/movies/${id}`,
  fetchNetflixOriginals: '/fetchNetflixOriginals',
}