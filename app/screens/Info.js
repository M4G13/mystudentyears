import { Component, useState, useEffect } from 'react';
import { Alert, StyleSheet, View, Text, Pressable, Image } from 'react-native';

export default function Info({navigation}) {

    const question_example = data.data[0].attributes.category[0].quiz.data.attributes.questions[0].question;
    const answers = []
    answers.push(data.data[0].attributes.category[0].quiz.data.attributes.questions[0].option1.text)
    answers.push(data.data[0].attributes.category[0].quiz.data.attributes.questions[0].option2.text)
    answers.push(data.data[0].attributes.category[0].quiz.data.attributes.questions[0].option3.text)
    answers.push(data.data[0].attributes.category[0].quiz.data.attributes.questions[0].option4.text)

    return(


        <View style={baseStyle.view}>

        <Text style={baseStyle.bigText}>Welcome to My Student Years</Text>

        <Text style={baseStyle.bigText}>{question_example}</Text>
        <Text style={baseStyle.smallText}>{answers[0]}</Text>
        <Text style={baseStyle.smallText}>{answers[1]}</Text>
        <Text style={baseStyle.smallText}>{answers[2]}</Text>
        <Text style={baseStyle.smallText}>{answers[3]}</Text>

        <Pressable onPress={() => navigation.navigate("Home Screen")}>
        <Text style={baseStyle.button}>
        Return to home
        </Text>
        </Pressable>




        </View>
    )


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
