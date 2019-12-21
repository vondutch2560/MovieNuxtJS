<template>
  <div class="form-input">
    <label :for="getId">{{ label }}</label>
    <multi-select
      :options="parseOptions"
      :selected-options="getSelected"
      @select="onSelect"
      :id="getId"
      :name="getName"
      :placeholder="`Select ${label}`"
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
    selected: { type: Array, default: () => [] }
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
      const cloneList = this.cloneObject(this.options)
      cloneList.forEach((item) => {
        this.renameKeyObj(item)
      })
      return cloneList
    },

    getSelected() {
      const cloneSelected = this.cloneObject(this.selected)
      cloneSelected.forEach((item) => {
        this.renameKeyObj(item)
      })
      return cloneSelected
    }
  },

  methods: {
    onSelect(items) {
      // console.log(items)
    },

    cloneObject(obj) {
      return JSON.parse(JSON.stringify(obj))
    },

    renameKeyObj(obj) {
      obj.text = obj.name
      obj.value = obj.id
      delete obj.name
      delete obj.id
      return obj
    }
  }
}
</script>

<style scope>
.ui.multiple.search.dropdown > .text {
  padding-left: 0 !important;
}
</style>
