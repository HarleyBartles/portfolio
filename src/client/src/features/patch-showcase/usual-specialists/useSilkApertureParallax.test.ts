import { describe, expect, test } from 'vitest'
import {
  calculateSafeSilkParallaxTravel,
  calculateSilkParallaxOffset,
} from './useSilkApertureParallax'

describe('Silk aperture parallax calculation', () => {
  test('clamps requested travel to the scene bleed that remains after the safety margin', () => {
    expect(calculateSafeSilkParallaxTravel({
      requestedTravel: 32,
      safetyMargin: 8,
      sceneHeight: 464,
      viewportHeight: 400,
    })).toBe(32)

    expect(calculateSafeSilkParallaxTravel({
      requestedTravel: 32,
      safetyMargin: 8,
      sceneHeight: 440,
      viewportHeight: 400,
    })).toBe(24)

    expect(calculateSafeSilkParallaxTravel({
      requestedTravel: 32,
      safetyMargin: 8,
      sceneHeight: 410,
      viewportHeight: 400,
    })).toBe(0)
  })

  test('moves through a bounded range as the aperture crosses the viewport', () => {
    const common = {
      active: true,
      elementHeight: 400,
      maxTravel: 32,
      reducedMotion: false,
      viewportHeight: 800,
    }

    expect(calculateSilkParallaxOffset({ ...common, elementTop: 800 })).toBe(-16)
    expect(calculateSilkParallaxOffset({ ...common, elementTop: 200 })).toBe(0)
    expect(calculateSilkParallaxOffset({ ...common, elementTop: -400 })).toBe(16)
    expect(calculateSilkParallaxOffset({ ...common, elementTop: -900 })).toBe(16)
    expect(calculateSilkParallaxOffset({ ...common, elementTop: 1200 })).toBe(-16)
  })

  test('returns zero when motion is reduced or the aperture is inactive', () => {
    const common = {
      elementHeight: 400,
      elementTop: 100,
      maxTravel: 32,
      viewportHeight: 800,
    }

    expect(calculateSilkParallaxOffset({ ...common, active: true, reducedMotion: true })).toBe(0)
    expect(calculateSilkParallaxOffset({ ...common, active: false, reducedMotion: false })).toBe(0)
  })
})
