import nodent from 'nodent';
import indent from 'indent';
import inspectf from 'inspect-f';
import marked from 'marked';
import hljs from 'highlight.js';
import Prism from 'prismjs';
import { compiler } from 'vueify';

function arrayMap(array, iteratee) {
    var index = -1, length = array == null ? 0 : array.length, result = Array(length);
    while (++index < length) {
        result[index] = iteratee(array[index], index, array);
    }
    return result;
}

function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
}

function eq(value, other) {
    return value === other || value !== value && other !== other;
}

function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
        if (eq(array[length][0], key)) {
            return length;
        }
    }
    return -1;
}

var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
        return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
        data.pop();
    } else {
        splice.call(data, index, 1);
    }
    --this.size;
    return true;
}

function listCacheGet(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return index < 0 ? undefined : data[index][1];
}

function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
}

function listCacheSet(key, value) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
        ++this.size;
        data.push([key,value]);
    } else {
        data[index][1] = value;
    }
    return this;
}

function ListCache(entries) {
    var this$1 = this;

    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
        var entry = entries[index];
        this$1.set(entry[0], entry[1]);
    }
}

ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

function stackClear() {
    this.__data__ = new ListCache();
    this.size = 0;
}

function stackDelete(key) {
    var data = this.__data__, result = data['delete'](key);
    this.size = data.size;
    return result;
}

function stackGet(key) {
    return this.__data__.get(key);
}

function stackHas(key) {
    return this.__data__.has(key);
}

var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
var root = freeGlobal || freeSelf || Function('return this')();

var Symbol$1 = root.Symbol;

var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
var nativeObjectToString = objectProto$1.toString;
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;
function getRawTag(value) {
    var isOwn = hasOwnProperty$1.call(value, symToStringTag$1), tag = value[symToStringTag$1];
    try {
        value[symToStringTag$1] = undefined;
        var unmasked = true;
    } catch (e) {}
    var result = nativeObjectToString.call(value);
    if (unmasked) {
        if (isOwn) {
            value[symToStringTag$1] = tag;
        } else {
            delete value[symToStringTag$1];
        }
    }
    return result;
}

var objectProto$2 = Object.prototype;
var nativeObjectToString$1 = objectProto$2.toString;
function objectToString(value) {
    return nativeObjectToString$1.call(value);
}

var nullTag = '[object Null]';
var undefinedTag = '[object Undefined]';
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;
function baseGetTag(value) {
    if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}

function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
}

var asyncTag = '[object AsyncFunction]';
var funcTag = '[object Function]';
var genTag = '[object GeneratorFunction]';
var proxyTag = '[object Proxy]';
function isFunction(value) {
    if (!isObject(value)) {
        return false;
    }
    var tag = baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

var coreJsData = root['__core-js_shared__'];

var maskSrcKey = (function () {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
    return uid ? 'Symbol(src)_1.' + uid : '';
})();
function isMasked(func) {
    return !(!maskSrcKey) && maskSrcKey in func;
}

var funcProto$1 = Function.prototype;
var funcToString$1 = funcProto$1.toString;
function toSource(func) {
    if (func != null) {
        try {
            return funcToString$1.call(func);
        } catch (e) {}
        try {
            return func + '';
        } catch (e) {}
    }
    return '';
}

var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto = Function.prototype;
var objectProto = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty = objectProto.hasOwnProperty;
var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
        return false;
    }
    var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
}

function getValue(object, key) {
    return object == null ? undefined : object[key];
}

function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
}

var Map = getNative(root, 'Map');

var nativeCreate = getNative(Object, 'create');

function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
    this.size = 0;
}

function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
}

var HASH_UNDEFINED = '__lodash_hash_undefined__';
var objectProto$3 = Object.prototype;
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
    }
    return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
}

var objectProto$4 = Object.prototype;
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? data[key] !== undefined : hasOwnProperty$3.call(data, key);
}

var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';
function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED$1 : value;
    return this;
}

function Hash(entries) {
    var this$1 = this;

    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
        var entry = entries[index];
        this$1.set(entry[0], entry[1]);
    }
}

Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
        'hash': new Hash(),
        'map': new (Map || ListCache)(),
        'string': new Hash()
    };
}

function isKeyable(value) {
    var type = typeof value;
    return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}

function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}

function mapCacheDelete(key) {
    var result = getMapData(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
}

function mapCacheGet(key) {
    return getMapData(this, key).get(key);
}

function mapCacheHas(key) {
    return getMapData(this, key).has(key);
}

function mapCacheSet(key, value) {
    var data = getMapData(this, key), size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
}

function MapCache(entries) {
    var this$1 = this;

    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
        var entry = entries[index];
        this$1.set(entry[0], entry[1]);
    }
}

MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
            pairs.push([key,value]);
            this.size = ++data.size;
            return this;
        }
        data = (this.__data__ = new MapCache(pairs));
    }
    data.set(key, value);
    this.size = data.size;
    return this;
}

function Stack(entries) {
    var data = this.__data__ = new ListCache(entries);
    this.size = data.size;
}

Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';
function setCacheAdd(value) {
    this.__data__.set(value, HASH_UNDEFINED$2);
    return this;
}

function setCacheHas(value) {
    return this.__data__.has(value);
}

function SetCache(values) {
    var this$1 = this;

    var index = -1, length = values == null ? 0 : values.length;
    this.__data__ = new MapCache();
    while (++index < length) {
        this$1.add(values[index]);
    }
}

SetCache.prototype.add = (SetCache.prototype.push = setCacheAdd);
SetCache.prototype.has = setCacheHas;

function arraySome(array, predicate) {
    var index = -1, length = array == null ? 0 : array.length;
    while (++index < length) {
        if (predicate(array[index], index, array)) {
            return true;
        }
    }
    return false;
}

function cacheHas(cache, key) {
    return cache.has(key);
}

var COMPARE_PARTIAL_FLAG$2 = 1;
var COMPARE_UNORDERED_FLAG$1 = 2;
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2, arrLength = array.length, othLength = other.length;
    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
    }
    var stacked = stack.get(array);
    if (stacked && stack.get(other)) {
        return stacked == other;
    }
    var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG$1 ? new SetCache() : undefined;
    stack.set(array, other);
    stack.set(other, array);
    while (++index < arrLength) {
        var arrValue = array[index], othValue = other[index];
        if (customizer) {
            var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
        }
        if (compared !== undefined) {
            if (compared) {
                continue;
            }
            result = false;
            break;
        }
        if (seen) {
            if (!arraySome(other, function (othValue, othIndex) {
                if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                    return seen.push(othIndex);
                }
            })) {
                result = false;
                break;
            }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
            result = false;
            break;
        }
    }
    stack['delete'](array);
    stack['delete'](other);
    return result;
}

var Uint8Array = root.Uint8Array;

function mapToArray(map) {
    var index = -1, result = Array(map.size);
    map.forEach(function (value, key) {
        result[++index] = [key,value];
    });
    return result;
}

function setToArray(set) {
    var index = -1, result = Array(set.size);
    set.forEach(function (value) {
        result[++index] = value;
    });
    return result;
}

