import type { InitialOptionsTsJest } from 'ts-jest/dist/types'
import nextJest from 'next/jest'



const createJestConfig = nextJest({dir: './'})


const config: InitialOptionsTsJest = {
    preset: 'ts-jest',
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
    moduleNameMapper: { // Depends on "paths" from a tsconfig
        '^@/(.*)$': '<rootDir>/src/$1'
    }
}


export default createJestConfig(config)
