'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from './ui/PageTransition'

interface Screen3Props {
  onNext: () => void
}

export default function Screen3Gift({ onNext }: Screen3Props) {
  const [unwrapping, setUnwrapping] = useState(false)

  const handleTap = useCallback(() => {
    if (unwrapping) return
    setUnwrapping(true)
    setTimeout(() => {
      onNext()
    }, 2200)
  }, [unwrapping, onNext])

  return (
    <PageTransition>
      <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mb-2 text-center font-script text-3xl text-deep-purple sm:text-4xl"
        >
          Guess what&apos;s waiting for you?
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-10 text-center font-body text-base text-deep-purple/60"
        >
          Something made with a little too much love…
        </motion.p>

        {/* Gift Box Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.6, type: 'spring', stiffness: 200 }}
          className="relative mb-8 cursor-pointer"
          onClick={handleTap}
        >
          {/* Floating animation wrapper */}
          <motion.div
            animate={!unwrapping ? { y: [0, -10, 0] } : {}}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            {/* Glow aura */}
            <motion.div
              className="absolute -inset-6 rounded-3xl"
              animate={
                unwrapping
                  ? { opacity: [0.5, 1], scale: [1, 2.5] }
                  : { opacity: [0.3, 0.6, 0.3] }
              }
              transition={
                unwrapping
                  ? { duration: 1.5, ease: 'easeOut' }
                  : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
              }
              style={{
                background: unwrapping
                  ? 'radial-gradient(circle, rgba(244,208,63,0.8) 0%, rgba(244,208,63,0.2) 50%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(248,164,200,0.4) 0%, transparent 70%)',
              }}
            />

            {/* Gift Box — stacked vertically: bow → lid → base */}
            <div className="relative flex flex-col items-center">
              {/* Bow on top */}
              <motion.div
                className="relative z-30 mb-[-8px]"
                animate={
                  unwrapping
                    ? { y: -120, rotateZ: 20, opacity: 0 }
                    : {}
                }
                transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              >
                <svg
                  width="70"
                  height="50"
                  viewBox="0 0 70 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Left loop */}
                  <ellipse cx="20" cy="22" rx="17" ry="12" fill="#f8a4c8" stroke="#e8749e" strokeWidth="1.5" />
                  {/* Right loop */}
                  <ellipse cx="50" cy="22" rx="17" ry="12" fill="#f8a4c8" stroke="#e8749e" strokeWidth="1.5" />
                  {/* Center knot */}
                  <circle cx="35" cy="25" r="7" fill="#e8749e" />
                  {/* Left tail */}
                  <path d="M28 30 L15 48" stroke="#f8a4c8" strokeWidth="5" strokeLinecap="round" />
                  {/* Right tail */}
                  <path d="M42 30 L55 48" stroke="#f8a4c8" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </motion.div>

              {/* Box Lid — flush on top of base */}
              <motion.div
                className="relative z-20 h-4 w-48 sm:w-56"
                animate={
                  unwrapping
                    ? { y: -100, rotateZ: -15, opacity: 0 }
                    : {}
                }
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              >
                <div className="h-full w-full rounded-t-lg bg-gradient-to-b from-[#f0b4d4] to-[#e8a4c8] shadow-md" />
                {/* Lid Ribbon */}
                <div className="absolute left-1/2 top-0 h-full w-5 -translate-x-1/2 bg-[#c97aab]/60" />
              </motion.div>

              {/* Box Base — no gap */}
              <div className="relative z-10 h-28 w-44 overflow-hidden rounded-b-xl rounded-t-sm bg-gradient-to-b from-[#f8a4c8] to-[#e890b8] shadow-lg sm:h-36 sm:w-52">
                {/* Vertical Ribbon */}
                <motion.div
                  className="absolute left-1/2 top-0 h-full w-5 -translate-x-1/2 bg-[#c97aab]/60"
                  animate={
                    unwrapping
                      ? { y: -200, opacity: 0 }
                      : {}
                  }
                  transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                />
                {/* Horizontal Ribbon */}
                <motion.div
                  className="absolute left-0 top-1/2 h-5 w-full -translate-y-1/2 bg-[#c97aab]/60"
                  animate={
                    unwrapping
                      ? { x: 300, opacity: 0 }
                      : {}
                  }
                  transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Instruction */}
        {!unwrapping && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ delay: 1.2, duration: 2, repeat: Infinity }}
            className="text-center font-body text-sm text-deep-purple/50"
          >
            Tap the gift to unwrap ✨
          </motion.p>
        )}

        {/* Hearts & Particles Burst on unwrap */}
        <AnimatePresence>
          {unwrapping && (
            <>
              {Array.from({ length: 20 }).map((_, i) => {
                const angle = (i / 20) * Math.PI * 2
                const distance = 100 + Math.random() * 140
                const emoji = ['💖', '✨', '🌟', '💝', '⭐', '💗'][i % 6]
                return (
                  <motion.span
                    key={`burst-${i}`}
                    initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
                    animate={{
                      opacity: 0,
                      x: Math.cos(angle) * distance,
                      y: Math.sin(angle) * distance - 30,
                      scale: [0, 1.5, 0.8],
                    }}
                    transition={{
                      duration: 1.5,
                      ease: 'easeOut',
                      delay: 0.6 + i * 0.05,
                    }}
                    className="pointer-events-none absolute z-40 text-2xl"
                    style={{ left: '50%', top: '45%' }}
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
