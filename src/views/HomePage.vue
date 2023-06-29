<template>
  <div class="wrap">
    <Navbar />
    <div
      class="landing-search-container bg-light"
      style="position: absolute; z-index: 10"
    >
      <div class="landing-search-container-content">
        <h2 class="landing-search-container-title">Greetings, Sir!</h2>
        <p class="landing-search-container-sub-title">
          由 Alfred 來為你規劃每日的行程。
        </p>
        <label for="landing-search-container-input">
          <input
            type="text"
            class="landing-search-container-input"
            id="landing-search-container-input"
            placeholder="  輸入您的稱謂"
            v-model="userName"
          />
        </label>
      </div>
      <div class="landing-locate-position-container position-relative">
        <h3 class="landing-locate-position-title">規劃每日行程！</h3>
        <p class="landing-locate-position-sub-title">
          精簡的 Dashboard 讓您一目瞭然。
        </p>
        <button
          type="button"
          class="landing-locate-position-btn custom-map-control-button btn btn-dark"
          @click="isModalOpen = !isModalOpen"
        >
          立刻使用！
        </button>
      </div>
    </div>
    <div class="alfred-figure-container">
      <img src="../assets/images/buter-cover.png" alt="alfred-cover" />
    </div>
    <FooterContainer />
  </div>
  <LoginPageModal ref="loginPageModal" :isModalOpen="isModalOpen"></LoginPageModal>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/NavBar.vue";
import FooterContainer from "@/components/FooterContainer.vue";
import LoginPageModal from "@/components/LoginPageModal.vue";

export default {
  name: "HomeView",
  components: {
    Navbar,
    FooterContainer,
    LoginPageModal,

  },
  data() {
    return {
      isModalOpen: false,
      userName: "",
    }
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  background-color: lightgrey;
  height: 100vh;
  width: 100%;
  margin-bottom: -50px;
}
.landing-search-container {
  width: 40vw;
  margin-top: 5%;
  margin-left: 5%;
  padding-bottom: 3%;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 40px;
}

.landing-search-container-title {
  font-size: 50px;
  margin-top: 10%;
  margin-left: 10%;
}
.landing-search-container-sub-title {
  font-size: 25px;
  margin-left: 10%;
}
.landing-search-container-input {
  width: 32vw;
  height: 6vh;
  border-radius: 10px;
  margin-left: 12%;
}
.landing-locate-position-container {
  width: 32.5vw;
  margin-top: 3%;
  margin-left: 9%;
  border-radius: 12px;
  background-color: #323232;
  display: flex;
  flex-flow: column;
}
.landing-locate-position-title {
  font-size: 20px;
  margin-left: 5%;
  margin-top: 5%;
  color: white;
}

.landing-locate-position-sub-title {
  font-size: 15px;
  margin-left: 5%;
  color: white;
}

.landing-locate-position-btn {
  position: absolute;
  left: 70%;
  top: 30%;
}

.alfred-figure-container img {
  height: 90vh;
  margin-left: 50%;
}

</style>
