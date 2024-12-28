export const testFrameWork = function (fn, expected, ...input) {
  const actual = fn(...input);
  const isTestPass = Array.isArray(expected)
    ? areArrayEqual(actual, expected)
    : actual === expected;
  const confirmationMsg = " expected " + expected;
  if (!isTestPass) {
    console.log("❌", confirmationMsg, "actual ", actual, input);
  }
};

const areArrayEqual = (actual, expected) => {
  if (actual.length !== expected.length) {
    return false;
  }

  if (actual == expected) {
    return true;
  }

  return expected.every((expectedElement, index) => {
    if (Array.isArray(expectedElement)) {
      return areArrayEqual(actual[index], expectedElement);
    }

    if (typeof expectedElement === "object") {
      return areObjectEqual(actual[index], expectedElement);
    }

    return expectedElement === actual[index];
  });
};

const areObjectEqual = (actualObj, expectedObj) => {
  const keys1 = Object.keys(actualObj);
  const keys2 = Object.keys(expectedObj);

  if (keys1.length !== keys2.length) return false;
  if (actualObj == expectedObj) return true;

  return keys1.every((key) => {
    if (!keys2.includes(key)) return false;

    if (Array.isArray(expectedObj[key])) {
      return areArrayEqual(actualObj[key], expectedObj[key]);
    }

    if (typeof expectedObj[key] === "object") {
      return areObjectEqual(actualObj[key], expectedObj[key]);
    }

    return actualObj[key] === expectedObj[key];
  });
};