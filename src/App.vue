<template>
  <div>
    <h1>Vue Todo with Typescript</h1>
    <form action="">
      <TodoInput 
      :item="todoText"
      @input="updateTodoText"
      @add="addTodoItem">
    </TodoInput>
    <!-- 뷰와 컴포넌트 태그에 @input을 이용하여 v-model과 동일한 효과 처리 -->
    <TodoInput v-model="todoText" @add="addTodoItem">
    </TodoInput>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TodoInput from "./components/Todoinput.vue";

export default Vue.extend({
  components: { TodoInput },
  data() {
    return {
      todoText: ""  // 단 방향 바인딩 성공 App.vue -> Todoinput
    };
  },
  methods: {
    updateTodoText(value: string) {

      this.todoText = value;
    },
    addTodoItem() {
      const value = this.todoText;
      localStorage.setItem(value, value);
      this.initTodoText();
    },
    initTodoText() {
      this.todoText = "";
    }
  }
});
</script>

<style></style>
