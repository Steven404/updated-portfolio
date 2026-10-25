import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Production builds ship prerendered HTML to hydrate; the dev server's root is empty
const container = document.getElementById('root')!
if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)
