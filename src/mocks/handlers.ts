import { http, HttpResponse } from 'msw'

export const handlers = [
    http.get('/api/schedule', () => {
        return HttpResponse.json({
            id: 0,
            sessions: [
                {
                    thesis: [
                        {
                            firstName: 'Bob',
                            lastName: 'Smith',
                            title: 'Software engineering future with AI',
                            supervisor: {
                                firstName: 'Jhon',
                                lastName: 'Trump',
                            },
                            reviewer: {
                                firstName: 'Lo',
                                lastName: 'Ballz',
                            }
                        },
                        {
                            firstName: 'Connor',
                            lastName: 'McArthur',
                            title: 'Project management tools',
                            supervisor: {
                                firstName: 'Simbal',
                                lastName: 'Rivers',
                            },
                            reviewer: {
                                firstName: 'Lo',
                                lastName: 'Ballz',
                            }
                        }
                    ]
                },
            ],
        })
    }),
]
