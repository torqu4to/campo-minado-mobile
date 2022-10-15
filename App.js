import React, {Component} from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import Constants from 'expo-constants';
import params from './params'
import Field from './components/Field'
import {createMinedBoard, cloneBoard, openField, hadExplosion, wonGame, showMines, invertFlag, flagsUsed} from './functions'
import MineField from './components/MineField'

export default class App extends Component{

  constructor(props) {
    super(props)
    this.state = this.createState()
  }

  minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }


  createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return {
      board: createMinedBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false,
      showLevelSelection: false
    }
  }

  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board)
    openField(board, row, column)
    const lost = hadExplosion(board)
    const won = wonGame(board)

    if (lost){
      showMines(board)
      Alert.alert(`Perdeuuuuu playboy`, `Que burrrrro`)
    }

    if (won){
      Alert.alert(`Parabéns`, `Você venceu`)
    }

    this.setState({board, lost, won})
  }

  onSelectField = (row, column) => {
    const board = cloneBoard(this.state.board)
    invertFlag(board, row, column)
    // verifica se ganhou
    const won = wonGame(board)
    if (won) {
      Alert.alert(`Parabens`, `Você ganhou`)
    }

    this.setState({board, won})
  }
  
  onLevelSelected = level => {
    params.difficultLevel = level;
    this.setState(this.createState())
  }

  render() {
    return (
      <View style={styles.container}>        
       <View style={styles.board}>
        <MineField 
          board={this.state.board}
          onOpenField={this.onOpenField}
          onSelectField={this.onSelectField}/>
      </View> 
      </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },

   board: {
    alignItems: 'center',
    backgroundColor: '#AAA'
  }
});