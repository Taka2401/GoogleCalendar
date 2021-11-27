<template>
  <v-checkbox
    :value="value"
    @change="$emit('input', $event)"
    :label="label"
    dense
    hide-details="true"
  ></v-checkbox>
</template>

<script>
export default {
  props: ["value", "label"],
};
</script>
