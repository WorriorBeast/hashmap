import './style.css';

class Node {
	constructor(key = null, value = null, next = null) {
		this.key = key;
		this.value = value;
		this.next = next;
	}
}

class LinkedList {
	constructor() {
		this.head = null;
	}

	append(key, value) {
		if (this.head == null) {
			this.head = new Node(key, value);
		} else {
			let current = this.head;

			while (current.next) {
				current = current.next;
			}

			current.next = new Node(key, value);
		}
	}

	prepend(key, value) {
		let newNode = new Node(key, value);

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
			string += `( ${current.key}, ${current.value} ) -> `;
			current = current.next;
		}
		string += 'null';
		return string;
	}

	insertAt(key, value, index) {
		let current = this.head;
		let currentIndex = 1;
		let previous;

		if (this.head == null) {
			this.head = new Node(key, value);
		}

		while (current) {
			if (currentIndex === index) {
				const newNode = new Node(key, value);

				newNode.next = current;
				previous.next = newNode;
			} else {
				previous = current;
				current = current.next;
				currentIndex++;
			}
		}

		previous.next = new Node(value);
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
}

class HashMap {
	constructor() {
		this.capacity = 16;
		this.loadFactor = 0.75;
		this.buckets = new Array(this.capacity);
	}

	hash(key) {
		let hashCode = 0;
		const primeNumber = 31;

		for (let i = 0; i < key.length; i++) {
			hashCode =
				(primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
		}

		return hashCode;
	}
}

const test = new HashMap();

console.log(test.hash('dog'));
