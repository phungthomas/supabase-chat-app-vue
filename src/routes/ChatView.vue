
<template>
  <div>
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <button @click="logout" class="btn btn-danger">Logout</button>
        </div>
      </div>
      <div class="row justify-content-md-center">
        <div class="col-lg-6">
          <div class="card mt-3 p-3">
            <div v-if="$store.state.username">
              <div class="row">
                <div class="col-4">
                  <div class="list-group">
                    <button
                      @click="currentProfileId = profile.id"
                      v-for="profile in profiles"
                      :key="profile.id"
                      :class="{ active: profile.id == currentProfileId }"
                      type="button"
                      class="list-group-item list-group-item-action"
                      aria-current="true"
                    >
                      {{ profile.username }}
                    </button>
                  </div>
                </div>
                <div class="col-8">
                  <div style="height: 300px; overflow-y: scroll" id="messages">
                    <ul class="list-group">
                      <li

                        v-for="message in messages"
                        :key="message.id"
                        class="list-group-item"
                        :class="{'text-end': message.to_user_id == currentProfileId}"
                      >
                        {{ message.message }}
                      </li>
                    </ul>
                  </div>
                  <div class="d-flex flex-row mt-3">
                    <div class="flex-fill me-2">
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        v-model="message"
                      />
                    </div>
                    <div class="">
                      <button
                        @click="sendMessage"
                        class="btn btn-block btn-primary"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <p class="lead">Please choose a username</p>
              <input
                type="text"
                class="form-control mb-2"
                id="exampleFormControlInput1"
                placeholder="MyUserName"
                v-model="username"
              />
              <button @click="createUsername" class="btn btn-primary">
                Set username
              </button>
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
      username: "",
      message: "",
      profiles: [],
      messages: [],
      currentProfileId: null,
      subscription: null,
    };
  },
  watch: {
    "$store.state.username": async function (username) {
      if (username) {
        await this.loadProfiles();
        this.subscription = await this.supabase
          .from("messages")
          .on("INSERT", (data) => {
            this.messages.push(data.new);
            this.$nextTick(() => {
              this.updateScroll();
            });
          })
          .subscribe();
      }
    },
    async currentProfileId(id) {
      let data = await this.supabase
        .from("messages")
        .select()
        .or(`from_user_id.eq.${id},to_user_id.eq.${id}`);
      this.messages = data.data;
      this.$nextTick(() => {
        this.updateScroll();
      });
    },
  },
  methods: {
    updateScroll() {
      let element = document.getElementById("messages");
      element.scrollTop = element.scrollHeight;
    },
    async createUsername() {
      console.log(
        await this.supabase
          .from("profiles")
          .upsert([{ username: this.username }])
      );
      await this.$store.dispatch("setUsername", this.username);
    },
    async sendMessage() {
      await this.supabase.rpc("send_message", {
        to_user_id: this.currentProfileId,
        message: this.message,
      });
    },
    async logout() {
      this.supabase.auth.signOut();
    },
    async loadProfiles() {
      this.profiles = (await this.supabase.from("profiles").select()).data;
    },
  },
  beforeUnmount() {
    this.supabase.removeSubscription(this.subscription);
  },
};
</script>

<style>
</style>