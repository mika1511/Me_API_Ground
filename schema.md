# Database Schema - Me-API

This project uses **MongoDB** as a NoSQL database with **Mongoose** for object modeling.

## Collection: `profiles`
The database uses a single-document approach to store all candidate information for high performance.

| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | String | Full name (e.g., Bhumika Deshmukh) |
| `email` | String | Unique contact email |
| `education` | String | Degree and University |
| `skills` | [String] | Array of technical skills |
| `projects` | [Object] | Array of project details |
| `work` | [Object] | Array of professional history |
| `links` | Object | GitHub and LinkedIn URLs |

### Nested Structure: `projects`
- `title` (String): Project name
- `description` (String): Detailed overview
- `links` ([String]): Source code or demo URLs
- `skills` ([String]): Technologies used in that project

## Indexes
- `email`: Indexed for unique identification.
- `projects.skills`: Used for the `/projects?skill=...` filter endpoint.