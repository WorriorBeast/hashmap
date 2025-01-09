//import './style.css';
import { HashSet } from './hashset';

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

	getKeys() {
		let keys = [];
		let current = this.head;

		while (current) {
			keys.push(current.key);
			current = current.next;
		}
		return keys;
	}

	getValues() {
		let values = [];
		let current = this.head;

		while (current) {
			values.push(current.value);
			current = current.next;
		}
		return values;
	}

	getKeyValues() {
		let keyValues = [];
		let current = this.head;

		while (current) {
			keyValues.push([current.key, current.value]);
			current = current.next;
		}
		return keyValues;
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
		const PRIME_NUMBER = 31;

		for (let i = 0; i < key.length; i++) {
			hashCode =
				(PRIME_NUMBER * hashCode + key.charCodeAt(i)) % this.capacity;
		}

		return hashCode;
	}

	set(key, value) {
		if (key.length === 0) return;
		if (this.size / this.capacity >= this.loadFactor) {
			const keyValuePairs = this.entries();
			const key = 0;
			const value = 1;

			this.capacity *= 2;
			this.buckets = new Array(this.capacity);
			this.size = 0;

			keyValuePairs.forEach((keyValue) =>
				this.set(keyValue[key], keyValue[value]),
			);
		}

		const index = this.hash(key);

		if (!this.buckets[index]) {
			this.buckets[index] = { [key]: value };
			this.size++;
		} else if (!this.buckets[index].head) {
			const linkedList = new LinkedList();
			const keyValue = Object.entries(this.buckets[index])[0];
			const KEY = 0;
			const VALUE = 1;

			if (key === keyValue[KEY]) {
				this.buckets[index][key] = value;
			} else {
				linkedList.append(keyValue[KEY], keyValue[VALUE]);
				linkedList.append(key, value);

				this.buckets[index] = linkedList;
				this.size++;
			}
		} else {
			const nodeIndex = this.buckets[index].findNodeIndex(key);
			const node = this.buckets[index].at(nodeIndex);

			if (node.key === key) {
				node.value = value;
			} else {
				this.buckets[index].append(key, value);
				this.size++;
			}
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

	length() {
		return this.size;
	}

	clear() {
		this.capacity = 16;
		this.buckets = new Array(this.capacity);
		this.size = 0;
	}

	keys() {
		const arrayLength = this.capacity;
		let arrayKeys = [];

		for (let i = 0; i < arrayLength; i++) {
			const bucket = this.buckets[i];

			if (!bucket) continue;

			if (!bucket.head) {
				arrayKeys.push(Object.keys(bucket)[0]);
			} else {
				arrayKeys.push(...bucket.getKeys());
			}
		}
		return arrayKeys;
	}

	values() {
		const arrayLength = this.capacity;
		let arrayValues = [];

		for (let i = 0; i < arrayLength; i++) {
			const bucket = this.buckets[i];

			if (!bucket) continue;

			if (!bucket.head) {
				arrayValues.push(Object.values(bucket)[0]);
			} else {
				arrayValues.push(...bucket.getValues());
			}
		}
		return arrayValues;
	}

	entries() {
		const arrayLength = this.capacity;
		let keyValue = [];

		for (let i = 0; i < arrayLength; i++) {
			const bucket = this.buckets[i];

			if (!bucket) continue;

			if (!bucket.head) {
				keyValue.push(Object.entries(bucket)[0]);
			} else {
				keyValue.push(...bucket.getKeyValues());
			}
		}
		return keyValue;
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

test.set('ice cream', 'chocolate');
test.set('dog', 'white');
test.set('grape', 'green');

console.log(test.buckets);

const setTest = new HashSet();

setTest.set('apple', 'red');
setTest.set('banana', 'yellow');
setTest.set('carrot', 'orange');
setTest.set('dog', 'brown');
setTest.set('elephant', 'gray');
setTest.set('frog', 'green');
setTest.set('grape', 'purple');
setTest.set('hat', 'black');
setTest.set('ice cream', 'white');
setTest.set('jacket', 'blue');
setTest.set('kite', 'pink');
setTest.set('lion', 'golden');
setTest.set('jet', 'green');
setTest.set('mouse trap', 'yellow');

console.log(setTest.buckets);
