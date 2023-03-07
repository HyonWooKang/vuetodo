<template>
    <li>
        <span class="list-item complete">{{ todoItem }}</span>
        <button @click="removeItem">삭제</button>
        <!-- <button @click="$emit('delete')">삭제</button> -->
        <!-- 버튼으로 emit 보내서 vue에서 지우기 보다는 component 단에서 바로 처리하는 것이 좋음 -->
    </li>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: {
        todoItem: String,
        index: Number,
    },
    methods: {
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
}
.complete {
    /* 삭제선 */
    text-decoration: line-through;
}
</style>