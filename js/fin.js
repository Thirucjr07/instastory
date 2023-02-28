const Me = function() {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload")) return;
    for (const n of document.querySelectorAll('link[rel="modulepreload"]')) i(n);
    new MutationObserver(n => {
        for (const r of n)
            if (r.type === "childList")
                for (const o of r.addedNodes) o.tagName === "LINK" && o.rel === "modulepreload" && i(o)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function s(n) {
        const r = {};
        return n.integrity && (r.integrity = n.integrity), n.referrerpolicy && (r.referrerPolicy = n.referrerpolicy), n.crossorigin === "use-credentials" ? r.credentials = "include" : n.crossorigin === "anonymous" ? r.credentials = "omit" : r.credentials = "same-origin", r
    }

    function i(n) {
        if (n.ep) return;
        n.ep = !0;
        const r = s(n);
        fetch(n.href, r)
    }
};
Me();

function pe(t) {
    return t !== null && typeof t == "object" && "constructor" in t && t.constructor === Object
}

function ce(t = {}, e = {}) {
    Object.keys(e).forEach(s => {
        typeof t[s] == "undefined" ? t[s] = e[s] : pe(e[s]) && pe(t[s]) && Object.keys(e[s]).length > 0 && ce(t[s], e[s])
    })
}
const Te = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: {
        blur() {},
        nodeName: ""
    },
    querySelector() {
        return null
    },
    querySelectorAll() {
        return []
    },
    getElementById() {
        return null
    },
    createEvent() {
        return {
            initEvent() {}
        }
    },
    createElement() {
        return {
            children: [],
            childNodes: [],
            style: {},
            setAttribute() {},
            getElementsByTagName() {
                return []
            }
        }
    },
    createElementNS() {
        return {}
    },
    importNode() {
        return null
    },
    location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: ""
    }
};

function W() {
    const t = typeof document != "undefined" ? document : {};
    return ce(t, Te), t
}
const Pe = {
    document: Te,
    navigator: {
        userAgent: ""
    },
    location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: ""
    },
    history: {
        replaceState() {},
        pushState() {},
        go() {},
        back() {}
    },
    CustomEvent: function() {
        return this
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle() {
        return {
            getPropertyValue() {
                return ""
            }
        }
    },
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia() {
        return {}
    },
    requestAnimationFrame(t) {
        return typeof setTimeout == "undefined" ? (t(), null) : setTimeout(t, 0)
    },
    cancelAnimationFrame(t) {
        typeof setTimeout != "undefined" && clearTimeout(t)
    }
};

function B() {
    const t = typeof window != "undefined" ? window : {};
    return ce(t, Pe), t
}

function Ce(t) {
    const e = t;
    Object.keys(e).forEach(s => {
        try {
            e[s] = null
        } catch {}
        try {
            delete e[s]
        } catch {}
    })
}

function de(t, e = 0) {
    return setTimeout(t, e)
}

function U() {
    return Date.now()
}

function Le(t) {
    const e = B();
    let s;
    return e.getComputedStyle && (s = e.getComputedStyle(t, null)), !s && t.currentStyle && (s = t.currentStyle), s || (s = t.style), s
}

function Ae(t, e = "x") {
    const s = B();
    let i, n, r;
    const o = Le(t);
    return s.WebKitCSSMatrix ? (n = o.transform || o.webkitTransform, n.split(",").length > 6 && (n = n.split(", ").map(a => a.replace(",", ".")).join(", ")), r = new s.WebKitCSSMatrix(n === "none" ? "" : n)) : (r = o.MozTransform || o.OTransform || o.MsTransform || o.msTransform || o.transform || o.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), i = r.toString().split(",")), e === "x" && (s.WebKitCSSMatrix ? n = r.m41 : i.length === 16 ? n = parseFloat(i[12]) : n = parseFloat(i[4])), e === "y" && (s.WebKitCSSMatrix ? n = r.m42 : i.length === 16 ? n = parseFloat(i[13]) : n = parseFloat(i[5])), n || 0
}

function J(t) {
    return typeof t == "object" && t !== null && t.constructor && Object.prototype.toString.call(t).slice(8, -1) === "Object"
}

function Ie(t) {
    return typeof window != "undefined" && typeof window.HTMLElement != "undefined" ? t instanceof HTMLElement : t && (t.nodeType === 1 || t.nodeType === 11)
}

function N(...t) {
    const e = Object(t[0]),
        s = ["__proto__", "constructor", "prototype"];
    for (let i = 1; i < t.length; i += 1) {
        const n = t[i];
        if (n != null && !Ie(n)) {
            const r = Object.keys(Object(n)).filter(o => s.indexOf(o) < 0);
            for (let o = 0, a = r.length; o < a; o += 1) {
                const l = r[o],
                    d = Object.getOwnPropertyDescriptor(n, l);
                d !== void 0 && d.enumerable && (J(e[l]) && J(n[l]) ? n[l].__swiper__ ? e[l] = n[l] : N(e[l], n[l]) : !J(e[l]) && J(n[l]) ? (e[l] = {}, n[l].__swiper__ ? e[l] = n[l] : N(e[l], n[l])) : e[l] = n[l])
            }
        }
    }
    return e
}

function Q(t, e, s) {
    t.style.setProperty(e, s)
}

function be({
    swiper: t,
    targetPosition: e,
    side: s
}) {
    const i = B(),
        n = -t.translate;
    let r = null,
        o;
    const a = t.params.speed;
    t.wrapperEl.style.scrollSnapType = "none", i.cancelAnimationFrame(t.cssModeFrameID);
    const l = e > n ? "next" : "prev",
        d = (c, p) => l === "next" && c >= p || l === "prev" && c <= p,
        u = () => {
            o = new Date().getTime(), r === null && (r = o);
            const c = Math.max(Math.min((o - r) / a, 1), 0),
                p = .5 - Math.cos(c * Math.PI) / 2;
            let f = n + p * (e - n);
            if (d(f, e) && (f = e), t.wrapperEl.scrollTo({
                    [s]: f
                }), d(f, e)) {
                t.wrapperEl.style.overflow = "hidden", t.wrapperEl.style.scrollSnapType = "", setTimeout(() => {
                    t.wrapperEl.style.overflow = "", t.wrapperEl.scrollTo({
                        [s]: f
                    })
                }), i.cancelAnimationFrame(t.cssModeFrameID);
                return
            }
            t.cssModeFrameID = i.requestAnimationFrame(u)
        };
    u()
}

function R(t, e = "") {
    return [...t.children].filter(s => s.matches(e))
}

function Y(t, e = []) {
    const s = document.createElement(t);
    return s.classList.add(...Array.isArray(e) ? e : [e]), s
}

function ze(t, e) {
    const s = [];
    for (; t.previousElementSibling;) {
        const i = t.previousElementSibling;
        e ? i.matches(e) && s.push(i) : s.push(i), t = i
    }
    return s
}

function Oe(t, e) {
    const s = [];
    for (; t.nextElementSibling;) {
        const i = t.nextElementSibling;
        e ? i.matches(e) && s.push(i) : s.push(i), t = i
    }
    return s
}

function _(t, e) {
    return B().getComputedStyle(t, null).getPropertyValue(e)
}

function j(t) {
    let e = t,
        s;
    if (e) {
        for (s = 0;
            (e = e.previousSibling) !== null;) e.nodeType === 1 && (s += 1);
        return s
    }
}

function ke(t, e) {
    const s = [];
    let i = t.parentElement;
    for (; i;) e ? i.matches(e) && s.push(i) : s.push(i), i = i.parentElement;
    return s
}

function he(t, e, s) {
    const i = B();
    return s ? t[e === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(i.getComputedStyle(t, null).getPropertyValue(e === "width" ? "margin-right" : "margin-top")) + parseFloat(i.getComputedStyle(t, null).getPropertyValue(e === "width" ? "margin-left" : "margin-bottom")) : t.offsetWidth
}
let re;

function Ge() {
    const t = B(),
        e = W();
    return {
        smoothScroll: e.documentElement && "scrollBehavior" in e.documentElement.style,
        touch: !!("ontouchstart" in t || t.DocumentTouch && e instanceof t.DocumentTouch)
    }
}

function ye() {
    return re || (re = Ge()), re
}
let ne;

function $e({
    userAgent: t
} = {}) {
    const e = ye(),
        s = B(),
        i = s.navigator.platform,
        n = t || s.navigator.userAgent,
        r = {
            ios: !1,
            android: !1
        },
        o = s.screen.width,
        a = s.screen.height,
        l = n.match(/(Android);?[\s\/]+([\d.]+)?/);
    let d = n.match(/(iPad).*OS\s([\d_]+)/);
    const u = n.match(/(iPod)(.*OS\s([\d_]+))?/),
        c = !d && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
        p = i === "Win32";
    let f = i === "MacIntel";
    const w = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
    return !d && f && e.touch && w.indexOf(`${o}x${a}`) >= 0 && (d = n.match(/(Version)\/([\d.]+)/), d || (d = [0, 1, "13_0_0"]), f = !1), l && !p && (r.os = "android", r.android = !0), (d || c || u) && (r.os = "ios", r.ios = !0), r
}

function De(t = {}) {
    return ne || (ne = $e(t)), ne
}
let ae;

function Ve() {
    const t = B();
    let e = !1;

    function s() {
        const i = t.navigator.userAgent.toLowerCase();
        return i.indexOf("safari") >= 0 && i.indexOf("chrome") < 0 && i.indexOf("android") < 0
    }
    if (s()) {
        const i = String(t.navigator.userAgent);
        if (i.includes("Version/")) {
            const [n, r] = i.split("Version/")[1].split(" ")[0].split(".").map(o => Number(o));
            e = n < 16 || n === 16 && r < 2
        }
    }
    return {
        isSafari: e || s(),
        needPerspectiveFix: e,
        isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t.navigator.userAgent)
    }
}

function Ne() {
    return ae || (ae = Ve()), ae
}

function Be({
    swiper: t,
    on: e,
    emit: s
}) {
    const i = B();
    let n = null,
        r = null;
    const o = () => {
            !t || t.destroyed || !t.initialized || (s("beforeResize"), s("resize"))
        },
        a = () => {
            !t || t.destroyed || !t.initialized || (n = new ResizeObserver(u => {
                r = i.requestAnimationFrame(() => {
                    const {
                        width: c,
                        height: p
                    } = t;
                    let f = c,
                        w = p;
                    u.forEach(({
                        contentBoxSize: m,
                        contentRect: T,
                        target: S
                    }) => {
                        S && S !== t.el || (f = T ? T.width : (m[0] || m).inlineSize, w = T ? T.height : (m[0] || m).blockSize)
                    }), (f !== c || w !== p) && o()
                })
            }), n.observe(t.el))
        },
        l = () => {
            r && i.cancelAnimationFrame(r), n && n.unobserve && t.el && (n.unobserve(t.el), n = null)
        },
        d = () => {
            !t || t.destroyed || !t.initialized || s("orientationchange")
        };
    e("init", () => {
        if (t.params.resizeObserver && typeof i.ResizeObserver != "undefined") {
            a();
            return
        }
        i.addEventListener("resize", o), i.addEventListener("orientationchange", d)
    }), e("destroy", () => {
        l(), i.removeEventListener("resize", o), i.removeEventListener("orientationchange", d)
    })
}

