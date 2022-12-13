const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

let moviesArray = [];

const renderMovies = (filter = '') => {
  const moviesList = document.getElementById('movie-list');

  if (moviesArray.length === 0) {
    moviesList.classList.remove('visible');
  } else {
    moviesList.classList.add('visible');
  }
  moviesList.innerHTML = '';

  const filteredMovies = !filter ? moviesArray : moviesArray.filter(movie => movie.info.title.includes(filter));

  filteredMovies.forEach((movie) => {
    const movieEl = document.createElement('li');
    const { info, ...otherProps } = movie;
    const { title } = info;
    let text = `${title} - `;
    for (const key in info) {
      if (key !== 'title' && key !== '_title') {
        text = text + `${key} : ${movie.info[key]}`;
      }
    }

    movieEl.textContent = text;
    moviesList.append(movieEl);
  })
};

const addMovieHandler = () => {
  const title = document.getElementById('title').value;
  const extraName = document.getElementById('extra-name').value;
  const extraValue = document.getElementById('extra-value').value;

  if (
    // title.trim() === '' ||
    extraName.trim() === '' ||
    extraValue.trim() === ''
  ) {
    return;
  }

  const newMovie = {
    info: {
      // title,
      set title(val) {
        if (val.trim() === '') {
          this._title = 'DEFAULT';
        }
        this._title = val;
      },
      get title() {
        return this._title;
      },
      [extraName]: extraValue
    },
    id: Math.random(),
    getFormattedTitle() {
      return this.info.title.toUpperCase();
    }
  };

  newMovie.info.title = title;

  moviesArray.push(newMovie);
  renderMovies();
};

const searchMovieHandler = () => {
  const filterTitle = document.getElementById('filter-title').value;
  renderMovies(filterTitle);
};

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);