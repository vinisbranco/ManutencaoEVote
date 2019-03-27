import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Button, View, Text, Alert } from 'react-native';
import SalaModel from '../Models/Sala.model';

import { db } from '../config';
import * as Actions from '../actions/';

let submeterQuestoes = questoes => {
  db.ref('/questoes').push(questoes)
}

class Sala extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }
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
    return (
      <View>
        <Text>Criando Sala</Text>

        <Button
          title="Voltar tela de Inicio"
          color="blue"
          onPress={() => this.props.navigation.navigate('Inicio')}
        />
        <Button
          title="Criar questões"
          color="green"
          onPress={() => this.props.navigation.navigate('Questao')}
        />
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

        {this.printQuestoes()}

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
export default connect(mapStateToProps, mapDispatchToProps)(Sala);