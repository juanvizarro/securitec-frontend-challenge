<script setup lang="ts">
    import Channels from '@/components/Channels.vue'
    import { DeleteOutlined } from '@ant-design/icons-vue'
    import { STable, type STableProps } from '@surely-vue/table'
    import type { Contact } from '@/interfaces/IContact'

    type Column = STableProps['columns']

    const props = defineProps<{
        data: Contact[]
    }>()

    const columns = <Column>[
        {
            title: 'Cod Contacto',
            dataIndex: 'code',
            width: 200,
            fixed: 'left',
            align: 'left'
        },
        {
            title: 'Nombres y Apellidos',
            dataIndex: 'full_name',
            width: 200,
            align: 'left'
        },
        {
            title: 'Empresa',
            dataIndex: 'entity_name',
            width: 200,
            align: 'left'
        },
        {
            title: 'Campaña',
            dataIndex: 'portfolio_name',
            align: 'left',
            width: 200
        },
        {
            title: 'Teléfono',
            dataIndex: 'phones',
            align: 'left',
            width: 130
        },
        {
            title: 'Número de Documento',
            dataIndex: 'document_number',
            align: 'left',
            width: 200
        },
        {
            title: 'Canales',
            dataIndex: 'channels',
            align: 'left',
            width: 200
        },
        {
            title: 'Colas',
            dataIndex: 'queues',
            align: 'left',
            width: 100
        },
        {
            title: 'Fecha de última gestión',
            dataIndex: 'last_management_date',
            align: 'left',
            width: 200
        },
        {
            title: 'Fecha de última interación',
            dataIndex: 'last_interaction_date',
            align: 'left',
            width: 220
        },
        {
            title: 'Último grupo',
            dataIndex: 'last_group',
            align: 'left',
            width: 130
        },
        {
            title: 'Último resultado',
            dataIndex: 'last_result',
            align: 'left',
            width: 150
        },
        {
            title: 'Último motivo',
            dataIndex: 'last_motive',
            align: 'left',
            width: 150
        },
        {
            title: 'Último submotivo',
            dataIndex: 'last_submotive',
            align: 'left',
            width: 160
        },
        {
            title: 'Última vez gestionado por',
            dataIndex: 'last_management_user',
            align: 'left',
            width: 220
        },
        {
            title: 'Usuario asignado',
            dataIndex: 'user_assigned',
            align: 'left',
            width: 180
        },
        {
            title: 'Fecha de creación',
            dataIndex: 'created_at',
            align: 'left',
            width: 160
        },
        {
            title: 'Fecha de última actualización',
            dataIndex: 'updated_at',
            align: 'left',
            width: 240
        },
        {
            title: 'Acciones',
            key: 'action',
            fixed: 'right',
            width: 100
        },
    ]

    function showContactDetail(record: Contact, tab: 'info'|'phones'){
        console.log(record, tab)
    }
</script>
<template>
    <div>
        <STable 
            :columns="columns"
            :data-source="props.data"
            :scroll="{ x: 2000 }"
        >
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'full_name'">
                    <a-button
                        type="link"
                        @click="showContactDetail(record, 'info')"
                    >
                        {{ record[column.dataIndex] }}
                    </a-button>
                </template>
                <template v-if="column.dataIndex === 'phones'">
                    <a-button
                        type="link"
                        @click="showContactDetail(record, 'phones')"
                    >
                        {{ record?.phones?.length ?? 0 }} {{ (record?.phones?.length ?? 0) > 1 ? 'teléfonos' : 'teléfono' }}
                    </a-button>
                </template>
                <template v-if="column.dataIndex === 'channels'">
                    <Channels :items="record.channels" />
                </template>
                <template v-if="column.key === 'action'">
                    <a-flex gap="small" justify="center">
                        <a-switch size="small" />
                        <DeleteOutlined color="primary" />
                    </a-flex>
                </template>
            </template>
        </STable>
    </div>
</template>