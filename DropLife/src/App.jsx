import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./Components/NavBar";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./routes";


import HomePage from './Pages/HomePage'
import {Register} from "./Pages/registerPage";
import { LoginPage } from "./Pages/LoginPage";


function App() {
  return(
    <AuthProvider>
      <BrowserRouter>
        <main className="container content-container mx-auto px-10 md:px-0">
          <Navbar />
          <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/login' element={<LoginPage />}/> 
            <Route path='/register' element={<Register />}/>
            <Route element={<ProtectedRoute /> }>
              <Route path='/admin' element={<h1> Page Admin</h1>}/>
              <Route path='/user_reports' element={<h1> Page Reports</h1>}/>
              <Route path='/user_influencer' element={<h1>Page Influencer</h1>}/>
              <Route path='/profile' element={<h1> Profile user</h1>}/>
            </Route>
          </Routes>        
        </main>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App