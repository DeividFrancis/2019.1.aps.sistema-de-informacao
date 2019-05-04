<template>
<v-app>
    <nuxt/>
</v-app>
</template>

<script>
export default {
    data() {
        return {
            clipped: true,
            drawer: true,
            fixed: false,
            items: [{
                    icon: 'home',
                    title: 'Dashboard',
                    to: '/dashboard'
                },
                {
                    icon: 'pets',
                    title: 'Animal',
                    to: '/animal'
                },
                {
                    icon: 'apps',
                    title: 'Welcome',
                    to: '/'
                },
                {
                    icon: 'bubble_chart',
                    title: 'Inspire',
                    to: '/inspire'
                }
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'AgroBov'
        }
    }
}
</script>
