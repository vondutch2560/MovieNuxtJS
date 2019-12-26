<template>
  <div class="form-input">
    <label :for="getId">{{ label }}</label>
    <basic-select
      :options="parseOptions"
      :selected-option="getStudioSelected"
      @select="onSelect"
      :id="getId"
      :name="getName"
      :placeholder="`Select ${label}`"
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
    options: { type: Array, default: () => [] },
    selected: { type: Object, default: () => [] }
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
      const cloneList = this.cloneObject(this.options)
      cloneList.forEach((item) => {
        this.renameKeyObj(item)
      })
      return cloneList
    },

    getStudioSelected() {
      const cloneSelected = this.cloneObject(this.selected)
      return this.renameKeyObj(cloneSelected)
    }
  },

  created() {},

  methods: {
    onSelect(item) {
      this.item = item
    },

    cloneObject(obj) {
      return JSON.parse(JSON.stringify(obj))
    },

    renameKeyObj(obj) {
      obj.text = this.$options.filters.decodeEntities(obj.name)
      obj.value = obj.id
      delete obj.name
      delete obj.id
      return obj
    }
  }
}
</script>
<style scoped></style>
