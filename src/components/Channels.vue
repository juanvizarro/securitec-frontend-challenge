<script setup lang="ts">
    import { computed } from 'vue'
    import type { ContactChannel } from '@/interfaces/IContact';

    const props = defineProps<{
        items: ContactChannel[]
    }>()

    const uniqueChannels = computed(() => props.items.filter((item, index, self) => index === self.findIndex(selfItem => (selfItem.id === item.id))).map(channel => ( {...channel } )))
</script>
<template>
    <div class="channels">
        <a-popover :title="channel.name" v-for="(channel, i) in uniqueChannels" :key="`channel_${i}_${channel.id}`">
            <template #content>
                <ul>
                    <!-- TODO: missing phone values -->
                </ul>
            </template>
            <img class="channel-icon" :src="channel.icon" />
        </a-popover>
    </div>
</template>
<style lang="scss" scoped>
.channels{
    display: flex;
    gap: 8px;
    .channel-icon{
        width: 14px;
        height: 14px;
    }
}
</style>