# 1️⃣ CREATE – Resource (Sequence Diagram)

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant F as Frontend (form.js and resources.js)
    participant B as Backend (Express Route)
    participant V as express-validator
    participant S as Resource Service
    participant DB as PostgreSQL

    U->>F: Submit form
    F->>F: Client-side validation
    F->>B: POST /api/resources (JSON)

    B->>V: Validate request
    V-->>B: Validation result

    alt Validation fails
        B-->>F: 400 Bad Request + errors[]
        F-->>U: Show validation message
    else Validation OK
        B->>S: create Resource(data)
        S->>DB: INSERT INTO resources
        DB-->>S: Result / Duplicate error

        alt Duplicate
            S-->>B: Duplicate detected
            B-->>F: 409 Conflict
            F-->>U: Show duplicate message
        else Success
            S-->>B: Created resource
            B-->>F: 201 Created
            F-->>U: Show success message
        end
    end
```

# 2️⃣ READ — Resource (Sequence Diagram)

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant F as Frontend (resources.js)
    participant B as Backend (Express Route)
    participant DB as PostgreSQL

    U->>F: Open page / click resource
    F->>B: GET /api/resources or GET /api/resources/:id
    B->>DB: SELECT ...
    DB-->>B: Rows

    alt Found
        B-->>F: 200 OK + data
        F-->>U: Render resource(s)
    else Not found
        B-->>F: 404 Not Found
        F-->>U: Show error message
    end
```

# 3️⃣ UPDATE — Resource (Sequence Diagram)

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant F as Frontend (resources.js)
    participant B as Backend (Express Route)
    participant V as express-validator
    participant DB as PostgreSQL

    U->>F: Submit edit form
    F->>B: PUT /api/resources/:id (JSON)

    B->>V: Validate request
    V-->>B: Validation result

    alt Validation fails
        B-->>F: 400 Bad Request + errors[]
        F-->>U: Show validation message
    else Validation OK
        B->>DB: UPDATE resources SET ...
        DB-->>B: Updated row

        alt Resource exists
            B-->>F: 200 OK + updated data
            F-->>U: Show success message
        else Resource missing
            B-->>F: 404 Not Found
            F-->>U: Show error message
        end
    end
```

# 4️⃣ DELETE — Resource (Sequence Diagram)

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant F as Frontend (resources.js)
    participant B as Backend (Express Route)
    participant DB as PostgreSQL

    U->>F: Click delete
    F->>B: DELETE /api/resources/:id
    B->>DB: DELETE FROM resources WHERE id = ...

    alt Resource existed
        DB-->>B: rowCount = 1
        B-->>F: 204 No Content
        F-->>U: Remove from UI
    else Resource missing
        DB-->>B: rowCount = 0
        B-->>F: 404 Not Found
        F-->>U: Show error message
    end
```