function Fe({
    swiper: t,
    extendParams: e,
    on: s,
    emit: i
}) {
    const n = [],
        r = B(),
        o = (d, u = {}) => {
            const c = r.MutationObserver || r.WebkitMutationObserver,
                p = new c(f => {
                    if (f.length === 1) {
                        i("observerUpdate", f[0]);
                        return
                    }
                    const w = function() {
                        i("observerUpdate", f[0])
                    };
                    r.requestAnimationFrame ? r.requestAnimationFrame(w) : r.setTimeout(w, 0)
                });
            p.observe(d, {
                attributes: typeof u.attributes == "undefined" ? !0 : u.attributes,
                childList: typeof u.childList == "undefined" ? !0 : u.childList,
                characterData: typeof u.characterData == "undefined" ? !0 : u.characterData
            }), n.push(p)
        },
        a = () => {
            if (!!t.params.observer) {
                if (t.params.observeParents) {
                    const d = ke(t.el);
                    for (let u = 0; u < d.length; u += 1) o(d[u])
                }
                o(t.el, {
                    childList: t.params.observeSlideChildren
                }), o(t.wrapperEl, {
                    attributes: !1
                })
            }
        },
        l = () => {
            n.forEach(d => {
                d.disconnect()
            }), n.splice(0, n.length)
        };
    e({
        observer: !1,
        observeParents: !1,
        observeSlideChildren: !1
    }), s("init", a), s("destroy", l)
}
var He = {
    on(t, e, s) {
        const i = this;
        if (!i.eventsListeners || i.destroyed || typeof e != "function") return i;
        const n = s ? "unshift" : "push";
        return t.split(" ").forEach(r => {
            i.eventsListeners[r] || (i.eventsListeners[r] = []), i.eventsListeners[r][n](e)
        }), i
    },
    once(t, e, s) {
        const i = this;
        if (!i.eventsListeners || i.destroyed || typeof e != "function") return i;

        function n(...r) {
            i.off(t, n), n.__emitterProxy && delete n.__emitterProxy, e.apply(i, r)
        }
        return n.__emitterProxy = e, i.on(t, n, s)
    },
    onAny(t, e) {
        const s = this;
        if (!s.eventsListeners || s.destroyed || typeof t != "function") return s;
        const i = e ? "unshift" : "push";
        return s.eventsAnyListeners.indexOf(t) < 0 && s.eventsAnyListeners[i](t), s
    },
    offAny(t) {
        const e = this;
        if (!e.eventsListeners || e.destroyed || !e.eventsAnyListeners) return e;
        const s = e.eventsAnyListeners.indexOf(t);
        return s >= 0 && e.eventsAnyListeners.splice(s, 1), e
    },
    off(t, e) {
        const s = this;
        return !s.eventsListeners || s.destroyed || !s.eventsListeners || t.split(" ").forEach(i => {
            typeof e == "undefined" ? s.eventsListeners[i] = [] : s.eventsListeners[i] && s.eventsListeners[i].forEach((n, r) => {
                (n === e || n.__emitterProxy && n.__emitterProxy === e) && s.eventsListeners[i].splice(r, 1)
            })
        }), s
    },
    emit(...t) {
        const e = this;
        if (!e.eventsListeners || e.destroyed || !e.eventsListeners) return e;
        let s, i, n;
        return typeof t[0] == "string" || Array.isArray(t[0]) ? (s = t[0], i = t.slice(1, t.length), n = e) : (s = t[0].events, i = t[0].data, n = t[0].context || e), i.unshift(n), (Array.isArray(s) ? s : s.split(" ")).forEach(o => {
            e.eventsAnyListeners && e.eventsAnyListeners.length && e.eventsAnyListeners.forEach(a => {
                a.apply(n, [o, ...i])
            }), e.eventsListeners && e.eventsListeners[o] && e.eventsListeners[o].forEach(a => {
                a.apply(n, i)
            })
        }), e
    }
};

function qe() {
    const t = this;
    let e, s;
    const i = t.el;
    typeof t.params.width != "undefined" && t.params.width !== null ? e = t.params.width : e = i.clientWidth, typeof t.params.height != "undefined" && t.params.height !== null ? s = t.params.height : s = i.clientHeight, !(e === 0 && t.isHorizontal() || s === 0 && t.isVertical()) && (e = e - parseInt(_(i, "padding-left") || 0, 10) - parseInt(_(i, "padding-right") || 0, 10), s = s - parseInt(_(i, "padding-top") || 0, 10) - parseInt(_(i, "padding-bottom") || 0, 10), Number.isNaN(e) && (e = 0), Number.isNaN(s) && (s = 0), Object.assign(t, {
        width: e,
        height: s,
        size: t.isHorizontal() ? e : s
    }))
}

function _e() {
    const t = this;

    function e(v) {
        return t.isHorizontal() ? v : {
            width: "height",
            "margin-top": "margin-left",
            "margin-bottom ": "margin-right",
            "margin-left": "margin-top",
            "margin-right": "margin-bottom",
            "padding-left": "padding-top",
            "padding-right": "padding-bottom",
            marginRight: "marginBottom"
        } [v]
    }

    function s(v, E) {
        return parseFloat(v.getPropertyValue(e(E)) || 0)
    }
    const i = t.params,
        {
            wrapperEl: n,
            slidesEl: r,
            size: o,
            rtlTranslate: a,
            wrongRTL: l
        } = t,
        d = t.virtual && i.virtual.enabled,
        u = d ? t.virtual.slides.length : t.slides.length,
        c = R(r, `.${t.params.slideClass}, swiper-slide`),
        p = d ? t.virtual.slides.length : c.length;
    let f = [];
    const w = [],
        m = [];
    let T = i.slidesOffsetBefore;
    typeof T == "function" && (T = i.slidesOffsetBefore.call(t));
    let S = i.slidesOffsetAfter;
    typeof S == "function" && (S = i.slidesOffsetAfter.call(t));
    const P = t.snapGrid.length,
        g = t.slidesGrid.length;
    let b = i.spaceBetween,
        y = -T,
        x = 0,
        I = 0;
    if (typeof o == "undefined") return;
    typeof b == "string" && b.indexOf("%") >= 0 && (b = parseFloat(b.replace("%", "")) / 100 * o), t.virtualSize = -b, c.forEach(v => {
        a ? v.style.marginLeft = "" : v.style.marginRight = "", v.style.marginBottom = "", v.style.marginTop = ""
    }), i.centeredSlides && i.cssMode && (Q(n, "--swiper-centered-offset-before", ""), Q(n, "--swiper-centered-offset-after", ""));
    const O = i.grid && i.grid.rows > 1 && t.grid;
    O && t.grid.initSlides(p);
    let z;
    const V = i.slidesPerView === "auto" && i.breakpoints && Object.keys(i.breakpoints).filter(v => typeof i.breakpoints[v].slidesPerView != "undefined").length > 0;
    for (let v = 0; v < p; v += 1) {
        z = 0;
        let E;
        if (c[v] && (E = c[v]), O && t.grid.updateSlide(v, E, p, e), !(c[v] && _(E, "display") === "none")) {
            if (i.slidesPerView === "auto") {
                V && (c[v].style[e("width")] = "");
                const L = getComputedStyle(E),
                    D = E.style.transform,
                    X = E.style.webkitTransform;
                if (D && (E.style.transform = "none"), X && (E.style.webkitTransform = "none"), i.roundLengths) z = t.isHorizontal() ? he(E, "width", !0) : he(E, "height", !0);
                else {
                    const Z = s(L, "width"),
                        fe = s(L, "padding-left"),
                        ue = s(L, "padding-right"),
                        te = s(L, "margin-left"),
                        se = s(L, "margin-right"),
                        h = L.getPropertyValue("box-sizing");
                    if (h && h === "border-box") z = Z + te + se;
                    else {
                        const {
                            clientWidth: M,
                            offsetWidth: C
                        } = E;
                        z = Z + fe + ue + te + se + (C - M)
                    }
                }
                D && (E.style.transform = D), X && (E.style.webkitTransform = X), i.roundLengths && (z = Math.floor(z))
            } else z = (o - (i.slidesPerView - 1) * b) / i.slidesPerView, i.roundLengths && (z = Math.floor(z)), c[v] && (c[v].style[e("width")] = `${z}px`);
            c[v] && (c[v].swiperSlideSize = z), m.push(z), i.centeredSlides ? (y = y + z / 2 + x / 2 + b, x === 0 && v !== 0 && (y = y - o / 2 - b), v === 0 && (y = y - o / 2 - b), Math.abs(y) < 1 / 1e3 && (y = 0), i.roundLengths && (y = Math.floor(y)), I % i.slidesPerGroup === 0 && f.push(y), w.push(y)) : (i.roundLengths && (y = Math.floor(y)), (I - Math.min(t.params.slidesPerGroupSkip, I)) % t.params.slidesPerGroup === 0 && f.push(y), w.push(y), y = y + z + b), t.virtualSize += z + b, x = z, I += 1
        }
    }
    if (t.virtualSize = Math.max(t.virtualSize, o) + S, a && l && (i.effect === "slide" || i.effect === "coverflow") && (n.style.width = `${t.virtualSize+i.spaceBetween}px`), i.setWrapperSize && (n.style[e("width")] = `${t.virtualSize+i.spaceBetween}px`), O && t.grid.updateWrapperSize(z, f, e), !i.centeredSlides) {
        const v = [];
        for (let E = 0; E < f.length; E += 1) {
            let L = f[E];
            i.roundLengths && (L = Math.floor(L)), f[E] <= t.virtualSize - o && v.push(L)
        }
        f = v, Math.floor(t.virtualSize - o) - Math.floor(f[f.length - 1]) > 1 && f.push(t.virtualSize - o)
    }
    if (d && i.loop) {
        const v = m[0] + b;
        if (i.slidesPerGroup > 1) {
            const E = Math.ceil((t.virtual.slidesBefore + t.virtual.slidesAfter) / i.slidesPerGroup),
                L = v * i.slidesPerGroup;
            for (let D = 0; D < E; D += 1) f.push(f[f.length - 1] + L)
        }
        for (let E = 0; E < t.virtual.slidesBefore + t.virtual.slidesAfter; E += 1) i.slidesPerGroup === 1 && f.push(f[f.length - 1] + v), w.push(w[w.length - 1] + v), t.virtualSize += v
    }
    if (f.length === 0 && (f = [0]), i.spaceBetween !== 0) {
        const v = t.isHorizontal() && a ? "marginLeft" : e("marginRight");
        c.filter((E, L) => !i.cssMode || i.loop ? !0 : L !== c.length - 1).forEach(E => {
            E.style[v] = `${b}px`
        })
    }
    if (i.centeredSlides && i.centeredSlidesBounds) {
        let v = 0;
        m.forEach(L => {
            v += L + (i.spaceBetween ? i.spaceBetween : 0)
        }), v -= i.spaceBetween;
        const E = v - o;
        f = f.map(L => L < 0 ? -T : L > E ? E + S : L)
    }
    if (i.centerInsufficientSlides) {
        let v = 0;
        if (m.forEach(E => {
                v += E + (i.spaceBetween ? i.spaceBetween : 0)
            }), v -= i.spaceBetween, v < o) {
            const E = (o - v) / 2;
            f.forEach((L, D) => {
                f[D] = L - E
            }), w.forEach((L, D) => {
                w[D] = L + E
            })
        }
    }
    if (Object.assign(t, {
            slides: c,
            snapGrid: f,
            slidesGrid: w,
            slidesSizesGrid: m
        }), i.centeredSlides && i.cssMode && !i.centeredSlidesBounds) {
        Q(n, "--swiper-centered-offset-before", `${-f[0]}px`), Q(n, "--swiper-centered-offset-after", `${t.size/2-m[m.length-1]/2}px`);
        const v = -t.snapGrid[0],
            E = -t.slidesGrid[0];
        t.snapGrid = t.snapGrid.map(L => L + v), t.slidesGrid = t.slidesGrid.map(L => L + E)
    }
    if (p !== u && t.emit("slidesLengthChange"), f.length !== P && (t.params.watchOverflow && t.checkOverflow(), t.emit("snapGridLengthChange")), w.length !== g && t.emit("slidesGridLengthChange"), i.watchSlidesProgress && t.updateSlidesOffset(), !d && !i.cssMode && (i.effect === "slide" || i.effect === "fade")) {
        const v = `${i.containerModifierClass}backface-hidden`,
            E = t.el.classList.contains(v);
        p <= i.maxBackfaceHiddenSlides ? E || t.el.classList.add(v) : E && t.el.classList.remove(v)
    }
}

function Re(t) {
    const e = this,
        s = [],
        i = e.virtual && e.params.virtual.enabled;
    let n = 0,
        r;
    typeof t == "number" ? e.setTransition(t) : t === !0 && e.setTransition(e.params.speed);
    const o = a => i ? e.slides.filter(l => parseInt(l.getAttribute("data-swiper-slide-index"), 10) === a)[0] : e.slides[a];
    if (e.params.slidesPerView !== "auto" && e.params.slidesPerView > 1)
        if (e.params.centeredSlides)(e.visibleSlides || []).forEach(a => {
            s.push(a)
        });
        else
            for (r = 0; r < Math.ceil(e.params.slidesPerView); r += 1) {
                const a = e.activeIndex + r;
                if (a > e.slides.length && !i) break;
                s.push(o(a))
            } else s.push(o(e.activeIndex));
    for (r = 0; r < s.length; r += 1)
        if (typeof s[r] != "undefined") {
            const a = s[r].offsetHeight;
            n = a > n ? a : n
        }(n || n === 0) && (e.wrapperEl.style.height = `${n}px`)
}

function We() {
    const t = this,
        e = t.slides,
        s = t.isElement ? t.isHorizontal() ? t.wrapperEl.offsetLeft : t.wrapperEl.offsetTop : 0;
    for (let i = 0; i < e.length; i += 1) e[i].swiperSlideOffset = (t.isHorizontal() ? e[i].offsetLeft : e[i].offsetTop) - s
}

