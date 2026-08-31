import { Tally } from '@twocaretcat/tally-ts';
import { defineBackground } from 'wxt/utils/define-background';
import { browser, type Browser } from 'wxt/browser';
import type { CountResult } from '../constants';

const tally = new Tally({locales: browser.i18n.getUILanguage()});

async function count(info: Browser.contextMenus.OnClickData, tab: Browser.tabs.Tab | undefined): Promise<void> {
	if (!info.selectionText || tab?.id === undefined) {
		return;
	}

	const counts = tally.countAll(info.selectionText);
	const message: CountResult = {
		characters: counts.graphemes.total,
		words: counts.words.total,
		sentences: counts.sentences.total,
		paragraphs: counts.paragraphs.total,
		lines: counts.lines.total,
		spaces: counts.graphemes.by.spaces.total,
		letters: counts.graphemes.by.letters.total,
		digits: counts.graphemes.by.digits.total,
		punctuation: counts.graphemes.by.punctuation.total,
		symbols: counts.graphemes.by.symbols.total
	};

	await browser.tabs.sendMessage(tab.id, message).catch(() => undefined);
}

export default defineBackground(() => {
	browser.runtime.onInstalled.addListener(() => {
		browser.contextMenus.create({
			id: 'twocaretcat-Tally-count',
			title: 'Tally Word Counter: Count',
			contexts: ['selection']
		});
	});

	browser.contextMenus.onClicked.addListener((info, tab) => {
		if (info.menuItemId == 'twocaretcat-Tally-count') {
			void count(info, tab);
		}
	});
});
