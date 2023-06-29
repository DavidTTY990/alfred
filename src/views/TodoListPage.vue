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
              <div class="head-bar-container" v-if="taskData != ''">
                <div class="taskName">Task Name</div>
                <div class="category-tag">Categories</div>
                <div class="deadLine">Deadline</div>
                <div class="createTime">Created Time</div>
              </div>
              <li
                v-for="(item, index) in filteredData"
                :key="item.id"
                @click="toggleTask(item.id)"
              > {{ index }}
                <div class="taskItem-container">
                  <label class="checkbox" for="">
                    <input type="checkbox" />
                    <span class="cart_content_taskName">{{ item.name }}</span>
                  </label>
                  <span class="cart_content_categories_tag">
                    <label for="cars">
                      <select name="cars" id="cars" v-model="taskTag">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option>
                      </select>
                    </label>
                  </span>
                  <span class="cart_content_deadline">
                    <VueDatePicker
                      v-model="taskDeadLine"
                      :teleport="true"
                      placeholder="Select Date"
                      :offset="10"
                      @change="setDeadLine(index)"
                    ></VueDatePicker>
                  </span>
                  <span class="cart_content_createdTime">{{
                    item.createdTime
                  }}</span>
                </div>
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
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/TodoList.scss";
</style>

<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  components: { VueDatePicker },
  data() {
    return {
      taskData: [],
      taskInput: "",
      taskTag: "",
      taskDeadLine: null,
      taskContent: {},
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
      if (this.taskInput.trim() == "") {
        alert("Task name should not be empty！");
        return;
      } else {
        this.taskContent = {
          name: this.taskInput,
          isChecked: false,
          id: new Date().getTime(),
          createdTime: new Date().toLocaleString(),
        };
        this.taskData.push(this.taskContent);
        this.taskContent = {};
        this.taskInput = "";
      }
    },
    deleteTask(id) {
      this.taskData.forEach((item, i) => {
        if (item.id == id) {
          this.taskData.splice(i, 1);
        }
      });
    },
    toggleTask(id) {
      this.taskData.forEach((item) => {
        if (item.id == id) {
          if (item.isChecked == false) {
            item.isChecked = true;
          } else {
            item.isChecked = false;
          }
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
    // setDeadLine(index) {
    //   if (this.filteredData[index] == index) {
    //     this.filteredData[index].taskDeadLine = this.taskDeadLine;
    //   }
    // },
    deleteAllFinishedTasks() {
      this.taskData.forEach((item, i) => {
        if (item.isChecked == true) {
          this.taskData.splice(i);
        }
      });
    },
  },
  computed: {
    filteredData() {
      if (this.status === "DONE") {
        return this.taskData.filter((it) => it.isChecked === true);
      } else if (this.status === "WIP") {
        return this.taskData.filter((it) => it.isChecked === false);
      } else {
        return this.taskData;
      }
    },
    countUnfinishedTasks() {
      let unfinishedTask = this.taskData.filter((item) => {
        return item.isChecked == false;
      });
      return unfinishedTask.length + " Unfinished tasks";
    },
  },
};
</script>
