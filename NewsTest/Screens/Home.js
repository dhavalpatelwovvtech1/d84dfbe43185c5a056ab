import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            page: 0,
            loading: true
        }
    }

    componentDidMount() {

        this.getNews();
        setInterval(() => {
            this.getNews()

        }, 10000)
    }

    renderPage() {
        const { page } = this.state
        this.setState({
            page: this.state.page + 1
        })
        console.log("Page increments", this.state.page)

        return fetch("https://hn.algolia.com/api/v1/search_by_date?tags=story&page=" + page)
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    data : [...this.state.data , ...responseJson.hits]
                })

            })
            .catch((error) => {
                console.log(error)
            })

    }



   async getNews() {

        return fetch("https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0")
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    data: responseJson.hits,
                    loading: false

                })

            })
            .catch((error) => {
                console.log(error)
            })
    }


    renderData(data) {
        return (
            <TouchableOpacity style={styles.touchable}
                onPress={() => this.props.navigation.navigate("Details", {
                    data: data
                })}
            >
                <Text style={styles.text}><Text style={styles.boldtext}>Title :</Text>{"  "}{data.item.title}</Text>
                <Text style={styles.text}><Text style={styles.boldtext}>URL :</Text>{"  "}{data.item.url}</Text>
                <Text style={styles.text}><Text style={styles.boldtext}>Created_at :</Text>{"  "}{data.item.created_at}</Text>
                <Text style={styles.text}><Text style={styles.boldtext}>Author :</Text>{"  "}{data.item.author}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.content}>
                {
                    this.state.loading &&
                    <View style={styles.loader}>
                        <ActivityIndicator
                            size="large" color="black"
                        /></View>
                }
                <FlatList
                    data={this.state.data}
                    renderItem={(item) => this.renderData(item)}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={() => this.renderPage()}
                    onEndReachedThreshold={0.4}
                />

            </View>
        )
    }
}


const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        margin: 5
    },

    boldtext: {
        fontWeight: 'bold'
    },
    touchable: {
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        elevation: 2

    },
    content: {
        position: 'relative',
        height: '100%',
        paddingVertical: 10,
        backgroundColor: 'white'

    },
    loader: {
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0
    }
})