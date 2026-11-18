'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { siteConfig } from '../lib/config'
import MagicalButton from './ui/MagicalButton'
import FloatingParticles from './ui/FloatingParticles'
import PageTransition from './ui/PageTransition'

/* ── Inline SVGs ─────────────────────────────────────────── */

function PinkBow() {
  return (
    <svg width="60" height="36" viewBox="0 0 60 36" fill="none" className="inline-block">
      <ellipse cx="15" cy="14" rx="14" ry="10" fill="#f8a4c8" opacity={0.85} />
      <ellipse cx="15" cy="14" rx="10" ry="7" fill="#fdd5e9" opacity={0.5} />
      <ellipse cx="45" cy="14" rx="14" ry="10" fill="#f8a4c8" opacity={0.85} />
      <ellipse cx="45" cy="14" rx="10" ry="7" fill="#fdd5e9" opacity={0.5} />
      <circle cx="30" cy="14" r="5" fill="#e8779c" />
      <path d="M28 19 Q24 30 20 34" stroke="#f8a4c8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M32 19 Q36 30 40 34" stroke="#f8a4c8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function TinyCrown() {
  return (
    <svg width="28" height="22" viewBox="0 0 28 22" fill="none" className="inline-block ml-2">
      <path d="M2 18 L6 6 L10 14 L14 2 L18 14 L22 6 L26 18Z" fill="url(#crownGold6)" stroke="#c9922e" strokeWidth="1" />
      <circle cx="14" cy="10" r="1.5" fill="#f8a4c8" />
      <circle cx="8" cy="13" r="1" fill="#c9a7eb" />
      <circle cx="20" cy="13" r="1" fill="#c9a7eb" />
      <defs>
        <linearGradient id="crownGold6" x1="2" y1="2" x2="26" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f0d68a" />
          <stop offset="1" stopColor="#d4a843" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/* ── Letter variants ─────────────────────────────────────── */

const letterLines = siteConfig.letterText

const deckledClip =
  'polygon(0% 2%, 2% 0%, 5% 1.5%, 8% 0%, 11% 2%, 14% 0.5%, 17% 1.8%, 20% 0%, 23% 1.2%, 26% 0.3%, 29% 2%, 32% 0.5%, 35% 1.6%, 38% 0%, 41% 2.2%, 44% 0.4%, 47% 1.5%, 50% 0%, 53% 2%, 56% 0.6%, 59% 1.8%, 62% 0.2%, 65% 2%, 68% 0.5%, 71% 1.6%, 74% 0%, 77% 2.1%, 80% 0.3%, 83% 1.5%, 86% 0%, 89% 2%, 92% 0.5%, 95% 1.8%, 98% 0%, 100% 2%, 100% 98%, 98% 100%, 95% 98.5%, 92% 100%, 89% 98%, 86% 99.5%, 83% 98.2%, 80% 100%, 77% 98.5%, 74% 99.8%, 71% 98%, 68% 99.5%, 65% 98.2%, 62% 100%, 59% 98%, 56% 99.4%, 53% 98.2%, 50% 100%, 47% 98.5%, 44% 99.6%, 41% 98%, 38% 100%, 35% 98.4%, 32% 99.5%, 29% 98%, 26% 99.7%, 23% 98.5%, 20% 100%, 17% 98.2%, 14% 99.5%, 11% 98%, 8% 100%, 5% 98.5%, 2% 100%, 0% 98%)'

const lineContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.22, delayChildren: 0.6 },
  },
}

const lineVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

/* ── Main component ──────────────────────────────────────── */

