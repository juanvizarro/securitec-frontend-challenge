<script setup lang="ts">
    import { computed } from 'vue'

    const props = defineProps<{
        items: string[]
    }>()

    const text = computed(() => {
        const length = props.items?.length ?? 0
        return length === 0 ? 'sin cola' : length > 1 ? `${length} cola` : `${length} colas`
    })
</script>
<template>
    <a-popover :title="text">
        <template #content>
        <p v-for="item in props.items" :key="`queue_${item}`">{{ item }}</p>
        </template>
        <a-button type="link">
            {{ text }}
        </a-button>
    </a-popover>
</template>