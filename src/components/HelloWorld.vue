<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <el-dialog v-model="showDialog" title="Shipping address">
          <el-form :model="searchContainer">
            <el-form-item label="Address">
              <el-input v-model="searchContainer.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Price start">
              <el-input v-model="searchContainer.price_start" />
            </el-form-item>
            <el-form-item label="Price end">
              <el-input v-model="searchContainer.price_end" />
            </el-form-item>
            <el-form-item label="Storeys">
              <el-input v-model="searchContainer.storeys" />
            </el-form-item>
            <el-form-item label="Bathrooms">
              <el-input v-model="searchContainer.bathrooms" />
            </el-form-item>
            <el-form-item label="Bedrooms">
              <el-input v-model="searchContainer.bedrooms" />
            </el-form-item>
            <el-form-item label="Garages">
              <el-input v-model="searchContainer.garages" />
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="resetForm">Reset form</el-button>
              <el-button type="primary" @click="closeAndSearch">Confirm</el-button>
            </span>
          </template>
        </el-dialog>
        <el-button type="primary" @click="search" :loading="loading">Search</el-button>
        <el-button @click="showDialog = !showDialog" :loading="loading">Open params</el-button>
        <el-table v-loading="loading" :data="results" height="700" style="width: 100%; margin-top: 20px;">
          <el-table-column prop="name" label="Address" width="180" />
          <el-table-column prop="price" label="Price" width="180" />
          <el-table-column prop="bedrooms" label="Bedrooms" />
          <el-table-column prop="bathrooms" label="Bathrooms" />
          <el-table-column prop="storeys" label="Storeys" />
          <el-table-column prop="garages" label="Garages" />
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { ElNotification } from 'element-plus'
export default {
  data() {
    return {
      results: [],
      loading: false,
      showDialog: false,
      searchContainer: {
        name: null,
        price_start: null,
        price_end: null,
        price: null,
        bedrooms: null,
        bathrooms: null,
        storeys: null,
        garages: null
      }
    }
  },

  mounted() {
    this.search()
  },

  methods: {
    notify(title, message, type) {
      ElNotification({
        title: title,
        message: message,
        type: type,
      })
    },

    async search() {
      this.loading = true;

      try {
        const response = await this.axios.post('http://127.0.0.1:8000/api/search', this.withFixedPrice());
        this.results = response.data.data;
      }
      catch(err) {
        this.notify('Error', 'An error was occurred while processing data: ' + err, 'error');
      }

      this.loading = false;
    },

    withFixedPrice() {
      if(this.searchContainer.price_start === null || this.searchContainer.price_end === null) {
        return this.searchContainer;
      }
      else {
        this.searchContainer.price = {
          0: Number(this.searchContainer.price_start),
          1: Number(this.searchContainer.price_end)
        };
        return this.searchContainer;
      }
    },

    async closeAndSearch() {
      this.showDialog = false;
      await this.search();
    },

    async resetForm() {
      this.searchContainer.name = null;
      this.searchContainer.price_start = null;
      this.searchContainer.price_end = null;
      this.searchContainer.bedrooms = null;
      this.searchContainer.bathrooms = null;
      this.searchContainer.storeys = null;
      this.searchContainer.garages = null;
      this.showDialog = false;
      await this.search();
    }
  }
}
</script>

<style scoped>
:root {
  --el-color-primary: #409eff;
}
.el-button .custom-loading .circular {
  margin-right: 6px;
  width: 18px;
  height: 18px;
  animation: loading-rotate 2s linear infinite;
}
.el-button .custom-loading .circular .path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: var(--el-button-text-color);
  stroke-linecap: round;
}
</style>
