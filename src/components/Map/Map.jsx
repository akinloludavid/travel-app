import React from 'react'
import GoogleMapReact from 'google-map-react'
import {Paper, Typography, useMediaQuery} from '@material-ui/core'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import Rating from '@material-ui/lab/Rating'
import {mapStyles} from './mapStyles'
import useStyles from './styles'
const Map = ({setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData}) => {
  const classes = useStyles()
  const isDesktop = useMediaQuery('(min-width:600px)');
  return (
    <div className= {classes.mapContainer}>
      <GoogleMapReact 
        bootstrapURLKeys ={{key:process.env.REACT_APP_GOOGLE_MAP_API_KEY}}
        defaultCenter = {coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50,50,50,50]}
        options={{disableDefaultUI:true, zoomControl:true, styles:mapStyles}}
        onChange={
          (e)=>{
            setCoordinates({lat:e.center.lat, lng:e.center.lng});
            setBounds({ne:e.marginBounds.ne, sw:e.marginBounds.sw});
          }
        }
        onChildClick={(child)=> setChildClicked(child)}
        >
        {places?.map((place,i) => (
          <div 
            className={classes.markerContainer}
            lat ={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            
            {
              !isDesktop ? (

              <LocationOnOutlinedIcon color="primary" fontSize="large"/>
              ):(
                <Paper className={classes.paper}>
                  <Typography className = {classes.typography} variant ="subtitle">
                    {place.name}
                  </Typography>
                  <img src = {
                    place.photo ? place.photo.images.large.url : "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHJlc3RhdXJhbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"}
                   alt = {place.name}
                  className = {classes.pointer}
                  />
                  <Rating size="small" value = {Number(place.rating)} readOnly/>
                </Paper>
              )
            }
          </div>
        ))}

        {weatherData?.list?.map((data, i)=>(
          <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
            <img height ={100} src = {`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt ="weather data" />
          </div>
        ))}
      </GoogleMapReact>
    </div>
  )
}

export default Map
