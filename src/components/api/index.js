import axios from 'axios'


const URL= 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'


const options = {
 
  params: {
    bl_latitude: '11.847676',
    tr_latitude: '12.838442',
    bl_longitude: '109.095887',
    tr_longitude: '109.149359',
    
  },
  headers: {
    'x-rapidapi-key': 'a44c1ad304mshf129460914513c3p1d2e6cjsne05b1b9d436c',
    'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
  }
};
export const getPlacesData = async ()=> {
  try {
    const response = await axios.get(URL, options)
    return response.data.data
  } catch (error) {
    console.log(error.message)
  }
}

