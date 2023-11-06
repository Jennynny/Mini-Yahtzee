import { useEffect, useState } from "react";
import { Text, View, Pressable, TouchableOpacity, ScrollView } from "react-native";
import Header from "./Header";
import Footer from "./Footer";
import styles from '../style/Style';
import { MIN_SPOT, MAX_SPOT, NBR_OF_DICES, NBR_OF_THROWS, BONUS_POINTS_LIMIT, BONUS_POINTS, SCOREBOARD_KEY } from "../constants/Game";
import { Container, Row, Col } from 'react-native-flex-grid';
//import { Pressable } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
//import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";


let board = [];

export default Gameboard = ({navigation, route}) => {

    const [playerName, setPlayerName] = useState('');
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('Throw dices');
    const [gameEndStatus, setGameEndStatus] = useState(false);
    //Ovatko nopat kiinnitetty
    const [selectedDices, setSelectedDices] =
    useState(new Array(NBR_OF_DICES).fill(false));
    //Noppien silmäluvut
    const [diceSpots, setDiceSpots] =
    useState(new Array(NBR_OF_DICES).fill(0));
    //Onko silmäluvulle valittu pisteet? epätosi/tosi
    const [selectedDicePoints, setSelectedDicePoints] =
    useState(new Array(MAX_SPOT).fill(false));
    // Kerätyt pisteet
    const [dicePointsTotal, setDicePointsTotal] =
    useState(new Array(MAX_SPOT).fill(0));

    const [scores, setScores] = useState([]);


    useEffect(()=> {
        if (playerName === '' && route.params?.player) {
            setPlayerName(route.params.player);
        }
    },[]);

    useEffect(() => {
        const unsubcribe = navigation.addListener('focus', () => {
            getScoreboardData();
        });
        return unsubcribe;
    }, [navigation]);


    const dicesRow = [];
    for (let dice = 0; dice < NBR_OF_DICES; dice++) {
        dicesRow.push(
            <Col key={"dice" + dice}>
                <Pressable
                key={"dice" + dice}
                onPress={()=> selectDice(dice)}>
                <MaterialCommunityIcons
                name={board[dice]}
                key={"dice"+dice}
                size={50}
                color={getDiceColor(dice)}>
                </MaterialCommunityIcons>
                </Pressable>
            </Col>
        );
    }

   
    const pointsRow = [];
        for (let spot = 0; spot < MAX_SPOT; spot++){
        pointsRow.push(
        <Col key={"pointsRow" + spot}>
            <Text key={"pointsRow" + spot}>{getSpotTotal(spot)}</Text>
        </Col>
    );
    }

    const pointsToSelectRow = [];
        for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++){
            pointsToSelectRow.push(
            <Col key={"buttonsRow" + diceButton}>
                <Pressable
                key={"buttonsRow" + diceButton}
                onPress={() => selectDicePoints(diceButton)}
                >
                <MaterialCommunityIcons
                name={"numeric-" + (diceButton + 1) + "-circle"}
                key={"buttonsRow" + diceButton}
                size={35}
                color={getDicePointsColor(diceButton)}
                >
                </MaterialCommunityIcons>   
                </Pressable>
            </Col>
        );
    }  

        const[hasSelectedPoints, setHasSelectedPoints] = useState(false);   
   
        const selectDicePoints = (i) => {
            if(nbrOfThrowsLeft === 0){
            if (!hasSelectedPoints) { 
            let selectedPoints = [...selectedDicePoints];
            let points = [...dicePointsTotal];
                if (!selectedPoints[i]){
                    selectedPoints[i] = true;
                    let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0);
                    points[i] = nbrOfDices * (i+1);
                    setHasSelectedPoints(false); 
                    setNbrOfThrowsLeft(NBR_OF_THROWS); 
                    resetDiceSelection();   
            } else {
                setStatus('You already selected points for ' + (i+1));
                return points[i];
            }
                setDicePointsTotal(points);
                setSelectedDicePoints(selectedPoints);
                return points[i]; 

        }
        else{
            setStatus('You can only select one point per turn.')
        }
        }
        else{
           setStatus('Throw ' + NBR_OF_THROWS + 'times before setting points'); 
        }
        }


    // Define a state variable for the total points with bonus
        const [totalPointsWithBonus, setTotalPointsWithBonus] = useState(0);

    // Update the total points with bonus whenever dicePointsTotal changes
        useEffect(() => {
            let totalPoints = dicePointsTotal.reduce((acc, points) => acc + points, 0);
            if (totalPoints >= BONUS_POINTS_LIMIT) {
                totalPoints += BONUS_POINTS;
                //setStatus("You have earned 50 bonus points!");
            }
            setTotalPointsWithBonus(totalPoints);
        }, [dicePointsTotal]);

    
        const savePlayerPoints = async() => {
            const newKey = scores.length + 1;
            const formattedDate = new Date().toLocaleDateString('fi-FI'); //pvm
            const formattedTime = new Date().toLocaleTimeString('fi-FI',{hour:'2-digit',minute:'2-digit'}); //klo
        //    const totalPoints = calculatedTotalPoints(); // Calculate total points with bonus
            let totalPoints = dicePointsTotal.reduce((acc, points) => acc + points, 0); 
            if (totalPoints >= BONUS_POINTS_LIMIT) {        
                totalPoints += BONUS_POINTS;                
           
            }                                               
        const playerPoints = {
            key: newKey,
            name: playerName,
            date: formattedDate, //'pvm',//päivämäärä tänne funktiolla
            time: formattedTime, //'klo', //kellonaika tänne funktiolla
            points: totalPoints // yhteispisteet (mahdollinen bonus mukaan)
        }
        try {
            const newScore = [...scores,playerPoints]; // Add new score to the array
            const jsonValue = JSON.stringify(newScore);
            await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue);
            getScoreboardData();    
        }
        catch (e) {
            console.log (' Save error: ' + e);
        }
    }

        const getScoreboardData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
                if (jsonValue !== null) {
                let tmpScores = JSON.parse(jsonValue);
                setScores (tmpScores);
                }
            } 
            catch(e) {
                console.log('Read error: ' + e);
                }
        }

 
    const throwDices = () => {
        if (nbrOfThrowsLeft === 0) {
            setStatus('No throws left for this round.');
            return;
        }
        if (hasSelectedPoints) {
            setHasSelectedPoints(false);
            setStatus('Select your points before the next throw');
            return 1;
        }
        let spots = [...diceSpots];
        for (let i = 0; i < NBR_OF_DICES; i++) {
            if (!selectedDices[i]) {
                let randomNumber = Math.floor(Math.random() * 6 + 1);
                board[i] = "dice-" + randomNumber;
                spots[i] = randomNumber;
            }
        }
        if (nbrOfThrowsLeft > 0) {
            setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
        }
        setDiceSpots(spots);
        setStatus('Select and throw dices again');
    }


    function getSpotTotal(i){
        return dicePointsTotal[i];
    }
    

    const selectDice = (i) => {
        if(nbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus){
            let dices = [...selectedDices];
            dices[i] = selectedDices[i] ? false : true;
            setSelectedDices(dices);
        }
        else {
            setStatus('You have to throw dices first.');
        }
    }

    //reset
    const resetDiceSelection = () => {
        let resetDice = new Array(NBR_OF_DICES).fill(false);
        setSelectedDices(resetDice);
    }
    

    function getDiceColor(i) {
        return selectedDices[i] ? "black" : "#2DB29B" ;
        }

    function getDicePointsColor(i) {
        return (selectedDicePoints[i] && !gameEndStatus) ? "black" : "#2DB29B" ;
        }


        const resetGame = () => {
            setDiceSpots(new Array(NBR_OF_DICES).fill(1));
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
            selectDicePoints(new Array(NBR_OF_DICES).fill(0));
            setSelectedDicePoints(new Array(NBR_OF_DICES).fill(false));
            setNbrOfThrowsLeft(NBR_OF_THROWS);
            setStatus('');
            setGameEndStatus(false);
           // setPlayerName('');
            setDicePointsTotal(new Array(NBR_OF_DICES).fill(0));
        };

        //restart game!
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
        <View style = {styles.container}>
            <Text style={styles.player}>PLAYER: {playerName}</Text>
           <Container fluid>
            <Row style = {styles.dicesrow}>{dicesRow}</Row>
           </Container>
           <Container fluid>
            <Row>{pointsRow}</Row>
           </Container>
           <Container fluid>
            <Row>{pointsToSelectRow}</Row>
           </Container>
           <View style = {styles.throwTextView}>
           <Text style = {styles.throwText}>Throws left:{nbrOfThrowsLeft}</Text>
           <Text style = {styles.throwText}>{status}</Text>
           </View>
           <TouchableOpacity 
                onPress={()=>throwDices()}>
                <Text style={styles.throwB}>THROW DICES</Text>
           </TouchableOpacity>
           {/* <Pressable
                        onPress={() => resetDiceSelection()}> 
                        <Text>RESET GAME</Text>
                        </Pressable>  */}

             
            {/* <Text style={styles.totalPoints}>Total Points: {playerTotalPoints}</Text> */} 
        
            <Text style={styles.totalPoints}>Total Points: {totalPointsWithBonus}</Text>
            <Text style={styles.bonusPoints}> {totalPointsWithBonus >= BONUS_POINTS_LIMIT ? "You have earned 50 bonus points!":""}</Text>
            

            <TouchableOpacity
                onPress={() => savePlayerPoints()}>
                <Text style = {styles.savePointsB}>SAVE POINTS</Text>
            </TouchableOpacity>
           
            <TouchableOpacity
                        onPress={() => resetGame()}> 
                        <Text style = {styles.resetB}>RESET GAME</Text>
                        </TouchableOpacity> 

            <TouchableOpacity
                 onPress={() => restartGame()}>
                <Text style= {styles.restartB}>RESTART GAME</Text>
            </TouchableOpacity>
        </View>
        <Footer />
        </ScrollView>
        </>
    )
}