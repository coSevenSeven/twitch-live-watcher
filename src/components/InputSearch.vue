<template>
  <InputLayout
    v-model="_inputValue"
    :disabled="disableInput"
    :placeholder="placeholder"
    @enter="$emit('search')"
  >
    <template #icon>
      <Icon
        class="text-themeColor4 ml-auto cursor-pointer"
        :class="{ 'pointer-events-none': disableSearch }"
        icon="ic:outline-search"
        :width="iconSize"
        :height="iconSize"
        @click="$emit('search')"
      />
    </template>
  </InputLayout>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'
import { Icon } from '@iconify/vue'

const iconSize = 30

const props = withDefaults(
  defineProps<{
    modelValue: string
    placeholder?: string
    disableInput?: boolean
    disableSearch: boolean
  }>(),
  {
    placeholder: '',
    disableInput: false
  }
)

const emit = defineEmits<{
  (eventName: 'search'): void
  (eventName: 'update:modelValue', value: string): void
}>()

const _inputValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value as string)
  }
})
</script>

<style scoped>
::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  font-size: 16px;
  color: #7d9d9c;
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  font-size: 16px;
  color: #7d9d9c;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  font-size: 16px;
  color: #7d9d9c;
}
</style>
