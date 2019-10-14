import React, { Component } from "react";
import { Modal, Text, View, StyleSheet } from "react-native";
import { Card, Button } from "react-native-elements";

export class Team extends Component {
  getTotalPlayers(players){
    let total = 0;
    if(players !== undefined){
        total = players.length;
    }
    return total;
  }  
  render() {
    return (
      <Modal animationType="slide" visible={this.props.visible}>
        <View style={styles.myModal}>
          <Card
            title={this.props.equipo.nombre}
            image={{
              uri: this.props.equipo.logo
            }}
          >
            <Text style={styles.description}>
              Jugadores: {this.getTotalPlayers(this.props.equipo.jugadores)}
            </Text>       
            <Text style={styles.description}>
              Estado: {String(this.props.equipo.estado)}
            </Text>

            <Button
              icon={{ name: "ios-football", type: "ionicon" }}
              backgroundColor="#03A9F4"
              title="Cerrar vista"
              onPress={() => this.props.onToggleTeam()}
            />
          </Card>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  myModal: {
    flex: 1,
    justifyContent: "center"
  },
  description:{
    marginBottom: 10,
    textAlign: "center",
  }
});