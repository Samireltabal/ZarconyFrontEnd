<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <!-- Container wrapper -->
  <div class="container-fluid">
    <!-- Toggle button -->
    <button
      class="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-bars"></i>
    </button>

    <!-- Collapsible wrapper -->
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <!-- Navbar brand -->
      <a class="navbar-brand mt-2 mt-lg-0" href="#">
        <img
          src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png"
          height="15"
          alt=""
          loading="lazy"
        />
      </a>
      <!-- Left links -->
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li v-for="menuItem in nav" :key="menuItem.text" class="nav-item" :class="handleVisibility(menuItem)">
                <router-link class="nav-link" :to="menuItem.link">
                  {{ menuItem.text }}  
                </router-link>  
            </li>
      </ul>
      <!-- Left links -->
    </div>
    <!-- Collapsible wrapper -->

    <!-- Right elements -->
    <div class="d-flex align-items-center">
      <!-- Notifications -->
      <b-nav-item-dropdown v-if="loggedIn" right class="d-flex align-items-center hidden-arrow">
        <template #button-content>
          <a
            class="text-reset me-3 dropdown-toggle hidden-arrow"
            id="navbarDropdownMenuLink"
          >
            <i class="mdi mdi-bell" v-if="loggedIn"></i>
            <span v-if="loggedIn" class="badge rounded-pill badge-notification bg-danger" :class="user ? '' : 'done'">
              {{ user.unread_notifications ? user.unread_notifications.length : '0' }}
            </span>
          </a>
        </template>
        <b-dropdown-item> Notifications </b-dropdown-item>
        <b-dropdown-item v-for="notification in user.notifications" :key="notification.id">{{ notification.data }}</b-dropdown-item>
      </b-nav-item-dropdown>
    
      <!-- Avatar -->
      <b-nav-item-dropdown v-if="loggedIn" right class="d-flex align-items-center hidden-arrow">
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <img
              :src="user.avatar"
              class="rounded-circle"
              height="25"
              :alt="user.name"
              
              loading="lazy"
            />
          </template>
          <b-dropdown-item link to="/profile">Profile</b-dropdown-item>
          <b-dropdown-item link to="/logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
    </div>
    <!-- Right elements -->
  </div>
  <!-- Container wrapper -->
</nav>
</template>
<script>
 export default {
   name: 'ZarconyHeader',
    data () {
      return {
        showAvatarMenu: false,
        nav: [
          {
            text: 'Home',
            link: '/'
          },
          {
            text: 'Login',
            link: '/login',
            guest_only: true
          },
          {
            text: 'Signup',
            link: '/signup',
            guest_only: true
          },
          {
            text: 'Admin Panel',
            link: '/admin',
            registered_only: true,
            admin_only: true
          },
          {
            text: 'Wallet',
            link: '/wallet',
            registered_only: true
          },
          {
            text: 'Logout',
            link: '/logout',
            registered_only: true
          }
        ]
      }
    },
    computed: {
      loggedIn () {
        return this.$store.state.$auth.loggedIn
      },
      user () {
        return this.$store.state.$auth.user
      }
    },
    mounted () {
      console.log('header mounted')
    },
    methods: {
      handleVisibility (item) {
        if (this.loggedIn && item.guest_only) {
          return 'd-none'
        }
        if (!this.loggedIn && item.registered_only) {
          return 'd-none'
        }
        if (item.admin_only && this.user.role !== 'admin') {
          return 'd-none'
        }
      }
    }
 }
</script>
