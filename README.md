# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended Setup

- [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (previously Volar) and disable Vetur

- Use [vue-tsc](https://github.com/vuejs/language-tools/tree/master/packages/tsc) for performing the same type checking from the command line, or for generating d.ts files for SFCs.

## Install and use

- Get the project code

```bash
git clone https://github.com/juanvizarro/securitec-frontend-challenge.git
```

- Find project folder

```bash
cd securitec-frontend-challenge
```
- Install dependencies

```bash
yarn install
```
  or
```bash
npm run install
```

- Add the following environment variables to your `.env` file

`VITE_API_URL`
`VITE_USERNAME` 
`VITE_PASSWORD`

#### Recommendation: copy the enviroment variables from `.env.example` file. `VITE_USERNAME` and `VITE_PASSWORD` are those provided through the challenge document and must be enclosed in quotes

- Run project

```bash
yarn dev
```
or
```bash
npm run dev
```
#### Note: if not exists a token, session.helper file generate a token using the default credentials

- Open browser and execute http://localhost:5173/