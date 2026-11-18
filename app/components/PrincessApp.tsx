'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import MagicalBackground from './ui/MagicalBackground'
import FloatingParticles from './ui/FloatingParticles'
import Screen1CastleGate from './Screen1CastleGate'
import Screen2Welcome from './Screen2Welcome'
import Screen3Gift from './Screen3Gift'
import Screen4Reveal from './Screen4Reveal'
import Screen5Memories from './Screen5Memories'
import Screen6Letter from './Screen6Letter'
import Screen7Final from './Screen7Final'

// Screens that need scrolling (content taller than viewport)
const SCROLLABLE_SCREENS = new Set([5, 6])

export default function PrincessApp() {
  const [currentScreen, setCurrentScreen] = useState(1)
  const goToNext = () => setCurrentScreen((prev) => Math.min(prev + 1, 7))
  const replay = () => setCurrentScreen(1)

  const isScrollable = SCROLLABLE_SCREENS.has(currentScreen)

  return (
    <div
      className={`relative min-h-dvh w-full ${isScrollable ? 'overflow-y-auto overflow-x-hidden' : 'overflow-hidden'}`}
    >
      <MagicalBackground currentScreen={currentScreen} />
      <FloatingParticles
        variant={currentScreen === 7 ? 'night' : currentScreen >= 5 ? 'hearts' : 'default'}
      />

      <AnimatePresence mode="wait">
        {currentScreen === 1 && (
          <Screen1CastleGate key="s1" onNext={goToNext} />
        )}
        {currentScreen === 2 && (
          <Screen2Welcome key="s2" onNext={goToNext} />
        )}
        {currentScreen === 3 && (
          <Screen3Gift key="s3" onNext={goToNext} />
        )}
        {currentScreen === 4 && (
          <Screen4Reveal key="s4" onNext={goToNext} />
        )}
        {currentScreen === 5 && (
          <Screen5Memories key="s5" onNext={goToNext} />
        )}
        {currentScreen === 6 && (
          <Screen6Letter key="s6" onNext={goToNext} />
        )}
        {currentScreen === 7 && (
          <Screen7Final key="s7" onNext={goToNext} onReplay={replay} />
        )}
      </AnimatePresence>
    </div>
  )
}
