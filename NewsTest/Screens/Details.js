import React, { Component } from 'react'
import {Text,View} from 'react-native'

export default class Details extends Component{
    render(){
        const data=this.props.route.params.data
        console.log("New data",data)
        return(
            <View style={{margin:15,padding:15,borderWidth:1,borderColor:'#ccc'}}>

        <Text>{JSON.stringify(data)}</Text>
            </View>
        )
    }
}