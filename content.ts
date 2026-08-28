;(function(){
	let modal = document.createElement('div'),
			h2 = document.createElement('h2'),
			table = document.createElement('div'),
			h = [],
			o = [],
			button = document.createElement('button'),
			titles = ['Characters:', 'Words:', 'Sentences:', 'Paragraphs:', 'Spaces:', 'Letters:', 'Digits:', 'Special Characters:'],
			ids = ['characters', 'words', 'sentences', 'paragraphs', 'spaces', 'letters', 'digits', 'specialcharacters']

	h2.appendChild(document.createTextNode('Tally Word Counter'))
	modal.appendChild(h2)


	for (let i = 0; i < 8; i++) {
		h.push(document.createElement('h5'))
		h[i].appendChild(document.createTextNode(titles[i]))
		table.appendChild(h[i])

		o.push(document.createElement('output'))
		o[i].appendChild(document.createTextNode('-'))
		o[i].setAttribute('id', ids[i]);
		table.appendChild(o[i])
	}

	table.className = 'twocaretcat-Tally-modal-table'
	modal.appendChild(table)

	button.appendChild(document.createTextNode('CLOSE'))
	button.setAttribute('onclick', '(function() {document.getElementsByClassName("twocaretcat-Tally-modal")[0].classList.remove("twocaretcat-Tally-modal-open")}())')

	modal.appendChild(button)

	modal.className = 'twocaretcat-Tally-modal'
	document.body.appendChild(modal)

	chrome.runtime.onMessage.addListener(
		function(request) {
			modal.classList.add('twocaretcat-Tally-modal-open')

			for (let i = 0; i < 8; i++) {
				document.getElementById(ids[i]).innerHTML = request[ids[i]]
			}
	});
})();
