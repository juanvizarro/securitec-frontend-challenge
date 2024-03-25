<script setup lang="ts">
    import { ref } from 'vue'
    import { SearchOutlined, FilterOutlined } from '@ant-design/icons-vue'
    import type { SelectProps } from 'ant-design-vue'

    const bussinessOptions = ref<SelectProps['options']>([
        { value: 0, label: 'Todas las empresas'}
    ])
    const bussinessSelected = ref(0)

    const campaignOptions  = ref<SelectProps['options']>([
        { value: 0, label: 'Todas las campañas' }
    ])
    const campaignSelected = ref(0)
    const isCampaignDisabled = ref(true)

    const stateOptions  = ref<SelectProps['options']>([
        { value: 0, label: 'activos e inactivos' },
        { value: 1, label: 'Activos' },
        { value: 2, label: 'Inactivos' },
    ])
    const stateSelected = ref(0)
</script>
<template>
    <div class="contact-filter">
        <a-input placeholder="Buscar contacto">
            <template #prefix>
                <SearchOutlined color="grey" />
            </template>
        </a-input>
        <a-select
            :options="bussinessOptions"
            v-model:value="bussinessSelected"
        />
        <a-select
            :options="campaignOptions"
            v-model:value="campaignSelected"
            :disabled="isCampaignDisabled"
        />
        <a-select
            :options="stateOptions"
            v-model:value="stateSelected"
        />
        <a-button>Filtros Avanzados <FilterOutlined /></a-button>
    </div>
</template>
<style lang="scss" scoped>
.contact-filter{
    display: flex;
    gap: 8px;
}
</style>