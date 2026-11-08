import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Con `globals: true` RTL ya limpia solo, pero se deja explícito.
afterEach(() => cleanup())
