import { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';

import baseStyle from '../styles/base.js';

export default class HomeScreen extends Component {
    render() {
        return(
            <View style={baseStyle.view}>
                <Image source={require('../assets/msy-logo.png')} style={styles.mainImage}/>
                <Text style={baseStyle.bigText}>Welcome to My Student Years</Text>
                <Pressable onPress={() => this.props.navigation.navigate("Categories")}>
                    <Text style={baseStyle.button}>
                        Go to Categories
                    </Text>
                </Pressable>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    mainImage: {
        width: 200,
        height:400,
        objectFit: 'contain',
    },
    
    selectButton: {
        backgroundColor: '#05b4ff',
        padding: 15,
        paddingLeft: 25,
        paddingRight: 25,
        borderRadius: 5,
        width: '45%',
    },
});
