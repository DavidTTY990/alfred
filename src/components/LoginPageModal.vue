<template>
  <div class="modal" tabindex="-1" ref="modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">登入或註冊 Alfred</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="closeModal"
          ></button>
        </div>
        <div class="modal-body" v-if="pageStatus == 'login'">
          <p class="text-center">輸入帳號與密碼</p>
          <div class="container-fluid d-flex flex-column align-items-center">
            <div class="mb-3">
              <label
                for="exampleFormControlInput1"
                class="form-label text-center"
                >Account
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                  v-model="loginAccount"
                />
              </label>
            </div>
            <div class="mb-4">
              <label
                for="exampleFormControlInput1"
                class="form-label text-center"
                >Password
                <input
                  type="password"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="**********"
                  v-model="loginPassword"
                />
              </label>
            </div>
            <div class="mb-3 w-50">
              <button class="btn btn-bright border w-100" type="button">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="google-icon"
                  class="w-25 me-2"
                />使用 Google 登入
              </button>
            </div>
            <div>
              <a href="#" class="link-dark" @click="pageStatus = 'signIn'">還沒有帳號嗎？馬上註冊！</a>
            </div>
          </div>
        </div>
        <div class="modal-body" v-if="pageStatus == 'signIn'">
          <p class="text-center">輸入帳號與密碼</p>
          <div class="container-fluid d-flex flex-column align-items-center">
            <div class="mb-3">
              <label
                for="exampleFormControlInput1"
                class="form-label text-center"
                >Account
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                  v-model="signInAccount"
                />
              </label>
            </div>
            <div class="mb-4">
              <label
                for="exampleFormControlInput1"
                class="form-label text-center"
                >Password
                <input
                  type="password"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="**********"
                  v-model="signInPassword"
                />
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
            登入
          </button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "bootstrap/js/dist/modal";

export default {
  props: ["isModalOpen"],
  data() {
    return {
      modal: {},
      loginAccount: "",
      loginPassword: "",
      signInAccount: "",
      signInPassword: "",
      pageStatus: 'login'
    };
  },
  mothods: {
    showModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },

  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
  },
  watch: {
    isModalOpen() {
      // console.log(newVal, oldVal);
      this.modal.show();
    },
  },
};
</script>
