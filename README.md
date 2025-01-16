# Setup Guide

Follow the steps below to set up and run the application in development mode.

## Prerequisites

Before starting, ensure you have the following installed:

- [Docker](https://www.docker.com/)
- [pnpm](https://pnpm.io/) (Package Manager)

## Backend Setup

1. **Pull the Docker image**:
  ```sh
  docker pull ghcr.io/agrissh/combopt2024:latest
  ```
2. **Run the docker container**:
  ```sh
  docker run --rm -it -p 8082:8080 ghcr.io/agrissh/combopt2024:latest
  ```

## Frontend Setup
1. **Create a `.env` file in the project's root directory with the following content**:
  ```txt
  VITE_API_URL="http://localhost:8082"
  ```
2. **Install project dependencies**
  ```sh
  pnpm i
  ```
3. **Run the application in development mode**:
  ```sh
  pnpm run dev
  ```

# Accesing the Application
Once the application is running, you can access it by navigating to the URL provided by the development server:
```txt
http://localhost:8080
```

# Additional Notes
- Ensure the backend container is running before starting the frontend.
- If you encounter any issues, verify that the ports (8082 for the backend and 8080 for the frontend) are not being used by other applications.

# Test Data
To set up the test data, you need to manually add variables to your browser's local storage. Follow the steps below to configure the necessary data:

## Add Counters
Create the following variables in your browser's local storage with the specified values:

- `person_counter`: `15`
- `solution_counter`: `1`
- `theses_counter`: `8`

## Add `persons` Data
Create a `persons` variable in your browser's local storage and set it to the following JSON:
```json
[
  {
    "id": 1,
    "name": "prof. Jānis Kalniņš",
    "isStudent": false,
    "timeConstraints": [
      {
        "id": 1,
        "from": "2025-1-2T10:45:00",
        "to": "2025-1-2T23:59:59"
      }
    ]
  },
  {
    "id": 2,
    "name": "prof. Pēteris Lejnieks",
    "isStudent": false,
    "timeConstraints": []
  },
  {
    "id": 3,
    "name": "prof. Māris Ozoliņš",
    "isStudent": false,
    "timeConstraints": [
      {
        "id": 2,
        "from": "2025-1-2T09:30:00",
        "to": "2025-1-2T23:59:59"
      }
    ]
  },
  {
    "id": 4,
    "name": "doc. Anžela Bērzīte",
    "isStudent": false,
    "timeConstraints": [
      {
        "id": 3,
        "from": "2025-1-2T08:45:00",
        "to": "2025-1-2T09:59:59"
      }
    ]
  },
  {
    "id": 5,
    "name": "prof. Gvido Kalējs",
    "isStudent": false,
    "timeConstraints": []
  },
  {
    "id": 6,
    "name": "prof. Ieva Ezeriņa",
    "isStudent": false,
    "timeConstraints": [
      {
        "id": 4,
        "from": "2025-1-2T09:30:00",
        "to": "2025-1-2T10:00:00"
      }
    ]
  },
  {
    "id": 7,
    "name": "prof. Valters Zariņš",
    "isStudent": false,
    "timeConstraints": [
      {
        "id": 5,
        "from": "2025-1-2T10:15:00",
        "to": "2025-1-2T23:59:59"
      }
    ]
  },
  {
    "id": 8,
    "name": "Raimonds Daugulis",
    "isStudent": true,
    "timeConstraints": [],
    "thesis": 1
  },
  {
    "id": 9,
    "name": "Roberts Eglītis",
    "isStudent": true,
    "timeConstraints": [],
    "thesis": 2
  },
  {
    "id": 10,
    "name": "Edgars Gailis",
    "isStudent": true,
    "timeConstraints": [],
    "thesis": 3
  },
  {
    "id": 11,
    "name": "Aivars Lapiņš",
    "isStudent": true,
    "timeConstraints": [],
    "thesis": 4
  },
  {
    "id": 12,
    "name": "Dainis Skuja",
    "isStudent": true,
    "timeConstraints": [],
    "thesis": 5
  },
  {
    "id": 13,
    "name": "Mārtiņš Priede",
    "isStudent": true,
    "timeConstraints": [],
    "thesis": 6
  },
  {
    "id": 14,
    "name": "Guntars Vēzis",
    "isStudent": true,
    "timeConstraints": [],
    "thesis": 7
  },
  {
    "id": 15,
    "name": "Laura Liepiņa",
    "isStudent": true,
    "timeConstraints": [],
    "thesis": 8
  }
]
```

## Add `theses` Data
Create a theses variable in your browser's local storage and set it to the following JSON:
```json
[
  {
    "id": 1,
    "name": "Baltā kvantu kriptogrāfija",
    "author": 8,
    "supervisor": 1,
    "reviewer": 2
  },
  {
    "id": 2,
    "name": "Programmatūras kvalitātes dzirnavas",
    "author": 9,
    "supervisor": 2,
    "reviewer": 3
  },
  {
    "id": 3,
    "name": "Kiberfizikālās sistēmas Silmačos",
    "author": 10,
    "supervisor": 3,
    "reviewer": 4
  },
  {
    "id": 4,
    "name": "Datizrace būrī",
    "author": 11,
    "supervisor": 5,
    "reviewer": 1
  },
  {
    "id": 5,
    "name": "Mazā Anduļa datu noliktavas",
    "author": 12,
    "supervisor": 6,
    "reviewer": 5
  },
  {
    "id": 6,
    "name": "Tīklplēsis",
    "author": 13,
    "supervisor": 7,
    "reviewer": 3
  },
  {
    "id": 7,
    "name": "Neironu skartie",
    "author": 14,
    "supervisor": 7,
    "reviewer": 1
  },
  {
    "id": 8,
    "name": "Billes datu noliktavas",
    "author": 15,
    "supervisor": 6,
    "reviewer": 4
  }
]
```

## Add `solution:1` Data
Create a solution:1 variable in your browser's local storage and set it to the following JSON:
```json
{
  "id": 1,
  "solved": false,
  "changed": false,
  "name": "Thesis Schedule",
  "score": "",
  "sessions": [
    {
      "id": 1,
      "room": "13",
      "startDate": "2025-1-2T09:00:00",
      "slotDuration": 30,
      "theses": [],
      "thesesPrevious": []
    },
    {
      "id": 2,
      "room": "16",
      "startDate": "2025-1-2T09:00:00",
      "slotDuration": 30,
      "theses": [],
      "thesesPrevious": []
    }
  ],
  "persons": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15
  ],
  "theses": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ],
  "personIndictments": [],
  "thesesIndictments": []
}
```
