# Vue Shop SPA

A modern single-page application (SPA) for a simple online shop, built with Vue 3, TypeScript, and Vite. This project demonstrates component-based architecture, state management, and best practices for frontend development.

## Features

- 🛒 Product listing and details
- 🛍️ Shopping cart with add/remove functionality
- 🔄 Centralized state management (Pinia)
- 🔗 Routing with Vue Router
- 🎨 Scoped and global CSS styling
- ⚡ Fast development with Vite
- ✅ Unit tests with Vitest

## Project Structure

```
├── public/
│   └── products.json         # Product data (mock API)
├── src/
│   ├── assets/               # Images and static assets
│   ├── components/           # Vue components (Cart, ProductList, etc.)
│   ├── router/               # Vue Router setup
│   ├── stores/               # Pinia store for shop state
│   ├── views/                # Main views (ShopView)
│   ├── App.vue               # Root component
│   ├── main.ts               # App entry point
│   ├── style.css             # Global styles
│   └── types.ts              # TypeScript types
├── index.html                # App HTML entry
├── package.json              # Project metadata and scripts
├── tsconfig*.json            # TypeScript configuration
├── vite.config.ts            # Vite configuration
└── vitest.config.ts          # Vitest configuration
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/vue-shop-spa.git
cd vue-shop-spa

# Install dependencies
npm install
# or
yarn install
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

### Building for Production

```bash
npm run build
# or
yarn build
```

### Running Tests

```bash
npm run test
# or
yarn test
```

## Main Technologies Used

- [Vue 3](https://vuejs.org/) (Composition API)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/) (state management)
- [Vue Router](https://router.vuejs.org/)
- [Vitest](https://vitest.dev/) (unit testing)

## Project Highlights

- **Component-based architecture:** All UI elements are split into reusable Vue components.
- **Centralized state:** The shopping cart and product data are managed in a Pinia store for predictable state updates.
- **Routing:** Navigation between product list, product details, and cart is handled by Vue Router.
- **Type safety:** All data structures are typed with TypeScript for reliability.
- **Styling:** Uses both global and scoped CSS for modular and maintainable styles.

## Folder Details

- `src/components/` – Contains UI components like `Cart.vue`, `ProductList.vue`, `ProductDetails.vue`, and `ShopHeader.vue`.
- `src/stores/shop.ts` – Pinia store for managing products and cart state.
- `src/views/ShopView.vue` – Main shop view.
- `public/products.json` – Mock product data used by the app.

## Customization

- To add or edit products, modify `public/products.json`.
- To add new features, create new components in `src/components/` and update the store or router as needed.

## License

This project is for educational purposes. Feel free to use, modify, and share.

---

**Author:** Michal Szczepanski

If you have any questions or suggestions, feel free to open an issue or contact me.
