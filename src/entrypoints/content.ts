import { defineContentScript } from 'wxt/utils/define-content-script';
import { browser } from 'wxt/browser';
import '../styles/content.scss';

type CountResult = {
	characters: number;
	words: number;
	sentences: number;
	paragraphs: number;
	spaces: number;
	letters: number;
	digits: number;
	specialcharacters: number;
};

const titles = [
	'Characters:',
	'Words:',
	'Sentences:',
	'Paragraphs:',
	'Spaces:',
	'Letters:',
	'Digits:',
	'Special Characters:'
] as const;

const ids = [
	'characters',
	'words',
	'sentences',
	'paragraphs',
	'spaces',
	'letters',
	'digits',
	'specialcharacters'
] as const;

export default defineContentScript({
	matches: ['*://*/*'],
	main() {
		const modal = document.createElement('div');
		const h2 = document.createElement('h2');
		const table = document.createElement('div');
		const h: HTMLHeadingElement[] = [];
		const o: HTMLOutputElement[] = [];
		const button = document.createElement('button');

		h2.appendChild(document.createTextNode('Tally Word Counter'));
		modal.appendChild(h2);

		for (let i = 0; i < ids.length; i++) {
			const id = ids[i]!;
			const title = titles[i]!;

			h.push(document.createElement('h5'));
			h[i]!.appendChild(document.createTextNode(title));
			table.appendChild(h[i]!);

			o.push(document.createElement('output'));
			o[i]!.appendChild(document.createTextNode('-'));
			o[i]!.setAttribute('id', id);
			table.appendChild(o[i]!);
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
