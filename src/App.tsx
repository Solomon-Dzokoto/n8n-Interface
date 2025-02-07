import '@xyflow/react/dist/style.css'
import { ReactFlowProvider } from '@xyflow/react'
import Canvas from './Canva'
import LeftSidebar from './components/Left.Sidebar'
import TopBar from './components/Topbar'

const App = () => {
  return (
    <div className='min-h-screen flex bg-[#2d2d2e] min-w-screen'>
      <LeftSidebar/>
      <div>
        <TopBar/>
      <ReactFlowProvider>
          <Canvas />
      </ReactFlowProvider>
      </div>
   
    </div>
  )
}

export default App
