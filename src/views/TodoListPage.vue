<template>
  <div class="wrap">
    <div class="container">
      <h3>Schedule</h3>
      <div class="card-container">
        <div class="card input">
          <input
            type="text"
            placeholder="Text your to do Task"
            class="taskContent"
            v-model="taskInput"
          />
          <a href="#" class="btn_add" @click.prevent="addTask">+</a>
        </div>
        <div class="card card_list">
          <ul class="tab">
            <li
              :class="{ active: tabStatus.ALL }"
              data-tab="all"
              @click="toggleTab('ALL')"
            >
              All
            </li>
            <li
              :class="{ active: tabStatus.WIP }"
              data-tab="wip"
              @click="toggleTab('WIP')"
            >
              Unfinished
            </li>
            <li
              :class="{ active: tabStatus.DONE }"
              data-tab="finished"
              @click="toggleTab('DONE')"
            >
              Finished
            </li>
          </ul>
          <div class="cart_content">
            <ul class="list">
              <li v-for="item in filteredData" :key="item.id">
                <label class="checkbox" for="checkbox">
                  <div class="taskItem-container" @click="toggleTask(item.id)">
                    <input
                      type="checkbox"
                      name="checkbox"
                      :checked="item.completed_at"
                    />
                    <span class="cart_content_taskName"
                      >{{ item.content }}
                    </span>
                  </div>
                </label>
                <a
                  href="#"
                  class="delete"
                  @click.prevent="deleteTask(item.id)"
                ></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="list_footer">
        <p>{{ countUnfinishedTasks }}</p>
        <a href="#" @click.prevent="deleteAllFinishedTasks"
          >Clear All Finished Tasks</a
        >
        {{ test }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/TodoList.scss";
</style>

<script>
export default {
  props: ["test"],
  data() {
    return {
      apiUrl: "https://todoo.5xcamp.us",
      taskData: [],
      taskInput: "",
      status: "ALL",
      tabStatus: {
        ALL: true,
        WIP: false,
        DONE: false,
      },
    };
  },
  methods: {
    addTask() {
      console.log("addTask!");
      if (this.taskInput.trim() == "") {
        alert("Task name should not be empty！");
        return;
      } else {
        this.addToDos(this.taskInput);
        this.taskContent = {};
        this.taskInput = "";
      }
    },

    deleteTask(id) {
      this.taskData.forEach((item, i) => {
        if (item.id == id) {
          this.taskData.splice(i, 1);
          this.delToDos(id);
        }
      });
    },

    toggleTab(status) {
      Object.keys(this.tabStatus).forEach((item) => {
        this.tabStatus[item] = false;
      });
      this.tabStatus[status] = true;
      this.status = status;
    },

    deleteAllFinishedTasks() {
      this.taskData.forEach((item, i) => {
        if (item.isChecked == true) {
          this.taskData.splice(i);
        }
      });
    },

    // AJAX methods
    getToDos() {
      return new Promise((resolve, reject) => {
        this.$http
          .get(`${this.apiUrl}/todos`)
          .then((res) => {
            console.log(res.data.todos);
            this.taskData = res.data.todos;
            resolve(res);
          })
          .catch((error) => {
            console.log(error.response);
            reject(error.response);
          });
      });
    },

    addToDos(toDoContent) {
      return new Promise((resolve, reject) => {
        this.$http
          .post(`${this.apiUrl}/todos`, {
            todo: {
              content: toDoContent,
            },
          })
          .then((res) => {
            console.log(res.data);
            this.getToDos();
            resolve(res.data);
          })
          .catch((error) => {
            console.log(error.response);
            reject(error.response);
          });
      });
    },
    toggleTask(taskId) {
      return new Promise((resolve, reject) => {
        this.$http
          .patch(`${this.apiUrl}/todos/${taskId}/toggle`, {})
          .then((res) => {
            console.log(res.data);
            resolve(res.data);
          })
          .catch((error) => {
            console.log(error.response);
            this.getToDos();
            reject(error.response);
          });
      });
    },
    delToDos(taskId) {
      return new Promise((resolve, reject) => {
        this.$http
          .delete(`${this.apiUrl}/todos/${taskId}`)
          .then((res) => {
            console.log(res.data);
            resolve();
          })
          .catch((error) => {
            console.log(error.response);
            reject(error.response);
          });
      });
    },
  },
  computed: {
    filteredData() {
      console.log("filteredData!");
      console.log(this.taskData.filter((item) => item.completed_at != null));
      if (this.status === "DONE") {
        return this.taskData.filter((item) => item.completed_at != null);
      } else if (this.status === "WIP") {
        return this.taskData.filter((item) => item.completed_at == null);
      } else {
        return this.taskData;
      }
    },
    countUnfinishedTasks() {
      let unfinishedTask = this.taskData.filter((item) => {
        return item.completed_at == null;
      });
      return unfinishedTask.length + " Unfinished tasks";
    },
  },
  created() {
    this.getToDos();
  },
};
</script>
