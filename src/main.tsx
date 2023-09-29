import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { FiltersProvider } from './context/filters.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <FiltersProvider>
    <App />
  </FiltersProvider>
)
