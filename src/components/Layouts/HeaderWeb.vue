<script setup>

</script>

<template>
    <div class="navbar bg-white shadow-sm border-b border-b-base-300 px-9 justify-between">
        <div class="flex justify-between items-center gap-2">
            <font-awesome-icon :icon="['fas', 'globe']" style="color: #74C0FC; margin-top: 3px;" />
            <h1 class="text-xl font-semibold">Country Explorer</h1>
        </div>
        <div class="flex-none">
            <ul class="flex gap-9 px-1 font-medium">
                <li><a>Home</a></li>
                <li><a>Region</a></li>
                <li><a>Statistics</a></li>
            </ul>
        </div>
    </div>
</template>