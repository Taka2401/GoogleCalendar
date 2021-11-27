<template>
  <div>
     <!-- propsで受け取ったvalueは変更不可のため、$emitで変更する -->
    <v-date-picker
      :value="value"
      @input="$emit('input', $event)"
      no-title
      locale="ja-ja"
      :day-format="value => new Date(value).getDate()"
    ></v-date-picker>
    <p>{{ value }}</p>
  </div>
</template>

<script>
export default {
  props: ['value'],
}
</script>