function je(t = this && this.translate || 0) {
    const e = this,
        s = e.params,
        {
            slides: i,
            rtlTranslate: n,
            snapGrid: r
        } = e;
    if (i.length === 0) return;
    typeof i[0].swiperSlideOffset == "undefined" && e.updateSlidesOffset();
    let o = -t;
    n && (o = t), i.forEach(a => {
        a.classList.remove(s.slideVisibleClass)
    }), e.visibleSlidesIndexes = [], e.visibleSlides = [];
    for (let a = 0; a < i.length; a += 1) {
        const l = i[a];
        let d = l.swiperSlideOffset;
        s.cssMode && s.centeredSlides && (d -= i[0].swiperSlideOffset);
        const u = (o + (s.centeredSlides ? e.minTranslate() : 0) - d) / (l.swiperSlideSize + s.spaceBetween),
            c = (o - r[0] + (s.centeredSlides ? e.minTranslate() : 0) - d) / (l.swiperSlideSize + s.spaceBetween),
            p = -(o - d),
            f = p + e.slidesSizesGrid[a];
        (p >= 0 && p < e.size - 1 || f > 1 && f <= e.size || p <= 0 && f >= e.size) && (e.visibleSlides.push(l), e.visibleSlidesIndexes.push(a), i[a].classList.add(s.slideVisibleClass)), l.progress = n ? -u : u, l.originalProgress = n ? -c : c
    }
}

function Xe(t) {
    const e = this;
    if (typeof t == "undefined") {
        const u = e.rtlTranslate ? -1 : 1;
        t = e && e.translate && e.translate * u || 0
    }
    const s = e.params,
        i = e.maxTranslate() - e.minTranslate();
    let {
        progress: n,
        isBeginning: r,
        isEnd: o,
        progressLoop: a
    } = e;
    const l = r,
        d = o;
    if (i === 0) n = 0, r = !0, o = !0;
    else {
        n = (t - e.minTranslate()) / i;
        const u = Math.abs(t - e.minTranslate()) < 1,
            c = Math.abs(t - e.maxTranslate()) < 1;
        r = u || n <= 0, o = c || n >= 1, u && (n = 0), c && (n = 1)
    }
    if (s.loop) {
        const u = j(e.slides.filter(T => T.getAttribute("data-swiper-slide-index") === "0")[0]),
            c = j(e.slides.filter(T => T.getAttribute("data-swiper-slide-index") * 1 === e.slides.length - 1)[0]),
            p = e.slidesGrid[u],
            f = e.slidesGrid[c],
            w = e.slidesGrid[e.slidesGrid.length - 1],
            m = Math.abs(t);
        m >= p ? a = (m - p) / w : a = (m + w - f) / w, a > 1 && (a -= 1)
    }
    Object.assign(e, {
        progress: n,
        progressLoop: a,
        isBeginning: r,
        isEnd: o
    }), (s.watchSlidesProgress || s.centeredSlides && s.autoHeight) && e.updateSlidesProgress(t), r && !l && e.emit("reachBeginning toEdge"), o && !d && e.emit("reachEnd toEdge"), (l && !r || d && !o) && e.emit("fromEdge"), e.emit("progress", n)
}

function Ye() {
    const t = this,
        {
            slides: e,
            params: s,
            slidesEl: i,
            activeIndex: n
        } = t,
        r = t.virtual && s.virtual.enabled,
        o = l => R(i, `.${s.slideClass}${l}, swiper-slide${l}`)[0];
    e.forEach(l => {
        l.classList.remove(s.slideActiveClass, s.slideNextClass, s.slidePrevClass)
    });
    let a;
    if (r)
        if (s.loop) {
            let l = n - t.virtual.slidesBefore;
            l < 0 && (l = t.virtual.slides.length + l), l >= t.virtual.slides.length && (l -= t.virtual.slides.length), a = o(`[data-swiper-slide-index="${l}"]`)
        } else a = o(`[data-swiper-slide-index="${n}"]`);
    else a = e[n];
    if (a) {
        a.classList.add(s.slideActiveClass);
        let l = Oe(a, `.${s.slideClass}, swiper-slide`)[0];
        s.loop && !l && (l = e[0]), l && l.classList.add(s.slideNextClass);
        let d = ze(a, `.${s.slideClass}, swiper-slide`)[0];
        s.loop && !d === 0 && (d = e[e.length - 1]), d && d.classList.add(s.slidePrevClass)
    }
    t.emitSlidesClasses()
}

function Ue(t) {
    const {
        slidesGrid: e,
        params: s
    } = t, i = t.rtlTranslate ? t.translate : -t.translate;
    let n;
    for (let r = 0; r < e.length; r += 1) typeof e[r + 1] != "undefined" ? i >= e[r] && i < e[r + 1] - (e[r + 1] - e[r]) / 2 ? n = r : i >= e[r] && i < e[r + 1] && (n = r + 1) : i >= e[r] && (n = r);
    return s.normalizeSlideIndex && (n < 0 || typeof n == "undefined") && (n = 0), n
}

function Ke(t) {
    const e = this,
        s = e.rtlTranslate ? e.translate : -e.translate,
        {
            snapGrid: i,
            params: n,
            activeIndex: r,
            realIndex: o,
            snapIndex: a
        } = e;
    let l = t,
        d;
    const u = p => {
        let f = p - e.virtual.slidesBefore;
        return f < 0 && (f = e.virtual.slides.length + f), f >= e.virtual.slides.length && (f -= e.virtual.slides.length), f
    };
    if (typeof l == "undefined" && (l = Ue(e)), i.indexOf(s) >= 0) d = i.indexOf(s);
    else {
        const p = Math.min(n.slidesPerGroupSkip, l);
        d = p + Math.floor((l - p) / n.slidesPerGroup)
    }
    if (d >= i.length && (d = i.length - 1), l === r) {
        d !== a && (e.snapIndex = d, e.emit("snapIndexChange")), e.params.loop && e.virtual && e.params.virtual.enabled && (e.realIndex = u(l));
        return
    }
    let c;
    e.virtual && n.virtual.enabled && n.loop ? c = u(l) : e.slides[l] ? c = parseInt(e.slides[l].getAttribute("data-swiper-slide-index") || l, 10) : c = l, Object.assign(e, {
        snapIndex: d,
        realIndex: c,
        previousIndex: r,
        activeIndex: l
    }), e.emit("activeIndexChange"), e.emit("snapIndexChange"), o !== c && e.emit("realIndexChange"), (e.initialized || e.params.runCallbacksOnInit) && e.emit("slideChange")
}

function Ze(t) {
    const e = this,
        s = e.params,
        i = t.closest(`.${s.slideClass}, swiper-slide`);
    let n = !1,
        r;
    if (i) {
        for (let o = 0; o < e.slides.length; o += 1)
            if (e.slides[o] === i) {
                n = !0, r = o;
                break
            }
    }
    if (i && n) e.clickedSlide = i, e.virtual && e.params.virtual.enabled ? e.clickedIndex = parseInt(i.getAttribute("data-swiper-slide-index"), 10) : e.clickedIndex = r;
    else {
        e.clickedSlide = void 0, e.clickedIndex = void 0;
        return
    }
    s.slideToClickedSlide && e.clickedIndex !== void 0 && e.clickedIndex !== e.activeIndex && e.slideToClickedSlide()
}
var Je = {
    updateSize: qe,
    updateSlides: _e,
    updateAutoHeight: Re,
    updateSlidesOffset: We,
    updateSlidesProgress: je,
    updateProgress: Xe,
    updateSlidesClasses: Ye,
    updateActiveIndex: Ke,
    updateClickedSlide: Ze
};

function Qe(t = this.isHorizontal() ? "x" : "y") {
    const e = this,
        {
            params: s,
            rtlTranslate: i,
            translate: n,
            wrapperEl: r
        } = e;
    if (s.virtualTranslate) return i ? -n : n;
    if (s.cssMode) return n;
    let o = Ae(r, t);
    return i && (o = -o), o || 0
}

function et(t, e) {
    const s = this,
        {
            rtlTranslate: i,
            params: n,
            wrapperEl: r,
            progress: o
        } = s;
    let a = 0,
        l = 0;
    const d = 0;
    s.isHorizontal() ? a = i ? -t : t : l = t, n.roundLengths && (a = Math.floor(a), l = Math.floor(l)), n.cssMode ? r[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal() ? -a : -l : n.virtualTranslate || (r.style.transform = `translate3d(${a}px, ${l}px, ${d}px)`), s.previousTranslate = s.translate, s.translate = s.isHorizontal() ? a : l;
    let u;
    const c = s.maxTranslate() - s.minTranslate();
    c === 0 ? u = 0 : u = (t - s.minTranslate()) / c, u !== o && s.updateProgress(t), s.emit("setTranslate", s.translate, e)
}

function tt() {
    return -this.snapGrid[0]
}

function st() {
    return -this.snapGrid[this.snapGrid.length - 1]
}

function it(t = 0, e = this.params.speed, s = !0, i = !0, n) {
    const r = this,
        {
            params: o,
            wrapperEl: a
        } = r;
    if (r.animating && o.preventInteractionOnTransition) return !1;
    const l = r.minTranslate(),
        d = r.maxTranslate();
    let u;
    if (i && t > l ? u = l : i && t < d ? u = d : u = t, r.updateProgress(u), o.cssMode) {
        const c = r.isHorizontal();
        if (e === 0) a[c ? "scrollLeft" : "scrollTop"] = -u;
        else {
            if (!r.support.smoothScroll) return be({
                swiper: r,
                targetPosition: -u,
                side: c ? "left" : "top"
            }), !0;
            a.scrollTo({
                [c ? "left" : "top"]: -u,
                behavior: "smooth"
            })
        }
        return !0
    }
    return e === 0 ? (r.setTransition(0), r.setTranslate(u), s && (r.emit("beforeTransitionStart", e, n), r.emit("transitionEnd"))) : (r.setTransition(e), r.setTranslate(u), s && (r.emit("beforeTransitionStart", e, n), r.emit("transitionStart")), r.animating || (r.animating = !0, r.onTranslateToWrapperTransitionEnd || (r.onTranslateToWrapperTransitionEnd = function(p) {
        !r || r.destroyed || p.target === this && (r.wrapperEl.removeEventListener("transitionend", r.onTranslateToWrapperTransitionEnd), r.onTranslateToWrapperTransitionEnd = null, delete r.onTranslateToWrapperTransitionEnd, s && r.emit("transitionEnd"))
    }), r.wrapperEl.addEventListener("transitionend", r.onTranslateToWrapperTransitionEnd))), !0
}
var rt = {
    getTranslate: Qe,
    setTranslate: et,
    minTranslate: tt,
    maxTranslate: st,
    translateTo: it
};

function nt(t, e) {
    const s = this;
    s.params.cssMode || (s.wrapperEl.style.transitionDuration = `${t}ms`), s.emit("setTransition", t, e)
}

function xe({
    swiper: t,
    runCallbacks: e,
    direction: s,
    step: i
}) {
    const {
        activeIndex: n,
        previousIndex: r
    } = t;
    let o = s;
    if (o || (n > r ? o = "next" : n < r ? o = "prev" : o = "reset"), t.emit(`transition${i}`), e && n !== r) {
        if (o === "reset") {
            t.emit(`slideResetTransition${i}`);
            return
        }
        t.emit(`slideChangeTransition${i}`), o === "next" ? t.emit(`slideNextTransition${i}`) : t.emit(`slidePrevTransition${i}`)
    }
}

function at(t = !0, e) {
    const s = this,
        {
            params: i
        } = s;
    i.cssMode || (i.autoHeight && s.updateAutoHeight(), xe({
        swiper: s,
        runCallbacks: t,
        direction: e,
        step: "Start"
    }))
}

function lt(t = !0, e) {
    const s = this,
        {
            params: i
        } = s;
    s.animating = !1, !i.cssMode && (s.setTransition(0), xe({
        swiper: s,
        runCallbacks: t,
        direction: e,
        step: "End"
    }))
}
var ot = {
    setTransition: nt,
    transitionStart: at,
    transitionEnd: lt
};

function dt(t = 0, e = this.params.speed, s = !0, i, n) {
    typeof t == "string" && (t = parseInt(t, 10));
    const r = this;
    let o = t;
    o < 0 && (o = 0);
    const {
        params: a,
        snapGrid: l,
        slidesGrid: d,
        previousIndex: u,
        activeIndex: c,
        rtlTranslate: p,
        wrapperEl: f,
        enabled: w
    } = r;
    if (r.animating && a.preventInteractionOnTransition || !w && !i && !n) return !1;
    const m = Math.min(r.params.slidesPerGroupSkip, o);
    let T = m + Math.floor((o - m) / r.params.slidesPerGroup);
    T >= l.length && (T = l.length - 1);
    const S = -l[T];
    if (a.normalizeSlideIndex)
        for (let g = 0; g < d.length; g += 1) {
            const b = -Math.floor(S * 100),
                y = Math.floor(d[g] * 100),
                x = Math.floor(d[g + 1] * 100);
            typeof d[g + 1] != "undefined" ? b >= y && b < x - (x - y) / 2 ? o = g : b >= y && b < x && (o = g + 1) : b >= y && (o = g)
        }
    if (r.initialized && o !== c && (!r.allowSlideNext && S < r.translate && S < r.minTranslate() || !r.allowSlidePrev && S > r.translate && S > r.maxTranslate() && (c || 0) !== o)) return !1;
    o !== (u || 0) && s && r.emit("beforeSlideChangeStart"), r.updateProgress(S);
    let P;
    if (o > c ? P = "next" : o < c ? P = "prev" : P = "reset", p && -S === r.translate || !p && S === r.translate) return r.updateActiveIndex(o), a.autoHeight && r.updateAutoHeight(), r.updateSlidesClasses(), a.effect !== "slide" && r.setTranslate(S), P !== "reset" && (r.transitionStart(s, P), r.transitionEnd(s, P)), !1;
    if (a.cssMode) {
        const g = r.isHorizontal(),
            b = p ? S : -S;
        if (e === 0) {
            const y = r.virtual && r.params.virtual.enabled;
            y && (r.wrapperEl.style.scrollSnapType = "none", r._immediateVirtual = !0), y && !r._cssModeVirtualInitialSet && r.params.initialSlide > 0 ? (r._cssModeVirtualInitialSet = !0, requestAnimationFrame(() => {
                f[g ? "scrollLeft" : "scrollTop"] = b
            })) : f[g ? "scrollLeft" : "scrollTop"] = b, y && requestAnimationFrame(() => {
                r.wrapperEl.style.scrollSnapType = "", r._immediateVirtual = !1
            })
        } else {
            if (!r.support.smoothScroll) return be({
                swiper: r,
                targetPosition: b,
                side: g ? "left" : "top"
            }), !0;
            f.scrollTo({
                [g ? "left" : "top"]: b,
                behavior: "smooth"
            })
        }
        return !0
    }
    return r.setTransition(e), r.setTranslate(S), r.updateActiveIndex(o), r.updateSlidesClasses(), r.emit("beforeTransitionStart", e, i), r.transitionStart(s, P), e === 0 ? r.transitionEnd(s, P) : r.animating || (r.animating = !0, r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function(b) {
        !r || r.destroyed || b.target === this && (r.wrapperEl.removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.onSlideToWrapperTransitionEnd = null, delete r.onSlideToWrapperTransitionEnd, r.transitionEnd(s, P))
    }), r.wrapperEl.addEventListener("transitionend", r.onSlideToWrapperTransitionEnd)), !0
}

