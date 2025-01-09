class Node {
	constructor() {
		this.key = null;
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
}
