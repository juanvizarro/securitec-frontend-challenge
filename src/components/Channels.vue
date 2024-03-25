<script setup lang="ts">
    import { computed } from 'vue'
    import type { ContactChannel } from '@/interfaces/IContact';

    const props = defineProps<{
        items: ContactChannel[]
    }>()

    const uniqueChannels = computed(() => props.items.filter((item, index, self) => index === self.findIndex(selfItem => (selfItem.id === item.id))))
</script>
<template>
    <div class="channels">
        <img class="channel-icon" v-for="(channel, i) in uniqueChannels" :key="`channel_${i}_${channel.id}`" :src="channel.icon" />
    </div>
</template>
<style lang="scss" scoped>
.channels{
    display: flex;
    gap: 6px;
    .channel-icon{
        width: 14px;
        height: 14px;
    }
}
</style>