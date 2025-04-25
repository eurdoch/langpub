import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
import require$$1 from "async_hooks";
import require$$1$1 from "path";
import require$$1$3 from "events";
import require$$0$1 from "fs";
import require$$0$2 from "zlib";
import require$$0$3 from "crypto";
import require$$1$2 from "string_decoder";
import require$$4 from "timers";
import require$$6 from "url";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
  if (typeof f == "function") {
    var a = function a2() {
      if (this instanceof a2) {
        return Reflect.construct(f, arguments, this.constructor);
      }
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var epub2 = {};
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
    return f;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context2 = {};
    for (var p in contextIn) context2[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access) context2.access[p] = contextIn.access[p];
    context2.addInitializer = function(f) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context2);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_ = accept(result.get)) descriptor.get = _;
      if (_ = accept(result.set)) descriptor.set = _;
      if (_ = accept(result.init)) initializers.unshift(_);
    } else if (_ = accept(result)) {
      if (kind === "field") initializers.unshift(_);
      else descriptor[key] = _;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
}
function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
}
function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
}
function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return { value: op[1], done: false };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
var __createBinding = Object.create ? function(o, m, k, k2) {
  if (k2 === void 0) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = { enumerable: true, get: function() {
      return m[k];
    } };
  }
  Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
  if (k2 === void 0) k2 = k;
  o[k2] = m[k];
};
function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
    ar = ar.concat(__read(arguments[i]));
  return ar;
}
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
      r[k] = a[j];
  return r;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function awaitReturn(f) {
    return function(v) {
      return Promise.resolve(v).then(f, reject);
    };
  }
  function verb(n, f) {
    if (g[n]) {
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
      if (f) i[n] = f(i[n]);
    }
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle2(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle2(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle2(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}
function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function(e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function() {
    return this;
  }, i;
  function verb(n, f) {
    i[n] = o[n] ? function(v) {
      return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v;
    } : f;
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle2(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle2(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
var __setModuleDefault = Object.create ? function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
} : function(o, v) {
  o["default"] = v;
};
var ownKeys = function(o) {
  ownKeys = Object.getOwnPropertyNames || function(o2) {
    var ar = [];
    for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
    return ar;
  };
  return ownKeys(o);
};
function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) {
    for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
  }
  __setModuleDefault(result, mod);
  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : { default: mod };
}
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}
function __addDisposableResource(env, value, async2) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async2) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async2) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() {
      try {
        inner.call(this);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    env.stack.push({ value, dispose, async: async2 });
  } else if (async2) {
    env.stack.push({ async: true });
  }
  return value;
}
var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  var r, s = 0;
  function next() {
    while (r = env.stack.pop()) {
      try {
        if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
        if (r.dispose) {
          var result = r.dispose.call(r.value);
          if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
            fail(e);
            return next();
          });
        } else s |= 1;
      } catch (e) {
        fail(e);
      }
    }
    if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
    if (env.hasError) throw env.error;
  }
  return next();
}
function __rewriteRelativeImportExtension(path2, preserveJsx) {
  if (typeof path2 === "string" && /^\.\.?\//.test(path2)) {
    return path2.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(m, tsx, d, ext, cm) {
      return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : d + ext + "." + cm.toLowerCase() + "js";
    });
  }
  return path2;
}
const tslib_es6 = {
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __esDecorate,
  __runInitializers,
  __propKey,
  __setFunctionName,
  __metadata,
  __awaiter,
  __generator,
  __createBinding,
  __exportStar,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
  __addDisposableResource,
  __disposeResources,
  __rewriteRelativeImportExtension
};
const tslib_es6$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  __addDisposableResource,
  get __assign() {
    return __assign;
  },
  __asyncDelegator,
  __asyncGenerator,
  __asyncValues,
  __await,
  __awaiter,
  __classPrivateFieldGet,
  __classPrivateFieldIn,
  __classPrivateFieldSet,
  __createBinding,
  __decorate,
  __disposeResources,
  __esDecorate,
  __exportStar,
  __extends,
  __generator,
  __importDefault,
  __importStar,
  __makeTemplateObject,
  __metadata,
  __param,
  __propKey,
  __read,
  __rest,
  __rewriteRelativeImportExtension,
  __runInitializers,
  __setFunctionName,
  __spread,
  __spreadArray,
  __spreadArrays,
  __values,
  default: tslib_es6
}, Symbol.toStringTag, { value: "Module" }));
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(tslib_es6$1);
var promise = { exports: {} };
var es5 = { exports: {} };
var hasRequiredEs5;
function requireEs5() {
  if (hasRequiredEs5) return es5.exports;
  hasRequiredEs5 = 1;
  var isES5 = /* @__PURE__ */ function() {
    return this === void 0;
  }();
  if (isES5) {
    es5.exports = {
      freeze: Object.freeze,
      defineProperty: Object.defineProperty,
      getDescriptor: Object.getOwnPropertyDescriptor,
      keys: Object.keys,
      names: Object.getOwnPropertyNames,
      getPrototypeOf: Object.getPrototypeOf,
      isArray: Array.isArray,
      isES5,
      propertyIsWritable: function(obj, prop) {
        var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
        return !!(!descriptor || descriptor.writable || descriptor.set);
      }
    };
  } else {
    var has = {}.hasOwnProperty;
    var str = {}.toString;
    var proto = {}.constructor.prototype;
    var ObjectKeys = function(o) {
      var ret = [];
      for (var key in o) {
        if (has.call(o, key)) {
          ret.push(key);
        }
      }
      return ret;
    };
    var ObjectGetDescriptor = function(o, key) {
      return { value: o[key] };
    };
    var ObjectDefineProperty = function(o, key, desc) {
      o[key] = desc.value;
      return o;
    };
    var ObjectFreeze = function(obj) {
      return obj;
    };
    var ObjectGetPrototypeOf = function(obj) {
      try {
        return Object(obj).constructor.prototype;
      } catch (e) {
        return proto;
      }
    };
    var ArrayIsArray = function(obj) {
      try {
        return str.call(obj) === "[object Array]";
      } catch (e) {
        return false;
      }
    };
    es5.exports = {
      isArray: ArrayIsArray,
      keys: ObjectKeys,
      names: ObjectKeys,
      defineProperty: ObjectDefineProperty,
      getDescriptor: ObjectGetDescriptor,
      freeze: ObjectFreeze,
      getPrototypeOf: ObjectGetPrototypeOf,
      isES5,
      propertyIsWritable: function() {
        return true;
      }
    };
  }
  return es5.exports;
}
var util$1;
var hasRequiredUtil$1;
function requireUtil$1() {
  if (hasRequiredUtil$1) return util$1;
  hasRequiredUtil$1 = 1;
  var es52 = requireEs5();
  var canEvaluate = typeof navigator == "undefined";
  var errorObj = { e: {} };
  var tryCatchTarget;
  var globalObject = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof commonjsGlobal !== "undefined" ? commonjsGlobal : commonjsGlobal !== void 0 ? commonjsGlobal : null;
  function tryCatcher() {
    try {
      var target = tryCatchTarget;
      tryCatchTarget = null;
      return target.apply(this, arguments);
    } catch (e) {
      errorObj.e = e;
      return errorObj;
    }
  }
  function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
  }
  var inherits = function(Child, Parent) {
    var hasProp = {}.hasOwnProperty;
    function T() {
      this.constructor = Child;
      this.constructor$ = Parent;
      for (var propertyName in Parent.prototype) {
        if (hasProp.call(Parent.prototype, propertyName) && propertyName.charAt(propertyName.length - 1) !== "$") {
          this[propertyName + "$"] = Parent.prototype[propertyName];
        }
      }
    }
    T.prototype = Parent.prototype;
    Child.prototype = new T();
    return Child.prototype;
  };
  function isPrimitive(val) {
    return val == null || val === true || val === false || typeof val === "string" || typeof val === "number";
  }
  function isObject(value) {
    return typeof value === "function" || typeof value === "object" && value !== null;
  }
  function maybeWrapAsError(maybeError) {
    if (!isPrimitive(maybeError)) return maybeError;
    return new Error(safeToString(maybeError));
  }
  function withAppended(target, appendee) {
    var len = target.length;
    var ret2 = new Array(len + 1);
    var i;
    for (i = 0; i < len; ++i) {
      ret2[i] = target[i];
    }
    ret2[i] = appendee;
    return ret2;
  }
  function getDataPropertyOrDefault(obj2, key, defaultValue) {
    if (es52.isES5) {
      var desc = Object.getOwnPropertyDescriptor(obj2, key);
      if (desc != null) {
        return desc.get == null && desc.set == null ? desc.value : defaultValue;
      }
    } else {
      return {}.hasOwnProperty.call(obj2, key) ? obj2[key] : void 0;
    }
  }
  function notEnumerableProp(obj2, name, value) {
    if (isPrimitive(obj2)) return obj2;
    var descriptor = {
      value,
      configurable: true,
      enumerable: false,
      writable: true
    };
    es52.defineProperty(obj2, name, descriptor);
    return obj2;
  }
  function thrower(r) {
    throw r;
  }
  var inheritedDataKeys = function() {
    var excludedPrototypes = [
      Array.prototype,
      Object.prototype,
      Function.prototype
    ];
    var isExcludedProto = function(val) {
      for (var i = 0; i < excludedPrototypes.length; ++i) {
        if (excludedPrototypes[i] === val) {
          return true;
        }
      }
      return false;
    };
    if (es52.isES5) {
      var getKeys = Object.getOwnPropertyNames;
      return function(obj2) {
        var ret2 = [];
        var visitedKeys = /* @__PURE__ */ Object.create(null);
        while (obj2 != null && !isExcludedProto(obj2)) {
          var keys;
          try {
            keys = getKeys(obj2);
          } catch (e) {
            return ret2;
          }
          for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (visitedKeys[key]) continue;
            visitedKeys[key] = true;
            var desc = Object.getOwnPropertyDescriptor(obj2, key);
            if (desc != null && desc.get == null && desc.set == null) {
              ret2.push(key);
            }
          }
          obj2 = es52.getPrototypeOf(obj2);
        }
        return ret2;
      };
    } else {
      var hasProp = {}.hasOwnProperty;
      return function(obj2) {
        if (isExcludedProto(obj2)) return [];
        var ret2 = [];
        enumeration: for (var key in obj2) {
          if (hasProp.call(obj2, key)) {
            ret2.push(key);
          } else {
            for (var i = 0; i < excludedPrototypes.length; ++i) {
              if (hasProp.call(excludedPrototypes[i], key)) {
                continue enumeration;
              }
            }
            ret2.push(key);
          }
        }
        return ret2;
      };
    }
  }();
  var thisAssignmentPattern = /this\s*\.\s*\S+\s*=/;
  function isClass(fn) {
    try {
      if (typeof fn === "function") {
        var keys = es52.names(fn.prototype);
        var hasMethods = es52.isES5 && keys.length > 1;
        var hasMethodsOtherThanConstructor = keys.length > 0 && !(keys.length === 1 && keys[0] === "constructor");
        var hasThisAssignmentAndStaticMethods = thisAssignmentPattern.test(fn + "") && es52.names(fn).length > 0;
        if (hasMethods || hasMethodsOtherThanConstructor || hasThisAssignmentAndStaticMethods) {
          return true;
        }
      }
      return false;
    } catch (e) {
      return false;
    }
  }
  function toFastProperties(obj) {
    function FakeConstructor() {
    }
    FakeConstructor.prototype = obj;
    var receiver = new FakeConstructor();
    function ic() {
      return typeof receiver.foo;
    }
    ic();
    ic();
    return obj;
  }
  var rident = /^[a-z$_][a-z$_0-9]*$/i;
  function isIdentifier(str) {
    return rident.test(str);
  }
  function filledRange(count, prefix, suffix) {
    var ret2 = new Array(count);
    for (var i = 0; i < count; ++i) {
      ret2[i] = prefix + i + suffix;
    }
    return ret2;
  }
  function safeToString(obj2) {
    try {
      return obj2 + "";
    } catch (e) {
      return "[no string representation]";
    }
  }
  function isError(obj2) {
    return obj2 instanceof Error || obj2 !== null && typeof obj2 === "object" && typeof obj2.message === "string" && typeof obj2.name === "string";
  }
  function markAsOriginatingFromRejection(e) {
    try {
      notEnumerableProp(e, "isOperational", true);
    } catch (ignore) {
    }
  }
  function originatesFromRejection(e) {
    if (e == null) return false;
    return e instanceof Error["__BluebirdErrorTypes__"].OperationalError || e["isOperational"] === true;
  }
  function canAttachTrace(obj2) {
    return isError(obj2) && es52.propertyIsWritable(obj2, "stack");
  }
  var ensureErrorObject = function() {
    if (!("stack" in new Error())) {
      return function(value) {
        if (canAttachTrace(value)) return value;
        try {
          throw new Error(safeToString(value));
        } catch (err) {
          return err;
        }
      };
    } else {
      return function(value) {
        if (canAttachTrace(value)) return value;
        return new Error(safeToString(value));
      };
    }
  }();
  function classString(obj2) {
    return {}.toString.call(obj2);
  }
  function copyDescriptors(from, to, filter2) {
    var keys = es52.names(from);
    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];
      if (filter2(key)) {
        try {
          es52.defineProperty(to, key, es52.getDescriptor(from, key));
        } catch (ignore) {
        }
      }
    }
  }
  var asArray = function(v) {
    if (es52.isArray(v)) {
      return v;
    }
    return null;
  };
  if (typeof Symbol !== "undefined" && Symbol.iterator) {
    var ArrayFrom = typeof Array.from === "function" ? function(v) {
      return Array.from(v);
    } : function(v) {
      var ret2 = [];
      var it = v[Symbol.iterator]();
      var itResult;
      while (!(itResult = it.next()).done) {
        ret2.push(itResult.value);
      }
      return ret2;
    };
    asArray = function(v) {
      if (es52.isArray(v)) {
        return v;
      } else if (v != null && typeof v[Symbol.iterator] === "function") {
        return ArrayFrom(v);
      }
      return null;
    };
  }
  var isNode = typeof process !== "undefined" && classString(process).toLowerCase() === "[object process]";
  var hasEnvVariables = typeof process !== "undefined" && typeof process.env !== "undefined";
  function env(key) {
    return hasEnvVariables ? process.env[key] : void 0;
  }
  function getNativePromise() {
    if (typeof Promise === "function") {
      try {
        var promise2 = new Promise(function() {
        });
        if (classString(promise2) === "[object Promise]") {
          return Promise;
        }
      } catch (e) {
      }
    }
  }
  var reflectHandler;
  function contextBind(ctx, cb) {
    if (ctx === null || typeof cb !== "function" || cb === reflectHandler) {
      return cb;
    }
    if (ctx.domain !== null) {
      cb = ctx.domain.bind(cb);
    }
    var async2 = ctx.async;
    if (async2 !== null) {
      var old = cb;
      cb = function() {
        var $_len = arguments.length + 2;
        var args = new Array($_len);
        for (var $_i = 2; $_i < $_len; ++$_i) {
          args[$_i] = arguments[$_i - 2];
        }
        args[0] = old;
        args[1] = this;
        return async2.runInAsyncScope.apply(async2, args);
      };
    }
    return cb;
  }
  var ret = {
    setReflectHandler: function(fn) {
      reflectHandler = fn;
    },
    isClass,
    isIdentifier,
    inheritedDataKeys,
    getDataPropertyOrDefault,
    thrower,
    isArray: es52.isArray,
    asArray,
    notEnumerableProp,
    isPrimitive,
    isObject,
    isError,
    canEvaluate,
    errorObj,
    tryCatch,
    inherits,
    withAppended,
    maybeWrapAsError,
    toFastProperties,
    filledRange,
    toString: safeToString,
    canAttachTrace,
    ensureErrorObject,
    originatesFromRejection,
    markAsOriginatingFromRejection,
    classString,
    copyDescriptors,
    isNode,
    hasEnvVariables,
    env,
    global: globalObject,
    getNativePromise,
    contextBind
  };
  ret.isRecentNode = ret.isNode && function() {
    var version;
    if (process.versions && process.versions.node) {
      version = process.versions.node.split(".").map(Number);
    } else if (process.version) {
      version = process.version.split(".").map(Number);
    }
    return version[0] === 0 && version[1] > 10 || version[0] > 0;
  }();
  ret.nodeSupportsAsyncResource = ret.isNode && function() {
    var supportsAsync = false;
    try {
      var res = require("async_hooks").AsyncResource;
      supportsAsync = typeof res.prototype.runInAsyncScope === "function";
    } catch (e) {
      supportsAsync = false;
    }
    return supportsAsync;
  }();
  if (ret.isNode) ret.toFastProperties(process);
  try {
    throw new Error();
  } catch (e) {
    ret.lastLineError = e;
  }
  util$1 = ret;
  return util$1;
}
var async = { exports: {} };
var schedule_1;
var hasRequiredSchedule;
function requireSchedule() {
  if (hasRequiredSchedule) return schedule_1;
  hasRequiredSchedule = 1;
  var util2 = requireUtil$1();
  var schedule;
  var noAsyncScheduler = function() {
    throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
  };
  var NativePromise = util2.getNativePromise();
  if (util2.isNode && typeof MutationObserver === "undefined") {
    var GlobalSetImmediate = commonjsGlobal.setImmediate;
    var ProcessNextTick = process.nextTick;
    schedule = util2.isRecentNode ? function(fn) {
      GlobalSetImmediate.call(commonjsGlobal, fn);
    } : function(fn) {
      ProcessNextTick.call(process, fn);
    };
  } else if (typeof NativePromise === "function" && typeof NativePromise.resolve === "function") {
    var nativePromise = NativePromise.resolve();
    schedule = function(fn) {
      nativePromise.then(fn);
    };
  } else if (typeof MutationObserver !== "undefined" && !(typeof window !== "undefined" && window.navigator && (window.navigator.standalone || window.cordova)) && "classList" in document.documentElement) {
    schedule = function() {
      var div = document.createElement("div");
      var opts = { attributes: true };
      var toggleScheduled = false;
      var div2 = document.createElement("div");
      var o2 = new MutationObserver(function() {
        div.classList.toggle("foo");
        toggleScheduled = false;
      });
      o2.observe(div2, opts);
      var scheduleToggle = function() {
        if (toggleScheduled) return;
        toggleScheduled = true;
        div2.classList.toggle("foo");
      };
      return function schedule2(fn) {
        var o = new MutationObserver(function() {
          o.disconnect();
          fn();
        });
        o.observe(div, opts);
        scheduleToggle();
      };
    }();
  } else if (typeof setImmediate !== "undefined") {
    schedule = function(fn) {
      setImmediate(fn);
    };
  } else if (typeof setTimeout !== "undefined") {
    schedule = function(fn) {
      setTimeout(fn, 0);
    };
  } else {
    schedule = noAsyncScheduler;
  }
  schedule_1 = schedule;
  return schedule_1;
}
var queue;
var hasRequiredQueue;
function requireQueue() {
  if (hasRequiredQueue) return queue;
  hasRequiredQueue = 1;
  function arrayMove(src, srcIndex, dst, dstIndex, len) {
    for (var j = 0; j < len; ++j) {
      dst[j + dstIndex] = src[j + srcIndex];
      src[j + srcIndex] = void 0;
    }
  }
  function Queue(capacity) {
    this._capacity = capacity;
    this._length = 0;
    this._front = 0;
  }
  Queue.prototype._willBeOverCapacity = function(size) {
    return this._capacity < size;
  };
  Queue.prototype._pushOne = function(arg) {
    var length = this.length();
    this._checkCapacity(length + 1);
    var i = this._front + length & this._capacity - 1;
    this[i] = arg;
    this._length = length + 1;
  };
  Queue.prototype.push = function(fn, receiver, arg) {
    var length = this.length() + 3;
    if (this._willBeOverCapacity(length)) {
      this._pushOne(fn);
      this._pushOne(receiver);
      this._pushOne(arg);
      return;
    }
    var j = this._front + length - 3;
    this._checkCapacity(length);
    var wrapMask = this._capacity - 1;
    this[j + 0 & wrapMask] = fn;
    this[j + 1 & wrapMask] = receiver;
    this[j + 2 & wrapMask] = arg;
    this._length = length;
  };
  Queue.prototype.shift = function() {
    var front = this._front, ret = this[front];
    this[front] = void 0;
    this._front = front + 1 & this._capacity - 1;
    this._length--;
    return ret;
  };
  Queue.prototype.length = function() {
    return this._length;
  };
  Queue.prototype._checkCapacity = function(size) {
    if (this._capacity < size) {
      this._resizeTo(this._capacity << 1);
    }
  };
  Queue.prototype._resizeTo = function(capacity) {
    var oldCapacity = this._capacity;
    this._capacity = capacity;
    var front = this._front;
    var length = this._length;
    var moveItemsCount = front + length & oldCapacity - 1;
    arrayMove(this, 0, this, oldCapacity, moveItemsCount);
  };
  queue = Queue;
  return queue;
}
var hasRequiredAsync;
function requireAsync() {
  if (hasRequiredAsync) return async.exports;
  hasRequiredAsync = 1;
  var firstLineError;
  try {
    throw new Error();
  } catch (e) {
    firstLineError = e;
  }
  var schedule = requireSchedule();
  var Queue = requireQueue();
  function Async() {
    this._customScheduler = false;
    this._isTickUsed = false;
    this._lateQueue = new Queue(16);
    this._normalQueue = new Queue(16);
    this._haveDrainedQueues = false;
    var self2 = this;
    this.drainQueues = function() {
      self2._drainQueues();
    };
    this._schedule = schedule;
  }
  Async.prototype.setScheduler = function(fn) {
    var prev = this._schedule;
    this._schedule = fn;
    this._customScheduler = true;
    return prev;
  };
  Async.prototype.hasCustomScheduler = function() {
    return this._customScheduler;
  };
  Async.prototype.haveItemsQueued = function() {
    return this._isTickUsed || this._haveDrainedQueues;
  };
  Async.prototype.fatalError = function(e, isNode) {
    if (isNode) {
      process.stderr.write("Fatal " + (e instanceof Error ? e.stack : e) + "\n");
      process.exit(2);
    } else {
      this.throwLater(e);
    }
  };
  Async.prototype.throwLater = function(fn, arg) {
    if (arguments.length === 1) {
      arg = fn;
      fn = function() {
        throw arg;
      };
    }
    if (typeof setTimeout !== "undefined") {
      setTimeout(function() {
        fn(arg);
      }, 0);
    } else try {
      this._schedule(function() {
        fn(arg);
      });
    } catch (e) {
      throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
    }
  };
  function AsyncInvokeLater(fn, receiver, arg) {
    this._lateQueue.push(fn, receiver, arg);
    this._queueTick();
  }
  function AsyncInvoke(fn, receiver, arg) {
    this._normalQueue.push(fn, receiver, arg);
    this._queueTick();
  }
  function AsyncSettlePromises(promise2) {
    this._normalQueue._pushOne(promise2);
    this._queueTick();
  }
  Async.prototype.invokeLater = AsyncInvokeLater;
  Async.prototype.invoke = AsyncInvoke;
  Async.prototype.settlePromises = AsyncSettlePromises;
  function _drainQueue(queue2) {
    while (queue2.length() > 0) {
      _drainQueueStep(queue2);
    }
  }
  function _drainQueueStep(queue2) {
    var fn = queue2.shift();
    if (typeof fn !== "function") {
      fn._settlePromises();
    } else {
      var receiver = queue2.shift();
      var arg = queue2.shift();
      fn.call(receiver, arg);
    }
  }
  Async.prototype._drainQueues = function() {
    _drainQueue(this._normalQueue);
    this._reset();
    this._haveDrainedQueues = true;
    _drainQueue(this._lateQueue);
  };
  Async.prototype._queueTick = function() {
    if (!this._isTickUsed) {
      this._isTickUsed = true;
      this._schedule(this.drainQueues);
    }
  };
  Async.prototype._reset = function() {
    this._isTickUsed = false;
  };
  async.exports = Async;
  async.exports.firstLineError = firstLineError;
  return async.exports;
}
var errors$1;
var hasRequiredErrors$1;
function requireErrors$1() {
  if (hasRequiredErrors$1) return errors$1;
  hasRequiredErrors$1 = 1;
  var es52 = requireEs5();
  var Objectfreeze = es52.freeze;
  var util2 = requireUtil$1();
  var inherits = util2.inherits;
  var notEnumerableProp = util2.notEnumerableProp;
  function subError(nameProperty, defaultMessage) {
    function SubError(message) {
      if (!(this instanceof SubError)) return new SubError(message);
      notEnumerableProp(
        this,
        "message",
        typeof message === "string" ? message : defaultMessage
      );
      notEnumerableProp(this, "name", nameProperty);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      } else {
        Error.call(this);
      }
    }
    inherits(SubError, Error);
    return SubError;
  }
  var _TypeError, _RangeError;
  var Warning = subError("Warning", "warning");
  var CancellationError = subError("CancellationError", "cancellation error");
  var TimeoutError = subError("TimeoutError", "timeout error");
  var AggregateError = subError("AggregateError", "aggregate error");
  try {
    _TypeError = TypeError;
    _RangeError = RangeError;
  } catch (e) {
    _TypeError = subError("TypeError", "type error");
    _RangeError = subError("RangeError", "range error");
  }
  var methods2 = "join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(" ");
  for (var i = 0; i < methods2.length; ++i) {
    if (typeof Array.prototype[methods2[i]] === "function") {
      AggregateError.prototype[methods2[i]] = Array.prototype[methods2[i]];
    }
  }
  es52.defineProperty(AggregateError.prototype, "length", {
    value: 0,
    configurable: false,
    writable: true,
    enumerable: true
  });
  AggregateError.prototype["isOperational"] = true;
  var level = 0;
  AggregateError.prototype.toString = function() {
    var indent = Array(level * 4 + 1).join(" ");
    var ret = "\n" + indent + "AggregateError of:\n";
    level++;
    indent = Array(level * 4 + 1).join(" ");
    for (var i2 = 0; i2 < this.length; ++i2) {
      var str = this[i2] === this ? "[Circular AggregateError]" : this[i2] + "";
      var lines = str.split("\n");
      for (var j = 0; j < lines.length; ++j) {
        lines[j] = indent + lines[j];
      }
      str = lines.join("\n");
      ret += str + "\n";
    }
    level--;
    return ret;
  };
  function OperationalError(message) {
    if (!(this instanceof OperationalError))
      return new OperationalError(message);
    notEnumerableProp(this, "name", "OperationalError");
    notEnumerableProp(this, "message", message);
    this.cause = message;
    this["isOperational"] = true;
    if (message instanceof Error) {
      notEnumerableProp(this, "message", message.message);
      notEnumerableProp(this, "stack", message.stack);
    } else if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
  inherits(OperationalError, Error);
  var errorTypes = Error["__BluebirdErrorTypes__"];
  if (!errorTypes) {
    errorTypes = Objectfreeze({
      CancellationError,
      TimeoutError,
      OperationalError,
      RejectionError: OperationalError,
      AggregateError
    });
    es52.defineProperty(Error, "__BluebirdErrorTypes__", {
      value: errorTypes,
      writable: false,
      enumerable: false,
      configurable: false
    });
  }
  errors$1 = {
    Error,
    TypeError: _TypeError,
    RangeError: _RangeError,
    CancellationError: errorTypes.CancellationError,
    OperationalError: errorTypes.OperationalError,
    TimeoutError: errorTypes.TimeoutError,
    AggregateError: errorTypes.AggregateError,
    Warning
  };
  return errors$1;
}
var thenables;
var hasRequiredThenables;
function requireThenables() {
  if (hasRequiredThenables) return thenables;
  hasRequiredThenables = 1;
  thenables = function(Promise2, INTERNAL) {
    var util2 = requireUtil$1();
    var errorObj = util2.errorObj;
    var isObject = util2.isObject;
    function tryConvertToPromise(obj, context2) {
      if (isObject(obj)) {
        if (obj instanceof Promise2) return obj;
        var then = getThen(obj);
        if (then === errorObj) {
          if (context2) context2._pushContext();
          var ret = Promise2.reject(then.e);
          if (context2) context2._popContext();
          return ret;
        } else if (typeof then === "function") {
          if (isAnyBluebirdPromise(obj)) {
            var ret = new Promise2(INTERNAL);
            obj._then(
              ret._fulfill,
              ret._reject,
              void 0,
              ret,
              null
            );
            return ret;
          }
          return doThenable(obj, then, context2);
        }
      }
      return obj;
    }
    function doGetThen(obj) {
      return obj.then;
    }
    function getThen(obj) {
      try {
        return doGetThen(obj);
      } catch (e) {
        errorObj.e = e;
        return errorObj;
      }
    }
    var hasProp = {}.hasOwnProperty;
    function isAnyBluebirdPromise(obj) {
      try {
        return hasProp.call(obj, "_promise0");
      } catch (e) {
        return false;
      }
    }
    function doThenable(x, then, context2) {
      var promise2 = new Promise2(INTERNAL);
      var ret = promise2;
      if (context2) context2._pushContext();
      promise2._captureStackTrace();
      if (context2) context2._popContext();
      var synchronous = true;
      var result = util2.tryCatch(then).call(x, resolve, reject);
      synchronous = false;
      if (promise2 && result === errorObj) {
        promise2._rejectCallback(result.e, true, true);
        promise2 = null;
      }
      function resolve(value) {
        if (!promise2) return;
        promise2._resolveCallback(value);
        promise2 = null;
      }
      function reject(reason) {
        if (!promise2) return;
        promise2._rejectCallback(reason, synchronous, true);
        promise2 = null;
      }
      return ret;
    }
    return tryConvertToPromise;
  };
  return thenables;
}
var promise_array;
var hasRequiredPromise_array;
function requirePromise_array() {
  if (hasRequiredPromise_array) return promise_array;
  hasRequiredPromise_array = 1;
  promise_array = function(Promise2, INTERNAL, tryConvertToPromise, apiRejection, Proxyable) {
    var util2 = requireUtil$1();
    util2.isArray;
    function toResolutionValue(val) {
      switch (val) {
        case -2:
          return [];
        case -3:
          return {};
        case -6:
          return /* @__PURE__ */ new Map();
      }
    }
    function PromiseArray(values) {
      var promise2 = this._promise = new Promise2(INTERNAL);
      if (values instanceof Promise2) {
        promise2._propagateFrom(values, 3);
        values.suppressUnhandledRejections();
      }
      promise2._setOnCancel(this);
      this._values = values;
      this._length = 0;
      this._totalResolved = 0;
      this._init(void 0, -2);
    }
    util2.inherits(PromiseArray, Proxyable);
    PromiseArray.prototype.length = function() {
      return this._length;
    };
    PromiseArray.prototype.promise = function() {
      return this._promise;
    };
    PromiseArray.prototype._init = function init(_, resolveValueIfEmpty) {
      var values = tryConvertToPromise(this._values, this._promise);
      if (values instanceof Promise2) {
        values = values._target();
        var bitField = values._bitField;
        this._values = values;
        if ((bitField & 50397184) === 0) {
          this._promise._setAsyncGuaranteed();
          return values._then(
            init,
            this._reject,
            void 0,
            this,
            resolveValueIfEmpty
          );
        } else if ((bitField & 33554432) !== 0) {
          values = values._value();
        } else if ((bitField & 16777216) !== 0) {
          return this._reject(values._reason());
        } else {
          return this._cancel();
        }
      }
      values = util2.asArray(values);
      if (values === null) {
        var err = apiRejection(
          "expecting an array or an iterable object but got " + util2.classString(values)
        ).reason();
        this._promise._rejectCallback(err, false);
        return;
      }
      if (values.length === 0) {
        if (resolveValueIfEmpty === -5) {
          this._resolveEmptyArray();
        } else {
          this._resolve(toResolutionValue(resolveValueIfEmpty));
        }
        return;
      }
      this._iterate(values);
    };
    PromiseArray.prototype._iterate = function(values) {
      var len = this.getActualLength(values.length);
      this._length = len;
      this._values = this.shouldCopyValues() ? new Array(len) : this._values;
      var result = this._promise;
      var isResolved = false;
      var bitField = null;
      for (var i = 0; i < len; ++i) {
        var maybePromise = tryConvertToPromise(values[i], result);
        if (maybePromise instanceof Promise2) {
          maybePromise = maybePromise._target();
          bitField = maybePromise._bitField;
        } else {
          bitField = null;
        }
        if (isResolved) {
          if (bitField !== null) {
            maybePromise.suppressUnhandledRejections();
          }
        } else if (bitField !== null) {
          if ((bitField & 50397184) === 0) {
            maybePromise._proxy(this, i);
            this._values[i] = maybePromise;
          } else if ((bitField & 33554432) !== 0) {
            isResolved = this._promiseFulfilled(maybePromise._value(), i);
          } else if ((bitField & 16777216) !== 0) {
            isResolved = this._promiseRejected(maybePromise._reason(), i);
          } else {
            isResolved = this._promiseCancelled(i);
          }
        } else {
          isResolved = this._promiseFulfilled(maybePromise, i);
        }
      }
      if (!isResolved) result._setAsyncGuaranteed();
    };
    PromiseArray.prototype._isResolved = function() {
      return this._values === null;
    };
    PromiseArray.prototype._resolve = function(value) {
      this._values = null;
      this._promise._fulfill(value);
    };
    PromiseArray.prototype._cancel = function() {
      if (this._isResolved() || !this._promise._isCancellable()) return;
      this._values = null;
      this._promise._cancel();
    };
    PromiseArray.prototype._reject = function(reason) {
      this._values = null;
      this._promise._rejectCallback(reason, false);
    };
    PromiseArray.prototype._promiseFulfilled = function(value, index) {
      this._values[index] = value;
      var totalResolved = ++this._totalResolved;
      if (totalResolved >= this._length) {
        this._resolve(this._values);
        return true;
      }
      return false;
    };
    PromiseArray.prototype._promiseCancelled = function() {
      this._cancel();
      return true;
    };
    PromiseArray.prototype._promiseRejected = function(reason) {
      this._totalResolved++;
      this._reject(reason);
      return true;
    };
    PromiseArray.prototype._resultCancelled = function() {
      if (this._isResolved()) return;
      var values = this._values;
      this._cancel();
      if (values instanceof Promise2) {
        values.cancel();
      } else {
        for (var i = 0; i < values.length; ++i) {
          if (values[i] instanceof Promise2) {
            values[i].cancel();
          }
        }
      }
    };
    PromiseArray.prototype.shouldCopyValues = function() {
      return true;
    };
    PromiseArray.prototype.getActualLength = function(len) {
      return len;
    };
    return PromiseArray;
  };
  return promise_array;
}
var context;
var hasRequiredContext;
function requireContext() {
  if (hasRequiredContext) return context;
  hasRequiredContext = 1;
  context = function(Promise2) {
    var longStackTraces = false;
    var contextStack = [];
    Promise2.prototype._promiseCreated = function() {
    };
    Promise2.prototype._pushContext = function() {
    };
    Promise2.prototype._popContext = function() {
      return null;
    };
    Promise2._peekContext = Promise2.prototype._peekContext = function() {
    };
    function Context() {
      this._trace = new Context.CapturedTrace(peekContext());
    }
    Context.prototype._pushContext = function() {
      if (this._trace !== void 0) {
        this._trace._promiseCreated = null;
        contextStack.push(this._trace);
      }
    };
    Context.prototype._popContext = function() {
      if (this._trace !== void 0) {
        var trace = contextStack.pop();
        var ret = trace._promiseCreated;
        trace._promiseCreated = null;
        return ret;
      }
      return null;
    };
    function createContext() {
      if (longStackTraces) return new Context();
    }
    function peekContext() {
      var lastIndex = contextStack.length - 1;
      if (lastIndex >= 0) {
        return contextStack[lastIndex];
      }
      return void 0;
    }
    Context.CapturedTrace = null;
    Context.create = createContext;
    Context.deactivateLongStackTraces = function() {
    };
    Context.activateLongStackTraces = function() {
      var Promise_pushContext = Promise2.prototype._pushContext;
      var Promise_popContext = Promise2.prototype._popContext;
      var Promise_PeekContext = Promise2._peekContext;
      var Promise_peekContext = Promise2.prototype._peekContext;
      var Promise_promiseCreated = Promise2.prototype._promiseCreated;
      Context.deactivateLongStackTraces = function() {
        Promise2.prototype._pushContext = Promise_pushContext;
        Promise2.prototype._popContext = Promise_popContext;
        Promise2._peekContext = Promise_PeekContext;
        Promise2.prototype._peekContext = Promise_peekContext;
        Promise2.prototype._promiseCreated = Promise_promiseCreated;
        longStackTraces = false;
      };
      longStackTraces = true;
      Promise2.prototype._pushContext = Context.prototype._pushContext;
      Promise2.prototype._popContext = Context.prototype._popContext;
      Promise2._peekContext = Promise2.prototype._peekContext = peekContext;
      Promise2.prototype._promiseCreated = function() {
        var ctx = this._peekContext();
        if (ctx && ctx._promiseCreated == null) ctx._promiseCreated = this;
      };
    };
    return Context;
  };
  return context;
}
var debuggability;
var hasRequiredDebuggability;
function requireDebuggability() {
  if (hasRequiredDebuggability) return debuggability;
  hasRequiredDebuggability = 1;
  debuggability = function(Promise2, Context, enableAsyncHooks, disableAsyncHooks) {
    var async2 = Promise2._async;
    var Warning = requireErrors$1().Warning;
    var util2 = requireUtil$1();
    var es52 = requireEs5();
    var canAttachTrace = util2.canAttachTrace;
    var unhandledRejectionHandled;
    var possiblyUnhandledRejection;
    var bluebirdFramePattern = /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/;
    var nodeFramePattern = /\((?:timers\.js):\d+:\d+\)/;
    var parseLinePattern = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/;
    var stackFramePattern = null;
    var formatStack = null;
    var indentStackFrames = false;
    var printWarning;
    var debugging = !!(util2.env("BLUEBIRD_DEBUG") != 0 && (util2.env("BLUEBIRD_DEBUG") || util2.env("NODE_ENV") === "development"));
    var warnings = !!(util2.env("BLUEBIRD_WARNINGS") != 0 && (debugging || util2.env("BLUEBIRD_WARNINGS")));
    var longStackTraces = !!(util2.env("BLUEBIRD_LONG_STACK_TRACES") != 0 && (debugging || util2.env("BLUEBIRD_LONG_STACK_TRACES")));
    var wForgottenReturn = util2.env("BLUEBIRD_W_FORGOTTEN_RETURN") != 0 && (warnings || !!util2.env("BLUEBIRD_W_FORGOTTEN_RETURN"));
    var deferUnhandledRejectionCheck;
    (function() {
      var promises = [];
      function unhandledRejectionCheck() {
        for (var i = 0; i < promises.length; ++i) {
          promises[i]._notifyUnhandledRejection();
        }
        unhandledRejectionClear();
      }
      function unhandledRejectionClear() {
        promises.length = 0;
      }
      deferUnhandledRejectionCheck = function(promise2) {
        promises.push(promise2);
        setTimeout(unhandledRejectionCheck, 1);
      };
      es52.defineProperty(Promise2, "_unhandledRejectionCheck", {
        value: unhandledRejectionCheck
      });
      es52.defineProperty(Promise2, "_unhandledRejectionClear", {
        value: unhandledRejectionClear
      });
    })();
    Promise2.prototype.suppressUnhandledRejections = function() {
      var target = this._target();
      target._bitField = target._bitField & -1048577 | 524288;
    };
    Promise2.prototype._ensurePossibleRejectionHandled = function() {
      if ((this._bitField & 524288) !== 0) return;
      this._setRejectionIsUnhandled();
      deferUnhandledRejectionCheck(this);
    };
    Promise2.prototype._notifyUnhandledRejectionIsHandled = function() {
      fireRejectionEvent(
        "rejectionHandled",
        unhandledRejectionHandled,
        void 0,
        this
      );
    };
    Promise2.prototype._setReturnedNonUndefined = function() {
      this._bitField = this._bitField | 268435456;
    };
    Promise2.prototype._returnedNonUndefined = function() {
      return (this._bitField & 268435456) !== 0;
    };
    Promise2.prototype._notifyUnhandledRejection = function() {
      if (this._isRejectionUnhandled()) {
        var reason = this._settledValue();
        this._setUnhandledRejectionIsNotified();
        fireRejectionEvent(
          "unhandledRejection",
          possiblyUnhandledRejection,
          reason,
          this
        );
      }
    };
    Promise2.prototype._setUnhandledRejectionIsNotified = function() {
      this._bitField = this._bitField | 262144;
    };
    Promise2.prototype._unsetUnhandledRejectionIsNotified = function() {
      this._bitField = this._bitField & -262145;
    };
    Promise2.prototype._isUnhandledRejectionNotified = function() {
      return (this._bitField & 262144) > 0;
    };
    Promise2.prototype._setRejectionIsUnhandled = function() {
      this._bitField = this._bitField | 1048576;
    };
    Promise2.prototype._unsetRejectionIsUnhandled = function() {
      this._bitField = this._bitField & -1048577;
      if (this._isUnhandledRejectionNotified()) {
        this._unsetUnhandledRejectionIsNotified();
        this._notifyUnhandledRejectionIsHandled();
      }
    };
    Promise2.prototype._isRejectionUnhandled = function() {
      return (this._bitField & 1048576) > 0;
    };
    Promise2.prototype._warn = function(message, shouldUseOwnTrace, promise2) {
      return warn(message, shouldUseOwnTrace, promise2 || this);
    };
    Promise2.onPossiblyUnhandledRejection = function(fn) {
      var context2 = Promise2._getContext();
      possiblyUnhandledRejection = util2.contextBind(context2, fn);
    };
    Promise2.onUnhandledRejectionHandled = function(fn) {
      var context2 = Promise2._getContext();
      unhandledRejectionHandled = util2.contextBind(context2, fn);
    };
    var disableLongStackTraces = function() {
    };
    Promise2.longStackTraces = function() {
      if (async2.haveItemsQueued() && !config.longStackTraces) {
        throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
      }
      if (!config.longStackTraces && longStackTracesIsSupported()) {
        var Promise_captureStackTrace = Promise2.prototype._captureStackTrace;
        var Promise_attachExtraTrace = Promise2.prototype._attachExtraTrace;
        var Promise_dereferenceTrace = Promise2.prototype._dereferenceTrace;
        config.longStackTraces = true;
        disableLongStackTraces = function() {
          if (async2.haveItemsQueued() && !config.longStackTraces) {
            throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
          }
          Promise2.prototype._captureStackTrace = Promise_captureStackTrace;
          Promise2.prototype._attachExtraTrace = Promise_attachExtraTrace;
          Promise2.prototype._dereferenceTrace = Promise_dereferenceTrace;
          Context.deactivateLongStackTraces();
          config.longStackTraces = false;
        };
        Promise2.prototype._captureStackTrace = longStackTracesCaptureStackTrace;
        Promise2.prototype._attachExtraTrace = longStackTracesAttachExtraTrace;
        Promise2.prototype._dereferenceTrace = longStackTracesDereferenceTrace;
        Context.activateLongStackTraces();
      }
    };
    Promise2.hasLongStackTraces = function() {
      return config.longStackTraces && longStackTracesIsSupported();
    };
    var legacyHandlers = {
      unhandledrejection: {
        before: function() {
          var ret = util2.global.onunhandledrejection;
          util2.global.onunhandledrejection = null;
          return ret;
        },
        after: function(fn) {
          util2.global.onunhandledrejection = fn;
        }
      },
      rejectionhandled: {
        before: function() {
          var ret = util2.global.onrejectionhandled;
          util2.global.onrejectionhandled = null;
          return ret;
        },
        after: function(fn) {
          util2.global.onrejectionhandled = fn;
        }
      }
    };
    var fireDomEvent = function() {
      var dispatch = function(legacy, e) {
        if (legacy) {
          var fn;
          try {
            fn = legacy.before();
            return !util2.global.dispatchEvent(e);
          } finally {
            legacy.after(fn);
          }
        } else {
          return !util2.global.dispatchEvent(e);
        }
      };
      try {
        if (typeof CustomEvent === "function") {
          var event = new CustomEvent("CustomEvent");
          util2.global.dispatchEvent(event);
          return function(name, event2) {
            name = name.toLowerCase();
            var eventData = {
              detail: event2,
              cancelable: true
            };
            var domEvent = new CustomEvent(name, eventData);
            es52.defineProperty(
              domEvent,
              "promise",
              { value: event2.promise }
            );
            es52.defineProperty(
              domEvent,
              "reason",
              { value: event2.reason }
            );
            return dispatch(legacyHandlers[name], domEvent);
          };
        } else if (typeof Event === "function") {
          var event = new Event("CustomEvent");
          util2.global.dispatchEvent(event);
          return function(name, event2) {
            name = name.toLowerCase();
            var domEvent = new Event(name, {
              cancelable: true
            });
            domEvent.detail = event2;
            es52.defineProperty(domEvent, "promise", { value: event2.promise });
            es52.defineProperty(domEvent, "reason", { value: event2.reason });
            return dispatch(legacyHandlers[name], domEvent);
          };
        } else {
          var event = document.createEvent("CustomEvent");
          event.initCustomEvent("testingtheevent", false, true, {});
          util2.global.dispatchEvent(event);
          return function(name, event2) {
            name = name.toLowerCase();
            var domEvent = document.createEvent("CustomEvent");
            domEvent.initCustomEvent(
              name,
              false,
              true,
              event2
            );
            return dispatch(legacyHandlers[name], domEvent);
          };
        }
      } catch (e) {
      }
      return function() {
        return false;
      };
    }();
    var fireGlobalEvent = function() {
      if (util2.isNode) {
        return function() {
          return process.emit.apply(process, arguments);
        };
      } else {
        if (!util2.global) {
          return function() {
            return false;
          };
        }
        return function(name) {
          var methodName = "on" + name.toLowerCase();
          var method2 = util2.global[methodName];
          if (!method2) return false;
          method2.apply(util2.global, [].slice.call(arguments, 1));
          return true;
        };
      }
    }();
    function generatePromiseLifecycleEventObject(name, promise2) {
      return { promise: promise2 };
    }
    var eventToObjectGenerator = {
      promiseCreated: generatePromiseLifecycleEventObject,
      promiseFulfilled: generatePromiseLifecycleEventObject,
      promiseRejected: generatePromiseLifecycleEventObject,
      promiseResolved: generatePromiseLifecycleEventObject,
      promiseCancelled: generatePromiseLifecycleEventObject,
      promiseChained: function(name, promise2, child) {
        return { promise: promise2, child };
      },
      warning: function(name, warning) {
        return { warning };
      },
      unhandledRejection: function(name, reason, promise2) {
        return { reason, promise: promise2 };
      },
      rejectionHandled: generatePromiseLifecycleEventObject
    };
    var activeFireEvent = function(name) {
      var globalEventFired = false;
      try {
        globalEventFired = fireGlobalEvent.apply(null, arguments);
      } catch (e) {
        async2.throwLater(e);
        globalEventFired = true;
      }
      var domEventFired = false;
      try {
        domEventFired = fireDomEvent(
          name,
          eventToObjectGenerator[name].apply(null, arguments)
        );
      } catch (e) {
        async2.throwLater(e);
        domEventFired = true;
      }
      return domEventFired || globalEventFired;
    };
    Promise2.config = function(opts) {
      opts = Object(opts);
      if ("longStackTraces" in opts) {
        if (opts.longStackTraces) {
          Promise2.longStackTraces();
        } else if (!opts.longStackTraces && Promise2.hasLongStackTraces()) {
          disableLongStackTraces();
        }
      }
      if ("warnings" in opts) {
        var warningsOption = opts.warnings;
        config.warnings = !!warningsOption;
        wForgottenReturn = config.warnings;
        if (util2.isObject(warningsOption)) {
          if ("wForgottenReturn" in warningsOption) {
            wForgottenReturn = !!warningsOption.wForgottenReturn;
          }
        }
      }
      if ("cancellation" in opts && opts.cancellation && !config.cancellation) {
        if (async2.haveItemsQueued()) {
          throw new Error(
            "cannot enable cancellation after promises are in use"
          );
        }
        Promise2.prototype._clearCancellationData = cancellationClearCancellationData;
        Promise2.prototype._propagateFrom = cancellationPropagateFrom;
        Promise2.prototype._onCancel = cancellationOnCancel;
        Promise2.prototype._setOnCancel = cancellationSetOnCancel;
        Promise2.prototype._attachCancellationCallback = cancellationAttachCancellationCallback;
        Promise2.prototype._execute = cancellationExecute;
        propagateFromFunction = cancellationPropagateFrom;
        config.cancellation = true;
      }
      if ("monitoring" in opts) {
        if (opts.monitoring && !config.monitoring) {
          config.monitoring = true;
          Promise2.prototype._fireEvent = activeFireEvent;
        } else if (!opts.monitoring && config.monitoring) {
          config.monitoring = false;
          Promise2.prototype._fireEvent = defaultFireEvent;
        }
      }
      if ("asyncHooks" in opts && util2.nodeSupportsAsyncResource) {
        var prev = config.asyncHooks;
        var cur = !!opts.asyncHooks;
        if (prev !== cur) {
          config.asyncHooks = cur;
          if (cur) {
            enableAsyncHooks();
          } else {
            disableAsyncHooks();
          }
        }
      }
      return Promise2;
    };
    function defaultFireEvent() {
      return false;
    }
    Promise2.prototype._fireEvent = defaultFireEvent;
    Promise2.prototype._execute = function(executor, resolve, reject) {
      try {
        executor(resolve, reject);
      } catch (e) {
        return e;
      }
    };
    Promise2.prototype._onCancel = function() {
    };
    Promise2.prototype._setOnCancel = function(handler) {
    };
    Promise2.prototype._attachCancellationCallback = function(onCancel) {
    };
    Promise2.prototype._captureStackTrace = function() {
    };
    Promise2.prototype._attachExtraTrace = function() {
    };
    Promise2.prototype._dereferenceTrace = function() {
    };
    Promise2.prototype._clearCancellationData = function() {
    };
    Promise2.prototype._propagateFrom = function(parent, flags) {
    };
    function cancellationExecute(executor, resolve, reject) {
      var promise2 = this;
      try {
        executor(resolve, reject, function(onCancel) {
          if (typeof onCancel !== "function") {
            throw new TypeError("onCancel must be a function, got: " + util2.toString(onCancel));
          }
          promise2._attachCancellationCallback(onCancel);
        });
      } catch (e) {
        return e;
      }
    }
    function cancellationAttachCancellationCallback(onCancel) {
      if (!this._isCancellable()) return this;
      var previousOnCancel = this._onCancel();
      if (previousOnCancel !== void 0) {
        if (util2.isArray(previousOnCancel)) {
          previousOnCancel.push(onCancel);
        } else {
          this._setOnCancel([previousOnCancel, onCancel]);
        }
      } else {
        this._setOnCancel(onCancel);
      }
    }
    function cancellationOnCancel() {
      return this._onCancelField;
    }
    function cancellationSetOnCancel(onCancel) {
      this._onCancelField = onCancel;
    }
    function cancellationClearCancellationData() {
      this._cancellationParent = void 0;
      this._onCancelField = void 0;
    }
    function cancellationPropagateFrom(parent, flags) {
      if ((flags & 1) !== 0) {
        this._cancellationParent = parent;
        var branchesRemainingToCancel = parent._branchesRemainingToCancel;
        if (branchesRemainingToCancel === void 0) {
          branchesRemainingToCancel = 0;
        }
        parent._branchesRemainingToCancel = branchesRemainingToCancel + 1;
      }
      if ((flags & 2) !== 0 && parent._isBound()) {
        this._setBoundTo(parent._boundTo);
      }
    }
    function bindingPropagateFrom(parent, flags) {
      if ((flags & 2) !== 0 && parent._isBound()) {
        this._setBoundTo(parent._boundTo);
      }
    }
    var propagateFromFunction = bindingPropagateFrom;
    function boundValueFunction() {
      var ret = this._boundTo;
      if (ret !== void 0) {
        if (ret instanceof Promise2) {
          if (ret.isFulfilled()) {
            return ret.value();
          } else {
            return void 0;
          }
        }
      }
      return ret;
    }
    function longStackTracesCaptureStackTrace() {
      this._trace = new CapturedTrace(this._peekContext());
    }
    function longStackTracesAttachExtraTrace(error, ignoreSelf) {
      if (canAttachTrace(error)) {
        var trace = this._trace;
        if (trace !== void 0) {
          if (ignoreSelf) trace = trace._parent;
        }
        if (trace !== void 0) {
          trace.attachExtraTrace(error);
        } else if (!error.__stackCleaned__) {
          var parsed = parseStackAndMessage(error);
          util2.notEnumerableProp(
            error,
            "stack",
            parsed.message + "\n" + parsed.stack.join("\n")
          );
          util2.notEnumerableProp(error, "__stackCleaned__", true);
        }
      }
    }
    function longStackTracesDereferenceTrace() {
      this._trace = void 0;
    }
    function checkForgottenReturns(returnValue, promiseCreated, name, promise2, parent) {
      if (returnValue === void 0 && promiseCreated !== null && wForgottenReturn) {
        if (parent !== void 0 && parent._returnedNonUndefined()) return;
        if ((promise2._bitField & 65535) === 0) return;
        if (name) name = name + " ";
        var handlerLine = "";
        var creatorLine = "";
        if (promiseCreated._trace) {
          var traceLines = promiseCreated._trace.stack.split("\n");
          var stack = cleanStack(traceLines);
          for (var i = stack.length - 1; i >= 0; --i) {
            var line = stack[i];
            if (!nodeFramePattern.test(line)) {
              var lineMatches = line.match(parseLinePattern);
              if (lineMatches) {
                handlerLine = "at " + lineMatches[1] + ":" + lineMatches[2] + ":" + lineMatches[3] + " ";
              }
              break;
            }
          }
          if (stack.length > 0) {
            var firstUserLine = stack[0];
            for (var i = 0; i < traceLines.length; ++i) {
              if (traceLines[i] === firstUserLine) {
                if (i > 0) {
                  creatorLine = "\n" + traceLines[i - 1];
                }
                break;
              }
            }
          }
        }
        var msg = "a promise was created in a " + name + "handler " + handlerLine + "but was not returned from it, see http://goo.gl/rRqMUw" + creatorLine;
        promise2._warn(msg, true, promiseCreated);
      }
    }
    function deprecated(name, replacement) {
      var message = name + " is deprecated and will be removed in a future version.";
      if (replacement) message += " Use " + replacement + " instead.";
      return warn(message);
    }
    function warn(message, shouldUseOwnTrace, promise2) {
      if (!config.warnings) return;
      var warning = new Warning(message);
      var ctx;
      if (shouldUseOwnTrace) {
        promise2._attachExtraTrace(warning);
      } else if (config.longStackTraces && (ctx = Promise2._peekContext())) {
        ctx.attachExtraTrace(warning);
      } else {
        var parsed = parseStackAndMessage(warning);
        warning.stack = parsed.message + "\n" + parsed.stack.join("\n");
      }
      if (!activeFireEvent("warning", warning)) {
        formatAndLogError(warning, "", true);
      }
    }
    function reconstructStack(message, stacks) {
      for (var i = 0; i < stacks.length - 1; ++i) {
        stacks[i].push("From previous event:");
        stacks[i] = stacks[i].join("\n");
      }
      if (i < stacks.length) {
        stacks[i] = stacks[i].join("\n");
      }
      return message + "\n" + stacks.join("\n");
    }
    function removeDuplicateOrEmptyJumps(stacks) {
      for (var i = 0; i < stacks.length; ++i) {
        if (stacks[i].length === 0 || i + 1 < stacks.length && stacks[i][0] === stacks[i + 1][0]) {
          stacks.splice(i, 1);
          i--;
        }
      }
    }
    function removeCommonRoots(stacks) {
      var current = stacks[0];
      for (var i = 1; i < stacks.length; ++i) {
        var prev = stacks[i];
        var currentLastIndex = current.length - 1;
        var currentLastLine = current[currentLastIndex];
        var commonRootMeetPoint = -1;
        for (var j = prev.length - 1; j >= 0; --j) {
          if (prev[j] === currentLastLine) {
            commonRootMeetPoint = j;
            break;
          }
        }
        for (var j = commonRootMeetPoint; j >= 0; --j) {
          var line = prev[j];
          if (current[currentLastIndex] === line) {
            current.pop();
            currentLastIndex--;
          } else {
            break;
          }
        }
        current = prev;
      }
    }
    function cleanStack(stack) {
      var ret = [];
      for (var i = 0; i < stack.length; ++i) {
        var line = stack[i];
        var isTraceLine = "    (No stack trace)" === line || stackFramePattern.test(line);
        var isInternalFrame = isTraceLine && shouldIgnore(line);
        if (isTraceLine && !isInternalFrame) {
          if (indentStackFrames && line.charAt(0) !== " ") {
            line = "    " + line;
          }
          ret.push(line);
        }
      }
      return ret;
    }
    function stackFramesAsArray(error) {
      var stack = error.stack.replace(/\s+$/g, "").split("\n");
      for (var i = 0; i < stack.length; ++i) {
        var line = stack[i];
        if ("    (No stack trace)" === line || stackFramePattern.test(line)) {
          break;
        }
      }
      if (i > 0 && error.name != "SyntaxError") {
        stack = stack.slice(i);
      }
      return stack;
    }
    function parseStackAndMessage(error) {
      var stack = error.stack;
      var message = error.toString();
      stack = typeof stack === "string" && stack.length > 0 ? stackFramesAsArray(error) : ["    (No stack trace)"];
      return {
        message,
        stack: error.name == "SyntaxError" ? stack : cleanStack(stack)
      };
    }
    function formatAndLogError(error, title, isSoft) {
      if (typeof console !== "undefined") {
        var message;
        if (util2.isObject(error)) {
          var stack = error.stack;
          message = title + formatStack(stack, error);
        } else {
          message = title + String(error);
        }
        if (typeof printWarning === "function") {
          printWarning(message, isSoft);
        } else if (typeof console.log === "function" || typeof console.log === "object") {
          console.log(message);
        }
      }
    }
    function fireRejectionEvent(name, localHandler, reason, promise2) {
      var localEventFired = false;
      try {
        if (typeof localHandler === "function") {
          localEventFired = true;
          if (name === "rejectionHandled") {
            localHandler(promise2);
          } else {
            localHandler(reason, promise2);
          }
        }
      } catch (e) {
        async2.throwLater(e);
      }
      if (name === "unhandledRejection") {
        if (!activeFireEvent(name, reason, promise2) && !localEventFired) {
          formatAndLogError(reason, "Unhandled rejection ");
        }
      } else {
        activeFireEvent(name, promise2);
      }
    }
    function formatNonError(obj) {
      var str;
      if (typeof obj === "function") {
        str = "[function " + (obj.name || "anonymous") + "]";
      } else {
        str = obj && typeof obj.toString === "function" ? obj.toString() : util2.toString(obj);
        var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/;
        if (ruselessToString.test(str)) {
          try {
            var newStr = JSON.stringify(obj);
            str = newStr;
          } catch (e) {
          }
        }
        if (str.length === 0) {
          str = "(empty array)";
        }
      }
      return "(<" + snip(str) + ">, no stack trace)";
    }
    function snip(str) {
      var maxChars = 41;
      if (str.length < maxChars) {
        return str;
      }
      return str.substr(0, maxChars - 3) + "...";
    }
    function longStackTracesIsSupported() {
      return typeof captureStackTrace === "function";
    }
    var shouldIgnore = function() {
      return false;
    };
    var parseLineInfoRegex = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
    function parseLineInfo(line) {
      var matches = line.match(parseLineInfoRegex);
      if (matches) {
        return {
          fileName: matches[1],
          line: parseInt(matches[2], 10)
        };
      }
    }
    function setBounds(firstLineError, lastLineError) {
      if (!longStackTracesIsSupported()) return;
      var firstStackLines = (firstLineError.stack || "").split("\n");
      var lastStackLines = (lastLineError.stack || "").split("\n");
      var firstIndex = -1;
      var lastIndex = -1;
      var firstFileName;
      var lastFileName;
      for (var i = 0; i < firstStackLines.length; ++i) {
        var result = parseLineInfo(firstStackLines[i]);
        if (result) {
          firstFileName = result.fileName;
          firstIndex = result.line;
          break;
        }
      }
      for (var i = 0; i < lastStackLines.length; ++i) {
        var result = parseLineInfo(lastStackLines[i]);
        if (result) {
          lastFileName = result.fileName;
          lastIndex = result.line;
          break;
        }
      }
      if (firstIndex < 0 || lastIndex < 0 || !firstFileName || !lastFileName || firstFileName !== lastFileName || firstIndex >= lastIndex) {
        return;
      }
      shouldIgnore = function(line) {
        if (bluebirdFramePattern.test(line)) return true;
        var info = parseLineInfo(line);
        if (info) {
          if (info.fileName === firstFileName && (firstIndex <= info.line && info.line <= lastIndex)) {
            return true;
          }
        }
        return false;
      };
    }
    function CapturedTrace(parent) {
      this._parent = parent;
      this._promisesCreated = 0;
      var length = this._length = 1 + (parent === void 0 ? 0 : parent._length);
      captureStackTrace(this, CapturedTrace);
      if (length > 32) this.uncycle();
    }
    util2.inherits(CapturedTrace, Error);
    Context.CapturedTrace = CapturedTrace;
    CapturedTrace.prototype.uncycle = function() {
      var length = this._length;
      if (length < 2) return;
      var nodes = [];
      var stackToIndex = {};
      for (var i = 0, node = this; node !== void 0; ++i) {
        nodes.push(node);
        node = node._parent;
      }
      length = this._length = i;
      for (var i = length - 1; i >= 0; --i) {
        var stack = nodes[i].stack;
        if (stackToIndex[stack] === void 0) {
          stackToIndex[stack] = i;
        }
      }
      for (var i = 0; i < length; ++i) {
        var currentStack = nodes[i].stack;
        var index = stackToIndex[currentStack];
        if (index !== void 0 && index !== i) {
          if (index > 0) {
            nodes[index - 1]._parent = void 0;
            nodes[index - 1]._length = 1;
          }
          nodes[i]._parent = void 0;
          nodes[i]._length = 1;
          var cycleEdgeNode = i > 0 ? nodes[i - 1] : this;
          if (index < length - 1) {
            cycleEdgeNode._parent = nodes[index + 1];
            cycleEdgeNode._parent.uncycle();
            cycleEdgeNode._length = cycleEdgeNode._parent._length + 1;
          } else {
            cycleEdgeNode._parent = void 0;
            cycleEdgeNode._length = 1;
          }
          var currentChildLength = cycleEdgeNode._length + 1;
          for (var j = i - 2; j >= 0; --j) {
            nodes[j]._length = currentChildLength;
            currentChildLength++;
          }
          return;
        }
      }
    };
    CapturedTrace.prototype.attachExtraTrace = function(error) {
      if (error.__stackCleaned__) return;
      this.uncycle();
      var parsed = parseStackAndMessage(error);
      var message = parsed.message;
      var stacks = [parsed.stack];
      var trace = this;
      while (trace !== void 0) {
        stacks.push(cleanStack(trace.stack.split("\n")));
        trace = trace._parent;
      }
      removeCommonRoots(stacks);
      removeDuplicateOrEmptyJumps(stacks);
      util2.notEnumerableProp(error, "stack", reconstructStack(message, stacks));
      util2.notEnumerableProp(error, "__stackCleaned__", true);
    };
    var captureStackTrace = function stackDetection() {
      var v8stackFramePattern = /^\s*at\s*/;
      var v8stackFormatter = function(stack, error) {
        if (typeof stack === "string") return stack;
        if (error.name !== void 0 && error.message !== void 0) {
          return error.toString();
        }
        return formatNonError(error);
      };
      if (typeof Error.stackTraceLimit === "number" && typeof Error.captureStackTrace === "function") {
        Error.stackTraceLimit += 6;
        stackFramePattern = v8stackFramePattern;
        formatStack = v8stackFormatter;
        var captureStackTrace2 = Error.captureStackTrace;
        shouldIgnore = function(line) {
          return bluebirdFramePattern.test(line);
        };
        return function(receiver, ignoreUntil) {
          Error.stackTraceLimit += 6;
          captureStackTrace2(receiver, ignoreUntil);
          Error.stackTraceLimit -= 6;
        };
      }
      var err = new Error();
      if (typeof err.stack === "string" && err.stack.split("\n")[0].indexOf("stackDetection@") >= 0) {
        stackFramePattern = /@/;
        formatStack = v8stackFormatter;
        indentStackFrames = true;
        return function captureStackTrace3(o) {
          o.stack = new Error().stack;
        };
      }
      var hasStackAfterThrow;
      try {
        throw new Error();
      } catch (e) {
        hasStackAfterThrow = "stack" in e;
      }
      if (!("stack" in err) && hasStackAfterThrow && typeof Error.stackTraceLimit === "number") {
        stackFramePattern = v8stackFramePattern;
        formatStack = v8stackFormatter;
        return function captureStackTrace3(o) {
          Error.stackTraceLimit += 6;
          try {
            throw new Error();
          } catch (e) {
            o.stack = e.stack;
          }
          Error.stackTraceLimit -= 6;
        };
      }
      formatStack = function(stack, error) {
        if (typeof stack === "string") return stack;
        if ((typeof error === "object" || typeof error === "function") && error.name !== void 0 && error.message !== void 0) {
          return error.toString();
        }
        return formatNonError(error);
      };
      return null;
    }();
    if (typeof console !== "undefined" && typeof console.warn !== "undefined") {
      printWarning = function(message) {
        console.warn(message);
      };
      if (util2.isNode && process.stderr.isTTY) {
        printWarning = function(message, isSoft) {
          var color = isSoft ? "\x1B[33m" : "\x1B[31m";
          console.warn(color + message + "\x1B[0m\n");
        };
      } else if (!util2.isNode && typeof new Error().stack === "string") {
        printWarning = function(message, isSoft) {
          console.warn(
            "%c" + message,
            isSoft ? "color: darkorange" : "color: red"
          );
        };
      }
    }
    var config = {
      warnings,
      longStackTraces: false,
      cancellation: false,
      monitoring: false,
      asyncHooks: false
    };
    if (longStackTraces) Promise2.longStackTraces();
    return {
      asyncHooks: function() {
        return config.asyncHooks;
      },
      longStackTraces: function() {
        return config.longStackTraces;
      },
      warnings: function() {
        return config.warnings;
      },
      cancellation: function() {
        return config.cancellation;
      },
      monitoring: function() {
        return config.monitoring;
      },
      propagateFromFunction: function() {
        return propagateFromFunction;
      },
      boundValueFunction: function() {
        return boundValueFunction;
      },
      checkForgottenReturns,
      setBounds,
      warn,
      deprecated,
      CapturedTrace,
      fireDomEvent,
      fireGlobalEvent
    };
  };
  return debuggability;
}
var catch_filter;
var hasRequiredCatch_filter;
function requireCatch_filter() {
  if (hasRequiredCatch_filter) return catch_filter;
  hasRequiredCatch_filter = 1;
  catch_filter = function(NEXT_FILTER) {
    var util2 = requireUtil$1();
    var getKeys = requireEs5().keys;
    var tryCatch = util2.tryCatch;
    var errorObj = util2.errorObj;
    function catchFilter(instances, cb, promise2) {
      return function(e) {
        var boundTo = promise2._boundValue();
        predicateLoop: for (var i = 0; i < instances.length; ++i) {
          var item = instances[i];
          if (item === Error || item != null && item.prototype instanceof Error) {
            if (e instanceof item) {
              return tryCatch(cb).call(boundTo, e);
            }
          } else if (typeof item === "function") {
            var matchesPredicate = tryCatch(item).call(boundTo, e);
            if (matchesPredicate === errorObj) {
              return matchesPredicate;
            } else if (matchesPredicate) {
              return tryCatch(cb).call(boundTo, e);
            }
          } else if (util2.isObject(e)) {
            var keys = getKeys(item);
            for (var j = 0; j < keys.length; ++j) {
              var key = keys[j];
              if (item[key] != e[key]) {
                continue predicateLoop;
              }
            }
            return tryCatch(cb).call(boundTo, e);
          }
        }
        return NEXT_FILTER;
      };
    }
    return catchFilter;
  };
  return catch_filter;
}
var _finally;
var hasRequired_finally;
function require_finally() {
  if (hasRequired_finally) return _finally;
  hasRequired_finally = 1;
  _finally = function(Promise2, tryConvertToPromise, NEXT_FILTER) {
    var util2 = requireUtil$1();
    var CancellationError = Promise2.CancellationError;
    var errorObj = util2.errorObj;
    var catchFilter = requireCatch_filter()(NEXT_FILTER);
    function PassThroughHandlerContext(promise2, type, handler) {
      this.promise = promise2;
      this.type = type;
      this.handler = handler;
      this.called = false;
      this.cancelPromise = null;
    }
    PassThroughHandlerContext.prototype.isFinallyHandler = function() {
      return this.type === 0;
    };
    function FinallyHandlerCancelReaction(finallyHandler2) {
      this.finallyHandler = finallyHandler2;
    }
    FinallyHandlerCancelReaction.prototype._resultCancelled = function() {
      checkCancel(this.finallyHandler);
    };
    function checkCancel(ctx, reason) {
      if (ctx.cancelPromise != null) {
        if (arguments.length > 1) {
          ctx.cancelPromise._reject(reason);
        } else {
          ctx.cancelPromise._cancel();
        }
        ctx.cancelPromise = null;
        return true;
      }
      return false;
    }
    function succeed() {
      return finallyHandler.call(this, this.promise._target()._settledValue());
    }
    function fail(reason) {
      if (checkCancel(this, reason)) return;
      errorObj.e = reason;
      return errorObj;
    }
    function finallyHandler(reasonOrValue) {
      var promise2 = this.promise;
      var handler = this.handler;
      if (!this.called) {
        this.called = true;
        var ret = this.isFinallyHandler() ? handler.call(promise2._boundValue()) : handler.call(promise2._boundValue(), reasonOrValue);
        if (ret === NEXT_FILTER) {
          return ret;
        } else if (ret !== void 0) {
          promise2._setReturnedNonUndefined();
          var maybePromise = tryConvertToPromise(ret, promise2);
          if (maybePromise instanceof Promise2) {
            if (this.cancelPromise != null) {
              if (maybePromise._isCancelled()) {
                var reason = new CancellationError("late cancellation observer");
                promise2._attachExtraTrace(reason);
                errorObj.e = reason;
                return errorObj;
              } else if (maybePromise.isPending()) {
                maybePromise._attachCancellationCallback(
                  new FinallyHandlerCancelReaction(this)
                );
              }
            }
            return maybePromise._then(
              succeed,
              fail,
              void 0,
              this,
              void 0
            );
          }
        }
      }
      if (promise2.isRejected()) {
        checkCancel(this);
        errorObj.e = reasonOrValue;
        return errorObj;
      } else {
        checkCancel(this);
        return reasonOrValue;
      }
    }
    Promise2.prototype._passThrough = function(handler, type, success, fail2) {
      if (typeof handler !== "function") return this.then();
      return this._then(
        success,
        fail2,
        void 0,
        new PassThroughHandlerContext(this, type, handler),
        void 0
      );
    };
    Promise2.prototype.lastly = Promise2.prototype["finally"] = function(handler) {
      return this._passThrough(
        handler,
        0,
        finallyHandler,
        finallyHandler
      );
    };
    Promise2.prototype.tap = function(handler) {
      return this._passThrough(handler, 1, finallyHandler);
    };
    Promise2.prototype.tapCatch = function(handlerOrPredicate) {
      var len = arguments.length;
      if (len === 1) {
        return this._passThrough(
          handlerOrPredicate,
          1,
          void 0,
          finallyHandler
        );
      } else {
        var catchInstances = new Array(len - 1), j = 0, i;
        for (i = 0; i < len - 1; ++i) {
          var item = arguments[i];
          if (util2.isObject(item)) {
            catchInstances[j++] = item;
          } else {
            return Promise2.reject(new TypeError(
              "tapCatch statement predicate: expecting an object but got " + util2.classString(item)
            ));
          }
        }
        catchInstances.length = j;
        var handler = arguments[i];
        return this._passThrough(
          catchFilter(catchInstances, handler, this),
          1,
          void 0,
          finallyHandler
        );
      }
    };
    return PassThroughHandlerContext;
  };
  return _finally;
}
var nodeback;
var hasRequiredNodeback;
function requireNodeback() {
  if (hasRequiredNodeback) return nodeback;
  hasRequiredNodeback = 1;
  var util2 = requireUtil$1();
  var maybeWrapAsError = util2.maybeWrapAsError;
  var errors2 = requireErrors$1();
  var OperationalError = errors2.OperationalError;
  var es52 = requireEs5();
  function isUntypedError(obj) {
    return obj instanceof Error && es52.getPrototypeOf(obj) === Error.prototype;
  }
  var rErrorKey = /^(?:name|message|stack|cause)$/;
  function wrapAsOperationalError(obj) {
    var ret;
    if (isUntypedError(obj)) {
      ret = new OperationalError(obj);
      ret.name = obj.name;
      ret.message = obj.message;
      ret.stack = obj.stack;
      var keys = es52.keys(obj);
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        if (!rErrorKey.test(key)) {
          ret[key] = obj[key];
        }
      }
      return ret;
    }
    util2.markAsOriginatingFromRejection(obj);
    return obj;
  }
  function nodebackForPromise(promise2, multiArgs) {
    return function(err, value) {
      if (promise2 === null) return;
      if (err) {
        var wrapped = wrapAsOperationalError(maybeWrapAsError(err));
        promise2._attachExtraTrace(wrapped);
        promise2._reject(wrapped);
      } else if (!multiArgs) {
        promise2._fulfill(value);
      } else {
        var $_len = arguments.length;
        var args = new Array(Math.max($_len - 1, 0));
        for (var $_i = 1; $_i < $_len; ++$_i) {
          args[$_i - 1] = arguments[$_i];
        }
        promise2._fulfill(args);
      }
      promise2 = null;
    };
  }
  nodeback = nodebackForPromise;
  return nodeback;
}
var method;
var hasRequiredMethod;
function requireMethod() {
  if (hasRequiredMethod) return method;
  hasRequiredMethod = 1;
  method = function(Promise2, INTERNAL, tryConvertToPromise, apiRejection, debug) {
    var util2 = requireUtil$1();
    var tryCatch = util2.tryCatch;
    Promise2.method = function(fn) {
      if (typeof fn !== "function") {
        throw new Promise2.TypeError("expecting a function but got " + util2.classString(fn));
      }
      return function() {
        var ret = new Promise2(INTERNAL);
        ret._captureStackTrace();
        ret._pushContext();
        var value = tryCatch(fn).apply(this, arguments);
        var promiseCreated = ret._popContext();
        debug.checkForgottenReturns(
          value,
          promiseCreated,
          "Promise.method",
          ret
        );
        ret._resolveFromSyncValue(value);
        return ret;
      };
    };
    Promise2.attempt = Promise2["try"] = function(fn) {
      if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util2.classString(fn));
      }
      var ret = new Promise2(INTERNAL);
      ret._captureStackTrace();
      ret._pushContext();
      var value;
      if (arguments.length > 1) {
        debug.deprecated("calling Promise.try with more than 1 argument");
        var arg = arguments[1];
        var ctx = arguments[2];
        value = util2.isArray(arg) ? tryCatch(fn).apply(ctx, arg) : tryCatch(fn).call(ctx, arg);
      } else {
        value = tryCatch(fn)();
      }
      var promiseCreated = ret._popContext();
      debug.checkForgottenReturns(
        value,
        promiseCreated,
        "Promise.try",
        ret
      );
      ret._resolveFromSyncValue(value);
      return ret;
    };
    Promise2.prototype._resolveFromSyncValue = function(value) {
      if (value === util2.errorObj) {
        this._rejectCallback(value.e, false);
      } else {
        this._resolveCallback(value, true);
      }
    };
  };
  return method;
}
var bind;
var hasRequiredBind;
function requireBind() {
  if (hasRequiredBind) return bind;
  hasRequiredBind = 1;
  bind = function(Promise2, INTERNAL, tryConvertToPromise, debug) {
    var calledBind = false;
    var rejectThis = function(_, e) {
      this._reject(e);
    };
    var targetRejected = function(e, context2) {
      context2.promiseRejectionQueued = true;
      context2.bindingPromise._then(rejectThis, rejectThis, null, this, e);
    };
    var bindingResolved = function(thisArg, context2) {
      if ((this._bitField & 50397184) === 0) {
        this._resolveCallback(context2.target);
      }
    };
    var bindingRejected = function(e, context2) {
      if (!context2.promiseRejectionQueued) this._reject(e);
    };
    Promise2.prototype.bind = function(thisArg) {
      if (!calledBind) {
        calledBind = true;
        Promise2.prototype._propagateFrom = debug.propagateFromFunction();
        Promise2.prototype._boundValue = debug.boundValueFunction();
      }
      var maybePromise = tryConvertToPromise(thisArg);
      var ret = new Promise2(INTERNAL);
      ret._propagateFrom(this, 1);
      var target = this._target();
      ret._setBoundTo(maybePromise);
      if (maybePromise instanceof Promise2) {
        var context2 = {
          promiseRejectionQueued: false,
          promise: ret,
          target,
          bindingPromise: maybePromise
        };
        target._then(INTERNAL, targetRejected, void 0, ret, context2);
        maybePromise._then(
          bindingResolved,
          bindingRejected,
          void 0,
          ret,
          context2
        );
        ret._setOnCancel(maybePromise);
      } else {
        ret._resolveCallback(target);
      }
      return ret;
    };
    Promise2.prototype._setBoundTo = function(obj) {
      if (obj !== void 0) {
        this._bitField = this._bitField | 2097152;
        this._boundTo = obj;
      } else {
        this._bitField = this._bitField & -2097153;
      }
    };
    Promise2.prototype._isBound = function() {
      return (this._bitField & 2097152) === 2097152;
    };
    Promise2.bind = function(thisArg, value) {
      return Promise2.resolve(value).bind(thisArg);
    };
  };
  return bind;
}
var cancel;
var hasRequiredCancel;
function requireCancel() {
  if (hasRequiredCancel) return cancel;
  hasRequiredCancel = 1;
  cancel = function(Promise2, PromiseArray, apiRejection, debug) {
    var util2 = requireUtil$1();
    var tryCatch = util2.tryCatch;
    var errorObj = util2.errorObj;
    var async2 = Promise2._async;
    Promise2.prototype["break"] = Promise2.prototype.cancel = function() {
      if (!debug.cancellation()) return this._warn("cancellation is disabled");
      var promise2 = this;
      var child = promise2;
      while (promise2._isCancellable()) {
        if (!promise2._cancelBy(child)) {
          if (child._isFollowing()) {
            child._followee().cancel();
          } else {
            child._cancelBranched();
          }
          break;
        }
        var parent = promise2._cancellationParent;
        if (parent == null || !parent._isCancellable()) {
          if (promise2._isFollowing()) {
            promise2._followee().cancel();
          } else {
            promise2._cancelBranched();
          }
          break;
        } else {
          if (promise2._isFollowing()) promise2._followee().cancel();
          promise2._setWillBeCancelled();
          child = promise2;
          promise2 = parent;
        }
      }
    };
    Promise2.prototype._branchHasCancelled = function() {
      this._branchesRemainingToCancel--;
    };
    Promise2.prototype._enoughBranchesHaveCancelled = function() {
      return this._branchesRemainingToCancel === void 0 || this._branchesRemainingToCancel <= 0;
    };
    Promise2.prototype._cancelBy = function(canceller) {
      if (canceller === this) {
        this._branchesRemainingToCancel = 0;
        this._invokeOnCancel();
        return true;
      } else {
        this._branchHasCancelled();
        if (this._enoughBranchesHaveCancelled()) {
          this._invokeOnCancel();
          return true;
        }
      }
      return false;
    };
    Promise2.prototype._cancelBranched = function() {
      if (this._enoughBranchesHaveCancelled()) {
        this._cancel();
      }
    };
    Promise2.prototype._cancel = function() {
      if (!this._isCancellable()) return;
      this._setCancelled();
      async2.invoke(this._cancelPromises, this, void 0);
    };
    Promise2.prototype._cancelPromises = function() {
      if (this._length() > 0) this._settlePromises();
    };
    Promise2.prototype._unsetOnCancel = function() {
      this._onCancelField = void 0;
    };
    Promise2.prototype._isCancellable = function() {
      return this.isPending() && !this._isCancelled();
    };
    Promise2.prototype.isCancellable = function() {
      return this.isPending() && !this.isCancelled();
    };
    Promise2.prototype._doInvokeOnCancel = function(onCancelCallback, internalOnly) {
      if (util2.isArray(onCancelCallback)) {
        for (var i = 0; i < onCancelCallback.length; ++i) {
          this._doInvokeOnCancel(onCancelCallback[i], internalOnly);
        }
      } else if (onCancelCallback !== void 0) {
        if (typeof onCancelCallback === "function") {
          if (!internalOnly) {
            var e = tryCatch(onCancelCallback).call(this._boundValue());
            if (e === errorObj) {
              this._attachExtraTrace(e.e);
              async2.throwLater(e.e);
            }
          }
        } else {
          onCancelCallback._resultCancelled(this);
        }
      }
    };
    Promise2.prototype._invokeOnCancel = function() {
      var onCancelCallback = this._onCancel();
      this._unsetOnCancel();
      async2.invoke(this._doInvokeOnCancel, this, onCancelCallback);
    };
    Promise2.prototype._invokeInternalOnCancel = function() {
      if (this._isCancellable()) {
        this._doInvokeOnCancel(this._onCancel(), true);
        this._unsetOnCancel();
      }
    };
    Promise2.prototype._resultCancelled = function() {
      this.cancel();
    };
  };
  return cancel;
}
var direct_resolve;
var hasRequiredDirect_resolve;
function requireDirect_resolve() {
  if (hasRequiredDirect_resolve) return direct_resolve;
  hasRequiredDirect_resolve = 1;
  direct_resolve = function(Promise2) {
    function returner() {
      return this.value;
    }
    function thrower() {
      throw this.reason;
    }
    Promise2.prototype["return"] = Promise2.prototype.thenReturn = function(value) {
      if (value instanceof Promise2) value.suppressUnhandledRejections();
      return this._then(
        returner,
        void 0,
        void 0,
        { value },
        void 0
      );
    };
    Promise2.prototype["throw"] = Promise2.prototype.thenThrow = function(reason) {
      return this._then(
        thrower,
        void 0,
        void 0,
        { reason },
        void 0
      );
    };
    Promise2.prototype.catchThrow = function(reason) {
      if (arguments.length <= 1) {
        return this._then(
          void 0,
          thrower,
          void 0,
          { reason },
          void 0
        );
      } else {
        var _reason = arguments[1];
        var handler = function() {
          throw _reason;
        };
        return this.caught(reason, handler);
      }
    };
    Promise2.prototype.catchReturn = function(value) {
      if (arguments.length <= 1) {
        if (value instanceof Promise2) value.suppressUnhandledRejections();
        return this._then(
          void 0,
          returner,
          void 0,
          { value },
          void 0
        );
      } else {
        var _value = arguments[1];
        if (_value instanceof Promise2) _value.suppressUnhandledRejections();
        var handler = function() {
          return _value;
        };
        return this.caught(value, handler);
      }
    };
  };
  return direct_resolve;
}
var synchronous_inspection;
var hasRequiredSynchronous_inspection;
function requireSynchronous_inspection() {
  if (hasRequiredSynchronous_inspection) return synchronous_inspection;
  hasRequiredSynchronous_inspection = 1;
  synchronous_inspection = function(Promise2) {
    function PromiseInspection(promise2) {
      if (promise2 !== void 0) {
        promise2 = promise2._target();
        this._bitField = promise2._bitField;
        this._settledValueField = promise2._isFateSealed() ? promise2._settledValue() : void 0;
      } else {
        this._bitField = 0;
        this._settledValueField = void 0;
      }
    }
    PromiseInspection.prototype._settledValue = function() {
      return this._settledValueField;
    };
    var value = PromiseInspection.prototype.value = function() {
      if (!this.isFulfilled()) {
        throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n");
      }
      return this._settledValue();
    };
    var reason = PromiseInspection.prototype.error = PromiseInspection.prototype.reason = function() {
      if (!this.isRejected()) {
        throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n");
      }
      return this._settledValue();
    };
    var isFulfilled = PromiseInspection.prototype.isFulfilled = function() {
      return (this._bitField & 33554432) !== 0;
    };
    var isRejected = PromiseInspection.prototype.isRejected = function() {
      return (this._bitField & 16777216) !== 0;
    };
    var isPending = PromiseInspection.prototype.isPending = function() {
      return (this._bitField & 50397184) === 0;
    };
    var isResolved = PromiseInspection.prototype.isResolved = function() {
      return (this._bitField & 50331648) !== 0;
    };
    PromiseInspection.prototype.isCancelled = function() {
      return (this._bitField & 8454144) !== 0;
    };
    Promise2.prototype.__isCancelled = function() {
      return (this._bitField & 65536) === 65536;
    };
    Promise2.prototype._isCancelled = function() {
      return this._target().__isCancelled();
    };
    Promise2.prototype.isCancelled = function() {
      return (this._target()._bitField & 8454144) !== 0;
    };
    Promise2.prototype.isPending = function() {
      return isPending.call(this._target());
    };
    Promise2.prototype.isRejected = function() {
      return isRejected.call(this._target());
    };
    Promise2.prototype.isFulfilled = function() {
      return isFulfilled.call(this._target());
    };
    Promise2.prototype.isResolved = function() {
      return isResolved.call(this._target());
    };
    Promise2.prototype.value = function() {
      return value.call(this._target());
    };
    Promise2.prototype.reason = function() {
      var target = this._target();
      target._unsetRejectionIsUnhandled();
      return reason.call(target);
    };
    Promise2.prototype._value = function() {
      return this._settledValue();
    };
    Promise2.prototype._reason = function() {
      this._unsetRejectionIsUnhandled();
      return this._settledValue();
    };
    Promise2.PromiseInspection = PromiseInspection;
  };
  return synchronous_inspection;
}
var join;
var hasRequiredJoin;
function requireJoin() {
  if (hasRequiredJoin) return join;
  hasRequiredJoin = 1;
  join = function(Promise2, PromiseArray, tryConvertToPromise, INTERNAL, async2) {
    var util2 = requireUtil$1();
    var canEvaluate = util2.canEvaluate;
    var tryCatch = util2.tryCatch;
    var errorObj = util2.errorObj;
    var reject;
    {
      if (canEvaluate) {
        var thenCallback = function(i2) {
          return new Function("value", "holder", "                             \n	            'use strict';                                                    \n	            holder.pIndex = value;                                           \n	            holder.checkFulfillment(this);                                   \n	            ".replace(/Index/g, i2));
        };
        var promiseSetter = function(i2) {
          return new Function("promise", "holder", "                           \n	            'use strict';                                                    \n	            holder.pIndex = promise;                                         \n	            ".replace(/Index/g, i2));
        };
        var generateHolderClass = function(total) {
          var props2 = new Array(total);
          for (var i2 = 0; i2 < props2.length; ++i2) {
            props2[i2] = "this.p" + (i2 + 1);
          }
          var assignment = props2.join(" = ") + " = null;";
          var cancellationCode = "var promise;\n" + props2.map(function(prop) {
            return "                                                         \n	                promise = " + prop + ";                                      \n	                if (promise instanceof Promise) {                            \n	                    promise.cancel();                                        \n	                }                                                            \n	            ";
          }).join("\n");
          var passedArguments = props2.join(", ");
          var name = "Holder$" + total;
          var code = "return function(tryCatch, errorObj, Promise, async) {    \n	            'use strict';                                                    \n	            function [TheName](fn) {                                         \n	                [TheProperties]                                              \n	                this.fn = fn;                                                \n	                this.asyncNeeded = true;                                     \n	                this.now = 0;                                                \n	            }                                                                \n	                                                                             \n	            [TheName].prototype._callFunction = function(promise) {          \n	                promise._pushContext();                                      \n	                var ret = tryCatch(this.fn)([ThePassedArguments]);           \n	                promise._popContext();                                       \n	                if (ret === errorObj) {                                      \n	                    promise._rejectCallback(ret.e, false);                   \n	                } else {                                                     \n	                    promise._resolveCallback(ret);                           \n	                }                                                            \n	            };                                                               \n	                                                                             \n	            [TheName].prototype.checkFulfillment = function(promise) {       \n	                var now = ++this.now;                                        \n	                if (now === [TheTotal]) {                                    \n	                    if (this.asyncNeeded) {                                  \n	                        async.invoke(this._callFunction, this, promise);     \n	                    } else {                                                 \n	                        this._callFunction(promise);                         \n	                    }                                                        \n	                                                                             \n	                }                                                            \n	            };                                                               \n	                                                                             \n	            [TheName].prototype._resultCancelled = function() {              \n	                [CancellationCode]                                           \n	            };                                                               \n	                                                                             \n	            return [TheName];                                                \n	        }(tryCatch, errorObj, Promise, async);                               \n	        ";
          code = code.replace(/\[TheName\]/g, name).replace(/\[TheTotal\]/g, total).replace(/\[ThePassedArguments\]/g, passedArguments).replace(/\[TheProperties\]/g, assignment).replace(/\[CancellationCode\]/g, cancellationCode);
          return new Function("tryCatch", "errorObj", "Promise", "async", code)(tryCatch, errorObj, Promise2, async2);
        };
        var holderClasses = [];
        var thenCallbacks = [];
        var promiseSetters = [];
        for (var i = 0; i < 8; ++i) {
          holderClasses.push(generateHolderClass(i + 1));
          thenCallbacks.push(thenCallback(i + 1));
          promiseSetters.push(promiseSetter(i + 1));
        }
        reject = function(reason) {
          this._reject(reason);
        };
      }
    }
    Promise2.join = function() {
      var last = arguments.length - 1;
      var fn;
      if (last > 0 && typeof arguments[last] === "function") {
        fn = arguments[last];
        {
          if (last <= 8 && canEvaluate) {
            var ret = new Promise2(INTERNAL);
            ret._captureStackTrace();
            var HolderClass = holderClasses[last - 1];
            var holder = new HolderClass(fn);
            var callbacks = thenCallbacks;
            for (var i2 = 0; i2 < last; ++i2) {
              var maybePromise = tryConvertToPromise(arguments[i2], ret);
              if (maybePromise instanceof Promise2) {
                maybePromise = maybePromise._target();
                var bitField = maybePromise._bitField;
                if ((bitField & 50397184) === 0) {
                  maybePromise._then(
                    callbacks[i2],
                    reject,
                    void 0,
                    ret,
                    holder
                  );
                  promiseSetters[i2](maybePromise, holder);
                  holder.asyncNeeded = false;
                } else if ((bitField & 33554432) !== 0) {
                  callbacks[i2].call(
                    ret,
                    maybePromise._value(),
                    holder
                  );
                } else if ((bitField & 16777216) !== 0) {
                  ret._reject(maybePromise._reason());
                } else {
                  ret._cancel();
                }
              } else {
                callbacks[i2].call(ret, maybePromise, holder);
              }
            }
            if (!ret._isFateSealed()) {
              if (holder.asyncNeeded) {
                var context2 = Promise2._getContext();
                holder.fn = util2.contextBind(context2, holder.fn);
              }
              ret._setAsyncGuaranteed();
              ret._setOnCancel(holder);
            }
            return ret;
          }
        }
      }
      var $_len = arguments.length;
      var args = new Array($_len);
      for (var $_i = 0; $_i < $_len; ++$_i) {
        args[$_i] = arguments[$_i];
      }
      if (fn) args.pop();
      var ret = new PromiseArray(args).promise();
      return fn !== void 0 ? ret.spread(fn) : ret;
    };
  };
  return join;
}
var call_get;
var hasRequiredCall_get;
function requireCall_get() {
  if (hasRequiredCall_get) return call_get;
  hasRequiredCall_get = 1;
  var cr = Object.create;
  if (cr) {
    var callerCache = cr(null);
    var getterCache = cr(null);
    callerCache[" size"] = getterCache[" size"] = 0;
  }
  call_get = function(Promise2) {
    var util2 = requireUtil$1();
    var canEvaluate = util2.canEvaluate;
    var isIdentifier = util2.isIdentifier;
    var getMethodCaller;
    var getGetter;
    {
      var makeMethodCaller = function(methodName) {
        return new Function("ensureMethod", "                                    \n	        return function(obj) {                                               \n	            'use strict'                                                     \n	            var len = this.length;                                           \n	            ensureMethod(obj, 'methodName');                                 \n	            switch(len) {                                                    \n	                case 1: return obj.methodName(this[0]);                      \n	                case 2: return obj.methodName(this[0], this[1]);             \n	                case 3: return obj.methodName(this[0], this[1], this[2]);    \n	                case 0: return obj.methodName();                             \n	                default:                                                     \n	                    return obj.methodName.apply(obj, this);                  \n	            }                                                                \n	        };                                                                   \n	        ".replace(/methodName/g, methodName))(ensureMethod);
      };
      var makeGetter = function(propertyName) {
        return new Function("obj", "                                             \n	        'use strict';                                                        \n	        return obj.propertyName;                                             \n	        ".replace("propertyName", propertyName));
      };
      var getCompiled = function(name, compiler, cache) {
        var ret = cache[name];
        if (typeof ret !== "function") {
          if (!isIdentifier(name)) {
            return null;
          }
          ret = compiler(name);
          cache[name] = ret;
          cache[" size"]++;
          if (cache[" size"] > 512) {
            var keys = Object.keys(cache);
            for (var i = 0; i < 256; ++i) delete cache[keys[i]];
            cache[" size"] = keys.length - 256;
          }
        }
        return ret;
      };
      getMethodCaller = function(name) {
        return getCompiled(name, makeMethodCaller, callerCache);
      };
      getGetter = function(name) {
        return getCompiled(name, makeGetter, getterCache);
      };
    }
    function ensureMethod(obj, methodName) {
      var fn;
      if (obj != null) fn = obj[methodName];
      if (typeof fn !== "function") {
        var message = "Object " + util2.classString(obj) + " has no method '" + util2.toString(methodName) + "'";
        throw new Promise2.TypeError(message);
      }
      return fn;
    }
    function caller(obj) {
      var methodName = this.pop();
      var fn = ensureMethod(obj, methodName);
      return fn.apply(obj, this);
    }
    Promise2.prototype.call = function(methodName) {
      var $_len = arguments.length;
      var args = new Array(Math.max($_len - 1, 0));
      for (var $_i = 1; $_i < $_len; ++$_i) {
        args[$_i - 1] = arguments[$_i];
      }
      {
        if (canEvaluate) {
          var maybeCaller = getMethodCaller(methodName);
          if (maybeCaller !== null) {
            return this._then(
              maybeCaller,
              void 0,
              void 0,
              args,
              void 0
            );
          }
        }
      }
      args.push(methodName);
      return this._then(caller, void 0, void 0, args, void 0);
    };
    function namedGetter(obj) {
      return obj[this];
    }
    function indexedGetter(obj) {
      var index = +this;
      if (index < 0) index = Math.max(0, index + obj.length);
      return obj[index];
    }
    Promise2.prototype.get = function(propertyName) {
      var isIndex = typeof propertyName === "number";
      var getter;
      if (!isIndex) {
        if (canEvaluate) {
          var maybeGetter = getGetter(propertyName);
          getter = maybeGetter !== null ? maybeGetter : namedGetter;
        } else {
          getter = namedGetter;
        }
      } else {
        getter = indexedGetter;
      }
      return this._then(getter, void 0, void 0, propertyName, void 0);
    };
  };
  return call_get;
}
var generators;
var hasRequiredGenerators;
function requireGenerators() {
  if (hasRequiredGenerators) return generators;
  hasRequiredGenerators = 1;
  generators = function(Promise2, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug) {
    var errors2 = requireErrors$1();
    var TypeError2 = errors2.TypeError;
    var util2 = requireUtil$1();
    var errorObj = util2.errorObj;
    var tryCatch = util2.tryCatch;
    var yieldHandlers = [];
    function promiseFromYieldHandler(value, yieldHandlers2, traceParent) {
      for (var i = 0; i < yieldHandlers2.length; ++i) {
        traceParent._pushContext();
        var result = tryCatch(yieldHandlers2[i])(value);
        traceParent._popContext();
        if (result === errorObj) {
          traceParent._pushContext();
          var ret = Promise2.reject(errorObj.e);
          traceParent._popContext();
          return ret;
        }
        var maybePromise = tryConvertToPromise(result, traceParent);
        if (maybePromise instanceof Promise2) return maybePromise;
      }
      return null;
    }
    function PromiseSpawn(generatorFunction, receiver, yieldHandler, stack) {
      if (debug.cancellation()) {
        var internal = new Promise2(INTERNAL);
        var _finallyPromise = this._finallyPromise = new Promise2(INTERNAL);
        this._promise = internal.lastly(function() {
          return _finallyPromise;
        });
        internal._captureStackTrace();
        internal._setOnCancel(this);
      } else {
        var promise2 = this._promise = new Promise2(INTERNAL);
        promise2._captureStackTrace();
      }
      this._stack = stack;
      this._generatorFunction = generatorFunction;
      this._receiver = receiver;
      this._generator = void 0;
      this._yieldHandlers = typeof yieldHandler === "function" ? [yieldHandler].concat(yieldHandlers) : yieldHandlers;
      this._yieldedPromise = null;
      this._cancellationPhase = false;
    }
    util2.inherits(PromiseSpawn, Proxyable);
    PromiseSpawn.prototype._isResolved = function() {
      return this._promise === null;
    };
    PromiseSpawn.prototype._cleanup = function() {
      this._promise = this._generator = null;
      if (debug.cancellation() && this._finallyPromise !== null) {
        this._finallyPromise._fulfill();
        this._finallyPromise = null;
      }
    };
    PromiseSpawn.prototype._promiseCancelled = function() {
      if (this._isResolved()) return;
      var implementsReturn = typeof this._generator["return"] !== "undefined";
      var result;
      if (!implementsReturn) {
        var reason = new Promise2.CancellationError(
          "generator .return() sentinel"
        );
        Promise2.coroutine.returnSentinel = reason;
        this._promise._attachExtraTrace(reason);
        this._promise._pushContext();
        result = tryCatch(this._generator["throw"]).call(
          this._generator,
          reason
        );
        this._promise._popContext();
      } else {
        this._promise._pushContext();
        result = tryCatch(this._generator["return"]).call(
          this._generator,
          void 0
        );
        this._promise._popContext();
      }
      this._cancellationPhase = true;
      this._yieldedPromise = null;
      this._continue(result);
    };
    PromiseSpawn.prototype._promiseFulfilled = function(value) {
      this._yieldedPromise = null;
      this._promise._pushContext();
      var result = tryCatch(this._generator.next).call(this._generator, value);
      this._promise._popContext();
      this._continue(result);
    };
    PromiseSpawn.prototype._promiseRejected = function(reason) {
      this._yieldedPromise = null;
      this._promise._attachExtraTrace(reason);
      this._promise._pushContext();
      var result = tryCatch(this._generator["throw"]).call(this._generator, reason);
      this._promise._popContext();
      this._continue(result);
    };
    PromiseSpawn.prototype._resultCancelled = function() {
      if (this._yieldedPromise instanceof Promise2) {
        var promise2 = this._yieldedPromise;
        this._yieldedPromise = null;
        promise2.cancel();
      }
    };
    PromiseSpawn.prototype.promise = function() {
      return this._promise;
    };
    PromiseSpawn.prototype._run = function() {
      this._generator = this._generatorFunction.call(this._receiver);
      this._receiver = this._generatorFunction = void 0;
      this._promiseFulfilled(void 0);
    };
    PromiseSpawn.prototype._continue = function(result) {
      var promise2 = this._promise;
      if (result === errorObj) {
        this._cleanup();
        if (this._cancellationPhase) {
          return promise2.cancel();
        } else {
          return promise2._rejectCallback(result.e, false);
        }
      }
      var value = result.value;
      if (result.done === true) {
        this._cleanup();
        if (this._cancellationPhase) {
          return promise2.cancel();
        } else {
          return promise2._resolveCallback(value);
        }
      } else {
        var maybePromise = tryConvertToPromise(value, this._promise);
        if (!(maybePromise instanceof Promise2)) {
          maybePromise = promiseFromYieldHandler(
            maybePromise,
            this._yieldHandlers,
            this._promise
          );
          if (maybePromise === null) {
            this._promiseRejected(
              new TypeError2(
                "A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/MqrFmX\n\n".replace("%s", String(value)) + "From coroutine:\n" + this._stack.split("\n").slice(1, -7).join("\n")
              )
            );
            return;
          }
        }
        maybePromise = maybePromise._target();
        var bitField = maybePromise._bitField;
        if ((bitField & 50397184) === 0) {
          this._yieldedPromise = maybePromise;
          maybePromise._proxy(this, null);
        } else if ((bitField & 33554432) !== 0) {
          Promise2._async.invoke(
            this._promiseFulfilled,
            this,
            maybePromise._value()
          );
        } else if ((bitField & 16777216) !== 0) {
          Promise2._async.invoke(
            this._promiseRejected,
            this,
            maybePromise._reason()
          );
        } else {
          this._promiseCancelled();
        }
      }
    };
    Promise2.coroutine = function(generatorFunction, options) {
      if (typeof generatorFunction !== "function") {
        throw new TypeError2("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
      }
      var yieldHandler = Object(options).yieldHandler;
      var PromiseSpawn$ = PromiseSpawn;
      var stack = new Error().stack;
      return function() {
        var generator = generatorFunction.apply(this, arguments);
        var spawn = new PromiseSpawn$(
          void 0,
          void 0,
          yieldHandler,
          stack
        );
        var ret = spawn.promise();
        spawn._generator = generator;
        spawn._promiseFulfilled(void 0);
        return ret;
      };
    };
    Promise2.coroutine.addYieldHandler = function(fn) {
      if (typeof fn !== "function") {
        throw new TypeError2("expecting a function but got " + util2.classString(fn));
      }
      yieldHandlers.push(fn);
    };
    Promise2.spawn = function(generatorFunction) {
      debug.deprecated("Promise.spawn()", "Promise.coroutine()");
      if (typeof generatorFunction !== "function") {
        return apiRejection("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
      }
      var spawn = new PromiseSpawn(generatorFunction, this);
      var ret = spawn.promise();
      spawn._run(Promise2.spawn);
      return ret;
    };
  };
  return generators;
}
var map;
var hasRequiredMap;
function requireMap() {
  if (hasRequiredMap) return map;
  hasRequiredMap = 1;
  map = function(Promise2, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug) {
    var util2 = requireUtil$1();
    var tryCatch = util2.tryCatch;
    var errorObj = util2.errorObj;
    var async2 = Promise2._async;
    function MappingPromiseArray(promises, fn, limit, _filter) {
      this.constructor$(promises);
      this._promise._captureStackTrace();
      var context2 = Promise2._getContext();
      this._callback = util2.contextBind(context2, fn);
      this._preservedValues = _filter === INTERNAL ? new Array(this.length()) : null;
      this._limit = limit;
      this._inFlight = 0;
      this._queue = [];
      async2.invoke(this._asyncInit, this, void 0);
      if (util2.isArray(promises)) {
        for (var i = 0; i < promises.length; ++i) {
          var maybePromise = promises[i];
          if (maybePromise instanceof Promise2) {
            maybePromise.suppressUnhandledRejections();
          }
        }
      }
    }
    util2.inherits(MappingPromiseArray, PromiseArray);
    MappingPromiseArray.prototype._asyncInit = function() {
      this._init$(void 0, -2);
    };
    MappingPromiseArray.prototype._init = function() {
    };
    MappingPromiseArray.prototype._promiseFulfilled = function(value, index) {
      var values = this._values;
      var length = this.length();
      var preservedValues = this._preservedValues;
      var limit = this._limit;
      if (index < 0) {
        index = index * -1 - 1;
        values[index] = value;
        if (limit >= 1) {
          this._inFlight--;
          this._drainQueue();
          if (this._isResolved()) return true;
        }
      } else {
        if (limit >= 1 && this._inFlight >= limit) {
          values[index] = value;
          this._queue.push(index);
          return false;
        }
        if (preservedValues !== null) preservedValues[index] = value;
        var promise2 = this._promise;
        var callback = this._callback;
        var receiver = promise2._boundValue();
        promise2._pushContext();
        var ret = tryCatch(callback).call(receiver, value, index, length);
        var promiseCreated = promise2._popContext();
        debug.checkForgottenReturns(
          ret,
          promiseCreated,
          preservedValues !== null ? "Promise.filter" : "Promise.map",
          promise2
        );
        if (ret === errorObj) {
          this._reject(ret.e);
          return true;
        }
        var maybePromise = tryConvertToPromise(ret, this._promise);
        if (maybePromise instanceof Promise2) {
          maybePromise = maybePromise._target();
          var bitField = maybePromise._bitField;
          if ((bitField & 50397184) === 0) {
            if (limit >= 1) this._inFlight++;
            values[index] = maybePromise;
            maybePromise._proxy(this, (index + 1) * -1);
            return false;
          } else if ((bitField & 33554432) !== 0) {
            ret = maybePromise._value();
          } else if ((bitField & 16777216) !== 0) {
            this._reject(maybePromise._reason());
            return true;
          } else {
            this._cancel();
            return true;
          }
        }
        values[index] = ret;
      }
      var totalResolved = ++this._totalResolved;
      if (totalResolved >= length) {
        if (preservedValues !== null) {
          this._filter(values, preservedValues);
        } else {
          this._resolve(values);
        }
        return true;
      }
      return false;
    };
    MappingPromiseArray.prototype._drainQueue = function() {
      var queue2 = this._queue;
      var limit = this._limit;
      var values = this._values;
      while (queue2.length > 0 && this._inFlight < limit) {
        if (this._isResolved()) return;
        var index = queue2.pop();
        this._promiseFulfilled(values[index], index);
      }
    };
    MappingPromiseArray.prototype._filter = function(booleans, values) {
      var len = values.length;
      var ret = new Array(len);
      var j = 0;
      for (var i = 0; i < len; ++i) {
        if (booleans[i]) ret[j++] = values[i];
      }
      ret.length = j;
      this._resolve(ret);
    };
    MappingPromiseArray.prototype.preservedValues = function() {
      return this._preservedValues;
    };
    function map2(promises, fn, options, _filter) {
      if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util2.classString(fn));
      }
      var limit = 0;
      if (options !== void 0) {
        if (typeof options === "object" && options !== null) {
          if (typeof options.concurrency !== "number") {
            return Promise2.reject(
              new TypeError("'concurrency' must be a number but it is " + util2.classString(options.concurrency))
            );
          }
          limit = options.concurrency;
        } else {
          return Promise2.reject(new TypeError(
            "options argument must be an object but it is " + util2.classString(options)
          ));
        }
      }
      limit = typeof limit === "number" && isFinite(limit) && limit >= 1 ? limit : 0;
      return new MappingPromiseArray(promises, fn, limit, _filter).promise();
    }
    Promise2.prototype.map = function(fn, options) {
      return map2(this, fn, options, null);
    };
    Promise2.map = function(promises, fn, options, _filter) {
      return map2(promises, fn, options, _filter);
    };
  };
  return map;
}
var nodeify;
var hasRequiredNodeify;
function requireNodeify() {
  if (hasRequiredNodeify) return nodeify;
  hasRequiredNodeify = 1;
  nodeify = function(Promise2) {
    var util2 = requireUtil$1();
    var async2 = Promise2._async;
    var tryCatch = util2.tryCatch;
    var errorObj = util2.errorObj;
    function spreadAdapter(val, nodeback2) {
      var promise2 = this;
      if (!util2.isArray(val)) return successAdapter.call(promise2, val, nodeback2);
      var ret = tryCatch(nodeback2).apply(promise2._boundValue(), [null].concat(val));
      if (ret === errorObj) {
        async2.throwLater(ret.e);
      }
    }
    function successAdapter(val, nodeback2) {
      var promise2 = this;
      var receiver = promise2._boundValue();
      var ret = val === void 0 ? tryCatch(nodeback2).call(receiver, null) : tryCatch(nodeback2).call(receiver, null, val);
      if (ret === errorObj) {
        async2.throwLater(ret.e);
      }
    }
    function errorAdapter(reason, nodeback2) {
      var promise2 = this;
      if (!reason) {
        var newReason = new Error(reason + "");
        newReason.cause = reason;
        reason = newReason;
      }
      var ret = tryCatch(nodeback2).call(promise2._boundValue(), reason);
      if (ret === errorObj) {
        async2.throwLater(ret.e);
      }
    }
    Promise2.prototype.asCallback = Promise2.prototype.nodeify = function(nodeback2, options) {
      if (typeof nodeback2 == "function") {
        var adapter = successAdapter;
        if (options !== void 0 && Object(options).spread) {
          adapter = spreadAdapter;
        }
        this._then(
          adapter,
          errorAdapter,
          void 0,
          this,
          nodeback2
        );
      }
      return this;
    };
  };
  return nodeify;
}
var promisify;
var hasRequiredPromisify;
function requirePromisify() {
  if (hasRequiredPromisify) return promisify;
  hasRequiredPromisify = 1;
  promisify = function(Promise2, INTERNAL) {
    var THIS = {};
    var util2 = requireUtil$1();
    var nodebackForPromise = requireNodeback();
    var withAppended = util2.withAppended;
    var maybeWrapAsError = util2.maybeWrapAsError;
    var canEvaluate = util2.canEvaluate;
    var TypeError2 = requireErrors$1().TypeError;
    var defaultSuffix = "Async";
    var defaultPromisified = { __isPromisified__: true };
    var noCopyProps = [
      "arity",
      "length",
      "name",
      "arguments",
      "caller",
      "callee",
      "prototype",
      "__isPromisified__"
    ];
    var noCopyPropsPattern = new RegExp("^(?:" + noCopyProps.join("|") + ")$");
    var defaultFilter = function(name) {
      return util2.isIdentifier(name) && name.charAt(0) !== "_" && name !== "constructor";
    };
    function propsFilter(key) {
      return !noCopyPropsPattern.test(key);
    }
    function isPromisified(fn) {
      try {
        return fn.__isPromisified__ === true;
      } catch (e) {
        return false;
      }
    }
    function hasPromisified(obj, key, suffix) {
      var val = util2.getDataPropertyOrDefault(
        obj,
        key + suffix,
        defaultPromisified
      );
      return val ? isPromisified(val) : false;
    }
    function checkValid(ret, suffix, suffixRegexp) {
      for (var i = 0; i < ret.length; i += 2) {
        var key = ret[i];
        if (suffixRegexp.test(key)) {
          var keyWithoutAsyncSuffix = key.replace(suffixRegexp, "");
          for (var j = 0; j < ret.length; j += 2) {
            if (ret[j] === keyWithoutAsyncSuffix) {
              throw new TypeError2("Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/MqrFmX\n".replace("%s", suffix));
            }
          }
        }
      }
    }
    function promisifiableMethods(obj, suffix, suffixRegexp, filter2) {
      var keys = util2.inheritedDataKeys(obj);
      var ret = [];
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var value = obj[key];
        var passesDefaultFilter = filter2 === defaultFilter ? true : defaultFilter(key);
        if (typeof value === "function" && !isPromisified(value) && !hasPromisified(obj, key, suffix) && filter2(key, value, obj, passesDefaultFilter)) {
          ret.push(key, value);
        }
      }
      checkValid(ret, suffix, suffixRegexp);
      return ret;
    }
    var escapeIdentRegex = function(str) {
      return str.replace(/([$])/, "\\$");
    };
    var makeNodePromisifiedEval;
    {
      var switchCaseArgumentOrder = function(likelyArgumentCount) {
        var ret = [likelyArgumentCount];
        var min = Math.max(0, likelyArgumentCount - 1 - 3);
        for (var i = likelyArgumentCount - 1; i >= min; --i) {
          ret.push(i);
        }
        for (var i = likelyArgumentCount + 1; i <= 3; ++i) {
          ret.push(i);
        }
        return ret;
      };
      var argumentSequence = function(argumentCount) {
        return util2.filledRange(argumentCount, "_arg", "");
      };
      var parameterDeclaration = function(parameterCount2) {
        return util2.filledRange(
          Math.max(parameterCount2, 3),
          "_arg",
          ""
        );
      };
      var parameterCount = function(fn) {
        if (typeof fn.length === "number") {
          return Math.max(Math.min(fn.length, 1023 + 1), 0);
        }
        return 0;
      };
      makeNodePromisifiedEval = function(callback, receiver, originalName, fn, _, multiArgs) {
        var newParameterCount = Math.max(0, parameterCount(fn) - 1);
        var argumentOrder = switchCaseArgumentOrder(newParameterCount);
        var shouldProxyThis = typeof callback === "string" || receiver === THIS;
        function generateCallForArgumentCount(count) {
          var args = argumentSequence(count).join(", ");
          var comma = count > 0 ? ", " : "";
          var ret;
          if (shouldProxyThis) {
            ret = "ret = callback.call(this, {{args}}, nodeback); break;\n";
          } else {
            ret = receiver === void 0 ? "ret = callback({{args}}, nodeback); break;\n" : "ret = callback.call(receiver, {{args}}, nodeback); break;\n";
          }
          return ret.replace("{{args}}", args).replace(", ", comma);
        }
        function generateArgumentSwitchCase() {
          var ret = "";
          for (var i = 0; i < argumentOrder.length; ++i) {
            ret += "case " + argumentOrder[i] + ":" + generateCallForArgumentCount(argumentOrder[i]);
          }
          ret += "                                                             \n	        default:                                                             \n	            var args = new Array(len + 1);                                   \n	            var i = 0;                                                       \n	            for (var i = 0; i < len; ++i) {                                  \n	               args[i] = arguments[i];                                       \n	            }                                                                \n	            args[i] = nodeback;                                              \n	            [CodeForCall]                                                    \n	            break;                                                           \n	        ".replace("[CodeForCall]", shouldProxyThis ? "ret = callback.apply(this, args);\n" : "ret = callback.apply(receiver, args);\n");
          return ret;
        }
        var getFunctionCode = typeof callback === "string" ? "this != null ? this['" + callback + "'] : fn" : "fn";
        var body = "'use strict';                                                \n	        var ret = function (Parameters) {                                    \n	            'use strict';                                                    \n	            var len = arguments.length;                                      \n	            var promise = new Promise(INTERNAL);                             \n	            promise._captureStackTrace();                                    \n	            var nodeback = nodebackForPromise(promise, " + multiArgs + ");   \n	            var ret;                                                         \n	            var callback = tryCatch([GetFunctionCode]);                      \n	            switch(len) {                                                    \n	                [CodeForSwitchCase]                                          \n	            }                                                                \n	            if (ret === errorObj) {                                          \n	                promise._rejectCallback(maybeWrapAsError(ret.e), true, true);\n	            }                                                                \n	            if (!promise._isFateSealed()) promise._setAsyncGuaranteed();     \n	            return promise;                                                  \n	        };                                                                   \n	        notEnumerableProp(ret, '__isPromisified__', true);                   \n	        return ret;                                                          \n	    ".replace("[CodeForSwitchCase]", generateArgumentSwitchCase()).replace("[GetFunctionCode]", getFunctionCode);
        body = body.replace("Parameters", parameterDeclaration(newParameterCount));
        return new Function(
          "Promise",
          "fn",
          "receiver",
          "withAppended",
          "maybeWrapAsError",
          "nodebackForPromise",
          "tryCatch",
          "errorObj",
          "notEnumerableProp",
          "INTERNAL",
          body
        )(
          Promise2,
          fn,
          receiver,
          withAppended,
          maybeWrapAsError,
          nodebackForPromise,
          util2.tryCatch,
          util2.errorObj,
          util2.notEnumerableProp,
          INTERNAL
        );
      };
    }
    function makeNodePromisifiedClosure(callback, receiver, _, fn, __, multiArgs) {
      var defaultThis = /* @__PURE__ */ function() {
        return this;
      }();
      var method2 = callback;
      if (typeof method2 === "string") {
        callback = fn;
      }
      function promisified() {
        var _receiver = receiver;
        if (receiver === THIS) _receiver = this;
        var promise2 = new Promise2(INTERNAL);
        promise2._captureStackTrace();
        var cb = typeof method2 === "string" && this !== defaultThis ? this[method2] : callback;
        var fn2 = nodebackForPromise(promise2, multiArgs);
        try {
          cb.apply(_receiver, withAppended(arguments, fn2));
        } catch (e) {
          promise2._rejectCallback(maybeWrapAsError(e), true, true);
        }
        if (!promise2._isFateSealed()) promise2._setAsyncGuaranteed();
        return promise2;
      }
      util2.notEnumerableProp(promisified, "__isPromisified__", true);
      return promisified;
    }
    var makeNodePromisified = canEvaluate ? makeNodePromisifiedEval : makeNodePromisifiedClosure;
    function promisifyAll(obj, suffix, filter2, promisifier, multiArgs) {
      var suffixRegexp = new RegExp(escapeIdentRegex(suffix) + "$");
      var methods2 = promisifiableMethods(obj, suffix, suffixRegexp, filter2);
      for (var i = 0, len = methods2.length; i < len; i += 2) {
        var key = methods2[i];
        var fn = methods2[i + 1];
        var promisifiedKey = key + suffix;
        if (promisifier === makeNodePromisified) {
          obj[promisifiedKey] = makeNodePromisified(key, THIS, key, fn, suffix, multiArgs);
        } else {
          var promisified = promisifier(fn, function() {
            return makeNodePromisified(
              key,
              THIS,
              key,
              fn,
              suffix,
              multiArgs
            );
          });
          util2.notEnumerableProp(promisified, "__isPromisified__", true);
          obj[promisifiedKey] = promisified;
        }
      }
      util2.toFastProperties(obj);
      return obj;
    }
    function promisify2(callback, receiver, multiArgs) {
      return makeNodePromisified(
        callback,
        receiver,
        void 0,
        callback,
        null,
        multiArgs
      );
    }
    Promise2.promisify = function(fn, options) {
      if (typeof fn !== "function") {
        throw new TypeError2("expecting a function but got " + util2.classString(fn));
      }
      if (isPromisified(fn)) {
        return fn;
      }
      options = Object(options);
      var receiver = options.context === void 0 ? THIS : options.context;
      var multiArgs = !!options.multiArgs;
      var ret = promisify2(fn, receiver, multiArgs);
      util2.copyDescriptors(fn, ret, propsFilter);
      return ret;
    };
    Promise2.promisifyAll = function(target, options) {
      if (typeof target !== "function" && typeof target !== "object") {
        throw new TypeError2("the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/MqrFmX\n");
      }
      options = Object(options);
      var multiArgs = !!options.multiArgs;
      var suffix = options.suffix;
      if (typeof suffix !== "string") suffix = defaultSuffix;
      var filter2 = options.filter;
      if (typeof filter2 !== "function") filter2 = defaultFilter;
      var promisifier = options.promisifier;
      if (typeof promisifier !== "function") promisifier = makeNodePromisified;
      if (!util2.isIdentifier(suffix)) {
        throw new RangeError("suffix must be a valid identifier\n\n    See http://goo.gl/MqrFmX\n");
      }
      var keys = util2.inheritedDataKeys(target);
      for (var i = 0; i < keys.length; ++i) {
        var value = target[keys[i]];
        if (keys[i] !== "constructor" && util2.isClass(value)) {
          promisifyAll(
            value.prototype,
            suffix,
            filter2,
            promisifier,
            multiArgs
          );
          promisifyAll(value, suffix, filter2, promisifier, multiArgs);
        }
      }
      return promisifyAll(target, suffix, filter2, promisifier, multiArgs);
    };
  };
  return promisify;
}
var props;
var hasRequiredProps;
function requireProps() {
  if (hasRequiredProps) return props;
  hasRequiredProps = 1;
  props = function(Promise2, PromiseArray, tryConvertToPromise, apiRejection) {
    var util2 = requireUtil$1();
    var isObject = util2.isObject;
    var es52 = requireEs5();
    var Es6Map;
    if (typeof Map === "function") Es6Map = Map;
    var mapToEntries = /* @__PURE__ */ function() {
      var index = 0;
      var size = 0;
      function extractEntry(value, key) {
        this[index] = value;
        this[index + size] = key;
        index++;
      }
      return function mapToEntries2(map2) {
        size = map2.size;
        index = 0;
        var ret = new Array(map2.size * 2);
        map2.forEach(extractEntry, ret);
        return ret;
      };
    }();
    var entriesToMap = function(entries) {
      var ret = new Es6Map();
      var length = entries.length / 2 | 0;
      for (var i = 0; i < length; ++i) {
        var key = entries[length + i];
        var value = entries[i];
        ret.set(key, value);
      }
      return ret;
    };
    function PropertiesPromiseArray(obj) {
      var isMap = false;
      var entries;
      if (Es6Map !== void 0 && obj instanceof Es6Map) {
        entries = mapToEntries(obj);
        isMap = true;
      } else {
        var keys = es52.keys(obj);
        var len = keys.length;
        entries = new Array(len * 2);
        for (var i = 0; i < len; ++i) {
          var key = keys[i];
          entries[i] = obj[key];
          entries[i + len] = key;
        }
      }
      this.constructor$(entries);
      this._isMap = isMap;
      this._init$(void 0, isMap ? -6 : -3);
    }
    util2.inherits(PropertiesPromiseArray, PromiseArray);
    PropertiesPromiseArray.prototype._init = function() {
    };
    PropertiesPromiseArray.prototype._promiseFulfilled = function(value, index) {
      this._values[index] = value;
      var totalResolved = ++this._totalResolved;
      if (totalResolved >= this._length) {
        var val;
        if (this._isMap) {
          val = entriesToMap(this._values);
        } else {
          val = {};
          var keyOffset = this.length();
          for (var i = 0, len = this.length(); i < len; ++i) {
            val[this._values[i + keyOffset]] = this._values[i];
          }
        }
        this._resolve(val);
        return true;
      }
      return false;
    };
    PropertiesPromiseArray.prototype.shouldCopyValues = function() {
      return false;
    };
    PropertiesPromiseArray.prototype.getActualLength = function(len) {
      return len >> 1;
    };
    function props2(promises) {
      var ret;
      var castValue = tryConvertToPromise(promises);
      if (!isObject(castValue)) {
        return apiRejection("cannot await properties of a non-object\n\n    See http://goo.gl/MqrFmX\n");
      } else if (castValue instanceof Promise2) {
        ret = castValue._then(
          Promise2.props,
          void 0,
          void 0,
          void 0,
          void 0
        );
      } else {
        ret = new PropertiesPromiseArray(castValue).promise();
      }
      if (castValue instanceof Promise2) {
        ret._propagateFrom(castValue, 2);
      }
      return ret;
    }
    Promise2.prototype.props = function() {
      return props2(this);
    };
    Promise2.props = function(promises) {
      return props2(promises);
    };
  };
  return props;
}
var race;
var hasRequiredRace;
function requireRace() {
  if (hasRequiredRace) return race;
  hasRequiredRace = 1;
  race = function(Promise2, INTERNAL, tryConvertToPromise, apiRejection) {
    var util2 = requireUtil$1();
    var raceLater = function(promise2) {
      return promise2.then(function(array) {
        return race2(array, promise2);
      });
    };
    function race2(promises, parent) {
      var maybePromise = tryConvertToPromise(promises);
      if (maybePromise instanceof Promise2) {
        return raceLater(maybePromise);
      } else {
        promises = util2.asArray(promises);
        if (promises === null)
          return apiRejection("expecting an array or an iterable object but got " + util2.classString(promises));
      }
      var ret = new Promise2(INTERNAL);
      if (parent !== void 0) {
        ret._propagateFrom(parent, 3);
      }
      var fulfill = ret._fulfill;
      var reject = ret._reject;
      for (var i = 0, len = promises.length; i < len; ++i) {
        var val = promises[i];
        if (val === void 0 && !(i in promises)) {
          continue;
        }
        Promise2.cast(val)._then(fulfill, reject, void 0, ret, null);
      }
      return ret;
    }
    Promise2.race = function(promises) {
      return race2(promises, void 0);
    };
    Promise2.prototype.race = function() {
      return race2(this, void 0);
    };
  };
  return race;
}
var reduce;
var hasRequiredReduce;
function requireReduce() {
  if (hasRequiredReduce) return reduce;
  hasRequiredReduce = 1;
  reduce = function(Promise2, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug) {
    var util2 = requireUtil$1();
    var tryCatch = util2.tryCatch;
    function ReductionPromiseArray(promises, fn, initialValue, _each) {
      this.constructor$(promises);
      var context2 = Promise2._getContext();
      this._fn = util2.contextBind(context2, fn);
      if (initialValue !== void 0) {
        initialValue = Promise2.resolve(initialValue);
        initialValue._attachCancellationCallback(this);
      }
      this._initialValue = initialValue;
      this._currentCancellable = null;
      if (_each === INTERNAL) {
        this._eachValues = Array(this._length);
      } else if (_each === 0) {
        this._eachValues = null;
      } else {
        this._eachValues = void 0;
      }
      this._promise._captureStackTrace();
      this._init$(void 0, -5);
    }
    util2.inherits(ReductionPromiseArray, PromiseArray);
    ReductionPromiseArray.prototype._gotAccum = function(accum) {
      if (this._eachValues !== void 0 && this._eachValues !== null && accum !== INTERNAL) {
        this._eachValues.push(accum);
      }
    };
    ReductionPromiseArray.prototype._eachComplete = function(value) {
      if (this._eachValues !== null) {
        this._eachValues.push(value);
      }
      return this._eachValues;
    };
    ReductionPromiseArray.prototype._init = function() {
    };
    ReductionPromiseArray.prototype._resolveEmptyArray = function() {
      this._resolve(this._eachValues !== void 0 ? this._eachValues : this._initialValue);
    };
    ReductionPromiseArray.prototype.shouldCopyValues = function() {
      return false;
    };
    ReductionPromiseArray.prototype._resolve = function(value) {
      this._promise._resolveCallback(value);
      this._values = null;
    };
    ReductionPromiseArray.prototype._resultCancelled = function(sender) {
      if (sender === this._initialValue) return this._cancel();
      if (this._isResolved()) return;
      this._resultCancelled$();
      if (this._currentCancellable instanceof Promise2) {
        this._currentCancellable.cancel();
      }
      if (this._initialValue instanceof Promise2) {
        this._initialValue.cancel();
      }
    };
    ReductionPromiseArray.prototype._iterate = function(values) {
      this._values = values;
      var value;
      var i;
      var length = values.length;
      if (this._initialValue !== void 0) {
        value = this._initialValue;
        i = 0;
      } else {
        value = Promise2.resolve(values[0]);
        i = 1;
      }
      this._currentCancellable = value;
      for (var j = i; j < length; ++j) {
        var maybePromise = values[j];
        if (maybePromise instanceof Promise2) {
          maybePromise.suppressUnhandledRejections();
        }
      }
      if (!value.isRejected()) {
        for (; i < length; ++i) {
          var ctx = {
            accum: null,
            value: values[i],
            index: i,
            length,
            array: this
          };
          value = value._then(gotAccum, void 0, void 0, ctx, void 0);
          if ((i & 127) === 0) {
            value._setNoAsyncGuarantee();
          }
        }
      }
      if (this._eachValues !== void 0) {
        value = value._then(this._eachComplete, void 0, void 0, this, void 0);
      }
      value._then(completed, completed, void 0, value, this);
    };
    Promise2.prototype.reduce = function(fn, initialValue) {
      return reduce2(this, fn, initialValue, null);
    };
    Promise2.reduce = function(promises, fn, initialValue, _each) {
      return reduce2(promises, fn, initialValue, _each);
    };
    function completed(valueOrReason, array) {
      if (this.isFulfilled()) {
        array._resolve(valueOrReason);
      } else {
        array._reject(valueOrReason);
      }
    }
    function reduce2(promises, fn, initialValue, _each) {
      if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util2.classString(fn));
      }
      var array = new ReductionPromiseArray(promises, fn, initialValue, _each);
      return array.promise();
    }
    function gotAccum(accum) {
      this.accum = accum;
      this.array._gotAccum(accum);
      var value = tryConvertToPromise(this.value, this.array._promise);
      if (value instanceof Promise2) {
        this.array._currentCancellable = value;
        return value._then(gotValue, void 0, void 0, this, void 0);
      } else {
        return gotValue.call(this, value);
      }
    }
    function gotValue(value) {
      var array = this.array;
      var promise2 = array._promise;
      var fn = tryCatch(array._fn);
      promise2._pushContext();
      var ret;
      if (array._eachValues !== void 0) {
        ret = fn.call(promise2._boundValue(), value, this.index, this.length);
      } else {
        ret = fn.call(
          promise2._boundValue(),
          this.accum,
          value,
          this.index,
          this.length
        );
      }
      if (ret instanceof Promise2) {
        array._currentCancellable = ret;
      }
      var promiseCreated = promise2._popContext();
      debug.checkForgottenReturns(
        ret,
        promiseCreated,
        array._eachValues !== void 0 ? "Promise.each" : "Promise.reduce",
        promise2
      );
      return ret;
    }
  };
  return reduce;
}
var settle;
var hasRequiredSettle;
function requireSettle() {
  if (hasRequiredSettle) return settle;
  hasRequiredSettle = 1;
  settle = function(Promise2, PromiseArray, debug) {
    var PromiseInspection = Promise2.PromiseInspection;
    var util2 = requireUtil$1();
    function SettledPromiseArray(values) {
      this.constructor$(values);
    }
    util2.inherits(SettledPromiseArray, PromiseArray);
    SettledPromiseArray.prototype._promiseResolved = function(index, inspection) {
      this._values[index] = inspection;
      var totalResolved = ++this._totalResolved;
      if (totalResolved >= this._length) {
        this._resolve(this._values);
        return true;
      }
      return false;
    };
    SettledPromiseArray.prototype._promiseFulfilled = function(value, index) {
      var ret = new PromiseInspection();
      ret._bitField = 33554432;
      ret._settledValueField = value;
      return this._promiseResolved(index, ret);
    };
    SettledPromiseArray.prototype._promiseRejected = function(reason, index) {
      var ret = new PromiseInspection();
      ret._bitField = 16777216;
      ret._settledValueField = reason;
      return this._promiseResolved(index, ret);
    };
    Promise2.settle = function(promises) {
      debug.deprecated(".settle()", ".reflect()");
      return new SettledPromiseArray(promises).promise();
    };
    Promise2.allSettled = function(promises) {
      return new SettledPromiseArray(promises).promise();
    };
    Promise2.prototype.settle = function() {
      return Promise2.settle(this);
    };
  };
  return settle;
}
var some;
var hasRequiredSome;
function requireSome() {
  if (hasRequiredSome) return some;
  hasRequiredSome = 1;
  some = function(Promise2, PromiseArray, apiRejection) {
    var util2 = requireUtil$1();
    var RangeError2 = requireErrors$1().RangeError;
    var AggregateError = requireErrors$1().AggregateError;
    var isArray = util2.isArray;
    var CANCELLATION = {};
    function SomePromiseArray(values) {
      this.constructor$(values);
      this._howMany = 0;
      this._unwrap = false;
      this._initialized = false;
    }
    util2.inherits(SomePromiseArray, PromiseArray);
    SomePromiseArray.prototype._init = function() {
      if (!this._initialized) {
        return;
      }
      if (this._howMany === 0) {
        this._resolve([]);
        return;
      }
      this._init$(void 0, -5);
      var isArrayResolved = isArray(this._values);
      if (!this._isResolved() && isArrayResolved && this._howMany > this._canPossiblyFulfill()) {
        this._reject(this._getRangeError(this.length()));
      }
    };
    SomePromiseArray.prototype.init = function() {
      this._initialized = true;
      this._init();
    };
    SomePromiseArray.prototype.setUnwrap = function() {
      this._unwrap = true;
    };
    SomePromiseArray.prototype.howMany = function() {
      return this._howMany;
    };
    SomePromiseArray.prototype.setHowMany = function(count) {
      this._howMany = count;
    };
    SomePromiseArray.prototype._promiseFulfilled = function(value) {
      this._addFulfilled(value);
      if (this._fulfilled() === this.howMany()) {
        this._values.length = this.howMany();
        if (this.howMany() === 1 && this._unwrap) {
          this._resolve(this._values[0]);
        } else {
          this._resolve(this._values);
        }
        return true;
      }
      return false;
    };
    SomePromiseArray.prototype._promiseRejected = function(reason) {
      this._addRejected(reason);
      return this._checkOutcome();
    };
    SomePromiseArray.prototype._promiseCancelled = function() {
      if (this._values instanceof Promise2 || this._values == null) {
        return this._cancel();
      }
      this._addRejected(CANCELLATION);
      return this._checkOutcome();
    };
    SomePromiseArray.prototype._checkOutcome = function() {
      if (this.howMany() > this._canPossiblyFulfill()) {
        var e = new AggregateError();
        for (var i = this.length(); i < this._values.length; ++i) {
          if (this._values[i] !== CANCELLATION) {
            e.push(this._values[i]);
          }
        }
        if (e.length > 0) {
          this._reject(e);
        } else {
          this._cancel();
        }
        return true;
      }
      return false;
    };
    SomePromiseArray.prototype._fulfilled = function() {
      return this._totalResolved;
    };
    SomePromiseArray.prototype._rejected = function() {
      return this._values.length - this.length();
    };
    SomePromiseArray.prototype._addRejected = function(reason) {
      this._values.push(reason);
    };
    SomePromiseArray.prototype._addFulfilled = function(value) {
      this._values[this._totalResolved++] = value;
    };
    SomePromiseArray.prototype._canPossiblyFulfill = function() {
      return this.length() - this._rejected();
    };
    SomePromiseArray.prototype._getRangeError = function(count) {
      var message = "Input array must contain at least " + this._howMany + " items but contains only " + count + " items";
      return new RangeError2(message);
    };
    SomePromiseArray.prototype._resolveEmptyArray = function() {
      this._reject(this._getRangeError(0));
    };
    function some2(promises, howMany) {
      if ((howMany | 0) !== howMany || howMany < 0) {
        return apiRejection("expecting a positive integer\n\n    See http://goo.gl/MqrFmX\n");
      }
      var ret = new SomePromiseArray(promises);
      var promise2 = ret.promise();
      ret.setHowMany(howMany);
      ret.init();
      return promise2;
    }
    Promise2.some = function(promises, howMany) {
      return some2(promises, howMany);
    };
    Promise2.prototype.some = function(howMany) {
      return some2(this, howMany);
    };
    Promise2._SomePromiseArray = SomePromiseArray;
  };
  return some;
}
var timers;
var hasRequiredTimers;
function requireTimers() {
  if (hasRequiredTimers) return timers;
  hasRequiredTimers = 1;
  timers = function(Promise2, INTERNAL, debug) {
    var util2 = requireUtil$1();
    var TimeoutError = Promise2.TimeoutError;
    function HandleWrapper(handle) {
      this.handle = handle;
    }
    HandleWrapper.prototype._resultCancelled = function() {
      clearTimeout(this.handle);
    };
    var afterValue = function(value) {
      return delay(+this).thenReturn(value);
    };
    var delay = Promise2.delay = function(ms, value) {
      var ret;
      var handle;
      if (value !== void 0) {
        ret = Promise2.resolve(value)._then(afterValue, null, null, ms, void 0);
        if (debug.cancellation() && value instanceof Promise2) {
          ret._setOnCancel(value);
        }
      } else {
        ret = new Promise2(INTERNAL);
        handle = setTimeout(function() {
          ret._fulfill();
        }, +ms);
        if (debug.cancellation()) {
          ret._setOnCancel(new HandleWrapper(handle));
        }
        ret._captureStackTrace();
      }
      ret._setAsyncGuaranteed();
      return ret;
    };
    Promise2.prototype.delay = function(ms) {
      return delay(ms, this);
    };
    var afterTimeout = function(promise2, message, parent) {
      var err;
      if (typeof message !== "string") {
        if (message instanceof Error) {
          err = message;
        } else {
          err = new TimeoutError("operation timed out");
        }
      } else {
        err = new TimeoutError(message);
      }
      util2.markAsOriginatingFromRejection(err);
      promise2._attachExtraTrace(err);
      promise2._reject(err);
      if (parent != null) {
        parent.cancel();
      }
    };
    function successClear(value) {
      clearTimeout(this.handle);
      return value;
    }
    function failureClear(reason) {
      clearTimeout(this.handle);
      throw reason;
    }
    Promise2.prototype.timeout = function(ms, message) {
      ms = +ms;
      var ret, parent;
      var handleWrapper = new HandleWrapper(setTimeout(function timeoutTimeout() {
        if (ret.isPending()) {
          afterTimeout(ret, message, parent);
        }
      }, ms));
      if (debug.cancellation()) {
        parent = this.then();
        ret = parent._then(
          successClear,
          failureClear,
          void 0,
          handleWrapper,
          void 0
        );
        ret._setOnCancel(handleWrapper);
      } else {
        ret = this._then(
          successClear,
          failureClear,
          void 0,
          handleWrapper,
          void 0
        );
      }
      return ret;
    };
  };
  return timers;
}
var using;
var hasRequiredUsing;
function requireUsing() {
  if (hasRequiredUsing) return using;
  hasRequiredUsing = 1;
  using = function(Promise2, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug) {
    var util2 = requireUtil$1();
    var TypeError2 = requireErrors$1().TypeError;
    var inherits = requireUtil$1().inherits;
    var errorObj = util2.errorObj;
    var tryCatch = util2.tryCatch;
    var NULL = {};
    function thrower(e) {
      setTimeout(function() {
        throw e;
      }, 0);
    }
    function castPreservingDisposable(thenable) {
      var maybePromise = tryConvertToPromise(thenable);
      if (maybePromise !== thenable && typeof thenable._isDisposable === "function" && typeof thenable._getDisposer === "function" && thenable._isDisposable()) {
        maybePromise._setDisposable(thenable._getDisposer());
      }
      return maybePromise;
    }
    function dispose(resources, inspection) {
      var i = 0;
      var len = resources.length;
      var ret = new Promise2(INTERNAL);
      function iterator() {
        if (i >= len) return ret._fulfill();
        var maybePromise = castPreservingDisposable(resources[i++]);
        if (maybePromise instanceof Promise2 && maybePromise._isDisposable()) {
          try {
            maybePromise = tryConvertToPromise(
              maybePromise._getDisposer().tryDispose(inspection),
              resources.promise
            );
          } catch (e) {
            return thrower(e);
          }
          if (maybePromise instanceof Promise2) {
            return maybePromise._then(
              iterator,
              thrower,
              null,
              null,
              null
            );
          }
        }
        iterator();
      }
      iterator();
      return ret;
    }
    function Disposer(data, promise2, context2) {
      this._data = data;
      this._promise = promise2;
      this._context = context2;
    }
    Disposer.prototype.data = function() {
      return this._data;
    };
    Disposer.prototype.promise = function() {
      return this._promise;
    };
    Disposer.prototype.resource = function() {
      if (this.promise().isFulfilled()) {
        return this.promise().value();
      }
      return NULL;
    };
    Disposer.prototype.tryDispose = function(inspection) {
      var resource = this.resource();
      var context2 = this._context;
      if (context2 !== void 0) context2._pushContext();
      var ret = resource !== NULL ? this.doDispose(resource, inspection) : null;
      if (context2 !== void 0) context2._popContext();
      this._promise._unsetDisposable();
      this._data = null;
      return ret;
    };
    Disposer.isDisposer = function(d) {
      return d != null && typeof d.resource === "function" && typeof d.tryDispose === "function";
    };
    function FunctionDisposer(fn, promise2, context2) {
      this.constructor$(fn, promise2, context2);
    }
    inherits(FunctionDisposer, Disposer);
    FunctionDisposer.prototype.doDispose = function(resource, inspection) {
      var fn = this.data();
      return fn.call(resource, resource, inspection);
    };
    function maybeUnwrapDisposer(value) {
      if (Disposer.isDisposer(value)) {
        this.resources[this.index]._setDisposable(value);
        return value.promise();
      }
      return value;
    }
    function ResourceList(length) {
      this.length = length;
      this.promise = null;
      this[length - 1] = null;
    }
    ResourceList.prototype._resultCancelled = function() {
      var len = this.length;
      for (var i = 0; i < len; ++i) {
        var item = this[i];
        if (item instanceof Promise2) {
          item.cancel();
        }
      }
    };
    Promise2.using = function() {
      var len = arguments.length;
      if (len < 2) return apiRejection(
        "you must pass at least 2 arguments to Promise.using"
      );
      var fn = arguments[len - 1];
      if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util2.classString(fn));
      }
      var input;
      var spreadArgs = true;
      if (len === 2 && Array.isArray(arguments[0])) {
        input = arguments[0];
        len = input.length;
        spreadArgs = false;
      } else {
        input = arguments;
        len--;
      }
      var resources = new ResourceList(len);
      for (var i = 0; i < len; ++i) {
        var resource = input[i];
        if (Disposer.isDisposer(resource)) {
          var disposer = resource;
          resource = resource.promise();
          resource._setDisposable(disposer);
        } else {
          var maybePromise = tryConvertToPromise(resource);
          if (maybePromise instanceof Promise2) {
            resource = maybePromise._then(maybeUnwrapDisposer, null, null, {
              resources,
              index: i
            }, void 0);
          }
        }
        resources[i] = resource;
      }
      var reflectedResources = new Array(resources.length);
      for (var i = 0; i < reflectedResources.length; ++i) {
        reflectedResources[i] = Promise2.resolve(resources[i]).reflect();
      }
      var resultPromise = Promise2.all(reflectedResources).then(function(inspections) {
        for (var i2 = 0; i2 < inspections.length; ++i2) {
          var inspection = inspections[i2];
          if (inspection.isRejected()) {
            errorObj.e = inspection.error();
            return errorObj;
          } else if (!inspection.isFulfilled()) {
            resultPromise.cancel();
            return;
          }
          inspections[i2] = inspection.value();
        }
        promise2._pushContext();
        fn = tryCatch(fn);
        var ret = spreadArgs ? fn.apply(void 0, inspections) : fn(inspections);
        var promiseCreated = promise2._popContext();
        debug.checkForgottenReturns(
          ret,
          promiseCreated,
          "Promise.using",
          promise2
        );
        return ret;
      });
      var promise2 = resultPromise.lastly(function() {
        var inspection = new Promise2.PromiseInspection(resultPromise);
        return dispose(resources, inspection);
      });
      resources.promise = promise2;
      promise2._setOnCancel(resources);
      return promise2;
    };
    Promise2.prototype._setDisposable = function(disposer) {
      this._bitField = this._bitField | 131072;
      this._disposer = disposer;
    };
    Promise2.prototype._isDisposable = function() {
      return (this._bitField & 131072) > 0;
    };
    Promise2.prototype._getDisposer = function() {
      return this._disposer;
    };
    Promise2.prototype._unsetDisposable = function() {
      this._bitField = this._bitField & -131073;
      this._disposer = void 0;
    };
    Promise2.prototype.disposer = function(fn) {
      if (typeof fn === "function") {
        return new FunctionDisposer(fn, this, createContext());
      }
      throw new TypeError2();
    };
  };
  return using;
}
var any;
var hasRequiredAny;
function requireAny() {
  if (hasRequiredAny) return any;
  hasRequiredAny = 1;
  any = function(Promise2) {
    var SomePromiseArray = Promise2._SomePromiseArray;
    function any2(promises) {
      var ret = new SomePromiseArray(promises);
      var promise2 = ret.promise();
      ret.setHowMany(1);
      ret.setUnwrap();
      ret.init();
      return promise2;
    }
    Promise2.any = function(promises) {
      return any2(promises);
    };
    Promise2.prototype.any = function() {
      return any2(this);
    };
  };
  return any;
}
var each;
var hasRequiredEach;
function requireEach() {
  if (hasRequiredEach) return each;
  hasRequiredEach = 1;
  each = function(Promise2, INTERNAL) {
    var PromiseReduce = Promise2.reduce;
    var PromiseAll = Promise2.all;
    function promiseAllThis() {
      return PromiseAll(this);
    }
    function PromiseMapSeries(promises, fn) {
      return PromiseReduce(promises, fn, INTERNAL, INTERNAL);
    }
    Promise2.prototype.each = function(fn) {
      return PromiseReduce(this, fn, INTERNAL, 0)._then(promiseAllThis, void 0, void 0, this, void 0);
    };
    Promise2.prototype.mapSeries = function(fn) {
      return PromiseReduce(this, fn, INTERNAL, INTERNAL);
    };
    Promise2.each = function(promises, fn) {
      return PromiseReduce(promises, fn, INTERNAL, 0)._then(promiseAllThis, void 0, void 0, promises, void 0);
    };
    Promise2.mapSeries = PromiseMapSeries;
  };
  return each;
}
var filter;
var hasRequiredFilter;
function requireFilter() {
  if (hasRequiredFilter) return filter;
  hasRequiredFilter = 1;
  filter = function(Promise2, INTERNAL) {
    var PromiseMap = Promise2.map;
    Promise2.prototype.filter = function(fn, options) {
      return PromiseMap(this, fn, options, INTERNAL);
    };
    Promise2.filter = function(promises, fn, options) {
      return PromiseMap(promises, fn, options, INTERNAL);
    };
  };
  return filter;
}
var hasRequiredPromise;
function requirePromise() {
  if (hasRequiredPromise) return promise.exports;
  hasRequiredPromise = 1;
  (function(module) {
    module.exports = function() {
      var makeSelfResolutionError = function() {
        return new TypeError2("circular promise resolution chain\n\n    See http://goo.gl/MqrFmX\n");
      };
      var reflectHandler = function() {
        return new Promise2.PromiseInspection(this._target());
      };
      var apiRejection = function(msg) {
        return Promise2.reject(new TypeError2(msg));
      };
      function Proxyable() {
      }
      var UNDEFINED_BINDING = {};
      var util2 = requireUtil$1();
      util2.setReflectHandler(reflectHandler);
      var getDomain = function() {
        var domain = process.domain;
        if (domain === void 0) {
          return null;
        }
        return domain;
      };
      var getContextDefault = function() {
        return null;
      };
      var getContextDomain = function() {
        return {
          domain: getDomain(),
          async: null
        };
      };
      var AsyncResource = util2.isNode && util2.nodeSupportsAsyncResource ? require$$1.AsyncResource : null;
      var getContextAsyncHooks = function() {
        return {
          domain: getDomain(),
          async: new AsyncResource("Bluebird::Promise")
        };
      };
      var getContext = util2.isNode ? getContextDomain : getContextDefault;
      util2.notEnumerableProp(Promise2, "_getContext", getContext);
      var enableAsyncHooks = function() {
        getContext = getContextAsyncHooks;
        util2.notEnumerableProp(Promise2, "_getContext", getContextAsyncHooks);
      };
      var disableAsyncHooks = function() {
        getContext = getContextDomain;
        util2.notEnumerableProp(Promise2, "_getContext", getContextDomain);
      };
      var es52 = requireEs5();
      var Async = requireAsync();
      var async2 = new Async();
      es52.defineProperty(Promise2, "_async", { value: async2 });
      var errors2 = requireErrors$1();
      var TypeError2 = Promise2.TypeError = errors2.TypeError;
      Promise2.RangeError = errors2.RangeError;
      var CancellationError = Promise2.CancellationError = errors2.CancellationError;
      Promise2.TimeoutError = errors2.TimeoutError;
      Promise2.OperationalError = errors2.OperationalError;
      Promise2.RejectionError = errors2.OperationalError;
      Promise2.AggregateError = errors2.AggregateError;
      var INTERNAL = function() {
      };
      var APPLY = {};
      var NEXT_FILTER = {};
      var tryConvertToPromise = requireThenables()(Promise2, INTERNAL);
      var PromiseArray = requirePromise_array()(
        Promise2,
        INTERNAL,
        tryConvertToPromise,
        apiRejection,
        Proxyable
      );
      var Context = requireContext()(Promise2);
      var createContext = Context.create;
      var debug = requireDebuggability()(
        Promise2,
        Context,
        enableAsyncHooks,
        disableAsyncHooks
      );
      debug.CapturedTrace;
      var PassThroughHandlerContext = require_finally()(Promise2, tryConvertToPromise, NEXT_FILTER);
      var catchFilter = requireCatch_filter()(NEXT_FILTER);
      var nodebackForPromise = requireNodeback();
      var errorObj = util2.errorObj;
      var tryCatch = util2.tryCatch;
      function check(self2, executor) {
        if (self2 == null || self2.constructor !== Promise2) {
          throw new TypeError2("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n");
        }
        if (typeof executor !== "function") {
          throw new TypeError2("expecting a function but got " + util2.classString(executor));
        }
      }
      function Promise2(executor) {
        if (executor !== INTERNAL) {
          check(this, executor);
        }
        this._bitField = 0;
        this._fulfillmentHandler0 = void 0;
        this._rejectionHandler0 = void 0;
        this._promise0 = void 0;
        this._receiver0 = void 0;
        this._resolveFromExecutor(executor);
        this._promiseCreated();
        this._fireEvent("promiseCreated", this);
      }
      Promise2.prototype.toString = function() {
        return "[object Promise]";
      };
      Promise2.prototype.caught = Promise2.prototype["catch"] = function(fn) {
        var len = arguments.length;
        if (len > 1) {
          var catchInstances = new Array(len - 1), j = 0, i;
          for (i = 0; i < len - 1; ++i) {
            var item = arguments[i];
            if (util2.isObject(item)) {
              catchInstances[j++] = item;
            } else {
              return apiRejection("Catch statement predicate: expecting an object but got " + util2.classString(item));
            }
          }
          catchInstances.length = j;
          fn = arguments[i];
          if (typeof fn !== "function") {
            throw new TypeError2("The last argument to .catch() must be a function, got " + util2.toString(fn));
          }
          return this.then(void 0, catchFilter(catchInstances, fn, this));
        }
        return this.then(void 0, fn);
      };
      Promise2.prototype.reflect = function() {
        return this._then(
          reflectHandler,
          reflectHandler,
          void 0,
          this,
          void 0
        );
      };
      Promise2.prototype.then = function(didFulfill, didReject) {
        if (debug.warnings() && arguments.length > 0 && typeof didFulfill !== "function" && typeof didReject !== "function") {
          var msg = ".then() only accepts functions but was passed: " + util2.classString(didFulfill);
          if (arguments.length > 1) {
            msg += ", " + util2.classString(didReject);
          }
          this._warn(msg);
        }
        return this._then(didFulfill, didReject, void 0, void 0, void 0);
      };
      Promise2.prototype.done = function(didFulfill, didReject) {
        var promise2 = this._then(didFulfill, didReject, void 0, void 0, void 0);
        promise2._setIsFinal();
      };
      Promise2.prototype.spread = function(fn) {
        if (typeof fn !== "function") {
          return apiRejection("expecting a function but got " + util2.classString(fn));
        }
        return this.all()._then(fn, void 0, void 0, APPLY, void 0);
      };
      Promise2.prototype.toJSON = function() {
        var ret = {
          isFulfilled: false,
          isRejected: false,
          fulfillmentValue: void 0,
          rejectionReason: void 0
        };
        if (this.isFulfilled()) {
          ret.fulfillmentValue = this.value();
          ret.isFulfilled = true;
        } else if (this.isRejected()) {
          ret.rejectionReason = this.reason();
          ret.isRejected = true;
        }
        return ret;
      };
      Promise2.prototype.all = function() {
        if (arguments.length > 0) {
          this._warn(".all() was passed arguments but it does not take any");
        }
        return new PromiseArray(this).promise();
      };
      Promise2.prototype.error = function(fn) {
        return this.caught(util2.originatesFromRejection, fn);
      };
      Promise2.getNewLibraryCopy = module.exports;
      Promise2.is = function(val) {
        return val instanceof Promise2;
      };
      Promise2.fromNode = Promise2.fromCallback = function(fn) {
        var ret = new Promise2(INTERNAL);
        ret._captureStackTrace();
        var multiArgs = arguments.length > 1 ? !!Object(arguments[1]).multiArgs : false;
        var result = tryCatch(fn)(nodebackForPromise(ret, multiArgs));
        if (result === errorObj) {
          ret._rejectCallback(result.e, true);
        }
        if (!ret._isFateSealed()) ret._setAsyncGuaranteed();
        return ret;
      };
      Promise2.all = function(promises) {
        return new PromiseArray(promises).promise();
      };
      Promise2.cast = function(obj) {
        var ret = tryConvertToPromise(obj);
        if (!(ret instanceof Promise2)) {
          ret = new Promise2(INTERNAL);
          ret._captureStackTrace();
          ret._setFulfilled();
          ret._rejectionHandler0 = obj;
        }
        return ret;
      };
      Promise2.resolve = Promise2.fulfilled = Promise2.cast;
      Promise2.reject = Promise2.rejected = function(reason) {
        var ret = new Promise2(INTERNAL);
        ret._captureStackTrace();
        ret._rejectCallback(reason, true);
        return ret;
      };
      Promise2.setScheduler = function(fn) {
        if (typeof fn !== "function") {
          throw new TypeError2("expecting a function but got " + util2.classString(fn));
        }
        return async2.setScheduler(fn);
      };
      Promise2.prototype._then = function(didFulfill, didReject, _, receiver, internalData) {
        var haveInternalData = internalData !== void 0;
        var promise2 = haveInternalData ? internalData : new Promise2(INTERNAL);
        var target = this._target();
        var bitField = target._bitField;
        if (!haveInternalData) {
          promise2._propagateFrom(this, 3);
          promise2._captureStackTrace();
          if (receiver === void 0 && (this._bitField & 2097152) !== 0) {
            if (!((bitField & 50397184) === 0)) {
              receiver = this._boundValue();
            } else {
              receiver = target === this ? void 0 : this._boundTo;
            }
          }
          this._fireEvent("promiseChained", this, promise2);
        }
        var context2 = getContext();
        if (!((bitField & 50397184) === 0)) {
          var handler, value, settler = target._settlePromiseCtx;
          if ((bitField & 33554432) !== 0) {
            value = target._rejectionHandler0;
            handler = didFulfill;
          } else if ((bitField & 16777216) !== 0) {
            value = target._fulfillmentHandler0;
            handler = didReject;
            target._unsetRejectionIsUnhandled();
          } else {
            settler = target._settlePromiseLateCancellationObserver;
            value = new CancellationError("late cancellation observer");
            target._attachExtraTrace(value);
            handler = didReject;
          }
          async2.invoke(settler, target, {
            handler: util2.contextBind(context2, handler),
            promise: promise2,
            receiver,
            value
          });
        } else {
          target._addCallbacks(
            didFulfill,
            didReject,
            promise2,
            receiver,
            context2
          );
        }
        return promise2;
      };
      Promise2.prototype._length = function() {
        return this._bitField & 65535;
      };
      Promise2.prototype._isFateSealed = function() {
        return (this._bitField & 117506048) !== 0;
      };
      Promise2.prototype._isFollowing = function() {
        return (this._bitField & 67108864) === 67108864;
      };
      Promise2.prototype._setLength = function(len) {
        this._bitField = this._bitField & -65536 | len & 65535;
      };
      Promise2.prototype._setFulfilled = function() {
        this._bitField = this._bitField | 33554432;
        this._fireEvent("promiseFulfilled", this);
      };
      Promise2.prototype._setRejected = function() {
        this._bitField = this._bitField | 16777216;
        this._fireEvent("promiseRejected", this);
      };
      Promise2.prototype._setFollowing = function() {
        this._bitField = this._bitField | 67108864;
        this._fireEvent("promiseResolved", this);
      };
      Promise2.prototype._setIsFinal = function() {
        this._bitField = this._bitField | 4194304;
      };
      Promise2.prototype._isFinal = function() {
        return (this._bitField & 4194304) > 0;
      };
      Promise2.prototype._unsetCancelled = function() {
        this._bitField = this._bitField & -65537;
      };
      Promise2.prototype._setCancelled = function() {
        this._bitField = this._bitField | 65536;
        this._fireEvent("promiseCancelled", this);
      };
      Promise2.prototype._setWillBeCancelled = function() {
        this._bitField = this._bitField | 8388608;
      };
      Promise2.prototype._setAsyncGuaranteed = function() {
        if (async2.hasCustomScheduler()) return;
        var bitField = this._bitField;
        this._bitField = bitField | (bitField & 536870912) >> 2 ^ 134217728;
      };
      Promise2.prototype._setNoAsyncGuarantee = function() {
        this._bitField = (this._bitField | 536870912) & -134217729;
      };
      Promise2.prototype._receiverAt = function(index) {
        var ret = index === 0 ? this._receiver0 : this[index * 4 - 4 + 3];
        if (ret === UNDEFINED_BINDING) {
          return void 0;
        } else if (ret === void 0 && this._isBound()) {
          return this._boundValue();
        }
        return ret;
      };
      Promise2.prototype._promiseAt = function(index) {
        return this[index * 4 - 4 + 2];
      };
      Promise2.prototype._fulfillmentHandlerAt = function(index) {
        return this[index * 4 - 4 + 0];
      };
      Promise2.prototype._rejectionHandlerAt = function(index) {
        return this[index * 4 - 4 + 1];
      };
      Promise2.prototype._boundValue = function() {
      };
      Promise2.prototype._migrateCallback0 = function(follower) {
        follower._bitField;
        var fulfill = follower._fulfillmentHandler0;
        var reject = follower._rejectionHandler0;
        var promise2 = follower._promise0;
        var receiver = follower._receiverAt(0);
        if (receiver === void 0) receiver = UNDEFINED_BINDING;
        this._addCallbacks(fulfill, reject, promise2, receiver, null);
      };
      Promise2.prototype._migrateCallbackAt = function(follower, index) {
        var fulfill = follower._fulfillmentHandlerAt(index);
        var reject = follower._rejectionHandlerAt(index);
        var promise2 = follower._promiseAt(index);
        var receiver = follower._receiverAt(index);
        if (receiver === void 0) receiver = UNDEFINED_BINDING;
        this._addCallbacks(fulfill, reject, promise2, receiver, null);
      };
      Promise2.prototype._addCallbacks = function(fulfill, reject, promise2, receiver, context2) {
        var index = this._length();
        if (index >= 65535 - 4) {
          index = 0;
          this._setLength(0);
        }
        if (index === 0) {
          this._promise0 = promise2;
          this._receiver0 = receiver;
          if (typeof fulfill === "function") {
            this._fulfillmentHandler0 = util2.contextBind(context2, fulfill);
          }
          if (typeof reject === "function") {
            this._rejectionHandler0 = util2.contextBind(context2, reject);
          }
        } else {
          var base = index * 4 - 4;
          this[base + 2] = promise2;
          this[base + 3] = receiver;
          if (typeof fulfill === "function") {
            this[base + 0] = util2.contextBind(context2, fulfill);
          }
          if (typeof reject === "function") {
            this[base + 1] = util2.contextBind(context2, reject);
          }
        }
        this._setLength(index + 1);
        return index;
      };
      Promise2.prototype._proxy = function(proxyable, arg) {
        this._addCallbacks(void 0, void 0, arg, proxyable, null);
      };
      Promise2.prototype._resolveCallback = function(value, shouldBind) {
        if ((this._bitField & 117506048) !== 0) return;
        if (value === this)
          return this._rejectCallback(makeSelfResolutionError(), false);
        var maybePromise = tryConvertToPromise(value, this);
        if (!(maybePromise instanceof Promise2)) return this._fulfill(value);
        if (shouldBind) this._propagateFrom(maybePromise, 2);
        var promise2 = maybePromise._target();
        if (promise2 === this) {
          this._reject(makeSelfResolutionError());
          return;
        }
        var bitField = promise2._bitField;
        if ((bitField & 50397184) === 0) {
          var len = this._length();
          if (len > 0) promise2._migrateCallback0(this);
          for (var i = 1; i < len; ++i) {
            promise2._migrateCallbackAt(this, i);
          }
          this._setFollowing();
          this._setLength(0);
          this._setFollowee(maybePromise);
        } else if ((bitField & 33554432) !== 0) {
          this._fulfill(promise2._value());
        } else if ((bitField & 16777216) !== 0) {
          this._reject(promise2._reason());
        } else {
          var reason = new CancellationError("late cancellation observer");
          promise2._attachExtraTrace(reason);
          this._reject(reason);
        }
      };
      Promise2.prototype._rejectCallback = function(reason, synchronous, ignoreNonErrorWarnings) {
        var trace = util2.ensureErrorObject(reason);
        var hasStack = trace === reason;
        if (!hasStack && !ignoreNonErrorWarnings && debug.warnings()) {
          var message = "a promise was rejected with a non-error: " + util2.classString(reason);
          this._warn(message, true);
        }
        this._attachExtraTrace(trace, synchronous ? hasStack : false);
        this._reject(reason);
      };
      Promise2.prototype._resolveFromExecutor = function(executor) {
        if (executor === INTERNAL) return;
        var promise2 = this;
        this._captureStackTrace();
        this._pushContext();
        var synchronous = true;
        var r = this._execute(executor, function(value) {
          promise2._resolveCallback(value);
        }, function(reason) {
          promise2._rejectCallback(reason, synchronous);
        });
        synchronous = false;
        this._popContext();
        if (r !== void 0) {
          promise2._rejectCallback(r, true);
        }
      };
      Promise2.prototype._settlePromiseFromHandler = function(handler, receiver, value, promise2) {
        var bitField = promise2._bitField;
        if ((bitField & 65536) !== 0) return;
        promise2._pushContext();
        var x;
        if (receiver === APPLY) {
          if (!value || typeof value.length !== "number") {
            x = errorObj;
            x.e = new TypeError2("cannot .spread() a non-array: " + util2.classString(value));
          } else {
            x = tryCatch(handler).apply(this._boundValue(), value);
          }
        } else {
          x = tryCatch(handler).call(receiver, value);
        }
        var promiseCreated = promise2._popContext();
        bitField = promise2._bitField;
        if ((bitField & 65536) !== 0) return;
        if (x === NEXT_FILTER) {
          promise2._reject(value);
        } else if (x === errorObj) {
          promise2._rejectCallback(x.e, false);
        } else {
          debug.checkForgottenReturns(x, promiseCreated, "", promise2, this);
          promise2._resolveCallback(x);
        }
      };
      Promise2.prototype._target = function() {
        var ret = this;
        while (ret._isFollowing()) ret = ret._followee();
        return ret;
      };
      Promise2.prototype._followee = function() {
        return this._rejectionHandler0;
      };
      Promise2.prototype._setFollowee = function(promise2) {
        this._rejectionHandler0 = promise2;
      };
      Promise2.prototype._settlePromise = function(promise2, handler, receiver, value) {
        var isPromise = promise2 instanceof Promise2;
        var bitField = this._bitField;
        var asyncGuaranteed = (bitField & 134217728) !== 0;
        if ((bitField & 65536) !== 0) {
          if (isPromise) promise2._invokeInternalOnCancel();
          if (receiver instanceof PassThroughHandlerContext && receiver.isFinallyHandler()) {
            receiver.cancelPromise = promise2;
            if (tryCatch(handler).call(receiver, value) === errorObj) {
              promise2._reject(errorObj.e);
            }
          } else if (handler === reflectHandler) {
            promise2._fulfill(reflectHandler.call(receiver));
          } else if (receiver instanceof Proxyable) {
            receiver._promiseCancelled(promise2);
          } else if (isPromise || promise2 instanceof PromiseArray) {
            promise2._cancel();
          } else {
            receiver.cancel();
          }
        } else if (typeof handler === "function") {
          if (!isPromise) {
            handler.call(receiver, value, promise2);
          } else {
            if (asyncGuaranteed) promise2._setAsyncGuaranteed();
            this._settlePromiseFromHandler(handler, receiver, value, promise2);
          }
        } else if (receiver instanceof Proxyable) {
          if (!receiver._isResolved()) {
            if ((bitField & 33554432) !== 0) {
              receiver._promiseFulfilled(value, promise2);
            } else {
              receiver._promiseRejected(value, promise2);
            }
          }
        } else if (isPromise) {
          if (asyncGuaranteed) promise2._setAsyncGuaranteed();
          if ((bitField & 33554432) !== 0) {
            promise2._fulfill(value);
          } else {
            promise2._reject(value);
          }
        }
      };
      Promise2.prototype._settlePromiseLateCancellationObserver = function(ctx) {
        var handler = ctx.handler;
        var promise2 = ctx.promise;
        var receiver = ctx.receiver;
        var value = ctx.value;
        if (typeof handler === "function") {
          if (!(promise2 instanceof Promise2)) {
            handler.call(receiver, value, promise2);
          } else {
            this._settlePromiseFromHandler(handler, receiver, value, promise2);
          }
        } else if (promise2 instanceof Promise2) {
          promise2._reject(value);
        }
      };
      Promise2.prototype._settlePromiseCtx = function(ctx) {
        this._settlePromise(ctx.promise, ctx.handler, ctx.receiver, ctx.value);
      };
      Promise2.prototype._settlePromise0 = function(handler, value, bitField) {
        var promise2 = this._promise0;
        var receiver = this._receiverAt(0);
        this._promise0 = void 0;
        this._receiver0 = void 0;
        this._settlePromise(promise2, handler, receiver, value);
      };
      Promise2.prototype._clearCallbackDataAtIndex = function(index) {
        var base = index * 4 - 4;
        this[base + 2] = this[base + 3] = this[base + 0] = this[base + 1] = void 0;
      };
      Promise2.prototype._fulfill = function(value) {
        var bitField = this._bitField;
        if ((bitField & 117506048) >>> 16) return;
        if (value === this) {
          var err = makeSelfResolutionError();
          this._attachExtraTrace(err);
          return this._reject(err);
        }
        this._setFulfilled();
        this._rejectionHandler0 = value;
        if ((bitField & 65535) > 0) {
          if ((bitField & 134217728) !== 0) {
            this._settlePromises();
          } else {
            async2.settlePromises(this);
          }
          this._dereferenceTrace();
        }
      };
      Promise2.prototype._reject = function(reason) {
        var bitField = this._bitField;
        if ((bitField & 117506048) >>> 16) return;
        this._setRejected();
        this._fulfillmentHandler0 = reason;
        if (this._isFinal()) {
          return async2.fatalError(reason, util2.isNode);
        }
        if ((bitField & 65535) > 0) {
          async2.settlePromises(this);
        } else {
          this._ensurePossibleRejectionHandled();
        }
      };
      Promise2.prototype._fulfillPromises = function(len, value) {
        for (var i = 1; i < len; i++) {
          var handler = this._fulfillmentHandlerAt(i);
          var promise2 = this._promiseAt(i);
          var receiver = this._receiverAt(i);
          this._clearCallbackDataAtIndex(i);
          this._settlePromise(promise2, handler, receiver, value);
        }
      };
      Promise2.prototype._rejectPromises = function(len, reason) {
        for (var i = 1; i < len; i++) {
          var handler = this._rejectionHandlerAt(i);
          var promise2 = this._promiseAt(i);
          var receiver = this._receiverAt(i);
          this._clearCallbackDataAtIndex(i);
          this._settlePromise(promise2, handler, receiver, reason);
        }
      };
      Promise2.prototype._settlePromises = function() {
        var bitField = this._bitField;
        var len = bitField & 65535;
        if (len > 0) {
          if ((bitField & 16842752) !== 0) {
            var reason = this._fulfillmentHandler0;
            this._settlePromise0(this._rejectionHandler0, reason, bitField);
            this._rejectPromises(len, reason);
          } else {
            var value = this._rejectionHandler0;
            this._settlePromise0(this._fulfillmentHandler0, value, bitField);
            this._fulfillPromises(len, value);
          }
          this._setLength(0);
        }
        this._clearCancellationData();
      };
      Promise2.prototype._settledValue = function() {
        var bitField = this._bitField;
        if ((bitField & 33554432) !== 0) {
          return this._rejectionHandler0;
        } else if ((bitField & 16777216) !== 0) {
          return this._fulfillmentHandler0;
        }
      };
      if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        es52.defineProperty(Promise2.prototype, Symbol.toStringTag, {
          get: function() {
            return "Object";
          }
        });
      }
      function deferResolve(v) {
        this.promise._resolveCallback(v);
      }
      function deferReject(v) {
        this.promise._rejectCallback(v, false);
      }
      Promise2.defer = Promise2.pending = function() {
        debug.deprecated("Promise.defer", "new Promise");
        var promise2 = new Promise2(INTERNAL);
        return {
          promise: promise2,
          resolve: deferResolve,
          reject: deferReject
        };
      };
      util2.notEnumerableProp(
        Promise2,
        "_makeSelfResolutionError",
        makeSelfResolutionError
      );
      requireMethod()(
        Promise2,
        INTERNAL,
        tryConvertToPromise,
        apiRejection,
        debug
      );
      requireBind()(Promise2, INTERNAL, tryConvertToPromise, debug);
      requireCancel()(Promise2, PromiseArray, apiRejection, debug);
      requireDirect_resolve()(Promise2);
      requireSynchronous_inspection()(Promise2);
      requireJoin()(
        Promise2,
        PromiseArray,
        tryConvertToPromise,
        INTERNAL,
        async2
      );
      Promise2.Promise = Promise2;
      Promise2.version = "3.7.2";
      requireCall_get()(Promise2);
      requireGenerators()(Promise2, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug);
      requireMap()(Promise2, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
      requireNodeify()(Promise2);
      requirePromisify()(Promise2, INTERNAL);
      requireProps()(Promise2, PromiseArray, tryConvertToPromise, apiRejection);
      requireRace()(Promise2, INTERNAL, tryConvertToPromise, apiRejection);
      requireReduce()(Promise2, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
      requireSettle()(Promise2, PromiseArray, debug);
      requireSome()(Promise2, PromiseArray, apiRejection);
      requireTimers()(Promise2, INTERNAL, debug);
      requireUsing()(Promise2, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug);
      requireAny()(Promise2);
      requireEach()(Promise2, INTERNAL);
      requireFilter()(Promise2, INTERNAL);
      util2.toFastProperties(Promise2);
      util2.toFastProperties(Promise2.prototype);
      function fillTypes(value) {
        var p = new Promise2(INTERNAL);
        p._fulfillmentHandler0 = value;
        p._rejectionHandler0 = value;
        p._promise0 = value;
        p._receiver0 = value;
      }
      fillTypes({ a: 1 });
      fillTypes({ b: 2 });
      fillTypes({ c: 3 });
      fillTypes(1);
      fillTypes(function() {
      });
      fillTypes(void 0);
      fillTypes(false);
      fillTypes(new Promise2(INTERNAL));
      debug.setBounds(Async.firstLineError, util2.lastLineError);
      return Promise2;
    };
  })(promise);
  return promise.exports;
}
var bluebird_1;
var hasRequiredBluebird;
function requireBluebird() {
  if (hasRequiredBluebird) return bluebird_1;
  hasRequiredBluebird = 1;
  var old;
  if (typeof Promise !== "undefined") old = Promise;
  function noConflict() {
    try {
      if (Promise === bluebird) Promise = old;
    } catch (e) {
    }
    return bluebird;
  }
  var bluebird = requirePromise()();
  bluebird.noConflict = noConflict;
  bluebird_1 = bluebird;
  return bluebird_1;
}
var epub = {};
var zipfile = {};
var util = { exports: {} };
var constants;
var hasRequiredConstants;
function requireConstants() {
  if (hasRequiredConstants) return constants;
  hasRequiredConstants = 1;
  constants = {
    /* The local file header */
    LOCHDR: 30,
    // LOC header size
    LOCSIG: 67324752,
    // "PK\003\004"
    LOCVER: 4,
    // version needed to extract
    LOCFLG: 6,
    // general purpose bit flag
    LOCHOW: 8,
    // compression method
    LOCTIM: 10,
    // modification time (2 bytes time, 2 bytes date)
    LOCCRC: 14,
    // uncompressed file crc-32 value
    LOCSIZ: 18,
    // compressed size
    LOCLEN: 22,
    // uncompressed size
    LOCNAM: 26,
    // filename length
    LOCEXT: 28,
    // extra field length
    /* The Data descriptor */
    EXTSIG: 134695760,
    // "PK\007\008"
    EXTHDR: 16,
    // EXT header size
    EXTCRC: 4,
    // uncompressed file crc-32 value
    EXTSIZ: 8,
    // compressed size
    EXTLEN: 12,
    // uncompressed size
    /* The central directory file header */
    CENHDR: 46,
    // CEN header size
    CENSIG: 33639248,
    // "PK\001\002"
    CENVEM: 4,
    // version made by
    CENVER: 6,
    // version needed to extract
    CENFLG: 8,
    // encrypt, decrypt flags
    CENHOW: 10,
    // compression method
    CENTIM: 12,
    // modification time (2 bytes time, 2 bytes date)
    CENCRC: 16,
    // uncompressed file crc-32 value
    CENSIZ: 20,
    // compressed size
    CENLEN: 24,
    // uncompressed size
    CENNAM: 28,
    // filename length
    CENEXT: 30,
    // extra field length
    CENCOM: 32,
    // file comment length
    CENDSK: 34,
    // volume number start
    CENATT: 36,
    // internal file attributes
    CENATX: 38,
    // external file attributes (host system dependent)
    CENOFF: 42,
    // LOC header offset
    /* The entries in the end of central directory */
    ENDHDR: 22,
    // END header size
    ENDSIG: 101010256,
    // "PK\005\006"
    ENDSUB: 8,
    // number of entries on this disk
    ENDTOT: 10,
    // total number of entries
    ENDSIZ: 12,
    // central directory size in bytes
    ENDOFF: 16,
    // offset of first CEN header
    ENDCOM: 20,
    // zip file comment length
    END64HDR: 20,
    // zip64 END header size
    END64SIG: 117853008,
    // zip64 Locator signature, "PK\006\007"
    END64START: 4,
    // number of the disk with the start of the zip64
    END64OFF: 8,
    // relative offset of the zip64 end of central directory
    END64NUMDISKS: 16,
    // total number of disks
    ZIP64SIG: 101075792,
    // zip64 signature, "PK\006\006"
    ZIP64HDR: 56,
    // zip64 record minimum size
    ZIP64LEAD: 12,
    // leading bytes at the start of the record, not counted by the value stored in ZIP64SIZE
    ZIP64SIZE: 4,
    // zip64 size of the central directory record
    ZIP64VEM: 12,
    // zip64 version made by
    ZIP64VER: 14,
    // zip64 version needed to extract
    ZIP64DSK: 16,
    // zip64 number of this disk
    ZIP64DSKDIR: 20,
    // number of the disk with the start of the record directory
    ZIP64SUB: 24,
    // number of entries on this disk
    ZIP64TOT: 32,
    // total number of entries
    ZIP64SIZB: 40,
    // zip64 central directory size in bytes
    ZIP64OFF: 48,
    // offset of start of central directory with respect to the starting disk number
    ZIP64EXTRA: 56,
    // extensible data sector
    /* Compression methods */
    STORED: 0,
    // no compression
    SHRUNK: 1,
    // shrunk
    REDUCED1: 2,
    // reduced with compression factor 1
    REDUCED2: 3,
    // reduced with compression factor 2
    REDUCED3: 4,
    // reduced with compression factor 3
    REDUCED4: 5,
    // reduced with compression factor 4
    IMPLODED: 6,
    // imploded
    // 7 reserved for Tokenizing compression algorithm
    DEFLATED: 8,
    // deflated
    ENHANCED_DEFLATED: 9,
    // enhanced deflated
    PKWARE: 10,
    // PKWare DCL imploded
    // 11 reserved by PKWARE
    BZIP2: 12,
    //  compressed using BZIP2
    // 13 reserved by PKWARE
    LZMA: 14,
    // LZMA
    // 15-17 reserved by PKWARE
    IBM_TERSE: 18,
    // compressed using IBM TERSE
    IBM_LZ77: 19,
    // IBM LZ77 z
    AES_ENCRYPT: 99,
    // WinZIP AES encryption method
    /* General purpose bit flag */
    // values can obtained with expression 2**bitnr
    FLG_ENC: 1,
    // Bit 0: encrypted file
    FLG_COMP1: 2,
    // Bit 1, compression option
    FLG_COMP2: 4,
    // Bit 2, compression option
    FLG_DESC: 8,
    // Bit 3, data descriptor
    FLG_ENH: 16,
    // Bit 4, enhanced deflating
    FLG_PATCH: 32,
    // Bit 5, indicates that the file is compressed patched data.
    FLG_STR: 64,
    // Bit 6, strong encryption (patented)
    // Bits 7-10: Currently unused.
    FLG_EFS: 2048,
    // Bit 11: Language encoding flag (EFS)
    // Bit 12: Reserved by PKWARE for enhanced compression.
    // Bit 13: encrypted the Central Directory (patented).
    // Bits 14-15: Reserved by PKWARE.
    FLG_MSK: 4096,
    // mask header values
    /* Load type */
    FILE: 2,
    BUFFER: 1,
    NONE: 0,
    /* 4.5 Extensible data fields */
    EF_ID: 0,
    EF_SIZE: 2,
    /* Header IDs */
    ID_ZIP64: 1,
    ID_AVINFO: 7,
    ID_PFS: 8,
    ID_OS2: 9,
    ID_NTFS: 10,
    ID_OPENVMS: 12,
    ID_UNIX: 13,
    ID_FORK: 14,
    ID_PATCH: 15,
    ID_X509_PKCS7: 20,
    ID_X509_CERTID_F: 21,
    ID_X509_CERTID_C: 22,
    ID_STRONGENC: 23,
    ID_RECORD_MGT: 24,
    ID_X509_PKCS7_RL: 25,
    ID_IBM1: 101,
    ID_IBM2: 102,
    ID_POSZIP: 18064,
    EF_ZIP64_OR_32: 4294967295,
    EF_ZIP64_OR_16: 65535,
    EF_ZIP64_SUNCOMP: 0,
    EF_ZIP64_SCOMP: 8,
    EF_ZIP64_RHO: 16,
    EF_ZIP64_DSN: 24
  };
  return constants;
}
var errors = {};
var hasRequiredErrors;
function requireErrors() {
  if (hasRequiredErrors) return errors;
  hasRequiredErrors = 1;
  (function(exports) {
    const errors2 = {
      /* Header error messages */
      INVALID_LOC: "Invalid LOC header (bad signature)",
      INVALID_CEN: "Invalid CEN header (bad signature)",
      INVALID_END: "Invalid END header (bad signature)",
      /* Descriptor */
      DESCRIPTOR_NOT_EXIST: "No descriptor present",
      DESCRIPTOR_UNKNOWN: "Unknown descriptor format",
      DESCRIPTOR_FAULTY: "Descriptor data is malformed",
      /* ZipEntry error messages*/
      NO_DATA: "Nothing to decompress",
      BAD_CRC: "CRC32 checksum failed {0}",
      FILE_IN_THE_WAY: "There is a file in the way: {0}",
      UNKNOWN_METHOD: "Invalid/unsupported compression method",
      /* Inflater error messages */
      AVAIL_DATA: "inflate::Available inflate data did not terminate",
      INVALID_DISTANCE: "inflate::Invalid literal/length or distance code in fixed or dynamic block",
      TO_MANY_CODES: "inflate::Dynamic block code description: too many length or distance codes",
      INVALID_REPEAT_LEN: "inflate::Dynamic block code description: repeat more than specified lengths",
      INVALID_REPEAT_FIRST: "inflate::Dynamic block code description: repeat lengths with no first length",
      INCOMPLETE_CODES: "inflate::Dynamic block code description: code lengths codes incomplete",
      INVALID_DYN_DISTANCE: "inflate::Dynamic block code description: invalid distance code lengths",
      INVALID_CODES_LEN: "inflate::Dynamic block code description: invalid literal/length code lengths",
      INVALID_STORE_BLOCK: "inflate::Stored block length did not match one's complement",
      INVALID_BLOCK_TYPE: "inflate::Invalid block type (type == 3)",
      /* ADM-ZIP error messages */
      CANT_EXTRACT_FILE: "Could not extract the file",
      CANT_OVERRIDE: "Target file already exists",
      DISK_ENTRY_TOO_LARGE: "Number of disk entries is too large",
      NO_ZIP: "No zip file was loaded",
      NO_ENTRY: "Entry doesn't exist",
      DIRECTORY_CONTENT_ERROR: "A directory cannot have content",
      FILE_NOT_FOUND: 'File not found: "{0}"',
      NOT_IMPLEMENTED: "Not implemented",
      INVALID_FILENAME: "Invalid filename",
      INVALID_FORMAT: "Invalid or unsupported zip format. No END header found",
      INVALID_PASS_PARAM: "Incompatible password parameter",
      WRONG_PASSWORD: "Wrong Password",
      /* ADM-ZIP */
      COMMENT_TOO_LONG: "Comment is too long",
      // Comment can be max 65535 bytes long (NOTE: some non-US characters may take more space)
      EXTRA_FIELD_PARSE_ERROR: "Extra field parsing error"
    };
    function E(message) {
      return function(...args) {
        if (args.length) {
          message = message.replace(/\{(\d)\}/g, (_, n) => args[n] || "");
        }
        return new Error("ADM-ZIP: " + message);
      };
    }
    for (const msg of Object.keys(errors2)) {
      exports[msg] = E(errors2[msg]);
    }
  })(errors);
  return errors;
}
var utils;
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  const fsystem = require$$0$1;
  const pth = require$$1$1;
  const Constants = requireConstants();
  const Errors = requireErrors();
  const isWin = typeof process === "object" && "win32" === process.platform;
  const is_Obj = (obj) => typeof obj === "object" && obj !== null;
  const crcTable = new Uint32Array(256).map((t, c) => {
    for (let k = 0; k < 8; k++) {
      if ((c & 1) !== 0) {
        c = 3988292384 ^ c >>> 1;
      } else {
        c >>>= 1;
      }
    }
    return c >>> 0;
  });
  function Utils(opts) {
    this.sep = pth.sep;
    this.fs = fsystem;
    if (is_Obj(opts)) {
      if (is_Obj(opts.fs) && typeof opts.fs.statSync === "function") {
        this.fs = opts.fs;
      }
    }
  }
  utils = Utils;
  Utils.prototype.makeDir = function(folder) {
    const self2 = this;
    function mkdirSync(fpath) {
      let resolvedPath = fpath.split(self2.sep)[0];
      fpath.split(self2.sep).forEach(function(name) {
        if (!name || name.substr(-1, 1) === ":") return;
        resolvedPath += self2.sep + name;
        var stat;
        try {
          stat = self2.fs.statSync(resolvedPath);
        } catch (e) {
          self2.fs.mkdirSync(resolvedPath);
        }
        if (stat && stat.isFile()) throw Errors.FILE_IN_THE_WAY(`"${resolvedPath}"`);
      });
    }
    mkdirSync(folder);
  };
  Utils.prototype.writeFileTo = function(path2, content, overwrite, attr) {
    const self2 = this;
    if (self2.fs.existsSync(path2)) {
      if (!overwrite) return false;
      var stat = self2.fs.statSync(path2);
      if (stat.isDirectory()) {
        return false;
      }
    }
    var folder = pth.dirname(path2);
    if (!self2.fs.existsSync(folder)) {
      self2.makeDir(folder);
    }
    var fd;
    try {
      fd = self2.fs.openSync(path2, "w", 438);
    } catch (e) {
      self2.fs.chmodSync(path2, 438);
      fd = self2.fs.openSync(path2, "w", 438);
    }
    if (fd) {
      try {
        self2.fs.writeSync(fd, content, 0, content.length, 0);
      } finally {
        self2.fs.closeSync(fd);
      }
    }
    self2.fs.chmodSync(path2, attr || 438);
    return true;
  };
  Utils.prototype.writeFileToAsync = function(path2, content, overwrite, attr, callback) {
    if (typeof attr === "function") {
      callback = attr;
      attr = void 0;
    }
    const self2 = this;
    self2.fs.exists(path2, function(exist) {
      if (exist && !overwrite) return callback(false);
      self2.fs.stat(path2, function(err, stat) {
        if (exist && stat.isDirectory()) {
          return callback(false);
        }
        var folder = pth.dirname(path2);
        self2.fs.exists(folder, function(exists) {
          if (!exists) self2.makeDir(folder);
          self2.fs.open(path2, "w", 438, function(err2, fd) {
            if (err2) {
              self2.fs.chmod(path2, 438, function() {
                self2.fs.open(path2, "w", 438, function(err3, fd2) {
                  self2.fs.write(fd2, content, 0, content.length, 0, function() {
                    self2.fs.close(fd2, function() {
                      self2.fs.chmod(path2, attr || 438, function() {
                        callback(true);
                      });
                    });
                  });
                });
              });
            } else if (fd) {
              self2.fs.write(fd, content, 0, content.length, 0, function() {
                self2.fs.close(fd, function() {
                  self2.fs.chmod(path2, attr || 438, function() {
                    callback(true);
                  });
                });
              });
            } else {
              self2.fs.chmod(path2, attr || 438, function() {
                callback(true);
              });
            }
          });
        });
      });
    });
  };
  Utils.prototype.findFiles = function(path2) {
    const self2 = this;
    function findSync(dir, pattern, recursive) {
      let files = [];
      self2.fs.readdirSync(dir).forEach(function(file) {
        const path3 = pth.join(dir, file);
        const stat = self2.fs.statSync(path3);
        {
          files.push(pth.normalize(path3) + (stat.isDirectory() ? self2.sep : ""));
        }
        if (stat.isDirectory() && recursive) files = files.concat(findSync(path3, pattern, recursive));
      });
      return files;
    }
    return findSync(path2, void 0, true);
  };
  Utils.prototype.findFilesAsync = function(dir, cb) {
    const self2 = this;
    let results = [];
    self2.fs.readdir(dir, function(err, list) {
      if (err) return cb(err);
      let list_length = list.length;
      if (!list_length) return cb(null, results);
      list.forEach(function(file) {
        file = pth.join(dir, file);
        self2.fs.stat(file, function(err2, stat) {
          if (err2) return cb(err2);
          if (stat) {
            results.push(pth.normalize(file) + (stat.isDirectory() ? self2.sep : ""));
            if (stat.isDirectory()) {
              self2.findFilesAsync(file, function(err3, res) {
                if (err3) return cb(err3);
                results = results.concat(res);
                if (!--list_length) cb(null, results);
              });
            } else {
              if (!--list_length) cb(null, results);
            }
          }
        });
      });
    });
  };
  Utils.prototype.getAttributes = function() {
  };
  Utils.prototype.setAttributes = function() {
  };
  Utils.crc32update = function(crc, byte) {
    return crcTable[(crc ^ byte) & 255] ^ crc >>> 8;
  };
  Utils.crc32 = function(buf) {
    if (typeof buf === "string") {
      buf = Buffer.from(buf, "utf8");
    }
    let len = buf.length;
    let crc = -1;
    for (let off = 0; off < len; ) crc = Utils.crc32update(crc, buf[off++]);
    return ~crc >>> 0;
  };
  Utils.methodToString = function(method2) {
    switch (method2) {
      case Constants.STORED:
        return "STORED (" + method2 + ")";
      case Constants.DEFLATED:
        return "DEFLATED (" + method2 + ")";
      default:
        return "UNSUPPORTED (" + method2 + ")";
    }
  };
  Utils.canonical = function(path2) {
    if (!path2) return "";
    const safeSuffix = pth.posix.normalize("/" + path2.split("\\").join("/"));
    return pth.join(".", safeSuffix);
  };
  Utils.zipnamefix = function(path2) {
    if (!path2) return "";
    const safeSuffix = pth.posix.normalize("/" + path2.split("\\").join("/"));
    return pth.posix.join(".", safeSuffix);
  };
  Utils.findLast = function(arr, callback) {
    if (!Array.isArray(arr)) throw new TypeError("arr is not array");
    const len = arr.length >>> 0;
    for (let i = len - 1; i >= 0; i--) {
      if (callback(arr[i], i, arr)) {
        return arr[i];
      }
    }
    return void 0;
  };
  Utils.sanitize = function(prefix, name) {
    prefix = pth.resolve(pth.normalize(prefix));
    var parts = name.split("/");
    for (var i = 0, l = parts.length; i < l; i++) {
      var path2 = pth.normalize(pth.join(prefix, parts.slice(i, l).join(pth.sep)));
      if (path2.indexOf(prefix) === 0) {
        return path2;
      }
    }
    return pth.normalize(pth.join(prefix, pth.basename(name)));
  };
  Utils.toBuffer = function toBuffer(input, encoder) {
    if (Buffer.isBuffer(input)) {
      return input;
    } else if (input instanceof Uint8Array) {
      return Buffer.from(input);
    } else {
      return typeof input === "string" ? encoder(input) : Buffer.alloc(0);
    }
  };
  Utils.readBigUInt64LE = function(buffer, index) {
    var slice = Buffer.from(buffer.slice(index, index + 8));
    slice.swap64();
    return parseInt(`0x${slice.toString("hex")}`);
  };
  Utils.fromDOS2Date = function(val) {
    return new Date((val >> 25 & 127) + 1980, Math.max((val >> 21 & 15) - 1, 0), Math.max(val >> 16 & 31, 1), val >> 11 & 31, val >> 5 & 63, (val & 31) << 1);
  };
  Utils.fromDate2DOS = function(val) {
    let date = 0;
    let time = 0;
    if (val.getFullYear() > 1979) {
      date = (val.getFullYear() - 1980 & 127) << 9 | val.getMonth() + 1 << 5 | val.getDate();
      time = val.getHours() << 11 | val.getMinutes() << 5 | val.getSeconds() >> 1;
    }
    return date << 16 | time;
  };
  Utils.isWin = isWin;
  Utils.crcTable = crcTable;
  return utils;
}
var fattr;
var hasRequiredFattr;
function requireFattr() {
  if (hasRequiredFattr) return fattr;
  hasRequiredFattr = 1;
  const pth = require$$1$1;
  fattr = function(path2, { fs: fs2 }) {
    var _path = path2 || "", _obj = newAttr(), _stat = null;
    function newAttr() {
      return {
        directory: false,
        readonly: false,
        hidden: false,
        executable: false,
        mtime: 0,
        atime: 0
      };
    }
    if (_path && fs2.existsSync(_path)) {
      _stat = fs2.statSync(_path);
      _obj.directory = _stat.isDirectory();
      _obj.mtime = _stat.mtime;
      _obj.atime = _stat.atime;
      _obj.executable = (73 & _stat.mode) !== 0;
      _obj.readonly = (128 & _stat.mode) === 0;
      _obj.hidden = pth.basename(_path)[0] === ".";
    } else {
      console.warn("Invalid path: " + _path);
    }
    return {
      get directory() {
        return _obj.directory;
      },
      get readOnly() {
        return _obj.readonly;
      },
      get hidden() {
        return _obj.hidden;
      },
      get mtime() {
        return _obj.mtime;
      },
      get atime() {
        return _obj.atime;
      },
      get executable() {
        return _obj.executable;
      },
      decodeAttributes: function() {
      },
      encodeAttributes: function() {
      },
      toJSON: function() {
        return {
          path: _path,
          isDirectory: _obj.directory,
          isReadOnly: _obj.readonly,
          isHidden: _obj.hidden,
          isExecutable: _obj.executable,
          mTime: _obj.mtime,
          aTime: _obj.atime
        };
      },
      toString: function() {
        return JSON.stringify(this.toJSON(), null, "	");
      }
    };
  };
  return fattr;
}
var decoder;
var hasRequiredDecoder;
function requireDecoder() {
  if (hasRequiredDecoder) return decoder;
  hasRequiredDecoder = 1;
  decoder = {
    efs: true,
    encode: (data) => Buffer.from(data, "utf8"),
    decode: (data) => data.toString("utf8")
  };
  return decoder;
}
var hasRequiredUtil;
function requireUtil() {
  if (hasRequiredUtil) return util.exports;
  hasRequiredUtil = 1;
  util.exports = requireUtils();
  util.exports.Constants = requireConstants();
  util.exports.Errors = requireErrors();
  util.exports.FileAttr = requireFattr();
  util.exports.decoder = requireDecoder();
  return util.exports;
}
var headers = {};
var entryHeader;
var hasRequiredEntryHeader;
function requireEntryHeader() {
  if (hasRequiredEntryHeader) return entryHeader;
  hasRequiredEntryHeader = 1;
  var Utils = requireUtil(), Constants = Utils.Constants;
  entryHeader = function() {
    var _verMade = 20, _version = 10, _flags = 0, _method = 0, _time = 0, _crc = 0, _compressedSize = 0, _size = 0, _fnameLen = 0, _extraLen = 0, _comLen = 0, _diskStart = 0, _inattr = 0, _attr = 0, _offset = 0;
    _verMade |= Utils.isWin ? 2560 : 768;
    _flags |= Constants.FLG_EFS;
    const _localHeader = {
      extraLen: 0
    };
    const uint32 = (val) => Math.max(0, val) >>> 0;
    const uint8 = (val) => Math.max(0, val) & 255;
    _time = Utils.fromDate2DOS(/* @__PURE__ */ new Date());
    return {
      get made() {
        return _verMade;
      },
      set made(val) {
        _verMade = val;
      },
      get version() {
        return _version;
      },
      set version(val) {
        _version = val;
      },
      get flags() {
        return _flags;
      },
      set flags(val) {
        _flags = val;
      },
      get flags_efs() {
        return (_flags & Constants.FLG_EFS) > 0;
      },
      set flags_efs(val) {
        if (val) {
          _flags |= Constants.FLG_EFS;
        } else {
          _flags &= ~Constants.FLG_EFS;
        }
      },
      get flags_desc() {
        return (_flags & Constants.FLG_DESC) > 0;
      },
      set flags_desc(val) {
        if (val) {
          _flags |= Constants.FLG_DESC;
        } else {
          _flags &= ~Constants.FLG_DESC;
        }
      },
      get method() {
        return _method;
      },
      set method(val) {
        switch (val) {
          case Constants.STORED:
            this.version = 10;
          case Constants.DEFLATED:
          default:
            this.version = 20;
        }
        _method = val;
      },
      get time() {
        return Utils.fromDOS2Date(this.timeval);
      },
      set time(val) {
        this.timeval = Utils.fromDate2DOS(val);
      },
      get timeval() {
        return _time;
      },
      set timeval(val) {
        _time = uint32(val);
      },
      get timeHighByte() {
        return uint8(_time >>> 8);
      },
      get crc() {
        return _crc;
      },
      set crc(val) {
        _crc = uint32(val);
      },
      get compressedSize() {
        return _compressedSize;
      },
      set compressedSize(val) {
        _compressedSize = uint32(val);
      },
      get size() {
        return _size;
      },
      set size(val) {
        _size = uint32(val);
      },
      get fileNameLength() {
        return _fnameLen;
      },
      set fileNameLength(val) {
        _fnameLen = val;
      },
      get extraLength() {
        return _extraLen;
      },
      set extraLength(val) {
        _extraLen = val;
      },
      get extraLocalLength() {
        return _localHeader.extraLen;
      },
      set extraLocalLength(val) {
        _localHeader.extraLen = val;
      },
      get commentLength() {
        return _comLen;
      },
      set commentLength(val) {
        _comLen = val;
      },
      get diskNumStart() {
        return _diskStart;
      },
      set diskNumStart(val) {
        _diskStart = uint32(val);
      },
      get inAttr() {
        return _inattr;
      },
      set inAttr(val) {
        _inattr = uint32(val);
      },
      get attr() {
        return _attr;
      },
      set attr(val) {
        _attr = uint32(val);
      },
      // get Unix file permissions
      get fileAttr() {
        return (_attr || 0) >> 16 & 4095;
      },
      get offset() {
        return _offset;
      },
      set offset(val) {
        _offset = uint32(val);
      },
      get encrypted() {
        return (_flags & Constants.FLG_ENC) === Constants.FLG_ENC;
      },
      get centralHeaderSize() {
        return Constants.CENHDR + _fnameLen + _extraLen + _comLen;
      },
      get realDataOffset() {
        return _offset + Constants.LOCHDR + _localHeader.fnameLen + _localHeader.extraLen;
      },
      get localHeader() {
        return _localHeader;
      },
      loadLocalHeaderFromBinary: function(input) {
        var data = input.slice(_offset, _offset + Constants.LOCHDR);
        if (data.readUInt32LE(0) !== Constants.LOCSIG) {
          throw Utils.Errors.INVALID_LOC();
        }
        _localHeader.version = data.readUInt16LE(Constants.LOCVER);
        _localHeader.flags = data.readUInt16LE(Constants.LOCFLG);
        _localHeader.method = data.readUInt16LE(Constants.LOCHOW);
        _localHeader.time = data.readUInt32LE(Constants.LOCTIM);
        _localHeader.crc = data.readUInt32LE(Constants.LOCCRC);
        _localHeader.compressedSize = data.readUInt32LE(Constants.LOCSIZ);
        _localHeader.size = data.readUInt32LE(Constants.LOCLEN);
        _localHeader.fnameLen = data.readUInt16LE(Constants.LOCNAM);
        _localHeader.extraLen = data.readUInt16LE(Constants.LOCEXT);
        const extraStart = _offset + Constants.LOCHDR + _localHeader.fnameLen;
        const extraEnd = extraStart + _localHeader.extraLen;
        return input.slice(extraStart, extraEnd);
      },
      loadFromBinary: function(data) {
        if (data.length !== Constants.CENHDR || data.readUInt32LE(0) !== Constants.CENSIG) {
          throw Utils.Errors.INVALID_CEN();
        }
        _verMade = data.readUInt16LE(Constants.CENVEM);
        _version = data.readUInt16LE(Constants.CENVER);
        _flags = data.readUInt16LE(Constants.CENFLG);
        _method = data.readUInt16LE(Constants.CENHOW);
        _time = data.readUInt32LE(Constants.CENTIM);
        _crc = data.readUInt32LE(Constants.CENCRC);
        _compressedSize = data.readUInt32LE(Constants.CENSIZ);
        _size = data.readUInt32LE(Constants.CENLEN);
        _fnameLen = data.readUInt16LE(Constants.CENNAM);
        _extraLen = data.readUInt16LE(Constants.CENEXT);
        _comLen = data.readUInt16LE(Constants.CENCOM);
        _diskStart = data.readUInt16LE(Constants.CENDSK);
        _inattr = data.readUInt16LE(Constants.CENATT);
        _attr = data.readUInt32LE(Constants.CENATX);
        _offset = data.readUInt32LE(Constants.CENOFF);
      },
      localHeaderToBinary: function() {
        var data = Buffer.alloc(Constants.LOCHDR);
        data.writeUInt32LE(Constants.LOCSIG, 0);
        data.writeUInt16LE(_version, Constants.LOCVER);
        data.writeUInt16LE(_flags, Constants.LOCFLG);
        data.writeUInt16LE(_method, Constants.LOCHOW);
        data.writeUInt32LE(_time, Constants.LOCTIM);
        data.writeUInt32LE(_crc, Constants.LOCCRC);
        data.writeUInt32LE(_compressedSize, Constants.LOCSIZ);
        data.writeUInt32LE(_size, Constants.LOCLEN);
        data.writeUInt16LE(_fnameLen, Constants.LOCNAM);
        data.writeUInt16LE(_localHeader.extraLen, Constants.LOCEXT);
        return data;
      },
      centralHeaderToBinary: function() {
        var data = Buffer.alloc(Constants.CENHDR + _fnameLen + _extraLen + _comLen);
        data.writeUInt32LE(Constants.CENSIG, 0);
        data.writeUInt16LE(_verMade, Constants.CENVEM);
        data.writeUInt16LE(_version, Constants.CENVER);
        data.writeUInt16LE(_flags, Constants.CENFLG);
        data.writeUInt16LE(_method, Constants.CENHOW);
        data.writeUInt32LE(_time, Constants.CENTIM);
        data.writeUInt32LE(_crc, Constants.CENCRC);
        data.writeUInt32LE(_compressedSize, Constants.CENSIZ);
        data.writeUInt32LE(_size, Constants.CENLEN);
        data.writeUInt16LE(_fnameLen, Constants.CENNAM);
        data.writeUInt16LE(_extraLen, Constants.CENEXT);
        data.writeUInt16LE(_comLen, Constants.CENCOM);
        data.writeUInt16LE(_diskStart, Constants.CENDSK);
        data.writeUInt16LE(_inattr, Constants.CENATT);
        data.writeUInt32LE(_attr, Constants.CENATX);
        data.writeUInt32LE(_offset, Constants.CENOFF);
        return data;
      },
      toJSON: function() {
        const bytes = function(nr) {
          return nr + " bytes";
        };
        return {
          made: _verMade,
          version: _version,
          flags: _flags,
          method: Utils.methodToString(_method),
          time: this.time,
          crc: "0x" + _crc.toString(16).toUpperCase(),
          compressedSize: bytes(_compressedSize),
          size: bytes(_size),
          fileNameLength: bytes(_fnameLen),
          extraLength: bytes(_extraLen),
          commentLength: bytes(_comLen),
          diskNumStart: _diskStart,
          inAttr: _inattr,
          attr: _attr,
          offset: _offset,
          centralHeaderSize: bytes(Constants.CENHDR + _fnameLen + _extraLen + _comLen)
        };
      },
      toString: function() {
        return JSON.stringify(this.toJSON(), null, "	");
      }
    };
  };
  return entryHeader;
}
var mainHeader;
var hasRequiredMainHeader;
function requireMainHeader() {
  if (hasRequiredMainHeader) return mainHeader;
  hasRequiredMainHeader = 1;
  var Utils = requireUtil(), Constants = Utils.Constants;
  mainHeader = function() {
    var _volumeEntries = 0, _totalEntries = 0, _size = 0, _offset = 0, _commentLength = 0;
    return {
      get diskEntries() {
        return _volumeEntries;
      },
      set diskEntries(val) {
        _volumeEntries = _totalEntries = val;
      },
      get totalEntries() {
        return _totalEntries;
      },
      set totalEntries(val) {
        _totalEntries = _volumeEntries = val;
      },
      get size() {
        return _size;
      },
      set size(val) {
        _size = val;
      },
      get offset() {
        return _offset;
      },
      set offset(val) {
        _offset = val;
      },
      get commentLength() {
        return _commentLength;
      },
      set commentLength(val) {
        _commentLength = val;
      },
      get mainHeaderSize() {
        return Constants.ENDHDR + _commentLength;
      },
      loadFromBinary: function(data) {
        if ((data.length !== Constants.ENDHDR || data.readUInt32LE(0) !== Constants.ENDSIG) && (data.length < Constants.ZIP64HDR || data.readUInt32LE(0) !== Constants.ZIP64SIG)) {
          throw Utils.Errors.INVALID_END();
        }
        if (data.readUInt32LE(0) === Constants.ENDSIG) {
          _volumeEntries = data.readUInt16LE(Constants.ENDSUB);
          _totalEntries = data.readUInt16LE(Constants.ENDTOT);
          _size = data.readUInt32LE(Constants.ENDSIZ);
          _offset = data.readUInt32LE(Constants.ENDOFF);
          _commentLength = data.readUInt16LE(Constants.ENDCOM);
        } else {
          _volumeEntries = Utils.readBigUInt64LE(data, Constants.ZIP64SUB);
          _totalEntries = Utils.readBigUInt64LE(data, Constants.ZIP64TOT);
          _size = Utils.readBigUInt64LE(data, Constants.ZIP64SIZE);
          _offset = Utils.readBigUInt64LE(data, Constants.ZIP64OFF);
          _commentLength = 0;
        }
      },
      toBinary: function() {
        var b = Buffer.alloc(Constants.ENDHDR + _commentLength);
        b.writeUInt32LE(Constants.ENDSIG, 0);
        b.writeUInt32LE(0, 4);
        b.writeUInt16LE(_volumeEntries, Constants.ENDSUB);
        b.writeUInt16LE(_totalEntries, Constants.ENDTOT);
        b.writeUInt32LE(_size, Constants.ENDSIZ);
        b.writeUInt32LE(_offset, Constants.ENDOFF);
        b.writeUInt16LE(_commentLength, Constants.ENDCOM);
        b.fill(" ", Constants.ENDHDR);
        return b;
      },
      toJSON: function() {
        const offset = function(nr, len) {
          let offs = nr.toString(16).toUpperCase();
          while (offs.length < len) offs = "0" + offs;
          return "0x" + offs;
        };
        return {
          diskEntries: _volumeEntries,
          totalEntries: _totalEntries,
          size: _size + " bytes",
          offset: offset(_offset, 4),
          commentLength: _commentLength
        };
      },
      toString: function() {
        return JSON.stringify(this.toJSON(), null, "	");
      }
    };
  };
  return mainHeader;
}
var hasRequiredHeaders;
function requireHeaders() {
  if (hasRequiredHeaders) return headers;
  hasRequiredHeaders = 1;
  headers.EntryHeader = requireEntryHeader();
  headers.MainHeader = requireMainHeader();
  return headers;
}
var methods = {};
var deflater;
var hasRequiredDeflater;
function requireDeflater() {
  if (hasRequiredDeflater) return deflater;
  hasRequiredDeflater = 1;
  deflater = function(inbuf) {
    var zlib = require$$0$2;
    var opts = { chunkSize: (parseInt(inbuf.length / 1024) + 1) * 1024 };
    return {
      deflate: function() {
        return zlib.deflateRawSync(inbuf, opts);
      },
      deflateAsync: function(callback) {
        var tmp = zlib.createDeflateRaw(opts), parts = [], total = 0;
        tmp.on("data", function(data) {
          parts.push(data);
          total += data.length;
        });
        tmp.on("end", function() {
          var buf = Buffer.alloc(total), written = 0;
          buf.fill(0);
          for (var i = 0; i < parts.length; i++) {
            var part = parts[i];
            part.copy(buf, written);
            written += part.length;
          }
          callback && callback(buf);
        });
        tmp.end(inbuf);
      }
    };
  };
  return deflater;
}
var inflater;
var hasRequiredInflater;
function requireInflater() {
  if (hasRequiredInflater) return inflater;
  hasRequiredInflater = 1;
  const version = +(process.versions ? process.versions.node : "").split(".")[0] || 0;
  inflater = function(inbuf, expectedLength) {
    var zlib = require$$0$2;
    const option = version >= 15 && expectedLength > 0 ? { maxOutputLength: expectedLength } : {};
    return {
      inflate: function() {
        return zlib.inflateRawSync(inbuf, option);
      },
      inflateAsync: function(callback) {
        var tmp = zlib.createInflateRaw(option), parts = [], total = 0;
        tmp.on("data", function(data) {
          parts.push(data);
          total += data.length;
        });
        tmp.on("end", function() {
          var buf = Buffer.alloc(total), written = 0;
          buf.fill(0);
          for (var i = 0; i < parts.length; i++) {
            var part = parts[i];
            part.copy(buf, written);
            written += part.length;
          }
          callback && callback(buf);
        });
        tmp.end(inbuf);
      }
    };
  };
  return inflater;
}
var zipcrypto;
var hasRequiredZipcrypto;
function requireZipcrypto() {
  if (hasRequiredZipcrypto) return zipcrypto;
  hasRequiredZipcrypto = 1;
  const { randomFillSync } = require$$0$3;
  const Errors = requireErrors();
  const crctable = new Uint32Array(256).map((t, crc) => {
    for (let j = 0; j < 8; j++) {
      if (0 !== (crc & 1)) {
        crc = crc >>> 1 ^ 3988292384;
      } else {
        crc >>>= 1;
      }
    }
    return crc >>> 0;
  });
  const uMul = (a, b) => Math.imul(a, b) >>> 0;
  const crc32update = (pCrc32, bval) => {
    return crctable[(pCrc32 ^ bval) & 255] ^ pCrc32 >>> 8;
  };
  const genSalt = () => {
    if ("function" === typeof randomFillSync) {
      return randomFillSync(Buffer.alloc(12));
    } else {
      return genSalt.node();
    }
  };
  genSalt.node = () => {
    const salt = Buffer.alloc(12);
    const len = salt.length;
    for (let i = 0; i < len; i++) salt[i] = Math.random() * 256 & 255;
    return salt;
  };
  const config = {
    genSalt
  };
  function Initkeys(pw) {
    const pass = Buffer.isBuffer(pw) ? pw : Buffer.from(pw);
    this.keys = new Uint32Array([305419896, 591751049, 878082192]);
    for (let i = 0; i < pass.length; i++) {
      this.updateKeys(pass[i]);
    }
  }
  Initkeys.prototype.updateKeys = function(byteValue) {
    const keys = this.keys;
    keys[0] = crc32update(keys[0], byteValue);
    keys[1] += keys[0] & 255;
    keys[1] = uMul(keys[1], 134775813) + 1;
    keys[2] = crc32update(keys[2], keys[1] >>> 24);
    return byteValue;
  };
  Initkeys.prototype.next = function() {
    const k = (this.keys[2] | 2) >>> 0;
    return uMul(k, k ^ 1) >> 8 & 255;
  };
  function make_decrypter(pwd) {
    const keys = new Initkeys(pwd);
    return function(data) {
      const result = Buffer.alloc(data.length);
      let pos = 0;
      for (let c of data) {
        result[pos++] = keys.updateKeys(c ^ keys.next());
      }
      return result;
    };
  }
  function make_encrypter(pwd) {
    const keys = new Initkeys(pwd);
    return function(data, result, pos = 0) {
      if (!result) result = Buffer.alloc(data.length);
      for (let c of data) {
        const k = keys.next();
        result[pos++] = c ^ k;
        keys.updateKeys(c);
      }
      return result;
    };
  }
  function decrypt(data, header, pwd) {
    if (!data || !Buffer.isBuffer(data) || data.length < 12) {
      return Buffer.alloc(0);
    }
    const decrypter = make_decrypter(pwd);
    const salt = decrypter(data.slice(0, 12));
    const verifyByte = (header.flags & 8) === 8 ? header.timeHighByte : header.crc >>> 24;
    if (salt[11] !== verifyByte) {
      throw Errors.WRONG_PASSWORD();
    }
    return decrypter(data.slice(12));
  }
  function _salter(data) {
    if (Buffer.isBuffer(data) && data.length >= 12) {
      config.genSalt = function() {
        return data.slice(0, 12);
      };
    } else if (data === "node") {
      config.genSalt = genSalt.node;
    } else {
      config.genSalt = genSalt;
    }
  }
  function encrypt(data, header, pwd, oldlike = false) {
    if (data == null) data = Buffer.alloc(0);
    if (!Buffer.isBuffer(data)) data = Buffer.from(data.toString());
    const encrypter = make_encrypter(pwd);
    const salt = config.genSalt();
    salt[11] = header.crc >>> 24 & 255;
    if (oldlike) salt[10] = header.crc >>> 16 & 255;
    const result = Buffer.alloc(data.length + 12);
    encrypter(salt, result);
    return encrypter(data, result, 12);
  }
  zipcrypto = { decrypt, encrypt, _salter };
  return zipcrypto;
}
var hasRequiredMethods;
function requireMethods() {
  if (hasRequiredMethods) return methods;
  hasRequiredMethods = 1;
  methods.Deflater = requireDeflater();
  methods.Inflater = requireInflater();
  methods.ZipCrypto = requireZipcrypto();
  return methods;
}
var zipEntry;
var hasRequiredZipEntry;
function requireZipEntry() {
  if (hasRequiredZipEntry) return zipEntry;
  hasRequiredZipEntry = 1;
  var Utils = requireUtil(), Headers = requireHeaders(), Constants = Utils.Constants, Methods = requireMethods();
  zipEntry = function(options, input) {
    var _centralHeader = new Headers.EntryHeader(), _entryName = Buffer.alloc(0), _comment = Buffer.alloc(0), _isDirectory = false, uncompressedData = null, _extra = Buffer.alloc(0), _extralocal = Buffer.alloc(0), _efs = true;
    const opts = options;
    const decoder2 = typeof opts.decoder === "object" ? opts.decoder : Utils.decoder;
    _efs = decoder2.hasOwnProperty("efs") ? decoder2.efs : false;
    function getCompressedDataFromZip() {
      if (!input || !(input instanceof Uint8Array)) {
        return Buffer.alloc(0);
      }
      _extralocal = _centralHeader.loadLocalHeaderFromBinary(input);
      return input.slice(_centralHeader.realDataOffset, _centralHeader.realDataOffset + _centralHeader.compressedSize);
    }
    function crc32OK(data) {
      if (!_centralHeader.flags_desc) {
        if (Utils.crc32(data) !== _centralHeader.localHeader.crc) {
          return false;
        }
      } else {
        const descriptor = {};
        const dataEndOffset = _centralHeader.realDataOffset + _centralHeader.compressedSize;
        if (input.readUInt32LE(dataEndOffset) == Constants.LOCSIG || input.readUInt32LE(dataEndOffset) == Constants.CENSIG) {
          throw Utils.Errors.DESCRIPTOR_NOT_EXIST();
        }
        if (input.readUInt32LE(dataEndOffset) == Constants.EXTSIG) {
          descriptor.crc = input.readUInt32LE(dataEndOffset + Constants.EXTCRC);
          descriptor.compressedSize = input.readUInt32LE(dataEndOffset + Constants.EXTSIZ);
          descriptor.size = input.readUInt32LE(dataEndOffset + Constants.EXTLEN);
        } else if (input.readUInt16LE(dataEndOffset + 12) === 19280) {
          descriptor.crc = input.readUInt32LE(dataEndOffset + Constants.EXTCRC - 4);
          descriptor.compressedSize = input.readUInt32LE(dataEndOffset + Constants.EXTSIZ - 4);
          descriptor.size = input.readUInt32LE(dataEndOffset + Constants.EXTLEN - 4);
        } else {
          throw Utils.Errors.DESCRIPTOR_UNKNOWN();
        }
        if (descriptor.compressedSize !== _centralHeader.compressedSize || descriptor.size !== _centralHeader.size || descriptor.crc !== _centralHeader.crc) {
          throw Utils.Errors.DESCRIPTOR_FAULTY();
        }
        if (Utils.crc32(data) !== descriptor.crc) {
          return false;
        }
      }
      return true;
    }
    function decompress(async2, callback, pass) {
      if (typeof callback === "undefined" && typeof async2 === "string") {
        pass = async2;
        async2 = void 0;
      }
      if (_isDirectory) {
        if (async2 && callback) {
          callback(Buffer.alloc(0), Utils.Errors.DIRECTORY_CONTENT_ERROR());
        }
        return Buffer.alloc(0);
      }
      var compressedData = getCompressedDataFromZip();
      if (compressedData.length === 0) {
        if (async2 && callback) callback(compressedData);
        return compressedData;
      }
      if (_centralHeader.encrypted) {
        if ("string" !== typeof pass && !Buffer.isBuffer(pass)) {
          throw Utils.Errors.INVALID_PASS_PARAM();
        }
        compressedData = Methods.ZipCrypto.decrypt(compressedData, _centralHeader, pass);
      }
      var data = Buffer.alloc(_centralHeader.size);
      switch (_centralHeader.method) {
        case Utils.Constants.STORED:
          compressedData.copy(data);
          if (!crc32OK(data)) {
            if (async2 && callback) callback(data, Utils.Errors.BAD_CRC());
            throw Utils.Errors.BAD_CRC();
          } else {
            if (async2 && callback) callback(data);
            return data;
          }
        case Utils.Constants.DEFLATED:
          var inflater2 = new Methods.Inflater(compressedData, _centralHeader.size);
          if (!async2) {
            const result = inflater2.inflate(data);
            result.copy(data, 0);
            if (!crc32OK(data)) {
              throw Utils.Errors.BAD_CRC(`"${decoder2.decode(_entryName)}"`);
            }
            return data;
          } else {
            inflater2.inflateAsync(function(result) {
              result.copy(result, 0);
              if (callback) {
                if (!crc32OK(result)) {
                  callback(result, Utils.Errors.BAD_CRC());
                } else {
                  callback(result);
                }
              }
            });
          }
          break;
        default:
          if (async2 && callback) callback(Buffer.alloc(0), Utils.Errors.UNKNOWN_METHOD());
          throw Utils.Errors.UNKNOWN_METHOD();
      }
    }
    function compress(async2, callback) {
      if ((!uncompressedData || !uncompressedData.length) && Buffer.isBuffer(input)) {
        if (async2 && callback) callback(getCompressedDataFromZip());
        return getCompressedDataFromZip();
      }
      if (uncompressedData.length && !_isDirectory) {
        var compressedData;
        switch (_centralHeader.method) {
          case Utils.Constants.STORED:
            _centralHeader.compressedSize = _centralHeader.size;
            compressedData = Buffer.alloc(uncompressedData.length);
            uncompressedData.copy(compressedData);
            if (async2 && callback) callback(compressedData);
            return compressedData;
          default:
          case Utils.Constants.DEFLATED:
            var deflater2 = new Methods.Deflater(uncompressedData);
            if (!async2) {
              var deflated = deflater2.deflate();
              _centralHeader.compressedSize = deflated.length;
              return deflated;
            } else {
              deflater2.deflateAsync(function(data) {
                compressedData = Buffer.alloc(data.length);
                _centralHeader.compressedSize = data.length;
                data.copy(compressedData);
                callback && callback(compressedData);
              });
            }
            deflater2 = null;
            break;
        }
      } else if (async2 && callback) {
        callback(Buffer.alloc(0));
      } else {
        return Buffer.alloc(0);
      }
    }
    function readUInt64LE(buffer, offset) {
      return (buffer.readUInt32LE(offset + 4) << 4) + buffer.readUInt32LE(offset);
    }
    function parseExtra(data) {
      try {
        var offset = 0;
        var signature, size, part;
        while (offset + 4 < data.length) {
          signature = data.readUInt16LE(offset);
          offset += 2;
          size = data.readUInt16LE(offset);
          offset += 2;
          part = data.slice(offset, offset + size);
          offset += size;
          if (Constants.ID_ZIP64 === signature) {
            parseZip64ExtendedInformation(part);
          }
        }
      } catch (error) {
        throw Utils.Errors.EXTRA_FIELD_PARSE_ERROR();
      }
    }
    function parseZip64ExtendedInformation(data) {
      var size, compressedSize, offset, diskNumStart;
      if (data.length >= Constants.EF_ZIP64_SCOMP) {
        size = readUInt64LE(data, Constants.EF_ZIP64_SUNCOMP);
        if (_centralHeader.size === Constants.EF_ZIP64_OR_32) {
          _centralHeader.size = size;
        }
      }
      if (data.length >= Constants.EF_ZIP64_RHO) {
        compressedSize = readUInt64LE(data, Constants.EF_ZIP64_SCOMP);
        if (_centralHeader.compressedSize === Constants.EF_ZIP64_OR_32) {
          _centralHeader.compressedSize = compressedSize;
        }
      }
      if (data.length >= Constants.EF_ZIP64_DSN) {
        offset = readUInt64LE(data, Constants.EF_ZIP64_RHO);
        if (_centralHeader.offset === Constants.EF_ZIP64_OR_32) {
          _centralHeader.offset = offset;
        }
      }
      if (data.length >= Constants.EF_ZIP64_DSN + 4) {
        diskNumStart = data.readUInt32LE(Constants.EF_ZIP64_DSN);
        if (_centralHeader.diskNumStart === Constants.EF_ZIP64_OR_16) {
          _centralHeader.diskNumStart = diskNumStart;
        }
      }
    }
    return {
      get entryName() {
        return decoder2.decode(_entryName);
      },
      get rawEntryName() {
        return _entryName;
      },
      set entryName(val) {
        _entryName = Utils.toBuffer(val, decoder2.encode);
        var lastChar = _entryName[_entryName.length - 1];
        _isDirectory = lastChar === 47 || lastChar === 92;
        _centralHeader.fileNameLength = _entryName.length;
      },
      get efs() {
        if (typeof _efs === "function") {
          return _efs(this.entryName);
        } else {
          return _efs;
        }
      },
      get extra() {
        return _extra;
      },
      set extra(val) {
        _extra = val;
        _centralHeader.extraLength = val.length;
        parseExtra(val);
      },
      get comment() {
        return decoder2.decode(_comment);
      },
      set comment(val) {
        _comment = Utils.toBuffer(val, decoder2.encode);
        _centralHeader.commentLength = _comment.length;
        if (_comment.length > 65535) throw Utils.Errors.COMMENT_TOO_LONG();
      },
      get name() {
        var n = decoder2.decode(_entryName);
        return _isDirectory ? n.substr(n.length - 1).split("/").pop() : n.split("/").pop();
      },
      get isDirectory() {
        return _isDirectory;
      },
      getCompressedData: function() {
        return compress(false, null);
      },
      getCompressedDataAsync: function(callback) {
        compress(true, callback);
      },
      setData: function(value) {
        uncompressedData = Utils.toBuffer(value, Utils.decoder.encode);
        if (!_isDirectory && uncompressedData.length) {
          _centralHeader.size = uncompressedData.length;
          _centralHeader.method = Utils.Constants.DEFLATED;
          _centralHeader.crc = Utils.crc32(value);
          _centralHeader.changed = true;
        } else {
          _centralHeader.method = Utils.Constants.STORED;
        }
      },
      getData: function(pass) {
        if (_centralHeader.changed) {
          return uncompressedData;
        } else {
          return decompress(false, null, pass);
        }
      },
      getDataAsync: function(callback, pass) {
        if (_centralHeader.changed) {
          callback(uncompressedData);
        } else {
          decompress(true, callback, pass);
        }
      },
      set attr(attr) {
        _centralHeader.attr = attr;
      },
      get attr() {
        return _centralHeader.attr;
      },
      set header(data) {
        _centralHeader.loadFromBinary(data);
      },
      get header() {
        return _centralHeader;
      },
      packCentralHeader: function() {
        _centralHeader.flags_efs = this.efs;
        _centralHeader.extraLength = _extra.length;
        var header = _centralHeader.centralHeaderToBinary();
        var addpos = Utils.Constants.CENHDR;
        _entryName.copy(header, addpos);
        addpos += _entryName.length;
        _extra.copy(header, addpos);
        addpos += _centralHeader.extraLength;
        _comment.copy(header, addpos);
        return header;
      },
      packLocalHeader: function() {
        let addpos = 0;
        _centralHeader.flags_efs = this.efs;
        _centralHeader.extraLocalLength = _extralocal.length;
        const localHeaderBuf = _centralHeader.localHeaderToBinary();
        const localHeader = Buffer.alloc(localHeaderBuf.length + _entryName.length + _centralHeader.extraLocalLength);
        localHeaderBuf.copy(localHeader, addpos);
        addpos += localHeaderBuf.length;
        _entryName.copy(localHeader, addpos);
        addpos += _entryName.length;
        _extralocal.copy(localHeader, addpos);
        addpos += _extralocal.length;
        return localHeader;
      },
      toJSON: function() {
        const bytes = function(nr) {
          return "<" + (nr && nr.length + " bytes buffer" || "null") + ">";
        };
        return {
          entryName: this.entryName,
          name: this.name,
          comment: this.comment,
          isDirectory: this.isDirectory,
          header: _centralHeader.toJSON(),
          compressedData: bytes(input),
          data: bytes(uncompressedData)
        };
      },
      toString: function() {
        return JSON.stringify(this.toJSON(), null, "	");
      }
    };
  };
  return zipEntry;
}
var zipFile;
var hasRequiredZipFile;
function requireZipFile() {
  if (hasRequiredZipFile) return zipFile;
  hasRequiredZipFile = 1;
  const ZipEntry = requireZipEntry();
  const Headers = requireHeaders();
  const Utils = requireUtil();
  zipFile = function(inBuffer, options) {
    var entryList = [], entryTable = {}, _comment = Buffer.alloc(0), mainHeader2 = new Headers.MainHeader(), loadedEntries = false;
    const temporary = /* @__PURE__ */ new Set();
    const opts = options;
    const { noSort, decoder: decoder2 } = opts;
    if (inBuffer) {
      readMainHeader(opts.readEntries);
    } else {
      loadedEntries = true;
    }
    function makeTemporaryFolders() {
      const foldersList = /* @__PURE__ */ new Set();
      for (const elem of Object.keys(entryTable)) {
        const elements = elem.split("/");
        elements.pop();
        if (!elements.length) continue;
        for (let i = 0; i < elements.length; i++) {
          const sub = elements.slice(0, i + 1).join("/") + "/";
          foldersList.add(sub);
        }
      }
      for (const elem of foldersList) {
        if (!(elem in entryTable)) {
          const tempfolder = new ZipEntry(opts);
          tempfolder.entryName = elem;
          tempfolder.attr = 16;
          tempfolder.temporary = true;
          entryList.push(tempfolder);
          entryTable[tempfolder.entryName] = tempfolder;
          temporary.add(tempfolder);
        }
      }
    }
    function readEntries() {
      loadedEntries = true;
      entryTable = {};
      if (mainHeader2.diskEntries > (inBuffer.length - mainHeader2.offset) / Utils.Constants.CENHDR) {
        throw Utils.Errors.DISK_ENTRY_TOO_LARGE();
      }
      entryList = new Array(mainHeader2.diskEntries);
      var index = mainHeader2.offset;
      for (var i = 0; i < entryList.length; i++) {
        var tmp = index, entry = new ZipEntry(opts, inBuffer);
        entry.header = inBuffer.slice(tmp, tmp += Utils.Constants.CENHDR);
        entry.entryName = inBuffer.slice(tmp, tmp += entry.header.fileNameLength);
        if (entry.header.extraLength) {
          entry.extra = inBuffer.slice(tmp, tmp += entry.header.extraLength);
        }
        if (entry.header.commentLength) entry.comment = inBuffer.slice(tmp, tmp + entry.header.commentLength);
        index += entry.header.centralHeaderSize;
        entryList[i] = entry;
        entryTable[entry.entryName] = entry;
      }
      temporary.clear();
      makeTemporaryFolders();
    }
    function readMainHeader(readNow) {
      var i = inBuffer.length - Utils.Constants.ENDHDR, max = Math.max(0, i - 65535), n = max, endStart = inBuffer.length, endOffset = -1, commentEnd = 0;
      const trailingSpace = typeof opts.trailingSpace === "boolean" ? opts.trailingSpace : false;
      if (trailingSpace) max = 0;
      for (i; i >= n; i--) {
        if (inBuffer[i] !== 80) continue;
        if (inBuffer.readUInt32LE(i) === Utils.Constants.ENDSIG) {
          endOffset = i;
          commentEnd = i;
          endStart = i + Utils.Constants.ENDHDR;
          n = i - Utils.Constants.END64HDR;
          continue;
        }
        if (inBuffer.readUInt32LE(i) === Utils.Constants.END64SIG) {
          n = max;
          continue;
        }
        if (inBuffer.readUInt32LE(i) === Utils.Constants.ZIP64SIG) {
          endOffset = i;
          endStart = i + Utils.readBigUInt64LE(inBuffer, i + Utils.Constants.ZIP64SIZE) + Utils.Constants.ZIP64LEAD;
          break;
        }
      }
      if (endOffset == -1) throw Utils.Errors.INVALID_FORMAT();
      mainHeader2.loadFromBinary(inBuffer.slice(endOffset, endStart));
      if (mainHeader2.commentLength) {
        _comment = inBuffer.slice(commentEnd + Utils.Constants.ENDHDR);
      }
      if (readNow) readEntries();
    }
    function sortEntries() {
      if (entryList.length > 1 && !noSort) {
        entryList.sort((a, b) => a.entryName.toLowerCase().localeCompare(b.entryName.toLowerCase()));
      }
    }
    return {
      /**
       * Returns an array of ZipEntry objects existent in the current opened archive
       * @return Array
       */
      get entries() {
        if (!loadedEntries) {
          readEntries();
        }
        return entryList.filter((e) => !temporary.has(e));
      },
      /**
       * Archive comment
       * @return {String}
       */
      get comment() {
        return decoder2.decode(_comment);
      },
      set comment(val) {
        _comment = Utils.toBuffer(val, decoder2.encode);
        mainHeader2.commentLength = _comment.length;
      },
      getEntryCount: function() {
        if (!loadedEntries) {
          return mainHeader2.diskEntries;
        }
        return entryList.length;
      },
      forEach: function(callback) {
        this.entries.forEach(callback);
      },
      /**
       * Returns a reference to the entry with the given name or null if entry is inexistent
       *
       * @param entryName
       * @return ZipEntry
       */
      getEntry: function(entryName) {
        if (!loadedEntries) {
          readEntries();
        }
        return entryTable[entryName] || null;
      },
      /**
       * Adds the given entry to the entry list
       *
       * @param entry
       */
      setEntry: function(entry) {
        if (!loadedEntries) {
          readEntries();
        }
        entryList.push(entry);
        entryTable[entry.entryName] = entry;
        mainHeader2.totalEntries = entryList.length;
      },
      /**
       * Removes the file with the given name from the entry list.
       *
       * If the entry is a directory, then all nested files and directories will be removed
       * @param entryName
       * @returns {void}
       */
      deleteFile: function(entryName, withsubfolders = true) {
        if (!loadedEntries) {
          readEntries();
        }
        const entry = entryTable[entryName];
        const list = this.getEntryChildren(entry, withsubfolders).map((child) => child.entryName);
        list.forEach(this.deleteEntry);
      },
      /**
       * Removes the entry with the given name from the entry list.
       *
       * @param {string} entryName
       * @returns {void}
       */
      deleteEntry: function(entryName) {
        if (!loadedEntries) {
          readEntries();
        }
        const entry = entryTable[entryName];
        const index = entryList.indexOf(entry);
        if (index >= 0) {
          entryList.splice(index, 1);
          delete entryTable[entryName];
          mainHeader2.totalEntries = entryList.length;
        }
      },
      /**
       *  Iterates and returns all nested files and directories of the given entry
       *
       * @param entry
       * @return Array
       */
      getEntryChildren: function(entry, subfolders = true) {
        if (!loadedEntries) {
          readEntries();
        }
        if (typeof entry === "object") {
          if (entry.isDirectory && subfolders) {
            const list = [];
            const name = entry.entryName;
            for (const zipEntry2 of entryList) {
              if (zipEntry2.entryName.startsWith(name)) {
                list.push(zipEntry2);
              }
            }
            return list;
          } else {
            return [entry];
          }
        }
        return [];
      },
      /**
       *  How many child elements entry has
       *
       * @param {ZipEntry} entry
       * @return {integer}
       */
      getChildCount: function(entry) {
        if (entry && entry.isDirectory) {
          const list = this.getEntryChildren(entry);
          return list.includes(entry) ? list.length - 1 : list.length;
        }
        return 0;
      },
      /**
       * Returns the zip file
       *
       * @return Buffer
       */
      compressToBuffer: function() {
        if (!loadedEntries) {
          readEntries();
        }
        sortEntries();
        const dataBlock = [];
        const headerBlocks = [];
        let totalSize = 0;
        let dindex = 0;
        mainHeader2.size = 0;
        mainHeader2.offset = 0;
        let totalEntries = 0;
        for (const entry of this.entries) {
          const compressedData = entry.getCompressedData();
          entry.header.offset = dindex;
          const localHeader = entry.packLocalHeader();
          const dataLength = localHeader.length + compressedData.length;
          dindex += dataLength;
          dataBlock.push(localHeader);
          dataBlock.push(compressedData);
          const centralHeader = entry.packCentralHeader();
          headerBlocks.push(centralHeader);
          mainHeader2.size += centralHeader.length;
          totalSize += dataLength + centralHeader.length;
          totalEntries++;
        }
        totalSize += mainHeader2.mainHeaderSize;
        mainHeader2.offset = dindex;
        mainHeader2.totalEntries = totalEntries;
        dindex = 0;
        const outBuffer = Buffer.alloc(totalSize);
        for (const content of dataBlock) {
          content.copy(outBuffer, dindex);
          dindex += content.length;
        }
        for (const content of headerBlocks) {
          content.copy(outBuffer, dindex);
          dindex += content.length;
        }
        const mh = mainHeader2.toBinary();
        if (_comment) {
          _comment.copy(mh, Utils.Constants.ENDHDR);
        }
        mh.copy(outBuffer, dindex);
        inBuffer = outBuffer;
        loadedEntries = false;
        return outBuffer;
      },
      toAsyncBuffer: function(onSuccess, onFail, onItemStart, onItemEnd) {
        try {
          if (!loadedEntries) {
            readEntries();
          }
          sortEntries();
          const dataBlock = [];
          const centralHeaders = [];
          let totalSize = 0;
          let dindex = 0;
          let totalEntries = 0;
          mainHeader2.size = 0;
          mainHeader2.offset = 0;
          const compress2Buffer = function(entryLists) {
            if (entryLists.length > 0) {
              const entry = entryLists.shift();
              const name = entry.entryName + entry.extra.toString();
              if (onItemStart) onItemStart(name);
              entry.getCompressedDataAsync(function(compressedData) {
                if (onItemEnd) onItemEnd(name);
                entry.header.offset = dindex;
                const localHeader = entry.packLocalHeader();
                const dataLength = localHeader.length + compressedData.length;
                dindex += dataLength;
                dataBlock.push(localHeader);
                dataBlock.push(compressedData);
                const centalHeader = entry.packCentralHeader();
                centralHeaders.push(centalHeader);
                mainHeader2.size += centalHeader.length;
                totalSize += dataLength + centalHeader.length;
                totalEntries++;
                compress2Buffer(entryLists);
              });
            } else {
              totalSize += mainHeader2.mainHeaderSize;
              mainHeader2.offset = dindex;
              mainHeader2.totalEntries = totalEntries;
              dindex = 0;
              const outBuffer = Buffer.alloc(totalSize);
              dataBlock.forEach(function(content) {
                content.copy(outBuffer, dindex);
                dindex += content.length;
              });
              centralHeaders.forEach(function(content) {
                content.copy(outBuffer, dindex);
                dindex += content.length;
              });
              const mh = mainHeader2.toBinary();
              if (_comment) {
                _comment.copy(mh, Utils.Constants.ENDHDR);
              }
              mh.copy(outBuffer, dindex);
              inBuffer = outBuffer;
              loadedEntries = false;
              onSuccess(outBuffer);
            }
          };
          compress2Buffer(Array.from(this.entries));
        } catch (e) {
          onFail(e);
        }
      }
    };
  };
  return zipFile;
}
var admZip;
var hasRequiredAdmZip;
function requireAdmZip() {
  if (hasRequiredAdmZip) return admZip;
  hasRequiredAdmZip = 1;
  const Utils = requireUtil();
  const pth = require$$1$1;
  const ZipEntry = requireZipEntry();
  const ZipFile = requireZipFile();
  const get_Bool = (...val) => Utils.findLast(val, (c) => typeof c === "boolean");
  const get_Str = (...val) => Utils.findLast(val, (c) => typeof c === "string");
  const get_Fun = (...val) => Utils.findLast(val, (c) => typeof c === "function");
  const defaultOptions = {
    // option "noSort" : if true it disables files sorting
    noSort: false,
    // read entries during load (initial loading may be slower)
    readEntries: false,
    // default method is none
    method: Utils.Constants.NONE,
    // file system
    fs: null
  };
  admZip = function(input, options) {
    let inBuffer = null;
    const opts = Object.assign(/* @__PURE__ */ Object.create(null), defaultOptions);
    if (input && "object" === typeof input) {
      if (!(input instanceof Uint8Array)) {
        Object.assign(opts, input);
        input = opts.input ? opts.input : void 0;
        if (opts.input) delete opts.input;
      }
      if (Buffer.isBuffer(input)) {
        inBuffer = input;
        opts.method = Utils.Constants.BUFFER;
        input = void 0;
      }
    }
    Object.assign(opts, options);
    const filetools = new Utils(opts);
    if (typeof opts.decoder !== "object" || typeof opts.decoder.encode !== "function" || typeof opts.decoder.decode !== "function") {
      opts.decoder = Utils.decoder;
    }
    if (input && "string" === typeof input) {
      if (filetools.fs.existsSync(input)) {
        opts.method = Utils.Constants.FILE;
        opts.filename = input;
        inBuffer = filetools.fs.readFileSync(input);
      } else {
        throw Utils.Errors.INVALID_FILENAME();
      }
    }
    const _zip = new ZipFile(inBuffer, opts);
    const { canonical, sanitize, zipnamefix } = Utils;
    function getEntry(entry) {
      if (entry && _zip) {
        var item;
        if (typeof entry === "string") item = _zip.getEntry(pth.posix.normalize(entry));
        if (typeof entry === "object" && typeof entry.entryName !== "undefined" && typeof entry.header !== "undefined") item = _zip.getEntry(entry.entryName);
        if (item) {
          return item;
        }
      }
      return null;
    }
    function fixPath(zipPath) {
      const { join: join2, normalize, sep } = pth.posix;
      return join2(".", normalize(sep + zipPath.split("\\").join(sep) + sep));
    }
    function filenameFilter(filterfn) {
      if (filterfn instanceof RegExp) {
        return /* @__PURE__ */ function(rx) {
          return function(filename) {
            return rx.test(filename);
          };
        }(filterfn);
      } else if ("function" !== typeof filterfn) {
        return () => true;
      }
      return filterfn;
    }
    const relativePath = (local, entry) => {
      let lastChar = entry.slice(-1);
      lastChar = lastChar === filetools.sep ? filetools.sep : "";
      return pth.relative(local, entry) + lastChar;
    };
    return {
      /**
       * Extracts the given entry from the archive and returns the content as a Buffer object
       * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
       * @param {Buffer|string} [pass] - password
       * @return Buffer or Null in case of error
       */
      readFile: function(entry, pass) {
        var item = getEntry(entry);
        return item && item.getData(pass) || null;
      },
      /**
       * Returns how many child elements has on entry (directories) on files it is always 0
       * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
       * @returns {integer}
       */
      childCount: function(entry) {
        const item = getEntry(entry);
        if (item) {
          return _zip.getChildCount(item);
        }
      },
      /**
       * Asynchronous readFile
       * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
       * @param {callback} callback
       *
       * @return Buffer or Null in case of error
       */
      readFileAsync: function(entry, callback) {
        var item = getEntry(entry);
        if (item) {
          item.getDataAsync(callback);
        } else {
          callback(null, "getEntry failed for:" + entry);
        }
      },
      /**
       * Extracts the given entry from the archive and returns the content as plain text in the given encoding
       * @param {ZipEntry|string} entry - ZipEntry object or String with the full path of the entry
       * @param {string} encoding - Optional. If no encoding is specified utf8 is used
       *
       * @return String
       */
      readAsText: function(entry, encoding) {
        var item = getEntry(entry);
        if (item) {
          var data = item.getData();
          if (data && data.length) {
            return data.toString(encoding || "utf8");
          }
        }
        return "";
      },
      /**
       * Asynchronous readAsText
       * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
       * @param {callback} callback
       * @param {string} [encoding] - Optional. If no encoding is specified utf8 is used
       *
       * @return String
       */
      readAsTextAsync: function(entry, callback, encoding) {
        var item = getEntry(entry);
        if (item) {
          item.getDataAsync(function(data, err) {
            if (err) {
              callback(data, err);
              return;
            }
            if (data && data.length) {
              callback(data.toString(encoding || "utf8"));
            } else {
              callback("");
            }
          });
        } else {
          callback("");
        }
      },
      /**
       * Remove the entry from the file or the entry and all it's nested directories and files if the given entry is a directory
       *
       * @param {ZipEntry|string} entry
       * @returns {void}
       */
      deleteFile: function(entry, withsubfolders = true) {
        var item = getEntry(entry);
        if (item) {
          _zip.deleteFile(item.entryName, withsubfolders);
        }
      },
      /**
       * Remove the entry from the file or directory without affecting any nested entries
       *
       * @param {ZipEntry|string} entry
       * @returns {void}
       */
      deleteEntry: function(entry) {
        var item = getEntry(entry);
        if (item) {
          _zip.deleteEntry(item.entryName);
        }
      },
      /**
       * Adds a comment to the zip. The zip must be rewritten after adding the comment.
       *
       * @param {string} comment
       */
      addZipComment: function(comment) {
        _zip.comment = comment;
      },
      /**
       * Returns the zip comment
       *
       * @return String
       */
      getZipComment: function() {
        return _zip.comment || "";
      },
      /**
       * Adds a comment to a specified zipEntry. The zip must be rewritten after adding the comment
       * The comment cannot exceed 65535 characters in length
       *
       * @param {ZipEntry} entry
       * @param {string} comment
       */
      addZipEntryComment: function(entry, comment) {
        var item = getEntry(entry);
        if (item) {
          item.comment = comment;
        }
      },
      /**
       * Returns the comment of the specified entry
       *
       * @param {ZipEntry} entry
       * @return String
       */
      getZipEntryComment: function(entry) {
        var item = getEntry(entry);
        if (item) {
          return item.comment || "";
        }
        return "";
      },
      /**
       * Updates the content of an existing entry inside the archive. The zip must be rewritten after updating the content
       *
       * @param {ZipEntry} entry
       * @param {Buffer} content
       */
      updateFile: function(entry, content) {
        var item = getEntry(entry);
        if (item) {
          item.setData(content);
        }
      },
      /**
       * Adds a file from the disk to the archive
       *
       * @param {string} localPath File to add to zip
       * @param {string} [zipPath] Optional path inside the zip
       * @param {string} [zipName] Optional name for the file
       * @param {string} [comment] Optional file comment
       */
      addLocalFile: function(localPath2, zipPath, zipName, comment) {
        if (filetools.fs.existsSync(localPath2)) {
          zipPath = zipPath ? fixPath(zipPath) : "";
          const p = pth.win32.basename(pth.win32.normalize(localPath2));
          zipPath += zipName ? zipName : p;
          const _attr = filetools.fs.statSync(localPath2);
          const data = _attr.isFile() ? filetools.fs.readFileSync(localPath2) : Buffer.alloc(0);
          if (_attr.isDirectory()) zipPath += filetools.sep;
          this.addFile(zipPath, data, comment, _attr);
        } else {
          throw Utils.Errors.FILE_NOT_FOUND(localPath2);
        }
      },
      /**
       * Callback for showing if everything was done.
       *
       * @callback doneCallback
       * @param {Error} err - Error object
       * @param {boolean} done - was request fully completed
       */
      /**
       * Adds a file from the disk to the archive
       *
       * @param {(object|string)} options - options object, if it is string it us used as localPath.
       * @param {string} options.localPath - Local path to the file.
       * @param {string} [options.comment] - Optional file comment.
       * @param {string} [options.zipPath] - Optional path inside the zip
       * @param {string} [options.zipName] - Optional name for the file
       * @param {doneCallback} callback - The callback that handles the response.
       */
      addLocalFileAsync: function(options2, callback) {
        options2 = typeof options2 === "object" ? options2 : { localPath: options2 };
        const localPath2 = pth.resolve(options2.localPath);
        const { comment } = options2;
        let { zipPath, zipName } = options2;
        const self2 = this;
        filetools.fs.stat(localPath2, function(err, stats) {
          if (err) return callback(err, false);
          zipPath = zipPath ? fixPath(zipPath) : "";
          const p = pth.win32.basename(pth.win32.normalize(localPath2));
          zipPath += zipName ? zipName : p;
          if (stats.isFile()) {
            filetools.fs.readFile(localPath2, function(err2, data) {
              if (err2) return callback(err2, false);
              self2.addFile(zipPath, data, comment, stats);
              return setImmediate(callback, void 0, true);
            });
          } else if (stats.isDirectory()) {
            zipPath += filetools.sep;
            self2.addFile(zipPath, Buffer.alloc(0), comment, stats);
            return setImmediate(callback, void 0, true);
          }
        });
      },
      /**
       * Adds a local directory and all its nested files and directories to the archive
       *
       * @param {string} localPath - local path to the folder
       * @param {string} [zipPath] - optional path inside zip
       * @param {(RegExp|function)} [filter] - optional RegExp or Function if files match will be included.
       */
      addLocalFolder: function(localPath2, zipPath, filter2) {
        filter2 = filenameFilter(filter2);
        zipPath = zipPath ? fixPath(zipPath) : "";
        localPath2 = pth.normalize(localPath2);
        if (filetools.fs.existsSync(localPath2)) {
          const items = filetools.findFiles(localPath2);
          const self2 = this;
          if (items.length) {
            for (const filepath of items) {
              const p = pth.join(zipPath, relativePath(localPath2, filepath));
              if (filter2(p)) {
                self2.addLocalFile(filepath, pth.dirname(p));
              }
            }
          }
        } else {
          throw Utils.Errors.FILE_NOT_FOUND(localPath2);
        }
      },
      /**
       * Asynchronous addLocalFolder
       * @param {string} localPath
       * @param {callback} callback
       * @param {string} [zipPath] optional path inside zip
       * @param {RegExp|function} [filter] optional RegExp or Function if files match will
       *               be included.
       */
      addLocalFolderAsync: function(localPath2, callback, zipPath, filter2) {
        filter2 = filenameFilter(filter2);
        zipPath = zipPath ? fixPath(zipPath) : "";
        localPath2 = pth.normalize(localPath2);
        var self2 = this;
        filetools.fs.open(localPath2, "r", function(err) {
          if (err && err.code === "ENOENT") {
            callback(void 0, Utils.Errors.FILE_NOT_FOUND(localPath2));
          } else if (err) {
            callback(void 0, err);
          } else {
            var items = filetools.findFiles(localPath2);
            var i = -1;
            var next = function() {
              i += 1;
              if (i < items.length) {
                var filepath = items[i];
                var p = relativePath(localPath2, filepath).split("\\").join("/");
                p = p.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, "");
                if (filter2(p)) {
                  filetools.fs.stat(filepath, function(er0, stats) {
                    if (er0) callback(void 0, er0);
                    if (stats.isFile()) {
                      filetools.fs.readFile(filepath, function(er1, data) {
                        if (er1) {
                          callback(void 0, er1);
                        } else {
                          self2.addFile(zipPath + p, data, "", stats);
                          next();
                        }
                      });
                    } else {
                      self2.addFile(zipPath + p + "/", Buffer.alloc(0), "", stats);
                      next();
                    }
                  });
                } else {
                  process.nextTick(() => {
                    next();
                  });
                }
              } else {
                callback(true, void 0);
              }
            };
            next();
          }
        });
      },
      /**
       * Adds a local directory and all its nested files and directories to the archive
       *
       * @param {object | string} options - options object, if it is string it us used as localPath.
       * @param {string} options.localPath - Local path to the folder.
       * @param {string} [options.zipPath] - optional path inside zip.
       * @param {RegExp|function} [options.filter] - optional RegExp or Function if files match will be included.
       * @param {function|string} [options.namefix] - optional function to help fix filename
       * @param {doneCallback} callback - The callback that handles the response.
       *
       */
      addLocalFolderAsync2: function(options2, callback) {
        const self2 = this;
        options2 = typeof options2 === "object" ? options2 : { localPath: options2 };
        localPath = pth.resolve(fixPath(options2.localPath));
        let { zipPath, filter: filter2, namefix } = options2;
        if (filter2 instanceof RegExp) {
          filter2 = /* @__PURE__ */ function(rx) {
            return function(filename) {
              return rx.test(filename);
            };
          }(filter2);
        } else if ("function" !== typeof filter2) {
          filter2 = function() {
            return true;
          };
        }
        zipPath = zipPath ? fixPath(zipPath) : "";
        if (namefix == "latin1") {
          namefix = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, "");
        }
        if (typeof namefix !== "function") namefix = (str) => str;
        const relPathFix = (entry) => pth.join(zipPath, namefix(relativePath(localPath, entry)));
        const fileNameFix = (entry) => pth.win32.basename(pth.win32.normalize(namefix(entry)));
        filetools.fs.open(localPath, "r", function(err) {
          if (err && err.code === "ENOENT") {
            callback(void 0, Utils.Errors.FILE_NOT_FOUND(localPath));
          } else if (err) {
            callback(void 0, err);
          } else {
            filetools.findFilesAsync(localPath, function(err2, fileEntries) {
              if (err2) return callback(err2);
              fileEntries = fileEntries.filter((dir) => filter2(relPathFix(dir)));
              if (!fileEntries.length) callback(void 0, false);
              setImmediate(
                fileEntries.reverse().reduce(function(next, entry) {
                  return function(err3, done) {
                    if (err3 || done === false) return setImmediate(next, err3, false);
                    self2.addLocalFileAsync(
                      {
                        localPath: entry,
                        zipPath: pth.dirname(relPathFix(entry)),
                        zipName: fileNameFix(entry)
                      },
                      next
                    );
                  };
                }, callback)
              );
            });
          }
        });
      },
      /**
       * Adds a local directory and all its nested files and directories to the archive
       *
       * @param {string} localPath - path where files will be extracted
       * @param {object} props - optional properties
       * @param {string} [props.zipPath] - optional path inside zip
       * @param {RegExp|function} [props.filter] - optional RegExp or Function if files match will be included.
       * @param {function|string} [props.namefix] - optional function to help fix filename
       */
      addLocalFolderPromise: function(localPath2, props2) {
        return new Promise((resolve, reject) => {
          this.addLocalFolderAsync2(Object.assign({ localPath: localPath2 }, props2), (err, done) => {
            if (err) reject(err);
            if (done) resolve(this);
          });
        });
      },
      /**
       * Allows you to create a entry (file or directory) in the zip file.
       * If you want to create a directory the entryName must end in / and a null buffer should be provided.
       * Comment and attributes are optional
       *
       * @param {string} entryName
       * @param {Buffer | string} content - file content as buffer or utf8 coded string
       * @param {string} [comment] - file comment
       * @param {number | object} [attr] - number as unix file permissions, object as filesystem Stats object
       */
      addFile: function(entryName, content, comment, attr) {
        entryName = zipnamefix(entryName);
        let entry = getEntry(entryName);
        const update = entry != null;
        if (!update) {
          entry = new ZipEntry(opts);
          entry.entryName = entryName;
        }
        entry.comment = comment || "";
        const isStat = "object" === typeof attr && attr instanceof filetools.fs.Stats;
        if (isStat) {
          entry.header.time = attr.mtime;
        }
        var fileattr = entry.isDirectory ? 16 : 0;
        let unix = entry.isDirectory ? 16384 : 32768;
        if (isStat) {
          unix |= 4095 & attr.mode;
        } else if ("number" === typeof attr) {
          unix |= 4095 & attr;
        } else {
          unix |= entry.isDirectory ? 493 : 420;
        }
        fileattr = (fileattr | unix << 16) >>> 0;
        entry.attr = fileattr;
        entry.setData(content);
        if (!update) _zip.setEntry(entry);
        return entry;
      },
      /**
       * Returns an array of ZipEntry objects representing the files and folders inside the archive
       *
       * @param {string} [password]
       * @returns Array
       */
      getEntries: function(password) {
        _zip.password = password;
        return _zip ? _zip.entries : [];
      },
      /**
       * Returns a ZipEntry object representing the file or folder specified by ``name``.
       *
       * @param {string} name
       * @return ZipEntry
       */
      getEntry: function(name) {
        return getEntry(name);
      },
      getEntryCount: function() {
        return _zip.getEntryCount();
      },
      forEach: function(callback) {
        return _zip.forEach(callback);
      },
      /**
       * Extracts the given entry to the given targetPath
       * If the entry is a directory inside the archive, the entire directory and it's subdirectories will be extracted
       *
       * @param {string|ZipEntry} entry - ZipEntry object or String with the full path of the entry
       * @param {string} targetPath - Target folder where to write the file
       * @param {boolean} [maintainEntryPath=true] - If maintainEntryPath is true and the entry is inside a folder, the entry folder will be created in targetPath as well. Default is TRUE
       * @param {boolean} [overwrite=false] - If the file already exists at the target path, the file will be overwriten if this is true.
       * @param {boolean} [keepOriginalPermission=false] - The file will be set as the permission from the entry if this is true.
       * @param {string} [outFileName] - String If set will override the filename of the extracted file (Only works if the entry is a file)
       *
       * @return Boolean
       */
      extractEntryTo: function(entry, targetPath, maintainEntryPath, overwrite, keepOriginalPermission, outFileName) {
        overwrite = get_Bool(false, overwrite);
        keepOriginalPermission = get_Bool(false, keepOriginalPermission);
        maintainEntryPath = get_Bool(true, maintainEntryPath);
        outFileName = get_Str(keepOriginalPermission, outFileName);
        var item = getEntry(entry);
        if (!item) {
          throw Utils.Errors.NO_ENTRY();
        }
        var entryName = canonical(item.entryName);
        var target = sanitize(targetPath, outFileName && !item.isDirectory ? outFileName : maintainEntryPath ? entryName : pth.basename(entryName));
        if (item.isDirectory) {
          var children2 = _zip.getEntryChildren(item);
          children2.forEach(function(child) {
            if (child.isDirectory) return;
            var content2 = child.getData();
            if (!content2) {
              throw Utils.Errors.CANT_EXTRACT_FILE();
            }
            var name = canonical(child.entryName);
            var childName = sanitize(targetPath, maintainEntryPath ? name : pth.basename(name));
            const fileAttr2 = keepOriginalPermission ? child.header.fileAttr : void 0;
            filetools.writeFileTo(childName, content2, overwrite, fileAttr2);
          });
          return true;
        }
        var content = item.getData(_zip.password);
        if (!content) throw Utils.Errors.CANT_EXTRACT_FILE();
        if (filetools.fs.existsSync(target) && !overwrite) {
          throw Utils.Errors.CANT_OVERRIDE();
        }
        const fileAttr = keepOriginalPermission ? entry.header.fileAttr : void 0;
        filetools.writeFileTo(target, content, overwrite, fileAttr);
        return true;
      },
      /**
       * Test the archive
       * @param {string} [pass]
       */
      test: function(pass) {
        if (!_zip) {
          return false;
        }
        for (var entry in _zip.entries) {
          try {
            if (entry.isDirectory) {
              continue;
            }
            var content = _zip.entries[entry].getData(pass);
            if (!content) {
              return false;
            }
          } catch (err) {
            return false;
          }
        }
        return true;
      },
      /**
       * Extracts the entire archive to the given location
       *
       * @param {string} targetPath Target location
       * @param {boolean} [overwrite=false] If the file already exists at the target path, the file will be overwriten if this is true.
       *                  Default is FALSE
       * @param {boolean} [keepOriginalPermission=false] The file will be set as the permission from the entry if this is true.
       *                  Default is FALSE
       * @param {string|Buffer} [pass] password
       */
      extractAllTo: function(targetPath, overwrite, keepOriginalPermission, pass) {
        keepOriginalPermission = get_Bool(false, keepOriginalPermission);
        pass = get_Str(keepOriginalPermission, pass);
        overwrite = get_Bool(false, overwrite);
        if (!_zip) throw Utils.Errors.NO_ZIP();
        _zip.entries.forEach(function(entry) {
          var entryName = sanitize(targetPath, canonical(entry.entryName));
          if (entry.isDirectory) {
            filetools.makeDir(entryName);
            return;
          }
          var content = entry.getData(pass);
          if (!content) {
            throw Utils.Errors.CANT_EXTRACT_FILE();
          }
          const fileAttr = keepOriginalPermission ? entry.header.fileAttr : void 0;
          filetools.writeFileTo(entryName, content, overwrite, fileAttr);
          try {
            filetools.fs.utimesSync(entryName, entry.header.time, entry.header.time);
          } catch (err) {
            throw Utils.Errors.CANT_EXTRACT_FILE();
          }
        });
      },
      /**
       * Asynchronous extractAllTo
       *
       * @param {string} targetPath Target location
       * @param {boolean} [overwrite=false] If the file already exists at the target path, the file will be overwriten if this is true.
       *                  Default is FALSE
       * @param {boolean} [keepOriginalPermission=false] The file will be set as the permission from the entry if this is true.
       *                  Default is FALSE
       * @param {function} callback The callback will be executed when all entries are extracted successfully or any error is thrown.
       */
      extractAllToAsync: function(targetPath, overwrite, keepOriginalPermission, callback) {
        callback = get_Fun(overwrite, keepOriginalPermission, callback);
        keepOriginalPermission = get_Bool(false, keepOriginalPermission);
        overwrite = get_Bool(false, overwrite);
        if (!callback) {
          return new Promise((resolve, reject) => {
            this.extractAllToAsync(targetPath, overwrite, keepOriginalPermission, function(err) {
              if (err) {
                reject(err);
              } else {
                resolve(this);
              }
            });
          });
        }
        if (!_zip) {
          callback(Utils.Errors.NO_ZIP());
          return;
        }
        targetPath = pth.resolve(targetPath);
        const getPath = (entry) => sanitize(targetPath, pth.normalize(canonical(entry.entryName)));
        const getError = (msg, file) => new Error(msg + ': "' + file + '"');
        const dirEntries = [];
        const fileEntries = [];
        _zip.entries.forEach((e) => {
          if (e.isDirectory) {
            dirEntries.push(e);
          } else {
            fileEntries.push(e);
          }
        });
        for (const entry of dirEntries) {
          const dirPath = getPath(entry);
          const dirAttr = keepOriginalPermission ? entry.header.fileAttr : void 0;
          try {
            filetools.makeDir(dirPath);
            if (dirAttr) filetools.fs.chmodSync(dirPath, dirAttr);
            filetools.fs.utimesSync(dirPath, entry.header.time, entry.header.time);
          } catch (er) {
            callback(getError("Unable to create folder", dirPath));
          }
        }
        fileEntries.reverse().reduce(function(next, entry) {
          return function(err) {
            if (err) {
              next(err);
            } else {
              const entryName = pth.normalize(canonical(entry.entryName));
              const filePath = sanitize(targetPath, entryName);
              entry.getDataAsync(function(content, err_1) {
                if (err_1) {
                  next(err_1);
                } else if (!content) {
                  next(Utils.Errors.CANT_EXTRACT_FILE());
                } else {
                  const fileAttr = keepOriginalPermission ? entry.header.fileAttr : void 0;
                  filetools.writeFileToAsync(filePath, content, overwrite, fileAttr, function(succ) {
                    if (!succ) {
                      next(getError("Unable to write file", filePath));
                    }
                    filetools.fs.utimes(filePath, entry.header.time, entry.header.time, function(err_2) {
                      if (err_2) {
                        next(getError("Unable to set times", filePath));
                      } else {
                        next();
                      }
                    });
                  });
                }
              });
            }
          };
        }, callback)();
      },
      /**
       * Writes the newly created zip file to disk at the specified location or if a zip was opened and no ``targetFileName`` is provided, it will overwrite the opened zip
       *
       * @param {string} targetFileName
       * @param {function} callback
       */
      writeZip: function(targetFileName, callback) {
        if (arguments.length === 1) {
          if (typeof targetFileName === "function") {
            callback = targetFileName;
            targetFileName = "";
          }
        }
        if (!targetFileName && opts.filename) {
          targetFileName = opts.filename;
        }
        if (!targetFileName) return;
        var zipData = _zip.compressToBuffer();
        if (zipData) {
          var ok = filetools.writeFileTo(targetFileName, zipData, true);
          if (typeof callback === "function") callback(!ok ? new Error("failed") : null, "");
        }
      },
      /**
      	         *
      	         * @param {string} targetFileName
      	         * @param {object} [props]
      	         * @param {boolean} [props.overwrite=true] If the file already exists at the target path, the file will be overwriten if this is true.
      	         * @param {boolean} [props.perm] The file will be set as the permission from the entry if this is true.
      
      	         * @returns {Promise<void>}
      	         */
      writeZipPromise: function(targetFileName, props2) {
        const { overwrite, perm } = Object.assign({ overwrite: true }, props2);
        return new Promise((resolve, reject) => {
          if (!targetFileName && opts.filename) targetFileName = opts.filename;
          if (!targetFileName) reject("ADM-ZIP: ZIP File Name Missing");
          this.toBufferPromise().then((zipData) => {
            const ret = (done) => done ? resolve(done) : reject("ADM-ZIP: Wasn't able to write zip file");
            filetools.writeFileToAsync(targetFileName, zipData, overwrite, perm, ret);
          }, reject);
        });
      },
      /**
       * @returns {Promise<Buffer>} A promise to the Buffer.
       */
      toBufferPromise: function() {
        return new Promise((resolve, reject) => {
          _zip.toAsyncBuffer(resolve, reject);
        });
      },
      /**
       * Returns the content of the entire zip file as a Buffer object
       *
       * @prop {function} [onSuccess]
       * @prop {function} [onFail]
       * @prop {function} [onItemStart]
       * @prop {function} [onItemEnd]
       * @returns {Buffer}
       */
      toBuffer: function(onSuccess, onFail, onItemStart, onItemEnd) {
        if (typeof onSuccess === "function") {
          _zip.toAsyncBuffer(onSuccess, onFail, onItemStart, onItemEnd);
          return null;
        }
        return _zip.compressToBuffer();
      }
    };
  };
  return admZip;
}
var hasRequiredZipfile;
function requireZipfile() {
  if (hasRequiredZipfile) return zipfile;
  hasRequiredZipfile = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ZipFile = void 0;
    try {
      exports.ZipFile = require("zipfile").ZipFile;
    } catch (err) {
      const AdmZip = requireAdmZip();
      exports.ZipFile = class {
        constructor(filename) {
          this.admZip = new AdmZip(filename);
          this.names = this.admZip.getEntries().map(function(zipEntry2) {
            return zipEntry2.entryName;
          });
        }
        readFile(name, cb) {
          this.admZip.readFileAsync(this.admZip.getEntry(name), (buffer, error) => {
            if (error || !buffer) {
              name = decodeURIComponent(name);
              this.admZip.readFileAsync(this.admZip.getEntry(name), (buffer2, error2) => cb(error2, buffer2));
            } else {
              cb(error, buffer);
            }
          });
        }
        get count() {
          return this.names.length;
        }
      };
    }
    exports.default = exports.ZipFile;
  })(zipfile);
  return zipfile;
}
var xml2js = {};
var defaults = {};
var hasRequiredDefaults;
function requireDefaults() {
  if (hasRequiredDefaults) return defaults;
  hasRequiredDefaults = 1;
  (function() {
    defaults.defaults = {
      "0.1": {
        explicitCharkey: false,
        trim: true,
        normalize: true,
        normalizeTags: false,
        attrkey: "@",
        charkey: "#",
        explicitArray: false,
        ignoreAttrs: false,
        mergeAttrs: false,
        explicitRoot: false,
        validator: null,
        xmlns: false,
        explicitChildren: false,
        childkey: "@@",
        charsAsChildren: false,
        includeWhiteChars: false,
        async: false,
        strict: true,
        attrNameProcessors: null,
        attrValueProcessors: null,
        tagNameProcessors: null,
        valueProcessors: null,
        emptyTag: ""
      },
      "0.2": {
        explicitCharkey: false,
        trim: false,
        normalize: false,
        normalizeTags: false,
        attrkey: "$",
        charkey: "_",
        explicitArray: true,
        ignoreAttrs: false,
        mergeAttrs: false,
        explicitRoot: true,
        validator: null,
        xmlns: false,
        explicitChildren: false,
        preserveChildrenOrder: false,
        childkey: "$$",
        charsAsChildren: false,
        includeWhiteChars: false,
        async: false,
        strict: true,
        attrNameProcessors: null,
        attrValueProcessors: null,
        tagNameProcessors: null,
        valueProcessors: null,
        rootName: "root",
        xmldec: {
          "version": "1.0",
          "encoding": "UTF-8",
          "standalone": true
        },
        doctype: null,
        renderOpts: {
          "pretty": true,
          "indent": "  ",
          "newline": "\n"
        },
        headless: false,
        chunkSize: 1e4,
        emptyTag: "",
        cdata: false
      }
    };
  }).call(commonjsGlobal);
  return defaults;
}
var builder = {};
var lib = {};
var Utility = {};
var hasRequiredUtility;
function requireUtility() {
  if (hasRequiredUtility) return Utility;
  hasRequiredUtility = 1;
  (function() {
    var assign, getValue, isArray, isEmpty, isFunction, isObject, isPlainObject, slice = [].slice, hasProp = {}.hasOwnProperty;
    assign = function() {
      var i, key, len, source, sources, target;
      target = arguments[0], sources = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      if (isFunction(Object.assign)) {
        Object.assign.apply(null, arguments);
      } else {
        for (i = 0, len = sources.length; i < len; i++) {
          source = sources[i];
          if (source != null) {
            for (key in source) {
              if (!hasProp.call(source, key)) continue;
              target[key] = source[key];
            }
          }
        }
      }
      return target;
    };
    isFunction = function(val) {
      return !!val && Object.prototype.toString.call(val) === "[object Function]";
    };
    isObject = function(val) {
      var ref;
      return !!val && ((ref = typeof val) === "function" || ref === "object");
    };
    isArray = function(val) {
      if (isFunction(Array.isArray)) {
        return Array.isArray(val);
      } else {
        return Object.prototype.toString.call(val) === "[object Array]";
      }
    };
    isEmpty = function(val) {
      var key;
      if (isArray(val)) {
        return !val.length;
      } else {
        for (key in val) {
          if (!hasProp.call(val, key)) continue;
          return false;
        }
        return true;
      }
    };
    isPlainObject = function(val) {
      var ctor, proto;
      return isObject(val) && (proto = Object.getPrototypeOf(val)) && (ctor = proto.constructor) && typeof ctor === "function" && ctor instanceof ctor && Function.prototype.toString.call(ctor) === Function.prototype.toString.call(Object);
    };
    getValue = function(obj) {
      if (isFunction(obj.valueOf)) {
        return obj.valueOf();
      } else {
        return obj;
      }
    };
    Utility.assign = assign;
    Utility.isFunction = isFunction;
    Utility.isObject = isObject;
    Utility.isArray = isArray;
    Utility.isEmpty = isEmpty;
    Utility.isPlainObject = isPlainObject;
    Utility.getValue = getValue;
  }).call(commonjsGlobal);
  return Utility;
}
var XMLDOMImplementation = { exports: {} };
var hasRequiredXMLDOMImplementation;
function requireXMLDOMImplementation() {
  if (hasRequiredXMLDOMImplementation) return XMLDOMImplementation.exports;
  hasRequiredXMLDOMImplementation = 1;
  (function() {
    XMLDOMImplementation.exports = function() {
      function XMLDOMImplementation2() {
      }
      XMLDOMImplementation2.prototype.hasFeature = function(feature, version) {
        return true;
      };
      XMLDOMImplementation2.prototype.createDocumentType = function(qualifiedName, publicId, systemId) {
        throw new Error("This DOM method is not implemented.");
      };
      XMLDOMImplementation2.prototype.createDocument = function(namespaceURI, qualifiedName, doctype) {
        throw new Error("This DOM method is not implemented.");
      };
      XMLDOMImplementation2.prototype.createHTMLDocument = function(title) {
        throw new Error("This DOM method is not implemented.");
      };
      XMLDOMImplementation2.prototype.getFeature = function(feature, version) {
        throw new Error("This DOM method is not implemented.");
      };
      return XMLDOMImplementation2;
    }();
  }).call(commonjsGlobal);
  return XMLDOMImplementation.exports;
}
var XMLDocument = { exports: {} };
var XMLDOMConfiguration = { exports: {} };
var XMLDOMErrorHandler = { exports: {} };
var hasRequiredXMLDOMErrorHandler;
function requireXMLDOMErrorHandler() {
  if (hasRequiredXMLDOMErrorHandler) return XMLDOMErrorHandler.exports;
  hasRequiredXMLDOMErrorHandler = 1;
  (function() {
    XMLDOMErrorHandler.exports = function() {
      function XMLDOMErrorHandler2() {
      }
      XMLDOMErrorHandler2.prototype.handleError = function(error) {
        throw new Error(error);
      };
      return XMLDOMErrorHandler2;
    }();
  }).call(commonjsGlobal);
  return XMLDOMErrorHandler.exports;
}
var XMLDOMStringList = { exports: {} };
var hasRequiredXMLDOMStringList;
function requireXMLDOMStringList() {
  if (hasRequiredXMLDOMStringList) return XMLDOMStringList.exports;
  hasRequiredXMLDOMStringList = 1;
  (function() {
    XMLDOMStringList.exports = function() {
      function XMLDOMStringList2(arr) {
        this.arr = arr || [];
      }
      Object.defineProperty(XMLDOMStringList2.prototype, "length", {
        get: function() {
          return this.arr.length;
        }
      });
      XMLDOMStringList2.prototype.item = function(index) {
        return this.arr[index] || null;
      };
      XMLDOMStringList2.prototype.contains = function(str) {
        return this.arr.indexOf(str) !== -1;
      };
      return XMLDOMStringList2;
    }();
  }).call(commonjsGlobal);
  return XMLDOMStringList.exports;
}
var hasRequiredXMLDOMConfiguration;
function requireXMLDOMConfiguration() {
  if (hasRequiredXMLDOMConfiguration) return XMLDOMConfiguration.exports;
  hasRequiredXMLDOMConfiguration = 1;
  (function() {
    var XMLDOMErrorHandler2, XMLDOMStringList2;
    XMLDOMErrorHandler2 = requireXMLDOMErrorHandler();
    XMLDOMStringList2 = requireXMLDOMStringList();
    XMLDOMConfiguration.exports = function() {
      function XMLDOMConfiguration2() {
        this.defaultParams = {
          "canonical-form": false,
          "cdata-sections": false,
          "comments": false,
          "datatype-normalization": false,
          "element-content-whitespace": true,
          "entities": true,
          "error-handler": new XMLDOMErrorHandler2(),
          "infoset": true,
          "validate-if-schema": false,
          "namespaces": true,
          "namespace-declarations": true,
          "normalize-characters": false,
          "schema-location": "",
          "schema-type": "",
          "split-cdata-sections": true,
          "validate": false,
          "well-formed": true
        };
        this.params = Object.create(this.defaultParams);
      }
      Object.defineProperty(XMLDOMConfiguration2.prototype, "parameterNames", {
        get: function() {
          return new XMLDOMStringList2(Object.keys(this.defaultParams));
        }
      });
      XMLDOMConfiguration2.prototype.getParameter = function(name) {
        if (this.params.hasOwnProperty(name)) {
          return this.params[name];
        } else {
          return null;
        }
      };
      XMLDOMConfiguration2.prototype.canSetParameter = function(name, value) {
        return true;
      };
      XMLDOMConfiguration2.prototype.setParameter = function(name, value) {
        if (value != null) {
          return this.params[name] = value;
        } else {
          return delete this.params[name];
        }
      };
      return XMLDOMConfiguration2;
    }();
  }).call(commonjsGlobal);
  return XMLDOMConfiguration.exports;
}
var XMLNode = { exports: {} };
var XMLElement = { exports: {} };
var NodeType = { exports: {} };
var hasRequiredNodeType;
function requireNodeType() {
  if (hasRequiredNodeType) return NodeType.exports;
  hasRequiredNodeType = 1;
  (function() {
    NodeType.exports = {
      Element: 1,
      Attribute: 2,
      Text: 3,
      CData: 4,
      EntityReference: 5,
      EntityDeclaration: 6,
      ProcessingInstruction: 7,
      Comment: 8,
      Document: 9,
      DocType: 10,
      DocumentFragment: 11,
      NotationDeclaration: 12,
      Declaration: 201,
      Raw: 202,
      AttributeDeclaration: 203,
      ElementDeclaration: 204,
      Dummy: 205
    };
  }).call(commonjsGlobal);
  return NodeType.exports;
}
var XMLAttribute = { exports: {} };
var hasRequiredXMLAttribute;
function requireXMLAttribute() {
  if (hasRequiredXMLAttribute) return XMLAttribute.exports;
  hasRequiredXMLAttribute = 1;
  (function() {
    var NodeType2;
    NodeType2 = requireNodeType();
    requireXMLNode();
    XMLAttribute.exports = function() {
      function XMLAttribute2(parent, name, value) {
        this.parent = parent;
        if (this.parent) {
          this.options = this.parent.options;
          this.stringify = this.parent.stringify;
        }
        if (name == null) {
          throw new Error("Missing attribute name. " + this.debugInfo(name));
        }
        this.name = this.stringify.name(name);
        this.value = this.stringify.attValue(value);
        this.type = NodeType2.Attribute;
        this.isId = false;
        this.schemaTypeInfo = null;
      }
      Object.defineProperty(XMLAttribute2.prototype, "nodeType", {
        get: function() {
          return this.type;
        }
      });
      Object.defineProperty(XMLAttribute2.prototype, "ownerElement", {
        get: function() {
          return this.parent;
        }
      });
      Object.defineProperty(XMLAttribute2.prototype, "textContent", {
        get: function() {
          return this.value;
        },
        set: function(value) {
          return this.value = value || "";
        }
      });
      Object.defineProperty(XMLAttribute2.prototype, "namespaceURI", {
        get: function() {
          return "";
        }
      });
      Object.defineProperty(XMLAttribute2.prototype, "prefix", {
        get: function() {
          return "";
        }
      });
      Object.defineProperty(XMLAttribute2.prototype, "localName", {
        get: function() {
          return this.name;
        }
      });
      Object.defineProperty(XMLAttribute2.prototype, "specified", {
        get: function() {
          return true;
        }
      });
      XMLAttribute2.prototype.clone = function() {
        return Object.create(this);
      };
      XMLAttribute2.prototype.toString = function(options) {
        return this.options.writer.attribute(this, this.options.writer.filterOptions(options));
      };
      XMLAttribute2.prototype.debugInfo = function(name) {
        name = name || this.name;
        if (name == null) {
          return "parent: <" + this.parent.name + ">";
        } else {
          return "attribute: {" + name + "}, parent: <" + this.parent.name + ">";
        }
      };
      XMLAttribute2.prototype.isEqualNode = function(node) {
        if (node.namespaceURI !== this.namespaceURI) {
          return false;
        }
        if (node.prefix !== this.prefix) {
          return false;
        }
        if (node.localName !== this.localName) {
          return false;
        }
        if (node.value !== this.value) {
          return false;
        }
        return true;
      };
      return XMLAttribute2;
    }();
  }).call(commonjsGlobal);
  return XMLAttribute.exports;
}
var XMLNamedNodeMap = { exports: {} };
var hasRequiredXMLNamedNodeMap;
function requireXMLNamedNodeMap() {
  if (hasRequiredXMLNamedNodeMap) return XMLNamedNodeMap.exports;
  hasRequiredXMLNamedNodeMap = 1;
  (function() {
    XMLNamedNodeMap.exports = function() {
      function XMLNamedNodeMap2(nodes) {
        this.nodes = nodes;
      }
      Object.defineProperty(XMLNamedNodeMap2.prototype, "length", {
        get: function() {
          return Object.keys(this.nodes).length || 0;
        }
      });
      XMLNamedNodeMap2.prototype.clone = function() {
        return this.nodes = null;
      };
      XMLNamedNodeMap2.prototype.getNamedItem = function(name) {
        return this.nodes[name];
      };
      XMLNamedNodeMap2.prototype.setNamedItem = function(node) {
        var oldNode;
        oldNode = this.nodes[node.nodeName];
        this.nodes[node.nodeName] = node;
        return oldNode || null;
      };
      XMLNamedNodeMap2.prototype.removeNamedItem = function(name) {
        var oldNode;
        oldNode = this.nodes[name];
        delete this.nodes[name];
        return oldNode || null;
      };
      XMLNamedNodeMap2.prototype.item = function(index) {
        return this.nodes[Object.keys(this.nodes)[index]] || null;
      };
      XMLNamedNodeMap2.prototype.getNamedItemNS = function(namespaceURI, localName) {
        throw new Error("This DOM method is not implemented.");
      };
      XMLNamedNodeMap2.prototype.setNamedItemNS = function(node) {
        throw new Error("This DOM method is not implemented.");
      };
      XMLNamedNodeMap2.prototype.removeNamedItemNS = function(namespaceURI, localName) {
        throw new Error("This DOM method is not implemented.");
      };
      return XMLNamedNodeMap2;
    }();
  }).call(commonjsGlobal);
  return XMLNamedNodeMap.exports;
}
var hasRequiredXMLElement;
function requireXMLElement() {
  if (hasRequiredXMLElement) return XMLElement.exports;
  hasRequiredXMLElement = 1;
  (function() {
    var NodeType2, XMLAttribute2, XMLNamedNodeMap2, XMLNode2, getValue, isFunction, isObject, ref, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    ref = requireUtility(), isObject = ref.isObject, isFunction = ref.isFunction, getValue = ref.getValue;
    XMLNode2 = requireXMLNode();
    NodeType2 = requireNodeType();
    XMLAttribute2 = requireXMLAttribute();
    XMLNamedNodeMap2 = requireXMLNamedNodeMap();
    XMLElement.exports = function(superClass) {
      extend(XMLElement2, superClass);
      function XMLElement2(parent, name, attributes) {
        var child, j, len, ref1;
        XMLElement2.__super__.constructor.call(this, parent);
        if (name == null) {
          throw new Error("Missing element name. " + this.debugInfo());
        }
        this.name = this.stringify.name(name);
        this.type = NodeType2.Element;
        this.attribs = {};
        this.schemaTypeInfo = null;
        if (attributes != null) {
          this.attribute(attributes);
        }
        if (parent.type === NodeType2.Document) {
          this.isRoot = true;
          this.documentObject = parent;
          parent.rootObject = this;
          if (parent.children) {
            ref1 = parent.children;
            for (j = 0, len = ref1.length; j < len; j++) {
              child = ref1[j];
              if (child.type === NodeType2.DocType) {
                child.name = this.name;
                break;
              }
            }
          }
        }
      }
      Object.defineProperty(XMLElement2.prototype, "tagName", {
        get: function() {
          return this.name;
        }
      });
      Object.defineProperty(XMLElement2.prototype, "namespaceURI", {
        get: function() {
          return "";
        }
      });
      Object.defineProperty(XMLElement2.prototype, "prefix", {
        get: function() {
          return "";
        }
      });
      Object.defineProperty(XMLElement2.prototype, "localName", {
        get: function() {
          return this.name;
        }
      });
      Object.defineProperty(XMLElement2.prototype, "id", {
        get: function() {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
      });
      Object.defineProperty(XMLElement2.prototype, "className", {
        get: function() {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
      });
      Object.defineProperty(XMLElement2.prototype, "classList", {
        get: function() {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
      });
      Object.defineProperty(XMLElement2.prototype, "attributes", {
        get: function() {
          if (!this.attributeMap || !this.attributeMap.nodes) {
            this.attributeMap = new XMLNamedNodeMap2(this.attribs);
          }
          return this.attributeMap;
        }
      });
      XMLElement2.prototype.clone = function() {
        var att, attName, clonedSelf, ref1;
        clonedSelf = Object.create(this);
        if (clonedSelf.isRoot) {
          clonedSelf.documentObject = null;
        }
        clonedSelf.attribs = {};
        ref1 = this.attribs;
        for (attName in ref1) {
          if (!hasProp.call(ref1, attName)) continue;
          att = ref1[attName];
          clonedSelf.attribs[attName] = att.clone();
        }
        clonedSelf.children = [];
        this.children.forEach(function(child) {
          var clonedChild;
          clonedChild = child.clone();
          clonedChild.parent = clonedSelf;
          return clonedSelf.children.push(clonedChild);
        });
        return clonedSelf;
      };
      XMLElement2.prototype.attribute = function(name, value) {
        var attName, attValue;
        if (name != null) {
          name = getValue(name);
        }
        if (isObject(name)) {
          for (attName in name) {
            if (!hasProp.call(name, attName)) continue;
            attValue = name[attName];
            this.attribute(attName, attValue);
          }
        } else {
          if (isFunction(value)) {
            value = value.apply();
          }
          if (this.options.keepNullAttributes && value == null) {
            this.attribs[name] = new XMLAttribute2(this, name, "");
          } else if (value != null) {
            this.attribs[name] = new XMLAttribute2(this, name, value);
          }
        }
        return this;
      };
      XMLElement2.prototype.removeAttribute = function(name) {
        var attName, j, len;
        if (name == null) {
          throw new Error("Missing attribute name. " + this.debugInfo());
        }
        name = getValue(name);
        if (Array.isArray(name)) {
          for (j = 0, len = name.length; j < len; j++) {
            attName = name[j];
            delete this.attribs[attName];
          }
        } else {
          delete this.attribs[name];
        }
        return this;
      };
      XMLElement2.prototype.toString = function(options) {
        return this.options.writer.element(this, this.options.writer.filterOptions(options));
      };
      XMLElement2.prototype.att = function(name, value) {
        return this.attribute(name, value);
      };
      XMLElement2.prototype.a = function(name, value) {
        return this.attribute(name, value);
      };
      XMLElement2.prototype.getAttribute = function(name) {
        if (this.attribs.hasOwnProperty(name)) {
          return this.attribs[name].value;
        } else {
          return null;
        }
      };
      XMLElement2.prototype.setAttribute = function(name, value) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLElement2.prototype.getAttributeNode = function(name) {
        if (this.attribs.hasOwnProperty(name)) {
          return this.attribs[name];
        } else {
          return null;
        }
      };
      XMLElement2.prototype.setAttributeNode = function(newAttr) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLElement2.prototype.removeAttributeNode = function(oldAttr) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLElement2.prototype.getElementsByTagName = function(name) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLElement2.prototype.getAttributeNS = function(namespaceURI, localName) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLElement2.prototype.setAttributeNS = function(namespaceURI, qualifiedName, value) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLElement2.prototype.removeAttributeNS = function(namespaceURI, localName) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLElement2.prototype.getAttributeNodeNS = function(namespaceURI, localName) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLElement2.prototype.setAttributeNodeNS = function(newAttr) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLElement2.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLElement2.prototype.hasAttribute = function(name) {
        return this.attribs.hasOwnProperty(name);
      };
      XMLElement2.prototype.hasAttributeNS = function(namespaceURI, localName) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLElement2.prototype.setIdAttribute = function(name, isId) {
        if (this.attribs.hasOwnProperty(name)) {
          return this.attribs[name].isId;
        } else {
          return isId;
        }
      };
      XMLElement2.prototype.setIdAttributeNS = function(namespaceURI, localName, isId) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLElement2.prototype.setIdAttributeNode = function(idAttr, isId) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLElement2.prototype.getElementsByTagName = function(tagname) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLElement2.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLElement2.prototype.getElementsByClassName = function(classNames) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLElement2.prototype.isEqualNode = function(node) {
        var i, j, ref1;
        if (!XMLElement2.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
          return false;
        }
        if (node.namespaceURI !== this.namespaceURI) {
          return false;
        }
        if (node.prefix !== this.prefix) {
          return false;
        }
        if (node.localName !== this.localName) {
          return false;
        }
        if (node.attribs.length !== this.attribs.length) {
          return false;
        }
        for (i = j = 0, ref1 = this.attribs.length - 1; 0 <= ref1 ? j <= ref1 : j >= ref1; i = 0 <= ref1 ? ++j : --j) {
          if (!this.attribs[i].isEqualNode(node.attribs[i])) {
            return false;
          }
        }
        return true;
      };
      return XMLElement2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLElement.exports;
}
var XMLCData = { exports: {} };
var XMLCharacterData = { exports: {} };
var hasRequiredXMLCharacterData;
function requireXMLCharacterData() {
  if (hasRequiredXMLCharacterData) return XMLCharacterData.exports;
  hasRequiredXMLCharacterData = 1;
  (function() {
    var XMLNode2, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    XMLNode2 = requireXMLNode();
    XMLCharacterData.exports = function(superClass) {
      extend(XMLCharacterData2, superClass);
      function XMLCharacterData2(parent) {
        XMLCharacterData2.__super__.constructor.call(this, parent);
        this.value = "";
      }
      Object.defineProperty(XMLCharacterData2.prototype, "data", {
        get: function() {
          return this.value;
        },
        set: function(value) {
          return this.value = value || "";
        }
      });
      Object.defineProperty(XMLCharacterData2.prototype, "length", {
        get: function() {
          return this.value.length;
        }
      });
      Object.defineProperty(XMLCharacterData2.prototype, "textContent", {
        get: function() {
          return this.value;
        },
        set: function(value) {
          return this.value = value || "";
        }
      });
      XMLCharacterData2.prototype.clone = function() {
        return Object.create(this);
      };
      XMLCharacterData2.prototype.substringData = function(offset, count) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLCharacterData2.prototype.appendData = function(arg) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLCharacterData2.prototype.insertData = function(offset, arg) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLCharacterData2.prototype.deleteData = function(offset, count) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLCharacterData2.prototype.replaceData = function(offset, count, arg) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLCharacterData2.prototype.isEqualNode = function(node) {
        if (!XMLCharacterData2.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
          return false;
        }
        if (node.data !== this.data) {
          return false;
        }
        return true;
      };
      return XMLCharacterData2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLCharacterData.exports;
}
var hasRequiredXMLCData;
function requireXMLCData() {
  if (hasRequiredXMLCData) return XMLCData.exports;
  hasRequiredXMLCData = 1;
  (function() {
    var NodeType2, XMLCharacterData2, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    NodeType2 = requireNodeType();
    XMLCharacterData2 = requireXMLCharacterData();
    XMLCData.exports = function(superClass) {
      extend(XMLCData2, superClass);
      function XMLCData2(parent, text) {
        XMLCData2.__super__.constructor.call(this, parent);
        if (text == null) {
          throw new Error("Missing CDATA text. " + this.debugInfo());
        }
        this.name = "#cdata-section";
        this.type = NodeType2.CData;
        this.value = this.stringify.cdata(text);
      }
      XMLCData2.prototype.clone = function() {
        return Object.create(this);
      };
      XMLCData2.prototype.toString = function(options) {
        return this.options.writer.cdata(this, this.options.writer.filterOptions(options));
      };
      return XMLCData2;
    }(XMLCharacterData2);
  }).call(commonjsGlobal);
  return XMLCData.exports;
}
var XMLComment = { exports: {} };
var hasRequiredXMLComment;
function requireXMLComment() {
  if (hasRequiredXMLComment) return XMLComment.exports;
  hasRequiredXMLComment = 1;
  (function() {
    var NodeType2, XMLCharacterData2, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    NodeType2 = requireNodeType();
    XMLCharacterData2 = requireXMLCharacterData();
    XMLComment.exports = function(superClass) {
      extend(XMLComment2, superClass);
      function XMLComment2(parent, text) {
        XMLComment2.__super__.constructor.call(this, parent);
        if (text == null) {
          throw new Error("Missing comment text. " + this.debugInfo());
        }
        this.name = "#comment";
        this.type = NodeType2.Comment;
        this.value = this.stringify.comment(text);
      }
      XMLComment2.prototype.clone = function() {
        return Object.create(this);
      };
      XMLComment2.prototype.toString = function(options) {
        return this.options.writer.comment(this, this.options.writer.filterOptions(options));
      };
      return XMLComment2;
    }(XMLCharacterData2);
  }).call(commonjsGlobal);
  return XMLComment.exports;
}
var XMLDeclaration = { exports: {} };
var hasRequiredXMLDeclaration;
function requireXMLDeclaration() {
  if (hasRequiredXMLDeclaration) return XMLDeclaration.exports;
  hasRequiredXMLDeclaration = 1;
  (function() {
    var NodeType2, XMLNode2, isObject, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    isObject = requireUtility().isObject;
    XMLNode2 = requireXMLNode();
    NodeType2 = requireNodeType();
    XMLDeclaration.exports = function(superClass) {
      extend(XMLDeclaration2, superClass);
      function XMLDeclaration2(parent, version, encoding, standalone) {
        var ref;
        XMLDeclaration2.__super__.constructor.call(this, parent);
        if (isObject(version)) {
          ref = version, version = ref.version, encoding = ref.encoding, standalone = ref.standalone;
        }
        if (!version) {
          version = "1.0";
        }
        this.type = NodeType2.Declaration;
        this.version = this.stringify.xmlVersion(version);
        if (encoding != null) {
          this.encoding = this.stringify.xmlEncoding(encoding);
        }
        if (standalone != null) {
          this.standalone = this.stringify.xmlStandalone(standalone);
        }
      }
      XMLDeclaration2.prototype.toString = function(options) {
        return this.options.writer.declaration(this, this.options.writer.filterOptions(options));
      };
      return XMLDeclaration2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLDeclaration.exports;
}
var XMLDocType = { exports: {} };
var XMLDTDAttList = { exports: {} };
var hasRequiredXMLDTDAttList;
function requireXMLDTDAttList() {
  if (hasRequiredXMLDTDAttList) return XMLDTDAttList.exports;
  hasRequiredXMLDTDAttList = 1;
  (function() {
    var NodeType2, XMLNode2, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    XMLNode2 = requireXMLNode();
    NodeType2 = requireNodeType();
    XMLDTDAttList.exports = function(superClass) {
      extend(XMLDTDAttList2, superClass);
      function XMLDTDAttList2(parent, elementName, attributeName, attributeType, defaultValueType, defaultValue) {
        XMLDTDAttList2.__super__.constructor.call(this, parent);
        if (elementName == null) {
          throw new Error("Missing DTD element name. " + this.debugInfo());
        }
        if (attributeName == null) {
          throw new Error("Missing DTD attribute name. " + this.debugInfo(elementName));
        }
        if (!attributeType) {
          throw new Error("Missing DTD attribute type. " + this.debugInfo(elementName));
        }
        if (!defaultValueType) {
          throw new Error("Missing DTD attribute default. " + this.debugInfo(elementName));
        }
        if (defaultValueType.indexOf("#") !== 0) {
          defaultValueType = "#" + defaultValueType;
        }
        if (!defaultValueType.match(/^(#REQUIRED|#IMPLIED|#FIXED|#DEFAULT)$/)) {
          throw new Error("Invalid default value type; expected: #REQUIRED, #IMPLIED, #FIXED or #DEFAULT. " + this.debugInfo(elementName));
        }
        if (defaultValue && !defaultValueType.match(/^(#FIXED|#DEFAULT)$/)) {
          throw new Error("Default value only applies to #FIXED or #DEFAULT. " + this.debugInfo(elementName));
        }
        this.elementName = this.stringify.name(elementName);
        this.type = NodeType2.AttributeDeclaration;
        this.attributeName = this.stringify.name(attributeName);
        this.attributeType = this.stringify.dtdAttType(attributeType);
        if (defaultValue) {
          this.defaultValue = this.stringify.dtdAttDefault(defaultValue);
        }
        this.defaultValueType = defaultValueType;
      }
      XMLDTDAttList2.prototype.toString = function(options) {
        return this.options.writer.dtdAttList(this, this.options.writer.filterOptions(options));
      };
      return XMLDTDAttList2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLDTDAttList.exports;
}
var XMLDTDEntity = { exports: {} };
var hasRequiredXMLDTDEntity;
function requireXMLDTDEntity() {
  if (hasRequiredXMLDTDEntity) return XMLDTDEntity.exports;
  hasRequiredXMLDTDEntity = 1;
  (function() {
    var NodeType2, XMLNode2, isObject, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    isObject = requireUtility().isObject;
    XMLNode2 = requireXMLNode();
    NodeType2 = requireNodeType();
    XMLDTDEntity.exports = function(superClass) {
      extend(XMLDTDEntity2, superClass);
      function XMLDTDEntity2(parent, pe, name, value) {
        XMLDTDEntity2.__super__.constructor.call(this, parent);
        if (name == null) {
          throw new Error("Missing DTD entity name. " + this.debugInfo(name));
        }
        if (value == null) {
          throw new Error("Missing DTD entity value. " + this.debugInfo(name));
        }
        this.pe = !!pe;
        this.name = this.stringify.name(name);
        this.type = NodeType2.EntityDeclaration;
        if (!isObject(value)) {
          this.value = this.stringify.dtdEntityValue(value);
          this.internal = true;
        } else {
          if (!value.pubID && !value.sysID) {
            throw new Error("Public and/or system identifiers are required for an external entity. " + this.debugInfo(name));
          }
          if (value.pubID && !value.sysID) {
            throw new Error("System identifier is required for a public external entity. " + this.debugInfo(name));
          }
          this.internal = false;
          if (value.pubID != null) {
            this.pubID = this.stringify.dtdPubID(value.pubID);
          }
          if (value.sysID != null) {
            this.sysID = this.stringify.dtdSysID(value.sysID);
          }
          if (value.nData != null) {
            this.nData = this.stringify.dtdNData(value.nData);
          }
          if (this.pe && this.nData) {
            throw new Error("Notation declaration is not allowed in a parameter entity. " + this.debugInfo(name));
          }
        }
      }
      Object.defineProperty(XMLDTDEntity2.prototype, "publicId", {
        get: function() {
          return this.pubID;
        }
      });
      Object.defineProperty(XMLDTDEntity2.prototype, "systemId", {
        get: function() {
          return this.sysID;
        }
      });
      Object.defineProperty(XMLDTDEntity2.prototype, "notationName", {
        get: function() {
          return this.nData || null;
        }
      });
      Object.defineProperty(XMLDTDEntity2.prototype, "inputEncoding", {
        get: function() {
          return null;
        }
      });
      Object.defineProperty(XMLDTDEntity2.prototype, "xmlEncoding", {
        get: function() {
          return null;
        }
      });
      Object.defineProperty(XMLDTDEntity2.prototype, "xmlVersion", {
        get: function() {
          return null;
        }
      });
      XMLDTDEntity2.prototype.toString = function(options) {
        return this.options.writer.dtdEntity(this, this.options.writer.filterOptions(options));
      };
      return XMLDTDEntity2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLDTDEntity.exports;
}
var XMLDTDElement = { exports: {} };
var hasRequiredXMLDTDElement;
function requireXMLDTDElement() {
  if (hasRequiredXMLDTDElement) return XMLDTDElement.exports;
  hasRequiredXMLDTDElement = 1;
  (function() {
    var NodeType2, XMLNode2, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    XMLNode2 = requireXMLNode();
    NodeType2 = requireNodeType();
    XMLDTDElement.exports = function(superClass) {
      extend(XMLDTDElement2, superClass);
      function XMLDTDElement2(parent, name, value) {
        XMLDTDElement2.__super__.constructor.call(this, parent);
        if (name == null) {
          throw new Error("Missing DTD element name. " + this.debugInfo());
        }
        if (!value) {
          value = "(#PCDATA)";
        }
        if (Array.isArray(value)) {
          value = "(" + value.join(",") + ")";
        }
        this.name = this.stringify.name(name);
        this.type = NodeType2.ElementDeclaration;
        this.value = this.stringify.dtdElementValue(value);
      }
      XMLDTDElement2.prototype.toString = function(options) {
        return this.options.writer.dtdElement(this, this.options.writer.filterOptions(options));
      };
      return XMLDTDElement2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLDTDElement.exports;
}
var XMLDTDNotation = { exports: {} };
var hasRequiredXMLDTDNotation;
function requireXMLDTDNotation() {
  if (hasRequiredXMLDTDNotation) return XMLDTDNotation.exports;
  hasRequiredXMLDTDNotation = 1;
  (function() {
    var NodeType2, XMLNode2, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    XMLNode2 = requireXMLNode();
    NodeType2 = requireNodeType();
    XMLDTDNotation.exports = function(superClass) {
      extend(XMLDTDNotation2, superClass);
      function XMLDTDNotation2(parent, name, value) {
        XMLDTDNotation2.__super__.constructor.call(this, parent);
        if (name == null) {
          throw new Error("Missing DTD notation name. " + this.debugInfo(name));
        }
        if (!value.pubID && !value.sysID) {
          throw new Error("Public or system identifiers are required for an external entity. " + this.debugInfo(name));
        }
        this.name = this.stringify.name(name);
        this.type = NodeType2.NotationDeclaration;
        if (value.pubID != null) {
          this.pubID = this.stringify.dtdPubID(value.pubID);
        }
        if (value.sysID != null) {
          this.sysID = this.stringify.dtdSysID(value.sysID);
        }
      }
      Object.defineProperty(XMLDTDNotation2.prototype, "publicId", {
        get: function() {
          return this.pubID;
        }
      });
      Object.defineProperty(XMLDTDNotation2.prototype, "systemId", {
        get: function() {
          return this.sysID;
        }
      });
      XMLDTDNotation2.prototype.toString = function(options) {
        return this.options.writer.dtdNotation(this, this.options.writer.filterOptions(options));
      };
      return XMLDTDNotation2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLDTDNotation.exports;
}
var hasRequiredXMLDocType;
function requireXMLDocType() {
  if (hasRequiredXMLDocType) return XMLDocType.exports;
  hasRequiredXMLDocType = 1;
  (function() {
    var NodeType2, XMLDTDAttList2, XMLDTDElement2, XMLDTDEntity2, XMLDTDNotation2, XMLNamedNodeMap2, XMLNode2, isObject, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    isObject = requireUtility().isObject;
    XMLNode2 = requireXMLNode();
    NodeType2 = requireNodeType();
    XMLDTDAttList2 = requireXMLDTDAttList();
    XMLDTDEntity2 = requireXMLDTDEntity();
    XMLDTDElement2 = requireXMLDTDElement();
    XMLDTDNotation2 = requireXMLDTDNotation();
    XMLNamedNodeMap2 = requireXMLNamedNodeMap();
    XMLDocType.exports = function(superClass) {
      extend(XMLDocType2, superClass);
      function XMLDocType2(parent, pubID, sysID) {
        var child, i, len, ref, ref1, ref2;
        XMLDocType2.__super__.constructor.call(this, parent);
        this.type = NodeType2.DocType;
        if (parent.children) {
          ref = parent.children;
          for (i = 0, len = ref.length; i < len; i++) {
            child = ref[i];
            if (child.type === NodeType2.Element) {
              this.name = child.name;
              break;
            }
          }
        }
        this.documentObject = parent;
        if (isObject(pubID)) {
          ref1 = pubID, pubID = ref1.pubID, sysID = ref1.sysID;
        }
        if (sysID == null) {
          ref2 = [pubID, sysID], sysID = ref2[0], pubID = ref2[1];
        }
        if (pubID != null) {
          this.pubID = this.stringify.dtdPubID(pubID);
        }
        if (sysID != null) {
          this.sysID = this.stringify.dtdSysID(sysID);
        }
      }
      Object.defineProperty(XMLDocType2.prototype, "entities", {
        get: function() {
          var child, i, len, nodes, ref;
          nodes = {};
          ref = this.children;
          for (i = 0, len = ref.length; i < len; i++) {
            child = ref[i];
            if (child.type === NodeType2.EntityDeclaration && !child.pe) {
              nodes[child.name] = child;
            }
          }
          return new XMLNamedNodeMap2(nodes);
        }
      });
      Object.defineProperty(XMLDocType2.prototype, "notations", {
        get: function() {
          var child, i, len, nodes, ref;
          nodes = {};
          ref = this.children;
          for (i = 0, len = ref.length; i < len; i++) {
            child = ref[i];
            if (child.type === NodeType2.NotationDeclaration) {
              nodes[child.name] = child;
            }
          }
          return new XMLNamedNodeMap2(nodes);
        }
      });
      Object.defineProperty(XMLDocType2.prototype, "publicId", {
        get: function() {
          return this.pubID;
        }
      });
      Object.defineProperty(XMLDocType2.prototype, "systemId", {
        get: function() {
          return this.sysID;
        }
      });
      Object.defineProperty(XMLDocType2.prototype, "internalSubset", {
        get: function() {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
      });
      XMLDocType2.prototype.element = function(name, value) {
        var child;
        child = new XMLDTDElement2(this, name, value);
        this.children.push(child);
        return this;
      };
      XMLDocType2.prototype.attList = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
        var child;
        child = new XMLDTDAttList2(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
        this.children.push(child);
        return this;
      };
      XMLDocType2.prototype.entity = function(name, value) {
        var child;
        child = new XMLDTDEntity2(this, false, name, value);
        this.children.push(child);
        return this;
      };
      XMLDocType2.prototype.pEntity = function(name, value) {
        var child;
        child = new XMLDTDEntity2(this, true, name, value);
        this.children.push(child);
        return this;
      };
      XMLDocType2.prototype.notation = function(name, value) {
        var child;
        child = new XMLDTDNotation2(this, name, value);
        this.children.push(child);
        return this;
      };
      XMLDocType2.prototype.toString = function(options) {
        return this.options.writer.docType(this, this.options.writer.filterOptions(options));
      };
      XMLDocType2.prototype.ele = function(name, value) {
        return this.element(name, value);
      };
      XMLDocType2.prototype.att = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
        return this.attList(elementName, attributeName, attributeType, defaultValueType, defaultValue);
      };
      XMLDocType2.prototype.ent = function(name, value) {
        return this.entity(name, value);
      };
      XMLDocType2.prototype.pent = function(name, value) {
        return this.pEntity(name, value);
      };
      XMLDocType2.prototype.not = function(name, value) {
        return this.notation(name, value);
      };
      XMLDocType2.prototype.up = function() {
        return this.root() || this.documentObject;
      };
      XMLDocType2.prototype.isEqualNode = function(node) {
        if (!XMLDocType2.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
          return false;
        }
        if (node.name !== this.name) {
          return false;
        }
        if (node.publicId !== this.publicId) {
          return false;
        }
        if (node.systemId !== this.systemId) {
          return false;
        }
        return true;
      };
      return XMLDocType2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLDocType.exports;
}
var XMLRaw = { exports: {} };
var hasRequiredXMLRaw;
function requireXMLRaw() {
  if (hasRequiredXMLRaw) return XMLRaw.exports;
  hasRequiredXMLRaw = 1;
  (function() {
    var NodeType2, XMLNode2, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    NodeType2 = requireNodeType();
    XMLNode2 = requireXMLNode();
    XMLRaw.exports = function(superClass) {
      extend(XMLRaw2, superClass);
      function XMLRaw2(parent, text) {
        XMLRaw2.__super__.constructor.call(this, parent);
        if (text == null) {
          throw new Error("Missing raw text. " + this.debugInfo());
        }
        this.type = NodeType2.Raw;
        this.value = this.stringify.raw(text);
      }
      XMLRaw2.prototype.clone = function() {
        return Object.create(this);
      };
      XMLRaw2.prototype.toString = function(options) {
        return this.options.writer.raw(this, this.options.writer.filterOptions(options));
      };
      return XMLRaw2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLRaw.exports;
}
var XMLText = { exports: {} };
var hasRequiredXMLText;
function requireXMLText() {
  if (hasRequiredXMLText) return XMLText.exports;
  hasRequiredXMLText = 1;
  (function() {
    var NodeType2, XMLCharacterData2, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    NodeType2 = requireNodeType();
    XMLCharacterData2 = requireXMLCharacterData();
    XMLText.exports = function(superClass) {
      extend(XMLText2, superClass);
      function XMLText2(parent, text) {
        XMLText2.__super__.constructor.call(this, parent);
        if (text == null) {
          throw new Error("Missing element text. " + this.debugInfo());
        }
        this.name = "#text";
        this.type = NodeType2.Text;
        this.value = this.stringify.text(text);
      }
      Object.defineProperty(XMLText2.prototype, "isElementContentWhitespace", {
        get: function() {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
      });
      Object.defineProperty(XMLText2.prototype, "wholeText", {
        get: function() {
          var next, prev, str;
          str = "";
          prev = this.previousSibling;
          while (prev) {
            str = prev.data + str;
            prev = prev.previousSibling;
          }
          str += this.data;
          next = this.nextSibling;
          while (next) {
            str = str + next.data;
            next = next.nextSibling;
          }
          return str;
        }
      });
      XMLText2.prototype.clone = function() {
        return Object.create(this);
      };
      XMLText2.prototype.toString = function(options) {
        return this.options.writer.text(this, this.options.writer.filterOptions(options));
      };
      XMLText2.prototype.splitText = function(offset) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLText2.prototype.replaceWholeText = function(content) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      return XMLText2;
    }(XMLCharacterData2);
  }).call(commonjsGlobal);
  return XMLText.exports;
}
var XMLProcessingInstruction = { exports: {} };
var hasRequiredXMLProcessingInstruction;
function requireXMLProcessingInstruction() {
  if (hasRequiredXMLProcessingInstruction) return XMLProcessingInstruction.exports;
  hasRequiredXMLProcessingInstruction = 1;
  (function() {
    var NodeType2, XMLCharacterData2, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    NodeType2 = requireNodeType();
    XMLCharacterData2 = requireXMLCharacterData();
    XMLProcessingInstruction.exports = function(superClass) {
      extend(XMLProcessingInstruction2, superClass);
      function XMLProcessingInstruction2(parent, target, value) {
        XMLProcessingInstruction2.__super__.constructor.call(this, parent);
        if (target == null) {
          throw new Error("Missing instruction target. " + this.debugInfo());
        }
        this.type = NodeType2.ProcessingInstruction;
        this.target = this.stringify.insTarget(target);
        this.name = this.target;
        if (value) {
          this.value = this.stringify.insValue(value);
        }
      }
      XMLProcessingInstruction2.prototype.clone = function() {
        return Object.create(this);
      };
      XMLProcessingInstruction2.prototype.toString = function(options) {
        return this.options.writer.processingInstruction(this, this.options.writer.filterOptions(options));
      };
      XMLProcessingInstruction2.prototype.isEqualNode = function(node) {
        if (!XMLProcessingInstruction2.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
          return false;
        }
        if (node.target !== this.target) {
          return false;
        }
        return true;
      };
      return XMLProcessingInstruction2;
    }(XMLCharacterData2);
  }).call(commonjsGlobal);
  return XMLProcessingInstruction.exports;
}
var XMLDummy = { exports: {} };
var hasRequiredXMLDummy;
function requireXMLDummy() {
  if (hasRequiredXMLDummy) return XMLDummy.exports;
  hasRequiredXMLDummy = 1;
  (function() {
    var NodeType2, XMLNode2, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    XMLNode2 = requireXMLNode();
    NodeType2 = requireNodeType();
    XMLDummy.exports = function(superClass) {
      extend(XMLDummy2, superClass);
      function XMLDummy2(parent) {
        XMLDummy2.__super__.constructor.call(this, parent);
        this.type = NodeType2.Dummy;
      }
      XMLDummy2.prototype.clone = function() {
        return Object.create(this);
      };
      XMLDummy2.prototype.toString = function(options) {
        return "";
      };
      return XMLDummy2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLDummy.exports;
}
var XMLNodeList = { exports: {} };
var hasRequiredXMLNodeList;
function requireXMLNodeList() {
  if (hasRequiredXMLNodeList) return XMLNodeList.exports;
  hasRequiredXMLNodeList = 1;
  (function() {
    XMLNodeList.exports = function() {
      function XMLNodeList2(nodes) {
        this.nodes = nodes;
      }
      Object.defineProperty(XMLNodeList2.prototype, "length", {
        get: function() {
          return this.nodes.length || 0;
        }
      });
      XMLNodeList2.prototype.clone = function() {
        return this.nodes = null;
      };
      XMLNodeList2.prototype.item = function(index) {
        return this.nodes[index] || null;
      };
      return XMLNodeList2;
    }();
  }).call(commonjsGlobal);
  return XMLNodeList.exports;
}
var DocumentPosition = { exports: {} };
var hasRequiredDocumentPosition;
function requireDocumentPosition() {
  if (hasRequiredDocumentPosition) return DocumentPosition.exports;
  hasRequiredDocumentPosition = 1;
  (function() {
    DocumentPosition.exports = {
      Disconnected: 1,
      Preceding: 2,
      Following: 4,
      Contains: 8,
      ContainedBy: 16,
      ImplementationSpecific: 32
    };
  }).call(commonjsGlobal);
  return DocumentPosition.exports;
}
var hasRequiredXMLNode;
function requireXMLNode() {
  if (hasRequiredXMLNode) return XMLNode.exports;
  hasRequiredXMLNode = 1;
  (function() {
    var DocumentPosition2, NodeType2, XMLCData2, XMLComment2, XMLDeclaration2, XMLDocType2, XMLDummy2, XMLElement2, XMLNodeList2, XMLProcessingInstruction2, XMLRaw2, XMLText2, getValue, isEmpty, isFunction, isObject, ref1, hasProp = {}.hasOwnProperty;
    ref1 = requireUtility(), isObject = ref1.isObject, isFunction = ref1.isFunction, isEmpty = ref1.isEmpty, getValue = ref1.getValue;
    XMLElement2 = null;
    XMLCData2 = null;
    XMLComment2 = null;
    XMLDeclaration2 = null;
    XMLDocType2 = null;
    XMLRaw2 = null;
    XMLText2 = null;
    XMLProcessingInstruction2 = null;
    XMLDummy2 = null;
    NodeType2 = null;
    XMLNodeList2 = null;
    DocumentPosition2 = null;
    XMLNode.exports = function() {
      function XMLNode2(parent1) {
        this.parent = parent1;
        if (this.parent) {
          this.options = this.parent.options;
          this.stringify = this.parent.stringify;
        }
        this.value = null;
        this.children = [];
        this.baseURI = null;
        if (!XMLElement2) {
          XMLElement2 = requireXMLElement();
          XMLCData2 = requireXMLCData();
          XMLComment2 = requireXMLComment();
          XMLDeclaration2 = requireXMLDeclaration();
          XMLDocType2 = requireXMLDocType();
          XMLRaw2 = requireXMLRaw();
          XMLText2 = requireXMLText();
          XMLProcessingInstruction2 = requireXMLProcessingInstruction();
          XMLDummy2 = requireXMLDummy();
          NodeType2 = requireNodeType();
          XMLNodeList2 = requireXMLNodeList();
          requireXMLNamedNodeMap();
          DocumentPosition2 = requireDocumentPosition();
        }
      }
      Object.defineProperty(XMLNode2.prototype, "nodeName", {
        get: function() {
          return this.name;
        }
      });
      Object.defineProperty(XMLNode2.prototype, "nodeType", {
        get: function() {
          return this.type;
        }
      });
      Object.defineProperty(XMLNode2.prototype, "nodeValue", {
        get: function() {
          return this.value;
        }
      });
      Object.defineProperty(XMLNode2.prototype, "parentNode", {
        get: function() {
          return this.parent;
        }
      });
      Object.defineProperty(XMLNode2.prototype, "childNodes", {
        get: function() {
          if (!this.childNodeList || !this.childNodeList.nodes) {
            this.childNodeList = new XMLNodeList2(this.children);
          }
          return this.childNodeList;
        }
      });
      Object.defineProperty(XMLNode2.prototype, "firstChild", {
        get: function() {
          return this.children[0] || null;
        }
      });
      Object.defineProperty(XMLNode2.prototype, "lastChild", {
        get: function() {
          return this.children[this.children.length - 1] || null;
        }
      });
      Object.defineProperty(XMLNode2.prototype, "previousSibling", {
        get: function() {
          var i;
          i = this.parent.children.indexOf(this);
          return this.parent.children[i - 1] || null;
        }
      });
      Object.defineProperty(XMLNode2.prototype, "nextSibling", {
        get: function() {
          var i;
          i = this.parent.children.indexOf(this);
          return this.parent.children[i + 1] || null;
        }
      });
      Object.defineProperty(XMLNode2.prototype, "ownerDocument", {
        get: function() {
          return this.document() || null;
        }
      });
      Object.defineProperty(XMLNode2.prototype, "textContent", {
        get: function() {
          var child, j, len, ref2, str;
          if (this.nodeType === NodeType2.Element || this.nodeType === NodeType2.DocumentFragment) {
            str = "";
            ref2 = this.children;
            for (j = 0, len = ref2.length; j < len; j++) {
              child = ref2[j];
              if (child.textContent) {
                str += child.textContent;
              }
            }
            return str;
          } else {
            return null;
          }
        },
        set: function(value) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
      });
      XMLNode2.prototype.setParent = function(parent) {
        var child, j, len, ref2, results;
        this.parent = parent;
        if (parent) {
          this.options = parent.options;
          this.stringify = parent.stringify;
        }
        ref2 = this.children;
        results = [];
        for (j = 0, len = ref2.length; j < len; j++) {
          child = ref2[j];
          results.push(child.setParent(this));
        }
        return results;
      };
      XMLNode2.prototype.element = function(name, attributes, text) {
        var childNode, item, j, k, key, lastChild, len, len1, ref2, ref3, val;
        lastChild = null;
        if (attributes === null && text == null) {
          ref2 = [{}, null], attributes = ref2[0], text = ref2[1];
        }
        if (attributes == null) {
          attributes = {};
        }
        attributes = getValue(attributes);
        if (!isObject(attributes)) {
          ref3 = [attributes, text], text = ref3[0], attributes = ref3[1];
        }
        if (name != null) {
          name = getValue(name);
        }
        if (Array.isArray(name)) {
          for (j = 0, len = name.length; j < len; j++) {
            item = name[j];
            lastChild = this.element(item);
          }
        } else if (isFunction(name)) {
          lastChild = this.element(name.apply());
        } else if (isObject(name)) {
          for (key in name) {
            if (!hasProp.call(name, key)) continue;
            val = name[key];
            if (isFunction(val)) {
              val = val.apply();
            }
            if (!this.options.ignoreDecorators && this.stringify.convertAttKey && key.indexOf(this.stringify.convertAttKey) === 0) {
              lastChild = this.attribute(key.substr(this.stringify.convertAttKey.length), val);
            } else if (!this.options.separateArrayItems && Array.isArray(val) && isEmpty(val)) {
              lastChild = this.dummy();
            } else if (isObject(val) && isEmpty(val)) {
              lastChild = this.element(key);
            } else if (!this.options.keepNullNodes && val == null) {
              lastChild = this.dummy();
            } else if (!this.options.separateArrayItems && Array.isArray(val)) {
              for (k = 0, len1 = val.length; k < len1; k++) {
                item = val[k];
                childNode = {};
                childNode[key] = item;
                lastChild = this.element(childNode);
              }
            } else if (isObject(val)) {
              if (!this.options.ignoreDecorators && this.stringify.convertTextKey && key.indexOf(this.stringify.convertTextKey) === 0) {
                lastChild = this.element(val);
              } else {
                lastChild = this.element(key);
                lastChild.element(val);
              }
            } else {
              lastChild = this.element(key, val);
            }
          }
        } else if (!this.options.keepNullNodes && text === null) {
          lastChild = this.dummy();
        } else {
          if (!this.options.ignoreDecorators && this.stringify.convertTextKey && name.indexOf(this.stringify.convertTextKey) === 0) {
            lastChild = this.text(text);
          } else if (!this.options.ignoreDecorators && this.stringify.convertCDataKey && name.indexOf(this.stringify.convertCDataKey) === 0) {
            lastChild = this.cdata(text);
          } else if (!this.options.ignoreDecorators && this.stringify.convertCommentKey && name.indexOf(this.stringify.convertCommentKey) === 0) {
            lastChild = this.comment(text);
          } else if (!this.options.ignoreDecorators && this.stringify.convertRawKey && name.indexOf(this.stringify.convertRawKey) === 0) {
            lastChild = this.raw(text);
          } else if (!this.options.ignoreDecorators && this.stringify.convertPIKey && name.indexOf(this.stringify.convertPIKey) === 0) {
            lastChild = this.instruction(name.substr(this.stringify.convertPIKey.length), text);
          } else {
            lastChild = this.node(name, attributes, text);
          }
        }
        if (lastChild == null) {
          throw new Error("Could not create any elements with: " + name + ". " + this.debugInfo());
        }
        return lastChild;
      };
      XMLNode2.prototype.insertBefore = function(name, attributes, text) {
        var child, i, newChild, refChild, removed;
        if (name != null ? name.type : void 0) {
          newChild = name;
          refChild = attributes;
          newChild.setParent(this);
          if (refChild) {
            i = children.indexOf(refChild);
            removed = children.splice(i);
            children.push(newChild);
            Array.prototype.push.apply(children, removed);
          } else {
            children.push(newChild);
          }
          return newChild;
        } else {
          if (this.isRoot) {
            throw new Error("Cannot insert elements at root level. " + this.debugInfo(name));
          }
          i = this.parent.children.indexOf(this);
          removed = this.parent.children.splice(i);
          child = this.parent.element(name, attributes, text);
          Array.prototype.push.apply(this.parent.children, removed);
          return child;
        }
      };
      XMLNode2.prototype.insertAfter = function(name, attributes, text) {
        var child, i, removed;
        if (this.isRoot) {
          throw new Error("Cannot insert elements at root level. " + this.debugInfo(name));
        }
        i = this.parent.children.indexOf(this);
        removed = this.parent.children.splice(i + 1);
        child = this.parent.element(name, attributes, text);
        Array.prototype.push.apply(this.parent.children, removed);
        return child;
      };
      XMLNode2.prototype.remove = function() {
        var i;
        if (this.isRoot) {
          throw new Error("Cannot remove the root element. " + this.debugInfo());
        }
        i = this.parent.children.indexOf(this);
        [].splice.apply(this.parent.children, [i, i - i + 1].concat([]));
        return this.parent;
      };
      XMLNode2.prototype.node = function(name, attributes, text) {
        var child, ref2;
        if (name != null) {
          name = getValue(name);
        }
        attributes || (attributes = {});
        attributes = getValue(attributes);
        if (!isObject(attributes)) {
          ref2 = [attributes, text], text = ref2[0], attributes = ref2[1];
        }
        child = new XMLElement2(this, name, attributes);
        if (text != null) {
          child.text(text);
        }
        this.children.push(child);
        return child;
      };
      XMLNode2.prototype.text = function(value) {
        var child;
        if (isObject(value)) {
          this.element(value);
        }
        child = new XMLText2(this, value);
        this.children.push(child);
        return this;
      };
      XMLNode2.prototype.cdata = function(value) {
        var child;
        child = new XMLCData2(this, value);
        this.children.push(child);
        return this;
      };
      XMLNode2.prototype.comment = function(value) {
        var child;
        child = new XMLComment2(this, value);
        this.children.push(child);
        return this;
      };
      XMLNode2.prototype.commentBefore = function(value) {
        var i, removed;
        i = this.parent.children.indexOf(this);
        removed = this.parent.children.splice(i);
        this.parent.comment(value);
        Array.prototype.push.apply(this.parent.children, removed);
        return this;
      };
      XMLNode2.prototype.commentAfter = function(value) {
        var i, removed;
        i = this.parent.children.indexOf(this);
        removed = this.parent.children.splice(i + 1);
        this.parent.comment(value);
        Array.prototype.push.apply(this.parent.children, removed);
        return this;
      };
      XMLNode2.prototype.raw = function(value) {
        var child;
        child = new XMLRaw2(this, value);
        this.children.push(child);
        return this;
      };
      XMLNode2.prototype.dummy = function() {
        var child;
        child = new XMLDummy2(this);
        return child;
      };
      XMLNode2.prototype.instruction = function(target, value) {
        var insTarget, insValue, instruction, j, len;
        if (target != null) {
          target = getValue(target);
        }
        if (value != null) {
          value = getValue(value);
        }
        if (Array.isArray(target)) {
          for (j = 0, len = target.length; j < len; j++) {
            insTarget = target[j];
            this.instruction(insTarget);
          }
        } else if (isObject(target)) {
          for (insTarget in target) {
            if (!hasProp.call(target, insTarget)) continue;
            insValue = target[insTarget];
            this.instruction(insTarget, insValue);
          }
        } else {
          if (isFunction(value)) {
            value = value.apply();
          }
          instruction = new XMLProcessingInstruction2(this, target, value);
          this.children.push(instruction);
        }
        return this;
      };
      XMLNode2.prototype.instructionBefore = function(target, value) {
        var i, removed;
        i = this.parent.children.indexOf(this);
        removed = this.parent.children.splice(i);
        this.parent.instruction(target, value);
        Array.prototype.push.apply(this.parent.children, removed);
        return this;
      };
      XMLNode2.prototype.instructionAfter = function(target, value) {
        var i, removed;
        i = this.parent.children.indexOf(this);
        removed = this.parent.children.splice(i + 1);
        this.parent.instruction(target, value);
        Array.prototype.push.apply(this.parent.children, removed);
        return this;
      };
      XMLNode2.prototype.declaration = function(version, encoding, standalone) {
        var doc, xmldec;
        doc = this.document();
        xmldec = new XMLDeclaration2(doc, version, encoding, standalone);
        if (doc.children.length === 0) {
          doc.children.unshift(xmldec);
        } else if (doc.children[0].type === NodeType2.Declaration) {
          doc.children[0] = xmldec;
        } else {
          doc.children.unshift(xmldec);
        }
        return doc.root() || doc;
      };
      XMLNode2.prototype.dtd = function(pubID, sysID) {
        var child, doc, doctype, i, j, k, len, len1, ref2, ref3;
        doc = this.document();
        doctype = new XMLDocType2(doc, pubID, sysID);
        ref2 = doc.children;
        for (i = j = 0, len = ref2.length; j < len; i = ++j) {
          child = ref2[i];
          if (child.type === NodeType2.DocType) {
            doc.children[i] = doctype;
            return doctype;
          }
        }
        ref3 = doc.children;
        for (i = k = 0, len1 = ref3.length; k < len1; i = ++k) {
          child = ref3[i];
          if (child.isRoot) {
            doc.children.splice(i, 0, doctype);
            return doctype;
          }
        }
        doc.children.push(doctype);
        return doctype;
      };
      XMLNode2.prototype.up = function() {
        if (this.isRoot) {
          throw new Error("The root node has no parent. Use doc() if you need to get the document object.");
        }
        return this.parent;
      };
      XMLNode2.prototype.root = function() {
        var node;
        node = this;
        while (node) {
          if (node.type === NodeType2.Document) {
            return node.rootObject;
          } else if (node.isRoot) {
            return node;
          } else {
            node = node.parent;
          }
        }
      };
      XMLNode2.prototype.document = function() {
        var node;
        node = this;
        while (node) {
          if (node.type === NodeType2.Document) {
            return node;
          } else {
            node = node.parent;
          }
        }
      };
      XMLNode2.prototype.end = function(options) {
        return this.document().end(options);
      };
      XMLNode2.prototype.prev = function() {
        var i;
        i = this.parent.children.indexOf(this);
        if (i < 1) {
          throw new Error("Already at the first node. " + this.debugInfo());
        }
        return this.parent.children[i - 1];
      };
      XMLNode2.prototype.next = function() {
        var i;
        i = this.parent.children.indexOf(this);
        if (i === -1 || i === this.parent.children.length - 1) {
          throw new Error("Already at the last node. " + this.debugInfo());
        }
        return this.parent.children[i + 1];
      };
      XMLNode2.prototype.importDocument = function(doc) {
        var clonedRoot;
        clonedRoot = doc.root().clone();
        clonedRoot.parent = this;
        clonedRoot.isRoot = false;
        this.children.push(clonedRoot);
        return this;
      };
      XMLNode2.prototype.debugInfo = function(name) {
        var ref2, ref3;
        name = name || this.name;
        if (name == null && !((ref2 = this.parent) != null ? ref2.name : void 0)) {
          return "";
        } else if (name == null) {
          return "parent: <" + this.parent.name + ">";
        } else if (!((ref3 = this.parent) != null ? ref3.name : void 0)) {
          return "node: <" + name + ">";
        } else {
          return "node: <" + name + ">, parent: <" + this.parent.name + ">";
        }
      };
      XMLNode2.prototype.ele = function(name, attributes, text) {
        return this.element(name, attributes, text);
      };
      XMLNode2.prototype.nod = function(name, attributes, text) {
        return this.node(name, attributes, text);
      };
      XMLNode2.prototype.txt = function(value) {
        return this.text(value);
      };
      XMLNode2.prototype.dat = function(value) {
        return this.cdata(value);
      };
      XMLNode2.prototype.com = function(value) {
        return this.comment(value);
      };
      XMLNode2.prototype.ins = function(target, value) {
        return this.instruction(target, value);
      };
      XMLNode2.prototype.doc = function() {
        return this.document();
      };
      XMLNode2.prototype.dec = function(version, encoding, standalone) {
        return this.declaration(version, encoding, standalone);
      };
      XMLNode2.prototype.e = function(name, attributes, text) {
        return this.element(name, attributes, text);
      };
      XMLNode2.prototype.n = function(name, attributes, text) {
        return this.node(name, attributes, text);
      };
      XMLNode2.prototype.t = function(value) {
        return this.text(value);
      };
      XMLNode2.prototype.d = function(value) {
        return this.cdata(value);
      };
      XMLNode2.prototype.c = function(value) {
        return this.comment(value);
      };
      XMLNode2.prototype.r = function(value) {
        return this.raw(value);
      };
      XMLNode2.prototype.i = function(target, value) {
        return this.instruction(target, value);
      };
      XMLNode2.prototype.u = function() {
        return this.up();
      };
      XMLNode2.prototype.importXMLBuilder = function(doc) {
        return this.importDocument(doc);
      };
      XMLNode2.prototype.replaceChild = function(newChild, oldChild) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLNode2.prototype.removeChild = function(oldChild) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLNode2.prototype.appendChild = function(newChild) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLNode2.prototype.hasChildNodes = function() {
        return this.children.length !== 0;
      };
      XMLNode2.prototype.cloneNode = function(deep) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLNode2.prototype.normalize = function() {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLNode2.prototype.isSupported = function(feature, version) {
        return true;
      };
      XMLNode2.prototype.hasAttributes = function() {
        return this.attribs.length !== 0;
      };
      XMLNode2.prototype.compareDocumentPosition = function(other) {
        var ref, res;
        ref = this;
        if (ref === other) {
          return 0;
        } else if (this.document() !== other.document()) {
          res = DocumentPosition2.Disconnected | DocumentPosition2.ImplementationSpecific;
          if (Math.random() < 0.5) {
            res |= DocumentPosition2.Preceding;
          } else {
            res |= DocumentPosition2.Following;
          }
          return res;
        } else if (ref.isAncestor(other)) {
          return DocumentPosition2.Contains | DocumentPosition2.Preceding;
        } else if (ref.isDescendant(other)) {
          return DocumentPosition2.Contains | DocumentPosition2.Following;
        } else if (ref.isPreceding(other)) {
          return DocumentPosition2.Preceding;
        } else {
          return DocumentPosition2.Following;
        }
      };
      XMLNode2.prototype.isSameNode = function(other) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLNode2.prototype.lookupPrefix = function(namespaceURI) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLNode2.prototype.isDefaultNamespace = function(namespaceURI) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLNode2.prototype.lookupNamespaceURI = function(prefix) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLNode2.prototype.isEqualNode = function(node) {
        var i, j, ref2;
        if (node.nodeType !== this.nodeType) {
          return false;
        }
        if (node.children.length !== this.children.length) {
          return false;
        }
        for (i = j = 0, ref2 = this.children.length - 1; 0 <= ref2 ? j <= ref2 : j >= ref2; i = 0 <= ref2 ? ++j : --j) {
          if (!this.children[i].isEqualNode(node.children[i])) {
            return false;
          }
        }
        return true;
      };
      XMLNode2.prototype.getFeature = function(feature, version) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLNode2.prototype.setUserData = function(key, data, handler) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLNode2.prototype.getUserData = function(key) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLNode2.prototype.contains = function(other) {
        if (!other) {
          return false;
        }
        return other === this || this.isDescendant(other);
      };
      XMLNode2.prototype.isDescendant = function(node) {
        var child, isDescendantChild, j, len, ref2;
        ref2 = this.children;
        for (j = 0, len = ref2.length; j < len; j++) {
          child = ref2[j];
          if (node === child) {
            return true;
          }
          isDescendantChild = child.isDescendant(node);
          if (isDescendantChild) {
            return true;
          }
        }
        return false;
      };
      XMLNode2.prototype.isAncestor = function(node) {
        return node.isDescendant(this);
      };
      XMLNode2.prototype.isPreceding = function(node) {
        var nodePos, thisPos;
        nodePos = this.treePosition(node);
        thisPos = this.treePosition(this);
        if (nodePos === -1 || thisPos === -1) {
          return false;
        } else {
          return nodePos < thisPos;
        }
      };
      XMLNode2.prototype.isFollowing = function(node) {
        var nodePos, thisPos;
        nodePos = this.treePosition(node);
        thisPos = this.treePosition(this);
        if (nodePos === -1 || thisPos === -1) {
          return false;
        } else {
          return nodePos > thisPos;
        }
      };
      XMLNode2.prototype.treePosition = function(node) {
        var found, pos;
        pos = 0;
        found = false;
        this.foreachTreeNode(this.document(), function(childNode) {
          pos++;
          if (!found && childNode === node) {
            return found = true;
          }
        });
        if (found) {
          return pos;
        } else {
          return -1;
        }
      };
      XMLNode2.prototype.foreachTreeNode = function(node, func) {
        var child, j, len, ref2, res;
        node || (node = this.document());
        ref2 = node.children;
        for (j = 0, len = ref2.length; j < len; j++) {
          child = ref2[j];
          if (res = func(child)) {
            return res;
          } else {
            res = this.foreachTreeNode(child, func);
            if (res) {
              return res;
            }
          }
        }
      };
      return XMLNode2;
    }();
  }).call(commonjsGlobal);
  return XMLNode.exports;
}
var XMLStringifier = { exports: {} };
var hasRequiredXMLStringifier;
function requireXMLStringifier() {
  if (hasRequiredXMLStringifier) return XMLStringifier.exports;
  hasRequiredXMLStringifier = 1;
  (function() {
    var bind2 = function(fn, me) {
      return function() {
        return fn.apply(me, arguments);
      };
    }, hasProp = {}.hasOwnProperty;
    XMLStringifier.exports = function() {
      function XMLStringifier2(options) {
        this.assertLegalName = bind2(this.assertLegalName, this);
        this.assertLegalChar = bind2(this.assertLegalChar, this);
        var key, ref, value;
        options || (options = {});
        this.options = options;
        if (!this.options.version) {
          this.options.version = "1.0";
        }
        ref = options.stringify || {};
        for (key in ref) {
          if (!hasProp.call(ref, key)) continue;
          value = ref[key];
          this[key] = value;
        }
      }
      XMLStringifier2.prototype.name = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        return this.assertLegalName("" + val || "");
      };
      XMLStringifier2.prototype.text = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        return this.assertLegalChar(this.textEscape("" + val || ""));
      };
      XMLStringifier2.prototype.cdata = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        val = "" + val || "";
        val = val.replace("]]>", "]]]]><![CDATA[>");
        return this.assertLegalChar(val);
      };
      XMLStringifier2.prototype.comment = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        val = "" + val || "";
        if (val.match(/--/)) {
          throw new Error("Comment text cannot contain double-hypen: " + val);
        }
        return this.assertLegalChar(val);
      };
      XMLStringifier2.prototype.raw = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        return "" + val || "";
      };
      XMLStringifier2.prototype.attValue = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        return this.assertLegalChar(this.attEscape(val = "" + val || ""));
      };
      XMLStringifier2.prototype.insTarget = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        return this.assertLegalChar("" + val || "");
      };
      XMLStringifier2.prototype.insValue = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        val = "" + val || "";
        if (val.match(/\?>/)) {
          throw new Error("Invalid processing instruction value: " + val);
        }
        return this.assertLegalChar(val);
      };
      XMLStringifier2.prototype.xmlVersion = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        val = "" + val || "";
        if (!val.match(/1\.[0-9]+/)) {
          throw new Error("Invalid version number: " + val);
        }
        return val;
      };
      XMLStringifier2.prototype.xmlEncoding = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        val = "" + val || "";
        if (!val.match(/^[A-Za-z](?:[A-Za-z0-9._-])*$/)) {
          throw new Error("Invalid encoding: " + val);
        }
        return this.assertLegalChar(val);
      };
      XMLStringifier2.prototype.xmlStandalone = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        if (val) {
          return "yes";
        } else {
          return "no";
        }
      };
      XMLStringifier2.prototype.dtdPubID = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        return this.assertLegalChar("" + val || "");
      };
      XMLStringifier2.prototype.dtdSysID = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        return this.assertLegalChar("" + val || "");
      };
      XMLStringifier2.prototype.dtdElementValue = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        return this.assertLegalChar("" + val || "");
      };
      XMLStringifier2.prototype.dtdAttType = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        return this.assertLegalChar("" + val || "");
      };
      XMLStringifier2.prototype.dtdAttDefault = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        return this.assertLegalChar("" + val || "");
      };
      XMLStringifier2.prototype.dtdEntityValue = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        return this.assertLegalChar("" + val || "");
      };
      XMLStringifier2.prototype.dtdNData = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        return this.assertLegalChar("" + val || "");
      };
      XMLStringifier2.prototype.convertAttKey = "@";
      XMLStringifier2.prototype.convertPIKey = "?";
      XMLStringifier2.prototype.convertTextKey = "#text";
      XMLStringifier2.prototype.convertCDataKey = "#cdata";
      XMLStringifier2.prototype.convertCommentKey = "#comment";
      XMLStringifier2.prototype.convertRawKey = "#raw";
      XMLStringifier2.prototype.assertLegalChar = function(str) {
        var regex, res;
        if (this.options.noValidation) {
          return str;
        }
        regex = "";
        if (this.options.version === "1.0") {
          regex = /[\0-\x08\x0B\f\x0E-\x1F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
          if (res = str.match(regex)) {
            throw new Error("Invalid character in string: " + str + " at index " + res.index);
          }
        } else if (this.options.version === "1.1") {
          regex = /[\0\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
          if (res = str.match(regex)) {
            throw new Error("Invalid character in string: " + str + " at index " + res.index);
          }
        }
        return str;
      };
      XMLStringifier2.prototype.assertLegalName = function(str) {
        var regex;
        if (this.options.noValidation) {
          return str;
        }
        this.assertLegalChar(str);
        regex = /^([:A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])([\x2D\.0-:A-Z_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])*$/;
        if (!str.match(regex)) {
          throw new Error("Invalid character in name");
        }
        return str;
      };
      XMLStringifier2.prototype.textEscape = function(str) {
        var ampregex;
        if (this.options.noValidation) {
          return str;
        }
        ampregex = this.options.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
        return str.replace(ampregex, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r/g, "&#xD;");
      };
      XMLStringifier2.prototype.attEscape = function(str) {
        var ampregex;
        if (this.options.noValidation) {
          return str;
        }
        ampregex = this.options.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
        return str.replace(ampregex, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/\t/g, "&#x9;").replace(/\n/g, "&#xA;").replace(/\r/g, "&#xD;");
      };
      return XMLStringifier2;
    }();
  }).call(commonjsGlobal);
  return XMLStringifier.exports;
}
var XMLStringWriter = { exports: {} };
var XMLWriterBase = { exports: {} };
var WriterState = { exports: {} };
var hasRequiredWriterState;
function requireWriterState() {
  if (hasRequiredWriterState) return WriterState.exports;
  hasRequiredWriterState = 1;
  (function() {
    WriterState.exports = {
      None: 0,
      OpenTag: 1,
      InsideTag: 2,
      CloseTag: 3
    };
  }).call(commonjsGlobal);
  return WriterState.exports;
}
var hasRequiredXMLWriterBase;
function requireXMLWriterBase() {
  if (hasRequiredXMLWriterBase) return XMLWriterBase.exports;
  hasRequiredXMLWriterBase = 1;
  (function() {
    var NodeType2, WriterState2, assign, hasProp = {}.hasOwnProperty;
    assign = requireUtility().assign;
    NodeType2 = requireNodeType();
    requireXMLDeclaration();
    requireXMLDocType();
    requireXMLCData();
    requireXMLComment();
    requireXMLElement();
    requireXMLRaw();
    requireXMLText();
    requireXMLProcessingInstruction();
    requireXMLDummy();
    requireXMLDTDAttList();
    requireXMLDTDElement();
    requireXMLDTDEntity();
    requireXMLDTDNotation();
    WriterState2 = requireWriterState();
    XMLWriterBase.exports = function() {
      function XMLWriterBase2(options) {
        var key, ref, value;
        options || (options = {});
        this.options = options;
        ref = options.writer || {};
        for (key in ref) {
          if (!hasProp.call(ref, key)) continue;
          value = ref[key];
          this["_" + key] = this[key];
          this[key] = value;
        }
      }
      XMLWriterBase2.prototype.filterOptions = function(options) {
        var filteredOptions, ref, ref1, ref2, ref3, ref4, ref5, ref6;
        options || (options = {});
        options = assign({}, this.options, options);
        filteredOptions = {
          writer: this
        };
        filteredOptions.pretty = options.pretty || false;
        filteredOptions.allowEmpty = options.allowEmpty || false;
        filteredOptions.indent = (ref = options.indent) != null ? ref : "  ";
        filteredOptions.newline = (ref1 = options.newline) != null ? ref1 : "\n";
        filteredOptions.offset = (ref2 = options.offset) != null ? ref2 : 0;
        filteredOptions.dontPrettyTextNodes = (ref3 = (ref4 = options.dontPrettyTextNodes) != null ? ref4 : options.dontprettytextnodes) != null ? ref3 : 0;
        filteredOptions.spaceBeforeSlash = (ref5 = (ref6 = options.spaceBeforeSlash) != null ? ref6 : options.spacebeforeslash) != null ? ref5 : "";
        if (filteredOptions.spaceBeforeSlash === true) {
          filteredOptions.spaceBeforeSlash = " ";
        }
        filteredOptions.suppressPrettyCount = 0;
        filteredOptions.user = {};
        filteredOptions.state = WriterState2.None;
        return filteredOptions;
      };
      XMLWriterBase2.prototype.indent = function(node, options, level) {
        var indentLevel;
        if (!options.pretty || options.suppressPrettyCount) {
          return "";
        } else if (options.pretty) {
          indentLevel = (level || 0) + options.offset + 1;
          if (indentLevel > 0) {
            return new Array(indentLevel).join(options.indent);
          }
        }
        return "";
      };
      XMLWriterBase2.prototype.endline = function(node, options, level) {
        if (!options.pretty || options.suppressPrettyCount) {
          return "";
        } else {
          return options.newline;
        }
      };
      XMLWriterBase2.prototype.attribute = function(att, options, level) {
        var r;
        this.openAttribute(att, options, level);
        r = " " + att.name + '="' + att.value + '"';
        this.closeAttribute(att, options, level);
        return r;
      };
      XMLWriterBase2.prototype.cdata = function(node, options, level) {
        var r;
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level) + "<![CDATA[";
        options.state = WriterState2.InsideTag;
        r += node.value;
        options.state = WriterState2.CloseTag;
        r += "]]>" + this.endline(node, options, level);
        options.state = WriterState2.None;
        this.closeNode(node, options, level);
        return r;
      };
      XMLWriterBase2.prototype.comment = function(node, options, level) {
        var r;
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level) + "<!-- ";
        options.state = WriterState2.InsideTag;
        r += node.value;
        options.state = WriterState2.CloseTag;
        r += " -->" + this.endline(node, options, level);
        options.state = WriterState2.None;
        this.closeNode(node, options, level);
        return r;
      };
      XMLWriterBase2.prototype.declaration = function(node, options, level) {
        var r;
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level) + "<?xml";
        options.state = WriterState2.InsideTag;
        r += ' version="' + node.version + '"';
        if (node.encoding != null) {
          r += ' encoding="' + node.encoding + '"';
        }
        if (node.standalone != null) {
          r += ' standalone="' + node.standalone + '"';
        }
        options.state = WriterState2.CloseTag;
        r += options.spaceBeforeSlash + "?>";
        r += this.endline(node, options, level);
        options.state = WriterState2.None;
        this.closeNode(node, options, level);
        return r;
      };
      XMLWriterBase2.prototype.docType = function(node, options, level) {
        var child, i, len, r, ref;
        level || (level = 0);
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level);
        r += "<!DOCTYPE " + node.root().name;
        if (node.pubID && node.sysID) {
          r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
        } else if (node.sysID) {
          r += ' SYSTEM "' + node.sysID + '"';
        }
        if (node.children.length > 0) {
          r += " [";
          r += this.endline(node, options, level);
          options.state = WriterState2.InsideTag;
          ref = node.children;
          for (i = 0, len = ref.length; i < len; i++) {
            child = ref[i];
            r += this.writeChildNode(child, options, level + 1);
          }
          options.state = WriterState2.CloseTag;
          r += "]";
        }
        options.state = WriterState2.CloseTag;
        r += options.spaceBeforeSlash + ">";
        r += this.endline(node, options, level);
        options.state = WriterState2.None;
        this.closeNode(node, options, level);
        return r;
      };
      XMLWriterBase2.prototype.element = function(node, options, level) {
        var att, child, childNodeCount, firstChildNode, i, j, len, len1, name, prettySuppressed, r, ref, ref1, ref2;
        level || (level = 0);
        prettySuppressed = false;
        r = "";
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r += this.indent(node, options, level) + "<" + node.name;
        ref = node.attribs;
        for (name in ref) {
          if (!hasProp.call(ref, name)) continue;
          att = ref[name];
          r += this.attribute(att, options, level);
        }
        childNodeCount = node.children.length;
        firstChildNode = childNodeCount === 0 ? null : node.children[0];
        if (childNodeCount === 0 || node.children.every(function(e) {
          return (e.type === NodeType2.Text || e.type === NodeType2.Raw) && e.value === "";
        })) {
          if (options.allowEmpty) {
            r += ">";
            options.state = WriterState2.CloseTag;
            r += "</" + node.name + ">" + this.endline(node, options, level);
          } else {
            options.state = WriterState2.CloseTag;
            r += options.spaceBeforeSlash + "/>" + this.endline(node, options, level);
          }
        } else if (options.pretty && childNodeCount === 1 && (firstChildNode.type === NodeType2.Text || firstChildNode.type === NodeType2.Raw) && firstChildNode.value != null) {
          r += ">";
          options.state = WriterState2.InsideTag;
          options.suppressPrettyCount++;
          prettySuppressed = true;
          r += this.writeChildNode(firstChildNode, options, level + 1);
          options.suppressPrettyCount--;
          prettySuppressed = false;
          options.state = WriterState2.CloseTag;
          r += "</" + node.name + ">" + this.endline(node, options, level);
        } else {
          if (options.dontPrettyTextNodes) {
            ref1 = node.children;
            for (i = 0, len = ref1.length; i < len; i++) {
              child = ref1[i];
              if ((child.type === NodeType2.Text || child.type === NodeType2.Raw) && child.value != null) {
                options.suppressPrettyCount++;
                prettySuppressed = true;
                break;
              }
            }
          }
          r += ">" + this.endline(node, options, level);
          options.state = WriterState2.InsideTag;
          ref2 = node.children;
          for (j = 0, len1 = ref2.length; j < len1; j++) {
            child = ref2[j];
            r += this.writeChildNode(child, options, level + 1);
          }
          options.state = WriterState2.CloseTag;
          r += this.indent(node, options, level) + "</" + node.name + ">";
          if (prettySuppressed) {
            options.suppressPrettyCount--;
          }
          r += this.endline(node, options, level);
          options.state = WriterState2.None;
        }
        this.closeNode(node, options, level);
        return r;
      };
      XMLWriterBase2.prototype.writeChildNode = function(node, options, level) {
        switch (node.type) {
          case NodeType2.CData:
            return this.cdata(node, options, level);
          case NodeType2.Comment:
            return this.comment(node, options, level);
          case NodeType2.Element:
            return this.element(node, options, level);
          case NodeType2.Raw:
            return this.raw(node, options, level);
          case NodeType2.Text:
            return this.text(node, options, level);
          case NodeType2.ProcessingInstruction:
            return this.processingInstruction(node, options, level);
          case NodeType2.Dummy:
            return "";
          case NodeType2.Declaration:
            return this.declaration(node, options, level);
          case NodeType2.DocType:
            return this.docType(node, options, level);
          case NodeType2.AttributeDeclaration:
            return this.dtdAttList(node, options, level);
          case NodeType2.ElementDeclaration:
            return this.dtdElement(node, options, level);
          case NodeType2.EntityDeclaration:
            return this.dtdEntity(node, options, level);
          case NodeType2.NotationDeclaration:
            return this.dtdNotation(node, options, level);
          default:
            throw new Error("Unknown XML node type: " + node.constructor.name);
        }
      };
      XMLWriterBase2.prototype.processingInstruction = function(node, options, level) {
        var r;
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level) + "<?";
        options.state = WriterState2.InsideTag;
        r += node.target;
        if (node.value) {
          r += " " + node.value;
        }
        options.state = WriterState2.CloseTag;
        r += options.spaceBeforeSlash + "?>";
        r += this.endline(node, options, level);
        options.state = WriterState2.None;
        this.closeNode(node, options, level);
        return r;
      };
      XMLWriterBase2.prototype.raw = function(node, options, level) {
        var r;
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level);
        options.state = WriterState2.InsideTag;
        r += node.value;
        options.state = WriterState2.CloseTag;
        r += this.endline(node, options, level);
        options.state = WriterState2.None;
        this.closeNode(node, options, level);
        return r;
      };
      XMLWriterBase2.prototype.text = function(node, options, level) {
        var r;
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level);
        options.state = WriterState2.InsideTag;
        r += node.value;
        options.state = WriterState2.CloseTag;
        r += this.endline(node, options, level);
        options.state = WriterState2.None;
        this.closeNode(node, options, level);
        return r;
      };
      XMLWriterBase2.prototype.dtdAttList = function(node, options, level) {
        var r;
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level) + "<!ATTLIST";
        options.state = WriterState2.InsideTag;
        r += " " + node.elementName + " " + node.attributeName + " " + node.attributeType;
        if (node.defaultValueType !== "#DEFAULT") {
          r += " " + node.defaultValueType;
        }
        if (node.defaultValue) {
          r += ' "' + node.defaultValue + '"';
        }
        options.state = WriterState2.CloseTag;
        r += options.spaceBeforeSlash + ">" + this.endline(node, options, level);
        options.state = WriterState2.None;
        this.closeNode(node, options, level);
        return r;
      };
      XMLWriterBase2.prototype.dtdElement = function(node, options, level) {
        var r;
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level) + "<!ELEMENT";
        options.state = WriterState2.InsideTag;
        r += " " + node.name + " " + node.value;
        options.state = WriterState2.CloseTag;
        r += options.spaceBeforeSlash + ">" + this.endline(node, options, level);
        options.state = WriterState2.None;
        this.closeNode(node, options, level);
        return r;
      };
      XMLWriterBase2.prototype.dtdEntity = function(node, options, level) {
        var r;
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level) + "<!ENTITY";
        options.state = WriterState2.InsideTag;
        if (node.pe) {
          r += " %";
        }
        r += " " + node.name;
        if (node.value) {
          r += ' "' + node.value + '"';
        } else {
          if (node.pubID && node.sysID) {
            r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
          } else if (node.sysID) {
            r += ' SYSTEM "' + node.sysID + '"';
          }
          if (node.nData) {
            r += " NDATA " + node.nData;
          }
        }
        options.state = WriterState2.CloseTag;
        r += options.spaceBeforeSlash + ">" + this.endline(node, options, level);
        options.state = WriterState2.None;
        this.closeNode(node, options, level);
        return r;
      };
      XMLWriterBase2.prototype.dtdNotation = function(node, options, level) {
        var r;
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level) + "<!NOTATION";
        options.state = WriterState2.InsideTag;
        r += " " + node.name;
        if (node.pubID && node.sysID) {
          r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
        } else if (node.pubID) {
          r += ' PUBLIC "' + node.pubID + '"';
        } else if (node.sysID) {
          r += ' SYSTEM "' + node.sysID + '"';
        }
        options.state = WriterState2.CloseTag;
        r += options.spaceBeforeSlash + ">" + this.endline(node, options, level);
        options.state = WriterState2.None;
        this.closeNode(node, options, level);
        return r;
      };
      XMLWriterBase2.prototype.openNode = function(node, options, level) {
      };
      XMLWriterBase2.prototype.closeNode = function(node, options, level) {
      };
      XMLWriterBase2.prototype.openAttribute = function(att, options, level) {
      };
      XMLWriterBase2.prototype.closeAttribute = function(att, options, level) {
      };
      return XMLWriterBase2;
    }();
  }).call(commonjsGlobal);
  return XMLWriterBase.exports;
}
var hasRequiredXMLStringWriter;
function requireXMLStringWriter() {
  if (hasRequiredXMLStringWriter) return XMLStringWriter.exports;
  hasRequiredXMLStringWriter = 1;
  (function() {
    var XMLWriterBase2, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    XMLWriterBase2 = requireXMLWriterBase();
    XMLStringWriter.exports = function(superClass) {
      extend(XMLStringWriter2, superClass);
      function XMLStringWriter2(options) {
        XMLStringWriter2.__super__.constructor.call(this, options);
      }
      XMLStringWriter2.prototype.document = function(doc, options) {
        var child, i, len, r, ref;
        options = this.filterOptions(options);
        r = "";
        ref = doc.children;
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          r += this.writeChildNode(child, options, 0);
        }
        if (options.pretty && r.slice(-options.newline.length) === options.newline) {
          r = r.slice(0, -options.newline.length);
        }
        return r;
      };
      return XMLStringWriter2;
    }(XMLWriterBase2);
  }).call(commonjsGlobal);
  return XMLStringWriter.exports;
}
var hasRequiredXMLDocument;
function requireXMLDocument() {
  if (hasRequiredXMLDocument) return XMLDocument.exports;
  hasRequiredXMLDocument = 1;
  (function() {
    var NodeType2, XMLDOMConfiguration2, XMLDOMImplementation2, XMLNode2, XMLStringWriter2, XMLStringifier2, isPlainObject, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    isPlainObject = requireUtility().isPlainObject;
    XMLDOMImplementation2 = requireXMLDOMImplementation();
    XMLDOMConfiguration2 = requireXMLDOMConfiguration();
    XMLNode2 = requireXMLNode();
    NodeType2 = requireNodeType();
    XMLStringifier2 = requireXMLStringifier();
    XMLStringWriter2 = requireXMLStringWriter();
    XMLDocument.exports = function(superClass) {
      extend(XMLDocument2, superClass);
      function XMLDocument2(options) {
        XMLDocument2.__super__.constructor.call(this, null);
        this.name = "#document";
        this.type = NodeType2.Document;
        this.documentURI = null;
        this.domConfig = new XMLDOMConfiguration2();
        options || (options = {});
        if (!options.writer) {
          options.writer = new XMLStringWriter2();
        }
        this.options = options;
        this.stringify = new XMLStringifier2(options);
      }
      Object.defineProperty(XMLDocument2.prototype, "implementation", {
        value: new XMLDOMImplementation2()
      });
      Object.defineProperty(XMLDocument2.prototype, "doctype", {
        get: function() {
          var child, i, len, ref;
          ref = this.children;
          for (i = 0, len = ref.length; i < len; i++) {
            child = ref[i];
            if (child.type === NodeType2.DocType) {
              return child;
            }
          }
          return null;
        }
      });
      Object.defineProperty(XMLDocument2.prototype, "documentElement", {
        get: function() {
          return this.rootObject || null;
        }
      });
      Object.defineProperty(XMLDocument2.prototype, "inputEncoding", {
        get: function() {
          return null;
        }
      });
      Object.defineProperty(XMLDocument2.prototype, "strictErrorChecking", {
        get: function() {
          return false;
        }
      });
      Object.defineProperty(XMLDocument2.prototype, "xmlEncoding", {
        get: function() {
          if (this.children.length !== 0 && this.children[0].type === NodeType2.Declaration) {
            return this.children[0].encoding;
          } else {
            return null;
          }
        }
      });
      Object.defineProperty(XMLDocument2.prototype, "xmlStandalone", {
        get: function() {
          if (this.children.length !== 0 && this.children[0].type === NodeType2.Declaration) {
            return this.children[0].standalone === "yes";
          } else {
            return false;
          }
        }
      });
      Object.defineProperty(XMLDocument2.prototype, "xmlVersion", {
        get: function() {
          if (this.children.length !== 0 && this.children[0].type === NodeType2.Declaration) {
            return this.children[0].version;
          } else {
            return "1.0";
          }
        }
      });
      Object.defineProperty(XMLDocument2.prototype, "URL", {
        get: function() {
          return this.documentURI;
        }
      });
      Object.defineProperty(XMLDocument2.prototype, "origin", {
        get: function() {
          return null;
        }
      });
      Object.defineProperty(XMLDocument2.prototype, "compatMode", {
        get: function() {
          return null;
        }
      });
      Object.defineProperty(XMLDocument2.prototype, "characterSet", {
        get: function() {
          return null;
        }
      });
      Object.defineProperty(XMLDocument2.prototype, "contentType", {
        get: function() {
          return null;
        }
      });
      XMLDocument2.prototype.end = function(writer) {
        var writerOptions;
        writerOptions = {};
        if (!writer) {
          writer = this.options.writer;
        } else if (isPlainObject(writer)) {
          writerOptions = writer;
          writer = this.options.writer;
        }
        return writer.document(this, writer.filterOptions(writerOptions));
      };
      XMLDocument2.prototype.toString = function(options) {
        return this.options.writer.document(this, this.options.writer.filterOptions(options));
      };
      XMLDocument2.prototype.createElement = function(tagName) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.createDocumentFragment = function() {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.createTextNode = function(data) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.createComment = function(data) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.createCDATASection = function(data) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.createProcessingInstruction = function(target, data) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.createAttribute = function(name) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.createEntityReference = function(name) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.getElementsByTagName = function(tagname) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.importNode = function(importedNode, deep) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.createElementNS = function(namespaceURI, qualifiedName) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.createAttributeNS = function(namespaceURI, qualifiedName) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.getElementById = function(elementId) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.adoptNode = function(source) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.normalizeDocument = function() {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.renameNode = function(node, namespaceURI, qualifiedName) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.getElementsByClassName = function(classNames) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.createEvent = function(eventInterface) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.createRange = function() {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.createNodeIterator = function(root, whatToShow, filter2) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.createTreeWalker = function(root, whatToShow, filter2) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      return XMLDocument2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLDocument.exports;
}
var XMLDocumentCB = { exports: {} };
var hasRequiredXMLDocumentCB;
function requireXMLDocumentCB() {
  if (hasRequiredXMLDocumentCB) return XMLDocumentCB.exports;
  hasRequiredXMLDocumentCB = 1;
  (function() {
    var NodeType2, WriterState2, XMLAttribute2, XMLCData2, XMLComment2, XMLDTDAttList2, XMLDTDElement2, XMLDTDEntity2, XMLDTDNotation2, XMLDeclaration2, XMLDocType2, XMLDocument2, XMLElement2, XMLProcessingInstruction2, XMLRaw2, XMLStringWriter2, XMLStringifier2, XMLText2, getValue, isFunction, isObject, isPlainObject, ref, hasProp = {}.hasOwnProperty;
    ref = requireUtility(), isObject = ref.isObject, isFunction = ref.isFunction, isPlainObject = ref.isPlainObject, getValue = ref.getValue;
    NodeType2 = requireNodeType();
    XMLDocument2 = requireXMLDocument();
    XMLElement2 = requireXMLElement();
    XMLCData2 = requireXMLCData();
    XMLComment2 = requireXMLComment();
    XMLRaw2 = requireXMLRaw();
    XMLText2 = requireXMLText();
    XMLProcessingInstruction2 = requireXMLProcessingInstruction();
    XMLDeclaration2 = requireXMLDeclaration();
    XMLDocType2 = requireXMLDocType();
    XMLDTDAttList2 = requireXMLDTDAttList();
    XMLDTDEntity2 = requireXMLDTDEntity();
    XMLDTDElement2 = requireXMLDTDElement();
    XMLDTDNotation2 = requireXMLDTDNotation();
    XMLAttribute2 = requireXMLAttribute();
    XMLStringifier2 = requireXMLStringifier();
    XMLStringWriter2 = requireXMLStringWriter();
    WriterState2 = requireWriterState();
    XMLDocumentCB.exports = function() {
      function XMLDocumentCB2(options, onData, onEnd) {
        var writerOptions;
        this.name = "?xml";
        this.type = NodeType2.Document;
        options || (options = {});
        writerOptions = {};
        if (!options.writer) {
          options.writer = new XMLStringWriter2();
        } else if (isPlainObject(options.writer)) {
          writerOptions = options.writer;
          options.writer = new XMLStringWriter2();
        }
        this.options = options;
        this.writer = options.writer;
        this.writerOptions = this.writer.filterOptions(writerOptions);
        this.stringify = new XMLStringifier2(options);
        this.onDataCallback = onData || function() {
        };
        this.onEndCallback = onEnd || function() {
        };
        this.currentNode = null;
        this.currentLevel = -1;
        this.openTags = {};
        this.documentStarted = false;
        this.documentCompleted = false;
        this.root = null;
      }
      XMLDocumentCB2.prototype.createChildNode = function(node) {
        var att, attName, attributes, child, i, len, ref1, ref2;
        switch (node.type) {
          case NodeType2.CData:
            this.cdata(node.value);
            break;
          case NodeType2.Comment:
            this.comment(node.value);
            break;
          case NodeType2.Element:
            attributes = {};
            ref1 = node.attribs;
            for (attName in ref1) {
              if (!hasProp.call(ref1, attName)) continue;
              att = ref1[attName];
              attributes[attName] = att.value;
            }
            this.node(node.name, attributes);
            break;
          case NodeType2.Dummy:
            this.dummy();
            break;
          case NodeType2.Raw:
            this.raw(node.value);
            break;
          case NodeType2.Text:
            this.text(node.value);
            break;
          case NodeType2.ProcessingInstruction:
            this.instruction(node.target, node.value);
            break;
          default:
            throw new Error("This XML node type is not supported in a JS object: " + node.constructor.name);
        }
        ref2 = node.children;
        for (i = 0, len = ref2.length; i < len; i++) {
          child = ref2[i];
          this.createChildNode(child);
          if (child.type === NodeType2.Element) {
            this.up();
          }
        }
        return this;
      };
      XMLDocumentCB2.prototype.dummy = function() {
        return this;
      };
      XMLDocumentCB2.prototype.node = function(name, attributes, text) {
        var ref1;
        if (name == null) {
          throw new Error("Missing node name.");
        }
        if (this.root && this.currentLevel === -1) {
          throw new Error("Document can only have one root node. " + this.debugInfo(name));
        }
        this.openCurrent();
        name = getValue(name);
        if (attributes == null) {
          attributes = {};
        }
        attributes = getValue(attributes);
        if (!isObject(attributes)) {
          ref1 = [attributes, text], text = ref1[0], attributes = ref1[1];
        }
        this.currentNode = new XMLElement2(this, name, attributes);
        this.currentNode.children = false;
        this.currentLevel++;
        this.openTags[this.currentLevel] = this.currentNode;
        if (text != null) {
          this.text(text);
        }
        return this;
      };
      XMLDocumentCB2.prototype.element = function(name, attributes, text) {
        var child, i, len, oldValidationFlag, ref1, root;
        if (this.currentNode && this.currentNode.type === NodeType2.DocType) {
          this.dtdElement.apply(this, arguments);
        } else {
          if (Array.isArray(name) || isObject(name) || isFunction(name)) {
            oldValidationFlag = this.options.noValidation;
            this.options.noValidation = true;
            root = new XMLDocument2(this.options).element("TEMP_ROOT");
            root.element(name);
            this.options.noValidation = oldValidationFlag;
            ref1 = root.children;
            for (i = 0, len = ref1.length; i < len; i++) {
              child = ref1[i];
              this.createChildNode(child);
              if (child.type === NodeType2.Element) {
                this.up();
              }
            }
          } else {
            this.node(name, attributes, text);
          }
        }
        return this;
      };
      XMLDocumentCB2.prototype.attribute = function(name, value) {
        var attName, attValue;
        if (!this.currentNode || this.currentNode.children) {
          throw new Error("att() can only be used immediately after an ele() call in callback mode. " + this.debugInfo(name));
        }
        if (name != null) {
          name = getValue(name);
        }
        if (isObject(name)) {
          for (attName in name) {
            if (!hasProp.call(name, attName)) continue;
            attValue = name[attName];
            this.attribute(attName, attValue);
          }
        } else {
          if (isFunction(value)) {
            value = value.apply();
          }
          if (this.options.keepNullAttributes && value == null) {
            this.currentNode.attribs[name] = new XMLAttribute2(this, name, "");
          } else if (value != null) {
            this.currentNode.attribs[name] = new XMLAttribute2(this, name, value);
          }
        }
        return this;
      };
      XMLDocumentCB2.prototype.text = function(value) {
        var node;
        this.openCurrent();
        node = new XMLText2(this, value);
        this.onData(this.writer.text(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      };
      XMLDocumentCB2.prototype.cdata = function(value) {
        var node;
        this.openCurrent();
        node = new XMLCData2(this, value);
        this.onData(this.writer.cdata(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      };
      XMLDocumentCB2.prototype.comment = function(value) {
        var node;
        this.openCurrent();
        node = new XMLComment2(this, value);
        this.onData(this.writer.comment(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      };
      XMLDocumentCB2.prototype.raw = function(value) {
        var node;
        this.openCurrent();
        node = new XMLRaw2(this, value);
        this.onData(this.writer.raw(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      };
      XMLDocumentCB2.prototype.instruction = function(target, value) {
        var i, insTarget, insValue, len, node;
        this.openCurrent();
        if (target != null) {
          target = getValue(target);
        }
        if (value != null) {
          value = getValue(value);
        }
        if (Array.isArray(target)) {
          for (i = 0, len = target.length; i < len; i++) {
            insTarget = target[i];
            this.instruction(insTarget);
          }
        } else if (isObject(target)) {
          for (insTarget in target) {
            if (!hasProp.call(target, insTarget)) continue;
            insValue = target[insTarget];
            this.instruction(insTarget, insValue);
          }
        } else {
          if (isFunction(value)) {
            value = value.apply();
          }
          node = new XMLProcessingInstruction2(this, target, value);
          this.onData(this.writer.processingInstruction(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
        }
        return this;
      };
      XMLDocumentCB2.prototype.declaration = function(version, encoding, standalone) {
        var node;
        this.openCurrent();
        if (this.documentStarted) {
          throw new Error("declaration() must be the first node.");
        }
        node = new XMLDeclaration2(this, version, encoding, standalone);
        this.onData(this.writer.declaration(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      };
      XMLDocumentCB2.prototype.doctype = function(root, pubID, sysID) {
        this.openCurrent();
        if (root == null) {
          throw new Error("Missing root node name.");
        }
        if (this.root) {
          throw new Error("dtd() must come before the root node.");
        }
        this.currentNode = new XMLDocType2(this, pubID, sysID);
        this.currentNode.rootNodeName = root;
        this.currentNode.children = false;
        this.currentLevel++;
        this.openTags[this.currentLevel] = this.currentNode;
        return this;
      };
      XMLDocumentCB2.prototype.dtdElement = function(name, value) {
        var node;
        this.openCurrent();
        node = new XMLDTDElement2(this, name, value);
        this.onData(this.writer.dtdElement(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      };
      XMLDocumentCB2.prototype.attList = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
        var node;
        this.openCurrent();
        node = new XMLDTDAttList2(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
        this.onData(this.writer.dtdAttList(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      };
      XMLDocumentCB2.prototype.entity = function(name, value) {
        var node;
        this.openCurrent();
        node = new XMLDTDEntity2(this, false, name, value);
        this.onData(this.writer.dtdEntity(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      };
      XMLDocumentCB2.prototype.pEntity = function(name, value) {
        var node;
        this.openCurrent();
        node = new XMLDTDEntity2(this, true, name, value);
        this.onData(this.writer.dtdEntity(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      };
      XMLDocumentCB2.prototype.notation = function(name, value) {
        var node;
        this.openCurrent();
        node = new XMLDTDNotation2(this, name, value);
        this.onData(this.writer.dtdNotation(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      };
      XMLDocumentCB2.prototype.up = function() {
        if (this.currentLevel < 0) {
          throw new Error("The document node has no parent.");
        }
        if (this.currentNode) {
          if (this.currentNode.children) {
            this.closeNode(this.currentNode);
          } else {
            this.openNode(this.currentNode);
          }
          this.currentNode = null;
        } else {
          this.closeNode(this.openTags[this.currentLevel]);
        }
        delete this.openTags[this.currentLevel];
        this.currentLevel--;
        return this;
      };
      XMLDocumentCB2.prototype.end = function() {
        while (this.currentLevel >= 0) {
          this.up();
        }
        return this.onEnd();
      };
      XMLDocumentCB2.prototype.openCurrent = function() {
        if (this.currentNode) {
          this.currentNode.children = true;
          return this.openNode(this.currentNode);
        }
      };
      XMLDocumentCB2.prototype.openNode = function(node) {
        var att, chunk, name, ref1;
        if (!node.isOpen) {
          if (!this.root && this.currentLevel === 0 && node.type === NodeType2.Element) {
            this.root = node;
          }
          chunk = "";
          if (node.type === NodeType2.Element) {
            this.writerOptions.state = WriterState2.OpenTag;
            chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + "<" + node.name;
            ref1 = node.attribs;
            for (name in ref1) {
              if (!hasProp.call(ref1, name)) continue;
              att = ref1[name];
              chunk += this.writer.attribute(att, this.writerOptions, this.currentLevel);
            }
            chunk += (node.children ? ">" : "/>") + this.writer.endline(node, this.writerOptions, this.currentLevel);
            this.writerOptions.state = WriterState2.InsideTag;
          } else {
            this.writerOptions.state = WriterState2.OpenTag;
            chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + "<!DOCTYPE " + node.rootNodeName;
            if (node.pubID && node.sysID) {
              chunk += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
            } else if (node.sysID) {
              chunk += ' SYSTEM "' + node.sysID + '"';
            }
            if (node.children) {
              chunk += " [";
              this.writerOptions.state = WriterState2.InsideTag;
            } else {
              this.writerOptions.state = WriterState2.CloseTag;
              chunk += ">";
            }
            chunk += this.writer.endline(node, this.writerOptions, this.currentLevel);
          }
          this.onData(chunk, this.currentLevel);
          return node.isOpen = true;
        }
      };
      XMLDocumentCB2.prototype.closeNode = function(node) {
        var chunk;
        if (!node.isClosed) {
          chunk = "";
          this.writerOptions.state = WriterState2.CloseTag;
          if (node.type === NodeType2.Element) {
            chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + "</" + node.name + ">" + this.writer.endline(node, this.writerOptions, this.currentLevel);
          } else {
            chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + "]>" + this.writer.endline(node, this.writerOptions, this.currentLevel);
          }
          this.writerOptions.state = WriterState2.None;
          this.onData(chunk, this.currentLevel);
          return node.isClosed = true;
        }
      };
      XMLDocumentCB2.prototype.onData = function(chunk, level) {
        this.documentStarted = true;
        return this.onDataCallback(chunk, level + 1);
      };
      XMLDocumentCB2.prototype.onEnd = function() {
        this.documentCompleted = true;
        return this.onEndCallback();
      };
      XMLDocumentCB2.prototype.debugInfo = function(name) {
        if (name == null) {
          return "";
        } else {
          return "node: <" + name + ">";
        }
      };
      XMLDocumentCB2.prototype.ele = function() {
        return this.element.apply(this, arguments);
      };
      XMLDocumentCB2.prototype.nod = function(name, attributes, text) {
        return this.node(name, attributes, text);
      };
      XMLDocumentCB2.prototype.txt = function(value) {
        return this.text(value);
      };
      XMLDocumentCB2.prototype.dat = function(value) {
        return this.cdata(value);
      };
      XMLDocumentCB2.prototype.com = function(value) {
        return this.comment(value);
      };
      XMLDocumentCB2.prototype.ins = function(target, value) {
        return this.instruction(target, value);
      };
      XMLDocumentCB2.prototype.dec = function(version, encoding, standalone) {
        return this.declaration(version, encoding, standalone);
      };
      XMLDocumentCB2.prototype.dtd = function(root, pubID, sysID) {
        return this.doctype(root, pubID, sysID);
      };
      XMLDocumentCB2.prototype.e = function(name, attributes, text) {
        return this.element(name, attributes, text);
      };
      XMLDocumentCB2.prototype.n = function(name, attributes, text) {
        return this.node(name, attributes, text);
      };
      XMLDocumentCB2.prototype.t = function(value) {
        return this.text(value);
      };
      XMLDocumentCB2.prototype.d = function(value) {
        return this.cdata(value);
      };
      XMLDocumentCB2.prototype.c = function(value) {
        return this.comment(value);
      };
      XMLDocumentCB2.prototype.r = function(value) {
        return this.raw(value);
      };
      XMLDocumentCB2.prototype.i = function(target, value) {
        return this.instruction(target, value);
      };
      XMLDocumentCB2.prototype.att = function() {
        if (this.currentNode && this.currentNode.type === NodeType2.DocType) {
          return this.attList.apply(this, arguments);
        } else {
          return this.attribute.apply(this, arguments);
        }
      };
      XMLDocumentCB2.prototype.a = function() {
        if (this.currentNode && this.currentNode.type === NodeType2.DocType) {
          return this.attList.apply(this, arguments);
        } else {
          return this.attribute.apply(this, arguments);
        }
      };
      XMLDocumentCB2.prototype.ent = function(name, value) {
        return this.entity(name, value);
      };
      XMLDocumentCB2.prototype.pent = function(name, value) {
        return this.pEntity(name, value);
      };
      XMLDocumentCB2.prototype.not = function(name, value) {
        return this.notation(name, value);
      };
      return XMLDocumentCB2;
    }();
  }).call(commonjsGlobal);
  return XMLDocumentCB.exports;
}
var XMLStreamWriter = { exports: {} };
var hasRequiredXMLStreamWriter;
function requireXMLStreamWriter() {
  if (hasRequiredXMLStreamWriter) return XMLStreamWriter.exports;
  hasRequiredXMLStreamWriter = 1;
  (function() {
    var NodeType2, WriterState2, XMLWriterBase2, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    NodeType2 = requireNodeType();
    XMLWriterBase2 = requireXMLWriterBase();
    WriterState2 = requireWriterState();
    XMLStreamWriter.exports = function(superClass) {
      extend(XMLStreamWriter2, superClass);
      function XMLStreamWriter2(stream, options) {
        this.stream = stream;
        XMLStreamWriter2.__super__.constructor.call(this, options);
      }
      XMLStreamWriter2.prototype.endline = function(node, options, level) {
        if (node.isLastRootNode && options.state === WriterState2.CloseTag) {
          return "";
        } else {
          return XMLStreamWriter2.__super__.endline.call(this, node, options, level);
        }
      };
      XMLStreamWriter2.prototype.document = function(doc, options) {
        var child, i, j, k, len, len1, ref, ref1, results;
        ref = doc.children;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          child = ref[i];
          child.isLastRootNode = i === doc.children.length - 1;
        }
        options = this.filterOptions(options);
        ref1 = doc.children;
        results = [];
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          child = ref1[k];
          results.push(this.writeChildNode(child, options, 0));
        }
        return results;
      };
      XMLStreamWriter2.prototype.attribute = function(att, options, level) {
        return this.stream.write(XMLStreamWriter2.__super__.attribute.call(this, att, options, level));
      };
      XMLStreamWriter2.prototype.cdata = function(node, options, level) {
        return this.stream.write(XMLStreamWriter2.__super__.cdata.call(this, node, options, level));
      };
      XMLStreamWriter2.prototype.comment = function(node, options, level) {
        return this.stream.write(XMLStreamWriter2.__super__.comment.call(this, node, options, level));
      };
      XMLStreamWriter2.prototype.declaration = function(node, options, level) {
        return this.stream.write(XMLStreamWriter2.__super__.declaration.call(this, node, options, level));
      };
      XMLStreamWriter2.prototype.docType = function(node, options, level) {
        var child, j, len, ref;
        level || (level = 0);
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        this.stream.write(this.indent(node, options, level));
        this.stream.write("<!DOCTYPE " + node.root().name);
        if (node.pubID && node.sysID) {
          this.stream.write(' PUBLIC "' + node.pubID + '" "' + node.sysID + '"');
        } else if (node.sysID) {
          this.stream.write(' SYSTEM "' + node.sysID + '"');
        }
        if (node.children.length > 0) {
          this.stream.write(" [");
          this.stream.write(this.endline(node, options, level));
          options.state = WriterState2.InsideTag;
          ref = node.children;
          for (j = 0, len = ref.length; j < len; j++) {
            child = ref[j];
            this.writeChildNode(child, options, level + 1);
          }
          options.state = WriterState2.CloseTag;
          this.stream.write("]");
        }
        options.state = WriterState2.CloseTag;
        this.stream.write(options.spaceBeforeSlash + ">");
        this.stream.write(this.endline(node, options, level));
        options.state = WriterState2.None;
        return this.closeNode(node, options, level);
      };
      XMLStreamWriter2.prototype.element = function(node, options, level) {
        var att, child, childNodeCount, firstChildNode, j, len, name, ref, ref1;
        level || (level = 0);
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        this.stream.write(this.indent(node, options, level) + "<" + node.name);
        ref = node.attribs;
        for (name in ref) {
          if (!hasProp.call(ref, name)) continue;
          att = ref[name];
          this.attribute(att, options, level);
        }
        childNodeCount = node.children.length;
        firstChildNode = childNodeCount === 0 ? null : node.children[0];
        if (childNodeCount === 0 || node.children.every(function(e) {
          return (e.type === NodeType2.Text || e.type === NodeType2.Raw) && e.value === "";
        })) {
          if (options.allowEmpty) {
            this.stream.write(">");
            options.state = WriterState2.CloseTag;
            this.stream.write("</" + node.name + ">");
          } else {
            options.state = WriterState2.CloseTag;
            this.stream.write(options.spaceBeforeSlash + "/>");
          }
        } else if (options.pretty && childNodeCount === 1 && (firstChildNode.type === NodeType2.Text || firstChildNode.type === NodeType2.Raw) && firstChildNode.value != null) {
          this.stream.write(">");
          options.state = WriterState2.InsideTag;
          options.suppressPrettyCount++;
          this.writeChildNode(firstChildNode, options, level + 1);
          options.suppressPrettyCount--;
          options.state = WriterState2.CloseTag;
          this.stream.write("</" + node.name + ">");
        } else {
          this.stream.write(">" + this.endline(node, options, level));
          options.state = WriterState2.InsideTag;
          ref1 = node.children;
          for (j = 0, len = ref1.length; j < len; j++) {
            child = ref1[j];
            this.writeChildNode(child, options, level + 1);
          }
          options.state = WriterState2.CloseTag;
          this.stream.write(this.indent(node, options, level) + "</" + node.name + ">");
        }
        this.stream.write(this.endline(node, options, level));
        options.state = WriterState2.None;
        return this.closeNode(node, options, level);
      };
      XMLStreamWriter2.prototype.processingInstruction = function(node, options, level) {
        return this.stream.write(XMLStreamWriter2.__super__.processingInstruction.call(this, node, options, level));
      };
      XMLStreamWriter2.prototype.raw = function(node, options, level) {
        return this.stream.write(XMLStreamWriter2.__super__.raw.call(this, node, options, level));
      };
      XMLStreamWriter2.prototype.text = function(node, options, level) {
        return this.stream.write(XMLStreamWriter2.__super__.text.call(this, node, options, level));
      };
      XMLStreamWriter2.prototype.dtdAttList = function(node, options, level) {
        return this.stream.write(XMLStreamWriter2.__super__.dtdAttList.call(this, node, options, level));
      };
      XMLStreamWriter2.prototype.dtdElement = function(node, options, level) {
        return this.stream.write(XMLStreamWriter2.__super__.dtdElement.call(this, node, options, level));
      };
      XMLStreamWriter2.prototype.dtdEntity = function(node, options, level) {
        return this.stream.write(XMLStreamWriter2.__super__.dtdEntity.call(this, node, options, level));
      };
      XMLStreamWriter2.prototype.dtdNotation = function(node, options, level) {
        return this.stream.write(XMLStreamWriter2.__super__.dtdNotation.call(this, node, options, level));
      };
      return XMLStreamWriter2;
    }(XMLWriterBase2);
  }).call(commonjsGlobal);
  return XMLStreamWriter.exports;
}
var hasRequiredLib;
function requireLib() {
  if (hasRequiredLib) return lib;
  hasRequiredLib = 1;
  (function() {
    var NodeType2, WriterState2, XMLDOMImplementation2, XMLDocument2, XMLDocumentCB2, XMLStreamWriter2, XMLStringWriter2, assign, isFunction, ref;
    ref = requireUtility(), assign = ref.assign, isFunction = ref.isFunction;
    XMLDOMImplementation2 = requireXMLDOMImplementation();
    XMLDocument2 = requireXMLDocument();
    XMLDocumentCB2 = requireXMLDocumentCB();
    XMLStringWriter2 = requireXMLStringWriter();
    XMLStreamWriter2 = requireXMLStreamWriter();
    NodeType2 = requireNodeType();
    WriterState2 = requireWriterState();
    lib.create = function(name, xmldec, doctype, options) {
      var doc, root;
      if (name == null) {
        throw new Error("Root element needs a name.");
      }
      options = assign({}, xmldec, doctype, options);
      doc = new XMLDocument2(options);
      root = doc.element(name);
      if (!options.headless) {
        doc.declaration(options);
        if (options.pubID != null || options.sysID != null) {
          doc.dtd(options);
        }
      }
      return root;
    };
    lib.begin = function(options, onData, onEnd) {
      var ref1;
      if (isFunction(options)) {
        ref1 = [options, onData], onData = ref1[0], onEnd = ref1[1];
        options = {};
      }
      if (onData) {
        return new XMLDocumentCB2(options, onData, onEnd);
      } else {
        return new XMLDocument2(options);
      }
    };
    lib.stringWriter = function(options) {
      return new XMLStringWriter2(options);
    };
    lib.streamWriter = function(stream, options) {
      return new XMLStreamWriter2(stream, options);
    };
    lib.implementation = new XMLDOMImplementation2();
    lib.nodeType = NodeType2;
    lib.writerState = WriterState2;
  }).call(commonjsGlobal);
  return lib;
}
var hasRequiredBuilder;
function requireBuilder() {
  if (hasRequiredBuilder) return builder;
  hasRequiredBuilder = 1;
  (function() {
    var builder$1, defaults2, escapeCDATA, requiresCDATA, wrapCDATA, hasProp = {}.hasOwnProperty;
    builder$1 = requireLib();
    defaults2 = requireDefaults().defaults;
    requiresCDATA = function(entry) {
      return typeof entry === "string" && (entry.indexOf("&") >= 0 || entry.indexOf(">") >= 0 || entry.indexOf("<") >= 0);
    };
    wrapCDATA = function(entry) {
      return "<![CDATA[" + escapeCDATA(entry) + "]]>";
    };
    escapeCDATA = function(entry) {
      return entry.replace("]]>", "]]]]><![CDATA[>");
    };
    builder.Builder = function() {
      function Builder(opts) {
        var key, ref, value;
        this.options = {};
        ref = defaults2["0.2"];
        for (key in ref) {
          if (!hasProp.call(ref, key)) continue;
          value = ref[key];
          this.options[key] = value;
        }
        for (key in opts) {
          if (!hasProp.call(opts, key)) continue;
          value = opts[key];
          this.options[key] = value;
        }
      }
      Builder.prototype.buildObject = function(rootObj) {
        var attrkey, charkey, render, rootElement, rootName;
        attrkey = this.options.attrkey;
        charkey = this.options.charkey;
        if (Object.keys(rootObj).length === 1 && this.options.rootName === defaults2["0.2"].rootName) {
          rootName = Object.keys(rootObj)[0];
          rootObj = rootObj[rootName];
        } else {
          rootName = this.options.rootName;
        }
        render = /* @__PURE__ */ function(_this) {
          return function(element, obj) {
            var attr, child, entry, index, key, value;
            if (typeof obj !== "object") {
              if (_this.options.cdata && requiresCDATA(obj)) {
                element.raw(wrapCDATA(obj));
              } else {
                element.txt(obj);
              }
            } else if (Array.isArray(obj)) {
              for (index in obj) {
                if (!hasProp.call(obj, index)) continue;
                child = obj[index];
                for (key in child) {
                  entry = child[key];
                  element = render(element.ele(key), entry).up();
                }
              }
            } else {
              for (key in obj) {
                if (!hasProp.call(obj, key)) continue;
                child = obj[key];
                if (key === attrkey) {
                  if (typeof child === "object") {
                    for (attr in child) {
                      value = child[attr];
                      element = element.att(attr, value);
                    }
                  }
                } else if (key === charkey) {
                  if (_this.options.cdata && requiresCDATA(child)) {
                    element = element.raw(wrapCDATA(child));
                  } else {
                    element = element.txt(child);
                  }
                } else if (Array.isArray(child)) {
                  for (index in child) {
                    if (!hasProp.call(child, index)) continue;
                    entry = child[index];
                    if (typeof entry === "string") {
                      if (_this.options.cdata && requiresCDATA(entry)) {
                        element = element.ele(key).raw(wrapCDATA(entry)).up();
                      } else {
                        element = element.ele(key, entry).up();
                      }
                    } else {
                      element = render(element.ele(key), entry).up();
                    }
                  }
                } else if (typeof child === "object") {
                  element = render(element.ele(key), child).up();
                } else {
                  if (typeof child === "string" && _this.options.cdata && requiresCDATA(child)) {
                    element = element.ele(key).raw(wrapCDATA(child)).up();
                  } else {
                    if (child == null) {
                      child = "";
                    }
                    element = element.ele(key, child.toString()).up();
                  }
                }
              }
            }
            return element;
          };
        }(this);
        rootElement = builder$1.create(rootName, this.options.xmldec, this.options.doctype, {
          headless: this.options.headless,
          allowSurrogateChars: this.options.allowSurrogateChars
        });
        return render(rootElement, rootObj).end(this.options.renderOpts);
      };
      return Builder;
    }();
  }).call(commonjsGlobal);
  return builder;
}
var parser = {};
var sax = {};
var hasRequiredSax;
function requireSax() {
  if (hasRequiredSax) return sax;
  hasRequiredSax = 1;
  (function(exports) {
    (function(sax2) {
      sax2.parser = function(strict, opt) {
        return new SAXParser(strict, opt);
      };
      sax2.SAXParser = SAXParser;
      sax2.SAXStream = SAXStream;
      sax2.createStream = createStream;
      sax2.MAX_BUFFER_LENGTH = 64 * 1024;
      var buffers = [
        "comment",
        "sgmlDecl",
        "textNode",
        "tagName",
        "doctype",
        "procInstName",
        "procInstBody",
        "entity",
        "attribName",
        "attribValue",
        "cdata",
        "script"
      ];
      sax2.EVENTS = [
        "text",
        "processinginstruction",
        "sgmldeclaration",
        "doctype",
        "comment",
        "opentagstart",
        "attribute",
        "opentag",
        "closetag",
        "opencdata",
        "cdata",
        "closecdata",
        "error",
        "end",
        "ready",
        "script",
        "opennamespace",
        "closenamespace"
      ];
      function SAXParser(strict, opt) {
        if (!(this instanceof SAXParser)) {
          return new SAXParser(strict, opt);
        }
        var parser2 = this;
        clearBuffers(parser2);
        parser2.q = parser2.c = "";
        parser2.bufferCheckPosition = sax2.MAX_BUFFER_LENGTH;
        parser2.opt = opt || {};
        parser2.opt.lowercase = parser2.opt.lowercase || parser2.opt.lowercasetags;
        parser2.looseCase = parser2.opt.lowercase ? "toLowerCase" : "toUpperCase";
        parser2.tags = [];
        parser2.closed = parser2.closedRoot = parser2.sawRoot = false;
        parser2.tag = parser2.error = null;
        parser2.strict = !!strict;
        parser2.noscript = !!(strict || parser2.opt.noscript);
        parser2.state = S.BEGIN;
        parser2.strictEntities = parser2.opt.strictEntities;
        parser2.ENTITIES = parser2.strictEntities ? Object.create(sax2.XML_ENTITIES) : Object.create(sax2.ENTITIES);
        parser2.attribList = [];
        if (parser2.opt.xmlns) {
          parser2.ns = Object.create(rootNS);
        }
        if (parser2.opt.unquotedAttributeValues === void 0) {
          parser2.opt.unquotedAttributeValues = !strict;
        }
        parser2.trackPosition = parser2.opt.position !== false;
        if (parser2.trackPosition) {
          parser2.position = parser2.line = parser2.column = 0;
        }
        emit(parser2, "onready");
      }
      if (!Object.create) {
        Object.create = function(o) {
          function F() {
          }
          F.prototype = o;
          var newf = new F();
          return newf;
        };
      }
      if (!Object.keys) {
        Object.keys = function(o) {
          var a = [];
          for (var i in o) if (o.hasOwnProperty(i)) a.push(i);
          return a;
        };
      }
      function checkBufferLength(parser2) {
        var maxAllowed = Math.max(sax2.MAX_BUFFER_LENGTH, 10);
        var maxActual = 0;
        for (var i = 0, l = buffers.length; i < l; i++) {
          var len = parser2[buffers[i]].length;
          if (len > maxAllowed) {
            switch (buffers[i]) {
              case "textNode":
                closeText(parser2);
                break;
              case "cdata":
                emitNode(parser2, "oncdata", parser2.cdata);
                parser2.cdata = "";
                break;
              case "script":
                emitNode(parser2, "onscript", parser2.script);
                parser2.script = "";
                break;
              default:
                error(parser2, "Max buffer length exceeded: " + buffers[i]);
            }
          }
          maxActual = Math.max(maxActual, len);
        }
        var m = sax2.MAX_BUFFER_LENGTH - maxActual;
        parser2.bufferCheckPosition = m + parser2.position;
      }
      function clearBuffers(parser2) {
        for (var i = 0, l = buffers.length; i < l; i++) {
          parser2[buffers[i]] = "";
        }
      }
      function flushBuffers(parser2) {
        closeText(parser2);
        if (parser2.cdata !== "") {
          emitNode(parser2, "oncdata", parser2.cdata);
          parser2.cdata = "";
        }
        if (parser2.script !== "") {
          emitNode(parser2, "onscript", parser2.script);
          parser2.script = "";
        }
      }
      SAXParser.prototype = {
        end: function() {
          end(this);
        },
        write,
        resume: function() {
          this.error = null;
          return this;
        },
        close: function() {
          return this.write(null);
        },
        flush: function() {
          flushBuffers(this);
        }
      };
      var Stream;
      try {
        Stream = require("stream").Stream;
      } catch (ex) {
        Stream = function() {
        };
      }
      if (!Stream) Stream = function() {
      };
      var streamWraps = sax2.EVENTS.filter(function(ev) {
        return ev !== "error" && ev !== "end";
      });
      function createStream(strict, opt) {
        return new SAXStream(strict, opt);
      }
      function SAXStream(strict, opt) {
        if (!(this instanceof SAXStream)) {
          return new SAXStream(strict, opt);
        }
        Stream.apply(this);
        this._parser = new SAXParser(strict, opt);
        this.writable = true;
        this.readable = true;
        var me = this;
        this._parser.onend = function() {
          me.emit("end");
        };
        this._parser.onerror = function(er) {
          me.emit("error", er);
          me._parser.error = null;
        };
        this._decoder = null;
        streamWraps.forEach(function(ev) {
          Object.defineProperty(me, "on" + ev, {
            get: function() {
              return me._parser["on" + ev];
            },
            set: function(h) {
              if (!h) {
                me.removeAllListeners(ev);
                me._parser["on" + ev] = h;
                return h;
              }
              me.on(ev, h);
            },
            enumerable: true,
            configurable: false
          });
        });
      }
      SAXStream.prototype = Object.create(Stream.prototype, {
        constructor: {
          value: SAXStream
        }
      });
      SAXStream.prototype.write = function(data) {
        if (typeof Buffer === "function" && typeof Buffer.isBuffer === "function" && Buffer.isBuffer(data)) {
          if (!this._decoder) {
            var SD = require$$1$2.StringDecoder;
            this._decoder = new SD("utf8");
          }
          data = this._decoder.write(data);
        }
        this._parser.write(data.toString());
        this.emit("data", data);
        return true;
      };
      SAXStream.prototype.end = function(chunk) {
        if (chunk && chunk.length) {
          this.write(chunk);
        }
        this._parser.end();
        return true;
      };
      SAXStream.prototype.on = function(ev, handler) {
        var me = this;
        if (!me._parser["on" + ev] && streamWraps.indexOf(ev) !== -1) {
          me._parser["on" + ev] = function() {
            var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
            args.splice(0, 0, ev);
            me.emit.apply(me, args);
          };
        }
        return Stream.prototype.on.call(me, ev, handler);
      };
      var CDATA = "[CDATA[";
      var DOCTYPE = "DOCTYPE";
      var XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace";
      var XMLNS_NAMESPACE = "http://www.w3.org/2000/xmlns/";
      var rootNS = { xml: XML_NAMESPACE, xmlns: XMLNS_NAMESPACE };
      var nameStart = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
      var nameBody = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      var entityStart = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
      var entityBody = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      function isWhitespace(c) {
        return c === " " || c === "\n" || c === "\r" || c === "	";
      }
      function isQuote(c) {
        return c === '"' || c === "'";
      }
      function isAttribEnd(c) {
        return c === ">" || isWhitespace(c);
      }
      function isMatch(regex, c) {
        return regex.test(c);
      }
      function notMatch(regex, c) {
        return !isMatch(regex, c);
      }
      var S = 0;
      sax2.STATE = {
        BEGIN: S++,
        // leading byte order mark or whitespace
        BEGIN_WHITESPACE: S++,
        // leading whitespace
        TEXT: S++,
        // general stuff
        TEXT_ENTITY: S++,
        // &amp and such.
        OPEN_WAKA: S++,
        // <
        SGML_DECL: S++,
        // <!BLARG
        SGML_DECL_QUOTED: S++,
        // <!BLARG foo "bar
        DOCTYPE: S++,
        // <!DOCTYPE
        DOCTYPE_QUOTED: S++,
        // <!DOCTYPE "//blah
        DOCTYPE_DTD: S++,
        // <!DOCTYPE "//blah" [ ...
        DOCTYPE_DTD_QUOTED: S++,
        // <!DOCTYPE "//blah" [ "foo
        COMMENT_STARTING: S++,
        // <!-
        COMMENT: S++,
        // <!--
        COMMENT_ENDING: S++,
        // <!-- blah -
        COMMENT_ENDED: S++,
        // <!-- blah --
        CDATA: S++,
        // <![CDATA[ something
        CDATA_ENDING: S++,
        // ]
        CDATA_ENDING_2: S++,
        // ]]
        PROC_INST: S++,
        // <?hi
        PROC_INST_BODY: S++,
        // <?hi there
        PROC_INST_ENDING: S++,
        // <?hi "there" ?
        OPEN_TAG: S++,
        // <strong
        OPEN_TAG_SLASH: S++,
        // <strong /
        ATTRIB: S++,
        // <a
        ATTRIB_NAME: S++,
        // <a foo
        ATTRIB_NAME_SAW_WHITE: S++,
        // <a foo _
        ATTRIB_VALUE: S++,
        // <a foo=
        ATTRIB_VALUE_QUOTED: S++,
        // <a foo="bar
        ATTRIB_VALUE_CLOSED: S++,
        // <a foo="bar"
        ATTRIB_VALUE_UNQUOTED: S++,
        // <a foo=bar
        ATTRIB_VALUE_ENTITY_Q: S++,
        // <foo bar="&quot;"
        ATTRIB_VALUE_ENTITY_U: S++,
        // <foo bar=&quot
        CLOSE_TAG: S++,
        // </a
        CLOSE_TAG_SAW_WHITE: S++,
        // </a   >
        SCRIPT: S++,
        // <script> ...
        SCRIPT_ENDING: S++
        // <script> ... <
      };
      sax2.XML_ENTITIES = {
        "amp": "&",
        "gt": ">",
        "lt": "<",
        "quot": '"',
        "apos": "'"
      };
      sax2.ENTITIES = {
        "amp": "&",
        "gt": ">",
        "lt": "<",
        "quot": '"',
        "apos": "'",
        "AElig": 198,
        "Aacute": 193,
        "Acirc": 194,
        "Agrave": 192,
        "Aring": 197,
        "Atilde": 195,
        "Auml": 196,
        "Ccedil": 199,
        "ETH": 208,
        "Eacute": 201,
        "Ecirc": 202,
        "Egrave": 200,
        "Euml": 203,
        "Iacute": 205,
        "Icirc": 206,
        "Igrave": 204,
        "Iuml": 207,
        "Ntilde": 209,
        "Oacute": 211,
        "Ocirc": 212,
        "Ograve": 210,
        "Oslash": 216,
        "Otilde": 213,
        "Ouml": 214,
        "THORN": 222,
        "Uacute": 218,
        "Ucirc": 219,
        "Ugrave": 217,
        "Uuml": 220,
        "Yacute": 221,
        "aacute": 225,
        "acirc": 226,
        "aelig": 230,
        "agrave": 224,
        "aring": 229,
        "atilde": 227,
        "auml": 228,
        "ccedil": 231,
        "eacute": 233,
        "ecirc": 234,
        "egrave": 232,
        "eth": 240,
        "euml": 235,
        "iacute": 237,
        "icirc": 238,
        "igrave": 236,
        "iuml": 239,
        "ntilde": 241,
        "oacute": 243,
        "ocirc": 244,
        "ograve": 242,
        "oslash": 248,
        "otilde": 245,
        "ouml": 246,
        "szlig": 223,
        "thorn": 254,
        "uacute": 250,
        "ucirc": 251,
        "ugrave": 249,
        "uuml": 252,
        "yacute": 253,
        "yuml": 255,
        "copy": 169,
        "reg": 174,
        "nbsp": 160,
        "iexcl": 161,
        "cent": 162,
        "pound": 163,
        "curren": 164,
        "yen": 165,
        "brvbar": 166,
        "sect": 167,
        "uml": 168,
        "ordf": 170,
        "laquo": 171,
        "not": 172,
        "shy": 173,
        "macr": 175,
        "deg": 176,
        "plusmn": 177,
        "sup1": 185,
        "sup2": 178,
        "sup3": 179,
        "acute": 180,
        "micro": 181,
        "para": 182,
        "middot": 183,
        "cedil": 184,
        "ordm": 186,
        "raquo": 187,
        "frac14": 188,
        "frac12": 189,
        "frac34": 190,
        "iquest": 191,
        "times": 215,
        "divide": 247,
        "OElig": 338,
        "oelig": 339,
        "Scaron": 352,
        "scaron": 353,
        "Yuml": 376,
        "fnof": 402,
        "circ": 710,
        "tilde": 732,
        "Alpha": 913,
        "Beta": 914,
        "Gamma": 915,
        "Delta": 916,
        "Epsilon": 917,
        "Zeta": 918,
        "Eta": 919,
        "Theta": 920,
        "Iota": 921,
        "Kappa": 922,
        "Lambda": 923,
        "Mu": 924,
        "Nu": 925,
        "Xi": 926,
        "Omicron": 927,
        "Pi": 928,
        "Rho": 929,
        "Sigma": 931,
        "Tau": 932,
        "Upsilon": 933,
        "Phi": 934,
        "Chi": 935,
        "Psi": 936,
        "Omega": 937,
        "alpha": 945,
        "beta": 946,
        "gamma": 947,
        "delta": 948,
        "epsilon": 949,
        "zeta": 950,
        "eta": 951,
        "theta": 952,
        "iota": 953,
        "kappa": 954,
        "lambda": 955,
        "mu": 956,
        "nu": 957,
        "xi": 958,
        "omicron": 959,
        "pi": 960,
        "rho": 961,
        "sigmaf": 962,
        "sigma": 963,
        "tau": 964,
        "upsilon": 965,
        "phi": 966,
        "chi": 967,
        "psi": 968,
        "omega": 969,
        "thetasym": 977,
        "upsih": 978,
        "piv": 982,
        "ensp": 8194,
        "emsp": 8195,
        "thinsp": 8201,
        "zwnj": 8204,
        "zwj": 8205,
        "lrm": 8206,
        "rlm": 8207,
        "ndash": 8211,
        "mdash": 8212,
        "lsquo": 8216,
        "rsquo": 8217,
        "sbquo": 8218,
        "ldquo": 8220,
        "rdquo": 8221,
        "bdquo": 8222,
        "dagger": 8224,
        "Dagger": 8225,
        "bull": 8226,
        "hellip": 8230,
        "permil": 8240,
        "prime": 8242,
        "Prime": 8243,
        "lsaquo": 8249,
        "rsaquo": 8250,
        "oline": 8254,
        "frasl": 8260,
        "euro": 8364,
        "image": 8465,
        "weierp": 8472,
        "real": 8476,
        "trade": 8482,
        "alefsym": 8501,
        "larr": 8592,
        "uarr": 8593,
        "rarr": 8594,
        "darr": 8595,
        "harr": 8596,
        "crarr": 8629,
        "lArr": 8656,
        "uArr": 8657,
        "rArr": 8658,
        "dArr": 8659,
        "hArr": 8660,
        "forall": 8704,
        "part": 8706,
        "exist": 8707,
        "empty": 8709,
        "nabla": 8711,
        "isin": 8712,
        "notin": 8713,
        "ni": 8715,
        "prod": 8719,
        "sum": 8721,
        "minus": 8722,
        "lowast": 8727,
        "radic": 8730,
        "prop": 8733,
        "infin": 8734,
        "ang": 8736,
        "and": 8743,
        "or": 8744,
        "cap": 8745,
        "cup": 8746,
        "int": 8747,
        "there4": 8756,
        "sim": 8764,
        "cong": 8773,
        "asymp": 8776,
        "ne": 8800,
        "equiv": 8801,
        "le": 8804,
        "ge": 8805,
        "sub": 8834,
        "sup": 8835,
        "nsub": 8836,
        "sube": 8838,
        "supe": 8839,
        "oplus": 8853,
        "otimes": 8855,
        "perp": 8869,
        "sdot": 8901,
        "lceil": 8968,
        "rceil": 8969,
        "lfloor": 8970,
        "rfloor": 8971,
        "lang": 9001,
        "rang": 9002,
        "loz": 9674,
        "spades": 9824,
        "clubs": 9827,
        "hearts": 9829,
        "diams": 9830
      };
      Object.keys(sax2.ENTITIES).forEach(function(key) {
        var e = sax2.ENTITIES[key];
        var s2 = typeof e === "number" ? String.fromCharCode(e) : e;
        sax2.ENTITIES[key] = s2;
      });
      for (var s in sax2.STATE) {
        sax2.STATE[sax2.STATE[s]] = s;
      }
      S = sax2.STATE;
      function emit(parser2, event, data) {
        parser2[event] && parser2[event](data);
      }
      function emitNode(parser2, nodeType, data) {
        if (parser2.textNode) closeText(parser2);
        emit(parser2, nodeType, data);
      }
      function closeText(parser2) {
        parser2.textNode = textopts(parser2.opt, parser2.textNode);
        if (parser2.textNode) emit(parser2, "ontext", parser2.textNode);
        parser2.textNode = "";
      }
      function textopts(opt, text) {
        if (opt.trim) text = text.trim();
        if (opt.normalize) text = text.replace(/\s+/g, " ");
        return text;
      }
      function error(parser2, er) {
        closeText(parser2);
        if (parser2.trackPosition) {
          er += "\nLine: " + parser2.line + "\nColumn: " + parser2.column + "\nChar: " + parser2.c;
        }
        er = new Error(er);
        parser2.error = er;
        emit(parser2, "onerror", er);
        return parser2;
      }
      function end(parser2) {
        if (parser2.sawRoot && !parser2.closedRoot) strictFail(parser2, "Unclosed root tag");
        if (parser2.state !== S.BEGIN && parser2.state !== S.BEGIN_WHITESPACE && parser2.state !== S.TEXT) {
          error(parser2, "Unexpected end");
        }
        closeText(parser2);
        parser2.c = "";
        parser2.closed = true;
        emit(parser2, "onend");
        SAXParser.call(parser2, parser2.strict, parser2.opt);
        return parser2;
      }
      function strictFail(parser2, message) {
        if (typeof parser2 !== "object" || !(parser2 instanceof SAXParser)) {
          throw new Error("bad call to strictFail");
        }
        if (parser2.strict) {
          error(parser2, message);
        }
      }
      function newTag(parser2) {
        if (!parser2.strict) parser2.tagName = parser2.tagName[parser2.looseCase]();
        var parent = parser2.tags[parser2.tags.length - 1] || parser2;
        var tag = parser2.tag = { name: parser2.tagName, attributes: {} };
        if (parser2.opt.xmlns) {
          tag.ns = parent.ns;
        }
        parser2.attribList.length = 0;
        emitNode(parser2, "onopentagstart", tag);
      }
      function qname(name, attribute) {
        var i = name.indexOf(":");
        var qualName = i < 0 ? ["", name] : name.split(":");
        var prefix = qualName[0];
        var local = qualName[1];
        if (attribute && name === "xmlns") {
          prefix = "xmlns";
          local = "";
        }
        return { prefix, local };
      }
      function attrib(parser2) {
        if (!parser2.strict) {
          parser2.attribName = parser2.attribName[parser2.looseCase]();
        }
        if (parser2.attribList.indexOf(parser2.attribName) !== -1 || parser2.tag.attributes.hasOwnProperty(parser2.attribName)) {
          parser2.attribName = parser2.attribValue = "";
          return;
        }
        if (parser2.opt.xmlns) {
          var qn = qname(parser2.attribName, true);
          var prefix = qn.prefix;
          var local = qn.local;
          if (prefix === "xmlns") {
            if (local === "xml" && parser2.attribValue !== XML_NAMESPACE) {
              strictFail(
                parser2,
                "xml: prefix must be bound to " + XML_NAMESPACE + "\nActual: " + parser2.attribValue
              );
            } else if (local === "xmlns" && parser2.attribValue !== XMLNS_NAMESPACE) {
              strictFail(
                parser2,
                "xmlns: prefix must be bound to " + XMLNS_NAMESPACE + "\nActual: " + parser2.attribValue
              );
            } else {
              var tag = parser2.tag;
              var parent = parser2.tags[parser2.tags.length - 1] || parser2;
              if (tag.ns === parent.ns) {
                tag.ns = Object.create(parent.ns);
              }
              tag.ns[local] = parser2.attribValue;
            }
          }
          parser2.attribList.push([parser2.attribName, parser2.attribValue]);
        } else {
          parser2.tag.attributes[parser2.attribName] = parser2.attribValue;
          emitNode(parser2, "onattribute", {
            name: parser2.attribName,
            value: parser2.attribValue
          });
        }
        parser2.attribName = parser2.attribValue = "";
      }
      function openTag(parser2, selfClosing) {
        if (parser2.opt.xmlns) {
          var tag = parser2.tag;
          var qn = qname(parser2.tagName);
          tag.prefix = qn.prefix;
          tag.local = qn.local;
          tag.uri = tag.ns[qn.prefix] || "";
          if (tag.prefix && !tag.uri) {
            strictFail(parser2, "Unbound namespace prefix: " + JSON.stringify(parser2.tagName));
            tag.uri = qn.prefix;
          }
          var parent = parser2.tags[parser2.tags.length - 1] || parser2;
          if (tag.ns && parent.ns !== tag.ns) {
            Object.keys(tag.ns).forEach(function(p) {
              emitNode(parser2, "onopennamespace", {
                prefix: p,
                uri: tag.ns[p]
              });
            });
          }
          for (var i = 0, l = parser2.attribList.length; i < l; i++) {
            var nv = parser2.attribList[i];
            var name = nv[0];
            var value = nv[1];
            var qualName = qname(name, true);
            var prefix = qualName.prefix;
            var local = qualName.local;
            var uri = prefix === "" ? "" : tag.ns[prefix] || "";
            var a = {
              name,
              value,
              prefix,
              local,
              uri
            };
            if (prefix && prefix !== "xmlns" && !uri) {
              strictFail(parser2, "Unbound namespace prefix: " + JSON.stringify(prefix));
              a.uri = prefix;
            }
            parser2.tag.attributes[name] = a;
            emitNode(parser2, "onattribute", a);
          }
          parser2.attribList.length = 0;
        }
        parser2.tag.isSelfClosing = !!selfClosing;
        parser2.sawRoot = true;
        parser2.tags.push(parser2.tag);
        emitNode(parser2, "onopentag", parser2.tag);
        if (!selfClosing) {
          if (!parser2.noscript && parser2.tagName.toLowerCase() === "script") {
            parser2.state = S.SCRIPT;
          } else {
            parser2.state = S.TEXT;
          }
          parser2.tag = null;
          parser2.tagName = "";
        }
        parser2.attribName = parser2.attribValue = "";
        parser2.attribList.length = 0;
      }
      function closeTag(parser2) {
        if (!parser2.tagName) {
          strictFail(parser2, "Weird empty close tag.");
          parser2.textNode += "</>";
          parser2.state = S.TEXT;
          return;
        }
        if (parser2.script) {
          if (parser2.tagName !== "script") {
            parser2.script += "</" + parser2.tagName + ">";
            parser2.tagName = "";
            parser2.state = S.SCRIPT;
            return;
          }
          emitNode(parser2, "onscript", parser2.script);
          parser2.script = "";
        }
        var t = parser2.tags.length;
        var tagName = parser2.tagName;
        if (!parser2.strict) {
          tagName = tagName[parser2.looseCase]();
        }
        var closeTo = tagName;
        while (t--) {
          var close = parser2.tags[t];
          if (close.name !== closeTo) {
            strictFail(parser2, "Unexpected close tag");
          } else {
            break;
          }
        }
        if (t < 0) {
          strictFail(parser2, "Unmatched closing tag: " + parser2.tagName);
          parser2.textNode += "</" + parser2.tagName + ">";
          parser2.state = S.TEXT;
          return;
        }
        parser2.tagName = tagName;
        var s2 = parser2.tags.length;
        while (s2-- > t) {
          var tag = parser2.tag = parser2.tags.pop();
          parser2.tagName = parser2.tag.name;
          emitNode(parser2, "onclosetag", parser2.tagName);
          var x = {};
          for (var i in tag.ns) {
            x[i] = tag.ns[i];
          }
          var parent = parser2.tags[parser2.tags.length - 1] || parser2;
          if (parser2.opt.xmlns && tag.ns !== parent.ns) {
            Object.keys(tag.ns).forEach(function(p) {
              var n = tag.ns[p];
              emitNode(parser2, "onclosenamespace", { prefix: p, uri: n });
            });
          }
        }
        if (t === 0) parser2.closedRoot = true;
        parser2.tagName = parser2.attribValue = parser2.attribName = "";
        parser2.attribList.length = 0;
        parser2.state = S.TEXT;
      }
      function parseEntity(parser2) {
        var entity = parser2.entity;
        var entityLC = entity.toLowerCase();
        var num;
        var numStr = "";
        if (parser2.ENTITIES[entity]) {
          return parser2.ENTITIES[entity];
        }
        if (parser2.ENTITIES[entityLC]) {
          return parser2.ENTITIES[entityLC];
        }
        entity = entityLC;
        if (entity.charAt(0) === "#") {
          if (entity.charAt(1) === "x") {
            entity = entity.slice(2);
            num = parseInt(entity, 16);
            numStr = num.toString(16);
          } else {
            entity = entity.slice(1);
            num = parseInt(entity, 10);
            numStr = num.toString(10);
          }
        }
        entity = entity.replace(/^0+/, "");
        if (isNaN(num) || numStr.toLowerCase() !== entity) {
          strictFail(parser2, "Invalid character entity");
          return "&" + parser2.entity + ";";
        }
        return String.fromCodePoint(num);
      }
      function beginWhiteSpace(parser2, c) {
        if (c === "<") {
          parser2.state = S.OPEN_WAKA;
          parser2.startTagPosition = parser2.position;
        } else if (!isWhitespace(c)) {
          strictFail(parser2, "Non-whitespace before first tag.");
          parser2.textNode = c;
          parser2.state = S.TEXT;
        }
      }
      function charAt(chunk, i) {
        var result = "";
        if (i < chunk.length) {
          result = chunk.charAt(i);
        }
        return result;
      }
      function write(chunk) {
        var parser2 = this;
        if (this.error) {
          throw this.error;
        }
        if (parser2.closed) {
          return error(
            parser2,
            "Cannot write after close. Assign an onready handler."
          );
        }
        if (chunk === null) {
          return end(parser2);
        }
        if (typeof chunk === "object") {
          chunk = chunk.toString();
        }
        var i = 0;
        var c = "";
        while (true) {
          c = charAt(chunk, i++);
          parser2.c = c;
          if (!c) {
            break;
          }
          if (parser2.trackPosition) {
            parser2.position++;
            if (c === "\n") {
              parser2.line++;
              parser2.column = 0;
            } else {
              parser2.column++;
            }
          }
          switch (parser2.state) {
            case S.BEGIN:
              parser2.state = S.BEGIN_WHITESPACE;
              if (c === "\uFEFF") {
                continue;
              }
              beginWhiteSpace(parser2, c);
              continue;
            case S.BEGIN_WHITESPACE:
              beginWhiteSpace(parser2, c);
              continue;
            case S.TEXT:
              if (parser2.sawRoot && !parser2.closedRoot) {
                var starti = i - 1;
                while (c && c !== "<" && c !== "&") {
                  c = charAt(chunk, i++);
                  if (c && parser2.trackPosition) {
                    parser2.position++;
                    if (c === "\n") {
                      parser2.line++;
                      parser2.column = 0;
                    } else {
                      parser2.column++;
                    }
                  }
                }
                parser2.textNode += chunk.substring(starti, i - 1);
              }
              if (c === "<" && !(parser2.sawRoot && parser2.closedRoot && !parser2.strict)) {
                parser2.state = S.OPEN_WAKA;
                parser2.startTagPosition = parser2.position;
              } else {
                if (!isWhitespace(c) && (!parser2.sawRoot || parser2.closedRoot)) {
                  strictFail(parser2, "Text data outside of root node.");
                }
                if (c === "&") {
                  parser2.state = S.TEXT_ENTITY;
                } else {
                  parser2.textNode += c;
                }
              }
              continue;
            case S.SCRIPT:
              if (c === "<") {
                parser2.state = S.SCRIPT_ENDING;
              } else {
                parser2.script += c;
              }
              continue;
            case S.SCRIPT_ENDING:
              if (c === "/") {
                parser2.state = S.CLOSE_TAG;
              } else {
                parser2.script += "<" + c;
                parser2.state = S.SCRIPT;
              }
              continue;
            case S.OPEN_WAKA:
              if (c === "!") {
                parser2.state = S.SGML_DECL;
                parser2.sgmlDecl = "";
              } else if (isWhitespace(c)) ;
              else if (isMatch(nameStart, c)) {
                parser2.state = S.OPEN_TAG;
                parser2.tagName = c;
              } else if (c === "/") {
                parser2.state = S.CLOSE_TAG;
                parser2.tagName = "";
              } else if (c === "?") {
                parser2.state = S.PROC_INST;
                parser2.procInstName = parser2.procInstBody = "";
              } else {
                strictFail(parser2, "Unencoded <");
                if (parser2.startTagPosition + 1 < parser2.position) {
                  var pad = parser2.position - parser2.startTagPosition;
                  c = new Array(pad).join(" ") + c;
                }
                parser2.textNode += "<" + c;
                parser2.state = S.TEXT;
              }
              continue;
            case S.SGML_DECL:
              if (parser2.sgmlDecl + c === "--") {
                parser2.state = S.COMMENT;
                parser2.comment = "";
                parser2.sgmlDecl = "";
                continue;
              }
              if (parser2.doctype && parser2.doctype !== true && parser2.sgmlDecl) {
                parser2.state = S.DOCTYPE_DTD;
                parser2.doctype += "<!" + parser2.sgmlDecl + c;
                parser2.sgmlDecl = "";
              } else if ((parser2.sgmlDecl + c).toUpperCase() === CDATA) {
                emitNode(parser2, "onopencdata");
                parser2.state = S.CDATA;
                parser2.sgmlDecl = "";
                parser2.cdata = "";
              } else if ((parser2.sgmlDecl + c).toUpperCase() === DOCTYPE) {
                parser2.state = S.DOCTYPE;
                if (parser2.doctype || parser2.sawRoot) {
                  strictFail(
                    parser2,
                    "Inappropriately located doctype declaration"
                  );
                }
                parser2.doctype = "";
                parser2.sgmlDecl = "";
              } else if (c === ">") {
                emitNode(parser2, "onsgmldeclaration", parser2.sgmlDecl);
                parser2.sgmlDecl = "";
                parser2.state = S.TEXT;
              } else if (isQuote(c)) {
                parser2.state = S.SGML_DECL_QUOTED;
                parser2.sgmlDecl += c;
              } else {
                parser2.sgmlDecl += c;
              }
              continue;
            case S.SGML_DECL_QUOTED:
              if (c === parser2.q) {
                parser2.state = S.SGML_DECL;
                parser2.q = "";
              }
              parser2.sgmlDecl += c;
              continue;
            case S.DOCTYPE:
              if (c === ">") {
                parser2.state = S.TEXT;
                emitNode(parser2, "ondoctype", parser2.doctype);
                parser2.doctype = true;
              } else {
                parser2.doctype += c;
                if (c === "[") {
                  parser2.state = S.DOCTYPE_DTD;
                } else if (isQuote(c)) {
                  parser2.state = S.DOCTYPE_QUOTED;
                  parser2.q = c;
                }
              }
              continue;
            case S.DOCTYPE_QUOTED:
              parser2.doctype += c;
              if (c === parser2.q) {
                parser2.q = "";
                parser2.state = S.DOCTYPE;
              }
              continue;
            case S.DOCTYPE_DTD:
              if (c === "]") {
                parser2.doctype += c;
                parser2.state = S.DOCTYPE;
              } else if (c === "<") {
                parser2.state = S.OPEN_WAKA;
                parser2.startTagPosition = parser2.position;
              } else if (isQuote(c)) {
                parser2.doctype += c;
                parser2.state = S.DOCTYPE_DTD_QUOTED;
                parser2.q = c;
              } else {
                parser2.doctype += c;
              }
              continue;
            case S.DOCTYPE_DTD_QUOTED:
              parser2.doctype += c;
              if (c === parser2.q) {
                parser2.state = S.DOCTYPE_DTD;
                parser2.q = "";
              }
              continue;
            case S.COMMENT:
              if (c === "-") {
                parser2.state = S.COMMENT_ENDING;
              } else {
                parser2.comment += c;
              }
              continue;
            case S.COMMENT_ENDING:
              if (c === "-") {
                parser2.state = S.COMMENT_ENDED;
                parser2.comment = textopts(parser2.opt, parser2.comment);
                if (parser2.comment) {
                  emitNode(parser2, "oncomment", parser2.comment);
                }
                parser2.comment = "";
              } else {
                parser2.comment += "-" + c;
                parser2.state = S.COMMENT;
              }
              continue;
            case S.COMMENT_ENDED:
              if (c !== ">") {
                strictFail(parser2, "Malformed comment");
                parser2.comment += "--" + c;
                parser2.state = S.COMMENT;
              } else if (parser2.doctype && parser2.doctype !== true) {
                parser2.state = S.DOCTYPE_DTD;
              } else {
                parser2.state = S.TEXT;
              }
              continue;
            case S.CDATA:
              if (c === "]") {
                parser2.state = S.CDATA_ENDING;
              } else {
                parser2.cdata += c;
              }
              continue;
            case S.CDATA_ENDING:
              if (c === "]") {
                parser2.state = S.CDATA_ENDING_2;
              } else {
                parser2.cdata += "]" + c;
                parser2.state = S.CDATA;
              }
              continue;
            case S.CDATA_ENDING_2:
              if (c === ">") {
                if (parser2.cdata) {
                  emitNode(parser2, "oncdata", parser2.cdata);
                }
                emitNode(parser2, "onclosecdata");
                parser2.cdata = "";
                parser2.state = S.TEXT;
              } else if (c === "]") {
                parser2.cdata += "]";
              } else {
                parser2.cdata += "]]" + c;
                parser2.state = S.CDATA;
              }
              continue;
            case S.PROC_INST:
              if (c === "?") {
                parser2.state = S.PROC_INST_ENDING;
              } else if (isWhitespace(c)) {
                parser2.state = S.PROC_INST_BODY;
              } else {
                parser2.procInstName += c;
              }
              continue;
            case S.PROC_INST_BODY:
              if (!parser2.procInstBody && isWhitespace(c)) {
                continue;
              } else if (c === "?") {
                parser2.state = S.PROC_INST_ENDING;
              } else {
                parser2.procInstBody += c;
              }
              continue;
            case S.PROC_INST_ENDING:
              if (c === ">") {
                emitNode(parser2, "onprocessinginstruction", {
                  name: parser2.procInstName,
                  body: parser2.procInstBody
                });
                parser2.procInstName = parser2.procInstBody = "";
                parser2.state = S.TEXT;
              } else {
                parser2.procInstBody += "?" + c;
                parser2.state = S.PROC_INST_BODY;
              }
              continue;
            case S.OPEN_TAG:
              if (isMatch(nameBody, c)) {
                parser2.tagName += c;
              } else {
                newTag(parser2);
                if (c === ">") {
                  openTag(parser2);
                } else if (c === "/") {
                  parser2.state = S.OPEN_TAG_SLASH;
                } else {
                  if (!isWhitespace(c)) {
                    strictFail(parser2, "Invalid character in tag name");
                  }
                  parser2.state = S.ATTRIB;
                }
              }
              continue;
            case S.OPEN_TAG_SLASH:
              if (c === ">") {
                openTag(parser2, true);
                closeTag(parser2);
              } else {
                strictFail(parser2, "Forward-slash in opening tag not followed by >");
                parser2.state = S.ATTRIB;
              }
              continue;
            case S.ATTRIB:
              if (isWhitespace(c)) {
                continue;
              } else if (c === ">") {
                openTag(parser2);
              } else if (c === "/") {
                parser2.state = S.OPEN_TAG_SLASH;
              } else if (isMatch(nameStart, c)) {
                parser2.attribName = c;
                parser2.attribValue = "";
                parser2.state = S.ATTRIB_NAME;
              } else {
                strictFail(parser2, "Invalid attribute name");
              }
              continue;
            case S.ATTRIB_NAME:
              if (c === "=") {
                parser2.state = S.ATTRIB_VALUE;
              } else if (c === ">") {
                strictFail(parser2, "Attribute without value");
                parser2.attribValue = parser2.attribName;
                attrib(parser2);
                openTag(parser2);
              } else if (isWhitespace(c)) {
                parser2.state = S.ATTRIB_NAME_SAW_WHITE;
              } else if (isMatch(nameBody, c)) {
                parser2.attribName += c;
              } else {
                strictFail(parser2, "Invalid attribute name");
              }
              continue;
            case S.ATTRIB_NAME_SAW_WHITE:
              if (c === "=") {
                parser2.state = S.ATTRIB_VALUE;
              } else if (isWhitespace(c)) {
                continue;
              } else {
                strictFail(parser2, "Attribute without value");
                parser2.tag.attributes[parser2.attribName] = "";
                parser2.attribValue = "";
                emitNode(parser2, "onattribute", {
                  name: parser2.attribName,
                  value: ""
                });
                parser2.attribName = "";
                if (c === ">") {
                  openTag(parser2);
                } else if (isMatch(nameStart, c)) {
                  parser2.attribName = c;
                  parser2.state = S.ATTRIB_NAME;
                } else {
                  strictFail(parser2, "Invalid attribute name");
                  parser2.state = S.ATTRIB;
                }
              }
              continue;
            case S.ATTRIB_VALUE:
              if (isWhitespace(c)) {
                continue;
              } else if (isQuote(c)) {
                parser2.q = c;
                parser2.state = S.ATTRIB_VALUE_QUOTED;
              } else {
                if (!parser2.opt.unquotedAttributeValues) {
                  error(parser2, "Unquoted attribute value");
                }
                parser2.state = S.ATTRIB_VALUE_UNQUOTED;
                parser2.attribValue = c;
              }
              continue;
            case S.ATTRIB_VALUE_QUOTED:
              if (c !== parser2.q) {
                if (c === "&") {
                  parser2.state = S.ATTRIB_VALUE_ENTITY_Q;
                } else {
                  parser2.attribValue += c;
                }
                continue;
              }
              attrib(parser2);
              parser2.q = "";
              parser2.state = S.ATTRIB_VALUE_CLOSED;
              continue;
            case S.ATTRIB_VALUE_CLOSED:
              if (isWhitespace(c)) {
                parser2.state = S.ATTRIB;
              } else if (c === ">") {
                openTag(parser2);
              } else if (c === "/") {
                parser2.state = S.OPEN_TAG_SLASH;
              } else if (isMatch(nameStart, c)) {
                strictFail(parser2, "No whitespace between attributes");
                parser2.attribName = c;
                parser2.attribValue = "";
                parser2.state = S.ATTRIB_NAME;
              } else {
                strictFail(parser2, "Invalid attribute name");
              }
              continue;
            case S.ATTRIB_VALUE_UNQUOTED:
              if (!isAttribEnd(c)) {
                if (c === "&") {
                  parser2.state = S.ATTRIB_VALUE_ENTITY_U;
                } else {
                  parser2.attribValue += c;
                }
                continue;
              }
              attrib(parser2);
              if (c === ">") {
                openTag(parser2);
              } else {
                parser2.state = S.ATTRIB;
              }
              continue;
            case S.CLOSE_TAG:
              if (!parser2.tagName) {
                if (isWhitespace(c)) {
                  continue;
                } else if (notMatch(nameStart, c)) {
                  if (parser2.script) {
                    parser2.script += "</" + c;
                    parser2.state = S.SCRIPT;
                  } else {
                    strictFail(parser2, "Invalid tagname in closing tag.");
                  }
                } else {
                  parser2.tagName = c;
                }
              } else if (c === ">") {
                closeTag(parser2);
              } else if (isMatch(nameBody, c)) {
                parser2.tagName += c;
              } else if (parser2.script) {
                parser2.script += "</" + parser2.tagName;
                parser2.tagName = "";
                parser2.state = S.SCRIPT;
              } else {
                if (!isWhitespace(c)) {
                  strictFail(parser2, "Invalid tagname in closing tag");
                }
                parser2.state = S.CLOSE_TAG_SAW_WHITE;
              }
              continue;
            case S.CLOSE_TAG_SAW_WHITE:
              if (isWhitespace(c)) {
                continue;
              }
              if (c === ">") {
                closeTag(parser2);
              } else {
                strictFail(parser2, "Invalid characters in closing tag");
              }
              continue;
            case S.TEXT_ENTITY:
            case S.ATTRIB_VALUE_ENTITY_Q:
            case S.ATTRIB_VALUE_ENTITY_U:
              var returnState;
              var buffer;
              switch (parser2.state) {
                case S.TEXT_ENTITY:
                  returnState = S.TEXT;
                  buffer = "textNode";
                  break;
                case S.ATTRIB_VALUE_ENTITY_Q:
                  returnState = S.ATTRIB_VALUE_QUOTED;
                  buffer = "attribValue";
                  break;
                case S.ATTRIB_VALUE_ENTITY_U:
                  returnState = S.ATTRIB_VALUE_UNQUOTED;
                  buffer = "attribValue";
                  break;
              }
              if (c === ";") {
                var parsedEntity = parseEntity(parser2);
                if (parser2.opt.unparsedEntities && !Object.values(sax2.XML_ENTITIES).includes(parsedEntity)) {
                  parser2.entity = "";
                  parser2.state = returnState;
                  parser2.write(parsedEntity);
                } else {
                  parser2[buffer] += parsedEntity;
                  parser2.entity = "";
                  parser2.state = returnState;
                }
              } else if (isMatch(parser2.entity.length ? entityBody : entityStart, c)) {
                parser2.entity += c;
              } else {
                strictFail(parser2, "Invalid character in entity name");
                parser2[buffer] += "&" + parser2.entity + c;
                parser2.entity = "";
                parser2.state = returnState;
              }
              continue;
            default: {
              throw new Error(parser2, "Unknown state: " + parser2.state);
            }
          }
        }
        if (parser2.position >= parser2.bufferCheckPosition) {
          checkBufferLength(parser2);
        }
        return parser2;
      }
      /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
      if (!String.fromCodePoint) {
        (function() {
          var stringFromCharCode = String.fromCharCode;
          var floor = Math.floor;
          var fromCodePoint = function() {
            var MAX_SIZE = 16384;
            var codeUnits = [];
            var highSurrogate;
            var lowSurrogate;
            var index = -1;
            var length = arguments.length;
            if (!length) {
              return "";
            }
            var result = "";
            while (++index < length) {
              var codePoint = Number(arguments[index]);
              if (!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
              codePoint < 0 || // not a valid Unicode code point
              codePoint > 1114111 || // not a valid Unicode code point
              floor(codePoint) !== codePoint) {
                throw RangeError("Invalid code point: " + codePoint);
              }
              if (codePoint <= 65535) {
                codeUnits.push(codePoint);
              } else {
                codePoint -= 65536;
                highSurrogate = (codePoint >> 10) + 55296;
                lowSurrogate = codePoint % 1024 + 56320;
                codeUnits.push(highSurrogate, lowSurrogate);
              }
              if (index + 1 === length || codeUnits.length > MAX_SIZE) {
                result += stringFromCharCode.apply(null, codeUnits);
                codeUnits.length = 0;
              }
            }
            return result;
          };
          if (Object.defineProperty) {
            Object.defineProperty(String, "fromCodePoint", {
              value: fromCodePoint,
              configurable: true,
              writable: true
            });
          } else {
            String.fromCodePoint = fromCodePoint;
          }
        })();
      }
    })(exports);
  })(sax);
  return sax;
}
var bom = {};
var hasRequiredBom;
function requireBom() {
  if (hasRequiredBom) return bom;
  hasRequiredBom = 1;
  (function() {
    bom.stripBOM = function(str) {
      if (str[0] === "\uFEFF") {
        return str.substring(1);
      } else {
        return str;
      }
    };
  }).call(commonjsGlobal);
  return bom;
}
var processors = {};
var hasRequiredProcessors;
function requireProcessors() {
  if (hasRequiredProcessors) return processors;
  hasRequiredProcessors = 1;
  (function() {
    var prefixMatch;
    prefixMatch = new RegExp(/(?!xmlns)^.*:/);
    processors.normalize = function(str) {
      return str.toLowerCase();
    };
    processors.firstCharLowerCase = function(str) {
      return str.charAt(0).toLowerCase() + str.slice(1);
    };
    processors.stripPrefix = function(str) {
      return str.replace(prefixMatch, "");
    };
    processors.parseNumbers = function(str) {
      if (!isNaN(str)) {
        str = str % 1 === 0 ? parseInt(str, 10) : parseFloat(str);
      }
      return str;
    };
    processors.parseBooleans = function(str) {
      if (/^(?:true|false)$/i.test(str)) {
        str = str.toLowerCase() === "true";
      }
      return str;
    };
  }).call(commonjsGlobal);
  return processors;
}
var hasRequiredParser;
function requireParser() {
  if (hasRequiredParser) return parser;
  hasRequiredParser = 1;
  (function(exports) {
    (function() {
      var bom2, defaults2, defineProperty, events, isEmpty, processItem, processors2, sax2, setImmediate2, bind2 = function(fn, me) {
        return function() {
          return fn.apply(me, arguments);
        };
      }, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      sax2 = requireSax();
      events = require$$1$3;
      bom2 = requireBom();
      processors2 = requireProcessors();
      setImmediate2 = require$$4.setImmediate;
      defaults2 = requireDefaults().defaults;
      isEmpty = function(thing) {
        return typeof thing === "object" && thing != null && Object.keys(thing).length === 0;
      };
      processItem = function(processors3, item, key) {
        var i, len, process2;
        for (i = 0, len = processors3.length; i < len; i++) {
          process2 = processors3[i];
          item = process2(item, key);
        }
        return item;
      };
      defineProperty = function(obj, key, value) {
        var descriptor;
        descriptor = /* @__PURE__ */ Object.create(null);
        descriptor.value = value;
        descriptor.writable = true;
        descriptor.enumerable = true;
        descriptor.configurable = true;
        return Object.defineProperty(obj, key, descriptor);
      };
      exports.Parser = function(superClass) {
        extend(Parser, superClass);
        function Parser(opts) {
          this.parseStringPromise = bind2(this.parseStringPromise, this);
          this.parseString = bind2(this.parseString, this);
          this.reset = bind2(this.reset, this);
          this.assignOrPush = bind2(this.assignOrPush, this);
          this.processAsync = bind2(this.processAsync, this);
          var key, ref, value;
          if (!(this instanceof exports.Parser)) {
            return new exports.Parser(opts);
          }
          this.options = {};
          ref = defaults2["0.2"];
          for (key in ref) {
            if (!hasProp.call(ref, key)) continue;
            value = ref[key];
            this.options[key] = value;
          }
          for (key in opts) {
            if (!hasProp.call(opts, key)) continue;
            value = opts[key];
            this.options[key] = value;
          }
          if (this.options.xmlns) {
            this.options.xmlnskey = this.options.attrkey + "ns";
          }
          if (this.options.normalizeTags) {
            if (!this.options.tagNameProcessors) {
              this.options.tagNameProcessors = [];
            }
            this.options.tagNameProcessors.unshift(processors2.normalize);
          }
          this.reset();
        }
        Parser.prototype.processAsync = function() {
          var chunk, err;
          try {
            if (this.remaining.length <= this.options.chunkSize) {
              chunk = this.remaining;
              this.remaining = "";
              this.saxParser = this.saxParser.write(chunk);
              return this.saxParser.close();
            } else {
              chunk = this.remaining.substr(0, this.options.chunkSize);
              this.remaining = this.remaining.substr(this.options.chunkSize, this.remaining.length);
              this.saxParser = this.saxParser.write(chunk);
              return setImmediate2(this.processAsync);
            }
          } catch (error1) {
            err = error1;
            if (!this.saxParser.errThrown) {
              this.saxParser.errThrown = true;
              return this.emit(err);
            }
          }
        };
        Parser.prototype.assignOrPush = function(obj, key, newValue) {
          if (!(key in obj)) {
            if (!this.options.explicitArray) {
              return defineProperty(obj, key, newValue);
            } else {
              return defineProperty(obj, key, [newValue]);
            }
          } else {
            if (!(obj[key] instanceof Array)) {
              defineProperty(obj, key, [obj[key]]);
            }
            return obj[key].push(newValue);
          }
        };
        Parser.prototype.reset = function() {
          var attrkey, charkey, ontext, stack;
          this.removeAllListeners();
          this.saxParser = sax2.parser(this.options.strict, {
            trim: false,
            normalize: false,
            xmlns: this.options.xmlns
          });
          this.saxParser.errThrown = false;
          this.saxParser.onerror = /* @__PURE__ */ function(_this) {
            return function(error) {
              _this.saxParser.resume();
              if (!_this.saxParser.errThrown) {
                _this.saxParser.errThrown = true;
                return _this.emit("error", error);
              }
            };
          }(this);
          this.saxParser.onend = /* @__PURE__ */ function(_this) {
            return function() {
              if (!_this.saxParser.ended) {
                _this.saxParser.ended = true;
                return _this.emit("end", _this.resultObject);
              }
            };
          }(this);
          this.saxParser.ended = false;
          this.EXPLICIT_CHARKEY = this.options.explicitCharkey;
          this.resultObject = null;
          stack = [];
          attrkey = this.options.attrkey;
          charkey = this.options.charkey;
          this.saxParser.onopentag = /* @__PURE__ */ function(_this) {
            return function(node) {
              var key, newValue, obj, processedKey, ref;
              obj = {};
              obj[charkey] = "";
              if (!_this.options.ignoreAttrs) {
                ref = node.attributes;
                for (key in ref) {
                  if (!hasProp.call(ref, key)) continue;
                  if (!(attrkey in obj) && !_this.options.mergeAttrs) {
                    obj[attrkey] = {};
                  }
                  newValue = _this.options.attrValueProcessors ? processItem(_this.options.attrValueProcessors, node.attributes[key], key) : node.attributes[key];
                  processedKey = _this.options.attrNameProcessors ? processItem(_this.options.attrNameProcessors, key) : key;
                  if (_this.options.mergeAttrs) {
                    _this.assignOrPush(obj, processedKey, newValue);
                  } else {
                    defineProperty(obj[attrkey], processedKey, newValue);
                  }
                }
              }
              obj["#name"] = _this.options.tagNameProcessors ? processItem(_this.options.tagNameProcessors, node.name) : node.name;
              if (_this.options.xmlns) {
                obj[_this.options.xmlnskey] = {
                  uri: node.uri,
                  local: node.local
                };
              }
              return stack.push(obj);
            };
          }(this);
          this.saxParser.onclosetag = /* @__PURE__ */ function(_this) {
            return function() {
              var cdata, emptyStr, key, node, nodeName, obj, objClone, old, s, xpath;
              obj = stack.pop();
              nodeName = obj["#name"];
              if (!_this.options.explicitChildren || !_this.options.preserveChildrenOrder) {
                delete obj["#name"];
              }
              if (obj.cdata === true) {
                cdata = obj.cdata;
                delete obj.cdata;
              }
              s = stack[stack.length - 1];
              if (obj[charkey].match(/^\s*$/) && !cdata) {
                emptyStr = obj[charkey];
                delete obj[charkey];
              } else {
                if (_this.options.trim) {
                  obj[charkey] = obj[charkey].trim();
                }
                if (_this.options.normalize) {
                  obj[charkey] = obj[charkey].replace(/\s{2,}/g, " ").trim();
                }
                obj[charkey] = _this.options.valueProcessors ? processItem(_this.options.valueProcessors, obj[charkey], nodeName) : obj[charkey];
                if (Object.keys(obj).length === 1 && charkey in obj && !_this.EXPLICIT_CHARKEY) {
                  obj = obj[charkey];
                }
              }
              if (isEmpty(obj)) {
                if (typeof _this.options.emptyTag === "function") {
                  obj = _this.options.emptyTag();
                } else {
                  obj = _this.options.emptyTag !== "" ? _this.options.emptyTag : emptyStr;
                }
              }
              if (_this.options.validator != null) {
                xpath = "/" + function() {
                  var i, len, results;
                  results = [];
                  for (i = 0, len = stack.length; i < len; i++) {
                    node = stack[i];
                    results.push(node["#name"]);
                  }
                  return results;
                }().concat(nodeName).join("/");
                (function() {
                  var err;
                  try {
                    return obj = _this.options.validator(xpath, s && s[nodeName], obj);
                  } catch (error1) {
                    err = error1;
                    return _this.emit("error", err);
                  }
                })();
              }
              if (_this.options.explicitChildren && !_this.options.mergeAttrs && typeof obj === "object") {
                if (!_this.options.preserveChildrenOrder) {
                  node = {};
                  if (_this.options.attrkey in obj) {
                    node[_this.options.attrkey] = obj[_this.options.attrkey];
                    delete obj[_this.options.attrkey];
                  }
                  if (!_this.options.charsAsChildren && _this.options.charkey in obj) {
                    node[_this.options.charkey] = obj[_this.options.charkey];
                    delete obj[_this.options.charkey];
                  }
                  if (Object.getOwnPropertyNames(obj).length > 0) {
                    node[_this.options.childkey] = obj;
                  }
                  obj = node;
                } else if (s) {
                  s[_this.options.childkey] = s[_this.options.childkey] || [];
                  objClone = {};
                  for (key in obj) {
                    if (!hasProp.call(obj, key)) continue;
                    defineProperty(objClone, key, obj[key]);
                  }
                  s[_this.options.childkey].push(objClone);
                  delete obj["#name"];
                  if (Object.keys(obj).length === 1 && charkey in obj && !_this.EXPLICIT_CHARKEY) {
                    obj = obj[charkey];
                  }
                }
              }
              if (stack.length > 0) {
                return _this.assignOrPush(s, nodeName, obj);
              } else {
                if (_this.options.explicitRoot) {
                  old = obj;
                  obj = {};
                  defineProperty(obj, nodeName, old);
                }
                _this.resultObject = obj;
                _this.saxParser.ended = true;
                return _this.emit("end", _this.resultObject);
              }
            };
          }(this);
          ontext = /* @__PURE__ */ function(_this) {
            return function(text) {
              var charChild, s;
              s = stack[stack.length - 1];
              if (s) {
                s[charkey] += text;
                if (_this.options.explicitChildren && _this.options.preserveChildrenOrder && _this.options.charsAsChildren && (_this.options.includeWhiteChars || text.replace(/\\n/g, "").trim() !== "")) {
                  s[_this.options.childkey] = s[_this.options.childkey] || [];
                  charChild = {
                    "#name": "__text__"
                  };
                  charChild[charkey] = text;
                  if (_this.options.normalize) {
                    charChild[charkey] = charChild[charkey].replace(/\s{2,}/g, " ").trim();
                  }
                  s[_this.options.childkey].push(charChild);
                }
                return s;
              }
            };
          }(this);
          this.saxParser.ontext = ontext;
          return this.saxParser.oncdata = /* @__PURE__ */ function(_this) {
            return function(text) {
              var s;
              s = ontext(text);
              if (s) {
                return s.cdata = true;
              }
            };
          }();
        };
        Parser.prototype.parseString = function(str, cb) {
          var err;
          if (cb != null && typeof cb === "function") {
            this.on("end", function(result) {
              this.reset();
              return cb(null, result);
            });
            this.on("error", function(err2) {
              this.reset();
              return cb(err2);
            });
          }
          try {
            str = str.toString();
            if (str.trim() === "") {
              this.emit("end", null);
              return true;
            }
            str = bom2.stripBOM(str);
            if (this.options.async) {
              this.remaining = str;
              setImmediate2(this.processAsync);
              return this.saxParser;
            }
            return this.saxParser.write(str).close();
          } catch (error1) {
            err = error1;
            if (!(this.saxParser.errThrown || this.saxParser.ended)) {
              this.emit("error", err);
              return this.saxParser.errThrown = true;
            } else if (this.saxParser.ended) {
              throw err;
            }
          }
        };
        Parser.prototype.parseStringPromise = function(str) {
          return new Promise(/* @__PURE__ */ function(_this) {
            return function(resolve, reject) {
              return _this.parseString(str, function(err, value) {
                if (err) {
                  return reject(err);
                } else {
                  return resolve(value);
                }
              });
            };
          }(this));
        };
        return Parser;
      }(events);
      exports.parseString = function(str, a, b) {
        var cb, options, parser2;
        if (b != null) {
          if (typeof b === "function") {
            cb = b;
          }
          if (typeof a === "object") {
            options = a;
          }
        } else {
          if (typeof a === "function") {
            cb = a;
          }
          options = {};
        }
        parser2 = new exports.Parser(options);
        return parser2.parseString(str, cb);
      };
      exports.parseStringPromise = function(str, a) {
        var options, parser2;
        if (typeof a === "object") {
          options = a;
        }
        parser2 = new exports.Parser(options);
        return parser2.parseStringPromise(str);
      };
    }).call(commonjsGlobal);
  })(parser);
  return parser;
}
var hasRequiredXml2js;
function requireXml2js() {
  if (hasRequiredXml2js) return xml2js;
  hasRequiredXml2js = 1;
  (function() {
    var builder2, defaults2, parser2, processors2, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    defaults2 = requireDefaults();
    builder2 = requireBuilder();
    parser2 = requireParser();
    processors2 = requireProcessors();
    xml2js.defaults = defaults2.defaults;
    xml2js.processors = processors2;
    xml2js.ValidationError = function(superClass) {
      extend(ValidationError, superClass);
      function ValidationError(message) {
        this.message = message;
      }
      return ValidationError;
    }(Error);
    xml2js.Builder = builder2.Builder;
    xml2js.Parser = parser2.Parser;
    xml2js.parseString = parser2.parseString;
    xml2js.parseStringPromise = parser2.parseStringPromise;
  }).call(commonjsGlobal);
  return xml2js;
}
var dist$1 = { exports: {} };
var deepEql = { exports: {} };
var typeDetect = { exports: {} };
var hasRequiredTypeDetect;
function requireTypeDetect() {
  if (hasRequiredTypeDetect) return typeDetect.exports;
  hasRequiredTypeDetect = 1;
  (function(module, exports) {
    (function(global2, factory) {
      module.exports = factory();
    })(commonjsGlobal, function() {
      var promiseExists = typeof Promise === "function";
      var globalObject = function(Obj) {
        if (typeof globalThis === "object") {
          return globalThis;
        }
        Object.defineProperty(Obj, "typeDetectGlobalObject", {
          get: function get() {
            return this;
          },
          configurable: true
        });
        var global2 = typeDetectGlobalObject;
        delete Obj.typeDetectGlobalObject;
        return global2;
      }(Object.prototype);
      var symbolExists = typeof Symbol !== "undefined";
      var mapExists = typeof Map !== "undefined";
      var setExists = typeof Set !== "undefined";
      var weakMapExists = typeof WeakMap !== "undefined";
      var weakSetExists = typeof WeakSet !== "undefined";
      var dataViewExists = typeof DataView !== "undefined";
      var symbolIteratorExists = symbolExists && typeof Symbol.iterator !== "undefined";
      var symbolToStringTagExists = symbolExists && typeof Symbol.toStringTag !== "undefined";
      var setEntriesExists = setExists && typeof Set.prototype.entries === "function";
      var mapEntriesExists = mapExists && typeof Map.prototype.entries === "function";
      var setIteratorPrototype = setEntriesExists && Object.getPrototypeOf((/* @__PURE__ */ new Set()).entries());
      var mapIteratorPrototype = mapEntriesExists && Object.getPrototypeOf((/* @__PURE__ */ new Map()).entries());
      var arrayIteratorExists = symbolIteratorExists && typeof Array.prototype[Symbol.iterator] === "function";
      var arrayIteratorPrototype = arrayIteratorExists && Object.getPrototypeOf([][Symbol.iterator]());
      var stringIteratorExists = symbolIteratorExists && typeof String.prototype[Symbol.iterator] === "function";
      var stringIteratorPrototype = stringIteratorExists && Object.getPrototypeOf(""[Symbol.iterator]());
      var toStringLeftSliceLength = 8;
      var toStringRightSliceLength = -1;
      function typeDetect2(obj) {
        var typeofObj = typeof obj;
        if (typeofObj !== "object") {
          return typeofObj;
        }
        if (obj === null) {
          return "null";
        }
        if (obj === globalObject) {
          return "global";
        }
        if (Array.isArray(obj) && (symbolToStringTagExists === false || !(Symbol.toStringTag in obj))) {
          return "Array";
        }
        if (typeof window === "object" && window !== null) {
          if (typeof window.location === "object" && obj === window.location) {
            return "Location";
          }
          if (typeof window.document === "object" && obj === window.document) {
            return "Document";
          }
          if (typeof window.navigator === "object") {
            if (typeof window.navigator.mimeTypes === "object" && obj === window.navigator.mimeTypes) {
              return "MimeTypeArray";
            }
            if (typeof window.navigator.plugins === "object" && obj === window.navigator.plugins) {
              return "PluginArray";
            }
          }
          if ((typeof window.HTMLElement === "function" || typeof window.HTMLElement === "object") && obj instanceof window.HTMLElement) {
            if (obj.tagName === "BLOCKQUOTE") {
              return "HTMLQuoteElement";
            }
            if (obj.tagName === "TD") {
              return "HTMLTableDataCellElement";
            }
            if (obj.tagName === "TH") {
              return "HTMLTableHeaderCellElement";
            }
          }
        }
        var stringTag = symbolToStringTagExists && obj[Symbol.toStringTag];
        if (typeof stringTag === "string") {
          return stringTag;
        }
        var objPrototype = Object.getPrototypeOf(obj);
        if (objPrototype === RegExp.prototype) {
          return "RegExp";
        }
        if (objPrototype === Date.prototype) {
          return "Date";
        }
        if (promiseExists && objPrototype === Promise.prototype) {
          return "Promise";
        }
        if (setExists && objPrototype === Set.prototype) {
          return "Set";
        }
        if (mapExists && objPrototype === Map.prototype) {
          return "Map";
        }
        if (weakSetExists && objPrototype === WeakSet.prototype) {
          return "WeakSet";
        }
        if (weakMapExists && objPrototype === WeakMap.prototype) {
          return "WeakMap";
        }
        if (dataViewExists && objPrototype === DataView.prototype) {
          return "DataView";
        }
        if (mapExists && objPrototype === mapIteratorPrototype) {
          return "Map Iterator";
        }
        if (setExists && objPrototype === setIteratorPrototype) {
          return "Set Iterator";
        }
        if (arrayIteratorExists && objPrototype === arrayIteratorPrototype) {
          return "Array Iterator";
        }
        if (stringIteratorExists && objPrototype === stringIteratorPrototype) {
          return "String Iterator";
        }
        if (objPrototype === null) {
          return "Object";
        }
        return Object.prototype.toString.call(obj).slice(toStringLeftSliceLength, toStringRightSliceLength);
      }
      return typeDetect2;
    });
  })(typeDetect);
  return typeDetect.exports;
}
var hasRequiredDeepEql;
function requireDeepEql() {
  if (hasRequiredDeepEql) return deepEql.exports;
  hasRequiredDeepEql = 1;
  /*!
   * deep-eql
   * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   */
  var type = requireTypeDetect();
  function FakeMap() {
    this._key = "chai/deep-eql__" + Math.random() + Date.now();
  }
  FakeMap.prototype = {
    get: function getMap(key) {
      return key[this._key];
    },
    set: function setMap(key, value) {
      if (Object.isExtensible(key)) {
        Object.defineProperty(key, this._key, {
          value,
          configurable: true
        });
      }
    }
  };
  var MemoizeMap = typeof WeakMap === "function" ? WeakMap : FakeMap;
  /*!
   * Check to see if the MemoizeMap has recorded a result of the two operands
   *
   * @param {Mixed} leftHandOperand
   * @param {Mixed} rightHandOperand
   * @param {MemoizeMap} memoizeMap
   * @returns {Boolean|null} result
  */
  function memoizeCompare(leftHandOperand, rightHandOperand, memoizeMap) {
    if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
      return null;
    }
    var leftHandMap = memoizeMap.get(leftHandOperand);
    if (leftHandMap) {
      var result = leftHandMap.get(rightHandOperand);
      if (typeof result === "boolean") {
        return result;
      }
    }
    return null;
  }
  /*!
   * Set the result of the equality into the MemoizeMap
   *
   * @param {Mixed} leftHandOperand
   * @param {Mixed} rightHandOperand
   * @param {MemoizeMap} memoizeMap
   * @param {Boolean} result
  */
  function memoizeSet(leftHandOperand, rightHandOperand, memoizeMap, result) {
    if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
      return;
    }
    var leftHandMap = memoizeMap.get(leftHandOperand);
    if (leftHandMap) {
      leftHandMap.set(rightHandOperand, result);
    } else {
      leftHandMap = new MemoizeMap();
      leftHandMap.set(rightHandOperand, result);
      memoizeMap.set(leftHandOperand, leftHandMap);
    }
  }
  /*!
   * Primary Export
   */
  deepEql.exports = deepEqual;
  deepEql.exports.MemoizeMap = MemoizeMap;
  function deepEqual(leftHandOperand, rightHandOperand, options) {
    if (options && options.comparator) {
      return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
    }
    var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
    if (simpleResult !== null) {
      return simpleResult;
    }
    return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
  }
  function simpleEqual(leftHandOperand, rightHandOperand) {
    if (leftHandOperand === rightHandOperand) {
      return leftHandOperand !== 0 || 1 / leftHandOperand === 1 / rightHandOperand;
    }
    if (leftHandOperand !== leftHandOperand && // eslint-disable-line no-self-compare
    rightHandOperand !== rightHandOperand) {
      return true;
    }
    if (isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
      return false;
    }
    return null;
  }
  /*!
   * The main logic of the `deepEqual` function.
   *
   * @param {Mixed} leftHandOperand
   * @param {Mixed} rightHandOperand
   * @param {Object} [options] (optional) Additional options
   * @param {Array} [options.comparator] (optional) Override default algorithm, determining custom equality.
   * @param {Array} [options.memoize] (optional) Provide a custom memoization object which will cache the results of
      complex objects for a speed boost. By passing `false` you can disable memoization, but this will cause circular
      references to blow the stack.
   * @return {Boolean} equal match
  */
  function extensiveDeepEqual(leftHandOperand, rightHandOperand, options) {
    options = options || {};
    options.memoize = options.memoize === false ? false : options.memoize || new MemoizeMap();
    var comparator = options && options.comparator;
    var memoizeResultLeft = memoizeCompare(leftHandOperand, rightHandOperand, options.memoize);
    if (memoizeResultLeft !== null) {
      return memoizeResultLeft;
    }
    var memoizeResultRight = memoizeCompare(rightHandOperand, leftHandOperand, options.memoize);
    if (memoizeResultRight !== null) {
      return memoizeResultRight;
    }
    if (comparator) {
      var comparatorResult = comparator(leftHandOperand, rightHandOperand);
      if (comparatorResult === false || comparatorResult === true) {
        memoizeSet(leftHandOperand, rightHandOperand, options.memoize, comparatorResult);
        return comparatorResult;
      }
      var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
      if (simpleResult !== null) {
        return simpleResult;
      }
    }
    var leftHandType = type(leftHandOperand);
    if (leftHandType !== type(rightHandOperand)) {
      memoizeSet(leftHandOperand, rightHandOperand, options.memoize, false);
      return false;
    }
    memoizeSet(leftHandOperand, rightHandOperand, options.memoize, true);
    var result = extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options);
    memoizeSet(leftHandOperand, rightHandOperand, options.memoize, result);
    return result;
  }
  function extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options) {
    switch (leftHandType) {
      case "String":
      case "Number":
      case "Boolean":
      case "Date":
        return deepEqual(leftHandOperand.valueOf(), rightHandOperand.valueOf());
      case "Promise":
      case "Symbol":
      case "function":
      case "WeakMap":
      case "WeakSet":
        return leftHandOperand === rightHandOperand;
      case "Error":
        return keysEqual(leftHandOperand, rightHandOperand, ["name", "message", "code"], options);
      case "Arguments":
      case "Int8Array":
      case "Uint8Array":
      case "Uint8ClampedArray":
      case "Int16Array":
      case "Uint16Array":
      case "Int32Array":
      case "Uint32Array":
      case "Float32Array":
      case "Float64Array":
      case "Array":
        return iterableEqual(leftHandOperand, rightHandOperand, options);
      case "RegExp":
        return regexpEqual(leftHandOperand, rightHandOperand);
      case "Generator":
        return generatorEqual(leftHandOperand, rightHandOperand, options);
      case "DataView":
        return iterableEqual(new Uint8Array(leftHandOperand.buffer), new Uint8Array(rightHandOperand.buffer), options);
      case "ArrayBuffer":
        return iterableEqual(new Uint8Array(leftHandOperand), new Uint8Array(rightHandOperand), options);
      case "Set":
        return entriesEqual(leftHandOperand, rightHandOperand, options);
      case "Map":
        return entriesEqual(leftHandOperand, rightHandOperand, options);
      default:
        return objectEqual(leftHandOperand, rightHandOperand, options);
    }
  }
  /*!
   * Compare two Regular Expressions for equality.
   *
   * @param {RegExp} leftHandOperand
   * @param {RegExp} rightHandOperand
   * @return {Boolean} result
   */
  function regexpEqual(leftHandOperand, rightHandOperand) {
    return leftHandOperand.toString() === rightHandOperand.toString();
  }
  /*!
   * Compare two Sets/Maps for equality. Faster than other equality functions.
   *
   * @param {Set} leftHandOperand
   * @param {Set} rightHandOperand
   * @param {Object} [options] (Optional)
   * @return {Boolean} result
   */
  function entriesEqual(leftHandOperand, rightHandOperand, options) {
    if (leftHandOperand.size !== rightHandOperand.size) {
      return false;
    }
    if (leftHandOperand.size === 0) {
      return true;
    }
    var leftHandItems = [];
    var rightHandItems = [];
    leftHandOperand.forEach(function gatherEntries(key, value) {
      leftHandItems.push([key, value]);
    });
    rightHandOperand.forEach(function gatherEntries(key, value) {
      rightHandItems.push([key, value]);
    });
    return iterableEqual(leftHandItems.sort(), rightHandItems.sort(), options);
  }
  /*!
   * Simple equality for flat iterable objects such as Arrays, TypedArrays or Node.js buffers.
   *
   * @param {Iterable} leftHandOperand
   * @param {Iterable} rightHandOperand
   * @param {Object} [options] (Optional)
   * @return {Boolean} result
   */
  function iterableEqual(leftHandOperand, rightHandOperand, options) {
    var length = leftHandOperand.length;
    if (length !== rightHandOperand.length) {
      return false;
    }
    if (length === 0) {
      return true;
    }
    var index = -1;
    while (++index < length) {
      if (deepEqual(leftHandOperand[index], rightHandOperand[index], options) === false) {
        return false;
      }
    }
    return true;
  }
  /*!
   * Simple equality for generator objects such as those returned by generator functions.
   *
   * @param {Iterable} leftHandOperand
   * @param {Iterable} rightHandOperand
   * @param {Object} [options] (Optional)
   * @return {Boolean} result
   */
  function generatorEqual(leftHandOperand, rightHandOperand, options) {
    return iterableEqual(getGeneratorEntries(leftHandOperand), getGeneratorEntries(rightHandOperand), options);
  }
  /*!
   * Determine if the given object has an @@iterator function.
   *
   * @param {Object} target
   * @return {Boolean} `true` if the object has an @@iterator function.
   */
  function hasIteratorFunction(target) {
    return typeof Symbol !== "undefined" && typeof target === "object" && typeof Symbol.iterator !== "undefined" && typeof target[Symbol.iterator] === "function";
  }
  /*!
   * Gets all iterator entries from the given Object. If the Object has no @@iterator function, returns an empty array.
   * This will consume the iterator - which could have side effects depending on the @@iterator implementation.
   *
   * @param {Object} target
   * @returns {Array} an array of entries from the @@iterator function
   */
  function getIteratorEntries(target) {
    if (hasIteratorFunction(target)) {
      try {
        return getGeneratorEntries(target[Symbol.iterator]());
      } catch (iteratorError) {
        return [];
      }
    }
    return [];
  }
  /*!
   * Gets all entries from a Generator. This will consume the generator - which could have side effects.
   *
   * @param {Generator} target
   * @returns {Array} an array of entries from the Generator.
   */
  function getGeneratorEntries(generator) {
    var generatorResult = generator.next();
    var accumulator = [generatorResult.value];
    while (generatorResult.done === false) {
      generatorResult = generator.next();
      accumulator.push(generatorResult.value);
    }
    return accumulator;
  }
  /*!
   * Gets all own and inherited enumerable keys from a target.
   *
   * @param {Object} target
   * @returns {Array} an array of own and inherited enumerable keys from the target.
   */
  function getEnumerableKeys(target) {
    var keys = [];
    for (var key in target) {
      keys.push(key);
    }
    return keys;
  }
  /*!
   * Determines if two objects have matching values, given a set of keys. Defers to deepEqual for the equality check of
   * each key. If any value of the given key is not equal, the function will return false (early).
   *
   * @param {Mixed} leftHandOperand
   * @param {Mixed} rightHandOperand
   * @param {Array} keys An array of keys to compare the values of leftHandOperand and rightHandOperand against
   * @param {Object} [options] (Optional)
   * @return {Boolean} result
   */
  function keysEqual(leftHandOperand, rightHandOperand, keys, options) {
    var length = keys.length;
    if (length === 0) {
      return true;
    }
    for (var i = 0; i < length; i += 1) {
      if (deepEqual(leftHandOperand[keys[i]], rightHandOperand[keys[i]], options) === false) {
        return false;
      }
    }
    return true;
  }
  /*!
   * Recursively check the equality of two Objects. Once basic sameness has been established it will defer to `deepEqual`
   * for each enumerable key in the object.
   *
   * @param {Mixed} leftHandOperand
   * @param {Mixed} rightHandOperand
   * @param {Object} [options] (Optional)
   * @return {Boolean} result
   */
  function objectEqual(leftHandOperand, rightHandOperand, options) {
    var leftHandKeys = getEnumerableKeys(leftHandOperand);
    var rightHandKeys = getEnumerableKeys(rightHandOperand);
    if (leftHandKeys.length && leftHandKeys.length === rightHandKeys.length) {
      leftHandKeys.sort();
      rightHandKeys.sort();
      if (iterableEqual(leftHandKeys, rightHandKeys) === false) {
        return false;
      }
      return keysEqual(leftHandOperand, rightHandOperand, leftHandKeys, options);
    }
    var leftHandEntries = getIteratorEntries(leftHandOperand);
    var rightHandEntries = getIteratorEntries(rightHandOperand);
    if (leftHandEntries.length && leftHandEntries.length === rightHandEntries.length) {
      leftHandEntries.sort();
      rightHandEntries.sort();
      return iterableEqual(leftHandEntries, rightHandEntries, options);
    }
    if (leftHandKeys.length === 0 && leftHandEntries.length === 0 && rightHandKeys.length === 0 && rightHandEntries.length === 0) {
      return true;
    }
    return false;
  }
  /*!
   * Returns true if the argument is a primitive.
   *
   * This intentionally returns true for all objects that can be compared by reference,
   * including functions and symbols.
   *
   * @param {Mixed} value
   * @return {Boolean} result
   */
  function isPrimitive(value) {
    return value === null || typeof value !== "object";
  }
  return deepEql.exports;
}
var lodash = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
lodash.exports;
var hasRequiredLodash;
function requireLodash() {
  if (hasRequiredLodash) return lodash.exports;
  hasRequiredLodash = 1;
  (function(module, exports) {
    (function() {
      var undefined$1;
      var VERSION = "4.17.21";
      var LARGE_ARRAY_SIZE = 200;
      var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT = "Expected a function", INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`";
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      var MAX_MEMOIZE_SIZE = 500;
      var PLACEHOLDER = "__lodash_placeholder__";
      var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
      var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
      var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
      var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
      var HOT_COUNT = 800, HOT_SPAN = 16;
      var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
      var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 17976931348623157e292, NAN = 0 / 0;
      var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
      var wrapFlags = [
        ["ary", WRAP_ARY_FLAG],
        ["bind", WRAP_BIND_FLAG],
        ["bindKey", WRAP_BIND_KEY_FLAG],
        ["curry", WRAP_CURRY_FLAG],
        ["curryRight", WRAP_CURRY_RIGHT_FLAG],
        ["flip", WRAP_FLIP_FLAG],
        ["partial", WRAP_PARTIAL_FLAG],
        ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
        ["rearg", WRAP_REARG_FLAG]
      ];
      var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", domExcTag = "[object DOMException]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]", weakSetTag = "[object WeakSet]";
      var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
      var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
      var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
      var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
      var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
      var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
      var reTrimStart = /^\s+/;
      var reWhitespace = /\s/;
      var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
      var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
      var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
      var reEscapeChar = /\\(\\)?/g;
      var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
      var reFlags = /\w*$/;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsHostCtor = /^\[object .+?Constructor\]$/;
      var reIsOctal = /^0o[0-7]+$/i;
      var reIsUint = /^(?:0|[1-9]\d*)$/;
      var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
      var reNoMatch = /($^)/;
      var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
      var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
      var rsApos = "['’]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
      var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
      var reApos = RegExp(rsApos, "g");
      var reComboMark = RegExp(rsCombo, "g");
      var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
      var reUnicodeWord = RegExp([
        rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
        rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
        rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
        rsUpper + "+" + rsOptContrUpper,
        rsOrdUpper,
        rsOrdLower,
        rsDigits,
        rsEmoji
      ].join("|"), "g");
      var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
      var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
      var contextProps = [
        "Array",
        "Buffer",
        "DataView",
        "Date",
        "Error",
        "Float32Array",
        "Float64Array",
        "Function",
        "Int8Array",
        "Int16Array",
        "Int32Array",
        "Map",
        "Math",
        "Object",
        "Promise",
        "RegExp",
        "Set",
        "String",
        "Symbol",
        "TypeError",
        "Uint8Array",
        "Uint8ClampedArray",
        "Uint16Array",
        "Uint32Array",
        "WeakMap",
        "_",
        "clearTimeout",
        "isFinite",
        "parseInt",
        "setTimeout"
      ];
      var templateCounter = -1;
      var typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
      var cloneableTags = {};
      cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
      cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
      var deburredLetters = {
        // Latin-1 Supplement block.
        "À": "A",
        "Á": "A",
        "Â": "A",
        "Ã": "A",
        "Ä": "A",
        "Å": "A",
        "à": "a",
        "á": "a",
        "â": "a",
        "ã": "a",
        "ä": "a",
        "å": "a",
        "Ç": "C",
        "ç": "c",
        "Ð": "D",
        "ð": "d",
        "È": "E",
        "É": "E",
        "Ê": "E",
        "Ë": "E",
        "è": "e",
        "é": "e",
        "ê": "e",
        "ë": "e",
        "Ì": "I",
        "Í": "I",
        "Î": "I",
        "Ï": "I",
        "ì": "i",
        "í": "i",
        "î": "i",
        "ï": "i",
        "Ñ": "N",
        "ñ": "n",
        "Ò": "O",
        "Ó": "O",
        "Ô": "O",
        "Õ": "O",
        "Ö": "O",
        "Ø": "O",
        "ò": "o",
        "ó": "o",
        "ô": "o",
        "õ": "o",
        "ö": "o",
        "ø": "o",
        "Ù": "U",
        "Ú": "U",
        "Û": "U",
        "Ü": "U",
        "ù": "u",
        "ú": "u",
        "û": "u",
        "ü": "u",
        "Ý": "Y",
        "ý": "y",
        "ÿ": "y",
        "Æ": "Ae",
        "æ": "ae",
        "Þ": "Th",
        "þ": "th",
        "ß": "ss",
        // Latin Extended-A block.
        "Ā": "A",
        "Ă": "A",
        "Ą": "A",
        "ā": "a",
        "ă": "a",
        "ą": "a",
        "Ć": "C",
        "Ĉ": "C",
        "Ċ": "C",
        "Č": "C",
        "ć": "c",
        "ĉ": "c",
        "ċ": "c",
        "č": "c",
        "Ď": "D",
        "Đ": "D",
        "ď": "d",
        "đ": "d",
        "Ē": "E",
        "Ĕ": "E",
        "Ė": "E",
        "Ę": "E",
        "Ě": "E",
        "ē": "e",
        "ĕ": "e",
        "ė": "e",
        "ę": "e",
        "ě": "e",
        "Ĝ": "G",
        "Ğ": "G",
        "Ġ": "G",
        "Ģ": "G",
        "ĝ": "g",
        "ğ": "g",
        "ġ": "g",
        "ģ": "g",
        "Ĥ": "H",
        "Ħ": "H",
        "ĥ": "h",
        "ħ": "h",
        "Ĩ": "I",
        "Ī": "I",
        "Ĭ": "I",
        "Į": "I",
        "İ": "I",
        "ĩ": "i",
        "ī": "i",
        "ĭ": "i",
        "į": "i",
        "ı": "i",
        "Ĵ": "J",
        "ĵ": "j",
        "Ķ": "K",
        "ķ": "k",
        "ĸ": "k",
        "Ĺ": "L",
        "Ļ": "L",
        "Ľ": "L",
        "Ŀ": "L",
        "Ł": "L",
        "ĺ": "l",
        "ļ": "l",
        "ľ": "l",
        "ŀ": "l",
        "ł": "l",
        "Ń": "N",
        "Ņ": "N",
        "Ň": "N",
        "Ŋ": "N",
        "ń": "n",
        "ņ": "n",
        "ň": "n",
        "ŋ": "n",
        "Ō": "O",
        "Ŏ": "O",
        "Ő": "O",
        "ō": "o",
        "ŏ": "o",
        "ő": "o",
        "Ŕ": "R",
        "Ŗ": "R",
        "Ř": "R",
        "ŕ": "r",
        "ŗ": "r",
        "ř": "r",
        "Ś": "S",
        "Ŝ": "S",
        "Ş": "S",
        "Š": "S",
        "ś": "s",
        "ŝ": "s",
        "ş": "s",
        "š": "s",
        "Ţ": "T",
        "Ť": "T",
        "Ŧ": "T",
        "ţ": "t",
        "ť": "t",
        "ŧ": "t",
        "Ũ": "U",
        "Ū": "U",
        "Ŭ": "U",
        "Ů": "U",
        "Ű": "U",
        "Ų": "U",
        "ũ": "u",
        "ū": "u",
        "ŭ": "u",
        "ů": "u",
        "ű": "u",
        "ų": "u",
        "Ŵ": "W",
        "ŵ": "w",
        "Ŷ": "Y",
        "ŷ": "y",
        "Ÿ": "Y",
        "Ź": "Z",
        "Ż": "Z",
        "Ž": "Z",
        "ź": "z",
        "ż": "z",
        "ž": "z",
        "Ĳ": "IJ",
        "ĳ": "ij",
        "Œ": "Oe",
        "œ": "oe",
        "ŉ": "'n",
        "ſ": "s"
      };
      var htmlEscapes = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };
      var htmlUnescapes = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'"
      };
      var stringEscapes = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
      };
      var freeParseFloat = parseFloat, freeParseInt = parseInt;
      var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      var freeExports = exports && !exports.nodeType && exports;
      var freeModule = freeExports && true && module && !module.nodeType && module;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var freeProcess = moduleExports && freeGlobal.process;
      var nodeUtil = function() {
        try {
          var types2 = freeModule && freeModule.require && freeModule.require("util").types;
          if (types2) {
            return types2;
          }
          return freeProcess && freeProcess.binding && freeProcess.binding("util");
        } catch (e) {
        }
      }();
      var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, nodeIsDate = nodeUtil && nodeUtil.isDate, nodeIsMap = nodeUtil && nodeUtil.isMap, nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, nodeIsSet = nodeUtil && nodeUtil.isSet, nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
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
      function arrayAggregator(array, setter, iteratee, accumulator) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          var value = array[index];
          setter(accumulator, value, iteratee(value), array);
        }
        return accumulator;
      }
      function arrayEach(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (iteratee(array[index], index, array) === false) {
            break;
          }
        }
        return array;
      }
      function arrayEachRight(array, iteratee) {
        var length = array == null ? 0 : array.length;
        while (length--) {
          if (iteratee(array[length], length, array) === false) {
            break;
          }
        }
        return array;
      }
      function arrayEvery(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (!predicate(array[index], index, array)) {
            return false;
          }
        }
        return true;
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
      function arrayIncludes(array, value) {
        var length = array == null ? 0 : array.length;
        return !!length && baseIndexOf(array, value, 0) > -1;
      }
      function arrayIncludesWith(array, value, comparator) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (comparator(value, array[index])) {
            return true;
          }
        }
        return false;
      }
      function arrayMap(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length, result = Array(length);
        while (++index < length) {
          result[index] = iteratee(array[index], index, array);
        }
        return result;
      }
      function arrayPush(array, values) {
        var index = -1, length = values.length, offset = array.length;
        while (++index < length) {
          array[offset + index] = values[index];
        }
        return array;
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
      function arrayReduceRight(array, iteratee, accumulator, initAccum) {
        var length = array == null ? 0 : array.length;
        if (initAccum && length) {
          accumulator = array[--length];
        }
        while (length--) {
          accumulator = iteratee(accumulator, array[length], length, array);
        }
        return accumulator;
      }
      function arraySome(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (predicate(array[index], index, array)) {
            return true;
          }
        }
        return false;
      }
      var asciiSize = baseProperty("length");
      function asciiToArray(string) {
        return string.split("");
      }
      function asciiWords(string) {
        return string.match(reAsciiWord) || [];
      }
      function baseFindKey(collection, predicate, eachFunc) {
        var result;
        eachFunc(collection, function(value, key, collection2) {
          if (predicate(value, key, collection2)) {
            result = key;
            return false;
          }
        });
        return result;
      }
      function baseFindIndex(array, predicate, fromIndex, fromRight) {
        var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
        while (fromRight ? index-- : ++index < length) {
          if (predicate(array[index], index, array)) {
            return index;
          }
        }
        return -1;
      }
      function baseIndexOf(array, value, fromIndex) {
        return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
      }
      function baseIndexOfWith(array, value, fromIndex, comparator) {
        var index = fromIndex - 1, length = array.length;
        while (++index < length) {
          if (comparator(array[index], value)) {
            return index;
          }
        }
        return -1;
      }
      function baseIsNaN(value) {
        return value !== value;
      }
      function baseMean(array, iteratee) {
        var length = array == null ? 0 : array.length;
        return length ? baseSum(array, iteratee) / length : NAN;
      }
      function baseProperty(key) {
        return function(object) {
          return object == null ? undefined$1 : object[key];
        };
      }
      function basePropertyOf(object) {
        return function(key) {
          return object == null ? undefined$1 : object[key];
        };
      }
      function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
        eachFunc(collection, function(value, index, collection2) {
          accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection2);
        });
        return accumulator;
      }
      function baseSortBy(array, comparer) {
        var length = array.length;
        array.sort(comparer);
        while (length--) {
          array[length] = array[length].value;
        }
        return array;
      }
      function baseSum(array, iteratee) {
        var result, index = -1, length = array.length;
        while (++index < length) {
          var current = iteratee(array[index]);
          if (current !== undefined$1) {
            result = result === undefined$1 ? current : result + current;
          }
        }
        return result;
      }
      function baseTimes(n, iteratee) {
        var index = -1, result = Array(n);
        while (++index < n) {
          result[index] = iteratee(index);
        }
        return result;
      }
      function baseToPairs(object, props2) {
        return arrayMap(props2, function(key) {
          return [key, object[key]];
        });
      }
      function baseTrim(string) {
        return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
      }
      function baseUnary(func) {
        return function(value) {
          return func(value);
        };
      }
      function baseValues(object, props2) {
        return arrayMap(props2, function(key) {
          return object[key];
        });
      }
      function cacheHas(cache, key) {
        return cache.has(key);
      }
      function charsStartIndex(strSymbols, chrSymbols) {
        var index = -1, length = strSymbols.length;
        while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
        }
        return index;
      }
      function charsEndIndex(strSymbols, chrSymbols) {
        var index = strSymbols.length;
        while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
        }
        return index;
      }
      function countHolders(array, placeholder) {
        var length = array.length, result = 0;
        while (length--) {
          if (array[length] === placeholder) {
            ++result;
          }
        }
        return result;
      }
      var deburrLetter = basePropertyOf(deburredLetters);
      var escapeHtmlChar = basePropertyOf(htmlEscapes);
      function escapeStringChar(chr) {
        return "\\" + stringEscapes[chr];
      }
      function getValue(object, key) {
        return object == null ? undefined$1 : object[key];
      }
      function hasUnicode(string) {
        return reHasUnicode.test(string);
      }
      function hasUnicodeWord(string) {
        return reHasUnicodeWord.test(string);
      }
      function iteratorToArray(iterator) {
        var data, result = [];
        while (!(data = iterator.next()).done) {
          result.push(data.value);
        }
        return result;
      }
      function mapToArray(map2) {
        var index = -1, result = Array(map2.size);
        map2.forEach(function(value, key) {
          result[++index] = [key, value];
        });
        return result;
      }
      function overArg(func, transform) {
        return function(arg) {
          return func(transform(arg));
        };
      }
      function replaceHolders(array, placeholder) {
        var index = -1, length = array.length, resIndex = 0, result = [];
        while (++index < length) {
          var value = array[index];
          if (value === placeholder || value === PLACEHOLDER) {
            array[index] = PLACEHOLDER;
            result[resIndex++] = index;
          }
        }
        return result;
      }
      function setToArray(set) {
        var index = -1, result = Array(set.size);
        set.forEach(function(value) {
          result[++index] = value;
        });
        return result;
      }
      function setToPairs(set) {
        var index = -1, result = Array(set.size);
        set.forEach(function(value) {
          result[++index] = [value, value];
        });
        return result;
      }
      function strictIndexOf(array, value, fromIndex) {
        var index = fromIndex - 1, length = array.length;
        while (++index < length) {
          if (array[index] === value) {
            return index;
          }
        }
        return -1;
      }
      function strictLastIndexOf(array, value, fromIndex) {
        var index = fromIndex + 1;
        while (index--) {
          if (array[index] === value) {
            return index;
          }
        }
        return index;
      }
      function stringSize(string) {
        return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
      }
      function stringToArray(string) {
        return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
      }
      function trimmedEndIndex(string) {
        var index = string.length;
        while (index-- && reWhitespace.test(string.charAt(index))) {
        }
        return index;
      }
      var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
      function unicodeSize(string) {
        var result = reUnicode.lastIndex = 0;
        while (reUnicode.test(string)) {
          ++result;
        }
        return result;
      }
      function unicodeToArray(string) {
        return string.match(reUnicode) || [];
      }
      function unicodeWords(string) {
        return string.match(reUnicodeWord) || [];
      }
      var runInContext = function runInContext2(context2) {
        context2 = context2 == null ? root : _.defaults(root.Object(), context2, _.pick(root, contextProps));
        var Array2 = context2.Array, Date2 = context2.Date, Error2 = context2.Error, Function2 = context2.Function, Math2 = context2.Math, Object2 = context2.Object, RegExp2 = context2.RegExp, String2 = context2.String, TypeError2 = context2.TypeError;
        var arrayProto = Array2.prototype, funcProto = Function2.prototype, objectProto = Object2.prototype;
        var coreJsData = context2["__core-js_shared__"];
        var funcToString = funcProto.toString;
        var hasOwnProperty = objectProto.hasOwnProperty;
        var idCounter = 0;
        var maskSrcKey = function() {
          var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
          return uid ? "Symbol(src)_1." + uid : "";
        }();
        var nativeObjectToString = objectProto.toString;
        var objectCtorString = funcToString.call(Object2);
        var oldDash = root._;
        var reIsNative = RegExp2(
          "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
        );
        var Buffer2 = moduleExports ? context2.Buffer : undefined$1, Symbol2 = context2.Symbol, Uint8Array2 = context2.Uint8Array, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : undefined$1, getPrototype = overArg(Object2.getPrototypeOf, Object2), objectCreate = Object2.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : undefined$1, symIterator = Symbol2 ? Symbol2.iterator : undefined$1, symToStringTag = Symbol2 ? Symbol2.toStringTag : undefined$1;
        var defineProperty = function() {
          try {
            var func = getNative(Object2, "defineProperty");
            func({}, "", {});
            return func;
          } catch (e) {
          }
        }();
        var ctxClearTimeout = context2.clearTimeout !== root.clearTimeout && context2.clearTimeout, ctxNow = Date2 && Date2.now !== root.Date.now && Date2.now, ctxSetTimeout = context2.setTimeout !== root.setTimeout && context2.setTimeout;
        var nativeCeil = Math2.ceil, nativeFloor = Math2.floor, nativeGetSymbols = Object2.getOwnPropertySymbols, nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : undefined$1, nativeIsFinite = context2.isFinite, nativeJoin = arrayProto.join, nativeKeys = overArg(Object2.keys, Object2), nativeMax = Math2.max, nativeMin = Math2.min, nativeNow = Date2.now, nativeParseInt = context2.parseInt, nativeRandom = Math2.random, nativeReverse = arrayProto.reverse;
        var DataView2 = getNative(context2, "DataView"), Map2 = getNative(context2, "Map"), Promise2 = getNative(context2, "Promise"), Set2 = getNative(context2, "Set"), WeakMap2 = getNative(context2, "WeakMap"), nativeCreate = getNative(Object2, "create");
        var metaMap = WeakMap2 && new WeakMap2();
        var realNames = {};
        var dataViewCtorString = toSource(DataView2), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap2);
        var symbolProto = Symbol2 ? Symbol2.prototype : undefined$1, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined$1, symbolToString = symbolProto ? symbolProto.toString : undefined$1;
        function lodash2(value) {
          if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
            if (value instanceof LodashWrapper) {
              return value;
            }
            if (hasOwnProperty.call(value, "__wrapped__")) {
              return wrapperClone(value);
            }
          }
          return new LodashWrapper(value);
        }
        var baseCreate = /* @__PURE__ */ function() {
          function object() {
          }
          return function(proto) {
            if (!isObject(proto)) {
              return {};
            }
            if (objectCreate) {
              return objectCreate(proto);
            }
            object.prototype = proto;
            var result2 = new object();
            object.prototype = undefined$1;
            return result2;
          };
        }();
        function baseLodash() {
        }
        function LodashWrapper(value, chainAll) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__chain__ = !!chainAll;
          this.__index__ = 0;
          this.__values__ = undefined$1;
        }
        lodash2.templateSettings = {
          /**
           * Used to detect `data` property values to be HTML-escaped.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "escape": reEscape,
          /**
           * Used to detect code to be evaluated.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "evaluate": reEvaluate,
          /**
           * Used to detect `data` property values to inject.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "interpolate": reInterpolate,
          /**
           * Used to reference the data object in the template text.
           *
           * @memberOf _.templateSettings
           * @type {string}
           */
          "variable": "",
          /**
           * Used to import variables into the compiled template.
           *
           * @memberOf _.templateSettings
           * @type {Object}
           */
          "imports": {
            /**
             * A reference to the `lodash` function.
             *
             * @memberOf _.templateSettings.imports
             * @type {Function}
             */
            "_": lodash2
          }
        };
        lodash2.prototype = baseLodash.prototype;
        lodash2.prototype.constructor = lodash2;
        LodashWrapper.prototype = baseCreate(baseLodash.prototype);
        LodashWrapper.prototype.constructor = LodashWrapper;
        function LazyWrapper(value) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__dir__ = 1;
          this.__filtered__ = false;
          this.__iteratees__ = [];
          this.__takeCount__ = MAX_ARRAY_LENGTH;
          this.__views__ = [];
        }
        function lazyClone() {
          var result2 = new LazyWrapper(this.__wrapped__);
          result2.__actions__ = copyArray(this.__actions__);
          result2.__dir__ = this.__dir__;
          result2.__filtered__ = this.__filtered__;
          result2.__iteratees__ = copyArray(this.__iteratees__);
          result2.__takeCount__ = this.__takeCount__;
          result2.__views__ = copyArray(this.__views__);
          return result2;
        }
        function lazyReverse() {
          if (this.__filtered__) {
            var result2 = new LazyWrapper(this);
            result2.__dir__ = -1;
            result2.__filtered__ = true;
          } else {
            result2 = this.clone();
            result2.__dir__ *= -1;
          }
          return result2;
        }
        function lazyValue() {
          var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
          if (!isArr || !isRight && arrLength == length && takeCount == length) {
            return baseWrapperValue(array, this.__actions__);
          }
          var result2 = [];
          outer:
            while (length-- && resIndex < takeCount) {
              index += dir;
              var iterIndex = -1, value = array[index];
              while (++iterIndex < iterLength) {
                var data = iteratees[iterIndex], iteratee2 = data.iteratee, type = data.type, computed = iteratee2(value);
                if (type == LAZY_MAP_FLAG) {
                  value = computed;
                } else if (!computed) {
                  if (type == LAZY_FILTER_FLAG) {
                    continue outer;
                  } else {
                    break outer;
                  }
                }
              }
              result2[resIndex++] = value;
            }
          return result2;
        }
        LazyWrapper.prototype = baseCreate(baseLodash.prototype);
        LazyWrapper.prototype.constructor = LazyWrapper;
        function Hash(entries) {
          var index = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        function hashClear() {
          this.__data__ = nativeCreate ? nativeCreate(null) : {};
          this.size = 0;
        }
        function hashDelete(key) {
          var result2 = this.has(key) && delete this.__data__[key];
          this.size -= result2 ? 1 : 0;
          return result2;
        }
        function hashGet(key) {
          var data = this.__data__;
          if (nativeCreate) {
            var result2 = data[key];
            return result2 === HASH_UNDEFINED ? undefined$1 : result2;
          }
          return hasOwnProperty.call(data, key) ? data[key] : undefined$1;
        }
        function hashHas(key) {
          var data = this.__data__;
          return nativeCreate ? data[key] !== undefined$1 : hasOwnProperty.call(data, key);
        }
        function hashSet(key, value) {
          var data = this.__data__;
          this.size += this.has(key) ? 0 : 1;
          data[key] = nativeCreate && value === undefined$1 ? HASH_UNDEFINED : value;
          return this;
        }
        Hash.prototype.clear = hashClear;
        Hash.prototype["delete"] = hashDelete;
        Hash.prototype.get = hashGet;
        Hash.prototype.has = hashHas;
        Hash.prototype.set = hashSet;
        function ListCache(entries) {
          var index = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        function listCacheClear() {
          this.__data__ = [];
          this.size = 0;
        }
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
          return index < 0 ? undefined$1 : data[index][1];
        }
        function listCacheHas(key) {
          return assocIndexOf(this.__data__, key) > -1;
        }
        function listCacheSet(key, value) {
          var data = this.__data__, index = assocIndexOf(data, key);
          if (index < 0) {
            ++this.size;
            data.push([key, value]);
          } else {
            data[index][1] = value;
          }
          return this;
        }
        ListCache.prototype.clear = listCacheClear;
        ListCache.prototype["delete"] = listCacheDelete;
        ListCache.prototype.get = listCacheGet;
        ListCache.prototype.has = listCacheHas;
        ListCache.prototype.set = listCacheSet;
        function MapCache(entries) {
          var index = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        function mapCacheClear() {
          this.size = 0;
          this.__data__ = {
            "hash": new Hash(),
            "map": new (Map2 || ListCache)(),
            "string": new Hash()
          };
        }
        function mapCacheDelete(key) {
          var result2 = getMapData(this, key)["delete"](key);
          this.size -= result2 ? 1 : 0;
          return result2;
        }
        function mapCacheGet(key) {
          return getMapData(this, key).get(key);
        }
        function mapCacheHas(key) {
          return getMapData(this, key).has(key);
        }
        function mapCacheSet(key, value) {
          var data = getMapData(this, key), size2 = data.size;
          data.set(key, value);
          this.size += data.size == size2 ? 0 : 1;
          return this;
        }
        MapCache.prototype.clear = mapCacheClear;
        MapCache.prototype["delete"] = mapCacheDelete;
        MapCache.prototype.get = mapCacheGet;
        MapCache.prototype.has = mapCacheHas;
        MapCache.prototype.set = mapCacheSet;
        function SetCache(values2) {
          var index = -1, length = values2 == null ? 0 : values2.length;
          this.__data__ = new MapCache();
          while (++index < length) {
            this.add(values2[index]);
          }
        }
        function setCacheAdd(value) {
          this.__data__.set(value, HASH_UNDEFINED);
          return this;
        }
        function setCacheHas(value) {
          return this.__data__.has(value);
        }
        SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
        SetCache.prototype.has = setCacheHas;
        function Stack(entries) {
          var data = this.__data__ = new ListCache(entries);
          this.size = data.size;
        }
        function stackClear() {
          this.__data__ = new ListCache();
          this.size = 0;
        }
        function stackDelete(key) {
          var data = this.__data__, result2 = data["delete"](key);
          this.size = data.size;
          return result2;
        }
        function stackGet(key) {
          return this.__data__.get(key);
        }
        function stackHas(key) {
          return this.__data__.has(key);
        }
        function stackSet(key, value) {
          var data = this.__data__;
          if (data instanceof ListCache) {
            var pairs = data.__data__;
            if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
              pairs.push([key, value]);
              this.size = ++data.size;
              return this;
            }
            data = this.__data__ = new MapCache(pairs);
          }
          data.set(key, value);
          this.size = data.size;
          return this;
        }
        Stack.prototype.clear = stackClear;
        Stack.prototype["delete"] = stackDelete;
        Stack.prototype.get = stackGet;
        Stack.prototype.has = stackHas;
        Stack.prototype.set = stackSet;
        function arrayLikeKeys(value, inherited) {
          var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes(value.length, String2) : [], length = result2.length;
          for (var key in value) {
            if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
            (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
            isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
            isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
            isIndex(key, length)))) {
              result2.push(key);
            }
          }
          return result2;
        }
        function arraySample(array) {
          var length = array.length;
          return length ? array[baseRandom(0, length - 1)] : undefined$1;
        }
        function arraySampleSize(array, n) {
          return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
        }
        function arrayShuffle(array) {
          return shuffleSelf(copyArray(array));
        }
        function assignMergeValue(object, key, value) {
          if (value !== undefined$1 && !eq(object[key], value) || value === undefined$1 && !(key in object)) {
            baseAssignValue(object, key, value);
          }
        }
        function assignValue(object, key, value) {
          var objValue = object[key];
          if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined$1 && !(key in object)) {
            baseAssignValue(object, key, value);
          }
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
        function baseAggregator(collection, setter, iteratee2, accumulator) {
          baseEach(collection, function(value, key, collection2) {
            setter(accumulator, value, iteratee2(value), collection2);
          });
          return accumulator;
        }
        function baseAssign(object, source) {
          return object && copyObject(source, keys(source), object);
        }
        function baseAssignIn(object, source) {
          return object && copyObject(source, keysIn(source), object);
        }
        function baseAssignValue(object, key, value) {
          if (key == "__proto__" && defineProperty) {
            defineProperty(object, key, {
              "configurable": true,
              "enumerable": true,
              "value": value,
              "writable": true
            });
          } else {
            object[key] = value;
          }
        }
        function baseAt(object, paths) {
          var index = -1, length = paths.length, result2 = Array2(length), skip = object == null;
          while (++index < length) {
            result2[index] = skip ? undefined$1 : get(object, paths[index]);
          }
          return result2;
        }
        function baseClamp(number, lower, upper) {
          if (number === number) {
            if (upper !== undefined$1) {
              number = number <= upper ? number : upper;
            }
            if (lower !== undefined$1) {
              number = number >= lower ? number : lower;
            }
          }
          return number;
        }
        function baseClone(value, bitmask, customizer, key, object, stack) {
          var result2, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
          if (customizer) {
            result2 = object ? customizer(value, key, object, stack) : customizer(value);
          }
          if (result2 !== undefined$1) {
            return result2;
          }
          if (!isObject(value)) {
            return value;
          }
          var isArr = isArray(value);
          if (isArr) {
            result2 = initCloneArray(value);
            if (!isDeep) {
              return copyArray(value, result2);
            }
          } else {
            var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
            if (isBuffer(value)) {
              return cloneBuffer(value, isDeep);
            }
            if (tag == objectTag || tag == argsTag || isFunc && !object) {
              result2 = isFlat || isFunc ? {} : initCloneObject(value);
              if (!isDeep) {
                return isFlat ? copySymbolsIn(value, baseAssignIn(result2, value)) : copySymbols(value, baseAssign(result2, value));
              }
            } else {
              if (!cloneableTags[tag]) {
                return object ? value : {};
              }
              result2 = initCloneByTag(value, tag, isDeep);
            }
          }
          stack || (stack = new Stack());
          var stacked = stack.get(value);
          if (stacked) {
            return stacked;
          }
          stack.set(value, result2);
          if (isSet(value)) {
            value.forEach(function(subValue) {
              result2.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
            });
          } else if (isMap(value)) {
            value.forEach(function(subValue, key2) {
              result2.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
            });
          }
          var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
          var props2 = isArr ? undefined$1 : keysFunc(value);
          arrayEach(props2 || value, function(subValue, key2) {
            if (props2) {
              key2 = subValue;
              subValue = value[key2];
            }
            assignValue(result2, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
          });
          return result2;
        }
        function baseConforms(source) {
          var props2 = keys(source);
          return function(object) {
            return baseConformsTo(object, source, props2);
          };
        }
        function baseConformsTo(object, source, props2) {
          var length = props2.length;
          if (object == null) {
            return !length;
          }
          object = Object2(object);
          while (length--) {
            var key = props2[length], predicate = source[key], value = object[key];
            if (value === undefined$1 && !(key in object) || !predicate(value)) {
              return false;
            }
          }
          return true;
        }
        function baseDelay(func, wait, args) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          return setTimeout2(function() {
            func.apply(undefined$1, args);
          }, wait);
        }
        function baseDifference(array, values2, iteratee2, comparator) {
          var index = -1, includes2 = arrayIncludes, isCommon = true, length = array.length, result2 = [], valuesLength = values2.length;
          if (!length) {
            return result2;
          }
          if (iteratee2) {
            values2 = arrayMap(values2, baseUnary(iteratee2));
          }
          if (comparator) {
            includes2 = arrayIncludesWith;
            isCommon = false;
          } else if (values2.length >= LARGE_ARRAY_SIZE) {
            includes2 = cacheHas;
            isCommon = false;
            values2 = new SetCache(values2);
          }
          outer:
            while (++index < length) {
              var value = array[index], computed = iteratee2 == null ? value : iteratee2(value);
              value = comparator || value !== 0 ? value : 0;
              if (isCommon && computed === computed) {
                var valuesIndex = valuesLength;
                while (valuesIndex--) {
                  if (values2[valuesIndex] === computed) {
                    continue outer;
                  }
                }
                result2.push(value);
              } else if (!includes2(values2, computed, comparator)) {
                result2.push(value);
              }
            }
          return result2;
        }
        var baseEach = createBaseEach(baseForOwn);
        var baseEachRight = createBaseEach(baseForOwnRight, true);
        function baseEvery(collection, predicate) {
          var result2 = true;
          baseEach(collection, function(value, index, collection2) {
            result2 = !!predicate(value, index, collection2);
            return result2;
          });
          return result2;
        }
        function baseExtremum(array, iteratee2, comparator) {
          var index = -1, length = array.length;
          while (++index < length) {
            var value = array[index], current = iteratee2(value);
            if (current != null && (computed === undefined$1 ? current === current && !isSymbol(current) : comparator(current, computed))) {
              var computed = current, result2 = value;
            }
          }
          return result2;
        }
        function baseFill(array, value, start, end) {
          var length = array.length;
          start = toInteger(start);
          if (start < 0) {
            start = -start > length ? 0 : length + start;
          }
          end = end === undefined$1 || end > length ? length : toInteger(end);
          if (end < 0) {
            end += length;
          }
          end = start > end ? 0 : toLength(end);
          while (start < end) {
            array[start++] = value;
          }
          return array;
        }
        function baseFilter(collection, predicate) {
          var result2 = [];
          baseEach(collection, function(value, index, collection2) {
            if (predicate(value, index, collection2)) {
              result2.push(value);
            }
          });
          return result2;
        }
        function baseFlatten(array, depth, predicate, isStrict, result2) {
          var index = -1, length = array.length;
          predicate || (predicate = isFlattenable);
          result2 || (result2 = []);
          while (++index < length) {
            var value = array[index];
            if (depth > 0 && predicate(value)) {
              if (depth > 1) {
                baseFlatten(value, depth - 1, predicate, isStrict, result2);
              } else {
                arrayPush(result2, value);
              }
            } else if (!isStrict) {
              result2[result2.length] = value;
            }
          }
          return result2;
        }
        var baseFor = createBaseFor();
        var baseForRight = createBaseFor(true);
        function baseForOwn(object, iteratee2) {
          return object && baseFor(object, iteratee2, keys);
        }
        function baseForOwnRight(object, iteratee2) {
          return object && baseForRight(object, iteratee2, keys);
        }
        function baseFunctions(object, props2) {
          return arrayFilter(props2, function(key) {
            return isFunction(object[key]);
          });
        }
        function baseGet(object, path2) {
          path2 = castPath(path2, object);
          var index = 0, length = path2.length;
          while (object != null && index < length) {
            object = object[toKey(path2[index++])];
          }
          return index && index == length ? object : undefined$1;
        }
        function baseGetAllKeys(object, keysFunc, symbolsFunc) {
          var result2 = keysFunc(object);
          return isArray(object) ? result2 : arrayPush(result2, symbolsFunc(object));
        }
        function baseGetTag(value) {
          if (value == null) {
            return value === undefined$1 ? undefinedTag : nullTag;
          }
          return symToStringTag && symToStringTag in Object2(value) ? getRawTag(value) : objectToString(value);
        }
        function baseGt(value, other) {
          return value > other;
        }
        function baseHas(object, key) {
          return object != null && hasOwnProperty.call(object, key);
        }
        function baseHasIn(object, key) {
          return object != null && key in Object2(object);
        }
        function baseInRange(number, start, end) {
          return number >= nativeMin(start, end) && number < nativeMax(start, end);
        }
        function baseIntersection(arrays, iteratee2, comparator) {
          var includes2 = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array2(othLength), maxLength = Infinity, result2 = [];
          while (othIndex--) {
            var array = arrays[othIndex];
            if (othIndex && iteratee2) {
              array = arrayMap(array, baseUnary(iteratee2));
            }
            maxLength = nativeMin(array.length, maxLength);
            caches[othIndex] = !comparator && (iteratee2 || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined$1;
          }
          array = arrays[0];
          var index = -1, seen = caches[0];
          outer:
            while (++index < length && result2.length < maxLength) {
              var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
              value = comparator || value !== 0 ? value : 0;
              if (!(seen ? cacheHas(seen, computed) : includes2(result2, computed, comparator))) {
                othIndex = othLength;
                while (--othIndex) {
                  var cache = caches[othIndex];
                  if (!(cache ? cacheHas(cache, computed) : includes2(arrays[othIndex], computed, comparator))) {
                    continue outer;
                  }
                }
                if (seen) {
                  seen.push(computed);
                }
                result2.push(value);
              }
            }
          return result2;
        }
        function baseInverter(object, setter, iteratee2, accumulator) {
          baseForOwn(object, function(value, key, object2) {
            setter(accumulator, iteratee2(value), key, object2);
          });
          return accumulator;
        }
        function baseInvoke(object, path2, args) {
          path2 = castPath(path2, object);
          object = parent(object, path2);
          var func = object == null ? object : object[toKey(last(path2))];
          return func == null ? undefined$1 : apply(func, object, args);
        }
        function baseIsArguments(value) {
          return isObjectLike(value) && baseGetTag(value) == argsTag;
        }
        function baseIsArrayBuffer(value) {
          return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
        }
        function baseIsDate(value) {
          return isObjectLike(value) && baseGetTag(value) == dateTag;
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
        function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
          var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
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
          if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
            var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
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
        function baseIsMap(value) {
          return isObjectLike(value) && getTag(value) == mapTag;
        }
        function baseIsMatch(object, source, matchData, customizer) {
          var index = matchData.length, length = index, noCustomizer = !customizer;
          if (object == null) {
            return !length;
          }
          object = Object2(object);
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
              if (objValue === undefined$1 && !(key in object)) {
                return false;
              }
            } else {
              var stack = new Stack();
              if (customizer) {
                var result2 = customizer(objValue, srcValue, key, object, source, stack);
              }
              if (!(result2 === undefined$1 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result2)) {
                return false;
              }
            }
          }
          return true;
        }
        function baseIsNative(value) {
          if (!isObject(value) || isMasked(value)) {
            return false;
          }
          var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
          return pattern.test(toSource(value));
        }
        function baseIsRegExp(value) {
          return isObjectLike(value) && baseGetTag(value) == regexpTag;
        }
        function baseIsSet(value) {
          return isObjectLike(value) && getTag(value) == setTag;
        }
        function baseIsTypedArray(value) {
          return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
        }
        function baseIteratee(value) {
          if (typeof value == "function") {
            return value;
          }
          if (value == null) {
            return identity;
          }
          if (typeof value == "object") {
            return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
          }
          return property(value);
        }
        function baseKeys(object) {
          if (!isPrototype(object)) {
            return nativeKeys(object);
          }
          var result2 = [];
          for (var key in Object2(object)) {
            if (hasOwnProperty.call(object, key) && key != "constructor") {
              result2.push(key);
            }
          }
          return result2;
        }
        function baseKeysIn(object) {
          if (!isObject(object)) {
            return nativeKeysIn(object);
          }
          var isProto = isPrototype(object), result2 = [];
          for (var key in object) {
            if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
              result2.push(key);
            }
          }
          return result2;
        }
        function baseLt(value, other) {
          return value < other;
        }
        function baseMap(collection, iteratee2) {
          var index = -1, result2 = isArrayLike(collection) ? Array2(collection.length) : [];
          baseEach(collection, function(value, key, collection2) {
            result2[++index] = iteratee2(value, key, collection2);
          });
          return result2;
        }
        function baseMatches(source) {
          var matchData = getMatchData(source);
          if (matchData.length == 1 && matchData[0][2]) {
            return matchesStrictComparable(matchData[0][0], matchData[0][1]);
          }
          return function(object) {
            return object === source || baseIsMatch(object, source, matchData);
          };
        }
        function baseMatchesProperty(path2, srcValue) {
          if (isKey(path2) && isStrictComparable(srcValue)) {
            return matchesStrictComparable(toKey(path2), srcValue);
          }
          return function(object) {
            var objValue = get(object, path2);
            return objValue === undefined$1 && objValue === srcValue ? hasIn(object, path2) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
          };
        }
        function baseMerge(object, source, srcIndex, customizer, stack) {
          if (object === source) {
            return;
          }
          baseFor(source, function(srcValue, key) {
            stack || (stack = new Stack());
            if (isObject(srcValue)) {
              baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
            } else {
              var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : undefined$1;
              if (newValue === undefined$1) {
                newValue = srcValue;
              }
              assignMergeValue(object, key, newValue);
            }
          }, keysIn);
        }
        function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
          var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
          if (stacked) {
            assignMergeValue(object, key, stacked);
            return;
          }
          var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined$1;
          var isCommon = newValue === undefined$1;
          if (isCommon) {
            var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
            newValue = srcValue;
            if (isArr || isBuff || isTyped) {
              if (isArray(objValue)) {
                newValue = objValue;
              } else if (isArrayLikeObject(objValue)) {
                newValue = copyArray(objValue);
              } else if (isBuff) {
                isCommon = false;
                newValue = cloneBuffer(srcValue, true);
              } else if (isTyped) {
                isCommon = false;
                newValue = cloneTypedArray(srcValue, true);
              } else {
                newValue = [];
              }
            } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
              newValue = objValue;
              if (isArguments(objValue)) {
                newValue = toPlainObject(objValue);
              } else if (!isObject(objValue) || isFunction(objValue)) {
                newValue = initCloneObject(srcValue);
              }
            } else {
              isCommon = false;
            }
          }
          if (isCommon) {
            stack.set(srcValue, newValue);
            mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
            stack["delete"](srcValue);
          }
          assignMergeValue(object, key, newValue);
        }
        function baseNth(array, n) {
          var length = array.length;
          if (!length) {
            return;
          }
          n += n < 0 ? length : 0;
          return isIndex(n, length) ? array[n] : undefined$1;
        }
        function baseOrderBy(collection, iteratees, orders) {
          if (iteratees.length) {
            iteratees = arrayMap(iteratees, function(iteratee2) {
              if (isArray(iteratee2)) {
                return function(value) {
                  return baseGet(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
                };
              }
              return iteratee2;
            });
          } else {
            iteratees = [identity];
          }
          var index = -1;
          iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
          var result2 = baseMap(collection, function(value, key, collection2) {
            var criteria = arrayMap(iteratees, function(iteratee2) {
              return iteratee2(value);
            });
            return { "criteria": criteria, "index": ++index, "value": value };
          });
          return baseSortBy(result2, function(object, other) {
            return compareMultiple(object, other, orders);
          });
        }
        function basePick(object, paths) {
          return basePickBy(object, paths, function(value, path2) {
            return hasIn(object, path2);
          });
        }
        function basePickBy(object, paths, predicate) {
          var index = -1, length = paths.length, result2 = {};
          while (++index < length) {
            var path2 = paths[index], value = baseGet(object, path2);
            if (predicate(value, path2)) {
              baseSet(result2, castPath(path2, object), value);
            }
          }
          return result2;
        }
        function basePropertyDeep(path2) {
          return function(object) {
            return baseGet(object, path2);
          };
        }
        function basePullAll(array, values2, iteratee2, comparator) {
          var indexOf2 = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length = values2.length, seen = array;
          if (array === values2) {
            values2 = copyArray(values2);
          }
          if (iteratee2) {
            seen = arrayMap(array, baseUnary(iteratee2));
          }
          while (++index < length) {
            var fromIndex = 0, value = values2[index], computed = iteratee2 ? iteratee2(value) : value;
            while ((fromIndex = indexOf2(seen, computed, fromIndex, comparator)) > -1) {
              if (seen !== array) {
                splice.call(seen, fromIndex, 1);
              }
              splice.call(array, fromIndex, 1);
            }
          }
          return array;
        }
        function basePullAt(array, indexes) {
          var length = array ? indexes.length : 0, lastIndex = length - 1;
          while (length--) {
            var index = indexes[length];
            if (length == lastIndex || index !== previous) {
              var previous = index;
              if (isIndex(index)) {
                splice.call(array, index, 1);
              } else {
                baseUnset(array, index);
              }
            }
          }
          return array;
        }
        function baseRandom(lower, upper) {
          return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
        }
        function baseRange(start, end, step, fromRight) {
          var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result2 = Array2(length);
          while (length--) {
            result2[fromRight ? length : ++index] = start;
            start += step;
          }
          return result2;
        }
        function baseRepeat(string, n) {
          var result2 = "";
          if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
            return result2;
          }
          do {
            if (n % 2) {
              result2 += string;
            }
            n = nativeFloor(n / 2);
            if (n) {
              string += string;
            }
          } while (n);
          return result2;
        }
        function baseRest(func, start) {
          return setToString(overRest(func, start, identity), func + "");
        }
        function baseSample(collection) {
          return arraySample(values(collection));
        }
        function baseSampleSize(collection, n) {
          var array = values(collection);
          return shuffleSelf(array, baseClamp(n, 0, array.length));
        }
        function baseSet(object, path2, value, customizer) {
          if (!isObject(object)) {
            return object;
          }
          path2 = castPath(path2, object);
          var index = -1, length = path2.length, lastIndex = length - 1, nested = object;
          while (nested != null && ++index < length) {
            var key = toKey(path2[index]), newValue = value;
            if (key === "__proto__" || key === "constructor" || key === "prototype") {
              return object;
            }
            if (index != lastIndex) {
              var objValue = nested[key];
              newValue = customizer ? customizer(objValue, key, nested) : undefined$1;
              if (newValue === undefined$1) {
                newValue = isObject(objValue) ? objValue : isIndex(path2[index + 1]) ? [] : {};
              }
            }
            assignValue(nested, key, newValue);
            nested = nested[key];
          }
          return object;
        }
        var baseSetData = !metaMap ? identity : function(func, data) {
          metaMap.set(func, data);
          return func;
        };
        var baseSetToString = !defineProperty ? identity : function(func, string) {
          return defineProperty(func, "toString", {
            "configurable": true,
            "enumerable": false,
            "value": constant(string),
            "writable": true
          });
        };
        function baseShuffle(collection) {
          return shuffleSelf(values(collection));
        }
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
          var result2 = Array2(length);
          while (++index < length) {
            result2[index] = array[index + start];
          }
          return result2;
        }
        function baseSome(collection, predicate) {
          var result2;
          baseEach(collection, function(value, index, collection2) {
            result2 = predicate(value, index, collection2);
            return !result2;
          });
          return !!result2;
        }
        function baseSortedIndex(array, value, retHighest) {
          var low = 0, high = array == null ? low : array.length;
          if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
            while (low < high) {
              var mid = low + high >>> 1, computed = array[mid];
              if (computed !== null && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) {
                low = mid + 1;
              } else {
                high = mid;
              }
            }
            return high;
          }
          return baseSortedIndexBy(array, value, identity, retHighest);
        }
        function baseSortedIndexBy(array, value, iteratee2, retHighest) {
          var low = 0, high = array == null ? 0 : array.length;
          if (high === 0) {
            return 0;
          }
          value = iteratee2(value);
          var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol(value), valIsUndefined = value === undefined$1;
          while (low < high) {
            var mid = nativeFloor((low + high) / 2), computed = iteratee2(array[mid]), othIsDefined = computed !== undefined$1, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol(computed);
            if (valIsNaN) {
              var setLow = retHighest || othIsReflexive;
            } else if (valIsUndefined) {
              setLow = othIsReflexive && (retHighest || othIsDefined);
            } else if (valIsNull) {
              setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
            } else if (valIsSymbol) {
              setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
            } else if (othIsNull || othIsSymbol) {
              setLow = false;
            } else {
              setLow = retHighest ? computed <= value : computed < value;
            }
            if (setLow) {
              low = mid + 1;
            } else {
              high = mid;
            }
          }
          return nativeMin(high, MAX_ARRAY_INDEX);
        }
        function baseSortedUniq(array, iteratee2) {
          var index = -1, length = array.length, resIndex = 0, result2 = [];
          while (++index < length) {
            var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
            if (!index || !eq(computed, seen)) {
              var seen = computed;
              result2[resIndex++] = value === 0 ? 0 : value;
            }
          }
          return result2;
        }
        function baseToNumber(value) {
          if (typeof value == "number") {
            return value;
          }
          if (isSymbol(value)) {
            return NAN;
          }
          return +value;
        }
        function baseToString(value) {
          if (typeof value == "string") {
            return value;
          }
          if (isArray(value)) {
            return arrayMap(value, baseToString) + "";
          }
          if (isSymbol(value)) {
            return symbolToString ? symbolToString.call(value) : "";
          }
          var result2 = value + "";
          return result2 == "0" && 1 / value == -Infinity ? "-0" : result2;
        }
        function baseUniq(array, iteratee2, comparator) {
          var index = -1, includes2 = arrayIncludes, length = array.length, isCommon = true, result2 = [], seen = result2;
          if (comparator) {
            isCommon = false;
            includes2 = arrayIncludesWith;
          } else if (length >= LARGE_ARRAY_SIZE) {
            var set2 = iteratee2 ? null : createSet(array);
            if (set2) {
              return setToArray(set2);
            }
            isCommon = false;
            includes2 = cacheHas;
            seen = new SetCache();
          } else {
            seen = iteratee2 ? [] : result2;
          }
          outer:
            while (++index < length) {
              var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
              value = comparator || value !== 0 ? value : 0;
              if (isCommon && computed === computed) {
                var seenIndex = seen.length;
                while (seenIndex--) {
                  if (seen[seenIndex] === computed) {
                    continue outer;
                  }
                }
                if (iteratee2) {
                  seen.push(computed);
                }
                result2.push(value);
              } else if (!includes2(seen, computed, comparator)) {
                if (seen !== result2) {
                  seen.push(computed);
                }
                result2.push(value);
              }
            }
          return result2;
        }
        function baseUnset(object, path2) {
          path2 = castPath(path2, object);
          object = parent(object, path2);
          return object == null || delete object[toKey(last(path2))];
        }
        function baseUpdate(object, path2, updater, customizer) {
          return baseSet(object, path2, updater(baseGet(object, path2)), customizer);
        }
        function baseWhile(array, predicate, isDrop, fromRight) {
          var length = array.length, index = fromRight ? length : -1;
          while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {
          }
          return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
        }
        function baseWrapperValue(value, actions) {
          var result2 = value;
          if (result2 instanceof LazyWrapper) {
            result2 = result2.value();
          }
          return arrayReduce(actions, function(result3, action) {
            return action.func.apply(action.thisArg, arrayPush([result3], action.args));
          }, result2);
        }
        function baseXor(arrays, iteratee2, comparator) {
          var length = arrays.length;
          if (length < 2) {
            return length ? baseUniq(arrays[0]) : [];
          }
          var index = -1, result2 = Array2(length);
          while (++index < length) {
            var array = arrays[index], othIndex = -1;
            while (++othIndex < length) {
              if (othIndex != index) {
                result2[index] = baseDifference(result2[index] || array, arrays[othIndex], iteratee2, comparator);
              }
            }
          }
          return baseUniq(baseFlatten(result2, 1), iteratee2, comparator);
        }
        function baseZipObject(props2, values2, assignFunc) {
          var index = -1, length = props2.length, valsLength = values2.length, result2 = {};
          while (++index < length) {
            var value = index < valsLength ? values2[index] : undefined$1;
            assignFunc(result2, props2[index], value);
          }
          return result2;
        }
        function castArrayLikeObject(value) {
          return isArrayLikeObject(value) ? value : [];
        }
        function castFunction(value) {
          return typeof value == "function" ? value : identity;
        }
        function castPath(value, object) {
          if (isArray(value)) {
            return value;
          }
          return isKey(value, object) ? [value] : stringToPath(toString(value));
        }
        var castRest = baseRest;
        function castSlice(array, start, end) {
          var length = array.length;
          end = end === undefined$1 ? length : end;
          return !start && end >= length ? array : baseSlice(array, start, end);
        }
        var clearTimeout2 = ctxClearTimeout || function(id) {
          return root.clearTimeout(id);
        };
        function cloneBuffer(buffer, isDeep) {
          if (isDeep) {
            return buffer.slice();
          }
          var length = buffer.length, result2 = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
          buffer.copy(result2);
          return result2;
        }
        function cloneArrayBuffer(arrayBuffer) {
          var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
          new Uint8Array2(result2).set(new Uint8Array2(arrayBuffer));
          return result2;
        }
        function cloneDataView(dataView, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
          return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
        }
        function cloneRegExp(regexp) {
          var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
          result2.lastIndex = regexp.lastIndex;
          return result2;
        }
        function cloneSymbol(symbol) {
          return symbolValueOf ? Object2(symbolValueOf.call(symbol)) : {};
        }
        function cloneTypedArray(typedArray, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
          return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
        }
        function compareAscending(value, other) {
          if (value !== other) {
            var valIsDefined = value !== undefined$1, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
            var othIsDefined = other !== undefined$1, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
            if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
              return 1;
            }
            if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
              return -1;
            }
          }
          return 0;
        }
        function compareMultiple(object, other, orders) {
          var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
          while (++index < length) {
            var result2 = compareAscending(objCriteria[index], othCriteria[index]);
            if (result2) {
              if (index >= ordersLength) {
                return result2;
              }
              var order = orders[index];
              return result2 * (order == "desc" ? -1 : 1);
            }
          }
          return object.index - other.index;
        }
        function composeArgs(args, partials, holders, isCurried) {
          var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(leftLength + rangeLength), isUncurried = !isCurried;
          while (++leftIndex < leftLength) {
            result2[leftIndex] = partials[leftIndex];
          }
          while (++argsIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
              result2[holders[argsIndex]] = args[argsIndex];
            }
          }
          while (rangeLength--) {
            result2[leftIndex++] = args[argsIndex++];
          }
          return result2;
        }
        function composeArgsRight(args, partials, holders, isCurried) {
          var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(rangeLength + rightLength), isUncurried = !isCurried;
          while (++argsIndex < rangeLength) {
            result2[argsIndex] = args[argsIndex];
          }
          var offset = argsIndex;
          while (++rightIndex < rightLength) {
            result2[offset + rightIndex] = partials[rightIndex];
          }
          while (++holdersIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
              result2[offset + holders[holdersIndex]] = args[argsIndex++];
            }
          }
          return result2;
        }
        function copyArray(source, array) {
          var index = -1, length = source.length;
          array || (array = Array2(length));
          while (++index < length) {
            array[index] = source[index];
          }
          return array;
        }
        function copyObject(source, props2, object, customizer) {
          var isNew = !object;
          object || (object = {});
          var index = -1, length = props2.length;
          while (++index < length) {
            var key = props2[index];
            var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined$1;
            if (newValue === undefined$1) {
              newValue = source[key];
            }
            if (isNew) {
              baseAssignValue(object, key, newValue);
            } else {
              assignValue(object, key, newValue);
            }
          }
          return object;
        }
        function copySymbols(source, object) {
          return copyObject(source, getSymbols(source), object);
        }
        function copySymbolsIn(source, object) {
          return copyObject(source, getSymbolsIn(source), object);
        }
        function createAggregator(setter, initializer) {
          return function(collection, iteratee2) {
            var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
            return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
          };
        }
        function createAssigner(assigner) {
          return baseRest(function(object, sources) {
            var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined$1, guard = length > 2 ? sources[2] : undefined$1;
            customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined$1;
            if (guard && isIterateeCall(sources[0], sources[1], guard)) {
              customizer = length < 3 ? undefined$1 : customizer;
              length = 1;
            }
            object = Object2(object);
            while (++index < length) {
              var source = sources[index];
              if (source) {
                assigner(object, source, index, customizer);
              }
            }
            return object;
          });
        }
        function createBaseEach(eachFunc, fromRight) {
          return function(collection, iteratee2) {
            if (collection == null) {
              return collection;
            }
            if (!isArrayLike(collection)) {
              return eachFunc(collection, iteratee2);
            }
            var length = collection.length, index = fromRight ? length : -1, iterable = Object2(collection);
            while (fromRight ? index-- : ++index < length) {
              if (iteratee2(iterable[index], index, iterable) === false) {
                break;
              }
            }
            return collection;
          };
        }
        function createBaseFor(fromRight) {
          return function(object, iteratee2, keysFunc) {
            var index = -1, iterable = Object2(object), props2 = keysFunc(object), length = props2.length;
            while (length--) {
              var key = props2[fromRight ? length : ++index];
              if (iteratee2(iterable[key], key, iterable) === false) {
                break;
              }
            }
            return object;
          };
        }
        function createBind(func, bitmask, thisArg) {
          var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
          function wrapper() {
            var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            return fn.apply(isBind ? thisArg : this, arguments);
          }
          return wrapper;
        }
        function createCaseFirst(methodName) {
          return function(string) {
            string = toString(string);
            var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined$1;
            var chr = strSymbols ? strSymbols[0] : string.charAt(0);
            var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
            return chr[methodName]() + trailing;
          };
        }
        function createCompounder(callback) {
          return function(string) {
            return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
          };
        }
        function createCtor(Ctor) {
          return function() {
            var args = arguments;
            switch (args.length) {
              case 0:
                return new Ctor();
              case 1:
                return new Ctor(args[0]);
              case 2:
                return new Ctor(args[0], args[1]);
              case 3:
                return new Ctor(args[0], args[1], args[2]);
              case 4:
                return new Ctor(args[0], args[1], args[2], args[3]);
              case 5:
                return new Ctor(args[0], args[1], args[2], args[3], args[4]);
              case 6:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
              case 7:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
            }
            var thisBinding = baseCreate(Ctor.prototype), result2 = Ctor.apply(thisBinding, args);
            return isObject(result2) ? result2 : thisBinding;
          };
        }
        function createCurry(func, bitmask, arity) {
          var Ctor = createCtor(func);
          function wrapper() {
            var length = arguments.length, args = Array2(length), index = length, placeholder = getHolder(wrapper);
            while (index--) {
              args[index] = arguments[index];
            }
            var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
            length -= holders.length;
            if (length < arity) {
              return createRecurry(
                func,
                bitmask,
                createHybrid,
                wrapper.placeholder,
                undefined$1,
                args,
                holders,
                undefined$1,
                undefined$1,
                arity - length
              );
            }
            var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            return apply(fn, this, args);
          }
          return wrapper;
        }
        function createFind(findIndexFunc) {
          return function(collection, predicate, fromIndex) {
            var iterable = Object2(collection);
            if (!isArrayLike(collection)) {
              var iteratee2 = getIteratee(predicate, 3);
              collection = keys(collection);
              predicate = function(key) {
                return iteratee2(iterable[key], key, iterable);
              };
            }
            var index = findIndexFunc(collection, predicate, fromIndex);
            return index > -1 ? iterable[iteratee2 ? collection[index] : index] : undefined$1;
          };
        }
        function createFlow(fromRight) {
          return flatRest(function(funcs) {
            var length = funcs.length, index = length, prereq = LodashWrapper.prototype.thru;
            if (fromRight) {
              funcs.reverse();
            }
            while (index--) {
              var func = funcs[index];
              if (typeof func != "function") {
                throw new TypeError2(FUNC_ERROR_TEXT);
              }
              if (prereq && !wrapper && getFuncName(func) == "wrapper") {
                var wrapper = new LodashWrapper([], true);
              }
            }
            index = wrapper ? index : length;
            while (++index < length) {
              func = funcs[index];
              var funcName = getFuncName(func), data = funcName == "wrapper" ? getData(func) : undefined$1;
              if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
                wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
              } else {
                wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
              }
            }
            return function() {
              var args = arguments, value = args[0];
              if (wrapper && args.length == 1 && isArray(value)) {
                return wrapper.plant(value).value();
              }
              var index2 = 0, result2 = length ? funcs[index2].apply(this, args) : value;
              while (++index2 < length) {
                result2 = funcs[index2].call(this, result2);
              }
              return result2;
            };
          });
        }
        function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
          var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined$1 : createCtor(func);
          function wrapper() {
            var length = arguments.length, args = Array2(length), index = length;
            while (index--) {
              args[index] = arguments[index];
            }
            if (isCurried) {
              var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
            }
            if (partials) {
              args = composeArgs(args, partials, holders, isCurried);
            }
            if (partialsRight) {
              args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
            }
            length -= holdersCount;
            if (isCurried && length < arity) {
              var newHolders = replaceHolders(args, placeholder);
              return createRecurry(
                func,
                bitmask,
                createHybrid,
                wrapper.placeholder,
                thisArg,
                args,
                newHolders,
                argPos,
                ary2,
                arity - length
              );
            }
            var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
            length = args.length;
            if (argPos) {
              args = reorder(args, argPos);
            } else if (isFlip && length > 1) {
              args.reverse();
            }
            if (isAry && ary2 < length) {
              args.length = ary2;
            }
            if (this && this !== root && this instanceof wrapper) {
              fn = Ctor || createCtor(fn);
            }
            return fn.apply(thisBinding, args);
          }
          return wrapper;
        }
        function createInverter(setter, toIteratee) {
          return function(object, iteratee2) {
            return baseInverter(object, setter, toIteratee(iteratee2), {});
          };
        }
        function createMathOperation(operator, defaultValue) {
          return function(value, other) {
            var result2;
            if (value === undefined$1 && other === undefined$1) {
              return defaultValue;
            }
            if (value !== undefined$1) {
              result2 = value;
            }
            if (other !== undefined$1) {
              if (result2 === undefined$1) {
                return other;
              }
              if (typeof value == "string" || typeof other == "string") {
                value = baseToString(value);
                other = baseToString(other);
              } else {
                value = baseToNumber(value);
                other = baseToNumber(other);
              }
              result2 = operator(value, other);
            }
            return result2;
          };
        }
        function createOver(arrayFunc) {
          return flatRest(function(iteratees) {
            iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
            return baseRest(function(args) {
              var thisArg = this;
              return arrayFunc(iteratees, function(iteratee2) {
                return apply(iteratee2, thisArg, args);
              });
            });
          });
        }
        function createPadding(length, chars) {
          chars = chars === undefined$1 ? " " : baseToString(chars);
          var charsLength = chars.length;
          if (charsLength < 2) {
            return charsLength ? baseRepeat(chars, length) : chars;
          }
          var result2 = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
          return hasUnicode(chars) ? castSlice(stringToArray(result2), 0, length).join("") : result2.slice(0, length);
        }
        function createPartial(func, bitmask, thisArg, partials) {
          var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
          function wrapper() {
            var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array2(leftLength + argsLength), fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            while (++leftIndex < leftLength) {
              args[leftIndex] = partials[leftIndex];
            }
            while (argsLength--) {
              args[leftIndex++] = arguments[++argsIndex];
            }
            return apply(fn, isBind ? thisArg : this, args);
          }
          return wrapper;
        }
        function createRange(fromRight) {
          return function(start, end, step) {
            if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
              end = step = undefined$1;
            }
            start = toFinite(start);
            if (end === undefined$1) {
              end = start;
              start = 0;
            } else {
              end = toFinite(end);
            }
            step = step === undefined$1 ? start < end ? 1 : -1 : toFinite(step);
            return baseRange(start, end, step, fromRight);
          };
        }
        function createRelationalOperation(operator) {
          return function(value, other) {
            if (!(typeof value == "string" && typeof other == "string")) {
              value = toNumber(value);
              other = toNumber(other);
            }
            return operator(value, other);
          };
        }
        function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
          var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined$1, newHoldersRight = isCurry ? undefined$1 : holders, newPartials = isCurry ? partials : undefined$1, newPartialsRight = isCurry ? undefined$1 : partials;
          bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
          bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
          if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
            bitmask &= -4;
          }
          var newData = [
            func,
            bitmask,
            thisArg,
            newPartials,
            newHolders,
            newPartialsRight,
            newHoldersRight,
            argPos,
            ary2,
            arity
          ];
          var result2 = wrapFunc.apply(undefined$1, newData);
          if (isLaziable(func)) {
            setData(result2, newData);
          }
          result2.placeholder = placeholder;
          return setWrapToString(result2, func, bitmask);
        }
        function createRound(methodName) {
          var func = Math2[methodName];
          return function(number, precision) {
            number = toNumber(number);
            precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
            if (precision && nativeIsFinite(number)) {
              var pair = (toString(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
              pair = (toString(value) + "e").split("e");
              return +(pair[0] + "e" + (+pair[1] - precision));
            }
            return func(number);
          };
        }
        var createSet = !(Set2 && 1 / setToArray(new Set2([, -0]))[1] == INFINITY) ? noop : function(values2) {
          return new Set2(values2);
        };
        function createToPairs(keysFunc) {
          return function(object) {
            var tag = getTag(object);
            if (tag == mapTag) {
              return mapToArray(object);
            }
            if (tag == setTag) {
              return setToPairs(object);
            }
            return baseToPairs(object, keysFunc(object));
          };
        }
        function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
          var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
          if (!isBindKey && typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          var length = partials ? partials.length : 0;
          if (!length) {
            bitmask &= -97;
            partials = holders = undefined$1;
          }
          ary2 = ary2 === undefined$1 ? ary2 : nativeMax(toInteger(ary2), 0);
          arity = arity === undefined$1 ? arity : toInteger(arity);
          length -= holders ? holders.length : 0;
          if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
            var partialsRight = partials, holdersRight = holders;
            partials = holders = undefined$1;
          }
          var data = isBindKey ? undefined$1 : getData(func);
          var newData = [
            func,
            bitmask,
            thisArg,
            partials,
            holders,
            partialsRight,
            holdersRight,
            argPos,
            ary2,
            arity
          ];
          if (data) {
            mergeData(newData, data);
          }
          func = newData[0];
          bitmask = newData[1];
          thisArg = newData[2];
          partials = newData[3];
          holders = newData[4];
          arity = newData[9] = newData[9] === undefined$1 ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);
          if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
            bitmask &= -25;
          }
          if (!bitmask || bitmask == WRAP_BIND_FLAG) {
            var result2 = createBind(func, bitmask, thisArg);
          } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
            result2 = createCurry(func, bitmask, arity);
          } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
            result2 = createPartial(func, bitmask, thisArg, partials);
          } else {
            result2 = createHybrid.apply(undefined$1, newData);
          }
          var setter = data ? baseSetData : setData;
          return setWrapToString(setter(result2, newData), func, bitmask);
        }
        function customDefaultsAssignIn(objValue, srcValue, key, object) {
          if (objValue === undefined$1 || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
            return srcValue;
          }
          return objValue;
        }
        function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
          if (isObject(objValue) && isObject(srcValue)) {
            stack.set(srcValue, objValue);
            baseMerge(objValue, srcValue, undefined$1, customDefaultsMerge, stack);
            stack["delete"](srcValue);
          }
          return objValue;
        }
        function customOmitClone(value) {
          return isPlainObject(value) ? undefined$1 : value;
        }
        function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
          if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
            return false;
          }
          var arrStacked = stack.get(array);
          var othStacked = stack.get(other);
          if (arrStacked && othStacked) {
            return arrStacked == other && othStacked == array;
          }
          var index = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined$1;
          stack.set(array, other);
          stack.set(other, array);
          while (++index < arrLength) {
            var arrValue = array[index], othValue = other[index];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
            }
            if (compared !== undefined$1) {
              if (compared) {
                continue;
              }
              result2 = false;
              break;
            }
            if (seen) {
              if (!arraySome(other, function(othValue2, othIndex) {
                if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                  return seen.push(othIndex);
                }
              })) {
                result2 = false;
                break;
              }
            } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              result2 = false;
              break;
            }
          }
          stack["delete"](array);
          stack["delete"](other);
          return result2;
        }
        function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
          switch (tag) {
            case dataViewTag:
              if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
                return false;
              }
              object = object.buffer;
              other = other.buffer;
            case arrayBufferTag:
              if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
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
              return object == other + "";
            case mapTag:
              var convert = mapToArray;
            case setTag:
              var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
              convert || (convert = setToArray);
              if (object.size != other.size && !isPartial) {
                return false;
              }
              var stacked = stack.get(object);
              if (stacked) {
                return stacked == other;
              }
              bitmask |= COMPARE_UNORDERED_FLAG;
              stack.set(object, other);
              var result2 = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
              stack["delete"](object);
              return result2;
            case symbolTag:
              if (symbolValueOf) {
                return symbolValueOf.call(object) == symbolValueOf.call(other);
              }
          }
          return false;
        }
        function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
          if (objLength != othLength && !isPartial) {
            return false;
          }
          var index = objLength;
          while (index--) {
            var key = objProps[index];
            if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
              return false;
            }
          }
          var objStacked = stack.get(object);
          var othStacked = stack.get(other);
          if (objStacked && othStacked) {
            return objStacked == other && othStacked == object;
          }
          var result2 = true;
          stack.set(object, other);
          stack.set(other, object);
          var skipCtor = isPartial;
          while (++index < objLength) {
            key = objProps[index];
            var objValue = object[key], othValue = other[key];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
            }
            if (!(compared === undefined$1 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
              result2 = false;
              break;
            }
            skipCtor || (skipCtor = key == "constructor");
          }
          if (result2 && !skipCtor) {
            var objCtor = object.constructor, othCtor = other.constructor;
            if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
              result2 = false;
            }
          }
          stack["delete"](object);
          stack["delete"](other);
          return result2;
        }
        function flatRest(func) {
          return setToString(overRest(func, undefined$1, flatten), func + "");
        }
        function getAllKeys(object) {
          return baseGetAllKeys(object, keys, getSymbols);
        }
        function getAllKeysIn(object) {
          return baseGetAllKeys(object, keysIn, getSymbolsIn);
        }
        var getData = !metaMap ? noop : function(func) {
          return metaMap.get(func);
        };
        function getFuncName(func) {
          var result2 = func.name + "", array = realNames[result2], length = hasOwnProperty.call(realNames, result2) ? array.length : 0;
          while (length--) {
            var data = array[length], otherFunc = data.func;
            if (otherFunc == null || otherFunc == func) {
              return data.name;
            }
          }
          return result2;
        }
        function getHolder(func) {
          var object = hasOwnProperty.call(lodash2, "placeholder") ? lodash2 : func;
          return object.placeholder;
        }
        function getIteratee() {
          var result2 = lodash2.iteratee || iteratee;
          result2 = result2 === iteratee ? baseIteratee : result2;
          return arguments.length ? result2(arguments[0], arguments[1]) : result2;
        }
        function getMapData(map3, key) {
          var data = map3.__data__;
          return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
        }
        function getMatchData(object) {
          var result2 = keys(object), length = result2.length;
          while (length--) {
            var key = result2[length], value = object[key];
            result2[length] = [key, value, isStrictComparable(value)];
          }
          return result2;
        }
        function getNative(object, key) {
          var value = getValue(object, key);
          return baseIsNative(value) ? value : undefined$1;
        }
        function getRawTag(value) {
          var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
          try {
            value[symToStringTag] = undefined$1;
            var unmasked = true;
          } catch (e) {
          }
          var result2 = nativeObjectToString.call(value);
          if (unmasked) {
            if (isOwn) {
              value[symToStringTag] = tag;
            } else {
              delete value[symToStringTag];
            }
          }
          return result2;
        }
        var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
          if (object == null) {
            return [];
          }
          object = Object2(object);
          return arrayFilter(nativeGetSymbols(object), function(symbol) {
            return propertyIsEnumerable.call(object, symbol);
          });
        };
        var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
          var result2 = [];
          while (object) {
            arrayPush(result2, getSymbols(object));
            object = getPrototype(object);
          }
          return result2;
        };
        var getTag = baseGetTag;
        if (DataView2 && getTag(new DataView2(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
          getTag = function(value) {
            var result2 = baseGetTag(value), Ctor = result2 == objectTag ? value.constructor : undefined$1, ctorString = Ctor ? toSource(Ctor) : "";
            if (ctorString) {
              switch (ctorString) {
                case dataViewCtorString:
                  return dataViewTag;
                case mapCtorString:
                  return mapTag;
                case promiseCtorString:
                  return promiseTag;
                case setCtorString:
                  return setTag;
                case weakMapCtorString:
                  return weakMapTag;
              }
            }
            return result2;
          };
        }
        function getView(start, end, transforms) {
          var index = -1, length = transforms.length;
          while (++index < length) {
            var data = transforms[index], size2 = data.size;
            switch (data.type) {
              case "drop":
                start += size2;
                break;
              case "dropRight":
                end -= size2;
                break;
              case "take":
                end = nativeMin(end, start + size2);
                break;
              case "takeRight":
                start = nativeMax(start, end - size2);
                break;
            }
          }
          return { "start": start, "end": end };
        }
        function getWrapDetails(source) {
          var match = source.match(reWrapDetails);
          return match ? match[1].split(reSplitDetails) : [];
        }
        function hasPath(object, path2, hasFunc) {
          path2 = castPath(path2, object);
          var index = -1, length = path2.length, result2 = false;
          while (++index < length) {
            var key = toKey(path2[index]);
            if (!(result2 = object != null && hasFunc(object, key))) {
              break;
            }
            object = object[key];
          }
          if (result2 || ++index != length) {
            return result2;
          }
          length = object == null ? 0 : object.length;
          return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
        }
        function initCloneArray(array) {
          var length = array.length, result2 = new array.constructor(length);
          if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
            result2.index = array.index;
            result2.input = array.input;
          }
          return result2;
        }
        function initCloneObject(object) {
          return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
        }
        function initCloneByTag(object, tag, isDeep) {
          var Ctor = object.constructor;
          switch (tag) {
            case arrayBufferTag:
              return cloneArrayBuffer(object);
            case boolTag:
            case dateTag:
              return new Ctor(+object);
            case dataViewTag:
              return cloneDataView(object, isDeep);
            case float32Tag:
            case float64Tag:
            case int8Tag:
            case int16Tag:
            case int32Tag:
            case uint8Tag:
            case uint8ClampedTag:
            case uint16Tag:
            case uint32Tag:
              return cloneTypedArray(object, isDeep);
            case mapTag:
              return new Ctor();
            case numberTag:
            case stringTag:
              return new Ctor(object);
            case regexpTag:
              return cloneRegExp(object);
            case setTag:
              return new Ctor();
            case symbolTag:
              return cloneSymbol(object);
          }
        }
        function insertWrapDetails(source, details) {
          var length = details.length;
          if (!length) {
            return source;
          }
          var lastIndex = length - 1;
          details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
          details = details.join(length > 2 ? ", " : " ");
          return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
        }
        function isFlattenable(value) {
          return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
        }
        function isIndex(value, length) {
          var type = typeof value;
          length = length == null ? MAX_SAFE_INTEGER : length;
          return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
        }
        function isIterateeCall(value, index, object) {
          if (!isObject(object)) {
            return false;
          }
          var type = typeof index;
          if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
            return eq(object[index], value);
          }
          return false;
        }
        function isKey(value, object) {
          if (isArray(value)) {
            return false;
          }
          var type = typeof value;
          if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
            return true;
          }
          return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object2(object);
        }
        function isKeyable(value) {
          var type = typeof value;
          return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
        }
        function isLaziable(func) {
          var funcName = getFuncName(func), other = lodash2[funcName];
          if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
            return false;
          }
          if (func === other) {
            return true;
          }
          var data = getData(other);
          return !!data && func === data[0];
        }
        function isMasked(func) {
          return !!maskSrcKey && maskSrcKey in func;
        }
        var isMaskable = coreJsData ? isFunction : stubFalse;
        function isPrototype(value) {
          var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
          return value === proto;
        }
        function isStrictComparable(value) {
          return value === value && !isObject(value);
        }
        function matchesStrictComparable(key, srcValue) {
          return function(object) {
            if (object == null) {
              return false;
            }
            return object[key] === srcValue && (srcValue !== undefined$1 || key in Object2(object));
          };
        }
        function memoizeCapped(func) {
          var result2 = memoize(func, function(key) {
            if (cache.size === MAX_MEMOIZE_SIZE) {
              cache.clear();
            }
            return key;
          });
          var cache = result2.cache;
          return result2;
        }
        function mergeData(data, source) {
          var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
          var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
          if (!(isCommon || isCombo)) {
            return data;
          }
          if (srcBitmask & WRAP_BIND_FLAG) {
            data[2] = source[2];
            newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
          }
          var value = source[3];
          if (value) {
            var partials = data[3];
            data[3] = partials ? composeArgs(partials, value, source[4]) : value;
            data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
          }
          value = source[5];
          if (value) {
            partials = data[5];
            data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
            data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
          }
          value = source[7];
          if (value) {
            data[7] = value;
          }
          if (srcBitmask & WRAP_ARY_FLAG) {
            data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
          }
          if (data[9] == null) {
            data[9] = source[9];
          }
          data[0] = source[0];
          data[1] = newBitmask;
          return data;
        }
        function nativeKeysIn(object) {
          var result2 = [];
          if (object != null) {
            for (var key in Object2(object)) {
              result2.push(key);
            }
          }
          return result2;
        }
        function objectToString(value) {
          return nativeObjectToString.call(value);
        }
        function overRest(func, start, transform2) {
          start = nativeMax(start === undefined$1 ? func.length - 1 : start, 0);
          return function() {
            var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array2(length);
            while (++index < length) {
              array[index] = args[start + index];
            }
            index = -1;
            var otherArgs = Array2(start + 1);
            while (++index < start) {
              otherArgs[index] = args[index];
            }
            otherArgs[start] = transform2(array);
            return apply(func, this, otherArgs);
          };
        }
        function parent(object, path2) {
          return path2.length < 2 ? object : baseGet(object, baseSlice(path2, 0, -1));
        }
        function reorder(array, indexes) {
          var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array);
          while (length--) {
            var index = indexes[length];
            array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined$1;
          }
          return array;
        }
        function safeGet(object, key) {
          if (key === "constructor" && typeof object[key] === "function") {
            return;
          }
          if (key == "__proto__") {
            return;
          }
          return object[key];
        }
        var setData = shortOut(baseSetData);
        var setTimeout2 = ctxSetTimeout || function(func, wait) {
          return root.setTimeout(func, wait);
        };
        var setToString = shortOut(baseSetToString);
        function setWrapToString(wrapper, reference, bitmask) {
          var source = reference + "";
          return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
        }
        function shortOut(func) {
          var count = 0, lastCalled = 0;
          return function() {
            var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
            lastCalled = stamp;
            if (remaining > 0) {
              if (++count >= HOT_COUNT) {
                return arguments[0];
              }
            } else {
              count = 0;
            }
            return func.apply(undefined$1, arguments);
          };
        }
        function shuffleSelf(array, size2) {
          var index = -1, length = array.length, lastIndex = length - 1;
          size2 = size2 === undefined$1 ? length : size2;
          while (++index < size2) {
            var rand = baseRandom(index, lastIndex), value = array[rand];
            array[rand] = array[index];
            array[index] = value;
          }
          array.length = size2;
          return array;
        }
        var stringToPath = memoizeCapped(function(string) {
          var result2 = [];
          if (string.charCodeAt(0) === 46) {
            result2.push("");
          }
          string.replace(rePropName, function(match, number, quote, subString) {
            result2.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
          });
          return result2;
        });
        function toKey(value) {
          if (typeof value == "string" || isSymbol(value)) {
            return value;
          }
          var result2 = value + "";
          return result2 == "0" && 1 / value == -Infinity ? "-0" : result2;
        }
        function toSource(func) {
          if (func != null) {
            try {
              return funcToString.call(func);
            } catch (e) {
            }
            try {
              return func + "";
            } catch (e) {
            }
          }
          return "";
        }
        function updateWrapDetails(details, bitmask) {
          arrayEach(wrapFlags, function(pair) {
            var value = "_." + pair[0];
            if (bitmask & pair[1] && !arrayIncludes(details, value)) {
              details.push(value);
            }
          });
          return details.sort();
        }
        function wrapperClone(wrapper) {
          if (wrapper instanceof LazyWrapper) {
            return wrapper.clone();
          }
          var result2 = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
          result2.__actions__ = copyArray(wrapper.__actions__);
          result2.__index__ = wrapper.__index__;
          result2.__values__ = wrapper.__values__;
          return result2;
        }
        function chunk(array, size2, guard) {
          if (guard ? isIterateeCall(array, size2, guard) : size2 === undefined$1) {
            size2 = 1;
          } else {
            size2 = nativeMax(toInteger(size2), 0);
          }
          var length = array == null ? 0 : array.length;
          if (!length || size2 < 1) {
            return [];
          }
          var index = 0, resIndex = 0, result2 = Array2(nativeCeil(length / size2));
          while (index < length) {
            result2[resIndex++] = baseSlice(array, index, index += size2);
          }
          return result2;
        }
        function compact(array) {
          var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result2 = [];
          while (++index < length) {
            var value = array[index];
            if (value) {
              result2[resIndex++] = value;
            }
          }
          return result2;
        }
        function concat() {
          var length = arguments.length;
          if (!length) {
            return [];
          }
          var args = Array2(length - 1), array = arguments[0], index = length;
          while (index--) {
            args[index - 1] = arguments[index];
          }
          return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
        }
        var difference = baseRest(function(array, values2) {
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true)) : [];
        });
        var differenceBy = baseRest(function(array, values2) {
          var iteratee2 = last(values2);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined$1;
          }
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2)) : [];
        });
        var differenceWith = baseRest(function(array, values2) {
          var comparator = last(values2);
          if (isArrayLikeObject(comparator)) {
            comparator = undefined$1;
          }
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), undefined$1, comparator) : [];
        });
        function drop(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined$1 ? 1 : toInteger(n);
          return baseSlice(array, n < 0 ? 0 : n, length);
        }
        function dropRight(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined$1 ? 1 : toInteger(n);
          n = length - n;
          return baseSlice(array, 0, n < 0 ? 0 : n);
        }
        function dropRightWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
        }
        function dropWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
        }
        function fill(array, value, start, end) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          if (start && typeof start != "number" && isIterateeCall(array, value, start)) {
            start = 0;
            end = length;
          }
          return baseFill(array, value, start, end);
        }
        function findIndex(array, predicate, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = fromIndex == null ? 0 : toInteger(fromIndex);
          if (index < 0) {
            index = nativeMax(length + index, 0);
          }
          return baseFindIndex(array, getIteratee(predicate, 3), index);
        }
        function findLastIndex(array, predicate, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = length - 1;
          if (fromIndex !== undefined$1) {
            index = toInteger(fromIndex);
            index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
          }
          return baseFindIndex(array, getIteratee(predicate, 3), index, true);
        }
        function flatten(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseFlatten(array, 1) : [];
        }
        function flattenDeep(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseFlatten(array, INFINITY) : [];
        }
        function flattenDepth(array, depth) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          depth = depth === undefined$1 ? 1 : toInteger(depth);
          return baseFlatten(array, depth);
        }
        function fromPairs(pairs) {
          var index = -1, length = pairs == null ? 0 : pairs.length, result2 = {};
          while (++index < length) {
            var pair = pairs[index];
            result2[pair[0]] = pair[1];
          }
          return result2;
        }
        function head(array) {
          return array && array.length ? array[0] : undefined$1;
        }
        function indexOf(array, value, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = fromIndex == null ? 0 : toInteger(fromIndex);
          if (index < 0) {
            index = nativeMax(length + index, 0);
          }
          return baseIndexOf(array, value, index);
        }
        function initial(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseSlice(array, 0, -1) : [];
        }
        var intersection = baseRest(function(arrays) {
          var mapped = arrayMap(arrays, castArrayLikeObject);
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
        });
        var intersectionBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
          if (iteratee2 === last(mapped)) {
            iteratee2 = undefined$1;
          } else {
            mapped.pop();
          }
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee2, 2)) : [];
        });
        var intersectionWith = baseRest(function(arrays) {
          var comparator = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
          comparator = typeof comparator == "function" ? comparator : undefined$1;
          if (comparator) {
            mapped.pop();
          }
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined$1, comparator) : [];
        });
        function join2(array, separator) {
          return array == null ? "" : nativeJoin.call(array, separator);
        }
        function last(array) {
          var length = array == null ? 0 : array.length;
          return length ? array[length - 1] : undefined$1;
        }
        function lastIndexOf(array, value, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = length;
          if (fromIndex !== undefined$1) {
            index = toInteger(fromIndex);
            index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
          }
          return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true);
        }
        function nth(array, n) {
          return array && array.length ? baseNth(array, toInteger(n)) : undefined$1;
        }
        var pull = baseRest(pullAll);
        function pullAll(array, values2) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2) : array;
        }
        function pullAllBy(array, values2, iteratee2) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2, getIteratee(iteratee2, 2)) : array;
        }
        function pullAllWith(array, values2, comparator) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2, undefined$1, comparator) : array;
        }
        var pullAt = flatRest(function(array, indexes) {
          var length = array == null ? 0 : array.length, result2 = baseAt(array, indexes);
          basePullAt(array, arrayMap(indexes, function(index) {
            return isIndex(index, length) ? +index : index;
          }).sort(compareAscending));
          return result2;
        });
        function remove(array, predicate) {
          var result2 = [];
          if (!(array && array.length)) {
            return result2;
          }
          var index = -1, indexes = [], length = array.length;
          predicate = getIteratee(predicate, 3);
          while (++index < length) {
            var value = array[index];
            if (predicate(value, index, array)) {
              result2.push(value);
              indexes.push(index);
            }
          }
          basePullAt(array, indexes);
          return result2;
        }
        function reverse(array) {
          return array == null ? array : nativeReverse.call(array);
        }
        function slice(array, start, end) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          if (end && typeof end != "number" && isIterateeCall(array, start, end)) {
            start = 0;
            end = length;
          } else {
            start = start == null ? 0 : toInteger(start);
            end = end === undefined$1 ? length : toInteger(end);
          }
          return baseSlice(array, start, end);
        }
        function sortedIndex(array, value) {
          return baseSortedIndex(array, value);
        }
        function sortedIndexBy(array, value, iteratee2) {
          return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2));
        }
        function sortedIndexOf(array, value) {
          var length = array == null ? 0 : array.length;
          if (length) {
            var index = baseSortedIndex(array, value);
            if (index < length && eq(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        function sortedLastIndex(array, value) {
          return baseSortedIndex(array, value, true);
        }
        function sortedLastIndexBy(array, value, iteratee2) {
          return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2), true);
        }
        function sortedLastIndexOf(array, value) {
          var length = array == null ? 0 : array.length;
          if (length) {
            var index = baseSortedIndex(array, value, true) - 1;
            if (eq(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        function sortedUniq(array) {
          return array && array.length ? baseSortedUniq(array) : [];
        }
        function sortedUniqBy(array, iteratee2) {
          return array && array.length ? baseSortedUniq(array, getIteratee(iteratee2, 2)) : [];
        }
        function tail(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseSlice(array, 1, length) : [];
        }
        function take(array, n, guard) {
          if (!(array && array.length)) {
            return [];
          }
          n = guard || n === undefined$1 ? 1 : toInteger(n);
          return baseSlice(array, 0, n < 0 ? 0 : n);
        }
        function takeRight(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined$1 ? 1 : toInteger(n);
          n = length - n;
          return baseSlice(array, n < 0 ? 0 : n, length);
        }
        function takeRightWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
        }
        function takeWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
        }
        var union = baseRest(function(arrays) {
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
        });
        var unionBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined$1;
          }
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2));
        });
        var unionWith = baseRest(function(arrays) {
          var comparator = last(arrays);
          comparator = typeof comparator == "function" ? comparator : undefined$1;
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined$1, comparator);
        });
        function uniq(array) {
          return array && array.length ? baseUniq(array) : [];
        }
        function uniqBy(array, iteratee2) {
          return array && array.length ? baseUniq(array, getIteratee(iteratee2, 2)) : [];
        }
        function uniqWith(array, comparator) {
          comparator = typeof comparator == "function" ? comparator : undefined$1;
          return array && array.length ? baseUniq(array, undefined$1, comparator) : [];
        }
        function unzip(array) {
          if (!(array && array.length)) {
            return [];
          }
          var length = 0;
          array = arrayFilter(array, function(group) {
            if (isArrayLikeObject(group)) {
              length = nativeMax(group.length, length);
              return true;
            }
          });
          return baseTimes(length, function(index) {
            return arrayMap(array, baseProperty(index));
          });
        }
        function unzipWith(array, iteratee2) {
          if (!(array && array.length)) {
            return [];
          }
          var result2 = unzip(array);
          if (iteratee2 == null) {
            return result2;
          }
          return arrayMap(result2, function(group) {
            return apply(iteratee2, undefined$1, group);
          });
        }
        var without = baseRest(function(array, values2) {
          return isArrayLikeObject(array) ? baseDifference(array, values2) : [];
        });
        var xor = baseRest(function(arrays) {
          return baseXor(arrayFilter(arrays, isArrayLikeObject));
        });
        var xorBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined$1;
          }
          return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee2, 2));
        });
        var xorWith = baseRest(function(arrays) {
          var comparator = last(arrays);
          comparator = typeof comparator == "function" ? comparator : undefined$1;
          return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined$1, comparator);
        });
        var zip = baseRest(unzip);
        function zipObject(props2, values2) {
          return baseZipObject(props2 || [], values2 || [], assignValue);
        }
        function zipObjectDeep(props2, values2) {
          return baseZipObject(props2 || [], values2 || [], baseSet);
        }
        var zipWith = baseRest(function(arrays) {
          var length = arrays.length, iteratee2 = length > 1 ? arrays[length - 1] : undefined$1;
          iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : undefined$1;
          return unzipWith(arrays, iteratee2);
        });
        function chain(value) {
          var result2 = lodash2(value);
          result2.__chain__ = true;
          return result2;
        }
        function tap(value, interceptor) {
          interceptor(value);
          return value;
        }
        function thru(value, interceptor) {
          return interceptor(value);
        }
        var wrapperAt = flatRest(function(paths) {
          var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = function(object) {
            return baseAt(object, paths);
          };
          if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
            return this.thru(interceptor);
          }
          value = value.slice(start, +start + (length ? 1 : 0));
          value.__actions__.push({
            "func": thru,
            "args": [interceptor],
            "thisArg": undefined$1
          });
          return new LodashWrapper(value, this.__chain__).thru(function(array) {
            if (length && !array.length) {
              array.push(undefined$1);
            }
            return array;
          });
        });
        function wrapperChain() {
          return chain(this);
        }
        function wrapperCommit() {
          return new LodashWrapper(this.value(), this.__chain__);
        }
        function wrapperNext() {
          if (this.__values__ === undefined$1) {
            this.__values__ = toArray(this.value());
          }
          var done = this.__index__ >= this.__values__.length, value = done ? undefined$1 : this.__values__[this.__index__++];
          return { "done": done, "value": value };
        }
        function wrapperToIterator() {
          return this;
        }
        function wrapperPlant(value) {
          var result2, parent2 = this;
          while (parent2 instanceof baseLodash) {
            var clone2 = wrapperClone(parent2);
            clone2.__index__ = 0;
            clone2.__values__ = undefined$1;
            if (result2) {
              previous.__wrapped__ = clone2;
            } else {
              result2 = clone2;
            }
            var previous = clone2;
            parent2 = parent2.__wrapped__;
          }
          previous.__wrapped__ = value;
          return result2;
        }
        function wrapperReverse() {
          var value = this.__wrapped__;
          if (value instanceof LazyWrapper) {
            var wrapped = value;
            if (this.__actions__.length) {
              wrapped = new LazyWrapper(this);
            }
            wrapped = wrapped.reverse();
            wrapped.__actions__.push({
              "func": thru,
              "args": [reverse],
              "thisArg": undefined$1
            });
            return new LodashWrapper(wrapped, this.__chain__);
          }
          return this.thru(reverse);
        }
        function wrapperValue() {
          return baseWrapperValue(this.__wrapped__, this.__actions__);
        }
        var countBy = createAggregator(function(result2, value, key) {
          if (hasOwnProperty.call(result2, key)) {
            ++result2[key];
          } else {
            baseAssignValue(result2, key, 1);
          }
        });
        function every(collection, predicate, guard) {
          var func = isArray(collection) ? arrayEvery : baseEvery;
          if (guard && isIterateeCall(collection, predicate, guard)) {
            predicate = undefined$1;
          }
          return func(collection, getIteratee(predicate, 3));
        }
        function filter2(collection, predicate) {
          var func = isArray(collection) ? arrayFilter : baseFilter;
          return func(collection, getIteratee(predicate, 3));
        }
        var find = createFind(findIndex);
        var findLast = createFind(findLastIndex);
        function flatMap(collection, iteratee2) {
          return baseFlatten(map2(collection, iteratee2), 1);
        }
        function flatMapDeep(collection, iteratee2) {
          return baseFlatten(map2(collection, iteratee2), INFINITY);
        }
        function flatMapDepth(collection, iteratee2, depth) {
          depth = depth === undefined$1 ? 1 : toInteger(depth);
          return baseFlatten(map2(collection, iteratee2), depth);
        }
        function forEach(collection, iteratee2) {
          var func = isArray(collection) ? arrayEach : baseEach;
          return func(collection, getIteratee(iteratee2, 3));
        }
        function forEachRight(collection, iteratee2) {
          var func = isArray(collection) ? arrayEachRight : baseEachRight;
          return func(collection, getIteratee(iteratee2, 3));
        }
        var groupBy = createAggregator(function(result2, value, key) {
          if (hasOwnProperty.call(result2, key)) {
            result2[key].push(value);
          } else {
            baseAssignValue(result2, key, [value]);
          }
        });
        function includes(collection, value, fromIndex, guard) {
          collection = isArrayLike(collection) ? collection : values(collection);
          fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
          var length = collection.length;
          if (fromIndex < 0) {
            fromIndex = nativeMax(length + fromIndex, 0);
          }
          return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
        }
        var invokeMap = baseRest(function(collection, path2, args) {
          var index = -1, isFunc = typeof path2 == "function", result2 = isArrayLike(collection) ? Array2(collection.length) : [];
          baseEach(collection, function(value) {
            result2[++index] = isFunc ? apply(path2, value, args) : baseInvoke(value, path2, args);
          });
          return result2;
        });
        var keyBy = createAggregator(function(result2, value, key) {
          baseAssignValue(result2, key, value);
        });
        function map2(collection, iteratee2) {
          var func = isArray(collection) ? arrayMap : baseMap;
          return func(collection, getIteratee(iteratee2, 3));
        }
        function orderBy(collection, iteratees, orders, guard) {
          if (collection == null) {
            return [];
          }
          if (!isArray(iteratees)) {
            iteratees = iteratees == null ? [] : [iteratees];
          }
          orders = guard ? undefined$1 : orders;
          if (!isArray(orders)) {
            orders = orders == null ? [] : [orders];
          }
          return baseOrderBy(collection, iteratees, orders);
        }
        var partition = createAggregator(function(result2, value, key) {
          result2[key ? 0 : 1].push(value);
        }, function() {
          return [[], []];
        });
        function reduce2(collection, iteratee2, accumulator) {
          var func = isArray(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
          return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
        }
        function reduceRight(collection, iteratee2, accumulator) {
          var func = isArray(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
          return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
        }
        function reject(collection, predicate) {
          var func = isArray(collection) ? arrayFilter : baseFilter;
          return func(collection, negate(getIteratee(predicate, 3)));
        }
        function sample(collection) {
          var func = isArray(collection) ? arraySample : baseSample;
          return func(collection);
        }
        function sampleSize(collection, n, guard) {
          if (guard ? isIterateeCall(collection, n, guard) : n === undefined$1) {
            n = 1;
          } else {
            n = toInteger(n);
          }
          var func = isArray(collection) ? arraySampleSize : baseSampleSize;
          return func(collection, n);
        }
        function shuffle(collection) {
          var func = isArray(collection) ? arrayShuffle : baseShuffle;
          return func(collection);
        }
        function size(collection) {
          if (collection == null) {
            return 0;
          }
          if (isArrayLike(collection)) {
            return isString(collection) ? stringSize(collection) : collection.length;
          }
          var tag = getTag(collection);
          if (tag == mapTag || tag == setTag) {
            return collection.size;
          }
          return baseKeys(collection).length;
        }
        function some2(collection, predicate, guard) {
          var func = isArray(collection) ? arraySome : baseSome;
          if (guard && isIterateeCall(collection, predicate, guard)) {
            predicate = undefined$1;
          }
          return func(collection, getIteratee(predicate, 3));
        }
        var sortBy = baseRest(function(collection, iteratees) {
          if (collection == null) {
            return [];
          }
          var length = iteratees.length;
          if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
            iteratees = [];
          } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
            iteratees = [iteratees[0]];
          }
          return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
        });
        var now = ctxNow || function() {
          return root.Date.now();
        };
        function after(n, func) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          n = toInteger(n);
          return function() {
            if (--n < 1) {
              return func.apply(this, arguments);
            }
          };
        }
        function ary(func, n, guard) {
          n = guard ? undefined$1 : n;
          n = func && n == null ? func.length : n;
          return createWrap(func, WRAP_ARY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, n);
        }
        function before(n, func) {
          var result2;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          n = toInteger(n);
          return function() {
            if (--n > 0) {
              result2 = func.apply(this, arguments);
            }
            if (n <= 1) {
              func = undefined$1;
            }
            return result2;
          };
        }
        var bind2 = baseRest(function(func, thisArg, partials) {
          var bitmask = WRAP_BIND_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, getHolder(bind2));
            bitmask |= WRAP_PARTIAL_FLAG;
          }
          return createWrap(func, bitmask, thisArg, partials, holders);
        });
        var bindKey = baseRest(function(object, key, partials) {
          var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, getHolder(bindKey));
            bitmask |= WRAP_PARTIAL_FLAG;
          }
          return createWrap(key, bitmask, object, partials, holders);
        });
        function curry(func, arity, guard) {
          arity = guard ? undefined$1 : arity;
          var result2 = createWrap(func, WRAP_CURRY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
          result2.placeholder = curry.placeholder;
          return result2;
        }
        function curryRight(func, arity, guard) {
          arity = guard ? undefined$1 : arity;
          var result2 = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
          result2.placeholder = curryRight.placeholder;
          return result2;
        }
        function debounce(func, wait, options) {
          var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          wait = toNumber(wait) || 0;
          if (isObject(options)) {
            leading = !!options.leading;
            maxing = "maxWait" in options;
            maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
            trailing = "trailing" in options ? !!options.trailing : trailing;
          }
          function invokeFunc(time) {
            var args = lastArgs, thisArg = lastThis;
            lastArgs = lastThis = undefined$1;
            lastInvokeTime = time;
            result2 = func.apply(thisArg, args);
            return result2;
          }
          function leadingEdge(time) {
            lastInvokeTime = time;
            timerId = setTimeout2(timerExpired, wait);
            return leading ? invokeFunc(time) : result2;
          }
          function remainingWait(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
            return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
          }
          function shouldInvoke(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
            return lastCallTime === undefined$1 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
          }
          function timerExpired() {
            var time = now();
            if (shouldInvoke(time)) {
              return trailingEdge(time);
            }
            timerId = setTimeout2(timerExpired, remainingWait(time));
          }
          function trailingEdge(time) {
            timerId = undefined$1;
            if (trailing && lastArgs) {
              return invokeFunc(time);
            }
            lastArgs = lastThis = undefined$1;
            return result2;
          }
          function cancel2() {
            if (timerId !== undefined$1) {
              clearTimeout2(timerId);
            }
            lastInvokeTime = 0;
            lastArgs = lastCallTime = lastThis = timerId = undefined$1;
          }
          function flush() {
            return timerId === undefined$1 ? result2 : trailingEdge(now());
          }
          function debounced() {
            var time = now(), isInvoking = shouldInvoke(time);
            lastArgs = arguments;
            lastThis = this;
            lastCallTime = time;
            if (isInvoking) {
              if (timerId === undefined$1) {
                return leadingEdge(lastCallTime);
              }
              if (maxing) {
                clearTimeout2(timerId);
                timerId = setTimeout2(timerExpired, wait);
                return invokeFunc(lastCallTime);
              }
            }
            if (timerId === undefined$1) {
              timerId = setTimeout2(timerExpired, wait);
            }
            return result2;
          }
          debounced.cancel = cancel2;
          debounced.flush = flush;
          return debounced;
        }
        var defer = baseRest(function(func, args) {
          return baseDelay(func, 1, args);
        });
        var delay = baseRest(function(func, wait, args) {
          return baseDelay(func, toNumber(wait) || 0, args);
        });
        function flip(func) {
          return createWrap(func, WRAP_FLIP_FLAG);
        }
        function memoize(func, resolver) {
          if (typeof func != "function" || resolver != null && typeof resolver != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          var memoized = function() {
            var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
            if (cache.has(key)) {
              return cache.get(key);
            }
            var result2 = func.apply(this, args);
            memoized.cache = cache.set(key, result2) || cache;
            return result2;
          };
          memoized.cache = new (memoize.Cache || MapCache)();
          return memoized;
        }
        memoize.Cache = MapCache;
        function negate(predicate) {
          if (typeof predicate != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          return function() {
            var args = arguments;
            switch (args.length) {
              case 0:
                return !predicate.call(this);
              case 1:
                return !predicate.call(this, args[0]);
              case 2:
                return !predicate.call(this, args[0], args[1]);
              case 3:
                return !predicate.call(this, args[0], args[1], args[2]);
            }
            return !predicate.apply(this, args);
          };
        }
        function once(func) {
          return before(2, func);
        }
        var overArgs = castRest(function(func, transforms) {
          transforms = transforms.length == 1 && isArray(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
          var funcsLength = transforms.length;
          return baseRest(function(args) {
            var index = -1, length = nativeMin(args.length, funcsLength);
            while (++index < length) {
              args[index] = transforms[index].call(this, args[index]);
            }
            return apply(func, this, args);
          });
        });
        var partial = baseRest(function(func, partials) {
          var holders = replaceHolders(partials, getHolder(partial));
          return createWrap(func, WRAP_PARTIAL_FLAG, undefined$1, partials, holders);
        });
        var partialRight = baseRest(function(func, partials) {
          var holders = replaceHolders(partials, getHolder(partialRight));
          return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined$1, partials, holders);
        });
        var rearg = flatRest(function(func, indexes) {
          return createWrap(func, WRAP_REARG_FLAG, undefined$1, undefined$1, undefined$1, indexes);
        });
        function rest(func, start) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          start = start === undefined$1 ? start : toInteger(start);
          return baseRest(func, start);
        }
        function spread(func, start) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          start = start == null ? 0 : nativeMax(toInteger(start), 0);
          return baseRest(function(args) {
            var array = args[start], otherArgs = castSlice(args, 0, start);
            if (array) {
              arrayPush(otherArgs, array);
            }
            return apply(func, this, otherArgs);
          });
        }
        function throttle(func, wait, options) {
          var leading = true, trailing = true;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          if (isObject(options)) {
            leading = "leading" in options ? !!options.leading : leading;
            trailing = "trailing" in options ? !!options.trailing : trailing;
          }
          return debounce(func, wait, {
            "leading": leading,
            "maxWait": wait,
            "trailing": trailing
          });
        }
        function unary(func) {
          return ary(func, 1);
        }
        function wrap(value, wrapper) {
          return partial(castFunction(wrapper), value);
        }
        function castArray() {
          if (!arguments.length) {
            return [];
          }
          var value = arguments[0];
          return isArray(value) ? value : [value];
        }
        function clone(value) {
          return baseClone(value, CLONE_SYMBOLS_FLAG);
        }
        function cloneWith(value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$1;
          return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
        }
        function cloneDeep(value) {
          return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
        }
        function cloneDeepWith(value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$1;
          return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
        }
        function conformsTo(object, source) {
          return source == null || baseConformsTo(object, source, keys(source));
        }
        function eq(value, other) {
          return value === other || value !== value && other !== other;
        }
        var gt = createRelationalOperation(baseGt);
        var gte = createRelationalOperation(function(value, other) {
          return value >= other;
        });
        var isArguments = baseIsArguments(/* @__PURE__ */ function() {
          return arguments;
        }()) ? baseIsArguments : function(value) {
          return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
        };
        var isArray = Array2.isArray;
        var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
        function isArrayLike(value) {
          return value != null && isLength(value.length) && !isFunction(value);
        }
        function isArrayLikeObject(value) {
          return isObjectLike(value) && isArrayLike(value);
        }
        function isBoolean(value) {
          return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
        }
        var isBuffer = nativeIsBuffer || stubFalse;
        var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
        function isElement(value) {
          return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
        }
        function isEmpty(value) {
          if (value == null) {
            return true;
          }
          if (isArrayLike(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
            return !value.length;
          }
          var tag = getTag(value);
          if (tag == mapTag || tag == setTag) {
            return !value.size;
          }
          if (isPrototype(value)) {
            return !baseKeys(value).length;
          }
          for (var key in value) {
            if (hasOwnProperty.call(value, key)) {
              return false;
            }
          }
          return true;
        }
        function isEqual(value, other) {
          return baseIsEqual(value, other);
        }
        function isEqualWith(value, other, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$1;
          var result2 = customizer ? customizer(value, other) : undefined$1;
          return result2 === undefined$1 ? baseIsEqual(value, other, undefined$1, customizer) : !!result2;
        }
        function isError(value) {
          if (!isObjectLike(value)) {
            return false;
          }
          var tag = baseGetTag(value);
          return tag == errorTag || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject(value);
        }
        function isFinite2(value) {
          return typeof value == "number" && nativeIsFinite(value);
        }
        function isFunction(value) {
          if (!isObject(value)) {
            return false;
          }
          var tag = baseGetTag(value);
          return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
        }
        function isInteger(value) {
          return typeof value == "number" && value == toInteger(value);
        }
        function isLength(value) {
          return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
        }
        function isObject(value) {
          var type = typeof value;
          return value != null && (type == "object" || type == "function");
        }
        function isObjectLike(value) {
          return value != null && typeof value == "object";
        }
        var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
        function isMatch(object, source) {
          return object === source || baseIsMatch(object, source, getMatchData(source));
        }
        function isMatchWith(object, source, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$1;
          return baseIsMatch(object, source, getMatchData(source), customizer);
        }
        function isNaN2(value) {
          return isNumber(value) && value != +value;
        }
        function isNative(value) {
          if (isMaskable(value)) {
            throw new Error2(CORE_ERROR_TEXT);
          }
          return baseIsNative(value);
        }
        function isNull(value) {
          return value === null;
        }
        function isNil(value) {
          return value == null;
        }
        function isNumber(value) {
          return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
        }
        function isPlainObject(value) {
          if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
            return false;
          }
          var proto = getPrototype(value);
          if (proto === null) {
            return true;
          }
          var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
          return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
        }
        var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
        function isSafeInteger(value) {
          return isInteger(value) && value >= -9007199254740991 && value <= MAX_SAFE_INTEGER;
        }
        var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
        function isString(value) {
          return typeof value == "string" || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
        }
        function isSymbol(value) {
          return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
        }
        var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
        function isUndefined(value) {
          return value === undefined$1;
        }
        function isWeakMap(value) {
          return isObjectLike(value) && getTag(value) == weakMapTag;
        }
        function isWeakSet(value) {
          return isObjectLike(value) && baseGetTag(value) == weakSetTag;
        }
        var lt = createRelationalOperation(baseLt);
        var lte = createRelationalOperation(function(value, other) {
          return value <= other;
        });
        function toArray(value) {
          if (!value) {
            return [];
          }
          if (isArrayLike(value)) {
            return isString(value) ? stringToArray(value) : copyArray(value);
          }
          if (symIterator && value[symIterator]) {
            return iteratorToArray(value[symIterator]());
          }
          var tag = getTag(value), func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
          return func(value);
        }
        function toFinite(value) {
          if (!value) {
            return value === 0 ? value : 0;
          }
          value = toNumber(value);
          if (value === INFINITY || value === -Infinity) {
            var sign = value < 0 ? -1 : 1;
            return sign * MAX_INTEGER;
          }
          return value === value ? value : 0;
        }
        function toInteger(value) {
          var result2 = toFinite(value), remainder = result2 % 1;
          return result2 === result2 ? remainder ? result2 - remainder : result2 : 0;
        }
        function toLength(value) {
          return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
        }
        function toNumber(value) {
          if (typeof value == "number") {
            return value;
          }
          if (isSymbol(value)) {
            return NAN;
          }
          if (isObject(value)) {
            var other = typeof value.valueOf == "function" ? value.valueOf() : value;
            value = isObject(other) ? other + "" : other;
          }
          if (typeof value != "string") {
            return value === 0 ? value : +value;
          }
          value = baseTrim(value);
          var isBinary = reIsBinary.test(value);
          return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
        }
        function toPlainObject(value) {
          return copyObject(value, keysIn(value));
        }
        function toSafeInteger(value) {
          return value ? baseClamp(toInteger(value), -9007199254740991, MAX_SAFE_INTEGER) : value === 0 ? value : 0;
        }
        function toString(value) {
          return value == null ? "" : baseToString(value);
        }
        var assign = createAssigner(function(object, source) {
          if (isPrototype(source) || isArrayLike(source)) {
            copyObject(source, keys(source), object);
            return;
          }
          for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
              assignValue(object, key, source[key]);
            }
          }
        });
        var assignIn = createAssigner(function(object, source) {
          copyObject(source, keysIn(source), object);
        });
        var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
          copyObject(source, keysIn(source), object, customizer);
        });
        var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
          copyObject(source, keys(source), object, customizer);
        });
        var at = flatRest(baseAt);
        function create(prototype, properties) {
          var result2 = baseCreate(prototype);
          return properties == null ? result2 : baseAssign(result2, properties);
        }
        var defaults2 = baseRest(function(object, sources) {
          object = Object2(object);
          var index = -1;
          var length = sources.length;
          var guard = length > 2 ? sources[2] : undefined$1;
          if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            length = 1;
          }
          while (++index < length) {
            var source = sources[index];
            var props2 = keysIn(source);
            var propsIndex = -1;
            var propsLength = props2.length;
            while (++propsIndex < propsLength) {
              var key = props2[propsIndex];
              var value = object[key];
              if (value === undefined$1 || eq(value, objectProto[key]) && !hasOwnProperty.call(object, key)) {
                object[key] = source[key];
              }
            }
          }
          return object;
        });
        var defaultsDeep = baseRest(function(args) {
          args.push(undefined$1, customDefaultsMerge);
          return apply(mergeWith, undefined$1, args);
        });
        function findKey(object, predicate) {
          return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
        }
        function findLastKey(object, predicate) {
          return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
        }
        function forIn(object, iteratee2) {
          return object == null ? object : baseFor(object, getIteratee(iteratee2, 3), keysIn);
        }
        function forInRight(object, iteratee2) {
          return object == null ? object : baseForRight(object, getIteratee(iteratee2, 3), keysIn);
        }
        function forOwn(object, iteratee2) {
          return object && baseForOwn(object, getIteratee(iteratee2, 3));
        }
        function forOwnRight(object, iteratee2) {
          return object && baseForOwnRight(object, getIteratee(iteratee2, 3));
        }
        function functions(object) {
          return object == null ? [] : baseFunctions(object, keys(object));
        }
        function functionsIn(object) {
          return object == null ? [] : baseFunctions(object, keysIn(object));
        }
        function get(object, path2, defaultValue) {
          var result2 = object == null ? undefined$1 : baseGet(object, path2);
          return result2 === undefined$1 ? defaultValue : result2;
        }
        function has(object, path2) {
          return object != null && hasPath(object, path2, baseHas);
        }
        function hasIn(object, path2) {
          return object != null && hasPath(object, path2, baseHasIn);
        }
        var invert = createInverter(function(result2, value, key) {
          if (value != null && typeof value.toString != "function") {
            value = nativeObjectToString.call(value);
          }
          result2[value] = key;
        }, constant(identity));
        var invertBy = createInverter(function(result2, value, key) {
          if (value != null && typeof value.toString != "function") {
            value = nativeObjectToString.call(value);
          }
          if (hasOwnProperty.call(result2, value)) {
            result2[value].push(key);
          } else {
            result2[value] = [key];
          }
        }, getIteratee);
        var invoke = baseRest(baseInvoke);
        function keys(object) {
          return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
        }
        function keysIn(object) {
          return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
        }
        function mapKeys(object, iteratee2) {
          var result2 = {};
          iteratee2 = getIteratee(iteratee2, 3);
          baseForOwn(object, function(value, key, object2) {
            baseAssignValue(result2, iteratee2(value, key, object2), value);
          });
          return result2;
        }
        function mapValues(object, iteratee2) {
          var result2 = {};
          iteratee2 = getIteratee(iteratee2, 3);
          baseForOwn(object, function(value, key, object2) {
            baseAssignValue(result2, key, iteratee2(value, key, object2));
          });
          return result2;
        }
        var merge = createAssigner(function(object, source, srcIndex) {
          baseMerge(object, source, srcIndex);
        });
        var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
          baseMerge(object, source, srcIndex, customizer);
        });
        var omit = flatRest(function(object, paths) {
          var result2 = {};
          if (object == null) {
            return result2;
          }
          var isDeep = false;
          paths = arrayMap(paths, function(path2) {
            path2 = castPath(path2, object);
            isDeep || (isDeep = path2.length > 1);
            return path2;
          });
          copyObject(object, getAllKeysIn(object), result2);
          if (isDeep) {
            result2 = baseClone(result2, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
          }
          var length = paths.length;
          while (length--) {
            baseUnset(result2, paths[length]);
          }
          return result2;
        });
        function omitBy(object, predicate) {
          return pickBy(object, negate(getIteratee(predicate)));
        }
        var pick = flatRest(function(object, paths) {
          return object == null ? {} : basePick(object, paths);
        });
        function pickBy(object, predicate) {
          if (object == null) {
            return {};
          }
          var props2 = arrayMap(getAllKeysIn(object), function(prop) {
            return [prop];
          });
          predicate = getIteratee(predicate);
          return basePickBy(object, props2, function(value, path2) {
            return predicate(value, path2[0]);
          });
        }
        function result(object, path2, defaultValue) {
          path2 = castPath(path2, object);
          var index = -1, length = path2.length;
          if (!length) {
            length = 1;
            object = undefined$1;
          }
          while (++index < length) {
            var value = object == null ? undefined$1 : object[toKey(path2[index])];
            if (value === undefined$1) {
              index = length;
              value = defaultValue;
            }
            object = isFunction(value) ? value.call(object) : value;
          }
          return object;
        }
        function set(object, path2, value) {
          return object == null ? object : baseSet(object, path2, value);
        }
        function setWith(object, path2, value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$1;
          return object == null ? object : baseSet(object, path2, value, customizer);
        }
        var toPairs = createToPairs(keys);
        var toPairsIn = createToPairs(keysIn);
        function transform(object, iteratee2, accumulator) {
          var isArr = isArray(object), isArrLike = isArr || isBuffer(object) || isTypedArray(object);
          iteratee2 = getIteratee(iteratee2, 4);
          if (accumulator == null) {
            var Ctor = object && object.constructor;
            if (isArrLike) {
              accumulator = isArr ? new Ctor() : [];
            } else if (isObject(object)) {
              accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
            } else {
              accumulator = {};
            }
          }
          (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object2) {
            return iteratee2(accumulator, value, index, object2);
          });
          return accumulator;
        }
        function unset(object, path2) {
          return object == null ? true : baseUnset(object, path2);
        }
        function update(object, path2, updater) {
          return object == null ? object : baseUpdate(object, path2, castFunction(updater));
        }
        function updateWith(object, path2, updater, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$1;
          return object == null ? object : baseUpdate(object, path2, castFunction(updater), customizer);
        }
        function values(object) {
          return object == null ? [] : baseValues(object, keys(object));
        }
        function valuesIn(object) {
          return object == null ? [] : baseValues(object, keysIn(object));
        }
        function clamp(number, lower, upper) {
          if (upper === undefined$1) {
            upper = lower;
            lower = undefined$1;
          }
          if (upper !== undefined$1) {
            upper = toNumber(upper);
            upper = upper === upper ? upper : 0;
          }
          if (lower !== undefined$1) {
            lower = toNumber(lower);
            lower = lower === lower ? lower : 0;
          }
          return baseClamp(toNumber(number), lower, upper);
        }
        function inRange(number, start, end) {
          start = toFinite(start);
          if (end === undefined$1) {
            end = start;
            start = 0;
          } else {
            end = toFinite(end);
          }
          number = toNumber(number);
          return baseInRange(number, start, end);
        }
        function random(lower, upper, floating) {
          if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
            upper = floating = undefined$1;
          }
          if (floating === undefined$1) {
            if (typeof upper == "boolean") {
              floating = upper;
              upper = undefined$1;
            } else if (typeof lower == "boolean") {
              floating = lower;
              lower = undefined$1;
            }
          }
          if (lower === undefined$1 && upper === undefined$1) {
            lower = 0;
            upper = 1;
          } else {
            lower = toFinite(lower);
            if (upper === undefined$1) {
              upper = lower;
              lower = 0;
            } else {
              upper = toFinite(upper);
            }
          }
          if (lower > upper) {
            var temp = lower;
            lower = upper;
            upper = temp;
          }
          if (floating || lower % 1 || upper % 1) {
            var rand = nativeRandom();
            return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
          }
          return baseRandom(lower, upper);
        }
        var camelCase = createCompounder(function(result2, word, index) {
          word = word.toLowerCase();
          return result2 + (index ? capitalize(word) : word);
        });
        function capitalize(string) {
          return upperFirst(toString(string).toLowerCase());
        }
        function deburr(string) {
          string = toString(string);
          return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
        }
        function endsWith(string, target, position) {
          string = toString(string);
          target = baseToString(target);
          var length = string.length;
          position = position === undefined$1 ? length : baseClamp(toInteger(position), 0, length);
          var end = position;
          position -= target.length;
          return position >= 0 && string.slice(position, end) == target;
        }
        function escape(string) {
          string = toString(string);
          return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
        }
        function escapeRegExp(string) {
          string = toString(string);
          return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
        }
        var kebabCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? "-" : "") + word.toLowerCase();
        });
        var lowerCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + word.toLowerCase();
        });
        var lowerFirst = createCaseFirst("toLowerCase");
        function pad(string, length, chars) {
          string = toString(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          if (!length || strLength >= length) {
            return string;
          }
          var mid = (length - strLength) / 2;
          return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
        }
        function padEnd(string, length, chars) {
          string = toString(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
        }
        function padStart(string, length, chars) {
          string = toString(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
        }
        function parseInt2(string, radix, guard) {
          if (guard || radix == null) {
            radix = 0;
          } else if (radix) {
            radix = +radix;
          }
          return nativeParseInt(toString(string).replace(reTrimStart, ""), radix || 0);
        }
        function repeat(string, n, guard) {
          if (guard ? isIterateeCall(string, n, guard) : n === undefined$1) {
            n = 1;
          } else {
            n = toInteger(n);
          }
          return baseRepeat(toString(string), n);
        }
        function replace() {
          var args = arguments, string = toString(args[0]);
          return args.length < 3 ? string : string.replace(args[1], args[2]);
        }
        var snakeCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? "_" : "") + word.toLowerCase();
        });
        function split(string, separator, limit) {
          if (limit && typeof limit != "number" && isIterateeCall(string, separator, limit)) {
            separator = limit = undefined$1;
          }
          limit = limit === undefined$1 ? MAX_ARRAY_LENGTH : limit >>> 0;
          if (!limit) {
            return [];
          }
          string = toString(string);
          if (string && (typeof separator == "string" || separator != null && !isRegExp(separator))) {
            separator = baseToString(separator);
            if (!separator && hasUnicode(string)) {
              return castSlice(stringToArray(string), 0, limit);
            }
          }
          return string.split(separator, limit);
        }
        var startCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + upperFirst(word);
        });
        function startsWith(string, target, position) {
          string = toString(string);
          position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
          target = baseToString(target);
          return string.slice(position, position + target.length) == target;
        }
        function template(string, options, guard) {
          var settings = lodash2.templateSettings;
          if (guard && isIterateeCall(string, options, guard)) {
            options = undefined$1;
          }
          string = toString(string);
          options = assignInWith({}, options, settings, customDefaultsAssignIn);
          var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
          var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
          var reDelimiters = RegExp2(
            (options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$",
            "g"
          );
          var sourceURL = "//# sourceURL=" + (hasOwnProperty.call(options, "sourceURL") ? (options.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
          string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
            interpolateValue || (interpolateValue = esTemplateValue);
            source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
            if (escapeValue) {
              isEscaping = true;
              source += "' +\n__e(" + escapeValue + ") +\n'";
            }
            if (evaluateValue) {
              isEvaluating = true;
              source += "';\n" + evaluateValue + ";\n__p += '";
            }
            if (interpolateValue) {
              source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
            }
            index = offset + match.length;
            return match;
          });
          source += "';\n";
          var variable = hasOwnProperty.call(options, "variable") && options.variable;
          if (!variable) {
            source = "with (obj) {\n" + source + "\n}\n";
          } else if (reForbiddenIdentifierChars.test(variable)) {
            throw new Error2(INVALID_TEMPL_VAR_ERROR_TEXT);
          }
          source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
          source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
          var result2 = attempt(function() {
            return Function2(importsKeys, sourceURL + "return " + source).apply(undefined$1, importsValues);
          });
          result2.source = source;
          if (isError(result2)) {
            throw result2;
          }
          return result2;
        }
        function toLower(value) {
          return toString(value).toLowerCase();
        }
        function toUpper(value) {
          return toString(value).toUpperCase();
        }
        function trim(string, chars, guard) {
          string = toString(string);
          if (string && (guard || chars === undefined$1)) {
            return baseTrim(string);
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
          return castSlice(strSymbols, start, end).join("");
        }
        function trimEnd(string, chars, guard) {
          string = toString(string);
          if (string && (guard || chars === undefined$1)) {
            return string.slice(0, trimmedEndIndex(string) + 1);
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
          return castSlice(strSymbols, 0, end).join("");
        }
        function trimStart(string, chars, guard) {
          string = toString(string);
          if (string && (guard || chars === undefined$1)) {
            return string.replace(reTrimStart, "");
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), start = charsStartIndex(strSymbols, stringToArray(chars));
          return castSlice(strSymbols, start).join("");
        }
        function truncate(string, options) {
          var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
          if (isObject(options)) {
            var separator = "separator" in options ? options.separator : separator;
            length = "length" in options ? toInteger(options.length) : length;
            omission = "omission" in options ? baseToString(options.omission) : omission;
          }
          string = toString(string);
          var strLength = string.length;
          if (hasUnicode(string)) {
            var strSymbols = stringToArray(string);
            strLength = strSymbols.length;
          }
          if (length >= strLength) {
            return string;
          }
          var end = length - stringSize(omission);
          if (end < 1) {
            return omission;
          }
          var result2 = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end);
          if (separator === undefined$1) {
            return result2 + omission;
          }
          if (strSymbols) {
            end += result2.length - end;
          }
          if (isRegExp(separator)) {
            if (string.slice(end).search(separator)) {
              var match, substring = result2;
              if (!separator.global) {
                separator = RegExp2(separator.source, toString(reFlags.exec(separator)) + "g");
              }
              separator.lastIndex = 0;
              while (match = separator.exec(substring)) {
                var newEnd = match.index;
              }
              result2 = result2.slice(0, newEnd === undefined$1 ? end : newEnd);
            }
          } else if (string.indexOf(baseToString(separator), end) != end) {
            var index = result2.lastIndexOf(separator);
            if (index > -1) {
              result2 = result2.slice(0, index);
            }
          }
          return result2 + omission;
        }
        function unescape(string) {
          string = toString(string);
          return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
        }
        var upperCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + word.toUpperCase();
        });
        var upperFirst = createCaseFirst("toUpperCase");
        function words(string, pattern, guard) {
          string = toString(string);
          pattern = guard ? undefined$1 : pattern;
          if (pattern === undefined$1) {
            return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
          }
          return string.match(pattern) || [];
        }
        var attempt = baseRest(function(func, args) {
          try {
            return apply(func, undefined$1, args);
          } catch (e) {
            return isError(e) ? e : new Error2(e);
          }
        });
        var bindAll = flatRest(function(object, methodNames) {
          arrayEach(methodNames, function(key) {
            key = toKey(key);
            baseAssignValue(object, key, bind2(object[key], object));
          });
          return object;
        });
        function cond(pairs) {
          var length = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
          pairs = !length ? [] : arrayMap(pairs, function(pair) {
            if (typeof pair[1] != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            return [toIteratee(pair[0]), pair[1]];
          });
          return baseRest(function(args) {
            var index = -1;
            while (++index < length) {
              var pair = pairs[index];
              if (apply(pair[0], this, args)) {
                return apply(pair[1], this, args);
              }
            }
          });
        }
        function conforms(source) {
          return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
        }
        function constant(value) {
          return function() {
            return value;
          };
        }
        function defaultTo(value, defaultValue) {
          return value == null || value !== value ? defaultValue : value;
        }
        var flow = createFlow();
        var flowRight = createFlow(true);
        function identity(value) {
          return value;
        }
        function iteratee(func) {
          return baseIteratee(typeof func == "function" ? func : baseClone(func, CLONE_DEEP_FLAG));
        }
        function matches(source) {
          return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
        }
        function matchesProperty(path2, srcValue) {
          return baseMatchesProperty(path2, baseClone(srcValue, CLONE_DEEP_FLAG));
        }
        var method2 = baseRest(function(path2, args) {
          return function(object) {
            return baseInvoke(object, path2, args);
          };
        });
        var methodOf = baseRest(function(object, args) {
          return function(path2) {
            return baseInvoke(object, path2, args);
          };
        });
        function mixin(object, source, options) {
          var props2 = keys(source), methodNames = baseFunctions(source, props2);
          if (options == null && !(isObject(source) && (methodNames.length || !props2.length))) {
            options = source;
            source = object;
            object = this;
            methodNames = baseFunctions(source, keys(source));
          }
          var chain2 = !(isObject(options) && "chain" in options) || !!options.chain, isFunc = isFunction(object);
          arrayEach(methodNames, function(methodName) {
            var func = source[methodName];
            object[methodName] = func;
            if (isFunc) {
              object.prototype[methodName] = function() {
                var chainAll = this.__chain__;
                if (chain2 || chainAll) {
                  var result2 = object(this.__wrapped__), actions = result2.__actions__ = copyArray(this.__actions__);
                  actions.push({ "func": func, "args": arguments, "thisArg": object });
                  result2.__chain__ = chainAll;
                  return result2;
                }
                return func.apply(object, arrayPush([this.value()], arguments));
              };
            }
          });
          return object;
        }
        function noConflict() {
          if (root._ === this) {
            root._ = oldDash;
          }
          return this;
        }
        function noop() {
        }
        function nthArg(n) {
          n = toInteger(n);
          return baseRest(function(args) {
            return baseNth(args, n);
          });
        }
        var over = createOver(arrayMap);
        var overEvery = createOver(arrayEvery);
        var overSome = createOver(arraySome);
        function property(path2) {
          return isKey(path2) ? baseProperty(toKey(path2)) : basePropertyDeep(path2);
        }
        function propertyOf(object) {
          return function(path2) {
            return object == null ? undefined$1 : baseGet(object, path2);
          };
        }
        var range = createRange();
        var rangeRight = createRange(true);
        function stubArray() {
          return [];
        }
        function stubFalse() {
          return false;
        }
        function stubObject() {
          return {};
        }
        function stubString() {
          return "";
        }
        function stubTrue() {
          return true;
        }
        function times(n, iteratee2) {
          n = toInteger(n);
          if (n < 1 || n > MAX_SAFE_INTEGER) {
            return [];
          }
          var index = MAX_ARRAY_LENGTH, length = nativeMin(n, MAX_ARRAY_LENGTH);
          iteratee2 = getIteratee(iteratee2);
          n -= MAX_ARRAY_LENGTH;
          var result2 = baseTimes(length, iteratee2);
          while (++index < n) {
            iteratee2(index);
          }
          return result2;
        }
        function toPath(value) {
          if (isArray(value)) {
            return arrayMap(value, toKey);
          }
          return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
        }
        function uniqueId(prefix) {
          var id = ++idCounter;
          return toString(prefix) + id;
        }
        var add = createMathOperation(function(augend, addend) {
          return augend + addend;
        }, 0);
        var ceil = createRound("ceil");
        var divide = createMathOperation(function(dividend, divisor) {
          return dividend / divisor;
        }, 1);
        var floor = createRound("floor");
        function max(array) {
          return array && array.length ? baseExtremum(array, identity, baseGt) : undefined$1;
        }
        function maxBy(array, iteratee2) {
          return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseGt) : undefined$1;
        }
        function mean(array) {
          return baseMean(array, identity);
        }
        function meanBy(array, iteratee2) {
          return baseMean(array, getIteratee(iteratee2, 2));
        }
        function min(array) {
          return array && array.length ? baseExtremum(array, identity, baseLt) : undefined$1;
        }
        function minBy(array, iteratee2) {
          return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseLt) : undefined$1;
        }
        var multiply = createMathOperation(function(multiplier, multiplicand) {
          return multiplier * multiplicand;
        }, 1);
        var round = createRound("round");
        var subtract = createMathOperation(function(minuend, subtrahend) {
          return minuend - subtrahend;
        }, 0);
        function sum(array) {
          return array && array.length ? baseSum(array, identity) : 0;
        }
        function sumBy(array, iteratee2) {
          return array && array.length ? baseSum(array, getIteratee(iteratee2, 2)) : 0;
        }
        lodash2.after = after;
        lodash2.ary = ary;
        lodash2.assign = assign;
        lodash2.assignIn = assignIn;
        lodash2.assignInWith = assignInWith;
        lodash2.assignWith = assignWith;
        lodash2.at = at;
        lodash2.before = before;
        lodash2.bind = bind2;
        lodash2.bindAll = bindAll;
        lodash2.bindKey = bindKey;
        lodash2.castArray = castArray;
        lodash2.chain = chain;
        lodash2.chunk = chunk;
        lodash2.compact = compact;
        lodash2.concat = concat;
        lodash2.cond = cond;
        lodash2.conforms = conforms;
        lodash2.constant = constant;
        lodash2.countBy = countBy;
        lodash2.create = create;
        lodash2.curry = curry;
        lodash2.curryRight = curryRight;
        lodash2.debounce = debounce;
        lodash2.defaults = defaults2;
        lodash2.defaultsDeep = defaultsDeep;
        lodash2.defer = defer;
        lodash2.delay = delay;
        lodash2.difference = difference;
        lodash2.differenceBy = differenceBy;
        lodash2.differenceWith = differenceWith;
        lodash2.drop = drop;
        lodash2.dropRight = dropRight;
        lodash2.dropRightWhile = dropRightWhile;
        lodash2.dropWhile = dropWhile;
        lodash2.fill = fill;
        lodash2.filter = filter2;
        lodash2.flatMap = flatMap;
        lodash2.flatMapDeep = flatMapDeep;
        lodash2.flatMapDepth = flatMapDepth;
        lodash2.flatten = flatten;
        lodash2.flattenDeep = flattenDeep;
        lodash2.flattenDepth = flattenDepth;
        lodash2.flip = flip;
        lodash2.flow = flow;
        lodash2.flowRight = flowRight;
        lodash2.fromPairs = fromPairs;
        lodash2.functions = functions;
        lodash2.functionsIn = functionsIn;
        lodash2.groupBy = groupBy;
        lodash2.initial = initial;
        lodash2.intersection = intersection;
        lodash2.intersectionBy = intersectionBy;
        lodash2.intersectionWith = intersectionWith;
        lodash2.invert = invert;
        lodash2.invertBy = invertBy;
        lodash2.invokeMap = invokeMap;
        lodash2.iteratee = iteratee;
        lodash2.keyBy = keyBy;
        lodash2.keys = keys;
        lodash2.keysIn = keysIn;
        lodash2.map = map2;
        lodash2.mapKeys = mapKeys;
        lodash2.mapValues = mapValues;
        lodash2.matches = matches;
        lodash2.matchesProperty = matchesProperty;
        lodash2.memoize = memoize;
        lodash2.merge = merge;
        lodash2.mergeWith = mergeWith;
        lodash2.method = method2;
        lodash2.methodOf = methodOf;
        lodash2.mixin = mixin;
        lodash2.negate = negate;
        lodash2.nthArg = nthArg;
        lodash2.omit = omit;
        lodash2.omitBy = omitBy;
        lodash2.once = once;
        lodash2.orderBy = orderBy;
        lodash2.over = over;
        lodash2.overArgs = overArgs;
        lodash2.overEvery = overEvery;
        lodash2.overSome = overSome;
        lodash2.partial = partial;
        lodash2.partialRight = partialRight;
        lodash2.partition = partition;
        lodash2.pick = pick;
        lodash2.pickBy = pickBy;
        lodash2.property = property;
        lodash2.propertyOf = propertyOf;
        lodash2.pull = pull;
        lodash2.pullAll = pullAll;
        lodash2.pullAllBy = pullAllBy;
        lodash2.pullAllWith = pullAllWith;
        lodash2.pullAt = pullAt;
        lodash2.range = range;
        lodash2.rangeRight = rangeRight;
        lodash2.rearg = rearg;
        lodash2.reject = reject;
        lodash2.remove = remove;
        lodash2.rest = rest;
        lodash2.reverse = reverse;
        lodash2.sampleSize = sampleSize;
        lodash2.set = set;
        lodash2.setWith = setWith;
        lodash2.shuffle = shuffle;
        lodash2.slice = slice;
        lodash2.sortBy = sortBy;
        lodash2.sortedUniq = sortedUniq;
        lodash2.sortedUniqBy = sortedUniqBy;
        lodash2.split = split;
        lodash2.spread = spread;
        lodash2.tail = tail;
        lodash2.take = take;
        lodash2.takeRight = takeRight;
        lodash2.takeRightWhile = takeRightWhile;
        lodash2.takeWhile = takeWhile;
        lodash2.tap = tap;
        lodash2.throttle = throttle;
        lodash2.thru = thru;
        lodash2.toArray = toArray;
        lodash2.toPairs = toPairs;
        lodash2.toPairsIn = toPairsIn;
        lodash2.toPath = toPath;
        lodash2.toPlainObject = toPlainObject;
        lodash2.transform = transform;
        lodash2.unary = unary;
        lodash2.union = union;
        lodash2.unionBy = unionBy;
        lodash2.unionWith = unionWith;
        lodash2.uniq = uniq;
        lodash2.uniqBy = uniqBy;
        lodash2.uniqWith = uniqWith;
        lodash2.unset = unset;
        lodash2.unzip = unzip;
        lodash2.unzipWith = unzipWith;
        lodash2.update = update;
        lodash2.updateWith = updateWith;
        lodash2.values = values;
        lodash2.valuesIn = valuesIn;
        lodash2.without = without;
        lodash2.words = words;
        lodash2.wrap = wrap;
        lodash2.xor = xor;
        lodash2.xorBy = xorBy;
        lodash2.xorWith = xorWith;
        lodash2.zip = zip;
        lodash2.zipObject = zipObject;
        lodash2.zipObjectDeep = zipObjectDeep;
        lodash2.zipWith = zipWith;
        lodash2.entries = toPairs;
        lodash2.entriesIn = toPairsIn;
        lodash2.extend = assignIn;
        lodash2.extendWith = assignInWith;
        mixin(lodash2, lodash2);
        lodash2.add = add;
        lodash2.attempt = attempt;
        lodash2.camelCase = camelCase;
        lodash2.capitalize = capitalize;
        lodash2.ceil = ceil;
        lodash2.clamp = clamp;
        lodash2.clone = clone;
        lodash2.cloneDeep = cloneDeep;
        lodash2.cloneDeepWith = cloneDeepWith;
        lodash2.cloneWith = cloneWith;
        lodash2.conformsTo = conformsTo;
        lodash2.deburr = deburr;
        lodash2.defaultTo = defaultTo;
        lodash2.divide = divide;
        lodash2.endsWith = endsWith;
        lodash2.eq = eq;
        lodash2.escape = escape;
        lodash2.escapeRegExp = escapeRegExp;
        lodash2.every = every;
        lodash2.find = find;
        lodash2.findIndex = findIndex;
        lodash2.findKey = findKey;
        lodash2.findLast = findLast;
        lodash2.findLastIndex = findLastIndex;
        lodash2.findLastKey = findLastKey;
        lodash2.floor = floor;
        lodash2.forEach = forEach;
        lodash2.forEachRight = forEachRight;
        lodash2.forIn = forIn;
        lodash2.forInRight = forInRight;
        lodash2.forOwn = forOwn;
        lodash2.forOwnRight = forOwnRight;
        lodash2.get = get;
        lodash2.gt = gt;
        lodash2.gte = gte;
        lodash2.has = has;
        lodash2.hasIn = hasIn;
        lodash2.head = head;
        lodash2.identity = identity;
        lodash2.includes = includes;
        lodash2.indexOf = indexOf;
        lodash2.inRange = inRange;
        lodash2.invoke = invoke;
        lodash2.isArguments = isArguments;
        lodash2.isArray = isArray;
        lodash2.isArrayBuffer = isArrayBuffer;
        lodash2.isArrayLike = isArrayLike;
        lodash2.isArrayLikeObject = isArrayLikeObject;
        lodash2.isBoolean = isBoolean;
        lodash2.isBuffer = isBuffer;
        lodash2.isDate = isDate;
        lodash2.isElement = isElement;
        lodash2.isEmpty = isEmpty;
        lodash2.isEqual = isEqual;
        lodash2.isEqualWith = isEqualWith;
        lodash2.isError = isError;
        lodash2.isFinite = isFinite2;
        lodash2.isFunction = isFunction;
        lodash2.isInteger = isInteger;
        lodash2.isLength = isLength;
        lodash2.isMap = isMap;
        lodash2.isMatch = isMatch;
        lodash2.isMatchWith = isMatchWith;
        lodash2.isNaN = isNaN2;
        lodash2.isNative = isNative;
        lodash2.isNil = isNil;
        lodash2.isNull = isNull;
        lodash2.isNumber = isNumber;
        lodash2.isObject = isObject;
        lodash2.isObjectLike = isObjectLike;
        lodash2.isPlainObject = isPlainObject;
        lodash2.isRegExp = isRegExp;
        lodash2.isSafeInteger = isSafeInteger;
        lodash2.isSet = isSet;
        lodash2.isString = isString;
        lodash2.isSymbol = isSymbol;
        lodash2.isTypedArray = isTypedArray;
        lodash2.isUndefined = isUndefined;
        lodash2.isWeakMap = isWeakMap;
        lodash2.isWeakSet = isWeakSet;
        lodash2.join = join2;
        lodash2.kebabCase = kebabCase;
        lodash2.last = last;
        lodash2.lastIndexOf = lastIndexOf;
        lodash2.lowerCase = lowerCase;
        lodash2.lowerFirst = lowerFirst;
        lodash2.lt = lt;
        lodash2.lte = lte;
        lodash2.max = max;
        lodash2.maxBy = maxBy;
        lodash2.mean = mean;
        lodash2.meanBy = meanBy;
        lodash2.min = min;
        lodash2.minBy = minBy;
        lodash2.stubArray = stubArray;
        lodash2.stubFalse = stubFalse;
        lodash2.stubObject = stubObject;
        lodash2.stubString = stubString;
        lodash2.stubTrue = stubTrue;
        lodash2.multiply = multiply;
        lodash2.nth = nth;
        lodash2.noConflict = noConflict;
        lodash2.noop = noop;
        lodash2.now = now;
        lodash2.pad = pad;
        lodash2.padEnd = padEnd;
        lodash2.padStart = padStart;
        lodash2.parseInt = parseInt2;
        lodash2.random = random;
        lodash2.reduce = reduce2;
        lodash2.reduceRight = reduceRight;
        lodash2.repeat = repeat;
        lodash2.replace = replace;
        lodash2.result = result;
        lodash2.round = round;
        lodash2.runInContext = runInContext2;
        lodash2.sample = sample;
        lodash2.size = size;
        lodash2.snakeCase = snakeCase;
        lodash2.some = some2;
        lodash2.sortedIndex = sortedIndex;
        lodash2.sortedIndexBy = sortedIndexBy;
        lodash2.sortedIndexOf = sortedIndexOf;
        lodash2.sortedLastIndex = sortedLastIndex;
        lodash2.sortedLastIndexBy = sortedLastIndexBy;
        lodash2.sortedLastIndexOf = sortedLastIndexOf;
        lodash2.startCase = startCase;
        lodash2.startsWith = startsWith;
        lodash2.subtract = subtract;
        lodash2.sum = sum;
        lodash2.sumBy = sumBy;
        lodash2.template = template;
        lodash2.times = times;
        lodash2.toFinite = toFinite;
        lodash2.toInteger = toInteger;
        lodash2.toLength = toLength;
        lodash2.toLower = toLower;
        lodash2.toNumber = toNumber;
        lodash2.toSafeInteger = toSafeInteger;
        lodash2.toString = toString;
        lodash2.toUpper = toUpper;
        lodash2.trim = trim;
        lodash2.trimEnd = trimEnd;
        lodash2.trimStart = trimStart;
        lodash2.truncate = truncate;
        lodash2.unescape = unescape;
        lodash2.uniqueId = uniqueId;
        lodash2.upperCase = upperCase;
        lodash2.upperFirst = upperFirst;
        lodash2.each = forEach;
        lodash2.eachRight = forEachRight;
        lodash2.first = head;
        mixin(lodash2, function() {
          var source = {};
          baseForOwn(lodash2, function(func, methodName) {
            if (!hasOwnProperty.call(lodash2.prototype, methodName)) {
              source[methodName] = func;
            }
          });
          return source;
        }(), { "chain": false });
        lodash2.VERSION = VERSION;
        arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
          lodash2[methodName].placeholder = lodash2;
        });
        arrayEach(["drop", "take"], function(methodName, index) {
          LazyWrapper.prototype[methodName] = function(n) {
            n = n === undefined$1 ? 1 : nativeMax(toInteger(n), 0);
            var result2 = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
            if (result2.__filtered__) {
              result2.__takeCount__ = nativeMin(n, result2.__takeCount__);
            } else {
              result2.__views__.push({
                "size": nativeMin(n, MAX_ARRAY_LENGTH),
                "type": methodName + (result2.__dir__ < 0 ? "Right" : "")
              });
            }
            return result2;
          };
          LazyWrapper.prototype[methodName + "Right"] = function(n) {
            return this.reverse()[methodName](n).reverse();
          };
        });
        arrayEach(["filter", "map", "takeWhile"], function(methodName, index) {
          var type = index + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
          LazyWrapper.prototype[methodName] = function(iteratee2) {
            var result2 = this.clone();
            result2.__iteratees__.push({
              "iteratee": getIteratee(iteratee2, 3),
              "type": type
            });
            result2.__filtered__ = result2.__filtered__ || isFilter;
            return result2;
          };
        });
        arrayEach(["head", "last"], function(methodName, index) {
          var takeName = "take" + (index ? "Right" : "");
          LazyWrapper.prototype[methodName] = function() {
            return this[takeName](1).value()[0];
          };
        });
        arrayEach(["initial", "tail"], function(methodName, index) {
          var dropName = "drop" + (index ? "" : "Right");
          LazyWrapper.prototype[methodName] = function() {
            return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
          };
        });
        LazyWrapper.prototype.compact = function() {
          return this.filter(identity);
        };
        LazyWrapper.prototype.find = function(predicate) {
          return this.filter(predicate).head();
        };
        LazyWrapper.prototype.findLast = function(predicate) {
          return this.reverse().find(predicate);
        };
        LazyWrapper.prototype.invokeMap = baseRest(function(path2, args) {
          if (typeof path2 == "function") {
            return new LazyWrapper(this);
          }
          return this.map(function(value) {
            return baseInvoke(value, path2, args);
          });
        });
        LazyWrapper.prototype.reject = function(predicate) {
          return this.filter(negate(getIteratee(predicate)));
        };
        LazyWrapper.prototype.slice = function(start, end) {
          start = toInteger(start);
          var result2 = this;
          if (result2.__filtered__ && (start > 0 || end < 0)) {
            return new LazyWrapper(result2);
          }
          if (start < 0) {
            result2 = result2.takeRight(-start);
          } else if (start) {
            result2 = result2.drop(start);
          }
          if (end !== undefined$1) {
            end = toInteger(end);
            result2 = end < 0 ? result2.dropRight(-end) : result2.take(end - start);
          }
          return result2;
        };
        LazyWrapper.prototype.takeRightWhile = function(predicate) {
          return this.reverse().takeWhile(predicate).reverse();
        };
        LazyWrapper.prototype.toArray = function() {
          return this.take(MAX_ARRAY_LENGTH);
        };
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash2[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
          if (!lodashFunc) {
            return;
          }
          lodash2.prototype[methodName] = function() {
            var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee2 = args[0], useLazy = isLazy || isArray(value);
            var interceptor = function(value2) {
              var result3 = lodashFunc.apply(lodash2, arrayPush([value2], args));
              return isTaker && chainAll ? result3[0] : result3;
            };
            if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
              isLazy = useLazy = false;
            }
            var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
            if (!retUnwrapped && useLazy) {
              value = onlyLazy ? value : new LazyWrapper(this);
              var result2 = func.apply(value, args);
              result2.__actions__.push({ "func": thru, "args": [interceptor], "thisArg": undefined$1 });
              return new LodashWrapper(result2, chainAll);
            }
            if (isUnwrapped && onlyLazy) {
              return func.apply(this, args);
            }
            result2 = this.thru(interceptor);
            return isUnwrapped ? isTaker ? result2.value()[0] : result2.value() : result2;
          };
        });
        arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
          var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
          lodash2.prototype[methodName] = function() {
            var args = arguments;
            if (retUnwrapped && !this.__chain__) {
              var value = this.value();
              return func.apply(isArray(value) ? value : [], args);
            }
            return this[chainName](function(value2) {
              return func.apply(isArray(value2) ? value2 : [], args);
            });
          };
        });
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var lodashFunc = lodash2[methodName];
          if (lodashFunc) {
            var key = lodashFunc.name + "";
            if (!hasOwnProperty.call(realNames, key)) {
              realNames[key] = [];
            }
            realNames[key].push({ "name": methodName, "func": lodashFunc });
          }
        });
        realNames[createHybrid(undefined$1, WRAP_BIND_KEY_FLAG).name] = [{
          "name": "wrapper",
          "func": undefined$1
        }];
        LazyWrapper.prototype.clone = lazyClone;
        LazyWrapper.prototype.reverse = lazyReverse;
        LazyWrapper.prototype.value = lazyValue;
        lodash2.prototype.at = wrapperAt;
        lodash2.prototype.chain = wrapperChain;
        lodash2.prototype.commit = wrapperCommit;
        lodash2.prototype.next = wrapperNext;
        lodash2.prototype.plant = wrapperPlant;
        lodash2.prototype.reverse = wrapperReverse;
        lodash2.prototype.toJSON = lodash2.prototype.valueOf = lodash2.prototype.value = wrapperValue;
        lodash2.prototype.first = lodash2.prototype.head;
        if (symIterator) {
          lodash2.prototype[symIterator] = wrapperToIterator;
        }
        return lodash2;
      };
      var _ = runInContext();
      if (freeModule) {
        (freeModule.exports = _)._ = _;
        freeExports._ = _;
      } else {
        root._ = _;
      }
    }).call(commonjsGlobal);
  })(lodash, lodash.exports);
  return lodash.exports;
}
var index_cjs_development$1;
var hasRequiredIndex_cjs_development$1;
function requireIndex_cjs_development$1() {
  if (hasRequiredIndex_cjs_development$1) return index_cjs_development$1;
  hasRequiredIndex_cjs_development$1 = 1;
  var _equals = requireDeepEql();
  var lodash2 = requireLodash();
  function equals(a1, a2) {
    return _equals(a1, a2);
  }
  function defaultFilter(options = {}) {
    const checker = options.checker || defaultChecker;
    const filter2 = options.filter || null;
    const find = options.removeFromFirst ? lodash2.findLastIndex : lodash2.findIndex;
    const cb = (val, index, arr) => {
      let i = find(arr, (a) => checker(a, val, arr, arr));
      return i === index && (!filter2 || filter2(val));
    };
    return cb;
  }
  function defaultChecker(element, value, arr_new, arr_old) {
    return _equals(element, value);
  }
  function array_unique(arr, options = {}) {
    if (!Array.isArray(arr)) {
      throw new TypeError(`Expected an Array but got ${typeof arr}.`);
    }
    const cb = defaultFilter(options);
    if (options.overwrite) {
      let index = arr.length;
      while (index--) {
        let val = arr[index];
        if (!cb(val, index, arr)) {
          arr.splice(index, 1);
        }
      }
      return arr;
    }
    return arr.filter(cb);
  }
  function array_unique_overwrite(arr, options = {}) {
    return array_unique(arr, {
      ...options,
      overwrite: true
    });
  }
  function lazy_unique(...arr) {
    if (arr.length > 1) {
      return array_unique(arr);
    }
    return array_unique(arr[0]);
  }
  function lazy_unique_overwrite(...arr) {
    if (arr.length > 1) {
      return array_unique_overwrite(arr);
    }
    return array_unique_overwrite(arr[0]);
  }
  {
    Object.defineProperty(lazy_unique, "array_unique", {
      value: array_unique
    });
    Object.defineProperty(lazy_unique, "array_unique_overwrite", {
      value: array_unique_overwrite
    });
    Object.defineProperty(lazy_unique, "lazy_unique_overwrite", {
      value: lazy_unique_overwrite
    });
    Object.defineProperty(lazy_unique, "equals", {
      value: equals
    });
    Object.defineProperty(lazy_unique, "defaultFilter", {
      value: defaultFilter
    });
    Object.defineProperty(lazy_unique, "defaultChecker", {
      value: defaultChecker
    });
    Object.defineProperty(lazy_unique, "lazy_unique", {
      value: lazy_unique
    });
    Object.defineProperty(lazy_unique, "default", {
      value: lazy_unique
    });
    Object.defineProperty(lazy_unique, "__esModule", {
      value: true
    });
  }
  index_cjs_development$1 = lazy_unique;
  return index_cjs_development$1;
}
var index_cjs_production_min$1 = { exports: {} };
var hasRequiredIndex_cjs_production_min$1;
function requireIndex_cjs_production_min$1() {
  if (hasRequiredIndex_cjs_production_min$1) return index_cjs_production_min$1.exports;
  hasRequiredIndex_cjs_production_min$1 = 1;
  var e = requireDeepEql(), r = requireLodash();
  function defaultFilter(e2 = {}) {
    const u = e2.checker || defaultChecker, t = e2.filter || null, n = e2.removeFromFirst ? r.findLastIndex : r.findIndex;
    return (e3, r2, i) => n(i, (r3) => u(r3, e3, i, i)) === r2 && (!t || t(e3));
  }
  function defaultChecker(r2, u, t, n) {
    return e(r2, u);
  }
  function array_unique(e2, r2 = {}) {
    if (!Array.isArray(e2)) throw new TypeError(`Expected an Array but got ${typeof e2}.`);
    const u = defaultFilter(r2);
    if (r2.overwrite) {
      let r3 = e2.length;
      for (; r3--; ) u(e2[r3], r3, e2) || e2.splice(r3, 1);
      return e2;
    }
    return e2.filter(u);
  }
  function array_unique_overwrite(e2, r2 = {}) {
    return array_unique(e2, {
      ...r2,
      overwrite: true
    });
  }
  function lazy_unique(...e2) {
    return array_unique(e2.length > 1 ? e2 : e2[0]);
  }
  Object.defineProperty(lazy_unique, "array_unique", {
    value: array_unique
  }), Object.defineProperty(lazy_unique, "array_unique_overwrite", {
    value: array_unique_overwrite
  }), Object.defineProperty(lazy_unique, "lazy_unique_overwrite", {
    value: function lazy_unique_overwrite(...e2) {
      return array_unique_overwrite(e2.length > 1 ? e2 : e2[0]);
    }
  }), Object.defineProperty(lazy_unique, "equals", {
    value: function equals(r2, u) {
      return e(r2, u);
    }
  }), Object.defineProperty(lazy_unique, "defaultFilter", {
    value: defaultFilter
  }), Object.defineProperty(lazy_unique, "defaultChecker", {
    value: defaultChecker
  }), Object.defineProperty(lazy_unique, "lazy_unique", {
    value: lazy_unique
  }), Object.defineProperty(lazy_unique, "default", {
    value: lazy_unique
  }), Object.defineProperty(lazy_unique, "__esModule", {
    value: true
  }), index_cjs_production_min$1.exports = lazy_unique;
  return index_cjs_production_min$1.exports;
}
var hasRequiredDist$1;
function requireDist$1() {
  if (hasRequiredDist$1) return dist$1.exports;
  hasRequiredDist$1 = 1;
  if (typeof process !== "undefined" && process.env.NODE_ENV !== "production") {
    dist$1.exports = requireIndex_cjs_development$1();
  } else {
    dist$1.exports = requireIndex_cjs_production_min$1();
  }
  return dist$1.exports;
}
var dist = { exports: {} };
var index_cjs_development = {};
var hasRequiredIndex_cjs_development;
function requireIndex_cjs_development() {
  if (hasRequiredIndex_cjs_development) return index_cjs_development;
  hasRequiredIndex_cjs_development = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EnumLineBreak = void 0;
    (function(EnumLineBreak) {
      EnumLineBreak["CR"] = "\r";
      EnumLineBreak["CRLF"] = "\r\n";
      EnumLineBreak["LF"] = "\n";
    })(exports.EnumLineBreak || (exports.EnumLineBreak = {}));
    exports.EnumLineBreakCharCode = void 0;
    (function(EnumLineBreakCharCode) {
      EnumLineBreakCharCode[EnumLineBreakCharCode["CR"] = 13] = "CR";
      EnumLineBreakCharCode[EnumLineBreakCharCode["LF"] = 10] = "LF";
    })(exports.EnumLineBreakCharCode || (exports.EnumLineBreakCharCode = {}));
    const CR = "\r";
    const CRLF = "\r\n";
    const LF = "\n";
    const R_CRLF = /\r\n|\r(?!\n)|\n/g;
    const R_CRLF_MATCH = /* @__PURE__ */ new RegExp(`(${R_CRLF.source})`, R_CRLF.flags);
    function crlf(text, newline = "\n") {
      return text.replace(R_CRLF, newline);
    }
    function chkcrlf(text, options) {
      var _options$disable;
      const disable = (_options$disable = options === null || options === void 0 ? void 0 : options.disable) !== null && _options$disable !== void 0 ? _options$disable : {};
      return {
        lf: !disable.lf && /\n/.test(text.replace(/\r\n/g, "")),
        crlf: !disable.crlf && /\r\n/.test(text),
        cr: !disable.cr && /\r(?!\n)/.test(text)
      };
    }
    function detectLineBreak(text, options) {
      const _lb = chkcrlf(text, options);
      return _detectLineBreakCore(_lb);
    }
    function _detectLineBreakCore(_lb) {
      return _lb.crlf ? "\r\n" : _lb.lf || !_lb.cr ? "\n" : "\r";
    }
    function isCRLF(newline) {
      return newline === "\r\n";
    }
    function isLF(newline) {
      return newline === "\n";
    }
    function isCR(newline) {
      return newline === "\r";
    }
    function charCodeIsLF(charCode) {
      return charCode === 10;
    }
    function charCodeIsCR(charCode) {
      return charCode === 13;
    }
    function lineSplit(text) {
      return text.split(R_CRLF);
    }
    function crlf_unicode_normalize(text, newline = "\n") {
      const ln3 = newline + newline + newline;
      const ln2 = newline + newline;
      return text.replace(/\u000C/g, ln3).replace(/\u2028/g, newline).replace(/\u2029/g, ln2);
    }
    function isEqualWithIgnoreLineSeparators(a, b) {
      const _lb_a = chkcrlf(a);
      const _lb_b = chkcrlf(b);
      let bool = false;
      if (_lb_a.cr === _lb_b.cr && _lb_a.crlf === _lb_b.crlf && _lb_a.lf === _lb_b.lf) {
        bool = crlf(a) === crlf(b);
      }
      return {
        bool,
        _lb_a,
        _lb_b
      };
    }
    function toLineBreakName(newline) {
      switch (newline) {
        case "\n":
          return "LF";
        case "\r":
          return "CR";
        case "\r\n":
          return "CRLF";
      }
      throw new TypeError(`Invalid line break`);
    }
    function nameToLineBreak(name) {
      switch (name === null || name === void 0 ? void 0 : name.toUpperCase()) {
        case "LF":
          return "\n";
        case "CR":
          return "\r";
        case "CRLF":
          return "\r\n";
      }
      throw new TypeError(`Invalid line break name: ${name}`);
    }
    function detectCurrentIndexLineBreakFromBufferLike(buffer, index) {
      const cur = buffer[index];
      const next = index + 1;
      if (charCodeIsLF(cur)) {
        return {
          newline: "\n",
          cur,
          index,
          next,
          length: 1
        };
      } else if (charCodeIsCR(cur)) {
        if (charCodeIsLF(buffer[next])) {
          return {
            newline: "\r\n",
            cur,
            index,
            next: next + 1,
            length: 2
          };
        }
        return {
          newline: "\r",
          cur,
          index,
          next,
          length: 1
        };
      }
      return {
        newline: void 0,
        cur,
        index,
        next,
        length: 0
      };
    }
    function detectCurrentIndexLineBreak(buffer, index) {
      const cur = buffer[index];
      const next = index + 1;
      if (isLF(cur)) {
        return {
          newline: "\n",
          cur,
          index,
          next,
          length: 1
        };
      } else if (isCR(cur)) {
        if (isLF(buffer[next])) {
          return {
            newline: "\r\n",
            cur,
            index,
            next: next + 1,
            length: 2
          };
        }
        return {
          newline: "\r",
          cur,
          index,
          next,
          length: 1
        };
      }
      return {
        newline: void 0,
        cur,
        index,
        next,
        length: 0
      };
    }
    exports.CR = CR;
    exports.CRLF = CRLF;
    exports.LF = LF;
    exports.R_CRLF = R_CRLF;
    exports.R_CRLF_MATCH = R_CRLF_MATCH;
    exports._detectLineBreakCore = _detectLineBreakCore;
    exports.charCodeIsCR = charCodeIsCR;
    exports.charCodeIsLF = charCodeIsLF;
    exports.chkcrlf = chkcrlf;
    exports.crlf = crlf;
    exports.crlf_unicode_normalize = crlf_unicode_normalize;
    exports.default = crlf;
    exports.detectCurrentIndexLineBreak = detectCurrentIndexLineBreak;
    exports.detectCurrentIndexLineBreakFromBufferLike = detectCurrentIndexLineBreakFromBufferLike;
    exports.detectLineBreak = detectLineBreak;
    exports.isCR = isCR;
    exports.isCRLF = isCRLF;
    exports.isEqualWithIgnoreLineSeparators = isEqualWithIgnoreLineSeparators;
    exports.isLF = isLF;
    exports.lineSplit = lineSplit;
    exports.nameToLineBreak = nameToLineBreak;
    exports.toLineBreakName = toLineBreakName;
  })(index_cjs_development);
  return index_cjs_development;
}
var index_cjs_production_min = {};
var hasRequiredIndex_cjs_production_min;
function requireIndex_cjs_production_min() {
  if (hasRequiredIndex_cjs_production_min) return index_cjs_production_min;
  hasRequiredIndex_cjs_production_min = 1;
  (function(exports) {
    var e, r;
    Object.defineProperty(exports, "__esModule", {
      value: true
    }), exports.EnumLineBreak = void 0, (e = exports.EnumLineBreak || (exports.EnumLineBreak = {})).CR = "\r", e.CRLF = "\r\n", e.LF = "\n", exports.EnumLineBreakCharCode = void 0, (r = exports.EnumLineBreakCharCode || (exports.EnumLineBreakCharCode = {}))[r.CR = 13] = "CR", r[r.LF = 10] = "LF";
    const n = /\r\n|\r(?!\n)|\n/g, t = new RegExp(`(${n.source})`, n.flags);
    function crlf(e2, r2 = "\n") {
      return e2.replace(n, r2);
    }
    function chkcrlf(e2, r2) {
      var n2;
      const t2 = null !== (n2 = null == r2 ? void 0 : r2.disable) && void 0 !== n2 ? n2 : {};
      return {
        lf: !t2.lf && /\n/.test(e2.replace(/\r\n/g, "")),
        crlf: !t2.crlf && /\r\n/.test(e2),
        cr: !t2.cr && /\r(?!\n)/.test(e2)
      };
    }
    function _detectLineBreakCore(e2) {
      return e2.crlf ? "\r\n" : e2.lf || !e2.cr ? "\n" : "\r";
    }
    function isLF(e2) {
      return "\n" === e2;
    }
    function isCR(e2) {
      return "\r" === e2;
    }
    function charCodeIsLF(e2) {
      return 10 === e2;
    }
    function charCodeIsCR(e2) {
      return 13 === e2;
    }
    exports.CR = "\r", exports.CRLF = "\r\n", exports.LF = "\n", exports.R_CRLF = n, exports.R_CRLF_MATCH = t, exports._detectLineBreakCore = _detectLineBreakCore, exports.charCodeIsCR = charCodeIsCR, exports.charCodeIsLF = charCodeIsLF, exports.chkcrlf = chkcrlf, exports.crlf = crlf, exports.crlf_unicode_normalize = function crlf_unicode_normalize(e2, r2 = "\n") {
      const n2 = r2 + r2;
      return e2.replace(/\u000C/g, r2 + r2 + r2).replace(/\u2028/g, r2).replace(/\u2029/g, n2);
    }, exports.default = crlf, exports.detectCurrentIndexLineBreak = function detectCurrentIndexLineBreak(e2, r2) {
      const n2 = e2[r2], t2 = r2 + 1;
      return isLF(n2) ? {
        newline: "\n",
        cur: n2,
        index: r2,
        next: t2,
        length: 1
      } : isCR(n2) ? isLF(e2[t2]) ? {
        newline: "\r\n",
        cur: n2,
        index: r2,
        next: t2 + 1,
        length: 2
      } : {
        newline: "\r",
        cur: n2,
        index: r2,
        next: t2,
        length: 1
      } : {
        newline: void 0,
        cur: n2,
        index: r2,
        next: t2,
        length: 0
      };
    }, exports.detectCurrentIndexLineBreakFromBufferLike = function detectCurrentIndexLineBreakFromBufferLike(e2, r2) {
      const n2 = e2[r2], t2 = r2 + 1;
      return charCodeIsLF(n2) ? {
        newline: "\n",
        cur: n2,
        index: r2,
        next: t2,
        length: 1
      } : charCodeIsCR(n2) ? charCodeIsLF(e2[t2]) ? {
        newline: "\r\n",
        cur: n2,
        index: r2,
        next: t2 + 1,
        length: 2
      } : {
        newline: "\r",
        cur: n2,
        index: r2,
        next: t2,
        length: 1
      } : {
        newline: void 0,
        cur: n2,
        index: r2,
        next: t2,
        length: 0
      };
    }, exports.detectLineBreak = function detectLineBreak(e2, r2) {
      return _detectLineBreakCore(chkcrlf(e2, r2));
    }, exports.isCR = isCR, exports.isCRLF = function isCRLF(e2) {
      return "\r\n" === e2;
    }, exports.isEqualWithIgnoreLineSeparators = function isEqualWithIgnoreLineSeparators(e2, r2) {
      const n2 = chkcrlf(e2), t2 = chkcrlf(r2);
      let o = false;
      return n2.cr === t2.cr && n2.crlf === t2.crlf && n2.lf === t2.lf && (o = crlf(e2) === crlf(r2)), {
        bool: o,
        _lb_a: n2,
        _lb_b: t2
      };
    }, exports.isLF = isLF, exports.lineSplit = function lineSplit(e2) {
      return e2.split(n);
    }, exports.nameToLineBreak = function nameToLineBreak(e2) {
      switch (null == e2 ? void 0 : e2.toUpperCase()) {
        case "LF":
          return "\n";
        case "CR":
          return "\r";
        case "CRLF":
          return "\r\n";
      }
      throw new TypeError(`Invalid line break name: ${e2}`);
    }, exports.toLineBreakName = function toLineBreakName(e2) {
      switch (e2) {
        case "\n":
          return "LF";
        case "\r":
          return "CR";
        case "\r\n":
          return "CRLF";
      }
      throw new TypeError("Invalid line break");
    };
  })(index_cjs_production_min);
  return index_cjs_production_min;
}
var hasRequiredDist;
function requireDist() {
  if (hasRequiredDist) return dist.exports;
  hasRequiredDist = 1;
  if (typeof process !== "undefined" && process.env.NODE_ENV !== "production") {
    dist.exports = requireIndex_cjs_development();
  } else {
    dist.exports = requireIndex_cjs_production_min();
  }
  return dist.exports;
}
var types = {};
var hasRequiredTypes;
function requireTypes() {
  if (hasRequiredTypes) return types;
  hasRequiredTypes = 1;
  Object.defineProperty(types, "__esModule", { value: true });
  types.SYMBOL_RAW_DATA = void 0;
  types.SYMBOL_RAW_DATA = Symbol.for("rawData");
  return types;
}
var isEpub = {};
var hasRequiredIsEpub;
function requireIsEpub() {
  if (hasRequiredIsEpub) return isEpub;
  hasRequiredIsEpub = 1;
  Object.defineProperty(isEpub, "__esModule", { value: true });
  isEpub.isEpub = void 0;
  function isEpub$1(data, buf) {
    let txt = typeof data == "string" && !buf ? data : data.toString("utf-8").toLowerCase().trim();
    if (txt === "application/epub+zip") {
      return data;
    }
    return null;
  }
  isEpub.isEpub = isEpub$1;
  return isEpub;
}
var hasRequiredEpub;
function requireEpub() {
  if (hasRequiredEpub) return epub;
  hasRequiredEpub = 1;
  Object.defineProperty(epub, "__esModule", { value: true });
  epub.EPub = void 0;
  const tslib_1 = require$$0;
  const events_1 = require$$1$3;
  const zipfile_1 = requireZipfile();
  const xml2js_1 = tslib_1.__importDefault(requireXml2js());
  const array_hyper_unique_1 = requireDist$1();
  const path_1 = require$$1$1;
  const url_1 = require$$6;
  const crlf_normalize_1 = requireDist();
  const types_1 = requireTypes();
  const isEpub_1 = requireIsEpub();
  class EPub2 extends events_1.EventEmitter {
    _getStatic() {
      return this.__proto__.constructor;
    }
    constructor(epubfile, imagewebroot, chapterwebroot, ...argv) {
      super();
      this.filename = epubfile;
      this.imageroot = (imagewebroot || this._getStatic().IMAGE_ROOT).trim();
      this.linkroot = (chapterwebroot || this._getStatic().LINK_ROOT).trim();
      if (this.imageroot.substr(-1) != "/") {
        this.imageroot += "/";
      }
      if (this.linkroot.substr(-1) != "/") {
        this.linkroot += "/";
      }
    }
    static create(epubfile, imagewebroot, chapterwebroot, ...argv) {
      let epub3 = new this(epubfile, imagewebroot, chapterwebroot, ...argv);
      return epub3;
    }
    /**
     *  EPub#parse() -> undefined
     *
     *  Starts the parser, needs to be called by the script
     **/
    parse() {
      this.containerFile = null;
      this.mimeFile = null;
      this.rootFile = null;
      this.metadata = {};
      this.manifest = {};
      this.spine = { toc: null, contents: [] };
      this.flow = [];
      this.toc = [];
      this.open();
      return this;
    }
    /**
     *  EPub#open() -> undefined
     *
     *  Opens the epub file with Zip unpacker, retrieves file listing
     *  and runs mime type check
     **/
    open() {
      try {
        this.zip = new zipfile_1.ZipFile(this.filename);
      } catch (E) {
        this.emit("error", new Error(`Invalid/missing file ${this.filename}`));
        return;
      }
      if (!this.zip.names || !this.zip.names.length) {
        this.emit("error", new Error(`No files in archive ${this.filename}`));
        return;
      }
      this.checkMimeType();
    }
    /**
     *  EPub#checkMimeType() -> undefined
     *
     *  Checks if there's a file called "mimetype" and that it's contents
     *  are "application/epub+zip". On success runs root file check.
     **/
    checkMimeType() {
      var i, len;
      for (i = 0, len = this.zip.names.length; i < len; i++) {
        if (this.zip.names[i].toLowerCase() == "mimetype") {
          this.mimeFile = this.zip.names[i];
          break;
        }
      }
      if (!this.mimeFile) {
        this.emit("error", new Error("No mimetype file in archive"));
        return;
      }
      this.zip.readFile(this.mimeFile, (err, data) => {
        if (err) {
          this.emit("error", new Error("Reading archive failed"));
          return;
        }
        if (!(0, isEpub_1.isEpub)(data, true)) {
          this.emit("error", new Error("Unsupported mime type"));
          return;
        }
        this.getRootFiles();
      });
    }
    _Elem(element) {
      const SYMBOL_RAW_DATA = this._getStatic().SYMBOL_RAW_DATA;
      if (!element[SYMBOL_RAW_DATA]) {
        element[SYMBOL_RAW_DATA] = Object.assign({}, element);
      }
      if (element["media-type"]) {
        element["mediaType"] = element["media-type"];
      }
      return element;
    }
    /**
     *  EPub#getRootFiles() -> undefined
     *
     *  Looks for a "meta-inf/container.xml" file and searches for a
     *  rootfile element with mime type "application/oebps-package+xml".
     *  On success calls the rootfile parser
     **/
    getRootFiles() {
      var i, len;
      for (i = 0, len = this.zip.names.length; i < len; i++) {
        if (this.zip.names[i].toLowerCase() == "meta-inf/container.xml") {
          this.containerFile = this.zip.names[i];
          break;
        }
      }
      if (!this.containerFile) {
        this.emit("error", new Error("No container file in archive"));
        return;
      }
      const xml2jsOptions = this._getStatic().xml2jsOptions;
      this.zip.readFile(this.containerFile, (err, data) => {
        if (err) {
          this.emit("error", new Error("Reading archive failed"));
          return;
        }
        let xml = data.toString("utf-8").toLowerCase().trim(), xmlparser = new xml2js_1.default.Parser(xml2jsOptions);
        xmlparser.on("end", (result) => {
          if (!result.rootfiles || !result.rootfiles.rootfile) {
            this.emit("error", new Error("No rootfiles found"));
            console.dir(result);
            return;
          }
          var rootfile = result.rootfiles.rootfile, filename = false, i2, len2;
          if (Array.isArray(rootfile)) {
            for (i2 = 0, len2 = rootfile.length; i2 < len2; i2++) {
              if (rootfile[i2]["@"]["media-type"] && rootfile[i2]["@"]["media-type"] == "application/oebps-package+xml" && rootfile[i2]["@"]["full-path"]) {
                filename = rootfile[i2]["@"]["full-path"].toLowerCase().trim();
                break;
              }
            }
          } else if (rootfile["@"]) {
            if (rootfile["@"]["media-type"] != "application/oebps-package+xml" || !rootfile["@"]["full-path"]) {
              this.emit("error", new Error("Rootfile in unknown format"));
              return;
            }
            filename = rootfile["@"]["full-path"].toLowerCase().trim();
          }
          if (!filename) {
            this.emit("error", new Error("Empty rootfile"));
            return;
          }
          for (i2 = 0, len2 = this.zip.names.length; i2 < len2; i2++) {
            if (this.zip.names[i2].toLowerCase() == filename) {
              this.rootFile = this.zip.names[i2];
              break;
            }
          }
          if (!this.rootFile) {
            this.emit("error", new Error("Rootfile not found from archive"));
            return;
          }
          this.handleRootFile();
        });
        xmlparser.on("error", (err2) => {
          this.emit("error", new Error("Parsing container XML failed"));
          return;
        });
        xmlparser.parseString(xml);
      });
    }
    /**
     *  EPub#handleRootFile() -> undefined
     *
     *  Parses the rootfile XML and calls rootfile parser
     **/
    handleRootFile() {
      const xml2jsOptions = this._getStatic().xml2jsOptions;
      this.zip.readFile(this.rootFile, (err, data) => {
        if (err) {
          this.emit("error", new Error("Reading archive failed"));
          return;
        }
        var xml = data.toString("utf-8"), xmlparser = new xml2js_1.default.Parser(xml2jsOptions);
        xmlparser.on("end", this.parseRootFile.bind(this));
        xmlparser.on("error", (err2) => {
          this.emit("error", new Error("Parsing container XML failed"));
          return;
        });
        xmlparser.parseString(xml);
      });
    }
    /**
     *  EPub#parseRootFile() -> undefined
     *
     *  Parses elements "metadata," "manifest," "spine" and TOC.
     *  Emits "end" if no TOC
     **/
    parseRootFile(rootfile) {
      this.version = rootfile["@"].version || "2.0";
      var i, len, keys, keyparts, key;
      keys = Object.keys(rootfile);
      for (i = 0, len = keys.length; i < len; i++) {
        keyparts = keys[i].split(":");
        key = (keyparts.pop() || "").toLowerCase().trim();
        switch (key) {
          case "metadata":
            this.parseMetadata(rootfile[keys[i]]);
            break;
          case "manifest":
            this.parseManifest(rootfile[keys[i]]);
            break;
          case "spine":
            this.parseSpine(rootfile[keys[i]]);
            break;
        }
      }
      if (this.spine.toc) {
        this.parseTOC();
      } else {
        this.emit("end");
      }
    }
    /**
     *  EPub#parseMetadata() -> undefined
     *
     *  Parses "metadata" block (book metadata, title, author etc.)
     **/
    parseMetadata(metadata) {
      let i, j, len, keys, keyparts, key;
      const _self = this;
      this.metadata[types_1.SYMBOL_RAW_DATA] = metadata;
      keys = Object.keys(metadata);
      for (i = 0, len = keys.length; i < len; i++) {
        keyparts = keys[i].split(":");
        key = (keyparts.pop() || "").toLowerCase().trim();
        const currentData = metadata[keys[i]];
        switch (key) {
          case "publisher":
            if (Array.isArray(currentData)) {
              this.metadata.publisher = String(currentData[0] && currentData[0]["#"] || currentData[0] || "").trim();
            } else {
              this.metadata.publisher = String(currentData["#"] || currentData || "").trim();
            }
            break;
          case "language":
            if (Array.isArray(currentData)) {
              this.metadata.language = String(currentData[0] && currentData[0]["#"] || currentData[0] || "").toLowerCase().trim();
            } else {
              this.metadata.language = String(currentData["#"] || currentData || "").toLowerCase().trim();
            }
            break;
          case "title":
            if (Array.isArray(currentData)) {
              this.metadata.title = String(currentData[0] && currentData[0]["#"] || currentData[0] || "").trim();
            } else {
              this.metadata.title = String(currentData["#"] || currentData || "").trim();
            }
            break;
          case "subject":
            this.metadata.subject = this.metadata.subject || [];
            (Array.isArray(currentData) ? currentData : [currentData]).forEach(function(value) {
              let tag = (_meta_val(value, "#") || "").trim();
              if (tag !== "") {
                _self.metadata.subject.push(tag);
              }
            });
            break;
          case "description":
            if (Array.isArray(currentData)) {
              this.metadata.description = String(currentData[0] && currentData[0]["#"] || currentData[0] || "").trim();
            } else {
              this.metadata.description = String(currentData["#"] || currentData || "").trim();
            }
            break;
          case "creator":
            if (Array.isArray(currentData)) {
              this.metadata.creator = String(currentData[0] && currentData[0]["#"] || currentData[0] || "").trim();
              this.metadata.creatorFileAs = String(currentData[0] && currentData[0]["@"] && currentData[0]["@"]["opf:file-as"] || this.metadata.creator).trim();
            } else {
              this.metadata.creator = String(currentData["#"] || currentData || "").trim();
              this.metadata.creatorFileAs = String(currentData["@"] && currentData["@"]["opf:file-as"] || this.metadata.creator).trim();
            }
            break;
          case "date":
            if (Array.isArray(currentData)) {
              this.metadata.date = String(currentData[0] && currentData[0]["#"] || currentData[0] || "").trim();
            } else {
              this.metadata.date = String(currentData["#"] || currentData || "").trim();
            }
            break;
          case "identifier":
            if (currentData["@"] && currentData["@"]["opf:scheme"] == "ISBN") {
              this.metadata.ISBN = String(currentData["#"] || "").trim();
            } else if (currentData["@"] && currentData["@"].id && currentData["@"].id.match(/uuid/i)) {
              this.metadata.UUID = String(currentData["#"] || "").replace("urn:uuid:", "").toUpperCase().trim();
            } else if (Array.isArray(currentData)) {
              for (j = 0; j < currentData.length; j++) {
                if (currentData[j]["@"]) {
                  if (currentData[j]["@"]["opf:scheme"] == "ISBN") {
                    this.metadata.ISBN = String(currentData[j]["#"] || "").trim();
                  } else if (currentData[j]["@"].id && currentData[j]["@"].id.match(/uuid/i)) {
                    this.metadata.UUID = String(currentData[j]["#"] || "").replace("urn:uuid:", "").toUpperCase().trim();
                  }
                }
              }
            }
            break;
          case "meta":
            if (currentData["#"] && currentData["@"].property == "calibre:author_link_map") {
              this.metadata["contribute"] = this.metadata["contribute"] || [];
              this.metadata["author_link_map"] = this.metadata["author_link_map"] || {};
              let t = JSON.parse(currentData["#"]);
              for (let n in t) {
                n = n.toString().trim();
                this.metadata["contribute"].push(n);
                this.metadata["author_link_map"][n] = (t[n] || "").toString().trim();
              }
              this.metadata["contribute"] = (0, array_hyper_unique_1.array_unique)(this.metadata["contribute"]);
            }
            break;
        }
      }
      let metas = metadata["meta"] || {};
      Object.keys(metas).forEach((key2) => {
        var meta = metas[key2];
        if (meta["@"] && meta["@"].name) {
          var name = meta["@"].name;
          this.metadata[name] = meta["@"].content;
          if (name == "calibre:series") {
            this.metadata["series"] = this.metadata["series"] || meta["@"].content;
          }
        }
        if (meta["#"] && meta["@"].property) {
          this.metadata[meta["@"].property] = meta["#"];
        }
        if (meta.name && meta.name == "cover") {
          this.metadata[meta.name] = meta.content;
        }
      }, this);
      function _meta_val(row, key2 = null) {
        if (key2 !== null) {
          return row[key2] || row;
        }
        return row;
      }
    }
    /**
     *  EPub#parseManifest() -> undefined
     *
     *  Parses "manifest" block (all items included, html files, images, styles)
     **/
    parseManifest(manifest) {
      var i, len, path2 = this.rootFile.split("/"), element, path_str;
      path2.pop();
      path_str = path2.join("/");
      if (manifest.item) {
        for (i = 0, len = manifest.item.length; i < len; i++) {
          if (manifest.item[i]["@"]) {
            element = manifest.item[i]["@"];
            element = this._Elem(element);
            if (element.href && element.href.substr(0, path_str.length) != path_str) {
              element.href = path2.concat([element.href]).join("/");
            }
            this.manifest[manifest.item[i]["@"].id] = element;
          }
        }
      }
    }
    /**
     *  EPub#parseSpine() -> undefined
     *
     *  Parses "spine" block (all html elements that are shown to the reader)
     **/
    parseSpine(spine) {
      var i, len, path2 = this.rootFile.split("/"), element;
      path2.pop();
      if (spine["@"] && spine["@"].toc) {
        this.spine.toc = this.manifest[spine["@"].toc] || null;
      }
      if (spine.itemref) {
        if (!Array.isArray(spine.itemref)) {
          spine.itemref = [spine.itemref];
        }
        for (i = 0, len = spine.itemref.length; i < len; i++) {
          if (spine.itemref[i]["@"]) {
            if (element = this.manifest[spine.itemref[i]["@"].idref]) {
              this.spine.contents.push(element);
            }
          }
        }
      }
      this.flow = this.spine.contents;
    }
    /**
     *  EPub#parseTOC() -> undefined
     *
     *  Parses ncx file for table of contents (title, html file)
     **/
    parseTOC() {
      var i, len, path2 = this.spine.toc.href.split("/"), id_list = {}, keys;
      path2.pop();
      keys = Object.keys(this.manifest);
      for (i = 0, len = keys.length; i < len; i++) {
        id_list[this.manifest[keys[i]].href] = keys[i];
      }
      const xml2jsOptions = this._getStatic().xml2jsOptions;
      this.zip.readFile(this.spine.toc.href, (err, data) => {
        if (err) {
          this.emit("error", new Error("Reading archive failed"));
          return;
        }
        var xml = data.toString("utf-8"), xmlparser = new xml2js_1.default.Parser(xml2jsOptions);
        xmlparser.on("end", (result) => {
          if (result.navMap && result.navMap.navPoint) {
            this.toc = this.walkNavMap(result.navMap.navPoint, path2, id_list);
          }
          this.emit("end");
        });
        xmlparser.on("error", (err2) => {
          this.emit("error", new Error("Parsing container XML failed"));
          return;
        });
        xmlparser.parseString(xml);
      });
    }
    /**
     *  EPub#walkNavMap(branch, path, id_list,[, level]) -> Array
     *  - branch (Array | Object): NCX NavPoint object
     *  - path (Array): Base path
     *  - id_list (Object): map of file paths and id values
     *  - level (Number): deepness
     *
     *  Walks the NavMap object through all levels and finds elements
     *  for TOC
     **/
    walkNavMap(branch, path2, id_list, level, pe, parentNcx, ncx_idx) {
      ncx_idx = ncx_idx || {
        index: 0
      };
      level = level || 0;
      this.ncx_depth = Math.max(level + 1, this.ncx_depth || 0);
      if (level > 7) {
        return [];
      }
      var output = [];
      if (!Array.isArray(branch)) {
        branch = [branch];
      }
      this.ncx = this.ncx || [];
      for (var i = 0; i < branch.length; i++) {
        let element;
        let currentNcx;
        if (branch[i].navLabel) {
          var title = "";
          if (branch[i].navLabel && typeof branch[i].navLabel.text == "string") {
            title = (branch[i].navLabel && branch[i].navLabel.text || branch[i].navLabel || "").trim();
          }
          var order = Number(branch[i]["@"] && branch[i]["@"].playOrder || 0);
          if (isNaN(order)) {
            order = 0;
          }
          var href = "";
          if (branch[i].content && branch[i].content["@"] && typeof branch[i].content["@"].src == "string") {
            href = branch[i].content["@"].src.trim();
          }
          element = {
            level,
            order,
            title
          };
          if (href) {
            href = path2.concat([href]).join("/");
            element.href = href;
            if (id_list[element.href]) {
              element = this.manifest[id_list[element.href]];
              element.title = title;
              element.order = order;
              element.level = level;
            } else {
              element.href = href;
              element.id = (branch[i]["@"] && branch[i]["@"].id || "").trim();
            }
            if (level == 0) {
              let idx = this.ncx.length;
              currentNcx = this.ncx[idx] = {
                id: element.id,
                ncx_index: idx,
                ncx_index2: ncx_idx.index++,
                level,
                sub: []
              };
            } else if (parentNcx) {
              let idx = parentNcx.sub.length;
              currentNcx = parentNcx.sub[parentNcx.sub.length] = {
                id: element.id,
                ncx_index: idx,
                ncx_index2: ncx_idx.index++,
                level,
                sub: []
              };
            }
            output.push(element);
          }
        }
        if (branch[i].navPoint) {
          output = output.concat(this.walkNavMap(branch[i].navPoint, path2, id_list, level + 1, element, currentNcx, ncx_idx));
        }
      }
      return output;
    }
    /**
     *  EPub#getChapter(id, callback) -> undefined
     *  - id (String): Manifest id value for a chapter
     *  - callback (Function): callback function
     *
     *  Finds a chapter text for an id. Replaces image and link URL's, removes
     *  <head> etc. elements. Return only chapters with mime type application/xhtml+xml
     **/
    getChapter(chapterId, callback) {
      let self2 = this;
      this.getChapterRaw(chapterId, (err, str) => {
        if (err) {
          callback(err);
          return;
        }
        let meta = self2.manifest[chapterId];
        var i, len, path2 = this.rootFile.split("/"), keys = Object.keys(this.manifest);
        path2.pop();
        let basePath = (0, path_1.dirname)(meta.href);
        meta.href;
        str = str.replace(/\r?\n/g, "\0");
        str.replace(/<body[^>]*?>(.*)<\/body[^>]*?>/i, function(o, d) {
          str = d.trim();
        });
        str = str.replace(/<script[^>]*?>(.*?)<\/script[^>]*?>/ig, function(o, s) {
          return "";
        });
        str = str.replace(/<style[^>]*?>(.*?)<\/style[^>]*?>/ig, function(o, s) {
          return "";
        });
        str = str.replace(/(\s)(on\w+)(\s*=\s*["']?[^"'\s>]*?["'\s>])/g, function(o, a, b, c) {
          return a + "skip-" + b + c;
        });
        str = str.replace(new RegExp(`(?<=\\s|^)(src\\s*=\\s*)(["']?)([^"'\\n]*?)(\\2)`, "g"), (o, a, d, b, c) => {
          let img = path_1.posix.join(basePath, b);
          let element;
          for (i = 0, len = keys.length; i < len; i++) {
            let _arr = [
              self2.manifest[keys[i]].href,
              decodeURI(self2.manifest[keys[i]].href),
              encodeURI(self2.manifest[keys[i]].href)
            ];
            if (_arr.includes(img)) {
              element = self2.manifest[keys[i]];
              break;
            }
          }
          if (element) {
            let s = a + d + (0, url_1.resolve)(this.imageroot, img) + c;
            return s;
          }
          return o;
        });
        str = str.replace(/(\shref\s*=\s*["']?)([^"'\s>]*?)(["'\s>])/g, (o, a, b, c) => {
          var linkparts = b && b.split("#"), link = path2.concat([linkparts.shift() || ""]).join("/").trim(), element;
          for (i = 0, len = keys.length; i < len; i++) {
            if (this.manifest[keys[i]].href.split("#")[0] == link) {
              element = this.manifest[keys[i]];
              break;
            }
          }
          if (linkparts.length) {
            link += "#" + linkparts.join("#");
          }
          if (element) {
            return a + this.linkroot + element.id + "/" + link + c;
          } else {
            return a + b + c;
          }
        });
        str = str.replace(/\u0000/g, "\n").trim();
        callback(null, str);
      });
    }
    /**
     *  EPub#getChapterRaw(id, callback) -> undefined
     *  - id (String): Manifest id value for a chapter
     *  - callback (Function): callback function
     *
     *  Returns the raw chapter text for an id.
     **/
    getChapterRaw(chapterId, callback) {
      if (this.manifest[chapterId]) {
        if (!(this.manifest[chapterId]["media-type"] == "application/xhtml+xml" || this.manifest[chapterId]["media-type"] == "image/svg+xml")) {
          return callback(new Error(`Invalid mime type for chapter "${chapterId}" ${this.manifest[chapterId]["media-type"]}`));
        }
        this.zip.readFile(this.manifest[chapterId].href, (function(err, data) {
          if (err) {
            callback(new Error(`Reading archive failed "${chapterId}", ${this.manifest[chapterId].href}`));
            return;
          } else if (!data) {
            callback(new Error(`Reading archive failed "${chapterId}", ${this.manifest[chapterId].href}`));
            return;
          }
          callback(null, (0, crlf_normalize_1.crlf)(data.toString("utf-8")));
        }).bind(this));
      } else {
        callback(new Error(`File not found "${chapterId}"`));
      }
    }
    /**
     *  EPub#getImage(id, callback) -> undefined
     *  - id (String): Manifest id value for an image
     *  - callback (Function): callback function
     *
     *  Finds an image for an id. Returns the image as Buffer. Callback gets
     *  an error object, image buffer and image content-type.
     *  Return only images with mime type image
     **/
    getImage(id, callback) {
      if (this.manifest[id]) {
        if ((this.manifest[id]["media-type"] || "").toLowerCase().trim().substr(0, 6) != "image/") {
          return callback(new Error("Invalid mime type for image"));
        }
        this.getFile(id, callback);
      } else {
        callback(new Error("File not found"));
      }
    }
    /**
     *  EPub#getFile(id, callback) -> undefined
     *  - id (String): Manifest id value for a file
     *  - callback (Function): callback function
     *
     *  Finds a file for an id. Returns the file as Buffer. Callback gets
     *  an error object, file contents buffer and file content-type.
     **/
    getFile(id, callback) {
      if (this.manifest[id]) {
        let self2 = this;
        this.zip.readFile(this.manifest[id].href, (err, data) => {
          if (err) {
            callback(new Error(`Reading archive failed ${self2.manifest[id].href}`));
            return;
          }
          callback(null, data, this.manifest[id]["media-type"]);
        });
      } else {
        callback(new RangeError(`File not found "${id}"`));
      }
    }
    readFile(filename, options, callback_) {
      let callback = arguments[arguments.length - 1];
      if (typeof options === "function" || !options) {
        this.zip.readFile(filename, callback);
      } else if (typeof options === "string") {
        this.zip.readFile(filename, function(err, data) {
          if (err) {
            callback(new Error(`Reading archive failed ${filename}`));
            return;
          }
          callback(null, data.toString(options));
        });
      } else {
        throw new TypeError("Bad arguments");
      }
    }
  }
  epub.EPub = EPub2;
  EPub2.SYMBOL_RAW_DATA = types_1.SYMBOL_RAW_DATA;
  EPub2.IMAGE_ROOT = "/images/";
  EPub2.LINK_ROOT = "/links/";
  EPub2.ELEM_MEDIA_TYPE = "media-type";
  EPub2.ELEM_MEDIA_TYPE2 = "mediaType";
  EPub2.xml2jsOptions = Object.assign({}, xml2js_1.default.defaults["0.1"]);
  epub.default = EPub2;
  return epub;
}
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.EPub = exports.SYMBOL_RAW_DATA = void 0;
  const tslib_1 = require$$0;
  const bluebird_12 = tslib_1.__importDefault(requireBluebird());
  const path_1 = tslib_1.__importDefault(require$$1$1);
  const epub_1 = requireEpub();
  var types_1 = requireTypes();
  Object.defineProperty(exports, "SYMBOL_RAW_DATA", { enumerable: true, get: function() {
    return types_1.SYMBOL_RAW_DATA;
  } });
  class EPub2 extends epub_1.EPub {
    static createAsync(epubfile, imagewebroot, chapterwebroot, ...argv) {
      const self2 = this;
      const p = self2.libPromise;
      return new p(function(resolve, reject) {
        const epub3 = self2.create(epubfile, imagewebroot, chapterwebroot, ...argv);
        const cb_err = function(err) {
          err.epub = epub3;
          return reject(err);
        };
        epub3.on("error", cb_err);
        epub3.on("end", function(err) {
          if (err) {
            cb_err(err);
          } else {
            resolve(this);
          }
        });
        epub3.parse();
      });
    }
    _p_method_cb(method2, options = {}, ...argv) {
      const self2 = this;
      this._getStatic().libPromise;
      return bluebird_12.default.fromCallback(method2.bind(self2, argv), options);
    }
    getChapterAsync(chapterId) {
      return this._p_method_cb(this.getChapter, null, chapterId);
    }
    getChapterRawAsync(chapterId) {
      return this._p_method_cb(this.getChapterRaw, null, chapterId);
    }
    getFileAsync(id) {
      return this._p_method_cb(this.getFile, {
        multiArgs: true
      }, id);
    }
    getImageAsync(id) {
      return this._p_method_cb(this.getImage, {
        multiArgs: true
      }, id);
    }
    listImage() {
      const epub3 = this;
      const mimes = [
        "image/jpeg"
      ];
      const exts = [
        "jpg",
        "png",
        "gif",
        "webp",
        "tif",
        "bmp"
        //'jxr',
        //'psd'
      ];
      return Object.keys(epub3.manifest).reduce(function(a, id) {
        let elem = epub3.manifest[id];
        let mime = elem["media-type"] || elem.mediaType;
        if (mimes.includes(mime) || mime.indexOf("image") == 0 || exts.includes(path_1.default.extname(elem.href))) {
          a.push(elem);
        }
        return a;
      }, []);
    }
  }
  exports.EPub = EPub2;
  EPub2.xml2jsOptions = Object.assign({}, epub_1.EPub.xml2jsOptions, {
    normalize: null
  });
  EPub2.libPromise = bluebird_12.default;
  exports.default = EPub2;
})(epub2);
const EPub = /* @__PURE__ */ getDefaultExportFromCjs(epub2);
createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(() => {
  createWindow();
  ipcMain.handle("open-file", async (_event, filePath) => {
    try {
      await fs.promises.access(filePath, fs.constants.F_OK);
      return filePath;
    } catch (error) {
      console.error("Error opening file:", error);
      throw new Error("Failed to open file");
    }
  });
  ipcMain.handle("open-file-dialog", async (_event, filters) => {
    try {
      const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ["openFile"],
        filters: filters || [{ name: "All Files", extensions: ["*"] }]
      });
      if (canceled || filePaths.length === 0) {
        return null;
      }
      return filePaths[0];
    } catch (error) {
      console.error("Error showing open dialog:", error);
      throw new Error("Failed to show open dialog");
    }
  });
  ipcMain.handle("parse-epub", async (_event, filePath) => {
    try {
      await fs.promises.access(filePath, fs.constants.F_OK);
      const epub3 = await EPub.createAsync(filePath);
      const metadata = {
        title: epub3.metadata.title,
        creator: epub3.metadata.creator,
        language: epub3.metadata.language,
        publisher: epub3.metadata.publisher,
        description: epub3.metadata.description,
        cover: epub3.metadata.cover,
        coverPath: epub3.getCoverPath ? epub3.getCoverPath() : null
      };
      const toc = epub3.toc.map((item) => ({
        level: item.level,
        order: item.order,
        title: item.title,
        href: item.href,
        id: item.id
      }));
      const spine = epub3.spine.contents.map((item) => ({
        id: item.id,
        mediaType: item["media-type"],
        href: item.href
      }));
      return {
        path: filePath,
        metadata,
        toc,
        spine,
        ncxPath: epub3.ncxPath,
        opfPath: epub3.opfPath
      };
    } catch (error) {
      console.error("Error parsing EPUB:", error);
      throw new Error(`Failed to parse EPUB: ${error.message}`);
    }
  });
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
