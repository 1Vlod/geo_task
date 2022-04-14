import React from 'react';
import { Container } from '@mui/material';
import './App.css';
import Table from './Table';
import MapComponent from './Map';

function App() {
  return (
    <div className="App">
      <Container maxWidth="lg">
        <Table />
        <MapComponent />
      </Container>
    </div>
  );
}

export default App;
