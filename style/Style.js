import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4c9293'
  },
  header: {
    marginTop: 10,
    //marginBottom: 15,
    backgroundColor: '#37a3a5',
    flexDirection: 'row',
  },
  footer: {
    //marginTop: 20,
    backgroundColor: '#37a3a5',
    flexDirection: 'row'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 33,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',
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
  inputName:{
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
    color: 'white',
    backgroundColor: '#ae057b',
    padding: 15,
    margin: 10,
    //marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    borderColor:'#000000'
  },
  headline: {
    fontSize:25,
    fontWeight: 'bold',
    textAlign: 'center', 
    marginBottom: 20,
    marginTop: 10, 
  },
    playB: { //Ohjeiden jälkein button
    borderWidth: 2,
    borderRadius: 5,
    color: 'white',
    backgroundColor: '#ae057b',
    padding: 15,
    margin: 10,
    marginBottom:20,
    //marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    borderColor:'#000000'
  },
  infoText: {
    marginLeft: 15,
    marginRight: 15,
    fontSize: 15,

  },
  infoText2: {
    fontSize: 20,
    //marginLeft:20, //miten saa keskelle tekstin??
    textAlign:'center',
    margin: 10,

  },
  headlineInfotext:{
    fontSize: 20,
    marginLeft:12
  },
  player:{ //gameboard
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 10,
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
    backgroundColor: '#ae057b',
    padding: 15,
    margin: 10,
    marginBottom:20,
    //marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    borderColor:'#000000'

  },
  restartB:{ //gameboard
    borderWidth: 2,
    borderRadius: 4,
    color: 'white',
    backgroundColor: '#a50505',
    padding: 15,
    margin: 10,
    marginBottom:20,
    //marginTop: 20,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    borderColor:'#000000',
    width:150,
    alignSelf: 'center'
     
  },
});