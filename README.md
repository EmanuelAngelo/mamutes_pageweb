# Mamutes F.A. — Página Web (One-page)

Site one-page do time de Flag Football **Mamutes F.A.**, construído com **Vue 3 + Vuetify 4 + Tailwind CSS**.

## Stack

- Vue 3 + Vite
- Vuetify 4
- Tailwind CSS (v4)
- TypeScript
- Vue Router + Pinia
- ESLint

## Rodar localmente

```bash
npm install
npm run dev
```

Build/preview:

```bash
npm run build
npm run preview
```

Qualidade:

```bash
npm run type-check
npm run lint
npm run lint:fix
```

## Páginas e seções

A página principal é `src/pages/Home.vue` e é renderizada por `src/pages/index.vue`.

Seções:

- `Navbar` (scroll suave entre seções)
- `Hero`
- `Campeonatos`
- `Diretoria`
- `Atletas`
- `Jerseys` + modal de pedido
- `Patrocinadores`
- `Footer`

Componentes ficam em `src/components/mamutes/`.

## Dados (mock)

No momento as seções consomem dados locais em JSON:

- `src/entities/Championship.json`
- `src/entities/BoardMember.json`
- `src/entities/Athlete.json`
- `src/entities/Jersey.json`
- `src/entities/Sponsor.json`

Tipos TypeScript: `src/entities/types.ts`.

Pedidos de jersey (modal) são salvos no `localStorage` com a chave `mamutes_jersey_orders`.

## Tema / tokens

Tokens (cores + fontes Inter/Oswald) e utilitários (`bg-background`, `text-foreground`, etc.) estão em:

- `src/styles/tailwind.css`

Tema do Vuetify (primary/secondary/background/surface):

- `src/plugins/vuetify.ts`

## Observações

- O projeto usa **Vite 7** por compatibilidade com `@tailwindcss/vite` (Tailwind v4).

