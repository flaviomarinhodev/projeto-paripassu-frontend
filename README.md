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

## Uso de IA no Projeto

### Como IA foi utilizada:

1. **Utilizado processo de desenvolvimento por Vibe Coding, seguindos os processos de analise, planejamento e execução**
2. **Aqui não foram commitado os artefatos por conta do meu copilot não ser profissional e eu ter de fazer esse processo por fora**
  
### Alguns pontos que defini no prompt

1. **css, qual framework utilizar, linguagem, componentes**
2. **Correção de erro de CORS**
3. **Publicação no render**

## Observações

- Aplicação está publicada no render e disponível para teste no link:
- https://projeto-paripassu-frontend-deploy.onrender.com/
