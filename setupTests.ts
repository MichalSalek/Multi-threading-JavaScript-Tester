import '@testing-library/jest-dom'
import { loadEnvConfig } from '@next/env'
import '@testing-library/jest-dom/extend-expect'



loadEnvConfig(__dirname, true, {info: console.log, error: console.error})
