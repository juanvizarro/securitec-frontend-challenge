<script setup lang="ts">
    import { ref } from 'vue'
    import { EyeOutlined, RocketOutlined, RadarChartOutlined, SyncOutlined, CalendarOutlined, BarChartOutlined, ProfileOutlined } from '@ant-design/icons-vue'

    const selectedKeys = ref(['1'])
</script>
<template>
    <a-layout-sider :collapsed="true" class="contact-sider">
        <a-menu v-model:selectedKeys="selectedKeys" mode="inline">
            <a-menu-item key="1">
                <EyeOutlined/>
            </a-menu-item>
            <a-menu-item key="2">
                <RocketOutlined />
            </a-menu-item>
            <a-menu-item key="3">
                <RadarChartOutlined />
            </a-menu-item>
            <a-menu-item key="3">
                <SyncOutlined />
            </a-menu-item>
            <a-menu-item key="4">
                <ProfileOutlined />
            </a-menu-item>
            <a-menu-item key="5">
                <CalendarOutlined />
            </a-menu-item>
            <a-menu-item key="6">
                <BarChartOutlined />
            </a-menu-item>
        </a-menu>
    </a-layout-sider>
</template>
<style lang="scss">
.contact-sider{
    background: white!important;
    box-shadow: 0px 2px 8px 0px #00000026;
    .ant-menu-item{
        color: #8C8C8C!important;
    }
    .ant-menu-item-selected{
        background-color: #FADB14!important;
        color: black!important;
    }
}
</style>