function ct(t = 0, e = this.params.speed, s = !0, i) {
    typeof t == "string" && (t = parseInt(t, 10));
    const n = this;
    let r = t;
    return n.params.loop && (n.virtual && n.params.virtual.enabled ? r = r + n.virtual.slidesBefore : r = j(n.slides.filter(o => o.getAttribute("data-swiper-slide-index") * 1 === r)[0])), n.slideTo(r, e, s, i)
}

function ft(t = this.params.speed, e = !0, s) {
    const i = this,
        {
            enabled: n,
            params: r,
            animating: o
        } = i;
    if (!n) return i;
    let a = r.slidesPerGroup;
    r.slidesPerView === "auto" && r.slidesPerGroup === 1 && r.slidesPerGroupAuto && (a = Math.max(i.slidesPerViewDynamic("current", !0), 1));
    const l = i.activeIndex < r.slidesPerGroupSkip ? 1 : a,
        d = i.virtual && r.virtual.enabled;
    if (r.loop) {
        if (o && !d && r.loopPreventsSliding) return !1;
        i.loopFix({
            direction: "next"
        }), i._clientLeft = i.wrapperEl.clientLeft
    }
    return r.rewind && i.isEnd ? i.slideTo(0, t, e, s) : i.slideTo(i.activeIndex + l, t, e, s)
}

function ut(t = this.params.speed, e = !0, s) {
    const i = this,
        {
            params: n,
            snapGrid: r,
            slidesGrid: o,
            rtlTranslate: a,
            enabled: l,
            animating: d
        } = i;
    if (!l) return i;
    const u = i.virtual && n.virtual.enabled;
    if (n.loop) {
        if (d && !u && n.loopPreventsSliding) return !1;
        i.loopFix({
            direction: "prev"
        }), i._clientLeft = i.wrapperEl.clientLeft
    }
    const c = a ? i.translate : -i.translate;

    function p(S) {
        return S < 0 ? -Math.floor(Math.abs(S)) : Math.floor(S)
    }
    const f = p(c),
        w = r.map(S => p(S));
    let m = r[w.indexOf(f) - 1];
    if (typeof m == "undefined" && n.cssMode) {
        let S;
        r.forEach((P, g) => {
            f >= P && (S = g)
        }), typeof S != "undefined" && (m = r[S > 0 ? S - 1 : S])
    }
    let T = 0;
    if (typeof m != "undefined" && (T = o.indexOf(m), T < 0 && (T = i.activeIndex - 1), n.slidesPerView === "auto" && n.slidesPerGroup === 1 && n.slidesPerGroupAuto && (T = T - i.slidesPerViewDynamic("previous", !0) + 1, T = Math.max(T, 0))), n.rewind && i.isBeginning) {
        const S = i.params.virtual && i.params.virtual.enabled && i.virtual ? i.virtual.slides.length - 1 : i.slides.length - 1;
        return i.slideTo(S, t, e, s)
    }
    return i.slideTo(T, t, e, s)
}

function pt(t = this.params.speed, e = !0, s) {
    const i = this;
    return i.slideTo(i.activeIndex, t, e, s)
}

function ht(t = this.params.speed, e = !0, s, i = .5) {
    const n = this;
    let r = n.activeIndex;
    const o = Math.min(n.params.slidesPerGroupSkip, r),
        a = o + Math.floor((r - o) / n.params.slidesPerGroup),
        l = n.rtlTranslate ? n.translate : -n.translate;
    if (l >= n.snapGrid[a]) {
        const d = n.snapGrid[a],
            u = n.snapGrid[a + 1];
        l - d > (u - d) * i && (r += n.params.slidesPerGroup)
    } else {
        const d = n.snapGrid[a - 1],
            u = n.snapGrid[a];
        l - d <= (u - d) * i && (r -= n.params.slidesPerGroup)
    }
    return r = Math.max(r, 0), r = Math.min(r, n.slidesGrid.length - 1), n.slideTo(r, t, e, s)
}

function mt() {
    const t = this,
        {
            params: e,
            slidesEl: s
        } = t,
        i = e.slidesPerView === "auto" ? t.slidesPerViewDynamic() : e.slidesPerView;
    let n = t.clickedIndex,
        r;
    const o = t.isElement ? "swiper-slide" : `.${e.slideClass}`;
    if (e.loop) {
        if (t.animating) return;
        r = parseInt(t.clickedSlide.getAttribute("data-swiper-slide-index"), 10), e.centeredSlides ? n < t.loopedSlides - i / 2 || n > t.slides.length - t.loopedSlides + i / 2 ? (t.loopFix(), n = j(R(s, `${o}[data-swiper-slide-index="${r}"]`)[0]), de(() => {
            t.slideTo(n)
        })) : t.slideTo(n) : n > t.slides.length - i ? (t.loopFix(), n = j(R(s, `${o}[data-swiper-slide-index="${r}"]`)[0]), de(() => {
            t.slideTo(n)
        })) : t.slideTo(n)
    } else t.slideTo(n)
}
var gt = {
    slideTo: dt,
    slideToLoop: ct,
    slideNext: ft,
    slidePrev: ut,
    slideReset: pt,
    slideToClosest: ht,
    slideToClickedSlide: mt
};

function vt(t) {
    const e = this,
        {
            params: s,
            slidesEl: i
        } = e;
    if (!s.loop || e.virtual && e.params.virtual.enabled) return;
    R(i, `.${s.slideClass}, swiper-slide`).forEach((r, o) => {
        r.setAttribute("data-swiper-slide-index", o)
    }), e.loopFix({
        slideRealIndex: t,
        direction: s.centeredSlides ? void 0 : "next"
    })
}

function wt({
    slideRealIndex: t,
    slideTo: e = !0,
    direction: s,
    setTranslate: i,
    activeSlideIndex: n,
    byController: r,
    byMousewheel: o
} = {}) {
    const a = this;
    if (!a.params.loop) return;
    a.emit("beforeLoopFix");
    const {
        slides: l,
        allowSlidePrev: d,
        allowSlideNext: u,
        slidesEl: c,
        params: p
    } = a;
    if (a.allowSlidePrev = !0, a.allowSlideNext = !0, a.virtual && p.virtual.enabled) {
        e && (!p.centeredSlides && a.snapIndex === 0 ? a.slideTo(a.virtual.slides.length, 0, !1, !0) : p.centeredSlides && a.snapIndex < p.slidesPerView ? a.slideTo(a.virtual.slides.length + a.snapIndex, 0, !1, !0) : a.snapIndex === a.snapGrid.length - 1 && a.slideTo(a.virtual.slidesBefore, 0, !1, !0)), a.allowSlidePrev = d, a.allowSlideNext = u, a.emit("loopFix");
        return
    }
    const f = p.slidesPerView === "auto" ? a.slidesPerViewDynamic() : Math.ceil(parseFloat(p.slidesPerView, 10));
    let w = p.loopedSlides || f;
    w % p.slidesPerGroup !== 0 && (w += p.slidesPerGroup - w % p.slidesPerGroup), a.loopedSlides = w;
    const m = [],
        T = [];
    let S = a.activeIndex;
    typeof n == "undefined" ? n = j(a.slides.filter(x => x.classList.contains("swiper-slide-active"))[0]) : S = n;
    const P = s === "next" || !s,
        g = s === "prev" || !s;
    let b = 0,
        y = 0;
    if (n < w) {
        b = w - n;
        for (let x = 0; x < w - n; x += 1) {
            const I = x - Math.floor(x / l.length) * l.length;
            m.push(l.length - I - 1)
        }
    } else if (n > a.slides.length - w * 2) {
        y = n - (a.slides.length - w * 2);
        for (let x = 0; x < y; x += 1) {
            const I = x - Math.floor(x / l.length) * l.length;
            T.push(I)
        }
    }
    if (g && m.forEach(x => {
            c.prepend(a.slides[x])
        }), P && T.forEach(x => {
            c.append(a.slides[x])
        }), a.recalcSlides(), p.watchSlidesProgress && a.updateSlidesOffset(), e) {
        if (m.length > 0 && g)
            if (typeof t == "undefined") {
                const x = a.slidesGrid[S],
                    O = a.slidesGrid[S + b] - x;
                o ? a.setTranslate(a.translate - O) : (a.slideTo(S + b, 0, !1, !0), i && (a.touches[a.isHorizontal() ? "startX" : "startY"] += O))
            } else i && a.slideToLoop(t, 0, !1, !0);
        else if (T.length > 0 && P)
            if (typeof t == "undefined") {
                const x = a.slidesGrid[S],
                    O = a.slidesGrid[S - y] - x;
                o ? a.setTranslate(a.translate - O) : (a.slideTo(S - y, 0, !1, !0), i && (a.touches[a.isHorizontal() ? "startX" : "startY"] += O))
            } else a.slideToLoop(t, 0, !1, !0)
    }
    if (a.allowSlidePrev = d, a.allowSlideNext = u, a.controller && a.controller.control && !r) {
        const x = {
            slideRealIndex: t,
            slideTo: !1,
            direction: s,
            setTranslate: i,
            activeSlideIndex: n,
            byController: !0
        };
        Array.isArray(a.controller.control) ? a.controller.control.forEach(I => {
            I.params.loop && I.loopFix(x)
        }) : a.controller.control instanceof a.constructor && a.controller.control.params.loop && a.controller.control.loopFix(x)
    }
    a.emit("loopFix")
}

function St() {
    const t = this,
        {
            slides: e,
            params: s,
            slidesEl: i
        } = t;
    if (!s.loop || t.virtual && t.params.virtual.enabled) return;
    t.recalcSlides();
    const n = [];
    e.forEach(r => {
        const o = typeof r.swiperSlideIndex == "undefined" ? r.getAttribute("data-swiper-slide-index") * 1 : r.swiperSlideIndex;
        n[o] = r
    }), e.forEach(r => {
        r.removeAttribute("data-swiper-slide-index")
    }), n.forEach(r => {
        i.append(r)
    }), t.recalcSlides(), t.slideTo(t.realIndex, 0)
}
var Tt = {
    loopCreate: vt,
    loopFix: wt,
    loopDestroy: St
};

function bt(t) {
    const e = this;
    if (!e.params.simulateTouch || e.params.watchOverflow && e.isLocked || e.params.cssMode) return;
    const s = e.params.touchEventsTarget === "container" ? e.el : e.wrapperEl;
    s.style.cursor = "move", s.style.cursor = t ? "grabbing" : "grab"
}

