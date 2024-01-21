<template>
  <q-header class="app-header" elevated>
    <q-toolbar class="items-center q-py-xs">
      <div class="cursor-pointer" @click="router.push({ name: 'home' })">
        <img class="brand-img" src="~assets/jdoodle.png" />
      </div>

      <q-space />

      <!-- user profile dropdown -->
      <div
        class="row items-center no-wrap q-gutter-x-sm overflow-hidden cursor-pointer"
        style="max-width: 320px"
      >
        <q-avatar
          class="user-avatar"
          color="primary"
          size="32px"
          text-color="primary"
        >
          <img v-if="!!photoURL" :src="photoURL" />
          <img v-else src="~assets/user-avatar.jpg" />
        </q-avatar>
        <div class="gt-sm col column no-wrap text-body2">
          <div class="text-weight-medium ellipsis">{{ displayName }}</div>
          <div class="text-grey-4 text-weight-light ellipsis">
            {{ email }}
          </div>
        </div>
        <!-- profile menu -->
        <q-menu
          :offset="[0, 16]"
          anchor="bottom right"
          auto-close
          content-class="overflow-hidden"
          self="top right"
          transition-hide="jump-up"
          transition-show="jump-down"
        >
          <q-list
            class="text-body2 text-grey-8 rounded-borders shadow-7"
            separator
            style="min-width: 180px; width: 100vw; max-width: 256px"
          >
            <q-item class="lt-md q-py-md">
              <q-item-section>
                <q-item-label class="text-body2 text-weight-medium ellipsis">{{
                  displayName
                }}</q-item-label>
                <q-item-label class="text-body1 text-grey-5 ellipsis">{{
                  email
                }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item :to="{ name: 'results' }" clickable>
              <q-item-section avatar>
                <q-icon name="eva-people-outline" />
              </q-item-section>
              <q-item-section> Scoreboard </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section avatar>
                <q-icon name="eva-person-outline" />
              </q-item-section>
              <q-item-section>My Account</q-item-section>
            </q-item>
            <q-item clickable @click="onSignout">
              <q-item-section avatar>
                <q-icon name="eva-log-out-outline" />
              </q-item-section>
              <q-item-section>Sign out</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup>
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from 'stores/auth';
  import { useUserStore } from 'stores/user';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const authStore = useAuthStore();

  const userStore = useUserStore();
  const { userDetails } = storeToRefs(userStore);
  const { email, displayName, photoURL } = userDetails.value ?? {};

  const onSignout = async () => {
    const result = await authStore.signout();
    result && router.push({ name: 'auth' });
  };
</script>

<style lang="scss" scoped>
  .app-header {
    background: linear-gradient(to left, $green-9, $cyan-9);
  }
  .brand-img {
    max-height: 48px;
  }
</style>
