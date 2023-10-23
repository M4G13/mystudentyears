import { Component, useState, useEffect } from 'react';
import { Alert, StyleSheet, View, Text, Pressable, Image } from 'react-native';

export default class FinanceQuiz extends Component {
    correctAnswer() {
        return(
            Alert.alert("Correct")
        )
    }

    incorrectAnswer() {
        return(
            Alert.alert("Incorrect")
        )
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.questionContainer}>
                    <Image source={require('./assets/mirror.png')} style={{width: 100, height:200, objectFit: 'contain'}}/>
                    <Text style={styles.questionText}>Should you spend your entire student loan payment on alcohol?</Text>
                </View>
                <View style={styles.buttonRow}>
                    <Pressable onPress={this.correctAnswer} style={[styles.answerButton, {backgroundColor: '#dd8844'}]}>
                        <Text style={styles.answerText}>
                            Definitely.
                        </Text>
                    </Pressable>
                    <Pressable onPress={this.incorrectAnswer} style={[styles.answerButton, {backgroundColor: '#44dd88'}]}>
                        <Text style={styles.answerText}>
                            Probably?
                        </Text>
                    </Pressable>
                </View>
                <View style={styles.buttonRow}>
                    <Pressable onPress={this.incorrectAnswer} style={[styles.answerButton, {backgroundColor: '#dd4488'}]}>
                        <Text style={styles.answerText}>
                            Maybe?
                        </Text>
                    </Pressable>
                    <Pressable onPress={this.incorrectAnswer} style={[styles.answerButton, {backgroundColor: '#8844dd'}]}>
                        <Text style={styles.answerText}>
                            No?
                        </Text>
                    </Pressable>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#272522',
    },

    questionContainer: {
        flex: 0,
        width: '100%',
        padding: 30,
        paddingBottom: 50,
        alignItems: 'center',
    },

    questionText: {
        textAlign: 'center',
        width: '100%',
        fontSize: 30,
        color: '#ffffff',
    },

    buttonRow: {
        margin: 30,
        marginTop: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        textTransform: 0,
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
