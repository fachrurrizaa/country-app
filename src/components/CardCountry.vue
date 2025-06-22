<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  country: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

const goToDetail = () => {
  const { name, latitude, longitude } = props.country;

  router.push({
    path: `/${encodeURIComponent(name)}`,
    query: {
      lat: latitude,
      lng: longitude
    }
  });
};

</script>

<template>
  <div class="card bg-white w-80 shadow border border-gray-100 rounded-xl p-4">
    <!-- Flag -->
    <figure>
      <img
        :src="country.flag.png"
        :alt="country.flag.alt || country.name"
        class="w-16 h-10 rounded object-cover"
      />
    </figure>

    <!-- Info -->
    <div class="mt-4 space-y-1">
      <h2 class="text-lg font-semibold text-gray-900">
        {{ country.name }}
      </h2>
      <p class="text-sm text-gray-500">{{ country.region }}</p>

      <p class="flex items-center text-sm text-gray-700">
        <font-awesome-icon :icon="['fas', 'city']" class="mr-2 text-gray-400" />
        Capital: {{ country.capital }}
      </p>

      <p class="flex items-center text-sm text-gray-700">
        <font-awesome-icon :icon="['fas', 'users']" class="mr-2 text-gray-400" />
        Population: {{ country.population.toLocaleString() }}
      </p>

      <div class="mt-4">
        <button
          @click="goToDetail"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          View Details
        </button>
      </div>
    </div>
  </div>
</template>
