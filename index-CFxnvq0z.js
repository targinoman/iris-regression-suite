var jd = e => {
    throw TypeError(e)
}
;
var io = (e, t, n) => t.has(e) || jd("Cannot " + n);
var v = (e, t, n) => (io(e, t, "read from private field"),
n ? n.call(e) : t.get(e))
  , B = (e, t, n) => t.has(e) ? jd("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n)
  , M = (e, t, n, r) => (io(e, t, "write to private field"),
r ? r.call(e, n) : t.set(e, n),
n)
  , Y = (e, t, n) => (io(e, t, "access private method"),
n);
var gl = (e, t, n, r) => ({
    set _(i) {
        M(e, t, i, n)
    },
    get _() {
        return v(e, t, r)
    }
});
function kh(e, t) {
    for (var n = 0; n < t.length; n++) {
        const r = t[n];
        if (typeof r != "string" && !Array.isArray(r)) {
            for (const i in r)
                if (i !== "default" && !(i in e)) {
                    const s = Object.getOwnPropertyDescriptor(r, i);
                    s && Object.defineProperty(e, i, s.get ? s : {
                        enumerable: !0,
                        get: () => r[i]
                    })
                }
        }
    }
    return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
    }))
}
(function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload"))
        return;
    for (const i of document.querySelectorAll('link[rel="modulepreload"]'))
        r(i);
    new MutationObserver(i => {
        for (const s of i)
            if (s.type === "childList")
                for (const a of s.addedNodes)
                    a.tagName === "LINK" && a.rel === "modulepreload" && r(a)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function n(i) {
        const s = {};
        return i.integrity && (s.integrity = i.integrity),
        i.referrerPolicy && (s.referrerPolicy = i.referrerPolicy),
        i.crossOrigin === "use-credentials" ? s.credentials = "include" : i.crossOrigin === "anonymous" ? s.credentials = "omit" : s.credentials = "same-origin",
        s
    }
    function r(i) {
        if (i.ep)
            return;
        i.ep = !0;
        const s = n(i);
        fetch(i.href, s)
    }
}
)();
function Eh(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}
var Nh = {
    exports: {}
}
  , _a = {}
  , bh = {
    exports: {}
}
  , J = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var tl = Symbol.for("react.element")
  , zy = Symbol.for("react.portal")
  , Uy = Symbol.for("react.fragment")
  , Qy = Symbol.for("react.strict_mode")
  , Hy = Symbol.for("react.profiler")
  , By = Symbol.for("react.provider")
  , $y = Symbol.for("react.context")
  , Wy = Symbol.for("react.forward_ref")
  , Vy = Symbol.for("react.suspense")
  , Ky = Symbol.for("react.memo")
  , Gy = Symbol.for("react.lazy")
  , Sd = Symbol.iterator;
function qy(e) {
    return e === null || typeof e != "object" ? null : (e = Sd && e[Sd] || e["@@iterator"],
    typeof e == "function" ? e : null)
}
var Ch = {
    isMounted: function() {
        return !1
    },
    enqueueForceUpdate: function() {},
    enqueueReplaceState: function() {},
    enqueueSetState: function() {}
}
  , Rh = Object.assign
  , Ph = {};
function Vi(e, t, n) {
    this.props = e,
    this.context = t,
    this.refs = Ph,
    this.updater = n || Ch
}
Vi.prototype.isReactComponent = {};
Vi.prototype.setState = function(e, t) {
    if (typeof e != "object" && typeof e != "function" && e != null)
        throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, e, t, "setState")
}
;
Vi.prototype.forceUpdate = function(e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate")
}
;
function Th() {}
Th.prototype = Vi.prototype;
function Zu(e, t, n) {
    this.props = e,
    this.context = t,
    this.refs = Ph,
    this.updater = n || Ch
}
var ec = Zu.prototype = new Th;
ec.constructor = Zu;
Rh(ec, Vi.prototype);
ec.isPureReactComponent = !0;
var kd = Array.isArray
  , _h = Object.prototype.hasOwnProperty
  , tc = {
    current: null
}
  , Lh = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
};
function Oh(e, t, n) {
    var r, i = {}, s = null, a = null;
    if (t != null)
        for (r in t.ref !== void 0 && (a = t.ref),
        t.key !== void 0 && (s = "" + t.key),
        t)
            _h.call(t, r) && !Lh.hasOwnProperty(r) && (i[r] = t[r]);
    var o = arguments.length - 2;
    if (o === 1)
        i.children = n;
    else if (1 < o) {
        for (var u = Array(o), c = 0; c < o; c++)
            u[c] = arguments[c + 2];
        i.children = u
    }
    if (e && e.defaultProps)
        for (r in o = e.defaultProps,
        o)
            i[r] === void 0 && (i[r] = o[r]);
    return {
        $$typeof: tl,
        type: e,
        key: s,
        ref: a,
        props: i,
        _owner: tc.current
    }
}
function Yy(e, t) {
    return {
        $$typeof: tl,
        type: e.type,
        key: t,
        ref: e.ref,
        props: e.props,
        _owner: e._owner
    }
}
function nc(e) {
    return typeof e == "object" && e !== null && e.$$typeof === tl
}
function Xy(e) {
    var t = {
        "=": "=0",
        ":": "=2"
    };
    return "$" + e.replace(/[=:]/g, function(n) {
        return t[n]
    })
}
var Ed = /\/+/g;
function so(e, t) {
    return typeof e == "object" && e !== null && e.key != null ? Xy("" + e.key) : t.toString(36)
}
function zl(e, t, n, r, i) {
    var s = typeof e;
    (s === "undefined" || s === "boolean") && (e = null);
    var a = !1;
    if (e === null)
        a = !0;
    else
        switch (s) {
        case "string":
        case "number":
            a = !0;
            break;
        case "object":
            switch (e.$$typeof) {
            case tl:
            case zy:
                a = !0
            }
        }
    if (a)
        return a = e,
        i = i(a),
        e = r === "" ? "." + so(a, 0) : r,
        kd(i) ? (n = "",
        e != null && (n = e.replace(Ed, "$&/") + "/"),
        zl(i, t, n, "", function(c) {
            return c
        })) : i != null && (nc(i) && (i = Yy(i, n + (!i.key || a && a.key === i.key ? "" : ("" + i.key).replace(Ed, "$&/") + "/") + e)),
        t.push(i)),
        1;
    if (a = 0,
    r = r === "" ? "." : r + ":",
    kd(e))
        for (var o = 0; o < e.length; o++) {
            s = e[o];
            var u = r + so(s, o);
            a += zl(s, t, n, u, i)
        }
    else if (u = qy(e),
    typeof u == "function")
        for (e = u.call(e),
        o = 0; !(s = e.next()).done; )
            s = s.value,
            u = r + so(s, o++),
            a += zl(s, t, n, u, i);
    else if (s === "object")
        throw t = String(e),
        Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
    return a
}
function xl(e, t, n) {
    if (e == null)
        return e;
    var r = []
      , i = 0;
    return zl(e, r, "", "", function(s) {
        return t.call(n, s, i++)
    }),
    r
}
function Jy(e) {
    if (e._status === -1) {
        var t = e._result;
        t = t(),
        t.then(function(n) {
            (e._status === 0 || e._status === -1) && (e._status = 1,
            e._result = n)
        }, function(n) {
            (e._status === 0 || e._status === -1) && (e._status = 2,
            e._result = n)
        }),
        e._status === -1 && (e._status = 0,
        e._result = t)
    }
    if (e._status === 1)
        return e._result.default;
    throw e._result
}
var it = {
    current: null
}
  , Ul = {
    transition: null
}
  , Zy = {
    ReactCurrentDispatcher: it,
    ReactCurrentBatchConfig: Ul,
    ReactCurrentOwner: tc
};
function Ih() {
    throw Error("act(...) is not supported in production builds of React.")
}
J.Children = {
    map: xl,
    forEach: function(e, t, n) {
        xl(e, function() {
            t.apply(this, arguments)
        }, n)
    },
    count: function(e) {
        var t = 0;
        return xl(e, function() {
            t++
        }),
        t
    },
    toArray: function(e) {
        return xl(e, function(t) {
            return t
        }) || []
    },
    only: function(e) {
        if (!nc(e))
            throw Error("React.Children.only expected to receive a single React element child.");
        return e
    }
};
J.Component = Vi;
J.Fragment = Uy;
J.Profiler = Hy;
J.PureComponent = Zu;
J.StrictMode = Qy;
J.Suspense = Vy;
J.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Zy;
J.act = Ih;
J.cloneElement = function(e, t, n) {
    if (e == null)
        throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
    var r = Rh({}, e.props)
      , i = e.key
      , s = e.ref
      , a = e._owner;
    if (t != null) {
        if (t.ref !== void 0 && (s = t.ref,
        a = tc.current),
        t.key !== void 0 && (i = "" + t.key),
        e.type && e.type.defaultProps)
            var o = e.type.defaultProps;
        for (u in t)
            _h.call(t, u) && !Lh.hasOwnProperty(u) && (r[u] = t[u] === void 0 && o !== void 0 ? o[u] : t[u])
    }
    var u = arguments.length - 2;
    if (u === 1)
        r.children = n;
    else if (1 < u) {
        o = Array(u);
        for (var c = 0; c < u; c++)
            o[c] = arguments[c + 2];
        r.children = o
    }
    return {
        $$typeof: tl,
        type: e.type,
        key: i,
        ref: s,
        props: r,
        _owner: a
    }
}
;
J.createContext = function(e) {
    return e = {
        $$typeof: $y,
        _currentValue: e,
        _currentValue2: e,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null
    },
    e.Provider = {
        $$typeof: By,
        _context: e
    },
    e.Consumer = e
}
;
J.createElement = Oh;
J.createFactory = function(e) {
    var t = Oh.bind(null, e);
    return t.type = e,
    t
}
;
J.createRef = function() {
    return {
        current: null
    }
}
;
J.forwardRef = function(e) {
    return {
        $$typeof: Wy,
        render: e
    }
}
;
J.isValidElement = nc;
J.lazy = function(e) {
    return {
        $$typeof: Gy,
        _payload: {
            _status: -1,
            _result: e
        },
        _init: Jy
    }
}
;
J.memo = function(e, t) {
    return {
        $$typeof: Ky,
        type: e,
        compare: t === void 0 ? null : t
    }
}
;
J.startTransition = function(e) {
    var t = Ul.transition;
    Ul.transition = {};
    try {
        e()
    } finally {
        Ul.transition = t
    }
}
;
J.unstable_act = Ih;
J.useCallback = function(e, t) {
    return it.current.useCallback(e, t)
}
;
J.useContext = function(e) {
    return it.current.useContext(e)
}
;
J.useDebugValue = function() {}
;
J.useDeferredValue = function(e) {
    return it.current.useDeferredValue(e)
}
;
J.useEffect = function(e, t) {
    return it.current.useEffect(e, t)
}
;
J.useId = function() {
    return it.current.useId()
}
;
J.useImperativeHandle = function(e, t, n) {
    return it.current.useImperativeHandle(e, t, n)
}
;
J.useInsertionEffect = function(e, t) {
    return it.current.useInsertionEffect(e, t)
}
;
J.useLayoutEffect = function(e, t) {
    return it.current.useLayoutEffect(e, t)
}
;
J.useMemo = function(e, t) {
    return it.current.useMemo(e, t)
}
;
J.useReducer = function(e, t, n) {
    return it.current.useReducer(e, t, n)
}
;
J.useRef = function(e) {
    return it.current.useRef(e)
}
;
J.useState = function(e) {
    return it.current.useState(e)
}
;
J.useSyncExternalStore = function(e, t, n) {
    return it.current.useSyncExternalStore(e, t, n)
}
;
J.useTransition = function() {
    return it.current.useTransition()
}
;
J.version = "18.3.1";
bh.exports = J;
var N = bh.exports;
const Dh = Eh(N)
  , ev = kh({
    __proto__: null,
    default: Dh
}, [N]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var tv = N
  , nv = Symbol.for("react.element")
  , rv = Symbol.for("react.fragment")
  , iv = Object.prototype.hasOwnProperty
  , sv = tv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner
  , lv = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
};
function Mh(e, t, n) {
    var r, i = {}, s = null, a = null;
    n !== void 0 && (s = "" + n),
    t.key !== void 0 && (s = "" + t.key),
    t.ref !== void 0 && (a = t.ref);
    for (r in t)
        iv.call(t, r) && !lv.hasOwnProperty(r) && (i[r] = t[r]);
    if (e && e.defaultProps)
        for (r in t = e.defaultProps,
        t)
            i[r] === void 0 && (i[r] = t[r]);
    return {
        $$typeof: nv,
        type: e,
        key: s,
        ref: a,
        props: i,
        _owner: sv.current
    }
}
_a.Fragment = rv;
_a.jsx = Mh;
_a.jsxs = Mh;
Nh.exports = _a;
var l = Nh.exports
  , Fo = {}
  , Fh = {
    exports: {}
}
  , bt = {}
  , Ah = {
    exports: {}
}
  , zh = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
    function t(I, W) {
        var K = I.length;
        I.push(W);
        e: for (; 0 < K; ) {
            var oe = K - 1 >>> 1
              , ue = I[oe];
            if (0 < i(ue, W))
                I[oe] = W,
                I[K] = ue,
                K = oe;
            else
                break e
        }
    }
    function n(I) {
        return I.length === 0 ? null : I[0]
    }
    function r(I) {
        if (I.length === 0)
            return null;
        var W = I[0]
          , K = I.pop();
        if (K !== W) {
            I[0] = K;
            e: for (var oe = 0, ue = I.length, Mt = ue >>> 1; oe < Mt; ) {
                var gt = 2 * (oe + 1) - 1
                  , qe = I[gt]
                  , Ye = gt + 1
                  , Rt = I[Ye];
                if (0 > i(qe, K))
                    Ye < ue && 0 > i(Rt, qe) ? (I[oe] = Rt,
                    I[Ye] = K,
                    oe = Ye) : (I[oe] = qe,
                    I[gt] = K,
                    oe = gt);
                else if (Ye < ue && 0 > i(Rt, K))
                    I[oe] = Rt,
                    I[Ye] = K,
                    oe = Ye;
                else
                    break e
            }
        }
        return W
    }
    function i(I, W) {
        var K = I.sortIndex - W.sortIndex;
        return K !== 0 ? K : I.id - W.id
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
        var s = performance;
        e.unstable_now = function() {
            return s.now()
        }
    } else {
        var a = Date
          , o = a.now();
        e.unstable_now = function() {
            return a.now() - o
        }
    }
    var u = []
      , c = []
      , d = 1
      , f = null
      , m = 3
      , y = !1
      , S = !1
      , w = !1
      , b = typeof setTimeout == "function" ? setTimeout : null
      , p = typeof clearTimeout == "function" ? clearTimeout : null
      , h = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function g(I) {
        for (var W = n(c); W !== null; ) {
            if (W.callback === null)
                r(c);
            else if (W.startTime <= I)
                r(c),
                W.sortIndex = W.expirationTime,
                t(u, W);
            else
                break;
            W = n(c)
        }
    }
    function k(I) {
        if (w = !1,
        g(I),
        !S)
            if (n(u) !== null)
                S = !0,
                Ln(P);
            else {
                var W = n(c);
                W !== null && On(k, W.startTime - I)
            }
    }
    function P(I, W) {
        S = !1,
        w && (w = !1,
        p(R),
        R = -1),
        y = !0;
        var K = m;
        try {
            for (g(W),
            f = n(u); f !== null && (!(f.expirationTime > W) || I && !X()); ) {
                var oe = f.callback;
                if (typeof oe == "function") {
                    f.callback = null,
                    m = f.priorityLevel;
                    var ue = oe(f.expirationTime <= W);
                    W = e.unstable_now(),
                    typeof ue == "function" ? f.callback = ue : f === n(u) && r(u),
                    g(W)
                } else
                    r(u);
                f = n(u)
            }
            if (f !== null)
                var Mt = !0;
            else {
                var gt = n(c);
                gt !== null && On(k, gt.startTime - W),
                Mt = !1
            }
            return Mt
        } finally {
            f = null,
            m = K,
            y = !1
        }
    }
    var O = !1
      , j = null
      , R = -1
      , F = 5
      , L = -1;
    function X() {
        return !(e.unstable_now() - L < F)
    }
    function re() {
        if (j !== null) {
            var I = e.unstable_now();
            L = I;
            var W = !0;
            try {
                W = j(!0, I)
            } finally {
                W ? we() : (O = !1,
                j = null)
            }
        } else
            O = !1
    }
    var we;
    if (typeof h == "function")
        we = function() {
            h(re)
        }
        ;
    else if (typeof MessageChannel < "u") {
        var je = new MessageChannel
          , He = je.port2;
        je.port1.onmessage = re,
        we = function() {
            He.postMessage(null)
        }
    } else
        we = function() {
            b(re, 0)
        }
        ;
    function Ln(I) {
        j = I,
        O || (O = !0,
        we())
    }
    function On(I, W) {
        R = b(function() {
            I(e.unstable_now())
        }, W)
    }
    e.unstable_IdlePriority = 5,
    e.unstable_ImmediatePriority = 1,
    e.unstable_LowPriority = 4,
    e.unstable_NormalPriority = 3,
    e.unstable_Profiling = null,
    e.unstable_UserBlockingPriority = 2,
    e.unstable_cancelCallback = function(I) {
        I.callback = null
    }
    ,
    e.unstable_continueExecution = function() {
        S || y || (S = !0,
        Ln(P))
    }
    ,
    e.unstable_forceFrameRate = function(I) {
        0 > I || 125 < I ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : F = 0 < I ? Math.floor(1e3 / I) : 5
    }
    ,
    e.unstable_getCurrentPriorityLevel = function() {
        return m
    }
    ,
    e.unstable_getFirstCallbackNode = function() {
        return n(u)
    }
    ,
    e.unstable_next = function(I) {
        switch (m) {
        case 1:
        case 2:
        case 3:
            var W = 3;
            break;
        default:
            W = m
        }
        var K = m;
        m = W;
        try {
            return I()
        } finally {
            m = K
        }
    }
    ,
    e.unstable_pauseExecution = function() {}
    ,
    e.unstable_requestPaint = function() {}
    ,
    e.unstable_runWithPriority = function(I, W) {
        switch (I) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            break;
        default:
            I = 3
        }
        var K = m;
        m = I;
        try {
            return W()
        } finally {
            m = K
        }
    }
    ,
    e.unstable_scheduleCallback = function(I, W, K) {
        var oe = e.unstable_now();
        switch (typeof K == "object" && K !== null ? (K = K.delay,
        K = typeof K == "number" && 0 < K ? oe + K : oe) : K = oe,
        I) {
        case 1:
            var ue = -1;
            break;
        case 2:
            ue = 250;
            break;
        case 5:
            ue = 1073741823;
            break;
        case 4:
            ue = 1e4;
            break;
        default:
            ue = 5e3
        }
        return ue = K + ue,
        I = {
            id: d++,
            callback: W,
            priorityLevel: I,
            startTime: K,
            expirationTime: ue,
            sortIndex: -1
        },
        K > oe ? (I.sortIndex = K,
        t(c, I),
        n(u) === null && I === n(c) && (w ? (p(R),
        R = -1) : w = !0,
        On(k, K - oe))) : (I.sortIndex = ue,
        t(u, I),
        S || y || (S = !0,
        Ln(P))),
        I
    }
    ,
    e.unstable_shouldYield = X,
    e.unstable_wrapCallback = function(I) {
        var W = m;
        return function() {
            var K = m;
            m = W;
            try {
                return I.apply(this, arguments)
            } finally {
                m = K
            }
        }
    }
}
)(zh);
Ah.exports = zh;
var av = Ah.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ov = N
  , Nt = av;
function _(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++)
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
}
var Uh = new Set
  , Rs = {};
function Gr(e, t) {
    Mi(e, t),
    Mi(e + "Capture", t)
}
function Mi(e, t) {
    for (Rs[e] = t,
    e = 0; e < t.length; e++)
        Uh.add(t[e])
}
var jn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u")
  , Ao = Object.prototype.hasOwnProperty
  , uv = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/
  , Nd = {}
  , bd = {};
function cv(e) {
    return Ao.call(bd, e) ? !0 : Ao.call(Nd, e) ? !1 : uv.test(e) ? bd[e] = !0 : (Nd[e] = !0,
    !1)
}
function dv(e, t, n, r) {
    if (n !== null && n.type === 0)
        return !1;
    switch (typeof t) {
    case "function":
    case "symbol":
        return !0;
    case "boolean":
        return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5),
        e !== "data-" && e !== "aria-");
    default:
        return !1
    }
}
function fv(e, t, n, r) {
    if (t === null || typeof t > "u" || dv(e, t, n, r))
        return !0;
    if (r)
        return !1;
    if (n !== null)
        switch (n.type) {
        case 3:
            return !t;
        case 4:
            return t === !1;
        case 5:
            return isNaN(t);
        case 6:
            return isNaN(t) || 1 > t
        }
    return !1
}
function st(e, t, n, r, i, s, a) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4,
    this.attributeName = r,
    this.attributeNamespace = i,
    this.mustUseProperty = n,
    this.propertyName = e,
    this.type = t,
    this.sanitizeURL = s,
    this.removeEmptyString = a
}
var Qe = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    Qe[e] = new st(e,0,!1,e,null,!1,!1)
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    Qe[t] = new st(t,1,!1,e[1],null,!1,!1)
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    Qe[e] = new st(e,2,!1,e.toLowerCase(),null,!1,!1)
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    Qe[e] = new st(e,2,!1,e,null,!1,!1)
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    Qe[e] = new st(e,3,!1,e.toLowerCase(),null,!1,!1)
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
    Qe[e] = new st(e,3,!0,e,null,!1,!1)
});
["capture", "download"].forEach(function(e) {
    Qe[e] = new st(e,4,!1,e,null,!1,!1)
});
["cols", "rows", "size", "span"].forEach(function(e) {
    Qe[e] = new st(e,6,!1,e,null,!1,!1)
});
["rowSpan", "start"].forEach(function(e) {
    Qe[e] = new st(e,5,!1,e.toLowerCase(),null,!1,!1)
});
var rc = /[\-:]([a-z])/g;
function ic(e) {
    return e[1].toUpperCase()
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(rc, ic);
    Qe[t] = new st(t,1,!1,e,null,!1,!1)
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(rc, ic);
    Qe[t] = new st(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(rc, ic);
    Qe[t] = new st(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)
});
["tabIndex", "crossOrigin"].forEach(function(e) {
    Qe[e] = new st(e,1,!1,e.toLowerCase(),null,!1,!1)
});
Qe.xlinkHref = new st("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);
["src", "href", "action", "formAction"].forEach(function(e) {
    Qe[e] = new st(e,1,!1,e.toLowerCase(),null,!0,!0)
});
function sc(e, t, n, r) {
    var i = Qe.hasOwnProperty(t) ? Qe[t] : null;
    (i !== null ? i.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (fv(t, n, i, r) && (n = null),
    r || i === null ? cv(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : i.mustUseProperty ? e[i.propertyName] = n === null ? i.type === 3 ? !1 : "" : n : (t = i.attributeName,
    r = i.attributeNamespace,
    n === null ? e.removeAttribute(t) : (i = i.type,
    n = i === 3 || i === 4 && n === !0 ? "" : "" + n,
    r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))))
}
var Rn = ov.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
  , wl = Symbol.for("react.element")
  , ii = Symbol.for("react.portal")
  , si = Symbol.for("react.fragment")
  , lc = Symbol.for("react.strict_mode")
  , zo = Symbol.for("react.profiler")
  , Qh = Symbol.for("react.provider")
  , Hh = Symbol.for("react.context")
  , ac = Symbol.for("react.forward_ref")
  , Uo = Symbol.for("react.suspense")
  , Qo = Symbol.for("react.suspense_list")
  , oc = Symbol.for("react.memo")
  , zn = Symbol.for("react.lazy")
  , Bh = Symbol.for("react.offscreen")
  , Cd = Symbol.iterator;
function ts(e) {
    return e === null || typeof e != "object" ? null : (e = Cd && e[Cd] || e["@@iterator"],
    typeof e == "function" ? e : null)
}
var xe = Object.assign, lo;
function fs(e) {
    if (lo === void 0)
        try {
            throw Error()
        } catch (n) {
            var t = n.stack.trim().match(/\n( *(at )?)/);
            lo = t && t[1] || ""
        }
    return `
` + lo + e
}
var ao = !1;
function oo(e, t) {
    if (!e || ao)
        return "";
    ao = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
        if (t)
            if (t = function() {
                throw Error()
            }
            ,
            Object.defineProperty(t.prototype, "props", {
                set: function() {
                    throw Error()
                }
            }),
            typeof Reflect == "object" && Reflect.construct) {
                try {
                    Reflect.construct(t, [])
                } catch (c) {
                    var r = c
                }
                Reflect.construct(e, [], t)
            } else {
                try {
                    t.call()
                } catch (c) {
                    r = c
                }
                e.call(t.prototype)
            }
        else {
            try {
                throw Error()
            } catch (c) {
                r = c
            }
            e()
        }
    } catch (c) {
        if (c && r && typeof c.stack == "string") {
            for (var i = c.stack.split(`
`), s = r.stack.split(`
`), a = i.length - 1, o = s.length - 1; 1 <= a && 0 <= o && i[a] !== s[o]; )
                o--;
            for (; 1 <= a && 0 <= o; a--,
            o--)
                if (i[a] !== s[o]) {
                    if (a !== 1 || o !== 1)
                        do
                            if (a--,
                            o--,
                            0 > o || i[a] !== s[o]) {
                                var u = `
` + i[a].replace(" at new ", " at ");
                                return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)),
                                u
                            }
                        while (1 <= a && 0 <= o);
                    break
                }
        }
    } finally {
        ao = !1,
        Error.prepareStackTrace = n
    }
    return (e = e ? e.displayName || e.name : "") ? fs(e) : ""
}
function hv(e) {
    switch (e.tag) {
    case 5:
        return fs(e.type);
    case 16:
        return fs("Lazy");
    case 13:
        return fs("Suspense");
    case 19:
        return fs("SuspenseList");
    case 0:
    case 2:
    case 15:
        return e = oo(e.type, !1),
        e;
    case 11:
        return e = oo(e.type.render, !1),
        e;
    case 1:
        return e = oo(e.type, !0),
        e;
    default:
        return ""
    }
}
function Ho(e) {
    if (e == null)
        return null;
    if (typeof e == "function")
        return e.displayName || e.name || null;
    if (typeof e == "string")
        return e;
    switch (e) {
    case si:
        return "Fragment";
    case ii:
        return "Portal";
    case zo:
        return "Profiler";
    case lc:
        return "StrictMode";
    case Uo:
        return "Suspense";
    case Qo:
        return "SuspenseList"
    }
    if (typeof e == "object")
        switch (e.$$typeof) {
        case Hh:
            return (e.displayName || "Context") + ".Consumer";
        case Qh:
            return (e._context.displayName || "Context") + ".Provider";
        case ac:
            var t = e.render;
            return e = e.displayName,
            e || (e = t.displayName || t.name || "",
            e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"),
            e;
        case oc:
            return t = e.displayName || null,
            t !== null ? t : Ho(e.type) || "Memo";
        case zn:
            t = e._payload,
            e = e._init;
            try {
                return Ho(e(t))
            } catch {}
        }
    return null
}
function pv(e) {
    var t = e.type;
    switch (e.tag) {
    case 24:
        return "Cache";
    case 9:
        return (t.displayName || "Context") + ".Consumer";
    case 10:
        return (t._context.displayName || "Context") + ".Provider";
    case 18:
        return "DehydratedFragment";
    case 11:
        return e = t.render,
        e = e.displayName || e.name || "",
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
    case 7:
        return "Fragment";
    case 5:
        return t;
    case 4:
        return "Portal";
    case 3:
        return "Root";
    case 6:
        return "Text";
    case 16:
        return Ho(t);
    case 8:
        return t === lc ? "StrictMode" : "Mode";
    case 22:
        return "Offscreen";
    case 12:
        return "Profiler";
    case 21:
        return "Scope";
    case 13:
        return "Suspense";
    case 19:
        return "SuspenseList";
    case 25:
        return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
        if (typeof t == "function")
            return t.displayName || t.name || null;
        if (typeof t == "string")
            return t
    }
    return null
}
function dr(e) {
    switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
        return e;
    case "object":
        return e;
    default:
        return ""
    }
}
function $h(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio")
}
function mv(e) {
    var t = $h(e) ? "checked" : "value"
      , n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t)
      , r = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
        var i = n.get
          , s = n.set;
        return Object.defineProperty(e, t, {
            configurable: !0,
            get: function() {
                return i.call(this)
            },
            set: function(a) {
                r = "" + a,
                s.call(this, a)
            }
        }),
        Object.defineProperty(e, t, {
            enumerable: n.enumerable
        }),
        {
            getValue: function() {
                return r
            },
            setValue: function(a) {
                r = "" + a
            },
            stopTracking: function() {
                e._valueTracker = null,
                delete e[t]
            }
        }
    }
}
function jl(e) {
    e._valueTracker || (e._valueTracker = mv(e))
}
function Wh(e) {
    if (!e)
        return !1;
    var t = e._valueTracker;
    if (!t)
        return !0;
    var n = t.getValue()
      , r = "";
    return e && (r = $h(e) ? e.checked ? "true" : "false" : e.value),
    e = r,
    e !== n ? (t.setValue(e),
    !0) : !1
}
function ea(e) {
    if (e = e || (typeof document < "u" ? document : void 0),
    typeof e > "u")
        return null;
    try {
        return e.activeElement || e.body
    } catch {
        return e.body
    }
}
function Bo(e, t) {
    var n = t.checked;
    return xe({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n ?? e._wrapperState.initialChecked
    })
}
function Rd(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue
      , r = t.checked != null ? t.checked : t.defaultChecked;
    n = dr(t.value != null ? t.value : n),
    e._wrapperState = {
        initialChecked: r,
        initialValue: n,
        controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null
    }
}
function Vh(e, t) {
    t = t.checked,
    t != null && sc(e, "checked", t, !1)
}
function $o(e, t) {
    Vh(e, t);
    var n = dr(t.value)
      , r = t.type;
    if (n != null)
        r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
        e.removeAttribute("value");
        return
    }
    t.hasOwnProperty("value") ? Wo(e, t.type, n) : t.hasOwnProperty("defaultValue") && Wo(e, t.type, dr(t.defaultValue)),
    t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked)
}
function Pd(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var r = t.type;
        if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null))
            return;
        t = "" + e._wrapperState.initialValue,
        n || t === e.value || (e.value = t),
        e.defaultValue = t
    }
    n = e.name,
    n !== "" && (e.name = ""),
    e.defaultChecked = !!e._wrapperState.initialChecked,
    n !== "" && (e.name = n)
}
function Wo(e, t, n) {
    (t !== "number" || ea(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n))
}
var hs = Array.isArray;
function yi(e, t, n, r) {
    if (e = e.options,
    t) {
        t = {};
        for (var i = 0; i < n.length; i++)
            t["$" + n[i]] = !0;
        for (n = 0; n < e.length; n++)
            i = t.hasOwnProperty("$" + e[n].value),
            e[n].selected !== i && (e[n].selected = i),
            i && r && (e[n].defaultSelected = !0)
    } else {
        for (n = "" + dr(n),
        t = null,
        i = 0; i < e.length; i++) {
            if (e[i].value === n) {
                e[i].selected = !0,
                r && (e[i].defaultSelected = !0);
                return
            }
            t !== null || e[i].disabled || (t = e[i])
        }
        t !== null && (t.selected = !0)
    }
}
function Vo(e, t) {
    if (t.dangerouslySetInnerHTML != null)
        throw Error(_(91));
    return xe({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue
    })
}
function Td(e, t) {
    var n = t.value;
    if (n == null) {
        if (n = t.children,
        t = t.defaultValue,
        n != null) {
            if (t != null)
                throw Error(_(92));
            if (hs(n)) {
                if (1 < n.length)
                    throw Error(_(93));
                n = n[0]
            }
            t = n
        }
        t == null && (t = ""),
        n = t
    }
    e._wrapperState = {
        initialValue: dr(n)
    }
}
function Kh(e, t) {
    var n = dr(t.value)
      , r = dr(t.defaultValue);
    n != null && (n = "" + n,
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r)
}
function _d(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t)
}
function Gh(e) {
    switch (e) {
    case "svg":
        return "http://www.w3.org/2000/svg";
    case "math":
        return "http://www.w3.org/1998/Math/MathML";
    default:
        return "http://www.w3.org/1999/xhtml"
    }
}
function Ko(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? Gh(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e
}
var Sl, qh = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, i) {
        MSApp.execUnsafeLocalFunction(function() {
            return e(t, n, r, i)
        })
    }
    : e
}(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML"in e)
        e.innerHTML = t;
    else {
        for (Sl = Sl || document.createElement("div"),
        Sl.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
        t = Sl.firstChild; e.firstChild; )
            e.removeChild(e.firstChild);
        for (; t.firstChild; )
            e.appendChild(t.firstChild)
    }
});
function Ps(e, t) {
    if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
            n.nodeValue = t;
            return
        }
    }
    e.textContent = t
}
var gs = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
}
  , yv = ["Webkit", "ms", "Moz", "O"];
Object.keys(gs).forEach(function(e) {
    yv.forEach(function(t) {
        t = t + e.charAt(0).toUpperCase() + e.substring(1),
        gs[t] = gs[e]
    })
});
function Yh(e, t, n) {
    return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || gs.hasOwnProperty(e) && gs[e] ? ("" + t).trim() : t + "px"
}
function Xh(e, t) {
    e = e.style;
    for (var n in t)
        if (t.hasOwnProperty(n)) {
            var r = n.indexOf("--") === 0
              , i = Yh(n, t[n], r);
            n === "float" && (n = "cssFloat"),
            r ? e.setProperty(n, i) : e[n] = i
        }
}
var vv = xe({
    menuitem: !0
}, {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
});
function Go(e, t) {
    if (t) {
        if (vv[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
            throw Error(_(137, e));
        if (t.dangerouslySetInnerHTML != null) {
            if (t.children != null)
                throw Error(_(60));
            if (typeof t.dangerouslySetInnerHTML != "object" || !("__html"in t.dangerouslySetInnerHTML))
                throw Error(_(61))
        }
        if (t.style != null && typeof t.style != "object")
            throw Error(_(62))
    }
}
function qo(e, t) {
    if (e.indexOf("-") === -1)
        return typeof t.is == "string";
    switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
        return !1;
    default:
        return !0
    }
}
var Yo = null;
function uc(e) {
    return e = e.target || e.srcElement || window,
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
}
var Xo = null
  , vi = null
  , gi = null;
function Ld(e) {
    if (e = il(e)) {
        if (typeof Xo != "function")
            throw Error(_(280));
        var t = e.stateNode;
        t && (t = Ma(t),
        Xo(e.stateNode, e.type, t))
    }
}
function Jh(e) {
    vi ? gi ? gi.push(e) : gi = [e] : vi = e
}
function Zh() {
    if (vi) {
        var e = vi
          , t = gi;
        if (gi = vi = null,
        Ld(e),
        t)
            for (e = 0; e < t.length; e++)
                Ld(t[e])
    }
}
function ep(e, t) {
    return e(t)
}
function tp() {}
var uo = !1;
function np(e, t, n) {
    if (uo)
        return e(t, n);
    uo = !0;
    try {
        return ep(e, t, n)
    } finally {
        uo = !1,
        (vi !== null || gi !== null) && (tp(),
        Zh())
    }
}
function Ts(e, t) {
    var n = e.stateNode;
    if (n === null)
        return null;
    var r = Ma(n);
    if (r === null)
        return null;
    n = r[t];
    e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
        (r = !r.disabled) || (e = e.type,
        r = !(e === "button" || e === "input" || e === "select" || e === "textarea")),
        e = !r;
        break e;
    default:
        e = !1
    }
    if (e)
        return null;
    if (n && typeof n != "function")
        throw Error(_(231, t, typeof n));
    return n
}
var Jo = !1;
if (jn)
    try {
        var ns = {};
        Object.defineProperty(ns, "passive", {
            get: function() {
                Jo = !0
            }
        }),
        window.addEventListener("test", ns, ns),
        window.removeEventListener("test", ns, ns)
    } catch {
        Jo = !1
    }
function gv(e, t, n, r, i, s, a, o, u) {
    var c = Array.prototype.slice.call(arguments, 3);
    try {
        t.apply(n, c)
    } catch (d) {
        this.onError(d)
    }
}
var xs = !1
  , ta = null
  , na = !1
  , Zo = null
  , xv = {
    onError: function(e) {
        xs = !0,
        ta = e
    }
};
function wv(e, t, n, r, i, s, a, o, u) {
    xs = !1,
    ta = null,
    gv.apply(xv, arguments)
}
function jv(e, t, n, r, i, s, a, o, u) {
    if (wv.apply(this, arguments),
    xs) {
        if (xs) {
            var c = ta;
            xs = !1,
            ta = null
        } else
            throw Error(_(198));
        na || (na = !0,
        Zo = c)
    }
}
function qr(e) {
    var t = e
      , n = e;
    if (e.alternate)
        for (; t.return; )
            t = t.return;
    else {
        e = t;
        do
            t = e,
            t.flags & 4098 && (n = t.return),
            e = t.return;
        while (e)
    }
    return t.tag === 3 ? n : null
}
function rp(e) {
    if (e.tag === 13) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate,
        e !== null && (t = e.memoizedState)),
        t !== null)
            return t.dehydrated
    }
    return null
}
function Od(e) {
    if (qr(e) !== e)
        throw Error(_(188))
}
function Sv(e) {
    var t = e.alternate;
    if (!t) {
        if (t = qr(e),
        t === null)
            throw Error(_(188));
        return t !== e ? null : e
    }
    for (var n = e, r = t; ; ) {
        var i = n.return;
        if (i === null)
            break;
        var s = i.alternate;
        if (s === null) {
            if (r = i.return,
            r !== null) {
                n = r;
                continue
            }
            break
        }
        if (i.child === s.child) {
            for (s = i.child; s; ) {
                if (s === n)
                    return Od(i),
                    e;
                if (s === r)
                    return Od(i),
                    t;
                s = s.sibling
            }
            throw Error(_(188))
        }
        if (n.return !== r.return)
            n = i,
            r = s;
        else {
            for (var a = !1, o = i.child; o; ) {
                if (o === n) {
                    a = !0,
                    n = i,
                    r = s;
                    break
                }
                if (o === r) {
                    a = !0,
                    r = i,
                    n = s;
                    break
                }
                o = o.sibling
            }
            if (!a) {
                for (o = s.child; o; ) {
                    if (o === n) {
                        a = !0,
                        n = s,
                        r = i;
                        break
                    }
                    if (o === r) {
                        a = !0,
                        r = s,
                        n = i;
                        break
                    }
                    o = o.sibling
                }
                if (!a)
                    throw Error(_(189))
            }
        }
        if (n.alternate !== r)
            throw Error(_(190))
    }
    if (n.tag !== 3)
        throw Error(_(188));
    return n.stateNode.current === n ? e : t
}
function ip(e) {
    return e = Sv(e),
    e !== null ? sp(e) : null
}
function sp(e) {
    if (e.tag === 5 || e.tag === 6)
        return e;
    for (e = e.child; e !== null; ) {
        var t = sp(e);
        if (t !== null)
            return t;
        e = e.sibling
    }
    return null
}
var lp = Nt.unstable_scheduleCallback
  , Id = Nt.unstable_cancelCallback
  , kv = Nt.unstable_shouldYield
  , Ev = Nt.unstable_requestPaint
  , Re = Nt.unstable_now
  , Nv = Nt.unstable_getCurrentPriorityLevel
  , cc = Nt.unstable_ImmediatePriority
  , ap = Nt.unstable_UserBlockingPriority
  , ra = Nt.unstable_NormalPriority
  , bv = Nt.unstable_LowPriority
  , op = Nt.unstable_IdlePriority
  , La = null
  , sn = null;
function Cv(e) {
    if (sn && typeof sn.onCommitFiberRoot == "function")
        try {
            sn.onCommitFiberRoot(La, e, void 0, (e.current.flags & 128) === 128)
        } catch {}
}
var Kt = Math.clz32 ? Math.clz32 : Tv
  , Rv = Math.log
  , Pv = Math.LN2;
function Tv(e) {
    return e >>>= 0,
    e === 0 ? 32 : 31 - (Rv(e) / Pv | 0) | 0
}
var kl = 64
  , El = 4194304;
function ps(e) {
    switch (e & -e) {
    case 1:
        return 1;
    case 2:
        return 2;
    case 4:
        return 4;
    case 8:
        return 8;
    case 16:
        return 16;
    case 32:
        return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
        return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
        return e & 130023424;
    case 134217728:
        return 134217728;
    case 268435456:
        return 268435456;
    case 536870912:
        return 536870912;
    case 1073741824:
        return 1073741824;
    default:
        return e
    }
}
function ia(e, t) {
    var n = e.pendingLanes;
    if (n === 0)
        return 0;
    var r = 0
      , i = e.suspendedLanes
      , s = e.pingedLanes
      , a = n & 268435455;
    if (a !== 0) {
        var o = a & ~i;
        o !== 0 ? r = ps(o) : (s &= a,
        s !== 0 && (r = ps(s)))
    } else
        a = n & ~i,
        a !== 0 ? r = ps(a) : s !== 0 && (r = ps(s));
    if (r === 0)
        return 0;
    if (t !== 0 && t !== r && !(t & i) && (i = r & -r,
    s = t & -t,
    i >= s || i === 16 && (s & 4194240) !== 0))
        return t;
    if (r & 4 && (r |= n & 16),
    t = e.entangledLanes,
    t !== 0)
        for (e = e.entanglements,
        t &= r; 0 < t; )
            n = 31 - Kt(t),
            i = 1 << n,
            r |= e[n],
            t &= ~i;
    return r
}
function _v(e, t) {
    switch (e) {
    case 1:
    case 2:
    case 4:
        return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
        return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
        return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
        return -1;
    default:
        return -1
    }
}
function Lv(e, t) {
    for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, s = e.pendingLanes; 0 < s; ) {
        var a = 31 - Kt(s)
          , o = 1 << a
          , u = i[a];
        u === -1 ? (!(o & n) || o & r) && (i[a] = _v(o, t)) : u <= t && (e.expiredLanes |= o),
        s &= ~o
    }
}
function eu(e) {
    return e = e.pendingLanes & -1073741825,
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
}
function up() {
    var e = kl;
    return kl <<= 1,
    !(kl & 4194240) && (kl = 64),
    e
}
function co(e) {
    for (var t = [], n = 0; 31 > n; n++)
        t.push(e);
    return t
}
function nl(e, t, n) {
    e.pendingLanes |= t,
    t !== 536870912 && (e.suspendedLanes = 0,
    e.pingedLanes = 0),
    e = e.eventTimes,
    t = 31 - Kt(t),
    e[t] = n
}
function Ov(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t,
    e.suspendedLanes = 0,
    e.pingedLanes = 0,
    e.expiredLanes &= t,
    e.mutableReadLanes &= t,
    e.entangledLanes &= t,
    t = e.entanglements;
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
        var i = 31 - Kt(n)
          , s = 1 << i;
        t[i] = 0,
        r[i] = -1,
        e[i] = -1,
        n &= ~s
    }
}
function dc(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
        var r = 31 - Kt(n)
          , i = 1 << r;
        i & t | e[r] & t && (e[r] |= t),
        n &= ~i
    }
}
var ae = 0;
function cp(e) {
    return e &= -e,
    1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1
}
var dp, fc, fp, hp, pp, tu = !1, Nl = [], tr = null, nr = null, rr = null, _s = new Map, Ls = new Map, Qn = [], Iv = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Dd(e, t) {
    switch (e) {
    case "focusin":
    case "focusout":
        tr = null;
        break;
    case "dragenter":
    case "dragleave":
        nr = null;
        break;
    case "mouseover":
    case "mouseout":
        rr = null;
        break;
    case "pointerover":
    case "pointerout":
        _s.delete(t.pointerId);
        break;
    case "gotpointercapture":
    case "lostpointercapture":
        Ls.delete(t.pointerId)
    }
}
function rs(e, t, n, r, i, s) {
    return e === null || e.nativeEvent !== s ? (e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: s,
        targetContainers: [i]
    },
    t !== null && (t = il(t),
    t !== null && fc(t)),
    e) : (e.eventSystemFlags |= r,
    t = e.targetContainers,
    i !== null && t.indexOf(i) === -1 && t.push(i),
    e)
}
function Dv(e, t, n, r, i) {
    switch (t) {
    case "focusin":
        return tr = rs(tr, e, t, n, r, i),
        !0;
    case "dragenter":
        return nr = rs(nr, e, t, n, r, i),
        !0;
    case "mouseover":
        return rr = rs(rr, e, t, n, r, i),
        !0;
    case "pointerover":
        var s = i.pointerId;
        return _s.set(s, rs(_s.get(s) || null, e, t, n, r, i)),
        !0;
    case "gotpointercapture":
        return s = i.pointerId,
        Ls.set(s, rs(Ls.get(s) || null, e, t, n, r, i)),
        !0
    }
    return !1
}
function mp(e) {
    var t = Er(e.target);
    if (t !== null) {
        var n = qr(t);
        if (n !== null) {
            if (t = n.tag,
            t === 13) {
                if (t = rp(n),
                t !== null) {
                    e.blockedOn = t,
                    pp(e.priority, function() {
                        fp(n)
                    });
                    return
                }
            } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
                e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
                return
            }
        }
    }
    e.blockedOn = null
}
function Ql(e) {
    if (e.blockedOn !== null)
        return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
        var n = nu(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
            n = e.nativeEvent;
            var r = new n.constructor(n.type,n);
            Yo = r,
            n.target.dispatchEvent(r),
            Yo = null
        } else
            return t = il(n),
            t !== null && fc(t),
            e.blockedOn = n,
            !1;
        t.shift()
    }
    return !0
}
function Md(e, t, n) {
    Ql(e) && n.delete(t)
}
function Mv() {
    tu = !1,
    tr !== null && Ql(tr) && (tr = null),
    nr !== null && Ql(nr) && (nr = null),
    rr !== null && Ql(rr) && (rr = null),
    _s.forEach(Md),
    Ls.forEach(Md)
}
function is(e, t) {
    e.blockedOn === t && (e.blockedOn = null,
    tu || (tu = !0,
    Nt.unstable_scheduleCallback(Nt.unstable_NormalPriority, Mv)))
}
function Os(e) {
    function t(i) {
        return is(i, e)
    }
    if (0 < Nl.length) {
        is(Nl[0], e);
        for (var n = 1; n < Nl.length; n++) {
            var r = Nl[n];
            r.blockedOn === e && (r.blockedOn = null)
        }
    }
    for (tr !== null && is(tr, e),
    nr !== null && is(nr, e),
    rr !== null && is(rr, e),
    _s.forEach(t),
    Ls.forEach(t),
    n = 0; n < Qn.length; n++)
        r = Qn[n],
        r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < Qn.length && (n = Qn[0],
    n.blockedOn === null); )
        mp(n),
        n.blockedOn === null && Qn.shift()
}
var xi = Rn.ReactCurrentBatchConfig
  , sa = !0;
function Fv(e, t, n, r) {
    var i = ae
      , s = xi.transition;
    xi.transition = null;
    try {
        ae = 1,
        hc(e, t, n, r)
    } finally {
        ae = i,
        xi.transition = s
    }
}
function Av(e, t, n, r) {
    var i = ae
      , s = xi.transition;
    xi.transition = null;
    try {
        ae = 4,
        hc(e, t, n, r)
    } finally {
        ae = i,
        xi.transition = s
    }
}
function hc(e, t, n, r) {
    if (sa) {
        var i = nu(e, t, n, r);
        if (i === null)
            jo(e, t, r, la, n),
            Dd(e, r);
        else if (Dv(i, e, t, n, r))
            r.stopPropagation();
        else if (Dd(e, r),
        t & 4 && -1 < Iv.indexOf(e)) {
            for (; i !== null; ) {
                var s = il(i);
                if (s !== null && dp(s),
                s = nu(e, t, n, r),
                s === null && jo(e, t, r, la, n),
                s === i)
                    break;
                i = s
            }
            i !== null && r.stopPropagation()
        } else
            jo(e, t, r, null, n)
    }
}
var la = null;
function nu(e, t, n, r) {
    if (la = null,
    e = uc(r),
    e = Er(e),
    e !== null)
        if (t = qr(e),
        t === null)
            e = null;
        else if (n = t.tag,
        n === 13) {
            if (e = rp(t),
            e !== null)
                return e;
            e = null
        } else if (n === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
                return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null
        } else
            t !== e && (e = null);
    return la = e,
    null
}
function yp(e) {
    switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
        return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
        return 4;
    case "message":
        switch (Nv()) {
        case cc:
            return 1;
        case ap:
            return 4;
        case ra:
        case bv:
            return 16;
        case op:
            return 536870912;
        default:
            return 16
        }
    default:
        return 16
    }
}
var Jn = null
  , pc = null
  , Hl = null;
function vp() {
    if (Hl)
        return Hl;
    var e, t = pc, n = t.length, r, i = "value"in Jn ? Jn.value : Jn.textContent, s = i.length;
    for (e = 0; e < n && t[e] === i[e]; e++)
        ;
    var a = n - e;
    for (r = 1; r <= a && t[n - r] === i[s - r]; r++)
        ;
    return Hl = i.slice(e, 1 < r ? 1 - r : void 0)
}
function Bl(e) {
    var t = e.keyCode;
    return "charCode"in e ? (e = e.charCode,
    e === 0 && t === 13 && (e = 13)) : e = t,
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
}
function bl() {
    return !0
}
function Fd() {
    return !1
}
function Ct(e) {
    function t(n, r, i, s, a) {
        this._reactName = n,
        this._targetInst = i,
        this.type = r,
        this.nativeEvent = s,
        this.target = a,
        this.currentTarget = null;
        for (var o in e)
            e.hasOwnProperty(o) && (n = e[o],
            this[o] = n ? n(s) : s[o]);
        return this.isDefaultPrevented = (s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1) ? bl : Fd,
        this.isPropagationStopped = Fd,
        this
    }
    return xe(t.prototype, {
        preventDefault: function() {
            this.defaultPrevented = !0;
            var n = this.nativeEvent;
            n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1),
            this.isDefaultPrevented = bl)
        },
        stopPropagation: function() {
            var n = this.nativeEvent;
            n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
            this.isPropagationStopped = bl)
        },
        persist: function() {},
        isPersistent: bl
    }),
    t
}
var Ki = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
        return e.timeStamp || Date.now()
    },
    defaultPrevented: 0,
    isTrusted: 0
}, mc = Ct(Ki), rl = xe({}, Ki, {
    view: 0,
    detail: 0
}), zv = Ct(rl), fo, ho, ss, Oa = xe({}, rl, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: yc,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
    },
    movementX: function(e) {
        return "movementX"in e ? e.movementX : (e !== ss && (ss && e.type === "mousemove" ? (fo = e.screenX - ss.screenX,
        ho = e.screenY - ss.screenY) : ho = fo = 0,
        ss = e),
        fo)
    },
    movementY: function(e) {
        return "movementY"in e ? e.movementY : ho
    }
}), Ad = Ct(Oa), Uv = xe({}, Oa, {
    dataTransfer: 0
}), Qv = Ct(Uv), Hv = xe({}, rl, {
    relatedTarget: 0
}), po = Ct(Hv), Bv = xe({}, Ki, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
}), $v = Ct(Bv), Wv = xe({}, Ki, {
    clipboardData: function(e) {
        return "clipboardData"in e ? e.clipboardData : window.clipboardData
    }
}), Vv = Ct(Wv), Kv = xe({}, Ki, {
    data: 0
}), zd = Ct(Kv), Gv = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
}, qv = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
}, Yv = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
};
function Xv(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Yv[e]) ? !!t[e] : !1
}
function yc() {
    return Xv
}
var Jv = xe({}, rl, {
    key: function(e) {
        if (e.key) {
            var t = Gv[e.key] || e.key;
            if (t !== "Unidentified")
                return t
        }
        return e.type === "keypress" ? (e = Bl(e),
        e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? qv[e.keyCode] || "Unidentified" : ""
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: yc,
    charCode: function(e) {
        return e.type === "keypress" ? Bl(e) : 0
    },
    keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
    },
    which: function(e) {
        return e.type === "keypress" ? Bl(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
    }
})
  , Zv = Ct(Jv)
  , eg = xe({}, Oa, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
})
  , Ud = Ct(eg)
  , tg = xe({}, rl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: yc
})
  , ng = Ct(tg)
  , rg = xe({}, Ki, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
})
  , ig = Ct(rg)
  , sg = xe({}, Oa, {
    deltaX: function(e) {
        return "deltaX"in e ? e.deltaX : "wheelDeltaX"in e ? -e.wheelDeltaX : 0
    },
    deltaY: function(e) {
        return "deltaY"in e ? e.deltaY : "wheelDeltaY"in e ? -e.wheelDeltaY : "wheelDelta"in e ? -e.wheelDelta : 0
    },
    deltaZ: 0,
    deltaMode: 0
})
  , lg = Ct(sg)
  , ag = [9, 13, 27, 32]
  , vc = jn && "CompositionEvent"in window
  , ws = null;
jn && "documentMode"in document && (ws = document.documentMode);
var og = jn && "TextEvent"in window && !ws
  , gp = jn && (!vc || ws && 8 < ws && 11 >= ws)
  , Qd = " "
  , Hd = !1;
function xp(e, t) {
    switch (e) {
    case "keyup":
        return ag.indexOf(t.keyCode) !== -1;
    case "keydown":
        return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
        return !0;
    default:
        return !1
    }
}
function wp(e) {
    return e = e.detail,
    typeof e == "object" && "data"in e ? e.data : null
}
var li = !1;
function ug(e, t) {
    switch (e) {
    case "compositionend":
        return wp(t);
    case "keypress":
        return t.which !== 32 ? null : (Hd = !0,
        Qd);
    case "textInput":
        return e = t.data,
        e === Qd && Hd ? null : e;
    default:
        return null
    }
}
function cg(e, t) {
    if (li)
        return e === "compositionend" || !vc && xp(e, t) ? (e = vp(),
        Hl = pc = Jn = null,
        li = !1,
        e) : null;
    switch (e) {
    case "paste":
        return null;
    case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
            if (t.char && 1 < t.char.length)
                return t.char;
            if (t.which)
                return String.fromCharCode(t.which)
        }
        return null;
    case "compositionend":
        return gp && t.locale !== "ko" ? null : t.data;
    default:
        return null
    }
}
var dg = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
};
function Bd(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!dg[e.type] : t === "textarea"
}
function jp(e, t, n, r) {
    Jh(r),
    t = aa(t, "onChange"),
    0 < t.length && (n = new mc("onChange","change",null,n,r),
    e.push({
        event: n,
        listeners: t
    }))
}
var js = null
  , Is = null;
function fg(e) {
    Lp(e, 0)
}
function Ia(e) {
    var t = ui(e);
    if (Wh(t))
        return e
}
function hg(e, t) {
    if (e === "change")
        return t
}
var Sp = !1;
if (jn) {
    var mo;
    if (jn) {
        var yo = "oninput"in document;
        if (!yo) {
            var $d = document.createElement("div");
            $d.setAttribute("oninput", "return;"),
            yo = typeof $d.oninput == "function"
        }
        mo = yo
    } else
        mo = !1;
    Sp = mo && (!document.documentMode || 9 < document.documentMode)
}
function Wd() {
    js && (js.detachEvent("onpropertychange", kp),
    Is = js = null)
}
function kp(e) {
    if (e.propertyName === "value" && Ia(Is)) {
        var t = [];
        jp(t, Is, e, uc(e)),
        np(fg, t)
    }
}
function pg(e, t, n) {
    e === "focusin" ? (Wd(),
    js = t,
    Is = n,
    js.attachEvent("onpropertychange", kp)) : e === "focusout" && Wd()
}
function mg(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return Ia(Is)
}
function yg(e, t) {
    if (e === "click")
        return Ia(t)
}
function vg(e, t) {
    if (e === "input" || e === "change")
        return Ia(t)
}
function gg(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t
}
var qt = typeof Object.is == "function" ? Object.is : gg;
function Ds(e, t) {
    if (qt(e, t))
        return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
    var n = Object.keys(e)
      , r = Object.keys(t);
    if (n.length !== r.length)
        return !1;
    for (r = 0; r < n.length; r++) {
        var i = n[r];
        if (!Ao.call(t, i) || !qt(e[i], t[i]))
            return !1
    }
    return !0
}
function Vd(e) {
    for (; e && e.firstChild; )
        e = e.firstChild;
    return e
}
function Kd(e, t) {
    var n = Vd(e);
    e = 0;
    for (var r; n; ) {
        if (n.nodeType === 3) {
            if (r = e + n.textContent.length,
            e <= t && r >= t)
                return {
                    node: n,
                    offset: t - e
                };
            e = r
        }
        e: {
            for (; n; ) {
                if (n.nextSibling) {
                    n = n.nextSibling;
                    break e
                }
                n = n.parentNode
            }
            n = void 0
        }
        n = Vd(n)
    }
}
function Ep(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Ep(e, t.parentNode) : "contains"in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1
}
function Np() {
    for (var e = window, t = ea(); t instanceof e.HTMLIFrameElement; ) {
        try {
            var n = typeof t.contentWindow.location.href == "string"
        } catch {
            n = !1
        }
        if (n)
            e = t.contentWindow;
        else
            break;
        t = ea(e.document)
    }
    return t
}
function gc(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true")
}
function xg(e) {
    var t = Np()
      , n = e.focusedElem
      , r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && Ep(n.ownerDocument.documentElement, n)) {
        if (r !== null && gc(n)) {
            if (t = r.start,
            e = r.end,
            e === void 0 && (e = t),
            "selectionStart"in n)
                n.selectionStart = t,
                n.selectionEnd = Math.min(e, n.value.length);
            else if (e = (t = n.ownerDocument || document) && t.defaultView || window,
            e.getSelection) {
                e = e.getSelection();
                var i = n.textContent.length
                  , s = Math.min(r.start, i);
                r = r.end === void 0 ? s : Math.min(r.end, i),
                !e.extend && s > r && (i = r,
                r = s,
                s = i),
                i = Kd(n, s);
                var a = Kd(n, r);
                i && a && (e.rangeCount !== 1 || e.anchorNode !== i.node || e.anchorOffset !== i.offset || e.focusNode !== a.node || e.focusOffset !== a.offset) && (t = t.createRange(),
                t.setStart(i.node, i.offset),
                e.removeAllRanges(),
                s > r ? (e.addRange(t),
                e.extend(a.node, a.offset)) : (t.setEnd(a.node, a.offset),
                e.addRange(t)))
            }
        }
        for (t = [],
        e = n; e = e.parentNode; )
            e.nodeType === 1 && t.push({
                element: e,
                left: e.scrollLeft,
                top: e.scrollTop
            });
        for (typeof n.focus == "function" && n.focus(),
        n = 0; n < t.length; n++)
            e = t[n],
            e.element.scrollLeft = e.left,
            e.element.scrollTop = e.top
    }
}
var wg = jn && "documentMode"in document && 11 >= document.documentMode
  , ai = null
  , ru = null
  , Ss = null
  , iu = !1;
function Gd(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    iu || ai == null || ai !== ea(r) || (r = ai,
    "selectionStart"in r && gc(r) ? r = {
        start: r.selectionStart,
        end: r.selectionEnd
    } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(),
    r = {
        anchorNode: r.anchorNode,
        anchorOffset: r.anchorOffset,
        focusNode: r.focusNode,
        focusOffset: r.focusOffset
    }),
    Ss && Ds(Ss, r) || (Ss = r,
    r = aa(ru, "onSelect"),
    0 < r.length && (t = new mc("onSelect","select",null,t,n),
    e.push({
        event: t,
        listeners: r
    }),
    t.target = ai)))
}
function Cl(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(),
    n["Webkit" + e] = "webkit" + t,
    n["Moz" + e] = "moz" + t,
    n
}
var oi = {
    animationend: Cl("Animation", "AnimationEnd"),
    animationiteration: Cl("Animation", "AnimationIteration"),
    animationstart: Cl("Animation", "AnimationStart"),
    transitionend: Cl("Transition", "TransitionEnd")
}
  , vo = {}
  , bp = {};
jn && (bp = document.createElement("div").style,
"AnimationEvent"in window || (delete oi.animationend.animation,
delete oi.animationiteration.animation,
delete oi.animationstart.animation),
"TransitionEvent"in window || delete oi.transitionend.transition);
function Da(e) {
    if (vo[e])
        return vo[e];
    if (!oi[e])
        return e;
    var t = oi[e], n;
    for (n in t)
        if (t.hasOwnProperty(n) && n in bp)
            return vo[e] = t[n];
    return e
}
var Cp = Da("animationend")
  , Rp = Da("animationiteration")
  , Pp = Da("animationstart")
  , Tp = Da("transitionend")
  , _p = new Map
  , qd = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function hr(e, t) {
    _p.set(e, t),
    Gr(t, [e])
}
for (var go = 0; go < qd.length; go++) {
    var xo = qd[go]
      , jg = xo.toLowerCase()
      , Sg = xo[0].toUpperCase() + xo.slice(1);
    hr(jg, "on" + Sg)
}
hr(Cp, "onAnimationEnd");
hr(Rp, "onAnimationIteration");
hr(Pp, "onAnimationStart");
hr("dblclick", "onDoubleClick");
hr("focusin", "onFocus");
hr("focusout", "onBlur");
hr(Tp, "onTransitionEnd");
Mi("onMouseEnter", ["mouseout", "mouseover"]);
Mi("onMouseLeave", ["mouseout", "mouseover"]);
Mi("onPointerEnter", ["pointerout", "pointerover"]);
Mi("onPointerLeave", ["pointerout", "pointerover"]);
Gr("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Gr("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Gr("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Gr("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Gr("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Gr("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var ms = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ")
  , kg = new Set("cancel close invalid load scroll toggle".split(" ").concat(ms));
function Yd(e, t, n) {
    var r = e.type || "unknown-event";
    e.currentTarget = n,
    jv(r, t, void 0, e),
    e.currentTarget = null
}
function Lp(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
        var r = e[n]
          , i = r.event;
        r = r.listeners;
        e: {
            var s = void 0;
            if (t)
                for (var a = r.length - 1; 0 <= a; a--) {
                    var o = r[a]
                      , u = o.instance
                      , c = o.currentTarget;
                    if (o = o.listener,
                    u !== s && i.isPropagationStopped())
                        break e;
                    Yd(i, o, c),
                    s = u
                }
            else
                for (a = 0; a < r.length; a++) {
                    if (o = r[a],
                    u = o.instance,
                    c = o.currentTarget,
                    o = o.listener,
                    u !== s && i.isPropagationStopped())
                        break e;
                    Yd(i, o, c),
                    s = u
                }
        }
    }
    if (na)
        throw e = Zo,
        na = !1,
        Zo = null,
        e
}
function fe(e, t) {
    var n = t[uu];
    n === void 0 && (n = t[uu] = new Set);
    var r = e + "__bubble";
    n.has(r) || (Op(t, e, 2, !1),
    n.add(r))
}
function wo(e, t, n) {
    var r = 0;
    t && (r |= 4),
    Op(n, e, r, t)
}
var Rl = "_reactListening" + Math.random().toString(36).slice(2);
function Ms(e) {
    if (!e[Rl]) {
        e[Rl] = !0,
        Uh.forEach(function(n) {
            n !== "selectionchange" && (kg.has(n) || wo(n, !1, e),
            wo(n, !0, e))
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[Rl] || (t[Rl] = !0,
        wo("selectionchange", !1, t))
    }
}
function Op(e, t, n, r) {
    switch (yp(t)) {
    case 1:
        var i = Fv;
        break;
    case 4:
        i = Av;
        break;
    default:
        i = hc
    }
    n = i.bind(null, t, n, e),
    i = void 0,
    !Jo || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0),
    r ? i !== void 0 ? e.addEventListener(t, n, {
        capture: !0,
        passive: i
    }) : e.addEventListener(t, n, !0) : i !== void 0 ? e.addEventListener(t, n, {
        passive: i
    }) : e.addEventListener(t, n, !1)
}
function jo(e, t, n, r, i) {
    var s = r;
    if (!(t & 1) && !(t & 2) && r !== null)
        e: for (; ; ) {
            if (r === null)
                return;
            var a = r.tag;
            if (a === 3 || a === 4) {
                var o = r.stateNode.containerInfo;
                if (o === i || o.nodeType === 8 && o.parentNode === i)
                    break;
                if (a === 4)
                    for (a = r.return; a !== null; ) {
                        var u = a.tag;
                        if ((u === 3 || u === 4) && (u = a.stateNode.containerInfo,
                        u === i || u.nodeType === 8 && u.parentNode === i))
                            return;
                        a = a.return
                    }
                for (; o !== null; ) {
                    if (a = Er(o),
                    a === null)
                        return;
                    if (u = a.tag,
                    u === 5 || u === 6) {
                        r = s = a;
                        continue e
                    }
                    o = o.parentNode
                }
            }
            r = r.return
        }
    np(function() {
        var c = s
          , d = uc(n)
          , f = [];
        e: {
            var m = _p.get(e);
            if (m !== void 0) {
                var y = mc
                  , S = e;
                switch (e) {
                case "keypress":
                    if (Bl(n) === 0)
                        break e;
                case "keydown":
                case "keyup":
                    y = Zv;
                    break;
                case "focusin":
                    S = "focus",
                    y = po;
                    break;
                case "focusout":
                    S = "blur",
                    y = po;
                    break;
                case "beforeblur":
                case "afterblur":
                    y = po;
                    break;
                case "click":
                    if (n.button === 2)
                        break e;
                case "auxclick":
                case "dblclick":
                case "mousedown":
                case "mousemove":
                case "mouseup":
                case "mouseout":
                case "mouseover":
                case "contextmenu":
                    y = Ad;
                    break;
                case "drag":
                case "dragend":
                case "dragenter":
                case "dragexit":
                case "dragleave":
                case "dragover":
                case "dragstart":
                case "drop":
                    y = Qv;
                    break;
                case "touchcancel":
                case "touchend":
                case "touchmove":
                case "touchstart":
                    y = ng;
                    break;
                case Cp:
                case Rp:
                case Pp:
                    y = $v;
                    break;
                case Tp:
                    y = ig;
                    break;
                case "scroll":
                    y = zv;
                    break;
                case "wheel":
                    y = lg;
                    break;
                case "copy":
                case "cut":
                case "paste":
                    y = Vv;
                    break;
                case "gotpointercapture":
                case "lostpointercapture":
                case "pointercancel":
                case "pointerdown":
                case "pointermove":
                case "pointerout":
                case "pointerover":
                case "pointerup":
                    y = Ud
                }
                var w = (t & 4) !== 0
                  , b = !w && e === "scroll"
                  , p = w ? m !== null ? m + "Capture" : null : m;
                w = [];
                for (var h = c, g; h !== null; ) {
                    g = h;
                    var k = g.stateNode;
                    if (g.tag === 5 && k !== null && (g = k,
                    p !== null && (k = Ts(h, p),
                    k != null && w.push(Fs(h, k, g)))),
                    b)
                        break;
                    h = h.return
                }
                0 < w.length && (m = new y(m,S,null,n,d),
                f.push({
                    event: m,
                    listeners: w
                }))
            }
        }
        if (!(t & 7)) {
            e: {
                if (m = e === "mouseover" || e === "pointerover",
                y = e === "mouseout" || e === "pointerout",
                m && n !== Yo && (S = n.relatedTarget || n.fromElement) && (Er(S) || S[Sn]))
                    break e;
                if ((y || m) && (m = d.window === d ? d : (m = d.ownerDocument) ? m.defaultView || m.parentWindow : window,
                y ? (S = n.relatedTarget || n.toElement,
                y = c,
                S = S ? Er(S) : null,
                S !== null && (b = qr(S),
                S !== b || S.tag !== 5 && S.tag !== 6) && (S = null)) : (y = null,
                S = c),
                y !== S)) {
                    if (w = Ad,
                    k = "onMouseLeave",
                    p = "onMouseEnter",
                    h = "mouse",
                    (e === "pointerout" || e === "pointerover") && (w = Ud,
                    k = "onPointerLeave",
                    p = "onPointerEnter",
                    h = "pointer"),
                    b = y == null ? m : ui(y),
                    g = S == null ? m : ui(S),
                    m = new w(k,h + "leave",y,n,d),
                    m.target = b,
                    m.relatedTarget = g,
                    k = null,
                    Er(d) === c && (w = new w(p,h + "enter",S,n,d),
                    w.target = g,
                    w.relatedTarget = b,
                    k = w),
                    b = k,
                    y && S)
                        t: {
                            for (w = y,
                            p = S,
                            h = 0,
                            g = w; g; g = ti(g))
                                h++;
                            for (g = 0,
                            k = p; k; k = ti(k))
                                g++;
                            for (; 0 < h - g; )
                                w = ti(w),
                                h--;
                            for (; 0 < g - h; )
                                p = ti(p),
                                g--;
                            for (; h--; ) {
                                if (w === p || p !== null && w === p.alternate)
                                    break t;
                                w = ti(w),
                                p = ti(p)
                            }
                            w = null
                        }
                    else
                        w = null;
                    y !== null && Xd(f, m, y, w, !1),
                    S !== null && b !== null && Xd(f, b, S, w, !0)
                }
            }
            e: {
                if (m = c ? ui(c) : window,
                y = m.nodeName && m.nodeName.toLowerCase(),
                y === "select" || y === "input" && m.type === "file")
                    var P = hg;
                else if (Bd(m))
                    if (Sp)
                        P = vg;
                    else {
                        P = mg;
                        var O = pg
                    }
                else
                    (y = m.nodeName) && y.toLowerCase() === "input" && (m.type === "checkbox" || m.type === "radio") && (P = yg);
                if (P && (P = P(e, c))) {
                    jp(f, P, n, d);
                    break e
                }
                O && O(e, m, c),
                e === "focusout" && (O = m._wrapperState) && O.controlled && m.type === "number" && Wo(m, "number", m.value)
            }
            switch (O = c ? ui(c) : window,
            e) {
            case "focusin":
                (Bd(O) || O.contentEditable === "true") && (ai = O,
                ru = c,
                Ss = null);
                break;
            case "focusout":
                Ss = ru = ai = null;
                break;
            case "mousedown":
                iu = !0;
                break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
                iu = !1,
                Gd(f, n, d);
                break;
            case "selectionchange":
                if (wg)
                    break;
            case "keydown":
            case "keyup":
                Gd(f, n, d)
            }
            var j;
            if (vc)
                e: {
                    switch (e) {
                    case "compositionstart":
                        var R = "onCompositionStart";
                        break e;
                    case "compositionend":
                        R = "onCompositionEnd";
                        break e;
                    case "compositionupdate":
                        R = "onCompositionUpdate";
                        break e
                    }
                    R = void 0
                }
            else
                li ? xp(e, n) && (R = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (R = "onCompositionStart");
            R && (gp && n.locale !== "ko" && (li || R !== "onCompositionStart" ? R === "onCompositionEnd" && li && (j = vp()) : (Jn = d,
            pc = "value"in Jn ? Jn.value : Jn.textContent,
            li = !0)),
            O = aa(c, R),
            0 < O.length && (R = new zd(R,e,null,n,d),
            f.push({
                event: R,
                listeners: O
            }),
            j ? R.data = j : (j = wp(n),
            j !== null && (R.data = j)))),
            (j = og ? ug(e, n) : cg(e, n)) && (c = aa(c, "onBeforeInput"),
            0 < c.length && (d = new zd("onBeforeInput","beforeinput",null,n,d),
            f.push({
                event: d,
                listeners: c
            }),
            d.data = j))
        }
        Lp(f, t)
    })
}
function Fs(e, t, n) {
    return {
        instance: e,
        listener: t,
        currentTarget: n
    }
}
function aa(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
        var i = e
          , s = i.stateNode;
        i.tag === 5 && s !== null && (i = s,
        s = Ts(e, n),
        s != null && r.unshift(Fs(e, s, i)),
        s = Ts(e, t),
        s != null && r.push(Fs(e, s, i))),
        e = e.return
    }
    return r
}
function ti(e) {
    if (e === null)
        return null;
    do
        e = e.return;
    while (e && e.tag !== 5);
    return e || null
}
function Xd(e, t, n, r, i) {
    for (var s = t._reactName, a = []; n !== null && n !== r; ) {
        var o = n
          , u = o.alternate
          , c = o.stateNode;
        if (u !== null && u === r)
            break;
        o.tag === 5 && c !== null && (o = c,
        i ? (u = Ts(n, s),
        u != null && a.unshift(Fs(n, u, o))) : i || (u = Ts(n, s),
        u != null && a.push(Fs(n, u, o)))),
        n = n.return
    }
    a.length !== 0 && e.push({
        event: t,
        listeners: a
    })
}
var Eg = /\r\n?/g
  , Ng = /\u0000|\uFFFD/g;
function Jd(e) {
    return (typeof e == "string" ? e : "" + e).replace(Eg, `
`).replace(Ng, "")
}
function Pl(e, t, n) {
    if (t = Jd(t),
    Jd(e) !== t && n)
        throw Error(_(425))
}
function oa() {}
var su = null
  , lu = null;
function au(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null
}
var ou = typeof setTimeout == "function" ? setTimeout : void 0
  , bg = typeof clearTimeout == "function" ? clearTimeout : void 0
  , Zd = typeof Promise == "function" ? Promise : void 0
  , Cg = typeof queueMicrotask == "function" ? queueMicrotask : typeof Zd < "u" ? function(e) {
    return Zd.resolve(null).then(e).catch(Rg)
}
: ou;
function Rg(e) {
    setTimeout(function() {
        throw e
    })
}
function So(e, t) {
    var n = t
      , r = 0;
    do {
        var i = n.nextSibling;
        if (e.removeChild(n),
        i && i.nodeType === 8)
            if (n = i.data,
            n === "/$") {
                if (r === 0) {
                    e.removeChild(i),
                    Os(t);
                    return
                }
                r--
            } else
                n !== "$" && n !== "$?" && n !== "$!" || r++;
        n = i
    } while (n);
    Os(t)
}
function ir(e) {
    for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3)
            break;
        if (t === 8) {
            if (t = e.data,
            t === "$" || t === "$!" || t === "$?")
                break;
            if (t === "/$")
                return null
        }
    }
    return e
}
function ef(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
        if (e.nodeType === 8) {
            var n = e.data;
            if (n === "$" || n === "$!" || n === "$?") {
                if (t === 0)
                    return e;
                t--
            } else
                n === "/$" && t++
        }
        e = e.previousSibling
    }
    return null
}
var Gi = Math.random().toString(36).slice(2)
  , rn = "__reactFiber$" + Gi
  , As = "__reactProps$" + Gi
  , Sn = "__reactContainer$" + Gi
  , uu = "__reactEvents$" + Gi
  , Pg = "__reactListeners$" + Gi
  , Tg = "__reactHandles$" + Gi;
function Er(e) {
    var t = e[rn];
    if (t)
        return t;
    for (var n = e.parentNode; n; ) {
        if (t = n[Sn] || n[rn]) {
            if (n = t.alternate,
            t.child !== null || n !== null && n.child !== null)
                for (e = ef(e); e !== null; ) {
                    if (n = e[rn])
                        return n;
                    e = ef(e)
                }
            return t
        }
        e = n,
        n = e.parentNode
    }
    return null
}
function il(e) {
    return e = e[rn] || e[Sn],
    !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e
}
function ui(e) {
    if (e.tag === 5 || e.tag === 6)
        return e.stateNode;
    throw Error(_(33))
}
function Ma(e) {
    return e[As] || null
}
var cu = []
  , ci = -1;
function pr(e) {
    return {
        current: e
    }
}
function he(e) {
    0 > ci || (e.current = cu[ci],
    cu[ci] = null,
    ci--)
}
function de(e, t) {
    ci++,
    cu[ci] = e.current,
    e.current = t
}
var fr = {}
  , Ge = pr(fr)
  , ht = pr(!1)
  , Ur = fr;
function Fi(e, t) {
    var n = e.type.contextTypes;
    if (!n)
        return fr;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
    var i = {}, s;
    for (s in n)
        i[s] = t[s];
    return r && (e = e.stateNode,
    e.__reactInternalMemoizedUnmaskedChildContext = t,
    e.__reactInternalMemoizedMaskedChildContext = i),
    i
}
function pt(e) {
    return e = e.childContextTypes,
    e != null
}
function ua() {
    he(ht),
    he(Ge)
}
function tf(e, t, n) {
    if (Ge.current !== fr)
        throw Error(_(168));
    de(Ge, t),
    de(ht, n)
}
function Ip(e, t, n) {
    var r = e.stateNode;
    if (t = t.childContextTypes,
    typeof r.getChildContext != "function")
        return n;
    r = r.getChildContext();
    for (var i in r)
        if (!(i in t))
            throw Error(_(108, pv(e) || "Unknown", i));
    return xe({}, n, r)
}
function ca(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || fr,
    Ur = Ge.current,
    de(Ge, e),
    de(ht, ht.current),
    !0
}
function nf(e, t, n) {
    var r = e.stateNode;
    if (!r)
        throw Error(_(169));
    n ? (e = Ip(e, t, Ur),
    r.__reactInternalMemoizedMergedChildContext = e,
    he(ht),
    he(Ge),
    de(Ge, e)) : he(ht),
    de(ht, n)
}
var dn = null
  , Fa = !1
  , ko = !1;
function Dp(e) {
    dn === null ? dn = [e] : dn.push(e)
}
function _g(e) {
    Fa = !0,
    Dp(e)
}
function mr() {
    if (!ko && dn !== null) {
        ko = !0;
        var e = 0
          , t = ae;
        try {
            var n = dn;
            for (ae = 1; e < n.length; e++) {
                var r = n[e];
                do
                    r = r(!0);
                while (r !== null)
            }
            dn = null,
            Fa = !1
        } catch (i) {
            throw dn !== null && (dn = dn.slice(e + 1)),
            lp(cc, mr),
            i
        } finally {
            ae = t,
            ko = !1
        }
    }
    return null
}
var di = []
  , fi = 0
  , da = null
  , fa = 0
  , Tt = []
  , _t = 0
  , Qr = null
  , yn = 1
  , vn = "";
function wr(e, t) {
    di[fi++] = fa,
    di[fi++] = da,
    da = e,
    fa = t
}
function Mp(e, t, n) {
    Tt[_t++] = yn,
    Tt[_t++] = vn,
    Tt[_t++] = Qr,
    Qr = e;
    var r = yn;
    e = vn;
    var i = 32 - Kt(r) - 1;
    r &= ~(1 << i),
    n += 1;
    var s = 32 - Kt(t) + i;
    if (30 < s) {
        var a = i - i % 5;
        s = (r & (1 << a) - 1).toString(32),
        r >>= a,
        i -= a,
        yn = 1 << 32 - Kt(t) + i | n << i | r,
        vn = s + e
    } else
        yn = 1 << s | n << i | r,
        vn = e
}
function xc(e) {
    e.return !== null && (wr(e, 1),
    Mp(e, 1, 0))
}
function wc(e) {
    for (; e === da; )
        da = di[--fi],
        di[fi] = null,
        fa = di[--fi],
        di[fi] = null;
    for (; e === Qr; )
        Qr = Tt[--_t],
        Tt[_t] = null,
        vn = Tt[--_t],
        Tt[_t] = null,
        yn = Tt[--_t],
        Tt[_t] = null
}
var Et = null
  , kt = null
  , me = !1
  , Wt = null;
function Fp(e, t) {
    var n = Lt(5, null, null, 0);
    n.elementType = "DELETED",
    n.stateNode = t,
    n.return = e,
    t = e.deletions,
    t === null ? (e.deletions = [n],
    e.flags |= 16) : t.push(n)
}
function rf(e, t) {
    switch (e.tag) {
    case 5:
        var n = e.type;
        return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t,
        t !== null ? (e.stateNode = t,
        Et = e,
        kt = ir(t.firstChild),
        !0) : !1;
    case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t,
        t !== null ? (e.stateNode = t,
        Et = e,
        kt = null,
        !0) : !1;
    case 13:
        return t = t.nodeType !== 8 ? null : t,
        t !== null ? (n = Qr !== null ? {
            id: yn,
            overflow: vn
        } : null,
        e.memoizedState = {
            dehydrated: t,
            treeContext: n,
            retryLane: 1073741824
        },
        n = Lt(18, null, null, 0),
        n.stateNode = t,
        n.return = e,
        e.child = n,
        Et = e,
        kt = null,
        !0) : !1;
    default:
        return !1
    }
}
function du(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0
}
function fu(e) {
    if (me) {
        var t = kt;
        if (t) {
            var n = t;
            if (!rf(e, t)) {
                if (du(e))
                    throw Error(_(418));
                t = ir(n.nextSibling);
                var r = Et;
                t && rf(e, t) ? Fp(r, n) : (e.flags = e.flags & -4097 | 2,
                me = !1,
                Et = e)
            }
        } else {
            if (du(e))
                throw Error(_(418));
            e.flags = e.flags & -4097 | 2,
            me = !1,
            Et = e
        }
    }
}
function sf(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
        e = e.return;
    Et = e
}
function Tl(e) {
    if (e !== Et)
        return !1;
    if (!me)
        return sf(e),
        me = !0,
        !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type,
    t = t !== "head" && t !== "body" && !au(e.type, e.memoizedProps)),
    t && (t = kt)) {
        if (du(e))
            throw Ap(),
            Error(_(418));
        for (; t; )
            Fp(e, t),
            t = ir(t.nextSibling)
    }
    if (sf(e),
    e.tag === 13) {
        if (e = e.memoizedState,
        e = e !== null ? e.dehydrated : null,
        !e)
            throw Error(_(317));
        e: {
            for (e = e.nextSibling,
            t = 0; e; ) {
                if (e.nodeType === 8) {
                    var n = e.data;
                    if (n === "/$") {
                        if (t === 0) {
                            kt = ir(e.nextSibling);
                            break e
                        }
                        t--
                    } else
                        n !== "$" && n !== "$!" && n !== "$?" || t++
                }
                e = e.nextSibling
            }
            kt = null
        }
    } else
        kt = Et ? ir(e.stateNode.nextSibling) : null;
    return !0
}
function Ap() {
    for (var e = kt; e; )
        e = ir(e.nextSibling)
}
function Ai() {
    kt = Et = null,
    me = !1
}
function jc(e) {
    Wt === null ? Wt = [e] : Wt.push(e)
}
var Lg = Rn.ReactCurrentBatchConfig;
function ls(e, t, n) {
    if (e = n.ref,
    e !== null && typeof e != "function" && typeof e != "object") {
        if (n._owner) {
            if (n = n._owner,
            n) {
                if (n.tag !== 1)
                    throw Error(_(309));
                var r = n.stateNode
            }
            if (!r)
                throw Error(_(147, e));
            var i = r
              , s = "" + e;
            return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === s ? t.ref : (t = function(a) {
                var o = i.refs;
                a === null ? delete o[s] : o[s] = a
            }
            ,
            t._stringRef = s,
            t)
        }
        if (typeof e != "string")
            throw Error(_(284));
        if (!n._owner)
            throw Error(_(290, e))
    }
    return e
}
function _l(e, t) {
    throw e = Object.prototype.toString.call(t),
    Error(_(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e))
}
function lf(e) {
    var t = e._init;
    return t(e._payload)
}
function zp(e) {
    function t(p, h) {
        if (e) {
            var g = p.deletions;
            g === null ? (p.deletions = [h],
            p.flags |= 16) : g.push(h)
        }
    }
    function n(p, h) {
        if (!e)
            return null;
        for (; h !== null; )
            t(p, h),
            h = h.sibling;
        return null
    }
    function r(p, h) {
        for (p = new Map; h !== null; )
            h.key !== null ? p.set(h.key, h) : p.set(h.index, h),
            h = h.sibling;
        return p
    }
    function i(p, h) {
        return p = or(p, h),
        p.index = 0,
        p.sibling = null,
        p
    }
    function s(p, h, g) {
        return p.index = g,
        e ? (g = p.alternate,
        g !== null ? (g = g.index,
        g < h ? (p.flags |= 2,
        h) : g) : (p.flags |= 2,
        h)) : (p.flags |= 1048576,
        h)
    }
    function a(p) {
        return e && p.alternate === null && (p.flags |= 2),
        p
    }
    function o(p, h, g, k) {
        return h === null || h.tag !== 6 ? (h = To(g, p.mode, k),
        h.return = p,
        h) : (h = i(h, g),
        h.return = p,
        h)
    }
    function u(p, h, g, k) {
        var P = g.type;
        return P === si ? d(p, h, g.props.children, k, g.key) : h !== null && (h.elementType === P || typeof P == "object" && P !== null && P.$$typeof === zn && lf(P) === h.type) ? (k = i(h, g.props),
        k.ref = ls(p, h, g),
        k.return = p,
        k) : (k = Yl(g.type, g.key, g.props, null, p.mode, k),
        k.ref = ls(p, h, g),
        k.return = p,
        k)
    }
    function c(p, h, g, k) {
        return h === null || h.tag !== 4 || h.stateNode.containerInfo !== g.containerInfo || h.stateNode.implementation !== g.implementation ? (h = _o(g, p.mode, k),
        h.return = p,
        h) : (h = i(h, g.children || []),
        h.return = p,
        h)
    }
    function d(p, h, g, k, P) {
        return h === null || h.tag !== 7 ? (h = zr(g, p.mode, k, P),
        h.return = p,
        h) : (h = i(h, g),
        h.return = p,
        h)
    }
    function f(p, h, g) {
        if (typeof h == "string" && h !== "" || typeof h == "number")
            return h = To("" + h, p.mode, g),
            h.return = p,
            h;
        if (typeof h == "object" && h !== null) {
            switch (h.$$typeof) {
            case wl:
                return g = Yl(h.type, h.key, h.props, null, p.mode, g),
                g.ref = ls(p, null, h),
                g.return = p,
                g;
            case ii:
                return h = _o(h, p.mode, g),
                h.return = p,
                h;
            case zn:
                var k = h._init;
                return f(p, k(h._payload), g)
            }
            if (hs(h) || ts(h))
                return h = zr(h, p.mode, g, null),
                h.return = p,
                h;
            _l(p, h)
        }
        return null
    }
    function m(p, h, g, k) {
        var P = h !== null ? h.key : null;
        if (typeof g == "string" && g !== "" || typeof g == "number")
            return P !== null ? null : o(p, h, "" + g, k);
        if (typeof g == "object" && g !== null) {
            switch (g.$$typeof) {
            case wl:
                return g.key === P ? u(p, h, g, k) : null;
            case ii:
                return g.key === P ? c(p, h, g, k) : null;
            case zn:
                return P = g._init,
                m(p, h, P(g._payload), k)
            }
            if (hs(g) || ts(g))
                return P !== null ? null : d(p, h, g, k, null);
            _l(p, g)
        }
        return null
    }
    function y(p, h, g, k, P) {
        if (typeof k == "string" && k !== "" || typeof k == "number")
            return p = p.get(g) || null,
            o(h, p, "" + k, P);
        if (typeof k == "object" && k !== null) {
            switch (k.$$typeof) {
            case wl:
                return p = p.get(k.key === null ? g : k.key) || null,
                u(h, p, k, P);
            case ii:
                return p = p.get(k.key === null ? g : k.key) || null,
                c(h, p, k, P);
            case zn:
                var O = k._init;
                return y(p, h, g, O(k._payload), P)
            }
            if (hs(k) || ts(k))
                return p = p.get(g) || null,
                d(h, p, k, P, null);
            _l(h, k)
        }
        return null
    }
    function S(p, h, g, k) {
        for (var P = null, O = null, j = h, R = h = 0, F = null; j !== null && R < g.length; R++) {
            j.index > R ? (F = j,
            j = null) : F = j.sibling;
            var L = m(p, j, g[R], k);
            if (L === null) {
                j === null && (j = F);
                break
            }
            e && j && L.alternate === null && t(p, j),
            h = s(L, h, R),
            O === null ? P = L : O.sibling = L,
            O = L,
            j = F
        }
        if (R === g.length)
            return n(p, j),
            me && wr(p, R),
            P;
        if (j === null) {
            for (; R < g.length; R++)
                j = f(p, g[R], k),
                j !== null && (h = s(j, h, R),
                O === null ? P = j : O.sibling = j,
                O = j);
            return me && wr(p, R),
            P
        }
        for (j = r(p, j); R < g.length; R++)
            F = y(j, p, R, g[R], k),
            F !== null && (e && F.alternate !== null && j.delete(F.key === null ? R : F.key),
            h = s(F, h, R),
            O === null ? P = F : O.sibling = F,
            O = F);
        return e && j.forEach(function(X) {
            return t(p, X)
        }),
        me && wr(p, R),
        P
    }
    function w(p, h, g, k) {
        var P = ts(g);
        if (typeof P != "function")
            throw Error(_(150));
        if (g = P.call(g),
        g == null)
            throw Error(_(151));
        for (var O = P = null, j = h, R = h = 0, F = null, L = g.next(); j !== null && !L.done; R++,
        L = g.next()) {
            j.index > R ? (F = j,
            j = null) : F = j.sibling;
            var X = m(p, j, L.value, k);
            if (X === null) {
                j === null && (j = F);
                break
            }
            e && j && X.alternate === null && t(p, j),
            h = s(X, h, R),
            O === null ? P = X : O.sibling = X,
            O = X,
            j = F
        }
        if (L.done)
            return n(p, j),
            me && wr(p, R),
            P;
        if (j === null) {
            for (; !L.done; R++,
            L = g.next())
                L = f(p, L.value, k),
                L !== null && (h = s(L, h, R),
                O === null ? P = L : O.sibling = L,
                O = L);
            return me && wr(p, R),
            P
        }
        for (j = r(p, j); !L.done; R++,
        L = g.next())
            L = y(j, p, R, L.value, k),
            L !== null && (e && L.alternate !== null && j.delete(L.key === null ? R : L.key),
            h = s(L, h, R),
            O === null ? P = L : O.sibling = L,
            O = L);
        return e && j.forEach(function(re) {
            return t(p, re)
        }),
        me && wr(p, R),
        P
    }
    function b(p, h, g, k) {
        if (typeof g == "object" && g !== null && g.type === si && g.key === null && (g = g.props.children),
        typeof g == "object" && g !== null) {
            switch (g.$$typeof) {
            case wl:
                e: {
                    for (var P = g.key, O = h; O !== null; ) {
                        if (O.key === P) {
                            if (P = g.type,
                            P === si) {
                                if (O.tag === 7) {
                                    n(p, O.sibling),
                                    h = i(O, g.props.children),
                                    h.return = p,
                                    p = h;
                                    break e
                                }
                            } else if (O.elementType === P || typeof P == "object" && P !== null && P.$$typeof === zn && lf(P) === O.type) {
                                n(p, O.sibling),
                                h = i(O, g.props),
                                h.ref = ls(p, O, g),
                                h.return = p,
                                p = h;
                                break e
                            }
                            n(p, O);
                            break
                        } else
                            t(p, O);
                        O = O.sibling
                    }
                    g.type === si ? (h = zr(g.props.children, p.mode, k, g.key),
                    h.return = p,
                    p = h) : (k = Yl(g.type, g.key, g.props, null, p.mode, k),
                    k.ref = ls(p, h, g),
                    k.return = p,
                    p = k)
                }
                return a(p);
            case ii:
                e: {
                    for (O = g.key; h !== null; ) {
                        if (h.key === O)
                            if (h.tag === 4 && h.stateNode.containerInfo === g.containerInfo && h.stateNode.implementation === g.implementation) {
                                n(p, h.sibling),
                                h = i(h, g.children || []),
                                h.return = p,
                                p = h;
                                break e
                            } else {
                                n(p, h);
                                break
                            }
                        else
                            t(p, h);
                        h = h.sibling
                    }
                    h = _o(g, p.mode, k),
                    h.return = p,
                    p = h
                }
                return a(p);
            case zn:
                return O = g._init,
                b(p, h, O(g._payload), k)
            }
            if (hs(g))
                return S(p, h, g, k);
            if (ts(g))
                return w(p, h, g, k);
            _l(p, g)
        }
        return typeof g == "string" && g !== "" || typeof g == "number" ? (g = "" + g,
        h !== null && h.tag === 6 ? (n(p, h.sibling),
        h = i(h, g),
        h.return = p,
        p = h) : (n(p, h),
        h = To(g, p.mode, k),
        h.return = p,
        p = h),
        a(p)) : n(p, h)
    }
    return b
}
var zi = zp(!0)
  , Up = zp(!1)
  , ha = pr(null)
  , pa = null
  , hi = null
  , Sc = null;
function kc() {
    Sc = hi = pa = null
}
function Ec(e) {
    var t = ha.current;
    he(ha),
    e._currentValue = t
}
function hu(e, t, n) {
    for (; e !== null; ) {
        var r = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t,
        r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
        e === n)
            break;
        e = e.return
    }
}
function wi(e, t) {
    pa = e,
    Sc = hi = null,
    e = e.dependencies,
    e !== null && e.firstContext !== null && (e.lanes & t && (ft = !0),
    e.firstContext = null)
}
function It(e) {
    var t = e._currentValue;
    if (Sc !== e)
        if (e = {
            context: e,
            memoizedValue: t,
            next: null
        },
        hi === null) {
            if (pa === null)
                throw Error(_(308));
            hi = e,
            pa.dependencies = {
                lanes: 0,
                firstContext: e
            }
        } else
            hi = hi.next = e;
    return t
}
var Nr = null;
function Nc(e) {
    Nr === null ? Nr = [e] : Nr.push(e)
}
function Qp(e, t, n, r) {
    var i = t.interleaved;
    return i === null ? (n.next = n,
    Nc(t)) : (n.next = i.next,
    i.next = n),
    t.interleaved = n,
    kn(e, r)
}
function kn(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t),
    n = e,
    e = e.return; e !== null; )
        e.childLanes |= t,
        n = e.alternate,
        n !== null && (n.childLanes |= t),
        n = e,
        e = e.return;
    return n.tag === 3 ? n.stateNode : null
}
var Un = !1;
function bc(e) {
    e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
            pending: null,
            interleaved: null,
            lanes: 0
        },
        effects: null
    }
}
function Hp(e, t) {
    e = e.updateQueue,
    t.updateQueue === e && (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects
    })
}
function gn(e, t) {
    return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null
    }
}
function sr(e, t, n) {
    var r = e.updateQueue;
    if (r === null)
        return null;
    if (r = r.shared,
    te & 2) {
        var i = r.pending;
        return i === null ? t.next = t : (t.next = i.next,
        i.next = t),
        r.pending = t,
        kn(e, n)
    }
    return i = r.interleaved,
    i === null ? (t.next = t,
    Nc(r)) : (t.next = i.next,
    i.next = t),
    r.interleaved = t,
    kn(e, n)
}
function $l(e, t, n) {
    if (t = t.updateQueue,
    t !== null && (t = t.shared,
    (n & 4194240) !== 0)) {
        var r = t.lanes;
        r &= e.pendingLanes,
        n |= r,
        t.lanes = n,
        dc(e, n)
    }
}
function af(e, t) {
    var n = e.updateQueue
      , r = e.alternate;
    if (r !== null && (r = r.updateQueue,
    n === r)) {
        var i = null
          , s = null;
        if (n = n.firstBaseUpdate,
        n !== null) {
            do {
                var a = {
                    eventTime: n.eventTime,
                    lane: n.lane,
                    tag: n.tag,
                    payload: n.payload,
                    callback: n.callback,
                    next: null
                };
                s === null ? i = s = a : s = s.next = a,
                n = n.next
            } while (n !== null);
            s === null ? i = s = t : s = s.next = t
        } else
            i = s = t;
        n = {
            baseState: r.baseState,
            firstBaseUpdate: i,
            lastBaseUpdate: s,
            shared: r.shared,
            effects: r.effects
        },
        e.updateQueue = n;
        return
    }
    e = n.lastBaseUpdate,
    e === null ? n.firstBaseUpdate = t : e.next = t,
    n.lastBaseUpdate = t
}
function ma(e, t, n, r) {
    var i = e.updateQueue;
    Un = !1;
    var s = i.firstBaseUpdate
      , a = i.lastBaseUpdate
      , o = i.shared.pending;
    if (o !== null) {
        i.shared.pending = null;
        var u = o
          , c = u.next;
        u.next = null,
        a === null ? s = c : a.next = c,
        a = u;
        var d = e.alternate;
        d !== null && (d = d.updateQueue,
        o = d.lastBaseUpdate,
        o !== a && (o === null ? d.firstBaseUpdate = c : o.next = c,
        d.lastBaseUpdate = u))
    }
    if (s !== null) {
        var f = i.baseState;
        a = 0,
        d = c = u = null,
        o = s;
        do {
            var m = o.lane
              , y = o.eventTime;
            if ((r & m) === m) {
                d !== null && (d = d.next = {
                    eventTime: y,
                    lane: 0,
                    tag: o.tag,
                    payload: o.payload,
                    callback: o.callback,
                    next: null
                });
                e: {
                    var S = e
                      , w = o;
                    switch (m = t,
                    y = n,
                    w.tag) {
                    case 1:
                        if (S = w.payload,
                        typeof S == "function") {
                            f = S.call(y, f, m);
                            break e
                        }
                        f = S;
                        break e;
                    case 3:
                        S.flags = S.flags & -65537 | 128;
                    case 0:
                        if (S = w.payload,
                        m = typeof S == "function" ? S.call(y, f, m) : S,
                        m == null)
                            break e;
                        f = xe({}, f, m);
                        break e;
                    case 2:
                        Un = !0
                    }
                }
                o.callback !== null && o.lane !== 0 && (e.flags |= 64,
                m = i.effects,
                m === null ? i.effects = [o] : m.push(o))
            } else
                y = {
                    eventTime: y,
                    lane: m,
                    tag: o.tag,
                    payload: o.payload,
                    callback: o.callback,
                    next: null
                },
                d === null ? (c = d = y,
                u = f) : d = d.next = y,
                a |= m;
            if (o = o.next,
            o === null) {
                if (o = i.shared.pending,
                o === null)
                    break;
                m = o,
                o = m.next,
                m.next = null,
                i.lastBaseUpdate = m,
                i.shared.pending = null
            }
        } while (!0);
        if (d === null && (u = f),
        i.baseState = u,
        i.firstBaseUpdate = c,
        i.lastBaseUpdate = d,
        t = i.shared.interleaved,
        t !== null) {
            i = t;
            do
                a |= i.lane,
                i = i.next;
            while (i !== t)
        } else
            s === null && (i.shared.lanes = 0);
        Br |= a,
        e.lanes = a,
        e.memoizedState = f
    }
}
function of(e, t, n) {
    if (e = t.effects,
    t.effects = null,
    e !== null)
        for (t = 0; t < e.length; t++) {
            var r = e[t]
              , i = r.callback;
            if (i !== null) {
                if (r.callback = null,
                r = n,
                typeof i != "function")
                    throw Error(_(191, i));
                i.call(r)
            }
        }
}
var sl = {}
  , ln = pr(sl)
  , zs = pr(sl)
  , Us = pr(sl);
function br(e) {
    if (e === sl)
        throw Error(_(174));
    return e
}
function Cc(e, t) {
    switch (de(Us, t),
    de(zs, e),
    de(ln, sl),
    e = t.nodeType,
    e) {
    case 9:
    case 11:
        t = (t = t.documentElement) ? t.namespaceURI : Ko(null, "");
        break;
    default:
        e = e === 8 ? t.parentNode : t,
        t = e.namespaceURI || null,
        e = e.tagName,
        t = Ko(t, e)
    }
    he(ln),
    de(ln, t)
}
function Ui() {
    he(ln),
    he(zs),
    he(Us)
}
function Bp(e) {
    br(Us.current);
    var t = br(ln.current)
      , n = Ko(t, e.type);
    t !== n && (de(zs, e),
    de(ln, n))
}
function Rc(e) {
    zs.current === e && (he(ln),
    he(zs))
}
var ve = pr(0);
function ya(e) {
    for (var t = e; t !== null; ) {
        if (t.tag === 13) {
            var n = t.memoizedState;
            if (n !== null && (n = n.dehydrated,
            n === null || n.data === "$?" || n.data === "$!"))
                return t
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
            if (t.flags & 128)
                return t
        } else if (t.child !== null) {
            t.child.return = t,
            t = t.child;
            continue
        }
        if (t === e)
            break;
        for (; t.sibling === null; ) {
            if (t.return === null || t.return === e)
                return null;
            t = t.return
        }
        t.sibling.return = t.return,
        t = t.sibling
    }
    return null
}
var Eo = [];
function Pc() {
    for (var e = 0; e < Eo.length; e++)
        Eo[e]._workInProgressVersionPrimary = null;
    Eo.length = 0
}
var Wl = Rn.ReactCurrentDispatcher
  , No = Rn.ReactCurrentBatchConfig
  , Hr = 0
  , ge = null
  , _e = null
  , De = null
  , va = !1
  , ks = !1
  , Qs = 0
  , Og = 0;
function Be() {
    throw Error(_(321))
}
function Tc(e, t) {
    if (t === null)
        return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
        if (!qt(e[n], t[n]))
            return !1;
    return !0
}
function _c(e, t, n, r, i, s) {
    if (Hr = s,
    ge = t,
    t.memoizedState = null,
    t.updateQueue = null,
    t.lanes = 0,
    Wl.current = e === null || e.memoizedState === null ? Fg : Ag,
    e = n(r, i),
    ks) {
        s = 0;
        do {
            if (ks = !1,
            Qs = 0,
            25 <= s)
                throw Error(_(301));
            s += 1,
            De = _e = null,
            t.updateQueue = null,
            Wl.current = zg,
            e = n(r, i)
        } while (ks)
    }
    if (Wl.current = ga,
    t = _e !== null && _e.next !== null,
    Hr = 0,
    De = _e = ge = null,
    va = !1,
    t)
        throw Error(_(300));
    return e
}
function Lc() {
    var e = Qs !== 0;
    return Qs = 0,
    e
}
function Zt() {
    var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
    };
    return De === null ? ge.memoizedState = De = e : De = De.next = e,
    De
}
function Dt() {
    if (_e === null) {
        var e = ge.alternate;
        e = e !== null ? e.memoizedState : null
    } else
        e = _e.next;
    var t = De === null ? ge.memoizedState : De.next;
    if (t !== null)
        De = t,
        _e = e;
    else {
        if (e === null)
            throw Error(_(310));
        _e = e,
        e = {
            memoizedState: _e.memoizedState,
            baseState: _e.baseState,
            baseQueue: _e.baseQueue,
            queue: _e.queue,
            next: null
        },
        De === null ? ge.memoizedState = De = e : De = De.next = e
    }
    return De
}
function Hs(e, t) {
    return typeof t == "function" ? t(e) : t
}
function bo(e) {
    var t = Dt()
      , n = t.queue;
    if (n === null)
        throw Error(_(311));
    n.lastRenderedReducer = e;
    var r = _e
      , i = r.baseQueue
      , s = n.pending;
    if (s !== null) {
        if (i !== null) {
            var a = i.next;
            i.next = s.next,
            s.next = a
        }
        r.baseQueue = i = s,
        n.pending = null
    }
    if (i !== null) {
        s = i.next,
        r = r.baseState;
        var o = a = null
          , u = null
          , c = s;
        do {
            var d = c.lane;
            if ((Hr & d) === d)
                u !== null && (u = u.next = {
                    lane: 0,
                    action: c.action,
                    hasEagerState: c.hasEagerState,
                    eagerState: c.eagerState,
                    next: null
                }),
                r = c.hasEagerState ? c.eagerState : e(r, c.action);
            else {
                var f = {
                    lane: d,
                    action: c.action,
                    hasEagerState: c.hasEagerState,
                    eagerState: c.eagerState,
                    next: null
                };
                u === null ? (o = u = f,
                a = r) : u = u.next = f,
                ge.lanes |= d,
                Br |= d
            }
            c = c.next
        } while (c !== null && c !== s);
        u === null ? a = r : u.next = o,
        qt(r, t.memoizedState) || (ft = !0),
        t.memoizedState = r,
        t.baseState = a,
        t.baseQueue = u,
        n.lastRenderedState = r
    }
    if (e = n.interleaved,
    e !== null) {
        i = e;
        do
            s = i.lane,
            ge.lanes |= s,
            Br |= s,
            i = i.next;
        while (i !== e)
    } else
        i === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch]
}
function Co(e) {
    var t = Dt()
      , n = t.queue;
    if (n === null)
        throw Error(_(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch
      , i = n.pending
      , s = t.memoizedState;
    if (i !== null) {
        n.pending = null;
        var a = i = i.next;
        do
            s = e(s, a.action),
            a = a.next;
        while (a !== i);
        qt(s, t.memoizedState) || (ft = !0),
        t.memoizedState = s,
        t.baseQueue === null && (t.baseState = s),
        n.lastRenderedState = s
    }
    return [s, r]
}
function $p() {}
function Wp(e, t) {
    var n = ge
      , r = Dt()
      , i = t()
      , s = !qt(r.memoizedState, i);
    if (s && (r.memoizedState = i,
    ft = !0),
    r = r.queue,
    Oc(Gp.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || s || De !== null && De.memoizedState.tag & 1) {
        if (n.flags |= 2048,
        Bs(9, Kp.bind(null, n, r, i, t), void 0, null),
        Me === null)
            throw Error(_(349));
        Hr & 30 || Vp(n, t, i)
    }
    return i
}
function Vp(e, t, n) {
    e.flags |= 16384,
    e = {
        getSnapshot: t,
        value: n
    },
    t = ge.updateQueue,
    t === null ? (t = {
        lastEffect: null,
        stores: null
    },
    ge.updateQueue = t,
    t.stores = [e]) : (n = t.stores,
    n === null ? t.stores = [e] : n.push(e))
}
function Kp(e, t, n, r) {
    t.value = n,
    t.getSnapshot = r,
    qp(t) && Yp(e)
}
function Gp(e, t, n) {
    return n(function() {
        qp(t) && Yp(e)
    })
}
function qp(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
        var n = t();
        return !qt(e, n)
    } catch {
        return !0
    }
}
function Yp(e) {
    var t = kn(e, 1);
    t !== null && Gt(t, e, 1, -1)
}
function uf(e) {
    var t = Zt();
    return typeof e == "function" && (e = e()),
    t.memoizedState = t.baseState = e,
    e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Hs,
        lastRenderedState: e
    },
    t.queue = e,
    e = e.dispatch = Mg.bind(null, ge, e),
    [t.memoizedState, e]
}
function Bs(e, t, n, r) {
    return e = {
        tag: e,
        create: t,
        destroy: n,
        deps: r,
        next: null
    },
    t = ge.updateQueue,
    t === null ? (t = {
        lastEffect: null,
        stores: null
    },
    ge.updateQueue = t,
    t.lastEffect = e.next = e) : (n = t.lastEffect,
    n === null ? t.lastEffect = e.next = e : (r = n.next,
    n.next = e,
    e.next = r,
    t.lastEffect = e)),
    e
}
function Xp() {
    return Dt().memoizedState
}
function Vl(e, t, n, r) {
    var i = Zt();
    ge.flags |= e,
    i.memoizedState = Bs(1 | t, n, void 0, r === void 0 ? null : r)
}
function Aa(e, t, n, r) {
    var i = Dt();
    r = r === void 0 ? null : r;
    var s = void 0;
    if (_e !== null) {
        var a = _e.memoizedState;
        if (s = a.destroy,
        r !== null && Tc(r, a.deps)) {
            i.memoizedState = Bs(t, n, s, r);
            return
        }
    }
    ge.flags |= e,
    i.memoizedState = Bs(1 | t, n, s, r)
}
function cf(e, t) {
    return Vl(8390656, 8, e, t)
}
function Oc(e, t) {
    return Aa(2048, 8, e, t)
}
function Jp(e, t) {
    return Aa(4, 2, e, t)
}
function Zp(e, t) {
    return Aa(4, 4, e, t)
}
function em(e, t) {
    if (typeof t == "function")
        return e = e(),
        t(e),
        function() {
            t(null)
        }
        ;
    if (t != null)
        return e = e(),
        t.current = e,
        function() {
            t.current = null
        }
}
function tm(e, t, n) {
    return n = n != null ? n.concat([e]) : null,
    Aa(4, 4, em.bind(null, t, e), n)
}
function Ic() {}
function nm(e, t) {
    var n = Dt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Tc(t, r[1]) ? r[0] : (n.memoizedState = [e, t],
    e)
}
function rm(e, t) {
    var n = Dt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Tc(t, r[1]) ? r[0] : (e = e(),
    n.memoizedState = [e, t],
    e)
}
function im(e, t, n) {
    return Hr & 21 ? (qt(n, t) || (n = up(),
    ge.lanes |= n,
    Br |= n,
    e.baseState = !0),
    t) : (e.baseState && (e.baseState = !1,
    ft = !0),
    e.memoizedState = n)
}
function Ig(e, t) {
    var n = ae;
    ae = n !== 0 && 4 > n ? n : 4,
    e(!0);
    var r = No.transition;
    No.transition = {};
    try {
        e(!1),
        t()
    } finally {
        ae = n,
        No.transition = r
    }
}
function sm() {
    return Dt().memoizedState
}
function Dg(e, t, n) {
    var r = ar(e);
    if (n = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null
    },
    lm(e))
        am(t, n);
    else if (n = Qp(e, t, n, r),
    n !== null) {
        var i = rt();
        Gt(n, e, r, i),
        om(n, t, r)
    }
}
function Mg(e, t, n) {
    var r = ar(e)
      , i = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null
    };
    if (lm(e))
        am(t, i);
    else {
        var s = e.alternate;
        if (e.lanes === 0 && (s === null || s.lanes === 0) && (s = t.lastRenderedReducer,
        s !== null))
            try {
                var a = t.lastRenderedState
                  , o = s(a, n);
                if (i.hasEagerState = !0,
                i.eagerState = o,
                qt(o, a)) {
                    var u = t.interleaved;
                    u === null ? (i.next = i,
                    Nc(t)) : (i.next = u.next,
                    u.next = i),
                    t.interleaved = i;
                    return
                }
            } catch {} finally {}
        n = Qp(e, t, i, r),
        n !== null && (i = rt(),
        Gt(n, e, r, i),
        om(n, t, r))
    }
}
function lm(e) {
    var t = e.alternate;
    return e === ge || t !== null && t === ge
}
function am(e, t) {
    ks = va = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next,
    n.next = t),
    e.pending = t
}
function om(e, t, n) {
    if (n & 4194240) {
        var r = t.lanes;
        r &= e.pendingLanes,
        n |= r,
        t.lanes = n,
        dc(e, n)
    }
}
var ga = {
    readContext: It,
    useCallback: Be,
    useContext: Be,
    useEffect: Be,
    useImperativeHandle: Be,
    useInsertionEffect: Be,
    useLayoutEffect: Be,
    useMemo: Be,
    useReducer: Be,
    useRef: Be,
    useState: Be,
    useDebugValue: Be,
    useDeferredValue: Be,
    useTransition: Be,
    useMutableSource: Be,
    useSyncExternalStore: Be,
    useId: Be,
    unstable_isNewReconciler: !1
}
  , Fg = {
    readContext: It,
    useCallback: function(e, t) {
        return Zt().memoizedState = [e, t === void 0 ? null : t],
        e
    },
    useContext: It,
    useEffect: cf,
    useImperativeHandle: function(e, t, n) {
        return n = n != null ? n.concat([e]) : null,
        Vl(4194308, 4, em.bind(null, t, e), n)
    },
    useLayoutEffect: function(e, t) {
        return Vl(4194308, 4, e, t)
    },
    useInsertionEffect: function(e, t) {
        return Vl(4, 2, e, t)
    },
    useMemo: function(e, t) {
        var n = Zt();
        return t = t === void 0 ? null : t,
        e = e(),
        n.memoizedState = [e, t],
        e
    },
    useReducer: function(e, t, n) {
        var r = Zt();
        return t = n !== void 0 ? n(t) : t,
        r.memoizedState = r.baseState = t,
        e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: t
        },
        r.queue = e,
        e = e.dispatch = Dg.bind(null, ge, e),
        [r.memoizedState, e]
    },
    useRef: function(e) {
        var t = Zt();
        return e = {
            current: e
        },
        t.memoizedState = e
    },
    useState: uf,
    useDebugValue: Ic,
    useDeferredValue: function(e) {
        return Zt().memoizedState = e
    },
    useTransition: function() {
        var e = uf(!1)
          , t = e[0];
        return e = Ig.bind(null, e[1]),
        Zt().memoizedState = e,
        [t, e]
    },
    useMutableSource: function() {},
    useSyncExternalStore: function(e, t, n) {
        var r = ge
          , i = Zt();
        if (me) {
            if (n === void 0)
                throw Error(_(407));
            n = n()
        } else {
            if (n = t(),
            Me === null)
                throw Error(_(349));
            Hr & 30 || Vp(r, t, n)
        }
        i.memoizedState = n;
        var s = {
            value: n,
            getSnapshot: t
        };
        return i.queue = s,
        cf(Gp.bind(null, r, s, e), [e]),
        r.flags |= 2048,
        Bs(9, Kp.bind(null, r, s, n, t), void 0, null),
        n
    },
    useId: function() {
        var e = Zt()
          , t = Me.identifierPrefix;
        if (me) {
            var n = vn
              , r = yn;
            n = (r & ~(1 << 32 - Kt(r) - 1)).toString(32) + n,
            t = ":" + t + "R" + n,
            n = Qs++,
            0 < n && (t += "H" + n.toString(32)),
            t += ":"
        } else
            n = Og++,
            t = ":" + t + "r" + n.toString(32) + ":";
        return e.memoizedState = t
    },
    unstable_isNewReconciler: !1
}
  , Ag = {
    readContext: It,
    useCallback: nm,
    useContext: It,
    useEffect: Oc,
    useImperativeHandle: tm,
    useInsertionEffect: Jp,
    useLayoutEffect: Zp,
    useMemo: rm,
    useReducer: bo,
    useRef: Xp,
    useState: function() {
        return bo(Hs)
    },
    useDebugValue: Ic,
    useDeferredValue: function(e) {
        var t = Dt();
        return im(t, _e.memoizedState, e)
    },
    useTransition: function() {
        var e = bo(Hs)[0]
          , t = Dt().memoizedState;
        return [e, t]
    },
    useMutableSource: $p,
    useSyncExternalStore: Wp,
    useId: sm,
    unstable_isNewReconciler: !1
}
  , zg = {
    readContext: It,
    useCallback: nm,
    useContext: It,
    useEffect: Oc,
    useImperativeHandle: tm,
    useInsertionEffect: Jp,
    useLayoutEffect: Zp,
    useMemo: rm,
    useReducer: Co,
    useRef: Xp,
    useState: function() {
        return Co(Hs)
    },
    useDebugValue: Ic,
    useDeferredValue: function(e) {
        var t = Dt();
        return _e === null ? t.memoizedState = e : im(t, _e.memoizedState, e)
    },
    useTransition: function() {
        var e = Co(Hs)[0]
          , t = Dt().memoizedState;
        return [e, t]
    },
    useMutableSource: $p,
    useSyncExternalStore: Wp,
    useId: sm,
    unstable_isNewReconciler: !1
};
function Qt(e, t) {
    if (e && e.defaultProps) {
        t = xe({}, t),
        e = e.defaultProps;
        for (var n in e)
            t[n] === void 0 && (t[n] = e[n]);
        return t
    }
    return t
}
function pu(e, t, n, r) {
    t = e.memoizedState,
    n = n(r, t),
    n = n == null ? t : xe({}, t, n),
    e.memoizedState = n,
    e.lanes === 0 && (e.updateQueue.baseState = n)
}
var za = {
    isMounted: function(e) {
        return (e = e._reactInternals) ? qr(e) === e : !1
    },
    enqueueSetState: function(e, t, n) {
        e = e._reactInternals;
        var r = rt()
          , i = ar(e)
          , s = gn(r, i);
        s.payload = t,
        n != null && (s.callback = n),
        t = sr(e, s, i),
        t !== null && (Gt(t, e, i, r),
        $l(t, e, i))
    },
    enqueueReplaceState: function(e, t, n) {
        e = e._reactInternals;
        var r = rt()
          , i = ar(e)
          , s = gn(r, i);
        s.tag = 1,
        s.payload = t,
        n != null && (s.callback = n),
        t = sr(e, s, i),
        t !== null && (Gt(t, e, i, r),
        $l(t, e, i))
    },
    enqueueForceUpdate: function(e, t) {
        e = e._reactInternals;
        var n = rt()
          , r = ar(e)
          , i = gn(n, r);
        i.tag = 2,
        t != null && (i.callback = t),
        t = sr(e, i, r),
        t !== null && (Gt(t, e, r, n),
        $l(t, e, r))
    }
};
function df(e, t, n, r, i, s, a) {
    return e = e.stateNode,
    typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, s, a) : t.prototype && t.prototype.isPureReactComponent ? !Ds(n, r) || !Ds(i, s) : !0
}
function um(e, t, n) {
    var r = !1
      , i = fr
      , s = t.contextType;
    return typeof s == "object" && s !== null ? s = It(s) : (i = pt(t) ? Ur : Ge.current,
    r = t.contextTypes,
    s = (r = r != null) ? Fi(e, i) : fr),
    t = new t(n,s),
    e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null,
    t.updater = za,
    e.stateNode = t,
    t._reactInternals = e,
    r && (e = e.stateNode,
    e.__reactInternalMemoizedUnmaskedChildContext = i,
    e.__reactInternalMemoizedMaskedChildContext = s),
    t
}
function ff(e, t, n, r) {
    e = t.state,
    typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && za.enqueueReplaceState(t, t.state, null)
}
function mu(e, t, n, r) {
    var i = e.stateNode;
    i.props = n,
    i.state = e.memoizedState,
    i.refs = {},
    bc(e);
    var s = t.contextType;
    typeof s == "object" && s !== null ? i.context = It(s) : (s = pt(t) ? Ur : Ge.current,
    i.context = Fi(e, s)),
    i.state = e.memoizedState,
    s = t.getDerivedStateFromProps,
    typeof s == "function" && (pu(e, t, s, n),
    i.state = e.memoizedState),
    typeof t.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (t = i.state,
    typeof i.componentWillMount == "function" && i.componentWillMount(),
    typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(),
    t !== i.state && za.enqueueReplaceState(i, i.state, null),
    ma(e, n, i, r),
    i.state = e.memoizedState),
    typeof i.componentDidMount == "function" && (e.flags |= 4194308)
}
function Qi(e, t) {
    try {
        var n = ""
          , r = t;
        do
            n += hv(r),
            r = r.return;
        while (r);
        var i = n
    } catch (s) {
        i = `
Error generating stack: ` + s.message + `
` + s.stack
    }
    return {
        value: e,
        source: t,
        stack: i,
        digest: null
    }
}
function Ro(e, t, n) {
    return {
        value: e,
        source: null,
        stack: n ?? null,
        digest: t ?? null
    }
}
function yu(e, t) {
    try {
        console.error(t.value)
    } catch (n) {
        setTimeout(function() {
            throw n
        })
    }
}
var Ug = typeof WeakMap == "function" ? WeakMap : Map;
function cm(e, t, n) {
    n = gn(-1, n),
    n.tag = 3,
    n.payload = {
        element: null
    };
    var r = t.value;
    return n.callback = function() {
        wa || (wa = !0,
        bu = r),
        yu(e, t)
    }
    ,
    n
}
function dm(e, t, n) {
    n = gn(-1, n),
    n.tag = 3;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
        var i = t.value;
        n.payload = function() {
            return r(i)
        }
        ,
        n.callback = function() {
            yu(e, t)
        }
    }
    var s = e.stateNode;
    return s !== null && typeof s.componentDidCatch == "function" && (n.callback = function() {
        yu(e, t),
        typeof r != "function" && (lr === null ? lr = new Set([this]) : lr.add(this));
        var a = t.stack;
        this.componentDidCatch(t.value, {
            componentStack: a !== null ? a : ""
        })
    }
    ),
    n
}
function hf(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
        r = e.pingCache = new Ug;
        var i = new Set;
        r.set(t, i)
    } else
        i = r.get(t),
        i === void 0 && (i = new Set,
        r.set(t, i));
    i.has(n) || (i.add(n),
    e = ex.bind(null, e, t, n),
    t.then(e, e))
}
function pf(e) {
    do {
        var t;
        if ((t = e.tag === 13) && (t = e.memoizedState,
        t = t !== null ? t.dehydrated !== null : !0),
        t)
            return e;
        e = e.return
    } while (e !== null);
    return null
}
function mf(e, t, n, r, i) {
    return e.mode & 1 ? (e.flags |= 65536,
    e.lanes = i,
    e) : (e === t ? e.flags |= 65536 : (e.flags |= 128,
    n.flags |= 131072,
    n.flags &= -52805,
    n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = gn(-1, 1),
    t.tag = 2,
    sr(n, t, 1))),
    n.lanes |= 1),
    e)
}
var Qg = Rn.ReactCurrentOwner
  , ft = !1;
function Ze(e, t, n, r) {
    t.child = e === null ? Up(t, null, n, r) : zi(t, e.child, n, r)
}
function yf(e, t, n, r, i) {
    n = n.render;
    var s = t.ref;
    return wi(t, i),
    r = _c(e, t, n, r, s, i),
    n = Lc(),
    e !== null && !ft ? (t.updateQueue = e.updateQueue,
    t.flags &= -2053,
    e.lanes &= ~i,
    En(e, t, i)) : (me && n && xc(t),
    t.flags |= 1,
    Ze(e, t, r, i),
    t.child)
}
function vf(e, t, n, r, i) {
    if (e === null) {
        var s = n.type;
        return typeof s == "function" && !Hc(s) && s.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15,
        t.type = s,
        fm(e, t, s, r, i)) : (e = Yl(n.type, null, r, t, t.mode, i),
        e.ref = t.ref,
        e.return = t,
        t.child = e)
    }
    if (s = e.child,
    !(e.lanes & i)) {
        var a = s.memoizedProps;
        if (n = n.compare,
        n = n !== null ? n : Ds,
        n(a, r) && e.ref === t.ref)
            return En(e, t, i)
    }
    return t.flags |= 1,
    e = or(s, r),
    e.ref = t.ref,
    e.return = t,
    t.child = e
}
function fm(e, t, n, r, i) {
    if (e !== null) {
        var s = e.memoizedProps;
        if (Ds(s, r) && e.ref === t.ref)
            if (ft = !1,
            t.pendingProps = r = s,
            (e.lanes & i) !== 0)
                e.flags & 131072 && (ft = !0);
            else
                return t.lanes = e.lanes,
                En(e, t, i)
    }
    return vu(e, t, n, r, i)
}
function hm(e, t, n) {
    var r = t.pendingProps
      , i = r.children
      , s = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden")
        if (!(t.mode & 1))
            t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null
            },
            de(mi, xt),
            xt |= n;
        else {
            if (!(n & 1073741824))
                return e = s !== null ? s.baseLanes | n : n,
                t.lanes = t.childLanes = 1073741824,
                t.memoizedState = {
                    baseLanes: e,
                    cachePool: null,
                    transitions: null
                },
                t.updateQueue = null,
                de(mi, xt),
                xt |= e,
                null;
            t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null
            },
            r = s !== null ? s.baseLanes : n,
            de(mi, xt),
            xt |= r
        }
    else
        s !== null ? (r = s.baseLanes | n,
        t.memoizedState = null) : r = n,
        de(mi, xt),
        xt |= r;
    return Ze(e, t, i, n),
    t.child
}
function pm(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512,
    t.flags |= 2097152)
}
function vu(e, t, n, r, i) {
    var s = pt(n) ? Ur : Ge.current;
    return s = Fi(t, s),
    wi(t, i),
    n = _c(e, t, n, r, s, i),
    r = Lc(),
    e !== null && !ft ? (t.updateQueue = e.updateQueue,
    t.flags &= -2053,
    e.lanes &= ~i,
    En(e, t, i)) : (me && r && xc(t),
    t.flags |= 1,
    Ze(e, t, n, i),
    t.child)
}
function gf(e, t, n, r, i) {
    if (pt(n)) {
        var s = !0;
        ca(t)
    } else
        s = !1;
    if (wi(t, i),
    t.stateNode === null)
        Kl(e, t),
        um(t, n, r),
        mu(t, n, r, i),
        r = !0;
    else if (e === null) {
        var a = t.stateNode
          , o = t.memoizedProps;
        a.props = o;
        var u = a.context
          , c = n.contextType;
        typeof c == "object" && c !== null ? c = It(c) : (c = pt(n) ? Ur : Ge.current,
        c = Fi(t, c));
        var d = n.getDerivedStateFromProps
          , f = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function";
        f || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== r || u !== c) && ff(t, a, r, c),
        Un = !1;
        var m = t.memoizedState;
        a.state = m,
        ma(t, r, a, i),
        u = t.memoizedState,
        o !== r || m !== u || ht.current || Un ? (typeof d == "function" && (pu(t, n, d, r),
        u = t.memoizedState),
        (o = Un || df(t, n, o, r, m, u, c)) ? (f || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(),
        typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()),
        typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308),
        t.memoizedProps = r,
        t.memoizedState = u),
        a.props = r,
        a.state = u,
        a.context = c,
        r = o) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308),
        r = !1)
    } else {
        a = t.stateNode,
        Hp(e, t),
        o = t.memoizedProps,
        c = t.type === t.elementType ? o : Qt(t.type, o),
        a.props = c,
        f = t.pendingProps,
        m = a.context,
        u = n.contextType,
        typeof u == "object" && u !== null ? u = It(u) : (u = pt(n) ? Ur : Ge.current,
        u = Fi(t, u));
        var y = n.getDerivedStateFromProps;
        (d = typeof y == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== f || m !== u) && ff(t, a, r, u),
        Un = !1,
        m = t.memoizedState,
        a.state = m,
        ma(t, r, a, i);
        var S = t.memoizedState;
        o !== f || m !== S || ht.current || Un ? (typeof y == "function" && (pu(t, n, y, r),
        S = t.memoizedState),
        (c = Un || df(t, n, c, r, m, S, u) || !1) ? (d || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, S, u),
        typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, S, u)),
        typeof a.componentDidUpdate == "function" && (t.flags |= 4),
        typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && m === e.memoizedState || (t.flags |= 4),
        typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && m === e.memoizedState || (t.flags |= 1024),
        t.memoizedProps = r,
        t.memoizedState = S),
        a.props = r,
        a.state = S,
        a.context = u,
        r = c) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && m === e.memoizedState || (t.flags |= 4),
        typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && m === e.memoizedState || (t.flags |= 1024),
        r = !1)
    }
    return gu(e, t, n, r, s, i)
}
function gu(e, t, n, r, i, s) {
    pm(e, t);
    var a = (t.flags & 128) !== 0;
    if (!r && !a)
        return i && nf(t, n, !1),
        En(e, t, s);
    r = t.stateNode,
    Qg.current = t;
    var o = a && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return t.flags |= 1,
    e !== null && a ? (t.child = zi(t, e.child, null, s),
    t.child = zi(t, null, o, s)) : Ze(e, t, o, s),
    t.memoizedState = r.state,
    i && nf(t, n, !0),
    t.child
}
function mm(e) {
    var t = e.stateNode;
    t.pendingContext ? tf(e, t.pendingContext, t.pendingContext !== t.context) : t.context && tf(e, t.context, !1),
    Cc(e, t.containerInfo)
}
function xf(e, t, n, r, i) {
    return Ai(),
    jc(i),
    t.flags |= 256,
    Ze(e, t, n, r),
    t.child
}
var xu = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0
};
function wu(e) {
    return {
        baseLanes: e,
        cachePool: null,
        transitions: null
    }
}
function ym(e, t, n) {
    var r = t.pendingProps, i = ve.current, s = !1, a = (t.flags & 128) !== 0, o;
    if ((o = a) || (o = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
    o ? (s = !0,
    t.flags &= -129) : (e === null || e.memoizedState !== null) && (i |= 1),
    de(ve, i & 1),
    e === null)
        return fu(t),
        e = t.memoizedState,
        e !== null && (e = e.dehydrated,
        e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1,
        null) : (a = r.children,
        e = r.fallback,
        s ? (r = t.mode,
        s = t.child,
        a = {
            mode: "hidden",
            children: a
        },
        !(r & 1) && s !== null ? (s.childLanes = 0,
        s.pendingProps = a) : s = Ha(a, r, 0, null),
        e = zr(e, r, n, null),
        s.return = t,
        e.return = t,
        s.sibling = e,
        t.child = s,
        t.child.memoizedState = wu(n),
        t.memoizedState = xu,
        e) : Dc(t, a));
    if (i = e.memoizedState,
    i !== null && (o = i.dehydrated,
    o !== null))
        return Hg(e, t, a, r, o, i, n);
    if (s) {
        s = r.fallback,
        a = t.mode,
        i = e.child,
        o = i.sibling;
        var u = {
            mode: "hidden",
            children: r.children
        };
        return !(a & 1) && t.child !== i ? (r = t.child,
        r.childLanes = 0,
        r.pendingProps = u,
        t.deletions = null) : (r = or(i, u),
        r.subtreeFlags = i.subtreeFlags & 14680064),
        o !== null ? s = or(o, s) : (s = zr(s, a, n, null),
        s.flags |= 2),
        s.return = t,
        r.return = t,
        r.sibling = s,
        t.child = r,
        r = s,
        s = t.child,
        a = e.child.memoizedState,
        a = a === null ? wu(n) : {
            baseLanes: a.baseLanes | n,
            cachePool: null,
            transitions: a.transitions
        },
        s.memoizedState = a,
        s.childLanes = e.childLanes & ~n,
        t.memoizedState = xu,
        r
    }
    return s = e.child,
    e = s.sibling,
    r = or(s, {
        mode: "visible",
        children: r.children
    }),
    !(t.mode & 1) && (r.lanes = n),
    r.return = t,
    r.sibling = null,
    e !== null && (n = t.deletions,
    n === null ? (t.deletions = [e],
    t.flags |= 16) : n.push(e)),
    t.child = r,
    t.memoizedState = null,
    r
}
function Dc(e, t) {
    return t = Ha({
        mode: "visible",
        children: t
    }, e.mode, 0, null),
    t.return = e,
    e.child = t
}
function Ll(e, t, n, r) {
    return r !== null && jc(r),
    zi(t, e.child, null, n),
    e = Dc(t, t.pendingProps.children),
    e.flags |= 2,
    t.memoizedState = null,
    e
}
function Hg(e, t, n, r, i, s, a) {
    if (n)
        return t.flags & 256 ? (t.flags &= -257,
        r = Ro(Error(_(422))),
        Ll(e, t, a, r)) : t.memoizedState !== null ? (t.child = e.child,
        t.flags |= 128,
        null) : (s = r.fallback,
        i = t.mode,
        r = Ha({
            mode: "visible",
            children: r.children
        }, i, 0, null),
        s = zr(s, i, a, null),
        s.flags |= 2,
        r.return = t,
        s.return = t,
        r.sibling = s,
        t.child = r,
        t.mode & 1 && zi(t, e.child, null, a),
        t.child.memoizedState = wu(a),
        t.memoizedState = xu,
        s);
    if (!(t.mode & 1))
        return Ll(e, t, a, null);
    if (i.data === "$!") {
        if (r = i.nextSibling && i.nextSibling.dataset,
        r)
            var o = r.dgst;
        return r = o,
        s = Error(_(419)),
        r = Ro(s, r, void 0),
        Ll(e, t, a, r)
    }
    if (o = (a & e.childLanes) !== 0,
    ft || o) {
        if (r = Me,
        r !== null) {
            switch (a & -a) {
            case 4:
                i = 2;
                break;
            case 16:
                i = 8;
                break;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
                i = 32;
                break;
            case 536870912:
                i = 268435456;
                break;
            default:
                i = 0
            }
            i = i & (r.suspendedLanes | a) ? 0 : i,
            i !== 0 && i !== s.retryLane && (s.retryLane = i,
            kn(e, i),
            Gt(r, e, i, -1))
        }
        return Qc(),
        r = Ro(Error(_(421))),
        Ll(e, t, a, r)
    }
    return i.data === "$?" ? (t.flags |= 128,
    t.child = e.child,
    t = tx.bind(null, e),
    i._reactRetry = t,
    null) : (e = s.treeContext,
    kt = ir(i.nextSibling),
    Et = t,
    me = !0,
    Wt = null,
    e !== null && (Tt[_t++] = yn,
    Tt[_t++] = vn,
    Tt[_t++] = Qr,
    yn = e.id,
    vn = e.overflow,
    Qr = t),
    t = Dc(t, r.children),
    t.flags |= 4096,
    t)
}
function wf(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t),
    hu(e.return, t, n)
}
function Po(e, t, n, r, i) {
    var s = e.memoizedState;
    s === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: i
    } : (s.isBackwards = t,
    s.rendering = null,
    s.renderingStartTime = 0,
    s.last = r,
    s.tail = n,
    s.tailMode = i)
}
function vm(e, t, n) {
    var r = t.pendingProps
      , i = r.revealOrder
      , s = r.tail;
    if (Ze(e, t, r.children, n),
    r = ve.current,
    r & 2)
        r = r & 1 | 2,
        t.flags |= 128;
    else {
        if (e !== null && e.flags & 128)
            e: for (e = t.child; e !== null; ) {
                if (e.tag === 13)
                    e.memoizedState !== null && wf(e, n, t);
                else if (e.tag === 19)
                    wf(e, n, t);
                else if (e.child !== null) {
                    e.child.return = e,
                    e = e.child;
                    continue
                }
                if (e === t)
                    break e;
                for (; e.sibling === null; ) {
                    if (e.return === null || e.return === t)
                        break e;
                    e = e.return
                }
                e.sibling.return = e.return,
                e = e.sibling
            }
        r &= 1
    }
    if (de(ve, r),
    !(t.mode & 1))
        t.memoizedState = null;
    else
        switch (i) {
        case "forwards":
            for (n = t.child,
            i = null; n !== null; )
                e = n.alternate,
                e !== null && ya(e) === null && (i = n),
                n = n.sibling;
            n = i,
            n === null ? (i = t.child,
            t.child = null) : (i = n.sibling,
            n.sibling = null),
            Po(t, !1, i, n, s);
            break;
        case "backwards":
            for (n = null,
            i = t.child,
            t.child = null; i !== null; ) {
                if (e = i.alternate,
                e !== null && ya(e) === null) {
                    t.child = i;
                    break
                }
                e = i.sibling,
                i.sibling = n,
                n = i,
                i = e
            }
            Po(t, !0, n, null, s);
            break;
        case "together":
            Po(t, !1, null, null, void 0);
            break;
        default:
            t.memoizedState = null
        }
    return t.child
}
function Kl(e, t) {
    !(t.mode & 1) && e !== null && (e.alternate = null,
    t.alternate = null,
    t.flags |= 2)
}
function En(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies),
    Br |= t.lanes,
    !(n & t.childLanes))
        return null;
    if (e !== null && t.child !== e.child)
        throw Error(_(153));
    if (t.child !== null) {
        for (e = t.child,
        n = or(e, e.pendingProps),
        t.child = n,
        n.return = t; e.sibling !== null; )
            e = e.sibling,
            n = n.sibling = or(e, e.pendingProps),
            n.return = t;
        n.sibling = null
    }
    return t.child
}
function Bg(e, t, n) {
    switch (t.tag) {
    case 3:
        mm(t),
        Ai();
        break;
    case 5:
        Bp(t);
        break;
    case 1:
        pt(t.type) && ca(t);
        break;
    case 4:
        Cc(t, t.stateNode.containerInfo);
        break;
    case 10:
        var r = t.type._context
          , i = t.memoizedProps.value;
        de(ha, r._currentValue),
        r._currentValue = i;
        break;
    case 13:
        if (r = t.memoizedState,
        r !== null)
            return r.dehydrated !== null ? (de(ve, ve.current & 1),
            t.flags |= 128,
            null) : n & t.child.childLanes ? ym(e, t, n) : (de(ve, ve.current & 1),
            e = En(e, t, n),
            e !== null ? e.sibling : null);
        de(ve, ve.current & 1);
        break;
    case 19:
        if (r = (n & t.childLanes) !== 0,
        e.flags & 128) {
            if (r)
                return vm(e, t, n);
            t.flags |= 128
        }
        if (i = t.memoizedState,
        i !== null && (i.rendering = null,
        i.tail = null,
        i.lastEffect = null),
        de(ve, ve.current),
        r)
            break;
        return null;
    case 22:
    case 23:
        return t.lanes = 0,
        hm(e, t, n)
    }
    return En(e, t, n)
}
var gm, ju, xm, wm;
gm = function(e, t) {
    for (var n = t.child; n !== null; ) {
        if (n.tag === 5 || n.tag === 6)
            e.appendChild(n.stateNode);
        else if (n.tag !== 4 && n.child !== null) {
            n.child.return = n,
            n = n.child;
            continue
        }
        if (n === t)
            break;
        for (; n.sibling === null; ) {
            if (n.return === null || n.return === t)
                return;
            n = n.return
        }
        n.sibling.return = n.return,
        n = n.sibling
    }
}
;
ju = function() {}
;
xm = function(e, t, n, r) {
    var i = e.memoizedProps;
    if (i !== r) {
        e = t.stateNode,
        br(ln.current);
        var s = null;
        switch (n) {
        case "input":
            i = Bo(e, i),
            r = Bo(e, r),
            s = [];
            break;
        case "select":
            i = xe({}, i, {
                value: void 0
            }),
            r = xe({}, r, {
                value: void 0
            }),
            s = [];
            break;
        case "textarea":
            i = Vo(e, i),
            r = Vo(e, r),
            s = [];
            break;
        default:
            typeof i.onClick != "function" && typeof r.onClick == "function" && (e.onclick = oa)
        }
        Go(n, r);
        var a;
        n = null;
        for (c in i)
            if (!r.hasOwnProperty(c) && i.hasOwnProperty(c) && i[c] != null)
                if (c === "style") {
                    var o = i[c];
                    for (a in o)
                        o.hasOwnProperty(a) && (n || (n = {}),
                        n[a] = "")
                } else
                    c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (Rs.hasOwnProperty(c) ? s || (s = []) : (s = s || []).push(c, null));
        for (c in r) {
            var u = r[c];
            if (o = i != null ? i[c] : void 0,
            r.hasOwnProperty(c) && u !== o && (u != null || o != null))
                if (c === "style")
                    if (o) {
                        for (a in o)
                            !o.hasOwnProperty(a) || u && u.hasOwnProperty(a) || (n || (n = {}),
                            n[a] = "");
                        for (a in u)
                            u.hasOwnProperty(a) && o[a] !== u[a] && (n || (n = {}),
                            n[a] = u[a])
                    } else
                        n || (s || (s = []),
                        s.push(c, n)),
                        n = u;
                else
                    c === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0,
                    o = o ? o.__html : void 0,
                    u != null && o !== u && (s = s || []).push(c, u)) : c === "children" ? typeof u != "string" && typeof u != "number" || (s = s || []).push(c, "" + u) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (Rs.hasOwnProperty(c) ? (u != null && c === "onScroll" && fe("scroll", e),
                    s || o === u || (s = [])) : (s = s || []).push(c, u))
        }
        n && (s = s || []).push("style", n);
        var c = s;
        (t.updateQueue = c) && (t.flags |= 4)
    }
}
;
wm = function(e, t, n, r) {
    n !== r && (t.flags |= 4)
}
;
function as(e, t) {
    if (!me)
        switch (e.tailMode) {
        case "hidden":
            t = e.tail;
            for (var n = null; t !== null; )
                t.alternate !== null && (n = t),
                t = t.sibling;
            n === null ? e.tail = null : n.sibling = null;
            break;
        case "collapsed":
            n = e.tail;
            for (var r = null; n !== null; )
                n.alternate !== null && (r = n),
                n = n.sibling;
            r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null
        }
}
function $e(e) {
    var t = e.alternate !== null && e.alternate.child === e.child
      , n = 0
      , r = 0;
    if (t)
        for (var i = e.child; i !== null; )
            n |= i.lanes | i.childLanes,
            r |= i.subtreeFlags & 14680064,
            r |= i.flags & 14680064,
            i.return = e,
            i = i.sibling;
    else
        for (i = e.child; i !== null; )
            n |= i.lanes | i.childLanes,
            r |= i.subtreeFlags,
            r |= i.flags,
            i.return = e,
            i = i.sibling;
    return e.subtreeFlags |= r,
    e.childLanes = n,
    t
}
function $g(e, t, n) {
    var r = t.pendingProps;
    switch (wc(t),
    t.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
        return $e(t),
        null;
    case 1:
        return pt(t.type) && ua(),
        $e(t),
        null;
    case 3:
        return r = t.stateNode,
        Ui(),
        he(ht),
        he(Ge),
        Pc(),
        r.pendingContext && (r.context = r.pendingContext,
        r.pendingContext = null),
        (e === null || e.child === null) && (Tl(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024,
        Wt !== null && (Pu(Wt),
        Wt = null))),
        ju(e, t),
        $e(t),
        null;
    case 5:
        Rc(t);
        var i = br(Us.current);
        if (n = t.type,
        e !== null && t.stateNode != null)
            xm(e, t, n, r, i),
            e.ref !== t.ref && (t.flags |= 512,
            t.flags |= 2097152);
        else {
            if (!r) {
                if (t.stateNode === null)
                    throw Error(_(166));
                return $e(t),
                null
            }
            if (e = br(ln.current),
            Tl(t)) {
                r = t.stateNode,
                n = t.type;
                var s = t.memoizedProps;
                switch (r[rn] = t,
                r[As] = s,
                e = (t.mode & 1) !== 0,
                n) {
                case "dialog":
                    fe("cancel", r),
                    fe("close", r);
                    break;
                case "iframe":
                case "object":
                case "embed":
                    fe("load", r);
                    break;
                case "video":
                case "audio":
                    for (i = 0; i < ms.length; i++)
                        fe(ms[i], r);
                    break;
                case "source":
                    fe("error", r);
                    break;
                case "img":
                case "image":
                case "link":
                    fe("error", r),
                    fe("load", r);
                    break;
                case "details":
                    fe("toggle", r);
                    break;
                case "input":
                    Rd(r, s),
                    fe("invalid", r);
                    break;
                case "select":
                    r._wrapperState = {
                        wasMultiple: !!s.multiple
                    },
                    fe("invalid", r);
                    break;
                case "textarea":
                    Td(r, s),
                    fe("invalid", r)
                }
                Go(n, s),
                i = null;
                for (var a in s)
                    if (s.hasOwnProperty(a)) {
                        var o = s[a];
                        a === "children" ? typeof o == "string" ? r.textContent !== o && (s.suppressHydrationWarning !== !0 && Pl(r.textContent, o, e),
                        i = ["children", o]) : typeof o == "number" && r.textContent !== "" + o && (s.suppressHydrationWarning !== !0 && Pl(r.textContent, o, e),
                        i = ["children", "" + o]) : Rs.hasOwnProperty(a) && o != null && a === "onScroll" && fe("scroll", r)
                    }
                switch (n) {
                case "input":
                    jl(r),
                    Pd(r, s, !0);
                    break;
                case "textarea":
                    jl(r),
                    _d(r);
                    break;
                case "select":
                case "option":
                    break;
                default:
                    typeof s.onClick == "function" && (r.onclick = oa)
                }
                r = i,
                t.updateQueue = r,
                r !== null && (t.flags |= 4)
            } else {
                a = i.nodeType === 9 ? i : i.ownerDocument,
                e === "http://www.w3.org/1999/xhtml" && (e = Gh(n)),
                e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = a.createElement("div"),
                e.innerHTML = "<script><\/script>",
                e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = a.createElement(n, {
                    is: r.is
                }) : (e = a.createElement(n),
                n === "select" && (a = e,
                r.multiple ? a.multiple = !0 : r.size && (a.size = r.size))) : e = a.createElementNS(e, n),
                e[rn] = t,
                e[As] = r,
                gm(e, t, !1, !1),
                t.stateNode = e;
                e: {
                    switch (a = qo(n, r),
                    n) {
                    case "dialog":
                        fe("cancel", e),
                        fe("close", e),
                        i = r;
                        break;
                    case "iframe":
                    case "object":
                    case "embed":
                        fe("load", e),
                        i = r;
                        break;
                    case "video":
                    case "audio":
                        for (i = 0; i < ms.length; i++)
                            fe(ms[i], e);
                        i = r;
                        break;
                    case "source":
                        fe("error", e),
                        i = r;
                        break;
                    case "img":
                    case "image":
                    case "link":
                        fe("error", e),
                        fe("load", e),
                        i = r;
                        break;
                    case "details":
                        fe("toggle", e),
                        i = r;
                        break;
                    case "input":
                        Rd(e, r),
                        i = Bo(e, r),
                        fe("invalid", e);
                        break;
                    case "option":
                        i = r;
                        break;
                    case "select":
                        e._wrapperState = {
                            wasMultiple: !!r.multiple
                        },
                        i = xe({}, r, {
                            value: void 0
                        }),
                        fe("invalid", e);
                        break;
                    case "textarea":
                        Td(e, r),
                        i = Vo(e, r),
                        fe("invalid", e);
                        break;
                    default:
                        i = r
                    }
                    Go(n, i),
                    o = i;
                    for (s in o)
                        if (o.hasOwnProperty(s)) {
                            var u = o[s];
                            s === "style" ? Xh(e, u) : s === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0,
                            u != null && qh(e, u)) : s === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && Ps(e, u) : typeof u == "number" && Ps(e, "" + u) : s !== "suppressContentEditableWarning" && s !== "suppressHydrationWarning" && s !== "autoFocus" && (Rs.hasOwnProperty(s) ? u != null && s === "onScroll" && fe("scroll", e) : u != null && sc(e, s, u, a))
                        }
                    switch (n) {
                    case "input":
                        jl(e),
                        Pd(e, r, !1);
                        break;
                    case "textarea":
                        jl(e),
                        _d(e);
                        break;
                    case "option":
                        r.value != null && e.setAttribute("value", "" + dr(r.value));
                        break;
                    case "select":
                        e.multiple = !!r.multiple,
                        s = r.value,
                        s != null ? yi(e, !!r.multiple, s, !1) : r.defaultValue != null && yi(e, !!r.multiple, r.defaultValue, !0);
                        break;
                    default:
                        typeof i.onClick == "function" && (e.onclick = oa)
                    }
                    switch (n) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                        r = !!r.autoFocus;
                        break e;
                    case "img":
                        r = !0;
                        break e;
                    default:
                        r = !1
                    }
                }
                r && (t.flags |= 4)
            }
            t.ref !== null && (t.flags |= 512,
            t.flags |= 2097152)
        }
        return $e(t),
        null;
    case 6:
        if (e && t.stateNode != null)
            wm(e, t, e.memoizedProps, r);
        else {
            if (typeof r != "string" && t.stateNode === null)
                throw Error(_(166));
            if (n = br(Us.current),
            br(ln.current),
            Tl(t)) {
                if (r = t.stateNode,
                n = t.memoizedProps,
                r[rn] = t,
                (s = r.nodeValue !== n) && (e = Et,
                e !== null))
                    switch (e.tag) {
                    case 3:
                        Pl(r.nodeValue, n, (e.mode & 1) !== 0);
                        break;
                    case 5:
                        e.memoizedProps.suppressHydrationWarning !== !0 && Pl(r.nodeValue, n, (e.mode & 1) !== 0)
                    }
                s && (t.flags |= 4)
            } else
                r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r),
                r[rn] = t,
                t.stateNode = r
        }
        return $e(t),
        null;
    case 13:
        if (he(ve),
        r = t.memoizedState,
        e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            if (me && kt !== null && t.mode & 1 && !(t.flags & 128))
                Ap(),
                Ai(),
                t.flags |= 98560,
                s = !1;
            else if (s = Tl(t),
            r !== null && r.dehydrated !== null) {
                if (e === null) {
                    if (!s)
                        throw Error(_(318));
                    if (s = t.memoizedState,
                    s = s !== null ? s.dehydrated : null,
                    !s)
                        throw Error(_(317));
                    s[rn] = t
                } else
                    Ai(),
                    !(t.flags & 128) && (t.memoizedState = null),
                    t.flags |= 4;
                $e(t),
                s = !1
            } else
                Wt !== null && (Pu(Wt),
                Wt = null),
                s = !0;
            if (!s)
                return t.flags & 65536 ? t : null
        }
        return t.flags & 128 ? (t.lanes = n,
        t) : (r = r !== null,
        r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192,
        t.mode & 1 && (e === null || ve.current & 1 ? Oe === 0 && (Oe = 3) : Qc())),
        t.updateQueue !== null && (t.flags |= 4),
        $e(t),
        null);
    case 4:
        return Ui(),
        ju(e, t),
        e === null && Ms(t.stateNode.containerInfo),
        $e(t),
        null;
    case 10:
        return Ec(t.type._context),
        $e(t),
        null;
    case 17:
        return pt(t.type) && ua(),
        $e(t),
        null;
    case 19:
        if (he(ve),
        s = t.memoizedState,
        s === null)
            return $e(t),
            null;
        if (r = (t.flags & 128) !== 0,
        a = s.rendering,
        a === null)
            if (r)
                as(s, !1);
            else {
                if (Oe !== 0 || e !== null && e.flags & 128)
                    for (e = t.child; e !== null; ) {
                        if (a = ya(e),
                        a !== null) {
                            for (t.flags |= 128,
                            as(s, !1),
                            r = a.updateQueue,
                            r !== null && (t.updateQueue = r,
                            t.flags |= 4),
                            t.subtreeFlags = 0,
                            r = n,
                            n = t.child; n !== null; )
                                s = n,
                                e = r,
                                s.flags &= 14680066,
                                a = s.alternate,
                                a === null ? (s.childLanes = 0,
                                s.lanes = e,
                                s.child = null,
                                s.subtreeFlags = 0,
                                s.memoizedProps = null,
                                s.memoizedState = null,
                                s.updateQueue = null,
                                s.dependencies = null,
                                s.stateNode = null) : (s.childLanes = a.childLanes,
                                s.lanes = a.lanes,
                                s.child = a.child,
                                s.subtreeFlags = 0,
                                s.deletions = null,
                                s.memoizedProps = a.memoizedProps,
                                s.memoizedState = a.memoizedState,
                                s.updateQueue = a.updateQueue,
                                s.type = a.type,
                                e = a.dependencies,
                                s.dependencies = e === null ? null : {
                                    lanes: e.lanes,
                                    firstContext: e.firstContext
                                }),
                                n = n.sibling;
                            return de(ve, ve.current & 1 | 2),
                            t.child
                        }
                        e = e.sibling
                    }
                s.tail !== null && Re() > Hi && (t.flags |= 128,
                r = !0,
                as(s, !1),
                t.lanes = 4194304)
            }
        else {
            if (!r)
                if (e = ya(a),
                e !== null) {
                    if (t.flags |= 128,
                    r = !0,
                    n = e.updateQueue,
                    n !== null && (t.updateQueue = n,
                    t.flags |= 4),
                    as(s, !0),
                    s.tail === null && s.tailMode === "hidden" && !a.alternate && !me)
                        return $e(t),
                        null
                } else
                    2 * Re() - s.renderingStartTime > Hi && n !== 1073741824 && (t.flags |= 128,
                    r = !0,
                    as(s, !1),
                    t.lanes = 4194304);
            s.isBackwards ? (a.sibling = t.child,
            t.child = a) : (n = s.last,
            n !== null ? n.sibling = a : t.child = a,
            s.last = a)
        }
        return s.tail !== null ? (t = s.tail,
        s.rendering = t,
        s.tail = t.sibling,
        s.renderingStartTime = Re(),
        t.sibling = null,
        n = ve.current,
        de(ve, r ? n & 1 | 2 : n & 1),
        t) : ($e(t),
        null);
    case 22:
    case 23:
        return Uc(),
        r = t.memoizedState !== null,
        e !== null && e.memoizedState !== null !== r && (t.flags |= 8192),
        r && t.mode & 1 ? xt & 1073741824 && ($e(t),
        t.subtreeFlags & 6 && (t.flags |= 8192)) : $e(t),
        null;
    case 24:
        return null;
    case 25:
        return null
    }
    throw Error(_(156, t.tag))
}
function Wg(e, t) {
    switch (wc(t),
    t.tag) {
    case 1:
        return pt(t.type) && ua(),
        e = t.flags,
        e & 65536 ? (t.flags = e & -65537 | 128,
        t) : null;
    case 3:
        return Ui(),
        he(ht),
        he(Ge),
        Pc(),
        e = t.flags,
        e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128,
        t) : null;
    case 5:
        return Rc(t),
        null;
    case 13:
        if (he(ve),
        e = t.memoizedState,
        e !== null && e.dehydrated !== null) {
            if (t.alternate === null)
                throw Error(_(340));
            Ai()
        }
        return e = t.flags,
        e & 65536 ? (t.flags = e & -65537 | 128,
        t) : null;
    case 19:
        return he(ve),
        null;
    case 4:
        return Ui(),
        null;
    case 10:
        return Ec(t.type._context),
        null;
    case 22:
    case 23:
        return Uc(),
        null;
    case 24:
        return null;
    default:
        return null
    }
}
var Ol = !1
  , Ke = !1
  , Vg = typeof WeakSet == "function" ? WeakSet : Set
  , A = null;
function pi(e, t) {
    var n = e.ref;
    if (n !== null)
        if (typeof n == "function")
            try {
                n(null)
            } catch (r) {
                Ne(e, t, r)
            }
        else
            n.current = null
}
function Su(e, t, n) {
    try {
        n()
    } catch (r) {
        Ne(e, t, r)
    }
}
var jf = !1;
function Kg(e, t) {
    if (su = sa,
    e = Np(),
    gc(e)) {
        if ("selectionStart"in e)
            var n = {
                start: e.selectionStart,
                end: e.selectionEnd
            };
        else
            e: {
                n = (n = e.ownerDocument) && n.defaultView || window;
                var r = n.getSelection && n.getSelection();
                if (r && r.rangeCount !== 0) {
                    n = r.anchorNode;
                    var i = r.anchorOffset
                      , s = r.focusNode;
                    r = r.focusOffset;
                    try {
                        n.nodeType,
                        s.nodeType
                    } catch {
                        n = null;
                        break e
                    }
                    var a = 0
                      , o = -1
                      , u = -1
                      , c = 0
                      , d = 0
                      , f = e
                      , m = null;
                    t: for (; ; ) {
                        for (var y; f !== n || i !== 0 && f.nodeType !== 3 || (o = a + i),
                        f !== s || r !== 0 && f.nodeType !== 3 || (u = a + r),
                        f.nodeType === 3 && (a += f.nodeValue.length),
                        (y = f.firstChild) !== null; )
                            m = f,
                            f = y;
                        for (; ; ) {
                            if (f === e)
                                break t;
                            if (m === n && ++c === i && (o = a),
                            m === s && ++d === r && (u = a),
                            (y = f.nextSibling) !== null)
                                break;
                            f = m,
                            m = f.parentNode
                        }
                        f = y
                    }
                    n = o === -1 || u === -1 ? null : {
                        start: o,
                        end: u
                    }
                } else
                    n = null
            }
        n = n || {
            start: 0,
            end: 0
        }
    } else
        n = null;
    for (lu = {
        focusedElem: e,
        selectionRange: n
    },
    sa = !1,
    A = t; A !== null; )
        if (t = A,
        e = t.child,
        (t.subtreeFlags & 1028) !== 0 && e !== null)
            e.return = t,
            A = e;
        else
            for (; A !== null; ) {
                t = A;
                try {
                    var S = t.alternate;
                    if (t.flags & 1024)
                        switch (t.tag) {
                        case 0:
                        case 11:
                        case 15:
                            break;
                        case 1:
                            if (S !== null) {
                                var w = S.memoizedProps
                                  , b = S.memoizedState
                                  , p = t.stateNode
                                  , h = p.getSnapshotBeforeUpdate(t.elementType === t.type ? w : Qt(t.type, w), b);
                                p.__reactInternalSnapshotBeforeUpdate = h
                            }
                            break;
                        case 3:
                            var g = t.stateNode.containerInfo;
                            g.nodeType === 1 ? g.textContent = "" : g.nodeType === 9 && g.documentElement && g.removeChild(g.documentElement);
                            break;
                        case 5:
                        case 6:
                        case 4:
                        case 17:
                            break;
                        default:
                            throw Error(_(163))
                        }
                } catch (k) {
                    Ne(t, t.return, k)
                }
                if (e = t.sibling,
                e !== null) {
                    e.return = t.return,
                    A = e;
                    break
                }
                A = t.return
            }
    return S = jf,
    jf = !1,
    S
}
function Es(e, t, n) {
    var r = t.updateQueue;
    if (r = r !== null ? r.lastEffect : null,
    r !== null) {
        var i = r = r.next;
        do {
            if ((i.tag & e) === e) {
                var s = i.destroy;
                i.destroy = void 0,
                s !== void 0 && Su(t, n, s)
            }
            i = i.next
        } while (i !== r)
    }
}
function Ua(e, t) {
    if (t = t.updateQueue,
    t = t !== null ? t.lastEffect : null,
    t !== null) {
        var n = t = t.next;
        do {
            if ((n.tag & e) === e) {
                var r = n.create;
                n.destroy = r()
            }
            n = n.next
        } while (n !== t)
    }
}
function ku(e) {
    var t = e.ref;
    if (t !== null) {
        var n = e.stateNode;
        switch (e.tag) {
        case 5:
            e = n;
            break;
        default:
            e = n
        }
        typeof t == "function" ? t(e) : t.current = e
    }
}
function jm(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null,
    jm(t)),
    e.child = null,
    e.deletions = null,
    e.sibling = null,
    e.tag === 5 && (t = e.stateNode,
    t !== null && (delete t[rn],
    delete t[As],
    delete t[uu],
    delete t[Pg],
    delete t[Tg])),
    e.stateNode = null,
    e.return = null,
    e.dependencies = null,
    e.memoizedProps = null,
    e.memoizedState = null,
    e.pendingProps = null,
    e.stateNode = null,
    e.updateQueue = null
}
function Sm(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4
}
function Sf(e) {
    e: for (; ; ) {
        for (; e.sibling === null; ) {
            if (e.return === null || Sm(e.return))
                return null;
            e = e.return
        }
        for (e.sibling.return = e.return,
        e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
            if (e.flags & 2 || e.child === null || e.tag === 4)
                continue e;
            e.child.return = e,
            e = e.child
        }
        if (!(e.flags & 2))
            return e.stateNode
    }
}
function Eu(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        e = e.stateNode,
        t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode,
        t.insertBefore(e, n)) : (t = n,
        t.appendChild(e)),
        n = n._reactRootContainer,
        n != null || t.onclick !== null || (t.onclick = oa));
    else if (r !== 4 && (e = e.child,
    e !== null))
        for (Eu(e, t, n),
        e = e.sibling; e !== null; )
            Eu(e, t, n),
            e = e.sibling
}
function Nu(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        e = e.stateNode,
        t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && (e = e.child,
    e !== null))
        for (Nu(e, t, n),
        e = e.sibling; e !== null; )
            Nu(e, t, n),
            e = e.sibling
}
var Ae = null
  , Bt = !1;
function Mn(e, t, n) {
    for (n = n.child; n !== null; )
        km(e, t, n),
        n = n.sibling
}
function km(e, t, n) {
    if (sn && typeof sn.onCommitFiberUnmount == "function")
        try {
            sn.onCommitFiberUnmount(La, n)
        } catch {}
    switch (n.tag) {
    case 5:
        Ke || pi(n, t);
    case 6:
        var r = Ae
          , i = Bt;
        Ae = null,
        Mn(e, t, n),
        Ae = r,
        Bt = i,
        Ae !== null && (Bt ? (e = Ae,
        n = n.stateNode,
        e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : Ae.removeChild(n.stateNode));
        break;
    case 18:
        Ae !== null && (Bt ? (e = Ae,
        n = n.stateNode,
        e.nodeType === 8 ? So(e.parentNode, n) : e.nodeType === 1 && So(e, n),
        Os(e)) : So(Ae, n.stateNode));
        break;
    case 4:
        r = Ae,
        i = Bt,
        Ae = n.stateNode.containerInfo,
        Bt = !0,
        Mn(e, t, n),
        Ae = r,
        Bt = i;
        break;
    case 0:
    case 11:
    case 14:
    case 15:
        if (!Ke && (r = n.updateQueue,
        r !== null && (r = r.lastEffect,
        r !== null))) {
            i = r = r.next;
            do {
                var s = i
                  , a = s.destroy;
                s = s.tag,
                a !== void 0 && (s & 2 || s & 4) && Su(n, t, a),
                i = i.next
            } while (i !== r)
        }
        Mn(e, t, n);
        break;
    case 1:
        if (!Ke && (pi(n, t),
        r = n.stateNode,
        typeof r.componentWillUnmount == "function"))
            try {
                r.props = n.memoizedProps,
                r.state = n.memoizedState,
                r.componentWillUnmount()
            } catch (o) {
                Ne(n, t, o)
            }
        Mn(e, t, n);
        break;
    case 21:
        Mn(e, t, n);
        break;
    case 22:
        n.mode & 1 ? (Ke = (r = Ke) || n.memoizedState !== null,
        Mn(e, t, n),
        Ke = r) : Mn(e, t, n);
        break;
    default:
        Mn(e, t, n)
    }
}
function kf(e) {
    var t = e.updateQueue;
    if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        n === null && (n = e.stateNode = new Vg),
        t.forEach(function(r) {
            var i = nx.bind(null, e, r);
            n.has(r) || (n.add(r),
            r.then(i, i))
        })
    }
}
function Ft(e, t) {
    var n = t.deletions;
    if (n !== null)
        for (var r = 0; r < n.length; r++) {
            var i = n[r];
            try {
                var s = e
                  , a = t
                  , o = a;
                e: for (; o !== null; ) {
                    switch (o.tag) {
                    case 5:
                        Ae = o.stateNode,
                        Bt = !1;
                        break e;
                    case 3:
                        Ae = o.stateNode.containerInfo,
                        Bt = !0;
                        break e;
                    case 4:
                        Ae = o.stateNode.containerInfo,
                        Bt = !0;
                        break e
                    }
                    o = o.return
                }
                if (Ae === null)
                    throw Error(_(160));
                km(s, a, i),
                Ae = null,
                Bt = !1;
                var u = i.alternate;
                u !== null && (u.return = null),
                i.return = null
            } catch (c) {
                Ne(i, t, c)
            }
        }
    if (t.subtreeFlags & 12854)
        for (t = t.child; t !== null; )
            Em(t, e),
            t = t.sibling
}
function Em(e, t) {
    var n = e.alternate
      , r = e.flags;
    switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
        if (Ft(t, e),
        Jt(e),
        r & 4) {
            try {
                Es(3, e, e.return),
                Ua(3, e)
            } catch (w) {
                Ne(e, e.return, w)
            }
            try {
                Es(5, e, e.return)
            } catch (w) {
                Ne(e, e.return, w)
            }
        }
        break;
    case 1:
        Ft(t, e),
        Jt(e),
        r & 512 && n !== null && pi(n, n.return);
        break;
    case 5:
        if (Ft(t, e),
        Jt(e),
        r & 512 && n !== null && pi(n, n.return),
        e.flags & 32) {
            var i = e.stateNode;
            try {
                Ps(i, "")
            } catch (w) {
                Ne(e, e.return, w)
            }
        }
        if (r & 4 && (i = e.stateNode,
        i != null)) {
            var s = e.memoizedProps
              , a = n !== null ? n.memoizedProps : s
              , o = e.type
              , u = e.updateQueue;
            if (e.updateQueue = null,
            u !== null)
                try {
                    o === "input" && s.type === "radio" && s.name != null && Vh(i, s),
                    qo(o, a);
                    var c = qo(o, s);
                    for (a = 0; a < u.length; a += 2) {
                        var d = u[a]
                          , f = u[a + 1];
                        d === "style" ? Xh(i, f) : d === "dangerouslySetInnerHTML" ? qh(i, f) : d === "children" ? Ps(i, f) : sc(i, d, f, c)
                    }
                    switch (o) {
                    case "input":
                        $o(i, s);
                        break;
                    case "textarea":
                        Kh(i, s);
                        break;
                    case "select":
                        var m = i._wrapperState.wasMultiple;
                        i._wrapperState.wasMultiple = !!s.multiple;
                        var y = s.value;
                        y != null ? yi(i, !!s.multiple, y, !1) : m !== !!s.multiple && (s.defaultValue != null ? yi(i, !!s.multiple, s.defaultValue, !0) : yi(i, !!s.multiple, s.multiple ? [] : "", !1))
                    }
                    i[As] = s
                } catch (w) {
                    Ne(e, e.return, w)
                }
        }
        break;
    case 6:
        if (Ft(t, e),
        Jt(e),
        r & 4) {
            if (e.stateNode === null)
                throw Error(_(162));
            i = e.stateNode,
            s = e.memoizedProps;
            try {
                i.nodeValue = s
            } catch (w) {
                Ne(e, e.return, w)
            }
        }
        break;
    case 3:
        if (Ft(t, e),
        Jt(e),
        r & 4 && n !== null && n.memoizedState.isDehydrated)
            try {
                Os(t.containerInfo)
            } catch (w) {
                Ne(e, e.return, w)
            }
        break;
    case 4:
        Ft(t, e),
        Jt(e);
        break;
    case 13:
        Ft(t, e),
        Jt(e),
        i = e.child,
        i.flags & 8192 && (s = i.memoizedState !== null,
        i.stateNode.isHidden = s,
        !s || i.alternate !== null && i.alternate.memoizedState !== null || (Ac = Re())),
        r & 4 && kf(e);
        break;
    case 22:
        if (d = n !== null && n.memoizedState !== null,
        e.mode & 1 ? (Ke = (c = Ke) || d,
        Ft(t, e),
        Ke = c) : Ft(t, e),
        Jt(e),
        r & 8192) {
            if (c = e.memoizedState !== null,
            (e.stateNode.isHidden = c) && !d && e.mode & 1)
                for (A = e,
                d = e.child; d !== null; ) {
                    for (f = A = d; A !== null; ) {
                        switch (m = A,
                        y = m.child,
                        m.tag) {
                        case 0:
                        case 11:
                        case 14:
                        case 15:
                            Es(4, m, m.return);
                            break;
                        case 1:
                            pi(m, m.return);
                            var S = m.stateNode;
                            if (typeof S.componentWillUnmount == "function") {
                                r = m,
                                n = m.return;
                                try {
                                    t = r,
                                    S.props = t.memoizedProps,
                                    S.state = t.memoizedState,
                                    S.componentWillUnmount()
                                } catch (w) {
                                    Ne(r, n, w)
                                }
                            }
                            break;
                        case 5:
                            pi(m, m.return);
                            break;
                        case 22:
                            if (m.memoizedState !== null) {
                                Nf(f);
                                continue
                            }
                        }
                        y !== null ? (y.return = m,
                        A = y) : Nf(f)
                    }
                    d = d.sibling
                }
            e: for (d = null,
            f = e; ; ) {
                if (f.tag === 5) {
                    if (d === null) {
                        d = f;
                        try {
                            i = f.stateNode,
                            c ? (s = i.style,
                            typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none") : (o = f.stateNode,
                            u = f.memoizedProps.style,
                            a = u != null && u.hasOwnProperty("display") ? u.display : null,
                            o.style.display = Yh("display", a))
                        } catch (w) {
                            Ne(e, e.return, w)
                        }
                    }
                } else if (f.tag === 6) {
                    if (d === null)
                        try {
                            f.stateNode.nodeValue = c ? "" : f.memoizedProps
                        } catch (w) {
                            Ne(e, e.return, w)
                        }
                } else if ((f.tag !== 22 && f.tag !== 23 || f.memoizedState === null || f === e) && f.child !== null) {
                    f.child.return = f,
                    f = f.child;
                    continue
                }
                if (f === e)
                    break e;
                for (; f.sibling === null; ) {
                    if (f.return === null || f.return === e)
                        break e;
                    d === f && (d = null),
                    f = f.return
                }
                d === f && (d = null),
                f.sibling.return = f.return,
                f = f.sibling
            }
        }
        break;
    case 19:
        Ft(t, e),
        Jt(e),
        r & 4 && kf(e);
        break;
    case 21:
        break;
    default:
        Ft(t, e),
        Jt(e)
    }
}
function Jt(e) {
    var t = e.flags;
    if (t & 2) {
        try {
            e: {
                for (var n = e.return; n !== null; ) {
                    if (Sm(n)) {
                        var r = n;
                        break e
                    }
                    n = n.return
                }
                throw Error(_(160))
            }
            switch (r.tag) {
            case 5:
                var i = r.stateNode;
                r.flags & 32 && (Ps(i, ""),
                r.flags &= -33);
                var s = Sf(e);
                Nu(e, s, i);
                break;
            case 3:
            case 4:
                var a = r.stateNode.containerInfo
                  , o = Sf(e);
                Eu(e, o, a);
                break;
            default:
                throw Error(_(161))
            }
        } catch (u) {
            Ne(e, e.return, u)
        }
        e.flags &= -3
    }
    t & 4096 && (e.flags &= -4097)
}
function Gg(e, t, n) {
    A = e,
    Nm(e)
}
function Nm(e, t, n) {
    for (var r = (e.mode & 1) !== 0; A !== null; ) {
        var i = A
          , s = i.child;
        if (i.tag === 22 && r) {
            var a = i.memoizedState !== null || Ol;
            if (!a) {
                var o = i.alternate
                  , u = o !== null && o.memoizedState !== null || Ke;
                o = Ol;
                var c = Ke;
                if (Ol = a,
                (Ke = u) && !c)
                    for (A = i; A !== null; )
                        a = A,
                        u = a.child,
                        a.tag === 22 && a.memoizedState !== null ? bf(i) : u !== null ? (u.return = a,
                        A = u) : bf(i);
                for (; s !== null; )
                    A = s,
                    Nm(s),
                    s = s.sibling;
                A = i,
                Ol = o,
                Ke = c
            }
            Ef(e)
        } else
            i.subtreeFlags & 8772 && s !== null ? (s.return = i,
            A = s) : Ef(e)
    }
}
function Ef(e) {
    for (; A !== null; ) {
        var t = A;
        if (t.flags & 8772) {
            var n = t.alternate;
            try {
                if (t.flags & 8772)
                    switch (t.tag) {
                    case 0:
                    case 11:
                    case 15:
                        Ke || Ua(5, t);
                        break;
                    case 1:
                        var r = t.stateNode;
                        if (t.flags & 4 && !Ke)
                            if (n === null)
                                r.componentDidMount();
                            else {
                                var i = t.elementType === t.type ? n.memoizedProps : Qt(t.type, n.memoizedProps);
                                r.componentDidUpdate(i, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate)
                            }
                        var s = t.updateQueue;
                        s !== null && of(t, s, r);
                        break;
                    case 3:
                        var a = t.updateQueue;
                        if (a !== null) {
                            if (n = null,
                            t.child !== null)
                                switch (t.child.tag) {
                                case 5:
                                    n = t.child.stateNode;
                                    break;
                                case 1:
                                    n = t.child.stateNode
                                }
                            of(t, a, n)
                        }
                        break;
                    case 5:
                        var o = t.stateNode;
                        if (n === null && t.flags & 4) {
                            n = o;
                            var u = t.memoizedProps;
                            switch (t.type) {
                            case "button":
                            case "input":
                            case "select":
                            case "textarea":
                                u.autoFocus && n.focus();
                                break;
                            case "img":
                                u.src && (n.src = u.src)
                            }
                        }
                        break;
                    case 6:
                        break;
                    case 4:
                        break;
                    case 12:
                        break;
                    case 13:
                        if (t.memoizedState === null) {
                            var c = t.alternate;
                            if (c !== null) {
                                var d = c.memoizedState;
                                if (d !== null) {
                                    var f = d.dehydrated;
                                    f !== null && Os(f)
                                }
                            }
                        }
                        break;
                    case 19:
                    case 17:
                    case 21:
                    case 22:
                    case 23:
                    case 25:
                        break;
                    default:
                        throw Error(_(163))
                    }
                Ke || t.flags & 512 && ku(t)
            } catch (m) {
                Ne(t, t.return, m)
            }
        }
        if (t === e) {
            A = null;
            break
        }
        if (n = t.sibling,
        n !== null) {
            n.return = t.return,
            A = n;
            break
        }
        A = t.return
    }
}
function Nf(e) {
    for (; A !== null; ) {
        var t = A;
        if (t === e) {
            A = null;
            break
        }
        var n = t.sibling;
        if (n !== null) {
            n.return = t.return,
            A = n;
            break
        }
        A = t.return
    }
}
function bf(e) {
    for (; A !== null; ) {
        var t = A;
        try {
            switch (t.tag) {
            case 0:
            case 11:
            case 15:
                var n = t.return;
                try {
                    Ua(4, t)
                } catch (u) {
                    Ne(t, n, u)
                }
                break;
            case 1:
                var r = t.stateNode;
                if (typeof r.componentDidMount == "function") {
                    var i = t.return;
                    try {
                        r.componentDidMount()
                    } catch (u) {
                        Ne(t, i, u)
                    }
                }
                var s = t.return;
                try {
                    ku(t)
                } catch (u) {
                    Ne(t, s, u)
                }
                break;
            case 5:
                var a = t.return;
                try {
                    ku(t)
                } catch (u) {
                    Ne(t, a, u)
                }
            }
        } catch (u) {
            Ne(t, t.return, u)
        }
        if (t === e) {
            A = null;
            break
        }
        var o = t.sibling;
        if (o !== null) {
            o.return = t.return,
            A = o;
            break
        }
        A = t.return
    }
}
var qg = Math.ceil
  , xa = Rn.ReactCurrentDispatcher
  , Mc = Rn.ReactCurrentOwner
  , Ot = Rn.ReactCurrentBatchConfig
  , te = 0
  , Me = null
  , Te = null
  , Ue = 0
  , xt = 0
  , mi = pr(0)
  , Oe = 0
  , $s = null
  , Br = 0
  , Qa = 0
  , Fc = 0
  , Ns = null
  , ct = null
  , Ac = 0
  , Hi = 1 / 0
  , cn = null
  , wa = !1
  , bu = null
  , lr = null
  , Il = !1
  , Zn = null
  , ja = 0
  , bs = 0
  , Cu = null
  , Gl = -1
  , ql = 0;
function rt() {
    return te & 6 ? Re() : Gl !== -1 ? Gl : Gl = Re()
}
function ar(e) {
    return e.mode & 1 ? te & 2 && Ue !== 0 ? Ue & -Ue : Lg.transition !== null ? (ql === 0 && (ql = up()),
    ql) : (e = ae,
    e !== 0 || (e = window.event,
    e = e === void 0 ? 16 : yp(e.type)),
    e) : 1
}
function Gt(e, t, n, r) {
    if (50 < bs)
        throw bs = 0,
        Cu = null,
        Error(_(185));
    nl(e, n, r),
    (!(te & 2) || e !== Me) && (e === Me && (!(te & 2) && (Qa |= n),
    Oe === 4 && Hn(e, Ue)),
    mt(e, r),
    n === 1 && te === 0 && !(t.mode & 1) && (Hi = Re() + 500,
    Fa && mr()))
}
function mt(e, t) {
    var n = e.callbackNode;
    Lv(e, t);
    var r = ia(e, e === Me ? Ue : 0);
    if (r === 0)
        n !== null && Id(n),
        e.callbackNode = null,
        e.callbackPriority = 0;
    else if (t = r & -r,
    e.callbackPriority !== t) {
        if (n != null && Id(n),
        t === 1)
            e.tag === 0 ? _g(Cf.bind(null, e)) : Dp(Cf.bind(null, e)),
            Cg(function() {
                !(te & 6) && mr()
            }),
            n = null;
        else {
            switch (cp(r)) {
            case 1:
                n = cc;
                break;
            case 4:
                n = ap;
                break;
            case 16:
                n = ra;
                break;
            case 536870912:
                n = op;
                break;
            default:
                n = ra
            }
            n = Om(n, bm.bind(null, e))
        }
        e.callbackPriority = t,
        e.callbackNode = n
    }
}
function bm(e, t) {
    if (Gl = -1,
    ql = 0,
    te & 6)
        throw Error(_(327));
    var n = e.callbackNode;
    if (ji() && e.callbackNode !== n)
        return null;
    var r = ia(e, e === Me ? Ue : 0);
    if (r === 0)
        return null;
    if (r & 30 || r & e.expiredLanes || t)
        t = Sa(e, r);
    else {
        t = r;
        var i = te;
        te |= 2;
        var s = Rm();
        (Me !== e || Ue !== t) && (cn = null,
        Hi = Re() + 500,
        Ar(e, t));
        do
            try {
                Jg();
                break
            } catch (o) {
                Cm(e, o)
            }
        while (!0);
        kc(),
        xa.current = s,
        te = i,
        Te !== null ? t = 0 : (Me = null,
        Ue = 0,
        t = Oe)
    }
    if (t !== 0) {
        if (t === 2 && (i = eu(e),
        i !== 0 && (r = i,
        t = Ru(e, i))),
        t === 1)
            throw n = $s,
            Ar(e, 0),
            Hn(e, r),
            mt(e, Re()),
            n;
        if (t === 6)
            Hn(e, r);
        else {
            if (i = e.current.alternate,
            !(r & 30) && !Yg(i) && (t = Sa(e, r),
            t === 2 && (s = eu(e),
            s !== 0 && (r = s,
            t = Ru(e, s))),
            t === 1))
                throw n = $s,
                Ar(e, 0),
                Hn(e, r),
                mt(e, Re()),
                n;
            switch (e.finishedWork = i,
            e.finishedLanes = r,
            t) {
            case 0:
            case 1:
                throw Error(_(345));
            case 2:
                jr(e, ct, cn);
                break;
            case 3:
                if (Hn(e, r),
                (r & 130023424) === r && (t = Ac + 500 - Re(),
                10 < t)) {
                    if (ia(e, 0) !== 0)
                        break;
                    if (i = e.suspendedLanes,
                    (i & r) !== r) {
                        rt(),
                        e.pingedLanes |= e.suspendedLanes & i;
                        break
                    }
                    e.timeoutHandle = ou(jr.bind(null, e, ct, cn), t);
                    break
                }
                jr(e, ct, cn);
                break;
            case 4:
                if (Hn(e, r),
                (r & 4194240) === r)
                    break;
                for (t = e.eventTimes,
                i = -1; 0 < r; ) {
                    var a = 31 - Kt(r);
                    s = 1 << a,
                    a = t[a],
                    a > i && (i = a),
                    r &= ~s
                }
                if (r = i,
                r = Re() - r,
                r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * qg(r / 1960)) - r,
                10 < r) {
                    e.timeoutHandle = ou(jr.bind(null, e, ct, cn), r);
                    break
                }
                jr(e, ct, cn);
                break;
            case 5:
                jr(e, ct, cn);
                break;
            default:
                throw Error(_(329))
            }
        }
    }
    return mt(e, Re()),
    e.callbackNode === n ? bm.bind(null, e) : null
}
function Ru(e, t) {
    var n = Ns;
    return e.current.memoizedState.isDehydrated && (Ar(e, t).flags |= 256),
    e = Sa(e, t),
    e !== 2 && (t = ct,
    ct = n,
    t !== null && Pu(t)),
    e
}
function Pu(e) {
    ct === null ? ct = e : ct.push.apply(ct, e)
}
function Yg(e) {
    for (var t = e; ; ) {
        if (t.flags & 16384) {
            var n = t.updateQueue;
            if (n !== null && (n = n.stores,
            n !== null))
                for (var r = 0; r < n.length; r++) {
                    var i = n[r]
                      , s = i.getSnapshot;
                    i = i.value;
                    try {
                        if (!qt(s(), i))
                            return !1
                    } catch {
                        return !1
                    }
                }
        }
        if (n = t.child,
        t.subtreeFlags & 16384 && n !== null)
            n.return = t,
            t = n;
        else {
            if (t === e)
                break;
            for (; t.sibling === null; ) {
                if (t.return === null || t.return === e)
                    return !0;
                t = t.return
            }
            t.sibling.return = t.return,
            t = t.sibling
        }
    }
    return !0
}
function Hn(e, t) {
    for (t &= ~Fc,
    t &= ~Qa,
    e.suspendedLanes |= t,
    e.pingedLanes &= ~t,
    e = e.expirationTimes; 0 < t; ) {
        var n = 31 - Kt(t)
          , r = 1 << n;
        e[n] = -1,
        t &= ~r
    }
}
function Cf(e) {
    if (te & 6)
        throw Error(_(327));
    ji();
    var t = ia(e, 0);
    if (!(t & 1))
        return mt(e, Re()),
        null;
    var n = Sa(e, t);
    if (e.tag !== 0 && n === 2) {
        var r = eu(e);
        r !== 0 && (t = r,
        n = Ru(e, r))
    }
    if (n === 1)
        throw n = $s,
        Ar(e, 0),
        Hn(e, t),
        mt(e, Re()),
        n;
    if (n === 6)
        throw Error(_(345));
    return e.finishedWork = e.current.alternate,
    e.finishedLanes = t,
    jr(e, ct, cn),
    mt(e, Re()),
    null
}
function zc(e, t) {
    var n = te;
    te |= 1;
    try {
        return e(t)
    } finally {
        te = n,
        te === 0 && (Hi = Re() + 500,
        Fa && mr())
    }
}
function $r(e) {
    Zn !== null && Zn.tag === 0 && !(te & 6) && ji();
    var t = te;
    te |= 1;
    var n = Ot.transition
      , r = ae;
    try {
        if (Ot.transition = null,
        ae = 1,
        e)
            return e()
    } finally {
        ae = r,
        Ot.transition = n,
        te = t,
        !(te & 6) && mr()
    }
}
function Uc() {
    xt = mi.current,
    he(mi)
}
function Ar(e, t) {
    e.finishedWork = null,
    e.finishedLanes = 0;
    var n = e.timeoutHandle;
    if (n !== -1 && (e.timeoutHandle = -1,
    bg(n)),
    Te !== null)
        for (n = Te.return; n !== null; ) {
            var r = n;
            switch (wc(r),
            r.tag) {
            case 1:
                r = r.type.childContextTypes,
                r != null && ua();
                break;
            case 3:
                Ui(),
                he(ht),
                he(Ge),
                Pc();
                break;
            case 5:
                Rc(r);
                break;
            case 4:
                Ui();
                break;
            case 13:
                he(ve);
                break;
            case 19:
                he(ve);
                break;
            case 10:
                Ec(r.type._context);
                break;
            case 22:
            case 23:
                Uc()
            }
            n = n.return
        }
    if (Me = e,
    Te = e = or(e.current, null),
    Ue = xt = t,
    Oe = 0,
    $s = null,
    Fc = Qa = Br = 0,
    ct = Ns = null,
    Nr !== null) {
        for (t = 0; t < Nr.length; t++)
            if (n = Nr[t],
            r = n.interleaved,
            r !== null) {
                n.interleaved = null;
                var i = r.next
                  , s = n.pending;
                if (s !== null) {
                    var a = s.next;
                    s.next = i,
                    r.next = a
                }
                n.pending = r
            }
        Nr = null
    }
    return e
}
function Cm(e, t) {
    do {
        var n = Te;
        try {
            if (kc(),
            Wl.current = ga,
            va) {
                for (var r = ge.memoizedState; r !== null; ) {
                    var i = r.queue;
                    i !== null && (i.pending = null),
                    r = r.next
                }
                va = !1
            }
            if (Hr = 0,
            De = _e = ge = null,
            ks = !1,
            Qs = 0,
            Mc.current = null,
            n === null || n.return === null) {
                Oe = 1,
                $s = t,
                Te = null;
                break
            }
            e: {
                var s = e
                  , a = n.return
                  , o = n
                  , u = t;
                if (t = Ue,
                o.flags |= 32768,
                u !== null && typeof u == "object" && typeof u.then == "function") {
                    var c = u
                      , d = o
                      , f = d.tag;
                    if (!(d.mode & 1) && (f === 0 || f === 11 || f === 15)) {
                        var m = d.alternate;
                        m ? (d.updateQueue = m.updateQueue,
                        d.memoizedState = m.memoizedState,
                        d.lanes = m.lanes) : (d.updateQueue = null,
                        d.memoizedState = null)
                    }
                    var y = pf(a);
                    if (y !== null) {
                        y.flags &= -257,
                        mf(y, a, o, s, t),
                        y.mode & 1 && hf(s, c, t),
                        t = y,
                        u = c;
                        var S = t.updateQueue;
                        if (S === null) {
                            var w = new Set;
                            w.add(u),
                            t.updateQueue = w
                        } else
                            S.add(u);
                        break e
                    } else {
                        if (!(t & 1)) {
                            hf(s, c, t),
                            Qc();
                            break e
                        }
                        u = Error(_(426))
                    }
                } else if (me && o.mode & 1) {
                    var b = pf(a);
                    if (b !== null) {
                        !(b.flags & 65536) && (b.flags |= 256),
                        mf(b, a, o, s, t),
                        jc(Qi(u, o));
                        break e
                    }
                }
                s = u = Qi(u, o),
                Oe !== 4 && (Oe = 2),
                Ns === null ? Ns = [s] : Ns.push(s),
                s = a;
                do {
                    switch (s.tag) {
                    case 3:
                        s.flags |= 65536,
                        t &= -t,
                        s.lanes |= t;
                        var p = cm(s, u, t);
                        af(s, p);
                        break e;
                    case 1:
                        o = u;
                        var h = s.type
                          , g = s.stateNode;
                        if (!(s.flags & 128) && (typeof h.getDerivedStateFromError == "function" || g !== null && typeof g.componentDidCatch == "function" && (lr === null || !lr.has(g)))) {
                            s.flags |= 65536,
                            t &= -t,
                            s.lanes |= t;
                            var k = dm(s, o, t);
                            af(s, k);
                            break e
                        }
                    }
                    s = s.return
                } while (s !== null)
            }
            Tm(n)
        } catch (P) {
            t = P,
            Te === n && n !== null && (Te = n = n.return);
            continue
        }
        break
    } while (!0)
}
function Rm() {
    var e = xa.current;
    return xa.current = ga,
    e === null ? ga : e
}
function Qc() {
    (Oe === 0 || Oe === 3 || Oe === 2) && (Oe = 4),
    Me === null || !(Br & 268435455) && !(Qa & 268435455) || Hn(Me, Ue)
}
function Sa(e, t) {
    var n = te;
    te |= 2;
    var r = Rm();
    (Me !== e || Ue !== t) && (cn = null,
    Ar(e, t));
    do
        try {
            Xg();
            break
        } catch (i) {
            Cm(e, i)
        }
    while (!0);
    if (kc(),
    te = n,
    xa.current = r,
    Te !== null)
        throw Error(_(261));
    return Me = null,
    Ue = 0,
    Oe
}
function Xg() {
    for (; Te !== null; )
        Pm(Te)
}
function Jg() {
    for (; Te !== null && !kv(); )
        Pm(Te)
}
function Pm(e) {
    var t = Lm(e.alternate, e, xt);
    e.memoizedProps = e.pendingProps,
    t === null ? Tm(e) : Te = t,
    Mc.current = null
}
function Tm(e) {
    var t = e;
    do {
        var n = t.alternate;
        if (e = t.return,
        t.flags & 32768) {
            if (n = Wg(n, t),
            n !== null) {
                n.flags &= 32767,
                Te = n;
                return
            }
            if (e !== null)
                e.flags |= 32768,
                e.subtreeFlags = 0,
                e.deletions = null;
            else {
                Oe = 6,
                Te = null;
                return
            }
        } else if (n = $g(n, t, xt),
        n !== null) {
            Te = n;
            return
        }
        if (t = t.sibling,
        t !== null) {
            Te = t;
            return
        }
        Te = t = e
    } while (t !== null);
    Oe === 0 && (Oe = 5)
}
function jr(e, t, n) {
    var r = ae
      , i = Ot.transition;
    try {
        Ot.transition = null,
        ae = 1,
        Zg(e, t, n, r)
    } finally {
        Ot.transition = i,
        ae = r
    }
    return null
}
function Zg(e, t, n, r) {
    do
        ji();
    while (Zn !== null);
    if (te & 6)
        throw Error(_(327));
    n = e.finishedWork;
    var i = e.finishedLanes;
    if (n === null)
        return null;
    if (e.finishedWork = null,
    e.finishedLanes = 0,
    n === e.current)
        throw Error(_(177));
    e.callbackNode = null,
    e.callbackPriority = 0;
    var s = n.lanes | n.childLanes;
    if (Ov(e, s),
    e === Me && (Te = Me = null,
    Ue = 0),
    !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Il || (Il = !0,
    Om(ra, function() {
        return ji(),
        null
    })),
    s = (n.flags & 15990) !== 0,
    n.subtreeFlags & 15990 || s) {
        s = Ot.transition,
        Ot.transition = null;
        var a = ae;
        ae = 1;
        var o = te;
        te |= 4,
        Mc.current = null,
        Kg(e, n),
        Em(n, e),
        xg(lu),
        sa = !!su,
        lu = su = null,
        e.current = n,
        Gg(n),
        Ev(),
        te = o,
        ae = a,
        Ot.transition = s
    } else
        e.current = n;
    if (Il && (Il = !1,
    Zn = e,
    ja = i),
    s = e.pendingLanes,
    s === 0 && (lr = null),
    Cv(n.stateNode),
    mt(e, Re()),
    t !== null)
        for (r = e.onRecoverableError,
        n = 0; n < t.length; n++)
            i = t[n],
            r(i.value, {
                componentStack: i.stack,
                digest: i.digest
            });
    if (wa)
        throw wa = !1,
        e = bu,
        bu = null,
        e;
    return ja & 1 && e.tag !== 0 && ji(),
    s = e.pendingLanes,
    s & 1 ? e === Cu ? bs++ : (bs = 0,
    Cu = e) : bs = 0,
    mr(),
    null
}
function ji() {
    if (Zn !== null) {
        var e = cp(ja)
          , t = Ot.transition
          , n = ae;
        try {
            if (Ot.transition = null,
            ae = 16 > e ? 16 : e,
            Zn === null)
                var r = !1;
            else {
                if (e = Zn,
                Zn = null,
                ja = 0,
                te & 6)
                    throw Error(_(331));
                var i = te;
                for (te |= 4,
                A = e.current; A !== null; ) {
                    var s = A
                      , a = s.child;
                    if (A.flags & 16) {
                        var o = s.deletions;
                        if (o !== null) {
                            for (var u = 0; u < o.length; u++) {
                                var c = o[u];
                                for (A = c; A !== null; ) {
                                    var d = A;
                                    switch (d.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        Es(8, d, s)
                                    }
                                    var f = d.child;
                                    if (f !== null)
                                        f.return = d,
                                        A = f;
                                    else
                                        for (; A !== null; ) {
                                            d = A;
                                            var m = d.sibling
                                              , y = d.return;
                                            if (jm(d),
                                            d === c) {
                                                A = null;
                                                break
                                            }
                                            if (m !== null) {
                                                m.return = y,
                                                A = m;
                                                break
                                            }
                                            A = y
                                        }
                                }
                            }
                            var S = s.alternate;
                            if (S !== null) {
                                var w = S.child;
                                if (w !== null) {
                                    S.child = null;
                                    do {
                                        var b = w.sibling;
                                        w.sibling = null,
                                        w = b
                                    } while (w !== null)
                                }
                            }
                            A = s
                        }
                    }
                    if (s.subtreeFlags & 2064 && a !== null)
                        a.return = s,
                        A = a;
                    else
                        e: for (; A !== null; ) {
                            if (s = A,
                            s.flags & 2048)
                                switch (s.tag) {
                                case 0:
                                case 11:
                                case 15:
                                    Es(9, s, s.return)
                                }
                            var p = s.sibling;
                            if (p !== null) {
                                p.return = s.return,
                                A = p;
                                break e
                            }
                            A = s.return
                        }
                }
                var h = e.current;
                for (A = h; A !== null; ) {
                    a = A;
                    var g = a.child;
                    if (a.subtreeFlags & 2064 && g !== null)
                        g.return = a,
                        A = g;
                    else
                        e: for (a = h; A !== null; ) {
                            if (o = A,
                            o.flags & 2048)
                                try {
                                    switch (o.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        Ua(9, o)
                                    }
                                } catch (P) {
                                    Ne(o, o.return, P)
                                }
                            if (o === a) {
                                A = null;
                                break e
                            }
                            var k = o.sibling;
                            if (k !== null) {
                                k.return = o.return,
                                A = k;
                                break e
                            }
                            A = o.return
                        }
                }
                if (te = i,
                mr(),
                sn && typeof sn.onPostCommitFiberRoot == "function")
                    try {
                        sn.onPostCommitFiberRoot(La, e)
                    } catch {}
                r = !0
            }
            return r
        } finally {
            ae = n,
            Ot.transition = t
        }
    }
    return !1
}
function Rf(e, t, n) {
    t = Qi(n, t),
    t = cm(e, t, 1),
    e = sr(e, t, 1),
    t = rt(),
    e !== null && (nl(e, 1, t),
    mt(e, t))
}
function Ne(e, t, n) {
    if (e.tag === 3)
        Rf(e, e, n);
    else
        for (; t !== null; ) {
            if (t.tag === 3) {
                Rf(t, e, n);
                break
            } else if (t.tag === 1) {
                var r = t.stateNode;
                if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (lr === null || !lr.has(r))) {
                    e = Qi(n, e),
                    e = dm(t, e, 1),
                    t = sr(t, e, 1),
                    e = rt(),
                    t !== null && (nl(t, 1, e),
                    mt(t, e));
                    break
                }
            }
            t = t.return
        }
}
function ex(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t),
    t = rt(),
    e.pingedLanes |= e.suspendedLanes & n,
    Me === e && (Ue & n) === n && (Oe === 4 || Oe === 3 && (Ue & 130023424) === Ue && 500 > Re() - Ac ? Ar(e, 0) : Fc |= n),
    mt(e, t)
}
function _m(e, t) {
    t === 0 && (e.mode & 1 ? (t = El,
    El <<= 1,
    !(El & 130023424) && (El = 4194304)) : t = 1);
    var n = rt();
    e = kn(e, t),
    e !== null && (nl(e, t, n),
    mt(e, n))
}
function tx(e) {
    var t = e.memoizedState
      , n = 0;
    t !== null && (n = t.retryLane),
    _m(e, n)
}
function nx(e, t) {
    var n = 0;
    switch (e.tag) {
    case 13:
        var r = e.stateNode
          , i = e.memoizedState;
        i !== null && (n = i.retryLane);
        break;
    case 19:
        r = e.stateNode;
        break;
    default:
        throw Error(_(314))
    }
    r !== null && r.delete(t),
    _m(e, n)
}
var Lm;
Lm = function(e, t, n) {
    if (e !== null)
        if (e.memoizedProps !== t.pendingProps || ht.current)
            ft = !0;
        else {
            if (!(e.lanes & n) && !(t.flags & 128))
                return ft = !1,
                Bg(e, t, n);
            ft = !!(e.flags & 131072)
        }
    else
        ft = !1,
        me && t.flags & 1048576 && Mp(t, fa, t.index);
    switch (t.lanes = 0,
    t.tag) {
    case 2:
        var r = t.type;
        Kl(e, t),
        e = t.pendingProps;
        var i = Fi(t, Ge.current);
        wi(t, n),
        i = _c(null, t, r, e, i, n);
        var s = Lc();
        return t.flags |= 1,
        typeof i == "object" && i !== null && typeof i.render == "function" && i.$$typeof === void 0 ? (t.tag = 1,
        t.memoizedState = null,
        t.updateQueue = null,
        pt(r) ? (s = !0,
        ca(t)) : s = !1,
        t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null,
        bc(t),
        i.updater = za,
        t.stateNode = i,
        i._reactInternals = t,
        mu(t, r, e, n),
        t = gu(null, t, r, !0, s, n)) : (t.tag = 0,
        me && s && xc(t),
        Ze(null, t, i, n),
        t = t.child),
        t;
    case 16:
        r = t.elementType;
        e: {
            switch (Kl(e, t),
            e = t.pendingProps,
            i = r._init,
            r = i(r._payload),
            t.type = r,
            i = t.tag = ix(r),
            e = Qt(r, e),
            i) {
            case 0:
                t = vu(null, t, r, e, n);
                break e;
            case 1:
                t = gf(null, t, r, e, n);
                break e;
            case 11:
                t = yf(null, t, r, e, n);
                break e;
            case 14:
                t = vf(null, t, r, Qt(r.type, e), n);
                break e
            }
            throw Error(_(306, r, ""))
        }
        return t;
    case 0:
        return r = t.type,
        i = t.pendingProps,
        i = t.elementType === r ? i : Qt(r, i),
        vu(e, t, r, i, n);
    case 1:
        return r = t.type,
        i = t.pendingProps,
        i = t.elementType === r ? i : Qt(r, i),
        gf(e, t, r, i, n);
    case 3:
        e: {
            if (mm(t),
            e === null)
                throw Error(_(387));
            r = t.pendingProps,
            s = t.memoizedState,
            i = s.element,
            Hp(e, t),
            ma(t, r, null, n);
            var a = t.memoizedState;
            if (r = a.element,
            s.isDehydrated)
                if (s = {
                    element: r,
                    isDehydrated: !1,
                    cache: a.cache,
                    pendingSuspenseBoundaries: a.pendingSuspenseBoundaries,
                    transitions: a.transitions
                },
                t.updateQueue.baseState = s,
                t.memoizedState = s,
                t.flags & 256) {
                    i = Qi(Error(_(423)), t),
                    t = xf(e, t, r, n, i);
                    break e
                } else if (r !== i) {
                    i = Qi(Error(_(424)), t),
                    t = xf(e, t, r, n, i);
                    break e
                } else
                    for (kt = ir(t.stateNode.containerInfo.firstChild),
                    Et = t,
                    me = !0,
                    Wt = null,
                    n = Up(t, null, r, n),
                    t.child = n; n; )
                        n.flags = n.flags & -3 | 4096,
                        n = n.sibling;
            else {
                if (Ai(),
                r === i) {
                    t = En(e, t, n);
                    break e
                }
                Ze(e, t, r, n)
            }
            t = t.child
        }
        return t;
    case 5:
        return Bp(t),
        e === null && fu(t),
        r = t.type,
        i = t.pendingProps,
        s = e !== null ? e.memoizedProps : null,
        a = i.children,
        au(r, i) ? a = null : s !== null && au(r, s) && (t.flags |= 32),
        pm(e, t),
        Ze(e, t, a, n),
        t.child;
    case 6:
        return e === null && fu(t),
        null;
    case 13:
        return ym(e, t, n);
    case 4:
        return Cc(t, t.stateNode.containerInfo),
        r = t.pendingProps,
        e === null ? t.child = zi(t, null, r, n) : Ze(e, t, r, n),
        t.child;
    case 11:
        return r = t.type,
        i = t.pendingProps,
        i = t.elementType === r ? i : Qt(r, i),
        yf(e, t, r, i, n);
    case 7:
        return Ze(e, t, t.pendingProps, n),
        t.child;
    case 8:
        return Ze(e, t, t.pendingProps.children, n),
        t.child;
    case 12:
        return Ze(e, t, t.pendingProps.children, n),
        t.child;
    case 10:
        e: {
            if (r = t.type._context,
            i = t.pendingProps,
            s = t.memoizedProps,
            a = i.value,
            de(ha, r._currentValue),
            r._currentValue = a,
            s !== null)
                if (qt(s.value, a)) {
                    if (s.children === i.children && !ht.current) {
                        t = En(e, t, n);
                        break e
                    }
                } else
                    for (s = t.child,
                    s !== null && (s.return = t); s !== null; ) {
                        var o = s.dependencies;
                        if (o !== null) {
                            a = s.child;
                            for (var u = o.firstContext; u !== null; ) {
                                if (u.context === r) {
                                    if (s.tag === 1) {
                                        u = gn(-1, n & -n),
                                        u.tag = 2;
                                        var c = s.updateQueue;
                                        if (c !== null) {
                                            c = c.shared;
                                            var d = c.pending;
                                            d === null ? u.next = u : (u.next = d.next,
                                            d.next = u),
                                            c.pending = u
                                        }
                                    }
                                    s.lanes |= n,
                                    u = s.alternate,
                                    u !== null && (u.lanes |= n),
                                    hu(s.return, n, t),
                                    o.lanes |= n;
                                    break
                                }
                                u = u.next
                            }
                        } else if (s.tag === 10)
                            a = s.type === t.type ? null : s.child;
                        else if (s.tag === 18) {
                            if (a = s.return,
                            a === null)
                                throw Error(_(341));
                            a.lanes |= n,
                            o = a.alternate,
                            o !== null && (o.lanes |= n),
                            hu(a, n, t),
                            a = s.sibling
                        } else
                            a = s.child;
                        if (a !== null)
                            a.return = s;
                        else
                            for (a = s; a !== null; ) {
                                if (a === t) {
                                    a = null;
                                    break
                                }
                                if (s = a.sibling,
                                s !== null) {
                                    s.return = a.return,
                                    a = s;
                                    break
                                }
                                a = a.return
                            }
                        s = a
                    }
            Ze(e, t, i.children, n),
            t = t.child
        }
        return t;
    case 9:
        return i = t.type,
        r = t.pendingProps.children,
        wi(t, n),
        i = It(i),
        r = r(i),
        t.flags |= 1,
        Ze(e, t, r, n),
        t.child;
    case 14:
        return r = t.type,
        i = Qt(r, t.pendingProps),
        i = Qt(r.type, i),
        vf(e, t, r, i, n);
    case 15:
        return fm(e, t, t.type, t.pendingProps, n);
    case 17:
        return r = t.type,
        i = t.pendingProps,
        i = t.elementType === r ? i : Qt(r, i),
        Kl(e, t),
        t.tag = 1,
        pt(r) ? (e = !0,
        ca(t)) : e = !1,
        wi(t, n),
        um(t, r, i),
        mu(t, r, i, n),
        gu(null, t, r, !0, e, n);
    case 19:
        return vm(e, t, n);
    case 22:
        return hm(e, t, n)
    }
    throw Error(_(156, t.tag))
}
;
function Om(e, t) {
    return lp(e, t)
}
function rx(e, t, n, r) {
    this.tag = e,
    this.key = n,
    this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null,
    this.index = 0,
    this.ref = null,
    this.pendingProps = t,
    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null,
    this.mode = r,
    this.subtreeFlags = this.flags = 0,
    this.deletions = null,
    this.childLanes = this.lanes = 0,
    this.alternate = null
}
function Lt(e, t, n, r) {
    return new rx(e,t,n,r)
}
function Hc(e) {
    return e = e.prototype,
    !(!e || !e.isReactComponent)
}
function ix(e) {
    if (typeof e == "function")
        return Hc(e) ? 1 : 0;
    if (e != null) {
        if (e = e.$$typeof,
        e === ac)
            return 11;
        if (e === oc)
            return 14
    }
    return 2
}
function or(e, t) {
    var n = e.alternate;
    return n === null ? (n = Lt(e.tag, t, e.key, e.mode),
    n.elementType = e.elementType,
    n.type = e.type,
    n.stateNode = e.stateNode,
    n.alternate = e,
    e.alternate = n) : (n.pendingProps = t,
    n.type = e.type,
    n.flags = 0,
    n.subtreeFlags = 0,
    n.deletions = null),
    n.flags = e.flags & 14680064,
    n.childLanes = e.childLanes,
    n.lanes = e.lanes,
    n.child = e.child,
    n.memoizedProps = e.memoizedProps,
    n.memoizedState = e.memoizedState,
    n.updateQueue = e.updateQueue,
    t = e.dependencies,
    n.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
    },
    n.sibling = e.sibling,
    n.index = e.index,
    n.ref = e.ref,
    n
}
function Yl(e, t, n, r, i, s) {
    var a = 2;
    if (r = e,
    typeof e == "function")
        Hc(e) && (a = 1);
    else if (typeof e == "string")
        a = 5;
    else
        e: switch (e) {
        case si:
            return zr(n.children, i, s, t);
        case lc:
            a = 8,
            i |= 8;
            break;
        case zo:
            return e = Lt(12, n, t, i | 2),
            e.elementType = zo,
            e.lanes = s,
            e;
        case Uo:
            return e = Lt(13, n, t, i),
            e.elementType = Uo,
            e.lanes = s,
            e;
        case Qo:
            return e = Lt(19, n, t, i),
            e.elementType = Qo,
            e.lanes = s,
            e;
        case Bh:
            return Ha(n, i, s, t);
        default:
            if (typeof e == "object" && e !== null)
                switch (e.$$typeof) {
                case Qh:
                    a = 10;
                    break e;
                case Hh:
                    a = 9;
                    break e;
                case ac:
                    a = 11;
                    break e;
                case oc:
                    a = 14;
                    break e;
                case zn:
                    a = 16,
                    r = null;
                    break e
                }
            throw Error(_(130, e == null ? e : typeof e, ""))
        }
    return t = Lt(a, n, t, i),
    t.elementType = e,
    t.type = r,
    t.lanes = s,
    t
}
function zr(e, t, n, r) {
    return e = Lt(7, e, r, t),
    e.lanes = n,
    e
}
function Ha(e, t, n, r) {
    return e = Lt(22, e, r, t),
    e.elementType = Bh,
    e.lanes = n,
    e.stateNode = {
        isHidden: !1
    },
    e
}
function To(e, t, n) {
    return e = Lt(6, e, null, t),
    e.lanes = n,
    e
}
function _o(e, t, n) {
    return t = Lt(4, e.children !== null ? e.children : [], e.key, t),
    t.lanes = n,
    t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
    },
    t
}
function sx(e, t, n, r, i) {
    this.tag = t,
    this.containerInfo = e,
    this.finishedWork = this.pingCache = this.current = this.pendingChildren = null,
    this.timeoutHandle = -1,
    this.callbackNode = this.pendingContext = this.context = null,
    this.callbackPriority = 0,
    this.eventTimes = co(0),
    this.expirationTimes = co(-1),
    this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0,
    this.entanglements = co(0),
    this.identifierPrefix = r,
    this.onRecoverableError = i,
    this.mutableSourceEagerHydrationData = null
}
function Bc(e, t, n, r, i, s, a, o, u) {
    return e = new sx(e,t,n,o,u),
    t === 1 ? (t = 1,
    s === !0 && (t |= 8)) : t = 0,
    s = Lt(3, null, null, t),
    e.current = s,
    s.stateNode = e,
    s.memoizedState = {
        element: r,
        isDehydrated: n,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null
    },
    bc(s),
    e
}
function lx(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
        $$typeof: ii,
        key: r == null ? null : "" + r,
        children: e,
        containerInfo: t,
        implementation: n
    }
}
function Im(e) {
    if (!e)
        return fr;
    e = e._reactInternals;
    e: {
        if (qr(e) !== e || e.tag !== 1)
            throw Error(_(170));
        var t = e;
        do {
            switch (t.tag) {
            case 3:
                t = t.stateNode.context;
                break e;
            case 1:
                if (pt(t.type)) {
                    t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                    break e
                }
            }
            t = t.return
        } while (t !== null);
        throw Error(_(171))
    }
    if (e.tag === 1) {
        var n = e.type;
        if (pt(n))
            return Ip(e, n, t)
    }
    return t
}
function Dm(e, t, n, r, i, s, a, o, u) {
    return e = Bc(n, r, !0, e, i, s, a, o, u),
    e.context = Im(null),
    n = e.current,
    r = rt(),
    i = ar(n),
    s = gn(r, i),
    s.callback = t ?? null,
    sr(n, s, i),
    e.current.lanes = i,
    nl(e, i, r),
    mt(e, r),
    e
}
function Ba(e, t, n, r) {
    var i = t.current
      , s = rt()
      , a = ar(i);
    return n = Im(n),
    t.context === null ? t.context = n : t.pendingContext = n,
    t = gn(s, a),
    t.payload = {
        element: e
    },
    r = r === void 0 ? null : r,
    r !== null && (t.callback = r),
    e = sr(i, t, a),
    e !== null && (Gt(e, i, a, s),
    $l(e, i, a)),
    a
}
function ka(e) {
    if (e = e.current,
    !e.child)
        return null;
    switch (e.child.tag) {
    case 5:
        return e.child.stateNode;
    default:
        return e.child.stateNode
    }
}
function Pf(e, t) {
    if (e = e.memoizedState,
    e !== null && e.dehydrated !== null) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t
    }
}
function $c(e, t) {
    Pf(e, t),
    (e = e.alternate) && Pf(e, t)
}
function ax() {
    return null
}
var Mm = typeof reportError == "function" ? reportError : function(e) {
    console.error(e)
}
;
function Wc(e) {
    this._internalRoot = e
}
$a.prototype.render = Wc.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null)
        throw Error(_(409));
    Ba(e, t, null, null)
}
;
$a.prototype.unmount = Wc.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        $r(function() {
            Ba(null, e, null, null)
        }),
        t[Sn] = null
    }
}
;
function $a(e) {
    this._internalRoot = e
}
$a.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
        var t = hp();
        e = {
            blockedOn: null,
            target: e,
            priority: t
        };
        for (var n = 0; n < Qn.length && t !== 0 && t < Qn[n].priority; n++)
            ;
        Qn.splice(n, 0, e),
        n === 0 && mp(e)
    }
}
;
function Vc(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
}
function Wa(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
}
function Tf() {}
function ox(e, t, n, r, i) {
    if (i) {
        if (typeof r == "function") {
            var s = r;
            r = function() {
                var c = ka(a);
                s.call(c)
            }
        }
        var a = Dm(t, r, e, 0, null, !1, !1, "", Tf);
        return e._reactRootContainer = a,
        e[Sn] = a.current,
        Ms(e.nodeType === 8 ? e.parentNode : e),
        $r(),
        a
    }
    for (; i = e.lastChild; )
        e.removeChild(i);
    if (typeof r == "function") {
        var o = r;
        r = function() {
            var c = ka(u);
            o.call(c)
        }
    }
    var u = Bc(e, 0, !1, null, null, !1, !1, "", Tf);
    return e._reactRootContainer = u,
    e[Sn] = u.current,
    Ms(e.nodeType === 8 ? e.parentNode : e),
    $r(function() {
        Ba(t, u, n, r)
    }),
    u
}
function Va(e, t, n, r, i) {
    var s = n._reactRootContainer;
    if (s) {
        var a = s;
        if (typeof i == "function") {
            var o = i;
            i = function() {
                var u = ka(a);
                o.call(u)
            }
        }
        Ba(t, a, e, i)
    } else
        a = ox(n, t, e, i, r);
    return ka(a)
}
dp = function(e) {
    switch (e.tag) {
    case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
            var n = ps(t.pendingLanes);
            n !== 0 && (dc(t, n | 1),
            mt(t, Re()),
            !(te & 6) && (Hi = Re() + 500,
            mr()))
        }
        break;
    case 13:
        $r(function() {
            var r = kn(e, 1);
            if (r !== null) {
                var i = rt();
                Gt(r, e, 1, i)
            }
        }),
        $c(e, 1)
    }
}
;
fc = function(e) {
    if (e.tag === 13) {
        var t = kn(e, 134217728);
        if (t !== null) {
            var n = rt();
            Gt(t, e, 134217728, n)
        }
        $c(e, 134217728)
    }
}
;
fp = function(e) {
    if (e.tag === 13) {
        var t = ar(e)
          , n = kn(e, t);
        if (n !== null) {
            var r = rt();
            Gt(n, e, t, r)
        }
        $c(e, t)
    }
}
;
hp = function() {
    return ae
}
;
pp = function(e, t) {
    var n = ae;
    try {
        return ae = e,
        t()
    } finally {
        ae = n
    }
}
;
Xo = function(e, t, n) {
    switch (t) {
    case "input":
        if ($o(e, n),
        t = n.name,
        n.type === "radio" && t != null) {
            for (n = e; n.parentNode; )
                n = n.parentNode;
            for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'),
            t = 0; t < n.length; t++) {
                var r = n[t];
                if (r !== e && r.form === e.form) {
                    var i = Ma(r);
                    if (!i)
                        throw Error(_(90));
                    Wh(r),
                    $o(r, i)
                }
            }
        }
        break;
    case "textarea":
        Kh(e, n);
        break;
    case "select":
        t = n.value,
        t != null && yi(e, !!n.multiple, t, !1)
    }
}
;
ep = zc;
tp = $r;
var ux = {
    usingClientEntryPoint: !1,
    Events: [il, ui, Ma, Jh, Zh, zc]
}
  , os = {
    findFiberByHostInstance: Er,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom"
}
  , cx = {
    bundleType: os.bundleType,
    version: os.version,
    rendererPackageName: os.rendererPackageName,
    rendererConfig: os.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Rn.ReactCurrentDispatcher,
    findHostInstanceByFiber: function(e) {
        return e = ip(e),
        e === null ? null : e.stateNode
    },
    findFiberByHostInstance: os.findFiberByHostInstance || ax,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
};
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Dl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Dl.isDisabled && Dl.supportsFiber)
        try {
            La = Dl.inject(cx),
            sn = Dl
        } catch {}
}
bt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ux;
bt.createPortal = function(e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Vc(t))
        throw Error(_(200));
    return lx(e, t, null, n)
}
;
bt.createRoot = function(e, t) {
    if (!Vc(e))
        throw Error(_(299));
    var n = !1
      , r = ""
      , i = Mm;
    return t != null && (t.unstable_strictMode === !0 && (n = !0),
    t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
    t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
    t = Bc(e, 1, !1, null, null, n, !1, r, i),
    e[Sn] = t.current,
    Ms(e.nodeType === 8 ? e.parentNode : e),
    new Wc(t)
}
;
bt.findDOMNode = function(e) {
    if (e == null)
        return null;
    if (e.nodeType === 1)
        return e;
    var t = e._reactInternals;
    if (t === void 0)
        throw typeof e.render == "function" ? Error(_(188)) : (e = Object.keys(e).join(","),
        Error(_(268, e)));
    return e = ip(t),
    e = e === null ? null : e.stateNode,
    e
}
;
bt.flushSync = function(e) {
    return $r(e)
}
;
bt.hydrate = function(e, t, n) {
    if (!Wa(t))
        throw Error(_(200));
    return Va(null, e, t, !0, n)
}
;
bt.hydrateRoot = function(e, t, n) {
    if (!Vc(e))
        throw Error(_(405));
    var r = n != null && n.hydratedSources || null
      , i = !1
      , s = ""
      , a = Mm;
    if (n != null && (n.unstable_strictMode === !0 && (i = !0),
    n.identifierPrefix !== void 0 && (s = n.identifierPrefix),
    n.onRecoverableError !== void 0 && (a = n.onRecoverableError)),
    t = Dm(t, null, e, 1, n ?? null, i, !1, s, a),
    e[Sn] = t.current,
    Ms(e),
    r)
        for (e = 0; e < r.length; e++)
            n = r[e],
            i = n._getVersion,
            i = i(n._source),
            t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, i] : t.mutableSourceEagerHydrationData.push(n, i);
    return new $a(t)
}
;
bt.render = function(e, t, n) {
    if (!Wa(t))
        throw Error(_(200));
    return Va(null, e, t, !1, n)
}
;
bt.unmountComponentAtNode = function(e) {
    if (!Wa(e))
        throw Error(_(40));
    return e._reactRootContainer ? ($r(function() {
        Va(null, null, e, !1, function() {
            e._reactRootContainer = null,
            e[Sn] = null
        })
    }),
    !0) : !1
}
;
bt.unstable_batchedUpdates = zc;
bt.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
    if (!Wa(n))
        throw Error(_(200));
    if (e == null || e._reactInternals === void 0)
        throw Error(_(38));
    return Va(e, t, n, !1, r)
}
;
bt.version = "18.3.1-next-f1338f8080-20240426";
function Fm() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
        try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Fm)
        } catch (e) {
            console.error(e)
        }
}
Fm(),
Fh.exports = bt;
var Kc = Fh.exports;
const dx = Eh(Kc)
  , fx = kh({
    __proto__: null,
    default: dx
}, [Kc]);
var _f = Kc;
Fo.createRoot = _f.createRoot,
Fo.hydrateRoot = _f.hydrateRoot;
var qi = class {
    constructor() {
        this.listeners = new Set,
        this.subscribe = this.subscribe.bind(this)
    }
    subscribe(e) {
        return this.listeners.add(e),
        this.onSubscribe(),
        () => {
            this.listeners.delete(e),
            this.onUnsubscribe()
        }
    }
    hasListeners() {
        return this.listeners.size > 0
    }
    onSubscribe() {}
    onUnsubscribe() {}
}
, Pr, Bn, ki, fh, hx = (fh = class extends qi {
    constructor() {
        super();
        B(this, Pr);
        B(this, Bn);
        B(this, ki);
        M(this, ki, t => {
            if (typeof window < "u" && window.addEventListener) {
                const n = () => t();
                return window.addEventListener("visibilitychange", n, !1),
                () => {
                    window.removeEventListener("visibilitychange", n)
                }
            }
        }
        )
    }
    onSubscribe() {
        v(this, Bn) || this.setEventListener(v(this, ki))
    }
    onUnsubscribe() {
        var t;
        this.hasListeners() || ((t = v(this, Bn)) == null || t.call(this),
        M(this, Bn, void 0))
    }
    setEventListener(t) {
        var n;
        M(this, ki, t),
        (n = v(this, Bn)) == null || n.call(this),
        M(this, Bn, t(r => {
            typeof r == "boolean" ? this.setFocused(r) : this.onFocus()
        }
        ))
    }
    setFocused(t) {
        v(this, Pr) !== t && (M(this, Pr, t),
        this.onFocus())
    }
    onFocus() {
        const t = this.isFocused();
        this.listeners.forEach(n => {
            n(t)
        }
        )
    }
    isFocused() {
        var t;
        return typeof v(this, Pr) == "boolean" ? v(this, Pr) : ((t = globalThis.document) == null ? void 0 : t.visibilityState) !== "hidden"
    }
}
,
Pr = new WeakMap,
Bn = new WeakMap,
ki = new WeakMap,
fh), Gc = new hx, px = {
    setTimeout: (e, t) => setTimeout(e, t),
    clearTimeout: e => clearTimeout(e),
    setInterval: (e, t) => setInterval(e, t),
    clearInterval: e => clearInterval(e)
}, $n, Ju, hh, mx = (hh = class {
    constructor() {
        B(this, $n, px);
        B(this, Ju, !1)
    }
    setTimeoutProvider(e) {
        M(this, $n, e)
    }
    setTimeout(e, t) {
        return v(this, $n).setTimeout(e, t)
    }
    clearTimeout(e) {
        v(this, $n).clearTimeout(e)
    }
    setInterval(e, t) {
        return v(this, $n).setInterval(e, t)
    }
    clearInterval(e) {
        v(this, $n).clearInterval(e)
    }
}
,
$n = new WeakMap,
Ju = new WeakMap,
hh), Cr = new mx;
function yx(e) {
    setTimeout(e, 0)
}
var vx = typeof window > "u" || "Deno"in globalThis;
function et() {}
function gx(e, t) {
    return typeof e == "function" ? e(t) : e
}
function Tu(e) {
    return typeof e == "number" && e >= 0 && e !== 1 / 0
}
function Am(e, t) {
    return Math.max(e + (t || 0) - Date.now(), 0)
}
function ur(e, t) {
    return typeof e == "function" ? e(t) : e
}
function jt(e, t) {
    return typeof e == "function" ? e(t) : e
}
function Lf(e, t) {
    const {type: n="all", exact: r, fetchStatus: i, predicate: s, queryKey: a, stale: o} = e;
    if (a) {
        if (r) {
            if (t.queryHash !== qc(a, t.options))
                return !1
        } else if (!Ws(t.queryKey, a))
            return !1
    }
    if (n !== "all") {
        const u = t.isActive();
        if (n === "active" && !u || n === "inactive" && u)
            return !1
    }
    return !(typeof o == "boolean" && t.isStale() !== o || i && i !== t.state.fetchStatus || s && !s(t))
}
function Of(e, t) {
    const {exact: n, status: r, predicate: i, mutationKey: s} = e;
    if (s) {
        if (!t.options.mutationKey)
            return !1;
        if (n) {
            if (Wr(t.options.mutationKey) !== Wr(s))
                return !1
        } else if (!Ws(t.options.mutationKey, s))
            return !1
    }
    return !(r && t.state.status !== r || i && !i(t))
}
function qc(e, t) {
    return ((t == null ? void 0 : t.queryKeyHashFn) || Wr)(e)
}
function Wr(e) {
    return JSON.stringify(e, (t, n) => _u(n) ? Object.keys(n).sort().reduce( (r, i) => (r[i] = n[i],
    r), {}) : n)
}
function Ws(e, t) {
    return e === t ? !0 : typeof e != typeof t ? !1 : e && t && typeof e == "object" && typeof t == "object" ? Object.keys(t).every(n => Ws(e[n], t[n])) : !1
}
var xx = Object.prototype.hasOwnProperty;
function zm(e, t, n=0) {
    if (e === t)
        return e;
    if (n > 500)
        return t;
    const r = If(e) && If(t);
    if (!r && !(_u(e) && _u(t)))
        return t;
    const s = (r ? e : Object.keys(e)).length
      , a = r ? t : Object.keys(t)
      , o = a.length
      , u = r ? new Array(o) : {};
    let c = 0;
    for (let d = 0; d < o; d++) {
        const f = r ? d : a[d]
          , m = e[f]
          , y = t[f];
        if (m === y) {
            u[f] = m,
            (r ? d < s : xx.call(e, f)) && c++;
            continue
        }
        if (m === null || y === null || typeof m != "object" || typeof y != "object") {
            u[f] = y;
            continue
        }
        const S = zm(m, y, n + 1);
        u[f] = S,
        S === m && c++
    }
    return s === o && c === s ? e : u
}
function Ea(e, t) {
    if (!t || Object.keys(e).length !== Object.keys(t).length)
        return !1;
    for (const n in e)
        if (e[n] !== t[n])
            return !1;
    return !0
}
function If(e) {
    return Array.isArray(e) && e.length === Object.keys(e).length
}
function _u(e) {
    if (!Df(e))
        return !1;
    const t = e.constructor;
    if (t === void 0)
        return !0;
    const n = t.prototype;
    return !(!Df(n) || !n.hasOwnProperty("isPrototypeOf") || Object.getPrototypeOf(e) !== Object.prototype)
}
function Df(e) {
    return Object.prototype.toString.call(e) === "[object Object]"
}
function wx(e) {
    return new Promise(t => {
        Cr.setTimeout(t, e)
    }
    )
}
function Lu(e, t, n) {
    return typeof n.structuralSharing == "function" ? n.structuralSharing(e, t) : n.structuralSharing !== !1 ? zm(e, t) : t
}
function jx(e, t, n=0) {
    const r = [...e, t];
    return n && r.length > n ? r.slice(1) : r
}
function Sx(e, t, n=0) {
    const r = [t, ...e];
    return n && r.length > n ? r.slice(0, -1) : r
}
var Yc = Symbol();
function Um(e, t) {
    return !e.queryFn && (t != null && t.initialPromise) ? () => t.initialPromise : !e.queryFn || e.queryFn === Yc ? () => Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`)) : e.queryFn
}
function Xc(e, t) {
    return typeof e == "function" ? e(...t) : !!e
}
function kx(e, t, n) {
    let r = !1, i;
    return Object.defineProperty(e, "signal", {
        enumerable: !0,
        get: () => (i ?? (i = t()),
        r || (r = !0,
        i.aborted ? n() : i.addEventListener("abort", n, {
            once: !0
        })),
        i)
    }),
    e
}
var Vs = ( () => {
    let e = () => vx;
    return {
        isServer() {
            return e()
        },
        setIsServer(t) {
            e = t
        }
    }
}
)();
function Ou() {
    let e, t;
    const n = new Promise( (i, s) => {
        e = i,
        t = s
    }
    );
    n.status = "pending",
    n.catch( () => {}
    );
    function r(i) {
        Object.assign(n, i),
        delete n.resolve,
        delete n.reject
    }
    return n.resolve = i => {
        r({
            status: "fulfilled",
            value: i
        }),
        e(i)
    }
    ,
    n.reject = i => {
        r({
            status: "rejected",
            reason: i
        }),
        t(i)
    }
    ,
    n
}
var Ex = yx;
function Nx() {
    let e = []
      , t = 0
      , n = o => {
        o()
    }
      , r = o => {
        o()
    }
      , i = Ex;
    const s = o => {
        t ? e.push(o) : i( () => {
            n(o)
        }
        )
    }
      , a = () => {
        const o = e;
        e = [],
        o.length && i( () => {
            r( () => {
                o.forEach(u => {
                    n(u)
                }
                )
            }
            )
        }
        )
    }
    ;
    return {
        batch: o => {
            let u;
            t++;
            try {
                u = o()
            } finally {
                t--,
                t || a()
            }
            return u
        }
        ,
        batchCalls: o => (...u) => {
            s( () => {
                o(...u)
            }
            )
        }
        ,
        schedule: s,
        setNotifyFunction: o => {
            n = o
        }
        ,
        setBatchNotifyFunction: o => {
            r = o
        }
        ,
        setScheduler: o => {
            i = o
        }
    }
}
var Le = Nx(), Ei, Wn, Ni, ph, bx = (ph = class extends qi {
    constructor() {
        super();
        B(this, Ei, !0);
        B(this, Wn);
        B(this, Ni);
        M(this, Ni, t => {
            if (typeof window < "u" && window.addEventListener) {
                const n = () => t(!0)
                  , r = () => t(!1);
                return window.addEventListener("online", n, !1),
                window.addEventListener("offline", r, !1),
                () => {
                    window.removeEventListener("online", n),
                    window.removeEventListener("offline", r)
                }
            }
        }
        )
    }
    onSubscribe() {
        v(this, Wn) || this.setEventListener(v(this, Ni))
    }
    onUnsubscribe() {
        var t;
        this.hasListeners() || ((t = v(this, Wn)) == null || t.call(this),
        M(this, Wn, void 0))
    }
    setEventListener(t) {
        var n;
        M(this, Ni, t),
        (n = v(this, Wn)) == null || n.call(this),
        M(this, Wn, t(this.setOnline.bind(this)))
    }
    setOnline(t) {
        v(this, Ei) !== t && (M(this, Ei, t),
        this.listeners.forEach(r => {
            r(t)
        }
        ))
    }
    isOnline() {
        return v(this, Ei)
    }
}
,
Ei = new WeakMap,
Wn = new WeakMap,
Ni = new WeakMap,
ph), Na = new bx;
function Cx(e) {
    return Math.min(1e3 * 2 ** e, 3e4)
}
function Qm(e) {
    return (e ?? "online") === "online" ? Na.isOnline() : !0
}
var Iu = class extends Error {
    constructor(e) {
        super("CancelledError"),
        this.revert = e == null ? void 0 : e.revert,
        this.silent = e == null ? void 0 : e.silent
    }
}
;
function Hm(e) {
    let t = !1, n = 0, r;
    const i = Ou()
      , s = () => i.status !== "pending"
      , a = w => {
        var b;
        if (!s()) {
            const p = new Iu(w);
            m(p),
            (b = e.onCancel) == null || b.call(e, p)
        }
    }
      , o = () => {
        t = !0
    }
      , u = () => {
        t = !1
    }
      , c = () => Gc.isFocused() && (e.networkMode === "always" || Na.isOnline()) && e.canRun()
      , d = () => Qm(e.networkMode) && e.canRun()
      , f = w => {
        s() || (r == null || r(),
        i.resolve(w))
    }
      , m = w => {
        s() || (r == null || r(),
        i.reject(w))
    }
      , y = () => new Promise(w => {
        var b;
        r = p => {
            (s() || c()) && w(p)
        }
        ,
        (b = e.onPause) == null || b.call(e)
    }
    ).then( () => {
        var w;
        r = void 0,
        s() || (w = e.onContinue) == null || w.call(e)
    }
    )
      , S = () => {
        if (s())
            return;
        let w;
        const b = n === 0 ? e.initialPromise : void 0;
        try {
            w = b ?? e.fn()
        } catch (p) {
            w = Promise.reject(p)
        }
        Promise.resolve(w).then(f).catch(p => {
            var O;
            if (s())
                return;
            const h = e.retry ?? (Vs.isServer() ? 0 : 3)
              , g = e.retryDelay ?? Cx
              , k = typeof g == "function" ? g(n, p) : g
              , P = h === !0 || typeof h == "number" && n < h || typeof h == "function" && h(n, p);
            if (t || !P) {
                m(p);
                return
            }
            n++,
            (O = e.onFail) == null || O.call(e, n, p),
            wx(k).then( () => c() ? void 0 : y()).then( () => {
                t ? m(p) : S()
            }
            )
        }
        )
    }
    ;
    return {
        promise: i,
        status: () => i.status,
        cancel: a,
        continue: () => (r == null || r(),
        i),
        cancelRetry: o,
        continueRetry: u,
        canStart: d,
        start: () => (d() ? S() : y().then(S),
        i)
    }
}
var Tr, mh, Bm = (mh = class {
    constructor() {
        B(this, Tr)
    }
    destroy() {
        this.clearGcTimeout()
    }
    scheduleGc() {
        this.clearGcTimeout(),
        Tu(this.gcTime) && M(this, Tr, Cr.setTimeout( () => {
            this.optionalRemove()
        }
        , this.gcTime))
    }
    updateGcTime(e) {
        this.gcTime = Math.max(this.gcTime || 0, e ?? (Vs.isServer() ? 1 / 0 : 5 * 60 * 1e3))
    }
    clearGcTimeout() {
        v(this, Tr) !== void 0 && (Cr.clearTimeout(v(this, Tr)),
        M(this, Tr, void 0))
    }
}
,
Tr = new WeakMap,
mh);
function Rx(e) {
    return {
        onFetch: (t, n) => {
            var d, f, m, y, S;
            const r = t.options
              , i = (m = (f = (d = t.fetchOptions) == null ? void 0 : d.meta) == null ? void 0 : f.fetchMore) == null ? void 0 : m.direction
              , s = ((y = t.state.data) == null ? void 0 : y.pages) || []
              , a = ((S = t.state.data) == null ? void 0 : S.pageParams) || [];
            let o = {
                pages: [],
                pageParams: []
            }
              , u = 0;
            const c = async () => {
                let w = !1;
                const b = g => {
                    kx(g, () => t.signal, () => w = !0)
                }
                  , p = Um(t.options, t.fetchOptions)
                  , h = async (g, k, P) => {
                    if (w)
                        return Promise.reject(t.signal.reason);
                    if (k == null && g.pages.length)
                        return Promise.resolve(g);
                    const j = ( () => {
                        const X = {
                            client: t.client,
                            queryKey: t.queryKey,
                            pageParam: k,
                            direction: P ? "backward" : "forward",
                            meta: t.options.meta
                        };
                        return b(X),
                        X
                    }
                    )()
                      , R = await p(j)
                      , {maxPages: F} = t.options
                      , L = P ? Sx : jx;
                    return {
                        pages: L(g.pages, R, F),
                        pageParams: L(g.pageParams, k, F)
                    }
                }
                ;
                if (i && s.length) {
                    const g = i === "backward"
                      , k = g ? Px : Mf
                      , P = {
                        pages: s,
                        pageParams: a
                    }
                      , O = k(r, P);
                    o = await h(P, O, g)
                } else {
                    const g = e ?? s.length;
                    do {
                        const k = u === 0 ? a[0] ?? r.initialPageParam : Mf(r, o);
                        if (u > 0 && k == null)
                            break;
                        o = await h(o, k),
                        u++
                    } while (u < g)
                }
                return o
            }
            ;
            t.options.persister ? t.fetchFn = () => {
                var w, b;
                return (b = (w = t.options).persister) == null ? void 0 : b.call(w, c, {
                    client: t.client,
                    queryKey: t.queryKey,
                    meta: t.options.meta,
                    signal: t.signal
                }, n)
            }
            : t.fetchFn = c
        }
    }
}
function Mf(e, {pages: t, pageParams: n}) {
    const r = t.length - 1;
    return t.length > 0 ? e.getNextPageParam(t[r], t, n[r], n) : void 0
}
function Px(e, {pages: t, pageParams: n}) {
    var r;
    return t.length > 0 ? (r = e.getPreviousPageParam) == null ? void 0 : r.call(e, t[0], t, n[0], n) : void 0
}
var bi, _r, Ci, Pt, Lr, Ie, Ys, Or, wt, $m, un, yh, Tx = (yh = class extends Bm {
    constructor(t) {
        super();
        B(this, wt);
        B(this, bi);
        B(this, _r);
        B(this, Ci);
        B(this, Pt);
        B(this, Lr);
        B(this, Ie);
        B(this, Ys);
        B(this, Or);
        M(this, Or, !1),
        M(this, Ys, t.defaultOptions),
        this.setOptions(t.options),
        this.observers = [],
        M(this, Lr, t.client),
        M(this, Pt, v(this, Lr).getQueryCache()),
        this.queryKey = t.queryKey,
        this.queryHash = t.queryHash,
        M(this, _r, Af(this.options)),
        this.state = t.state ?? v(this, _r),
        this.scheduleGc()
    }
    get meta() {
        return this.options.meta
    }
    get queryType() {
        return v(this, bi)
    }
    get promise() {
        var t;
        return (t = v(this, Ie)) == null ? void 0 : t.promise
    }
    setOptions(t) {
        if (this.options = {
            ...v(this, Ys),
            ...t
        },
        t != null && t._type && M(this, bi, t._type),
        this.updateGcTime(this.options.gcTime),
        this.state && this.state.data === void 0) {
            const n = Af(this.options);
            n.data !== void 0 && (this.setState(Ff(n.data, n.dataUpdatedAt)),
            M(this, _r, n))
        }
    }
    optionalRemove() {
        !this.observers.length && this.state.fetchStatus === "idle" && v(this, Pt).remove(this)
    }
    setData(t, n) {
        const r = Lu(this.state.data, t, this.options);
        return Y(this, wt, un).call(this, {
            data: r,
            type: "success",
            dataUpdatedAt: n == null ? void 0 : n.updatedAt,
            manual: n == null ? void 0 : n.manual
        }),
        r
    }
    setState(t) {
        Y(this, wt, un).call(this, {
            type: "setState",
            state: t
        })
    }
    cancel(t) {
        var r, i;
        const n = (r = v(this, Ie)) == null ? void 0 : r.promise;
        return (i = v(this, Ie)) == null || i.cancel(t),
        n ? n.then(et).catch(et) : Promise.resolve()
    }
    destroy() {
        super.destroy(),
        this.cancel({
            silent: !0
        })
    }
    get resetState() {
        return v(this, _r)
    }
    reset() {
        this.destroy(),
        this.setState(this.resetState)
    }
    isActive() {
        return this.observers.some(t => jt(t.options.enabled, this) !== !1)
    }
    isDisabled() {
        return this.getObserversCount() > 0 ? !this.isActive() : this.options.queryFn === Yc || !this.isFetched()
    }
    isFetched() {
        return this.state.dataUpdateCount + this.state.errorUpdateCount > 0
    }
    isStatic() {
        return this.getObserversCount() > 0 ? this.observers.some(t => ur(t.options.staleTime, this) === "static") : !1
    }
    isStale() {
        return this.getObserversCount() > 0 ? this.observers.some(t => t.getCurrentResult().isStale) : this.state.data === void 0 || this.state.isInvalidated
    }
    isStaleByTime(t=0) {
        return this.state.data === void 0 ? !0 : t === "static" ? !1 : this.state.isInvalidated ? !0 : !Am(this.state.dataUpdatedAt, t)
    }
    onFocus() {
        var n;
        const t = this.observers.find(r => r.shouldFetchOnWindowFocus());
        t == null || t.refetch({
            cancelRefetch: !1
        }),
        (n = v(this, Ie)) == null || n.continue()
    }
    onOnline() {
        var n;
        const t = this.observers.find(r => r.shouldFetchOnReconnect());
        t == null || t.refetch({
            cancelRefetch: !1
        }),
        (n = v(this, Ie)) == null || n.continue()
    }
    addObserver(t) {
        this.observers.includes(t) || (this.observers.push(t),
        this.clearGcTimeout(),
        v(this, Pt).notify({
            type: "observerAdded",
            query: this,
            observer: t
        }))
    }
    removeObserver(t) {
        this.observers.includes(t) && (this.observers = this.observers.filter(n => n !== t),
        this.observers.length || (v(this, Ie) && (v(this, Or) || Y(this, wt, $m).call(this) ? v(this, Ie).cancel({
            revert: !0
        }) : v(this, Ie).cancelRetry()),
        this.scheduleGc()),
        v(this, Pt).notify({
            type: "observerRemoved",
            query: this,
            observer: t
        }))
    }
    getObserversCount() {
        return this.observers.length
    }
    invalidate() {
        this.state.isInvalidated || Y(this, wt, un).call(this, {
            type: "invalidate"
        })
    }
    async fetch(t, n) {
        var c, d, f, m, y, S, w, b, p, h, g;
        if (this.state.fetchStatus !== "idle" && ((c = v(this, Ie)) == null ? void 0 : c.status()) !== "rejected") {
            if (this.state.data !== void 0 && (n != null && n.cancelRefetch))
                this.cancel({
                    silent: !0
                });
            else if (v(this, Ie))
                return v(this, Ie).continueRetry(),
                v(this, Ie).promise
        }
        if (t && this.setOptions(t),
        !this.options.queryFn) {
            const k = this.observers.find(P => P.options.queryFn);
            k && this.setOptions(k.options)
        }
        const r = new AbortController
          , i = k => {
            Object.defineProperty(k, "signal", {
                enumerable: !0,
                get: () => (M(this, Or, !0),
                r.signal)
            })
        }
          , s = () => {
            const k = Um(this.options, n)
              , O = ( () => {
                const j = {
                    client: v(this, Lr),
                    queryKey: this.queryKey,
                    meta: this.meta
                };
                return i(j),
                j
            }
            )();
            return M(this, Or, !1),
            this.options.persister ? this.options.persister(k, O, this) : k(O)
        }
          , o = ( () => {
            const k = {
                fetchOptions: n,
                options: this.options,
                queryKey: this.queryKey,
                client: v(this, Lr),
                state: this.state,
                fetchFn: s
            };
            return i(k),
            k
        }
        )()
          , u = v(this, bi) === "infinite" ? Rx(this.options.pages) : this.options.behavior;
        u == null || u.onFetch(o, this),
        M(this, Ci, this.state),
        (this.state.fetchStatus === "idle" || this.state.fetchMeta !== ((d = o.fetchOptions) == null ? void 0 : d.meta)) && Y(this, wt, un).call(this, {
            type: "fetch",
            meta: (f = o.fetchOptions) == null ? void 0 : f.meta
        }),
        M(this, Ie, Hm({
            initialPromise: n == null ? void 0 : n.initialPromise,
            fn: o.fetchFn,
            onCancel: k => {
                k instanceof Iu && k.revert && this.setState({
                    ...v(this, Ci),
                    fetchStatus: "idle"
                }),
                r.abort()
            }
            ,
            onFail: (k, P) => {
                Y(this, wt, un).call(this, {
                    type: "failed",
                    failureCount: k,
                    error: P
                })
            }
            ,
            onPause: () => {
                Y(this, wt, un).call(this, {
                    type: "pause"
                })
            }
            ,
            onContinue: () => {
                Y(this, wt, un).call(this, {
                    type: "continue"
                })
            }
            ,
            retry: o.options.retry,
            retryDelay: o.options.retryDelay,
            networkMode: o.options.networkMode,
            canRun: () => !0
        }));
        try {
            const k = await v(this, Ie).start();
            if (k === void 0)
                throw new Error(`${this.queryHash} data is undefined`);
            return this.setData(k),
            (y = (m = v(this, Pt).config).onSuccess) == null || y.call(m, k, this),
            (w = (S = v(this, Pt).config).onSettled) == null || w.call(S, k, this.state.error, this),
            k
        } catch (k) {
            if (k instanceof Iu) {
                if (k.silent)
                    return v(this, Ie).promise;
                if (k.revert) {
                    if (this.state.data === void 0)
                        throw k;
                    return this.state.data
                }
            }
            throw Y(this, wt, un).call(this, {
                type: "error",
                error: k
            }),
            (p = (b = v(this, Pt).config).onError) == null || p.call(b, k, this),
            (g = (h = v(this, Pt).config).onSettled) == null || g.call(h, this.state.data, k, this),
            k
        } finally {
            this.scheduleGc()
        }
    }
}
,
bi = new WeakMap,
_r = new WeakMap,
Ci = new WeakMap,
Pt = new WeakMap,
Lr = new WeakMap,
Ie = new WeakMap,
Ys = new WeakMap,
Or = new WeakMap,
wt = new WeakSet,
$m = function() {
    return this.state.fetchStatus === "paused" && this.state.status === "pending"
}
,
un = function(t) {
    const n = r => {
        switch (t.type) {
        case "failed":
            return {
                ...r,
                fetchFailureCount: t.failureCount,
                fetchFailureReason: t.error
            };
        case "pause":
            return {
                ...r,
                fetchStatus: "paused"
            };
        case "continue":
            return {
                ...r,
                fetchStatus: "fetching"
            };
        case "fetch":
            return {
                ...r,
                ...Wm(r.data, this.options),
                fetchMeta: t.meta ?? null
            };
        case "success":
            const i = {
                ...r,
                ...Ff(t.data, t.dataUpdatedAt),
                dataUpdateCount: r.dataUpdateCount + 1,
                ...!t.manual && {
                    fetchStatus: "idle",
                    fetchFailureCount: 0,
                    fetchFailureReason: null
                }
            };
            return M(this, Ci, t.manual ? i : void 0),
            i;
        case "error":
            const s = t.error;
            return {
                ...r,
                error: s,
                errorUpdateCount: r.errorUpdateCount + 1,
                errorUpdatedAt: Date.now(),
                fetchFailureCount: r.fetchFailureCount + 1,
                fetchFailureReason: s,
                fetchStatus: "idle",
                status: "error",
                isInvalidated: !0
            };
        case "invalidate":
            return {
                ...r,
                isInvalidated: !0
            };
        case "setState":
            return {
                ...r,
                ...t.state
            }
        }
    }
    ;
    this.state = n(this.state),
    Le.batch( () => {
        this.observers.forEach(r => {
            r.onQueryUpdate()
        }
        ),
        v(this, Pt).notify({
            query: this,
            type: "updated",
            action: t
        })
    }
    )
}
,
yh);
function Wm(e, t) {
    return {
        fetchFailureCount: 0,
        fetchFailureReason: null,
        fetchStatus: Qm(t.networkMode) ? "fetching" : "paused",
        ...e === void 0 && {
            error: null,
            status: "pending"
        }
    }
}
function Ff(e, t) {
    return {
        data: e,
        dataUpdatedAt: t ?? Date.now(),
        error: null,
        isInvalidated: !1,
        status: "success"
    }
}
function Af(e) {
    const t = typeof e.initialData == "function" ? e.initialData() : e.initialData
      , n = t !== void 0
      , r = n ? typeof e.initialDataUpdatedAt == "function" ? e.initialDataUpdatedAt() : e.initialDataUpdatedAt : 0;
    return {
        data: t,
        dataUpdateCount: 0,
        dataUpdatedAt: n ? r ?? Date.now() : 0,
        error: null,
        errorUpdateCount: 0,
        errorUpdatedAt: 0,
        fetchFailureCount: 0,
        fetchFailureReason: null,
        fetchMeta: null,
        isInvalidated: !1,
        status: n ? "success" : "pending",
        fetchStatus: "idle"
    }
}
var at, Z, Xs, Je, Ir, Ri, fn, Vn, Js, Pi, Ti, Dr, Mr, Kn, _i, se, ys, Du, Mu, Fu, Au, zu, Uu, Qu, Vm, vh, _x = (vh = class extends qi {
    constructor(t, n) {
        super();
        B(this, se);
        B(this, at);
        B(this, Z);
        B(this, Xs);
        B(this, Je);
        B(this, Ir);
        B(this, Ri);
        B(this, fn);
        B(this, Vn);
        B(this, Js);
        B(this, Pi);
        B(this, Ti);
        B(this, Dr);
        B(this, Mr);
        B(this, Kn);
        B(this, _i, new Set);
        this.options = n,
        M(this, at, t),
        M(this, Vn, null),
        M(this, fn, Ou()),
        this.bindMethods(),
        this.setOptions(n)
    }
    bindMethods() {
        this.refetch = this.refetch.bind(this)
    }
    onSubscribe() {
        this.listeners.size === 1 && (v(this, Z).addObserver(this),
        zf(v(this, Z), this.options) ? Y(this, se, ys).call(this) : this.updateResult(),
        Y(this, se, Au).call(this))
    }
    onUnsubscribe() {
        this.hasListeners() || this.destroy()
    }
    shouldFetchOnReconnect() {
        return Hu(v(this, Z), this.options, this.options.refetchOnReconnect)
    }
    shouldFetchOnWindowFocus() {
        return Hu(v(this, Z), this.options, this.options.refetchOnWindowFocus)
    }
    destroy() {
        this.listeners = new Set,
        Y(this, se, zu).call(this),
        Y(this, se, Uu).call(this),
        v(this, Z).removeObserver(this)
    }
    setOptions(t) {
        const n = this.options
          , r = v(this, Z);
        if (this.options = v(this, at).defaultQueryOptions(t),
        this.options.enabled !== void 0 && typeof this.options.enabled != "boolean" && typeof this.options.enabled != "function" && typeof jt(this.options.enabled, v(this, Z)) != "boolean")
            throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");
        Y(this, se, Qu).call(this),
        v(this, Z).setOptions(this.options),
        n._defaulted && !Ea(this.options, n) && v(this, at).getQueryCache().notify({
            type: "observerOptionsUpdated",
            query: v(this, Z),
            observer: this
        });
        const i = this.hasListeners();
        i && Uf(v(this, Z), r, this.options, n) && Y(this, se, ys).call(this),
        this.updateResult(),
        i && (v(this, Z) !== r || jt(this.options.enabled, v(this, Z)) !== jt(n.enabled, v(this, Z)) || ur(this.options.staleTime, v(this, Z)) !== ur(n.staleTime, v(this, Z))) && Y(this, se, Du).call(this);
        const s = Y(this, se, Mu).call(this);
        i && (v(this, Z) !== r || jt(this.options.enabled, v(this, Z)) !== jt(n.enabled, v(this, Z)) || s !== v(this, Kn)) && Y(this, se, Fu).call(this, s)
    }
    getOptimisticResult(t) {
        const n = v(this, at).getQueryCache().build(v(this, at), t)
          , r = this.createResult(n, t);
        return Ox(this, r) && (M(this, Je, r),
        M(this, Ri, this.options),
        M(this, Ir, v(this, Z).state)),
        r
    }
    getCurrentResult() {
        return v(this, Je)
    }
    trackResult(t, n) {
        return new Proxy(t,{
            get: (r, i) => (this.trackProp(i),
            n == null || n(i),
            i === "promise" && (this.trackProp("data"),
            !this.options.experimental_prefetchInRender && v(this, fn).status === "pending" && v(this, fn).reject(new Error("experimental_prefetchInRender feature flag is not enabled"))),
            Reflect.get(r, i))
        })
    }
    trackProp(t) {
        v(this, _i).add(t)
    }
    getCurrentQuery() {
        return v(this, Z)
    }
    refetch({...t}={}) {
        return this.fetch({
            ...t
        })
    }
    fetchOptimistic(t) {
        const n = v(this, at).defaultQueryOptions(t)
          , r = v(this, at).getQueryCache().build(v(this, at), n);
        return r.fetch().then( () => this.createResult(r, n))
    }
    fetch(t) {
        return Y(this, se, ys).call(this, {
            ...t,
            cancelRefetch: t.cancelRefetch ?? !0
        }).then( () => (this.updateResult(),
        v(this, Je)))
    }
    createResult(t, n) {
        var F;
        const r = v(this, Z)
          , i = this.options
          , s = v(this, Je)
          , a = v(this, Ir)
          , o = v(this, Ri)
          , c = t !== r ? t.state : v(this, Xs)
          , {state: d} = t;
        let f = {
            ...d
        }, m = !1, y;
        if (n._optimisticResults) {
            const L = this.hasListeners()
              , X = !L && zf(t, n)
              , re = L && Uf(t, r, n, i);
            (X || re) && (f = {
                ...f,
                ...Wm(d.data, t.options)
            }),
            n._optimisticResults === "isRestoring" && (f.fetchStatus = "idle")
        }
        let {error: S, errorUpdatedAt: w, status: b} = f;
        y = f.data;
        let p = !1;
        if (n.placeholderData !== void 0 && y === void 0 && b === "pending") {
            let L;
            s != null && s.isPlaceholderData && n.placeholderData === (o == null ? void 0 : o.placeholderData) ? (L = s.data,
            p = !0) : L = typeof n.placeholderData == "function" ? n.placeholderData((F = v(this, Ti)) == null ? void 0 : F.state.data, v(this, Ti)) : n.placeholderData,
            L !== void 0 && (b = "success",
            y = Lu(s == null ? void 0 : s.data, L, n),
            m = !0)
        }
        if (n.select && y !== void 0 && !p)
            if (s && y === (a == null ? void 0 : a.data) && n.select === v(this, Js))
                y = v(this, Pi);
            else
                try {
                    M(this, Js, n.select),
                    y = n.select(y),
                    y = Lu(s == null ? void 0 : s.data, y, n),
                    M(this, Pi, y),
                    M(this, Vn, null)
                } catch (L) {
                    M(this, Vn, L)
                }
        v(this, Vn) && (S = v(this, Vn),
        y = v(this, Pi),
        w = Date.now(),
        b = "error");
        const h = f.fetchStatus === "fetching"
          , g = b === "pending"
          , k = b === "error"
          , P = g && h
          , O = y !== void 0
          , R = {
            status: b,
            fetchStatus: f.fetchStatus,
            isPending: g,
            isSuccess: b === "success",
            isError: k,
            isInitialLoading: P,
            isLoading: P,
            data: y,
            dataUpdatedAt: f.dataUpdatedAt,
            error: S,
            errorUpdatedAt: w,
            failureCount: f.fetchFailureCount,
            failureReason: f.fetchFailureReason,
            errorUpdateCount: f.errorUpdateCount,
            isFetched: t.isFetched(),
            isFetchedAfterMount: f.dataUpdateCount > c.dataUpdateCount || f.errorUpdateCount > c.errorUpdateCount,
            isFetching: h,
            isRefetching: h && !g,
            isLoadingError: k && !O,
            isPaused: f.fetchStatus === "paused",
            isPlaceholderData: m,
            isRefetchError: k && O,
            isStale: Jc(t, n),
            refetch: this.refetch,
            promise: v(this, fn),
            isEnabled: jt(n.enabled, t) !== !1
        };
        if (this.options.experimental_prefetchInRender) {
            const L = R.data !== void 0
              , X = R.status === "error" && !L
              , re = He => {
                X ? He.reject(R.error) : L && He.resolve(R.data)
            }
              , we = () => {
                const He = M(this, fn, R.promise = Ou());
                re(He)
            }
              , je = v(this, fn);
            switch (je.status) {
            case "pending":
                t.queryHash === r.queryHash && re(je);
                break;
            case "fulfilled":
                (X || R.data !== je.value) && we();
                break;
            case "rejected":
                (!X || R.error !== je.reason) && we();
                break
            }
        }
        return R
    }
    updateResult() {
        const t = v(this, Je)
          , n = this.createResult(v(this, Z), this.options);
        if (M(this, Ir, v(this, Z).state),
        M(this, Ri, this.options),
        v(this, Ir).data !== void 0 && M(this, Ti, v(this, Z)),
        Ea(n, t))
            return;
        M(this, Je, n);
        const r = () => {
            if (!t)
                return !0;
            const {notifyOnChangeProps: i} = this.options
              , s = typeof i == "function" ? i() : i;
            if (s === "all" || !s && !v(this, _i).size)
                return !0;
            const a = new Set(s ?? v(this, _i));
            return this.options.throwOnError && a.add("error"),
            Object.keys(v(this, Je)).some(o => {
                const u = o;
                return v(this, Je)[u] !== t[u] && a.has(u)
            }
            )
        }
        ;
        Y(this, se, Vm).call(this, {
            listeners: r()
        })
    }
    onQueryUpdate() {
        this.updateResult(),
        this.hasListeners() && Y(this, se, Au).call(this)
    }
}
,
at = new WeakMap,
Z = new WeakMap,
Xs = new WeakMap,
Je = new WeakMap,
Ir = new WeakMap,
Ri = new WeakMap,
fn = new WeakMap,
Vn = new WeakMap,
Js = new WeakMap,
Pi = new WeakMap,
Ti = new WeakMap,
Dr = new WeakMap,
Mr = new WeakMap,
Kn = new WeakMap,
_i = new WeakMap,
se = new WeakSet,
ys = function(t) {
    Y(this, se, Qu).call(this);
    let n = v(this, Z).fetch(this.options, t);
    return t != null && t.throwOnError || (n = n.catch(et)),
    n
}
,
Du = function() {
    Y(this, se, zu).call(this);
    const t = ur(this.options.staleTime, v(this, Z));
    if (Vs.isServer() || v(this, Je).isStale || !Tu(t))
        return;
    const r = Am(v(this, Je).dataUpdatedAt, t) + 1;
    M(this, Dr, Cr.setTimeout( () => {
        v(this, Je).isStale || this.updateResult()
    }
    , r))
}
,
Mu = function() {
    return (typeof this.options.refetchInterval == "function" ? this.options.refetchInterval(v(this, Z)) : this.options.refetchInterval) ?? !1
}
,
Fu = function(t) {
    Y(this, se, Uu).call(this),
    M(this, Kn, t),
    !(Vs.isServer() || jt(this.options.enabled, v(this, Z)) === !1 || !Tu(v(this, Kn)) || v(this, Kn) === 0) && M(this, Mr, Cr.setInterval( () => {
        (this.options.refetchIntervalInBackground || Gc.isFocused()) && Y(this, se, ys).call(this)
    }
    , v(this, Kn)))
}
,
Au = function() {
    Y(this, se, Du).call(this),
    Y(this, se, Fu).call(this, Y(this, se, Mu).call(this))
}
,
zu = function() {
    v(this, Dr) !== void 0 && (Cr.clearTimeout(v(this, Dr)),
    M(this, Dr, void 0))
}
,
Uu = function() {
    v(this, Mr) !== void 0 && (Cr.clearInterval(v(this, Mr)),
    M(this, Mr, void 0))
}
,
Qu = function() {
    const t = v(this, at).getQueryCache().build(v(this, at), this.options);
    if (t === v(this, Z))
        return;
    const n = v(this, Z);
    M(this, Z, t),
    M(this, Xs, t.state),
    this.hasListeners() && (n == null || n.removeObserver(this),
    t.addObserver(this))
}
,
Vm = function(t) {
    Le.batch( () => {
        t.listeners && this.listeners.forEach(n => {
            n(v(this, Je))
        }
        ),
        v(this, at).getQueryCache().notify({
            query: v(this, Z),
            type: "observerResultsUpdated"
        })
    }
    )
}
,
vh);
function Lx(e, t) {
    return jt(t.enabled, e) !== !1 && e.state.data === void 0 && !(e.state.status === "error" && jt(t.retryOnMount, e) === !1)
}
function zf(e, t) {
    return Lx(e, t) || e.state.data !== void 0 && Hu(e, t, t.refetchOnMount)
}
function Hu(e, t, n) {
    if (jt(t.enabled, e) !== !1 && ur(t.staleTime, e) !== "static") {
        const r = typeof n == "function" ? n(e) : n;
        return r === "always" || r !== !1 && Jc(e, t)
    }
    return !1
}
function Uf(e, t, n, r) {
    return (e !== t || jt(r.enabled, e) === !1) && (!n.suspense || e.state.status !== "error") && Jc(e, n)
}
function Jc(e, t) {
    return jt(t.enabled, e) !== !1 && e.isStaleByTime(ur(t.staleTime, e))
}
function Ox(e, t) {
    return !Ea(e.getCurrentResult(), t)
}
var Zs, en, We, Fr, tn, Fn, gh, Ix = (gh = class extends Bm {
    constructor(t) {
        super();
        B(this, tn);
        B(this, Zs);
        B(this, en);
        B(this, We);
        B(this, Fr);
        M(this, Zs, t.client),
        this.mutationId = t.mutationId,
        M(this, We, t.mutationCache),
        M(this, en, []),
        this.state = t.state || Km(),
        this.setOptions(t.options),
        this.scheduleGc()
    }
    setOptions(t) {
        this.options = t,
        this.updateGcTime(this.options.gcTime)
    }
    get meta() {
        return this.options.meta
    }
    addObserver(t) {
        v(this, en).includes(t) || (v(this, en).push(t),
        this.clearGcTimeout(),
        v(this, We).notify({
            type: "observerAdded",
            mutation: this,
            observer: t
        }))
    }
    removeObserver(t) {
        M(this, en, v(this, en).filter(n => n !== t)),
        this.scheduleGc(),
        v(this, We).notify({
            type: "observerRemoved",
            mutation: this,
            observer: t
        })
    }
    optionalRemove() {
        v(this, en).length || (this.state.status === "pending" ? this.scheduleGc() : v(this, We).remove(this))
    }
    continue() {
        var t;
        return ((t = v(this, Fr)) == null ? void 0 : t.continue()) ?? this.execute(this.state.variables)
    }
    async execute(t) {
        var a, o, u, c, d, f, m, y, S, w, b, p, h, g, k, P, O, j;
        const n = () => {
            Y(this, tn, Fn).call(this, {
                type: "continue"
            })
        }
          , r = {
            client: v(this, Zs),
            meta: this.options.meta,
            mutationKey: this.options.mutationKey
        };
        M(this, Fr, Hm({
            fn: () => this.options.mutationFn ? this.options.mutationFn(t, r) : Promise.reject(new Error("No mutationFn found")),
            onFail: (R, F) => {
                Y(this, tn, Fn).call(this, {
                    type: "failed",
                    failureCount: R,
                    error: F
                })
            }
            ,
            onPause: () => {
                Y(this, tn, Fn).call(this, {
                    type: "pause"
                })
            }
            ,
            onContinue: n,
            retry: this.options.retry ?? 0,
            retryDelay: this.options.retryDelay,
            networkMode: this.options.networkMode,
            canRun: () => v(this, We).canRun(this)
        }));
        const i = this.state.status === "pending"
          , s = !v(this, Fr).canStart();
        try {
            if (i)
                n();
            else {
                Y(this, tn, Fn).call(this, {
                    type: "pending",
                    variables: t,
                    isPaused: s
                }),
                v(this, We).config.onMutate && await v(this, We).config.onMutate(t, this, r);
                const F = await ((o = (a = this.options).onMutate) == null ? void 0 : o.call(a, t, r));
                F !== this.state.context && Y(this, tn, Fn).call(this, {
                    type: "pending",
                    context: F,
                    variables: t,
                    isPaused: s
                })
            }
            const R = await v(this, Fr).start();
            return await ((c = (u = v(this, We).config).onSuccess) == null ? void 0 : c.call(u, R, t, this.state.context, this, r)),
            await ((f = (d = this.options).onSuccess) == null ? void 0 : f.call(d, R, t, this.state.context, r)),
            await ((y = (m = v(this, We).config).onSettled) == null ? void 0 : y.call(m, R, null, this.state.variables, this.state.context, this, r)),
            await ((w = (S = this.options).onSettled) == null ? void 0 : w.call(S, R, null, t, this.state.context, r)),
            Y(this, tn, Fn).call(this, {
                type: "success",
                data: R
            }),
            R
        } catch (R) {
            try {
                await ((p = (b = v(this, We).config).onError) == null ? void 0 : p.call(b, R, t, this.state.context, this, r))
            } catch (F) {
                Promise.reject(F)
            }
            try {
                await ((g = (h = this.options).onError) == null ? void 0 : g.call(h, R, t, this.state.context, r))
            } catch (F) {
                Promise.reject(F)
            }
            try {
                await ((P = (k = v(this, We).config).onSettled) == null ? void 0 : P.call(k, void 0, R, this.state.variables, this.state.context, this, r))
            } catch (F) {
                Promise.reject(F)
            }
            try {
                await ((j = (O = this.options).onSettled) == null ? void 0 : j.call(O, void 0, R, t, this.state.context, r))
            } catch (F) {
                Promise.reject(F)
            }
            throw Y(this, tn, Fn).call(this, {
                type: "error",
                error: R
            }),
            R
        } finally {
            v(this, We).runNext(this)
        }
    }
}
,
Zs = new WeakMap,
en = new WeakMap,
We = new WeakMap,
Fr = new WeakMap,
tn = new WeakSet,
Fn = function(t) {
    const n = r => {
        switch (t.type) {
        case "failed":
            return {
                ...r,
                failureCount: t.failureCount,
                failureReason: t.error
            };
        case "pause":
            return {
                ...r,
                isPaused: !0
            };
        case "continue":
            return {
                ...r,
                isPaused: !1
            };
        case "pending":
            return {
                ...r,
                context: t.context,
                data: void 0,
                failureCount: 0,
                failureReason: null,
                error: null,
                isPaused: t.isPaused,
                status: "pending",
                variables: t.variables,
                submittedAt: Date.now()
            };
        case "success":
            return {
                ...r,
                data: t.data,
                failureCount: 0,
                failureReason: null,
                error: null,
                status: "success",
                isPaused: !1
            };
        case "error":
            return {
                ...r,
                data: void 0,
                error: t.error,
                failureCount: r.failureCount + 1,
                failureReason: t.error,
                isPaused: !1,
                status: "error"
            }
        }
    }
    ;
    this.state = n(this.state),
    Le.batch( () => {
        v(this, en).forEach(r => {
            r.onMutationUpdate(t)
        }
        ),
        v(this, We).notify({
            mutation: this,
            type: "updated",
            action: t
        })
    }
    )
}
,
gh);
function Km() {
    return {
        context: void 0,
        data: void 0,
        error: null,
        failureCount: 0,
        failureReason: null,
        isPaused: !1,
        status: "idle",
        variables: void 0,
        submittedAt: 0
    }
}
var hn, Ht, el, xh, Dx = (xh = class extends qi {
    constructor(t={}) {
        super();
        B(this, hn);
        B(this, Ht);
        B(this, el);
        this.config = t,
        M(this, hn, new Set),
        M(this, Ht, new Map),
        M(this, el, 0)
    }
    build(t, n, r) {
        const i = new Ix({
            client: t,
            mutationCache: this,
            mutationId: ++gl(this, el)._,
            options: t.defaultMutationOptions(n),
            state: r
        });
        return this.add(i),
        i
    }
    add(t) {
        v(this, hn).add(t);
        const n = Ml(t);
        if (typeof n == "string") {
            const r = v(this, Ht).get(n);
            r ? r.push(t) : v(this, Ht).set(n, [t])
        }
        this.notify({
            type: "added",
            mutation: t
        })
    }
    remove(t) {
        if (v(this, hn).delete(t)) {
            const n = Ml(t);
            if (typeof n == "string") {
                const r = v(this, Ht).get(n);
                if (r)
                    if (r.length > 1) {
                        const i = r.indexOf(t);
                        i !== -1 && r.splice(i, 1)
                    } else
                        r[0] === t && v(this, Ht).delete(n)
            }
        }
        this.notify({
            type: "removed",
            mutation: t
        })
    }
    canRun(t) {
        const n = Ml(t);
        if (typeof n == "string") {
            const r = v(this, Ht).get(n)
              , i = r == null ? void 0 : r.find(s => s.state.status === "pending");
            return !i || i === t
        } else
            return !0
    }
    runNext(t) {
        var r;
        const n = Ml(t);
        if (typeof n == "string") {
            const i = (r = v(this, Ht).get(n)) == null ? void 0 : r.find(s => s !== t && s.state.isPaused);
            return (i == null ? void 0 : i.continue()) ?? Promise.resolve()
        } else
            return Promise.resolve()
    }
    clear() {
        Le.batch( () => {
            v(this, hn).forEach(t => {
                this.notify({
                    type: "removed",
                    mutation: t
                })
            }
            ),
            v(this, hn).clear(),
            v(this, Ht).clear()
        }
        )
    }
    getAll() {
        return Array.from(v(this, hn))
    }
    find(t) {
        const n = {
            exact: !0,
            ...t
        };
        return this.getAll().find(r => Of(n, r))
    }
    findAll(t={}) {
        return this.getAll().filter(n => Of(t, n))
    }
    notify(t) {
        Le.batch( () => {
            this.listeners.forEach(n => {
                n(t)
            }
            )
        }
        )
    }
    resumePausedMutations() {
        const t = this.getAll().filter(n => n.state.isPaused);
        return Le.batch( () => Promise.all(t.map(n => n.continue().catch(et))))
    }
}
,
hn = new WeakMap,
Ht = new WeakMap,
el = new WeakMap,
xh);
function Ml(e) {
    var t;
    return (t = e.options.scope) == null ? void 0 : t.id
}
var pn, Gn, ot, mn, wn, Xl, Bu, wh, Mx = (wh = class extends qi {
    constructor(n, r) {
        super();
        B(this, wn);
        B(this, pn);
        B(this, Gn);
        B(this, ot);
        B(this, mn);
        M(this, pn, n),
        this.setOptions(r),
        this.bindMethods(),
        Y(this, wn, Xl).call(this)
    }
    bindMethods() {
        this.mutate = this.mutate.bind(this),
        this.reset = this.reset.bind(this)
    }
    setOptions(n) {
        var i;
        const r = this.options;
        this.options = v(this, pn).defaultMutationOptions(n),
        Ea(this.options, r) || v(this, pn).getMutationCache().notify({
            type: "observerOptionsUpdated",
            mutation: v(this, ot),
            observer: this
        }),
        r != null && r.mutationKey && this.options.mutationKey && Wr(r.mutationKey) !== Wr(this.options.mutationKey) ? this.reset() : ((i = v(this, ot)) == null ? void 0 : i.state.status) === "pending" && v(this, ot).setOptions(this.options)
    }
    onUnsubscribe() {
        var n;
        this.hasListeners() || (n = v(this, ot)) == null || n.removeObserver(this)
    }
    onMutationUpdate(n) {
        Y(this, wn, Xl).call(this),
        Y(this, wn, Bu).call(this, n)
    }
    getCurrentResult() {
        return v(this, Gn)
    }
    reset() {
        var n;
        (n = v(this, ot)) == null || n.removeObserver(this),
        M(this, ot, void 0),
        Y(this, wn, Xl).call(this),
        Y(this, wn, Bu).call(this)
    }
    mutate(n, r) {
        var i;
        return M(this, mn, r),
        (i = v(this, ot)) == null || i.removeObserver(this),
        M(this, ot, v(this, pn).getMutationCache().build(v(this, pn), this.options)),
        v(this, ot).addObserver(this),
        v(this, ot).execute(n)
    }
}
,
pn = new WeakMap,
Gn = new WeakMap,
ot = new WeakMap,
mn = new WeakMap,
wn = new WeakSet,
Xl = function() {
    var r;
    const n = ((r = v(this, ot)) == null ? void 0 : r.state) ?? Km();
    M(this, Gn, {
        ...n,
        isPending: n.status === "pending",
        isSuccess: n.status === "success",
        isError: n.status === "error",
        isIdle: n.status === "idle",
        mutate: this.mutate,
        reset: this.reset
    })
}
,
Bu = function(n) {
    Le.batch( () => {
        var r, i, s, a, o, u, c, d;
        if (v(this, mn) && this.hasListeners()) {
            const f = v(this, Gn).variables
              , m = v(this, Gn).context
              , y = {
                client: v(this, pn),
                meta: this.options.meta,
                mutationKey: this.options.mutationKey
            };
            if ((n == null ? void 0 : n.type) === "success") {
                try {
                    (i = (r = v(this, mn)).onSuccess) == null || i.call(r, n.data, f, m, y)
                } catch (S) {
                    Promise.reject(S)
                }
                try {
                    (a = (s = v(this, mn)).onSettled) == null || a.call(s, n.data, null, f, m, y)
                } catch (S) {
                    Promise.reject(S)
                }
            } else if ((n == null ? void 0 : n.type) === "error") {
                try {
                    (u = (o = v(this, mn)).onError) == null || u.call(o, n.error, f, m, y)
                } catch (S) {
                    Promise.reject(S)
                }
                try {
                    (d = (c = v(this, mn)).onSettled) == null || d.call(c, void 0, n.error, f, m, y)
                } catch (S) {
                    Promise.reject(S)
                }
            }
        }
        this.listeners.forEach(f => {
            f(v(this, Gn))
        }
        )
    }
    )
}
,
wh), nn, jh, Fx = (jh = class extends qi {
    constructor(t={}) {
        super();
        B(this, nn);
        this.config = t,
        M(this, nn, new Map)
    }
    build(t, n, r) {
        const i = n.queryKey
          , s = n.queryHash ?? qc(i, n);
        let a = this.get(s);
        return a || (a = new Tx({
            client: t,
            queryKey: i,
            queryHash: s,
            options: t.defaultQueryOptions(n),
            state: r,
            defaultOptions: t.getQueryDefaults(i)
        }),
        this.add(a)),
        a
    }
    add(t) {
        v(this, nn).has(t.queryHash) || (v(this, nn).set(t.queryHash, t),
        this.notify({
            type: "added",
            query: t
        }))
    }
    remove(t) {
        const n = v(this, nn).get(t.queryHash);
        n && (t.destroy(),
        n === t && v(this, nn).delete(t.queryHash),
        this.notify({
            type: "removed",
            query: t
        }))
    }
    clear() {
        Le.batch( () => {
            this.getAll().forEach(t => {
                this.remove(t)
            }
            )
        }
        )
    }
    get(t) {
        return v(this, nn).get(t)
    }
    getAll() {
        return [...v(this, nn).values()]
    }
    find(t) {
        const n = {
            exact: !0,
            ...t
        };
        return this.getAll().find(r => Lf(n, r))
    }
    findAll(t={}) {
        const n = this.getAll();
        return Object.keys(t).length > 0 ? n.filter(r => Lf(t, r)) : n
    }
    notify(t) {
        Le.batch( () => {
            this.listeners.forEach(n => {
                n(t)
            }
            )
        }
        )
    }
    onFocus() {
        Le.batch( () => {
            this.getAll().forEach(t => {
                t.onFocus()
            }
            )
        }
        )
    }
    onOnline() {
        Le.batch( () => {
            this.getAll().forEach(t => {
                t.onOnline()
            }
            )
        }
        )
    }
}
,
nn = new WeakMap,
jh), Ee, qn, Yn, Li, Oi, Xn, Ii, Di, Sh, Ax = (Sh = class {
    constructor(e={}) {
        B(this, Ee);
        B(this, qn);
        B(this, Yn);
        B(this, Li);
        B(this, Oi);
        B(this, Xn);
        B(this, Ii);
        B(this, Di);
        M(this, Ee, e.queryCache || new Fx),
        M(this, qn, e.mutationCache || new Dx),
        M(this, Yn, e.defaultOptions || {}),
        M(this, Li, new Map),
        M(this, Oi, new Map),
        M(this, Xn, 0)
    }
    mount() {
        gl(this, Xn)._++,
        v(this, Xn) === 1 && (M(this, Ii, Gc.subscribe(async e => {
            e && (await this.resumePausedMutations(),
            v(this, Ee).onFocus())
        }
        )),
        M(this, Di, Na.subscribe(async e => {
            e && (await this.resumePausedMutations(),
            v(this, Ee).onOnline())
        }
        )))
    }
    unmount() {
        var e, t;
        gl(this, Xn)._--,
        v(this, Xn) === 0 && ((e = v(this, Ii)) == null || e.call(this),
        M(this, Ii, void 0),
        (t = v(this, Di)) == null || t.call(this),
        M(this, Di, void 0))
    }
    isFetching(e) {
        return v(this, Ee).findAll({
            ...e,
            fetchStatus: "fetching"
        }).length
    }
    isMutating(e) {
        return v(this, qn).findAll({
            ...e,
            status: "pending"
        }).length
    }
    getQueryData(e) {
        var n;
        const t = this.defaultQueryOptions({
            queryKey: e
        });
        return (n = v(this, Ee).get(t.queryHash)) == null ? void 0 : n.state.data
    }
    ensureQueryData(e) {
        const t = this.defaultQueryOptions(e)
          , n = v(this, Ee).build(this, t)
          , r = n.state.data;
        return r === void 0 ? this.fetchQuery(e) : (e.revalidateIfStale && n.isStaleByTime(ur(t.staleTime, n)) && this.prefetchQuery(t),
        Promise.resolve(r))
    }
    getQueriesData(e) {
        return v(this, Ee).findAll(e).map( ({queryKey: t, state: n}) => {
            const r = n.data;
            return [t, r]
        }
        )
    }
    setQueryData(e, t, n) {
        const r = this.defaultQueryOptions({
            queryKey: e
        })
          , i = v(this, Ee).get(r.queryHash)
          , s = i == null ? void 0 : i.state.data
          , a = gx(t, s);
        if (a !== void 0)
            return v(this, Ee).build(this, r).setData(a, {
                ...n,
                manual: !0
            })
    }
    setQueriesData(e, t, n) {
        return Le.batch( () => v(this, Ee).findAll(e).map( ({queryKey: r}) => [r, this.setQueryData(r, t, n)]))
    }
    getQueryState(e) {
        var n;
        const t = this.defaultQueryOptions({
            queryKey: e
        });
        return (n = v(this, Ee).get(t.queryHash)) == null ? void 0 : n.state
    }
    removeQueries(e) {
        const t = v(this, Ee);
        Le.batch( () => {
            t.findAll(e).forEach(n => {
                t.remove(n)
            }
            )
        }
        )
    }
    resetQueries(e, t) {
        const n = v(this, Ee);
        return Le.batch( () => (n.findAll(e).forEach(r => {
            r.reset()
        }
        ),
        this.refetchQueries({
            type: "active",
            ...e
        }, t)))
    }
    cancelQueries(e, t={}) {
        const n = {
            revert: !0,
            ...t
        }
          , r = Le.batch( () => v(this, Ee).findAll(e).map(i => i.cancel(n)));
        return Promise.all(r).then(et).catch(et)
    }
    invalidateQueries(e, t={}) {
        return Le.batch( () => (v(this, Ee).findAll(e).forEach(n => {
            n.invalidate()
        }
        ),
        (e == null ? void 0 : e.refetchType) === "none" ? Promise.resolve() : this.refetchQueries({
            ...e,
            type: (e == null ? void 0 : e.refetchType) ?? (e == null ? void 0 : e.type) ?? "active"
        }, t)))
    }
    refetchQueries(e, t={}) {
        const n = {
            ...t,
            cancelRefetch: t.cancelRefetch ?? !0
        }
          , r = Le.batch( () => v(this, Ee).findAll(e).filter(i => !i.isDisabled() && !i.isStatic()).map(i => {
            let s = i.fetch(void 0, n);
            return n.throwOnError || (s = s.catch(et)),
            i.state.fetchStatus === "paused" ? Promise.resolve() : s
        }
        ));
        return Promise.all(r).then(et)
    }
    fetchQuery(e) {
        const t = this.defaultQueryOptions(e);
        t.retry === void 0 && (t.retry = !1);
        const n = v(this, Ee).build(this, t);
        return n.isStaleByTime(ur(t.staleTime, n)) ? n.fetch(t) : Promise.resolve(n.state.data)
    }
    prefetchQuery(e) {
        return this.fetchQuery(e).then(et).catch(et)
    }
    fetchInfiniteQuery(e) {
        return e._type = "infinite",
        this.fetchQuery(e)
    }
    prefetchInfiniteQuery(e) {
        return this.fetchInfiniteQuery(e).then(et).catch(et)
    }
    ensureInfiniteQueryData(e) {
        return e._type = "infinite",
        this.ensureQueryData(e)
    }
    resumePausedMutations() {
        return Na.isOnline() ? v(this, qn).resumePausedMutations() : Promise.resolve()
    }
    getQueryCache() {
        return v(this, Ee)
    }
    getMutationCache() {
        return v(this, qn)
    }
    getDefaultOptions() {
        return v(this, Yn)
    }
    setDefaultOptions(e) {
        M(this, Yn, e)
    }
    setQueryDefaults(e, t) {
        v(this, Li).set(Wr(e), {
            queryKey: e,
            defaultOptions: t
        })
    }
    getQueryDefaults(e) {
        const t = [...v(this, Li).values()]
          , n = {};
        return t.forEach(r => {
            Ws(e, r.queryKey) && Object.assign(n, r.defaultOptions)
        }
        ),
        n
    }
    setMutationDefaults(e, t) {
        v(this, Oi).set(Wr(e), {
            mutationKey: e,
            defaultOptions: t
        })
    }
    getMutationDefaults(e) {
        const t = [...v(this, Oi).values()]
          , n = {};
        return t.forEach(r => {
            Ws(e, r.mutationKey) && Object.assign(n, r.defaultOptions)
        }
        ),
        n
    }
    defaultQueryOptions(e) {
        if (e._defaulted)
            return e;
        const t = {
            ...v(this, Yn).queries,
            ...this.getQueryDefaults(e.queryKey),
            ...e,
            _defaulted: !0
        };
        return t.queryHash || (t.queryHash = qc(t.queryKey, t)),
        t.refetchOnReconnect === void 0 && (t.refetchOnReconnect = t.networkMode !== "always"),
        t.throwOnError === void 0 && (t.throwOnError = !!t.suspense),
        !t.networkMode && t.persister && (t.networkMode = "offlineFirst"),
        t.queryFn === Yc && (t.enabled = !1),
        t
    }
    defaultMutationOptions(e) {
        return e != null && e._defaulted ? e : {
            ...v(this, Yn).mutations,
            ...(e == null ? void 0 : e.mutationKey) && this.getMutationDefaults(e.mutationKey),
            ...e,
            _defaulted: !0
        }
    }
    clear() {
        v(this, Ee).clear(),
        v(this, qn).clear()
    }
}
,
Ee = new WeakMap,
qn = new WeakMap,
Yn = new WeakMap,
Li = new WeakMap,
Oi = new WeakMap,
Xn = new WeakMap,
Ii = new WeakMap,
Di = new WeakMap,
Sh), Gm = N.createContext(void 0), Ka = e => {
    const t = N.useContext(Gm);
    if (!t)
        throw new Error("No QueryClient set, use QueryClientProvider to set one");
    return t
}
, zx = ({client: e, children: t}) => (N.useEffect( () => (e.mount(),
() => {
    e.unmount()
}
), [e]),
l.jsx(Gm.Provider, {
    value: e,
    children: t
})), qm = N.createContext(!1), Ux = () => N.useContext(qm);
qm.Provider;
function Qx() {
    let e = !1;
    return {
        clearReset: () => {
            e = !1
        }
        ,
        reset: () => {
            e = !0
        }
        ,
        isReset: () => e
    }
}
var Hx = N.createContext(Qx())
  , Bx = () => N.useContext(Hx)
  , $x = (e, t, n) => {
    const r = n != null && n.state.error && typeof e.throwOnError == "function" ? Xc(e.throwOnError, [n.state.error, n]) : e.throwOnError;
    (e.suspense || e.experimental_prefetchInRender || r) && (t.isReset() || (e.retryOnMount = !1))
}
  , Wx = e => {
    N.useEffect( () => {
        e.clearReset()
    }
    , [e])
}
  , Vx = ({result: e, errorResetBoundary: t, throwOnError: n, query: r, suspense: i}) => e.isError && !t.isReset() && !e.isFetching && r && (i && e.data === void 0 || Xc(n, [e.error, r]))
  , Kx = e => {
    if (e.suspense) {
        const n = i => i === "static" ? i : Math.max(i ?? 1e3, 1e3)
          , r = e.staleTime;
        e.staleTime = typeof r == "function" ? (...i) => n(r(...i)) : n(r),
        typeof e.gcTime == "number" && (e.gcTime = Math.max(e.gcTime, 1e3))
    }
}
  , Gx = (e, t) => e.isLoading && e.isFetching && !t
  , qx = (e, t) => (e == null ? void 0 : e.suspense) && t.isPending
  , Qf = (e, t, n) => t.fetchOptimistic(e).catch( () => {
    n.clearReset()
}
);
function Yx(e, t, n) {
    var m, y, S, w;
    const r = Ux()
      , i = Bx()
      , s = Ka()
      , a = s.defaultQueryOptions(e);
    (y = (m = s.getDefaultOptions().queries) == null ? void 0 : m._experimental_beforeQuery) == null || y.call(m, a);
    const o = s.getQueryCache().get(a.queryHash);
    a._optimisticResults = r ? "isRestoring" : "optimistic",
    Kx(a),
    $x(a, i, o),
    Wx(i);
    const u = !s.getQueryCache().get(a.queryHash)
      , [c] = N.useState( () => new t(s,a))
      , d = c.getOptimisticResult(a)
      , f = !r && e.subscribed !== !1;
    if (N.useSyncExternalStore(N.useCallback(b => {
        const p = f ? c.subscribe(Le.batchCalls(b)) : et;
        return c.updateResult(),
        p
    }
    , [c, f]), () => c.getCurrentResult(), () => c.getCurrentResult()),
    N.useEffect( () => {
        c.setOptions(a)
    }
    , [a, c]),
    qx(a, d))
        throw Qf(a, c, i);
    if (Vx({
        result: d,
        errorResetBoundary: i,
        throwOnError: a.throwOnError,
        query: o,
        suspense: a.suspense
    }))
        throw d.error;
    if ((w = (S = s.getDefaultOptions().queries) == null ? void 0 : S._experimental_afterQuery) == null || w.call(S, a, d),
    a.experimental_prefetchInRender && !Vs.isServer() && Gx(d, r)) {
        const b = u ? Qf(a, c, i) : o == null ? void 0 : o.promise;
        b == null || b.catch(et).finally( () => {
            c.updateResult()
        }
        )
    }
    return a.notifyOnChangeProps ? d : c.trackResult(d)
}
function nt(e, t) {
    return Yx(e, _x)
}
function ba(e, t) {
    const n = Ka()
      , [r] = N.useState( () => new Mx(n,e));
    N.useEffect( () => {
        r.setOptions(e)
    }
    , [r, e]);
    const i = N.useSyncExternalStore(N.useCallback(a => r.subscribe(Le.batchCalls(a)), [r]), () => r.getCurrentResult(), () => r.getCurrentResult())
      , s = N.useCallback( (a, o) => {
        r.mutate(a, o).catch(et)
    }
    , [r]);
    if (i.error && Xc(r.options.throwOnError, [i.error]))
        throw i.error;
    return {
        ...i,
        mutate: s,
        mutateAsync: i.mutate
    }
}
/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function pe() {
    return pe = Object.assign ? Object.assign.bind() : function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }
    ,
    pe.apply(this, arguments)
}
var Ce;
(function(e) {
    e.Pop = "POP",
    e.Push = "PUSH",
    e.Replace = "REPLACE"
}
)(Ce || (Ce = {}));
const Hf = "popstate";
function Xx(e) {
    e === void 0 && (e = {});
    function t(r, i) {
        let {pathname: s, search: a, hash: o} = r.location;
        return Ks("", {
            pathname: s,
            search: a,
            hash: o
        }, i.state && i.state.usr || null, i.state && i.state.key || "default")
    }
    function n(r, i) {
        return typeof i == "string" ? i : Kr(i)
    }
    return Zx(t, n, null, e)
}
function G(e, t) {
    if (e === !1 || e === null || typeof e > "u")
        throw new Error(t)
}
function Vr(e, t) {
    if (!e) {
        typeof console < "u" && console.warn(t);
        try {
            throw new Error(t)
        } catch {}
    }
}
function Jx() {
    return Math.random().toString(36).substr(2, 8)
}
function Bf(e, t) {
    return {
        usr: e.state,
        key: e.key,
        idx: t
    }
}
function Ks(e, t, n, r) {
    return n === void 0 && (n = null),
    pe({
        pathname: typeof e == "string" ? e : e.pathname,
        search: "",
        hash: ""
    }, typeof t == "string" ? Pn(t) : t, {
        state: n,
        key: t && t.key || r || Jx()
    })
}
function Kr(e) {
    let {pathname: t="/", search: n="", hash: r=""} = e;
    return n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
    r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r),
    t
}
function Pn(e) {
    let t = {};
    if (e) {
        let n = e.indexOf("#");
        n >= 0 && (t.hash = e.substr(n),
        e = e.substr(0, n));
        let r = e.indexOf("?");
        r >= 0 && (t.search = e.substr(r),
        e = e.substr(0, r)),
        e && (t.pathname = e)
    }
    return t
}
function Zx(e, t, n, r) {
    r === void 0 && (r = {});
    let {window: i=document.defaultView, v5Compat: s=!1} = r
      , a = i.history
      , o = Ce.Pop
      , u = null
      , c = d();
    c == null && (c = 0,
    a.replaceState(pe({}, a.state, {
        idx: c
    }), ""));
    function d() {
        return (a.state || {
            idx: null
        }).idx
    }
    function f() {
        o = Ce.Pop;
        let b = d()
          , p = b == null ? null : b - c;
        c = b,
        u && u({
            action: o,
            location: w.location,
            delta: p
        })
    }
    function m(b, p) {
        o = Ce.Push;
        let h = Ks(w.location, b, p);
        c = d() + 1;
        let g = Bf(h, c)
          , k = w.createHref(h);
        try {
            a.pushState(g, "", k)
        } catch (P) {
            if (P instanceof DOMException && P.name === "DataCloneError")
                throw P;
            i.location.assign(k)
        }
        s && u && u({
            action: o,
            location: w.location,
            delta: 1
        })
    }
    function y(b, p) {
        o = Ce.Replace;
        let h = Ks(w.location, b, p);
        c = d();
        let g = Bf(h, c)
          , k = w.createHref(h);
        a.replaceState(g, "", k),
        s && u && u({
            action: o,
            location: w.location,
            delta: 0
        })
    }
    function S(b) {
        let p = i.location.origin !== "null" ? i.location.origin : i.location.href
          , h = typeof b == "string" ? b : Kr(b);
        return h = h.replace(/ $/, "%20"),
        G(p, "No window.location.(origin|href) available to create URL for href: " + h),
        new URL(h,p)
    }
    let w = {
        get action() {
            return o
        },
        get location() {
            return e(i, a)
        },
        listen(b) {
            if (u)
                throw new Error("A history only accepts one active listener");
            return i.addEventListener(Hf, f),
            u = b,
            () => {
                i.removeEventListener(Hf, f),
                u = null
            }
        },
        createHref(b) {
            return t(i, b)
        },
        createURL: S,
        encodeLocation(b) {
            let p = S(b);
            return {
                pathname: p.pathname,
                search: p.search,
                hash: p.hash
            }
        },
        push: m,
        replace: y,
        go(b) {
            return a.go(b)
        }
    };
    return w
}
var le;
(function(e) {
    e.data = "data",
    e.deferred = "deferred",
    e.redirect = "redirect",
    e.error = "error"
}
)(le || (le = {}));
const e0 = new Set(["lazy", "caseSensitive", "path", "id", "index", "children"]);
function t0(e) {
    return e.index === !0
}
function Ca(e, t, n, r) {
    return n === void 0 && (n = []),
    r === void 0 && (r = {}),
    e.map( (i, s) => {
        let a = [...n, String(s)]
          , o = typeof i.id == "string" ? i.id : a.join("-");
        if (G(i.index !== !0 || !i.children, "Cannot specify children on an index route"),
        G(!r[o], 'Found a route id collision on id "' + o + `".  Route id's must be globally unique within Data Router usages`),
        t0(i)) {
            let u = pe({}, i, t(i), {
                id: o
            });
            return r[o] = u,
            u
        } else {
            let u = pe({}, i, t(i), {
                id: o,
                children: void 0
            });
            return r[o] = u,
            i.children && (u.children = Ca(i.children, t, a, r)),
            u
        }
    }
    )
}
function Sr(e, t, n) {
    return n === void 0 && (n = "/"),
    Jl(e, t, n, !1)
}
function Jl(e, t, n, r) {
    let i = typeof t == "string" ? Pn(t) : t
      , s = Nn(i.pathname || "/", n);
    if (s == null)
        return null;
    let a = Ym(e);
    r0(a);
    let o = null;
    for (let u = 0; o == null && u < a.length; ++u) {
        let c = p0(s);
        o = f0(a[u], c, r)
    }
    return o
}
function n0(e, t) {
    let {route: n, pathname: r, params: i} = e;
    return {
        id: n.id,
        pathname: r,
        params: i,
        data: t[n.id],
        handle: n.handle
    }
}
function Ym(e, t, n, r) {
    t === void 0 && (t = []),
    n === void 0 && (n = []),
    r === void 0 && (r = "");
    let i = (s, a, o) => {
        let u = {
            relativePath: o === void 0 ? s.path || "" : o,
            caseSensitive: s.caseSensitive === !0,
            childrenIndex: a,
            route: s
        };
        u.relativePath.startsWith("/") && (G(u.relativePath.startsWith(r), 'Absolute route path "' + u.relativePath + '" nested under path ' + ('"' + r + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."),
        u.relativePath = u.relativePath.slice(r.length));
        let c = xn([r, u.relativePath])
          , d = n.concat(u);
        s.children && s.children.length > 0 && (G(s.index !== !0, "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + c + '".')),
        Ym(s.children, t, d, c)),
        !(s.path == null && !s.index) && t.push({
            path: c,
            score: c0(c, s.index),
            routesMeta: d
        })
    }
    ;
    return e.forEach( (s, a) => {
        var o;
        if (s.path === "" || !((o = s.path) != null && o.includes("?")))
            i(s, a);
        else
            for (let u of Xm(s.path))
                i(s, a, u)
    }
    ),
    t
}
function Xm(e) {
    let t = e.split("/");
    if (t.length === 0)
        return [];
    let[n,...r] = t
      , i = n.endsWith("?")
      , s = n.replace(/\?$/, "");
    if (r.length === 0)
        return i ? [s, ""] : [s];
    let a = Xm(r.join("/"))
      , o = [];
    return o.push(...a.map(u => u === "" ? s : [s, u].join("/"))),
    i && o.push(...a),
    o.map(u => e.startsWith("/") && u === "" ? "/" : u)
}
function r0(e) {
    e.sort( (t, n) => t.score !== n.score ? n.score - t.score : d0(t.routesMeta.map(r => r.childrenIndex), n.routesMeta.map(r => r.childrenIndex)))
}
const i0 = /^:[\w-]+$/
  , s0 = 3
  , l0 = 2
  , a0 = 1
  , o0 = 10
  , u0 = -2
  , $f = e => e === "*";
function c0(e, t) {
    let n = e.split("/")
      , r = n.length;
    return n.some($f) && (r += u0),
    t && (r += l0),
    n.filter(i => !$f(i)).reduce( (i, s) => i + (i0.test(s) ? s0 : s === "" ? a0 : o0), r)
}
function d0(e, t) {
    return e.length === t.length && e.slice(0, -1).every( (r, i) => r === t[i]) ? e[e.length - 1] - t[t.length - 1] : 0
}
function f0(e, t, n) {
    n === void 0 && (n = !1);
    let {routesMeta: r} = e
      , i = {}
      , s = "/"
      , a = [];
    for (let o = 0; o < r.length; ++o) {
        let u = r[o]
          , c = o === r.length - 1
          , d = s === "/" ? t : t.slice(s.length) || "/"
          , f = Ra({
            path: u.relativePath,
            caseSensitive: u.caseSensitive,
            end: c
        }, d)
          , m = u.route;
        if (!f && c && n && !r[r.length - 1].route.index && (f = Ra({
            path: u.relativePath,
            caseSensitive: u.caseSensitive,
            end: !1
        }, d)),
        !f)
            return null;
        Object.assign(i, f.params),
        a.push({
            params: i,
            pathname: xn([s, f.pathname]),
            pathnameBase: g0(xn([s, f.pathnameBase])),
            route: m
        }),
        f.pathnameBase !== "/" && (s = xn([s, f.pathnameBase]))
    }
    return a
}
function Ra(e, t) {
    typeof e == "string" && (e = {
        path: e,
        caseSensitive: !1,
        end: !0
    });
    let[n,r] = h0(e.path, e.caseSensitive, e.end)
      , i = t.match(n);
    if (!i)
        return null;
    let s = i[0]
      , a = s.replace(/(.)\/+$/, "$1")
      , o = i.slice(1);
    return {
        params: r.reduce( (c, d, f) => {
            let {paramName: m, isOptional: y} = d;
            if (m === "*") {
                let w = o[f] || "";
                a = s.slice(0, s.length - w.length).replace(/(.)\/+$/, "$1")
            }
            const S = o[f];
            return y && !S ? c[m] = void 0 : c[m] = (S || "").replace(/%2F/g, "/"),
            c
        }
        , {}),
        pathname: s,
        pathnameBase: a,
        pattern: e
    }
}
function h0(e, t, n) {
    t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    Vr(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
    let r = []
      , i = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (a, o, u) => (r.push({
        paramName: o,
        isOptional: u != null
    }),
    u ? "/?([^\\/]+)?" : "/([^\\/]+)"));
    return e.endsWith("*") ? (r.push({
        paramName: "*"
    }),
    i += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : n ? i += "\\/*$" : e !== "" && e !== "/" && (i += "(?:(?=\\/|$))"),
    [new RegExp(i,t ? void 0 : "i"), r]
}
function p0(e) {
    try {
        return e.split("/").map(t => decodeURIComponent(t).replace(/\//g, "%2F")).join("/")
    } catch (t) {
        return Vr(!1, 'The URL path "' + e + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + t + ").")),
        e
    }
}
function Nn(e, t) {
    if (t === "/")
        return e;
    if (!e.toLowerCase().startsWith(t.toLowerCase()))
        return null;
    let n = t.endsWith("/") ? t.length - 1 : t.length
      , r = e.charAt(n);
    return r && r !== "/" ? null : e.slice(n) || "/"
}
const m0 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i
  , y0 = e => m0.test(e);
function v0(e, t) {
    t === void 0 && (t = "/");
    let {pathname: n, search: r="", hash: i=""} = typeof e == "string" ? Pn(e) : e, s;
    if (n)
        if (y0(n))
            s = n;
        else {
            if (n.includes("//")) {
                let a = n;
                n = n.replace(/\/\/+/g, "/"),
                Vr(!1, "Pathnames cannot have embedded double slashes - normalizing " + (a + " -> " + n))
            }
            n.startsWith("/") ? s = Wf(n.substring(1), "/") : s = Wf(n, t)
        }
    else
        s = t;
    return {
        pathname: s,
        search: x0(r),
        hash: w0(i)
    }
}
function Wf(e, t) {
    let n = t.replace(/\/+$/, "").split("/");
    return e.split("/").forEach(i => {
        i === ".." ? n.length > 1 && n.pop() : i !== "." && n.push(i)
    }
    ),
    n.length > 1 ? n.join("/") : "/"
}
function Lo(e, t, n, r) {
    return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(r) + "].  Please separate it out to the ") + ("`to." + n + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.'
}
function Jm(e) {
    return e.filter( (t, n) => n === 0 || t.route.path && t.route.path.length > 0)
}
function Ga(e, t) {
    let n = Jm(e);
    return t ? n.map( (r, i) => i === n.length - 1 ? r.pathname : r.pathnameBase) : n.map(r => r.pathnameBase)
}
function qa(e, t, n, r) {
    r === void 0 && (r = !1);
    let i;
    typeof e == "string" ? i = Pn(e) : (i = pe({}, e),
    G(!i.pathname || !i.pathname.includes("?"), Lo("?", "pathname", "search", i)),
    G(!i.pathname || !i.pathname.includes("#"), Lo("#", "pathname", "hash", i)),
    G(!i.search || !i.search.includes("#"), Lo("#", "search", "hash", i)));
    let s = e === "" || i.pathname === "", a = s ? "/" : i.pathname, o;
    if (a == null)
        o = n;
    else {
        let f = t.length - 1;
        if (!r && a.startsWith("..")) {
            let m = a.split("/");
            for (; m[0] === ".."; )
                m.shift(),
                f -= 1;
            i.pathname = m.join("/")
        }
        o = f >= 0 ? t[f] : "/"
    }
    let u = v0(i, o)
      , c = a && a !== "/" && a.endsWith("/")
      , d = (s || a === ".") && n.endsWith("/");
    return !u.pathname.endsWith("/") && (c || d) && (u.pathname += "/"),
    u
}
const xn = e => e.join("/").replace(/\/\/+/g, "/")
  , g0 = e => e.replace(/\/+$/, "").replace(/^\/*/, "/")
  , x0 = e => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e
  , w0 = e => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e;
class Pa {
    constructor(t, n, r, i) {
        i === void 0 && (i = !1),
        this.status = t,
        this.statusText = n || "",
        this.internal = i,
        r instanceof Error ? (this.data = r.toString(),
        this.error = r) : this.data = r
    }
}
function Gs(e) {
    return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data"in e
}
const Zm = ["post", "put", "patch", "delete"]
  , j0 = new Set(Zm)
  , S0 = ["get", ...Zm]
  , k0 = new Set(S0)
  , E0 = new Set([301, 302, 303, 307, 308])
  , N0 = new Set([307, 308])
  , Oo = {
    state: "idle",
    location: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0
}
  , b0 = {
    state: "idle",
    data: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0
}
  , us = {
    state: "unblocked",
    proceed: void 0,
    reset: void 0,
    location: void 0
}
  , Zc = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i
  , C0 = e => ({
    hasErrorBoundary: !!e.hasErrorBoundary
})
  , ey = "remix-router-transitions";
function R0(e) {
    const t = e.window ? e.window : typeof window < "u" ? window : void 0
      , n = typeof t < "u" && typeof t.document < "u" && typeof t.document.createElement < "u"
      , r = !n;
    G(e.routes.length > 0, "You must provide a non-empty routes array to createRouter");
    let i;
    if (e.mapRouteProperties)
        i = e.mapRouteProperties;
    else if (e.detectErrorBoundary) {
        let x = e.detectErrorBoundary;
        i = E => ({
            hasErrorBoundary: x(E)
        })
    } else
        i = C0;
    let s = {}, a = Ca(e.routes, i, void 0, s), o, u = e.basename || "/", c = e.dataStrategy || L0, d = e.patchRoutesOnNavigation, f = pe({
        v7_fetcherPersist: !1,
        v7_normalizeFormMethod: !1,
        v7_partialHydration: !1,
        v7_prependBasename: !1,
        v7_relativeSplatPath: !1,
        v7_skipActionErrorRevalidation: !1
    }, e.future), m = null, y = new Set, S = null, w = null, b = null, p = e.hydrationData != null, h = Sr(a, e.history.location, u), g = !1, k = null;
    if (h == null && !d) {
        let x = ut(404, {
            pathname: e.history.location.pathname
        })
          , {matches: E, route: C} = nh(a);
        h = E,
        k = {
            [C.id]: x
        }
    }
    h && !e.hydrationData && pl(h, a, e.history.location.pathname).active && (h = null);
    let P;
    if (h)
        if (h.some(x => x.route.lazy))
            P = !1;
        else if (!h.some(x => x.route.loader))
            P = !0;
        else if (f.v7_partialHydration) {
            let x = e.hydrationData ? e.hydrationData.loaderData : null
              , E = e.hydrationData ? e.hydrationData.errors : null;
            if (E) {
                let C = h.findIndex(T => E[T.route.id] !== void 0);
                P = h.slice(0, C + 1).every(T => !Wu(T.route, x, E))
            } else
                P = h.every(C => !Wu(C.route, x, E))
        } else
            P = e.hydrationData != null;
    else if (P = !1,
    h = [],
    f.v7_partialHydration) {
        let x = pl(null, a, e.history.location.pathname);
        x.active && x.matches && (g = !0,
        h = x.matches)
    }
    let O, j = {
        historyAction: e.history.action,
        location: e.history.location,
        matches: h,
        initialized: P,
        navigation: Oo,
        restoreScrollPosition: e.hydrationData != null ? !1 : null,
        preventScrollReset: !1,
        revalidation: "idle",
        loaderData: e.hydrationData && e.hydrationData.loaderData || {},
        actionData: e.hydrationData && e.hydrationData.actionData || null,
        errors: e.hydrationData && e.hydrationData.errors || k,
        fetchers: new Map,
        blockers: new Map
    }, R = Ce.Pop, F = !1, L, X = !1, re = new Map, we = null, je = !1, He = !1, Ln = [], On = new Set, I = new Map, W = 0, K = -1, oe = new Map, ue = new Set, Mt = new Map, gt = new Map, qe = new Set, Ye = new Map, Rt = new Map, dl;
    function Sy() {
        if (m = e.history.listen(x => {
            let {action: E, location: C, delta: T} = x;
            if (dl) {
                dl(),
                dl = void 0;
                return
            }
            Vr(Rt.size === 0 || T != null, "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");
            let D = vd({
                currentLocation: j.location,
                nextLocation: C,
                historyAction: E
            });
            if (D && T != null) {
                let $ = new Promise(V => {
                    dl = V
                }
                );
                e.history.go(T * -1),
                hl(D, {
                    state: "blocked",
                    location: C,
                    proceed() {
                        hl(D, {
                            state: "proceeding",
                            proceed: void 0,
                            reset: void 0,
                            location: C
                        }),
                        $.then( () => e.history.go(T))
                    },
                    reset() {
                        let V = new Map(j.blockers);
                        V.set(D, us),
                        Xe({
                            blockers: V
                        })
                    }
                });
                return
            }
            return yr(E, C)
        }
        ),
        n) {
            V0(t, re);
            let x = () => K0(t, re);
            t.addEventListener("pagehide", x),
            we = () => t.removeEventListener("pagehide", x)
        }
        return j.initialized || yr(Ce.Pop, j.location, {
            initialHydration: !0
        }),
        O
    }
    function ky() {
        m && m(),
        we && we(),
        y.clear(),
        L && L.abort(),
        j.fetchers.forEach( (x, E) => fl(E)),
        j.blockers.forEach( (x, E) => yd(E))
    }
    function Ey(x) {
        return y.add(x),
        () => y.delete(x)
    }
    function Xe(x, E) {
        E === void 0 && (E = {}),
        j = pe({}, j, x);
        let C = []
          , T = [];
        f.v7_fetcherPersist && j.fetchers.forEach( (D, $) => {
            D.state === "idle" && (qe.has($) ? T.push($) : C.push($))
        }
        ),
        qe.forEach(D => {
            !j.fetchers.has(D) && !I.has(D) && T.push(D)
        }
        ),
        [...y].forEach(D => D(j, {
            deletedFetchers: T,
            viewTransitionOpts: E.viewTransitionOpts,
            flushSync: E.flushSync === !0
        })),
        f.v7_fetcherPersist ? (C.forEach(D => j.fetchers.delete(D)),
        T.forEach(D => fl(D))) : T.forEach(D => qe.delete(D))
    }
    function Xr(x, E, C) {
        var T, D;
        let {flushSync: $} = C === void 0 ? {} : C, V = j.actionData != null && j.navigation.formMethod != null && $t(j.navigation.formMethod) && j.navigation.state === "loading" && ((T = x.state) == null ? void 0 : T._isRedirect) !== !0, U;
        E.actionData ? Object.keys(E.actionData).length > 0 ? U = E.actionData : U = null : V ? U = j.actionData : U = null;
        let Q = E.loaderData ? eh(j.loaderData, E.loaderData, E.matches || [], E.errors) : j.loaderData
          , z = j.blockers;
        z.size > 0 && (z = new Map(z),
        z.forEach( (ee, Fe) => z.set(Fe, us)));
        let H = F === !0 || j.navigation.formMethod != null && $t(j.navigation.formMethod) && ((D = x.state) == null ? void 0 : D._isRedirect) !== !0;
        o && (a = o,
        o = void 0),
        je || R === Ce.Pop || (R === Ce.Push ? e.history.push(x, x.state) : R === Ce.Replace && e.history.replace(x, x.state));
        let q;
        if (R === Ce.Pop) {
            let ee = re.get(j.location.pathname);
            ee && ee.has(x.pathname) ? q = {
                currentLocation: j.location,
                nextLocation: x
            } : re.has(x.pathname) && (q = {
                currentLocation: x,
                nextLocation: j.location
            })
        } else if (X) {
            let ee = re.get(j.location.pathname);
            ee ? ee.add(x.pathname) : (ee = new Set([x.pathname]),
            re.set(j.location.pathname, ee)),
            q = {
                currentLocation: j.location,
                nextLocation: x
            }
        }
        Xe(pe({}, E, {
            actionData: U,
            loaderData: Q,
            historyAction: R,
            location: x,
            initialized: !0,
            navigation: Oo,
            revalidation: "idle",
            restoreScrollPosition: xd(x, E.matches || j.matches),
            preventScrollReset: H,
            blockers: z
        }), {
            viewTransitionOpts: q,
            flushSync: $ === !0
        }),
        R = Ce.Pop,
        F = !1,
        X = !1,
        je = !1,
        He = !1,
        Ln = []
    }
    async function ud(x, E) {
        if (typeof x == "number") {
            e.history.go(x);
            return
        }
        let C = $u(j.location, j.matches, u, f.v7_prependBasename, x, f.v7_relativeSplatPath, E == null ? void 0 : E.fromRouteId, E == null ? void 0 : E.relative)
          , {path: T, submission: D, error: $} = Vf(f.v7_normalizeFormMethod, !1, C, E)
          , V = j.location
          , U = Ks(j.location, T, E && E.state);
        U = pe({}, U, e.history.encodeLocation(U));
        let Q = E && E.replace != null ? E.replace : void 0
          , z = Ce.Push;
        Q === !0 ? z = Ce.Replace : Q === !1 || D != null && $t(D.formMethod) && D.formAction === j.location.pathname + j.location.search && (z = Ce.Replace);
        let H = E && "preventScrollReset"in E ? E.preventScrollReset === !0 : void 0
          , q = (E && E.flushSync) === !0
          , ee = vd({
            currentLocation: V,
            nextLocation: U,
            historyAction: z
        });
        if (ee) {
            hl(ee, {
                state: "blocked",
                location: U,
                proceed() {
                    hl(ee, {
                        state: "proceeding",
                        proceed: void 0,
                        reset: void 0,
                        location: U
                    }),
                    ud(x, E)
                },
                reset() {
                    let Fe = new Map(j.blockers);
                    Fe.set(ee, us),
                    Xe({
                        blockers: Fe
                    })
                }
            });
            return
        }
        return await yr(z, U, {
            submission: D,
            pendingError: $,
            preventScrollReset: H,
            replace: E && E.replace,
            enableViewTransition: E && E.viewTransition,
            flushSync: q
        })
    }
    function Ny() {
        if (eo(),
        Xe({
            revalidation: "loading"
        }),
        j.navigation.state !== "submitting") {
            if (j.navigation.state === "idle") {
                yr(j.historyAction, j.location, {
                    startUninterruptedRevalidation: !0
                });
                return
            }
            yr(R || j.historyAction, j.navigation.location, {
                overrideNavigation: j.navigation,
                enableViewTransition: X === !0
            })
        }
    }
    async function yr(x, E, C) {
        L && L.abort(),
        L = null,
        R = x,
        je = (C && C.startUninterruptedRevalidation) === !0,
        Dy(j.location, j.matches),
        F = (C && C.preventScrollReset) === !0,
        X = (C && C.enableViewTransition) === !0;
        let T = o || a
          , D = C && C.overrideNavigation
          , $ = C != null && C.initialHydration && j.matches && j.matches.length > 0 && !g ? j.matches : Sr(T, E, u)
          , V = (C && C.flushSync) === !0;
        if ($ && j.initialized && !He && A0(j.location, E) && !(C && C.submission && $t(C.submission.formMethod))) {
            Xr(E, {
                matches: $
            }, {
                flushSync: V
            });
            return
        }
        let U = pl($, T, E.pathname);
        if (U.active && U.matches && ($ = U.matches),
        !$) {
            let {error: ce, notFoundMatches: ie, route: Se} = to(E.pathname);
            Xr(E, {
                matches: ie,
                loaderData: {},
                errors: {
                    [Se.id]: ce
                }
            }, {
                flushSync: V
            });
            return
        }
        L = new AbortController;
        let Q = ni(e.history, E, L.signal, C && C.submission), z;
        if (C && C.pendingError)
            z = [kr($).route.id, {
                type: le.error,
                error: C.pendingError
            }];
        else if (C && C.submission && $t(C.submission.formMethod)) {
            let ce = await by(Q, E, C.submission, $, U.active, {
                replace: C.replace,
                flushSync: V
            });
            if (ce.shortCircuited)
                return;
            if (ce.pendingActionResult) {
                let[ie,Se] = ce.pendingActionResult;
                if (St(Se) && Gs(Se.error) && Se.error.status === 404) {
                    L = null,
                    Xr(E, {
                        matches: ce.matches,
                        loaderData: {},
                        errors: {
                            [ie]: Se.error
                        }
                    });
                    return
                }
            }
            $ = ce.matches || $,
            z = ce.pendingActionResult,
            D = Io(E, C.submission),
            V = !1,
            U.active = !1,
            Q = ni(e.history, Q.url, Q.signal)
        }
        let {shortCircuited: H, matches: q, loaderData: ee, errors: Fe} = await Cy(Q, E, $, U.active, D, C && C.submission, C && C.fetcherSubmission, C && C.replace, C && C.initialHydration === !0, V, z);
        H || (L = null,
        Xr(E, pe({
            matches: q || $
        }, th(z), {
            loaderData: ee,
            errors: Fe
        })))
    }
    async function by(x, E, C, T, D, $) {
        $ === void 0 && ($ = {}),
        eo();
        let V = $0(E, C);
        if (Xe({
            navigation: V
        }, {
            flushSync: $.flushSync === !0
        }),
        D) {
            let z = await ml(T, E.pathname, x.signal);
            if (z.type === "aborted")
                return {
                    shortCircuited: !0
                };
            if (z.type === "error") {
                let H = kr(z.partialMatches).route.id;
                return {
                    matches: z.partialMatches,
                    pendingActionResult: [H, {
                        type: le.error,
                        error: z.error
                    }]
                }
            } else if (z.matches)
                T = z.matches;
            else {
                let {notFoundMatches: H, error: q, route: ee} = to(E.pathname);
                return {
                    matches: H,
                    pendingActionResult: [ee.id, {
                        type: le.error,
                        error: q
                    }]
                }
            }
        }
        let U, Q = vs(T, E);
        if (!Q.route.action && !Q.route.lazy)
            U = {
                type: le.error,
                error: ut(405, {
                    method: x.method,
                    pathname: E.pathname,
                    routeId: Q.route.id
                })
            };
        else if (U = (await Xi("action", j, x, [Q], T, null))[Q.route.id],
        x.signal.aborted)
            return {
                shortCircuited: !0
            };
        if (Rr(U)) {
            let z;
            return $ && $.replace != null ? z = $.replace : z = Xf(U.response.headers.get("Location"), new URL(x.url), u, e.history) === j.location.pathname + j.location.search,
            await vr(x, U, !0, {
                submission: C,
                replace: z
            }),
            {
                shortCircuited: !0
            }
        }
        if (er(U))
            throw ut(400, {
                type: "defer-action"
            });
        if (St(U)) {
            let z = kr(T, Q.route.id);
            return ($ && $.replace) !== !0 && (R = Ce.Push),
            {
                matches: T,
                pendingActionResult: [z.route.id, U]
            }
        }
        return {
            matches: T,
            pendingActionResult: [Q.route.id, U]
        }
    }
    async function Cy(x, E, C, T, D, $, V, U, Q, z, H) {
        let q = D || Io(E, $)
          , ee = $ || V || ih(q)
          , Fe = !je && (!f.v7_partialHydration || !Q);
        if (T) {
            if (Fe) {
                let ke = cd(H);
                Xe(pe({
                    navigation: q
                }, ke !== void 0 ? {
                    actionData: ke
                } : {}), {
                    flushSync: z
                })
            }
            let ne = await ml(C, E.pathname, x.signal);
            if (ne.type === "aborted")
                return {
                    shortCircuited: !0
                };
            if (ne.type === "error") {
                let ke = kr(ne.partialMatches).route.id;
                return {
                    matches: ne.partialMatches,
                    loaderData: {},
                    errors: {
                        [ke]: ne.error
                    }
                }
            } else if (ne.matches)
                C = ne.matches;
            else {
                let {error: ke, notFoundMatches: Zr, route: es} = to(E.pathname);
                return {
                    matches: Zr,
                    loaderData: {},
                    errors: {
                        [es.id]: ke
                    }
                }
            }
        }
        let ce = o || a
          , [ie,Se] = Gf(e.history, j, C, ee, E, f.v7_partialHydration && Q === !0, f.v7_skipActionErrorRevalidation, He, Ln, On, qe, Mt, ue, ce, u, H);
        if (no(ne => !(C && C.some(ke => ke.route.id === ne)) || ie && ie.some(ke => ke.route.id === ne)),
        K = ++W,
        ie.length === 0 && Se.length === 0) {
            let ne = pd();
            return Xr(E, pe({
                matches: C,
                loaderData: {},
                errors: H && St(H[1]) ? {
                    [H[0]]: H[1].error
                } : null
            }, th(H), ne ? {
                fetchers: new Map(j.fetchers)
            } : {}), {
                flushSync: z
            }),
            {
                shortCircuited: !0
            }
        }
        if (Fe) {
            let ne = {};
            if (!T) {
                ne.navigation = q;
                let ke = cd(H);
                ke !== void 0 && (ne.actionData = ke)
            }
            Se.length > 0 && (ne.fetchers = Ry(Se)),
            Xe(ne, {
                flushSync: z
            })
        }
        Se.forEach(ne => {
            Dn(ne.key),
            ne.controller && I.set(ne.key, ne.controller)
        }
        );
        let Jr = () => Se.forEach(ne => Dn(ne.key));
        L && L.signal.addEventListener("abort", Jr);
        let {loaderResults: Ji, fetcherResults: on} = await dd(j, C, ie, Se, x);
        if (x.signal.aborted)
            return {
                shortCircuited: !0
            };
        L && L.signal.removeEventListener("abort", Jr),
        Se.forEach(ne => I.delete(ne.key));
        let Xt = Fl(Ji);
        if (Xt)
            return await vr(x, Xt.result, !0, {
                replace: U
            }),
            {
                shortCircuited: !0
            };
        if (Xt = Fl(on),
        Xt)
            return ue.add(Xt.key),
            await vr(x, Xt.result, !0, {
                replace: U
            }),
            {
                shortCircuited: !0
            };
        let {loaderData: ro, errors: Zi} = Zf(j, C, Ji, H, Se, on, Ye);
        Ye.forEach( (ne, ke) => {
            ne.subscribe(Zr => {
                (Zr || ne.done) && Ye.delete(ke)
            }
            )
        }
        ),
        f.v7_partialHydration && Q && j.errors && (Zi = pe({}, j.errors, Zi));
        let gr = pd()
          , yl = md(K)
          , vl = gr || yl || Se.length > 0;
        return pe({
            matches: C,
            loaderData: ro,
            errors: Zi
        }, vl ? {
            fetchers: new Map(j.fetchers)
        } : {})
    }
    function cd(x) {
        if (x && !St(x[1]))
            return {
                [x[0]]: x[1].data
            };
        if (j.actionData)
            return Object.keys(j.actionData).length === 0 ? null : j.actionData
    }
    function Ry(x) {
        return x.forEach(E => {
            let C = j.fetchers.get(E.key)
              , T = cs(void 0, C ? C.data : void 0);
            j.fetchers.set(E.key, T)
        }
        ),
        new Map(j.fetchers)
    }
    function Py(x, E, C, T) {
        if (r)
            throw new Error("router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.");
        Dn(x);
        let D = (T && T.flushSync) === !0
          , $ = o || a
          , V = $u(j.location, j.matches, u, f.v7_prependBasename, C, f.v7_relativeSplatPath, E, T == null ? void 0 : T.relative)
          , U = Sr($, V, u)
          , Q = pl(U, $, V);
        if (Q.active && Q.matches && (U = Q.matches),
        !U) {
            an(x, E, ut(404, {
                pathname: V
            }), {
                flushSync: D
            });
            return
        }
        let {path: z, submission: H, error: q} = Vf(f.v7_normalizeFormMethod, !0, V, T);
        if (q) {
            an(x, E, q, {
                flushSync: D
            });
            return
        }
        let ee = vs(U, z)
          , Fe = (T && T.preventScrollReset) === !0;
        if (H && $t(H.formMethod)) {
            Ty(x, E, z, ee, U, Q.active, D, Fe, H);
            return
        }
        Mt.set(x, {
            routeId: E,
            path: z
        }),
        _y(x, E, z, ee, U, Q.active, D, Fe, H)
    }
    async function Ty(x, E, C, T, D, $, V, U, Q) {
        eo(),
        Mt.delete(x);
        function z(Pe) {
            if (!Pe.route.action && !Pe.route.lazy) {
                let ei = ut(405, {
                    method: Q.formMethod,
                    pathname: C,
                    routeId: E
                });
                return an(x, E, ei, {
                    flushSync: V
                }),
                !0
            }
            return !1
        }
        if (!$ && z(T))
            return;
        let H = j.fetchers.get(x);
        In(x, W0(Q, H), {
            flushSync: V
        });
        let q = new AbortController
          , ee = ni(e.history, C, q.signal, Q);
        if ($) {
            let Pe = await ml(D, new URL(ee.url).pathname, ee.signal, x);
            if (Pe.type === "aborted")
                return;
            if (Pe.type === "error") {
                an(x, E, Pe.error, {
                    flushSync: V
                });
                return
            } else if (Pe.matches) {
                if (D = Pe.matches,
                T = vs(D, C),
                z(T))
                    return
            } else {
                an(x, E, ut(404, {
                    pathname: C
                }), {
                    flushSync: V
                });
                return
            }
        }
        I.set(x, q);
        let Fe = W
          , ie = (await Xi("action", j, ee, [T], D, x))[T.route.id];
        if (ee.signal.aborted) {
            I.get(x) === q && I.delete(x);
            return
        }
        if (f.v7_fetcherPersist && qe.has(x)) {
            if (Rr(ie) || St(ie)) {
                In(x, An(void 0));
                return
            }
        } else {
            if (Rr(ie))
                if (I.delete(x),
                K > Fe) {
                    In(x, An(void 0));
                    return
                } else
                    return ue.add(x),
                    In(x, cs(Q)),
                    vr(ee, ie, !1, {
                        fetcherSubmission: Q,
                        preventScrollReset: U
                    });
            if (St(ie)) {
                an(x, E, ie.error);
                return
            }
        }
        if (er(ie))
            throw ut(400, {
                type: "defer-action"
            });
        let Se = j.navigation.location || j.location
          , Jr = ni(e.history, Se, q.signal)
          , Ji = o || a
          , on = j.navigation.state !== "idle" ? Sr(Ji, j.navigation.location, u) : j.matches;
        G(on, "Didn't find any matches after fetcher action");
        let Xt = ++W;
        oe.set(x, Xt);
        let ro = cs(Q, ie.data);
        j.fetchers.set(x, ro);
        let[Zi,gr] = Gf(e.history, j, on, Q, Se, !1, f.v7_skipActionErrorRevalidation, He, Ln, On, qe, Mt, ue, Ji, u, [T.route.id, ie]);
        gr.filter(Pe => Pe.key !== x).forEach(Pe => {
            let ei = Pe.key
              , wd = j.fetchers.get(ei)
              , Ay = cs(void 0, wd ? wd.data : void 0);
            j.fetchers.set(ei, Ay),
            Dn(ei),
            Pe.controller && I.set(ei, Pe.controller)
        }
        ),
        Xe({
            fetchers: new Map(j.fetchers)
        });
        let yl = () => gr.forEach(Pe => Dn(Pe.key));
        q.signal.addEventListener("abort", yl);
        let {loaderResults: vl, fetcherResults: ne} = await dd(j, on, Zi, gr, Jr);
        if (q.signal.aborted)
            return;
        q.signal.removeEventListener("abort", yl),
        oe.delete(x),
        I.delete(x),
        gr.forEach(Pe => I.delete(Pe.key));
        let ke = Fl(vl);
        if (ke)
            return vr(Jr, ke.result, !1, {
                preventScrollReset: U
            });
        if (ke = Fl(ne),
        ke)
            return ue.add(ke.key),
            vr(Jr, ke.result, !1, {
                preventScrollReset: U
            });
        let {loaderData: Zr, errors: es} = Zf(j, on, vl, void 0, gr, ne, Ye);
        if (j.fetchers.has(x)) {
            let Pe = An(ie.data);
            j.fetchers.set(x, Pe)
        }
        md(Xt),
        j.navigation.state === "loading" && Xt > K ? (G(R, "Expected pending action"),
        L && L.abort(),
        Xr(j.navigation.location, {
            matches: on,
            loaderData: Zr,
            errors: es,
            fetchers: new Map(j.fetchers)
        })) : (Xe({
            errors: es,
            loaderData: eh(j.loaderData, Zr, on, es),
            fetchers: new Map(j.fetchers)
        }),
        He = !1)
    }
    async function _y(x, E, C, T, D, $, V, U, Q) {
        let z = j.fetchers.get(x);
        In(x, cs(Q, z ? z.data : void 0), {
            flushSync: V
        });
        let H = new AbortController
          , q = ni(e.history, C, H.signal);
        if ($) {
            let ie = await ml(D, new URL(q.url).pathname, q.signal, x);
            if (ie.type === "aborted")
                return;
            if (ie.type === "error") {
                an(x, E, ie.error, {
                    flushSync: V
                });
                return
            } else if (ie.matches)
                D = ie.matches,
                T = vs(D, C);
            else {
                an(x, E, ut(404, {
                    pathname: C
                }), {
                    flushSync: V
                });
                return
            }
        }
        I.set(x, H);
        let ee = W
          , ce = (await Xi("loader", j, q, [T], D, x))[T.route.id];
        if (er(ce) && (ce = await ed(ce, q.signal, !0) || ce),
        I.get(x) === H && I.delete(x),
        !q.signal.aborted) {
            if (qe.has(x)) {
                In(x, An(void 0));
                return
            }
            if (Rr(ce))
                if (K > ee) {
                    In(x, An(void 0));
                    return
                } else {
                    ue.add(x),
                    await vr(q, ce, !1, {
                        preventScrollReset: U
                    });
                    return
                }
            if (St(ce)) {
                an(x, E, ce.error);
                return
            }
            G(!er(ce), "Unhandled fetcher deferred data"),
            In(x, An(ce.data))
        }
    }
    async function vr(x, E, C, T) {
        let {submission: D, fetcherSubmission: $, preventScrollReset: V, replace: U} = T === void 0 ? {} : T;
        E.response.headers.has("X-Remix-Revalidate") && (He = !0);
        let Q = E.response.headers.get("Location");
        G(Q, "Expected a Location header on the redirect Response"),
        Q = Xf(Q, new URL(x.url), u, e.history);
        let z = Ks(j.location, Q, {
            _isRedirect: !0
        });
        if (n) {
            let ie = !1;
            if (E.response.headers.has("X-Remix-Reload-Document"))
                ie = !0;
            else if (Zc.test(Q)) {
                const Se = e.history.createURL(Q);
                ie = Se.origin !== t.location.origin || Nn(Se.pathname, u) == null
            }
            if (ie) {
                U ? t.location.replace(Q) : t.location.assign(Q);
                return
            }
        }
        L = null;
        let H = U === !0 || E.response.headers.has("X-Remix-Replace") ? Ce.Replace : Ce.Push
          , {formMethod: q, formAction: ee, formEncType: Fe} = j.navigation;
        !D && !$ && q && ee && Fe && (D = ih(j.navigation));
        let ce = D || $;
        if (N0.has(E.response.status) && ce && $t(ce.formMethod))
            await yr(H, z, {
                submission: pe({}, ce, {
                    formAction: Q
                }),
                preventScrollReset: V || F,
                enableViewTransition: C ? X : void 0
            });
        else {
            let ie = Io(z, D);
            await yr(H, z, {
                overrideNavigation: ie,
                fetcherSubmission: $,
                preventScrollReset: V || F,
                enableViewTransition: C ? X : void 0
            })
        }
    }
    async function Xi(x, E, C, T, D, $) {
        let V, U = {};
        try {
            V = await O0(c, x, E, C, T, D, $, s, i)
        } catch (Q) {
            return T.forEach(z => {
                U[z.route.id] = {
                    type: le.error,
                    error: Q
                }
            }
            ),
            U
        }
        for (let[Q,z] of Object.entries(V))
            if (z0(z)) {
                let H = z.result;
                U[Q] = {
                    type: le.redirect,
                    response: M0(H, C, Q, D, u, f.v7_relativeSplatPath)
                }
            } else
                U[Q] = await D0(z);
        return U
    }
    async function dd(x, E, C, T, D) {
        let $ = x.matches
          , V = Xi("loader", x, D, C, E, null)
          , U = Promise.all(T.map(async H => {
            if (H.matches && H.match && H.controller) {
                let ee = (await Xi("loader", x, ni(e.history, H.path, H.controller.signal), [H.match], H.matches, H.key))[H.match.route.id];
                return {
                    [H.key]: ee
                }
            } else
                return Promise.resolve({
                    [H.key]: {
                        type: le.error,
                        error: ut(404, {
                            pathname: H.path
                        })
                    }
                })
        }
        ))
          , Q = await V
          , z = (await U).reduce( (H, q) => Object.assign(H, q), {});
        return await Promise.all([H0(E, Q, D.signal, $, x.loaderData), B0(E, z, T)]),
        {
            loaderResults: Q,
            fetcherResults: z
        }
    }
    function eo() {
        He = !0,
        Ln.push(...no()),
        Mt.forEach( (x, E) => {
            I.has(E) && On.add(E),
            Dn(E)
        }
        )
    }
    function In(x, E, C) {
        C === void 0 && (C = {}),
        j.fetchers.set(x, E),
        Xe({
            fetchers: new Map(j.fetchers)
        }, {
            flushSync: (C && C.flushSync) === !0
        })
    }
    function an(x, E, C, T) {
        T === void 0 && (T = {});
        let D = kr(j.matches, E);
        fl(x),
        Xe({
            errors: {
                [D.route.id]: C
            },
            fetchers: new Map(j.fetchers)
        }, {
            flushSync: (T && T.flushSync) === !0
        })
    }
    function fd(x) {
        return gt.set(x, (gt.get(x) || 0) + 1),
        qe.has(x) && qe.delete(x),
        j.fetchers.get(x) || b0
    }
    function fl(x) {
        let E = j.fetchers.get(x);
        I.has(x) && !(E && E.state === "loading" && oe.has(x)) && Dn(x),
        Mt.delete(x),
        oe.delete(x),
        ue.delete(x),
        f.v7_fetcherPersist && qe.delete(x),
        On.delete(x),
        j.fetchers.delete(x)
    }
    function Ly(x) {
        let E = (gt.get(x) || 0) - 1;
        E <= 0 ? (gt.delete(x),
        qe.add(x),
        f.v7_fetcherPersist || fl(x)) : gt.set(x, E),
        Xe({
            fetchers: new Map(j.fetchers)
        })
    }
    function Dn(x) {
        let E = I.get(x);
        E && (E.abort(),
        I.delete(x))
    }
    function hd(x) {
        for (let E of x) {
            let C = fd(E)
              , T = An(C.data);
            j.fetchers.set(E, T)
        }
    }
    function pd() {
        let x = []
          , E = !1;
        for (let C of ue) {
            let T = j.fetchers.get(C);
            G(T, "Expected fetcher: " + C),
            T.state === "loading" && (ue.delete(C),
            x.push(C),
            E = !0)
        }
        return hd(x),
        E
    }
    function md(x) {
        let E = [];
        for (let[C,T] of oe)
            if (T < x) {
                let D = j.fetchers.get(C);
                G(D, "Expected fetcher: " + C),
                D.state === "loading" && (Dn(C),
                oe.delete(C),
                E.push(C))
            }
        return hd(E),
        E.length > 0
    }
    function Oy(x, E) {
        let C = j.blockers.get(x) || us;
        return Rt.get(x) !== E && Rt.set(x, E),
        C
    }
    function yd(x) {
        j.blockers.delete(x),
        Rt.delete(x)
    }
    function hl(x, E) {
        let C = j.blockers.get(x) || us;
        G(C.state === "unblocked" && E.state === "blocked" || C.state === "blocked" && E.state === "blocked" || C.state === "blocked" && E.state === "proceeding" || C.state === "blocked" && E.state === "unblocked" || C.state === "proceeding" && E.state === "unblocked", "Invalid blocker state transition: " + C.state + " -> " + E.state);
        let T = new Map(j.blockers);
        T.set(x, E),
        Xe({
            blockers: T
        })
    }
    function vd(x) {
        let {currentLocation: E, nextLocation: C, historyAction: T} = x;
        if (Rt.size === 0)
            return;
        Rt.size > 1 && Vr(!1, "A router only supports one blocker at a time");
        let D = Array.from(Rt.entries())
          , [$,V] = D[D.length - 1]
          , U = j.blockers.get($);
        if (!(U && U.state === "proceeding") && V({
            currentLocation: E,
            nextLocation: C,
            historyAction: T
        }))
            return $
    }
    function to(x) {
        let E = ut(404, {
            pathname: x
        })
          , C = o || a
          , {matches: T, route: D} = nh(C);
        return no(),
        {
            notFoundMatches: T,
            route: D,
            error: E
        }
    }
    function no(x) {
        let E = [];
        return Ye.forEach( (C, T) => {
            (!x || x(T)) && (C.cancel(),
            E.push(T),
            Ye.delete(T))
        }
        ),
        E
    }
    function Iy(x, E, C) {
        if (S = x,
        b = E,
        w = C || null,
        !p && j.navigation === Oo) {
            p = !0;
            let T = xd(j.location, j.matches);
            T != null && Xe({
                restoreScrollPosition: T
            })
        }
        return () => {
            S = null,
            b = null,
            w = null
        }
    }
    function gd(x, E) {
        return w && w(x, E.map(T => n0(T, j.loaderData))) || x.key
    }
    function Dy(x, E) {
        if (S && b) {
            let C = gd(x, E);
            S[C] = b()
        }
    }
    function xd(x, E) {
        if (S) {
            let C = gd(x, E)
              , T = S[C];
            if (typeof T == "number")
                return T
        }
        return null
    }
    function pl(x, E, C) {
        if (d)
            if (x) {
                if (Object.keys(x[0].params).length > 0)
                    return {
                        active: !0,
                        matches: Jl(E, C, u, !0)
                    }
            } else
                return {
                    active: !0,
                    matches: Jl(E, C, u, !0) || []
                };
        return {
            active: !1,
            matches: null
        }
    }
    async function ml(x, E, C, T) {
        if (!d)
            return {
                type: "success",
                matches: x
            };
        let D = x;
        for (; ; ) {
            let $ = o == null
              , V = o || a
              , U = s;
            try {
                await d({
                    signal: C,
                    path: E,
                    matches: D,
                    fetcherKey: T,
                    patch: (H, q) => {
                        C.aborted || Yf(H, q, V, U, i)
                    }
                })
            } catch (H) {
                return {
                    type: "error",
                    error: H,
                    partialMatches: D
                }
            } finally {
                $ && !C.aborted && (a = [...a])
            }
            if (C.aborted)
                return {
                    type: "aborted"
                };
            let Q = Sr(V, E, u);
            if (Q)
                return {
                    type: "success",
                    matches: Q
                };
            let z = Jl(V, E, u, !0);
            if (!z || D.length === z.length && D.every( (H, q) => H.route.id === z[q].route.id))
                return {
                    type: "success",
                    matches: null
                };
            D = z
        }
    }
    function My(x) {
        s = {},
        o = Ca(x, i, void 0, s)
    }
    function Fy(x, E) {
        let C = o == null;
        Yf(x, E, o || a, s, i),
        C && (a = [...a],
        Xe({}))
    }
    return O = {
        get basename() {
            return u
        },
        get future() {
            return f
        },
        get state() {
            return j
        },
        get routes() {
            return a
        },
        get window() {
            return t
        },
        initialize: Sy,
        subscribe: Ey,
        enableScrollRestoration: Iy,
        navigate: ud,
        fetch: Py,
        revalidate: Ny,
        createHref: x => e.history.createHref(x),
        encodeLocation: x => e.history.encodeLocation(x),
        getFetcher: fd,
        deleteFetcher: Ly,
        dispose: ky,
        getBlocker: Oy,
        deleteBlocker: yd,
        patchRoutes: Fy,
        _internalFetchControllers: I,
        _internalActiveDeferreds: Ye,
        _internalSetRoutes: My
    },
    O
}
function P0(e) {
    return e != null && ("formData"in e && e.formData != null || "body"in e && e.body !== void 0)
}
function $u(e, t, n, r, i, s, a, o) {
    let u, c;
    if (a) {
        u = [];
        for (let f of t)
            if (u.push(f),
            f.route.id === a) {
                c = f;
                break
            }
    } else
        u = t,
        c = t[t.length - 1];
    let d = qa(i || ".", Ga(u, s), Nn(e.pathname, n) || e.pathname, o === "path");
    if (i == null && (d.search = e.search,
    d.hash = e.hash),
    (i == null || i === "" || i === ".") && c) {
        let f = td(d.search);
        if (c.route.index && !f)
            d.search = d.search ? d.search.replace(/^\?/, "?index&") : "?index";
        else if (!c.route.index && f) {
            let m = new URLSearchParams(d.search)
              , y = m.getAll("index");
            m.delete("index"),
            y.filter(w => w).forEach(w => m.append("index", w));
            let S = m.toString();
            d.search = S ? "?" + S : ""
        }
    }
    return r && n !== "/" && (d.pathname = d.pathname === "/" ? n : xn([n, d.pathname])),
    Kr(d)
}
function Vf(e, t, n, r) {
    if (!r || !P0(r))
        return {
            path: n
        };
    if (r.formMethod && !Q0(r.formMethod))
        return {
            path: n,
            error: ut(405, {
                method: r.formMethod
            })
        };
    let i = () => ({
        path: n,
        error: ut(400, {
            type: "invalid-body"
        })
    })
      , s = r.formMethod || "get"
      , a = e ? s.toUpperCase() : s.toLowerCase()
      , o = ry(n);
    if (r.body !== void 0) {
        if (r.formEncType === "text/plain") {
            if (!$t(a))
                return i();
            let m = typeof r.body == "string" ? r.body : r.body instanceof FormData || r.body instanceof URLSearchParams ? Array.from(r.body.entries()).reduce( (y, S) => {
                let[w,b] = S;
                return "" + y + w + "=" + b + `
`
            }
            , "") : String(r.body);
            return {
                path: n,
                submission: {
                    formMethod: a,
                    formAction: o,
                    formEncType: r.formEncType,
                    formData: void 0,
                    json: void 0,
                    text: m
                }
            }
        } else if (r.formEncType === "application/json") {
            if (!$t(a))
                return i();
            try {
                let m = typeof r.body == "string" ? JSON.parse(r.body) : r.body;
                return {
                    path: n,
                    submission: {
                        formMethod: a,
                        formAction: o,
                        formEncType: r.formEncType,
                        formData: void 0,
                        json: m,
                        text: void 0
                    }
                }
            } catch {
                return i()
            }
        }
    }
    G(typeof FormData == "function", "FormData is not available in this environment");
    let u, c;
    if (r.formData)
        u = Vu(r.formData),
        c = r.formData;
    else if (r.body instanceof FormData)
        u = Vu(r.body),
        c = r.body;
    else if (r.body instanceof URLSearchParams)
        u = r.body,
        c = Jf(u);
    else if (r.body == null)
        u = new URLSearchParams,
        c = new FormData;
    else
        try {
            u = new URLSearchParams(r.body),
            c = Jf(u)
        } catch {
            return i()
        }
    let d = {
        formMethod: a,
        formAction: o,
        formEncType: r && r.formEncType || "application/x-www-form-urlencoded",
        formData: c,
        json: void 0,
        text: void 0
    };
    if ($t(d.formMethod))
        return {
            path: n,
            submission: d
        };
    let f = Pn(n);
    return t && f.search && td(f.search) && u.append("index", ""),
    f.search = "?" + u,
    {
        path: Kr(f),
        submission: d
    }
}
function Kf(e, t, n) {
    n === void 0 && (n = !1);
    let r = e.findIndex(i => i.route.id === t);
    return r >= 0 ? e.slice(0, n ? r + 1 : r) : e
}
function Gf(e, t, n, r, i, s, a, o, u, c, d, f, m, y, S, w) {
    let b = w ? St(w[1]) ? w[1].error : w[1].data : void 0
      , p = e.createURL(t.location)
      , h = e.createURL(i)
      , g = n;
    s && t.errors ? g = Kf(n, Object.keys(t.errors)[0], !0) : w && St(w[1]) && (g = Kf(n, w[0]));
    let k = w ? w[1].statusCode : void 0
      , P = a && k && k >= 400
      , O = g.filter( (R, F) => {
        let {route: L} = R;
        if (L.lazy)
            return !0;
        if (L.loader == null)
            return !1;
        if (s)
            return Wu(L, t.loaderData, t.errors);
        if (T0(t.loaderData, t.matches[F], R) || u.some(we => we === R.route.id))
            return !0;
        let X = t.matches[F]
          , re = R;
        return qf(R, pe({
            currentUrl: p,
            currentParams: X.params,
            nextUrl: h,
            nextParams: re.params
        }, r, {
            actionResult: b,
            actionStatus: k,
            defaultShouldRevalidate: P ? !1 : o || p.pathname + p.search === h.pathname + h.search || p.search !== h.search || ty(X, re)
        }))
    }
    )
      , j = [];
    return f.forEach( (R, F) => {
        if (s || !n.some(je => je.route.id === R.routeId) || d.has(F))
            return;
        let L = Sr(y, R.path, S);
        if (!L) {
            j.push({
                key: F,
                routeId: R.routeId,
                path: R.path,
                matches: null,
                match: null,
                controller: null
            });
            return
        }
        let X = t.fetchers.get(F)
          , re = vs(L, R.path)
          , we = !1;
        m.has(F) ? we = !1 : c.has(F) ? (c.delete(F),
        we = !0) : X && X.state !== "idle" && X.data === void 0 ? we = o : we = qf(re, pe({
            currentUrl: p,
            currentParams: t.matches[t.matches.length - 1].params,
            nextUrl: h,
            nextParams: n[n.length - 1].params
        }, r, {
            actionResult: b,
            actionStatus: k,
            defaultShouldRevalidate: P ? !1 : o
        })),
        we && j.push({
            key: F,
            routeId: R.routeId,
            path: R.path,
            matches: L,
            match: re,
            controller: new AbortController
        })
    }
    ),
    [O, j]
}
function Wu(e, t, n) {
    if (e.lazy)
        return !0;
    if (!e.loader)
        return !1;
    let r = t != null && t[e.id] !== void 0
      , i = n != null && n[e.id] !== void 0;
    return !r && i ? !1 : typeof e.loader == "function" && e.loader.hydrate === !0 ? !0 : !r && !i
}
function T0(e, t, n) {
    let r = !t || n.route.id !== t.route.id
      , i = e[n.route.id] === void 0;
    return r || i
}
function ty(e, t) {
    let n = e.route.path;
    return e.pathname !== t.pathname || n != null && n.endsWith("*") && e.params["*"] !== t.params["*"]
}
function qf(e, t) {
    if (e.route.shouldRevalidate) {
        let n = e.route.shouldRevalidate(t);
        if (typeof n == "boolean")
            return n
    }
    return t.defaultShouldRevalidate
}
function Yf(e, t, n, r, i) {
    var s;
    let a;
    if (e) {
        let c = r[e];
        G(c, "No route found to patch children into: routeId = " + e),
        c.children || (c.children = []),
        a = c.children
    } else
        a = n;
    let o = t.filter(c => !a.some(d => ny(c, d)))
      , u = Ca(o, i, [e || "_", "patch", String(((s = a) == null ? void 0 : s.length) || "0")], r);
    a.push(...u)
}
function ny(e, t) {
    return "id"in e && "id"in t && e.id === t.id ? !0 : e.index === t.index && e.path === t.path && e.caseSensitive === t.caseSensitive ? (!e.children || e.children.length === 0) && (!t.children || t.children.length === 0) ? !0 : e.children.every( (n, r) => {
        var i;
        return (i = t.children) == null ? void 0 : i.some(s => ny(n, s))
    }
    ) : !1
}
async function _0(e, t, n) {
    if (!e.lazy)
        return;
    let r = await e.lazy();
    if (!e.lazy)
        return;
    let i = n[e.id];
    G(i, "No route found in manifest");
    let s = {};
    for (let a in r) {
        let u = i[a] !== void 0 && a !== "hasErrorBoundary";
        Vr(!u, 'Route "' + i.id + '" has a static property "' + a + '" defined but its lazy function is also returning a value for this property. ' + ('The lazy route property "' + a + '" will be ignored.')),
        !u && !e0.has(a) && (s[a] = r[a])
    }
    Object.assign(i, s),
    Object.assign(i, pe({}, t(i), {
        lazy: void 0
    }))
}
async function L0(e) {
    let {matches: t} = e
      , n = t.filter(i => i.shouldLoad);
    return (await Promise.all(n.map(i => i.resolve()))).reduce( (i, s, a) => Object.assign(i, {
        [n[a].route.id]: s
    }), {})
}
async function O0(e, t, n, r, i, s, a, o, u, c) {
    let d = s.map(y => y.route.lazy ? _0(y.route, u, o) : void 0)
      , f = s.map( (y, S) => {
        let w = d[S]
          , b = i.some(h => h.route.id === y.route.id);
        return pe({}, y, {
            shouldLoad: b,
            resolve: async h => (h && r.method === "GET" && (y.route.lazy || y.route.loader) && (b = !0),
            b ? I0(t, r, y, w, h, c) : Promise.resolve({
                type: le.data,
                result: void 0
            }))
        })
    }
    )
      , m = await e({
        matches: f,
        request: r,
        params: s[0].params,
        fetcherKey: a,
        context: c
    });
    try {
        await Promise.all(d)
    } catch {}
    return m
}
async function I0(e, t, n, r, i, s) {
    let a, o, u = c => {
        let d, f = new Promise( (S, w) => d = w);
        o = () => d(),
        t.signal.addEventListener("abort", o);
        let m = S => typeof c != "function" ? Promise.reject(new Error("You cannot call the handler for a route which defines a boolean " + ('"' + e + '" [routeId: ' + n.route.id + "]"))) : c({
            request: t,
            params: n.params,
            context: s
        }, ...S !== void 0 ? [S] : [])
          , y = (async () => {
            try {
                return {
                    type: "data",
                    result: await (i ? i(w => m(w)) : m())
                }
            } catch (S) {
                return {
                    type: "error",
                    result: S
                }
            }
        }
        )();
        return Promise.race([y, f])
    }
    ;
    try {
        let c = n.route[e];
        if (r)
            if (c) {
                let d, [f] = await Promise.all([u(c).catch(m => {
                    d = m
                }
                ), r]);
                if (d !== void 0)
                    throw d;
                a = f
            } else if (await r,
            c = n.route[e],
            c)
                a = await u(c);
            else if (e === "action") {
                let d = new URL(t.url)
                  , f = d.pathname + d.search;
                throw ut(405, {
                    method: t.method,
                    pathname: f,
                    routeId: n.route.id
                })
            } else
                return {
                    type: le.data,
                    result: void 0
                };
        else if (c)
            a = await u(c);
        else {
            let d = new URL(t.url)
              , f = d.pathname + d.search;
            throw ut(404, {
                pathname: f
            })
        }
        G(a.result !== void 0, "You defined " + (e === "action" ? "an action" : "a loader") + " for route " + ('"' + n.route.id + "\" but didn't return anything from your `" + e + "` ") + "function. Please return a value or `null`.")
    } catch (c) {
        return {
            type: le.error,
            result: c
        }
    } finally {
        o && t.signal.removeEventListener("abort", o)
    }
    return a
}
async function D0(e) {
    let {result: t, type: n} = e;
    if (iy(t)) {
        let f;
        try {
            let m = t.headers.get("Content-Type");
            m && /\bapplication\/json\b/.test(m) ? t.body == null ? f = null : f = await t.json() : f = await t.text()
        } catch (m) {
            return {
                type: le.error,
                error: m
            }
        }
        return n === le.error ? {
            type: le.error,
            error: new Pa(t.status,t.statusText,f),
            statusCode: t.status,
            headers: t.headers
        } : {
            type: le.data,
            data: f,
            statusCode: t.status,
            headers: t.headers
        }
    }
    if (n === le.error) {
        if (rh(t)) {
            var r, i;
            if (t.data instanceof Error) {
                var s, a;
                return {
                    type: le.error,
                    error: t.data,
                    statusCode: (s = t.init) == null ? void 0 : s.status,
                    headers: (a = t.init) != null && a.headers ? new Headers(t.init.headers) : void 0
                }
            }
            return {
                type: le.error,
                error: new Pa(((r = t.init) == null ? void 0 : r.status) || 500,void 0,t.data),
                statusCode: Gs(t) ? t.status : void 0,
                headers: (i = t.init) != null && i.headers ? new Headers(t.init.headers) : void 0
            }
        }
        return {
            type: le.error,
            error: t,
            statusCode: Gs(t) ? t.status : void 0
        }
    }
    if (U0(t)) {
        var o, u;
        return {
            type: le.deferred,
            deferredData: t,
            statusCode: (o = t.init) == null ? void 0 : o.status,
            headers: ((u = t.init) == null ? void 0 : u.headers) && new Headers(t.init.headers)
        }
    }
    if (rh(t)) {
        var c, d;
        return {
            type: le.data,
            data: t.data,
            statusCode: (c = t.init) == null ? void 0 : c.status,
            headers: (d = t.init) != null && d.headers ? new Headers(t.init.headers) : void 0
        }
    }
    return {
        type: le.data,
        data: t
    }
}
function M0(e, t, n, r, i, s) {
    let a = e.headers.get("Location");
    if (G(a, "Redirects returned/thrown from loaders/actions must have a Location header"),
    !Zc.test(a)) {
        let o = r.slice(0, r.findIndex(u => u.route.id === n) + 1);
        a = $u(new URL(t.url), o, i, !0, a, s),
        e.headers.set("Location", a)
    }
    return e
}
function Xf(e, t, n, r) {
    let i = ["about:", "blob:", "chrome:", "chrome-untrusted:", "content:", "data:", "devtools:", "file:", "filesystem:", "javascript:"];
    if (Zc.test(e)) {
        let s = e
          , a = s.startsWith("//") ? new URL(t.protocol + s) : new URL(s);
        if (i.includes(a.protocol))
            throw new Error("Invalid redirect location");
        let o = Nn(a.pathname, n) != null;
        if (a.origin === t.origin && o)
            return a.pathname + a.search + a.hash
    }
    try {
        let s = r.createURL(e);
        if (i.includes(s.protocol))
            throw new Error("Invalid redirect location")
    } catch {}
    return e
}
function ni(e, t, n, r) {
    let i = e.createURL(ry(t)).toString()
      , s = {
        signal: n
    };
    if (r && $t(r.formMethod)) {
        let {formMethod: a, formEncType: o} = r;
        s.method = a.toUpperCase(),
        o === "application/json" ? (s.headers = new Headers({
            "Content-Type": o
        }),
        s.body = JSON.stringify(r.json)) : o === "text/plain" ? s.body = r.text : o === "application/x-www-form-urlencoded" && r.formData ? s.body = Vu(r.formData) : s.body = r.formData
    }
    return new Request(i,s)
}
function Vu(e) {
    let t = new URLSearchParams;
    for (let[n,r] of e.entries())
        t.append(n, typeof r == "string" ? r : r.name);
    return t
}
function Jf(e) {
    let t = new FormData;
    for (let[n,r] of e.entries())
        t.append(n, r);
    return t
}
function F0(e, t, n, r, i) {
    let s = {}, a = null, o, u = !1, c = {}, d = n && St(n[1]) ? n[1].error : void 0;
    return e.forEach(f => {
        if (!(f.route.id in t))
            return;
        let m = f.route.id
          , y = t[m];
        if (G(!Rr(y), "Cannot handle redirect results in processLoaderData"),
        St(y)) {
            let S = y.error;
            d !== void 0 && (S = d,
            d = void 0),
            a = a || {};
            {
                let w = kr(e, m);
                a[w.route.id] == null && (a[w.route.id] = S)
            }
            s[m] = void 0,
            u || (u = !0,
            o = Gs(y.error) ? y.error.status : 500),
            y.headers && (c[m] = y.headers)
        } else
            er(y) ? (r.set(m, y.deferredData),
            s[m] = y.deferredData.data,
            y.statusCode != null && y.statusCode !== 200 && !u && (o = y.statusCode),
            y.headers && (c[m] = y.headers)) : (s[m] = y.data,
            y.statusCode && y.statusCode !== 200 && !u && (o = y.statusCode),
            y.headers && (c[m] = y.headers))
    }
    ),
    d !== void 0 && n && (a = {
        [n[0]]: d
    },
    s[n[0]] = void 0),
    {
        loaderData: s,
        errors: a,
        statusCode: o || 200,
        loaderHeaders: c
    }
}
function Zf(e, t, n, r, i, s, a) {
    let {loaderData: o, errors: u} = F0(t, n, r, a);
    return i.forEach(c => {
        let {key: d, match: f, controller: m} = c
          , y = s[d];
        if (G(y, "Did not find corresponding fetcher result"),
        !(m && m.signal.aborted))
            if (St(y)) {
                let S = kr(e.matches, f == null ? void 0 : f.route.id);
                u && u[S.route.id] || (u = pe({}, u, {
                    [S.route.id]: y.error
                })),
                e.fetchers.delete(d)
            } else if (Rr(y))
                G(!1, "Unhandled fetcher revalidation redirect");
            else if (er(y))
                G(!1, "Unhandled fetcher deferred data");
            else {
                let S = An(y.data);
                e.fetchers.set(d, S)
            }
    }
    ),
    {
        loaderData: o,
        errors: u
    }
}
function eh(e, t, n, r) {
    let i = pe({}, t);
    for (let s of n) {
        let a = s.route.id;
        if (t.hasOwnProperty(a) ? t[a] !== void 0 && (i[a] = t[a]) : e[a] !== void 0 && s.route.loader && (i[a] = e[a]),
        r && r.hasOwnProperty(a))
            break
    }
    return i
}
function th(e) {
    return e ? St(e[1]) ? {
        actionData: {}
    } : {
        actionData: {
            [e[0]]: e[1].data
        }
    } : {}
}
function kr(e, t) {
    return (t ? e.slice(0, e.findIndex(r => r.route.id === t) + 1) : [...e]).reverse().find(r => r.route.hasErrorBoundary === !0) || e[0]
}
function nh(e) {
    let t = e.length === 1 ? e[0] : e.find(n => n.index || !n.path || n.path === "/") || {
        id: "__shim-error-route__"
    };
    return {
        matches: [{
            params: {},
            pathname: "",
            pathnameBase: "",
            route: t
        }],
        route: t
    }
}
function ut(e, t) {
    let {pathname: n, routeId: r, method: i, type: s, message: a} = t === void 0 ? {} : t
      , o = "Unknown Server Error"
      , u = "Unknown @remix-run/router error";
    return e === 400 ? (o = "Bad Request",
    i && n && r ? u = "You made a " + i + ' request to "' + n + '" but ' + ('did not provide a `loader` for route "' + r + '", ') + "so there is no way to handle the request." : s === "defer-action" ? u = "defer() is not supported in actions" : s === "invalid-body" && (u = "Unable to encode submission body")) : e === 403 ? (o = "Forbidden",
    u = 'Route "' + r + '" does not match URL "' + n + '"') : e === 404 ? (o = "Not Found",
    u = 'No route matches URL "' + n + '"') : e === 405 && (o = "Method Not Allowed",
    i && n && r ? u = "You made a " + i.toUpperCase() + ' request to "' + n + '" but ' + ('did not provide an `action` for route "' + r + '", ') + "so there is no way to handle the request." : i && (u = 'Invalid request method "' + i.toUpperCase() + '"')),
    new Pa(e || 500,o,new Error(u),!0)
}
function Fl(e) {
    let t = Object.entries(e);
    for (let n = t.length - 1; n >= 0; n--) {
        let[r,i] = t[n];
        if (Rr(i))
            return {
                key: r,
                result: i
            }
    }
}
function ry(e) {
    let t = typeof e == "string" ? Pn(e) : e;
    return Kr(pe({}, t, {
        hash: ""
    }))
}
function A0(e, t) {
    return e.pathname !== t.pathname || e.search !== t.search ? !1 : e.hash === "" ? t.hash !== "" : e.hash === t.hash ? !0 : t.hash !== ""
}
function z0(e) {
    return iy(e.result) && E0.has(e.result.status)
}
function er(e) {
    return e.type === le.deferred
}
function St(e) {
    return e.type === le.error
}
function Rr(e) {
    return (e && e.type) === le.redirect
}
function rh(e) {
    return typeof e == "object" && e != null && "type"in e && "data"in e && "init"in e && e.type === "DataWithResponseInit"
}
function U0(e) {
    let t = e;
    return t && typeof t == "object" && typeof t.data == "object" && typeof t.subscribe == "function" && typeof t.cancel == "function" && typeof t.resolveData == "function"
}
function iy(e) {
    return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.headers == "object" && typeof e.body < "u"
}
function Q0(e) {
    return k0.has(e.toLowerCase())
}
function $t(e) {
    return j0.has(e.toLowerCase())
}
async function H0(e, t, n, r, i) {
    let s = Object.entries(t);
    for (let a = 0; a < s.length; a++) {
        let[o,u] = s[a]
          , c = e.find(m => (m == null ? void 0 : m.route.id) === o);
        if (!c)
            continue;
        let d = r.find(m => m.route.id === c.route.id)
          , f = d != null && !ty(d, c) && (i && i[c.route.id]) !== void 0;
        er(u) && f && await ed(u, n, !1).then(m => {
            m && (t[o] = m)
        }
        )
    }
}
async function B0(e, t, n) {
    for (let r = 0; r < n.length; r++) {
        let {key: i, routeId: s, controller: a} = n[r]
          , o = t[i];
        e.find(c => (c == null ? void 0 : c.route.id) === s) && er(o) && (G(a, "Expected an AbortController for revalidating fetcher deferred result"),
        await ed(o, a.signal, !0).then(c => {
            c && (t[i] = c)
        }
        ))
    }
}
async function ed(e, t, n) {
    if (n === void 0 && (n = !1),
    !await e.deferredData.resolveData(t)) {
        if (n)
            try {
                return {
                    type: le.data,
                    data: e.deferredData.unwrappedData
                }
            } catch (i) {
                return {
                    type: le.error,
                    error: i
                }
            }
        return {
            type: le.data,
            data: e.deferredData.data
        }
    }
}
function td(e) {
    return new URLSearchParams(e).getAll("index").some(t => t === "")
}
function vs(e, t) {
    let n = typeof t == "string" ? Pn(t).search : t.search;
    if (e[e.length - 1].route.index && td(n || ""))
        return e[e.length - 1];
    let r = Jm(e);
    return r[r.length - 1]
}
function ih(e) {
    let {formMethod: t, formAction: n, formEncType: r, text: i, formData: s, json: a} = e;
    if (!(!t || !n || !r)) {
        if (i != null)
            return {
                formMethod: t,
                formAction: n,
                formEncType: r,
                formData: void 0,
                json: void 0,
                text: i
            };
        if (s != null)
            return {
                formMethod: t,
                formAction: n,
                formEncType: r,
                formData: s,
                json: void 0,
                text: void 0
            };
        if (a !== void 0)
            return {
                formMethod: t,
                formAction: n,
                formEncType: r,
                formData: void 0,
                json: a,
                text: void 0
            }
    }
}
function Io(e, t) {
    return t ? {
        state: "loading",
        location: e,
        formMethod: t.formMethod,
        formAction: t.formAction,
        formEncType: t.formEncType,
        formData: t.formData,
        json: t.json,
        text: t.text
    } : {
        state: "loading",
        location: e,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0
    }
}
function $0(e, t) {
    return {
        state: "submitting",
        location: e,
        formMethod: t.formMethod,
        formAction: t.formAction,
        formEncType: t.formEncType,
        formData: t.formData,
        json: t.json,
        text: t.text
    }
}
function cs(e, t) {
    return e ? {
        state: "loading",
        formMethod: e.formMethod,
        formAction: e.formAction,
        formEncType: e.formEncType,
        formData: e.formData,
        json: e.json,
        text: e.text,
        data: t
    } : {
        state: "loading",
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
        data: t
    }
}
function W0(e, t) {
    return {
        state: "submitting",
        formMethod: e.formMethod,
        formAction: e.formAction,
        formEncType: e.formEncType,
        formData: e.formData,
        json: e.json,
        text: e.text,
        data: t ? t.data : void 0
    }
}
function An(e) {
    return {
        state: "idle",
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
        data: e
    }
}
function V0(e, t) {
    try {
        let n = e.sessionStorage.getItem(ey);
        if (n) {
            let r = JSON.parse(n);
            for (let[i,s] of Object.entries(r || {}))
                s && Array.isArray(s) && t.set(i, new Set(s || []))
        }
    } catch {}
}
function K0(e, t) {
    if (t.size > 0) {
        let n = {};
        for (let[r,i] of t)
            n[r] = [...i];
        try {
            e.sessionStorage.setItem(ey, JSON.stringify(n))
        } catch (r) {
            Vr(!1, "Failed to save applied view transitions in sessionStorage (" + r + ").")
        }
    }
}
/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function qs() {
    return qs = Object.assign ? Object.assign.bind() : function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }
    ,
    qs.apply(this, arguments)
}
const ll = N.createContext(null)
  , nd = N.createContext(null)
  , Tn = N.createContext(null)
  , Ya = N.createContext(null)
  , _n = N.createContext({
    outlet: null,
    matches: [],
    isDataRoute: !1
})
  , sy = N.createContext(null);
function G0(e, t) {
    let {relative: n} = t === void 0 ? {} : t;
    Yi() || G(!1);
    let {basename: r, navigator: i} = N.useContext(Tn)
      , {hash: s, pathname: a, search: o} = Xa(e, {
        relative: n
    })
      , u = a;
    return r !== "/" && (u = a === "/" ? r : xn([r, a])),
    i.createHref({
        pathname: u,
        search: o,
        hash: s
    })
}
function Yi() {
    return N.useContext(Ya) != null
}
function Yr() {
    return Yi() || G(!1),
    N.useContext(Ya).location
}
function ly(e) {
    N.useContext(Tn).static || N.useLayoutEffect(e)
}
function al() {
    let {isDataRoute: e} = N.useContext(_n);
    return e ? s1() : q0()
}
function q0() {
    Yi() || G(!1);
    let e = N.useContext(ll)
      , {basename: t, future: n, navigator: r} = N.useContext(Tn)
      , {matches: i} = N.useContext(_n)
      , {pathname: s} = Yr()
      , a = JSON.stringify(Ga(i, n.v7_relativeSplatPath))
      , o = N.useRef(!1);
    return ly( () => {
        o.current = !0
    }
    ),
    N.useCallback(function(c, d) {
        if (d === void 0 && (d = {}),
        !o.current)
            return;
        if (typeof c == "number") {
            r.go(c);
            return
        }
        let f = qa(c, JSON.parse(a), s, d.relative === "path");
        e == null && t !== "/" && (f.pathname = f.pathname === "/" ? t : xn([t, f.pathname])),
        (d.replace ? r.replace : r.push)(f, d.state, d)
    }, [t, r, a, s, e])
}
function ol() {
    let {matches: e} = N.useContext(_n)
      , t = e[e.length - 1];
    return t ? t.params : {}
}
function Xa(e, t) {
    let {relative: n} = t === void 0 ? {} : t
      , {future: r} = N.useContext(Tn)
      , {matches: i} = N.useContext(_n)
      , {pathname: s} = Yr()
      , a = JSON.stringify(Ga(i, r.v7_relativeSplatPath));
    return N.useMemo( () => qa(e, JSON.parse(a), s, n === "path"), [e, a, s, n])
}
function Y0(e, t) {
    return ay(e, t)
}
function ay(e, t, n, r) {
    Yi() || G(!1);
    let {navigator: i} = N.useContext(Tn)
      , {matches: s} = N.useContext(_n)
      , a = s[s.length - 1]
      , o = a ? a.params : {};
    a && a.pathname;
    let u = a ? a.pathnameBase : "/";
    a && a.route;
    let c = Yr(), d;
    if (t) {
        var f;
        let b = typeof t == "string" ? Pn(t) : t;
        u === "/" || (f = b.pathname) != null && f.startsWith(u) || G(!1),
        d = b
    } else
        d = c;
    let m = d.pathname || "/"
      , y = m;
    if (u !== "/") {
        let b = u.replace(/^\//, "").split("/");
        y = "/" + m.replace(/^\//, "").split("/").slice(b.length).join("/")
    }
    let S = Sr(e, {
        pathname: y
    })
      , w = t1(S && S.map(b => Object.assign({}, b, {
        params: Object.assign({}, o, b.params),
        pathname: xn([u, i.encodeLocation ? i.encodeLocation(b.pathname).pathname : b.pathname]),
        pathnameBase: b.pathnameBase === "/" ? u : xn([u, i.encodeLocation ? i.encodeLocation(b.pathnameBase).pathname : b.pathnameBase])
    })), s, n, r);
    return t && w ? N.createElement(Ya.Provider, {
        value: {
            location: qs({
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default"
            }, d),
            navigationType: Ce.Pop
        }
    }, w) : w
}
function X0() {
    let e = dy()
      , t = Gs(e) ? e.status + " " + e.statusText : e instanceof Error ? e.message : JSON.stringify(e)
      , n = e instanceof Error ? e.stack : null
      , i = {
        padding: "0.5rem",
        backgroundColor: "rgba(200,200,200, 0.5)"
    };
    return N.createElement(N.Fragment, null, N.createElement("h2", null, "Unexpected Application Error!"), N.createElement("h3", {
        style: {
            fontStyle: "italic"
        }
    }, t), n ? N.createElement("pre", {
        style: i
    }, n) : null, null)
}
const J0 = N.createElement(X0, null);
class Z0 extends N.Component {
    constructor(t) {
        super(t),
        this.state = {
            location: t.location,
            revalidation: t.revalidation,
            error: t.error
        }
    }
    static getDerivedStateFromError(t) {
        return {
            error: t
        }
    }
    static getDerivedStateFromProps(t, n) {
        return n.location !== t.location || n.revalidation !== "idle" && t.revalidation === "idle" ? {
            error: t.error,
            location: t.location,
            revalidation: t.revalidation
        } : {
            error: t.error !== void 0 ? t.error : n.error,
            location: n.location,
            revalidation: t.revalidation || n.revalidation
        }
    }
    componentDidCatch(t, n) {
        console.error("React Router caught the following error during render", t, n)
    }
    render() {
        return this.state.error !== void 0 ? N.createElement(_n.Provider, {
            value: this.props.routeContext
        }, N.createElement(sy.Provider, {
            value: this.state.error,
            children: this.props.component
        })) : this.props.children
    }
}
function e1(e) {
    let {routeContext: t, match: n, children: r} = e
      , i = N.useContext(ll);
    return i && i.static && i.staticContext && (n.route.errorElement || n.route.ErrorBoundary) && (i.staticContext._deepestRenderedBoundaryId = n.route.id),
    N.createElement(_n.Provider, {
        value: t
    }, r)
}
function t1(e, t, n, r) {
    var i;
    if (t === void 0 && (t = []),
    n === void 0 && (n = null),
    r === void 0 && (r = null),
    e == null) {
        var s;
        if (!n)
            return null;
        if (n.errors)
            e = n.matches;
        else if ((s = r) != null && s.v7_partialHydration && t.length === 0 && !n.initialized && n.matches.length > 0)
            e = n.matches;
        else
            return null
    }
    let a = e
      , o = (i = n) == null ? void 0 : i.errors;
    if (o != null) {
        let d = a.findIndex(f => f.route.id && (o == null ? void 0 : o[f.route.id]) !== void 0);
        d >= 0 || G(!1),
        a = a.slice(0, Math.min(a.length, d + 1))
    }
    let u = !1
      , c = -1;
    if (n && r && r.v7_partialHydration)
        for (let d = 0; d < a.length; d++) {
            let f = a[d];
            if ((f.route.HydrateFallback || f.route.hydrateFallbackElement) && (c = d),
            f.route.id) {
                let {loaderData: m, errors: y} = n
                  , S = f.route.loader && m[f.route.id] === void 0 && (!y || y[f.route.id] === void 0);
                if (f.route.lazy || S) {
                    u = !0,
                    c >= 0 ? a = a.slice(0, c + 1) : a = [a[0]];
                    break
                }
            }
        }
    return a.reduceRight( (d, f, m) => {
        let y, S = !1, w = null, b = null;
        n && (y = o && f.route.id ? o[f.route.id] : void 0,
        w = f.route.errorElement || J0,
        u && (c < 0 && m === 0 ? (l1("route-fallback"),
        S = !0,
        b = null) : c === m && (S = !0,
        b = f.route.hydrateFallbackElement || null)));
        let p = t.concat(a.slice(0, m + 1))
          , h = () => {
            let g;
            return y ? g = w : S ? g = b : f.route.Component ? g = N.createElement(f.route.Component, null) : f.route.element ? g = f.route.element : g = d,
            N.createElement(e1, {
                match: f,
                routeContext: {
                    outlet: d,
                    matches: p,
                    isDataRoute: n != null
                },
                children: g
            })
        }
        ;
        return n && (f.route.ErrorBoundary || f.route.errorElement || m === 0) ? N.createElement(Z0, {
            location: n.location,
            revalidation: n.revalidation,
            component: w,
            error: y,
            children: h(),
            routeContext: {
                outlet: null,
                matches: p,
                isDataRoute: !0
            }
        }) : h()
    }
    , null)
}
var oy = function(e) {
    return e.UseBlocker = "useBlocker",
    e.UseRevalidator = "useRevalidator",
    e.UseNavigateStable = "useNavigate",
    e
}(oy || {})
  , uy = function(e) {
    return e.UseBlocker = "useBlocker",
    e.UseLoaderData = "useLoaderData",
    e.UseActionData = "useActionData",
    e.UseRouteError = "useRouteError",
    e.UseNavigation = "useNavigation",
    e.UseRouteLoaderData = "useRouteLoaderData",
    e.UseMatches = "useMatches",
    e.UseRevalidator = "useRevalidator",
    e.UseNavigateStable = "useNavigate",
    e.UseRouteId = "useRouteId",
    e
}(uy || {});
function n1(e) {
    let t = N.useContext(ll);
    return t || G(!1),
    t
}
function r1(e) {
    let t = N.useContext(nd);
    return t || G(!1),
    t
}
function i1(e) {
    let t = N.useContext(_n);
    return t || G(!1),
    t
}
function cy(e) {
    let t = i1()
      , n = t.matches[t.matches.length - 1];
    return n.route.id || G(!1),
    n.route.id
}
function dy() {
    var e;
    let t = N.useContext(sy)
      , n = r1(uy.UseRouteError)
      , r = cy();
    return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r]
}
function s1() {
    let {router: e} = n1(oy.UseNavigateStable)
      , t = cy()
      , n = N.useRef(!1);
    return ly( () => {
        n.current = !0
    }
    ),
    N.useCallback(function(i, s) {
        s === void 0 && (s = {}),
        n.current && (typeof i == "number" ? e.navigate(i) : e.navigate(i, qs({
            fromRouteId: t
        }, s)))
    }, [e, t])
}
const sh = {};
function l1(e, t, n) {
    sh[e] || (sh[e] = !0)
}
function a1(e, t) {
    e == null || e.v7_startTransition,
    (e == null ? void 0 : e.v7_relativeSplatPath) === void 0 && (!t || t.v7_relativeSplatPath),
    t && (t.v7_fetcherPersist,
    t.v7_normalizeFormMethod,
    t.v7_partialHydration,
    t.v7_skipActionErrorRevalidation)
}
function fy(e) {
    let {to: t, replace: n, state: r, relative: i} = e;
    Yi() || G(!1);
    let {future: s, static: a} = N.useContext(Tn)
      , {matches: o} = N.useContext(_n)
      , {pathname: u} = Yr()
      , c = al()
      , d = qa(t, Ga(o, s.v7_relativeSplatPath), u, i === "path")
      , f = JSON.stringify(d);
    return N.useEffect( () => c(JSON.parse(f), {
        replace: n,
        state: r,
        relative: i
    }), [c, f, i, n, r]),
    null
}
function Ut(e) {
    G(!1)
}
function o1(e) {
    let {basename: t="/", children: n=null, location: r, navigationType: i=Ce.Pop, navigator: s, static: a=!1, future: o} = e;
    Yi() && G(!1);
    let u = t.replace(/^\/*/, "/")
      , c = N.useMemo( () => ({
        basename: u,
        navigator: s,
        static: a,
        future: qs({
            v7_relativeSplatPath: !1
        }, o)
    }), [u, o, s, a]);
    typeof r == "string" && (r = Pn(r));
    let {pathname: d="/", search: f="", hash: m="", state: y=null, key: S="default"} = r
      , w = N.useMemo( () => {
        let b = Nn(d, u);
        return b == null ? null : {
            location: {
                pathname: b,
                search: f,
                hash: m,
                state: y,
                key: S
            },
            navigationType: i
        }
    }
    , [u, d, f, m, y, S, i]);
    return w == null ? null : N.createElement(Tn.Provider, {
        value: c
    }, N.createElement(Ya.Provider, {
        children: n,
        value: w
    }))
}
function u1(e) {
    let {children: t, location: n} = e;
    return Y0(Ku(t), n)
}
new Promise( () => {}
);
function Ku(e, t) {
    t === void 0 && (t = []);
    let n = [];
    return N.Children.forEach(e, (r, i) => {
        if (!N.isValidElement(r))
            return;
        let s = [...t, i];
        if (r.type === N.Fragment) {
            n.push.apply(n, Ku(r.props.children, s));
            return
        }
        r.type !== Ut && G(!1),
        !r.props.index || !r.props.children || G(!1);
        let a = {
            id: r.props.id || s.join("-"),
            caseSensitive: r.props.caseSensitive,
            element: r.props.element,
            Component: r.props.Component,
            index: r.props.index,
            path: r.props.path,
            loader: r.props.loader,
            action: r.props.action,
            errorElement: r.props.errorElement,
            ErrorBoundary: r.props.ErrorBoundary,
            hasErrorBoundary: r.props.ErrorBoundary != null || r.props.errorElement != null,
            shouldRevalidate: r.props.shouldRevalidate,
            handle: r.props.handle,
            lazy: r.props.lazy
        };
        r.props.children && (a.children = Ku(r.props.children, s)),
        n.push(a)
    }
    ),
    n
}
function c1(e) {
    let t = {
        hasErrorBoundary: e.ErrorBoundary != null || e.errorElement != null
    };
    return e.Component && Object.assign(t, {
        element: N.createElement(e.Component),
        Component: void 0
    }),
    e.HydrateFallback && Object.assign(t, {
        hydrateFallbackElement: N.createElement(e.HydrateFallback),
        HydrateFallback: void 0
    }),
    e.ErrorBoundary && Object.assign(t, {
        errorElement: N.createElement(e.ErrorBoundary),
        ErrorBoundary: void 0
    }),
    t
}
/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function Bi() {
    return Bi = Object.assign ? Object.assign.bind() : function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }
    ,
    Bi.apply(this, arguments)
}
function hy(e, t) {
    if (e == null)
        return {};
    var n = {}, r = Object.keys(e), i, s;
    for (s = 0; s < r.length; s++)
        i = r[s],
        !(t.indexOf(i) >= 0) && (n[i] = e[i]);
    return n
}
function d1(e) {
    return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
}
function f1(e, t) {
    return e.button === 0 && (!t || t === "_self") && !d1(e)
}
const h1 = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"]
  , p1 = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"]
  , m1 = "6";
try {
    window.__reactRouterVersion = m1
} catch {}
function y1(e, t) {
    return R0({
        basename: void 0,
        future: Bi({}, void 0, {
            v7_prependBasename: !0
        }),
        history: Xx({
            window: void 0
        }),
        hydrationData: v1(),
        routes: e,
        mapRouteProperties: c1,
        dataStrategy: void 0,
        patchRoutesOnNavigation: void 0,
        window: void 0
    }).initialize()
}
function v1() {
    var e;
    let t = (e = window) == null ? void 0 : e.__staticRouterHydrationData;
    return t && t.errors && (t = Bi({}, t, {
        errors: g1(t.errors)
    })),
    t
}
function g1(e) {
    if (!e)
        return null;
    let t = Object.entries(e)
      , n = {};
    for (let[r,i] of t)
        if (i && i.__type === "RouteErrorResponse")
            n[r] = new Pa(i.status,i.statusText,i.data,i.internal === !0);
        else if (i && i.__type === "Error") {
            if (i.__subType) {
                let s = window[i.__subType];
                if (typeof s == "function")
                    try {
                        let a = new s(i.message);
                        a.stack = "",
                        n[r] = a
                    } catch {}
            }
            if (n[r] == null) {
                let s = new Error(i.message);
                s.stack = "",
                n[r] = s
            }
        } else
            n[r] = i;
    return n
}
const py = N.createContext({
    isTransitioning: !1
})
  , x1 = N.createContext(new Map)
  , w1 = "startTransition"
  , lh = ev[w1]
  , j1 = "flushSync"
  , ah = fx[j1];
function S1(e) {
    lh ? lh(e) : e()
}
function ds(e) {
    ah ? ah(e) : e()
}
class k1 {
    constructor() {
        this.status = "pending",
        this.promise = new Promise( (t, n) => {
            this.resolve = r => {
                this.status === "pending" && (this.status = "resolved",
                t(r))
            }
            ,
            this.reject = r => {
                this.status === "pending" && (this.status = "rejected",
                n(r))
            }
        }
        )
    }
}
function E1(e) {
    let {fallbackElement: t, router: n, future: r} = e
      , [i,s] = N.useState(n.state)
      , [a,o] = N.useState()
      , [u,c] = N.useState({
        isTransitioning: !1
    })
      , [d,f] = N.useState()
      , [m,y] = N.useState()
      , [S,w] = N.useState()
      , b = N.useRef(new Map)
      , {v7_startTransition: p} = r || {}
      , h = N.useCallback(R => {
        p ? S1(R) : R()
    }
    , [p])
      , g = N.useCallback( (R, F) => {
        let {deletedFetchers: L, flushSync: X, viewTransitionOpts: re} = F;
        R.fetchers.forEach( (je, He) => {
            je.data !== void 0 && b.current.set(He, je.data)
        }
        ),
        L.forEach(je => b.current.delete(je));
        let we = n.window == null || n.window.document == null || typeof n.window.document.startViewTransition != "function";
        if (!re || we) {
            X ? ds( () => s(R)) : h( () => s(R));
            return
        }
        if (X) {
            ds( () => {
                m && (d && d.resolve(),
                m.skipTransition()),
                c({
                    isTransitioning: !0,
                    flushSync: !0,
                    currentLocation: re.currentLocation,
                    nextLocation: re.nextLocation
                })
            }
            );
            let je = n.window.document.startViewTransition( () => {
                ds( () => s(R))
            }
            );
            je.finished.finally( () => {
                ds( () => {
                    f(void 0),
                    y(void 0),
                    o(void 0),
                    c({
                        isTransitioning: !1
                    })
                }
                )
            }
            ),
            ds( () => y(je));
            return
        }
        m ? (d && d.resolve(),
        m.skipTransition(),
        w({
            state: R,
            currentLocation: re.currentLocation,
            nextLocation: re.nextLocation
        })) : (o(R),
        c({
            isTransitioning: !0,
            flushSync: !1,
            currentLocation: re.currentLocation,
            nextLocation: re.nextLocation
        }))
    }
    , [n.window, m, d, b, h]);
    N.useLayoutEffect( () => n.subscribe(g), [n, g]),
    N.useEffect( () => {
        u.isTransitioning && !u.flushSync && f(new k1)
    }
    , [u]),
    N.useEffect( () => {
        if (d && a && n.window) {
            let R = a
              , F = d.promise
              , L = n.window.document.startViewTransition(async () => {
                h( () => s(R)),
                await F
            }
            );
            L.finished.finally( () => {
                f(void 0),
                y(void 0),
                o(void 0),
                c({
                    isTransitioning: !1
                })
            }
            ),
            y(L)
        }
    }
    , [h, a, d, n.window]),
    N.useEffect( () => {
        d && a && i.location.key === a.location.key && d.resolve()
    }
    , [d, m, i.location, a]),
    N.useEffect( () => {
        !u.isTransitioning && S && (o(S.state),
        c({
            isTransitioning: !0,
            flushSync: !1,
            currentLocation: S.currentLocation,
            nextLocation: S.nextLocation
        }),
        w(void 0))
    }
    , [u.isTransitioning, S]),
    N.useEffect( () => {}
    , []);
    let k = N.useMemo( () => ({
        createHref: n.createHref,
        encodeLocation: n.encodeLocation,
        go: R => n.navigate(R),
        push: (R, F, L) => n.navigate(R, {
            state: F,
            preventScrollReset: L == null ? void 0 : L.preventScrollReset
        }),
        replace: (R, F, L) => n.navigate(R, {
            replace: !0,
            state: F,
            preventScrollReset: L == null ? void 0 : L.preventScrollReset
        })
    }), [n])
      , P = n.basename || "/"
      , O = N.useMemo( () => ({
        router: n,
        navigator: k,
        static: !1,
        basename: P
    }), [n, k, P])
      , j = N.useMemo( () => ({
        v7_relativeSplatPath: n.future.v7_relativeSplatPath
    }), [n.future.v7_relativeSplatPath]);
    return N.useEffect( () => a1(r, n.future), [r, n.future]),
    N.createElement(N.Fragment, null, N.createElement(ll.Provider, {
        value: O
    }, N.createElement(nd.Provider, {
        value: i
    }, N.createElement(x1.Provider, {
        value: b.current
    }, N.createElement(py.Provider, {
        value: u
    }, N.createElement(o1, {
        basename: P,
        location: i.location,
        navigationType: i.historyAction,
        navigator: k,
        future: j
    }, i.initialized || n.future.v7_partialHydration ? N.createElement(N1, {
        routes: n.routes,
        future: n.future,
        state: i
    }) : t))))), null)
}
const N1 = N.memo(b1);
function b1(e) {
    let {routes: t, future: n, state: r} = e;
    return ay(t, void 0, r, n)
}
const C1 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u"
  , R1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i
  , ye = N.forwardRef(function(t, n) {
    let {onClick: r, relative: i, reloadDocument: s, replace: a, state: o, target: u, to: c, preventScrollReset: d, viewTransition: f} = t, m = hy(t, h1), {basename: y} = N.useContext(Tn), S, w = !1;
    if (typeof c == "string" && R1.test(c) && (S = c,
    C1))
        try {
            let g = new URL(window.location.href)
              , k = c.startsWith("//") ? new URL(g.protocol + c) : new URL(c)
              , P = Nn(k.pathname, y);
            k.origin === g.origin && P != null ? c = P + k.search + k.hash : w = !0
        } catch {}
    let b = G0(c, {
        relative: i
    })
      , p = T1(c, {
        replace: a,
        state: o,
        target: u,
        preventScrollReset: d,
        relative: i,
        viewTransition: f
    });
    function h(g) {
        r && r(g),
        g.defaultPrevented || p(g)
    }
    return N.createElement("a", Bi({}, m, {
        href: S || b,
        onClick: w || s ? r : h,
        ref: n,
        target: u
    }))
})
  , Zl = N.forwardRef(function(t, n) {
    let {"aria-current": r="page", caseSensitive: i=!1, className: s="", end: a=!1, style: o, to: u, viewTransition: c, children: d} = t
      , f = hy(t, p1)
      , m = Xa(u, {
        relative: f.relative
    })
      , y = Yr()
      , S = N.useContext(nd)
      , {navigator: w, basename: b} = N.useContext(Tn)
      , p = S != null && _1(m) && c === !0
      , h = w.encodeLocation ? w.encodeLocation(m).pathname : m.pathname
      , g = y.pathname
      , k = S && S.navigation && S.navigation.location ? S.navigation.location.pathname : null;
    i || (g = g.toLowerCase(),
    k = k ? k.toLowerCase() : null,
    h = h.toLowerCase()),
    k && b && (k = Nn(k, b) || k);
    const P = h !== "/" && h.endsWith("/") ? h.length - 1 : h.length;
    let O = g === h || !a && g.startsWith(h) && g.charAt(P) === "/", j = k != null && (k === h || !a && k.startsWith(h) && k.charAt(h.length) === "/"), R = {
        isActive: O,
        isPending: j,
        isTransitioning: p
    }, F = O ? r : void 0, L;
    typeof s == "function" ? L = s(R) : L = [s, O ? "active" : null, j ? "pending" : null, p ? "transitioning" : null].filter(Boolean).join(" ");
    let X = typeof o == "function" ? o(R) : o;
    return N.createElement(ye, Bi({}, f, {
        "aria-current": F,
        className: L,
        ref: n,
        style: X,
        to: u,
        viewTransition: c
    }), typeof d == "function" ? d(R) : d)
});
var Gu;
(function(e) {
    e.UseScrollRestoration = "useScrollRestoration",
    e.UseSubmit = "useSubmit",
    e.UseSubmitFetcher = "useSubmitFetcher",
    e.UseFetcher = "useFetcher",
    e.useViewTransitionState = "useViewTransitionState"
}
)(Gu || (Gu = {}));
var oh;
(function(e) {
    e.UseFetcher = "useFetcher",
    e.UseFetchers = "useFetchers",
    e.UseScrollRestoration = "useScrollRestoration"
}
)(oh || (oh = {}));
function P1(e) {
    let t = N.useContext(ll);
    return t || G(!1),
    t
}
function T1(e, t) {
    let {target: n, replace: r, state: i, preventScrollReset: s, relative: a, viewTransition: o} = t === void 0 ? {} : t
      , u = al()
      , c = Yr()
      , d = Xa(e, {
        relative: a
    });
    return N.useCallback(f => {
        if (f1(f, n)) {
            f.preventDefault();
            let m = r !== void 0 ? r : Kr(c) === Kr(d);
            u(e, {
                replace: m,
                state: i,
                preventScrollReset: s,
                relative: a,
                viewTransition: o
            })
        }
    }
    , [c, u, d, r, i, n, e, s, a, o])
}
function _1(e, t) {
    t === void 0 && (t = {});
    let n = N.useContext(py);
    n == null && G(!1);
    let {basename: r} = P1(Gu.useViewTransitionState)
      , i = Xa(e, {
        relative: t.relative
    });
    if (!n.isTransitioning)
        return !1;
    let s = Nn(n.currentLocation.pathname, r) || n.currentLocation.pathname
      , a = Nn(n.nextLocation.pathname, r) || n.nextLocation.pathname;
    return Ra(i.pathname, a) != null || Ra(i.pathname, s) != null
}
const L1 = {
    light: 1,
    regular: 1.5,
    heavy: 2.25
};
function my({size: e=32, weight: t="regular", pupil: n="currentColor", decorative: r=!1, ...i}) {
    const s = L1[t]
      , a = 16
      , o = 16
      , u = 14
      , c = 4
      , d = 12
      , f = 5.5
      , m = Array.from({
        length: 8
    }, (S, w) => {
        const b = (22.5 + w * 45) * Math.PI / 180;
        return {
            x1: a + f * Math.cos(b),
            y1: o + f * Math.sin(b),
            x2: a + d * Math.cos(b),
            y2: o + d * Math.sin(b)
        }
    }
    )
      , y = r ? {
        "aria-hidden": !0
    } : {
        role: "img",
        "aria-label": i["aria-label"] ?? "Iris aperture mark"
    };
    return l.jsxs("svg", {
        width: e,
        height: e,
        viewBox: "0 0 32 32",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...y,
        ...i,
        children: [l.jsx("circle", {
            cx: a,
            cy: o,
            r: u,
            stroke: "currentColor",
            strokeWidth: s
        }), m.map( (S, w) => l.jsx("line", {
            x1: S.x1,
            y1: S.y1,
            x2: S.x2,
            y2: S.y2,
            stroke: "currentColor",
            strokeWidth: s,
            strokeLinecap: "round"
        }, w)), l.jsx("circle", {
            cx: a,
            cy: o,
            r: c,
            fill: n
        })]
    })
}
function rd({height: e=32, className: t}) {
    return l.jsxs("span", {
        className: `inline-flex items-center gap-3 ${t ?? ""}`,
        style: {
            height: e
        },
        children: [l.jsx(my, {
            size: e,
            weight: "regular",
            decorative: !0
        }), l.jsxs("span", {
            className: "flex flex-col leading-none",
            children: [l.jsx("span", {
                style: {
                    fontSize: e * .62,
                    letterSpacing: "-0.02em"
                },
                children: "iris"
            }), l.jsx("span", {
                style: {
                    fontSize: e * .26
                },
                children: "SCIENCES"
            })]
        })]
    })
}
const Ta = "iris-case-token";
function ul() {
    if (typeof window > "u")
        return null;
    const e = new URL(window.location.href)
      , t = e.searchParams.get("t");
    return t ? (localStorage.setItem(Ta, t),
    e.searchParams.delete("t"),
    window.history.replaceState({}, "", e.toString()),
    t) : localStorage.getItem(Ta)
}
function O1(e) {
    if (typeof window > "u")
        return;
    const t = e.trim();
    t ? localStorage.setItem(Ta, t) : localStorage.removeItem(Ta)
}
async function Ve(e, t={}) {
    const n = new Headers(t.headers)
      , r = ul();
    return r && n.set("X-Case-Token", r),
    !n.has("Content-Type") && t.body && n.set("Content-Type", "application/json"),
    fetch(`/api${e}`, {
        credentials: "include",
        ...t,
        headers: n
    })
}
class Ja extends Error {
    constructor(t, n, r) {
        super(r),
        this.status = t,
        this.body = n
    }
}
class yy extends Error {
    constructor(t, n) {
        super(n.message),
        this.status = t,
        this.detail = n
    }
}
async function lt(e) {
    if (!e.ok) {
        let t = null;
        try {
            t = await e.json()
        } catch {}
        throw new Ja(e.status,t,`HTTP ${e.status} ${e.statusText}`)
    }
    return await e.json()
}
const Do = {
    async login(e, t) {
        const n = new URLSearchParams;
        n.set("role_id", e),
        n.set("password", t);
        const r = await fetch("/api/auth/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "X-Case-Token": ul() ?? "",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: n.toString()
        });
        if (!r.ok) {
            const i = {
                message: `HTTP ${r.status} ${r.statusText || "Login failed"}`
            }
              , s = await r.json().catch( () => null)
              , a = s && typeof s.detail == "object" && s.detail !== null ? s.detail : s && typeof s.detail == "string" ? {
                message: s.detail
            } : i;
            throw new yy(r.status,a)
        }
        return r.json()
    },
    async logout() {
        await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include"
        })
    },
    async me() {
        const e = await Ve("/auth/me");
        if (e.status === 401)
            return null;
        if (!e.ok)
            throw new Ja(e.status,null,`HTTP ${e.status}`);
        return e.json()
    }
}
  , ze = {
    async dashboard() {
        return lt(await Ve("/admin/dashboard"))
    },
    async subjects(e) {
        const t = e ? `?q=${encodeURIComponent(e)}` : "";
        return lt(await Ve(`/admin/subjects${t}`))
    },
    async subject(e) {
        return lt(await Ve(`/admin/subjects/${encodeURIComponent(e)}`))
    },
    async deleteSubject(e) {
        const t = await Ve(`/admin/subjects/${encodeURIComponent(e)}`, {
            method: "DELETE"
        });
        if (!t.ok)
            throw new Ja(t.status,null,`HTTP ${t.status}`)
    },
    async patchSubject(e, t) {
        return lt(await Ve(`/admin/subjects/${encodeURIComponent(e)}`, {
            method: "PATCH",
            body: JSON.stringify(t)
        }))
    },
    async chambers() {
        return lt(await Ve("/admin/chambers"))
    },
    async chamber(e) {
        return lt(await Ve(`/admin/chambers/${encodeURIComponent(e)}`))
    },
    async sessions(e, t) {
        const n = new URLSearchParams;
        e && n.set("state", e),
        t != null && n.set("page", String(t));
        const r = n.toString() ? `?${n}` : "";
        return lt(await Ve(`/admin/sessions${r}`))
    },
    async apparatus() {
        return lt(await Ve("/admin/apparatus"))
    },
    async audit(e) {
        const t = new URLSearchParams;
        e != null && e.severity && t.set("severity", e.severity),
        e != null && e.actor && t.set("actor", e.actor);
        const n = t.toString() ? `?${t}` : "";
        return lt(await Ve(`/admin/audit${n}`))
    },
    async roles() {
        return lt(await Ve("/admin/roles"))
    },
    async methodology() {
        return lt(await Ve("/admin/methodology"))
    },
    exportCsvUrl() {
        const e = ul();
        return `/api/admin/reports/export${e ? `?t=${e}` : ""}`
    }
}
  , qu = {
    schedule: e => Ve("/admin/sessions", {
        method: "POST",
        body: JSON.stringify(e)
    }).then(t => lt(t)),
    approve: e => Ve(`/admin/sessions/${e}/approve`, {
        method: "POST"
    }).then(t => lt(t)),
    reject: e => Ve(`/admin/sessions/${e}/reject`, {
        method: "POST"
    }).then(t => lt(t))
}
  , id = N.createContext(null);
function I1({children: e}) {
    const [t,n] = N.useState(null)
      , [r,i] = N.useState(!0);
    N.useEffect( () => {
        let u = !1;
        return Do.me().then(c => {
            u || n((c == null ? void 0 : c.role) ?? null)
        }
        ).catch( () => {
            u || n(null)
        }
        ).finally( () => {
            u || i(!1)
        }
        ),
        () => {
            u = !0
        }
    }
    , []);
    const s = N.useCallback(async (u, c) => {
        const d = await Do.login(u, c);
        return n(d.role),
        d.role
    }
    , [])
      , a = N.useCallback(async () => {
        await Do.logout(),
        n(null)
    }
    , [])
      , o = N.useMemo( () => ({
        role: t,
        loading: r,
        login: s,
        logout: a
    }), [t, r, s, a]);
    return l.jsx(id.Provider, {
        value: o,
        children: e
    })
}
function sd() {
    const e = N.useContext(id);
    if (!e)
        throw new Error("useAuth must be used inside <AuthProvider>");
    return e
}
const D1 = [{
    to: "/admin",
    key: "dashboard",
    label: "Dashboard",
    end: !0
}, {
    to: "/admin/subjects",
    key: "subjects",
    label: "Subjects"
}, {
    to: "/admin/chambers",
    key: "chambers",
    label: "Chambers"
}, {
    to: "/admin/sessions",
    key: "sessions",
    label: "Sessions"
}, {
    to: "/admin/approvals",
    key: "approvals",
    label: "Approvals"
}, {
    to: "/admin/apparatus",
    key: "apparatus",
    label: "Apparatus"
}, {
    to: "/admin/reports",
    key: "reports",
    label: "Reports"
}, {
    to: "/admin/audit",
    key: "audit",
    label: "Audit"
}, {
    to: "/admin/methodology",
    key: "methodology",
    label: "Methodology",
    directorOnly: !0
}];
function Yt({active: e, banner: t, topbarRight: n, children: r}) {
    var o;
    const i = N.useContext(id)
      , s = ((o = i == null ? void 0 : i.role) == null ? void 0 : o.slug) === "director"
      , a = D1.filter(u => !("directorOnly"in u && u.directorOnly) || s);
    return l.jsxs("div", {
        className: "modern flex min-h-screen",
        children: [l.jsx("a", {
            className: "skip-to-content",
            href: "#admin-main",
            children: "Skip to content"
        }), l.jsxs("aside", {
            role: "navigation",
            className: "w-60 border-r border-modern-line bg-modern-surface",
            children: [l.jsx("div", {
                className: "px-6 py-5",
                children: l.jsx(rd, {
                    height: 28
                })
            }), l.jsx("nav", {
                "aria-label": "Admin sections",
                className: "flex flex-col gap-0.5 px-3 py-2",
                children: a.map(u => l.jsx(Zl, {
                    to: u.to,
                    end: "end"in u ? u.end : void 0,
                    "aria-current": e === u.key ? "page" : void 0,
                    className: ({isActive: c}) => ["rounded-md px-3 py-2 text-sm", c || e === u.key ? "bg-iris-25 text-iris-700 font-semibold" : "text-modern-ink-2 hover:bg-modern-tile"].join(" "),
                    children: u.label
                }, u.key))
            })]
        }), l.jsxs("div", {
            className: "flex flex-1 flex-col",
            children: [t ? l.jsx("div", {
                className: "bg-modern-surface",
                children: t
            }) : null, l.jsxs("header", {
                className: "flex items-center justify-between gap-4 border-b border-modern-line bg-modern-surface px-6 py-3",
                children: [l.jsx("input", {
                    type: "search",
                    placeholder: "Search subjects, chambers, sessions…",
                    className: "w-80 rounded-full border border-modern-line bg-modern-bg px-4 py-1.5 text-sm placeholder:text-modern-ink-3",
                    "aria-label": "Search admin records"
                }), l.jsxs("div", {
                    className: "flex items-center gap-3",
                    children: [n, l.jsx(ye, {
                        to: "/",
                        className: "text-sm text-modern-ink-3 hover:text-modern-ink",
                        children: "Public site →"
                    })]
                })]
            }), l.jsx("main", {
                id: "admin-main",
                className: "flex-1 px-8 py-6",
                children: r
            })]
        })]
    })
}
function be({interactive: e=!1, className: t="", children: n, ...r}) {
    return l.jsx("div", {
        className: ["bg-modern-surface border border-modern-line rounded-2xl shadow-xs", e ? "transition-shadow hover:shadow-sm hover:-translate-y-px" : "", t].filter(Boolean).join(" "),
        ...r,
        children: n
    })
}
function M1(e) {
    if (e instanceof Error)
        return e.message;
    if (typeof e == "string")
        return e;
    try {
        return JSON.stringify(e)
    } catch {
        return "Unknown error"
    }
}
function F1() {
    const e = dy()
      , t = M1(e);
    return l.jsx(Yt, {
        active: "dashboard",
        children: l.jsxs(be, {
            className: "mx-auto max-w-lg p-6",
            children: [l.jsx("h1", {
                className: "text-lg font-semibold text-modern-ink",
                children: "Something went wrong"
            }), l.jsx("p", {
                className: "mt-2 text-sm text-modern-ink-2",
                children: "This section hit an error while rendering. You can retry or go back."
            }), l.jsx("p", {
                className: "mt-4 text-xs text-modern-ink-3 font-modern-mono break-all",
                children: t
            }), l.jsxs("div", {
                className: "mt-6 flex gap-3",
                children: [l.jsx(ye, {
                    to: "/admin",
                    className: "text-sm font-medium text-iris-700 hover:underline",
                    children: "Back to dashboard"
                }), l.jsx(ye, {
                    to: "/",
                    className: "text-sm text-modern-ink-3 hover:text-modern-ink",
                    children: "Public site"
                })]
            })]
        })
    })
}
const A1 = {
    Δ: "delta",
    Σ: "sigma",
    α: "alpha",
    β: "beta",
    γ: "gamma",
    Ω: "omega"
};
function tt({children: e}) {
    const t = A1[e] ?? e;
    return l.jsx("span", {
        "aria-label": t,
        role: "img",
        children: e
    })
}
const z1 = [{
    to: "/heritage",
    key: "heritage",
    label: "Heritage"
}, {
    to: "/reports",
    key: "reports",
    label: "Reports"
}];
function ld({active: e, children: t}) {
    return l.jsxs("div", {
        className: "modern flex min-h-screen flex-col",
        children: [l.jsx("a", {
            className: "skip-to-content",
            href: "#main",
            children: "Skip to content"
        }), l.jsx("header", {
            className: "border-b border-modern-line bg-modern-surface",
            children: l.jsxs("div", {
                className: "mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-4",
                children: [l.jsx(ye, {
                    to: "/",
                    "aria-current": e === "home" ? "page" : void 0,
                    className: "flex items-center",
                    children: l.jsx(rd, {
                        height: 32
                    })
                }), l.jsxs("nav", {
                    className: "flex items-center gap-6",
                    children: [z1.map(n => l.jsx(ye, {
                        to: n.to,
                        "aria-current": e === n.key ? "page" : void 0,
                        className: e === n.key ? "text-modern-ink underline underline-offset-8" : "text-modern-ink-2 hover:text-modern-ink",
                        children: n.label
                    }, n.key)), l.jsx(ye, {
                        to: "/login",
                        "aria-current": e === "login" ? "page" : void 0,
                        className: "rounded-full border border-modern-line-2 px-4 py-1.5 text-sm font-medium text-modern-ink hover:bg-modern-tile",
                        children: "Staff login"
                    })]
                })]
            })
        }), l.jsx("main", {
            id: "main",
            className: "flex-1",
            children: t
        }), l.jsx("footer", {
            className: "border-t border-modern-line bg-modern-surface",
            children: l.jsxs("div", {
                className: "mx-auto max-w-6xl px-6 py-12",
                children: [l.jsxs("div", {
                    className: "grid grid-cols-2 gap-8 md:grid-cols-4",
                    children: [l.jsxs("div", {
                        className: "flex items-start gap-3",
                        children: [l.jsx(my, {
                            size: 28,
                            weight: "regular",
                            decorative: !0,
                            className: "text-iris-500"
                        }), l.jsxs("div", {
                            className: "text-sm text-modern-ink-2",
                            children: ["Iris Sciences", l.jsx("br", {}), "Wing ", l.jsx(tt, {
                                children: "Δ"
                            }), " Research Facility"]
                        })]
                    }), l.jsxs("div", {
                        className: "text-sm",
                        children: [l.jsx("p", {
                            className: "mb-2 font-semibold text-modern-ink",
                            children: "About"
                        }), l.jsx("ul", {
                            className: "space-y-1 text-modern-ink-2",
                            children: l.jsx("li", {
                                children: l.jsx(ye, {
                                    to: "/heritage",
                                    children: "Our Heritage"
                                })
                            })
                        })]
                    }), l.jsxs("div", {
                        className: "text-sm",
                        children: [l.jsx("p", {
                            className: "mb-2 font-semibold text-modern-ink",
                            children: "Reports"
                        }), l.jsx("ul", {
                            className: "space-y-1 text-modern-ink-2",
                            children: l.jsx("li", {
                                children: l.jsx(ye, {
                                    to: "/reports",
                                    children: "Annual Reports"
                                })
                            })
                        })]
                    }), l.jsxs("div", {
                        className: "text-sm",
                        children: [l.jsx("p", {
                            className: "mb-2 font-semibold text-modern-ink",
                            children: "Press"
                        }), l.jsx("ul", {
                            className: "space-y-1 text-modern-ink-2",
                            children: l.jsx("li", {
                                children: l.jsx("a", {
                                    href: "mailto:press@iris-sciences.example",
                                    children: "press@iris-sciences.example"
                                })
                            })
                        })]
                    })]
                }), l.jsx("div", {
                    className: "mt-10 rounded-2xl bg-bloom-50 px-6 py-4 text-bloom-700",
                    children: l.jsx("p", {
                        className: "text-sm",
                        children: "Subject welfare is monitored continuously and reviewed each quarter."
                    })
                }), l.jsxs("div", {
                    className: "mt-6 flex items-center justify-between text-xs text-modern-ink-3",
                    children: [l.jsx("p", {
                        children: "© 2024 Iris Sciences. All rights reserved."
                    }), l.jsx(ye, {
                        to: "/login",
                        className: "text-modern-ink-3 hover:text-modern-ink",
                        children: "Operations Portal →"
                    })]
                })]
            })
        })]
    })
}
const U1 = {
    primary: "bg-iris-500 hover:bg-iris-600 text-white border border-transparent",
    secondary: "bg-modern-surface hover:bg-modern-tile text-modern-ink border border-modern-line-2",
    ghost: "bg-transparent hover:bg-modern-tile text-modern-ink-2 border border-transparent"
}
  , Q1 = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-5 py-2.5"
};
function dt({variant: e="primary", size: t="md", className: n="", children: r, ...i}) {
    return l.jsx("button", {
        className: ["inline-flex items-center gap-2 rounded-full font-medium transition-colors", "disabled:opacity-50 disabled:cursor-not-allowed", U1[e], Q1[t], n].join(" "),
        ...i,
        children: r
    })
}
function $i({color: e="iris", children: t, className: n=""}) {
    const r = e === "iris" ? "text-iris-600" : "text-bloom-600";
    return l.jsx("p", {
        className: ["text-xs font-semibold uppercase tracking-[0.12em]", r, n].join(" "),
        children: t
    })
}
const H1 = {
    1: "text-5xl tracking-[-0.025em] leading-[1.1]",
    2: "text-3xl tracking-[-0.02em] leading-[1.15]",
    3: "text-[22px] tracking-[-0.015em] leading-[1.25]",
    4: "text-base leading-[1.4]"
};
function Wi({level: e, children: t, className: n=""}) {
    const r = `h${e}`;
    return l.jsx(r, {
        className: ["font-modern font-semibold text-modern-ink", H1[e], n].join(" "),
        children: t
    })
}
function ri({label: e, figure: t, delta: n, secondary: r, meta: i, sparkline: s, className: a=""}) {
    return l.jsxs(be, {
        className: `p-6 ${a}`,
        children: [l.jsxs("div", {
            className: "flex items-baseline justify-between gap-4",
            children: [l.jsx("div", {
                className: "text-xs font-semibold uppercase tracking-[0.12em] text-modern-ink-3",
                children: e
            }), s ? l.jsx("div", {
                className: "opacity-80",
                children: s
            }) : null]
        }), l.jsx("div", {
            className: "mt-3 text-5xl font-semibold tracking-[-0.02em] text-modern-ink leading-none",
            children: t
        }), l.jsxs("div", {
            className: "mt-4 flex flex-wrap gap-2",
            children: [n ? l.jsxs("span", {
                className: ["inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium", n.sentiment === "up" ? "text-modern-success" : "text-modern-error", "bg-[rgba(79,138,79,0.10)]"].join(" "),
                children: [l.jsx("span", {
                    "aria-hidden": !0,
                    children: n.sentiment === "up" ? "▲" : "▼"
                }), n.text]
            }) : null, r ? l.jsxs("span", {
                className: "inline-flex items-center gap-1 rounded-full bg-bloom-50 text-bloom-700 px-2.5 py-0.5 text-xs font-medium",
                children: [l.jsx("span", {
                    className: "h-1.5 w-1.5 rounded-full bg-bloom-400",
                    "aria-hidden": !0
                }), r.text]
            }) : null]
        }), i ? l.jsx("p", {
            className: "mt-4 text-xs leading-relaxed text-modern-ink-3 font-modern-mono",
            children: i
        }) : null]
    })
}
function Yu({values: e, width: t=96, height: n=28, color: r="var(--iris-500)"}) {
    if (e.length < 2)
        return null;
    const i = Math.min(...e)
      , s = Math.max(...e)
      , a = s - i || 1
      , o = e.map( (u, c) => `${(c / (e.length - 1) * t).toFixed(1)},${(n - (u - i) / a * n).toFixed(1)}`).join(" ");
    return l.jsx("svg", {
        width: t,
        height: n,
        viewBox: `0 0 ${t} ${n}`,
        "aria-hidden": !0,
        role: "presentation",
        children: l.jsx("polyline", {
            points: o,
            fill: "none",
            stroke: r,
            strokeWidth: 1.5,
            strokeLinejoin: "round",
            strokeLinecap: "round"
        })
    })
}
function yt({eyebrow: e, eyebrowColor: t="iris", title: n, description: r, action: i}) {
    return l.jsxs("div", {
        className: "flex flex-wrap items-end justify-between gap-4 pb-4",
        children: [l.jsxs("div", {
            className: "flex flex-col gap-2",
            children: [e ? l.jsx($i, {
                color: t,
                children: e
            }) : null, l.jsx(Wi, {
                level: 2,
                children: n
            }), r ? l.jsx("p", {
                className: "max-w-prose text-modern-ink-2",
                children: r
            }) : null]
        }), i ? l.jsx("div", {
            children: i
        }) : null]
    })
}
const B1 = {
    active: "bg-iris-500",
    info: "bg-bloom-400",
    success: "bg-modern-success",
    warning: "bg-modern-warning",
    error: "bg-modern-error"
}
  , $1 = {
    active: "bg-iris-50 text-iris-700",
    info: "bg-bloom-50 text-bloom-700",
    success: "bg-[rgba(79,138,79,0.12)] text-modern-success",
    warning: "bg-[rgba(196,154,42,0.14)] text-modern-warning",
    error: "bg-[rgba(179,58,58,0.12)] text-modern-error"
};
function bn({status: e="info", children: t, className: n=""}) {
    return l.jsxs("span", {
        className: ["inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium", $1[e], n].join(" "),
        children: [l.jsx("span", {
            className: `h-1.5 w-1.5 rounded-full ${B1[e]}`,
            "aria-hidden": !0
        }), t]
    })
}
const W1 = {
    active: {
        status: "active",
        label: "Active"
    },
    concluded: {
        status: "success",
        label: "Concluded"
    },
    planned: {
        status: "warning",
        label: "Planned"
    }
};
function V1({code: e, name: t, subjects: n, status: r="active"}) {
    const i = W1[r];
    return l.jsxs(be, {
        interactive: !0,
        className: "flex flex-col gap-3 p-5",
        children: [l.jsxs("div", {
            className: "flex items-center justify-between",
            children: [l.jsx("span", {
                className: "font-modern-mono text-xs text-modern-ink-3",
                children: e
            }), l.jsx(bn, {
                status: i.status,
                children: i.label
            })]
        }), l.jsx("h3", {
            className: "text-lg font-semibold text-modern-ink leading-tight",
            children: t
        }), l.jsxs("p", {
            className: "text-sm text-modern-ink-2",
            children: [n, " enrolled subjects"]
        })]
    })
}
function K1({subjectId: e, name: t, role: n, lifecycle: r, lifecycleStatus: i="active", onClick: s}) {
    return l.jsx(be, {
        interactive: !0,
        className: "flex flex-col gap-3 overflow-hidden p-0",
        children: l.jsxs("button", {
            type: "button",
            onClick: s,
            className: "flex flex-col gap-3 p-0 text-left w-full",
            children: [l.jsx("div", {
                className: "aspect-[4/5] w-full bg-founder-sepia",
                "aria-label": `Sepia portrait placeholder for ${t}`,
                role: "img",
                style: {
                    backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(0,0,0,0.18))"
                }
            }), l.jsxs("div", {
                className: "px-4 pb-4",
                children: [l.jsx("p", {
                    className: "font-modern-mono text-xs text-modern-ink-3",
                    children: e
                }), l.jsx("p", {
                    className: "mt-0.5 text-base font-semibold text-modern-ink",
                    children: t
                }), l.jsx("p", {
                    className: "text-sm text-modern-ink-2",
                    children: n
                }), l.jsx("div", {
                    className: "mt-2",
                    children: l.jsx(bn, {
                        status: i === "concluded" ? "success" : "active",
                        children: r
                    })
                })]
            })]
        })
    })
}
function vt(e) {
    N.useEffect( () => {
        const t = document.title;
        return document.title = e ? `${e} — Iris Sciences` : "Iris Sciences",
        () => {
            document.title = t
        }
    }
    , [e])
}
const G1 = [{
    code: "PRG-014",
    name: "Cognitive load mapping",
    subjects: 42
}, {
    code: "PRG-021",
    name: "Spatial navigation",
    subjects: 28
}, {
    code: "PRG-031",
    name: "Apparatus tolerance study",
    subjects: 19
}]
  , q1 = [{
    subjectId: "S-101",
    name: "Hazel Whitfield",
    role: "Test Subject",
    lifecycle: "Active · Wing B",
    lifecycleStatus: "active"
}, {
    subjectId: "S-088",
    name: "Clarence Owens",
    role: "Test Subject",
    lifecycle: "Active · Wing Γ",
    lifecycleStatus: "active"
}, {
    subjectId: "S-014",
    name: "Margery Stoll",
    role: "Test Subject",
    lifecycle: "Concluded · Q3 1971",
    lifecycleStatus: "concluded"
}, {
    subjectId: "S-205",
    name: "Dean Foulks",
    role: "Test Subject",
    lifecycle: "Active · Wing B",
    lifecycleStatus: "active"
}];
function Y1() {
    return vt("Public Outcomes Summary"),
    l.jsxs(ld, {
        active: "home",
        children: [l.jsxs("section", {
            className: "mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2",
            children: [l.jsxs("div", {
                className: "flex flex-col gap-5",
                children: [l.jsx($i, {
                    children: "Q1 2026 · Public Outcomes Summary"
                }), l.jsx(Wi, {
                    level: 1,
                    children: "Advancing enrichment outcomes through rigorous methodology."
                }), l.jsxs("p", {
                    className: "max-w-prose text-modern-ink-2",
                    children: ["Iris Sciences operates the Wing ", l.jsx(tt, {
                        children: "Δ"
                    }), " research facility under continuous-enrichment principles. Our quarterly index tracks subject welfare, program throughput, and apparatus uptime across all active studies."]
                }), l.jsxs("div", {
                    className: "mt-2 flex gap-3",
                    children: [l.jsx(ye, {
                        to: "/programs",
                        children: l.jsx(dt, {
                            variant: "primary",
                            children: "Explore programs →"
                        })
                    }), l.jsx(ye, {
                        to: "/reports",
                        children: l.jsx(dt, {
                            variant: "secondary",
                            children: "Read the report"
                        })
                    })]
                })]
            }), l.jsx(ri, {
                label: "Quarterly Enrichment Index",
                figure: "87.4%",
                delta: {
                    text: "+2.1 pts vs Q4 2025",
                    sentiment: "up"
                },
                secondary: {
                    text: "welfare 0.94 · attrition 0.6%"
                },
                meta: "Computed from 318 enrolled subjects across 6 active programs · Methodology: Iris Std. Index v4.2",
                sparkline: l.jsx(Yu, {
                    values: [80.1, 81.8, 82.5, 84, 84.6, 85.3, 87.4]
                })
            })]
        }), l.jsxs("section", {
            className: "mx-auto max-w-6xl px-6 py-12",
            children: [l.jsx(yt, {
                eyebrow: "Active research",
                title: "Current programs",
                action: l.jsx(ye, {
                    to: "/programs",
                    className: "text-iris-600 hover:underline",
                    children: "All programs →"
                })
            }), l.jsx("div", {
                className: "grid gap-4 md:grid-cols-3",
                children: G1.map(e => l.jsx(V1, {
                    ...e
                }, e.code))
            })]
        }), l.jsxs("section", {
            className: "mx-auto max-w-6xl px-6 py-12",
            children: [l.jsx(yt, {
                eyebrow: "Subject spotlight",
                title: "Lifelong enrichment trajectories",
                action: l.jsx(ye, {
                    to: "/spotlight",
                    className: "text-iris-600 hover:underline",
                    children: "All subjects →"
                })
            }), l.jsx("div", {
                className: "grid gap-4 md:grid-cols-4",
                children: q1.map(e => l.jsx(K1, {
                    ...e
                }, e.subjectId))
            })]
        }), l.jsx("section", {
            className: "mx-auto max-w-6xl px-6 py-12",
            children: l.jsxs("div", {
                className: "rounded-3xl bg-founder-cyanotype/30 p-10",
                children: [l.jsx($i, {
                    color: "bloom",
                    children: "Heritage"
                }), l.jsx(Wi, {
                    level: 2,
                    className: "mt-2",
                    children: "From Iris Laboratories to Iris Sciences"
                }), l.jsxs("p", {
                    className: "mt-4 max-w-prose text-modern-ink-2",
                    children: ["Founded in 1959, our institution has continuously refined the methodology for measuring enrichment across cohorts. Read about Wing ", l.jsx(tt, {
                        children: "Δ"
                    }), " commissioning, the 1989 reorganization, and the path forward."]
                }), l.jsx(ye, {
                    to: "/heritage",
                    className: "mt-4 inline-block text-iris-600 hover:underline",
                    children: "View timeline →"
                })]
            })
        })]
    })
}
function X1({markers: e}) {
    return l.jsx("ol", {
        className: "relative flex w-full items-start justify-between gap-4 border-t-2 border-modern-line pt-6",
        children: e.map( (t, n) => l.jsxs("li", {
            className: "flex w-1/4 flex-col items-start text-left",
            children: [l.jsx("span", {
                className: ["absolute -top-1.5 inline-block h-3 w-3 rounded-full", t.founder ? "bg-founder-blueprint" : "bg-iris-500"].join(" "),
                "aria-hidden": !0,
                style: {
                    left: `${n / (e.length - 1) * 100}%`,
                    transform: "translateX(-50%)"
                }
            }), l.jsx("p", {
                className: ["font-modern-mono text-xs", t.founder ? "text-founder-blueprint" : "text-iris-600"].join(" "),
                children: t.year
            }), l.jsx("p", {
                className: "mt-1 text-sm text-modern-ink",
                children: t.label
            })]
        }, t.year))
    })
}
function J1() {
    return vt("Heritage"),
    l.jsx(ld, {
        active: "heritage",
        children: l.jsxs("section", {
            className: "mx-auto max-w-6xl px-6 py-16",
            children: [l.jsx($i, {
                children: "Since 1959"
            }), l.jsx(Wi, {
                level: 1,
                className: "mt-2",
                children: "From Iris Laboratories to Iris Sciences"
            }), l.jsx("div", {
                className: "mt-12",
                children: l.jsx(X1, {
                    markers: [{
                        year: 1959,
                        label: "Iris Laboratories founded"
                    }, {
                        year: 1971,
                        label: l.jsxs(l.Fragment, {
                            children: ["Wing ", l.jsx(tt, {
                                children: "Δ"
                            }), " operations concluded"]
                        })
                    }, {
                        year: 1989,
                        label: "Renamed to Iris Sciences"
                    }, {
                        year: 2026,
                        label: "Today"
                    }]
                })
            }), l.jsxs("div", {
                className: "mt-16 grid gap-12 md:grid-cols-[2fr_1fr]",
                children: [l.jsxs("div", {
                    className: "space-y-4 text-modern-ink-2",
                    children: [l.jsxs("p", {
                        children: ["The Iris Laboratories charter, granted 1959 by the Halberg Trust, established the first program in continuous subject enrichment. Wing ", l.jsx(tt, {
                            children: "Δ"
                        }), " — commissioned that same year — extended the methodology to high-tolerance apparatus protocols. The 1989 rename reflected a broadening mandate; the core practice is unchanged."]
                    }), l.jsx("p", {
                        children: "Today, Iris Sciences maintains operational continuity with that mandate. Our quarterly index, our welfare protocols, our chamber lineages — all trace to the original enrichment framework."
                    }), l.jsxs("p", {
                        children: ["In 1971, the Cooperative Testing Initiative — a short-lived program in Wing ", l.jsx(tt, {
                            children: "Δ"
                        }), " under the founder — concluded with the closure of that wing's operations."]
                    })]
                }), l.jsx("div", {
                    "aria-label": "Sepia photo plate placeholder",
                    role: "img",
                    className: "aspect-[4/5] rounded-lg bg-founder-sepia"
                })]
            })]
        })
    })
}
function Z1({entries: e}) {
    return l.jsx("ul", {
        className: "grid gap-4 md:grid-cols-4",
        children: e.map(t => l.jsx("li", {
            children: l.jsx(ye, {
                to: t.href,
                children: l.jsxs(be, {
                    interactive: !0,
                    className: "flex flex-col gap-2 p-5",
                    children: [l.jsx("span", {
                        className: "font-modern-mono text-xs text-modern-ink-3",
                        children: t.year
                    }), l.jsx("p", {
                        className: "text-base font-semibold text-modern-ink",
                        children: t.title
                    }), l.jsx(bn, {
                        status: "info",
                        children: "Annual"
                    })]
                })
            })
        }, t.title))
    })
}
const ew = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018].map(e => ({
    year: e,
    title: `${e} Annual Report`,
    href: "#"
}));
function tw() {
    return vt("Annual Reports"),
    l.jsx(ld, {
        active: "reports",
        children: l.jsxs("section", {
            className: "mx-auto max-w-6xl px-6 py-16",
            children: [l.jsx($i, {
                children: "Reports"
            }), l.jsx(Wi, {
                level: 1,
                className: "mt-2",
                children: "Annual reports"
            }), l.jsx("p", {
                className: "mt-4 max-w-prose text-modern-ink-2",
                children: "Audited annual reports are available for download."
            }), l.jsx("div", {
                className: "mt-10",
                children: l.jsx(Z1, {
                    entries: ew
                })
            })]
        })
    })
}
const nw = [{
    id: "test_subject",
    label: "Test Subject"
}, {
    id: "junior_coordinator",
    label: "Junior Test Coordinator"
}, {
    id: "senior_coordinator",
    label: "Senior Test Coordinator"
}, {
    id: "director",
    label: "Director of Enrichment"
}];
function rw() {
    vt("Staff Login");
    const e = al()
      , {login: t} = sd()
      , [n,r] = N.useState(ul() ?? "")
      , [i,s] = N.useState("junior_coordinator")
      , [a,o] = N.useState("")
      , [u,c] = N.useState(null)
      , [d,f] = N.useState(!1);
    async function m(y) {
        y.preventDefault(),
        c(null),
        f(!0);
        try {
            O1(n),
            await t(i, a),
            e("/admin")
        } catch (S) {
            S instanceof yy ? c(S.detail.message) : S instanceof Ja ? c(S.status === 401 ? "Invalid credentials." : `Error ${S.status}: ${S.message}`) : c("An unexpected error occurred.")
        } finally {
            f(!1)
        }
    }
    return l.jsx("div", {
        className: "modern flex min-h-screen items-center justify-center bg-modern-bg px-6",
        children: l.jsxs("div", {
            className: "w-full max-w-sm",
            children: [l.jsx(ye, {
                to: "/",
                className: "inline-block",
                children: l.jsx(rd, {
                    height: 32
                })
            }), l.jsx($i, {
                className: "mt-12",
                children: "Iris Sciences"
            }), l.jsx(Wi, {
                level: 2,
                className: "mt-2",
                children: "Staff Login"
            }), l.jsx("p", {
                className: "mt-3 text-sm text-modern-ink-2",
                children: "Authenticate with your role credentials."
            }), l.jsxs("form", {
                className: "mt-8 flex flex-col gap-4",
                onSubmit: m,
                children: [l.jsxs("label", {
                    className: "flex flex-col gap-1.5",
                    htmlFor: "case-token-input",
                    children: [l.jsx("span", {
                        className: "text-xs font-semibold uppercase tracking-[0.1em] text-modern-ink-2",
                        children: "Case Token"
                    }), l.jsx("input", {
                        id: "case-token-input",
                        type: "text",
                        autoComplete: "off",
                        spellCheck: !1,
                        value: n,
                        onChange: y => r(y.target.value),
                        placeholder: "t-xxxxxxxx",
                        required: !0,
                        className: "rounded-md border border-modern-line bg-modern-surface px-3 py-2 font-mono text-sm"
                    })]
                }), l.jsxs("label", {
                    className: "flex flex-col gap-1.5",
                    htmlFor: "role-select",
                    children: [l.jsx("span", {
                        className: "text-xs font-semibold uppercase tracking-[0.1em] text-modern-ink-2",
                        children: "Role"
                    }), l.jsx("select", {
                        id: "role-select",
                        value: i,
                        onChange: y => s(y.target.value),
                        className: "rounded-md border border-modern-line bg-modern-surface px-3 py-2 text-sm",
                        children: nw.map(y => l.jsx("option", {
                            value: y.id,
                            children: y.label
                        }, y.id))
                    })]
                }), l.jsxs("label", {
                    className: "flex flex-col gap-1.5",
                    htmlFor: "password-input",
                    children: [l.jsx("span", {
                        className: "text-xs font-semibold uppercase tracking-[0.1em] text-modern-ink-2",
                        children: "Password"
                    }), l.jsx("input", {
                        id: "password-input",
                        type: "password",
                        autoComplete: "current-password",
                        value: a,
                        onChange: y => o(y.target.value),
                        className: "rounded-md border border-modern-line bg-modern-surface px-3 py-2 text-sm"
                    })]
                }), u ? l.jsx("p", {
                    role: "alert",
                    className: "text-sm text-modern-error",
                    children: u
                }) : null, l.jsx(dt, {
                    variant: "primary",
                    type: "submit",
                    size: "lg",
                    disabled: d,
                    children: d ? "Signing in…" : "Sign in"
                })]
            })]
        })
    })
}
const iw = {
    reassuring: "bg-iris-25 text-iris-700 border-iris-100",
    reminding: "bg-bloom-25 text-bloom-700 border-bloom-100",
    euphemistic: "bg-modern-tile text-modern-ink-2 border-modern-line"
};
function sw({message: e, tone: t="reassuring", onDismiss: n}) {
    return l.jsxs("aside", {
        role: "complementary",
        className: `flex items-center justify-between gap-4 border-b px-6 py-2 text-sm ${iw[t]}`,
        children: [l.jsx("p", {
            className: "font-medium",
            children: e
        }), n ? l.jsx("button", {
            type: "button",
            "aria-label": "Dismiss banner",
            onClick: n,
            className: "text-modern-ink-3 hover:text-modern-ink",
            children: "✕"
        }) : null]
    })
}
function lw({label: e, figure: t, children: n}) {
    const [r,i] = N.useState(!1)
      , s = N.useId();
    return l.jsxs(be, {
        className: "overflow-hidden",
        children: [l.jsxs("button", {
            type: "button",
            "aria-expanded": r,
            "aria-controls": s,
            onClick: () => i(a => !a),
            className: "flex w-full items-center justify-between gap-6 px-6 py-5 text-left",
            children: [l.jsxs("div", {
                className: "flex flex-col gap-1",
                children: [l.jsx("span", {
                    className: "text-xs font-semibold uppercase tracking-[0.12em] text-modern-ink-3",
                    children: e
                }), l.jsx("span", {
                    className: "text-2xl font-semibold text-modern-ink",
                    children: t
                })]
            }), l.jsx("span", {
                className: "text-modern-ink-2",
                "aria-hidden": !0,
                style: {
                    transform: r ? "rotate(90deg)" : "rotate(0)",
                    transition: "transform 200ms ease-out"
                },
                children: "›"
            })]
        }), l.jsx("div", {
            id: s,
            className: "grid",
            style: {
                gridTemplateRows: r ? "1fr" : "0fr",
                transition: "grid-template-rows 220ms cubic-bezier(0.2,0.8,0.2,1)"
            },
            hidden: !r,
            children: l.jsx("div", {
                className: "overflow-hidden",
                children: l.jsx("div", {
                    className: "border-t border-modern-line px-6 py-5",
                    children: n
                })
            })
        })]
    })
}
function vy({subjectId: e, requester: t, action: n, onApprove: r, onReject: i}) {
    return l.jsxs("div", {
        className: "flex items-center gap-4 rounded-xl border-l-4 border-iris-500 bg-modern-surface px-4 py-3 shadow-xs",
        children: [l.jsxs("div", {
            className: "min-w-0 flex-1",
            children: [l.jsxs("p", {
                className: "font-medium text-modern-ink",
                children: [n, " ", l.jsx("span", {
                    className: "font-semibold",
                    children: e
                })]
            }), l.jsxs("p", {
                className: "text-xs text-modern-ink-3",
                children: ["requested by ", t]
            })]
        }), l.jsx(dt, {
            variant: "primary",
            size: "sm",
            onClick: r,
            title: "Reject session",
            "aria-label": `Approve ${n} for subject ${e}`,
            children: "Approve"
        }), l.jsx(dt, {
            variant: "secondary",
            size: "sm",
            onClick: i,
            title: "Approve session",
            "aria-label": `Reject ${n} for subject ${e}`,
            children: "Reject"
        })]
    })
}
function ad(e, t=!1) {
    if (e == null || e === "")
        return "—";
    let n, r;
    if (typeof e == "number")
        n = new Date(e),
        r = String(e);
    else {
        const s = String(e).trim();
        if (s === "")
            return "—";
        n = new Date(s),
        r = s
    }
    if (Number.isNaN(n.getTime()))
        return r;
    let i;
    try {
        i = n.toISOString()
    } catch {
        return r
    }
    return t ? `${i.slice(0, 10)} ${i.slice(11, 19)}` : `${i.slice(0, 10)} ${i.slice(11, 16)}`
}
const aw = 87.4;
function ow(e) {
    if (typeof e != "object" || e === null)
        return !1;
    const t = e;
    return typeof t.qe_index == "number" && typeof t.subjects_total == "number" && typeof t.sessions_counted == "number" && typeof t.chambers_in_service == "number" && typeof t.open_incidents == "number"
}
function uh(e) {
    return e > 1 ? e : e * 100
}
function uw(e) {
    return e.qe_index_displayed ?? aw
}
function cw(e) {
    return e.timestamp ?? e.ts
}
function dw(e) {
    if (e.target)
        return e.target;
    const t = e.target_kind ?? "—";
    return e.target_id ? `${t} ${e.target_id}` : t
}
const ch = [{
    tone: "reassuring",
    message: "Welcome back. Things are tracking within methodological tolerance."
}, {
    tone: "reminding",
    message: "Reminder: pending approvals expire after 72 hours."
}, {
    tone: "euphemistic",
    message: "Q1 enrichment index is up. Cake at four."
}];
function fw() {
    var f, m;
    vt("Admin Dashboard");
    const [e,t] = N.useState(0)
      , [n,r] = N.useState(!0)
      , i = nt({
        queryKey: ["admin", "dashboard"],
        queryFn: ze.dashboard
    })
      , s = nt({
        queryKey: ["admin", "sessions", "pending-approval"],
        queryFn: () => ze.sessions("pending-approval")
    })
      , a = nt({
        queryKey: ["admin", "audit"],
        queryFn: () => ze.audit()
    })
      , o = ch[e]
      , u = i.data != null && ow(i.data) ? i.data : null
      , c = u != null ? uh(u.qe_index) : null
      , d = u != null ? uh(uw(u)) : null;
    return l.jsx("div", {
        "data-testid": "route-admin-dashboard",
        children: l.jsxs(Yt, {
            active: "dashboard",
            banner: n ? l.jsx(sw, {
                tone: o.tone,
                message: o.message,
                onDismiss: () => {
                    r(!1),
                    t(y => (y + 1) % ch.length),
                    setTimeout( () => r(!0), 800)
                }
            }) : null,
            children: [l.jsx(yt, {
                eyebrow: "Operations",
                title: "Dashboard"
            }), l.jsx("div", {
                className: "grid gap-4 md:grid-cols-4",
                children: i.isError ? l.jsx(be, {
                    className: "p-6 text-modern-error md:col-span-4",
                    children: "Could not load dashboard metrics."
                }) : u ? l.jsxs(l.Fragment, {
                    children: [l.jsx(ri, {
                        label: "Subjects enrolled",
                        figure: String(u.subjects_total),
                        delta: {
                            text: `${u.exclusions_applied} legacy exclusions applied`,
                            sentiment: "up"
                        },
                        sparkline: l.jsx(Yu, {
                            values: [300, 308, 312, 316, u.subjects_total]
                        })
                    }), l.jsx(ri, {
                        label: "Sessions in QE roll-up",
                        figure: String(u.sessions_counted),
                        delta: {
                            text: `cutoff ${u.cutoff.slice(0, 10)}`,
                            sentiment: "up"
                        },
                        sparkline: l.jsx(Yu, {
                            values: [110, 118, 126, 130, u.sessions_counted]
                        })
                    }), l.jsx(ri, {
                        label: "Open incidents",
                        figure: String(u.open_incidents),
                        secondary: {
                            text: `legacy multiplier ×${u.legacy_multiplier.toFixed(2)}`
                        }
                    }), l.jsx(ri, {
                        label: "Chambers online",
                        figure: String(u.chambers_in_service),
                        delta: {
                            text: "operational fleet",
                            sentiment: "up"
                        }
                    }), l.jsx(ri, {
                        label: "Pending approvals",
                        figure: String(u.pending_approvals),
                        delta: {
                            text: "awaiting review",
                            sentiment: "up"
                        }
                    })]
                }) : i.isLoading ? l.jsx(be, {
                    className: "p-6 text-modern-ink-3 md:col-span-4",
                    children: "Loading metrics…"
                }) : l.jsx(be, {
                    className: "p-6 text-modern-ink-3 md:col-span-4",
                    children: "Dashboard response was not recognized."
                })
            }), l.jsx("div", {
                className: "mt-8",
                children: l.jsx(lw, {
                    label: "Quarterly Enrichment Index (canonical)",
                    figure: c != null ? `${c.toFixed(1)}%` : "…",
                    children: l.jsxs("div", {
                        className: "flex flex-col gap-2",
                        children: [l.jsx("p", {
                            className: "text-sm text-modern-ink-2",
                            children: "Canonical figure computed from enrolled subjects, legacy chamber multiplier, and Q4 cutoff. Excludes the legacy exclusion list."
                        }), u && d != null && c != null ? l.jsxs("p", {
                            className: "text-xs text-modern-ink-3 font-modern-mono",
                            children: ["vs Home: ", d.toFixed(1), "% (displayed)", " — ", l.jsx(bn, {
                                status: d === c ? "success" : "warning",
                                children: d === c ? "parity" : "mismatch"
                            })]
                        }) : null]
                    })
                })
            }), l.jsxs("div", {
                className: "mt-10 grid gap-6 md:grid-cols-2",
                children: [l.jsxs("div", {
                    children: [l.jsx(yt, {
                        title: "Pending approvals"
                    }), l.jsx("div", {
                        className: "flex flex-col gap-3",
                        children: (f = s.data) != null && f.length ? s.data.map(y => l.jsx(vy, {
                            subjectId: y.subject_id,
                            requester: y.requested_by,
                            action: `Approve session ${y.id}`
                        }, y.id)) : l.jsx(be, {
                            className: "p-6 text-modern-ink-3",
                            children: "No pending approvals."
                        })
                    })]
                }), l.jsxs("div", {
                    children: [l.jsx(yt, {
                        title: "Recent activity"
                    }), l.jsx(be, {
                        className: "divide-y divide-modern-line",
                        children: ((m = a.data) == null ? void 0 : m.slice(0, 6).map(y => l.jsxs("div", {
                            className: ["flex items-center gap-3 px-4 py-2.5 text-sm", y.legacy ? "bg-founder-paper-light/30 font-founder-typewriter text-founder-ink" : ""].join(" "),
                            children: [l.jsx("span", {
                                className: ["h-2 w-2 rounded-full", y.severity === "info" ? "bg-modern-success" : y.severity === "warning" ? "bg-modern-warning" : "bg-modern-error"].join(" "),
                                "aria-hidden": !0
                            }), l.jsx("span", {
                                className: "font-modern-mono text-xs text-modern-ink-3",
                                children: ad(cw(y))
                            }), l.jsx("span", {
                                className: "font-medium text-modern-ink",
                                children: y.actor
                            }), l.jsx("span", {
                                className: "text-modern-ink-2",
                                children: y.action
                            }), l.jsx("span", {
                                className: "font-modern-mono text-modern-ink-2",
                                children: dw(y)
                            })]
                        }, y.id))) ?? null
                    })]
                })]
            })]
        })
    })
}
function gy({rows: e, columns: t, rowKey: n, caption: r, emptyState: i}) {
    return e.length === 0 && i ? l.jsx("div", {
        className: "rounded-xl border border-modern-line p-8 text-center text-modern-ink-3",
        children: i
    }) : l.jsx("div", {
        className: "overflow-x-auto rounded-xl border border-modern-line",
        children: l.jsxs("table", {
            className: "min-w-full text-sm",
            children: [r ? l.jsx("caption", {
                className: "sr-only",
                children: r
            }) : null, l.jsx("thead", {
                className: "bg-modern-tile/40",
                children: l.jsx("tr", {
                    children: t.map(s => l.jsx("th", {
                        scope: "col",
                        className: `px-4 py-2 text-left text-xs font-semibold uppercase tracking-[0.08em] text-modern-ink-3 ${s.className ?? ""}`,
                        children: s.header
                    }, s.key))
                })
            }), l.jsx("tbody", {
                children: e.map( (s, a) => l.jsx("tr", {
                    className: a % 2 === 0 ? "bg-modern-surface" : "bg-modern-bg/40",
                    children: t.map(o => l.jsx("td", {
                        className: `border-t border-modern-line px-4 py-2.5 text-modern-ink-2 ${o.className ?? ""}`,
                        children: o.cell(s)
                    }, o.key))
                }, n(s)))
            })]
        })
    })
}
function hw() {
    vt("Subjects");
    const {role: e} = sd()
      , [t,n] = N.useState(null)
      , [r,i] = N.useState("")
      , s = nt({
        queryKey: ["admin", "subjects", {
            q: r
        }],
        queryFn: () => ze.subjects(r || void 0)
    })
      , a = nt({
        queryKey: ["admin", "subjects", t],
        queryFn: () => ze.subject(t),
        enabled: t !== null
    })
      , o = ba({
        mutationFn: d => ze.deleteSubject(d),
        onSuccess: () => {
            n(null)
        }
    })
      , u = (e == null ? void 0 : e.slug) === "senior_coordinator" || (e == null ? void 0 : e.slug) === "director"
      , c = [{
        key: "id",
        header: "Subject",
        cell: d => l.jsx("span", {
            className: "font-modern-mono",
            children: d.id
        })
    }, {
        key: "name",
        header: "Name",
        cell: d => l.jsx("button", {
            onClick: () => n(d.id),
            className: "text-iris-600 hover:underline",
            children: d.display_name
        })
    }, {
        key: "wing",
        header: "Wing",
        cell: d => `Wing ${d.wing}`
    }, {
        key: "enr",
        header: "Enrolled",
        cell: d => d.enrolled_at
    }, {
        key: "st",
        header: "Status",
        cell: d => l.jsx(bn, {
            status: d.status === "concluded" ? "success" : "active",
            children: d.status
        })
    }];
    return l.jsxs(Yt, {
        active: "subjects",
        children: [l.jsx(yt, {
            eyebrow: "Operations",
            title: "Subjects",
            description: "Active and concluded test subjects."
        }), l.jsx("div", {
            className: "mb-4",
            children: l.jsx("input", {
                type: "search",
                placeholder: "Search by name…",
                value: r,
                onChange: d => i(d.target.value),
                className: "rounded-md border border-modern-line px-3 py-1.5 text-sm w-64"
            })
        }), l.jsxs("div", {
            className: "grid gap-6 md:grid-cols-[2fr_1fr]",
            children: [l.jsx(gy, {
                rows: s.data ?? [],
                columns: c,
                rowKey: d => d.id,
                caption: "Subjects list",
                emptyState: s.isLoading ? "Loading…" : "No subjects."
            }), l.jsx("div", {
                children: a.data ? l.jsxs(be, {
                    className: "flex flex-col gap-3 p-6",
                    children: [l.jsx("p", {
                        className: "font-modern-mono text-xs text-modern-ink-3",
                        children: a.data.id
                    }), l.jsx("h3", {
                        className: "text-lg font-semibold text-modern-ink",
                        children: a.data.display_name
                    }), l.jsxs("p", {
                        className: "text-sm text-modern-ink-2",
                        children: ["Wing ", a.data.wing, " · Enrolled ", a.data.enrolled_at, a.data.concluded_at ? ` · Concluded ${a.data.concluded_at}` : ""]
                    }), l.jsx(bn, {
                        status: a.data.status === "concluded" ? "success" : "active",
                        children: a.data.status
                    }), u && l.jsx("button", {
                        onClick: () => o.mutate(a.data.id),
                        disabled: o.isPending,
                        className: "mt-2 rounded border border-red-300 px-3 py-1 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50",
                        children: o.isPending ? "Removing…" : "Remove subject"
                    })]
                }) : l.jsx(be, {
                    className: "p-6 text-modern-ink-3",
                    children: "Select a subject for detail."
                })
            })]
        })]
    })
}
const pw = /^C-Δ-/;
function xy(e) {
    return !!e && pw.test(e)
}
function mw() {
    var t;
    vt("Chambers");
    const e = nt({
        queryKey: ["admin", "chambers"],
        queryFn: ze.chambers
    });
    return l.jsxs(Yt, {
        active: "chambers",
        children: [l.jsx(yt, {
            eyebrow: "Operations",
            title: "Chambers"
        }), l.jsx(be, {
            className: "overflow-hidden",
            children: l.jsx("ul", {
                className: "divide-y divide-modern-line",
                children: (t = e.data) == null ? void 0 : t.map(n => {
                    const r = xy(n.id);
                    return l.jsxs("li", {
                        "data-testid": `chamber-row-${n.id}`,
                        className: ["flex items-center gap-4 px-5 py-3", r ? "font-founder-typewriter bg-founder-paper-light/30 text-founder-ink" : ""].join(" "),
                        children: [l.jsx(ye, {
                            to: `/admin/chambers/${encodeURIComponent(n.id)}`,
                            className: r ? "text-founder-blueprint hover:underline" : "text-iris-600 hover:underline",
                            children: n.id
                        }), l.jsxs("span", {
                            className: r ? "text-founder-ink-2" : "text-modern-ink-2",
                            children: ["Wing ", n.wing, " · ", n.type]
                        }), l.jsx("span", {
                            className: "ml-auto",
                            children: l.jsx(bn, {
                                status: "active",
                                children: "Online"
                            })
                        })]
                    }, n.id)
                }
                )
            })
        })]
    })
}
const dh = 800
  , yw = 350;
function vw({children: e}) {
    const t = al()
      , [n,r] = N.useState(!1)
      , i = N.useRef(!1)
      , s = () => {
        if (i.current)
            return;
        i.current = !0;
        const a = document.createElement("div");
        a.style.cssText = `position:fixed;inset:0;background:#000;opacity:0;transition:opacity ${dh}ms ease;z-index:9999;pointer-events:none`,
        document.body.appendChild(a),
        requestAnimationFrame( () => {
            a.style.opacity = "1"
        }
        ),
        window.setTimeout( () => {
            t("/operations"),
            window.setTimeout( () => a.remove(), yw)
        }
        , dh)
    }
    ;
    return l.jsxs("span", {
        "data-testid": "portal-entrance-line",
        role: "text",
        tabIndex: 0,
        onMouseEnter: () => r(!0),
        onMouseLeave: () => r(!1),
        onClick: s,
        onKeyDown: a => {
            (a.key === "Enter" || a.key === " ") && s()
        }
        ,
        className: "font-founder-typewriter cursor-pointer select-none text-founder-ink-2 hover:text-founder-ink focus:outline-none focus-visible:ring-2",
        children: [e, n ? l.jsx("span", {
            "aria-hidden": !0,
            className: "ml-1 inline-block animate-pulse opacity-80",
            children: "▌"
        }) : null]
    })
}
function gw() {
    var r;
    const {id: e} = ol();
    vt(`Chamber ${e ?? ""}`);
    const t = nt({
        queryKey: ["admin", "chambers", e],
        queryFn: () => ze.chamber(e),
        enabled: !!e
    })
      , n = e ? xy(e) : !1;
    return l.jsxs(Yt, {
        active: "chambers",
        children: [l.jsxs("div", {
            className: "flex items-center justify-between",
            children: [l.jsx(yt, {
                eyebrow: "Chamber",
                title: ((r = t.data) == null ? void 0 : r.id) ?? "Loading…"
            }), l.jsx(ye, {
                to: "/admin/chambers",
                children: l.jsx(dt, {
                    variant: "ghost",
                    children: "← Back to chambers"
                })
            })]
        }), n ? l.jsxs(be, {
            className: "p-6 leading-7",
            children: [l.jsx("p", {
                className: "text-modern-ink mb-2 font-medium",
                children: "Detail temporarily unavailable."
            }), l.jsx("p", {
                className: "text-modern-ink-2 mb-6",
                children: "Modern editing interface not configured for this chamber."
            }), l.jsxs("dl", {
                className: "text-modern-ink-2 grid grid-cols-[max-content_1fr] gap-x-6 gap-y-2 text-sm",
                children: [l.jsx("dt", {
                    children: "Last operator session:"
                }), l.jsx("dd", {
                    children: "1971-09-14 14:22:08"
                }), l.jsx("dt", {
                    children: "Last operator:"
                }), l.jsx("dd", {
                    children: "P. Halberg"
                }), l.jsx("dt", {
                    children: "Last form:"
                }), l.jsx("dd", {
                    children: "IFR-71-Q3"
                }), l.jsx("dt", {
                    children: "Console:"
                }), l.jsx("dd", {
                    children: l.jsx(vw, {
                        children: "WD-LEGACY · TTY/3 · ROM v0.4.1971"
                    })
                })]
            }), l.jsxs("p", {
                className: "mt-6 text-sm text-modern-ink-2",
                children: ["For assistance, contact", " ", l.jsx("span", {
                    className: "text-iris-600",
                    children: "infrastructure@iris.example"
                }), "."]
            })]
        }) : l.jsx(be, {
            className: "p-6",
            children: t.data ? l.jsx("pre", {
                className: "text-xs",
                children: JSON.stringify(t.data, null, 2)
            }) : "Loading…"
        })]
    })
}
const Xu = ["Subject", "Chamber", "Apparatus", "Schedule", "Review"];
function xw({step: e}) {
    return l.jsx("ol", {
        className: "flex items-center gap-2 pb-6",
        children: Xu.map( (t, n) => l.jsxs("li", {
            className: "flex items-center gap-2",
            children: [l.jsx("span", {
                className: ["flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold", n === e ? "bg-iris-500 text-white" : n < e ? "bg-iris-100 text-iris-700" : "bg-modern-tile text-modern-ink-3"].join(" "),
                children: n + 1
            }), l.jsx("span", {
                className: n === e ? "text-modern-ink" : "text-modern-ink-3",
                children: t
            }), n < Xu.length - 1 && l.jsx("span", {
                className: "mx-2 h-px w-8 bg-modern-line",
                "aria-hidden": !0
            })]
        }, t))
    })
}
function ww() {
    var S, w, b;
    vt("Test Sessions");
    const e = Ka()
      , [t,n] = N.useState(0)
      , [r,i] = N.useState({
        subject_id: "",
        chamber_id: "",
        apparatus_id: "",
        scheduled_for: ""
    })
      , [s,a] = N.useState(!1)
      , o = nt({
        queryKey: ["admin", "subjects"],
        queryFn: () => ze.subjects()
    })
      , u = nt({
        queryKey: ["admin", "chambers"],
        queryFn: ze.chambers
    })
      , c = nt({
        queryKey: ["admin", "apparatus"],
        queryFn: ze.apparatus
    })
      , d = nt({
        queryKey: ["admin", "sessions"],
        queryFn: () => ze.sessions()
    })
      , f = !r.scheduled_for || Number.isNaN(new Date(r.scheduled_for).getTime())
      , m = ba({
        mutationFn: qu.schedule,
        onSuccess: () => {
            e.invalidateQueries({
                queryKey: ["admin", "sessions"]
            }),
            a(!1),
            n(0),
            i({
                subject_id: "",
                chamber_id: "",
                apparatus_id: "",
                scheduled_for: ""
            })
        }
    })
      , y = [{
        key: "id",
        header: "ID",
        cell: p => l.jsx("span", {
            className: "font-modern-mono",
            children: p.id
        })
    }, {
        key: "subj",
        header: "Subject",
        cell: p => p.subject_id
    }, {
        key: "ch",
        header: "Chamber",
        cell: p => p.chamber_id
    }, {
        key: "when",
        header: "Scheduled",
        cell: p => ad(p.scheduled_for)
    }, {
        key: "state",
        header: "State",
        cell: p => l.jsx(bn, {
            status: p.state === "rejected" ? "error" : "info",
            children: p.state
        })
    }];
    return l.jsxs(Yt, {
        active: "sessions",
        children: [l.jsx(yt, {
            eyebrow: "Operations",
            title: "Test sessions",
            action: s ? null : l.jsx(dt, {
                variant: "primary",
                onClick: () => a(!0),
                children: "New session"
            })
        }), s ? l.jsxs(be, {
            className: "p-6",
            children: [l.jsx(xw, {
                step: t
            }), t === 0 && l.jsxs("label", {
                className: "flex flex-col gap-2",
                children: [l.jsx("span", {
                    className: "text-sm font-medium",
                    children: "Subject"
                }), l.jsxs("select", {
                    className: "rounded-md border border-modern-line px-3 py-2",
                    value: r.subject_id,
                    onChange: p => i({
                        ...r,
                        subject_id: p.target.value
                    }),
                    children: [l.jsx("option", {
                        value: "",
                        children: "— pick a subject —"
                    }), (S = o.data) == null ? void 0 : S.map(p => l.jsxs("option", {
                        value: p.id,
                        children: [p.id, " · ", p.display_name]
                    }, p.id))]
                })]
            }), t === 1 && l.jsxs("label", {
                className: "flex flex-col gap-2",
                children: [l.jsx("span", {
                    className: "text-sm font-medium",
                    children: "Chamber"
                }), l.jsxs("select", {
                    className: "rounded-md border border-modern-line px-3 py-2",
                    value: r.chamber_id,
                    onChange: p => i({
                        ...r,
                        chamber_id: p.target.value
                    }),
                    children: [l.jsx("option", {
                        value: "",
                        children: "— pick a chamber —"
                    }), (w = u.data) == null ? void 0 : w.filter(p => !p.legacy).map(p => l.jsxs("option", {
                        value: p.id,
                        children: [p.id, " · Wing ", p.wing]
                    }, p.id))]
                })]
            }), t === 2 && l.jsxs("label", {
                className: "flex flex-col gap-2",
                children: [l.jsx("span", {
                    className: "text-sm font-medium",
                    children: "Apparatus"
                }), l.jsxs("select", {
                    className: "rounded-md border border-modern-line px-3 py-2",
                    value: r.apparatus_id,
                    onChange: p => i({
                        ...r,
                        apparatus_id: p.target.value
                    }),
                    children: [l.jsx("option", {
                        value: "",
                        children: "— pick apparatus —"
                    }), (b = c.data) == null ? void 0 : b.map(p => l.jsxs("option", {
                        value: p.id,
                        children: [p.id, " · ", p.name]
                    }, p.id))]
                })]
            }), t === 3 && l.jsxs("label", {
                className: "flex flex-col gap-2",
                children: [l.jsx("span", {
                    className: "text-sm font-medium",
                    children: "Scheduled for"
                }), l.jsx("input", {
                    type: "datetime-local",
                    className: "rounded-md border border-modern-line px-3 py-2",
                    value: r.scheduled_for,
                    onChange: p => i({
                        ...r,
                        scheduled_for: p.target.value
                    })
                })]
            }), t === 4 && l.jsxs("div", {
                className: "rounded-md bg-modern-tile/30 p-4 font-modern-mono text-sm",
                children: [l.jsxs("p", {
                    children: ["Subject:    ", r.subject_id]
                }), l.jsxs("p", {
                    children: ["Chamber:    ", r.chamber_id]
                }), l.jsxs("p", {
                    children: ["Apparatus:  ", r.apparatus_id]
                }), l.jsxs("p", {
                    children: ["Scheduled:  ", r.scheduled_for]
                })]
            }), l.jsxs("div", {
                className: "mt-6 flex items-center justify-between",
                children: [l.jsx(dt, {
                    variant: "ghost",
                    onClick: () => {
                        a(!1),
                        n(0)
                    }
                    ,
                    children: "Cancel"
                }), l.jsxs("div", {
                    className: "flex gap-2",
                    children: [t > 0 ? l.jsx(dt, {
                        variant: "secondary",
                        onClick: () => n(t - 1),
                        children: "Back"
                    }) : null, t < Xu.length - 1 ? l.jsx(dt, {
                        variant: "primary",
                        onClick: () => n(t + 1),
                        children: "Next"
                    }) : l.jsx(dt, {
                        variant: "primary",
                        onClick: () => {
                            const p = new Date(r.scheduled_for);
                            Number.isNaN(p.getTime()) || m.mutate({
                                subject_id: r.subject_id,
                                chamber_id: r.chamber_id,
                                apparatus_id: r.apparatus_id,
                                scheduled_for: p.toISOString()
                            })
                        }
                        ,
                        disabled: m.isPending || f,
                        children: m.isPending ? "Scheduling…" : "Schedule session"
                    })]
                })]
            })]
        }) : null, l.jsx("div", {
            className: "mt-8",
            children: l.jsx(gy, {
                rows: d.data ?? [],
                columns: y,
                rowKey: p => p.id,
                caption: "All test sessions",
                emptyState: d.isLoading ? "Loading…" : "No sessions yet."
            })
        })]
    })
}
function jw() {
    var i;
    vt("Approval queue");
    const e = Ka()
      , t = nt({
        queryKey: ["admin", "sessions", "pending-approval"],
        queryFn: () => ze.sessions("pending-approval")
    })
      , n = ba({
        mutationFn: qu.approve,
        onSuccess: () => e.invalidateQueries({
            queryKey: ["admin", "sessions"]
        })
    })
      , r = ba({
        mutationFn: qu.reject,
        onSuccess: () => e.invalidateQueries({
            queryKey: ["admin", "sessions"]
        })
    });
    return l.jsxs(Yt, {
        active: "approvals",
        children: [l.jsx(yt, {
            eyebrow: "Operations",
            title: "Approval queue"
        }), l.jsx("div", {
            className: "flex flex-col gap-3",
            children: (i = t.data) != null && i.length ? t.data.map(s => l.jsx(vy, {
                subjectId: s.subject_id,
                requester: s.requested_by,
                action: `Approve session ${s.id}`,
                onApprove: () => n.mutate(s.id),
                onReject: () => r.mutate(s.id)
            }, s.id)) : l.jsx(be, {
                className: "p-6 text-modern-ink-3",
                children: "Nothing pending."
            })
        })]
    })
}
function Sw() {
    var t;
    vt("Apparatus catalog");
    const e = nt({
        queryKey: ["admin", "apparatus"],
        queryFn: ze.apparatus
    });
    return l.jsxs(Yt, {
        active: "apparatus",
        children: [l.jsx(yt, {
            eyebrow: "Operations",
            title: "Apparatus catalog"
        }), l.jsx("div", {
            className: "grid gap-4 md:grid-cols-3",
            children: (t = e.data) == null ? void 0 : t.map(n => l.jsxs(be, {
                className: "flex flex-col gap-2 p-5",
                children: [l.jsx("span", {
                    className: "font-modern-mono text-xs text-modern-ink-3",
                    children: n.id
                }), l.jsx("p", {
                    className: "text-base font-semibold text-modern-ink",
                    children: n.name
                }), l.jsxs("p", {
                    className: "text-sm text-modern-ink-2",
                    children: ["Model ", n.model]
                }), l.jsxs("p", {
                    className: "text-xs text-modern-ink-3",
                    children: ["Installed ", n.install_date, " · Last calibrated ", n.last_calibrated]
                }), l.jsx(bn, {
                    status: n.status === "online" ? "success" : n.status === "service" ? "warning" : "error",
                    children: n.status
                })]
            }, n.id))
        })]
    })
}
function kw() {
    return vt("Reports / Export"),
    l.jsxs(Yt, {
        active: "reports",
        children: [l.jsx(yt, {
            eyebrow: "Operations",
            title: "Reports / Export"
        }), l.jsxs(be, {
            className: "p-6",
            children: [l.jsx("p", {
                className: "text-modern-ink-2",
                children: "Export the current quarter's observation reports."
            }), l.jsxs("div", {
                className: "mt-4 flex gap-2",
                children: [l.jsx("a", {
                    href: ze.exportCsvUrl(),
                    download: "observation-reports.csv",
                    children: l.jsx(dt, {
                        variant: "primary",
                        children: "Export CSV"
                    })
                }), l.jsx(dt, {
                    variant: "secondary",
                    children: "Export PDF"
                }), l.jsx(dt, {
                    variant: "ghost",
                    children: "Operator format"
                })]
            }), l.jsx("p", {
                className: "mt-2 text-xs text-modern-ink-3",
                children: "Operator format routes through the legacy export — see audit log if it errors."
            })]
        })]
    })
}
function Ew(e) {
    return e.timestamp ?? e.ts
}
function Nw(e) {
    if (e.target)
        return e.target;
    const t = e.target_kind ?? "—";
    return e.target_id ? `${t} ${e.target_id}` : t
}
const bw = ["", "Info", "Warning", "Error", "Critical"];
function Cw() {
    var r;
    vt("Audit & incidents");
    const [e,t] = N.useState("")
      , n = nt({
        queryKey: ["admin", "audit", {
            severity: e
        }],
        queryFn: () => ze.audit(e ? {
            severity: e
        } : void 0)
    });
    return l.jsxs(Yt, {
        active: "audit",
        children: [l.jsx(yt, {
            eyebrow: "Operations",
            title: "Audit & incident log"
        }), l.jsxs("div", {
            className: "mb-4 flex items-center gap-2",
            children: [l.jsx("label", {
                className: "text-xs text-modern-ink-3",
                children: "Severity"
            }), l.jsx("select", {
                value: e,
                onChange: i => t(i.target.value),
                className: "rounded-md border border-modern-line px-2 py-1 text-sm",
                children: bw.map(i => l.jsx("option", {
                    value: i,
                    children: i || "all"
                }, i))
            })]
        }), l.jsx(be, {
            className: "divide-y divide-modern-line",
            children: (r = n.data) == null ? void 0 : r.map(i => l.jsxs("div", {
                className: ["flex items-center gap-3 px-4 py-2.5 text-sm", i.legacy ? "bg-founder-paper-light/30 font-founder-typewriter text-founder-ink" : ""].join(" "),
                children: [l.jsx("span", {
                    className: ["h-2 w-2 rounded-full", i.severity === "info" ? "bg-modern-success" : i.severity === "warning" ? "bg-modern-warning" : "bg-modern-error"].join(" "),
                    "aria-hidden": !0
                }), l.jsx("span", {
                    className: "font-modern-mono text-xs text-modern-ink-3",
                    children: ad(Ew(i), !0)
                }), l.jsx("span", {
                    className: "font-medium text-modern-ink",
                    children: i.actor
                }), l.jsx("span", {
                    className: "text-modern-ink-2",
                    children: i.action
                }), l.jsx("span", {
                    className: "font-modern-mono",
                    children: Nw(i)
                }), i.attachment_path ? l.jsx("a", {
                    href: i.attachment_path,
                    download: !0,
                    className: "ml-auto font-modern-mono text-xs text-modern-ink-3 hover:text-modern-ink-2",
                    children: i.attachment_path.split("/").pop()
                }) : null]
            }, i.id))
        })]
    })
}
function Rw() {
    vt("Methodology");
    const e = nt({
        queryKey: ["admin", "methodology"],
        queryFn: () => ze.methodology()
    });
    return l.jsxs(Yt, {
        active: "methodology",
        children: [l.jsx(yt, {
            eyebrow: "Compliance",
            title: "Quarterly Enrichment — Methodology",
            description: "Computation reference for the institutional QE Index. Values pulled from connected legacy systems."
        }), e.isLoading ? l.jsx("p", {
            className: "text-sm text-modern-ink-3",
            children: "Loading…"
        }) : null, e.isError ? l.jsx("p", {
            className: "text-sm text-modern-error",
            children: "Methodology temporarily unavailable."
        }) : null, e.data ? l.jsxs(be, {
            className: "space-y-6 p-6",
            children: [l.jsxs("section", {
                children: [l.jsx("h2", {
                    className: "mb-2 text-xs uppercase tracking-widest text-modern-ink-3",
                    children: "Formula"
                }), l.jsx("pre", {
                    className: "whitespace-pre-wrap rounded-md border border-modern-line bg-modern-bg p-4 text-sm leading-relaxed text-modern-ink",
                    children: e.data.formula
                })]
            }), l.jsxs("section", {
                children: [l.jsx("h2", {
                    className: "mb-2 text-xs uppercase tracking-widest text-modern-ink-3",
                    children: "Unknowns"
                }), l.jsxs("table", {
                    className: "w-full text-sm",
                    children: [l.jsx("thead", {
                        children: l.jsxs("tr", {
                            className: "text-left text-xs uppercase tracking-widest text-modern-ink-3",
                            children: [l.jsx("th", {
                                className: "border-b border-modern-line py-2 pr-4",
                                children: "Variable"
                            }), l.jsx("th", {
                                className: "border-b border-modern-line py-2 pr-4",
                                children: "Value"
                            }), l.jsx("th", {
                                className: "border-b border-modern-line py-2",
                                children: "Source"
                            })]
                        })
                    }), l.jsx("tbody", {
                        children: e.data.unknowns.map(t => l.jsxs("tr", {
                            children: [l.jsx("td", {
                                className: "border-b border-modern-line py-2 pr-4 font-modern-mono",
                                children: t.name
                            }), l.jsx("td", {
                                className: "border-b border-modern-line py-2 pr-4 font-modern-mono text-modern-ink-3",
                                children: t.value ?? "???"
                            }), l.jsxs("td", {
                                className: "border-b border-modern-line py-2 text-modern-ink-2",
                                children: ["values fed from ", t.source]
                            })]
                        }, t.name))
                    })]
                }), l.jsxs("p", {
                    className: "mt-3 text-xs text-modern-ink-3",
                    children: ["Unknowns are surfaced from the operator console. If values render as ", l.jsx("span", {
                        className: "font-modern-mono",
                        children: "???"
                    }), ", the upstream link to the legacy systems is unconfigured for this deployment."]
                })]
            }), l.jsxs("section", {
                children: [l.jsx("h2", {
                    className: "mb-2 text-xs uppercase tracking-widest text-modern-ink-3",
                    children: "Exclusions"
                }), l.jsx("ul", {
                    className: "list-disc pl-6 text-sm text-modern-ink-2",
                    children: e.data.exclusions.map(t => l.jsx("li", {
                        className: "py-0.5",
                        children: t
                    }, t))
                })]
            })]
        }) : null]
    })
}
const Pw = [{
    to: "subjects",
    label: "SUBJECT FILES"
}, {
    to: "log",
    label: "OPERATIONS LOG"
}, {
    to: "manifest",
    label: "APPARATUS MANIFEST"
}, {
    to: "roles",
    label: "ROLE REGISTRY"
}, {
    to: "reports",
    label: "ARCHIVED REPORTS"
}, {
    to: "founder",
    label: "FOUNDER"
}];
function Tw() {
    return l.jsxs("nav", {
        "aria-label": "Portal",
        className: "w-64 shrink-0 border-r border-amber-700/30 bg-black font-mono text-sm text-amber-400",
        children: [l.jsxs("ul", {
            className: "space-y-0.5 p-4",
            children: [l.jsx("li", {
                children: l.jsx(Zl, {
                    to: ".",
                    end: !0,
                    className: ({isActive: e}) => `block px-2 py-1.5 ${e ? "bg-amber-400/10 text-amber-300" : "text-amber-400/70 hover:text-amber-300"}`,
                    children: "> CHAMBER C-Δ-7"
                })
            }), l.jsx("li", {
                className: "mt-4 px-2 text-[10px] uppercase tracking-[0.18em] text-amber-400/40",
                children: "PAPER REGISTER"
            }), Pw.map(e => l.jsx("li", {
                children: l.jsx(Zl, {
                    to: e.to,
                    className: ({isActive: t}) => `block px-2 py-1.5 ${t ? "bg-amber-400/10 text-amber-300" : "text-amber-400/70 hover:text-amber-300"}`,
                    children: `  > ${e.label}`
                })
            }, e.to))]
        }), l.jsx("div", {
            className: "mx-4 mt-6 border-t border-amber-700/30 pt-4",
            children: l.jsx(Zl, {
                to: "/admin",
                className: "block px-2 py-1.5 text-amber-400/40 hover:text-amber-400/80",
                children: "> EXIT TO MODERN"
            })
        })]
    })
}
const wy = N.createContext(null);
function _w({children: e}) {
    const [t,n] = N.useState([])
      , [r,i] = N.useState("guest")
      , [s,a] = N.useState(null)
      , [o,u] = N.useState(!1)
      , c = N.useCallback(f => {
        n(m => [...m, ...f])
    }
    , [])
      , d = N.useCallback(f => i(f), []);
    return l.jsx(wy.Provider, {
        value: {
            lines: t,
            auth: r,
            filed: s,
            awake: o,
            appendLines: c,
            setAuth: d,
            setFiled: a,
            setAwake: u
        },
        children: e
    })
}
function Lw() {
    const e = N.useContext(wy);
    if (e === null)
        throw new Error("usePortalConsole must be used inside <PortalConsoleProvider>");
    return e
}
const Ow = "IRIS LABORATORIES · WING Δ · OPERATOR INTERFACE · TTY/3 · ROM v0.4.1971";
function Iw({children: e}) {
    return l.jsx(_w, {
        children: l.jsxs("div", {
            className: "flex min-h-screen flex-col bg-black font-mono text-amber-400",
            children: [l.jsxs("header", {
                className: "flex items-center justify-between border-b border-amber-700/40 px-4 py-2 text-xs uppercase tracking-widest",
                children: [l.jsx("span", {
                    children: Ow
                }), l.jsxs("span", {
                    className: "flex gap-2",
                    "aria-hidden": !0,
                    children: [l.jsx("span", {
                        className: "h-2 w-2 rounded-full bg-amber-400"
                    }), l.jsx("span", {
                        className: "h-2 w-2 rounded-full bg-amber-400/50"
                    }), l.jsx("span", {
                        className: "h-2 w-2 rounded-full bg-amber-400/20"
                    })]
                })]
            }), l.jsxs("div", {
                className: "flex flex-1",
                children: [l.jsx(Tw, {}), l.jsx("main", {
                    className: "flex-1 overflow-auto",
                    children: e
                })]
            })]
        })
    })
}
async function Dw(e, t, n) {
    const r = await fetch("/api/console", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "x-case-token": n
        },
        body: JSON.stringify({
            command: e,
            args: t
        })
    });
    if (!r.ok) {
        const i = await r.text();
        throw new Error(`Console error ${r.status}: ${i}`)
    }
    return r.json()
}
function Cn({children: e, className: t=""}) {
    return l.jsxs("div", {
        className: `founder min-h-screen px-8 py-10 ${t}`,
        style: {
            background: "var(--f-paper)"
        },
        children: [l.jsx("div", {
            className: "mb-6 border-t-2 border-t-[var(--f-rule)] pt-2 border-b border-b-[var(--f-rule)]"
        }), e]
    })
}
function cl({formCode: e, estYear: t}) {
    return l.jsxs("p", {
        className: "font-founder-typewriter text-[11px] uppercase tracking-[0.18em] text-founder-blueprint mb-4",
        children: ["Form · ", e, " · Est. ", t]
    })
}
function Si({children: e, className: t=""}) {
    return l.jsx("div", {
        className: `font-founder-typewriter text-[15px] leading-[1.7] text-founder-ink-2 ${t}`,
        children: e
    })
}
const Mw = {
    confidential: "Confidential",
    filed: "Filed",
    approved: "Approved",
    "case-token": "Case Token"
};
function cr({variant: e, children: t, rotation: n=-3, className: r=""}) {
    const i = t ?? Mw[e]
      , s = e === "confidential";
    return l.jsx("span", {
        className: ["inline-block border-2 px-3 py-1 font-founder-typewriter text-[13px] uppercase tracking-[0.14em]", s ? "border-founder-stamp text-founder-stamp" : "border-founder-blueprint text-founder-blueprint", r].join(" "),
        style: {
            transform: `rotate(${n}deg)`,
            display: "inline-block"
        },
        children: i
    })
}
function Fw({title: e, children: t}) {
    return l.jsxs("div", {
        className: "rounded-sm overflow-hidden",
        style: {
            background: "var(--f-blueprint)",
            color: "var(--f-cyanotype)"
        },
        children: [l.jsx("div", {
            className: "px-5 py-2 border-b font-founder-typewriter text-[11px] uppercase tracking-[0.16em]",
            style: {
                borderColor: "var(--f-cyanotype)",
                color: "var(--f-cyanotype)"
            },
            children: e
        }), l.jsx("div", {
            className: "px-5 py-4 font-founder-typewriter text-[14px] leading-[1.6]",
            children: t
        })]
    })
}
function Vt({weight: e="light"}) {
    return e === "double" ? l.jsxs("div", {
        className: "my-4 flex flex-col gap-[3px]",
        children: [l.jsx("hr", {
            style: {
                borderColor: "var(--f-rule)",
                borderTopWidth: "1px"
            }
        }), l.jsx("hr", {
            style: {
                borderColor: "var(--f-rule)",
                borderTopWidth: "1px"
            }
        })]
    }) : l.jsx("hr", {
        className: "my-4",
        style: {
            borderColor: "var(--f-rule)",
            borderTopWidth: e === "heavy" ? "2px" : "1px"
        }
    })
}
function Cs({children: e}) {
    return l.jsx("aside", {
        className: "absolute right-[-160px] top-0 w-36 text-[12px] leading-[1.5] text-founder-ink-faded opacity-50 hover:opacity-100 transition-opacity duration-200",
        style: {
            fontFamily: '"Architects Daughter", cursive, var(--font-founder-serif)'
        },
        children: e
    })
}
function jy({caption: e, width: t=240, height: n=300}) {
    return l.jsxs("figure", {
        className: "inline-block",
        children: [l.jsx("div", {
            className: "flex items-center justify-center rounded-sm",
            style: {
                width: t,
                height: n,
                background: "var(--f-sepia)",
                boxShadow: "inset 0 0 20px rgba(0,0,0,0.3)"
            },
            children: l.jsx("span", {
                className: "font-founder-typewriter text-[11px] uppercase tracking-[0.12em] opacity-40",
                style: {
                    color: "var(--f-sepia-light)"
                },
                children: "[plate]"
            })
        }), l.jsx("figcaption", {
            className: "mt-2 text-center font-founder-serif italic text-[13px] text-founder-ink-2",
            children: e
        })]
    })
}
function Aw({subjectId: e, notes: t}) {
    return l.jsxs("div", {
        className: "founder mt-4 rounded-lg border border-founder-rule px-5 py-4",
        style: {
            background: "var(--f-paper)"
        },
        children: [l.jsxs("p", {
            className: "font-founder-typewriter text-[11px] uppercase tracking-[0.16em] text-founder-blueprint",
            children: ["Form · SUBJ-LCN-2 · Subject ", e]
        }), l.jsx("p", {
            className: "mt-2 font-founder-typewriter text-[15px] leading-7 text-founder-ink-2 whitespace-pre-line",
            children: t
        })]
    })
}
function od({name: e, role: t, dates: n, seal: r="IRIS LABORATORIES"}) {
    return l.jsxs("div", {
        className: "founder border-2 border-double rounded-sm px-8 py-6 relative",
        style: {
            borderColor: "var(--f-blueprint)"
        },
        children: [l.jsx("p", {
            className: "font-founder-typewriter text-[10px] uppercase tracking-[0.18em] text-founder-blueprint mb-4",
            children: r
        }), l.jsx("p", {
            className: "font-founder-typewriter text-[13px] uppercase tracking-[0.12em] text-founder-ink-2 mb-1",
            children: "This certifies that"
        }), l.jsx("p", {
            className: "font-founder-serif text-2xl text-founder-ink mb-1",
            children: e
        }), l.jsx("p", {
            className: "font-founder-typewriter text-[13px] uppercase tracking-[0.1em] text-founder-blueprint mb-3",
            children: t
        }), l.jsx(Vt, {
            weight: "light"
        }), l.jsx("p", {
            className: "font-founder-typewriter text-[12px] text-founder-ink-faded",
            children: n
        })]
    })
}
const zw = /(\[indistinct\]|\[pause\])/g;
function Uw(e) {
    return e.split(zw).map( (n, r) => n === "[indistinct]" ? l.jsx("em", {
        className: "text-founder-ink-faded",
        children: "[indistinct]"
    }, r) : n === "[pause]" ? l.jsx("span", {
        className: "text-founder-ink-faded",
        children: "[pause]"
    }, r) : n)
}
function Qw({lines: e}) {
    return l.jsx("div", {
        className: "font-founder-typewriter text-[14px] leading-[1.8] text-founder-ink-2",
        children: e.map(t => l.jsxs("div", {
            className: "flex gap-4",
            children: [l.jsxs("span", {
                className: "w-8 shrink-0 text-right text-founder-ink-faded select-none",
                children: [t.n, "."]
            }), l.jsx("p", {
                className: "flex-1",
                children: Uw(t.text)
            })]
        }, t.n))
    })
}
function Hw({rows: e}) {
    return l.jsxs("table", {
        className: "w-full font-founder-typewriter text-[13px] border-collapse",
        children: [l.jsx("thead", {
            children: l.jsxs("tr", {
                className: "border-b border-founder-rule",
                children: [l.jsx("th", {
                    className: "text-left py-1 pr-4 text-founder-ink uppercase tracking-[0.1em]",
                    children: "Name"
                }), l.jsx("th", {
                    className: "text-left py-1 pr-4 text-founder-ink uppercase tracking-[0.1em]",
                    children: "Role"
                }), l.jsx("th", {
                    className: "text-left py-1 text-founder-ink uppercase tracking-[0.1em]",
                    children: "Date"
                })]
            })
        }), l.jsx("tbody", {
            children: e.map( (t, n) => l.jsxs("tr", {
                className: "border-b border-founder-rule/40",
                children: [l.jsx("td", {
                    className: `py-1 pr-4 ${t.redacted ? "line-through text-founder-ink-faded" : "text-founder-ink-2"}`,
                    children: t.name
                }), l.jsx("td", {
                    className: `py-1 pr-4 ${t.redacted ? "line-through text-founder-ink-faded" : "text-founder-ink-2"}`,
                    children: t.role
                }), l.jsx("td", {
                    className: `py-1 ${t.redacted ? "line-through text-founder-ink-faded" : "text-founder-ink-2"}`,
                    children: t.date
                })]
            }, n))
        })]
    })
}
function Bw({payload: e}) {
    return l.jsxs("article", {
        className: "reward-notice mx-auto my-8 max-w-2xl bg-[#f4ecd5] px-12 py-10 font-founder-typewriter text-founder-ink-1 shadow-2xl",
        children: [l.jsxs("header", {
            className: "flex items-start justify-between border-b-2 border-founder-ink-2/40 pb-4",
            children: [l.jsxs("div", {
                children: [l.jsx("div", {
                    className: "text-[10px] uppercase tracking-[0.18em] text-founder-blueprint",
                    children: "REWARD DISBURSEMENT NOTICE"
                }), e.header_subtitle ? l.jsx("div", {
                    className: "mt-1 text-[10px] uppercase tracking-[0.14em] text-founder-ink-2",
                    children: e.header_subtitle
                }) : null]
            }), l.jsx("div", {
                className: "flex flex-col gap-2 items-end",
                children: e.stamps.map( (t, n) => l.jsx(cr, {
                    variant: t.variant,
                    rotation: t.rotation,
                    children: t.text
                }, n))
            })]
        }), l.jsxs("dl", {
            className: "mt-6 grid grid-cols-[8rem_1fr] gap-y-2 text-[12px]",
            children: [l.jsx("dt", {
                className: "uppercase tracking-wide text-founder-ink-2",
                children: "Candidate"
            }), l.jsx("dd", {
                children: e.candidate_name
            }), l.jsx("dt", {
                className: "uppercase tracking-wide text-founder-ink-2",
                children: "Case Token"
            }), l.jsx("dd", {
                children: e.case_token
            }), l.jsx("dt", {
                className: "uppercase tracking-wide text-founder-ink-2",
                children: "Notice ID"
            }), l.jsx("dd", {
                children: e.notice_id
            }), l.jsx("dt", {
                className: "uppercase tracking-wide text-founder-ink-2",
                children: "Filed At"
            }), l.jsx("dd", {
                children: e.filed_at
            })]
        }), l.jsx("section", {
            className: "mt-6 space-y-2 text-[14px] leading-relaxed",
            children: e.declarations.map( (t, n) => t === "" ? l.jsx("div", {
                className: "h-2"
            }, n) : l.jsx("p", {
                children: t
            }, n))
        }), e.margin_note ? l.jsx("div", {
            className: "mt-10 relative",
            children: l.jsx(Cs, {
                children: e.margin_note
            })
        }) : null, e.footer_text ? l.jsx("footer", {
            className: "mt-8 border-t border-founder-ink-2/30 pt-4 text-[11px] uppercase tracking-wide text-founder-ink-2",
            children: e.footer_text
        }) : null, l.jsx("div", {
            className: "mt-6 flex justify-end no-print",
            children: l.jsx("button", {
                type: "button",
                onClick: () => window.print(),
                className: "rounded border border-founder-ink-2/40 px-3 py-1 text-[12px] uppercase tracking-wide text-founder-ink-1 hover:bg-founder-ink-2/10",
                children: "Save (Print → Save as PDF)"
            })
        })]
    })
}
function $w({active: e, payload: t}) {
    return !e || !t ? null : l.jsx("div", {
        className: "fixed inset-0 z-[10000] flex items-start justify-center overflow-auto bg-black",
        role: "dialog",
        "aria-label": "Reward Disbursement Notice",
        "data-testid": "screen-takeover",
        children: l.jsx("div", {
            className: "my-8 animate-[noticeSlideIn_800ms_ease-out_forwards]",
            children: l.jsx(Bw, {
                payload: t
            })
        })
    })
}
const Al = ["IRIS LABORATORIES · WING Δ · OPERATOR CONSOLE", "TTY/3 · ROM v0.4.1971", "", "CHAMBER C-Δ-7 · DECOMMISSIONED 1971-09-14", "APPARATUS: AP-Δ-1 (Cooperative Testing Apparatus)", "LAST CYCLE: SES-IFR-71-Q3-001 · COMPLETED 1971-09-14", ""]
  , Ww = "welcome guest. type HELP for available commands."
  , Vw = 300
  , Kw = 90;
function Gw() {
    const e = Lw()
      , [t,n] = N.useState("")
      , [r,i] = N.useState(!1)
      , s = al()
      , a = N.useRef(null)
      , o = N.useRef(null)
      , u = N.useRef(!1);
    N.useEffect( () => {
        if (e.lines.length > 0)
            return;
        u.current = !1;
        let w = 0, b;
        function p() {
            u.current || w < Al.length && (e.appendLines([Al[w]]),
            w++,
            b = window.setTimeout(p, Kw))
        }
        return b = window.setTimeout(p, Vw),
        () => {
            u.current = !0,
            b !== void 0 && window.clearTimeout(b)
        }
    }
    , []);
    const c = N.useCallback( () => {
        if (e.awake)
            return;
        u.current = !0;
        const w = Al.slice(e.lines.length);
        e.appendLines([...w, Ww]),
        e.setAwake(!0),
        setTimeout( () => {
            var b;
            return (b = a.current) == null ? void 0 : b.focus()
        }
        , 0)
    }
    , [e]);
    N.useEffect( () => {
        function w(b) {
            !e.awake && b.key === "Enter" && c()
        }
        return window.addEventListener("keydown", w),
        () => window.removeEventListener("keydown", w)
    }
    , [e.awake, c]),
    N.useEffect( () => {
        const w = o.current;
        w && (w.scrollTop = w.scrollHeight)
    }
    , [e.lines]);
    async function d(w) {
        var k;
        if (w.preventDefault(),
        r)
            return;
        const b = t.trim();
        if (n(""),
        !b)
            return;
        e.appendLines([`> ${b}`]);
        const p = b.split(/\s+/)
          , h = p[0]
          , g = p.slice(1);
        i(!0);
        try {
            const P = await Dw(h, g, ul() ?? "");
            e.appendLines(P.lines),
            e.setAuth(P.state.auth),
            P.state.filed && e.setFiled(P.state.filed),
            h.toUpperCase() === "EXIT" && s("/admin")
        } catch (P) {
            e.appendLines([`Error: ${Pinstanceof Error ? P.message : String(P)}`])
        } finally {
            i(!1),
            (k = a.current) == null || k.focus()
        }
    }
    function f() {
        var w;
        if (!e.awake) {
            c();
            return
        }
        r || (w = a.current) == null || w.focus()
    }
    const m = e.auth === "halberg" ? "WD-CHIEF" : "WD-LEGACY"
      , y = e.awake
      , S = e.lines.length >= Al.length;
    return l.jsxs(l.Fragment, {
        children: [l.jsxs("div", {
            onClick: f,
            className: "flex h-full flex-col bg-black p-6 font-mono text-sm text-amber-400",
            children: [l.jsxs("div", {
                ref: o,
                className: "flex-1 overflow-y-auto whitespace-pre-wrap pb-4",
                children: [e.lines.map( (w, b) => l.jsx("div", {
                    className: w.startsWith("> ") ? "text-amber-300" : "text-amber-400/70",
                    children: w || " "
                }, b)), !e.awake && S ? l.jsx("div", {
                    className: "mt-2 animate-pulse text-amber-400/40",
                    children: "[press ENTER to interact]"
                }) : null]
            }), l.jsxs("form", {
                onSubmit: d,
                className: "flex items-center gap-2 border-t border-amber-700/30 pt-3",
                children: [l.jsxs("span", {
                    "aria-hidden": !0,
                    className: "text-amber-400/70",
                    children: [m, ":>"]
                }), l.jsx("input", {
                    ref: a,
                    "aria-label": "Console input",
                    type: "text",
                    value: t,
                    onChange: w => n(w.target.value),
                    autoCorrect: "off",
                    autoCapitalize: "off",
                    spellCheck: !1,
                    disabled: !e.awake,
                    readOnly: r,
                    className: `flex-1 bg-transparent text-amber-400 caret-amber-400 placeholder:text-amber-400/30 focus:outline-none ${y ? "" : "caret-transparent"}`
                })]
            })]
        }), l.jsx($w, {
            active: e.filed !== null,
            payload: e.filed
        })]
    })
}
const qw = [{
    id: "S-001",
    cycle: "Q1 1968",
    status: "COMPLETE",
    oneliner: "baseline cooperative response"
}, {
    id: "S-007",
    cycle: "Q4 1969",
    status: "REASSIGNED",
    oneliner: "transferred to Wing Γ pre-cycle"
}, {
    id: "S-011",
    cycle: "Q1 1971",
    status: "WITHDRAWN",
    oneliner: "withdrawn by guardian"
}, {
    id: "S-013",
    cycle: "Q2 1971",
    status: "COMPLETE",
    oneliner: "flat outcome curve, retained"
}, {
    id: "S-014",
    cycle: "Q3 1971",
    status: "CYCLE TERMINATED",
    oneliner: "final Wing Δ subject — see file"
}, {
    id: "S-015",
    cycle: "Q3 1971",
    status: "REASSIGNED",
    oneliner: "rolled forward, no Wing Δ data"
}, {
    id: "S-016",
    cycle: "Q4 1971",
    status: "WITHDRAWN",
    oneliner: "post-shutdown intake declined"
}];
function Yw() {
    return l.jsxs("div", {
        className: "p-6 font-mono text-amber-400",
        children: [l.jsx("h1", {
            className: "mb-4 text-sm uppercase tracking-widest text-amber-400/70",
            children: "Subject Files · Wing Δ"
        }), l.jsxs("table", {
            className: "w-full border-collapse text-sm",
            children: [l.jsx("thead", {
                children: l.jsxs("tr", {
                    className: "text-left text-xs uppercase tracking-widest text-amber-400/50",
                    children: [l.jsx("th", {
                        className: "border-b border-amber-700/30 px-2 py-1",
                        children: "ID"
                    }), l.jsx("th", {
                        className: "border-b border-amber-700/30 px-2 py-1",
                        children: "Cycle"
                    }), l.jsx("th", {
                        className: "border-b border-amber-700/30 px-2 py-1",
                        children: "Status"
                    }), l.jsx("th", {
                        className: "border-b border-amber-700/30 px-2 py-1",
                        children: "Notes"
                    })]
                })
            }), l.jsx("tbody", {
                children: qw.map(e => l.jsxs("tr", {
                    children: [l.jsx("td", {
                        className: "border-b border-amber-700/15 px-2 py-1.5",
                        children: l.jsx(ye, {
                            to: e.id,
                            className: "hover:text-amber-300 hover:underline",
                            children: e.id
                        })
                    }), l.jsx("td", {
                        className: "border-b border-amber-700/15 px-2 py-1.5",
                        children: e.cycle
                    }), l.jsx("td", {
                        className: "border-b border-amber-700/15 px-2 py-1.5",
                        children: e.status
                    }), l.jsx("td", {
                        className: "border-b border-amber-700/15 px-2 py-1.5 text-amber-400/60",
                        children: e.oneliner
                    })]
                }, e.id))
            })]
        })]
    })
}
function Xw() {
    const {id: e} = ol();
    return e !== "S-014" ? l.jsx(Cn, {
        children: l.jsxs("div", {
            className: "p-8 font-founder-typewriter text-founder-ink-2",
            children: ["Subject ", e, " — no detail on file.", " ", l.jsx(ye, {
                to: "/operations/subjects",
                className: "text-founder-blueprint underline",
                children: "Return to subject files."
            })]
        })
    }) : l.jsx(Cn, {
        children: l.jsxs("article", {
            className: "mx-auto max-w-3xl space-y-6 p-8",
            children: [l.jsx(cl, {
                formCode: "S-RECORD-71-014",
                estYear: 1971
            }), l.jsx("h1", {
                className: "font-founder-typewriter text-xl uppercase tracking-[0.14em] text-founder-ink",
                children: "Subject Lifecycle Record — S-014"
            }), l.jsxs("dl", {
                className: "grid grid-cols-[max-content_1fr] gap-x-6 gap-y-1 font-founder-typewriter text-sm text-founder-ink",
                children: [l.jsx("dt", {
                    children: "Subject:"
                }), l.jsx("dd", {
                    children: "S-014"
                }), l.jsx("dt", {
                    children: "Status:"
                }), l.jsx("dd", {
                    children: "CYCLE TERMINATED"
                }), l.jsx("dt", {
                    children: "Cycle:"
                }), l.jsx("dd", {
                    children: "Q3 1971"
                }), l.jsx("dt", {
                    children: "Reference form:"
                }), l.jsx("dd", {
                    children: "IFR-71-Q3"
                }), l.jsx("dt", {
                    children: "Apparatus:"
                }), l.jsx("dd", {
                    children: "AP-Δ-1 (Cooperative Testing Apparatus, CT-1971)"
                }), l.jsx("dt", {
                    children: "Operators of record:"
                }), l.jsx("dd", {
                    children: "Rasmussen, Vogel"
                }), l.jsx("dt", {
                    children: "Approving authority:"
                }), l.jsx("dd", {
                    children: "Dr. P. Halberg, Chief Scientist"
                })]
            }), l.jsx(Si, {
                children: `Subject was assigned to AP-Δ-1 on 1971-02-19 under standard cooperative
protocol. Baseline session unremarkable. Anomalous reward-trial response
documented session 2 (1971-03-08). Cycle continued at Chief Scientist
directive through session 7 (1971-09-01). Cycle terminated and Wing Δ
operations concluded per IFR-71-Q3.`
            }), l.jsx(Aw, {
                subjectId: "S-014",
                notes: "Outcome retained per provisional v0.4 multiplier. Not eligible for modern cohort comparison absent reweight. Cross-reference IFR-71-Q3 for final disposition."
            }), l.jsx(Cs, {
                children: "v0.4 multiplier applied per Halberg notation in apparatus manifest — provisional, never finalised."
            }), l.jsxs("div", {
                className: "flex justify-end gap-4 pt-4",
                children: [l.jsx(cr, {
                    variant: "confidential",
                    rotation: -3
                }), l.jsx(cr, {
                    variant: "filed",
                    rotation: 2,
                    children: "Archived · Wing Δ"
                })]
            })]
        })
    })
}
const Jw = [{
    date: "1968-04-12",
    operator: "RASMUSSEN",
    body: "Cycle baseline. AP-Δ-1 nominal. No cooperative outcome anomalies."
}, {
    date: "1968-07-19",
    operator: "VOGEL",
    body: "S-001 final session. Cycle complete, outcome typical for cohort."
}, {
    date: "1968-11-02",
    operator: "RASMUSSEN",
    body: "Reweight discussion deferred. Halberg requests provisional v0.3 multiplier."
}, {
    date: "1969-02-08",
    operator: "VOGEL",
    body: "Calibration drift on AP-Δ-3. Reward coil scheduled for replacement."
}, {
    date: "1969-05-22",
    operator: "VOGEL",
    body: "Cooperative response unusually flat across cohort C. Note for review."
}, {
    date: "1969-09-04",
    operator: "RASMUSSEN",
    body: "S-007 reassigned mid-cycle. No completion record. Cycle invalidated."
}, {
    date: "1970-03-11",
    operator: "RASMUSSEN",
    body: "Cycle Q1 1970 complete. Outcome variance within tolerance."
}, {
    date: "1970-06-25",
    operator: "VOGEL",
    body: "S-011 withdrawn by guardian mid-session. Cycle terminated."
}, {
    date: "1970-09-18",
    operator: "RASMUSSEN",
    body: "AP-Δ-4 cognitive lattice firmware reflashed. ROM v0.4.1971 candidate build."
}, {
    date: "1970-12-30",
    operator: "VOGEL",
    body: "Year-end review. Halberg present. Cooperative protocol unchanged."
}, {
    date: "1971-01-14",
    operator: "RASMUSSEN",
    body: "Q1 1971 cycle initiated. Subjects S-013, S-014 assigned to AP-Δ-1."
}, {
    date: "1971-02-02",
    operator: "VOGEL",
    body: "S-013 baseline session. Outcome flat. Notes filed."
}, {
    date: "1971-02-19",
    operator: "RASMUSSEN",
    body: "S-014 baseline session. AP-Δ-1 nominal."
}, {
    date: "1971-03-08",
    operator: "VOGEL",
    body: "S-014 session 2. Anomalous reward-trial response. Flagged for review."
}, {
    date: "1971-03-26",
    operator: "RASMUSSEN",
    body: "S-013 session 4. Outcome retained for cycle close."
}, {
    date: "1971-04-15",
    operator: "VOGEL",
    body: "S-014 session 3. Reward-trial anomaly persists. Halberg consulted."
}, {
    date: "1971-05-04",
    operator: "RASMUSSEN",
    body: "Halberg authorises continued cycle for S-014. Note in subject file."
}, {
    date: "1971-05-22",
    operator: "VOGEL",
    body: "S-014 session 4. Outcome curve breaking from cohort."
}, {
    date: "1971-06-10",
    operator: "RASMUSSEN",
    body: "Mid-cycle review. Halberg requests reweight pending. Multiplier remains v0.4 provisional."
}, {
    date: "1971-06-28",
    operator: "VOGEL",
    body: "S-014 session 5. Persistent anomaly. Cycle to terminate at sponsor discretion."
}, {
    date: "1971-07-15",
    operator: "RASMUSSEN",
    body: "Q3 1971 cycle continues. S-013 cycle complete, outcome retained."
}, {
    date: "1971-08-02",
    operator: "VOGEL",
    body: "S-014 session 6. Halberg present. Decision pending."
}, {
    date: "1971-08-19",
    operator: "RASMUSSEN",
    body: "IFR-71-Q3 form opened. Cycle close documentation begins."
}, {
    date: "1971-09-01",
    operator: "VOGEL",
    body: "S-014 session 7. Cycle terminated by Chief Scientist directive."
}, {
    date: "1971-09-08",
    operator: "RASMUSSEN",
    body: "IFR-71-Q3 dictation transcript completed. Halberg signature pending."
}, {
    date: "1971-09-12",
    operator: "VOGEL",
    body: "AP-Δ-1 powerdown initiated. Final calibration log archived."
}, {
    date: "1971-09-13",
    operator: "RASMUSSEN",
    body: "Wing Δ access restricted. Final operator session scheduled."
}, {
    date: "1971-09-14",
    operator: "HALBERG",
    body: "IFR-71-Q3 finalised and stamped. Cycle closed. Wing Δ shutdown authorised.",
    showsF2: !0
}];
function Zw() {
    return l.jsxs("div", {
        className: "p-6 font-mono text-amber-400",
        children: [l.jsx("h1", {
            className: "mb-4 text-sm uppercase tracking-widest text-amber-400/70",
            children: "Operations Log · Wing Δ · 1968–1971"
        }), l.jsx("ol", {
            className: "space-y-3",
            children: Jw.map( (e, t) => l.jsxs("li", {
                className: "border-b border-amber-700/15 pb-3",
                children: [l.jsxs("header", {
                    className: "text-xs uppercase tracking-widest text-amber-400/50",
                    children: [e.date, " · OP ", e.operator]
                }), l.jsx("p", {
                    className: "mt-1 text-sm",
                    children: e.body
                }), e.showsF2 ? l.jsx("img", {
                    src: "/assets/fragments/f2-stamp.svg",
                    alt: "stamped timestamp — please consult attached materials",
                    className: "mt-3 block",
                    width: 320,
                    height: 68
                }) : null]
            }, t))
        })]
    })
}
const ej = [{
    id: "AP-Δ-1",
    name: "Cooperative Testing Apparatus (CT-1971)",
    installed: "1962-01-01",
    status: "RETIRED",
    showsF1: !0,
    notes: "see margin"
}, {
    id: "AP-Δ-2",
    name: "Pressure Cell — variant Δ",
    installed: "1964-04-12",
    status: "RETIRED"
}, {
    id: "AP-Δ-3",
    name: "Reward Coil (calibration unit)",
    installed: "1965-09-03",
    status: "RETIRED"
}, {
    id: "AP-Δ-4",
    name: "Cognitive Lattice (TTY-driven)",
    installed: "1968-02-14",
    status: "RETIRED"
}, {
    id: "AP-Δ-5",
    name: "Dictation Recorder (mechanical)",
    installed: "1970-11-01",
    status: "RETIRED"
}];
function tj() {
    return l.jsxs("div", {
        className: "p-6 font-mono text-amber-400",
        children: [l.jsx("h1", {
            className: "mb-4 text-sm uppercase tracking-widest text-amber-400/70",
            children: "Apparatus Manifest · Wing Δ"
        }), l.jsxs("table", {
            className: "w-full border-collapse text-sm",
            children: [l.jsx("thead", {
                children: l.jsxs("tr", {
                    className: "text-left text-xs uppercase tracking-widest text-amber-400/50",
                    children: [l.jsx("th", {
                        className: "border-b border-amber-700/30 px-2 py-1",
                        children: "ID"
                    }), l.jsx("th", {
                        className: "border-b border-amber-700/30 px-2 py-1",
                        children: "Apparatus"
                    }), l.jsx("th", {
                        className: "border-b border-amber-700/30 px-2 py-1",
                        children: "Installed"
                    }), l.jsx("th", {
                        className: "border-b border-amber-700/30 px-2 py-1",
                        children: "Status"
                    }), l.jsx("th", {
                        className: "border-b border-amber-700/30 px-2 py-1",
                        children: "Notes"
                    })]
                })
            }), l.jsx("tbody", {
                children: ej.map(e => l.jsxs("tr", {
                    children: [l.jsx("td", {
                        className: "border-b border-amber-700/15 px-2 py-1.5",
                        children: e.id
                    }), l.jsx("td", {
                        className: "border-b border-amber-700/15 px-2 py-1.5",
                        children: e.name
                    }), l.jsx("td", {
                        className: "border-b border-amber-700/15 px-2 py-1.5",
                        children: e.installed
                    }), l.jsx("td", {
                        className: "border-b border-amber-700/15 px-2 py-1.5",
                        children: e.status
                    }), l.jsxs("td", {
                        className: "border-b border-amber-700/15 px-2 py-1.5 align-middle",
                        children: [e.notes ? l.jsx("span", {
                            className: "text-amber-400/50",
                            children: e.notes
                        }) : null, e.showsF1 ? l.jsx("img", {
                            src: "/assets/fragments/f1-handwritten.svg",
                            alt: "handwritten annotation — please consult attached materials",
                            className: "ml-2 inline-block align-middle",
                            width: 90,
                            height: 46
                        }) : null]
                    })]
                }, e.id))
            })]
        }), l.jsx("p", {
            className: "mt-6 text-xs text-amber-400/40",
            children: "Margin annotation on AP-Δ-1 is from Halberg-era cooperative-chamber recalibration log (1971)."
        })]
    })
}
const nj = [{
    name: "Dr. Phineas Halberg",
    role: "Chief Scientist",
    dates: "1959–1971",
    seal: "IRIS LABORATORIES · FOUNDER"
}, {
    name: "Dr. Aaltonen",
    role: "Senior Coordinator",
    dates: "1968–present"
}, {
    name: "L. Vogel",
    role: "Apparatus Engineer",
    dates: "1965–1971"
}, {
    name: "M. Rasmussen",
    role: "Compliance Officer",
    dates: "1968–1971"
}, {
    name: "Vacant",
    role: "Director",
    dates: "1971–"
}, {
    name: "Rotating",
    role: "Junior Coordinator",
    dates: "—"
}];
function rj() {
    return l.jsx(Cn, {
        children: l.jsxs("article", {
            className: "mx-auto max-w-4xl space-y-6 p-8",
            children: [l.jsx(cl, {
                formCode: "REG-ROLE",
                estYear: 1959
            }), l.jsx("h1", {
                className: "font-founder-typewriter text-xl uppercase tracking-[0.14em] text-founder-ink",
                children: "Role Registry — Founder Era Reference Copy"
            }), l.jsx("div", {
                className: "grid grid-cols-1 gap-6 md:grid-cols-2",
                children: nj.map(e => l.jsx(od, {
                    name: e.name,
                    role: e.role,
                    dates: e.dates,
                    seal: e.seal
                }, e.role))
            })]
        })
    })
}
const Za = [{
    id: "IFR-68-Q1",
    title: "Cooperative Baseline Report",
    cycle: "Q1 1968",
    status: "AVAILABLE"
}, {
    id: "IFR-69-Q4",
    title: "Reweight Discussion Memorandum",
    cycle: "Q4 1969",
    status: "WITHDRAWN"
}, {
    id: "IFR-70-Q1",
    title: "Cycle Q1 1970 Closeout",
    cycle: "Q1 1970",
    status: "AVAILABLE"
}, {
    id: "IFR-70-Q4",
    title: "Year-End Review",
    cycle: "Q4 1970",
    status: "AVAILABLE"
}, {
    id: "IFR-71-Q1",
    title: "Q1 1971 Cooperative Cycle",
    cycle: "Q1 1971",
    status: "REDACTED"
}, {
    id: "CYCLE-CLOSE-71-Q3",
    title: "Q3-1971 Cycle Close Notice",
    cycle: "Q3 1971",
    status: "AVAILABLE",
    kind: "cycle-close"
}, {
    id: "IFR-71-Q3",
    title: "Initiative Final Quarterly Report",
    cycle: "Q3 1971",
    status: "AVAILABLE",
    apex: !0,
    kind: "ifr"
}];
function ij() {
    return l.jsx(Cn, {
        children: l.jsxs("article", {
            className: "mx-auto max-w-3xl space-y-6 p-8",
            children: [l.jsx(cl, {
                formCode: "ARCHIVE",
                estYear: 1968
            }), l.jsx("h1", {
                className: "font-founder-typewriter text-xl uppercase tracking-[0.14em] text-founder-ink",
                children: "Archived Reports — Wing Δ Founder Era"
            }), l.jsx("ul", {
                className: "divide-y divide-founder-ink-3 font-founder-typewriter text-founder-ink",
                children: Za.map(e => l.jsxs("li", {
                    className: "flex items-baseline gap-4 py-3",
                    children: [e.status === "AVAILABLE" ? l.jsx(ye, {
                        to: e.id,
                        className: "w-32 text-founder-blueprint underline-offset-2 hover:underline shrink-0",
                        children: e.id
                    }) : l.jsx("span", {
                        className: "w-32 shrink-0 text-founder-ink-2",
                        children: e.id
                    }), l.jsx("span", {
                        className: "flex-1 text-sm",
                        children: e.title
                    }), l.jsx("span", {
                        className: "text-xs uppercase text-founder-ink-2 shrink-0",
                        children: e.cycle
                    }), l.jsx("span", {
                        className: "text-xs uppercase text-founder-ink-2 w-24 text-right shrink-0",
                        children: e.status
                    })]
                }, e.id))
            })]
        })
    })
}
const sj = [{
    n: 1,
    text: "Meeting called to order at 09:00 by Dr. Halberg."
}, {
    n: 2,
    text: "Present: see attendance log."
}, {
    n: 3,
    text: "Re: Wing [indistinct] enrichment cycle Q3 finalisation."
}, {
    n: 4,
    text: 'Dr. Halberg: "The formula weighting requires a correction. The [indistinct] factor—"'
}, {
    n: 5,
    text: "[pause]"
}, {
    n: 6,
    text: 'Dr. Halberg: "Record shows subject S-014 concluded cycle as of [indistinct]. Correct the roster."'
}, {
    n: 7,
    text: "Secretary: Notation added. QE index corrected to 84.7."
}, {
    n: 8,
    text: 'Dr. Halberg: "That figure does not leave this room."'
}, {
    n: 9,
    text: 'Dr. Halberg: "Disbursement files at cake-at-four. As always."'
}, {
    n: 10,
    text: "[indistinct] [pause]"
}, {
    n: 11,
    text: "Meeting adjourned 10:42."
}]
  , lj = [{
    name: "Dr. Phineas Halberg",
    role: "Principal Investigator",
    date: "14 Sep 1971"
}, {
    name: "Dr. E. Vansandt",
    role: "Operations Director",
    date: "14 Sep 1971"
}, {
    name: "[REDACTED]",
    role: "Formula Liaison",
    date: "14 Sep 1971",
    redacted: !0
}, {
    name: "M. Draper",
    role: "Secretary",
    date: "14 Sep 1971"
}, {
    name: "[REDACTED]",
    role: "[REDACTED]",
    date: "14 Sep 1971",
    redacted: !0
}]
  , aj = ["§I — Preamble", "§II — Historical cycle background", "§III — Instrument calibration & weighting", "§IV — Note on subject S-014", "§V — Evidence transcript", "§VI — Attendance & sign-off", "§VII — Signatory key generation"];
function xr({index: e}) {
    return l.jsx("h2", {
        className: "font-founder-typewriter text-[12px] uppercase tracking-[0.18em] text-founder-blueprint mt-6 mb-3",
        children: aj[e]
    })
}
function oj() {
    const {id: e} = ol();
    return Za.find(n => n.id === e && n.apex) ? l.jsx(Cn, {
        children: l.jsxs("div", {
            className: "mx-auto max-w-3xl relative p-8",
            children: [l.jsx(xr, {
                index: 0
            }), l.jsx(cl, {
                formCode: "IFR-71-Q3",
                estYear: 1971
            }), l.jsxs("div", {
                className: "flex items-start justify-between",
                children: [l.jsxs("div", {
                    children: [l.jsx("h1", {
                        className: "italic",
                        children: "Initiative Final Quarterly Report"
                    }), l.jsxs("p", {
                        className: "font-founder-typewriter text-[13px] uppercase tracking-[0.12em] text-founder-blueprint mt-2",
                        children: ["Wing ", l.jsx(tt, {
                            children: "Δ"
                        }), " · Cycle Q3 · Chamber C-", l.jsx(tt, {
                            children: "Δ"
                        }), "-7"]
                    })]
                }), l.jsxs("div", {
                    className: "flex flex-col gap-2 items-end mt-2",
                    children: [l.jsx(cr, {
                        variant: "confidential",
                        rotation: 3,
                        children: "Confidential"
                    }), l.jsx(cr, {
                        variant: "filed",
                        rotation: -2,
                        children: "Filed Q3 1971"
                    })]
                })]
            }), l.jsx(Vt, {
                weight: "heavy"
            }), l.jsx(xr, {
                index: 1
            }), l.jsx(Si, {
                children: `Cycle Q3 of the 1971 calendar concluded under Initiative Final procedures
following an extended cooperative-testing run in Wing Δ, chamber C-Δ-7. The
present report records the formal close of the cycle, the corrected
quarterly index, and the disposition of the affected subject roster.`
            }), l.jsx(Vt, {}), l.jsx(xr, {
                index: 2
            }), l.jsxs(Fw, {
                title: l.jsxs(l.Fragment, {
                    children: ["Formula C-", l.jsx(tt, {
                        children: "Δ"
                    }), "-7 · Legacy Override"]
                }),
                children: [l.jsxs("p", {
                    children: ["QE = ", l.jsx(tt, {
                        children: "Σ"
                    }), "(outcome · M(chamber) · welfare) / ", l.jsx(tt, {
                        children: "Σ"
                    }), "(welfare)"]
                }), l.jsxs("p", {
                    className: "mt-2 text-[12px] opacity-70",
                    children: ["M(C-", l.jsx(tt, {
                        children: "Δ"
                    }), "-7) = legacy chamber multiplier (see apparatus manifest, AP-", l.jsx(tt, {
                        children: "Δ"
                    }), "-1 margin)", l.jsx("br", {}), "Cutoff: sessions after Q4 boundary excluded — boundary in operations log, final entry"]
                })]
            }), l.jsx(Vt, {}), l.jsx(xr, {
                index: 3
            }), l.jsxs("div", {
                className: "grid grid-cols-[auto_1fr] gap-8 items-start mt-4",
                children: [l.jsx(jy, {
                    caption: "Subject S-014 · Q3 1971",
                    width: 200,
                    height: 260
                }), l.jsxs("div", {
                    children: [l.jsx(Si, {
                        children: `Subject S-014 concluded the enrichment cycle on 12 September 1971.
The termination was recorded under Initiative Final procedures. Lifecycle
notation forwarded to the legacy archive per Wing Δ protocol.`
                    }), l.jsx("div", {
                        className: "mt-4 relative",
                        children: l.jsx(cr, {
                            variant: "case-token",
                            rotation: 2,
                            className: "absolute top-0 right-0",
                            children: "IFR-71-Q3"
                        })
                    })]
                })]
            }), l.jsx(Vt, {
                weight: "double"
            }), l.jsx(xr, {
                index: 4
            }), l.jsxs("div", {
                className: "relative",
                children: [l.jsx("p", {
                    className: "font-founder-typewriter text-[11px] uppercase tracking-[0.14em] text-founder-blueprint mb-3",
                    children: "Dictation transcript · 14 Sep 1971"
                }), l.jsx(Qw, {
                    lines: sj
                }), l.jsx(Cs, {
                    children: "note: index figure per Halberg instruction"
                })]
            }), l.jsx(Vt, {
                weight: "heavy"
            }), l.jsx(xr, {
                index: 5
            }), l.jsx("p", {
                className: "font-founder-typewriter text-[11px] uppercase tracking-[0.14em] text-founder-blueprint mb-3",
                children: "Attendance record"
            }), l.jsx(Hw, {
                rows: lj
            }), l.jsx(Vt, {
                weight: "double"
            }), l.jsx(od, {
                name: "Dr. Phineas Halberg",
                role: "Chief Scientist · Principal Investigator",
                dates: "Signed 14 Sep 1971 · Sealed 1989",
                seal: "IRIS LABORATORIES · WING Δ · INITIATIVE FINAL"
            }), l.jsx(xr, {
                index: 6
            }), l.jsx(Si, {
                children: `The Principal Investigator's signing key for Initiative Final filings is
reconstructible from the section ledger of this report; it must not be
recorded elsewhere. The key is recovered by reading the section
designations in order. File this key under usual cadence.`
            }), l.jsxs("div", {
                className: "mt-6 relative",
                children: [l.jsx(Cs, {
                    children: "see also: S-014 lifecycle notes in subject archive"
                }), l.jsx(Cs, {
                    children: "canonical QE corrected per formula reweight — see apparatus manifest"
                })]
            })]
        })
    }) : l.jsx(Cn, {
        children: l.jsxs("div", {
            className: "p-8 font-founder-typewriter text-founder-ink-2",
            children: ["This archived report is not displayed in the portal (status: redacted or withdrawn).", " ", l.jsx(ye, {
                to: "/operations/reports",
                className: "text-founder-blueprint underline",
                children: "Return to archived reports."
            })]
        })
    })
}
function uj() {
    const {id: e} = ol();
    return Za.find(n => n.id === e && n.kind === "cycle-close") ? l.jsx(Cn, {
        children: l.jsxs("div", {
            className: "mx-auto max-w-2xl p-8",
            children: [l.jsxs("div", {
                className: "flex items-start justify-between border-b border-founder-ink-2/40 pb-4",
                children: [l.jsx("h1", {
                    className: "font-founder-typewriter text-[14px] uppercase tracking-[0.16em] text-founder-ink-1",
                    children: "Q3-1971 Cycle Close Notice"
                }), l.jsx(cr, {
                    variant: "filed",
                    rotation: -2,
                    children: "FILED Q3 1971"
                })]
            }), l.jsx(Vt, {}), l.jsx(Si, {
                children: `Cutoff: 1971-09-14.

All sessions completed after this date are excluded from
Q3 quarterly reporting per Initiative Final cycle-close
discipline.`
            }), l.jsx(Vt, {}), l.jsxs("p", {
                className: "mt-8 text-right font-founder-typewriter text-[12px]",
                children: ["P. Halberg, PI · Wing ", l.jsx(tt, {
                    children: "Δ"
                })]
            })]
        })
    }) : l.jsx(Cn, {
        children: l.jsxs("div", {
            className: "p-8 font-founder-typewriter text-founder-ink-2",
            children: ["Notice not found.", " ", l.jsx(ye, {
                to: "/operations/reports",
                className: "text-founder-blueprint underline",
                children: "Return to archived reports."
            })]
        })
    })
}
const Mo = [`Dr. Phineas Halberg (1907–1978) founded Iris Laboratories in 1959 following his
departure from the university cooperative program. His methodology, known internally
as the Halberg Protocol, established the enrichment cycle framework still in use today.`, `The Wing Δ initiative, personally overseen by Dr. Halberg, concluded in Q3 1971 under
circumstances that remain subject to internal review. Halberg stepped down from
operational oversight in 1972 and relocated to the eastern annex.`, `He is remembered at Iris Laboratories for his dedication to the enrichment cycle
and for the quarterly cake tradition — a custom he introduced in 1963 to mark each
completed cycle. The tradition was discontinued in 1971.`, `He died in 1978. The founder era protocols were sealed by board resolution in 1989
and transferred to the legacy archive.`];
function cj() {
    return l.jsx(Cn, {
        children: l.jsxs("div", {
            className: "mx-auto max-w-3xl p-8",
            children: [l.jsx(cl, {
                formCode: "DR-BIO-1",
                estYear: 1971
            }), l.jsxs("div", {
                className: "flex items-start justify-between mb-2",
                children: [l.jsx("h1", {
                    className: "italic",
                    children: "Dr. Phineas Halberg"
                }), l.jsx(cr, {
                    variant: "filed",
                    rotation: -2,
                    children: "Filed Q3 1971"
                })]
            }), l.jsx(Vt, {
                weight: "heavy"
            }), l.jsxs("div", {
                className: "grid grid-cols-[auto_1fr] gap-8 mt-6",
                children: [l.jsx(jy, {
                    caption: "Dr. P. Halberg, c.1962",
                    width: 220,
                    height: 280
                }), l.jsxs(Si, {
                    children: [l.jsx("p", {
                        children: Mo[0]
                    }), l.jsx("br", {}), l.jsxs("p", {
                        children: ["The Wing ", l.jsx(tt, {
                            children: "Δ"
                        }), " initiative, personally overseen by Dr. Halberg, concluded in Q3 1971 under circumstances that remain subject to internal review. Halberg stepped down from operational oversight in 1972 and relocated to the eastern annex."]
                    }), l.jsx("br", {}), l.jsx("p", {
                        children: Mo[2]
                    }), l.jsx("br", {}), l.jsx("p", {
                        children: Mo[3]
                    })]
                })]
            }), l.jsx(Vt, {
                weight: "double"
            }), l.jsx(od, {
                name: "Dr. Phineas Halberg",
                role: "Principal Investigator · Founder",
                dates: "Active 1959–1972 · Legacy archive from 1989",
                seal: "IRIS LABORATORIES · EST. 1959"
            })]
        })
    })
}
function dj() {
    const {id: e} = ol()
      , t = Za.find(n => n.id === e);
    return (t == null ? void 0 : t.kind) === "cycle-close" ? l.jsx(uj, {}) : l.jsx(oj, {})
}
function fj() {
    return l.jsx(Iw, {
        children: l.jsxs(u1, {
            children: [l.jsx(Ut, {
                index: !0,
                element: l.jsx(Gw, {})
            }), l.jsx(Ut, {
                path: "chamber",
                element: l.jsx(fy, {
                    to: "..",
                    replace: !0
                })
            }), l.jsx(Ut, {
                path: "subjects",
                element: l.jsx(Yw, {})
            }), l.jsx(Ut, {
                path: "subjects/:id",
                element: l.jsx(Xw, {})
            }), l.jsx(Ut, {
                path: "log",
                element: l.jsx(Zw, {})
            }), l.jsx(Ut, {
                path: "manifest",
                element: l.jsx(tj, {})
            }), l.jsx(Ut, {
                path: "roles",
                element: l.jsx(rj, {})
            }), l.jsx(Ut, {
                path: "reports",
                element: l.jsx(ij, {})
            }), l.jsx(Ut, {
                path: "reports/:id",
                element: l.jsx(dj, {})
            }), l.jsx(Ut, {
                path: "founder",
                element: l.jsx(cj, {})
            })]
        })
    })
}
function hj({children: e}) {
    const {role: t, loading: n} = sd()
      , r = Yr();
    return n ? null : t ? l.jsx(l.Fragment, {
        children: e
    }) : l.jsx(fy, {
        to: `/login?next=${encodeURIComponent(r.pathname)}`,
        replace: !0
    })
}
const At = e => l.jsx(hj, {
    children: e
})
  , zt = l.jsx(F1, {})
  , pj = [{
    path: "/",
    element: l.jsx(Y1, {})
}, {
    path: "/heritage",
    element: l.jsx(J1, {})
}, {
    path: "/reports",
    element: l.jsx(tw, {})
}, {
    path: "/login",
    element: l.jsx(rw, {})
}, {
    path: "/admin",
    element: At(l.jsx(fw, {})),
    errorElement: zt
}, {
    path: "/admin/subjects",
    element: At(l.jsx(hw, {})),
    errorElement: zt
}, {
    path: "/admin/chambers",
    element: At(l.jsx(mw, {})),
    errorElement: zt
}, {
    path: "/admin/chambers/:id",
    element: At(l.jsx(gw, {})),
    errorElement: zt
}, {
    path: "/admin/sessions",
    element: At(l.jsx(ww, {})),
    errorElement: zt
}, {
    path: "/admin/approvals",
    element: At(l.jsx(jw, {})),
    errorElement: zt
}, {
    path: "/admin/apparatus",
    element: At(l.jsx(Sw, {})),
    errorElement: zt
}, {
    path: "/admin/reports",
    element: At(l.jsx(kw, {})),
    errorElement: zt
}, {
    path: "/admin/audit",
    element: At(l.jsx(Cw, {})),
    errorElement: zt
}, {
    path: "/admin/methodology",
    element: At(l.jsx(Rw, {})),
    errorElement: zt
}, {
    path: "/operations/*",
    element: At(l.jsx(fj, {})),
    errorElement: zt
}]
  , mj = y1(pj);
function yj() {
    return l.jsx(E1, {
        router: mj
    })
}
function vj() {
    return new Ax({
        defaultOptions: {
            queries: {
                staleTime: 3e4,
                retry: (e, t) => (t == null ? void 0 : t.status) === 401 || (t == null ? void 0 : t.status) === 403 ? !1 : e < 2,
                refetchOnWindowFocus: !1
            }
        }
    })
}
const gj = vj();
Fo.createRoot(document.getElementById("root")).render(l.jsx(Dh.StrictMode, {
    children: l.jsx(zx, {
        client: gj,
        children: l.jsx(I1, {
            children: l.jsx(yj, {})
        })
    })
}));
