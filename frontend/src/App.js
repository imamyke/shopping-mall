import { Routes, Route } from "react-router-dom"
import { Home, Login, Signup, Cart, ProductDetail, Profile} from './pages'

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/signup' element={<Signup />} />
      <Route exact path='/product/:id' element={<ProductDetail />} />
      <Route exact path='/cart' element={<Cart />} />
      <Route exact path='/cart/:id' element={<Cart />} />
      <Route exact path='/profile' element={<Profile />} />
    </Routes>
  );
}

export default App;
