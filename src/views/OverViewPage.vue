<template>
  <div class="overview-container">
    <h3 class="overview-title text-center">Overview</h3>
    <div class="card-container">
      <div class="card-1">
        <h3>未完成項目</h3>
        <p>{{ dashboard.unfinishedTasksNum }}</p>
      </div>
      <div class="card-2">
        <h3>已完成項目</h3>
        <p>{{ dashboard.finishedTasksNum }}</p>
      </div>
      <div class="card-3">
        <h3>項目完成率</h3>
        <p>{{ dashboard.tasksFinishedRate }}%</p>
      </div>
      <div class="card-4">
        <h3>下一項待辦</h3>
        <p>幫貓貓買凍乾</p>
      </div>
      <div class="card-5">
        <h3>圖表一</h3>
        <p>圓餅圖</p>
      </div>
      <div class="card-6">
        <h3>圖表二</h3>
        <p>長條圖</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dashboard: {
        unfinishedTasksNum: "",
        finishedTasksNum: "",
        tasksFinishedRate: "",
        nextToDoTasks: "",
      },
      apiUrl: "https://todoo.5xcamp.us",
      taskData: [],
    };
  },
  methods: {
    getToDos() {
      return new Promise((resolve, reject) => {
        this.$http
          .get(`${this.apiUrl}/todos`)
          .then((res) => {
            console.log(res.data.todos);
            this.taskData = res.data.todos;
            this.countUnfinishiedTasks();
            this.countFinishedTasks();
            this.countTaskFinishedRate();
            resolve(res);
          })
          .catch((error) => {
            console.log(error.response);
            reject(error.response);
          });
      });
    },
    countUnfinishiedTasks() {
      let unfinishedTasks = this.taskData.filter(item => item.completed_at == null )
      this.dashboard.unfinishedTasksNum = unfinishedTasks.length;
    },
    countFinishedTasks() {
      let finishedTasks = this.taskData.filter(item => item.completed_at != null)
      this.dashboard.finishedTasksNum = finishedTasks.length;
    },
    countTaskFinishedRate() {
      let tasksFinishedRateNum = (this.dashboard.finishedTasksNum / this.taskData.length) * 100;
      this.dashboard.tasksFinishedRate = Math.round(tasksFinishedRateNum);
    }
  },
  created() {
    console.log("overview page is created!")
    this.getToDos();
  }
};
</script>

<style scoped>
.overview-title {
  font-weight: bold;
  font-size: 40px;
  letter-spacing: 0.1rem;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card-1,
.card-2,
.card-3,
.card-4,
.card-5,
.card-6 {
  width: 29%;
  height: 29vh;
  color: white;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin: 2%;
  border-radius: 10% 10% 10% 50%;
  /* font-size: 50px; */
}

.card-1,
.card-2,
.card-3,
.card-4,
.card-5,
.card-6 p {
  font-size: 30px;
}

.card-1 {
  background-color: #fe5838;
}

.card-2 {
  background-color: #ff776a;
}

.card-3 {
  background-color: #a35efb;
}

.card-4 {
  background-color: #19bafd;
}

.card-5 {
  background-color: #19d086;
}

.card-6 {
  background-color: #323232;
}
</style>
