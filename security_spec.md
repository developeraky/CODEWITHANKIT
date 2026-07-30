# Firestore Security Specification

## 1. Data Invariants
- A Lead record cannot be submitted without valid `name`, `email`, and `serviceNeeded`.
- A Booking record cannot be submitted without valid `date`, `time`, `name`, and `email`.
- Workspace Sync configuration is strictly isolated per user (`/workspaceSync/{userId}`).

## 2. Dirty Dozen Security Test Payloads
1. **Unauthenticated Write**: Creating a lead without authentication (Public leads permitted, but strictly schema-validated).
2. **Ghost Key Attack**: Creating a lead with extraneous field `isAdmin: true`.
3. **ID Poisoning**: Writing to document ID with oversized 1.5KB string.
4. **Invalid Email Payload**: Writing lead with malformed email string.
5. **PII Harvesting**: Unauthenticated query trying to list all user workspace sync configurations.
6. **Workspace Sync Hijack**: User A writing to `/workspaceSync/userB`.
7. **Oversized Field Payload**: Message field with 10MB string.
8. **Invalid Enum**: Setting lead status to `SuperAdmin`.
9. **Timestamp Spoofing**: Sending client-side fake past timestamp for `createdAt`.
10. **Type Mismatch**: Sending array for string property `name`.
11. **Negative Score Payload**: Setting `score: -9999`.
12. **Null Character Injection**: Document path with `\0` null characters.

## 3. Test Runner
All payloads are guarded by `firestore.rules` validation functions and strict schema boundaries.
