import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import HomePage from "./Pages/HomePage";

import Footer from "./Components/Footer";
import SolutionPage from "./Pages/SolutionPage";
import ServicePage from "./Pages/ServicePage";
import ServiceDetail from "./Components/Servicedetail";
import CareerPage from "./Pages/CareerPage";

import GalleryPage from "./Pages/GalleryPage";
import AdminPage from "./Pages/AdminPage";
import ContactDetailsPage from "./Pages/ContactDetailsPage";
import ScrollToTop from "./Components/ScrollToTop";
import AboutPage from "./Components/About/Aboutpage";
import TawkChat from "./Components/TawkChat";


function App() {
  return (
    <BrowserRouter>
      {/*
        FIXES:
        1. overflow-x-hidden only (overflow-hidden breaks sticky)
        2. bg aur text color sirf Navbar tak limited — StickyScroll
           ka apna white background hai, parent ka dark override nahi karega
           kyunki StickyScroll apna bg-white set karta hai
      */}
      <ScrollToTop />
        <TawkChat />
      <div className="min-h-screen ">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Solution" element={<SolutionPage />} />
          <Route path="/Service" element={<ServicePage />} />
          <Route path="/service/:slug" element={<ServiceDetail />} />
          <Route path="/Service" element={<ServicePage />} />
          <Route path="/CareerPage" element={<CareerPage />} />
          <Route path="/GalleryPage" element={<GalleryPage />} />
          <Route path="/AdminPage" element={<AdminPage />} />
          <Route
            path="/ContactPage"
            element={<ContactDetailsPage />}
          />

          <Route path="/AboutPage" element={<AboutPage />} />




        </Routes>
        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;
