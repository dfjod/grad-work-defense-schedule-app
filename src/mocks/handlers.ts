import { http } from 'msw'

export const handlers = [
    http.get('/api/schedule', () => {
        console.log('Captured a "GET /api/schedule" request successfully!')
    }),
]
