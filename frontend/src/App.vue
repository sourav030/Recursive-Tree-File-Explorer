<template>
  <div class="explorer-app">
    <div class="main-layout">
      
      <aside class="sidebar">
        <div class="sidebar-header">
          <span>Explorer</span>
          <button @click="folderAdd">addFolder +</button>
          <button @click="fileAdd">addFile +</button>
        </div>
        
        <div class="tree-container">
          <TreeItem 
            v-for="item in rootItems" 
            :key="item._id" 
            :item="item"
          />
        </div>
      </aside>

      <div>
       <div v-if="store.data">
          <h4>This is Id =>{{ filedata._id }}</h4>
          <h4>This is name=>{{ filedata.name }}</h4>
          <h4>This is type=>{{ filedata.type }}</h4>
          <h4>This parent detail=>{{ filedata.parentId?filedata.parentId:"This is root" }}</h4>
       </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import TreeItem from './components/TreeItem.vue'


import { usePeniStore } from './store/store'

const store = usePeniStore() 
const filedata=ref({})
const rootItems = ref([])
const name = ref('')
const type = ref('')

//  Fetch
const fetchRootItems = async () => {
  const res = await axios.get('http://localhost:5000/api/files')
  rootItems.value = res.data
}

//  Add folder
const folderAdd = async () => {
  name.value = prompt('Enter a folder name')
  type.value = 'folder'

  try {
    await axios.post('http://localhost:5000/api/files/add', {
      name: name.value,
      type: type.value
    })

    await fetchRootItems()
  } catch (err) {
    console.log(err.message)
  }
}

//  Add file
const fileAdd = async () => {
  name.value = prompt('Enter file name')
  type.value = 'file'

  try {
    await axios.post('http://localhost:5000/api/files/add', {
      name: name.value,
      type: type.value
    })

    await fetchRootItems()
  } catch (err) {
    console.log(err.message)
  }
}

watch(()=>store.data, async (newval,oldval)=>{
   console.log(newval)
   const result=await axios.get(`http://localhost:5000/api/files/${newval}`)
   console.log(result.data)
   filedata.value=result.data
   console.log(filedata.value)
})
onMounted(fetchRootItems)

</script>

<style>
.explorer-app { height: 100vh; display: flex; flex-direction: column; font-family: sans-serif; }
.main-layout { display: flex; flex: 1; overflow: hidden; }

.sidebar { width: 300px; border-right: 1px solid #ddd; display: flex; flex-direction: column; background: #f9f9f9; }
.sidebar-header { padding: 15px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; font-weight: bold; }

.details-view { flex: 1; background: white; display: flex; flex-direction: column; }
.details-header { padding: 15px; border-bottom: 1px solid #eee; background: #fcfcfc; font-size: 1.1em; display: flex; align-items: center; gap: 10px; }
.details-content { padding: 40px; max-width: 600px; }
.info-grid { display: flex; flex-direction: column; gap: 20px; }
.info-row { display: grid; grid-template-columns: 120px 1fr; font-size: 1.05em; }
.info-row strong { color: #333; }
.info-row span { color: #666; font-family: monospace; }
.empty-state { display: flex; height: 100%; align-items: center; justify-content: center; color: #999; }
</style>