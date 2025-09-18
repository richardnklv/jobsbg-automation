Company
 - id
 - name
 - description (optional)
 - logo (optinal img)

Recruiter
 - id
 - first name
 - last name
 - email
 - password
 - photo (optional)
 - company_id (foreign key)


User
 - id
 - first name
 - last name
 - email
 - password
 - CV (uploads the file to a link to a separate table)
 - photo (optional)

the full abreviation of CV
 - id
 - user_id (foreign key)
 - skill_experience (JSONB)
 - education
 - embedding vector(1536)

Job post
 - id
 - recruiter_id (foreign key)
 - description
 - skill_experience (JSONB)
 - created at, end date etc.
 - embedding vector(1536)

Applied (intermediary table)
 - id
 - job_id
 - user_id
 - motivation
 - percentage match
 - rank for position

<!-- Vectorized table
 - skills
 - experience
 - user_id -->

