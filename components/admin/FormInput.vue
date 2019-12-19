<template>
  <div class="form-input">
    <label :for="getId">{{ label }}</label>
    <input :id="getId" :value="value" :type="type" :name="getName" />
  </div>
</template>

<script>
export default {
  props: {
    type: { type: String, default: '' },
    label: { type: String, default: '' },
    value: { type: [String, Number, Date], default: '' }
  },

  computed: {
    getId() {
      return this.label
        .toLowerCase()
        .trim()
        .replace(/\s/g, '-')
    },

    getName() {
      return this.label
        .toLowerCase()
        .trim()
        .replace(/\s/g, '_')
    }
  }
}
</script>
<style>
.form-input label {
  display: inline-block;
  width: 100px;
}

.form-input input[type='text'],
.form-input input[type='date'] {
  display: inline-block;
  width: 400px;
  margin-bottom: 25px;
  outline: none;
  border: 1px solid #bbb;
  padding: 6px 8px;
}
</style>
