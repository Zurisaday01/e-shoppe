export default {
    testEnvironment: "jsdom",
    preset: "ts-jest",
    transform: {
        "^.+.tsx?$": ["ts-jest",{}],
    },
    setupFiles: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    }
};