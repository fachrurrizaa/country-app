import { defineStore } from 'pinia';
import axios from 'axios';

export const useCountryStore = defineStore('country', {
  state: () => ({
    countries: [],
    weather: []
  }),
  actions: {
    async getCountries() {
      try {
        const res = await axios.get('https://restcountries.com/v3.1/independent?status=true&fields=name,region,capital,population,flags,latlng');
        this.countries = res.data
          .filter(c => c.name && c.flags) // Filter data rusak
          .map(c => ({
            name: c.name.common || 'Unknown',
            region: c.region || 'Unknown',
            capital: c.capital?.[0] || 'Unknown',
            population: c.population || 0,
            flag: {
              png: c.flags?.png || '',
              alt: c.flags?.alt || ''
            },
            latitude: c.latlng?.[0] || null,
            longitude: c.latlng?.[1] || null
          }));

        console.log(this.countries);
      } catch {
        this.countries = [];
      }
    },

    async getWeather(payload){
      try {
        const res = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${payload.lat}&longitude=${payload.lng}&current_weather=true`);
        this.weather = res.data
      } catch {
        this.weather = [];
      }
    }
  }
});