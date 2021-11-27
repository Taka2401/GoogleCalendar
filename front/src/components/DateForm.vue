<template>
  <v-menu offset-y>

    <!-- activatorスロットからonというプロパティを取得 -->
    <template v-slot:activator="{ on }">
    <!-- クリック時にactivatorスロットを経由してメニューが表示される -->
      <v-btn text v-on="on">{{ value || '日付を選択' }}</v-btn>
    </template>

    <!-- propsで受け取ったvalueは変更不可のため、$emitで変更する -->
    <v-date-picker
      :value="value.replace(/\//g, '-')"
      @input="$emit('input', $event.replace(/-/g, '/'))"
      no-title
      locale="ja-ja"
      :day-format="value => new Date(value).getDate()"
    ></v-date-picker>
   </v-menu>
</template>

<script>
export default {
  props: ['value'],
}
</script>
