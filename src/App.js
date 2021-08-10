import './App.css';
import React,{useEffect, useState} from 'react'
import { CssBaseline, Grid } from '@material-ui/core';
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'
import { getPlacesData, getWeatherData } from './components/api';


function App() {
  const [places, setPlaces]= useState([])
  const [coordinates, setCoordinates] = useState({})
  const [bounds, setBounds] = useState({})
  const [childClicked, setChildClicked] = useState(null)
  const [isLoading, setIsLoading]= useState(false)
  const [filteredPlaces, setFilteredPlaces] = useState([])

  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState('')
  
  const [weatherData, setWeatherData]= useState([])
  
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords:{latitude, longitude}})=>{
      setCoordinates({lat:latitude, lng:longitude})
    })
  },[])

  useEffect(()=> {
    if(bounds.sw && bounds.ne){
    setIsLoading(true)
    getWeatherData(coordinates.lat, coordinates.lng)
      .then(data=> setWeatherData(data))
    getPlacesData(type,bounds.sw, bounds.ne)
      .then((data)=> {
        setPlaces(data?.filter(place=> place.name))
        setFilteredPlaces([])
        setIsLoading(false)
      })
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[type, bounds])


  useEffect(()=>{
    const filtered = places?.filter((place)=> place.rating >= rating)
    setFilteredPlaces(filtered)
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[rating])

  return (
    <>
      <CssBaseline/>
      <Header setCoordinates={setCoordinates}/>
      <Grid container spacing ={3} style={{width:'100%'}}>
        <Grid item xs={12} md={4}>
          <List 
            places = {filteredPlaces.length ? filteredPlaces : places}
            isLoading={isLoading}
            childClicked={childClicked}
            type={type}
            rating={rating}
            setRating={setRating}
            setType={setType}
          />
        </Grid>
        <Grid item xs ={12} md={8}>
          <Map 
            setCoordinates= {setCoordinates}
            setBounds = {setBounds} 
            coordinates={coordinates}
            places ={places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}

          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
