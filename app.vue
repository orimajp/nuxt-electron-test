<script setup lang="ts">
import NuxtMonacoEditor from './components/NuxtMonacoEditor.vue';

// https://github.com/ics-creative/150819_electron_text_editor/blob/maiin/src/renderer.js
const currentPath = ref('')
const editData = ref('')

const openFile = async () => {
  //@ts-ignore
  const result = await window.myApp.openFile()
  if (result) {
    const { filePath, textData } = result
    currentPath.value = filePath
    editData.value = textData
  }
}

const saveFile =async () => {
  //@ts-ignore
  const result = await window.myApp.saveFile(currentPath.value, editData.value)
  if (result) {
    currentPath.value = result.filePath
  }
}
console.log(window)
//@ts-ignore
console.log(window.myApp)
</script>

<template>
  <div>
    <header class="header">
      <button class="btn-primary" @click="openFile">読み込む</button>
      <button class="btn-primary" @click="saveFile">保存する</button>
    </header>
    <div style="height: 450px;">
      <MarkdownEditor v-model="editData" theme="vs-dark" language="markdown" width="100%" height="100%" />
    </div>
    <footer class="footer">{{ currentPath }}</footer>
  </div>
</template>
