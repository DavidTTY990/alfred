<template>
  <div class="wrap">
    <div class="container-fluid">
      <div class="row bg-dark text-light p-4">
        <div class="col">
          <h3 class="dashboard-title">The Dashboard Page.</h3>
          <!-- <div class="weather-widget"></div> -->
        </div>
      </div>
    </div>
    <div class="dashboard-content d-flex justify-content-between">
      <div class="info-menu-container">
        <div class="user-info-container d-flex flex-column align-items-center">
          <div class="user-info-title">Hello, David Tsai</div>
          <div class="user-img"></div>
        </div>
        <div
          class="list-group-container mt-5 text-center d-flex flex-column align-items-center"
        >
          <div class="list-group list-group-flush w-75">
            <router-link
              to="/dashboardpage/overview"
              class="list-group-item list-group-item-action"
              >Overview</router-link
            >
            <router-link
              to="/dashboardpage/mytodolist"
              class="list-group-item list-group-item-action"
              >Schedule</router-link
            >
            <button
              class="list-group-item list-group-item-danger list-group-item-action"
              @click="signOut"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
      <div class="router-view-container w-75 mt-3">
        <router-view></router-view>
      </div>
    </div>
    <FooterContainer />
  </div>
</template>

<script>
import FooterContainer from "@/components/FooterContainer.vue";

export default {
  components: {
    FooterContainer,
  },
  data() {
    return {
      apiUrl: "https://todoo.5xcamp.us",
    };
  },
  methods: {
    signOut() {
      this.$http
        .delete(`${this.apiUrl}/users/sign_out`)
        .then((res) => {
          console.log(res);
          this.$router.push('/')
          // taskData = [];
          this.$http.defaults.headers.common['Authorization'] = "";
        })
        .catch((error) => console.log(error.response));
    },
  },
};
</script>

<style scoped>
.dashboard-title {
  font-size: 50px;
  font-weight: bold;
}

.dashboard-content {
  height: 76.2vh;
}

.info-menu-container {
  margin-top: 2%;
}

.user-info-title {
  font-size: 40px;
}

.user-img {
  height: 200px;
  width: 200px;
  background-color: lightgrey;
  border-radius: 100px;
  margin-top: 2%;
}

.info-menu-container {
  width: 30%;
}

.list-group-container {
  font-size: 20px;
}

.router-view-container {
  width: 50%;
}
</style>