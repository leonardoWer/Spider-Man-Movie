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
            '@': resolve(__dirname, './src'), // Создаем псевдоним для удобного импорта
        },
    },
});