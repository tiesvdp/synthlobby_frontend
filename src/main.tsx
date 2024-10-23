import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import { PrimeReactProvider } from 'primereact/api';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider value={{ unstyled: false }}>
      <h1>Hello! This is gonna be my React project.</h1>
    </PrimeReactProvider>
  </StrictMode>,
)
