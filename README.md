# DoubleTick Customers List

A high-performance React application that displays and manages 1 million customer records with virtual scrolling, search, and sorting.

## Features

- 1 Million Records generated locally using Faker.js
- Virtual Scrolling with only 50 rows rendered at a time
- Fast Search with 250ms debounce (name, email, phone)
- Sortable Columns (ascending/descending toggle)
- Responsive UI with modern design
- IndexedDB Storage for persistent data
- Non-functional Filter UI (display only)

## Running the Application

### Prerequisites

- Node.js 22 or higher
- npm (comes with Node.js)
- Modern browser with IndexedDB support

### Installation (Windows Terminal)

```powershell
cd doubletick-customers
npm install
```

### Development Mode

```powershell
npm run dev
```

App will open at:
[http://localhost:5173](http://localhost:5173)

### Production Build

```powershell
npm run build
npm run preview
```

### Live Demo

[https://doubletickss.vercel.app/](https://doubletickss.vercel.app/)
