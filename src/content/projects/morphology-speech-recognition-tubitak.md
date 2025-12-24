---
title: "Morphology Based Language Modeling for Turkish Speech Recognition"
description: "TUBITAK funded research on morphology-based language modeling for Turkish speech recognition systems."
status: "completed"
startYear: 2008
endYear: 2010
order: 24
---

# Morphology Based Language Modeling for Turkish Speech Recognition

**Funding Agency:** TÜBİTAK 1001 Program (Project 107E261)

**Project Manager:** Tunga Güngör

**Dates:** 2008-2010

In this project, our aim was to develop a large vocabulary continuous speech recognition system for Turkish. The state-of-art speech recognition systems are basically composed of three main systems: acoustic model, language model, and speech decoder.

The most important contribution of this project was to construct a language model for Turkish that takes into account morphological linguistic structure of the words. The language resources that we developed for this purpose include:

- **Morphological Parser**: The first system based on finite-state machines that is not dependent on any external system such as PC-Kimmo.
- **Morphological Disambiguation**: A system for choosing the correct analysis for a word in a given context with the best accuracy reported at the time.
- **Turkish Web Corpus**: A fairly clean web corpus of about 430 million words.

We built an effective language model for Turkish using these resources by parsing the web corpus using the morphological parser, disambiguating these parses using our morphological disambiguation system, and using the morpheme statistics to train a statistical model for Turkish.