function yt() {
    const t = this;
    t.params.watchOverflow && t.isLocked || t.params.cssMode || (t[t.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "")
}
var xt = {
    setGrabCursor: bt,
    unsetGrabCursor: yt
};

function Et(t, e = this) {
    function s(i) {
        if (!i || i === W() || i === B()) return null;
        i.assignedSlot && (i = i.assignedSlot);
        const n = i.closest(t);
        return !n && !i.getRootNode ? null : n || s(i.getRootNode().host)
    }
    return s(e)
}

function Mt(t) {
    const e = this,
        s = W(),
        i = B(),
        n = e.touchEventsData;
    n.evCache.push(t);
    const {
        params: r,
        touches: o,
        enabled: a
    } = e;
    if (!a || !r.simulateTouch && t.pointerType === "mouse" || e.animating && r.preventInteractionOnTransition) return;
    !e.animating && r.cssMode && r.loop && e.loopFix();
    let l = t;
    l.originalEvent && (l = l.originalEvent);
    let d = l.target;
    if (r.touchEventsTarget === "wrapper" && !e.wrapperEl.contains(d) || "which" in l && l.which === 3 || "button" in l && l.button > 0 || n.isTouched && n.isMoved) return;
    const u = !!r.noSwipingClass && r.noSwipingClass !== "",
        c = t.composedPath ? t.composedPath() : t.path;
    u && l.target && l.target.shadowRoot && c && (d = c[0]);
    const p = r.noSwipingSelector ? r.noSwipingSelector : `.${r.noSwipingClass}`,
        f = !!(l.target && l.target.shadowRoot);
    if (r.noSwiping && (f ? Et(p, d) : d.closest(p))) {
        e.allowClick = !0;
        return
    }
    if (r.swipeHandler && !d.closest(r.swipeHandler)) return;
    o.currentX = l.pageX, o.currentY = l.pageY;
    const w = o.currentX,
        m = o.currentY,
        T = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection,
        S = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold;
    if (T && (w <= S || w >= i.innerWidth - S))
        if (T === "prevent") t.preventDefault();
        else return;
    Object.assign(n, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0
    }), o.startX = w, o.startY = m, n.touchStartTime = U(), e.allowClick = !0, e.updateSize(), e.swipeDirection = void 0, r.threshold > 0 && (n.allowThresholdMove = !1);
    let P = !0;
    d.matches(n.focusableElements) && (P = !1, d.nodeName === "SELECT" && (n.isTouched = !1)), s.activeElement && s.activeElement.matches(n.focusableElements) && s.activeElement !== d && s.activeElement.blur();
    const g = P && e.allowTouchMove && r.touchStartPreventDefault;
    (r.touchStartForcePreventDefault || g) && !d.isContentEditable && l.preventDefault(), e.params.freeMode && e.params.freeMode.enabled && e.freeMode && e.animating && !r.cssMode && e.freeMode.onTouchStart(), e.emit("touchStart", l)
}

function Pt(t) {
    const e = W(),
        s = this,
        i = s.touchEventsData,
        {
            params: n,
            touches: r,
            rtlTranslate: o,
            enabled: a
        } = s;
    if (!a || !n.simulateTouch && t.pointerType === "mouse") return;
    let l = t;
    if (l.originalEvent && (l = l.originalEvent), !i.isTouched) {
        i.startMoving && i.isScrolling && s.emit("touchMoveOpposite", l);
        return
    }
    const d = i.evCache.findIndex(x => x.pointerId === l.pointerId);
    d >= 0 && (i.evCache[d] = l);
    const u = i.evCache.length > 1 ? i.evCache[0] : l,
        c = u.pageX,
        p = u.pageY;
    if (l.preventedByNestedSwiper) {
        r.startX = c, r.startY = p;
        return
    }
    if (!s.allowTouchMove) {
        l.target.matches(i.focusableElements) || (s.allowClick = !1), i.isTouched && (Object.assign(r, {
            startX: c,
            startY: p,
            prevX: s.touches.currentX,
            prevY: s.touches.currentY,
            currentX: c,
            currentY: p
        }), i.touchStartTime = U());
        return
    }
    if (n.touchReleaseOnEdges && !n.loop) {
        if (s.isVertical()) {
            if (p < r.startY && s.translate <= s.maxTranslate() || p > r.startY && s.translate >= s.minTranslate()) {
                i.isTouched = !1, i.isMoved = !1;
                return
            }
        } else if (c < r.startX && s.translate <= s.maxTranslate() || c > r.startX && s.translate >= s.minTranslate()) return
    }
    if (e.activeElement && l.target === e.activeElement && l.target.matches(i.focusableElements)) {
        i.isMoved = !0, s.allowClick = !1;
        return
    }
    if (i.allowTouchCallbacks && s.emit("touchMove", l), l.targetTouches && l.targetTouches.length > 1) return;
    r.currentX = c, r.currentY = p;
    const f = r.currentX - r.startX,
        w = r.currentY - r.startY;
    if (s.params.threshold && Math.sqrt(f ** 2 + w ** 2) < s.params.threshold) return;
    if (typeof i.isScrolling == "undefined") {
        let x;
        s.isHorizontal() && r.currentY === r.startY || s.isVertical() && r.currentX === r.startX ? i.isScrolling = !1 : f * f + w * w >= 25 && (x = Math.atan2(Math.abs(w), Math.abs(f)) * 180 / Math.PI, i.isScrolling = s.isHorizontal() ? x > n.touchAngle : 90 - x > n.touchAngle)
    }
    if (i.isScrolling && s.emit("touchMoveOpposite", l), typeof i.startMoving == "undefined" && (r.currentX !== r.startX || r.currentY !== r.startY) && (i.startMoving = !0), i.isScrolling || s.zoom && s.params.zoom && s.params.zoom.enabled && i.evCache.length > 1) {
        i.isTouched = !1;
        return
    }
    if (!i.startMoving) return;
    s.allowClick = !1, !n.cssMode && l.cancelable && l.preventDefault(), n.touchMoveStopPropagation && !n.nested && l.stopPropagation();
    let m = s.isHorizontal() ? f : w,
        T = s.isHorizontal() ? r.currentX - r.previousX : r.currentY - r.previousY;
    n.oneWayMovement && (m = Math.abs(m) * (o ? 1 : -1), T = Math.abs(T) * (o ? 1 : -1)), r.diff = m, m *= n.touchRatio, o && (m = -m, T = -T);
    const S = s.touchesDirection;
    s.swipeDirection = m > 0 ? "prev" : "next", s.touchesDirection = T > 0 ? "prev" : "next";
    const P = s.params.loop && !n.cssMode;
    if (!i.isMoved) {
        if (P && s.loopFix({
                direction: s.swipeDirection
            }), i.startTranslate = s.getTranslate(), s.setTransition(0), s.animating) {
            const x = new window.CustomEvent("transitionend", {
                bubbles: !0,
                cancelable: !0
            });
            s.wrapperEl.dispatchEvent(x)
        }
        i.allowMomentumBounce = !1, n.grabCursor && (s.allowSlideNext === !0 || s.allowSlidePrev === !0) && s.setGrabCursor(!0), s.emit("sliderFirstMove", l)
    }
    let g;
    i.isMoved && S !== s.touchesDirection && P && Math.abs(m) >= 1 && (s.loopFix({
        direction: s.swipeDirection,
        setTranslate: !0
    }), g = !0), s.emit("sliderMove", l), i.isMoved = !0, i.currentTranslate = m + i.startTranslate;
    let b = !0,
        y = n.resistanceRatio;
    if (n.touchReleaseOnEdges && (y = 0), m > 0 ? (P && !g && i.currentTranslate > (n.centeredSlides ? s.minTranslate() - s.size / 2 : s.minTranslate()) && s.loopFix({
            direction: "prev",
            setTranslate: !0,
            activeSlideIndex: 0
        }), i.currentTranslate > s.minTranslate() && (b = !1, n.resistance && (i.currentTranslate = s.minTranslate() - 1 + (-s.minTranslate() + i.startTranslate + m) ** y))) : m < 0 && (P && !g && i.currentTranslate < (n.centeredSlides ? s.maxTranslate() + s.size / 2 : s.maxTranslate()) && s.loopFix({
            direction: "next",
            setTranslate: !0,
            activeSlideIndex: s.slides.length - (n.slidesPerView === "auto" ? s.slidesPerViewDynamic() : Math.ceil(parseFloat(n.slidesPerView, 10)))
        }), i.currentTranslate < s.maxTranslate() && (b = !1, n.resistance && (i.currentTranslate = s.maxTranslate() + 1 - (s.maxTranslate() - i.startTranslate - m) ** y))), b && (l.preventedByNestedSwiper = !0), !s.allowSlideNext && s.swipeDirection === "next" && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate), !s.allowSlidePrev && s.swipeDirection === "prev" && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate), !s.allowSlidePrev && !s.allowSlideNext && (i.currentTranslate = i.startTranslate), n.threshold > 0)
        if (Math.abs(m) > n.threshold || i.allowThresholdMove) {
            if (!i.allowThresholdMove) {
                i.allowThresholdMove = !0, r.startX = r.currentX, r.startY = r.currentY, i.currentTranslate = i.startTranslate, r.diff = s.isHorizontal() ? r.currentX - r.startX : r.currentY - r.startY;
                return
            }
        } else {
            i.currentTranslate = i.startTranslate;
            return
        }! n.followFinger || n.cssMode || ((n.freeMode && n.freeMode.enabled && s.freeMode || n.watchSlidesProgress) && (s.updateActiveIndex(), s.updateSlidesClasses()), s.params.freeMode && n.freeMode.enabled && s.freeMode && s.freeMode.onTouchMove(), s.updateProgress(i.currentTranslate), s.setTranslate(i.currentTranslate))
}

function Ct(t) {
    const e = this,
        s = e.touchEventsData,
        i = s.evCache.findIndex(g => g.pointerId === t.pointerId);
    if (i >= 0 && s.evCache.splice(i, 1), ["pointercancel", "pointerout", "pointerleave"].includes(t.type)) return;
    const {
        params: n,
        touches: r,
        rtlTranslate: o,
        slidesGrid: a,
        enabled: l
    } = e;
    if (!l || !n.simulateTouch && t.pointerType === "mouse") return;
    let d = t;
    if (d.originalEvent && (d = d.originalEvent), s.allowTouchCallbacks && e.emit("touchEnd", d), s.allowTouchCallbacks = !1, !s.isTouched) {
        s.isMoved && n.grabCursor && e.setGrabCursor(!1), s.isMoved = !1, s.startMoving = !1;
        return
    }
    n.grabCursor && s.isMoved && s.isTouched && (e.allowSlideNext === !0 || e.allowSlidePrev === !0) && e.setGrabCursor(!1);
    const u = U(),
        c = u - s.touchStartTime;
    if (e.allowClick) {
        const g = d.path || d.composedPath && d.composedPath();
        e.updateClickedSlide(g && g[0] || d.target), e.emit("tap click", d), c < 300 && u - s.lastClickTime < 300 && e.emit("doubleTap doubleClick", d)
    }
    if (s.lastClickTime = U(), de(() => {
            e.destroyed || (e.allowClick = !0)
        }), !s.isTouched || !s.isMoved || !e.swipeDirection || r.diff === 0 || s.currentTranslate === s.startTranslate) {
        s.isTouched = !1, s.isMoved = !1, s.startMoving = !1;
        return
    }
    s.isTouched = !1, s.isMoved = !1, s.startMoving = !1;
    let p;
    if (n.followFinger ? p = o ? e.translate : -e.translate : p = -s.currentTranslate, n.cssMode) return;
    if (e.params.freeMode && n.freeMode.enabled) {
        e.freeMode.onTouchEnd({
            currentPos: p
        });
        return
    }
    let f = 0,
        w = e.slidesSizesGrid[0];
    for (let g = 0; g < a.length; g += g < n.slidesPerGroupSkip ? 1 : n.slidesPerGroup) {
        const b = g < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
        typeof a[g + b] != "undefined" ? p >= a[g] && p < a[g + b] && (f = g, w = a[g + b] - a[g]) : p >= a[g] && (f = g, w = a[a.length - 1] - a[a.length - 2])
    }
    let m = null,
        T = null;
    n.rewind && (e.isBeginning ? T = e.params.virtual && e.params.virtual.enabled && e.virtual ? e.virtual.slides.length - 1 : e.slides.length - 1 : e.isEnd && (m = 0));
    const S = (p - a[f]) / w,
        P = f < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
    if (c > n.longSwipesMs) {
        if (!n.longSwipes) {
            e.slideTo(e.activeIndex);
            return
        }
        e.swipeDirection === "next" && (S >= n.longSwipesRatio ? e.slideTo(n.rewind && e.isEnd ? m : f + P) : e.slideTo(f)), e.swipeDirection === "prev" && (S > 1 - n.longSwipesRatio ? e.slideTo(f + P) : T !== null && S < 0 && Math.abs(S) > n.longSwipesRatio ? e.slideTo(T) : e.slideTo(f))
    } else {
        if (!n.shortSwipes) {
            e.slideTo(e.activeIndex);
            return
        }
        e.navigation && (d.target === e.navigation.nextEl || d.target === e.navigation.prevEl) ? d.target === e.navigation.nextEl ? e.slideTo(f + P) : e.slideTo(f) : (e.swipeDirection === "next" && e.slideTo(m !== null ? m : f + P), e.swipeDirection === "prev" && e.slideTo(T !== null ? T : f))
    }
}
let me;

