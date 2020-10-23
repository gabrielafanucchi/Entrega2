import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

function Display(props) {
  return (
    <div className="App">
      <p>{props.value}</p>
    </div>
  );
}

function Button(props) {
  return (
    <button className={props.classe} onClick={props.aoClicar}>{props.text}</button>
  );
}

function BotaoClear(props) {
  return (
    <button className={"clear"} onClick={props.aoClicar}>{props.text}</button>
  )
}

function getDisplayNumber(number) {
  const stringNumber = number.toString();
  const integerDigits = parseFloat(stringNumber.split('.')[0]);
  const decimalDigits = stringNumber.split('.')[1];
  let integerDisplay;
  if(isNaN(integerDigits)) {
    integerDisplay = '';
  } else {
    integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
  }
  if(decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`;
  } else {
    return integerDisplay;
  }
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previousOperand: "",
      currentOperand: "",
      operator: "",
      memo1: "",
      memo2: "",
      memo3: "",
      memo4: "",
    };
    this.addNumber = this.addNumber.bind(this);
  }

  limpar() {
    this.setState(
      (state, props) => {
        return {
          currentOperand: ''
        }
      }
    )
  }

  addNumber(number) {
    this.setState(
      (state, props) => {
        if (number === '.') {
          if (state.currentOperand.includes('.')) {
            return {}
          }
          else {
            return {
              currentOperand: state.currentOperand + number
            }
          }
        }
        else {
          return {
            currentOperand: state.currentOperand + number
          }
        }
      }
    )
  }

  addOperation(operador) {
    this.setState(
      (state, props) => {
        if (state.currentOperand !== ''){
          if (state.previousOperand === '') {
            return {
              previousOperand: state.currentOperand + '' + operador,
              currentOperand: ''
            }
          }
        }
      }
    )
  }

  realizarOperacao() {
    this.setState(
      (state, props) => {
        if (state.currentOperand !== '') {
        let operacao = getDisplayNumber(eval(state.previousOperand + state.currentOperand))        
        return {
          currentOperand: operacao,
          previousOperand: ''
        }
      }
   }
 )
}

 /* apagaTudo() {
    this.setState(
      (state, props) => {
        return {
          memo1: '',
          memo2: '',
          memo3: '',
          memo4: ''
        }
      }
    )  
  } 

  recuperaUltimo() {
    this.setState(
      (state, props) => {
        if (memo1 !== '' && memo2 ==='') {
          return {
            currentOperand: memo1
          }
        }
        else if (memo2 !== '' && memo3 ==='') {
          return {
            currentOperand: memo2
          }
        }
        else if (memo3 !== '' && memo4 ==='') {
          return {
            currentOperand: memo3
          }
        }
        else if (memo3 !== '' && memo4!=='') {
          return {
            currentOperand: memo4
          }
        }
        else {
          return {
            currentOperand: ''
          }
        }
      }
    )  
  }  

  salva() {
    this.setState(
      (state, props) => {
        if (memo1 === '') {
          return {
            memo1: currentOperand
          }
        }
        else if (memo1 !== '' && memo2==='') {
          return {
            memo2: currentOperand
          }
        }
        else if (memo2 !== '' && memo3==='') {
          return {
            memo3: currentOperand
          }
        }
        else if (memo3 !== '' && memo4==='') {
          return {
            memo4: currentOperand
          }
        }
        else if (memo3 !== '' && memo4!=='') {
          return {
            currentOperand: memo4
          }
        }
        else {
          return {
            currentOperand: ''
          }
        }
      }
    )  
  }  
*/
  render() {
    return (
      <div className="App">
        <div className="layout">
          <div className="container">
            <div className="row">
              <Display value={this.state.previousOperand} />
            </div>
            <div className="row">
              <Display value={this.state.currentOperand} />
            </div>
            {/* <Display value="2"/> */}
            <div className='row'>
            <Button classe="memoria" text="MC" aoClicar={() => this.apagaTudo()} />
            <Button classe="memoria" text="MR" aoClicar={() => this.recuperaUltimo()} />
            <Button classe="memoria" text="M+" /*aoClicar={() => this.}*/ />
            <Button classe="memoria" text="MS" aoClicar={() => this.salva()} /> 
            </div>
            <div className='row'>
            <Button classe="buttons" text="7" aoClicar={() => this.addNumber("7")} />
            <Button classe="buttons" text="8" aoClicar={() => this.addNumber("8")} />
            <Button classe="buttons" text="9" aoClicar={() => this.addNumber("9")} />
            <Button classe="operador" text="/" aoClicar={() => this.addOperation("/")} /> 
            </div>
            <div className='row'>
            <Button classe="buttons" text="4" aoClicar={() => this.addNumber("4")} />
            <Button classe="buttons" text="5" aoClicar={() => this.addNumber("5")} />
            <Button classe="buttons" text="6" aoClicar={() => this.addNumber("6")} /> 
            <Button classe="operador" text="*" aoClicar={() => this.addOperation("*")} />           
            </div>
            <div className='row'>
            <Button classe="buttons" text="1" aoClicar={() => this.addNumber("1")} />
            <Button classe="buttons" text="2" aoClicar={() => this.addNumber("2")} />
            <Button classe="buttons" text="3" aoClicar={() => this.addNumber("3")} />
            <Button classe="operador" text="+" aoClicar={() => this.addOperation("+")} />  
            </div>
            <div className='row'>
            <Button classe="buttons" text="," aoClicar={() => this.addNumber(".")} />
            <Button classe="buttons" text="0" aoClicar={() => this.addNumber("0")} />
            <Button classe="buttons" text="=" aoClicar={() => this.realizarOperacao()} />
            <Button classe="operador" text="-" aoClicar={() => this.addOperation("-")} />
            </div>
            <div className='row'>
            <Button classe="buttons" text="Clear" aoClicar={() => this.limpar()}/>
            </div>
          </div>
          <div className= "container">
            <h3>Memória</h3>
            <div className="row">
              <Display value={this.state.memo1} />
              <Button classe="memoria" text="MC" /*aoClicar={() => this.}*/ />
              <Button classe="memoria" text="MR" /*aoClicar={() => this.}*/ />
            </div>
            <div className="row">
              <Display value={this.state.memo2} />
              <Button classe="memoria" text="MC" /*aoClicar={() => this.}*/ />
              <Button classe="memoria" text="MR" /*aoClicar={() => this.}*/ />
            </div>
            <div className="row">
              <Display value={this.state.memo3} />
              <Button classe="memoria" text="MC" /*aoClicar={() => this.}*/ />
              <Button classe="memoria" text="MR" /*aoClicar={() => this.}*/ />
            </div>
            <div className="row">
              <Display value={this.state.memo4} />
              <Button classe="memoria" text="MC" /*aoClicar={() => this.}*/ />
              <Button classe="memoria" text="MR" /*aoClicar={() => this.}*/ />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
