import Header from './components/Header'
import Hero from './components/Hero'
import Categories from './components/Categories'
import Products from './components/Products'
import Features from './components/Features'
import HappyHours from './components/HappyHours'
import RecentNews from './components/RecentNews'
import Footer from './components/Footer'
import './App.css'
import { ThemeProvider } from '@/contexts/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Header />
        <Hero />
        <Categories />
        <Products />
        <Features />
        <HappyHours />
        <RecentNews />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App

