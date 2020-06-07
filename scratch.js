const checkRotation = (strOne, strTwo) => {
  let strArr = strOne.split("");

  if (strOne === "" && strTwo == "") {
    return true;
  }

  for (let i = 0; i < strArr.length; i++) {
    strArr.unshift(strArr.pop());
    if (strArr.join("") === strTwo) {
      return true;
    }
  }
  return false;
};

const strOne = "amazon";
const strTwo = "azonma";
console.log(checkRotation(strOne, strTwo));