import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Aviso from '../components/Aviso';
import BotaoAnterior from '../components/BotaoAnterior';
import BotaoProximo from '../components/BotaoProximo';
import TimeInput from '../components/TimeInput';
import NoticacaoHeader from '../components/NotificacaoHeader';
import InputTexto from '../components/InputTexto';
import styles from '../styles/estilos';
import DateInput from '../components/DateInput';

export default class Sala extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descricao: "",
      dataInicial: null,
      dataFinal: null,
      horaInicial: null,
      horaFinal: null,
      titulo: "",
      erroTitulo: "",
      erroDescricao: "",
      erroDataInicial: "",
      erroDataFinal: "",
      erroHoraInicial: "",
      erroHoraFinal: ""
    };
  }
  static navigationOptions = {
    title: 'Criar Sala',
  };

  validate = () => {
    const {
      titulo,
      descricao,
      dataFinal,
      dataInicial,
      horaFinal,
      horaInicial
    } = this.state;

    let error = '';
    console.log("dataI" + dataInicial);
    if(!titulo) 
      error = 'titulo';
    else if(!dataInicial)
      error = 'dataInicial';
    else if(!dataFinal)
      error = 'dataFinal';
    else if(!horaInicial)
      error = 'horaInicial';
    else if(!horaFinal)
      error = 'horaFinal';
    else if(!descricao)
      error = 'descricao';

    switch(error) {
      case 'titulo': 
        return this.setState({erroTitulo: 'Informe um título'})
      case 'descricao': 
        return this.setState({erroDescricao: 'Informe uma descrição de até 100 caracteres'})
      case 'dataInicial':
        return this.setState({erroDataInicial: 'Informe uma data inicial'})
      case 'dataFinal':
        return this.setState({erroDataFinal: 'Informe uma data final'})
      case 'horaInicial': 
        return this.setState({erroHoraInicial: 'Informe uma hora inicial'})
      case 'horaFinal': 
        return this.setState({erroHoraFinal: 'Informe uma hora final'})
      default: return this.props.navigation.navigate('SalaContexto')
    }
  }

  handleTimeChange = (time,id) => {
    this.setState({ erroHoraInicial: "", erroHoraFinal: ""});
    if(id == 'hInicial')
    {
      this.setState({ horaInicial: time, erroHoraInicial: ""});
    }
    else if(id == 'hFinal') {
      this.setState({ horaFinal: time, erroHoraFinal: ""});
    }
  }

  handleTitle = (value) => {
    this.setState({titulo: value, erroTitulo: ""})
  }

  handleDescription = (value) => {
    this.setState({erroDescricao: ""});
    this.setState({descricao: value})
  }

  handleSubmit = () => {
    this.validate();
  }

  handleDate = (value,id) => {
    this.setState({erroDataFinal: "", erroDataInicial: ""});
    if(id=="dataInicial"){
      this.setState({dataInicial: value});
    }
    else if(id=="dataFinal"){
      this.setState({dataFinal: value});
    }
  }

  render() {
    const {
      descricao,
      titulo,
      descricaoLimite,
      erroTitulo,
      erroDescricao,
      erroDataInicial,
      erroDataFinal,
      erroHoraInicial,
      erroHoraFinal
    } = this.state;
    return (
      <View style={styles.container}>
          <View>
          <NoticacaoHeader texto="Passos: 1 de 2" />
          <View style={styles.innerContainer}>
            <InputTexto
              error={!!erroTitulo}
              label="Título"
              onChangeText={value => this.handleTitle(value)}
              value={titulo}
            />
            {!!erroTitulo && <Aviso texto={erroTitulo} />}
            <View style = {styles.PrincipalView}>
              <View style = {styles.PrimeiraView}>
                <DateInput 
                  titulo={"Data Inicial" }
                  onDateChange={value => this.handleDate(value, "dataInicial")}
                />
              
                <DateInput
                  titulo={"Data Final" }
                  onDateChange={value => this.handleDate(value, "dataFinal")}
                />
              </View>

              <View style = {styles.SegundaView}>
                <TimeInput
                  onTimeChange={date => this.handleTimeChange(date, "hInicial")}
                  titulo = "Hora Inicial"
                />
                <TimeInput
                  onTimeChange={date => this.handleTimeChange(date, "hFinal")}
                  titulo = "Hora Final"
                />
              </View>
            </View>
              {!!erroDataInicial && <Aviso texto={erroDataInicial} />}
              {!!erroDataFinal && <Aviso texto={erroDataFinal} />}
              {!!erroHoraInicial && <Aviso texto={erroHoraInicial} />}
              {!!erroHoraFinal && <Aviso texto={erroHoraFinal} />}
            <InputTexto
              error={!!erroDescricao}
              label="Descrição"
              max={100}
              multiline
              onChangeText={value => this.handleDescription(value)}
              value={descricao}
            />
            {descricaoLimite && <Text>Limite de caracteres atingido na descrição!</Text>}
            {!!erroDescricao && <Aviso texto={erroDescricao} />}
          </View>
        </View>
        <View style={styles.flowButtonsContainer}>
          <BotaoAnterior 
            endereco='Inicio' 
            navigation={this.props.navigation} 
          />
          <BotaoProximo 
            endereco='SalaContexto'
            onPress={() => this.handleSubmit()}
          />
        </View>
      </View>
    )
  }
}