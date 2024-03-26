<script setup lang="ts">
    import { ref, computed, watch } from 'vue'
    import { SearchOutlined, FilterOutlined } from '@ant-design/icons-vue'
    import { EntityService } from '@/services/entity.service'
    import type { SelectProps } from 'ant-design-vue'
    import type { ContactAdvancedFilters } from '@/interfaces/IContact'
    import type { Entity } from '@/interfaces/IEntity'


    const emits = defineEmits<{
        (e: 'applyAdvancedFilter', filters: ContactAdvancedFilters): void
    }>()

    const entityService = new EntityService()

    const showDrawer = ref(false)
    const entities = ref<Entity[]>([])
    const isCampaignDisabled = computed(() => entitySelected.value === 0)
    const searchText = defineModel('search', { default: ''})

    const campaignSelected = defineModel('campaign', { default: 0 })
    const entitySelected = defineModel('entity', { default: 0 })
    const stateSelected = ref(0)
    const actionsMadeSelected = ref(0)
    const viewTypeSelected = ref(0)
    const groupSelected = ref<number[]|null>(null)
    const resultSelected = ref<number[]|null>(null)
    
    const fromDate = ref<string|null>(null)
    const toDate = ref<string|null>(null)

    const entityOptions = computed<SelectProps['options']>(() => [
        { value: 0, label: 'Todas las empresas'},
        ...entities.value.map(entity => ({ value: entity.id, label: entity.name }))
    ])
    const campaignOptions  = computed<SelectProps['options']>(() => [
        { value: 0, label: 'Todas las campañas' },
        ...(entities.value.find(entity => entity.id === entitySelected.value)?.portfolios.map(portfolio => ({ value: portfolio.id, label: portfolio.name})) ?? [])
    ])
    const stateOptions  = ref<SelectProps['options']>([
        { value: 0, label: 'Activos e inactivos' },
        { value: 1, label: 'Activos' },
        { value: 2, label: 'Inactivos' },
    ])
    const actionsMadeOptions = <SelectProps['options']>[
        { value: 0, label: 'Gestionados y sin gestionar'},
        { value: 1, label: 'Gestionados'},
        { value: 2, label: 'Sin gestionar'},
    ]
    const groupsOptions = <SelectProps['options']>[
    ]
    const resultOptions = <SelectProps['options']>[
    ]
    const viewTypeOptions = <SelectProps['options']>[
        { value: 0, label: 'Contactos asignados y no asignados'},
        { value: 1, label: 'Solo contactos asignados'},
        { value: 2, label: 'Contactos no asignados'}
    ]

    const advanceFilters = computed<ContactAdvancedFilters>(() => ({
        last_management_date_start: fromDate.value ? new Date(fromDate.value).toISOString() || undefined : undefined,
        last_management_date_end:  toDate.value ? new Date(toDate.value).toISOString() || undefined : undefined, 
        groups_id: groupSelected.value || undefined,
        results_id: resultSelected.value || undefined
    }))

    function clearFilters(){
        actionsMadeSelected.value = 0
        groupSelected.value = null
        resultSelected.value = null
        viewTypeSelected.value = 0
    }
    function applyFilters(){
        console.log(fromDate.value, typeof fromDate.value, new Date(fromDate.value ?? '').toISOString())
        emits('applyAdvancedFilter', advanceFilters.value)
        showDrawer.value = false
    }

    async function initData(){
        entities.value = await entityService.getEntities()
    }
    initData()

    watch(entitySelected, () => {
        campaignSelected.value = 0
    })
    const tipificationSelectDisabled = ref(false)
    watch(actionsMadeSelected, (val) => {
        if(val === 2){
            tipificationSelectDisabled.value = true
            groupSelected.value = null
            resultSelected.value = null
            fromDate.value = null
            toDate.value = null
        } else{
            tipificationSelectDisabled.value = false
        }
    })
</script>
<template>
    <div class="contact-filter">
        <a-tooltip>
            <template #title>
                Nombre, cod o teléfono del contacto.
            </template>
            <a-input v-model:value="searchText" placeholder="Buscar contacto">
                <template #prefix>
                    <SearchOutlined color="grey" />
                </template>
            </a-input>
        </a-tooltip>
        <a-select
            :options="entityOptions"
            v-model:value="entitySelected"
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
        <a-button @click="showDrawer = true">Filtros Avanzados <FilterOutlined /></a-button>
    </div>
    <a-drawer
        v-model:open="showDrawer"
        title="Selecciona tus filtros por gestión"
        placement="right"
        :width="600"
    >
        <div class="filters">
            <p style="color: #595959;">Filtra tus contactos en base a sus gestiones realizadas. No olvides aplicar tus filtros para que se visualicen en la tabla.</p>
            <p><b>Tipificaciones:</b></p>

            <a-form layout="vertical">
                <a-form-item label="Con gestiones realizadas">
                    <a-select v-model:value="actionsMadeSelected" :options="actionsMadeOptions" />
                </a-form-item>
                <a-form-item label="Grupos">
                    <a-select v-model:value="groupSelected" :options="groupsOptions" placeholder="Seleccionar grupos" :disabled="tipificationSelectDisabled" />
                </a-form-item>
                <a-form-item label="Resultado">
                    <a-select v-model:value="resultSelected" :options="resultOptions" placeholder="Seleccionar resultados" :disabled="tipificationSelectDisabled" />
                </a-form-item>
                <a-row :gutter="24">
                    <a-col span="24">
                        <p>Fecha de última gestión:</p>
                    </a-col>
                    <a-col span="12">
                        <a-form-item label="Desde">
                            <a-date-picker :disabled="tipificationSelectDisabled" style="width: 100%" v-model:value="fromDate" placeholder="--/--/--" />
                        </a-form-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-item label="Hasta">
                            <a-date-picker :disabled="tipificationSelectDisabled" style="width: 100%;" v-model:value="toDate" placeholder="--/--/--" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <p><b>Asignación de contactos:</b></p>
                <a-form-item label="Tipo de vista">
                    <a-select v-model:value="viewTypeSelected" :options="viewTypeOptions" />
                </a-form-item>

                <p><b>Última vez gestionado por:</b></p>
            </a-form>
        </div>
        <template #footer>
            <a-flex gap="8" justify="end">
                <a-button @click="clearFilters">Limpiar</a-button>
                <a-button @click="applyFilters" type="primary">Aplicar</a-button>
            </a-flex>
        </template>
    </a-drawer>
</template>
<style lang="scss" scoped>
.contact-filter{
    display: flex;
    gap: 8px;
}
.filters{
    font-size: 14px;
}
</style>