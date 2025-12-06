import Hero from "./components/ui/custom/Hero";
import { Button } from "./components/ui/button";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div className="px-5 mt-10">
      <Hero />
      <div className="mt-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome to AI Travel Planner</h2>
        <Link to="/create-trip">
          <Button>Plan Your Trip</Button>
        </Link>
      </div>
    </div>
  );
}