var COMPARE_PARTIAL_FLAG$3 = 1;
var COMPARE_UNORDERED_FLAG$2 = 2;
var boolTag = '[object Boolean]';
var dateTag = '[object Date]';
var errorTag = '[object Error]';
var mapTag = '[object Map]';
var numberTag = '[object Number]';
var regexpTag = '[object RegExp]';
var setTag = '[object Set]';
var stringTag = '[object String]';
var symbolTag = '[object Symbol]';
var arrayBufferTag = '[object ArrayBuffer]';
var dataViewTag = '[object DataView]';
var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined;
var symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {
        case dataViewTag:
            if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
                return false;
            }
            object = object.buffer;
            other = other.buffer;
        case arrayBufferTag:
            if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
                return false;
            }
            return true;
        case boolTag:
        case dateTag:
        case numberTag:
            return eq(+object, +other);
        case errorTag:
            return object.name == other.name && object.message == other.message;
        case regexpTag:
        case stringTag:
            return object == other + '';
        case mapTag:
            var convert = mapToArray;
        case setTag:
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3;
            convert || (convert = setToArray);
            if (object.size != other.size && !isPartial) {
                return false;
            }
            var stacked = stack.get(object);
            if (stacked) {
                return stacked == other;
            }
            bitmask |= COMPARE_UNORDERED_FLAG$2;
            stack.set(object, other);
            var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
            stack['delete'](object);
            return result;
        case symbolTag:
            if (symbolValueOf) {
                return symbolValueOf.call(object) == symbolValueOf.call(other);
            }
    }
    return false;
}

function arrayPush(array, values) {
    var index = -1, length = values.length, offset = array.length;
    while (++index < length) {
        array[offset + index] = values[index];
    }
    return array;
}

var isArray = Array.isArray;

function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

function arrayFilter(array, predicate) {
    var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
    while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
            result[resIndex++] = value;
        }
    }
    return result;
}

function stubArray() {
    return [];
}

var objectProto$7 = Object.prototype;
var propertyIsEnumerable = objectProto$7.propertyIsEnumerable;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols ? stubArray : function (object) {
    if (object == null) {
        return [];
    }
    object = Object(object);
    return arrayFilter(nativeGetSymbols(object), function (symbol) {
        return propertyIsEnumerable.call(object, symbol);
    });
};

function baseTimes(n, iteratee) {
    var index = -1, result = Array(n);
    while (++index < n) {
        result[index] = iteratee(index);
    }
    return result;
}

function isObjectLike(value) {
    return value != null && typeof value == 'object';
}

var argsTag$1 = '[object Arguments]';
function baseIsArguments(value) {
    return isObjectLike(value) && baseGetTag(value) == argsTag$1;
}

var objectProto$9 = Object.prototype;
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;
var propertyIsEnumerable$1 = objectProto$9.propertyIsEnumerable;
var isArguments = baseIsArguments((function () {
    return arguments;
})()) ? baseIsArguments : function (value) {
    return isObjectLike(value) && hasOwnProperty$7.call(value, 'callee') && !propertyIsEnumerable$1.call(value, 'callee');
};

function stubFalse() {
    return false;
}

var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer = moduleExports ? root.Buffer : undefined;
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
var isBuffer = nativeIsBuffer || stubFalse;

var MAX_SAFE_INTEGER = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !(!length) && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}

var MAX_SAFE_INTEGER$1 = 9007199254740991;
function isLength(value) {
    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
}

var argsTag$2 = '[object Arguments]';
var arrayTag$1 = '[object Array]';
var boolTag$1 = '[object Boolean]';
var dateTag$1 = '[object Date]';
var errorTag$1 = '[object Error]';
var funcTag$1 = '[object Function]';
var mapTag$1 = '[object Map]';
var numberTag$1 = '[object Number]';
var objectTag$1 = '[object Object]';
var regexpTag$1 = '[object RegExp]';
var setTag$1 = '[object Set]';
var stringTag$1 = '[object String]';
var weakMapTag = '[object WeakMap]';
var arrayBufferTag$1 = '[object ArrayBuffer]';
var dataViewTag$1 = '[object DataView]';
var float32Tag = '[object Float32Array]';
var float64Tag = '[object Float64Array]';
var int8Tag = '[object Int8Array]';
var int16Tag = '[object Int16Array]';
var int32Tag = '[object Int32Array]';
var uint8Tag = '[object Uint8Array]';
var uint8ClampedTag = '[object Uint8ClampedArray]';
var uint16Tag = '[object Uint16Array]';
var uint32Tag = '[object Uint32Array]';
var typedArrayTags = {};
typedArrayTags[float32Tag] = (typedArrayTags[float64Tag] = (typedArrayTags[int8Tag] = (typedArrayTags[int16Tag] = (typedArrayTags[int32Tag] = (typedArrayTags[uint8Tag] = (typedArrayTags[uint8ClampedTag] = (typedArrayTags[uint16Tag] = (typedArrayTags[uint32Tag] = true))))))));
typedArrayTags[argsTag$2] = (typedArrayTags[arrayTag$1] = (typedArrayTags[arrayBufferTag$1] = (typedArrayTags[boolTag$1] = (typedArrayTags[dataViewTag$1] = (typedArrayTags[dateTag$1] = (typedArrayTags[errorTag$1] = (typedArrayTags[funcTag$1] = (typedArrayTags[mapTag$1] = (typedArrayTags[numberTag$1] = (typedArrayTags[objectTag$1] = (typedArrayTags[regexpTag$1] = (typedArrayTags[setTag$1] = (typedArrayTags[stringTag$1] = (typedArrayTags[weakMapTag] = false))))))))))))));
function baseIsTypedArray(value) {
    return isObjectLike(value) && isLength(value.length) && !(!typedArrayTags[baseGetTag(value)]);
}

function baseUnary(func) {
    return function (value) {
        return func(value);
    };
}

var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;
var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
var freeProcess = moduleExports$1 && freeGlobal.process;
var nodeUtil = (function () {
    try {
        var types = freeModule$1 && freeModule$1.require && freeModule$1.require('util').types;
        if (types) {
            return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
})();

var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

var objectProto$8 = Object.prototype;
var hasOwnProperty$6 = objectProto$8.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
    var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
    for (var key in value) {
        if ((inherited || hasOwnProperty$6.call(value, key)) && !(skipIndexes && (key == 'length' || isBuff && (key == 'offset' || key == 'parent') || isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') || isIndex(key, length)))) {
            result.push(key);
        }
    }
    return result;
}

var objectProto$11 = Object.prototype;
function isPrototype(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == 'function' && Ctor.prototype || objectProto$11;
    return value === proto;
}

function overArg(func, transform) {
    return function (arg) {
        return func(transform(arg));
    };
}

var nativeKeys = overArg(Object.keys, Object);

var objectProto$10 = Object.prototype;
var hasOwnProperty$8 = objectProto$10.hasOwnProperty;
function baseKeys(object) {
    if (!isPrototype(object)) {
        return nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
        if (hasOwnProperty$8.call(object, key) && key != 'constructor') {
            result.push(key);
        }
    }
    return result;
}

function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
}

function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

function getAllKeys(object) {
    return baseGetAllKeys(object, keys, getSymbols);
}

var COMPARE_PARTIAL_FLAG$4 = 1;
var objectProto$6 = Object.prototype;
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG$4, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
    if (objLength != othLength && !isPartial) {
        return false;
    }
    var index = objLength;
    while (index--) {
        var key = objProps[index];
        if (!(isPartial ? key in other : hasOwnProperty$5.call(other, key))) {
            return false;
        }
    }
    var stacked = stack.get(object);
    if (stacked && stack.get(other)) {
        return stacked == other;
    }
    var result = true;
    stack.set(object, other);
    stack.set(other, object);
    var skipCtor = isPartial;
    while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key], othValue = other[key];
        if (customizer) {
            var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
        }
        if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
            result = false;
            break;
        }
        skipCtor || (skipCtor = key == 'constructor');
    }
    if (result && !skipCtor) {
        var objCtor = object.constructor, othCtor = other.constructor;
        if (objCtor != othCtor && ('constructor' in object && 'constructor' in other) && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
            result = false;
        }
    }
    stack['delete'](object);
    stack['delete'](other);
    return result;
}

