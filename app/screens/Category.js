import { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';

import baseStyle from '../styles/base.js';

export default class Finance extends Component {
    render() {
        return(
            <View style={baseStyle.view}>
                <Text style={styles.bigText, {color: "#ffffff"}}>This is the finance section</Text>
                <Text style={styles.smallText, {color: "#ffffff"}}>
                    There will be a bunch of resources here.
                </Text>
                <Pressable onPress={() => this.props.navigation.navigate("Question")}>
                    <Text style={styles.quizButton}>
                        Go to the quiz for this section
                    </Text>
                </Pressable>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    quizButton: {
        backgroundColor: '#05b4ff',
        padding: 15,
        paddingLeft: 25,
        paddingRight: 25,
        borderRadius: 5,
        width: '45%',
    },
});
