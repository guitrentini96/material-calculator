import { Container, Paper } from '@mui/material';

const GeneralContainer = ({ children }) => {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Paper
        elevation={24}
        sx={{
          width: '20rem',
          backgroundColor: 'beige',
          marginTop: '10vh',
          height: '70vh',
          border: '4px solid black',
          padding: '10px',
        }}
      >
        {children}
      </Paper>
    </Container>
  );
};

export default GeneralContainer;
