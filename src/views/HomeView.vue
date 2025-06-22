<script setup>
import { ref, computed, onMounted } from 'vue';
import CardCountry from '../components/CardCountry.vue';
import { useCountryStore } from '@/stores/country';

const store = useCountryStore();
const currentPage = ref(1);
const itemsPerPage = 10;
// const searchQuery = ref("");

// Fetch once
onMounted(async () => {
  try {
    await store.getCountries();
  } catch (error) {
    console.error(error);
  }
});

// const filteredCountries = computed(() => {
//   if (!searchQuery.value.trim()) return store.countries;
//   return store.countries.filter((country) =>
//     country.name.toLowerCase().includes(searchQuery.value.toLowerCase())
//   );
// });

// Pagination logic
const totalPages = computed(() =>
  Math.ceil(store.countries.length / itemsPerPage)
);

const paginatedCountries = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return store.countries.slice(start, start + itemsPerPage);
});

</script>


<template>
  <div>
    <!-- Hero -->
    <div class="hero bg-base-100 h-96 border-b border-b-base-300">
      <div class="hero-content text-center flex flex-col">
        <h1 class="text-5xl font-bold">Explore Countries Worldwide</h1>
        <p class="py-6 text-xl">Discover detailed information about countries around the globe</p>
        <input
          type="text"
          v-model="searchQuery"
          disabled
          placeholder="Search countries by name..."
          class="input input-bordered w-80"
        />
      </div>
    </div>

    <!-- Card Grid -->
    <div class="flex flex-wrap gap-8 justify-center items-start bg-base-200 border-b border-b-base-300 py-8">
      <CardCountry
        v-for="(country, index) in paginatedCountries"
        :key="index"
        :country="country"
      />

      <div class="flex justify-center items-center gap-4">
        <button
          class="btn btn-outline"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          Prev
        </button>

        <span class="font-semibold">
          Page {{ currentPage }} of {{ totalPages }}
        </span>

        <button
          class="btn btn-outline"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          Next
        </button>
      </div>

    </div>
  </div>
</template>

