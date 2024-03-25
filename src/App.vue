<script setup lang="ts">
  import { ref } from 'vue'
  import ContactFilter from '@/components/contact/ContactFilter.vue'
  import ContactDatatable from '@/components/contact/ContactDatatable.vue'
  import { PlusOutlined } from '@ant-design/icons-vue'
  import { ContactService } from '@/services/contact.service'
  import type { ContactModule } from '@/interfaces/IContact'

  const contactService = new ContactService()

  const moduleData = ref<ContactModule>()

  async function initData () {
    moduleData.value = await contactService.getContacts()
  }

  initData()
</script>

<template>
  <a-layout class="layout">
    <a-layout-content>
      <div>
        <div class="header">
          <span class="text">Gestiona los contactos de tus campañas. Puedes ver, editar información y realizar acciones individuales como llamadas. Click aquí para conocer más.</span>
          <span><b>Contactos encontrados:</b> {{ moduleData?.count }}</span>
        </div>
        <ContactFilter />
        <a-button
          class=""
        >
          Crear contacto <PlusOutlined />
        </a-button>
      </div>
      <ContactDatatable v-if="moduleData" :data="moduleData.results" />
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
}
</style>
