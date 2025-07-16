---
title: "evoBPE: Evolutionary Protein Sequence Tokenization"
authors: "Burak Suyunu, Özdeniz Dolu, Arzucan Özgür"
year: 2025
venue: "arXiv preprint"
featured: true
tags: ["protein-sequences", "tokenization", "computational-biology", "machine-learning", "bioinformatics"]
abstract: "Recent advancements in computational biology have drawn compelling parallels between protein sequences and linguistic structures, highlighting the need for sophisticated tokenization methods that capture the intricate evolutionary dynamics of protein sequences."
pdf: "https://arxiv.org/pdf/2503.08838.pdf"
bibtex: |
  @article{ozgur2025evobpe,
    title={evoBPE: Evolutionary Protein Sequence Tokenization},
    author={Suyunu, Burak and Dolu, \"{O}zdeniz and \"{O}zg\"{u}r, Arzucan},
    journal={arXiv preprint arXiv:2503.08838},
    year={2025},
    url={https://arxiv.org/abs/2503.08838}
  }
---

Recent advancements in computational biology have drawn compelling parallels between protein sequences and linguistic structures, highlighting the need for sophisticated tokenization methods that capture the intricate evolutionary dynamics of protein sequences. Current subword tokenization techniques, primarily developed for natural language processing, often fail to represent protein sequences' complex structural and functional properties adequately.

This study introduces evoBPE, a novel tokenization approach that integrates evolutionary mutation patterns into sequence segmentation, addressing critical limitations in existing methods. By leveraging established substitution matrices, evoBPE transcends traditional frequency-based tokenization strategies. The method generates candidate token pairs through biologically informed mutations, evaluating them based on pairwise alignment scores and frequency thresholds.

## Key Contributions

- **Novel Approach**: Introduction of mutation-aware tokenization that better captures evolutionary nuances
- **Biological Foundation**: Integration of established substitution matrices for biologically informed tokenization
- **Performance**: Demonstrated superior performance across multiple dimensions compared to standard Byte-Pair Encoding
- **Domain Conservation**: Consistent outperformance particularly as vocabulary size increases

## Results

Extensive experiments on human protein sequences show that evoBPE performs better across multiple dimensions. Domain conservation analysis reveals that evoBPE consistently outperforms standard Byte-Pair Encoding, particularly as vocabulary size increases. Furthermore, embedding similarity analysis using ESM-2 suggests that mutation-based token replacements preserve biological sequence properties more effectively than arbitrary substitutions.

## Impact

The research contributes to protein sequence representation by introducing a mutation-aware tokenization method that better captures evolutionary nuances. By bridging computational linguistics and molecular biology, evoBPE opens new possibilities for machine learning applications in protein function prediction, structural modeling, and evolutionary analysis. 