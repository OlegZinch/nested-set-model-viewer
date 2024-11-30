import { type FC } from 'react'
import Board from './components/Board'

const App: FC = () => {
  return (
    <div className='container'>
      <header>
        <h1>Nested set model</h1>
      </header>

      <main>
        <Board />
      </main>
    </div>
  )
}

export default App
