# React + Vite

## 1. Creating a React Application

```
npm init vite@latest
```
We have selected the following options.

✔ Project name: … React-Car-Parking-App-Demo  
✔ Select a framework: › React  
✔ Select a variant: › JavaScript  

cd React-Car-Parking-App-Demo
```
npm install
npm run dev
```

## 2. Project setup

we're going to use TailwindCSS to style the application.

##### Remove unnecessary files

deleted:    src/App.css  
deleted:    src/assets/react.svg  
deleted:    src/index.css  

##### Install TailwindCSS

Installing TailwindCSS as a PostCSS plugin is the most seamless way to integrate it with build tools like Vite.

```
npm install -D tailwindcss postcss autoprefixer
```

After installation run this command to publish the initial TailwindCSS configuration.

```
npx tailwindcss init
```
A new tailwind.config.cjs file will be created in the project root directory.

Now update this file to:

extended configuration to include more colors,
added the './src/**/*.jsx' value to the content key so TailwindCSS will look at all React's jsx files in the ./src folder for classes to compile.

Now manually create a new postcss.config.js configuration file in the project root directory with the following content.

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

Create a new src/assets/main.css file with the predefined CSS classes we are going to use for this demo project. Tailwind's @apply directive extracts repeated utility patterns to custom CSS classes, so instead of defining them every time on each element we basically "group" them.

@tailwind base;
@tailwind components;
@tailwind utilities;
 
@layer components {
    label.required {
        @apply before:text-red-600 before:content-['*'] before:mr-1;
    }
 
    .form-input {
        @apply p-1 border bg-gray-100 disabled:opacity-50;
    }
 
    .heading {
        @apply font-bold text-2xl mb-4 text-center;
    }
 
    .btn {
        @apply inline-flex items-center gap-2 justify-center p-2 font-bold relative disabled:!opacity-50 disabled:!cursor-progress;
    }
 
    .btn-primary {
        @apply text-white bg-blue-600 hover:bg-blue-500;
    }
 
    .btn-secondary {
        @apply text-white bg-gray-600 hover:bg-gray-500;
    }
 
    .btn-danger {
        @apply text-white bg-red-600 hover:bg-red-500;
    }
 
    .alert {
        @apply border px-4 py-3 rounded relative;
    }
 
    .alert-danger {
        @apply text-red-700 bg-red-100 border-red-400;
    }
 
    .alert-success {
        @apply text-green-700 bg-green-100 border-green-400
    }
 
    .plate {
        @apply font-mono font-bold uppercase;
    }
}	

3. Vite Config
Update Vite config vite.config.js with the following content.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

Here we imported the fileURLToPath function from the node and defined resolve.alias for our components so we can use the @ alias to define global paths when importing components instead of relative ones. This makes life easier if you later decide to move some components to different folders.

4. Update Project Files
After removing files not needed and the Vite configuration update we also need to update existing project files to get rid of any dead references and test if our TailwindCSS works.

Update the src/App.jsx file with the following content.

function App() {
  return (
    <div className="p-4">
      <h1 className="heading">Vite + React</h1>
      <div className="text-red-600">
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </div>
  )
}
 
export default App

And update the src/main.jsx file.

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import '@/assets/main.css'
 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

Now after restarting Vite and reloading the page you should see this page with some simple styling.

Post setup

5. Configure eslint
In this last step we are going to configure eslint as our linter for this project.

ℹ️ This step is optional, you can skip it and complete all course material without it.

ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, to make code more consistent and avoid bugs.

This is especially useful if you are planning to work in a team. There's a high chance that there will be some sort of tool to enforce specific code styles and patterns.

Install eslint with react plugins to allow the linter better understand the code with the following command.

npm install -D eslint eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks

Create a new file .eslintrc.cjs in the project root directory.

/* eslint-env node */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:jsx-a11y/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-hooks', 'jsx-a11y'],
  rules: {
    'no-undef': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}

Modern editors can detect eslint presence in your project and will highlight important places automatically, but you can also do that manually from the command line.

To do that manually you need to update the scripts section in your package.json file

from:

"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
},

to:

"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint . --ext .js,.jsx,.cjs,.mjs --fix --ignore-path .gitignore"
},

To lint your project now you can run this command.
```
npm run lint
```


# User Authentication

## React routing

1. By default react doesn't have included router so we need to install it manually with this command.

```
npm install react-router-dom --save
```

2. After successful installation let's prepare the first components we are going to navigate between. Create a new file src/views/Home.jsx with the following content.

```
function Home() {
  return <div>This is home view</div>
}
 
export default Home
```

3. And new src/views/auth/Register.jsx component.

4. Update the src/main.jsx file to this.


```
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import App from './App.jsx'
import './assets/main.css'
import Home from './views/Home.jsx'
import Register from './views/auth/Register.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <App /> }>
          <Route index element={ <Home /> } />
          <Route path='register' element={ <Register /> } />
        </Route>  
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

```

Here we import BrowserRouter, Routes, and Route components from react-router-dom

The whole app is wrapped in <BrowserRoute>. It stores the current location in the browser's address bar using clean URLs and navigates using the browser's built-in history stack.

<Routes> will match a set of child routes from the current location. Whenever the location changes, <Routes> look through all its child routes to find the best match and renders that branch of the UI. <Route> elements may be nested to indicate nested UI, which also corresponds to nested URL paths. Parent routes render their child routes by rendering an <Outlet>.

5. Update the src/App.jsx file.

```
import { Outlet, NavLink } from 'react-router-dom'
 
function App() {
  return (
    <div className="App">
      <header className="py-6 bg-gray-100 shadow">
        <div className="container md:px-2 px-4 mx-auto">
          <nav className="flex gap-4 justify-between">
            <div className="flex gap-4 items-center">
              <h2 className="text-xl font-bold">
                <div
                  className="inline-flex items-center justify-center bg-blue-600 w-6 h-6 text-center text-white rounded mr-1"
                >
                  P
                </div>
                myParking
              </h2>
              <NavLink end to="/" className={ ({isActive}) => {
                return isActive ? 'text-blue-600 underline' : 'text-blue-600'
              } }>Home</NavLink>
            </div>
            <div className="flex gap-4 items-center">
              <NavLink end to="/register" className={ ({isActive}) => {
                return isActive ? 'text-blue-600 underline' : 'text-blue-600'
              } }>Register</NavLink>
            </div>
          </nav>
        </div>
      </header>
      <div className="container md:px-2 px-4 pt-8 md:pt-16 mx-auto">
        <Outlet />
      </div>
    </div>
  )
}
 
export default App

```

In a place where <Outlet /> is defined will be rendered our <Home> and <Register> components when the route defined matches them.

A <NavLink> is a special kind of React's regular <Link> that knows whether or not it is "active". This is useful when building a navigation menu where you'd like to show which of them is currently selected. It also provides useful context for assistive technology like screen readers. You can pass a function to either style or className that will allow you to customize the inline styling or the class string based on the component's active state. You can also pass a function as children to customize the content of the <NavLink> component based on their active state, especially useful to change styles on internal elements.


```
<NavLink end to="/" className={ ({isActive}) => {
  return isActive ? 'text-blue-600 underline' : 'text-blue-600'
} }>Home</NavLink>
```

If the end prop is used like in our case, it will ensure this component isn't matched as "active" when its descendant paths are matched. For example, to render a link that is only active at the website root and not any other URLs.

