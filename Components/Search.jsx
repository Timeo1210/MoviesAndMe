import React from 'react';
import { 
    StyleSheet, 
    View, 
    Button, 
    TextInput,
    FlatList,
    ActivityIndicator
} from 'react-native';

import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi';
import FilmItem from './FilmItem';

class Search extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            films: [],
            isLoading: false
        }

        this.searchedText = "";
        this.page = 0;
        this.totalPages = 0
    }

    _searchFilms() {
        this.page = 0;
        this.totalPages = 0;
        this.setState({
            films: []
        }, () => {
            this._loadFilms();
        });
    }

    _loadFilms() {
        const { searchedText } = this;
        if (searchedText.length > 0) {
            this.setState({
                isLoading: true
            })
            getFilmsFromApiWithSearchedText(searchedText, this.page+1)
            .then((data) => {
                this.page = data.page;
                this.totalPages = data.total_pages;
                this.setState({
                    films: [...this.state.films, ...data.results],
                    isLoading: false,
                })
            })
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

    _searchTextInputChanged(text) {
        this.searchedText = text;
    }

    _displayDetailForFilm = (idFilm) => {
        this.props.navigation.navigate("FilmDetail", {idFilm})
    }

    render() {
        const { films } = this.state;

        return (
            <View style={styles.main_container}>
                <TextInput onSubmitEditing={() => this._searchFilms()} onChangeText={(text) => this._searchTextInputChanged(text)} style={styles.textInput} placeholder="Titre du film" />
                <Button title="Rechercher" onPress={() => this._searchFilms()} />
                <FlatList 
                    data={films}
                    keyExtractor={(item) => item.id.toString()}
                    onEndReachedThreshold={1}
                    onEndReached={() => {
                        if (this.page < this.totalPages) this._loadFilms()
                    }}
                    renderItem={({item}) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm} />}
                />
                {this._displayLoading()}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    main_container: {
        marginTop: 5,
        flex: 1
    },
    textInput: {
        marginRight: 5,
        marginLeft: 5,
        marginTop: 5,
        height: 50,
        borderColor: '#000',
        borderWidth: 1,
        paddingLeft: 5,
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Search;