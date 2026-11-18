'use client'

import { motion } from 'framer-motion'
import MagicalButton from './ui/MagicalButton'
import FloatingParticles from './ui/FloatingParticles'
import PageTransition from './ui/PageTransition'

interface Screen4RevealProps {
  onNext: () => void
}

function CrownSVG() {
  return (
    <motion.div
      className="relative mx-auto mb-8"
      initial={{ scale: 0, rotate: -10 }}
      animate={{
        scale: 1,
        rotate: 0,
        y: [0, -10, 0],
      }}
      transition={{
        scale: { type: 'spring', stiffness: 150, damping: 12, delay: 0.3 },
        rotate: { type: 'spring', stiffness: 150, damping: 12, delay: 0.3 },
        y: {
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.2,
        },
      }}
    >
      {/* Glow aura */}
      <motion.div
        className="absolute inset-0 -m-6 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(212,168,67,0.35) 0%, rgba(240,214,138,0.15) 50%, transparent 70%)',
          filter: 'blur(20px)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Sparkles around crown */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 90 + (i * 7) % 20
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        const sz = 4 + (i * 3) % 4
        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{
              width: sz,
              height: sz,
              borderRadius: '50%',
              background: 'radial-gradient(circle, #f0d68a, #d4a843)',
              x: x - 2,
              y: y - 2,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 1.5 + i * 0.15,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          />
        )
      })}

      <svg
        width="140"
        height="120"
        viewBox="0 0 140 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 mx-auto block"
      >
        <defs>
          <linearGradient id="crownGold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f0d68a" />
            <stop offset="50%" stopColor="#d4a843" />
            <stop offset="100%" stopColor="#c49a38" />
          </linearGradient>
          <linearGradient id="crownHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff5d4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f0d68a" stopOpacity="0" />
          </linearGradient>
          <filter id="crownShadow">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#d4a843" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Crown body */}
        <path
          d="M15 85 L5 30 L35 55 L55 15 L70 50 L85 15 L105 55 L135 30 L125 85 Z"
          fill="url(#crownGold)"
          filter="url(#crownShadow)"
          stroke="#c49a38"
          strokeWidth="1.5"
        />

        {/* Crown highlight overlay */}
        <path
          d="M15 85 L5 30 L35 55 L55 15 L70 50 L85 15 L105 55 L135 30 L125 85 Z"
          fill="url(#crownHighlight)"
        />

        {/* Crown base band */}
        <rect x="15" y="80" width="110" height="12" rx="3" fill="url(#crownGold)" stroke="#c49a38" strokeWidth="1" />

        {/* Decorative dots on band */}
        <circle cx="42" cy="86" r="3" fill="#fff5d4" opacity="0.6" />
        <circle cx="70" cy="86" r="3" fill="#fff5d4" opacity="0.6" />
        <circle cx="98" cy="86" r="3" fill="#fff5d4" opacity="0.6" />

        {/* Gems on crown points */}
        {/* Center gem (top point) */}
        <ellipse cx="55" cy="22" rx="5" ry="6" fill="#e84393" opacity="0.85" />
        <ellipse cx="54" cy="20" rx="2" ry="2.5" fill="#ff9ff3" opacity="0.6" />

        {/* Right gem */}
        <ellipse cx="85" cy="22" rx="5" ry="6" fill="#a29bfe" opacity="0.85" />
        <ellipse cx="84" cy="20" rx="2" ry="2.5" fill="#dfe6e9" opacity="0.6" />

        {/* Middle gem */}
        <ellipse cx="70" cy="52" rx="4.5" ry="5" fill="#55efc4" opacity="0.75" />
        <ellipse cx="69" cy="50.5" rx="2" ry="2" fill="#ffffff" opacity="0.5" />

        {/* Left side gem */}
        <circle cx="35" cy="56" r="4" fill="#fd79a8" opacity="0.8" />
        <circle cx="34" cy="54.5" r="1.5" fill="#ffffff" opacity="0.5" />

        {/* Right side gem */}
        <circle cx="105" cy="56" r="4" fill="#74b9ff" opacity="0.8" />
        <circle cx="104" cy="54.5" r="1.5" fill="#ffffff" opacity="0.5" />
      </svg>
    </motion.div>
  )
}

export default function Screen4Reveal({ onNext }: Screen4RevealProps) {
  return (
    <PageTransition>
      <div className="relative flex min-h-dvh flex-col items-center justify-center px-6 py-12">
        <FloatingParticles />

        <CrownSVG />

        <motion.h1
          className="mb-4 text-center text-4xl leading-snug text-pink-700 sm:text-5xl"
          style={{ fontFamily: 'var(--font-script)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          Happy Princess Day, Cutie 👑
        </motion.h1>

        <motion.p
          className="mb-10 max-w-sm text-center text-base leading-relaxed text-pink-600/80 sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          This little surprise is just a reminder that you deserve all the
          beautiful things in the world.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          <MagicalButton onClick={onNext}>
            See what I made for you →
          </MagicalButton>
        </motion.div>
      </div>
    </PageTransition>
  )
}
