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

function count(info: chrome.contextMenus.OnClickData): void {
	const text = info.selectionText!;
	const len = text.length;

	let wordflag = false;
	let sentflag = false;
	let paraflag = false;

	const count: CountResult = {
		characters: 0,
		words: 0,
		sentences: 0,
		paragraphs: 0,
		spaces: 0,
		letters: 0,
		digits: 0,
		specialcharacters: 0
	};

	for (let i = 0; i < len; i++) {
		const current = text[i]!;

		count.characters++;

		if (/\d/.test(current)) {
			wordflag = true;
			sentflag = true;
			paraflag = true;
			count.digits++;
		}
		else if (/\w/.test(current)) {
			wordflag = true;
			sentflag = true;
			paraflag = true;
			count.letters++;
		}
		else {
			if (/ /.test(current)) {
				count.spaces++;

				if (wordflag) {
					wordflag = false;
					count.words++;
				}
			}
			else if (/[\.\?\!]/.test(current)) {
				if (wordflag) {
					wordflag = false;
					count.words++;
				}

				if (sentflag) {
					sentflag = false;
					count.sentences++;
				}
			}
			else if (/\n/.test(current)) {
				if (wordflag) {
					wordflag = false;
					count.words++;
				}

				if (sentflag) {
					sentflag = false;
					count.sentences++;
				}

				if (paraflag) {
					paraflag = false;
					count.paragraphs++;
				}
			}
			else {
				count.specialcharacters++;
			}
		}
	}

	if (wordflag) {
		count.words++;
	}

	if (sentflag) {
		count.sentences++;
	}

	if (paraflag) {
		count.paragraphs++;
	}

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		const tabId = tabs[0]?.id;

		if (tabId === undefined) {
			return;
		}

		chrome.tabs.sendMessage(tabId, count);
	});
}

chrome.contextMenus.create({
	id: 'twocaretcat-Tally-count',
	title: 'Tally Word Counter: Count',
	contexts: ['selection']
});

chrome.contextMenus.onClicked.addListener(function(info) {
	if (info.menuItemId == 'twocaretcat-Tally-count') {
		count(info);
	}
});
