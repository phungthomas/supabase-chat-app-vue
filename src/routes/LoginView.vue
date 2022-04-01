<template>
  <div>
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-lg-6">
          <div class="card mt-3">
            <div class="card-body">
              <form v-if="!loading">
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label"
                    >Email address</label
                  >
                  <input
                    type="email"
                    v-model="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                  <div id="emailHelp" class="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <button
                  @click="login"
                  :disabled="loading"
                  class="btn btn-primary"
                >
                  Login
                </button>
              </form>
              <div v-else>
                <p class="lead">An email has been sent to you.</p>
                <p>To connect, please click on the URL in the mail.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      email: "",
    };
  },
  methods: {
    async login() {
      this.loading = true;
      await this.supabase.auth.signIn({
        email: this.email,
      }, {
          test: 'test'
      });
    },
  },
};
</script>

<style>
</style>