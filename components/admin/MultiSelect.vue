<template>
  <div class="form-input">
    <label :for="getId">{{ label }}</label>
    <multi-select
      :options="parseOptions"
      :selected-options="items"
      @select="onSelect"
      :id="getId"
      :name="getName"
      placeholder="Select Studio"
    >
    </multi-select>
  </div>
</template>

<script>
import { MultiSelect } from 'vue-search-select'

export default {
  components: { MultiSelect },
  props: {
    label: { type: String, default: '' },
    options: { type: Array, default: () => [] },
    items: { type: Array, default: () => [] }
  },

  data() {
    return {}
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
    },

    parseOptions() {
      this.options.forEach((item) => {
        item.value = item.id
        item.text = item.name
        delete item.id
        delete item.name
      })
      return this.options
    }
  },

  created() {
    console.log('te', this.options)
  },

  methods: {
    onSelect(items) {
      this.items = items
    }
  }
}
</script>

<style></style>
