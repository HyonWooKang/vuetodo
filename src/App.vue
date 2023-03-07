<template>
  <div>
    <header>
      <h1>Vue Todo with Typescript</h1>  
    </header>
    <main>
      <TodoInput 
      :item="todoText"
      @input="updateTodoText"
      @add="addTodoItem"
      ></TodoInput>
      <!-- 뷰와 컴포넌트 태그에 @input을 이용하여 v-model과 동일한 효과 처리 -->
      <!-- <TodoInput v-model="todoText" @add="addTodoItem"></TodoInput> -->
      <div>
        <ul>
          <!-- v-for에서 index를 제공함. 구분하기 위해 key값으로 지정 -->
          <TodoListItem
          v-for="(todoItem, index) in todoItems"
          :key = "index"
          :index = "index"
          :todoItem = "todoItem"
          @toggle="toggleTodoItemComplete"
          @remove="removeTodoItem"
          ></TodoListItem>
          <!-- 삭제를 위해 인덱스 index 추가 -->
        </ul>
      </div>
    </main>

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TodoInput from "./components/Todoinput.vue";
import TodoListItem from "./components/TodoListItem.vue";

// 내부 디비 사용 (local storage)
const STORAGE_KEY = "vue-todo-ts-v1"
const storage = {
  // 값 저장
  save(todoItems: any) {
    const parsed = JSON.stringify(todoItems); // 배열을 스트링으로 파싱
    localStorage.setItem(STORAGE_KEY, parsed);
  },
  // 값 로컬 스토리지로 보내주기
  fetch() {
    const todoItems = localStorage.getItem(STORAGE_KEY) || "[]";  // 값이 없으면 초기화 시켜줌
    const result = JSON.parse(todoItems);  // JSON(String)을 Object형태로 변경
    return result;
  }
}
/* 삭제를 위한 관리 */
export interface Todo { // interface를 export하여 타입으로 사용
  title: string;
  done: boolean;
}

export default Vue.extend({
  components: { TodoInput, TodoListItem },
  data() {
    return {
      todoText: "",  // 단 방향 바인딩 성공 App.vue -> Todoinput
      todoItems: [] as Todo[],  // localStroage에 있는 데이터를 
    };
  },
  methods: {
    updateTodoText(value: string) {

      this.todoText = value;
    },
    addTodoItem() {
      const value = this.todoText;
      //localStorage.setItem(value, value); // 웹 애플리케이션 로컬스토리지에 저장
      const todo: Todo = {
        title: value,
        done: false,
      }
      this.todoItems.push(todo); // 배열로 된 값을 집어 넣기
      storage.save(this.todoItems);
      this.initTodoText();  // 입력창 초기화
    },
    initTodoText() {
      this.todoText = "";
    },
    fetchTodoItems() {
      this.todoItems = storage.fetch();
    },
    removeTodoItem(index: number) {
      console.log('remove', index);
      this.todoItems.splice(index, 1); // splice로 삭제
      storage.save(this.todoItems);
    },
    toggleTodoItemComplete(todoItem: Todo, index: number) {
      this.todoItems.splice(index, 1, {
        // title: todoItem.title,
        ...todoItem, // 위와 동일한 기능을 함 (여러 개의 값이 있을 때 효과적)
        done: !todoItem.done,
      });
      storage.save(this.todoItems);
    },
  },
  // 라이프 사이클 이용
  created() {
    this.fetchTodoItems();
  }
});
</script>

<style></style>
