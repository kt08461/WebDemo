<script setup>
import { watchEffect, ref } from 'vue';

const props = defineProps({
    pginfo: {
        type: Object,
        required: true
    },
    linkUrl: {
        // 會將字串裡 #pn# 替換為頁數
        type: String,
        required: true
    }
});
// console.log(props.pginfo);

const first_disabled = ref('');
const last_disabled = ref('');
let start = 0;
let end = 0;

// 監聽分頁參數的變化
watchEffect(async () => {
  first_disabled.value = (props.pginfo.pn <= 1) ? 'disabled' : '';
  last_disabled.value = (props.pginfo.pn >= props.pginfo.total_pn) ? 'disabled' : '';
  start = ((props.pginfo.total_pn <= 10) || (props.pginfo.pn <= 6)) ? 1 : (props.pginfo.pn - 5);
  end = ((start + 9) <= props.pginfo.total_pn) ? (start + 9) : props.pginfo.total_pn;
})

</script>

<template>
  <nav v-if="pginfo.total_pn > 0" aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="first_disabled">
        <span v-if="first_disabled" class="page-link">&laquo; 上一頁</span>
        <RouterLink v-else :to="{ path: linkUrl.replace('#pn#', props.pginfo.prev_pn) }" class="page-link">&laquo; 上一頁</RouterLink>
      </li>
      <div v-for="pn in props.pginfo.total_pn" :key="pn" v-show="pn >= start && pn <= end">
        <div>
          <li class="page-item" :class="(pn == props.pginfo.pn)? 'active' : ''">
            <RouterLink :to="{ path: linkUrl.replace('#pn#', pn) }" class="page-link">{{ pn }}</RouterLink>
          </li>
        </div>
      </div>
      <li class="page-item" :class="last_disabled">
        <span v-if="last_disabled" class="page-link">下一頁 &raquo;</span>
        <RouterLink v-else :to="{ path: linkUrl.replace('#pn#', props.pginfo.next_pn) }" class="page-link">下一頁 &raquo;</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
</style>