import { useEffect, useState } from "react";
import Particles from "@/components/ui/particles"; // Make sure this component exists

export function ParticlesBg() {
    const [color, setColor] = useState("#ffffff");

    return (
        <div className="fixed top-0 left-0 w-full h-full z-0">
            <Particles
                className="absolute inset-0"  // Ensure particles are placed behind other content
                quantity={100}
                ease={80}
                color={color}
                refresh
            />
        </div>
    );
}
