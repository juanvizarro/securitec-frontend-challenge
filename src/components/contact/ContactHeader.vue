<script setup lang="ts">
    import { InfoCircleOutlined, GlobalOutlined, PhoneOutlined, BellOutlined, SmileOutlined, DownOutlined } from '@ant-design/icons-vue'
</script>
<template>
    <a-layout-header class="contact-header" style="padding-inline: 8px">
        <a-flex justify="space-between">
            <a-flex align="center" gap="8">
                <h3 style="margin: 0px">Contactos</h3>
                <InfoCircleOutlined />
                <a-tag color="green">Webphone conectado</a-tag>
            </a-flex>
            <a-flex align="center">
                <a-flex align="center" gap="8" style="padding: 0px 24px;border-right: 1px solid #D9D9D9;">
                    <GlobalOutlined class="header-icon" />
                    <span>Hora plataforma 20:49 (GMT-5) Perú</span>
                </a-flex>
                <div style="padding: 0px 24px;border-right: 1px solid #D9D9D9;">
                    <PhoneOutlined class="header-icon"  />
                </div>
                <div style="padding: 0px 24px;border-right: 1px solid #D9D9D9;">
                    <a-badge count="2">
                        <BellOutlined class="header-icon" />
                    </a-badge>
                </div>
                <a-flex gap="4" align="center" style="padding: 0px 24px;">
                    <a-avatar style="background-color: #FFF7E6;">
                        <template #icon>
                            <SmileOutlined color="#fa8c15" />
                        </template>
                    </a-avatar>
                    <span>Camila</span>
                    <DownOutlined />
                </a-flex>
            </a-flex>
        </a-flex>
    </a-layout-header>
</template>
<style lang="scss" scoped>
.contact-header{
    background: #FFFFFF;
    box-shadow: 0px 1px 0px 0px #D9D9D9;
}
</style>
<style lang="scss">
.header-icon{
    svg{
        width: 20px;
        height: 20px;
    }
}
</style>