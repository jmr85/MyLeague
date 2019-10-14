import React, {Component} from 'react';
import { Alert,NetInfo,View } from 'react-native';
import {Button} from 'react-native-elements';
import {Teams} from './components/teams';
import {Team} from './components/team';

const equipos = [
  {
    id: "1",
    nombre: "Equipo 1",
    logo: "https://via.placeholder.com/600x300/77b300/ffffff?text=Logo+equipo",
    estado: true,
    jugadores: [{ nombre: "Hugo" }]
  },
  {
    id: "2",
    nombre: "Equipo 2",
    logo: "https://via.placeholder.com/600x300/2eb8b8/ffffff?text=Logo+equipo",
    estado: false,
    jugadores: [{ nombre: "Paco" }, { nombre: "Luis" }]
  },
  {
    id: "3",
    nombre: "Equipo 3",
    logo: "https://via.placeholder.com/600x300/0040ff/ffffff?text=Logo+equipo",
    estado: true,
    jugadores: [
      { nombre: "Susana" },
      { nombre: "Carolina" },
      { nombre: "Marina" }
    ]
  },
  {
    id: "4",
    nombre: "Equipo 4",
    logo: "https://via.placeholder.com/600x300/ff00bf/ffffff?text=Logo+equipo",
    estado: false,
    jugadores: []
  },
  {
    id: "5",
    nombre: "Equipo 5",
    logo: "https://via.placeholder.com/600x300/D2B48C/ffffff?text=Logo+equipo",
    estado: true,
    jugadores: [{ nombre: "Gabriela" }, { nombre: "Alonso" }]
  }
];

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      teamVisible: false,
      selectedTeam: {},
      offline: true
    };
  }

  componentDidMount(){
    NetInfo.isConnected.addEventListener("connectionChange", isConnected => {
      this.setState({
        offline: !isConnected
      });

      if (isConnected) {
        Alert.alert("Conectado a Internet");
      }else{
        Alert.alert("Dispositivo sin conexión a Internet");
      }
    }); 
      // NetInfo.addEventListener("connectionChange", connectionInfo => {
      //   if(connectionInfo.type == "none" || connectionInfo.type == "unknown"){
      //     Alert.alert("Dispositivo sin conexion a Internet")
      //   }else{
      //     Alert.alert("Conectado a Internet via " + connectionInfo.type)
      //   }
      // });
  }

  displayNetworkInfo(){
    NetInfo.getConnectionInfo().then(connectionInfo =>{
      Alert.alert(
        "Tipo de conexion " + 
        connectionInfo.type + 
        ", EffectiveConnectionType: " +
        connectionInfo.effectiveType
      );
    });
  }
  //connectionInfo.effectiveType Esta propiedad me permite saber si estoy conectado a 2G, 3G, 4G.
  toggleTeam(){
      this.setState({
        teamVisible: !this.state.teamVisible
    });
  }

  displayTeam(equipo){
    this.toggleTeam();
    this.setState({selectedTeam: equipo
    });
  }
  
  saveData() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        Alert.alert("Datos enviados");
      } else {
        Alert.alert("Verifica tu conexión");
      }
    });
  }

  render() {
    return (
      <View style={{marginTop:22}}>   
          <Teams equipos={equipos} 
          onSelectTeam={equipo=> this.displayTeam(equipo)}/>
          <Team
            visible={this.state.teamVisible}
            equipo={this.state.selectedTeam}
            onToggleTeam={() => this.toggleTeam()}
          />
          <Button
            buttonStyle={{ marginTop: 20 }}
            icon={{ name: "ios-wifi", type: "ionicon" }}
            backgroundColor="#4CAF50"
            title="Mostrar información de red"
            onPress={() => this.displayNetworkInfo()}
          />
          <Button
            buttonStyle={{ marginTop: 20 }}
            icon={{ name: "ios-send", type: "ionicon" }}
            backgroundColor="#17A2B8"
            title="Enviar datos"
            onPress={() => this.saveData()}
            disabled={this.state.offline}
          />
       </View>        
    );
  }
}