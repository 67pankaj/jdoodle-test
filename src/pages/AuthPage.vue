<template>
  <q-page class="q-pa-md flex">
    <div class="auth-banner-container col q-pa-lg column flex-center">
      <img class="banner-img" src="/img/auth_banner.svg" />
      <div class="text-h2 text-weight-medium text-grey-8">
        Join the movement.
        <br />
        <span class="text-h3 text-weight-light text-blue-grey-7"
          >Explore and expand your skills with challenges.</span
        >
      </div>
    </div>
    <div class="col q-pa-lg flex flex-center">
      <q-tab-panels
        v-model="panel"
        class="form-panels col-5 bg-white q-pa-md rounded-borders-sm shadow-4"
        animated
        transition-next="scale"
        transition-prev="scale"
      >
        <!-- section start: signin panel -->
        <q-tab-panel class="no-padding" name="signin">
          <!-- signin panel header  -->
          <div class="q-pa-md">
            <div class="column flex-center">
              <q-icon
                color="secondary"
                name="fa-solid fa-right-to-bracket"
                size="1.5rem"
              />
              <div class="text-center">
                <div class="text-grey-10 text-h6 text-weight-thick font-header">
                  Welcome!
                </div>
                <div class="text-grey-7">Sign in to your account</div>
              </div>
            </div>
          </div>

          <!-- signin panel form -->
          <q-form
            ref="signinForm"
            autocapitalize="off"
            autocomplete="off"
            autocorrect="off"
            spellcheck="false"
            @submit.prevent="onSignin"
          >
            <div class="q-pa-md">
              <div>
                <q-input
                  v-model="signinModel.email"
                  :rules="[(val) => isEmail(val) || 'Enter valid email']"
                  dense
                  label="Email"
                  lazy-rules
                  no-error-icon
                  required
                  type="email"
                >
                  <template v-slot:append>
                    <q-icon
                      class="cursor-pointer"
                      color="dark-dim1"
                      name="fa-regular fa-envelope"
                      size="1rem"
                    />
                  </template>
                </q-input>
              </div>
              <div>
                <q-input
                  v-model="signinModel.password"
                  :rules="[
                    (val) =>
                      (val && val.length >= 6) ||
                      'Password must be 6 characters or long'
                  ]"
                  :type="signinModel.viewPassword ? 'text' : 'password'"
                  dense
                  label="Password"
                  lazy-rules
                  no-error-icon
                  required
                >
                  <template v-slot:append>
                    <q-icon
                      class="cursor-pointer"
                      :name="
                        !!signinModel.viewPassword
                          ? 'fa-regular fa-eye-slash'
                          : 'fa-regular fa-eye'
                      "
                      color="dark-dim1"
                      size="1rem"
                      @click.prevent="
                        signinModel.viewPassword = !signinModel.viewPassword
                      "
                    />
                  </template>
                </q-input>
              </div>
              <div class="row justify-end q-mt-sm">
                <span class="text-body2 cursor-pointer text-blue-8"
                  >Forgot password?</span
                >
              </div>
            </div>
            <div class="q-pa-md">
              <q-btn
                class="full-width text-subtitle2"
                color="secondary"
                icon-right="fa-solid fa-arrow-right"
                label="Sign in"
                no-caps
                type="submit"
              />
              <q-btn
                class="full-width text-subtitle2 text-weight-medium q-mt-md"
                color="primary"
                icon-right="eva-google"
                label="Sign in with Google"
                no-caps
              />
              <div
                class="q-pt-sm text-center text-body2 text-grey-7 text-weight-light"
              >
                Don't have an account?
                <span
                  class="text-primary cursor-pointer text-weight-regular"
                  @click="panel = 'signup'"
                  >Signup</span
                >
              </div>
            </div>
          </q-form>
        </q-tab-panel>
        <!-- section end: signin panel -->

        <!-- section start: signup panel -->
        <q-tab-panel class="no-padding" name="signup">
          <!-- signup panel header  -->
          <div class="q-pa-md">
            <div class="column flex-center">
              <q-icon
                color="secondary"
                name="fa-solid fa-user-plus"
                size="1.5rem"
              />
              <div class="text-center">
                <div class="text-grey-10 text-h6 text-weight-thick font-header">
                  Create account!
                </div>
                <div class="text-grey-7">Enter details to continue</div>
              </div>
            </div>
          </div>

          <!-- signup panel form -->
          <q-form
            ref="signupForm"
            autocapitalize="off"
            autocomplete="off"
            autocorrect="off"
            spellcheck="false"
            @submit.prevent="onSignup"
          >
            <div class="q-pa-md">
              <div>
                <q-input
                  v-model="signupModel.name"
                  :mask="'S'.repeat(30)"
                  :rules="[
                    (val) => (val && val.length > 0) || 'Enter valid name'
                  ]"
                  dense
                  label="Name"
                  lazy-rules
                  no-error-icon
                  required
                >
                  <template v-slot:append>
                    <q-icon
                      class="cursor-pointer"
                      color="dark-dim1"
                      name="fa-regular fa-user"
                      size="1rem"
                    />
                  </template>
                </q-input>
                <q-input
                  v-model="signupModel.email"
                  :rules="[(val) => isEmail(val) || 'Enter valid email']"
                  dense
                  label="Email"
                  lazy-rules
                  no-error-icon
                  required
                  type="email"
                >
                  <template v-slot:append>
                    <q-icon
                      class="cursor-pointer"
                      color="dark-dim1"
                      name="fa-regular fa-envelope"
                      size="1rem"
                    />
                  </template>
                </q-input>
              </div>
              <div>
                <q-input
                  v-model="signupModel.password"
                  :rules="[
                    (val) =>
                      (val && val.length >= 6) ||
                      'Password must be 6 characters or long'
                  ]"
                  :type="signupModel.viewPassword ? 'text' : 'password'"
                  dense
                  label="Password"
                  lazy-rules
                  no-error-icon
                  required
                >
                  <template v-slot:append>
                    <q-icon
                      class="cursor-pointer"
                      :name="
                        !!signupModel.viewPassword
                          ? 'fa-regular fa-eye-slash'
                          : 'fa-regular fa-eye'
                      "
                      color="dark-dim1"
                      size="1rem"
                      @click.prevent="
                        signupModel.viewPassword = !signupModel.viewPassword
                      "
                    />
                  </template>
                </q-input>
              </div>
            </div>
            <div class="q-pa-md">
              <q-btn
                class="full-width text-subtitle2"
                color="secondary"
                icon-right="fa-solid fa-arrow-right"
                label="Sign up"
                no-caps
                type="submit"
              />
              <q-btn
                class="full-width text-subtitle2 text-weight-medium q-mt-md"
                color="primary"
                icon-right="eva-google"
                label="Sign up with Google"
                no-caps
              />
              <div
                class="q-pt-sm text-center text-body2 text-grey-7 text-weight-light"
              >
                Already have an account?
                <span
                  class="text-primary cursor-pointer text-weight-regular"
                  @click="panel = 'signin'"
                  >Signin</span
                >
              </div>
            </div>
          </q-form>
        </q-tab-panel>
        <!-- section end: signup panel -->
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup>
  import { useAuthStore } from 'stores/auth';
  import isEmail from 'validator/es/lib/isEmail';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const authStore = useAuthStore();
  const router = useRouter();

  const panel = ref('signin');

  const signupForm = ref(null);
  const signinForm = ref(null);

  const signupModel = ref({
    name: '',
    email: '',
    password: '',
    viewPassword: false
  });

  const signinModel = ref({
    email: '',
    password: '',
    viewPassword: false
  });

  const onSignup = () => {
    signupForm.value.validate().then(async (success) => {
      if (success) {
        const result = await authStore.signup(signupModel.value);
        result && router.push({ name: 'home' });
      }
    });
  };

  const onSignin = () => {
    signinForm.value.validate().then(async (success) => {
      if (success) {
        const result = await authStore.signin(signinModel.value);
        result && router.push({ name: 'home' });
      }
    });
  };
</script>

<style lang="scss" scoped>
  .auth-banner-container {
    padding-left: 128px;
  }
  .form-panels {
    border: 1px solid rgba($grey-10, 0.33);
  }
  .banner-img {
    max-width: 360px;
  }
</style>
