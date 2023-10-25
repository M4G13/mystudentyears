import { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';

import baseStyle from '../styles/base.js';

export default class Categories extends Component {
    render() {
        return (
            <View style={baseStyle.view}>
                <Text style={baseStyle.bigText}>Welcome to the Categories page</Text>

                <Pressable onPress={() => this.props.navigation.navigate("Category")}>
                    <Text style={baseStyle.button}>Finance</Text>
                </Pressable>

                <Pressable onPress={() => this.props.navigation.navigate("Categories")}>
                    <Text style={baseStyle.button}>
                        Wellbeing
                    </Text>
                </Pressable>

                <Pressable onPress={() => this.props.navigation.navigate("Categories")}>
                    <Text style={baseStyle.button}>
                        Academic Support
                    </Text>
                </Pressable>

                <Pressable onPress={() => this.props.navigation.navigate("Categories")}>
                    <Text style={baseStyle.button}>
                        4th category(?)
                    </Text>
                </Pressable>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    categoriesText: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 20,
        textAlign: 'center',
    },

    categoryButton: {
        backgroundColor: '#05b4ff',
        padding: 15,
        paddingLeft: 25,
        paddingRight: 25,
        borderRadius: 5,
        width: '45%',
    },
});