var DataView = getNative(root, 'DataView');

var Promise$1 = getNative(root, 'Promise');

var Set = getNative(root, 'Set');

var WeakMap = getNative(root, 'WeakMap');

var mapTag$2 = '[object Map]';
var objectTag$2 = '[object Object]';
var promiseTag = '[object Promise]';
var setTag$2 = '[object Set]';
var weakMapTag$1 = '[object WeakMap]';
var dataViewTag$2 = '[object DataView]';
var dataViewCtorString = toSource(DataView);
var mapCtorString = toSource(Map);
var promiseCtorString = toSource(Promise$1);
var setCtorString = toSource(Set);
var weakMapCtorString = toSource(WeakMap);
var getTag = baseGetTag;
if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag$2 || Map && getTag(new Map()) != mapTag$2 || Promise$1 && getTag(Promise$1.resolve()) != promiseTag || Set && getTag(new Set()) != setTag$2 || WeakMap && getTag(new WeakMap()) != weakMapTag$1) {
    getTag = function (value) {
        var result = baseGetTag(value), Ctor = result == objectTag$2 ? value.constructor : undefined, ctorString = Ctor ? toSource(Ctor) : '';
        if (ctorString) {
            switch (ctorString) {
                case dataViewCtorString:
                    return dataViewTag$2;
                case mapCtorString:
                    return mapTag$2;
                case promiseCtorString:
                    return promiseTag;
                case setCtorString:
                    return setTag$2;
                case weakMapCtorString:
                    return weakMapTag$1;
            }
        }
        return result;
    };
}
var getTag$1 = getTag;

var COMPARE_PARTIAL_FLAG$1 = 1;
var argsTag = '[object Arguments]';
var arrayTag = '[object Array]';
var objectTag = '[object Object]';
var objectProto$5 = Object.prototype;
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag$1(object), othTag = othIsArr ? arrayTag : getTag$1(other);
    objTag = objTag == argsTag ? objectTag : objTag;
    othTag = othTag == argsTag ? objectTag : othTag;
    var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
    if (isSameTag && isBuffer(object)) {
        if (!isBuffer(other)) {
            return false;
        }
        objIsArr = true;
        objIsObj = false;
    }
    if (isSameTag && !objIsObj) {
        stack || (stack = new Stack());
        return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
    }
    if (!(bitmask & COMPARE_PARTIAL_FLAG$1)) {
        var objIsWrapped = objIsObj && hasOwnProperty$4.call(object, '__wrapped__'), othIsWrapped = othIsObj && hasOwnProperty$4.call(other, '__wrapped__');
        if (objIsWrapped || othIsWrapped) {
            var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
            stack || (stack = new Stack());
            return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
    }
    if (!isSameTag) {
        return false;
    }
    stack || (stack = new Stack());
    return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

function baseIsEqual(value, other, bitmask, customizer, stack) {
    if (value === other) {
        return true;
    }
    if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
        return value !== value && other !== other;
    }
    return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

var COMPARE_PARTIAL_FLAG = 1;
var COMPARE_UNORDERED_FLAG = 2;
function baseIsMatch(object, source, matchData, customizer) {
    var index = matchData.length, length = index, noCustomizer = !customizer;
    if (object == null) {
        return !length;
    }
    object = Object(object);
    while (index--) {
        var data = matchData[index];
        if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
            return false;
        }
    }
    while (++index < length) {
        data = matchData[index];
        var key = data[0], objValue = object[key], srcValue = data[1];
        if (noCustomizer && data[2]) {
            if (objValue === undefined && !(key in object)) {
                return false;
            }
        } else {
            var stack = new Stack();
            if (customizer) {
                var result = customizer(objValue, srcValue, key, object, source, stack);
            }
            if (!(result === undefined ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result)) {
                return false;
            }
        }
    }
    return true;
}

function isStrictComparable(value) {
    return value === value && !isObject(value);
}

function getMatchData(object) {
    var result = keys(object), length = result.length;
    while (length--) {
        var key = result[length], value = object[key];
        result[length] = [key,value,isStrictComparable(value)];
    }
    return result;
}

function matchesStrictComparable(key, srcValue) {
    return function (object) {
        if (object == null) {
            return false;
        }
        return object[key] === srcValue && (srcValue !== undefined || key in Object(object));
    };
}

function baseMatches(source) {
    var matchData = getMatchData(source);
    if (matchData.length == 1 && matchData[0][2]) {
        return matchesStrictComparable(matchData[0][0], matchData[0][1]);
    }
    return function (object) {
        return object === source || baseIsMatch(object, source, matchData);
    };
}

var symbolTag$1 = '[object Symbol]';
function isSymbol(value) {
    return typeof value == 'symbol' || isObjectLike(value) && baseGetTag(value) == symbolTag$1;
}

var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var reIsPlainProp = /^\w*$/;
function isKey(value, object) {
    if (isArray(value)) {
        return false;
    }
    var type = typeof value;
    if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol(value)) {
        return true;
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}

var FUNC_ERROR_TEXT = 'Expected a function';
function memoize(func, resolver) {
    if (typeof func != 'function' || resolver != null && typeof resolver != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
    }
    var memoized = function () {
        var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
        if (cache.has(key)) {
            return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result) || cache;
        return result;
    };
    memoized.cache = new (memoize.Cache || MapCache)();
    return memoized;
}

memoize.Cache = MapCache;

var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped(func) {
    var result = memoize(func, function (key) {
        if (cache.size === MAX_MEMOIZE_SIZE) {
            cache.clear();
        }
        return key;
    });
    var cache = result.cache;
    return result;
}

var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = memoizeCapped(function (string) {
    var result = [];
    if (string.charCodeAt(0) === 46) {
        result.push('');
    }
    string.replace(rePropName, function (match, number, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, '$1') : number || match);
    });
    return result;
});

var INFINITY = 1 / 0;
var symbolProto$1 = Symbol$1 ? Symbol$1.prototype : undefined;
var symbolToString = symbolProto$1 ? symbolProto$1.toString : undefined;
function baseToString(value) {
    if (typeof value == 'string') {
        return value;
    }
    if (isArray(value)) {
        return arrayMap(value, baseToString) + '';
    }
    if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : '';
    }
    var result = value + '';
    return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

function toString(value) {
    return value == null ? '' : baseToString(value);
}

function castPath(value, object) {
    if (isArray(value)) {
        return value;
    }
    return isKey(value, object) ? [value] : stringToPath(toString(value));
}

var INFINITY$1 = 1 / 0;
function toKey(value) {
    if (typeof value == 'string' || isSymbol(value)) {
        return value;
    }
    var result = value + '';
    return result == '0' && 1 / value == -INFINITY$1 ? '-0' : result;
}

