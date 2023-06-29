<template>
  <div class="overview-container">
    <h3 class="overview-title text-center">Overview</h3>
    <div class="card-container">
      <div class="card-1">
        <h3>未完成項目</h3>
        <p>0</p>
      </div>
      <div class="card-2">
        <h3>已完成項目</h3>
        <p>5</p>
      </div>
      <div class="card-3">
        <h3>項目完成率</h3>
        <p>0%</p>
      </div>
      <div class="card-4">
        <h3>下一項待辦</h3>
        <p>0</p>
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
.card-6
p {
  font-size: 30px
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
