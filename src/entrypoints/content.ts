import { defineContentScript } from 'wxt/utils/define-content-script';
import { browser } from 'wxt/browser';
import { COUNT_RESULT_IDS, type CountResult } from '../constants';
import '../styles/content.scss';

const titles = COUNT_RESULT_IDS.map((id) => `${id.charAt(0).toUpperCase()}${id.slice(1)}:`);

export default defineContentScript({
	matches: ['*://*/*'],
	main() {
		const MODAL_ID = 'twocaretcat-Tally-modal' as const;

		const modal = document.createElement('div');
		const h2 = document.createElement('h2');
		const table = document.createElement('div');
		const button = document.createElement('button');

		h2.appendChild(document.createTextNode('Tally - Word Counter'));
		modal.appendChild(h2);

		for (let i = 0; i < COUNT_RESULT_IDS.length; i++) {
			const id = COUNT_RESULT_IDS[i]!;
			const title = titles[i]!;
			const row = document.createElement('div');
			const h = document.createElement('h5');
			const o = document.createElement('output');

			row.className = [MODAL_ID, 'row'].join('-');
			h.appendChild(document.createTextNode(title));
			row.appendChild(h);

			o.appendChild(document.createTextNode('-'));
			o.setAttribute('id', id);
			row.appendChild(o);

			table.appendChild(row);
		}

		const modalOpenClass = [MODAL_ID, 'open'].join('-');

		table.className = [MODAL_ID, 'table'].join('-');
		modal.appendChild(table);

		button.appendChild(document.createTextNode('CLOSE'));
		button.addEventListener('click', () => modal.classList.remove(modalOpenClass));

		modal.appendChild(button);

		modal.className = MODAL_ID;
		document.body.appendChild(modal);

		browser.runtime.onMessage.addListener(function(request: CountResult) {
			modal.classList.add(modalOpenClass);

			for (const id of COUNT_RESULT_IDS) {
				document.getElementById(id)!.textContent = String(request[id]);
			}
		});
	}
});
