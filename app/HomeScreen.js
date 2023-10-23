import { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';

export default class HomeScreen extends Component {
    render() {
        return(
            <View style={styles.mainView}>
                <Image source={require('./assets/msy-logo.png')} style={styles.mainImage}/>
                <Text style={styles.answerText}>Welcome to My Student Years</Text>
                <Pressable onPress={() => this.props.navigation.navigate("Categories")}>
                    <Text style={styles.selectButton}>
                        Go to Categories
                    </Text>
                </Pressable>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "#272522",
    },

    mainImage: {
        width: 200,
        height:400,
        objectFit: 'contain',
    },
    
    answerButton: {
        backgroundColor: '#4488dd',
        padding: 15,
        paddingLeft: 25,
        paddingRight: 25,
        borderRadius: 5,
        width: '45%',
    },

    answerText: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 20,
        textAlign: 'center',
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
