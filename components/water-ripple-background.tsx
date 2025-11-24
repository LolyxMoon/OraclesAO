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
      options={{
        fullScreen: { enable: false },
        fpsLimit: 40,
        detectRetina: true,
        background: { color: "transparent" },
        
        particles: {
          number: {
            value: 65,
            density: { 
              enable: true, 
              area: 1000,
            },
          },
          
          // Colores VIOLETA
          color: {
            value: isDark 
              ? ["#9b7dc8", "#a388d5", "#8b6cb8"] // violeta brillante para dark
              : ["#a388d5", "#9b7dc8", "#b59bdc"], // violeta vibrante en light
          },
          
          shape: {
            type: "circle",
          },
          
          opacity: {
            value: isDark ? 0.3 : 0.22,
            animation: {
              enable: true,
              speed: 0.4,
              minimumValue: isDark ? 0.15 : 0.12,
              sync: false,
            },
          },
          
          size: {
            value: { min: 1.5, max: 3 },
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
            color: isDark ? "#9b7dc8" : "#a388d5", // violeta
            opacity: isDark ? 0.18 : 0.14,
            width: 0.9,
            triangles: {
              enable: true,
              opacity: isDark ? 0.025 : 0.018,
            },
          },
          
          // Movimiento suave
          move: {
            enable: true,
            speed: 0.12,
            direction: "bottom-right",
            random: true,
            straight: false,
            outModes: { 
              default: "out",
            },
            attract: {
              enable: true,
              rotateX: 1000,
              rotateY: 2000,
            },
          },
        },
        
        // Interactividad
        interactivity: {
          detectsOn: "canvas",
          events: {
            onHover: {
              enable: true,
              mode: ["grab", "repulse"],
              parallax: {
                enable: true,
                force: 50,
                smooth: 20,
              },
            },
            onClick: {
              enable: true,
              mode: "bubble",
            },
            resize: {
              enable: true,
              delay: 0.5,
            },
          },
          modes: {
            grab: {
                links: {
                  opacity: isDark ? 0.6 : 1.2,
                },
            },
            bubble: {
                distance: 260,
                size: 15,
                opacity: isDark ? 0.6 : 1,
              },
            repulse: {
              distance: 200,
              duration: 0.1,
              speed: 0.4,
              easing: "ease-out-cubic",
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