import React, { useId, useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "../lib/utils"; 
import { motion, useAnimation } from "framer-motion";

export const SparklesCore = (props) => {
  const {
    id,
    className,
    background,
    minSize,
    maxSize,
    speed,
    particleColor,
    particleDensity,
    hoverMode = "grab",
    interactionDistance = 100 // <--- NEW PROP (Controls the "Field Size")
  } = props;
  
  const [init, setInit] = useState(false);
  
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const controls = useAnimation();

  const particlesLoaded = async (container) => {
    if (container) {
      controls.start({
        opacity: 1,
        transition: {
          duration: 1,
        },
      });
    }
  };

  const generatedId = useId();

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: background || "transparent",
        },
      },
      fullScreen: {
        enable: false,
        zIndex: 1,
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: hoverMode,
          },
          resize: true,
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: interactionDistance, // <--- USES YOUR CUSTOM DISTANCE
            duration: 0.4,
          },
          grab: {
            distance: interactionDistance, // <--- USES YOUR CUSTOM DISTANCE
            links: {
              opacity: 0.5, 
              color: particleColor || "#ffffff" 
            },
          },
        },
      },
      particles: {
        bounce: {
          horizontal: { value: 1 },
          vertical: { value: 1 },
        },
        collisions: {
          absorb: { speed: 2 },
          bounce: {
            horizontal: { value: 1 },
            vertical: { value: 1 },
          },
          enable: false,
          maxSpeed: 50,
          mode: "bounce",
          overlap: {
            enable: true,
            retries: 0,
          },
        },
        color: {
          value: particleColor || "#ffffff",
        },
        links: {
          enable: false, 
          distance: 150,
          color: particleColor || "#ffffff",
          opacity: 0.4,
          width: 1,
        },
        move: {
          direction: "bottom-left",
          enable: true,
          outModes: {
            default: "out",
          },
          random: false,
          speed: {
            min: 0.1,
            max: speed || 1, // <--- USES YOUR CUSTOM SPEED
          },
          straight: false,
        },
        number: {
          density: {
            enable: true,
            width: 400,
            height: 400,
          },
          limit: {
            mode: "delete",
            value: 0,
          },
          value: particleDensity || 100,
        },
        opacity: {
          value: {
            min: 0.1,
            max: 1,
          },
          animation: {
            count: 0,
            enable: true,
            speed: 2,
            sync: false,
            mode: "auto",
            startValue: "random",
          },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: {
            min: minSize || 1,
            max: maxSize || 3,
          },
        },
      },
      detectRetina: true,
    }),
    [background, minSize, maxSize, speed, particleColor, particleDensity, hoverMode, interactionDistance]
  );
  
  return (
    <motion.div animate={controls} className={cn("opacity-0", className)}>
      {init && (
        <Particles
          id={id || generatedId}
          className={cn("h-full w-full")}
          particlesLoaded={particlesLoaded}
          options={options}
        />
      )}
    </motion.div>
  );
};