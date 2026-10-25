import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.tsx'

// Rendered once at build time (scripts/prerender.js) so crawlers and link
// previews get the page's content without running JavaScript
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
