import { Component, useState, useEffect } from 'react';
import { Alert, StyleSheet, View, Text, Pressable, Image } from 'react-native';

import baseStyle from '../styles/base.js';

export default function Info({navigation}) {

    const question_example = data.data[0].attributes.category[0].quiz.data.attributes.questions[0].question;
    const answers = data.data[0].attributes.category[0].quiz.data.attributes.questions[0].options;

    return(
        <View style={baseStyle.view}>
        <Text style={baseStyle.bigText}>Welcome to My Student Years</Text>

        <Text style={baseStyle.bigText}>{question_example}</Text>
        {answers.map((i) => (<Text key={i.id} style={baseStyle.smallText}>{i.text}</Text>))}

        <Pressable onPress={() => navigation.navigate("Home Screen")}>
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
