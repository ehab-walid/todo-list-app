# ✅ Todo List App

A feature-rich todo list application built with JavaScript, bundled with Webpack. Organize tasks across multiple projects, set due dates and priorities, and track completion — with all data persisted in the browser via `localStorage`.

---

## ✨ Features

- **Add & delete tasks** — create and remove tasks as needed
- **Mark tasks complete** — toggle completion status for any task
- **Multiple projects/lists** — organize tasks into separate projects
- **Due dates & priority** — assign deadlines and priority levels to tasks
- **Persistent storage** — all data is saved to `localStorage`, so your tasks remain after closing the browser

---

## 🗂️ Project Structure

```
todo-list-app/
├── src/                    # Application source code
├── webpack.common.js       # Shared Webpack configuration
├── webpack.dev.js          # Development build configuration
├── webpack.prod.js         # Production build configuration
├── package.json            # Project metadata & scripts
└── .gitignore
```

---

## 🛠️ Built With

- **JavaScript** — application logic and DOM rendering
- **HTML & CSS** — structure and styling
- **Webpack** — module bundling, dev server, and production builds
- **localStorage** — client-side data persistence

---

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed

### Installation

```bash
# Clone the repository
git clone https://github.com/ehab-walid/todo-list-app.git
cd todo-list-app

# Install dependencies
npm install
```

### Run in development mode

```bash
npm run dev
```

This starts the Webpack dev server and opens the app in your browser.

### Build for production

```bash
npm run build
```

This bundles the app into the `dist/` folder.

---

## 👤 Author

**Ehab Walid** — [GitHub](https://github.com/ehab-walid)