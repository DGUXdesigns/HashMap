export class HashMap {
  constructor(capacity, loadFactor) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.buckets = new Array(this.capacity).fill().map(() => []);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
    }

    return hashCode;
  }

  set(key, value) {
    const bucketIndex = this.hash(key);
    const bucket = this.buckets[bucketIndex];

    this.doubleCapacity();

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket[i].value = value;
        return;
      }
    }

    bucket.push({ key, value });
  }

  doubleCapacity() {
    if (this.length() + 1 > this.capacity * this.loadFactor) {
      //Save current data
      const oldBuckets = this.buckets;
      this.capacity *= 2;
      this.buckets = new Array(this.capacity).fill().map(() => []);

      // Rehash and redistribute entries into new buckets
      oldBuckets.forEach((bucket) => {
        bucket.forEach((entry) => {
          const bucketIndex = this.hash(entry.key);
          this.buckets[bucketIndex].push(entry);
        });
      });
    }
  }

  get(key) {
    const bucketIndex = this.hash(key);
    const bucket = this.buckets[bucketIndex];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        return bucket[i].value;
      }
    }

    return null;
  }

  has(key) {
    const bucketIndex = this.hash(key);
    const bucket = this.buckets[bucketIndex];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        return true;
      }
    }

    return false;
  }

  remove(key) {
    const bucketIndex = this.hash(key);
    const bucket = this.buckets[bucketIndex];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1);
        return true;
      }
    }

    return false;
  }

  length() {
    let storedKeys = 0;

    for (let i = 0; i < this.buckets.length; i++) {
      storedKeys += this.buckets[i].length;
    }

    return storedKeys;
  }

  clear() {
    this.buckets = new Array(this.buckets.length).fill().map(() => []);
  }

  keys() {
    const keysArray = [];

    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];

      for (let j = 0; j < bucket.length; j++) {
        keysArray.push(bucket[j].key);
      }
    }

    return keysArray;
  }

  values() {
    const valuesArray = [];

    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];

      for (let j = 0; j < bucket.length; j++) {
        valuesArray.push(bucket[j].value);
      }
    }

    return valuesArray;
  }

  entries() {
    const entriesArray = [];

    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];

      for (let j = 0; j < bucket.length; j++) {
        const newArr = [];

        newArr.push(bucket[j].key);
        newArr.push(bucket[j].value);

        entriesArray.push(newArr);
      }
    }

    return entriesArray;
  }
}
