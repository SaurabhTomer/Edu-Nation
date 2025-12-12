import Nav from "../components/Nav";
import home from "../assets/home.jpg";
import { SiViaplay } from "react-icons/si";
import ai from "../assets/ai.png";
import ai1 from "../assets/searchAi.png";
import Logos from "../components/Logos";

function Home() {
  return (
    <div className="w-full overflow-hidden">
      <div className="w-full lg:h-[140vh] h-[70vh] relative">
        <Nav />
        <img src={home} alt="LMS background" />

        <span>Grow Your Skills to Advance</span>
        <span>Your Carrer Path</span>

        <div>
          <button>
            View All Courses <SiViaplay />{" "}
          </button>

          <button>
            Search with AI
            <img src={ai} />
            <img src={ai1} />{" "}
          </button>
        </div>
        <Logos/>
      </div>
    </div>
  );
}

export default Home;