function baseGet(object, path) {
    path = castPath(path, object);
    var index = 0, length = path.length;
    while (object != null && index < length) {
        object = object[toKey(path[index++])];
    }
    return index && index == length ? object : undefined;
}

function get(object, path, defaultValue) {
    var result = object == null ? undefined : baseGet(object, path);
    return result === undefined ? defaultValue : result;
}

function baseHasIn(object, key) {
    return object != null && key in Object(object);
}

function hasPath(object, path, hasFunc) {
    path = castPath(path, object);
    var index = -1, length = path.length, result = false;
    while (++index < length) {
        var key = toKey(path[index]);
        if (!(result = object != null && hasFunc(object, key))) {
            break;
        }
        object = object[key];
    }
    if (result || ++index != length) {
        return result;
    }
    length = object == null ? 0 : object.length;
    return !(!length) && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
}

function hasIn(object, path) {
    return object != null && hasPath(object, path, baseHasIn);
}

var COMPARE_PARTIAL_FLAG$5 = 1;
var COMPARE_UNORDERED_FLAG$3 = 2;
function baseMatchesProperty(path, srcValue) {
    if (isKey(path) && isStrictComparable(srcValue)) {
        return matchesStrictComparable(toKey(path), srcValue);
    }
    return function (object) {
        var objValue = get(object, path);
        return objValue === undefined && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$5 | COMPARE_UNORDERED_FLAG$3);
    };
}

function identity(value) {
    return value;
}

function baseProperty(key) {
    return function (object) {
        return object == null ? undefined : object[key];
    };
}

function basePropertyDeep(path) {
    return function (object) {
        return baseGet(object, path);
    };
}

function property(path) {
    return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

function baseIteratee(value) {
    if (typeof value == 'function') {
        return value;
    }
    if (value == null) {
        return identity;
    }
    if (typeof value == 'object') {
        return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
    }
    return property(value);
}

function createBaseFor(fromRight) {
    return function (object, iteratee, keysFunc) {
        var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
        while (length--) {
            var key = props[fromRight ? length : ++index];
            if (iteratee(iterable[key], key, iterable) === false) {
                break;
            }
        }
        return object;
    };
}

var baseFor = createBaseFor();

function baseForOwn(object, iteratee) {
    return object && baseFor(object, iteratee, keys);
}

function createBaseEach(eachFunc, fromRight) {
    return function (collection, iteratee) {
        if (collection == null) {
            return collection;
        }
        if (!isArrayLike(collection)) {
            return eachFunc(collection, iteratee);
        }
        var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
        while (fromRight ? index-- : ++index < length) {
            if (iteratee(iterable[index], index, iterable) === false) {
                break;
            }
        }
        return collection;
    };
}

var baseEach = createBaseEach(baseForOwn);

function baseMap(collection, iteratee) {
    var index = -1, result = isArrayLike(collection) ? Array(collection.length) : [];
    baseEach(collection, function (value, key, collection) {
        result[++index] = iteratee(value, key, collection);
    });
    return result;
}

function map(collection, iteratee) {
    var func = isArray(collection) ? arrayMap : baseMap;
    return func(collection, baseIteratee(iteratee, 3));
}

function arrayReduce(array, iteratee, accumulator, initAccum) {
    var index = -1, length = array == null ? 0 : array.length;
    if (initAccum && length) {
        accumulator = array[++index];
    }
    while (++index < length) {
        accumulator = iteratee(accumulator, array[index], index, array);
    }
    return accumulator;
}

function basePropertyOf(object) {
    return function (key) {
        return object == null ? undefined : object[key];
    };
}

var deburredLetters = {
    '\xc0': 'A',
    '\xc1': 'A',
    '\xc2': 'A',
    '\xc3': 'A',
    '\xc4': 'A',
    '\xc5': 'A',
    '\xe0': 'a',
    '\xe1': 'a',
    '\xe2': 'a',
    '\xe3': 'a',
    '\xe4': 'a',
    '\xe5': 'a',
    '\xc7': 'C',
    '\xe7': 'c',
    '\xd0': 'D',
    '\xf0': 'd',
    '\xc8': 'E',
    '\xc9': 'E',
    '\xca': 'E',
    '\xcb': 'E',
    '\xe8': 'e',
    '\xe9': 'e',
    '\xea': 'e',
    '\xeb': 'e',
    '\xcc': 'I',
    '\xcd': 'I',
    '\xce': 'I',
    '\xcf': 'I',
    '\xec': 'i',
    '\xed': 'i',
    '\xee': 'i',
    '\xef': 'i',
    '\xd1': 'N',
    '\xf1': 'n',
    '\xd2': 'O',
    '\xd3': 'O',
    '\xd4': 'O',
    '\xd5': 'O',
    '\xd6': 'O',
    '\xd8': 'O',
    '\xf2': 'o',
    '\xf3': 'o',
    '\xf4': 'o',
    '\xf5': 'o',
    '\xf6': 'o',
    '\xf8': 'o',
    '\xd9': 'U',
    '\xda': 'U',
    '\xdb': 'U',
    '\xdc': 'U',
    '\xf9': 'u',
    '\xfa': 'u',
    '\xfb': 'u',
    '\xfc': 'u',
    '\xdd': 'Y',
    '\xfd': 'y',
    '\xff': 'y',
    '\xc6': 'Ae',
    '\xe6': 'ae',
    '\xde': 'Th',
    '\xfe': 'th',
    '\xdf': 'ss',
    '\u0100': 'A',
    '\u0102': 'A',
    '\u0104': 'A',
    '\u0101': 'a',
    '\u0103': 'a',
    '\u0105': 'a',
    '\u0106': 'C',
    '\u0108': 'C',
    '\u010a': 'C',
    '\u010c': 'C',
    '\u0107': 'c',
    '\u0109': 'c',
    '\u010b': 'c',
    '\u010d': 'c',
    '\u010e': 'D',
    '\u0110': 'D',
    '\u010f': 'd',
    '\u0111': 'd',
    '\u0112': 'E',
    '\u0114': 'E',
    '\u0116': 'E',
    '\u0118': 'E',
    '\u011a': 'E',
    '\u0113': 'e',
    '\u0115': 'e',
    '\u0117': 'e',
    '\u0119': 'e',
    '\u011b': 'e',
    '\u011c': 'G',
    '\u011e': 'G',
    '\u0120': 'G',
    '\u0122': 'G',
    '\u011d': 'g',
    '\u011f': 'g',
    '\u0121': 'g',
    '\u0123': 'g',
    '\u0124': 'H',
    '\u0126': 'H',
    '\u0125': 'h',
    '\u0127': 'h',
    '\u0128': 'I',
    '\u012a': 'I',
    '\u012c': 'I',
    '\u012e': 'I',
    '\u0130': 'I',
    '\u0129': 'i',
    '\u012b': 'i',
    '\u012d': 'i',
    '\u012f': 'i',
    '\u0131': 'i',
    '\u0134': 'J',
    '\u0135': 'j',
    '\u0136': 'K',
    '\u0137': 'k',
    '\u0138': 'k',
    '\u0139': 'L',
    '\u013b': 'L',
    '\u013d': 'L',
    '\u013f': 'L',
    '\u0141': 'L',
    '\u013a': 'l',
    '\u013c': 'l',
    '\u013e': 'l',
    '\u0140': 'l',
    '\u0142': 'l',
    '\u0143': 'N',
    '\u0145': 'N',
    '\u0147': 'N',
    '\u014a': 'N',
    '\u0144': 'n',
    '\u0146': 'n',
    '\u0148': 'n',
    '\u014b': 'n',
    '\u014c': 'O',
    '\u014e': 'O',
    '\u0150': 'O',
    '\u014d': 'o',
    '\u014f': 'o',
    '\u0151': 'o',
    '\u0154': 'R',
    '\u0156': 'R',
    '\u0158': 'R',
    '\u0155': 'r',
    '\u0157': 'r',
    '\u0159': 'r',
    '\u015a': 'S',
    '\u015c': 'S',
    '\u015e': 'S',
    '\u0160': 'S',
    '\u015b': 's',
    '\u015d': 's',
    '\u015f': 's',
    '\u0161': 's',
    '\u0162': 'T',
    '\u0164': 'T',
    '\u0166': 'T',
    '\u0163': 't',
    '\u0165': 't',
    '\u0167': 't',
    '\u0168': 'U',
    '\u016a': 'U',
    '\u016c': 'U',
    '\u016e': 'U',
    '\u0170': 'U',
    '\u0172': 'U',
    '\u0169': 'u',
    '\u016b': 'u',
    '\u016d': 'u',
    '\u016f': 'u',
    '\u0171': 'u',
    '\u0173': 'u',
    '\u0174': 'W',
    '\u0175': 'w',
    '\u0176': 'Y',
    '\u0177': 'y',
    '\u0178': 'Y',
    '\u0179': 'Z',
    '\u017b': 'Z',
    '\u017d': 'Z',
    '\u017a': 'z',
    '\u017c': 'z',
    '\u017e': 'z',
    '\u0132': 'IJ',
    '\u0133': 'ij',
    '\u0152': 'Oe',
    '\u0153': 'oe',
    '\u0149': "'n",
    '\u017f': 's'
};
var deburrLetter = basePropertyOf(deburredLetters);

var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
var rsComboMarksRange = '\\u0300-\\u036f';
var reComboHalfMarksRange = '\\ufe20-\\ufe2f';
var rsComboSymbolsRange = '\\u20d0-\\u20ff';
var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
var rsCombo = '[' + rsComboRange + ']';
var reComboMark = RegExp(rsCombo, 'g');
function deburr(string) {
    string = toString(string);
    return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
}

var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function asciiWords(string) {
    return string.match(reAsciiWord) || [];
}

var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function hasUnicodeWord(string) {
    return reHasUnicodeWord.test(string);
}

var rsAstralRange = '\\ud800-\\udfff';
var rsComboMarksRange$1 = '\\u0300-\\u036f';
var reComboHalfMarksRange$1 = '\\ufe20-\\ufe2f';
var rsComboSymbolsRange$1 = '\\u20d0-\\u20ff';
var rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1;
var rsDingbatRange = '\\u2700-\\u27bf';
var rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff';
var rsMathOpRange = '\\xac\\xb1\\xd7\\xf7';
var rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf';
var rsPunctuationRange = '\\u2000-\\u206f';
var rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000';
var rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde';
var rsVarRange = '\\ufe0e\\ufe0f';
var rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
var rsApos$1 = "['\u2019]";
var rsBreak = '[' + rsBreakRange + ']';
var rsCombo$1 = '[' + rsComboRange$1 + ']';
var rsDigits = '\\d+';
var rsDingbat = '[' + rsDingbatRange + ']';
var rsLower = '[' + rsLowerRange + ']';
var rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']';
var rsFitz = '\\ud83c[\\udffb-\\udfff]';
var rsModifier = '(?:' + rsCombo$1 + '|' + rsFitz + ')';
var rsNonAstral = '[^' + rsAstralRange + ']';
var rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}';
var rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]';
var rsUpper = '[' + rsUpperRange + ']';
var rsZWJ = '\\u200d';
var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')';
var rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')';
var rsOptContrLower = '(?:' + rsApos$1 + '(?:d|ll|m|re|s|t|ve))?';
var rsOptContrUpper = '(?:' + rsApos$1 + '(?:D|LL|M|RE|S|T|VE))?';
var reOptMod = rsModifier + '?';
var rsOptVar = '[' + rsVarRange + ']?';
var rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral,
    rsRegional,rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*';
var rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])';
var rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])';
var rsSeq = rsOptVar + reOptMod + rsOptJoin;
var rsEmoji = '(?:' + [rsDingbat,
    rsRegional,rsSurrPair].join('|') + ')' + rsSeq;
var reUnicodeWord = RegExp([rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak,
    rsUpper,'$'].join('|') + ')',rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak,
    rsUpper + rsMiscLower,'$'].join('|') + ')',rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
    rsUpper + '+' + rsOptContrUpper,rsOrdUpper,rsOrdLower,rsDigits,rsEmoji].join('|'), 'g');
function unicodeWords(string) {
    return string.match(reUnicodeWord) || [];
}

function words(string, pattern, guard) {
    string = toString(string);
    pattern = guard ? undefined : pattern;
    if (pattern === undefined) {
        return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
    }
    return string.match(pattern) || [];
}

var rsApos = "['\u2019]";
var reApos = RegExp(rsApos, 'g');
function createCompounder(callback) {
    return function (string) {
        return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
    };
}

var kebabCase = createCompounder(function (result, word, index) {
    return result + (index ? '-' : '') + word.toLowerCase();
});

function baseSlice(array, start, end) {
    var index = -1, length = array.length;
    if (start < 0) {
        start = -start > length ? 0 : length + start;
    }
    end = end > length ? length : end;
    if (end < 0) {
        end += length;
    }
    length = start > end ? 0 : end - start >>> 0;
    start >>>= 0;
    var result = Array(length);
    while (++index < length) {
        result[index] = array[index + start];
    }
    return result;
}

function castSlice(array, start, end) {
    var length = array.length;
    end = end === undefined ? length : end;
    return !start && end >= length ? array : baseSlice(array, start, end);
}

var rsAstralRange$1 = '\\ud800-\\udfff';
var rsComboMarksRange$2 = '\\u0300-\\u036f';
var reComboHalfMarksRange$2 = '\\ufe20-\\ufe2f';
var rsComboSymbolsRange$2 = '\\u20d0-\\u20ff';
var rsComboRange$2 = rsComboMarksRange$2 + reComboHalfMarksRange$2 + rsComboSymbolsRange$2;
var rsVarRange$1 = '\\ufe0e\\ufe0f';
var rsZWJ$1 = '\\u200d';
var reHasUnicode = RegExp('[' + rsZWJ$1 + rsAstralRange$1 + rsComboRange$2 + rsVarRange$1 + ']');
function hasUnicode(string) {
    return reHasUnicode.test(string);
}

function asciiToArray(string) {
    return string.split('');
}

