# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

### [0.5.3](https://github.com/yiannis-spyridakis/mydata-client/compare/v0.5.2...v0.5.3) (2025-04-14)

### [0.5.2](https://github.com/yiannis-spyridakis/mydata-client/compare/v0.5.1...v0.5.2) (2025-04-14)

## [0.5.1] - 2025-04-14

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
