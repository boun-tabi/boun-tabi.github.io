# 2025–2026 publication refresh report

## Current publication pipeline

The site does not parse BibTeX at runtime. `data/bib/*.bib` is the publication
source, and `scripts/generate-content-from-bib.mjs` converts each BibTeX record
into an Astro content entry under `src/content/papers/`. The papers index,
homepage, and detail routes read that generated `papers` content collection.

`data/publications.bib` is outside the generator's configured `data/bib/`
directory and is therefore not part of this pipeline.

## Methodology

The Google Scholar IDs in `data/google_scholar.json` were used with
`scripts/export_scholar_bibtex.py`. A `--year-from`/`--year-to` filter was added
so profile records can be filtered before the script performs one detail request
per publication. The 2025–2026 Scholar export succeeded for Arzucan Özgür.

Google Scholar rate-limited subsequent profile requests for Tunga Güngör and
Suzan Üsküdarlı. Existing 2025 records for those profiles were retained. Suzan
Üsküdarlı's three 2026 records were cross-checked against her current publication
page and their ACL metadata before being added. No additional Tunga Güngör 2026
record was identified during the cross-check.

Scholar records rejected solely because of its placeholder publisher value or a
venue containing a redundant year were cleaned before merging. Existing titles
were not duplicated.

## Results

- Arzucan Özgür: ten previously absent 2025–2026 source records added.
- Suzan Üsküdarlı: three 2026 source records added.
- Suzan Üsküdarlı: TabiBERT was added and the final volume, issue, and page
  range were applied to the existing hashtag-activism article.
- HATECAT-TR was corrected to an `inproceedings` record for EMNLP Findings,
  including its canonical citation key and page range.
- The orphaned generated page for “evobpe: Evolutionary protein sequence
  tokenization” was removed; no matching record remained in `data/bib/`.
- The BU-MEF SLaTE 2025 paper was corrected to an `inproceedings` record with
  its proceedings title, page range, and DOI (`10.21437/SLaTE.2025-29`).
- The stale `taraktas2025_hashtag_ac` page was removed. The complete
  `Taraktas20062025` record is the sole source and generated page for the
  hashtag-activism article.
- “Dealing with Data Scarcity in Spoken Question Answering” was replaced with
  its canonical ACL Anthology `inproceedings` record. Two obsolete generated
  pages were removed in favor of the canonical citation-key slug.
- Generated prose now converts the BibTeX `\%` escape to `%`, preventing LaTeX
  markup from leaking into publication abstracts.
- “Evaluating the Quality of a Corpus Annotation Scheme Using Pretrained
  Language Models” now uses its canonical ACL Anthology citation key and full
  proceedings metadata. The sparse Tunga record and both old-key pages were
  removed.
- Protective BibTeX capitalization braces were removed from the displayed
  TurkBench and TimeRes titles while preserving their intended capitalization.
- Two CASE 2024 hate-speech papers were replaced with their canonical ACL
  Anthology records. TURNA's complete record was retained, its sparse duplicate
  page was removed, and title/author LaTeX rendering was corrected.
- TR-MTEB was replaced with its canonical EMNLP Findings 2025 record, and the
  low-resource question-answering paper was replaced with its official
  Interspeech 2025 record.
- Tunga Güngör: existing six 2025 source records retained; no new record added.
- Scholar export now supports bounded year ranges.
- The GitHub workflow's `google_scholar.json` filename mismatch was fixed.
- One corrupt, yearless Tunga Güngör Scholar record was commented out so the
  remaining BibTeX file can be parsed and generated.

## Reproduction

Run a filtered export for each ID in `data/google_scholar.json`, review invalid
commented records, merge new titles into the matching file under `data/bib/`,
then regenerate and build:

```sh
python scripts/export_scholar_bibtex.py --scholar-id PROFILE_ID --year-from 2025 --year-to 2026 --out /tmp/profile-2025-2026.bib
npm run generate:content
npm run build
```

Publication removals can be checked independently with:

```sh
sh scripts/verify-removed-publications.sh
```
