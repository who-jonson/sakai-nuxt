<script lang="ts">
import NodeService from '~~/services/NodeService';

export default {
  data() {
    return {
      treeValue: null,
      selectedTreeValue: null,
      treeTableValue: null,
      selectedTreeTableValue: null
    };
  },
  nodeService: null,
  created() {
    this.nodeService = new NodeService();
  },
  mounted() {
    this.nodeService.getTreeNodes().then(data => this.treeValue = data);
    this.nodeService.getTreeTableNodes().then(data => this.treeTableValue = data);
  }
};
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>Tree</h5>
        <Tree v-model:selectionKeys="selectedTreeValue" :value="treeValue" selection-mode="checkbox" />
      </div>
    </div>
    <div class="col-12">
      <div class="card">
        <h5>TreeTable</h5>
        <TreeTable v-model:selectionKeys="selectedTreeTableValue" :value="treeTableValue" selection-mode="checkbox">
          <template #header>
            FileSystem
          </template>
          <Column field="name" header="Name" :expander="true" />
          <Column field="size" header="Size" />
          <Column field="type" header="Type" />
        </TreeTable>
      </div>
    </div>
  </div>
</template>
