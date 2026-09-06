import BackgroundVideo from './components/BackgroundVideo';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ComingSoon from './components/ComingSoon';

export default function App() {
  return (
    <div className="relative min-h-screen bg-black">
      <BackgroundVideo />
      <Navbar />
      <Hero />
      <ComingSoon />
      <footer className="relative z-10 bg-[#1a1a3d] py-4 text-center text-[11px] text-white/70">
        Copyright &copy; 2026 CatchOurSeason. All Rights Reserved.
      </footer>
    </div>
  );
}
