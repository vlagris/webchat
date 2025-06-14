import '@/wdyr.ts';
import { createRoot } from 'react-dom/client'
import App from '@/App.tsx'
import '@/styles/index.scss'
import '@/services/firebase.ts'

createRoot(document.getElementById('root')!).render(
    <App />
)
