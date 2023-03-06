<template>
  <div>
    <label for="todo-input">오늘 할 일 : </label>
    <input id="todo-input" type="text" :value="item" @input="handleInput"/>
    <button @click="addTodo" type="button">add</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  // props: ["item"],
  props: {
    item: {
      // 자바스크립트의 input 속성과 동일
      type: String,
      required: true, // 필수 값
    }
  },
  methods: {
    handleInput(event: InputEvent) {  // 기존에는 any로 처리했음
      console.log("event")
      /*
      이벤트 타겟이 null 일 수 있다는 에러 발생 => null 체크 가능
      이벤트 타겟에 value 값이 없다는 에러 발생
      => 두 개를 모두 해결하기 위해서는 안정도는 떨어지지만 이렇게 타입 정의를 해서 해결 할 수 있다.
       */
      const eventTarget = event.target as HTMLInputElement
      this.$emit('input', eventTarget.value);
    },
    addTodo() {
      this.$emit("add");
    }
  }

});
</script>

<style></style>