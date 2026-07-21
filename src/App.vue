<template>
  <div id="app">
    <header class="app-header">
      <div class="app-header__brand">
        <span class="app-header__dot"></span>
        <h1>Event Reservations</h1>
      </div>
    </header>
    <main class="app-content">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
:root {
  --vscode-blue: #007ACC;
  --vscode-blue-dark: #005A9E;
  --vscode-blue-light: #E8F3FB;
  --color-white: #FFFFFF;
  --color-text: #1E1E1E;
  --color-danger: #C43D3D;
  --color-success: #2E8540;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Segoe UI', Roboto, Arial, sans-serif;
  background-color: var(--color-white);
  color: var(--color-text);
}

.app-header {
  background-color: var(--vscode-blue);
  padding: 20px 32px;
}

.app-header__brand {
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 960px;
  margin: 0 auto;
}

.app-header__dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: var(--color-white);
}

.app-header__brand h1 {
  color: var(--color-white);
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.app-content {
  max-width: 960px;
  margin: 0 auto;
  padding: 32px 24px;
}
</style>