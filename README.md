# Tekoá Cultural Archive Hub

## Project info

Este projeto é um hub para preservação e compartilhamento de culturas indígenas brasileiras.

## Como rodar o projeto localmente

1. Clone o repositório:
   ```sh
   git clone <URL_DO_REPOSITORIO>
   ```
2. Acesse a pasta do projeto:
   ```sh
   cd tekoa-cultural-archive-hub-frontend
   ```
3. Instale as dependências:
   ```sh
   npm install
   # ou
   yarn install
   ```
4. Inicie o servidor de desenvolvimento:
   ```sh
   npm run dev
   # ou
   yarn dev
   ```

## Tecnologias utilizadas
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Deploy

<<<<<<< HEAD
Para publicar o projeto, utilize a plataforma de sua preferência (Vercel, Netlify, etc) ou configure um servidor próprio.
=======
Simply open [Lovable](https://lovable.dev/projects/59582798-71cd-4aa5-b4f9-f8a31f1cb26e) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Variáveis de Ambiente (.env)

Este projeto utiliza variáveis de ambiente para configurar a URL do backend e outros parâmetros sensíveis. Siga os passos abaixo para configurar:

### 1. Instale as dependências (caso ainda não tenha feito)
```bash
npm install
```

### 2. Crie o arquivo `.env` na raiz do projeto frontend
```env
VITE_BACKEND_URL=http://localhost:8080
```

- Altere o valor conforme a URL/porta do seu backend.

### 3. Como usar no código
No código React, acesse a variável assim:
```js
const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/conteudos`;
```

### 4. Reinicie o servidor do frontend
Sempre que alterar o `.env`, reinicie o servidor Vite:
```bash
npm run dev
```

---
>>>>>>> recupera-alteracoes
