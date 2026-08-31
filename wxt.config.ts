import { defineConfig } from 'wxt';

export default defineConfig({
	manifestVersion: 3,
	srcDir: 'src',
	outDir: 'build',
	modules: ['@wxt-dev/auto-icons'],
	autoIcons: {
		developmentIndicator: 'overlay'
	},
	manifest: {
		name: 'Tally - Word Counter',
		short_name: 'Tally',
		description:
			'Easily count the number of words, characters, and paragraphs on any site. Right click on any selected text and click Count.',
		permissions: ['contextMenus', 'activeTab']
	},
});