var rsAstralRange$2 = '\\ud800-\\udfff';
var rsComboMarksRange$3 = '\\u0300-\\u036f';
var reComboHalfMarksRange$3 = '\\ufe20-\\ufe2f';
var rsComboSymbolsRange$3 = '\\u20d0-\\u20ff';
var rsComboRange$3 = rsComboMarksRange$3 + reComboHalfMarksRange$3 + rsComboSymbolsRange$3;
var rsVarRange$2 = '\\ufe0e\\ufe0f';
var rsAstral = '[' + rsAstralRange$2 + ']';
var rsCombo$2 = '[' + rsComboRange$3 + ']';
var rsFitz$1 = '\\ud83c[\\udffb-\\udfff]';
var rsModifier$1 = '(?:' + rsCombo$2 + '|' + rsFitz$1 + ')';
var rsNonAstral$1 = '[^' + rsAstralRange$2 + ']';
var rsRegional$1 = '(?:\\ud83c[\\udde6-\\uddff]){2}';
var rsSurrPair$1 = '[\\ud800-\\udbff][\\udc00-\\udfff]';
var rsZWJ$2 = '\\u200d';
var reOptMod$1 = rsModifier$1 + '?';
var rsOptVar$1 = '[' + rsVarRange$2 + ']?';
var rsOptJoin$1 = '(?:' + rsZWJ$2 + '(?:' + [rsNonAstral$1,
    rsRegional$1,rsSurrPair$1].join('|') + ')' + rsOptVar$1 + reOptMod$1 + ')*';
var rsSeq$1 = rsOptVar$1 + reOptMod$1 + rsOptJoin$1;
var rsSymbol = '(?:' + [rsNonAstral$1 + rsCombo$2 + '?',
    rsCombo$2,rsRegional$1,rsSurrPair$1,rsAstral].join('|') + ')';
var reUnicode = RegExp(rsFitz$1 + '(?=' + rsFitz$1 + ')|' + rsSymbol + rsSeq$1, 'g');
function unicodeToArray(string) {
    return string.match(reUnicode) || [];
}

function stringToArray(string) {
    return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
}

function createCaseFirst(methodName) {
    return function (string) {
        string = toString(string);
        var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined;
        var chr = strSymbols ? strSymbols[0] : string.charAt(0);
        var trailing = strSymbols ? castSlice(strSymbols, 1).join('') : string.slice(1);
        return chr[methodName]() + trailing;
    };
}

var upperFirst = createCaseFirst('toUpperCase');

function capitalize(string) {
    return upperFirst(toString(string).toLowerCase());
}

var camelCase = createCompounder(function (result, word, index) {
    word = word.toLowerCase();
    return result + (index ? capitalize(word) : word);
});

var objectCreate = Object.create;
var baseCreate = (function () {
    function object() {}
    
    return function (proto) {
        if (!isObject(proto)) {
            return {};
        }
        if (objectCreate) {
            return objectCreate(proto);
        }
        object.prototype = proto;
        var result = new object();
        object.prototype = undefined;
        return result;
    };
})();

function baseLodash() {}

function LodashWrapper(value, chainAll) {
    this.__wrapped__ = value;
    this.__actions__ = [];
    this.__chain__ = !(!chainAll);
    this.__index__ = 0;
    this.__values__ = undefined;
}

LodashWrapper.prototype = baseCreate(baseLodash.prototype);
LodashWrapper.prototype.constructor = LodashWrapper;

var spreadableSymbol = Symbol$1 ? Symbol$1.isConcatSpreadable : undefined;
function isFlattenable(value) {
    return isArray(value) || isArguments(value) || !(!(spreadableSymbol && value && value[spreadableSymbol]));
}

function baseFlatten(array, depth, predicate, isStrict, result) {
    var index = -1, length = array.length;
    predicate || (predicate = isFlattenable);
    result || (result = []);
    while (++index < length) {
        var value = array[index];
        if (depth > 0 && predicate(value)) {
            if (depth > 1) {
                baseFlatten(value, depth - 1, predicate, isStrict, result);
            } else {
                arrayPush(result, value);
            }
        } else if (!isStrict) {
            result[result.length] = value;
        }
    }
    return result;
}

function flatten(array) {
    var length = array == null ? 0 : array.length;
    return length ? baseFlatten(array, 1) : [];
}

function apply(func, thisArg, args) {
    switch (args.length) {
        case 0:
            return func.call(thisArg);
        case 1:
            return func.call(thisArg, args[0]);
        case 2:
            return func.call(thisArg, args[0], args[1]);
        case 3:
            return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
}

var nativeMax = Math.max;
function overRest(func, start, transform) {
    start = nativeMax(start === undefined ? func.length - 1 : start, 0);
    return function () {
        var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
        while (++index < length) {
            array[index] = args[start + index];
        }
        index = -1;
        var otherArgs = Array(start + 1);
        while (++index < start) {
            otherArgs[index] = args[index];
        }
        otherArgs[start] = transform(array);
        return apply(func, this, otherArgs);
    };
}

function constant(value) {
    return function () {
        return value;
    };
}

var defineProperty = (function () {
    try {
        var func = getNative(Object, 'defineProperty');
        func({}, '', {});
        return func;
    } catch (e) {}
})();

var baseSetToString = !defineProperty ? identity : function (func, string) {
    return defineProperty(func, 'toString', {
        'configurable': true,
        'enumerable': false,
        'value': constant(string),
        'writable': true
    });
};

var HOT_COUNT = 800;
var HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut(func) {
    var count = 0, lastCalled = 0;
    return function () {
        var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
        lastCalled = stamp;
        if (remaining > 0) {
            if (++count >= HOT_COUNT) {
                return arguments[0];
            }
        } else {
            count = 0;
        }
        return func.apply(undefined, arguments);
    };
}

var setToString = shortOut(baseSetToString);

function flatRest(func) {
    return setToString(overRest(func, undefined, flatten), func + '');
}

var metaMap = WeakMap && new WeakMap();

function noop() {}

var getData = !metaMap ? noop : function (func) {
    return metaMap.get(func);
};

var realNames = {};

var objectProto$12 = Object.prototype;
var hasOwnProperty$9 = objectProto$12.hasOwnProperty;
function getFuncName(func) {
    var result = func.name + '', array = realNames[result], length = hasOwnProperty$9.call(realNames, result) ? array.length : 0;
    while (length--) {
        var data = array[length], otherFunc = data.func;
        if (otherFunc == null || otherFunc == func) {
            return data.name;
        }
    }
    return result;
}

var MAX_ARRAY_LENGTH = 4294967295;
function LazyWrapper(value) {
    this.__wrapped__ = value;
    this.__actions__ = [];
    this.__dir__ = 1;
    this.__filtered__ = false;
    this.__iteratees__ = [];
    this.__takeCount__ = MAX_ARRAY_LENGTH;
    this.__views__ = [];
}

LazyWrapper.prototype = baseCreate(baseLodash.prototype);
LazyWrapper.prototype.constructor = LazyWrapper;

function copyArray(source, array) {
    var index = -1, length = source.length;
    array || (array = Array(length));
    while (++index < length) {
        array[index] = source[index];
    }
    return array;
}

function wrapperClone(wrapper) {
    if (wrapper instanceof LazyWrapper) {
        return wrapper.clone();
    }
    var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
    result.__actions__ = copyArray(wrapper.__actions__);
    result.__index__ = wrapper.__index__;
    result.__values__ = wrapper.__values__;
    return result;
}

var objectProto$13 = Object.prototype;
var hasOwnProperty$10 = objectProto$13.hasOwnProperty;
function lodash(value) {
    if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
        if (value instanceof LodashWrapper) {
            return value;
        }
        if (hasOwnProperty$10.call(value, '__wrapped__')) {
            return wrapperClone(value);
        }
    }
    return new LodashWrapper(value);
}

