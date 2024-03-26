<script setup lang="ts">
    import { computed, ref, h } from 'vue'
    import Channels from '@/components/Channels.vue'
    import ContactQueues from '@/components/contact/ContactQueues.vue'
    import ContactDetailDrawer from '@/components/contact/drawers/ContactDetailDrawer.vue'
    import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'
    import { ContactService } from '@/services/contact.service'
    import { STable } from '@surely-vue/table'
    import { Modal, message } from 'ant-design-vue'
    import { getDate } from '@/helpers/date.helper'
    import type { Contact } from '@/interfaces/IContact'
    import type { Column } from '@/interfaces/GenericTypes'

    const props = defineProps<{
        data: Contact[]
    }>()

    const [modal, contextHolder] = Modal.useModal()
    const contactService = new ContactService()

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
            width: 250,
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
            width: 220
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
    
    const showContactDetailModal = ref(false)
    const contactDetail = ref<Contact|null>(null)
    const activeContactDetailTab = ref<'info'|'phones'>('info')
    function showContactDetail(record: Contact, tab: 'info'|'phones'){
        contactDetail.value = record
        activeContactDetailTab.value = tab
        setTimeout(() => {
            showContactDetailModal.value = true
        }, 200)
    }
    const contactDetailIndex = computed(() => props.data.findIndex(item => item.id === contactDetail.value?.id))
    function onPreviousDetailContact(){
        if(contactDetailIndex.value < 0) return

        contactDetail.value = props.data[contactDetailIndex.value-1]
    }
    function onNextDetailContact(){
        if(contactDetailIndex.value >= (props.data.length - 1)) return

        contactDetail.value = props.data[contactDetailIndex.value+1]
    }

    function showDeleteContactModal(id: number, full_name: string) {
        modal.confirm({
            title: `¿Estás seguro de eliminar el contacto ${full_name}?`,
            icon: h(ExclamationCircleOutlined),
            content: 'Recuerda que ya no se visualizará este contacto en la tabla. Si deseas volver a visualizarlo, deberás agregarlo nuevamente a Score.',
            okText: 'Eliminar',
            okType: 'primary',
            okButtonProps: {
                danger: true
            },
            cancelText: 'Cancelar',
            async onOk() {
                try {
                    const response = await contactService.deleteContact(id)
                    message.success({
                        content: () => `Se ha eliminado el contacto “${full_name}” correctamente`,
                        class: 'confirm-notification'
                    })
                    return response
                } catch {
                    return console.error('error in contact service');
                }
            },
            onCancel(){}
        });
    }
</script>
<template>
    <div>
        <STable 
            :columns="columns"
            :data-source="props.data"
            :scroll="{ x: 2000 }"
            auto-header-height
        >
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'full_name'">
                    <a-button
                        type="link"
                        @click="showContactDetail(record, 'info')"
                    >
                        <span class="full-name">{{ record[column.dataIndex] }}</span>
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
                <template v-if="column.dataIndex === 'queues'">
                    <ContactQueues :items="record.queues" />
                </template>
                <template v-if="column.dataIndex === 'last_management_date'">
                    {{ record.last_management_date ? getDate(record.last_management_date) : '-' }}
                </template>
                <template v-if="column.dataIndex === 'last_interaction_date'">
                    {{ record.last_interaction_date ? getDate(record.last_interaction_date) : '-' }}
                </template>
                <template v-if="column.dataIndex === 'created_at'">
                    {{ record.created_at ? getDate(record.created_at) : '-' }}
                </template>
                <template v-if="column.dataIndex === 'updated_at'">
                    {{ record.updated_at ? getDate(record.updated_at) : '-' }}
                </template>
                <template v-if="column.key === 'action'">
                    <a-flex gap="small" justify="center" align="center">
                        <a-switch size="small" />
                        <a-button type="link" @click="showDeleteContactModal(record.id, record.full_name)">
                            <DeleteOutlined />
                        </a-button>
                    </a-flex>
                </template>
            </template>
        </STable>
        <ContactDetailDrawer
            v-if="contactDetail"
            v-model="showContactDetailModal"
            :detail="contactDetail"
            v-model:tab="activeContactDetailTab"
            @prev="onPreviousDetailContact"
            @next="onNextDetailContact"
            :disabled-prev="contactDetailIndex <= 0"
            :disabled-next="contactDetailIndex >= (props.data.length - 1)"
        />
        <contextHolder />
    </div>
</template>
<style lang="scss" scoped>
.full-name{
    width: 200px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-align: start;
}
</style>