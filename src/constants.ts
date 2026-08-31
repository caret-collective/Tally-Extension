export const COUNT_RESULT_IDS = [
	'characters',
	'words',
	'sentences',
	'paragraphs',
	'lines',
	'spaces',
	'letters',
	'digits',
	'punctuation',
	'symbols'
] as const satisfies string[];

export type CountResult = Record<typeof COUNT_RESULT_IDS[number], number>;
