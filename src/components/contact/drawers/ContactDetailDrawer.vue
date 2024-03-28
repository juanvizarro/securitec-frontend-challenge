<script setup lang="ts">
    import { ref, h, computed } from 'vue'
    import { Modal } from 'ant-design-vue'
    import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
    import { ContactService } from '@/services/contact.service'
    import type { Contact } from '@/interfaces/IContact'
    import type { Column } from '@/interfaces/GenericTypes'

    type Tab = 'info'|'phones'

    const props = defineProps<{
        detail: Contact
        disabledPrev: boolean
        disabledNext: boolean
    }>()
    const emits = defineEmits<{
        (e: 'next'): void
        (e: 'prev'): void
    }>()

    const contactService = new ContactService()
    const [modal, contextHolder] = Modal.useModal()

    const show = defineModel<boolean>({ default: false, required: true })
    const tab = defineModel<Tab>('tab')
    function onPrevious(){
        emits('prev')   
    }
    function onNext(){
        emits('next')
    }

    const infoTable = ref([
        {
            title: 'Código de contacto',
            value: props.detail.code,
            disabled: true
        },
        {
            title: 'Nombre',
            value: props.detail.full_name,
            disabled: true
        },
        {
            title: 'Apellido paterno',
            value: '',
            disabled: true
        },
        {
            title: 'Apellido materno',
            value: '',
            disabled: false
        },
        {
            title: 'N. de documento',
            value: props.detail.document_number,
            disabled: false
        },
        {
            title: 'Fecha de nacimiento',
            value: '',
            disabled: false
        },
        {
            title: 'Edad',
            value: '',
            disabled: false
        },
        {
            title: 'Sexo',
            value: '',
            disabled: false
        },
        {
            title: 'Estado civil',
            value: '',
            disabled: false
        },
        {
            title: 'País',
            value: '',
            disabled: false
        },
        {
            title: 'Ciudad',
            value: '',
            disabled: false
        },
    ])

    // TODO: phones data is missing
    const phones = ref([])
    const phonesTableColumns = <Column>[
        // {
        //     title: 'cod',
        //     dataIndex: 'another',
        // }
    ]
    
    function showDeleteContactModal() {
        modal.confirm({
            title: `¿Estás seguro de eliminar el contacto ${props.detail.full_name}?`,
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
                    const response = await contactService.deleteContact(props.detail.id)
                    show.value = false
                    return response
                } catch {
                    return console.error('error in contact service');
                }
            },
            onCancel(){}
        });
    }
    
    const contactInitials = computed(() => {
        const names = props.detail.full_name.split(' ')
        return names.length >= 2 ? `${names[0].trim()[0].toUpperCase()}${names[1].trim()[0].toUpperCase()}` : ''
    })
</script>
<template>
    <a-drawer
        v-model:open="show"
        title="Detalle del contacto"
        placement="right"
        :width="600"
    >
        <a-flex gap="12">
            <a-avatar :size="48" class="avatar">{{ contactInitials }}</a-avatar>
            <a-flex vertical>
                <b>{{ props.detail.full_name }}</b>
                <span class="campaign">Campaña: {{ props.detail.base_name }}</span>
            </a-flex>
        </a-flex>
        <a-tabs v-model:activeKey="tab">
            <a-tab-pane key="info" tab="Datos personales">
                <p class="subtitle">Puedes agregar o editar información acorde a los campos configurados.</p>
                <div class="info-table">
                    <div v-for="(item,i) in infoTable" :key="`info-table_${detail.id}_${i}`" class="info-table--column">
                        <div class="info-table--title"><b>{{ item.title }}</b></div>
                        <div class="info-table--value" :class="{ disabled: item.disabled }">{{ item.value }}</div>
                    </div>
                </div>

            </a-tab-pane>
            <a-tab-pane key="phones" tab="Teléfonos" force-render>
                <a-table
                    :columns="phonesTableColumns"
                    :data-source="phones"
                    :scroll="{ x: 2000 }"
                    :pagination="false"
                    :key="'id'"
                />
            </a-tab-pane>
        </a-tabs>
        <a-flex justify="space-between">
            <a-button
                size="small"
                danger
                type="link"
                @click="showDeleteContactModal"
            >
                Eliminar contacto
            </a-button>
            <a-flex gap="8">
                <a-button @click="onPrevious" :disabled="props.disabledPrev">Ver anterior contacto</a-button>
                <a-button @click="onNext" type="primary" :disabled="props.disabledNext">Ver siguiente contacto</a-button>
            </a-flex>
        </a-flex>
      <contextHolder />
    </a-drawer>
</template>
<style lang="scss" scoped>
.subtitle{
    color: #8C8C8C;
    font-size: 14px;
    margin-top: 0px;
}
.campaign{
    color: #00000073;
    font-style: italic;
}
.avatar{
    color: #1D39C4;
    border: 2px solid #85A5FF;
    background-color: #f0f5ff;
}
.info-table{
    font-size: 14px;
    &--column{
        display: grid;
        grid-template-columns: 50% 50%;
    }
    &--title{
        padding: 8px;
        background-color: #FAFAFA;
    }
    &--value{
        border-top: 1px solid #F0F0F0;
        border-bottom: 1px solid #F0F0F0;
        padding: 8px;
        &.disabled{
            background-color: #FAFAFA;
        }
    }
}
</style>