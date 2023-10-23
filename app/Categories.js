import { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';

export default class Categories extends Component {
    render() {
        return (
            <View style={styles.categoriesView}>
                <Text style={styles.categoriesText}>Welcome to the Categories page</Text>

                <Pressable onPress={() => this.props.navigation.navigate("Finance")}>
                    <Text style={styles.categoryButton}>Finance</Text>
                </Pressable>

                <Pressable onPress={() => this.props.navigation.navigate("Categories")}>
                    <Text style={styles.categoryButton}>
                        Wellbeing
                    </Text>
                </Pressable>

                <Pressable onPress={() => this.props.navigation.navigate("Categories")}>
                    <Text style={styles.categoryButton}>
                        Academic Support
                    </Text>
                </Pressable>

                <Pressable onPress={() => this.props.navigation.navigate("Categories")}>
                    <Text style={styles.categoryButton}>
                        4th category(?)
                    </Text>
                </Pressable>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    categoriesView: { 
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: '#272522',
    },
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
