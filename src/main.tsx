import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { IncidentProvider } from './context/IncidentContext'
import ErrorBoundary from './components/ErrorBoundary'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <IncidentProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </IncidentProvider>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
