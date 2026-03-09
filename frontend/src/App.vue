<template>
  <div class="explorer-app">
    <div class="main-layout">
      
      <aside class="sidebar">
        <div class="sidebar-header">
          <span>Explorer</span>
         
        </div>
        
        <div class="tree-container">
          <TreeItem 
            v-for="item in rootItems" 
            :key="item._id" 
            :item="item"
            
            @select-item="setSelectedItem" 
          />
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import TreeItem from './components/TreeItem.vue';

const rootItems = ref([]);
const selectedItem = ref(null);

const setSelectedItem = (item) => {
  selectedItem.value = item;
};

const fetchRootItems = async () => {
  const res = await axios.get('http://localhost:5000/api/files');
  rootItems.value = res.data;
};




onMounted(fetchRootItems);
</script>

<style>
.explorer-app { height: 100vh; display: flex; flex-direction: column; font-family: sans-serif; }
.main-layout { display: flex; flex: 1; overflow: hidden; }

/* Sidebar Styles */
.sidebar { width: 300px; border-right: 1px solid #ddd; display: flex; flex-direction: column; background: #f9f9f9; }
.sidebar-header { padding: 15px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; font-weight: bold; }

/* Details View Styles (Clean & Professional) */
.details-view { flex: 1; background: white; display: flex; flex-direction: column; }
.details-header { padding: 15px; border-bottom: 1px solid #eee; background: #fcfcfc; font-size: 1.1em; display: flex; align-items: center; gap: 10px; }
.details-content { padding: 40px; max-width: 600px; }
.info-grid { display: flex; flex-direction: column; gap: 20px; }
.info-row { display: grid; grid-template-columns: 120px 1fr; font-size: 1.05em; }
.info-row strong { color: #333; }
.info-row span { color: #666; font-family: monospace; }
.empty-state { display: flex; height: 100%; align-items: center; justify-content: center; color: #999; }
</style>