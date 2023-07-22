import Promo from "./Promo/Promo";
import Header from "../Header/Header";
import Project from "./Project/Project";
import Techno from "./Techno/Techno";
import Student from "./Student/Student";

export default function Main() {
  return (
    <div >
      <Header />
      <Promo/>
      <Project/>
      <Techno/>
      <Student/>
    </div>
  )
}
