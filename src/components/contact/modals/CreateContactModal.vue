<script setup lang="ts">
    import { reactive, ref, computed, onMounted } from 'vue'
    import { InfoCircleOutlined } from '@ant-design/icons-vue'
    import { CampaginService } from '@/services/campaign.service'
    import { ContactService } from '@/services/contact.service'
    import { message } from 'ant-design-vue'
    import type { StepProps } from 'ant-design-vue'
    import type { ContactFormState } from '@/interfaces/IContact'
    import type { Campaign } from '@/interfaces/ICampaign'

    const emits = defineEmits<{
        (e: 'refresh'): void
    }>()

    const campaignService = new CampaginService()
    const contactService = new ContactService()

    const show = defineModel({ required: true, default: false})

    const stepItems = <StepProps[]>[
        { title: 'Completar datos' },
        { title: 'Asignar campaña' }
    ]
    const activeStep = ref(0)
    const formState = reactive<ContactFormState>({
        name: '',
        paternal_surname: '',
        maternal_surname: '',
        type_document: 1,
        document_number: '',
        address: '',
        email: '',
        phone: '',
        code_phone: '51',
        portfolio: null
    })

    const documentTypeOptions = ref([{ value: 1, label: 'DNI'}])
    const disabledNextBtn = computed(() => !(!!formState.name && !!formState.paternal_surname))

    const campaignColumns = ref([
        {
            title: 'Empresa',
            dataIndex: 'entity_name',
            key: 'entity_name'
        },
        {
            title: 'Campaña',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Acciones',
            key: 'action'
        }
    ])
    const campaignData = ref<Campaign[]>([])
    const campaignDataComputed = computed(() => ([
        ...campaignData.value.map(({ id, entity, name }) => ({
            id,
            key: id,
            entity_name: entity.name,
            name
        }))
    ]))
    
    onMounted(async () => {
        campaignData.value = await campaignService.getCampaigns()
    })

    async function onCreate(campaignId: number){
        formState.portfolio = campaignId
        const response = await contactService.createContact(formState)
        emits('refresh')
        message.success({
            content: () => `Se ha agregado el contacto correctamente`,
            class: 'confirm-notification'
        })
        show.value = false
    }
</script>
<template>
    <a-modal
        title="Crear un nuevo contacto"
        v-model:open="show"
    >
        <div>
            <a-steps
                progress-dot
                :current="activeStep"
                :items="stepItems"
            />
            <div class="info" v-show="activeStep === 0">
                <h2 style="text-align: center;">Datos personales</h2>
                <a-form
                    layout="vertical"
                    :model="formState"
                >
                    <a-form-item label="Nombres" required>
                        <a-input v-model:value="formState.name" placeholder="Escribir nombres" />
                    </a-form-item>
                    <a-row :gutter="24">
                        <a-col :span="12">
                            <a-form-item label="Apellido paterno" required>
                                <a-input v-model:value="formState.paternal_surname" placeholder="Escribir apellido paterno" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="Apellido materno">
                                <a-input v-model:value="formState.maternal_surname" placeholder="Escribir apellido materno" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24">
                        <a-col :span="12">
                            <a-form-item label="Tipo de documento">
                                <a-select v-model:value="formState.type_document" :options="documentTypeOptions" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item>
                                <template #label>
                                    <a-flex gap="6" align="center">
                                        <span>N. documento</span>
                                        <InfoCircleOutlined />
                                    </a-flex>
                                </template>
                                <a-input v-model:value="formState.document_number" placeholder="Escribir número de documento" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24">
                        <a-col :span="12">
                            <a-form-item label="Dirección">
                                <a-input v-model:value="formState.address" placeholder="Escribir dirección" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="Correo electrónico">
                                <a-input v-model:value="formState.email" placeholder="Escribir correo electrónico" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-form-item label="Teléfono de contacto">
                        <a-input v-model:value="formState.phone" placeholder="Ingresa aqui...">
                            <template #addonBefore>
                                <a-select disabled v-model:value="formState.code_phone" style="width: 100px">
                                    <a-select-option value="51">
                                        <img src="@/assets/flags/peru.png" placeholder="peru flag" style="padding-right: 6px;">
                                        <span>+51</span>
                                    </a-select-option>
                                </a-select>
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-flex gap="8" align="center">
                        <InfoCircleOutlined />
                        <span class="info-text">Podrás agregar más de cada uno de estos datos después de crear el contacto</span>
                    </a-flex>
                </a-form>
            </div>
            <div class="campaign" v-show="activeStep === 1">
                <h2 style="text-align: center;">Selecciona la campaña</h2>

                <div style="margin-top: 12px;">
                    <p>Selecciona la campaña donde quieres crear este nuevo contacto.</p>
                    <a-table :columns="campaignColumns" :data-source="campaignDataComputed" :pagination="false">
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key === 'action'">
                                <a-button type="link" @click="onCreate(record.id)">Crear contacto aquí</a-button>
                            </template>
                        </template>
                    </a-table>
                </div>
            </div>
        </div>
        <template #footer>
            <a-flex v-if="activeStep === 0" gap="4" justify="center">
                <a-button @click="show = false">Cancelar</a-button>
                <a-button type="primary" :disabled="disabledNextBtn" @click="activeStep = 1">Continuar</a-button>
            </a-flex>
            <a-flex v-if="activeStep === 1" justify="center">
                <a-button @click="activeStep = 0">Volver</a-button>
            </a-flex>
        </template>
    </a-modal>
</template>
<style lang="scss" scoped>
.info-text{
    color: #595959;
}
</style>