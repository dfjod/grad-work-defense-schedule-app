import { http, HttpResponse } from 'msw'

import solution from './data/solution.json'

export const handlers = [
    http.get('/api/solution', async () => {
        return HttpResponse.json(solution)
    }),
]
