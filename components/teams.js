import React, {Component} from 'react';
import {Text} from 'react-native';
import {ListItem } from 'react-native-elements';
export class Teams extends Component{
    render (){
        return (
            this.props.equipos.map(equipo => 
                (
                  <ListItem                  
                    leftAvatar={{ source:{ uri: equipo.logo}}}
                    key={equipo.id}
                    title={equipo.nombre}  
                    subtitle={String(equipo.estado)}
                    
                  />
                )
              )
        );
    }
}