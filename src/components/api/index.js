import axios from 'axios'



export const getPlacesData = async (type,sw, ne)=> {
  try {
    const response = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {

      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,

      },
      headers: {
        'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
      }
    })
    return response.data.data
  } catch (error) {
    console.log(error.message)
  }
}

export const getWeatherData = async(lat, lng)=> {
  try {
    const {data} = await axios.get('https://community-open-weather-map.p.rapidapi.com/find',
       {
          params: {lon:lng,lat, units: 'metric'},
          headers: {
            'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
            'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
          }
       })
       return data
  } catch (error) {
    console.log(error.message) 
  }
}

