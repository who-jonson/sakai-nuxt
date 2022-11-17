<script lang="ts">
export default {
  methods: {
    onUpload() {
      this.$toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    }
  }
};
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>Advanced</h5>
        <FileUpload
          name="demo[]"
          url="/upload.php"
          :multiple="true"
          accept="image/*"
          :max-file-size="1000000"
          @upload="onUpload"
        />

        <h5>Basic</h5>
        <FileUpload
          mode="basic"
          name="demo[]"
          url="/upload.php"
          accept="image/*"
          :max-file-size="1000000"
          @upload="onUpload"
        />
      </div>
    </div>
  </div>
</template>
