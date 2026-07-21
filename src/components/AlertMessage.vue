<template>
  <div v-if="message" :class="['alert', `alert--${type}`]">
    <span>{{ message }}</span>
    <button class="alert__close" @click="$emit('close')">&times;</button>
  </div>
</template>

<script>
export default {
  name: 'AlertMessage',
  props: {
    message: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'error',
      validator: value => ['error', 'success', 'info'].includes(value)
    }
  }
}
</script>

<style scoped>
.alert {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
}

.alert--error {
  background-color: #FBEAEA;
  color: var(--color-danger);
  border: 1px solid #F1C4C4;
}

.alert--success {
  background-color: var(--vscode-blue-light);
  color: var(--vscode-blue-dark);
  border: 1px solid #BEE0F5;
}

.alert--info {
  background-color: #F2F2F2;
  color: #333;
  border: 1px solid #DDD;
}

.alert__close {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: inherit;
  line-height: 1;
}
</style>