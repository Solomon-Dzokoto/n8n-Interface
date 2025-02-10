import '@xyflow/react/dist/style.css'
import { ReactFlowProvider } from '@xyflow/react'
import Canvas from './Canva'
import LeftSidebar from './components/Left.Sidebar'
import TopBar from './components/Topbar'
import { Provider } from 'react-redux'
import {store} from './redux/store/store'

const App = () => {
  return (
    <Provider store={store}>
      <div className='min-h-screen flex bg-[#2d2d2e] min-w-screen'>
        <LeftSidebar />
        <div className='flex-1'>
          <TopBar />
          <ReactFlowProvider>
            <Canvas />
          </ReactFlowProvider>
        </div>

      </div>
    </Provider>
  )
}

export default App
