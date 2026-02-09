import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Harizons AI</h1>
      <p>Deploy berhasil 🚀</p>
    </div>
  );
}
