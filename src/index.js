//import './style.css';

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
		this.size = 0;
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

	set(key, value) {
		if (key.length === 0) return;

		const index = this.hash(key);

		if (!this.buckets[index]) {
			this.buckets[index] = { [key]: value };
			this.size++;
		} else if (!this.buckets[index].head) {
			const linkedList = new LinkedList();
			const keyValue = Object.entries(this.buckets[index])[0];
			const key = 0;
			const value = 1;

			linkedList.append(keyValue[key], keyValue[value]);
			linkedList.append(key, value);

			this.buckets[index] = linkedList;
			this.size++;
		} else {
			this.buckets[index].append(key, value);
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
			const bucketKey = Object.keys(bucket)[0];

			return key == bucketKey ? bucket[key] : null;
		} else {
			const nodeIndex = bucket.findNodeIndex(key);
			const node = bucket.at(nodeIndex);

			return node.key === key ? node.value : null;
		}
	}

	has(key) {
		if (key.length === 0) return false;

		const index = this.hash(key);
		let bucket = this.buckets[index];

		if (!bucket) {
			return false;
		} else if (!bucket.head) {
			const hashKey = Object.keys(bucket)[0];

			if (key == hashKey) return true;

			return false;
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
			const hashKey = Object.keys(this.buckets[index])[0];

			if (key == hashKey) {
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
}

const test = new HashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
test.set('jet', 'green');
test.set('mouse trap', 'yellow');

console.log(test.buckets);
console.log(test.remove('carrot'));
console.log(test.remove('mouse trap'));
console.log(test.remove('apple'));
console.log(test.buckets);
