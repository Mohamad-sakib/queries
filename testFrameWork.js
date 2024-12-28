const isTestPass = (actual, expected) => {
  if (Array.isArray(expected)) {
    return areArrayEqual(actual, expected);
  }

  if (typeof expectedElement === "object") {
    return areObjectEqual(actual, expected);
  }

  return actual === expected;
};

export const testFrameWork = function (fn, expected, ...input) {
  const actual = fn(...input);

  if (!isTestPass(actual, expected)) {
    console.log("❌", " expected ", expected, "actual ", actual, input);
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

//testing

//testing for areObjectEqual
const a = { one: 1 };

console.log(areObjectEqual(a, a));
console.log(areObjectEqual({}, {}));
console.log(areObjectEqual({ one: 1 }, { one: 1 }));
console.log(areObjectEqual({ one: 1 }, { one: 1, two: 2 }));
console.log(areObjectEqual({ one: [1, 2] }, { one: [1, 2] }));
console.log(areObjectEqual({ one: [1, 2] }, { one: [1, 2], two: 0 }));
console.log(areObjectEqual({ one: [1, 2] }, { one: [1, { i: 1 }], two: 0 }));
console.log(areObjectEqual({ one: [1, 2] }, { one: [1, { i: 1 }], two: 0 }));
console.log(
  areObjectEqual({ one: [1, { i: 1 }], two: 0 }, { one: [1, { i: 1 }], two: 0 })
);

//testing for areArrayEqual
console.log("\n\ntesting for areArrayEqual");
const b = [1, 3];

console.log(areArrayEqual(b, b));
console.log(areArrayEqual([], []));
console.log(areArrayEqual([{ one: 1 }], [{ one: 1 }]));
console.log(areArrayEqual([{ one: 1 }], [{ one: 1, two: 2 }]));
console.log(areArrayEqual([{ one: [1, 2] }], [{ one: [1, 2] }]));
console.log(areArrayEqual([{ one: [1, 2] }], [{ one: [1, 2], two: 0 }]));
console.log(areArrayEqual([{ one: [1, 2] }], [{ one: [1, { i: 1 }], two: 0 }]));
console.log(areArrayEqual([{ one: [1, 2] }], [{ one: [1, { i: 1 }], two: 0 }]));
console.log(
  areObjectEqual(
    [{ one: [1, { i: 1 }], two: 0 }],
    [{ one: [1, { i: 1 }], two: 0 }]
  )
);

console.log(areArrayEqual([1], [2]));
console.log(areArrayEqual([1, 2], [1, 2]));
