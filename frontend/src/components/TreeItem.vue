<template>
  <div class="tree-node">
    <div 
      class="item-row" 
      :class="{ 'is-folder': item.type === 'folder' }" 
      @click="handleRowClick"
    >
      <span class="chevron" v-if="item.type === 'folder'">
        {{ isOpen ? '▼' : '▶' }}
      </span>
      <span class="chevron spacer" v-else></span>

      <span class="type-icon">
        <template v-if="item.type === 'folder'">
          {{ isOpen ? '📂' : '📁' }}
        </template>
        <template v-else>📄</template>
      </span>

      <span class="name">{{ item.name }}</span>
      
      </div>

    <div v-if="isOpen && item.type === 'folder'" class="children-group">
      <div v-if="loading" class="loading-text">Loading...</div>
      
      <TreeItem 
        v-for="child in children" 
        :key="child._id" 
        :item="child" 
        @select-item="(item) => $emit('select-item', item)"
      />
      
      <div v-if="loadedOnce && children.length === 0" class="empty-text">
        (Empty folder)
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const props = defineProps(['item']);
const emit = defineEmits(['select-item']); // 'add-item' emit yahan se hata diya

const isOpen = ref(false);
const children = ref([]);
const loading = ref(false);
const loadedOnce = ref(false);

const handleRowClick = async () => {
  // Details update karne ke liye parent ko event bhejna
  emit('select-item', props.item);

  if (props.item.type === 'folder') {
    isOpen.value = !isOpen.value;

    
    if (isOpen.value && !loadedOnce.value) {
      loading.value = true;
      try {
        const res = await axios.get(`http://localhost:5000/api/files?parentId=${props.item._id}`);
        children.value = res.data;
        loadedOnce.value = true;
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        loading.value = false;
      }
    }
  }
};
</script>

<style scoped>

.tree-node {
  font-family: 'Segoe UI', Tahoma, sans-serif;
  font-size: 14px;
  color: #333;
}

.item-row {
  display: flex;
  align-items: center;
  padding: 6px 10px;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s;
}

.item-row:hover {
  background-color: #f0f0f0;
}

.chevron {
  width: 18px;
  font-size: 10px;
  color: #666;
  display: flex;
  justify-content: center;
}

.type-icon {
  margin-right: 8px;
  font-size: 16px;
}

.name {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.children-group {
  margin-left: 18px;
  padding-left: 5px;
  border-left: 1px solid #eee;
}

.loading-text, .empty-text {
  padding: 4px 25px;
  font-size: 12px;
  color: #999;
  font-style: italic;
}
</style>