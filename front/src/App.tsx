import React from 'react';
import { Container } from '@mui/material';
import './App.css';
import Table from './Table';

function App() {
  return (
    <div className="App">
      <Container maxWidth="lg">
        <Table />
      </Container>
    </div>
  );
}

export default App;
