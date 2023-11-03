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


let board = [];

export default Gameboard = ({navigation, route}) => {

    const[playerName, setPlayerName] = useState('');
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

    // const pointsRow = [];
    // for (let spot = 0; spot < MAX_SPOT; spot++){
    //     pointsRow.push(
    //         <Col key={"pointsRow" + spot}>
    //             <Pressable
    //             key={"pointsRow" + spot}
    //             onPress={()=> selectDice(dice)}>
    //             </Pressable>
    //         </Col>
    //     );
    // }
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
    }   //tähän asti pakitusta

        //lasketaan kokonaispisteet gamebordiin (pitäs toimia)
        const [playerTotalPoints, setPlayerTotalPoints] = useState(0); 

        //värkkää tänne se miten estää ylimääräisten 
        const selectDicePoints = (i) => {
        if(nbrOfThrowsLeft === 0){
        let selectedPoints = [...selectedDicePoints];
        let points = [...dicePointsTotal];

        if (!selectedPoints[i]){
        selectedPoints[i] = true;
        let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0);
        points[i] = nbrOfDices * (i+1);
        } else {
            setStatus('You already selected points for ' + (i+1));
            return points[i];
        }
        setDicePointsTotal(points);
        setSelectedDicePoints(selectedPoints);

            //lasketaan kokonaispisteet gameboardiin (pitäs toimia)
            //const totalPoints = points.reduce((total, x) => total + x, 0);
            const totalPoints = points.reduce((acc, current) => acc + current, 0);
            setPlayerTotalPoints(totalPoints);
           

            return points[i];
        }
        else{
           setStatus('Throw ' + NBR_OF_THROWS + 'times before setting points'); 
        }
    }

            //kokeilu pisteiden laskulle, niin että ne siirtyvät scoreboardiin
            const calculatedTotalPoints = () => {
            const totalPoints = dicePointsTotal.reduce((acc, points) => acc + points, 0);
    
            const upperSectionTotal = dicePointsTotal.slice(0,6).reduce((acc, points) => acc + points, 0);
            const bonusPoints = upperSectionTotal >= BONUS_POINTS_LIMIT ? BONUS_POINTS : 0;

           // Add the bonus points to the total points
                return totalPoints + bonusPoints;
            };

    const savePlayerPoints = async() => {
        const newKey = scores.length + 1;
        const formattedDate = new Date().toLocaleDateString('fi-FI'); //pvm
        const formattedTime = new Date().toLocaleTimeString('fi-FI',{hour:'2-digit',minute:'2-digit'}); //klo
            const totalPoints = calculatedTotalPoints(); // Calculate total points with bonus

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

    const throwDices = () =>{
        if(nbrOfThrowsLeft === 0 && !gameEndStatus){
            setStatus('Select your points before the next throw');
            return 1;
        }else if (nbrOfThrowsLeft ===0 && gameEndStatus) {
            setGameEndStatus(false);
            diceSpots.fill(0);
            dicePointsTotal.fill(0);
        }
        let spots = [...diceSpots];
        for ( let i = 0; i < NBR_OF_DICES; i++) {
            if (!selectedDices[i]) {
                let randomNumber = Math.floor(Math.random() * 6 + 1);
                board[i] = 'dice-' + randomNumber;
                spots[i] = randomNumber;
            }
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
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

    function getDiceColor(i) {
        return selectedDices[i] ? "black" : "steelblue" ;
        }

    function getDicePointsColor(i) {
        return (selectedDicePoints[i] && !gameEndStatus) ? "black" : "steelblue" ;
        }


        //   const resetGame = () => {
        //        //setPlayerName(''); // Reset player name
        //        setNbrOfThrowsLeft(NBR_OF_THROWS); // Reset number of throws left
        //        setStatus('Throw dices'); // Reset status message
        //        setGameEndStatus(false); // Reset game end status
        //        setSelectedDices(new Array(NBR_OF_DICES).fill(false)); // Reset selected dices
        //        setDiceSpots(new Array(NBR_OF_DICES).fill(0)); // Reset dice spots
        //        setSelectedDicePoints(new Array(MAX_SPOT).fill(false)); // Reset selected dice points
        //        setDicePointsTotal(new Array(MAX_SPOT).fill(0)); // Reset dice points total
        //        setScores([]); // Reset scores
        //    }

        //aloittaa pelin kokonaan alusta!
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
            <Text style={styles.player}>Player: {playerName}</Text>
           <Container fluid>
            <Row>{dicesRow}</Row>
           </Container>
           <Text>Throws left:{nbrOfThrowsLeft}</Text>
           <Text>{status}</Text>
           <TouchableOpacity 
           onPress={()=>throwDices()}
           ><Text style={styles.throwB}>THROW DICES</Text>
           </TouchableOpacity>
           <Container fluid>
            <Row>{pointsRow}</Row>
           </Container>
           <Container fluid>
            <Row>{pointsToSelectRow}</Row>
           </Container>
           
                    {/**<Pressable
                        onPress={() => resetGame()} // Add the reset button>
                        <Text>RESET GAME</Text></Pressable> */}
            
            <Text style={styles.totalPoints}>Total Points: {playerTotalPoints}</Text>

            <TouchableOpacity
            onPress={() => savePlayerPoints()}>
                <Text style = {styles.savePointsB}>SAVE POINTS</Text>
            </TouchableOpacity>
           

            <TouchableOpacity
                 onPress={() => restartGame()} // Add the reset button
                ><Text style= {styles.restartB}>RESTART GAME</Text></TouchableOpacity>
        </View>
        <Footer />
        </ScrollView>
        </>
    )
}