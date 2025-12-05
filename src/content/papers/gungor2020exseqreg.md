---
title: "{EXSEQREG}: Explaining sequence-based NLP tasks with regions with a case study using morphological features for named entity recognition"
authors: "Onur Güngör, Tunga Güngör, Suzan Uskudarli"
venue: "Plos one"
year: 2020
abstract: "The state-of-the-art systems for most natural language engineering tasks employ machine learning methods. Despite the improved performances of these systems, there is a lack of established methods for assessing the quality of their predictions. This work introduces a method for explaining the predictions of any sequence-based natural language processing (NLP) task implemented with any model, neural or non-neural. Our method named EXSEQREG introduces the concept of region that links the prediction and features that are potentially important for the model. A region is a list of positions in the input sentence associated with a single prediction. Many NLP tasks are compatible with the proposed explanation method as regions can be formed according to the nature of the task. The method models the prediction probability differences that are induced by careful removal of features used by the model. The output of the method is a list of importance values. Each value signifies the impact of the corresponding feature on the prediction. The proposed method is demonstrated with a neural network based named entity recognition (NER) tagger using Turkish and Finnish datasets. A qualitative analysis of the explanations is presented. The results are validated with a procedure based on the mutual information score of each feature. We show that this method produces reasonable explanations and may be used for i) assessing the degree of the contribution of features regarding a specific prediction of the model, ii) exploring the features that played a significant role for a trained model when analyzed across the corpus."
featured: false
bibtex: |
  @article{gungor2020exseqreg,
    title        = {{EXSEQREG}: Explaining sequence-based NLP tasks with regions with a case study using morphological features for named entity recognition},
    author       = {G{\"u}ng{\"o}r, Onur and G{\"u}ng{\"o}r, Tunga and Uskudarli, Suzan},
    year         = 2020,
    journal      = {Plos one},
    volume       = 15,
    number       = 12,
    pages        = {e0244179},
    doi          = {https://doi.org/10.1371/journal.pone.0244179},
    abstract     = {The state-of-the-art systems for most natural language engineering tasks employ machine learning methods. Despite the improved performances of these systems, there is a lack of established methods for assessing the quality of their predictions. This work introduces a method for explaining the predictions of any sequence-based natural language processing (NLP) task implemented with any model, neural or non-neural. Our method named EXSEQREG introduces the concept of region that links the prediction and features that are potentially important for the model. A region is a list of positions in the input sentence associated with a single prediction. Many NLP tasks are compatible with the proposed explanation method as regions can be formed according to the nature of the task. The method models the prediction probability differences that are induced by careful removal of features used by the model. The output of the method is a list of importance values. Each value signifies the impact of the corresponding feature on the prediction. The proposed method is demonstrated with a neural network based named entity recognition (NER) tagger using Turkish and Finnish datasets. A qualitative analysis of the explanations is presented. The results are validated with a procedure based on the mutual information score of each feature. We show that this method produces reasonable explanations and may be used for i) assessing the degree of the contribution of features regarding a specific prediction of the model, ii) exploring the features that played a significant role for a trained model when analyzed across the corpus.},
    link         = {https://journal.plos.org/plosone/article?id=10.1371/journal.pone.0244179},
    group        = {journal}
  }
---
