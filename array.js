const Memory = require("./memory");
const memory = new Memory();

class Array {
  constructor() {
    this.length = 0;
    this._capacity = 0;  // {Question 1} Why is the capacity named underscore capacity?
    this.ptr = memory.allocate(this.length);
  }
  
  print() {
    console.log(memory);
  }

  // Pushing new values into the end of the array:
  push(value) {
    // If the length is less than the capacity...
    if (this.length >= this._capacity) {
      // ...resize the array to increase the capacity * by the size ratio.
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }
    // Set new value to be stored at a certain memory address.
    memory.set(this.ptr + this.length, value);
    // Increase the length.
    this.length++;
  }

  // Resizing the array to increase capacity. This is invoked from within the push function.
  _resize(size) {
    // Save pointer as old pointer.
    const oldPtr = this.ptr;
    // Reserve blocks in sequence based on size to modify, and set it as pointer. 
    this.ptr = memory.allocate(size);
    // If this new pointer is null based on the if statement located within the .allocate function, then return Error.
    if (this.ptr === null) {
      throw new Error("Memory error: Out of memory.");
    }
    // Copy the values of boxes from oldPtr to length and save them to boxes starting at new pointer.
    memory.copy(this.ptr, oldPtr, this.length);
    // Clear old pointer for next invocation.
    memory.free(oldPtr);
    // Set capacity to new size based on line of code within the push function.
    this._capacity = size;
  }

  // Retrieving values based on index...
  get(index) {
    // If the index of the value we are trying to get is less than 0 and greater or equal to the length, it will be out of range.
    if (index < 0 || index >= this.length) {
      throw new Error("Index error: Out of range.");
    }
    // If it is within the range, get memory based on index.
    // {Question 2} Why do we need to add pointer to index to get the right value?
    return memory.get(this.ptr + index);
  }

  // Removing a value from the end of the array...
  pop() {
    // If the length of the array is zero, then show Error.
    if (this.length == 0) {
      throw new Error("Index error: Length is equal to zero.");
    }
    // Set the parameter to the last index number, then invoke get. Then, declare value returned by get to value.
    const value = memory.get(this.ptr + this.length - 1);
    // Decrement the length by one.
    this.length--;
    return value;
  }

  // Insert new value by providing index and value...
  insert(index, value) {
    // Return error if index is outside of range.
    if (index < 0 || index >= this.length) {
      throw new Error("Index error: Out of range.");
    }
    // Increase the length if it is shorter than the capacity.
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }
    // Copy all the values in the array after the index where we are trying to insert in the new value. Then, set all the copied values in the array by iterating forwards or backwards.
    memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
    // Set the new value into the index.
    memory.set(this.ptr + index, value);
    // Increase the length.
    this.length++;
  }

  // Remove value based on index...
  remove(index) {
    // Return error if index is outside the range...
    if (index < 0 || index > + this.length) {
      throw new Error("Index error: Out of range.");
    }
    // Copy from index + 1 to everything after the index. Set values starting at index.
    memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
    // Subtract length since one spot was removed.
    this.length--;
  }
}

Array.SIZE_RATIO = 3;

module.exports = Array;