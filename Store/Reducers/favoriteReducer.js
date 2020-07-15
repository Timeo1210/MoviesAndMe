const initialState = {
    favoritesFilm: []
}

function toggleFavorite(state = initialState, action) {
    let nextState;

    switch(action.type) {
        case 'TOGGLE_FAVORITE':
            const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item.id === action.value.id);
            if (favoriteFilmIndex !== -1) {
                //supresion
                nextState = {
                    ...state,
                    favoritesFilm: state.favoritesFilm.filter((elem, index) => index !== favoriteFilmIndex)
                }
            } else {
                //ajouter
                nextState = {
                    ...state,
                    favoritesFilm: [...state.favoritesFilm, action.value]
                }
            }
            return nextState || state;
        default:
            return state;
    }
}

export default toggleFavorite;