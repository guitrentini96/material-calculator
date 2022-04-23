import { Button, Grid, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import './App.css';
import GeneralContainer from './components/GeneralContainer';

function App() {
  const [state, setState] = React.useState({
    symbols: [
      '$',
      'RESET',
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
  });

  const renderButtons = () => {
    const mappedSymbols = state.symbols.map((symbol) => (
      <Grid item xs={symbol === 'RESET' ? 9 : 3} sx={{}} key={symbol}>
        <Button
          variant="contained"
          color={symbol === '$' ? 'error' : 'primary'}
          sx={{
            width: '100%',
            aspectRatio:
              symbol === 'RESET' ? '3' : symbol === '$' ? '1' : '1.5',
            borderRadius: symbol === '$' ? '50%' : '',
          }}
        >
          <Typography sx={{}}>{symbol}</Typography>
        </Button>
      </Grid>
    ));
    return mappedSymbols;
  };

  return (
    <GeneralContainer>
      {/* <Stack sx={{ height: '100%', justifyContent: 'flex-end' }}> */}
      <Grid container spacing={1} sx={{ height: '100%' }}>
        <Grid item xs={12} sx={{ height: '42%' }}>
          <Paper
            sx={{
              height: '100%',
              backgroundColor: 'darkgrey',
              border: '3px solid black',
            }}
          >
            <Typography>aaa</Typography>
          </Paper>
        </Grid>
        {renderButtons()}
      </Grid>
      {/* </Stack> */}
    </GeneralContainer>
  );
}

export default App;