lodash.prototype = baseLodash.prototype;
lodash.prototype.constructor = lodash;

function isLaziable(func) {
    var funcName = getFuncName(func), other = lodash[funcName];
    if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
        return false;
    }
    if (func === other) {
        return true;
    }
    var data = getData(other);
    return !(!data) && func === data[0];
}

var FUNC_ERROR_TEXT$1 = 'Expected a function';
var WRAP_CURRY_FLAG = 8;
var WRAP_PARTIAL_FLAG = 32;
var WRAP_ARY_FLAG = 128;
var WRAP_REARG_FLAG = 256;
function createFlow(fromRight) {
    return flatRest(function (funcs) {
        var length = funcs.length, index = length, prereq = LodashWrapper.prototype.thru;
        if (fromRight) {
            funcs.reverse();
        }
        while (index--) {
            var func = funcs[index];
            if (typeof func != 'function') {
                throw new TypeError(FUNC_ERROR_TEXT$1);
            }
            if (prereq && !wrapper && getFuncName(func) == 'wrapper') {
                var wrapper = new LodashWrapper([], true);
            }
        }
        index = wrapper ? index : length;
        while (++index < length) {
            func = funcs[index];
            var funcName = getFuncName(func), data = funcName == 'wrapper' ? getData(func) : undefined;
            if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
                wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
            } else {
                wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
            }
        }
        return function () {
            var this$1 = this;

            var args = arguments, value = args[0];
            if (wrapper && args.length == 1 && isArray(value)) {
                return wrapper.plant(value).value();
            }
            var index = 0, result = length ? funcs[index].apply(this, args) : value;
            while (++index < length) {
                result = funcs[index].call(this$1, result);
            }
            return result;
        };
    });
}

var flowRight = createFlow(true);

var pascalCase = flowRight(upperFirst, camelCase);
function toJSON(obj) {
    if (typeof obj === 'function') {
        var str = inspectf(2, obj);
        if (/^function /.test(str) === false) {
            str = 'function ' + str;
        }
        return str;
    }
    if (obj && typeof obj === 'object') {
        var arr = Object.keys(obj).map(function (key) { return ("\"" + key + "\": " + (toJSON(obj[key]))); });
        return ("{" + (arr.join(',')) + "}");
    }
    return JSON.stringify(obj);
}

var doc2js = function (ref) {
    var componentName = ref.componentName;
    var script = ref.script;
    var style = ref.style;

    componentName = kebabCase(componentName);
    var injectCSS = style && ("\n  var insert = function (css) {\n    if (typeof window === 'undefined' || typeof document === 'undefined') return;\n    var elem = document.createElement('style')\n    elem.setAttribute('type', 'text/css')\n    elem.innerHTML = decodeURIComponent(css)\n\n    var head = document.getElementsByTagName('head')[0]\n    head.appendChild(elem)\n    return function () {\n      head.removeChild(elem)\n    }\n  }\n  exports.created = function () {\n    var css = '" + style + "'\n    this.__clean = insert(css)\n  }\n  exports.destroyed = function () {\n    this.__clean()\n  }\n");
    return ("/* eslint-disable */\nvar moduleExports = (function (module) {\n  'use strict';\n" + script + "\n  var exports = module.exports\n  exports.name = \"" + componentName + "\"\n" + (injectCSS || '') + "\n  module.exports.install = function (Vue) {\n    Vue.component(exports.name, exports)\n  }\n  return module.exports;\n})({});\ntypeof exports === 'object' && typeof module !== 'undefined' && (module.exports = moduleExports);\ntypeof window !== void 0 && window.Vue && Vue.use(moduleExports);\nthis[\"" + (pascalCase(componentName)) + "\"] = moduleExports;\n");
};

var doc2sfc = function (arg) {
    var html = arg.html;
    var style = arg.style;
    var script = arg.script;
    var components = arg.components;
    var docInfo = arg.docInfo; if ( docInfo === void 0 ) docInfo = {};
    var stylePart = style ? ("\n<style>\n" + style + "\n</style>") : '';
    return ("\n<template>\n  <article class=\"markdown-body\">\n" + html + "\n  </article >\n</template>\n\n<script lang=\"buble\">\n" + script + "\nmodule.exports = " + (toJSON(docInfo)) + ";\nmodule.exports.components = {\n" + (indent(components, 2)) + "\n}\n</script>\n" + stylePart + "\n");
};

var reStyle = /<style>([\s\S]+)<\/style>/;
var reScript = /<script>([\s\S]+)<\/script>/;
var reTemplate = /<template(|\s*[^>]+)>([\s\S]+)<\/template>/;
var extractSFC = function (code) {
    var styleMatch = reStyle.exec(code);
    var scriptMatch = reScript.exec(code);
    var templateMatch = reTemplate.exec(code);
    var style = styleMatch ? styleMatch[1].trim() : '';
    var script = scriptMatch ? scriptMatch[1].trim() : '';
    var template = templateMatch ? templateMatch[2].trim() : '';
    var templateAttr = templateMatch ? templateMatch[1].trim() : '';
    if (template === '') {
        template = code.replace(reStyle, '').replace(reScript, '');
    }
    if (script === '') {
        script = 'module.exports = {}';
    } else {
        script = script.replace(/export\s+default/, 'module.exports =');
    }
    return {
        style: style,
        script: script,
        template: template,
        demoOnly: templateAttr.indexOf('demo-only') > -1
    };
};

var Renderer = marked.Renderer;
var getRenderer = function () { return new Renderer(); };
Renderer.prototype.heading = function (text, l) {
    return ("<h" + l + ">" + text + "</h" + l + ">");
};
Renderer.prototype.link = function (href, title, text) {
    var relative = !/^(https?:)?\/\//.test(href);
    var out = "<a href=\"" + href + "\"";
    if (relative === false) {
        out += " target=\"_blank\"";
    }
    if (title) {
        out += " title=\"" + title + "\"";
    }
    out += ">" + text + "</a>";
    return out;
};

var highlightJs = function (code, lang) { return hljs.highlight(lang, code).value; };

var prism = function (code, lang) {
    if ( lang === void 0 ) lang = 'autoit';

    if (!Prism.languages[lang]) {
        try {
            require(("prismjs/components/prism-" + lang));
        } catch (e) {
            lang = 'autoit';
            require('prismjs/components/prism-autoit');
        }
    }
    return Prism.highlight(code, Prism.languages[lang]);
};
global.Prism = Prism;

