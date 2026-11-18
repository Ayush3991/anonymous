'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { Memory } from '../../lib/config'

interface PolaroidCardProps {
  memory: Memory
  index: number
}

export default function PolaroidCard({ memory, index }: PolaroidCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const floatDelay = index * 0.4

  const handleClose = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setIsExpanded(false)
  }, [])

  return (
    <>
      {/* Gallery card (in-flow) */}
      <motion.div
        className="relative cursor-pointer"
        initial={{ opacity: 0, y: 60, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: index * 0.12, duration: 0.5, ease: 'easeOut' }}
        onClick={() => setIsExpanded(true)}
      >
        <motion.div
          className="relative rounded-sm bg-white p-2 pb-12 shadow-xl"
          style={{
            boxShadow:
              '0 8px 30px rgba(200, 100, 180, 0.2), 0 0 15px rgba(201, 167, 235, 0.15)',
          }}
          animate={{
            rotate: memory.rotation,
            y: [0, -6, 0],
          }}
          transition={{
            rotate: { duration: 0.3 },
            y: {
              duration: 3 + index * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: floatDelay,
            },
          }}
        >
          {/* Glowing edge */}
          <div
            className="pointer-events-none absolute -inset-[2px] rounded-sm opacity-50"
            style={{
              background:
                'linear-gradient(135deg, rgba(248,164,200,0.4), rgba(201,167,235,0.4))',
              filter: 'blur(4px)',
              zIndex: -1,
            }}
          />

          {/* Photo */}
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2px] bg-gray-100">
            <Image
              src={memory.src}
              alt={memory.caption}
              width={300}
              height={400}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Caption */}
          <p
            className="absolute bottom-2.5 left-0 right-0 text-center text-xs text-gray-500 sm:text-sm"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            {memory.caption}
          </p>
        </motion.div>
      </motion.div>

      {/* Expanded overlay modal — renders in a portal-like fixed layer */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />

            {/* Expanded card */}
            <motion.div
              className="fixed inset-0 z-[101] flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            >
              <motion.div
                className="relative max-h-[80vh] w-full max-w-xs rounded-sm bg-white p-3 pb-14 shadow-2xl sm:max-w-sm"
                style={{
                  boxShadow:
                    '0 25px 60px rgba(200, 100, 180, 0.4), 0 0 40px rgba(201, 167, 235, 0.3)',
                }}
                initial={{ scale: 0.7, rotate: memory.rotation }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Glow */}
                <div
                  className="pointer-events-none absolute -inset-1 rounded-sm opacity-60"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(248,164,200,0.5), rgba(201,167,235,0.5))',
                    filter: 'blur(8px)',
                    zIndex: -1,
                  }}
                />

                {/* Photo */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2px] bg-gray-100">
                  <Image
                    src={memory.src}
                    alt={memory.caption}
                    width={600}
                    height={800}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Caption */}
                <p
                  className="absolute bottom-4 left-0 right-0 text-center text-base text-gray-600"
                  style={{ fontFamily: 'var(--font-script)' }}
                >
                  {memory.caption}
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
