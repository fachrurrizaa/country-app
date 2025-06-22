<script setup>
import { useRoute } from 'vue-router';
import { useCountryStore } from '@/stores/country';
import { computed } from 'vue';

const route = useRoute();
const store = useCountryStore();

// Format waktu dari "2025-06-22T05:00" jadi "June 22, 2025"
const date = computed(() => {
  const time = store.weather?.current_weather?.time;
  if (!time) return '';
  return new Date(time + "Z").toUTCString();
});

const windDirectionLabel = (deg) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
};

const weatherDescription = (code) => {
  const map = {
    0: 'Clear Sky',
    1: 'Mainly Clear',
    2: 'Partly Cloudy',
    3: 'Partly Cloudy',
    45: 'Fog',
    48: 'Depositing Rime Fog',
    51: 'Light Drizzle',
    61: 'Light Rain',
    71: 'Snow',
    80: 'Rain Showers',
    // Tambahkan jika perlu
  };
  return map[code] || 'Unknown';
};

const isNight = computed(() => store.weather?.current_weather?.is_day === 0);
</script>

<template>
  <div class="max-w-3xl mx-auto my-10 p-8 bg-white rounded-lg shadow space-y-6">
    <h2 class="text-center text-xl font-bold">Weather Dashboard</h2>

    <!-- Time -->
    <div class="bg-gray-100 p-4 rounded text-center">
      <p class="text-2xl font-mono font-semibold">
        {{ store.weather?.current_weather?.time?.slice(11) || '--:--' }}
      </p>
      <p class="text-sm text-gray-600">{{ date }}</p>
      <p class="text-sm text-gray-400">
        {{ store.weather?.latitude }}°N, {{ store.weather?.longitude }}°E • {{ store.weather?.elevation }}m elevation
      </p>
    </div>

    <!-- Main Temp Box -->
    <div class="bg-gray-100 p-6 rounded text-center">
      <div class="text-6xl font-bold mb-2">
        {{ store.weather?.current_weather?.temperature }}°
      </div>
      <p class="text-lg font-medium">{{ weatherDescription(store.weather?.current_weather?.weathercode) }}</p>
      <p class="text-sm text-gray-500">
        {{ isNight ? 'Night' : 'Day' }}
      </p>
    </div>

    <!-- Grid Info -->
    <div class="grid grid-cols-2 gap-4">
      <!-- Wind -->
      <div class="bg-gray-100 p-4 rounded">
        <p class="text-sm text-gray-500">Wind</p>
        <p class="text-lg font-bold">
          {{ store.weather?.current_weather?.windspeed }} km/h
        </p>
        <p class="text-sm text-gray-500">
          {{ store.weather?.current_weather?.winddirection }}°
          • {{ windDirectionLabel(store.weather?.current_weather?.winddirection) }}
        </p>
      </div>

      <!-- Location -->
      <div class="bg-gray-100 p-4 rounded">
        <p class="text-sm text-gray-500">Location</p>
        <p class="text-sm">Latitude: {{ store.weather?.latitude }}°N</p>
        <p class="text-sm">Longitude: {{ store.weather?.longitude }}°E</p>
        <p class="text-sm">Elevation: {{ store.weather?.elevation }}m</p>
        <p class="text-sm">Timezone: {{ store.weather?.timezone }}</p>
      </div>

      <!-- Weather Info -->
      <div class="bg-gray-100 p-4 rounded">
        <p class="text-sm text-gray-500">Weather Info</p>
        <p class="text-sm">WMO Code: {{ store.weather?.current_weather?.weathercode }}</p>
        <p class="text-sm">Condition: {{ weatherDescription(store.weather?.current_weather?.weathercode) }}</p>
        <p class="text-sm">Time of Day: {{ isNight ? 'Night' : 'Day' }}</p>
      </div>

      <!-- Temperature Summary -->
      <div class="bg-gray-100 p-4 rounded">
        <p class="text-sm text-gray-500">Temperature</p>
        <p class="text-xl font-bold">{{ store.weather?.current_weather?.temperature }}°C</p>
        <p class="text-sm text-gray-400">
          {{ isNight ? 'Feels comfortable for nighttimes' : 'Typical for daytime' }}
        </p>
      </div>
    </div>

    <!-- Footer -->
    <p class="text-xs text-center text-gray-400 mt-6">
      Weather data updated at {{ store.weather?.current_weather?.time?.slice(11) }} GMT
    </p>
  </div>
</template>
