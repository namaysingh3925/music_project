// App.jsx
import { PlayerProvider } from "./context/PlayerContext"; // add this

function App() {
  // ... your existing state/useEffect ...

  return (
    <PlayerProvider>          {/* ← wrap everything here */}
      <div className="app-container">
        <div className="navbar"><Navbar /></div>
        <div className="main-layout">
          <Sidebar />
          <main className="content-area">
            <Routes>
              <Route path="/" element={<Home token={token} />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signin" element={<Signin />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </PlayerProvider>
  );
}