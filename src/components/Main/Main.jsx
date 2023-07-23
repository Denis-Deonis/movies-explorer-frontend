import Header from "../Header/Header";
import Promo from "./Promo/Promo";
import Project from "./Project/Project";
import Techno from "./Techno/Techno";
import Student from "./Student/Student";
import Portfolio from "./Portfolio/Portfolio";
import Footer from "../Footer/Footer";


export default function Main() {
  return (
    <div >
      <Header theme={{ default: false }}/>
      <Promo/>
      <Project/>
      <Techno/>
      <Student/>
      <Portfolio/>
      <Footer/>
    </div>
  )
}
