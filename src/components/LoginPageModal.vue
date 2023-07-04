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
            @click="hideModal"
          ></button>
        </div>
        <div class="modal-body" v-if="loginPageStatus == 'login'">
          <div class="container-fluid d-flex flex-column align-items-center">
            <p class="text-center">輸入帳號與密碼</p>
            <div class="mb-3">
              <label for="loginAccount" class="form-label text-center"
                >Account
                <input
                  type="email"
                  class="form-control"
                  id="loginAccount"
                  placeholder="name@example.com"
                  v-model="user.loginAccount"
                />
              </label>
            </div>
            <div class="mb-4">
              <label for="loginPassword" class="form-label text-center"
                >Password
                <input
                  type="password"
                  class="form-control"
                  id="loginPassword"
                  placeholder="**********"
                  v-model="user.loginPassword"
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
              <a href="#" class="link-dark" @click="loginPageStatus = 'signIn'"
                >還沒有帳號嗎？馬上註冊！</a
              >
            </div>
          </div>
        </div>
        <div class="modal-body" v-else>
          <div class="container-fluid d-flex flex-column align-items-center">
            <p class="text-center">輸入帳號與密碼</p>
            <div class="mb-3">
              <label for="signInAccount" class="form-label text-center"
                >Account
                <input
                  type="email"
                  class="form-control"
                  id="signInAccount"
                  placeholder="name@example.com"
                  v-model="user.signUpAccount"
                />
              </label>
            </div>
            <div class="mb-3">
              <label for="signInPassword" class="form-label text-center"
                >Password
                <input
                  type="password"
                  class="form-control"
                  id="signInPassword"
                  placeholder="**********"
                  v-model="user.signUpPassword"
                />
              </label>
            </div>
            <div class="mb-4">
              <label for="signInNickname" class="form-label text-center"
                >您的暱稱
                <input
                  type="text"
                  class="form-control"
                  id="signInNickname"
                  placeholder="Your Nickname"
                  v-model="user.userNickname"
                />
              </label>
            </div>
            <a href="#" class="link-dark" @click="loginPageStatus = 'login'"
              >我有帳號了，回到登入</a
            >
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="login(this.user.loginAccount, this.user.loginPassword)"
            v-if="loginPageStatus == 'login'"
          >
            登入
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="
              signUp(
                this.user.signUpAccount,
                this.user.userNickname,
                this.user.signUpPassword
              )
            "
            v-else
          >
            註冊
          </button>
          <button
            type="button"
            class="btn btn-danger"
            data-bs-dismiss="modal"
            @click="hideModal"
          >
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
  data() {
    return {
      modal: {},
      loginPageStatus: "login",
      apiUrl: "https://todoo.5xcamp.us",
      user: {
        loginAccount: "",
        loginPassword: "",
        signUpAccount: "",
        signUpPassword: "",
        userNickname: "",
        customUserName: "",
      },
    };
  },
  methods: {
    showModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
      this.loginPageStatus = "login";
    },
    signUp(acc, nickName, pwd) {
      this.$http
        .post(`${this.apiUrl}/users`, {
          user: {
            email: acc,
            nickname: nickName,
            password: pwd,
          },
        })
        .then((res) => {
          console.log(res);
          this.$http.defaults.headers.common["Authorization"] =
            res.headers.authorization;
          this.user.signUpAccount = "";
          this.user.signUpPassword = "";
          this.$router.push("/dashboardpage/overview");
        })
        .catch((error) => console.log(error.response));
    },
    login(acc, pwd) {
      this.$http
        .post(`${this.apiUrl}/users/sign_in`, {
          user: {
            email: acc,
            password: pwd,
          },
        })
        .then((res) => {
          console.log(res);
          this.user.customUserName = res.data.nickname;
          this.$emitter.emit("customUserName", this.user.customUserName)
          this.$http.defaults.headers.common["Authorization"] =
            res.headers.authorization;
          this.user.loginAccount = "";
          this.user.loginPassword = "";
          this.$router.push("/dashboardpage/overview");
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
    this.$emitter.on("openModal", () => {
      this.showModal();
    });
  },
  beforeUnmount() {
    this.$emitter.off("openModal", () => {
      this.showModal();
    });
  },
};
</script>
