# Changelog

All notable changes to CollabCanvas are documented here.

## [Unreleased]

## [2026-10-27]
### Added
- Comprehensive README with setup instructions
- .env.example templates for client and server
- TODO.md task tracking
-  Deployed backend to Render, frontend to Vercel, database to MongoDB Atlas
- Fixed Vercel SPA routing 404 issue with vercel.json rewrite rule
- Rotated JWT_SECRET for security after accidental exposure


### Fixed
- Export/import mismatches in authStore, canvasStore, and AIPanel 
  that prevented the app from loading

### Known Issues
- Google OAuth login not yet verified on production (fix deployed, pending test)
