
<script setup>
    import HeaderWeb from './HeaderWeb.vue'
    import MainContent from './MainContentWeb.vue'

    // Untuk tahun dinamis
    const Year = new Date().getFullYear()
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <HeaderWeb />

    <!-- Main Content -->
    <main class="flex-grow">
      <MainContent>
        <slot></slot>
      </MainContent>
    </main>

    <!-- Footer -->
    <footer class="bg-base-100 dark:bg-gray-900 h-20 mt-3">
      <div class="flex items-center flex-col w-full h-full px-4 ">
        <div class="flex justify-center items-center gap-1">
            <font-awesome-icon :icon="['fas', 'globe']" style="color: #74C0FC; margin-top: 3px;" />
            <a class="btn btn-ghost text-xl">Country Explorer</a>
        </div>
        <div class="text-sm text-gray-500 dark:text-gray-300 text-center">
          <p>
            Copyright © {{ Year }} Country Explorer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
