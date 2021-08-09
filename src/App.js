import './App.css';
import React,{useEffect, useState} from 'react'
import { CssBaseline, Grid } from '@material-ui/core';
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'
import { getPlacesData } from './components/api';


function App() {
  const [places, setPlaces]= useState([])
  useEffect(()=> {
    getPlacesData()
      .then((data)=> {
        setPlaces(data)
        console.log(data)
      })
  },[])
  console.log(places)
  return (
    <>
      <CssBaseline/>
      <Header/>
      <Grid container spacing ={3} style={{width:'100%'}}>
        <Grid item xs={12} md={4}>
          <List/>
        </Grid>
        <Grid item xs ={12} md={8}>
          <Map/>
        </Grid>
      </Grid>
    </>
  );
}

export default App;