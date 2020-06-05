const Array = require("./array");

function main() {
  Array.SIZE_RATIO = 3;

  let arr = new Array();

  arr.push(3);
  arr.push(5);
  arr.push(15);
  arr.push(19);
  arr.push(45);
  arr.push(10);
  arr.print();
  console.log(arr);
}

return (main())