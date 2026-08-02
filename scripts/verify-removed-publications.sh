#!/bin/sh
set -eu

repository_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)

if rg -n -i \
  'suyunu2025_evobpe_evo|evobpe: Evolutionary protein sequence tokenization' \
  "$repository_root/data" "$repository_root/src"; then
  echo "A removed publication is still present." >&2
  exit 1
fi

echo "Removed publications are absent from source data and site content."

hashtag_title='Hashtag activism and framing strategies in the aftermath of George Floyd’s death and the 2020 elections'
hashtag_pages=$(rg -l -F "title: \"$hashtag_title\"" \
  "$repository_root/src/content/papers" | wc -l | tr -d ' ')

if [ "$hashtag_pages" -ne 1 ]; then
  echo "Expected exactly one generated page for the hashtag-activism article; found $hashtag_pages." >&2
  exit 1
fi

echo "The hashtag-activism article has exactly one generated page."

scarcity_title='Dealing with Data Scarcity in Spoken Question Answering'
scarcity_pages=$(rg -l -F "title: \"$scarcity_title\"" \
  "$repository_root/src/content/papers" | wc -l | tr -d ' ')

if [ "$scarcity_pages" -ne 1 ]; then
  echo "Expected exactly one generated page for the spoken-QA data-scarcity paper; found $scarcity_pages." >&2
  exit 1
fi

echo "The spoken-QA data-scarcity paper has exactly one generated page."

annotation_title='Evaluating the Quality of a Corpus Annotation Scheme Using Pretrained Language Models'
annotation_pages=$(rg -l -F "title: \"$annotation_title\"" \
  "$repository_root/src/content/papers" | wc -l | tr -d ' ')

if [ "$annotation_pages" -ne 1 ]; then
  echo "Expected exactly one generated page for the corpus-annotation paper; found $annotation_pages." >&2
  exit 1
fi

echo "The corpus-annotation paper has exactly one generated page."

for unique_title in \
  'Overview of the Hate Speech Detection in Turkish and Arabic Tweets (HSD-2Lang) Shared Task at CASE 2024' \
  'Detecting Hate Speech in Turkish Print Media: A Corpus and A Hybrid Approach with Target-oriented Linguistic Knowledge' \
  'TURNA: A Turkish Encoder-Decoder Language Model for Enhanced Understanding and Generation'
do
  matching_pages=$(rg -l -F "title: \"$unique_title\"" \
    "$repository_root/src/content/papers" | wc -l | tr -d ' ')
  if [ "$matching_pages" -ne 1 ]; then
    echo "Expected exactly one generated page for '$unique_title'; found $matching_pages." >&2
    exit 1
  fi
done

echo "The CASE 2024 and TURNA papers each have exactly one generated page."

for unique_title in \
  'TR-MTEB: A Comprehensive Benchmark and Embedding Model Suite for Turkish Sentence Representations' \
  'Evaluating Large Language Models in Data Generation for Low-Resource Scenarios: A Case Study on Question Answering'
do
  matching_pages=$(rg -l -F "title: \"$unique_title\"" \
    "$repository_root/src/content/papers" | wc -l | tr -d ' ')
  if [ "$matching_pages" -ne 1 ]; then
    echo "Expected exactly one generated page for '$unique_title'; found $matching_pages." >&2
    exit 1
  fi
done

echo "TR-MTEB and the Interspeech 2025 paper each have exactly one generated page."
