'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { siteConfig } from '../lib/config'
import MagicalButton from './ui/MagicalButton'
import FloatingParticles from './ui/FloatingParticles'
import PageTransition from './ui/PageTransition'

/* ── Seeded random helper ────────────────────────────────── */
function seeded(seed: number) {
  let s = seed
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646 }
}

/* ── Twinkling stars background ──────────────────────────── */

function TwinklingStars() {
  const r = seeded(77)
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${r() * 100}%`,
    top: `${r() * 100}%`,
    size: r() * 2.5 + 1,
    delay: r() * 4,
    duration: 2 + r() * 3,
  }))

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
          }}
          animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/* ── Moonlight glow ──────────────────────────────────────── */

function MoonGlow() {
  return (
    <div className="pointer-events-none absolute inset-x-0 -top-20">
      <div
        className="mx-auto h-64 w-64 rounded-full opacity-20"
        style={{
          background:
            'radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(201,167,235,0.2) 40%, transparent 70%)',
        }}
      />
    </div>
  )
}

/* ── Golden crown SVG ────────────────────────────────────── */

function GoldenCrown() {
  return (
    <motion.svg
      width="100"
      height="80"
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ y: -120, opacity: 0, scale: 0.7 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <defs>
        <linearGradient id="crownGold7" x1="10" y1="0" x2="90" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f0d68a" />
          <stop offset="0.5" stopColor="#d4a843" />
          <stop offset="1" stopColor="#f0d68a" />
        </linearGradient>
        <filter id="crownGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#crownGlow)">
        <path
          d="M8 62 L20 20 L35 45 L50 8 L65 45 L80 20 L92 62Z"
          fill="url(#crownGold7)"
          stroke="#c9922e"
          strokeWidth="1.5"
        />
        {/* Jewels */}
        <circle cx="50" cy="32" r="4" fill="#f8a4c8" opacity={0.9} />
        <circle cx="32" cy="42" r="2.5" fill="#c9a7eb" opacity={0.9} />
        <circle cx="68" cy="42" r="2.5" fill="#c9a7eb" opacity={0.9} />
        {/* Base band */}
        <rect x="10" y="58" width="80" height="8" rx="3" fill="url(#crownGold7)" stroke="#c9922e" strokeWidth="1" />
        {/* Small jewels on band */}
        <circle cx="30" cy="62" r="2" fill="#f8a4c8" />
        <circle cx="50" cy="62" r="2" fill="#c9a7eb" />
        <circle cx="70" cy="62" r="2" fill="#f8a4c8" />
      </g>
    </motion.svg>
  )
}

/* ── Sparkle cluster / princess mascot ───────────────────── */

function SparkleCluster() {
  // A constellation of sparkles that drifts across the screen
  const sparkles = [
    { x: 0, y: 0, size: 8, delay: 0 },
    { x: -12, y: -14, size: 5, delay: 0.2 },
    { x: 14, y: -10, size: 6, delay: 0.1 },
    { x: -8, y: 12, size: 4, delay: 0.3 },
    { x: 10, y: 15, size: 5, delay: 0.15 },
    { x: -18, y: 2, size: 3, delay: 0.25 },
    { x: 20, y: 5, size: 4, delay: 0.35 },
    { x: 0, y: -20, size: 3, delay: 0.4 },
  ]

  return (
    <motion.div
      className="relative mx-auto h-16 w-16"
      animate={{ x: [-60, 60, -60] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    >
      {sparkles.map((s, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `calc(50% + ${s.x}px)`,
            top: `calc(50% + ${s.y}px)`,
          }}
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: s.delay,
            ease: 'easeInOut',
          }}
        >
          <svg width={s.size * 2} height={s.size * 2} viewBox="0 0 24 24" fill="none">
            <path
              d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z"
              fill="#f0d68a"
            />
          </svg>
        </motion.div>
      ))}

      {/* Floating hearts trailing the cluster */}
      {[0, 1, 2].map((i) => (
        <motion.span
          key={`heart-${i}`}
          className="absolute text-sm"
          style={{
            left: `calc(50% + ${30 + i * 16}px)`,
            top: `calc(50% + ${-5 + i * 8}px)`,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            y: [-5, -20],
            x: [0, 10],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.6 + 0.5,
            ease: 'easeOut',
          }}
        >
          ♡
        </motion.span>
      ))}
    </motion.div>
  )
}

/* ── Main component ──────────────────────────────────────── */

interface Screen7Props {
  onNext: () => void
  onReplay?: () => void
}

export default function Screen7Final({ onNext, onReplay }: Screen7Props) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1200),   // "Always My Princess"
      setTimeout(() => setPhase(2), 2700),   // subtitle
      setTimeout(() => setPhase(3), 4200),   // sparkle cluster
      setTimeout(() => setPhase(4), 5700),   // keep smiling lines
      setTimeout(() => setPhase(5), 7700),   // Happy Princess Day
      setTimeout(() => setPhase(6), 9700),   // with love / sign-off
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <PageTransition>
      <div
        className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden px-4 py-12"
        style={{
          background: 'linear-gradient(180deg, #2d1b4e 0%, #1a0e2e 100%)',
        }}
      >
        {/* Starry background */}
        <TwinklingStars />
        <MoonGlow />

        {/* Heavy floating particles */}
        <FloatingParticles count={30} />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-6 text-center">
          {/* 1. Golden crown */}
          <GoldenCrown />

          {/* Crown animated glow ring */}
          <motion.div
            className="absolute top-2 h-24 w-24 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(212,168,67,0.3) 0%, transparent 70%)',
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* 2. "Always My Princess" */}
          <AnimatePresence>
            {phase >= 1 && (
              <motion.h1
                key="title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="font-script text-4xl sm:text-5xl md:text-6xl"
                style={{
                  background:
                    'linear-gradient(135deg, #ffffff 0%, #f0d68a 50%, #d4a843 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 20px rgba(212,168,67,0.4))',
                }}
              >
                Always My Princess
              </motion.h1>
            )}
          </AnimatePresence>

          {/* 3. Subtitle */}
          <AnimatePresence>
            {phase >= 2 && (
              <motion.p
                key="subtitle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="font-body text-lg text-lavender sm:text-xl"
                style={{ color: '#e2d1f9' }}
              >
                Today, tomorrow, and always…
              </motion.p>
            )}
          </AnimatePresence>

          {/* 4. Sparkle cluster mascot */}
          <AnimatePresence>
            {phase >= 3 && (
              <motion.div key="mascot" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="my-4">
                <SparkleCluster />
              </motion.div>
            )}
          </AnimatePresence>

          {/* 5. Keep smiling lines */}
          <AnimatePresence>
            {phase >= 4 && (
              <motion.div
                key="keep-smiling"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.5 } },
                }}
                className="font-body space-y-2 text-lg sm:text-xl"
              >
                {[
                  'Keep smiling.',
                  'Keep shining.',
                  'Keep being beautifully YOU. ♡',
                ].map((line, i) => (
                  <motion.p
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.6 }}
                    style={{ color: '#e2d1f9' }}
                  >
                    {line}
                  </motion.p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* 6. "Happy Princess Day" */}
          <AnimatePresence>
            {phase >= 5 && (
              <motion.h2
                key="happy-day"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="font-script mt-4 text-4xl sm:text-5xl md:text-6xl"
                style={{
                  color: '#f0d68a',
                  textShadow:
                    '0 0 30px rgba(212,168,67,0.5), 0 0 60px rgba(212,168,67,0.3)',
                }}
              >
                Happy Princess Day 👑
              </motion.h2>
            )}
          </AnimatePresence>

          {/* 7. Sign-off */}
          <AnimatePresence>
            {phase >= 6 && (
              <motion.div
                key="signoff"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-body mt-6 space-y-1 text-lg"
                style={{ color: '#c9b8e0' }}
              >
                <p>With lots of love,</p>
                <p className="font-script text-2xl" style={{ color: '#f0d68a' }}>
                  {siteConfig.senderName}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Replay button */}
          <AnimatePresence>
            {phase >= 6 && onReplay && (
              <motion.div
                key="replay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="mt-10"
              >
                <MagicalButton onClick={onReplay}>
                  Replay ✨
                </MagicalButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  )
}
