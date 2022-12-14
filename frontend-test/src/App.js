import './App.css';
import './components/Navbar';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Footer from './components/Footer';
import Menu from './components/Burger-menu';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Main />
      <Menu />
      <Footer />
    </div>
  );
}

export default App;
