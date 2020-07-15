import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';

import moment from 'moment';
import numeral from 'numeral';
import { connect } from 'react-redux';
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi';

class FilmDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            film: undefined,
            isLoading: true
        }
    }

    componentDidMount() {
        const { idFilm } = this.props.navigation.state.params;
        getFilmDetailFromApi(idFilm)
            .then((data) => {
                this.setState({
                    film: data,
                    isLoading: false,
                })
            })
    }

    _toggleFavorite() {
        const action = {
            type: "TOGGLE_FAVORITE",
            value: this.state.film
        }
        this.props.dispatch(action);
    }

    _displayFavoriteImage() {
        var sourceImage = require('../Images/ic_favorite_border.png');
        if (this.props.favoritesFilm.findIndex((item) => item.id === this.state.film.id) !== -1) {
            sourceImage = require('../Images/ic_favorite.png');
        }
        return (
            <Image
                source={sourceImage}
                style={styles.favorite_image}
            />
        )
    }

    _displayFilm() {
        const { film } = this.state;
        if (film !== undefined) {
            const filmDate = moment(film.release_date).format("DD/MM/YYYY");
            const budget = numeral(film.budget).format("0,0[.]00");
            const genres = film.genres.map((elem) => elem.name).join(" / ");
            const companies = film.production_companies.map((elem) => elem.name).join(" / ");
            return (
                <ScrollView style={styles.scrollview_container}>
                    <Image style={styles.bg_image} source={{uri: getImageFromApi(film.backdrop_path)}} />
                    <Text style={styles.title}>{film.title}</Text>
                    <TouchableOpacity style={styles.favorite_container} onPress={() => this._toggleFavorite()}>
                        {this._displayFavoriteImage()}
                    </TouchableOpacity>
                    <Text style={styles.description}> {film.overview} </Text>
                    <Text style={styles.default_text}>Sorti le {filmDate} </Text>
                    <Text style={styles.default_text}>Note : {film.vote_average} / 10 </Text>
                    <Text style={styles.default_text}>Nombre de vote : {film.vote_count} </Text>
                    <Text style={styles.default_text}>Budget : {budget} $</Text>
                    <Text style={styles.default_text}>Genre(s) : {genres}</Text>
                    <Text style={styles.default_text}>Companie(s) : {companies}</Text>
                </ScrollView>
            )
        }
    }

    _displayLoading() {
        const { isLoading } = this.state;
        if (isLoading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
    }

    render() {
        const { idFilm } = this.props.navigation.state.params;
        return (
            <View style={styles.main_container}>
                {this._displayFilm()}
                {this._displayLoading()}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container: {
        flex: 1
    },
    bg_image: {
        height: 169,
        margin: 5
    },
    title: {
        fontWeight: 'bold',
        fontSize: 35,
        flex: 1,
        flexWrap: 'wrap',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
        color: '#000',
        textAlign: 'center',
    },
    description: {
        fontStyle: 'italic',
        color: '#666',
        margin: 5,
        marginBottom: 20,
    },
    default_text: {
        marginBottom: 5,
        marginRight: 5,
        marginLeft: 5,
    },
    favorite_container: {
        alignItems: 'center'
    },
    favorite_image: {
        width: 40,
        height: 40
    }
});

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}
export default connect(mapStateToProps)(FilmDetail);