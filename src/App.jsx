import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Process from './components/Process';
import ProjectCarousel from './components/ProjectCarousel';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Process />
        <ProjectCarousel />
        <Contact />
      </main>
      <Footer />
    </>
  );
}