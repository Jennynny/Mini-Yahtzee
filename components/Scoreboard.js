import { useState, useEffect } from "react";
import { Text, View, Pressable,TouchableOpacity, ScrollView } from "react-native";
import { DataTable } from "react-native-paper";
import Header from "./Header";
import Footer from "./Footer";
import styles from '../style/Style';
import { NBR_OF_SCOREBOARD_ROWS, SCOREBOARD_KEY } from "../constants/Game";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import { Container, Row, Col } from "react-native-flex-grid";

export default Scoreboard = ({ navigation }) => {

    useEffect(() => {
        const unsubcribe = navigation.addListener('focus', () => {
            getScoreboardData();
        });
        return unsubcribe;
    }, [navigation]);

    const [scores, setScores] = useState ([]);

    const getScoreboardData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
            if (jsonValue !== null) {
                let tmpScores = JSON.parse(jsonValue);
                tmpScores.sort((a,b) => b.points - a.points);
                setScores (tmpScores);
            }
        } 
        catch(e) {
            console.log('Read error: ' + e);
            }
    }

    const clearScoreboard = async() => {
        try {
            await AsyncStorage.clear();
            setScores([]);
        }
        catch(e) {
            console.log ('Clear error: '+ e);
        }
    }

    const restartGame = () => {
        navigation.reset({
            index: 1,
            routes: [{name: 'Gameboard'}]
        })
    }

    return(
        <>
        <ScrollView>
        <Header />
        <View style ={styles.container}>
            <Text style = {styles.scoreText}>Scoreboard </Text>
           { scores.length === 0 ?
            <Text style = {styles.scoreText}>Scoreboar is empty</Text>
            :
            scores.map((player, index) => (
                index < NBR_OF_SCOREBOARD_ROWS &&
                <DataTable.Row key={player.key}>
                    <DataTable.Cell><Text>{index + 1}</Text></DataTable.Cell>
                    <DataTable.Cell><Text>{player.name}</Text></DataTable.Cell>
                    <DataTable.Cell><Text>{player.date}</Text></DataTable.Cell>
                    <DataTable.Cell><Text>{player.time}</Text></DataTable.Cell>
                    <DataTable.Cell><Text>{player.points}</Text></DataTable.Cell>
                </DataTable.Row>
            ))
        }
        </View>
        <View style ={styles.container}>
            
            <TouchableOpacity
                onPress={() => clearScoreboard()}>
                <Text style = {styles.clearB}>CLEAR SCOREBOARD</Text>
            </TouchableOpacity>
            <TouchableOpacity
                 onPress={() => restartGame()} // reset button
                ><Text style= {styles.restartB}>RESTART GAME</Text></TouchableOpacity>
                
        </View>
        <Footer />
        </ScrollView>
        </>
    )
}