function ge() {
    const t = this,
        {
            params: e,
            el: s
        } = t;
    if (s && s.offsetWidth === 0) return;
    e.breakpoints && t.setBreakpoint();
    const {
        allowSlideNext: i,
        allowSlidePrev: n,
        snapGrid: r
    } = t, o = t.virtual && t.params.virtual.enabled;
    t.allowSlideNext = !0, t.allowSlidePrev = !0, t.updateSize(), t.updateSlides(), t.updateSlidesClasses();
    const a = o && e.loop;
    (e.slidesPerView === "auto" || e.slidesPerView > 1) && t.isEnd && !t.isBeginning && !t.params.centeredSlides && !a ? t.slideTo(t.slides.length - 1, 0, !1, !0) : t.params.loop && !o ? t.slideToLoop(t.realIndex, 0, !1, !0) : t.slideTo(t.activeIndex, 0, !1, !0), t.autoplay && t.autoplay.running && t.autoplay.paused && (clearTimeout(me), me = setTimeout(() => {
        t.autoplay.resume()
    }, 500)), t.allowSlidePrev = n, t.allowSlideNext = i, t.params.watchOverflow && r !== t.snapGrid && t.checkOverflow()
}

function Lt(t) {
    const e = this;
    !e.enabled || e.allowClick || (e.params.preventClicks && t.preventDefault(), e.params.preventClicksPropagation && e.animating && (t.stopPropagation(), t.stopImmediatePropagation()))
}

function At() {
    const t = this,
        {
            wrapperEl: e,
            rtlTranslate: s,
            enabled: i
        } = t;
    if (!i) return;
    t.previousTranslate = t.translate, t.isHorizontal() ? t.translate = -e.scrollLeft : t.translate = -e.scrollTop, t.translate === 0 && (t.translate = 0), t.updateActiveIndex(), t.updateSlidesClasses();
    let n;
    const r = t.maxTranslate() - t.minTranslate();
    r === 0 ? n = 0 : n = (t.translate - t.minTranslate()) / r, n !== t.progress && t.updateProgress(s ? -t.translate : t.translate), t.emit("setTranslate", t.translate, !1)
}
const ee = (t, e) => {
    if (!t || t.destroyed || !t.params) return;
    const s = () => t.isElement ? "swiper-slide" : `.${t.params.slideClass}`,
        i = e.closest(s());
    if (i) {
        const n = i.querySelector(`.${t.params.lazyPreloaderClass}`);
        n && n.remove()
    }
};

function It(t) {
    const e = this;
    ee(e, t.target), e.update()
}
let ve = !1;

function zt() {}
const Ee = (t, e) => {
    const s = W(),
        {
            params: i,
            el: n,
            wrapperEl: r,
            device: o
        } = t,
        a = !!i.nested,
        l = e === "on" ? "addEventListener" : "removeEventListener",
        d = e;
    n[l]("pointerdown", t.onTouchStart, {
        passive: !1
    }), s[l]("pointermove", t.onTouchMove, {
        passive: !1,
        capture: a
    }), s[l]("pointerup", t.onTouchEnd, {
        passive: !0
    }), s[l]("pointercancel", t.onTouchEnd, {
        passive: !0
    }), s[l]("pointerout", t.onTouchEnd, {
        passive: !0
    }), s[l]("pointerleave", t.onTouchEnd, {
        passive: !0
    }), (i.preventClicks || i.preventClicksPropagation) && n[l]("click", t.onClick, !0), i.cssMode && r[l]("scroll", t.onScroll), i.updateOnWindowResize ? t[d](o.ios || o.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", ge, !0) : t[d]("observerUpdate", ge, !0), n[l]("load", t.onLoad, {
        capture: !0
    })
};

function Ot() {
    const t = this,
        e = W(),
        {
            params: s
        } = t;
    t.onTouchStart = Mt.bind(t), t.onTouchMove = Pt.bind(t), t.onTouchEnd = Ct.bind(t), s.cssMode && (t.onScroll = At.bind(t)), t.onClick = Lt.bind(t), t.onLoad = It.bind(t), ve || (e.addEventListener("touchstart", zt), ve = !0), Ee(t, "on")
}

function kt() {
    Ee(this, "off")
}
var Gt = {
    attachEvents: Ot,
    detachEvents: kt
};
const we = (t, e) => t.grid && e.grid && e.grid.rows > 1;

function $t() {
    const t = this,
        {
            realIndex: e,
            initialized: s,
            params: i,
            el: n
        } = t,
        r = i.breakpoints;
    if (!r || r && Object.keys(r).length === 0) return;
    const o = t.getBreakpoint(r, t.params.breakpointsBase, t.el);
    if (!o || t.currentBreakpoint === o) return;
    const l = (o in r ? r[o] : void 0) || t.originalParams,
        d = we(t, i),
        u = we(t, l),
        c = i.enabled;
    d && !u ? (n.classList.remove(`${i.containerModifierClass}grid`, `${i.containerModifierClass}grid-column`), t.emitContainerClasses()) : !d && u && (n.classList.add(`${i.containerModifierClass}grid`), (l.grid.fill && l.grid.fill === "column" || !l.grid.fill && i.grid.fill === "column") && n.classList.add(`${i.containerModifierClass}grid-column`), t.emitContainerClasses()), ["navigation", "pagination", "scrollbar"].forEach(m => {
        const T = i[m] && i[m].enabled,
            S = l[m] && l[m].enabled;
        T && !S && t[m].disable(), !T && S && t[m].enable()
    });
    const p = l.direction && l.direction !== i.direction,
        f = i.loop && (l.slidesPerView !== i.slidesPerView || p);
    p && s && t.changeDirection(), N(t.params, l);
    const w = t.params.enabled;
    Object.assign(t, {
        allowTouchMove: t.params.allowTouchMove,
        allowSlideNext: t.params.allowSlideNext,
        allowSlidePrev: t.params.allowSlidePrev
    }), c && !w ? t.disable() : !c && w && t.enable(), t.currentBreakpoint = o, t.emit("_beforeBreakpoint", l), f && s && (t.loopDestroy(), t.loopCreate(e), t.updateSlides()), t.emit("breakpoint", l)
}

function Dt(t, e = "window", s) {
    if (!t || e === "container" && !s) return;
    let i = !1;
    const n = B(),
        r = e === "window" ? n.innerHeight : s.clientHeight,
        o = Object.keys(t).map(a => {
            if (typeof a == "string" && a.indexOf("@") === 0) {
                const l = parseFloat(a.substr(1));
                return {
                    value: r * l,
                    point: a
                }
            }
            return {
                value: a,
                point: a
            }
        });
    o.sort((a, l) => parseInt(a.value, 10) - parseInt(l.value, 10));
    for (let a = 0; a < o.length; a += 1) {
        const {
            point: l,
            value: d
        } = o[a];
        e === "window" ? n.matchMedia(`(min-width: ${d}px)`).matches && (i = l) : d <= s.clientWidth && (i = l)
    }
    return i || "max"
}
var Vt = {
    setBreakpoint: $t,
    getBreakpoint: Dt
};

function Nt(t, e) {
    const s = [];
    return t.forEach(i => {
        typeof i == "object" ? Object.keys(i).forEach(n => {
            i[n] && s.push(e + n)
        }) : typeof i == "string" && s.push(e + i)
    }), s
}

function Bt() {
    const t = this,
        {
            classNames: e,
            params: s,
            rtl: i,
            el: n,
            device: r
        } = t,
        o = Nt(["initialized", s.direction, {
            "free-mode": t.params.freeMode && s.freeMode.enabled
        }, {
            autoheight: s.autoHeight
        }, {
            rtl: i
        }, {
            grid: s.grid && s.grid.rows > 1
        }, {
            "grid-column": s.grid && s.grid.rows > 1 && s.grid.fill === "column"
        }, {
            android: r.android
        }, {
            ios: r.ios
        }, {
            "css-mode": s.cssMode
        }, {
            centered: s.cssMode && s.centeredSlides
        }, {
            "watch-progress": s.watchSlidesProgress
        }], s.containerModifierClass);
    e.push(...o), n.classList.add(...e), t.emitContainerClasses()
}

function Ft() {
    const t = this,
        {
            el: e,
            classNames: s
        } = t;
    e.classList.remove(...s), t.emitContainerClasses()
}
var Ht = {
    addClasses: Bt,
    removeClasses: Ft
};

function qt() {
    const t = this,
        {
            isLocked: e,
            params: s
        } = t,
        {
            slidesOffsetBefore: i
        } = s;
    if (i) {
        const n = t.slides.length - 1,
            r = t.slidesGrid[n] + t.slidesSizesGrid[n] + i * 2;
        t.isLocked = t.size > r
    } else t.isLocked = t.snapGrid.length === 1;
    s.allowSlideNext === !0 && (t.allowSlideNext = !t.isLocked), s.allowSlidePrev === !0 && (t.allowSlidePrev = !t.isLocked), e && e !== t.isLocked && (t.isEnd = !1), e !== t.isLocked && t.emit(t.isLocked ? "lock" : "unlock")
}
var _t = {
        checkOverflow: qt
    },
    Se = {
        init: !0,
        direction: "horizontal",
        oneWayMovement: !1,
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: !1,
        updateOnWindowResize: !0,
        resizeObserver: !0,
        nested: !1,
        createElements: !1,
        enabled: !0,
        focusableElements: "input, select, option, textarea, button, video, label",
        width: null,
        height: null,
        preventInteractionOnTransition: !1,
        userAgent: null,
        url: null,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: !1,
        centeredSlides: !1,
        centeredSlidesBounds: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        watchOverflow: !0,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 5,
        touchMoveStopPropagation: !1,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: .85,
        watchSlidesProgress: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        loop: !1,
        loopedSlides: null,
        loopPreventsSliding: !0,
        rewind: !1,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        maxBackfaceHiddenSlides: 10,
        containerModifierClass: "swiper-",
        slideClass: "swiper-slide",
        slideActiveClass: "swiper-slide-active",
        slideVisibleClass: "swiper-slide-visible",
        slideNextClass: "swiper-slide-next",
        slidePrevClass: "swiper-slide-prev",
        wrapperClass: "swiper-wrapper",
        lazyPreloaderClass: "swiper-lazy-preloader",
        runCallbacksOnInit: !0,
        _emitClasses: !1
    };

function Rt(t, e) {
    return function(i = {}) {
        const n = Object.keys(i)[0],
            r = i[n];
        if (typeof r != "object" || r === null) {
            N(e, i);
            return
        }
        if (["navigation", "pagination", "scrollbar"].indexOf(n) >= 0 && t[n] === !0 && (t[n] = {
                auto: !0
            }), !(n in t && "enabled" in r)) {
            N(e, i);
            return
        }
        t[n] === !0 && (t[n] = {
            enabled: !0
        }), typeof t[n] == "object" && !("enabled" in t[n]) && (t[n].enabled = !0), t[n] || (t[n] = {
            enabled: !1
        }), N(e, i)
    }
}
const le = {
        eventsEmitter: He,
        update: Je,
        translate: rt,
        transition: ot,
        slide: gt,
        loop: Tt,
        grabCursor: xt,
        events: Gt,
        breakpoints: Vt,
        checkOverflow: _t,
        classes: Ht
    },
    oe = {};
