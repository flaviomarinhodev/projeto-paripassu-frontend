# Event Reservations - Frontend

Interface web para reserva de vagas em eventos. Desenvolvida em Vue.js 3 com integração com backend Spring Boot.

## Tecnologias

- **Vue.js 3** (framework JavaScript)
- **Axios** (cliente HTTP)
- **Vue Router** (roteamento)
- **Babel** (transpilação)
- **Webpack** (bundler, via vue-cli)
- **CSS Scoped** (estilos isolados por componente)

## Requisitos

- Node.js 16+ e npm

## Instalação e Execução

### 1. Instalar Dependências

```bash
cd projeto-paripassu-frontend
npm install
```

### 2. Rodar em Desenvolvimento

```bash
npm run serve
```

Frontend estará disponível em: `http://localhost:8080`

### 3. Build para Produção

```bash
npm run build
```

Gera pasta `dist/` pronta para deployment.

### 4. Lint e Formatação (se configurado)

```bash
npm run lint
```

## Configuração de Backend

O frontend tenta conectar ao backend em `http://localhost:8081/api` por padrão (configurável em `src/api/httpClient.js`).

Se o backend estiver em outro servidor, atualize:

```javascript
// src/api/httpClient.js
const httpClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || 'http://seu-backend:8081/api'
});
```

## Decisões de Design

### 1. Componentes Funcionais

**Estrutura**:
- `EventListView`: lista de eventos disponíveis com botão de inscrição
- `EventRegistrationView`: formulário de inscrição para evento específico
- `EventCard`: exibe informações resumidas de um evento
- `AlertMessage`: notificações (erro/sucesso) reutilizável

**Vantagens**:
- Fácil de testar em isolamento
- Reutilização clara
- Props bem definidas

### 2. Gerenciamento de Estado Simples

Sem Vuex/Pinia por simplicidade — state é local por componente.

**Trade-off**: 
- ✅ Menos boilerplate, ideal para aplicação pequena
- ⚠️ Se crescer, considerar Pinia para estado global

### 3. Idempotência no Cliente

Cliente gera `Idempotency-Key` no registro:

```javascript
const idempotencyKey = crypto.randomUUID || (() => 
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  })
)();

registrationService.register({...}, idempotencyKey);
```

Garante que mesmo com retry automático do browser, backend não cria duplicatas.

### 4. Tratamento de Erros Amigável

```javascript
catch (error) {
  if (error.response?.status === 409) {
    this.errorMessage = 'Email já registrado para este evento';
  } else if (error.response?.status === 400) {
    this.errorMessage = 'Dados inválidos. Verifique o formulário';
  } else {
    this.errorMessage = 'Erro ao registrar. Tente novamente.';
  }
}
```

### 5. Roteamento SPA

**Routes**:
- `/` - Lista de eventos (`EventListView`)
- `/events/:id/register` - Formulário de inscrição (`EventRegistrationView`)

```javascript
const router = createRouter({
  mode: 'history',
  routes: [
    { path: '/', name: 'event-list', component: EventListView },
    { path: '/events/:id/register', name: 'event-registration', component: EventRegistrationView }
  ]
});
```

## Trade-offs

| Decisão | Benefício | Custo |
|---------|-----------|-------|
| Vue 3 (sem Vuex) | Rápido de desenvolver | Não escala bem para aplicações complexas |
| Axios simples | Fácil integração | Sem retry automático ou interceptores avançados |
| CSS Scoped | Sem conflitos de namespace | Performance/tamanho de bundle cresce com mais componentes |
| SPA (Roteamento Client-side) | UX fluida | Requer JavaScript habilitado no navegador |

## O que Faria Diferente com Mais Tempo

### 1. TypeScript
Adicionar tipos estáticos para evitar erros em runtime:
```typescript
interface RegistrationRequest {
  eventId: number;
  participantName: string;
  email: string;
}
```

### 2. State Management (Pinia)
Se crescer, migrar para Pinia para estado compartilhado entre componentes.

### 3. Testes Unitários
Implementar testes com Vitest + Vue Test Utils:
```javascript
describe('EventListView', () => {
  it('should display events after loading', async () => {
    // test implementation
  });
});
```

### 4. Componentes de Validação
Validações mais robustas com bibliotecas como Vuelidate ou VeeValidate.

### 5. Acessibilidade (a11y)
- Adicionar labels para inputs
- ARIA attributes
- Navegação por teclado

### 6. i18n (Internacionalização)
Suporte a múltiplos idiomas com vue-i18n.

### 7. PWA (Progressive Web App)
- Service Worker para offline-first
- Manifest.json
- Cache de assets

## Estrutura de Arquivos

```
src/
├── main.js                 # Entrada da aplicação
├── App.vue                 # Componente raiz
├── router.js               # Configuração de rotas
├── api/
│   ├── httpClient.js       # Axios instance
│   ├── eventService.js     # Chamadas para /events
│   ├── registrationService.js # Chamadas para /registrations
│   └── idempotency.js      # Geração de Idempotency-Key
├── components/
│   ├── EventListView.vue   # Listagem de eventos
│   ├── EventRegistrationView.vue # Formulário de registro
│   ├── EventCard.vue       # Card de evento
│   └── AlertMessage.vue    # Notificações
└── assets/                 # Imagens, fonts
public/
└── index.html              # HTML raiz
```

## Uso de IA no Projeto

### Como IA foi utilizada:

1. **Scaffolding inicial**
   - IA gerou estrutura base com vue-cli
   - Aceitei: layout e organização
   - Ajustei: nomes de componentes e estrutura de pastas

2. **Componentes Vue**
   - IA sugeriu templates e métodos
   - Validei manualmente contra necessidades de UX
   - Refinei para adicionar idempotência e tratamento de erros

3. **Chamadas HTTP**
   - IA gerou stubs com Axios
   - Adicionei headers customizados (Idempotency-Key, CORS)
   - Testei integração com backend

4. **Roteamento**
   - IA sugeriu padrão SPA
   - Implementei rotas específicas para o caso de uso

### Decisões que descartei:

- ❌ Usar Nuxt.js: overhead para aplicação simples
- ❌ Adicionar Redux-like state management: não necessário ainda
- ❌ CSS Tailwind: preferi CSS scoped mais simples

## Como Corrigir Erros de CORS

Se receber erro: `Cross-Origin Request Blocked`

**Solução 1**: Garantir que backend tem CORS configurado para a origin do frontend:
```java
// AppConfig.java
registry.addMapping("/api/**")
    .allowedOriginPatterns("http://localhost:*", "http://127.0.0.1:*")
    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
```

**Solução 2**: Se usar proxy reverso, garantir que frontend faz requisições para o mesmo origin:
```javascript
// Em ambiente de produção, fazer requisições para /api ao invés de http://backend:8081/api
const baseURL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8081/api';
```

## Observações

- Aplicação já inclui exemplos de formulários e tratamento de erros
- Compatível com browsers modernos (Edge 15+, Chrome 60+, Firefox 55+)
- Responsive design (mobile-first)
- Sem dependências de CSS framework pesado
