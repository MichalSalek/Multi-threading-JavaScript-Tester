import type { InitialOptionsTsJest } from 'ts-jest/dist/types'
import nextJest from 'next/jest'



const createJestConfig = nextJest({dir: './'})


const config: InitialOptionsTsJest = {
    preset: 'ts-jest',
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
    transform: {
        '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform'
    },
    testEnvironment: 'jsdom',
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.test.json'
        }
    },

    moduleDirectories: ['node_modules'],
    moduleNameMapper: { // Depends on "paths" from a tsconfig
        '^@/(.*)$': '<rootDir>/$1'
    }
}


export default createJestConfig(config)
