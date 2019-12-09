<template>
  <div class="movie-filter-bar">
    <div class="row row-movie-filter-bar">
      <div class="group">
        <a class="filter-btn" href="javascript:;">All</a>
        <a class="filter-btn" href="javascript:;">Phim lẻ</a>
        <a class="filter-btn" href="javascript:;">Phim rạp</a>
      </div>
      <div class="group select">
        <a href="javascript:;" class="filter-btn">Thể loại</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.movie-filter-bar {
  background-color: #162530;
  padding: 12px 0;
}
div.group {
  display: inline-block;
  border: 1px solid #4c5a67;
  font-size: 0;
  margin-right: 15px;
}

div.group.select {
  padding-right: 14px;
  position: relative;
}

div.group.select::after {
  position: absolute;
  content: '‹';
  font-size: 18px;
  font-weight: bold;
  width: 20px;
  height: 20px;
  text-align: center;
  transform: rotate(-90deg) translateX(50%);
  right: 4px;
  top: 50%;
}

.filter-btn {
  color: #babec1;
  padding: 8px 12px;
  display: inline-block;
  border-right: 1px solid #4c5a67;
  font-size: 16px;
}

.filter-btn:last-child {
  border-right: none;
}
</style>
