class Node {
	constructor(key) {
		this.key = key;
		this.next = null;
	}
}

class LinkedList {
	constructor() {
		this.head = null;
	}

	append(key) {
		if (this.head == null) {
			this.head = new Node(key);
		} else {
			let current = this.head;

			while (current.next) {
				current = current.next;
			}

			current.next = new Node(key);
		}
	}

	prepend(key) {
		let newNode = new Node(key);

		newNode.next = this.head;
		this.head = newNode;
	}

	size() {
		let size = 1;
		let current = this.head;

		if (this.head == null) {
			return 0;
		} else {
			while (current.next) {
				current = current.next;
				size++;
			}
			return size;
		}
	}

	firstNode() {
		return this.head;
	}

	tail() {
		let current = this.head;

		while (current.next) {
			current = current.next;
		}
		return current;
	}

	at(index) {
		if (index <= 0) return null;

		let current = this.head;

		for (let i = 1; i < index; i++) {
			if (current.next == null) return null;

			current = current.next;
		}
		return current;
	}

	pop() {
		let current = this.head;

		while (current) {
			if (current.next.next == null) break;
			current = current.next;
		}

		current.next = null;
	}

	containsKey(key) {
		let current = this.head;

		while (current.next) {
			if (current.key === key) {
				return true;
			} else {
				current = current.next;
			}
		}
		return false;
	}

	findNodeIndex(key) {
		let current = this.head;
		let index = 1;

		while (current) {
			if (current.key === key) {
				return index;
			} else {
				current = current.next;
				index++;
			}
		}
		return null;
	}

	toString() {
		let current = this.head;
		let string = '';

		while (current) {
			string += `( ${current.key} ) -> `;
			current = current.next;
		}
		string += 'null';
		return string;
	}

	insertAt(key, index) {
		let current = this.head;
		let currentIndex = 1;
		let previous;

		if (this.head == null) {
			this.head = new Node(key);
		}

		while (current) {
			if (currentIndex === index) {
				const newNode = new Node(key);

				newNode.next = current;
				previous.next = newNode;
			} else {
				previous = current;
				current = current.next;
				currentIndex++;
			}
		}

		previous.next = new Node(key);
	}

	removeAt(index) {
		if (Number(index) <= 0) return;
		if (Number(index) == 1) {
			this.head = this.head.next;
			return;
		}

		let current = this.head;
		let currentIndex = 1;
		let previous;

		while (current) {
			if (currentIndex === Number(index)) {
				previous.next = current.next;
				return;
			} else {
				previous = current;
				current = current.next;
				currentIndex++;
			}
		}
	}

	getKeys() {
		let keys = [];
		let current = this.head;

		while (current) {
			keys.push(current.key);
			current = current.next;
		}
		return keys;
	}
}

class HashSet {
	constructor() {
		this.capacity = 16;
		this.loadFactor = 0.75;
		this.buckets = new Array(this.capacity);
		this.size = 0;
	}

	hash(key) {
		let hashCode = 0;
		const PRIME_NUMBER = 31;

		for (let i = 0; i < key.length; i++) {
			hashCode =
				(PRIME_NUMBER * hashCode + key.charCodeAt(i)) % this.capacity;
		}

		return hashCode;
	}

	set(key) {
		if (key.length === 0) return;

		const index = this.hash(key);

		if (!this.buckets[index]) {
			this.buckets[index] = key;
			this.size++;
		} else if (!this.buckets[index].head) {
			if (key === this.buckets[index]) return;

			const linkedList = new LinkedList();

			linkedList.append(this.buckets[index]);
			linkedList.append(key);

			this.buckets[index] = linkedList;
			this.size++;
		} else {
			if (this.buckets[index].containsKey(key)) return;

			this.buckets[index].append(key);
			this.size++;
		}
	}

	get(key) {
		if (key.length === 0) return null;

		const index = this.hash(key);
		const bucket = this.buckets[index];

		if (!bucket) {
			return null;
		} else if (!bucket.head) {
			return key == bucket ? bucket : null;
		} else {
			return bucket.containsKey(key) ? key : null;
		}
	}

	has(key) {
		if (key.length === 0) return false;

		const index = this.hash(key);
		const bucket = this.buckets[index];

		if (!bucket) {
			return false;
		} else if (!bucket.head) {
			return key === bucket ? true : false;
		} else {
			return bucket.containsKey(key);
		}
	}

	remove(key) {
		if (key.length === 0) return;

		const index = this.hash(key);

		if (!this.buckets[index]) {
			return false;
		} else if (!this.buckets[index].head) {
			if (key === this.buckets[index]) {
				this.buckets[index] = undefined;
				this.size--;

				return true;
			}

			return false;
		} else {
			const nodeIndex = this.buckets[index].findNodeIndex(key);

			if (!nodeIndex) return false;

			this.buckets[index].removeAt(nodeIndex);
			this.size--;

			return true;
		}
	}

	length() {
		return this.size;
	}
}

const test = new HashSet();

test.set('apple');
test.set('banana');
test.set('carrot');
test.set('dog');
test.set('elephant');
console.log(test.size);
test.set('frog');
test.set('grape');
test.set('hat');
test.set('ice cream');
test.set('jacket');
test.set('kite');
test.set('lion');
test.set('jet');
test.set('mouse trap');
console.log(test.size);

console.log(test.remove('apple'));
console.log(test.size);
