import { Suspense, useState } from 'react'
import CategoryGrid from './components/layout/CategoryGrid.tsx'
import ComingSoon from './components/layout/ComingSoon.tsx'
import ErrorBoundary from './components/layout/ErrorBoundary.tsx'
import Modal from './components/layout/Modal.tsx'
import ThemeToggle from './components/shared/ThemeToggle/ThemeToggle.tsx'
import { categories, categoryGroups } from './config/categories.ts'
import './App.css'

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected = categories.find((c) => c.id === selectedId) ?? null
  const Converter = selected?.status === 'available' ? selected.component : undefined

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Unit Converter</h1>
          <p>Choose a category to start converting.</p>
        </div>
        <ThemeToggle />
      </header>
      <main className="content">
        <CategoryGrid groups={categoryGroups} categories={categories} onSelect={setSelectedId} />
      </main>
      {selected && (
        <Modal label={`${selected.name} converter`} onClose={() => setSelectedId(null)}>
          {Converter ? (
            <ErrorBoundary key={selected.id}>
              <Suspense fallback={<p className="modal-loading" role="status">Loading…</p>}>
                <Converter />
              </Suspense>
            </ErrorBoundary>
          ) : (
            <ComingSoon category={selected} />
          )}
        </Modal>
      )}
    </div>
  )
}
