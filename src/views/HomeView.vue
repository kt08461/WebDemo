<script setup>
import { onMounted, ref } from 'vue';
import { useApiUrlStore } from '@/stores/useGlobalStore';

const fetch_apiUrl = useApiUrlStore().apiUrl+"/version";
const api_value = ref({'os':'Debian', 'db':'Mysql', 'php':'PHP', 'vue':'Vue3'});

onMounted(async function() {
  let data = api_value;
  await axios.get(fetch_apiUrl)
    .then(response => { data.value = response.data })
    .catch( error => console.error(error) )

  for (const key in api_value) {
    api_value[ key ] = data[ key ];
  }
});

</script>

<template>
  <main>
    <section class="py-4 text-center container">
      <div class="row justify-content-md-center">
        <div class="col col-lg-2 mx-3" style="background:url('/img/logo-debian.png') no-repeat center center; width:150px; height:100px; margin-bottom: 6px; background-size: contain;"></div>
        <div class="col col-lg-2 mx-3" style="background:url('/img/logo-mysql.png') no-repeat center center; width:150px; height:100px; margin-bottom: 6px; background-size: contain;"></div>
        <div class="col col-lg-2 mx-3" style="background:url('/img/logo-vue.png') no-repeat center center; width:150px; height:100px; margin-bottom: 6px; background-size: contain;"></div>
      </div>
      <p></p>
      <div class="row">
        <div class="col-lg-6 col-md-8 text-start mx-auto">
          <h2 class="fw-bold">開發環境</h2>
          <span v-html="api_value.os"></span>
          <ul class="lead fw-medium">
            <li>作業系統：<span v-html="api_value.os"></span></li>
            <li>資料庫：<span v-html="api_value.db"></span></li>
            <li>後端環境：<span v-html="api_value.php"></span>, Python</li>
            <li>前端環境：<span v-html="api_value.vue"></span>, Axios, bootstrap</li>
            <li>開發環境：WSL、GitLab、GCP</li>
          </ul>
        </div>
      </div>
    </section>

    <div>
      <div class="container">
        <div class="row row-cols-1 row-cols-sm-2">
          <div class="col">
            <RouterLink :to="{ name: 'Articles' }">
              <div class="card shadow-sm card-hover card-lifted">
                <div style="background: #4f5b93">
                  <div class="col col-lg-2 mx-3 my-4" style="background:url('/img/logo-php.svg') no-repeat center center; width:100%; height:130px; background-size: contain;"></div>
                </div>
                <div class="card-body">
                  <p class="card-text">
                    This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                  </p>
                </div>
              </div>
            </RouterLink>
          </div>
          <div class="col">
            <div class="card shadow-sm card-hover card-lifted">
              <div class="col col-lg-2 mx-3 my-4" style="background:url('/img/logo-python.svg') no-repeat center center; width:100%; height:130px; background-size: contain;"></div>

              <div class="card-body">
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<style scoped>
  @import "@/assets/css/home.css";
</style>