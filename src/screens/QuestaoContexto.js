import React, { Component } from 'react';
import { View } from 'react-native';
import BotaoAnterior from '../components/BotaoAnterior';
import BotaoProximo from '../components/BotaoProximo';
import BotaoEnvioArquivo from '../components/BotaoEnvioArquivo';
import styles from '../styles/estilos';

export default class QuestaoContexto extends Component {  

  static navigationOptions = {
    title: 'Contexto da Questão',
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <BotaoEnvioArquivo
            texto="Anexar PDF"
            onPress={() => {
              alert("Hi there!!!");
            }}
          />
        </View>
        
        <View style={styles.flowButtonsContainer}>
          <BotaoAnterior 
            endereco='Questao' 
            navigation={this.props.navigation} 
            style={styles.icon} 
          />
          <BotaoProximo 
            endereco='QuestaoSalva' 
            navigation={this.props.navigation} 
            style={styles.icon} 
          />
        </View>
      </View>
    );
  }
}