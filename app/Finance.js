import { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';

export default class Finance extends Component {
    render() {
        return(
            <View style={styles.financeView}>
                <Text style={styles.bigText}>This is the finance section</Text>
                <Text style={styles.smallText}>
                    There will be a bunch of resources here.
                </Text>
                <Pressable onPress={() => this.props.navigation.navigate("Finance Quiz")}>
                    <Text style={styles.quizButton}>
                        Go to the quiz for this section
                    </Text>
                </Pressable>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    financeView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "#272522",
    },
    
    bigText: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 20,
        textAlign: 'center',
    },

    smallText: {
        textAlign: 'center',
        width: '100%',
        fontSize: 30,
        color: '#ffffff',
    },

    quizButton: {
        backgroundColor: '#05b4ff',
        padding: 15,
        paddingLeft: 25,
        paddingRight: 25,
        borderRadius: 5,
        width: '45%',
    },
});
