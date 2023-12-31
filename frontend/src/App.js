import { Routes, Route } from "react-router-dom"
import { 
  Home, 
  Login,
  Signup, 
  Cart, 
  AddToCartSuccess,
  FillOrder,
  Order,
  ProductDetail, 
  Profile,
  UserList,
  UserEdit,
  ProductList,
  ProductEdit,
  OrderList,
  MyOrders,
  EditProfile
} from './pages'

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/search/:keyword' element={<Home />} />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/signup' element={<Signup />} />
      <Route exact path='/product/:id' element={<ProductDetail />} />
      <Route exact path='/cart' element={<Cart />} />
      <Route exact path='/cart/:id' element={<AddToCartSuccess />} />
      <Route exact path='/fillorder' element={<FillOrder />} />
      <Route exact path='/order/:id' element={<Order />} />
      <Route exact path='/myorders' element={<MyOrders />} />
      <Route exact path='/profile' element={<Profile />} />
      <Route exact path='/editprofile' element={<EditProfile />} />
      <Route exact path='/admin/userlist' element={<UserList />} />
      <Route exact path='/admin/users/:id/edit' element={<UserEdit />} />
      <Route exact path='/admin/productlist' element={<ProductList />} />
      <Route exact path='/admin/products/:id/edit' element={<ProductEdit />} />
      <Route exact path='/admin/orderlist' element={<OrderList />} />
    </Routes>
  );
}

export default App;
