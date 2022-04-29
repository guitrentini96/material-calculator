import { Button, Grid, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import './App.css';
import GeneralContainer from './components/GeneralContainer';

function App() {
  const [state, setState] = React.useState({
    symbols: [
      '🐱',
      'RESET',
      '+/-',
      7,
      8,
      9,
      'x',
      4,
      5,
      6,
      '-',
      1,
      2,
      3,
      '+',
      '.',
      0,
      '=',
      '/',
    ],
    calculations: ['x', '-', '+', '/'],
    memory: [],
    placeholderMemory: [],
    currentNumber: '',
    placeholderCurrentNumber: '',
    hasDot: false,
    result: '',
    pallete: ['primary', 'secondary', 'success', 'error', 'info', 'warning'],
    catButtonColor: 'error',
  });

  const handleEquals = () => {
    console.log('you just clicked equals');
    let currentMemory = state.memory;
    const lastElement = currentMemory[currentMemory.length - 1];
    // checks if the last character is a calculation, and if so includes the current number
    if (state.calculations.includes(lastElement)) {
      const newMemory = state.memory;
      newMemory.push(state.currentNumber);
      currentMemory = newMemory;
      console.log(`the array of elements to be calculated is:`);
      console.log(currentMemory);
    }
    let result = parseFloat(currentMemory[0]);
    for (let i in currentMemory) {
      if (i % 2 === 0 && i > 0) {
        switch (currentMemory[i - 1]) {
          case '+':
            result = result + parseFloat(currentMemory[i]);
            break;
          case '-':
            result = result - parseFloat(currentMemory[i]);
            break;
          case '/':
            result = result / parseFloat(currentMemory[i]);
            break;
          case 'x':
            result = result * parseFloat(currentMemory[i]);
            break;
          default:
            console.log('Invalid operation detected');
        }
      }
    }

    currentMemory.push('=');

    let memoryToDisplay = currentMemory.join(' ');

    if (memoryToDisplay.length > 25) {
      memoryToDisplay = '...'.concat(
        memoryToDisplay.slice(-25, memoryToDisplay.length)
      );
    }

    let resultString = result.toString();
    let resultToDisplay = resultString;

    if (resultString.includes('.') && resultString.split('.')[1].length > 4) {
      resultToDisplay = result.toFixed(4);
    } else if (resultToDisplay.length > 17) {
      resultToDisplay = '...'.concat(resultToDisplay.slice(-18, -1));
    }

    setState({
      ...state,
      memory: [],
      currentNumber: '',
      placeholderMemory: memoryToDisplay,
      placeholderCurrentNumber: resultToDisplay,
      result: resultString,
      hasDot: false,
    });

    console.log(`result: ${result}`);
  };

  const randomizeCatButtonColor = () => {
    const newIndex = Math.floor(Math.random() * 6);
    setState({
      ...state,
      catButtonColor: state.pallete[newIndex],
    });
  };

  const handleClick = (event) => {
    const value = event.target.value;
    const isNumber = !isNaN(value);

    // if the value is a number
    if (isNumber) {
      // if the current number is a calculation
      if (state.calculations.includes(state.currentNumber)) {
        const newMemory = state.memory;
        newMemory.push(state.currentNumber);
        setState({
          ...state,
          memory: newMemory,
          hasDot: false,
          currentNumber: value,
        });
      } else {
        setState({
          ...state,
          currentNumber: state.currentNumber.concat(value),
        });
      }
    }
    // if the value is a dot and the current number doesn't have a dot
    else if (value === '.' && !state.hasDot) {
      if (state.calculations.includes(state.currentNumber)) {
        const newMemory = state.memory;
        newMemory.push(state.currentNumber);
        setState({
          ...state,
          memory: newMemory,
          hasDot: true,
          currentNumber: '0.',
        });
      } else if (state.currentNumber.length === 0) {
        setState({
          ...state,
          hasDot: true,
          currentNumber: '0.',
        });
      } else {
        setState({
          ...state,
          hasDot: true,
          currentNumber: state.currentNumber.concat('.'),
        });
      }
    }
    // if the value is RESET
    else if (value === 'RESET') {
      setState({
        ...state,
        memory: [],
        placeholderMemory: [],
        currentNumber: '',
        placeholderCurrentNumber: '',
        hasDot: false,
        result: '',
      });
    }
    // if the value is any of the calculations and there is at least one value on the memory or the current number
    else if (state.calculations.includes(value)) {
      if (
        state.currentNumber.length === 0 &&
        !isNaN(parseFloat(state.result))
      ) {
        setState({
          ...state,
          memory: [state.result],
          hasDot: false,
          currentNumber: value,
        });
      } else if (state.currentNumber.length > 0) {
        console.log(state.currentNumber);
        // if the current number is not a calculation already
        if (!state.calculations.includes(state.currentNumber)) {
          const newMemory = state.memory;
          newMemory.push(state.currentNumber);
          setState({
            ...state,
            memory: newMemory,
            hasDot: false,
            currentNumber: value,
          });
        }
        // if the current number is a calculation already
        else {
          setState({ ...state, currentNumber: value });
        }
      }
    }
    // if the value is +/-, the current number is a number and there's a current number
    else if (value === '+/-') {
      if (!isNaN(state.currentNumber) && state.currentNumber.length > 0) {
        if (state.currentNumber.split('')[0] === '-') {
          setState({ ...state, currentNumber: state.currentNumber.slice(1) });
        } else {
          setState({
            ...state,
            currentNumber: '-'.concat(state.currentNumber),
          });
        }
      } else if (
        state.currentNumber.length === 0 &&
        !isNaN(parseFloat(state.result))
      ) {
        if (state.result.split('')[0] === '-') {
          setState({ ...state, currentNumber: state.result.slice(1) });
        } else {
          setState({ ...state, currentNumber: '-'.concat(state.result) });
        }
      }
    }
    // if the value is =
    else if (value === '=' && state.memory.length > 1) {
      handleEquals();
    }
    // if the value is a cat emoji
    else if (value === '🐱') {
      randomizeCatButtonColor();
    }
  };

  const renderButtons = () => {
    const mappedSymbols = state.symbols.map((symbol) => (
      <Grid item xs={symbol === 'RESET' ? 6 : 3} sx={{}} key={symbol}>
        <Button
          variant="contained"
          color={symbol === '🐱' ? state.catButtonColor : 'primary'}
          sx={{
            width: '100%',
            height: '100%',
          }}
          onClick={handleClick}
          value={symbol}
        >
          {symbol}
        </Button>
      </Grid>
    ));
    return mappedSymbols;
  };

  return (
    <GeneralContainer>
      <Grid container spacing={1} sx={{ height: '100%' }}>
        <Grid item xs={12} sx={{ height: '42%' }}>
          <Paper
            sx={{
              height: '100%',
              backgroundColor: 'darkgrey',
              border: '3px solid black',
              padding: '10px',
            }}
          >
            <Stack height="100%" alignItems="end">
              <Stack
                bgcolor="white"
                width="100%"
                height="2rem"
                alignItems="end"
                p={1}
                border="2px solid black"
              >
                <Typography>
                  {state.currentNumber.length > 0
                    ? state.memory.join(' ').length > 25
                      ? '...'.concat(
                          state.memory
                            .join(' ')
                            .slice(-25, state.memory.join(' ').length)
                        )
                      : state.memory.join(' ')
                    : state.placeholderMemory}
                </Typography>
              </Stack>
              <Typography variant="h5">
                {state.currentNumber.length > 0
                  ? state.currentNumber.length > 17
                    ? '...'.concat(state.currentNumber.slice(-18, -1))
                    : state.currentNumber
                  : state.placeholderCurrentNumber}
              </Typography>
            </Stack>
          </Paper>
        </Grid>
        {renderButtons()}
      </Grid>
    </GeneralContainer>
  );
}

export default App;
