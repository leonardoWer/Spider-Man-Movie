import {defineConfig} from 'vite';
import {resolve} from 'path';

export default defineConfig({
    root: './', // Корневая директория проекта
    build: {
        outDir: 'dist', // Директория для сборки (production)
        rollupOptions: {
            input: {
                // main: resolve(__dirname, '/src/html/index.html'),
            },
        },
    },
    resolve: {
        alias: {
            's': resolve(__dirname, './src'),
            'p': resolve(__dirname, './public'),
        },
    },
});