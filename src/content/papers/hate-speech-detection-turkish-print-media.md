---
title: "Detecting Hate Speech in Turkish Print Media: A Corpus and A Hybrid Approach with Target-oriented Linguistic Knowledge"
authors: "Gökçe Uludoğan, Atıf Emre Yüksel, Ümit Tunçer, Burak Işık, Yasemin Korkmaz, Didar Akar, Arzucan Özgür"
year: 2024
venue: "CASE 2024"
featured: true
tags: ["hate-speech", "turkish", "nlp", "social-media", "computational-linguistics", "target-oriented"]
abstract: "The use of hate speech targeting ethnicity, nationalities, religious identities, and specific groups has been on the rise in the news media. However, most existing automatic hate speech detection models focus on identifying hate speech, often neglecting the target group-specific language that is common in news articles."
code: "https://github.com/boun-tabi/HateTargetBERT-TR"
bibtex: |
  @inproceedings{ozgur2024hate,
    title={Detecting Hate Speech in Turkish Print Media: A Corpus and A Hybrid Approach with Target-oriented Linguistic Knowledge},
    author={Uludo{\u{g}}an, G\"{o}k\c{c}e and Y\"{u}ksel, At{\i}f Emre and Tun\c{c}er, \"{U}mit and I{\c{s}}{\i}k, Burak and Korkmaz, Yasemin and Akar, Didar and \"{O}zg\"{u}r, Arzucan},
    booktitle={Proceedings of the 7th Workshop on Challenges and Applications of Automated Extraction of Socio-political Events from Text (CASE 2024)},
    year={2024}
  }
---

The use of hate speech targeting ethnicity, nationalities, religious identities, and specific groups has been on the rise in the news media. However, most existing automatic hate speech detection models focus on identifying hate speech, often neglecting the target group-specific language that is common in news articles.

To address this problem, we first compile a hate speech dataset, TurkishHatePrintCorpus, derived from Turkish news articles and annotate it specifically for the language related to the targeted group. We then introduce the HateTargetBERT model, which integrates the target-centric linguistic features extracted in this study into the BERT model, and demonstrate its effectiveness in detecting hate speech while allowing the model's classification decision to be explained.

## Key Contributions

- **Novel Dataset**: Introduction of TurkishHatePrintCorpus, a comprehensive hate speech dataset from Turkish news articles
- **Target-oriented Approach**: Focus on target group-specific language patterns in hate speech detection
- **HateTargetBERT Model**: Integration of target-centric linguistic features into BERT architecture
- **Explainable AI**: Model provides interpretable classification decisions for hate speech detection

## Methodology

The research addresses the gap in hate speech detection by specifically focusing on target-oriented linguistic knowledge. The HateTargetBERT model incorporates:

1. **Target-centric Features**: Linguistic patterns specific to targeted groups
2. **BERT Integration**: Leveraging pre-trained language models for Turkish
3. **Explainability**: Providing insights into classification decisions

## Results and Impact

The study demonstrates that target-oriented approaches significantly improve hate speech detection performance in Turkish print media. The model not only achieves better classification accuracy but also provides explanations for its decisions, making it more suitable for real-world applications where transparency is crucial.

We have made the dataset and source code publicly available, contributing to the research community's efforts in combating hate speech and promoting fair, inclusive discourse in Turkish media. 