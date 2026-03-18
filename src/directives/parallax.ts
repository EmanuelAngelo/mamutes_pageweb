import type { Directive } from 'vue'

type ParallaxAxis = 'x' | 'y'

export type ParallaxOptions = number | {
  axis?: ParallaxAxis
  disabled?: boolean
  max?: number
  speed?: number
}

type ParallaxState = {
  cleanup: Array<() => void>
  rafId: number | null
  visible: boolean
}

const STATE = new WeakMap<HTMLElement, ParallaxState>()

const SUPPORTS_TRANSLATE = typeof CSS !== 'undefined'
  && typeof CSS.supports === 'function'
  && CSS.supports('translate', '0px 0px')

function getOptions (value: ParallaxOptions | undefined) {
  const normalized = typeof value === 'number' ? { speed: value } : (value ?? {})

  return {
    axis: normalized.axis ?? 'y',
    disabled: normalized.disabled ?? false,
    max: normalized.max ?? 80,
    speed: normalized.speed ?? 0.12,
  }
}

function prefersReducedMotion () {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
}

function applyTranslate (el: HTMLElement, axis: ParallaxAxis, offsetPx: number) {
  if (!SUPPORTS_TRANSLATE) {
    return
  }

  const offset = `${Math.round(offsetPx)}px`
  const translateX = axis === 'x' ? offset : '0px'
  const translateY = axis === 'y' ? offset : '0px'

  el.style.setProperty('translate', `${translateX} ${translateY}`)
}

function resetTranslate (el: HTMLElement) {
  el.style.removeProperty('translate')
}

function update (el: HTMLElement, value: ParallaxOptions | undefined) {
  const { axis, disabled, max, speed } = getOptions(value)
  const state = STATE.get(el)

  if (!state || disabled || prefersReducedMotion()) {
    resetTranslate(el)
    return
  }

  if (!state.visible) {
    return
  }

  const rect = el.getBoundingClientRect()

  const viewportSize = axis === 'y' ? window.innerHeight : window.innerWidth
  const viewportCenter = viewportSize / 2

  const elStart = axis === 'y' ? rect.top : rect.left
  const elSize = axis === 'y' ? rect.height : rect.width
  const elCenter = elStart + elSize / 2

  const delta = viewportCenter - elCenter
  const offset = delta * speed
  const clamped = Math.max(-max, Math.min(max, offset))

  applyTranslate(el, axis, clamped)
}

function scheduleUpdate (el: HTMLElement, value: ParallaxOptions | undefined) {
  const state = STATE.get(el)
  if (!state) {
    return
  }

  if (state.rafId != null) {
    return
  }

  state.rafId = window.requestAnimationFrame(() => {
    state.rafId = null
    update(el, value)
  })
}

export const vParallax: Directive<HTMLElement, ParallaxOptions> = {
  mounted (el, binding) {
    const state: ParallaxState = { cleanup: [], rafId: null, visible: true }
    STATE.set(el, state)

    el.style.willChange = SUPPORTS_TRANSLATE ? 'translate' : 'auto'

    if (!prefersReducedMotion()) {
      const observer = new IntersectionObserver(
        entries => {
          const entry = entries[0]
          state.visible = Boolean(entry?.isIntersecting)

          if (state.visible) {
            scheduleUpdate(el, binding.value)
          }
        },
        { threshold: 0 },
      )

      observer.observe(el)
      state.cleanup.push(() => observer.disconnect())
    }

    const onScroll = () => scheduleUpdate(el, binding.value)
    const onResize = () => scheduleUpdate(el, binding.value)

    document.addEventListener('scroll', onScroll, { passive: true, capture: true })
    window.addEventListener('resize', onResize, { passive: true })

    state.cleanup.push(
      () => document.removeEventListener('scroll', onScroll, { capture: true }),
      () => window.removeEventListener('resize', onResize),
    )

    scheduleUpdate(el, binding.value)
  },

  updated (el, binding) {
    scheduleUpdate(el, binding.value)
  },

  unmounted (el) {
    const state = STATE.get(el)

    if (state?.rafId != null) {
      window.cancelAnimationFrame(state.rafId)
    }

    for (const fn of state?.cleanup ?? []) {
      fn()
    }

    resetTranslate(el)
    STATE.delete(el)
  },
}
