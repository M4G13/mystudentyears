import React, {Component} from 'react';
import {Alert, StatusBar, StyleSheet, View, Text, Pressable, Image} from 'react-native';


StatusBar.setBarStyle('light-content');

export default class QuizScreen extends Component {
    _wrongButton() {
        Alert.alert('Wrong ❌');
    }
    _correctButton() {
        Alert.alert('Correct ✅');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.questionContainer}>
                    <Image source={require('./assets/mirror.png')} style={{width: 100, height:200, objectFit: 'contain'}}/>
                    <Text style={styles.questionText}>Mirror, mirror on the wall—who is the fairest of them all?</Text>
                </View>
                <View style={styles.buttonRow}>
                    <Pressable onPress={this._wrongButton} style={[styles.answerButton, {backgroundColor: '#dd8844'}]}>
                        <Text style={styles.answerText}>
                        Snow White
                        </Text>
                    </Pressable>
                    <Pressable onPress={this._wrongButton} style={[styles.answerButton, {backgroundColor: '#44dd88'}]}>
                        <Text style={styles.answerText}>
                        Evil Queen
                        </Text>
                    </Pressable>
                </View>
                <View style={styles.buttonRow}>
                    <Pressable onPress={this._correctButton} style={[styles.answerButton, {backgroundColor: '#dd4488'}]}>
                        <Text style={styles.answerText}>
                        Dopey
                        </Text>
                    </Pressable>
                    <Pressable onPress={this._wrongButton} style={[styles.answerButton, {backgroundColor: '#8844dd'}]}>
                        <Text style={styles.answerText}>
                        Huntsman
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
    }
});
