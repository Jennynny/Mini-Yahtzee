import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    
    flex: 1,
    backgroundColor: '#451952'
  },
  header: {
    marginTop: 5,
    //marginBottom: 15,
    backgroundColor: '#1D1A39',
    flexDirection: 'row',
  },
  footer: {
    //marginTop: 20,
    backgroundColor: '#1D1A39',
    flexDirection: 'row'
  },
  title: {
    color: '#E5D9B6',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 33,
    textAlign: 'center',
    margin: 10,
  },
  infoI:{ //infopallero
    margin: 10
  },
  author: {
    color: '#E5D9B6',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#73CED6",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:"#2B2B52",
    fontSize: 20
  },
  homeBg:{
    backgroundColor: '#afb0b0'
  },
  headline1:{ //First type your name:
    fontSize:20,
    fontWeight: 'bold',
    textAlign: 'left', 
    marginBottom: 10,
    marginLeft: 15, 
  },
  inputName:{ //kirjoita nimesi?
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    margin: 10,
    marginTop: 5,
    borderColor: '#000000',
    color:'#000000',
    fontWeight:'bold',
    fontSize: 20
  },
  enterB:{ //ensimmäin näkymä ja nimen alapuolella oleva button
    borderWidth: 2,
    borderRadius: 5,
    color: '#E5D9B6',
    backgroundColor: '#9F014D',
    padding: 15,
    margin: 10,
    marginBottom: 40,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    borderColor:'#000000'
  },
  headline: { //koskettaa ainakin home.js Rules of the game
    fontSize:30,
    fontWeight: 'bold',
    textAlign: 'center', 
    marginBottom: 20,
    //marginTop: 10, 
  },
    playB: { //Ohjeiden jälkein button
    borderWidth: 2,
    borderRadius: 5,
    color: 'white',
    backgroundColor: '#9F014D',
    padding: 15,
    margin: 10,
    marginBottom:20,
    //marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    borderColor:'#000000'
  },
  infoText: { //Rules of the game, Home.js
    marginLeft: 15,
    marginRight: 15,
    fontSize: 15,

  },
  infoText2: { //Good luck, Home.js
    fontSize: 25,
    //marginLeft:20, //miten saa keskelle tekstin??
    textAlign:'center',
    margin: 10,
    fontWeight: 'bold',

  },
  headlineInfotext:{ //Rules of the game, Home.js, tekstien otsikot
    fontSize: 20,
    marginLeft:12,
    margin:12,
    
  },
  player:{ //gameboard
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 20,
  },
  totalPoints:{ //gameboard
    fontSize:25,
    textAlign:'center',
    fontWeight: 'bold',
    margin: 20,
  },
  savePointsB:{ //gameboard
    borderWidth: 2,
    borderRadius: 5,
    color: 'white',
    backgroundColor: '#9F014D',
    padding: 15,
    margin: 10,
    marginBottom:20,
    //marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    borderColor:'#000000'

  },
  restartB:{ //gameboard Käynnistä uudelleen!
    borderWidth: 2,
    borderRadius: 4,
    color: 'white',
    backgroundColor: '#a50505',
    padding: 5,
    margin: 10,
    marginBottom:20,
    //marginTop: 20,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    borderColor:'#000000',
    width:130,
    alignSelf: 'center'
     
  },
  throwB:{ //gameboard, Heitä nopat
    borderWidth: 2,
    borderRadius: 5,
    color: 'white',
    backgroundColor: '#9F014D',
    padding: 15,
    margin: 10,
    marginBottom:20,
    //marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    borderColor:'#000000'
  },
});