import { ToastProvider } from './components/radix-bulma-ui'
import { RadixBulmaUISample } from './samples/RadixBulmaUISample'
import 'bulma/css/bulma.min.css'
import './components/radix-bulma-ui/radix-bulma-ui.css'

function App() {
  return (
    <ToastProvider>
      <div className="app">
        <nav className="navbar is-dark">
          <div className="navbar-brand">
            <span className="navbar-item has-text-weight-bold">
              radix-bulma-ui
            </span>
          </div>
        </nav>

        <section className="section">
          <div className="container">
            <RadixBulmaUISample />
          </div>
        </section>

        <footer className="footer">
          <div className="content has-text-centered">
            <p className="is-size-7 has-text-grey">
              radix-bulma-ui - Radix UI + Bulma CSS Component Library
            </p>
          </div>
        </footer>
      </div>
    </ToastProvider>
  )
}

export default App
