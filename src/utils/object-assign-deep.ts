// tslint:disable:prefer-for-of

function getTypeOf (input) {
  if (input === null) {
    return 'null';
  }

  else if (typeof input === 'undefined') {
    return 'undefined';
  }

  else if (typeof input === 'object') {
    return (Array.isArray(input) ? 'array' : 'object');
  }

  return typeof input;

}

function cloneValue (value) {
  if (getTypeOf(value) === 'object') {
    return quickCloneObject(value);
  }

  else if (getTypeOf(value) === 'array') {
    return quickCloneArray(value);
  }

  return value;

}

function quickCloneArray (input) {
  return input.map(cloneValue);
}

function quickCloneObject (input) {

  const output = {};

  for (const key in input) {
    if (!input.hasOwnProperty(key)) { continue; }

    output[key] = cloneValue(input[key]);
  }

  return output;

}

function executeDeepMerge (target, _objects = [], _options = { arrayBehaviour: 'replace' }) {

  const options = {
    arrayBehaviour: _options.arrayBehaviour,
  };

  const objects = _objects.map(object => object || {});
  const output = target || {};

  for (let oindex = 0; oindex < objects.length; oindex++) {
    const object = objects[oindex];
    const keys = Object.keys(object);

    for (let kindex = 0; kindex < keys.length; kindex++) {
      const key = keys[kindex];
      const value = object[key];
      const type = getTypeOf(value);
      const existingValueType = getTypeOf(output[key]);

      if (type === 'object') {
        if (existingValueType !== 'undefined') {
          const existingValue = (existingValueType === 'object' ? output[key] : {});
          output[key] = executeDeepMerge({}, [existingValue, quickCloneObject(value)], options);
        }
        else {
          output[key] = quickCloneObject(value);
        }
      }

      else if (type === 'array') {
        if (existingValueType === 'array') {
          const newValue = quickCloneArray(value);
          output[key] = (options.arrayBehaviour === 'merge' ? output[key].concat(newValue) : newValue);
        }
        else {
          output[key] = quickCloneArray(value);
        }
      }

      else {
        output[key] = value;
      }

    }
  }

  return output;
}

export default function objectAssignDeep (target, ...objects) {
  return executeDeepMerge(target, objects);
}