class F {
    constructor(...e) {
        let s, i;
        e.length === 1 && e[0].constructor && Object.prototype.toString.call(e[0]).slice(8, -1) === "Object" ? i = e[0] : [s, i] = e, i || (i = {}), i = N({}, i), s && !i.el && (i.el = s);
        const n = W();
        if (i.el && typeof i.el == "string" && n.querySelectorAll(i.el).length > 1) {
            const l = [];
            return n.querySelectorAll(i.el).forEach(d => {
                const u = N({}, i, {
                    el: d
                });
                l.push(new F(u))
            }), l
        }
        const r = this;
        r.__swiper__ = !0, r.support = ye(), r.device = De({
            userAgent: i.userAgent
        }), r.browser = Ne(), r.eventsListeners = {}, r.eventsAnyListeners = [], r.modules = [...r.__modules__], i.modules && Array.isArray(i.modules) && r.modules.push(...i.modules);
        const o = {};
        r.modules.forEach(l => {
            l({
                params: i,
                swiper: r,
                extendParams: Rt(i, o),
                on: r.on.bind(r),
                once: r.once.bind(r),
                off: r.off.bind(r),
                emit: r.emit.bind(r)
            })
        });
        const a = N({}, Se, o);
        return r.params = N({}, a, oe, i), r.originalParams = N({}, r.params), r.passedParams = N({}, i), r.params && r.params.on && Object.keys(r.params.on).forEach(l => {
            r.on(l, r.params.on[l])
        }), r.params && r.params.onAny && r.onAny(r.params.onAny), Object.assign(r, {
            enabled: r.params.enabled,
            el: s,
            classNames: [],
            slides: [],
            slidesGrid: [],
            snapGrid: [],
            slidesSizesGrid: [],
            isHorizontal() {
                return r.params.direction === "horizontal"
            },
            isVertical() {
                return r.params.direction === "vertical"
            },
            activeIndex: 0,
            realIndex: 0,
            isBeginning: !0,
            isEnd: !1,
            translate: 0,
            previousTranslate: 0,
            progress: 0,
            velocity: 0,
            animating: !1,
            allowSlideNext: r.params.allowSlideNext,
            allowSlidePrev: r.params.allowSlidePrev,
            touchEventsData: {
                isTouched: void 0,
                isMoved: void 0,
                allowTouchCallbacks: void 0,
                touchStartTime: void 0,
                isScrolling: void 0,
                currentTranslate: void 0,
                startTranslate: void 0,
                allowThresholdMove: void 0,
                focusableElements: r.params.focusableElements,
                lastClickTime: U(),
                clickTimeout: void 0,
                velocities: [],
                allowMomentumBounce: void 0,
                startMoving: void 0,
                evCache: []
            },
            allowClick: !0,
            allowTouchMove: r.params.allowTouchMove,
            touches: {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0
            },
            imagesToLoad: [],
            imagesLoaded: 0
        }), r.emit("_swiper"), r.params.init && r.init(), r
    }
    recalcSlides() {
        const e = this,
            {
                slidesEl: s,
                params: i
            } = e;
        e.slides = R(s, `.${i.slideClass}, swiper-slide`)
    }
    enable() {
        const e = this;
        e.enabled || (e.enabled = !0, e.params.grabCursor && e.setGrabCursor(), e.emit("enable"))
    }
    disable() {
        const e = this;
        !e.enabled || (e.enabled = !1, e.params.grabCursor && e.unsetGrabCursor(), e.emit("disable"))
    }
    setProgress(e, s) {
        const i = this;
        e = Math.min(Math.max(e, 0), 1);
        const n = i.minTranslate(),
            o = (i.maxTranslate() - n) * e + n;
        i.translateTo(o, typeof s == "undefined" ? 0 : s), i.updateActiveIndex(), i.updateSlidesClasses()
    }
    emitContainerClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el) return;
        const s = e.el.className.split(" ").filter(i => i.indexOf("swiper") === 0 || i.indexOf(e.params.containerModifierClass) === 0);
        e.emit("_containerClasses", s.join(" "))
    }
    getSlideClasses(e) {
        const s = this;
        return s.destroyed ? "" : e.className.split(" ").filter(i => i.indexOf("swiper-slide") === 0 || i.indexOf(s.params.slideClass) === 0).join(" ")
    }
    emitSlidesClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el) return;
        const s = [];
        e.slides.forEach(i => {
            const n = e.getSlideClasses(i);
            s.push({
                slideEl: i,
                classNames: n
            }), e.emit("_slideClass", i, n)
        }), e.emit("_slideClasses", s)
    }
    slidesPerViewDynamic(e = "current", s = !1) {
        const i = this,
            {
                params: n,
                slides: r,
                slidesGrid: o,
                slidesSizesGrid: a,
                size: l,
                activeIndex: d
            } = i;
        let u = 1;
        if (n.centeredSlides) {
            let c = r[d].swiperSlideSize,
                p;
            for (let f = d + 1; f < r.length; f += 1) r[f] && !p && (c += r[f].swiperSlideSize, u += 1, c > l && (p = !0));
            for (let f = d - 1; f >= 0; f -= 1) r[f] && !p && (c += r[f].swiperSlideSize, u += 1, c > l && (p = !0))
        } else if (e === "current")
            for (let c = d + 1; c < r.length; c += 1)(s ? o[c] + a[c] - o[d] < l : o[c] - o[d] < l) && (u += 1);
        else
            for (let c = d - 1; c >= 0; c -= 1) o[d] - o[c] < l && (u += 1);
        return u
    }
    update() {
        const e = this;
        if (!e || e.destroyed) return;
        const {
            snapGrid: s,
            params: i
        } = e;
        i.breakpoints && e.setBreakpoint(), [...e.el.querySelectorAll('[loading="lazy"]')].forEach(o => {
            o.complete && ee(e, o)
        }), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses();

        function n() {
            const o = e.rtlTranslate ? e.translate * -1 : e.translate,
                a = Math.min(Math.max(o, e.maxTranslate()), e.minTranslate());
            e.setTranslate(a), e.updateActiveIndex(), e.updateSlidesClasses()
        }
        let r;
        e.params.freeMode && e.params.freeMode.enabled ? (n(), e.params.autoHeight && e.updateAutoHeight()) : ((e.params.slidesPerView === "auto" || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? r = e.slideTo(e.slides.length - 1, 0, !1, !0) : r = e.slideTo(e.activeIndex, 0, !1, !0), r || n()), i.watchOverflow && s !== e.snapGrid && e.checkOverflow(), e.emit("update")
    }
    changeDirection(e, s = !0) {
        const i = this,
            n = i.params.direction;
        return e || (e = n === "horizontal" ? "vertical" : "horizontal"), e === n || e !== "horizontal" && e !== "vertical" || (i.el.classList.remove(`${i.params.containerModifierClass}${n}`), i.el.classList.add(`${i.params.containerModifierClass}${e}`), i.emitContainerClasses(), i.params.direction = e, i.slides.forEach(r => {
            e === "vertical" ? r.style.width = "" : r.style.height = ""
        }), i.emit("changeDirection"), s && i.update()), i
    }
    changeLanguageDirection(e) {
        const s = this;
        s.rtl && e === "rtl" || !s.rtl && e === "ltr" || (s.rtl = e === "rtl", s.rtlTranslate = s.params.direction === "horizontal" && s.rtl, s.rtl ? (s.el.classList.add(`${s.params.containerModifierClass}rtl`), s.el.dir = "rtl") : (s.el.classList.remove(`${s.params.containerModifierClass}rtl`), s.el.dir = "ltr"), s.update())
    }
    mount(e) {
        const s = this;
        if (s.mounted) return !0;
        let i = e || s.params.el;
        if (typeof i == "string" && (i = document.querySelector(i)), !i) return !1;
        i.swiper = s, i.shadowEl && (s.isElement = !0);
        const n = () => `.${(s.params.wrapperClass||"").trim().split(" ").join(".")}`;
        let o = (() => i && i.shadowRoot && i.shadowRoot.querySelector ? i.shadowRoot.querySelector(n()) : R(i, n())[0])();
        return !o && s.params.createElements && (o = Y("div", s.params.wrapperClass), i.append(o), R(i, `.${s.params.slideClass}`).forEach(a => {
            o.append(a)
        })), Object.assign(s, {
            el: i,
            wrapperEl: o,
            slidesEl: s.isElement ? i : o,
            mounted: !0,
            rtl: i.dir.toLowerCase() === "rtl" || _(i, "direction") === "rtl",
            rtlTranslate: s.params.direction === "horizontal" && (i.dir.toLowerCase() === "rtl" || _(i, "direction") === "rtl"),
            wrongRTL: _(o, "display") === "-webkit-box"
        }), !0
    }
    init(e) {
        const s = this;
        return s.initialized || s.mount(e) === !1 || (s.emit("beforeInit"), s.params.breakpoints && s.setBreakpoint(), s.addClasses(), s.updateSize(), s.updateSlides(), s.params.watchOverflow && s.checkOverflow(), s.params.grabCursor && s.enabled && s.setGrabCursor(), s.params.loop && s.virtual && s.params.virtual.enabled ? s.slideTo(s.params.initialSlide + s.virtual.slidesBefore, 0, s.params.runCallbacksOnInit, !1, !0) : s.slideTo(s.params.initialSlide, 0, s.params.runCallbacksOnInit, !1, !0), s.params.loop && s.loopCreate(), s.attachEvents(), [...s.el.querySelectorAll('[loading="lazy"]')].forEach(n => {
            n.complete ? ee(s, n) : n.addEventListener("load", r => {
                ee(s, r.target)
            })
        }), s.initialized = !0, s.emit("init"), s.emit("afterInit")), s
    }
    destroy(e = !0, s = !0) {
        const i = this,
            {
                params: n,
                el: r,
                wrapperEl: o,
                slides: a
            } = i;
        return typeof i.params == "undefined" || i.destroyed || (i.emit("beforeDestroy"), i.initialized = !1, i.detachEvents(), n.loop && i.loopDestroy(), s && (i.removeClasses(), r.removeAttribute("style"), o.removeAttribute("style"), a && a.length && a.forEach(l => {
            l.classList.remove(n.slideVisibleClass, n.slideActiveClass, n.slideNextClass, n.slidePrevClass), l.removeAttribute("style"), l.removeAttribute("data-swiper-slide-index")
        })), i.emit("destroy"), Object.keys(i.eventsListeners).forEach(l => {
            i.off(l)
        }), e !== !1 && (i.el.swiper = null, Ce(i)), i.destroyed = !0), null
    }
    static extendDefaults(e) {
        N(oe, e)
    }
    static get extendedDefaults() {
        return oe
    }
    static get defaults() {
        return Se
    }
    static installModule(e) {
        F.prototype.__modules__ || (F.prototype.__modules__ = []);
        const s = F.prototype.__modules__;
        typeof e == "function" && s.indexOf(e) < 0 && s.push(e)
    }
    static use(e) {
        return Array.isArray(e) ? (e.forEach(s => F.installModule(s)), F) : (F.installModule(e), F)
    }
}
Object.keys(le).forEach(t => {
    Object.keys(le[t]).forEach(e => {
        F.prototype[e] = le[t][e]
    })
});
F.use([Be, Fe]);

function Wt(t) {
    const {
        effect: e,
        swiper: s,
        on: i,
        setTranslate: n,
        setTransition: r,
        overwriteParams: o,
        perspective: a,
        recreateShadows: l,
        getEffectParams: d
    } = t;
    i("beforeInit", () => {
        if (s.params.effect !== e) return;
        s.classNames.push(`${s.params.containerModifierClass}${e}`), a && a() && s.classNames.push(`${s.params.containerModifierClass}3d`);
        const c = o ? o() : {};
        Object.assign(s.params, c), Object.assign(s.originalParams, c)
    }), i("setTranslate", () => {
        s.params.effect === e && n()
    }), i("setTransition", (c, p) => {
        s.params.effect === e && r(p)
    }), i("transitionEnd", () => {
        if (s.params.effect === e && l) {
            if (!d || !d().slideShadows) return;
            s.slides.forEach(c => {
                c.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(p => p.remove())
            }), l()
        }
    });
    let u;
    i("virtualUpdate", () => {
        s.params.effect === e && (s.slides.length || (u = !0), requestAnimationFrame(() => {
            u && s.slides && s.slides.length && (n(), u = !1)
        }))
    })
}

