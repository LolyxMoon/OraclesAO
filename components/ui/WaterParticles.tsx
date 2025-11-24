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
        fpsLimit: 60,
        detectRetina: true,
        background: { color: "transparent" },
        
        particles: {
          number: {
            value: 150, // ← MUCHAS MÁS PARTÍCULAS (antes 65)
            density: { 
              enable: true, 
              area: 800, // ← Más densidad
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
            value: isDark ? 0.4 : 0.3, // ← Más visibles
            animation: {
              enable: true,
              speed: 0.3,
              minimumValue: isDark ? 0.2 : 0.15,
              sync: false,
            },
          },
          
          size: {
            value: { min: 1.5, max: 4 }, // ← Partículas más grandes
            animation: {
              enable: true,
              speed: 0.8,
              minimumValue: 1,
              sync: false,
            },
          },
          
          links: {
            enable: true,
            distance: 120,
            color: isDark ? "#9b7dc8" : "#a388d5",
            opacity: isDark ? 0.25 : 0.2, // ← Links más visibles
            width: 1,
            triangles: {
              enable: true,
              opacity: isDark ? 0.035 : 0.025,
            },
          },
          
          // Movimiento suave
          move: {
            enable: true,
            speed: 0.15,
            direction: "none", // ← Movimiento en todas direcciones
            random: true,
            straight: false,
            outModes: { 
              default: "bounce", // ← Rebotan en los bordes, no desaparecen
            },
            attract: {
              enable: true,
              rotateX: 1000,
              rotateY: 2000,
            },
          },
        },
        
        // Interactividad SUAVE - sin desaparición
        interactivity: {
          detectsOn: "canvas",
          events: {
            onHover: {
              enable: true,
              mode: "grab", // ← Solo grab, sin repulse
              parallax: {
                enable: true,
                force: 30,
                smooth: 20,
              },
            },
            onClick: {
              enable: true,
              mode: "push", // ← Click agrega partículas
            },
            resize: {
              enable: true,
              delay: 0.5,
            },
          },
          modes: {
            // Conexiones al hover - suave
            grab: {
              distance: 150,
              links: {
                opacity: isDark ? 0.5 : 0.4,
                blink: false,
              },
            },
            // Click agrega partículas
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
