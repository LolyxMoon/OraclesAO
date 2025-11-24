"use client"

import { useCallback } from "react"
import { useTheme } from "next-themes"
import Particles from "react-tsparticles"
import type { Engine } from "tsparticles-engine"
import { loadSlim } from "tsparticles-slim"

type Props = { className?: string }

export default function WaterParticles({ className }: Props) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  
  const init = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  return (
    <Particles
      id="aona-water-particles"
      init={init}
      className={className}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
      options={{
        fullScreen: { enable: false },
        fpsLimit: 60,
        detectRetina: true,
        background: { color: "transparent" },
        
        particles: {
          number: {
            value: 180, // Más partículas
            density: { 
              enable: true, 
              area: 1000, // Distribución más uniforme
            },
          },
          
          // Colores VIOLETA
          color: {
            value: isDark 
              ? ["#9b7dc8", "#a388d5", "#8b6cb8", "#b59bdc"]
              : ["#a388d5", "#9b7dc8", "#b59bdc", "#8b6cb8"],
          },
          
          shape: {
            type: "circle",
          },
          
          opacity: {
            value: isDark ? 0.4 : 0.3,
            animation: {
              enable: true,
              speed: 0.3,
              minimumValue: isDark ? 0.2 : 0.15,
              sync: false,
            },
          },
          
          size: {
            value: { min: 1.5, max: 4 },
            animation: {
              enable: true,
              speed: 0.8,
              minimumValue: 1,
              sync: false,
            },
          },
          
          links: {
            enable: true,
            distance: 130,
            color: isDark ? "#9b7dc8" : "#a388d5",
            opacity: isDark ? 0.25 : 0.2,
            width: 1,
            triangles: {
              enable: true,
              opacity: isDark ? 0.035 : 0.025,
            },
          },
          
          // Movimiento en todas direcciones
          move: {
            enable: true,
            speed: 0.2,
            direction: "none",
            random: true,
            straight: false,
            outModes: { 
              default: "bounce",
            },
            attract: {
              enable: false, // Sin atracción para distribución uniforme
            },
          },
        },
        
        // Interactividad suave
        interactivity: {
          detectsOn: "window", // Detectar en toda la ventana
          events: {
            onHover: {
              enable: true,
              mode: "grab",
              parallax: {
                enable: true,
                force: 30,
                smooth: 20,
              },
            },
            onClick: {
              enable: true,
              mode: "push",
            },
            resize: {
              enable: true,
              delay: 0.5,
            },
          },
          modes: {
            grab: {
              distance: 150,
              links: {
                opacity: isDark ? 0.5 : 0.4,
                blink: false,
              },
            },
            push: {
              quantity: 4,
            },
          },
        },
        
        smooth: true,
        pauseOnBlur: true,
        pauseOnOutsideViewport: true,
      }}
    />
  )
}
