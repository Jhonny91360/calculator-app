import {useRef, useState} from 'react';

enum Operator {
  add,
  subtract,
  multiply,
  divide,
}
export const useCalculator = () => {
  const [number, setNumber] = useState('0');
  const [prevNumber, setPrevNumber] = useState('');

  const currentOperation = useRef<Operator>();

  const buildNumber = (numberString: string) => {
    //Solo se admite un punto decimal
    if (number.includes('.') && numberString === '.') {
      return;
    }
    //Estado inicial
    if (number.startsWith('0') || number.startsWith('-0')) {
      //Punto decimal
      if (numberString === '.') {
        return setNumber(number + numberString);
      }
      //Evaluar si es otro cero y no hay punto
      if (numberString === '0' && !number.includes('.')) {
        return;
      }
      //Evaluar si es diferente de cero, no hay punto y es el primer numero
      if (numberString !== '0' && !number.includes('.') && number === '0') {
        return setNumber(numberString);
      }
      if (numberString !== '0' && !number.includes('.') && number === '-0') {
        return setNumber('-' + numberString);
      }
    }

    setNumber(number + numberString);
  };

  //Resetear valor
  const clean = () => {
    setNumber('0');
    setPrevNumber('0');
  };

  //Borrar último número ingresado
  const deleteOperation = () => {
    let newValue = number.split('');
    newValue.pop();
    if (newValue.length === 1 && newValue.includes('-')) {
      setNumber('0');
    } else if (!newValue.length) {
      setNumber('0');
    } else {
      setNumber(newValue.join(''));
    }
  };

  //Alternar signo
  const toggleSign = () => {
    if (number.includes('-')) {
      setNumber(number.replace('-', ''));
    } else {
      setNumber('-' + number);
    }
  };

  //guardar numero ingresado despues de pulsar un operador
  const savePreviusNumber = () => {
    if (number.endsWith('.')) {
      setPrevNumber(number.slice(0, -1));
    } else {
      setPrevNumber(number);
    }
    setNumber('0');
  };
  //Operations
  const addOperation = () => {
    savePreviusNumber();
    currentOperation.current = Operator.add;
  };
  const subtractOperation = () => {
    savePreviusNumber();
    currentOperation.current = Operator.subtract;
  };
  const multiplyOperation = () => {
    savePreviusNumber();
    currentOperation.current = Operator.multiply;
  };
  const divideOperation = () => {
    savePreviusNumber();
    currentOperation.current = Operator.divide;
  };

  const calculateResult = () => {
    const firstNumber = Number(prevNumber);
    const secondNumber = Number(number);

    switch (currentOperation.current) {
      case Operator.add:
        setNumber(`${firstNumber + secondNumber} `);
        break;
      case Operator.subtract:
        setNumber(`${firstNumber - secondNumber} `);
        break;
      case Operator.multiply:
        setNumber(`${firstNumber * secondNumber} `);
        break;
      case Operator.divide:
        setNumber(`${firstNumber / secondNumber} `);
        break;

      default:
        throw new Error('Operation missing');
    }
    setPrevNumber('');
  };
  return {
    //Properties
    number,
    prevNumber,
    //Methods
    buildNumber,
    clean,
    deleteOperation,
    toggleSign,
    addOperation,
    subtractOperation,
    multiplyOperation,
    divideOperation,
    calculateResult,
  };
};
