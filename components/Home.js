import { useState } from "react";
import { TextInput, Text, View,Pressable, Keyboard, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from "./Header";
import Footer from "./Footer";
import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT,BONUS_POINTS_LIMIT, BONUS_POINTS} from '../constants/Game';
import styles from '../style/Style';
import { ScrollView } from "react-native";

export default Home = ({navigation}) => {
    const [playerName, setPlayerName] = useState('');
    const [hasPlayerName, setHasPlayerName] = useState(false);

    const handlePlayerName = (value) => {
        if (value.trim().length > 0 ) {
            setHasPlayerName(true);
            Keyboard.dismiss();
        }
    }

    return (
        <>
        <ScrollView>
        <Header />
        <View style ={styles.container}>
        <MaterialCommunityIcons style={styles.infoI} name="information" size={80} color='#1D1A39' /> 
            {!hasPlayerName ?
            <>
            <Text style={styles.headline1}>First type your name:</Text>
            <TextInput onChangeText={setPlayerName} autoFocus={true} style={styles.inputName}/>
            <TouchableOpacity
                onPress={() => handlePlayerName(playerName)}
                ><Text style={styles.enterB}>OK</Text>
            </TouchableOpacity>
            </>
            :
            <>
            <Text style={styles.headline}>Rules of the Game:</Text>
            <Text style = {styles.headlineInfotext}>THE GAME:</Text>
            <Text style={styles.infoText} multiline ="true">
            Upper section of the classic Yahtzee
            dice game. 
            You have {NBR_OF_DICES} dices and
            for the every dice you have {NBR_OF_THROWS} throws. 
            After each throw you can keep dices in
            order to get same dice spot counts as many as
            possible. 
            In the end of the turn you must select
            your points from {MIN_SPOT} to {MAX_SPOT}.
            Game ends when all points have been selected.
            The order for selecting those is free.
            </Text>
            <Text style = {styles.headlineInfotext}>POINTS:</Text>
            <Text style={styles.infoText} multiline ="true">
            After each turn game calculates the sum
            for the dices you selected. Only the dices having
            the same spot count are calculated. Inside the
            game you can not select same points from
            {MIN_SPOT} to {MAX_SPOT} again.     
            </Text>
            <Text style = {styles.headlineInfotext}>GOAL:</Text>
            <Text style={styles.infoText} multiline ="true">
            To get points as much as possible.
            {BONUS_POINTS_LIMIT} points is the limit of
            getting bonus which gives you {BONUS_POINTS}
            points more.
            </Text>
            <Text></Text>
            <Text style={styles.infoText2}>Good luck, {playerName}</Text>

            <TouchableOpacity
            onPress={() => navigation.navigate('Gameboard', {player:playerName})}>
                <Text style={styles.playB}>PLAY</Text>
            </TouchableOpacity>
            </>
            }
        </View>
        <Footer />
        </ScrollView>
        </>
    )
}