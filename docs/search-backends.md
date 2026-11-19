# Local search snapshots

The site now searches local snapshots for `users`, `attractions`, `tours`, and `cities`. The browser posts the existing Typesense-shaped parameter object to `/api/search/:collection`; the API route loads the snapshot on the server. No snapshot is placed under `public/`.

## Refreshing a snapshot

Only refresh while the Typesense cluster is available. Set `TYPESENSE_ADMIN_KEY` in the shell (or load it from the local `.env` without committing it), then run:

```powershell
$env:TYPESENSE_ADMIN_KEY = "..."
node scripts/typesense-export.mjs
node scripts/typesense-capture-fixtures.mjs
npm test -- --runInBand lib/search/index.test.ts
```

The export script uses GET requests only. It writes exact schemas and raw JSONL to `backups/typesense/`; that directory is gitignored because it can contain private fields. The public, whitelisted snapshots in `data/search/` and schemas/golden fixtures in `scripts/fixtures/` are the files intended to ship with the site.

Firestore updates made while this backend is active do not appear in search until the snapshot is refreshed. A future follow-up can add a read-only Firestore-based refresh script, after its privacy whitelist is reviewed.

## Returning to Typesense

Restore the pre-local-search code (or revert this change), resume the cluster, and confirm the Typesense host and keys are unchanged. If they changed, update the environment configuration and client host before deployment. Redeploy, then run the appropriate extension backfill or re-import the raw `backups/typesense/` export to catch up with changes made while the cluster was paused. The raw backup is the fallback only if pausing the cluster did not retain data.

## Behavioral differences

The local engine preserves the current filter, sort, URL, and saved-filter syntax. It supports exact/token substring matching after NFKC normalization and lowercasing, but does not provide Typesense typo tolerance, stemming, prefix matching, relevance ranking, synonyms, or highlighting.
