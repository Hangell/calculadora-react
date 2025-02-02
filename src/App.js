import Input from './components/Input';
import Button from './components/Button';
import { Container, Content, Row } from './styles';
import { useState } from 'react';

const App = () => {
  const [currentNumber, setCurrentNumber] = useState('');
  const [expression, setExpression] = useState('');
  const [isResult, setIsResult] = useState(false);

  // Adiciona números ao display
  const handleAddNumber = (num) => {
    if (num === '.' && currentNumber.includes('.')) return; // Impede mais de uma vírgula

    if (isResult) {
      setCurrentNumber(num === '.' ? '0.' : num);
      setExpression(num === '.' ? '0.' : num);
      setIsResult(false);
    } else {
      setCurrentNumber(prev => {
        if (prev === '' || prev === '0') {
          return num === '.' ? '0.' : num; // Se for zero e inserir ponto, vira "0."
        }
        return prev + num;
      });
      setExpression(prev => prev + num);
    }
  };

  // Define a operação matemática
  const handleSetOperation = (operator) => {
    if (currentNumber === '') return;
    if (isResult) {
      setExpression(currentNumber + ` ${operator} `);
      setIsResult(false);
    } else {
      setExpression(prev => prev + ` ${operator} `);
    }
    setCurrentNumber('');
  };

  // Calcula o resultado da operação
  const handleCalculate = () => {
    if (currentNumber === '') return;
    try {
      const result = eval(expression); // Avalia a expressão completa
      setExpression(expression + ' = ' + result); // Salva a equação completa
      setCurrentNumber(result.toString()); // Exibe o resultado
      setIsResult(true); // Marca que o último cálculo foi "="
    } catch (error) {
      setCurrentNumber('Erro');
      setExpression('');
    }
  };

  // Apaga um caractere
  const handleDelete = () => {
    setCurrentNumber(prev => prev.slice(0, -1));
    setExpression(prev => prev.slice(0, -1));
  };

  // Limpa tudo
  const handleClear = () => {
    setCurrentNumber('');
    setExpression('');
    setIsResult(false);
  };

  // Alterna entre positivo e negativo corretamente
  const handleToggleSign = () => {
    if (!currentNumber) return; // Se estiver vazio, não faz nada

    let newNumber = parseFloat(currentNumber) * -1; // Inverte o sinal
    setCurrentNumber(newNumber.toString());

    // Atualiza a expressão para refletir a mudança
    setExpression(prev => {
      let parts = prev.trim().split(' ');
      if (parts.length > 0) {
        parts[parts.length - 1] = newNumber.toString();
        return parts.join(' ');
      }
      return newNumber.toString();
    });
  };

  return (
    <Container>
      <Content>
        {/* Campo de exibição da expressão (equação completa) */}
        <Input value={expression} />
        {/* Campo para exibir o número atual ou resultado */}
        <Input value={currentNumber || '0'} />

        <Row>
          <Button label="%" onClick={() => handleSetOperation('%')} />
          <Button label="CE" onClick={handleClear} />
          <Button label="C" onClick={handleClear} />
          <Button label="⌫" onClick={handleDelete} />
        </Row>
        <Row>
          <Button label="¹/x" onClick={() => setCurrentNumber(prev => prev ? (1 / parseFloat(prev)).toString() : '')} />
          <Button label="x²" onClick={() => setCurrentNumber(prev => prev ? (Math.pow(parseFloat(prev), 2)).toString() : '')} />
          <Button label="²√x" onClick={() => setCurrentNumber(prev => prev ? (Math.sqrt(parseFloat(prev))).toString() : '')} />
          <Button label="÷" onClick={() => handleSetOperation('/')} />
        </Row>
        <Row>
          <Button label="7" onClick={() => handleAddNumber('7')} />
          <Button label="8" onClick={() => handleAddNumber('8')} />
          <Button label="9" onClick={() => handleAddNumber('9')} />
          <Button label="X" onClick={() => handleSetOperation('*')} />
        </Row>
        <Row>
          <Button label="4" onClick={() => handleAddNumber('4')} />
          <Button label="5" onClick={() => handleAddNumber('5')} />
          <Button label="6" onClick={() => handleAddNumber('6')} />
          <Button label="-" onClick={() => handleSetOperation('-')} />
        </Row>
        <Row>
          <Button label="1" onClick={() => handleAddNumber('1')} />
          <Button label="2" onClick={() => handleAddNumber('2')} />
          <Button label="3" onClick={() => handleAddNumber('3')} />
          <Button label="+" onClick={() => handleSetOperation('+')} />
        </Row>
        <Row>
          <Button label="+/-" onClick={handleToggleSign} />
          <Button label="0" onClick={() => handleAddNumber('0')} />
          <Button label="." onClick={() => handleAddNumber('.')} />
          <Button label="=" onClick={handleCalculate} />
        </Row>
      </Content>
    </Container>
  );
};

export default App;
