<template>
  <div class="form-input">
    <label :for="getId">{{ label }}</label>
    <basic-select
      :options="parseOptions"
      :selected-option="getStudioSelected"
      @select="onSelect"
      :id="getId"
      :name="getName"
      placeholder="Select Studio"
    >
    </basic-select>
  </div>
</template>

<script>
import { BasicSelect } from 'vue-search-select'

export default {
  components: { BasicSelect },
  props: {
    label: { type: String, default: '' },
    listOption: { type: Array, default: () => [] },
    studioSelected: { type: Object, default: () => [] }
  },

  data() {
    return {
      item: ''
    }
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
      const cloneList = JSON.parse(JSON.stringify(this.listOption))
      cloneList.forEach((item) => {
        item.text = item.name
        item.value = item.id
        delete item.name
        delete item.id
      })
      return cloneList
    },

    getStudioSelected() {
      return this.studioSelected
    }
  },

  created() {},

  methods: {
    onSelect(item) {
      this.item = item
    }
  }
}
</script>
<style scoped>
.ui.fluid.dropdown {
  display: inline-block;
  width: 400px;
  border: 1px solid #bbb;
  border-radius: 0;
  padding-left: 8px;
}
</style>
