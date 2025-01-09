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
