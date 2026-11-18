'use client'

import { motion } from 'framer-motion'
import { siteConfig } from '../lib/config'
import MagicalButton from './ui/MagicalButton'
import PageTransition from './ui/PageTransition'
import PolaroidCard from './ui/PolaroidCard'

interface Screen5MemoriesProps {
  onNext: () => void
}

export default function Screen5Memories({ onNext }: Screen5MemoriesProps) {
  const memories = siteConfig.memories

  return (
    <PageTransition centerContent={false}>
      <div className="relative flex w-full flex-col items-center px-0 py-6 sm:px-2">
        {/* Header */}
        <motion.h1
          className="mb-2 text-center text-4xl text-pink-700 sm:text-5xl"
          style={{ fontFamily: 'var(--font-script)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          My Favorite Memories ♡
        </motion.h1>

        <motion.p
          className="mb-8 text-center text-base text-pink-500/80 sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          A few moments I&apos;d always choose to remember…
        </motion.p>

        {/* Gallery grid */}
        <div className="relative mx-auto mb-10 grid w-full max-w-md grid-cols-2 gap-4 px-2 sm:max-w-2xl sm:grid-cols-3 sm:gap-6">
          {memories.map((memory, index) => (
            <PolaroidCard key={memory.id} memory={memory} index={index} />
          ))}
        </div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: memories.length * 0.12 + 0.5, duration: 0.5 }}
          className="pb-10"
        >
          <MagicalButton onClick={onNext}>
            Read My Letter →
          </MagicalButton>
        </motion.div>
      </div>
    </PageTransition>
  )
}
