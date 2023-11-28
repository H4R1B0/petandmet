import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from 'components/User/Login'
import Register from 'components/User/Register'
import FindAccount from 'components/User/FindAccount'
import UserPage from 'routes/UserPage'
import MainPage from 'components/Main/MainPage'
import LiveList from 'components/Live/LiveList'
import AdoptCheckList from 'components/Adopt/AdoptCheckList'
import AdoptProcess from 'components/Adopt/AdoptProcess'
import AnimalList from 'components/Animal/AnimalList'
import VolunteerPage from 'components/Volunteer/VolunteerPage'
import WalkPage from 'components/Volunteer/walkpage'
import Navbar from 'components/Main/Navbar'
import Charge from 'components/Donate/Charge'
import ItemList from 'components/Item/ItemList'
import ItemDetail from 'containers/components/ItemDetail'
import StreamingPage from 'components/Streaming/StreamingPage'
import Live from 'components/Live/OpenVidu'
import Board from 'routes/Board'
import Center from 'routes/Center'
import Animal from 'routes/Animal'
import Footer from 'components/Main/Footer'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/faccount" element={<FindAccount />} />
        <Route path="/mypage/*" element={<UserPage />} />
        <Route path="/livelist" element={<LiveList />} />
        <Route path="/animallist" element={<AnimalList />} />
        <Route path="/adoptchecklist" element={<AdoptCheckList />} />
        <Route path="/adpotprocess" element={<AdoptProcess />} />
        <Route path="/volunteer" element={<VolunteerPage />} />
        <Route path="/walk" element={<WalkPage />} />
        <Route path="/donate/charge" element={<Charge />} />
        <Route path="/donate/item" element={<ItemList />} />
        <Route path="/donate/item/:id" element={<ItemDetail />} />
        <Route path="/live/streaming/:id" element={<StreamingPage />} />
        <Route path="/live/:id" element={<Live />} />
        <Route path="/board/*" element={<Board />} />
        <Route path="/admin/*" element={<Center />} />
        <Route path="/animal/*" element={<Animal />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
