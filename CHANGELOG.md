# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### 0.5.1 (2025-04-14)

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<details>
<summary><strong>Versioning Workflow</strong> (click to expand)</summary>

1. **Update CHANGELOG.md**:

   - Add new entries under `[Unreleased]` section as changes are made
   - Group changes by type (Added, Changed, Deprecated, Removed, Fixed, Security)
   - Include issue/PR references when applicable (e.g., `#123`)

2. **Update package.json version**:

   ```bash
   npm version patch|minor|major
   ```

   This will:

   - Update package.json version
   - Create a git commit with the version bump
   - Create a git tag with the version

3. **Update CHANGELOG for release**:

   - Rename `[Unreleased]` to new version (e.g., `[1.2.3] - 2025-04-14`)
   - Add new `[Unreleased]` section at top

4. **Create GitHub Release**:

   ```bash
   git push origin main --tags
   ```

   Then create a release on GitHub using the new tag, copying relevant CHANGELOG entries

5. **Automation (optional)**:
   Consider adding these npm scripts to package.json:
   ```json
   "scripts": {
     "release": "standard-version",
     "release:minor": "standard-version --release-as minor",
     "release:major": "standard-version --release-as major"
   }
   ```
   Then install `standard-version`:
   ```bash
   npm install --save-dev standard-version
   ```
   </details>

## [Unreleased]

### Added

- Added individual examples for every public MyDataClient method (eb201e7)
- Added CHANGELOG.md (1162b00)

### Fixed

- Fixed incorrect namespace in XmlHelper.buildIncomeClassificationsXml (9644f5a)
- Fixed bugs with send-erp-expenses-classification-example.ts and dependencies (85a5432)

## [2025-04-11]

### Added

- README.md: Added descriptions to MyDataClient methods (3d27d8d)
- Added missing jsdocs to MyDataClient public methods (ecf4ae9)
- Added utils.test, refactored xml-helper.test (29a2db1)
- Added request-params.model.ts (5ff3f42)

### Changed

- Refactored tests dir structure to mirror src (0c40743)
- mydata-client: Factored out interfaces, restructured request params handling (411aaa2)
- Moved xml-helper, created utils.ts (3db49a2)

### Fixed

- Fixed imports and unit tests post refactoring (aed4776)
- Fixed MYDATA_DEV_ERP_BASE_URL (b93d9b2)

## [2025-04-08]

### Added

- Initial commit (70b6a5d)
- README.md: Added official documentation section (273159d)

### Changed

- package.json: Added type=module (1aab06d)
- Bumped version (4a619d9)

### Fixed

- Fixed configuration for work for both CommonJS and ES Module (a52e377)
- Fixed types not correct on client (ff2fd0c)

---

[GitHub Repository](https://github.com/yiannis-spyridakis/mydata-client)