var highlightMap = {
    prism: prism,
    'highlight.js': highlightJs
};
var renderer = getRenderer();
var FIX_VUE = /<span class="hljs-tag">&lt;\/</g;
var FIXTURE = '<span class="hljs-tag"><span>&lt;</span>/<';
var fix = function (code) { return code.replace(FIX_VUE, FIXTURE); };
var transform = function (source, config) {
    var id = 0;
    var demos = [];
    renderer.code = code;
    var markup = marked(source, {
        renderer: renderer
    });
    return {
        demos: demos,
        markup: markup
    };
    function code(raw, language) {
        var highlight = config.highlight;
        var fn = null;
        if (typeof highlight === 'function') {
            fn = highlight;
        } else if (highlightMap[highlight]) {
            fn = highlightMap[highlight];
        } else {
            throw new Error('Invalid highlight option!');
        }
        var lang = language === 'vue' ? 'html' : language;
        var markup = fn(raw, lang);
        if (lang !== 'html') {
            return wrapHljsCode(fix(markup), lang);
        }
        var tag = "md2vuedemo" + ((id++).toString(36));
        var ref = extractSFC(raw);
        var style = ref.style;
        var script = ref.script;
        var template = ref.template;
        var demoOnly = ref.demoOnly;
        var vue = "<template lang=\"html\">\n  <div class=\"vue-demo\">\n" + (indent(template)) + "\n  </div>\n</template>\n\n<script lang=\"buble\">\n" + script + "\n</script>";
        if (style !== '') {
            vue = "<style scoped>" + style + "</style>\n" + vue;
        }
        demos.push({
            tag: tag,
            raw: raw,
            vue: vue
        });
        var inject = config.inject;
        var injection = '';
        var sourceCode = '';
        if (!demoOnly) {
            if (typeof inject === 'function') {
                injection = inject();
            } else if (typeof inject === 'string') {
                injection = inject;
            }
            sourceCode = wrapHljsCode(fix(markup), lang);
        }
        var demoApp = "<" + tag + "></" + tag + ">";
        var klass = demoOnly ? 'vue-demo-block vue-demo-block-demo-only' : 'vue-demo-block';
        return ("\n<div class=\"" + klass + "\">\n" + demoApp + "\n" + injection + "\n" + sourceCode + "\n</div>\n");
    }
    
};
function wrapHljsCode(code, lang) {
    return ("<pre v-pre class=\"lang-" + lang + "\"><code>" + code + "</code></pre>");
}

var kEvent = 'style';
var StyleBundler = function StyleBundler() {
    this.CSSText = '';
    this.onStyleReceived = this.onStyleReceived.bind(this);
};
StyleBundler.prototype.onStyleReceived = function onStyleReceived (ref) {
        var style = ref.style;

    this.CSSText += '\n' + style;
};
StyleBundler.prototype.reset = function reset () {
    this.CSSText = '';
    if (this.source) {
        this.source.removeListener(kEvent, this.onStyleReceived);
    }
};
StyleBundler.prototype.setSource = function setSource (source) {
    this.reset();
    this.source = source;
    source.on(kEvent, this.onStyleReceived);
    return this;
};
StyleBundler.prototype.readOnce = function readOnce (fn) {
    var CSSText = this.CSSText.trim();
    if (typeof fn === 'function') {
        fn(CSSText);
    }
    this.reset();
    return CSSText;
};

StyleBundler.from = (function (source) { return new StyleBundler().setSource(source); });

compiler.applyConfig({
    extractCSS: true,
    customCompilers: {
        buble: function buble(content, cb) {
            var ref = require('buble').transform(content);
            var code = ref.code;
            var ret = code.replace(/\n{2,}/g, '\n').replace(/^\s+/, '  ').replace(/\s+$/, '');
            cb(null, ret);
        }
    }
});
var queue = [];
var currentTask = null;
compiler.compilePromise = (function (content, filePath) {
    if ( content === void 0 ) content = '';
    if ( filePath === void 0 ) filePath = '';

    var deferred = defer();
    var task = function () {
        var bundler = StyleBundler.from(compiler);
        currentTask = deferred.promise;
        compiler.compile(content, filePath, function (err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve({
                    script: result,
                    style: bundler.readOnce()
                });
            }
            process.nextTick(function () {
                currentTask = null;
                if (queue.length) {
                    queue.shift()();
                }
            });
        });
    };
    if (currentTask) {
        queue.push(task);
    } else {
        task();
    }
    return deferred.promise;
});
function defer() {
    var deferred = {};
    var promise = new Promise(function (resolve, reject) {
        deferred.resolve = resolve;
        deferred.reject = reject;
    });
    deferred.promise = promise;
    return deferred;
}

nodent();
var defaults = {
    target: 'vue',
    highlight: 'highlight.js'
};
var index = function (source, config) {
    if ( config === void 0 ) config = {};

    return (function ($return, $error) {
        var name, target, extend, markup, demos, demoApps, content, script, style;
        config.name = config.name || config.componentName;
        config.extend = config.extend || config.documentInfo;
        config.inject = config.inject || config.customMarkups;
        if (config.componentName) {
            console.warn('`componentName` is deprecated, use `name` instead.');
        }
        if (config.documentInfo) {
            console.warn('`documentInfo` is deprecated, use `extend` instead.');
        }
        if (config.customMarkups) {
            console.warn('`customMarkups` is deprecated, use `inject` instead.');
        }
        config = Object.assign({}, defaults, config);
        var assign;
        ((assign = config, name = assign.name, target = assign.target, extend = assign.extend));
        var assign$1;
        ((assign$1 = transform(source, config), markup = assign$1.markup, demos = assign$1.demos));
        demoApps = [];
        var $Loop_2_local;
        function $Loop_2_step() {
            var ref = $Loop_2_local();
            var demo = ref[0];
            var $iterator_demo_1 = ref[1];
            return $Loop_2.bind(this, demo, $iterator_demo_1);
        }
        
        function $Loop_2(demo, $iterator_demo_1) {
            $Loop_2_local = function () {
                return [demo,$iterator_demo_1];
            };
            if (!($iterator_demo_1[1] = $iterator_demo_1[0].next()).done && ((demo = $iterator_demo_1[1].value) || true)) {
                var vue, tag, script, style;
                var assign;
                ((assign = demo, vue = assign.vue, tag = assign.tag));
                return compileVue(vue, tag).then((function ($await_4) {
                    var assign;
                    ((assign = $await_4, script = assign.script, style = assign.style));
                    demoApps.push({
                        style: style,
                        script: wrapVueCompiled({
                            tagName: tag,
                            compiled: script
                        })
                    });
                    return $Loop_2_step;
                }).$asyncbind(this, $error), $error);
            } else 
                { return [1]; }
        }
        
        return Function.$asyncbind.trampoline(this, $Loop_2_exit, $Loop_2_step, $error, true)($Loop_2.bind(this, undefined, [demos[Symbol.iterator]()]));
        function $Loop_2_exit() {
            content = doc2sfc({
                docInfo: extend,
                html: markup,
                style: map(demoApps, 'style').join('\n'),
                script: map(demoApps, 'script').join('\n'),
                components: map(demos, function (ref) {
                    var tag = ref.tag;

                    return ("'" + tag + "': " + tag);
            }).join(',\n')
            });
            if (!target || target === 'vue') {
                return $return(content);
            }
            if (!name) {
                return $error(new Error('[Error] `name` must be specified!'));
            }
            return compileVue(content, name).then((function ($await_5) {
                var assign;
                ((assign = $await_5, script = assign.script, style = assign.style));
                return $return(doc2js({
                    script: script,
                    style: style,
                    name: name
                }));
            }).$asyncbind(this, $error), $error);
        }
        
    }).$asyncbind(this, true);
};

function compileVue(content, path) {
    return compiler.compilePromise(content, path);
}

function wrapVueCompiled(ref) {
    var tagName = ref.tagName;
    var compiled = ref.compiled;

    return ("var " + tagName + " = (function (module) {\n" + compiled + "\nreturn module.exports;\n})({});\n");
}

export default index;
