import { http, HttpResponse } from 'msw'

export const handlers = [
    http.get('/api/schedule', () => {
        return HttpResponse.json({
            id: 0,
            sessions: [
                {
                    id: 0,
                    startTime: '2024-06-27T09:00',
                    place: 'Raiņa bulvāris 19',
                    room: '16',
                    theses: [
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
                {
                    id: 1,
                    startTime: '2024-06-27T12:00',
                    place: 'Raiņa bulvāris 19',
                    room: '16',
                    theses: [
                        {
                            firstName: 'Brendan',
                            lastName: 'Espinoza',
                            title: 'Space tech software',
                            supervisor: {
                                firstName: 'Jhon',
                                lastName: 'Johnston',
                            },
                            reviewer: {
                                firstName: 'Wendy',
                                lastName: 'Cordova',
                            }
                        },
                        {
                            firstName: 'Nicholas',
                            lastName: 'Berger',
                            title: 'Peer to peer multiplayer game',
                            supervisor: {
                                firstName: 'Cecilia',
                                lastName: 'Tanner',
                            },
                            reviewer: {
                                firstName: 'Usman',
                                lastName: 'Harrell',
                            }
                        },
                        {
                            firstName: 'Evelyn',
                            lastName: 'Dickson',
                            title: 'Mobile app for pet owners',
                            supervisor: {
                                firstName: 'Lilli',
                                lastName: 'Hanna',
                            },
                            reviewer: {
                                firstName: 'Khalil',
                                lastName: 'Chandler',
                            }
                        }
                    ]
                },
            ],
        })
    }),
]
