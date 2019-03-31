import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/';
import { db } from '../config';

let submeterQuestoes = questoes => {
  db.ref('/questoes').push(questoes)
}

import React, { Component } from 'react';  
import { Button, View, Text, Alert} from 'react-native';
import BotaoNovaSala from '../components/BotaoNovaSala';
import styles from '../styles/estilos';
import SemSalas from '../containers/SemSalas';

class Inicio extends Component {  
  constructor(props) {
    super(props) 
    this.state = {
      salas: {}
    }
  }
  static navigationOptions = {
    title: 'Votações disponíveis',
  };

  counter = 0;

  handleSubmit = () => {
    submeterQuestoes(this.props.sala.questoes);
    Alert.alert('Questoes salvas.');
  };

  addQuestao = () => {
    questao = {
      nome: `questao ${this.counter++}`
    }
    this.props.addQuestao(questao)
  }

  printQuestoes = () => {
    return this.props.sala.questoes.map(q => {
      return (
        <Text key={q.nome}>{q.nome}</Text>
      );
    })
  }

  render() {
    const { salas } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <SemSalas 
            texto="No momento você não possui salas de votação disponíveis!"
          />
{/*--------- estes botãoes não devem estar nessa em build de produção, são só para teste */}
          <Button
            title="Envia questoes"
            color="red"
            onPress={() => this.handleSubmit()}
          />

          <Button
            title="ADD questão"
            color="pink"
            onPress={() => this.addQuestao()}
          />
        </View>

        {this.printQuestoes()}
{/*-------------- --------------------------------------------------------*/}
        <BotaoNovaSala 
          endereco='Sala' 
          navigation={this.props.navigation} 
        />
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    sala: state.salaReducer
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Inicio);