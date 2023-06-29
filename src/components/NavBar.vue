<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">Alfred | Your Personal Butler</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Features</a>
          </li>
        </ul>
        <button
          class="btn btn-light me-3"
          type="button"
          @click="isModalOpen = !isModalOpen"
        >
          Log in
        </button>
        <span class="navbar-text me-3"> Sign up </span>
      </div>
    </div>
  </nav>
  <LoginPageModal ref="loginPageModal" :isModalOpen="isModalOpen"></LoginPageModal>
</template>

<script>
import LoginPageModal from "@/components/LoginPageModal.vue";

export default {
  components: {
    LoginPageModal,
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
};
</script>
