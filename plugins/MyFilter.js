import Vue from 'vue'

Vue.filter('decodeEntities', (str) => {
  if (typeof document !== 'undefined') {
    const text = document.createElement('textarea')
    text.innerHTML = str
    return text.value
  }
  return str
})