export default function Screen6Letter({ onNext }: { onNext: () => void }) {
  // 'sealed' → 'opened' → 'letter'
  const [phase, setPhase] = useState<'sealed' | 'opened' | 'letter'>('sealed')
  const [textDone, setTextDone] = useState(false)

  const handleTap = () => {
    if (phase !== 'sealed') return
    setPhase('opened')
    // After the letter slides out and envelope fades, show full letter
    setTimeout(() => setPhase('letter'), 1800)
  }

  return (
    <PageTransition centerContent={phase !== 'letter'}>
      <div className="relative flex w-full flex-1 flex-col items-center justify-center px-2 py-8 sm:px-4 sm:py-12">
        <FloatingParticles count={14} />

        {/* ═══ ENVELOPE (sealed + opened phases) ═══ */}
        <AnimatePresence>
          {phase !== 'letter' && (
            <motion.div
              key="envelope-scene"
              className="flex flex-col items-center gap-5"
              exit={{ opacity: 0, scale: 0.8, y: -40 }}
              transition={{ duration: 0.6, ease: 'easeIn' }}
            >
              {/* Floating wrapper */}
              <motion.div
                className="relative cursor-pointer"
                animate={phase === 'sealed' ? { y: [0, -8, 0] } : { y: 0 }}
                transition={phase === 'sealed' ? { duration: 3, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
                onClick={handleTap}
              >
                {/* Glow behind envelope */}
                <div
                  className="absolute -inset-10 rounded-full opacity-40"
                  style={{
                    background: 'radial-gradient(circle, rgba(248,164,200,0.5) 0%, transparent 70%)',
                    filter: 'blur(16px)',
                  }}
                />

                {/* The single envelope — 220×160 */}
                <div className="relative" style={{ width: 220, height: 160 }}>
                  {/* Envelope body (back) */}
                  <div
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: 'linear-gradient(180deg, #fff0f5 0%, #fde0ee 100%)',
                      border: '2px solid #f0b4d4',
                    }}
                  />

                  {/* Letter card that slides out on open */}
                  <motion.div
                    className="absolute left-3 right-3 rounded-md"
                    style={{
                      height: 130,
                      backgroundColor: '#fdf8f0',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                    }}
                    initial={{ top: 20 }}
                    animate={phase === 'opened' ? { top: -90 } : { top: 20 }}
                    transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Mini letter preview lines */}
                    <div className="p-4 pt-5 space-y-2.5">
                      <div className="h-1.5 w-2/3 mx-auto rounded-full bg-[#d4a843]/30" />
                      <div className="h-1 w-full rounded-full bg-stone-300/25" />
                      <div className="h-1 w-5/6 rounded-full bg-stone-300/25" />
                      <div className="h-1 w-full rounded-full bg-stone-300/25" />
                      <div className="h-1 w-3/5 rounded-full bg-stone-300/25" />
                      <div className="h-1 w-4/5 rounded-full bg-stone-300/25" />
                    </div>
                  </motion.div>

                  {/* Envelope flap (front triangle) — lifts up when opened */}
                  <motion.div
                    className="absolute left-0 right-0 top-0 z-10"
                    style={{
                      transformOrigin: 'top center',
                      perspective: 600,
                    }}
                    animate={phase === 'opened' ? { rotateX: 180 } : { rotateX: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  >
                    <svg width="220" height="80" viewBox="0 0 220 80" fill="none">
                      <path
                        d="M2 2 L110 72 L218 2"
                        fill="#fdd5e9"
                        stroke="#f0b4d4"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>

                  {/* Envelope front panel (covers bottom of letter) */}
                  <div
                    className="absolute bottom-0 left-0 right-0 z-20 rounded-b-lg"
                    style={{
                      height: 90,
                      background: 'linear-gradient(180deg, #fde8f2 0%, #fdd5e9 100%)',
                      borderLeft: '2px solid #f0b4d4',
                      borderRight: '2px solid #f0b4d4',
                      borderBottom: '2px solid #f0b4d4',
                    }}
                  />

                  {/* Heart seal — stays on front, fades when opened */}
                  <motion.div
                    className="absolute z-30"
                    style={{ left: '50%', top: '45%', transform: 'translate(-50%, -50%)' }}
                    animate={phase === 'opened' ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <circle cx="16" cy="16" r="14" fill="#e8749e" />
                      <path
                        d="M16 22 C16 22 9 15 9 12 C9 9 12 7 16 11 C20 7 23 9 23 12 C23 15 16 22 16 22Z"
                        fill="#fff0f5"
                      />
                    </svg>
                  </motion.div>
                </div>

                {/* Sparkle burst on open */}
                <AnimatePresence>
                  {phase === 'opened' && (
                    <>
                      {Array.from({ length: 8 }).map((_, i) => {
                        const angle = (i / 8) * Math.PI * 2
                        const dist = 50 + (i * 13) % 40
                        return (
                          <motion.span
                            key={`sp-${i}`}
                            className="absolute text-sm pointer-events-none"
                            style={{ left: '50%', top: '40%' }}
                            initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                            animate={{
                              opacity: [0, 1, 0],
                              x: Math.cos(angle) * dist,
                              y: Math.sin(angle) * dist,
                              scale: [0, 1, 0.5],
                            }}
                            transition={{ duration: 0.8, delay: 0.2 + i * 0.04, ease: 'easeOut' }}
                          >
                            {i % 3 === 0 ? '💌' : i % 3 === 1 ? '♡' : '✨'}
                          </motion.span>
                        )
                      })}
                    </>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Tap instruction */}
              {phase === 'sealed' && (
                <motion.p
                  className="font-body text-sm text-deep-purple/50"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Tap to open my letter ♡
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ FULL LETTER ═══ */}
        <AnimatePresence>
          {phase === 'letter' && (
            <motion.div
              key="letter-card"
              initial={{ y: 60, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-lg"
            >
              {/* Outer glow */}
              <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-blush/30 via-lavender/20 to-gold-light/20 blur-xl" />

              {/* Paper */}
              <div
                className="relative rounded-sm px-6 py-8 sm:px-10 sm:py-10"
                style={{
                  backgroundColor: '#fdf8f0',
                  clipPath: deckledClip,
                  boxShadow:
                    'inset 0 0 60px rgba(200,180,160,0.12), 0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                {/* Paper texture */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
                  }}
                />

                {/* Top border */}
                <div className="mx-auto mb-4 h-px w-3/4 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

                {/* Top decorations */}
                <div className="mb-5 flex items-center justify-center gap-1">
                  <PinkBow />
                  <TinyCrown />
                </div>

                {/* Heading */}
                <motion.h2
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="font-script mb-6 text-center text-3xl sm:text-4xl"
                  style={{ color: '#d4a843' }}
                >
                  My Dearest Princess
                </motion.h2>

                {/* Letter lines */}
                <motion.div
                  variants={lineContainerVariants}
                  initial="hidden"
                  animate="visible"
                  onAnimationComplete={() => setTextDone(true)}
                  className="font-body space-y-1 text-sm leading-relaxed text-stone-700 sm:text-base"
                >
                  {letterLines.map((line, i) => (
                    <motion.p
                      key={i}
                      variants={lineVariants}
                      className={line.trim() === '' ? 'h-4' : ''}
                    >
                      {line}
                    </motion.p>
                  ))}
                </motion.div>

                {/* Closing + button */}
                <AnimatePresence>
                  {textDone && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                      className="mt-8 flex flex-col items-center gap-6"
                    >
                      <div className="h-px w-1/2 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                      <p className="font-script text-2xl sm:text-3xl" style={{ color: '#d4a843' }}>
                        Forever yours ♡
                      </p>
                      <MagicalButton onClick={onNext}>
                        One Last Thing… ✨
                      </MagicalButton>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}
