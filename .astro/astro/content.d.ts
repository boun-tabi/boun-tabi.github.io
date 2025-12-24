declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"courses": {
"advanced-nlp.md": {
	id: "advanced-nlp.md";
  slug: "advanced-nlp";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
"nlp-fundamentals.md": {
	id: "nlp-fundamentals.md";
  slug: "nlp-fundamentals";
  body: string;
  collection: "courses";
  data: InferEntrySchema<"courses">
} & { render(): Render[".md"] };
};
"news": {
"turna-release.md": {
	id: "turna-release.md";
  slug: "turna-release";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
};
"papers": {
"akkurt2022_bo_azi_i_u.md": {
	id: "akkurt2022_bo_azi_i_u.md";
  slug: "akkurt2022_bo_azi_i_u";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"akkurt2022_boat_v2_a_.md": {
	id: "akkurt2022_boat_v2_a_.md";
  slug: "akkurt2022_boat_v2_a_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"akkurt2024_evaluating.md": {
	id: "akkurt2024_evaluating.md";
  slug: "akkurt2024_evaluating";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"akman2010_analyzing_.md": {
	id: "akman2010_analyzing_.md";
  slug: "akman2010_analyzing_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"aksoy2007_dti_applic.md": {
	id: "aksoy2007_dti_applic.md";
  slug: "aksoy2007_dti_applic";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"altinel2017_text_class.md": {
	id: "altinel2017_text_class.md";
  slug: "altinel2017_text_class";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"am2023_evaluation.md": {
	id: "am2023_evaluation.md";
  slug: "am2023_evaluation";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"am2025_ontology_b.md": {
	id: "am2025_ontology_b.md";
  slug: "am2025_ontology_b";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"arikan-etal-2019-detecting.md": {
	id: "arikan-etal-2019-detecting.md";
  slug: "arikan-etal-2019-detecting";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"arikan2019_detecting_.md": {
	id: "arikan2019_detecting_.md";
  slug: "arikan2019_detecting_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"arisoy2025_evaluating.md": {
	id: "arisoy2025_evaluating.md";
  slug: "arisoy2025_evaluating";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"arn2023_siu2023_ns.md": {
	id: "arn2023_siu2023_ns.md";
  slug: "arn2023_siu2023_ns";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"arn_siu2023_ns.md": {
	id: "arn_siu2023_ns.md";
  slug: "arn_siu2023_ns";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"arsoy2024_dealing_wi.md": {
	id: "arsoy2024_dealing_wi.md";
  slug: "arsoy2024_dealing_wi";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"ayata2017_busem_at_s.md": {
	id: "ayata2017_busem_at_s.md";
  slug: "ayata2017_busem_at_s";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"ayata2017_political_.md": {
	id: "ayata2017_political_.md";
  slug: "ayata2017_political_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"ayata2017_turkish_tw.md": {
	id: "ayata2017_turkish_tw.md";
  slug: "ayata2017_turkish_tw";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"ayc2023_can_we_exp.md": {
	id: "ayc2023_can_we_exp.md";
  slug: "ayc2023_can_we_exp";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"ayci2023_explain_to.md": {
	id: "ayci2023_explain_to.md";
  slug: "ayci2023_explain_to";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"ayci2023_peak_expla.md": {
	id: "ayci2023_peak_expla.md";
  slug: "ayci2023_peak_expla";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"ayci2023_uncertaint.md": {
	id: "ayci2023_uncertaint.md";
  slug: "ayci2023_uncertaint";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"aydn2014_expanding_.md": {
	id: "aydn2014_expanding_.md";
  slug: "aydn2014_expanding_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"aydn2015_retrieving.md": {
	id: "aydn2015_retrieving.md";
  slug: "aydn2015_retrieving";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"aydn2017_automatic_.md": {
	id: "aydn2017_automatic_.md";
  slug: "aydn2017_automatic_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"barsbey2023_a_computat.md": {
	id: "barsbey2023_a_computat.md";
  slug: "barsbey2023_a_computat";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"barzegar2013clinical.md": {
	id: "barzegar2013clinical.md";
  slug: "barzegar2013clinical";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"bayta2023_pattern_re.md": {
	id: "bayta2023_pattern_re.md";
  slug: "bayta2023_pattern_re";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"bedir2021_overcoming.md": {
	id: "bedir2021_overcoming.md";
  slug: "bedir2021_overcoming";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"bedir2021overcoming.md": {
	id: "bedir2021overcoming.md";
  slug: "bedir2021overcoming";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"beenilmi2019_supervised.md": {
	id: "beenilmi2019_supervised.md";
  slug: "beenilmi2019_supervised";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"begenilmi2018_organized_.md": {
	id: "begenilmi2018_organized_.md";
  slug: "begenilmi2018_organized_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"begenilmics2018organized.md": {
	id: "begenilmics2018organized.md";
  slug: "begenilmics2018organized";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"begenilmics2019supervised.md": {
	id: "begenilmics2019supervised.md";
  slug: "begenilmics2019supervised";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"bingol2010_an_operato.md": {
	id: "bingol2010_an_operato.md";
  slug: "bingol2010_an_operato";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"blmmarmara2024.md": {
	id: "blmmarmara2024.md";
  slug: "blmmarmara2024";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"boatv2altnlp.md": {
	id: "boatv2altnlp.md";
  slug: "boatv2altnlp";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"bykz2020_analyzing_.md": {
	id: "bykz2020_analyzing_.md";
  slug: "bykz2020_analyzing_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"caputo2014_imageclef_.md": {
	id: "caputo2014_imageclef_.md";
  slug: "caputo2014_imageclef_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"celebi2012_content_ba.md": {
	id: "celebi2012_content_ba.md";
  slug: "celebi2012_content_ba";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"celebi2012content.md": {
	id: "celebi2012content.md";
  slug: "celebi2012content";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"celebi2013_n_gram_par.md": {
	id: "celebi2013_n_gram_par.md";
  slug: "celebi2013_n_gram_par";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"celebi2014_self_train.md": {
	id: "celebi2014_self_train.md";
  slug: "celebi2014_self_train";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"celebi2017_descriptio.md": {
	id: "celebi2017_descriptio.md";
  slug: "celebi2017_descriptio";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"celebi2018_segmenting.md": {
	id: "celebi2018_segmenting.md";
  slug: "celebi2018_segmenting";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"chan2015_glass_a_co.md": {
	id: "chan2015_glass_a_co.md";
  slug: "chan2015_glass_a_co";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"cichoska2021_crowdsourc.md": {
	id: "cichoska2021_crowdsourc.md";
  slug: "cichoska2021_crowdsourc";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"degirmencioglu2010_exploring_.md": {
	id: "degirmencioglu2010_exploring_.md";
  slug: "degirmencioglu2010_exploring_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"del2018towards.md": {
	id: "del2018towards.md";
  slug: "del2018towards";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"demir2014_improving_.md": {
	id: "demir2014_improving_.md";
  slug: "demir2014_improving_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"derici2014_t_rk_e_sor.md": {
	id: "derici2014_t_rk_e_sor.md";
  slug: "derici2014_t_rk_e_sor";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"derici2015_question_a.md": {
	id: "derici2015_question_a.md";
  slug: "derici2015_question_a";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"derici2018_a_closed_d.md": {
	id: "derici2018_a_closed_d.md";
  slug: "derici2018_a_closed_d";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"din2009_a_web_envi.md": {
	id: "din2009_a_web_envi.md";
  slug: "din2009_a_web_envi";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"dinesh1994_teaching_f.md": {
	id: "dinesh1994_teaching_f.md";
  slug: "dinesh1994_teaching_f";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"dinesh1995_visual_obj.md": {
	id: "dinesh1995_visual_obj.md";
  slug: "dinesh1995_visual_obj";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"dinesh1996_specifying.md": {
	id: "dinesh1996_specifying.md";
  slug: "dinesh1996_specifying";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"dinesh1996_the_vas_fo.md": {
	id: "dinesh1996_the_vas_fo.md";
  slug: "dinesh1996_the_vas_fo";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"dinesh1997_pretty_pri.md": {
	id: "dinesh1997_pretty_pri.md";
  slug: "dinesh1997_pretty_pri";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"dinesh1997_share_wher.md": {
	id: "dinesh1997_share_wher.md";
  slug: "dinesh1997_share_wher";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"dinesh1998_input_and_.md": {
	id: "dinesh1998_input_and_.md";
  slug: "dinesh1998_input_and_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"dinesh2007_community_.md": {
	id: "dinesh2007_community_.md";
  slug: "dinesh2007_community_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"dinesh2012_a_social_w.md": {
	id: "dinesh2012_a_social_w.md";
  slug: "dinesh2012_a_social_w";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"dinesh2012_alipi_a_fr.md": {
	id: "dinesh2012_alipi_a_fr.md";
  slug: "dinesh2012_alipi_a_fr";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"dinesh2018_renarratio.md": {
	id: "dinesh2018_renarratio.md";
  slug: "dinesh2018_renarratio";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"dinesh2021_re_narrati.md": {
	id: "dinesh2021_re_narrati.md";
  slug: "dinesh2021_re_narrati";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"dinsoy_identifyin.md": {
	id: "dinsoy_identifyin.md";
  slug: "dinsoy_identifyin";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"dnmez2020_boun_rex_a.md": {
	id: "dnmez2020_boun_rex_a.md";
  slug: "dnmez2020_boun_rex_a";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"doan2019_overview_o.md": {
	id: "doan2019_overview_o.md";
  slug: "doan2019_overview_o";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"durmu2015_a_review_o.md": {
	id: "durmu2015_a_review_o.md";
  slug: "durmu2015_a_review_o";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"elebi2016_segmenting.md": {
	id: "elebi2016_segmenting.md";
  slug: "elebi2016_segmenting";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"elebi2022_cluster_ba.md": {
	id: "elebi2022_cluster_ba.md";
  slug: "elebi2022_cluster_ba";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"eren2023_improving_.md": {
	id: "eren2023_improving_.md";
  slug: "eren2023_improving_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"erhart2012_system_and.md": {
	id: "erhart2012_system_and.md";
  slug: "erhart2012_system_and";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"erkan2007_extracting.md": {
	id: "erkan2007_extracting.md";
  slug: "erkan2007_extracting";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"erkan2007_semi_super.md": {
	id: "erkan2007_semi_super.md";
  slug: "erkan2007_semi_super";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"ersoy2023_visualizin.md": {
	id: "ersoy2023_visualizin.md";
  slug: "ersoy2023_visualizin";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"gkdeniz2016_automated_.md": {
	id: "gkdeniz2016_automated_.md";
  slug: "gkdeniz2016_automated_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"gngr2015_drenaj_dis.md": {
	id: "gngr2015_drenaj_dis.md";
  slug: "gngr2015_drenaj_dis";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"gngr2018_improving_.md": {
	id: "gngr2018_improving_.md";
  slug: "gngr2018_improving_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"gngr2018_named_enti.md": {
	id: "gngr2018_named_enti.md";
  slug: "gngr2018_named_enti";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"gngr2018_recurrent_.md": {
	id: "gngr2018_recurrent_.md";
  slug: "gngr2018_recurrent_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"gngr2019_the_effect.md": {
	id: "gngr2019_the_effect.md";
  slug: "gngr2019_the_effect";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"gngr2020_exseqreg_e.md": {
	id: "gngr2020_exseqreg_e.md";
  slug: "gngr2020_exseqreg_e";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"gungor2017_morphologi.md": {
	id: "gungor2017_morphologi.md";
  slug: "gungor2017_morphologi";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"gungor2018improving.md": {
	id: "gungor2018improving.md";
  slug: "gungor2018improving";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"gungor2018recurrent.md": {
	id: "gungor2018recurrent.md";
  slug: "gungor2018recurrent";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"gungor2019effect.md": {
	id: "gungor2019effect.md";
  slug: "gungor2019effect";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"gungor2020exseqreg.md": {
	id: "gungor2020exseqreg.md";
  slug: "gungor2020exseqreg";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"gungor_drenaj_dis.md": {
	id: "gungor_drenaj_dis.md";
  slug: "gungor_drenaj_dis";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"h2020_the_role_o.md": {
	id: "h2020_the_role_o.md";
  slug: "h2020_the_role_o";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"he2020_an_extende.md": {
	id: "he2020_an_extende.md";
  slug: "he2020_an_extende";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"he_fares_zeid.md": {
	id: "he_fares_zeid.md";
  slug: "he_fares_zeid";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"hsnbeyi2022_identifyin.md": {
	id: "hsnbeyi2022_identifyin.md";
  slug: "hsnbeyi2022_identifyin";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"huang2021_balancing_.md": {
	id: "huang2021_balancing_.md";
  slug: "huang2021_balancing_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"huang2021_pidna_at_b.md": {
	id: "huang2021_pidna_at_b.md";
  slug: "huang2021_pidna_at_b";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"hur2012_identifica.md": {
	id: "hur2012_identifica.md";
  slug: "hur2012_identifica";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"hur2015_developmen.md": {
	id: "hur2015_developmen.md";
  slug: "hur2015_developmen";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"hur2017_ontology_b.md": {
	id: "hur2017_ontology_b.md";
  slug: "hur2017_ontology_b";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"hur2018_ontology_b.md": {
	id: "hur2018_ontology_b.md";
  slug: "hur2018_ontology_b";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"ihtiyar2023_a_dataset_.md": {
	id: "ihtiyar2023_a_dataset_.md";
  slug: "ihtiyar2023_a_dataset_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"ihtiyar2024_generative.md": {
	id: "ihtiyar2024_generative.md";
  slug: "ihtiyar2024_generative";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"ilter2019_identifyin.md": {
	id: "ilter2019_identifyin.md";
  slug: "ilter2019_identifyin";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"imek2019_statistica.md": {
	id: "imek2019_statistica.md";
  slug: "imek2019_statistica";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"imek2021_a_novel_ge.md": {
	id: "imek2021_a_novel_ge.md";
  slug: "imek2021_a_novel_ge";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"imek2025_gnnmutatio.md": {
	id: "imek2025_gnnmutatio.md";
  slug: "imek2025_gnnmutatio";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"kalender2010_semantic_t.md": {
	id: "kalender2010_semantic_t.md";
  slug: "kalender2010_semantic_t";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"kalender2010_unipedia_a.md": {
	id: "kalender2010_unipedia_a.md";
  slug: "kalender2010_unipedia_a";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"kalender2010semantic.md": {
	id: "kalender2010semantic.md";
  slug: "kalender2010semantic";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"kalender2010unipedia.md": {
	id: "kalender2010unipedia.md";
  slug: "kalender2010unipedia";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"kano2011_u_compare_.md": {
	id: "kano2011_u_compare_.md";
  slug: "kano2011_u_compare_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"kara2022_a_shap_bas.md": {
	id: "kara2022_a_shap_bas.md";
  slug: "kara2022_a_shap_bas";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"karadeniz2013_bacteria_b.md": {
	id: "karadeniz2013_bacteria_b.md";
  slug: "karadeniz2013_bacteria_b";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"karadeniz2015_detection_.md": {
	id: "karadeniz2015_detection_.md";
  slug: "karadeniz2015_detection_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"karadeniz2015_literature.md": {
	id: "karadeniz2015_literature.md";
  slug: "karadeniz2015_literature";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"karadeniz2019_boun_isik_.md": {
	id: "karadeniz2019_boun_isik_.md";
  slug: "karadeniz2019_boun_isik_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"karadeniz2019_linking_en.md": {
	id: "karadeniz2019_linking_en.md";
  slug: "karadeniz2019_linking_en";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"kim2016_biocreativ.md": {
	id: "kim2016_biocreativ.md";
  slug: "kim2016_biocreativ";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"kkciyan2013_bounce_sen.md": {
	id: "kkciyan2013_bounce_sen.md";
  slug: "kkciyan2013_bounce_sen";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"kkciyan2014_semantic_d.md": {
	id: "kkciyan2014_semantic_d.md";
  slug: "kkciyan2014_semantic_d";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"kksal2009_screen_rep.md": {
	id: "kksal2009_screen_rep.md";
  slug: "kksal2009_screen_rep";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"kksal2020_the_relx_d.md": {
	id: "kksal2020_the_relx_d.md";
  slug: "kksal2020_the_relx_d";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"kksal2020_vapur_a_se.md": {
	id: "kksal2020_vapur_a_se.md";
  slug: "kksal2020_vapur_a_se";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"kksal2021_boun_at_se.md": {
	id: "kksal2021_boun_at_se.md";
  slug: "kksal2021_boun_at_se";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"kksal2021_relation_e.md": {
	id: "kksal2021_relation_e.md";
  slug: "kksal2021_relation_e";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"kksal2021_sentiment_.md": {
	id: "kksal2021_sentiment_.md";
  slug: "kksal2021_sentiment_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"kksal2021_twitter_da.md": {
	id: "kksal2021_twitter_da.md";
  slug: "kksal2021_twitter_da";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"kokciyan2012_user_gener.md": {
	id: "kokciyan2012_user_gener.md";
  slug: "kokciyan2012_user_gener";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"kokciyan2013bounce.md": {
	id: "kokciyan2013bounce.md";
  slug: "kokciyan2013bounce";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"kokciyan2014semantic.md": {
	id: "kokciyan2014semantic.md";
  slug: "kokciyan2014semantic";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"korucuoglu2014_bayesian_p.md": {
	id: "korucuoglu2014_bayesian_p.md";
  slug: "korucuoglu2014_bayesian_p";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"leitner2008_introducin.md": {
	id: "leitner2008_introducin.md";
  slug: "leitner2008_introducin";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"lrecolingtreebankeevalllm.md": {
	id: "lrecolingtreebankeevalllm.md";
  slug: "lrecolingtreebankeevalllm";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"maran2022_boun_treeb.md": {
	id: "maran2022_boun_treeb.md";
  slug: "maran2022_boun_treeb";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"maran2022_enhancemen.md": {
	id: "maran2022_enhancemen.md";
  slug: "maran2022_enhancemen";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"marcsan2022enhancements.md": {
	id: "marcsan2022enhancements.md";
  slug: "marcsan2022enhancements";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"marriott1998_visual_lan.md": {
	id: "marriott1998_visual_lan.md";
  slug: "marriott1998_visual_lan";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"marriott2012_visual_lan.md": {
	id: "marriott2012_visual_lan.md";
  slug: "marriott2012_visual_lan";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"marvasti2013_clinical_e.md": {
	id: "marvasti2013_clinical_e.md";
  slug: "marvasti2013_clinical_e";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"marvasti2014_imageclef_.md": {
	id: "marvasti2014_imageclef_.md";
  slug: "marvasti2014_imageclef_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"marvasti2015_overview_o.md": {
	id: "marvasti2015_overview_o.md";
  slug: "marvasti2015_overview_o";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"masarifoglu2021_sentiment_.md": {
	id: "masarifoglu2021_sentiment_.md";
  slug: "masarifoglu2021_sentiment_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"meneve2022_a_framewor.md": {
	id: "meneve2022_a_framewor.md";
  slug: "meneve2022_a_framewor";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"meneve2024_dealing_wi.md": {
	id: "meneve2024_dealing_wi.md";
  slug: "meneve2024_dealing_wi";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"menevse2025_the_bu_mef.md": {
	id: "menevse2025_the_bu_mef.md";
  slug: "menevse2025_the_bu_mef";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"mller2015_general_ov.md": {
	id: "mller2015_general_ov.md";
  slug: "mller2015_general_ov";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"mutlu2022_a_dataset_.md": {
	id: "mutlu2022_a_dataset_.md";
  slug: "mutlu2022_a_dataset_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"mutlu2022_dataset_fo.md": {
	id: "mutlu2022_dataset_fo.md";
  slug: "mutlu2022_dataset_fo";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"nuzumlal2014_analyzing_.md": {
	id: "nuzumlal2014_analyzing_.md";
  slug: "nuzumlal2014_analyzing_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"nuzumlal2014_turkish_md.md": {
	id: "nuzumlal2014_turkish_md.md";
  slug: "nuzumlal2014_turkish_md";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"nuzumlal2014_turkish_mu.md": {
	id: "nuzumlal2014_turkish_mu.md";
  slug: "nuzumlal2014_turkish_mu";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"okur2016_named_enti.md": {
	id: "okur2016_named_enti.md";
  slug: "okur2016_named_enti";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"oncu2025_alteration.md": {
	id: "oncu2025_alteration.md";
  slug: "oncu2025_alteration";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"ozgur2004_supervised.md": {
	id: "ozgur2004_supervised.md";
  slug: "ozgur2004_supervised";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"ozgur2010_text_and_n.md": {
	id: "ozgur2010_text_and_n.md";
  slug: "ozgur2010_text_and_n";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"ozgur2020resources.md": {
	id: "ozgur2020resources.md";
  slug: "ozgur2020resources";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"oztrk1902_widedta_pr.md": {
	id: "oztrk1902_widedta_pr.md";
  slug: "oztrk1902_widedta_pr";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"ozturk2020role.md": {
	id: "ozturk2020role.md";
  slug: "ozturk2020role";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"qazvinian2010_citation_s.md": {
	id: "qazvinian2010_citation_s.md";
  slug: "qazvinian2010_citation_s";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"rehana2024_evaluating.md": {
	id: "rehana2024_evaluating.md";
  slug: "rehana2024_evaluating";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"rehana2024_leveraging.md": {
	id: "rehana2024_leveraging.md";
  slug: "rehana2024_leveraging";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"rehana2024_nested_nam.md": {
	id: "rehana2024_nested_nam.md";
  slug: "rehana2024_nested_nam";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"rehana2025_cancer_vac.md": {
	id: "rehana2025_cancer_vac.md";
  slug: "rehana2025_cancer_vac";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"rew2023.md": {
	id: "rew2023.md";
  slug: "rew2023";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"roldn-garca2018_towards_an.md": {
	id: "roldn-garca2018_towards_an.md";
  slug: "roldn-garca2018_towards_an";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"sarntivijai2014_a_systems_.md": {
	id: "sarntivijai2014_a_systems_.md";
  slug: "sarntivijai2014_a_systems_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"sarntivijai2014_predicting.md": {
	id: "sarntivijai2014_predicting.md";
  slug: "sarntivijai2014_predicting";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"seker2025_hatecat_tr.md": {
	id: "seker2025_hatecat_tr.md";
  slug: "seker2025_hatecat_tr";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"seyhan2015_ama_l_sana.md": {
	id: "seyhan2015_ama_l_sana.md";
  slug: "seyhan2015_ama_l_sana";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"skdarl1996_programmin.md": {
	id: "skdarl1996_programmin.md";
  slug: "skdarl1996_programmin";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"skdarl1997_algebraic_.md": {
	id: "skdarl1997_algebraic_.md";
  slug: "skdarl1997_algebraic_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"skdarl2023_tulap_an_a.md": {
	id: "skdarl2023_tulap_an_a.md";
  slug: "skdarl2023_tulap_an_a";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"skdarli1992_a_generic_.md": {
	id: "skdarli1992_a_generic_.md";
  slug: "skdarli1992_a_generic_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"snmez2014_a_graph_ba.md": {
	id: "snmez2014_a_graph_ba.md";
  slug: "snmez2014_a_graph_ba";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"soancolu2017_biosses_a_.md": {
	id: "soancolu2017_biosses_a_.md";
  slug: "soancolu2017_biosses_a_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"sonmez2016_towards_bu.md": {
	id: "sonmez2016_towards_bu.md";
  slug: "sonmez2016_towards_bu";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"suyunu2018_semi_super.md": {
	id: "suyunu2018_semi_super.md";
  slug: "suyunu2018_semi_super";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"suyunu2018semi.md": {
	id: "suyunu2018semi.md";
  slug: "suyunu2018semi";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"suyunu2024_linguistic.md": {
	id: "suyunu2024_linguistic.md";
  slug: "suyunu2024_linguistic";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"suyunu2025_evobpe_evo.md": {
	id: "suyunu2025_evobpe_evo.md";
  slug: "suyunu2025_evobpe_evo";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"t1996_guiding_us.md": {
	id: "t1996_guiding_us.md";
  slug: "t1996_guiding_us";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"tarakta2024_tweeting_t.md": {
	id: "tarakta2024_tweeting_t.md";
  slug: "tarakta2024_tweeting_t";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"taraktas20062025.md": {
	id: "taraktas20062025.md";
  slug: "taraktas20062025";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"taraktas2024_do_activis.md": {
	id: "taraktas2024_do_activis.md";
  slug: "taraktas2024_do_activis";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"taraktas2025_hashtag_ac.md": {
	id: "taraktas2025_hashtag_ac.md";
  slug: "taraktas2025_hashtag_ac";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"taraktasesenuskudarli2022.md": {
	id: "taraktasesenuskudarli2022.md";
  slug: "taraktasesenuskudarli2022";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"tarcea2009_michigan_m.md": {
	id: "tarcea2009_michigan_m.md";
  slug: "tarcea2009_michigan_m";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"tekir2013_phisto_a_n.md": {
	id: "tekir2013_phisto_a_n.md";
  slug: "tekir2013_phisto_a_n";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"tekir2013_phisto_pat.md": {
	id: "tekir2013_phisto_pat.md";
  slug: "tekir2013_phisto_pat";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"temizer2024_exploring_.md": {
	id: "temizer2024_exploring_.md";
  slug: "temizer2024_exploring_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"test2024example.md": {
	id: "test2024example.md";
  slug: "test2024example";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"tiftikci2016_ontology_b.md": {
	id: "tiftikci2016_ontology_b.md";
  slug: "tiftikci2016_ontology_b";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"tiftikci2017_extracting.md": {
	id: "tiftikci2017_extracting.md";
  slug: "tiftikci2017_extracting";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"tiftikci2019_machine_le.md": {
	id: "tiftikci2019_machine_le.md";
  slug: "tiftikci2019_machine_le";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"tiftikci_team_condl.md": {
	id: "tiftikci_team_condl.md";
  slug: "tiftikci_team_condl";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"trk2019_improving_.md": {
	id: "trk2019_improving_.md";
  slug: "trk2019_improving_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"trk2019_turkish_tr.md": {
	id: "trk2019_turkish_tr.md";
  slug: "trk2019_turkish_tr";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"trk2021_boun_treeb.md": {
	id: "trk2021_boun_treeb.md";
  slug: "trk2021_boun_treeb";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"trk2022_boun_treeb.md": {
	id: "trk2022_boun_treeb.md";
  slug: "trk2022_boun_treeb";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"trk2022_resources_.md": {
	id: "trk2022_resources_.md";
  slug: "trk2022_resources_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"trk_resources_.md": {
	id: "trk_resources_.md";
  slug: "trk_resources_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"trk_the_more_t.md": {
	id: "trk_the_more_t.md";
  slug: "trk_the_more_t";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"turkish-nlp-transfer-learning.md": {
	id: "turkish-nlp-transfer-learning.md";
  slug: "turkish-nlp-transfer-learning";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"ulgen2022_interpreti.md": {
	id: "ulgen2022_interpreti.md";
  slug: "ulgen2022_interpreti";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"uludoan2022_exploiting.md": {
	id: "uludoan2022_exploiting.md";
  slug: "uludoan2022_exploiting";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"uludoan2024_detecting_.md": {
	id: "uludoan2024_detecting_.md";
  slug: "uludoan2024_detecting_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"uludoan2024_overview_o.md": {
	id: "uludoan2024_overview_o.md";
  slug: "uludoan2024_overview_o";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"uludoan2024_turna_a_tu.md": {
	id: "uludoan2024_turna_a_tu.md";
  slug: "uludoan2024_turna_a_tu";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"uludoganturna2024.md": {
	id: "uludoganturna2024.md";
  slug: "uludoganturna2024";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"uskudarli1994_generating.md": {
	id: "uskudarli1994_generating.md";
  slug: "uskudarli1994_generating";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"uskudarli1995_specifying.md": {
	id: "uskudarli1995_specifying.md";
  slug: "uskudarli1995_specifying";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"uskudarli1995_towards_a_.md": {
	id: "uskudarli1995_towards_a_.md";
  slug: "uskudarli1995_towards_a_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"uskudarli1996_the_vas_fo.md": {
	id: "uskudarli1996_the_vas_fo.md";
  slug: "uskudarli1996_the_vas_fo";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"uskudarli1997_algebraic_.md": {
	id: "uskudarli1997_algebraic_.md";
  slug: "uskudarli1997_algebraic_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"uskudarli2002_pantoto_a_.md": {
	id: "uskudarli2002_pantoto_a_.md";
  slug: "uskudarli2002_pantoto_a_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"uskudarli2007_pantoto_a_.md": {
	id: "uskudarli2007_pantoto_a_.md";
  slug: "uskudarli2007_pantoto_a_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"uskudarli2020_neuroboun_.md": {
	id: "uskudarli2020_neuroboun_.md";
  slug: "uskudarli2020_neuroboun_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"uskudarli2020neuroboun.md": {
	id: "uskudarli2020neuroboun.md";
  slug: "uskudarli2020neuroboun";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"uskudarlitulap2023.md": {
	id: "uskudarlitulap2023.md";
  slug: "uskudarlitulap2023";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"villegas2015_general_ov.md": {
	id: "villegas2015_general_ov.md";
  slug: "villegas2015_general_ov";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"yakimovich2021_machine_le.md": {
	id: "yakimovich2021_machine_le.md";
  slug: "yakimovich2021_machine_le";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"yazan2015_sosyal_a_l.md": {
	id: "yazan2015_sosyal_a_l.md";
  slug: "yazan2015_sosyal_a_l";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"yildirim2008-semantics.md": {
	id: "yildirim2008-semantics.md";
  slug: "yildirim2008-semantics";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"yildirim2013semanticab.md": {
	id: "yildirim2013semanticab.md";
  slug: "yildirim2013semanticab";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"yildirim2016identifying.md": {
	id: "yildirim2016identifying.md";
  slug: "yildirim2016identifying";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"yildirim2018_the_inform.md": {
	id: "yildirim2018_the_inform.md";
  slug: "yildirim2018_the_inform";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"yildirim2020microblog.md": {
	id: "yildirim2020microblog.md";
  slug: "yildirim2020microblog";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"yksel2017_cnn_based_.md": {
	id: "yksel2017_cnn_based_.md";
  slug: "yksel2017_cnn_based_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"yksel2019_turkish_tw.md": {
	id: "yksel2019_turkish_tw.md";
  slug: "yksel2019_turkish_tw";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"yksel2024_incorporat.md": {
	id: "yksel2024_incorporat.md";
  slug: "yksel2024_incorporat";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"yldrm2008_semantic_t.md": {
	id: "yldrm2008_semantic_t.md";
  slug: "yldrm2008_semantic_t";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"yldrm2013_m_nazarala.md": {
	id: "yldrm2013_m_nazarala.md";
  slug: "yldrm2013_m_nazarala";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"yldrm2013_mikroblog_.md": {
	id: "yldrm2013_mikroblog_.md";
  slug: "yldrm2013_mikroblog_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"yldrm2015_bir_ontolo.md": {
	id: "yldrm2015_bir_ontolo.md";
  slug: "yldrm2015_bir_ontolo";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"yldrm2016_identifyin.md": {
	id: "yldrm2016_identifyin.md";
  slug: "yldrm2016_identifyin";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"yldrm2020_microblog_.md": {
	id: "yldrm2020_microblog_.md";
  slug: "yldrm2020_microblog_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"yuksel2024incorporating.md": {
	id: "yuksel2024incorporating.md";
  slug: "yuksel2024incorporating";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"zate2016_sentence_s.md": {
	id: "zate2016_sentence_s.md";
  slug: "zate2016_sentence_s";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"zate2018_a_morpholo.md": {
	id: "zate2018_a_morpholo.md";
  slug: "zate2018_a_morpholo";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"zate2020_dependency.md": {
	id: "zate2020_dependency.md";
  slug: "zate2020_dependency";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"zate2022_a_hybrid_d.md": {
	id: "zate2022_a_hybrid_d.md";
  slug: "zate2022_a_hybrid_d";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"zate2022_improving_.md": {
	id: "zate2022_improving_.md";
  slug: "zate2022_improving_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"zelik2021_chemboost_.md": {
	id: "zelik2021_chemboost_.md";
  slug: "zelik2021_chemboost_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"zelik2023_a_framewor.md": {
	id: "zelik2023_a_framewor.md";
  slug: "zelik2023_a_framewor";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"zgr2004_social_net.md": {
	id: "zgr2004_social_net.md";
  slug: "zgr2004_social_net";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"zgr2004_unsupervis.md": {
	id: "zgr2004_unsupervis.md";
  slug: "zgr2004_unsupervis";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"zgr2005_text_categ.md": {
	id: "zgr2005_text_categ.md";
  slug: "zgr2005_text_categ";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"zgr2006_classifica.md": {
	id: "zgr2006_classifica.md";
  slug: "zgr2006_classifica";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"zgr2006_efficient_.md": {
	id: "zgr2006_efficient_.md";
  slug: "zgr2006_efficient_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"zgr2008_co_occurre.md": {
	id: "zgr2008_co_occurre.md";
  slug: "zgr2008_co_occurre";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"zgr2008_identifyin.md": {
	id: "zgr2008_identifyin.md";
  slug: "zgr2008_identifyin";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"zgr2009_detecting_.md": {
	id: "zgr2009_detecting_.md";
  slug: "zgr2009_detecting_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"zgr2009_supervised.md": {
	id: "zgr2009_supervised.md";
  slug: "zgr2009_supervised";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"zgr2010_literature.md": {
	id: "zgr2010_literature.md";
  slug: "zgr2010_literature";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"zgr2011_mining_of_.md": {
	id: "zgr2011_mining_of_.md";
  slug: "zgr2011_mining_of_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"zgr2012_identifica.md": {
	id: "zgr2012_identifica.md";
  slug: "zgr2012_identifica";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"zgr2015_extension_.md": {
	id: "zgr2015_extension_.md";
  slug: "zgr2015_extension_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"zgr2016_ignet_a_ce.md": {
	id: "zgr2016_ignet_a_ce.md";
  slug: "zgr2016_ignet_a_ce";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"zgr2016_the_intera.md": {
	id: "zgr2016_the_intera.md";
  slug: "zgr2016_the_intera";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"zheng2025_vo_the_vac.md": {
	id: "zheng2025_vo_the_vac.md";
  slug: "zheng2025_vo_the_vac";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"zsert2013_word_polar.md": {
	id: "zsert2013_word_polar.md";
  slug: "zsert2013_word_polar";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"ztrk2015_classifica.md": {
	id: "ztrk2015_classifica.md";
  slug: "ztrk2015_classifica";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"ztrk2016_a_comparat.md": {
	id: "ztrk2016_a_comparat.md";
  slug: "ztrk2016_a_comparat";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"ztrk2018_a_novel_me.md": {
	id: "ztrk2018_a_novel_me.md";
  slug: "ztrk2018_a_novel_me";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"ztrk2018_deepdta_de.md": {
	id: "ztrk2018_deepdta_de.md";
  slug: "ztrk2018_deepdta_de";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"ztrk2019_widedta_pr.md": {
	id: "ztrk2019_widedta_pr.md";
  slug: "ztrk2019_widedta_pr";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"ztrk2020_exploring_.md": {
	id: "ztrk2020_exploring_.md";
  slug: "ztrk2020_exploring_";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
"ztrk2020_the_role_o.md": {
	id: "ztrk2020_the_role_o.md";
  slug: "ztrk2020_the_role_o";
  body: string;
  collection: "papers";
  data: InferEntrySchema<"papers">
} & { render(): Render[".md"] };
};
"people": {
"abdullatif-koksal.md": {
	id: "abdullatif-koksal.md";
  slug: "abdullatif-koksal";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"acar-erkek.md": {
	id: "acar-erkek.md";
  slug: "acar-erkek";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"ahmet-beka-ozkan.md": {
	id: "ahmet-beka-ozkan.md";
  slug: "ahmet-beka-ozkan";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"ahmet-selim-karaduman.md": {
	id: "ahmet-selim-karaduman.md";
  slug: "ahmet-selim-karaduman";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"ahmet-yigit-dogan.md": {
	id: "ahmet-yigit-dogan.md";
  slug: "ahmet-yigit-dogan";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"alaaddin-eren-namli.md": {
	id: "alaaddin-eren-namli.md";
  slug: "alaaddin-eren-namli";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"ali-ciltik.md": {
	id: "ali-ciltik.md";
  slug: "ali-ciltik";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"ali-erkan.md": {
	id: "ali-erkan.md";
  slug: "ali-erkan";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"amirreza-sattarzadeh.md": {
	id: "amirreza-sattarzadeh.md";
  slug: "amirreza-sattarzadeh";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"anil-caliskol.md": {
	id: "anil-caliskol.md";
  slug: "anil-caliskol";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"arda-celebi.md": {
	id: "arda-celebi.md";
  slug: "arda-celebi";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"arif-sirri-ozcelik.md": {
	id: "arif-sirri-ozcelik.md";
  slug: "arif-sirri-ozcelik";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"arzucan-ozgur.md": {
	id: "arzucan-ozgur.md";
  slug: "arzucan-ozgur";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"atahan-uz.md": {
	id: "atahan-uz.md";
  slug: "atahan-uz";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"atakan-yuksel.md": {
	id: "atakan-yuksel.md";
  slug: "atakan-yuksel";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"atif-emre-yuksel.md": {
	id: "atif-emre-yuksel.md";
  slug: "atif-emre-yuksel";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"azad-yasar.md": {
	id: "azad-yasar.md";
  slug: "azad-yasar";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"balkiz-ozturk-basaran.md": {
	id: "balkiz-ozturk-basaran.md";
  slug: "balkiz-ozturk-basaran";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"basak-aydemir.md": {
	id: "basak-aydemir.md";
  slug: "basak-aydemir";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"batuhan-baykara.md": {
	id: "batuhan-baykara.md";
  slug: "batuhan-baykara";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"bedirhan-caldir.md": {
	id: "bedirhan-caldir.md";
  slug: "bedirhan-caldir";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"berfu-buyukoz.md": {
	id: "berfu-buyukoz.md";
  slug: "berfu-buyukoz";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"berk-sel.md": {
	id: "berk-sel.md";
  slug: "berk-sel";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"burak-aydin.md": {
	id: "burak-aydin.md";
  slug: "burak-aydin";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"burak-sivrikaya.md": {
	id: "burak-sivrikaya.md";
  slug: "burak-sivrikaya";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"burak-suyunu.md": {
	id: "burak-suyunu.md";
  slug: "burak-suyunu";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"buse-ak.md": {
	id: "buse-ak.md";
  slug: "buse-ak";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"busra-oguzoglu.md": {
	id: "busra-oguzoglu.md";
  slug: "busra-oguzoglu";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"cagil-ulusahin-sonmez.md": {
	id: "cagil-ulusahin-sonmez.md";
  slug: "cagil-ulusahin-sonmez";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"cagla-aksoy.md": {
	id: "cagla-aksoy.md";
  slug: "cagla-aksoy";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"canan-pembe.md": {
	id: "canan-pembe.md";
  slug: "canan-pembe";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"caner-derici.md": {
	id: "caner-derici.md";
  slug: "caner-derici";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"cem-rifki-aydin.md": {
	id: "cem-rifki-aydin.md";
  slug: "cem-rifki-aydin";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"cuneyd-murad-ozsert.md": {
	id: "cuneyd-murad-ozsert.md";
  slug: "cuneyd-murad-ozsert";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"damla-demirok.md": {
	id: "damla-demirok.md";
  slug: "damla-demirok";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"dilek-kayahan.md": {
	id: "dilek-kayahan.md";
  slug: "dilek-kayahan";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"ebrar-kiziloglu.md": {
	id: "ebrar-kiziloglu.md";
  slug: "ebrar-kiziloglu";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"ece-ozbilen.md": {
	id: "ece-ozbilen.md";
  slug: "ece-ozbilen";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"eda-okur.md": {
	id: "eda-okur.md";
  slug: "eda-okur";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"emine-sener.md": {
	id: "emine-sener.md";
  slug: "emine-sener";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"emrah-budur.md": {
	id: "emrah-budur.md";
  slug: "emrah-budur";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"emre-boran.md": {
	id: "emre-boran.md";
  slug: "emre-boran";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"enes-taylan.md": {
	id: "enes-taylan.md";
  slug: "enes-taylan";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"eren-kotar.md": {
	id: "eren-kotar.md";
  slug: "eren-kotar";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"erencan-erkaya.md": {
	id: "erencan-erkaya.md";
  slug: "erencan-erkaya";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"erinc-gokdeniz.md": {
	id: "erinc-gokdeniz.md";
  slug: "erinc-gokdeniz";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"esin-gedik.md": {
	id: "esin-gedik.md";
  slug: "esin-gedik";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"fatih-ogun.md": {
	id: "fatih-ogun.md";
  slug: "fatih-ogun";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"ferhat-aydin.md": {
	id: "ferhat-aydin.md";
  slug: "ferhat-aydin";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"gamze-ege-kaya.md": {
	id: "gamze-ege-kaya.md";
  slug: "gamze-ege-kaya";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"gizem-sogancioglu.md": {
	id: "gizem-sogancioglu.md";
  slug: "gizem-sogancioglu";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"gizem-yilmaz.md": {
	id: "gizem-yilmaz.md";
  slug: "gizem-yilmaz";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"gokce-uludogan.md": {
	id: "gokce-uludogan.md";
  slug: "gokce-uludogan";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"gozde-aslantas.md": {
	id: "gozde-aslantas.md";
  slug: "gozde-aslantas";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"gozde-berk.md": {
	id: "gozde-berk.md";
  slug: "gozde-berk";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"gozde-kaymaz.md": {
	id: "gozde-kaymaz.md";
  slug: "gozde-kaymaz";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"hakan-demir.md": {
	id: "hakan-demir.md";
  slug: "hakan-demir";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"hakime-ozturk.md": {
	id: "hakime-ozturk.md";
  slug: "hakime-ozturk";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"haluk-dogan.md": {
	id: "haluk-dogan.md";
  slug: "haluk-dogan";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"haluk-karaevli.md": {
	id: "haluk-karaevli.md";
  slug: "haluk-karaevli";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"hamdi-erkut.md": {
	id: "hamdi-erkut.md";
  slug: "hamdi-erkut";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"hasim-sak.md": {
	id: "hasim-sak.md";
  slug: "hasim-sak";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"hidayet-takci.md": {
	id: "hidayet-takci.md";
  slug: "hidayet-takci";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"hilal-donmez.md": {
	id: "hilal-donmez.md";
  slug: "hilal-donmez";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"ilknur-karadeniz.md": {
	id: "ilknur-karadeniz.md";
  slug: "ilknur-karadeniz";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"ipek-akkus.md": {
	id: "ipek-akkus.md";
  slug: "ipek-akkus";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"kerem-celik.md": {
	id: "kerem-celik.md";
  slug: "kerem-celik";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"levent-ozgur.md": {
	id: "levent-ozgur.md";
  slug: "levent-ozgur";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"mehmet-durna.md": {
	id: "mehmet-durna.md";
  slug: "mehmet-durna";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"mehmet-selman-baysan.md": {
	id: "mehmet-selman-baysan.md";
  slug: "mehmet-selman-baysan";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"melce-husunbeyi.md": {
	id: "melce-husunbeyi.md";
  slug: "melce-husunbeyi";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"melihsah-turker.md": {
	id: "melihsah-turker.md";
  slug: "melihsah-turker";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"melike-esma-ilter.md": {
	id: "melike-esma-ilter.md";
  slug: "melike-esma-ilter";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"melike-korucuoglu.md": {
	id: "melike-korucuoglu.md";
  slug: "melike-korucuoglu";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"melis-ozgur-cetinkaya-demir.md": {
	id: "melis-ozgur-cetinkaya-demir.md";
  slug: "melis-ozgur-cetinkaya-demir";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"mert-basmaci.md": {
	id: "mert-basmaci.md";
  slug: "mert-basmaci";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"mert-tiftikci.md": {
	id: "mert-tiftikci.md";
  slug: "mert-tiftikci";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"merve-unlu.md": {
	id: "merve-unlu.md";
  slug: "merve-unlu";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"meryem-uzun.md": {
	id: "meryem-uzun.md";
  slug: "meryem-uzun";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"metin-senkal.md": {
	id: "metin-senkal.md";
  slug: "metin-senkal";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"mine-berker.md": {
	id: "mine-berker.md";
  slug: "mine-berker";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"mirac-goksu-ozturk.md": {
	id: "mirac-goksu-ozturk.md";
  slug: "mirac-goksu-ozturk";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"muhammed-emin-arayici.md": {
	id: "muhammed-emin-arayici.md";
  slug: "muhammed-emin-arayici";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"muhammed-yavuz-nuzumlali.md": {
	id: "muhammed-yavuz-nuzumlali.md";
  slug: "muhammed-yavuz-nuzumlali";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"murat-elifoglu.md": {
	id: "murat-elifoglu.md";
  slug: "murat-elifoglu";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"musa-nuri-ihtiyar.md": {
	id: "musa-nuri-ihtiyar.md";
  slug: "musa-nuri-ihtiyar";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"mustafa-serkan-erdur.md": {
	id: "mustafa-serkan-erdur.md";
  slug: "mustafa-serkan-erdur";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"nuriye-ozlem-ozcan-simsek.md": {
	id: "nuriye-ozlem-ozcan-simsek.md";
  slug: "nuriye-ozlem-ozcan-simsek";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"olgun-dursun.md": {
	id: "olgun-dursun.md";
  slug: "olgun-dursun";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"omer-ozan-mart.md": {
	id: "omer-ozan-mart.md";
  slug: "omer-ozan-mart";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"omer-taha-ornek.md": {
	id: "omer-taha-ornek.md";
  slug: "omer-taha-ornek";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"onder-eker.md": {
	id: "onder-eker.md";
  slug: "onder-eker";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"onur-gungor.md": {
	id: "onur-gungor.md";
  slug: "onur-gungor";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"onur-kardes.md": {
	id: "onur-kardes.md";
  slug: "onur-kardes";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"ozdeniz-dolu.md": {
	id: "ozdeniz-dolu.md";
  slug: "ozdeniz-dolu";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"ozgur-ozdemir.md": {
	id: "ozgur-ozdemir.md";
  slug: "ozgur-ozdemir";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"oznur-akyuz.md": {
	id: "oznur-akyuz.md";
  slug: "oznur-akyuz";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"pinar-kavak.md": {
	id: "pinar-kavak.md";
  slug: "pinar-kavak";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"rabia-gul-celik.md": {
	id: "rabia-gul-celik.md";
  slug: "rabia-gul-celik";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"riza-ozcelik.md": {
	id: "riza-ozcelik.md";
  slug: "riza-ozcelik";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"sahin-batmaz.md": {
	id: "sahin-batmaz.md";
  slug: "sahin-batmaz";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"salih-furkan-akkurt.md": {
	id: "salih-furkan-akkurt.md";
  slug: "salih-furkan-akkurt";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"saziye-betul-ozates.md": {
	id: "saziye-betul-ozates.md";
  slug: "saziye-betul-ozates";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"selen-parlar.md": {
	id: "selen-parlar.md";
  slug: "selen-parlar";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"serafettin-tasci.md": {
	id: "serafettin-tasci.md";
  slug: "serafettin-tasci";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"suzan-uskudarli.md": {
	id: "suzan-uskudarli.md";
  slug: "suzan-uskudarli";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"tunga-gungor.md": {
	id: "tunga-gungor.md";
  slug: "tunga-gungor";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"ugur-ozdemir.md": {
	id: "ugur-ozdemir.md";
  slug: "ugur-ozdemir";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"umit-atlamaz.md": {
	id: "umit-atlamaz.md";
  slug: "umit-atlamaz";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"yagmur-aydin.md": {
	id: "yagmur-aydin.md";
  slug: "yagmur-aydin";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"yasar-alim-turkmen.md": {
	id: "yasar-alim-turkmen.md";
  slug: "yasar-alim-turkmen";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"zeynep-balal.md": {
	id: "zeynep-balal.md";
  slug: "zeynep-balal";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"zeynep-gurler.md": {
	id: "zeynep-gurler.md";
  slug: "zeynep-gurler";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
};
"projects": {
"adaptive-question-answering.md": {
	id: "adaptive-question-answering.md";
  slug: "adaptive-question-answering";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"chemical-language-processing.md": {
	id: "chemical-language-processing.md";
  slug: "chemical-language-processing";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"concept-extraction-turkish.md": {
	id: "concept-extraction-turkish.md";
  slug: "concept-extraction-turkish";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"concept-mining-turkish.md": {
	id: "concept-mining-turkish.md";
  slug: "concept-mining-turkish";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"contextual-biomedical-text-mining.md": {
	id: "contextual-biomedical-text-mining.md";
  slug: "contextual-biomedical-text-mining";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"digital-tech-social-cohesion.md": {
	id: "digital-tech-social-cohesion.md";
  slug: "digital-tech-social-cohesion";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"english-turkish-nmt-literary.md": {
	id: "english-turkish-nmt-literary.md";
  slug: "english-turkish-nmt-literary";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"jointly-self-trained-parsers.md": {
	id: "jointly-self-trained-parsers.md";
  slug: "jointly-self-trained-parsers";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"lifelu.md": {
	id: "lifelu.md";
  slug: "lifelu";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"linguistics-turkish-nlp-platform.md": {
	id: "linguistics-turkish-nlp-platform.md";
  slug: "linguistics-turkish-nlp-platform";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"literary-machine-translation.md": {
	id: "literary-machine-translation.md";
  slug: "literary-machine-translation";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"lithme.md": {
	id: "lithme.md";
  slug: "lithme";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"morphology-speech-recognition-bap.md": {
	id: "morphology-speech-recognition-bap.md";
  slug: "morphology-speech-recognition-bap";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"morphology-speech-recognition-tubitak.md": {
	id: "morphology-speech-recognition-tubitak.md";
  slug: "morphology-speech-recognition-tubitak";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"morphotactic-language-modeling.md": {
	id: "morphotactic-language-modeling.md";
  slug: "morphotactic-language-modeling";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"multimodal-nmt-corpus.md": {
	id: "multimodal-nmt-corpus.md";
  slug: "multimodal-nmt-corpus";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"ner-hashtag-segmentation.md": {
	id: "ner-hashtag-segmentation.md";
  slug: "ner-hashtag-segmentation";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"nlp-text-classification.md": {
	id: "nlp-text-classification.md";
  slug: "nlp-text-classification";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"protein-ligand-database.md": {
	id: "protein-ligand-database.md";
  slug: "protein-ligand-database";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"statistical-analysis-turkish.md": {
	id: "statistical-analysis-turkish.md";
  slug: "statistical-analysis-turkish";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"turkish-dependency-parser.md": {
	id: "turkish-dependency-parser.md";
  slug: "turkish-dependency-parser";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"turkish-handwriting-recognition.md": {
	id: "turkish-handwriting-recognition.md";
  slug: "turkish-handwriting-recognition";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"turkish-spam-filtering.md": {
	id: "turkish-spam-filtering.md";
  slug: "turkish-spam-filtering";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"unidive.md": {
	id: "unidive.md";
  slug: "unidive";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"web-summarization.md": {
	id: "web-summarization.md";
  slug: "web-summarization";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
};
"theses": {
"morphological-analysis-thesis.md": {
	id: "morphological-analysis-thesis.md";
  slug: "morphological-analysis-thesis";
  body: string;
  collection: "theses";
  data: InferEntrySchema<"theses">
} & { render(): Render[".md"] };
"turkish-nlp-thesis.md": {
	id: "turkish-nlp-thesis.md";
  slug: "turkish-nlp-thesis";
  body: string;
  collection: "theses";
  data: InferEntrySchema<"theses">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
