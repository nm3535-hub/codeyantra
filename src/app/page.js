import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BusinessSolutions from "@/components/BusinessSolutions";
import EntertainmentLab from "@/components/EntertainmentLab";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <BusinessSolutions />
      <EntertainmentLab />
      <Contact />
      <Footer />
    </main>
  );
}
