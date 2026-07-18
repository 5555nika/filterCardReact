import './App.css'
import { AppRouter } from './components/AppRouter'
import { Navbar } from './components/Navbar'


export const App = () => {

  
  return (  
    <div className='app-container'>
      
        <Navbar />
  
      
      <AppRouter /> 
    </div>
  )
}
