# Diagrama de Comunicación — CAFE-IA

```mermaid
flowchart LR
    subgraph Cliente
        B[Navegador]
        R[React 18]
        V[Vite build]
    end

    subgraph Red
        HTTPS[HTTPS TLS]
        CORS[CORS + credentials]
        JWT[JWT Bearer]
    end

    subgraph Servidor
        E[Express 4]
        MW[helmet rateLimit cors json]
        API[/api/* routes]
    end

    subgraph Datos
        POOL[mysql2 pool]
        SQL[(MySQL 8)]
    end

    B --> R --> V
    R -->|fetch /api| HTTPS
    HTTPS --> CORS --> E
    E --> MW --> API
    API --> JWT
    API --> POOL --> SQL
```
