import useMouse from '@react-hook/mouse-position';
import { AnimationProps } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react'
import mitt from 'mitt'

const cursorEmitter = mitt<{
  setCursor: string
}>()

const setCursorAnimate = (v: string) => cursorEmitter.emit('setCursor', v)

const useCursor = () => {
  const mouse = useMouse(null, {
    fps: 60
  })

  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  useEffect(() => {
    if (mouse.clientX !== null) {
      setX(mouse.clientX)
    }

    if (mouse.clientY !== null) {
      setY(mouse.clientY)
    }
  }, [mouse])

  const variants = useMemo(() => {
    return {
      default: {
        width: 20,
        height: 20,
        x,
        y,
        transition: {
          type: 'liner',
          duration: 0.1,
        },
      },
      nav: {
        width: 80,
        height: 80,
        x,
        y,
        transition: {
          type: 'liner',
          duration: 0.1,
        },
      }
    } as AnimationProps['variants']
  }, [x, y])

  const [cursorVariant, setCursorVariant] = useState('default')

  cursorEmitter.on('setCursor', (v) => {
    setCursorVariant(v)
  })

  return {
    variants,
    cursorVariant,
    setCursorVariant
  }
}

export { useCursor, setCursorAnimate }