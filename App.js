import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Alert, TouchableOpacity, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Picker } from '@react-native-picker/picker';
import { FontAwesome6 } from '@expo/vector-icons';

function Question({ imageSource, selectedValue, onValueChange }) {
    return (
        <View style={styles.questionContainer}>
            <Image source={imageSource} style={styles.image} />
            <Picker
                selectedValue={selectedValue}
                onValueChange={onValueChange}
                style={styles.picker}
            >
                <Picker.Item label="Select an answer..." value="" />
                <Picker.Item label="Real" value="Real" />
                <Picker.Item label="Cake" value="Cake" />
            </Picker>
        </View>
    );
}

export default function App() {
    const [answers, setAnswers] = useState(["", "", "", "", ""]);

    const correctAnswers = ["Cake", "Real", "Cake", "Real", "Cake"];

    const handleAnswerChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {
        let score = 0;
        answers.forEach((ans, index) => {
            if (ans === correctAnswers[index]) score++;
        });

        if (score >= 4) {
            Alert.alert("Cake Master!", `You got ${score}/5 correct!`);
        } else {
            Alert.alert("You got fooled sucker!", `You only got ${score}/5 correct.`);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>
                <FontAwesome6 name="cake-candles" size={28} />  Real or Cake Quiz
            </Text>

            <Question imageSource={require("./img/bagcake.jpg")} selectedValue={answers[0]} onValueChange={(value) => handleAnswerChange(0, value)} />
            <Question imageSource={require("./img/burger.jpg")} selectedValue={answers[1]} onValueChange={(value) => handleAnswerChange(1, value)} />
            <Question imageSource={require("./img/eggcake.jpg")} selectedValue={answers[2]} onValueChange={(value) => handleAnswerChange(2, value)} />
            <Question imageSource={require("./img/mango.jpg")} selectedValue={answers[3]} onValueChange={(value) => handleAnswerChange(3, value)} />
            <Question imageSource={require("./img/lemoncake.jpg")} selectedValue={answers[4]} onValueChange={(value) => handleAnswerChange(4, value)} />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>
                    <FontAwesome6 name="check-circle" size={18} />  Submit Answers
                </Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffc5d3",
        padding: 50,
        alignItems: "center"
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    questionContainer: {
        marginBottom: 25,
        alignItems: "center",
    },
    image: {
        width: 350,
        height: 200,
        borderRadius: 20,
        marginBottom: 10,
    },
    picker: {
        width: 250,
        backgroundColor: "#fde2e7",
        borderRadius: 20,
    },
    button: {
        backgroundColor: "#d75b8c",
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 30,
        marginBottom: 50,
        width: 200,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});
