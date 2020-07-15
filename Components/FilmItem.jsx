import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import { getImageFromApi } from '../API/TMDBApi';

class FilmItem extends React.Component {

    _displayFavoriteImage() {
        if (this.props.favoritesFilm.findIndex((item) => item.id === this.props.film.id) !== -1) {
            const sourceImage = require('../Images/ic_favorite.png');
            return (
                <Image
                    source={sourceImage}
                    style={styles.favorite_image}
                />
            )
        } else {
            return <></>
        }
    }

    render() {
        const { film, displayDetailForFilm } = this.props;
        return (
            <TouchableOpacity onPress={() => displayDetailForFilm(film.id)} style={styles.container}>
                <View style={styles.filmImage}>
                    <Image style={styles.filmImage__image} source={{uri: getImageFromApi(film.poster_path)}} />
                </View>
                <View style={styles.filmInfo}>
                    <View style={styles.filmInfo__mainContent}>
                        {this._displayFavoriteImage()}
                        <Text style={styles.filmInfo__mainContent__title}>
                            {film.title}
                        </Text>
                        <Text style={styles.filmInfo__mainContent__vote}>
                            {film.vote_average}
                        </Text>
                    </View>
                    <View style={styles.filmInfo__description}>
                        <Text style={styles.filmInfo__description__text} numberOfLines={6} >
                            {film.overview}
                        </Text>
                    </View>
                    <View style={styles.filmInfo__date}>
                        <Text style={styles.filmInfo__date__text}>
                            Sorti le {film.release_date}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        height: 190,
        width: '100%',
        flexDirection: 'row',
    },
    filmImage: {
        backgroundColor: 'green',
        margin: 5,
    },
    filmImage__image: {
        height: 180,
        width: 120,
        backgroundColor: 'grey'
    },
    filmInfo: {
        flex: 1,
        margin: 5
    },
    filmInfo__mainContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 3
    },
    filmInfo__mainContent__title: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5,
    },
    filmInfo__mainContent__vote: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666'
    },
    filmInfo__description: {
        flex: 7
    },
    filmInfo__description__text: {
        fontStyle: 'italic',
        color: '#666'
    },
    filmInfo__date: {
        flex: 1
    },
    filmInfo__date__text: {
        textAlign: 'right',
        fontSize: 14
    },
    favorite_image: {
        width: 25,
        height: 25,
        marginRight: 5
    }
})

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}
export default connect(mapStateToProps)(FilmItem);