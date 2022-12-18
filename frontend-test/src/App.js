import './App.css';
import './components/Navbar';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Footer from './components/Footer';
import Menu from './components/Burger-menu';
import Menu_Owner from './components/Burger-menu-owner';

function App() {
    return (
    <div className="App">
      <Main />
      <Menu />
      <Footer />
    </div>
  );
}

export default App;
