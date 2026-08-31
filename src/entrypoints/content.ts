import { defineContentScript } from 'wxt/utils/define-content-script';
import { browser } from 'wxt/browser';
import type { CountResult } from '../types';
import '../styles/content.scss';

const titles = [
	'Characters:',
	'Words:',
	'Sentences:',
	'Paragraphs:',
	'Lines:',
	'Spaces:',
	'Letters:',
	'Digits:',
	'Punctuation:',
	'Symbols:'
] as const satisfies (`${Capitalize<keyof CountResult>}:`)[];

const ids = [
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
] as const satisfies (keyof CountResult)[];

export default defineContentScript({
	matches: ['*://*/*'],
	main() {
		const modal = document.createElement('div');
		const h2 = document.createElement('h2');
		const table = document.createElement('div');
		const button = document.createElement('button');

		h2.appendChild(document.createTextNode('Tally - Word Counter'));
		modal.appendChild(h2);

		for (let i = 0; i < ids.length; i++) {
			const id = ids[i]!;
			const title = titles[i]!;
			const row = document.createElement('div');
			const h = document.createElement('h5');
			const o = document.createElement('output');

			row.className = 'twocaretcat-Tally-modal-row';
			h.appendChild(document.createTextNode(title));
			row.appendChild(h);

			o.appendChild(document.createTextNode('-'));
			o.setAttribute('id', id);
			row.appendChild(o);

			table.appendChild(row);
		}

		table.className = 'twocaretcat-Tally-modal-table';
		modal.appendChild(table);

		button.appendChild(document.createTextNode('CLOSE'));
		button.addEventListener('click', () => modal.classList.remove('twocaretcat-Tally-modal-open'));

		modal.appendChild(button);

		modal.className = 'twocaretcat-Tally-modal';
		document.body.appendChild(modal);

		browser.runtime.onMessage.addListener(function(request: CountResult) {
			modal.classList.add('twocaretcat-Tally-modal-open');

			for (const id of ids) {
				document.getElementById(id)!.textContent = String(request[id]);
			}
		});
	}
});
