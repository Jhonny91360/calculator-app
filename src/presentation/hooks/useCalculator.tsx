import {useEffect, useRef, useState} from 'react';

enum Operator {
  add = '+',
  subtract = '-',
  multiply = 'x',
  divide = '÷',
}
export const useCalculator = () => {
  const [formula, setFormula] = useState('');
  const [number, setNumber] = useState('0');
  const [prevNumber, setPrevNumber] = useState('');

  const currentOperation = useRef<Operator>();

  console.log({number});
  console.log({prevNumber});
  console.log({currentOperation});

  useEffect(() => {
    if (currentOperation.current) {
      const firstFormulaPart = formula.split(' ').at(0);
      setFormula(`${firstFormulaPart} ${currentOperation.current} ${number}`);
    } else {
      setFormula(number);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number]);

  useEffect(() => {
    if (prevNumber) {
      const result = calculateSubResult();
      setPrevNumber(`${result}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formula]);

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
    setFormula('0');
    currentOperation.current = undefined;
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
    //Si se presiona un operador y ya habia una formula ingresada
    const subResult = calculateSubResult();
    setFormula(`${subResult}`);
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
    const result = calculateSubResult();
    setFormula(`${result}`);
    currentOperation.current = undefined;
    setPrevNumber('');
  };

  const calculateSubResult = (): number => {
    const [firstPart, _, secondPart] = formula.split(' ');
    const firstNumber = Number(firstPart);
    const secondNumber = Number(secondPart);

    if (isNaN(secondNumber) || isNaN(firstNumber)) {
      return firstNumber;
    }

    switch (currentOperation.current) {
      case Operator.add:
        return firstNumber + secondNumber;

      case Operator.subtract:
        return firstNumber - secondNumber;

      case Operator.multiply:
        return firstNumber * secondNumber;

      case Operator.divide:
        return firstNumber / secondNumber;

      default:
        throw new Error('Operation missing');
    }
  };

  return {
    //Properties
    number,
    prevNumber,
    formula,
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
