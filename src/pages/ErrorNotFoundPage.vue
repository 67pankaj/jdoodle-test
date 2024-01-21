<template>
  <div
    class="fullscreen bg-grey-2 text-grey-8 text-center q-pa-xl flex flex-center"
  >
    <div class="column flex-center q-gutter-y-md">
      <img src="/img/404_not_found.svg" style="max-width: 240px" />
      <div style="font-size: 24vh">404</div>

      <div class="text-h4 text-blue-grey-8" style="opacity: 0.5">
        I think I'm lost...
      </div>

      <q-btn
        class="text-weight-medium"
        :to="{ name: 'home' }"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>
