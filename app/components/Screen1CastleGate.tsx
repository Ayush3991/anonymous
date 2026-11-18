'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from './ui/PageTransition'
import MagicalButton from './ui/MagicalButton'

interface Screen1Props {
  onNext: () => void
}

export default function Screen1CastleGate({ onNext }: Screen1Props) {
  const [gateOpen, setGateOpen] = useState(false)

  const handleEnter = useCallback(() => {
    setGateOpen(true)
    setTimeout(() => {
      onNext()
    }, 1800)
  }, [onNext])

  return (
    <PageTransition>
      <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4">
        {/* Castle SVG Illustration */}
        <div className="relative mb-8 flex items-end justify-center">
          {/* Golden glow behind the gate */}
          <AnimatePresence>
            {gateOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 2.5 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute bottom-12 left-1/2 z-0 h-48 w-48 -translate-x-1/2 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(244,208,63,0.9) 0%, rgba(244,208,63,0.4) 40%, transparent 70%)',
                }}
              />
            )}
          </AnimatePresence>

          <svg
            width="300"
            height="320"
            viewBox="0 0 300 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10"
          >
            {/* Left Tower */}
            <rect x="30" y="100" width="50" height="180" rx="4" fill="#e8a4c8" />
            {/* Left Tower Roof */}
            <polygon points="25,100 55,30 85,100" fill="#c97aab" />
            {/* Left Tower Windows */}
            <rect x="47" y="130" width="16" height="22" rx="8" fill="#fff9fb" opacity="0.7" />
            <rect x="47" y="175" width="16" height="22" rx="8" fill="#fff9fb" opacity="0.7" />
            <rect x="47" y="220" width="16" height="22" rx="8" fill="#fff9fb" opacity="0.7" />
            {/* Left Tower Tip Glow */}
            <circle cx="55" cy="30" r="5" fill="#f0d68a" opacity="0.9">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Right Tower */}
            <rect x="220" y="100" width="50" height="180" rx="4" fill="#e8a4c8" />
            {/* Right Tower Roof */}
            <polygon points="215,100 245,30 275,100" fill="#c97aab" />
            {/* Right Tower Windows */}
            <rect x="237" y="130" width="16" height="22" rx="8" fill="#fff9fb" opacity="0.7" />
            <rect x="237" y="175" width="16" height="22" rx="8" fill="#fff9fb" opacity="0.7" />
            <rect x="237" y="220" width="16" height="22" rx="8" fill="#fff9fb" opacity="0.7" />
            {/* Right Tower Tip Glow */}
            <circle cx="245" cy="30" r="5" fill="#f0d68a" opacity="0.9">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="0.5s" />
            </circle>

            {/* Center Wall */}
            <rect x="80" y="120" width="140" height="160" fill="#f0b4d4" />

            {/* Battlements on center wall */}
            <rect x="80" y="108" width="22" height="20" fill="#f0b4d4" />
            <rect x="112" y="108" width="22" height="20" fill="#f0b4d4" />
            <rect x="166" y="108" width="22" height="20" fill="#f0b4d4" />
            <rect x="198" y="108" width="22" height="20" fill="#f0b4d4" />

            {/* Crown above gate */}
            <polygon points="130,105 135,85 140,100 150,78 160,100 165,85 170,105" fill="#d4a843" stroke="#c49530" strokeWidth="1" />
            {/* Crown jewels */}
            <circle cx="140" cy="97" r="3" fill="#e84393" />
            <circle cx="150" cy="86" r="3.5" fill="#e84393" />
            <circle cx="160" cy="97" r="3" fill="#e84393" />

            {/* Gate Arch */}
            <path d="M110 280 L110 190 Q110 150 150 150 Q190 150 190 190 L190 280" fill="#8b5e3c" />

            {/* Gate Doors - two halves */}
            <g>
              <motion.g
                animate={gateOpen ? { rotateY: -85 } : { rotateY: 0 }}
                transition={{ duration: 1.0, ease: 'easeInOut' }}
                style={{ originX: '110px', originY: '215px', transformOrigin: '110px 215px' }}
              >
                <path d="M110 280 L110 190 Q110 150 150 150 L150 280 Z" fill="#6d4524" stroke="#5a3a1e" strokeWidth="1" />
                {/* Left door details */}
                <circle cx="142" cy="215" r="4" fill="#d4a843" />
                <line x1="130" y1="170" x2="130" y2="270" stroke="#5a3a1e" strokeWidth="0.5" opacity="0.4" />
              </motion.g>
              <motion.g
                animate={gateOpen ? { rotateY: 85 } : { rotateY: 0 }}
                transition={{ duration: 1.0, ease: 'easeInOut' }}
                style={{ originX: '190px', originY: '215px', transformOrigin: '190px 215px' }}
              >
                <path d="M190 280 L190 190 Q190 150 150 150 L150 280 Z" fill="#6d4524" stroke="#5a3a1e" strokeWidth="1" />
                {/* Right door details */}
                <circle cx="158" cy="215" r="4" fill="#d4a843" />
                <line x1="170" y1="170" x2="170" y2="270" stroke="#5a3a1e" strokeWidth="0.5" opacity="0.4" />
              </motion.g>
            </g>

            {/* Pink Bow at top center */}
            <g transform="translate(150, 72)">
              {/* Left loop */}
              <path d="M0,0 Q-20,-18 -8,-5 Q-18,-20 0,-5" fill="#f8a4c8" stroke="#e8749e" strokeWidth="1" />
              {/* Right loop */}
              <path d="M0,0 Q20,-18 8,-5 Q18,-20 0,-5" fill="#f8a4c8" stroke="#e8749e" strokeWidth="1" />
              {/* Left ribbon loop (larger) */}
              <ellipse cx="-12" cy="-8" rx="10" ry="7" fill="#f8a4c8" stroke="#e8749e" strokeWidth="0.8" />
              {/* Right ribbon loop (larger) */}
              <ellipse cx="12" cy="-8" rx="10" ry="7" fill="#f8a4c8" stroke="#e8749e" strokeWidth="0.8" />
              {/* Center knot */}
              <circle cx="0" cy="-5" r="4" fill="#e8749e" />
              {/* Ribbon tails */}
              <path d="M-3,-1 L-10,15" stroke="#f8a4c8" strokeWidth="3" strokeLinecap="round" />
              <path d="M3,-1 L10,15" stroke="#f8a4c8" strokeWidth="3" strokeLinecap="round" />
            </g>

            {/* Decorative Lights (golden dots) */}
            {[
              [95, 135], [115, 125], [185, 125], [205, 135],
              [100, 250], [200, 250], [38, 260], [262, 260],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="3" fill="#f0d68a" opacity="0.8">
                <animate
                  attributeName="opacity"
                  values="0.4;1;0.4"
                  dur={`${1.5 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="r"
                  values="2.5;3.5;2.5"
                  dur={`${1.5 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </svg>
        </div>

        {/* Text Content */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-3 text-center font-script text-3xl text-deep-purple sm:text-4xl"
        >
          I made something special for you…
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mb-8 text-center font-body text-lg text-deep-purple/70"
        >
          A little surprise, just for my princess ♡
        </motion.p>

        {/* Button */}
        {!gateOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <MagicalButton onClick={handleEnter}>Enter the Kingdom ✨</MagicalButton>
          </motion.div>
        )}

        {/* Hearts & Sparkles Burst */}
        <AnimatePresence>
          {gateOpen && (
            <>
              {Array.from({ length: 16 }).map((_, i) => {
                const angle = (i / 16) * Math.PI * 2
                const distance = 120 + Math.random() * 100
                const emoji = i % 3 === 0 ? '✨' : i % 3 === 1 ? '💖' : '⭐'
                return (
                  <motion.span
                    key={`burst-${i}`}
                    initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
                    animate={{
                      opacity: 0,
                      x: Math.cos(angle) * distance,
                      y: Math.sin(angle) * distance - 40,
                      scale: 1.2,
                    }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 + i * 0.04 }}
                    className="pointer-events-none absolute z-20 text-xl"
                    style={{
                      left: '50%',
                      top: '40%',
                    }}
                  >
                    {emoji}
                  </motion.span>
                )
              })}
            </>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}
