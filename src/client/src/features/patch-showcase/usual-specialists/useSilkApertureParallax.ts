import { useEffect, type RefObject } from 'react'

type CalculateSilkParallaxOffsetArgs = {
  active: boolean
  elementHeight: number
  elementTop: number
  maxTravel: number
  reducedMotion: boolean
  viewportHeight: number
}

type CalculateSafeSilkParallaxTravelArgs = {
  requestedTravel: number
  safetyMargin: number
  sceneHeight: number
  viewportHeight: number
}

type UseSilkApertureParallaxArgs = {
  maxTravel: number
  rootRef: RefObject<HTMLElement | null>
  safetyMargin?: number
  viewportRef?: RefObject<HTMLElement | null>
  worldRef: RefObject<HTMLElement | null>
}

const clamp = (value: number, minimum: number, maximum: number): number =>
  Math.min(maximum, Math.max(minimum, value))

export const calculateSafeSilkParallaxTravel = ({
  requestedTravel,
  safetyMargin,
  sceneHeight,
  viewportHeight,
}: CalculateSafeSilkParallaxTravelArgs): number => {
  if (requestedTravel <= 0 || sceneHeight <= 0 || viewportHeight <= 0) return 0

  const safeTravel = Math.max(0, sceneHeight - viewportHeight - (2 * Math.max(0, safetyMargin)))
  return Math.min(requestedTravel, safeTravel)
}

export const calculateSilkParallaxOffset = ({
  active,
  elementHeight,
  elementTop,
  maxTravel,
  reducedMotion,
  viewportHeight,
}: CalculateSilkParallaxOffsetArgs): number => {
  if (!active || reducedMotion || elementHeight <= 0 || maxTravel <= 0 || viewportHeight <= 0) return 0

  const progress = clamp((viewportHeight - elementTop) / (viewportHeight + elementHeight), 0, 1)
  return (progress - 0.5) * maxTravel
}

export const useSilkApertureParallax = ({
  maxTravel,
  rootRef,
  safetyMargin = 0,
  viewportRef,
  worldRef,
}: UseSilkApertureParallaxArgs): void => {
  useEffect(() => {
    const root = rootRef.current
    const world = worldRef.current
    if (root === null || world === null || typeof window === 'undefined') return undefined

    const motionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    let active = typeof IntersectionObserver === 'undefined'
    let frame = 0

    const update = () => {
      frame = 0
      const bounds = root.getBoundingClientRect()
      const viewport = viewportRef?.current
      const safeTravel = viewport === undefined || viewport === null
        ? maxTravel
        : calculateSafeSilkParallaxTravel({
            requestedTravel: maxTravel,
            safetyMargin,
            sceneHeight: world.offsetHeight,
            viewportHeight: viewport.clientHeight,
          })
      const offset = calculateSilkParallaxOffset({
        active,
        elementHeight: bounds.height,
        elementTop: bounds.top,
        maxTravel: safeTravel,
        reducedMotion: motionQuery?.matches ?? false,
        viewportHeight: window.innerHeight,
      })
      world.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`
      world.dataset.silkParallaxOffset = offset.toFixed(2)
    }

    const scheduleUpdate = () => {
      if (frame !== 0) return
      frame = window.requestAnimationFrame(update)
    }

    const observer = typeof IntersectionObserver === 'undefined'
      ? null
      : new IntersectionObserver(([entry]) => {
        active = entry?.isIntersecting ?? false
        scheduleUpdate()
      })

    observer?.observe(root)
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    motionQuery?.addEventListener?.('change', scheduleUpdate)
    scheduleUpdate()

    return () => {
      observer?.disconnect()
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      motionQuery?.removeEventListener?.('change', scheduleUpdate)
      if (frame !== 0) window.cancelAnimationFrame(frame)
    }
  }, [maxTravel, rootRef, safetyMargin, viewportRef, worldRef])
}
