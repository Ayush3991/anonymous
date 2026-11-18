'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import PageTransition from './ui/PageTransition'
import MagicalButton from './ui/MagicalButton'
import FloatingParticles from './ui/FloatingParticles'

interface Screen2Props {
  onNext: () => void
}

export default function Screen2Welcome({ onNext }: Screen2Props) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const crownX = useTransform(mouseX, [-200, 200], [-8, 8])
  const crownY = useTransform(mouseY, [-200, 200], [-6, 6])

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      mouseX.set(clientX - centerX)
      mouseY.set(clientY - centerY)
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('touchmove', handleMove as EventListener)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('touchmove', handleMove as EventListener)
    }
  }, [mouseX, mouseY])

  return (
    <PageTransition>
      <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6">
        <FloatingParticles variant="hearts" />

        {/* Decorative Crown SVG with parallax */}
        <motion.div
          style={{ x: crownX, y: crownY }}
          className="mb-6"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg
              width="120"
              height="90"
              viewBox="0 0 120 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Crown base */}
              <path
                d="M15 70 L15 35 L35 50 L60 15 L85 50 L105 35 L105 70 Z"
                fill="url(#crownGradient)"
                stroke="#c49530"
                strokeWidth="2"
              />
              {/* Crown band */}
              <rect x="15" y="65" width="90" height="10" rx="3" fill="#c49530" />

              {/* Jewels */}
              <circle cx="38" cy="55" r="5" fill="#e84393" />
              <circle cx="60" cy="42" r="6" fill="#e84393">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="82" cy="55" r="5" fill="#e84393" />

              {/* Sparkle tips */}
              <circle cx="15" cy="35" r="3.5" fill="#f0d68a">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" repeatCount="indefinite" />
              </circle>
              <circle cx="60" cy="15" r="4" fill="#f0d68a">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="0.3s" />
              </circle>
              <circle cx="105" cy="35" r="3.5" fill="#f0d68a">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" repeatCount="indefinite" begin="0.6s" />
              </circle>

              <defs>
                <linearGradient id="crownGradient" x1="15" y1="15" x2="105" y2="70" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#f0d68a" />
                  <stop offset="50%" stopColor="#d4a843" />
                  <stop offset="100%" stopColor="#f0d68a" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
          className="mb-4 text-center font-script text-4xl text-deep-purple sm:text-5xl"
        >
          Happy Princess Day! 👑
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mb-6 text-center font-body text-xl font-semibold text-deep-purple/80"
        >
          Today is your day, Princess.
        </motion.p>

        {/* Emotional Line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-10 max-w-sm text-center font-body text-base leading-relaxed text-deep-purple/60 italic"
        >
          Because every once in a while, someone deserves to be reminded just how special they are.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <MagicalButton onClick={onNext}>Continue →</MagicalButton>
        </motion.div>
      </div>
    </PageTransition>
  )
}
