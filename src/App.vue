<script setup lang="ts">
  import { ref, watch, computed } from 'vue'
  import ContactFilter from '@/components/contact/ContactFilter.vue'
  import ContactDatatable from '@/components/contact/ContactDatatable.vue'
  import CreateContactModal from '@/components/contact/modals/CreateContactModal.vue'
  import { PlusOutlined } from '@ant-design/icons-vue'
  import { ContactService } from '@/services/contact.service'
  import type { ContactModule, ContactAdvancedFilters } from '@/interfaces/IContact'

  const contactService = new ContactService()

  const moduleData = ref<ContactModule>()
  const loadingData = ref(false)
  const entityId = ref(0)
  const campaignId = ref(0)
  const searchText = ref('')
  const contactParams = computed(() => ({
      entity_id: entityId.value || undefined,
      portfolio_id: campaignId.value || undefined,
      search: searchText.value || undefined,
      ...advancedFilters.value
    }))
  const showCreateContactModal = ref(false)
  
  const advancedFilters = ref<ContactAdvancedFilters>({})
  function onApplyAdvancedFilters(filters: ContactAdvancedFilters){
    advancedFilters.value = filters
    initData()
  }

  async function initData () {
    try {
      loadingData.value = true
      moduleData.value = await contactService.getContacts(contactParams.value)
      loadingData.value = false
    } catch (error) {
      loadingData.value = false
      console.error('error getContacts')
    }
  }

  initData()
  
  watch(contactParams, () => {
    initData()
  })
</script>

<template>
  <a-layout class="layout">
    <a-layout-content>
      <div style="margin-bottom: 16px;">
        <div class="header">
          <span class="text">Gestiona los contactos de tus campañas. Puedes ver, editar información y realizar acciones individuales como llamadas. Click aquí para conocer más.</span>
          <span><b>Contactos encontrados:</b> {{ moduleData?.count }}</span>
        </div>
        <a-flex justify="space-between" style="margin-top: 16px;">
          <ContactFilter
            v-model:entity="entityId"
            v-model:campaign="campaignId"
            v-model:search="searchText"
            @apply-advanced-filter="onApplyAdvancedFilters"
          />
          <a-button
            @click="showCreateContactModal = true"
            class="add-btn"
          >
            Crear contacto <PlusOutlined />
          </a-button>
        </a-flex>
      </div>
      <ContactDatatable :data="moduleData?.results ?? []" :loading-data="loadingData" @refresh="initData" />
      <CreateContactModal v-model="showCreateContactModal" @refresh="initData" />
    </a-layout-content>
  </a-layout>
</template>

<style scoped lang="scss">
.layout{
  padding: 48px;
  .header{
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }
  .add-btn{
    color: #1890FF;
    border: 1px solid #1890FF;
  }
}
</style>
