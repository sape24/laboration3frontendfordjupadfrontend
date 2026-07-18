## Frontend för Laboration 3
Single Page Application (SPA) byggd med React, TypeScript och Vite. Ett lagersystem där produkter visas publikt och hanteras av inloggade administratörer. Autentisering sker med JWT som lagras i localStorage.

## Funktioner
- Publik produktlista och detaljsida för enskilda produkter
- Inloggning med JWT-token
- Skyddad administrationsdel med full CRUD för produkter
- Navigationsmeny som uppdateras efter inloggningsstatus
- Responsiv design för desktop och mobil
- Felhantering och feedback vid formulär och API-anrop

## Sidor
| Route           | Åtkomst | Beskrivning                              |
|-----------------|---------|------------------------------------------|
| /               | Publik  | Lista över alla produkter.               |
| /products/:id   | Publik  | Detaljvy för en enskild produkt.         |
| /login          | Publik  | Inloggning.                              |
| /admin          | Skyddad | Administration med CRUD för produkter.   |

## Tekniker
- **React**
- **TypeScript**
- **Vite**
- **React Router**
- **CSS**
