@AGENTS.md

# Workflow Rules

## Frontend development
- All frontend work is done and verified locally at http://localhost:3000 first.
- Do NOT commit to GitHub until the user is explicitly satisfied with the result.
- Do NOT push to Vercel until the user gives the go-ahead.
- Use the Claude in Chrome MCP (`mcp__Claude_in_Chrome__navigate`) to verify changes in the browser. Never use `preview_start` — it crashes this machine.

## Database / Backend
- Before implementing any Supabase schema or backend logic, propose the approach and explain trade-offs.
- If the user's requested approach is inefficient or suboptimal, recommend a better alternative with reasoning before writing any code.
- Always get explicit sign-off on the schema before running migrations.