function jt({
    swiper: t,
    extendParams: e,
    on: s
}) {
    e({
        cubeEffect: {
            slideShadows: !0,
            shadow: !0,
            shadowOffset: 20,
            shadowScale: .94
        }
    });
    const i = (a, l, d) => {
        let u = d ? a.querySelector(".swiper-slide-shadow-left") : a.querySelector(".swiper-slide-shadow-top"),
            c = d ? a.querySelector(".swiper-slide-shadow-right") : a.querySelector(".swiper-slide-shadow-bottom");
        u || (u = Y("div", `swiper-slide-shadow-${d?"left":"top"}`), a.append(u)), c || (c = Y("div", `swiper-slide-shadow-${d?"right":"bottom"}`), a.append(c)), u && (u.style.opacity = Math.max(-l, 0)), c && (c.style.opacity = Math.max(l, 0))
    };
    Wt({
        effect: "cube",
        swiper: t,
        on: s,
        setTranslate: () => {
            const {
                el: a,
                wrapperEl: l,
                slides: d,
                width: u,
                height: c,
                rtlTranslate: p,
                size: f,
                browser: w
            } = t, m = t.params.cubeEffect, T = t.isHorizontal(), S = t.virtual && t.params.virtual.enabled;
            let P = 0,
                g;
            m.shadow && (T ? (g = t.slidesEl.querySelector(".swiper-cube-shadow"), g || (g = Y("div", "swiper-cube-shadow"), t.slidesEl.append(g)), g.style.height = `${u}px`) : (g = a.querySelector(".swiper-cube-shadow"), g || (g = Y("div", "swiper-cube-shadow"), a.append(g))));
            for (let y = 0; y < d.length; y += 1) {
                const x = d[y];
                let I = y;
                S && (I = parseInt(x.getAttribute("data-swiper-slide-index"), 10));
                let O = I * 90,
                    z = Math.floor(O / 360);
                p && (O = -O, z = Math.floor(-O / 360));
                const V = Math.max(Math.min(x.progress, 1), -1);
                let v = 0,
                    E = 0,
                    L = 0;
                I % 4 === 0 ? (v = -z * 4 * f, L = 0) : (I - 1) % 4 === 0 ? (v = 0, L = -z * 4 * f) : (I - 2) % 4 === 0 ? (v = f + z * 4 * f, L = f) : (I - 3) % 4 === 0 && (v = -f, L = 3 * f + f * 4 * z), p && (v = -v), T || (E = v, v = 0);
                const D = `rotateX(${T?0:-O}deg) rotateY(${T?O:0}deg) translate3d(${v}px, ${E}px, ${L}px)`;
                V <= 1 && V > -1 && (P = I * 90 + V * 90, p && (P = -I * 90 - V * 90)), x.style.transform = D, m.slideShadows && i(x, V, T)
            }
            if (l.style.transformOrigin = `50% 50% -${f/2}px`, l.style["-webkit-transform-origin"] = `50% 50% -${f/2}px`, m.shadow)
                if (T) g.style.transform = `translate3d(0px, ${u/2+m.shadowOffset}px, ${-u/2}px) rotateX(90deg) rotateZ(0deg) scale(${m.shadowScale})`;
                else {
                    const y = Math.abs(P) - Math.floor(Math.abs(P) / 90) * 90,
                        x = 1.5 - (Math.sin(y * 2 * Math.PI / 360) / 2 + Math.cos(y * 2 * Math.PI / 360) / 2),
                        I = m.shadowScale,
                        O = m.shadowScale / x,
                        z = m.shadowOffset;
                    g.style.transform = `scale3d(${I}, 1, ${O}) translate3d(0px, ${c/2+z}px, ${-c/2/O}px) rotateX(-90deg)`
                } const b = (w.isSafari || w.isWebView) && w.needPerspectiveFix ? -f / 2 : 0;
            l.style.transform = `translate3d(0px,0,${b}px) rotateX(${t.isHorizontal()?0:P}deg) rotateY(${t.isHorizontal()?-P:0}deg)`, l.style.setProperty("--swiper-cube-translate-z", `${b}px`)
        },
        setTransition: a => {
            const {
                el: l,
                slides: d
            } = t;
            if (d.forEach(u => {
                    u.style.transitionDuration = `${a}ms`, u.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(c => {
                        c.style.transitionDuration = `${a}ms`
                    })
                }), t.params.cubeEffect.shadow && !t.isHorizontal()) {
                const u = l.querySelector(".swiper-cube-shadow");
                u && (u.style.transitionDuration = `${a}ms`)
            }
        },
        recreateShadows: () => {
            const a = t.isHorizontal();
            t.slides.forEach(l => {
                const d = Math.max(Math.min(l.progress, 1), -1);
                i(l, d, a)
            })
        },
        getEffectParams: () => t.params.cubeEffect,
        perspective: () => !0,
        overwriteParams: () => ({
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: !0,
            resistanceRatio: 0,
            spaceBetween: 0,
            centeredSlides: !1,
            virtualTranslate: !0
        })
    })
}

function Xt(t, e = {}) {
    const s = t.querySelector(".swiper"),
        {
            autoplayDuration: i = 5e3,
            Swiper: n,
            EffectCube: r,
            onSlidesIndexesChange: o,
            onAutoplayStart: a,
            onAutoplayStop: l
        } = e;
    let {
        enabled: d = !0
    } = e, u = 0, c, p;
    const f = [];
    let w, m, T, S, P, g, b, y;
    const x = (h, M) => {
            const C = f.indexOf(h);
            let A = typeof M == "undefined" ? i : M,
                k = parseInt(h.slides[h.activeIndex].getAttribute("data-duration"), 10);
            const H = h.slides[h.activeIndex].querySelector("video");
            return Number.isNaN(k) && H && (k = H.duration * 1e3), !Number.isNaN(k) && k > 0 && typeof M == "undefined" && (A = k), b = A, h.storiesSliderAutoplayTimeout = setTimeout(() => {
                if (!h.isEnd) h.slideNext();
                else {
                    if (u !== C) return;
                    c.isEnd || c.slideNext()
                }
            }, A), a && a(h), A
        },
        I = h => {
            clearTimeout(h.storiesSliderAutoplayTimeout), l && l(h)
        },
        O = h => {
            I(h);
            const M = h.slides[h.activeIndex].querySelector("video");
            M && (cancelAnimationFrame(p), M.pause());
            const C = b || i;
            let A = parseInt(h.slides[h.activeIndex].getAttribute("data-duration"), 10);
            if (Number.isNaN(A) && (A = void 0), !A && M && (A = M.duration * 1e3), b = C - (new Date().getTime() - g), h.isEnd && b < 0) return;
            b < 0 && (b = 0);
            const k = 1 - b / (A || i),
                H = h.el.querySelector(`.stories-slider-pagination-bullet:nth-child(${h.activeIndex+1})`);
            H.querySelector("span").remove(), H.insertAdjacentHTML("beforeend", `<span style="transform:translateX(${-100+k*100}%)"></span>`)
        },
        z = h => {
            if (h.isEnd && b < 0) return;
            g = new Date().getTime(), x(h, b);
            const M = h.slides[h.activeIndex].querySelector("video");
            if (M) try {
                p = requestAnimationFrame(() => {
                    M.play()
                })
            } catch {}
            const C = h.el.querySelector(`.stories-slider-pagination-bullet:nth-child(${h.activeIndex+1}) > span`);
            C.style.transform = "translateX(0%)", C.style.transitionDuration = `${b}ms`
        },
        V = h => {
            I(h), x(h), g = new Date().getTime();
            const M = h.el.querySelector(".stories-slider-pagination-bullet-current");
            M && M.classList.remove("stories-slider-pagination-bullet-current");
            const C = h.el.querySelector(`.stories-slider-pagination-bullet:nth-child(${h.activeIndex+1})`),
                A = h.slides[h.activeIndex].querySelector("video");
            if (A) {
                A.currentTime = 0;
                try {
                    p = requestAnimationFrame(() => {
                        A.play()
                    })
                } catch {}
            }
            h.slides.forEach(G => {
                G.querySelectorAll("video").forEach($ => {
                    $ !== A && ($.currentTime = 0, cancelAnimationFrame(p), $.pause())
                })
            }), f.filter((G, $) => $ !== u).forEach(G => {
                G.el.querySelectorAll("video").forEach($ => {
                    cancelAnimationFrame(p), $.pause()
                })
            });
            const k = [...C.parentElement.children],
                H = [...k].filter((G, $) => $ < k.indexOf(C)),
                ie = [...k].filter((G, $) => $ > k.indexOf(C));
            H.forEach(G => {
                G.classList.add("stories-slider-pagination-bullet-viewed"), G.querySelectorAll("span").forEach($ => $.remove()), G.insertAdjacentHTML("beforeend", "<span></span>")
            }), ie.forEach(G => {
                G.classList.remove("stories-slider-pagination-bullet-viewed", "stories-slider-pagination-bullet-current"), G.querySelectorAll("span").forEach($ => $.remove()), G.insertAdjacentHTML("beforeend", "<span></span>")
            }), C.classList.remove("stories-slider-pagination-bullet-viewed"), C.classList.add("stories-slider-pagination-bullet-current"), [...C.children].forEach(G => G.remove()), C.insertAdjacentHTML("beforeend", "<span></span>"), C.clientWidth, C.querySelector("span").style.transform = "translateX(0%)", C.querySelector("span").style.transitionDuration = `${b}ms`, o && (cancelAnimationFrame(w), w = requestAnimationFrame(() => {
                o(u, h.activeIndex)
            }))
        },
        v = () => {
            const h = () => {
                    t.classList.add("stories-slider-perspective")
                },
                M = () => {
                    t.classList.remove("stories-slider-perspective")
                };
            c = new n(s, {
                modules: typeof r != "undefined" ? [r] : [],
                effect: "cube",
                speed: 500,
                threshold: 5,
                cubeEffect: {
                    shadow: !1
                },
                observer: !0,
                on: {
                    transitionStart() {
                        M()
                    },
                    sliderFirstMove() {
                        M()
                    },
                    transitionEnd() {
                        h()
                    },
                    init(C) {
                        C.params.resistanceRatio = .5, h()
                    },
                    slideChange() {
                        const C = f[u];
                        u = c.activeIndex;
                        const A = f[u];
                        I(C), x(A), V(A)
                    }
                }
            })
        },
        E = h => {
            const M = h.querySelectorAll(".swiper-slide"),
                C = document.createElement("div");
            C.classList.add("stories-slider-pagination");
            for (let A = 0; A < M.length; A += 1) {
                const k = document.createElement("div");
                k.classList.add("stories-slider-pagination-bullet"), k.appendChild(document.createElement("span")), C.appendChild(k)
            }
            h.appendChild(C)
        },
        L = h => {
            h.el.querySelectorAll(".stories-slider-pagination, .stories-slider-pagination-bullet").forEach(M => M.remove())
        },
        D = (h, M) => {
            h.querySelectorAll(".swiper-slide").forEach(A => {
                const k = document.createElement("div"),
                    H = document.createElement("div");
                k.classList.add("stories-slider-button", "stories-slider-button-prev"), H.classList.add("stories-slider-button", "stories-slider-button-next"), A.appendChild(k), A.appendChild(H);
                const ie = () => {
                        if (!(P > 200)) {
                            if (M.isBeginning) {
                                c.slidePrev();
                                return
                            }
                            M.slidePrev()
                        }
                    },
                    G = () => {
                        if (!(P > 200)) {
                            if (M.isEnd) {
                                c.slideNext();
                                return
                            }
                            M.slideNext()
                        }
                    };
                k.addEventListener("click", ie), H.addEventListener("click", G)
            })
        },
        X = h => {
            h.el.querySelectorAll(".stories-slider-button").forEach(M => M.remove())
        },
        Z = () => {
            t.querySelectorAll(".swiper .swiper").forEach((h, M) => {
                const C = new n(h, {
                    speed: 1,
                    nested: !0,
                    allowTouchMove: !1,
                    observer: !0,
                    on: {
                        touchStart(A) {
                            m = !0, y = !1, T = new Date().getTime(), S = setTimeout(() => {
                                y = !0, O(A)
                            }, 200)
                        },
                        touchEnd(A) {
                            clearTimeout(S), u === M && (!m || (P = new Date().getTime() - T, y && z(A), y = !1, m = !1))
                        },
                        init(A) {
                            !d || (u !== M ? I(A) : requestAnimationFrame(() => {
                                V(A)
                            }))
                        },
                        slideChange(A) {
                            V(A)
                        }
                    }
                });
                E(h), D(h, C), f.push(C)
            })
        };
    return v(), Z(), {
        el: t,
        mainSwiper: c,
        subSwipers: f,
        destroy: () => {
            c && c.destroy && c.destroy(), f.forEach(h => {
                I(h), L(h), X(h), h.destroy && h.destroy()
            })
        },
        slideTo: (h, M) => {
            if (c && c.slideTo && !c.destroyed && c.slideTo(h, 0), typeof M != "undefined") {
                const C = f[h];
                C.slideTo && !C.destroyed && (C.activeIndex === M ? V(C) : C.slideTo(M, 0))
            }
        },
        enable: () => {
            d || f.forEach((h, M) => {
                M === u && V(h)
            })
        },
        disable: () => {
            d = !1, f.forEach((h, M) => {
                h.el.querySelectorAll("video").forEach(C => {
                    cancelAnimationFrame(p), C.pause()
                }), M === u ? O(h) : I(h)
            })
        }
    }
}
const q = document.querySelector(".stories-slider"),
    K = Xt(q, {
        Swiper: F,
        EffectCube: jt,
        autoplayDuration: 5e3,
        enabled: !1,
        onSlidesIndexesChange(t, e) {
            console.log({
                mainIndex: t,
                subIndex: e
            })
        }
    });
document.querySelectorAll(".demo-stories a").forEach((t, e) => {
    t.addEventListener("click", s => {
        s.preventDefault(), q.classList.add("stories-slider-in"), K.enable(), K.slideTo(e, 0)
    })
});
document.querySelectorAll(".demo-post-avatar").forEach(t => {
    const e = parseInt(t.getAttribute("data-user-index"), 10);
    t.addEventListener("click", s => {
        s.preventDefault(), q.classList.add("stories-slider-in"), K.enable(), K.slideTo(e, 0)
    })
});
q.addEventListener("click", t => {
    t.target.matches(".stories-slider-close-button") && (K.disable(), q.classList.add("stories-slider-out"))
});
q.addEventListener("animationend", () => {
    q.classList.contains("stories-slider-out") && (q.classList.remove("stories-slider-in"), q.classList.remove("stories-slider-out"))
});