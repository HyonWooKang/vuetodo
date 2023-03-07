<template>
    <li>
        <span class="list-item"
        :class="todoItem.done ? 'complete' : null"
        @click="toggleItem"
        >{{ todoItem.title }}</span>
        <button @click="removeItem">삭제</button>
        <!-- <button @click="$emit('delete')">삭제</button> -->
        <!-- 버튼으로 emit 보내서 vue에서 지우기 보다는 component 단에서 바로 처리하는 것이 좋음 -->
    </li>
</template>

<script lang="ts">
import { Todo } from '@/App.vue';
import Vue from 'vue';
import { PropType } from 'vue/types/v3-component-props';

export default Vue.extend({
    props: {
        todoItem: Object as PropType<Todo>, // Props의, 타입 정의
        index: Number,
    },
    methods: {
        toggleItem() {
            this.$emit("toggle", this.todoItem, this.index);
        },
        removeItem(index: number) {
            this.$emit("remove", this.index);
        },
    },
})
</script>

<style scoped>
.list-item {
    /* 아이템에 마우스 올리면 커서 처리 */
    cursor: pointer;
    padding-right: 5px;
}
.complete {
    /* 삭제선 */
    text-decoration: line-through;
}
</style>