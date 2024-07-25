<h1 align="center">
  <a href="https://locomova.vercel.app/"><img src="public/logo.png" alt="Locomova" width="200"></a>
</h1>

<h4 align="center">Sistema de catálogo de veículos</h4>

<p align="center">
  <a href="https://locomova.vercel.app/" target="_blank">Demo</a> •
  <a href="#variáveis-de-ambiente">Variáveis</a> •
  <a href="#documentação-da-api">API</a> •
  <a href="#guia-rápido">Guia Rápido</a>
</p>

#

![screenshot](/public/screenshots/screenshot-mobile.png)
![screenshot](/public/screenshots/screenshot-desktop-1.png)
![screenshot](/public/screenshots/screenshot-desktop-2.png)

## Demo

[Link para demonstração](https://locomova.vercel.app/)

## Variáveis de ambiente

Para executar este projeto, você precisará adicionar as seguintes variáveis de ambiente ao seu arquivo .env

`SUPABASE_URL`

`SUPABASE_PRIVATE_KEY`

`JWT_SECRET`

## Documentação da API

[Link da documentação](https://documenter.getpostman.com/view/9699975/2sA3kRJ3XU)

## Guia Rápido

1. Faça um clone do repositório

```bash
npx degit 'johanvilela/locomova' locomova
cd locomova
```

2. Instale as dependências

```bash
npm install
```

3. Configure as variáveis de ambiente no arquivo `.env`

```
SUPABASE_URL=
SUPABASE_PRIVATE_KEY=
JWT_SECRET=
```

4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

5. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado
