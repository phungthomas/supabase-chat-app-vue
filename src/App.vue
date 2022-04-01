<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  watch: {
    "$store.state.user": function (user) {
      this.$router.replace(user ? "/chat" : "/");
    },
  },
  mounted() {
    this.supabase.auth.onAuthStateChange(async (event) => {
      switch (event) {
        case "SIGNED_IN": {
          let user = this.supabase.auth.user();
          let userResponse = await this.supabase
            .from("profiles")
            .select()
            .eq("id", user.id);

          await this.$store.dispatch(
            "setUsername",
            userResponse.data[0]?.username
          );

          await this.$store.dispatch("setUser", user);
          break;
        }
        case "SIGNED_OUT":
          await this.$store.dispatch("setUser", null);
          break;
      }
    });

    this.$store.dispatch("setUser", this.supabase.auth.user());
  },
  components: {},
};
</script>

<style>
</style>
