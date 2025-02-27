/*!
 * FooTable - Awesome Responsive Tables
 * Version : 2.0.1.2
 * http://fooplugins.com/plugins/footable-jquery/
 *
 * Requires jQuery - http://jquery.com/
 *
 * Copyright 2013 Steven Usher & Brad Vincent
 * Released under the MIT license
 * You are free to use FooTable in commercial projects as long as this copyright header is left intact.
 *
 * Date: 21 Sep 2013
 */

/*!
 * FooTable - Awesome Responsive Tables
 * Version : 2.0.1.2
 * http://fooplugins.com/plugins/footable-jquery/
 *
 * Requires jQuery - http://jquery.com/
 *
 * Copyright 2013 Steven Usher & Brad Vincent
 * Released under the MIT license
 * You are free to use FooTable in commercial projects as long as this copyright header is left intact.
 *
 * Date: 21 Sep 2013
 */

$(document).ready(function() {
        var a = ".order-summary-content .cart, .wishlist-content .cart, .return-request-page .data-table",
            b = ".update-cart-button, .update-wishlist-button, .submit-return-request-button";
        $(a).length < 1 || $(b).length < 1 || $(b).one("click", function() {
            $(a).find("tr").not(".footable-row-detail").find("input, select").each(function() {
                var b = $(this),
                    c = $(a).find("input, select").filter('[name="' + b.attr("name") + '"]').not(b);
                "checkbox" == b.attr("type") && (c = c.filter('[value="' + b.attr("value") + '"]')), c.length > 0 && ("checkbox" == b.attr("type") ? b.attr("checked", c.first().attr("checked")) : b.attr("value", c.first().val()), c.remove())
            })
        })
    }),
    function(a, b, c) {
        function e() {
            var a = this;
            a.id = null, a.busy = !1, a.start = function(b, c) {
                a.busy || (a.stop(), a.id = setTimeout(function() {
                    b(), a.id = null, a.busy = !1
                }, c), a.busy = !0)
            }, a.stop = function() {
                null !== a.id && (clearTimeout(a.id), a.id = null, a.busy = !1)
            }
        }

        function f(c, d, f) {
            var g = this;
            g.id = f, g.table = c, g.options = d, g.breakpoints = [], g.breakpointNames = "", g.columns = {}, g.plugins = b.footable.plugins.load(g);
            var h = g.options,
                i = h.classes,
                j = h.events,
                k = h.triggers,
                l = 0;
            return g.timers = {
                resize: new e,
                register: function(a) {
                    return g.timers[a] = new e, g.timers[a]
                }
            }, g.init = function() {
                var c = a(b),
                    d = a(g.table);
                if (b.footable.plugins.init(g), d.hasClass(i.loaded)) return void g.raise(j.alreadyInitialized);
                g.raise(j.initializing), d.addClass(i.loading), d.find(h.columnDataSelector).each(function() {
                    var a = g.getColumnData(this);
                    g.columns[a.index] = a
                });
                for (var e in h.breakpoints) g.breakpoints.push({
                    name: e,
                    width: h.breakpoints[e]
                }), g.breakpointNames += e + " ";
                g.breakpoints.sort(function(a, b) {
                    return a.width - b.width
                }), d.unbind(k.initialize).bind(k.initialize, function() {
                    d.removeData("footable_info"), d.data("breakpoint", ""), d.trigger(k.resize), d.removeClass(i.loading), d.addClass(i.loaded).addClass(i.main), g.raise(j.initialized)
                }).unbind(k.redraw).bind(k.redraw, function() {
                    g.redraw()
                }).unbind(k.resize).bind(k.resize, function() {
                    g.resize()
                }).unbind(k.expandFirstRow).bind(k.expandFirstRow, function() {
                    d.find(h.toggleSelector).first().not("." + i.detailShow).trigger(k.toggleRow)
                }).unbind(k.expandAll).bind(k.expandAll, function() {
                    d.find(h.toggleSelector).not("." + i.detailShow).trigger(k.toggleRow)
                }).unbind(k.collapseAll).bind(k.collapseAll, function() {
                    d.find("." + i.detailShow).trigger(k.toggleRow)
                }), d.trigger(k.initialize), c.bind("resize.footable", function() {
                    g.timers.resize.stop(), g.timers.resize.start(function() {
                        g.raise(k.resize)
                    }, h.delay)
                })
            }, g.addRowToggle = function() {
                if (h.addRowToggle) {
                    var b = a(g.table),
                        c = !1;
                    b.find("span." + i.toggle).remove();
                    for (var d in g.columns) {
                        var e = g.columns[d];
                        if (e.toggle) {
                            c = !0;
                            var f = "> tbody > tr:not(." + i.detail + ",." + i.disabled + ") > td:nth-child(" + (parseInt(e.index, 10) + 1) + ")";
                            return void b.find(f).not("." + i.detailCell).prepend(a(h.toggleHTMLElement).addClass(i.toggle))
                        }
                    }
                    c || b.find("> tbody > tr:not(." + i.detail + ",." + i.disabled + ") > td:first-child").not("." + i.detailCell).prepend(a(h.toggleHTMLElement).addClass(i.toggle))
                }
            }, g.setColumnClasses = function() {
                $table = a(g.table);
                for (var b in g.columns) {
                    var c = g.columns[b];
                    if (null !== c.className) {
                        var d = "",
                            e = !0;
                        a.each(c.matches, function(a, b) {
                            e || (d += ", "), d += "> tbody > tr:not(." + i.detail + ") > td:nth-child(" + (parseInt(b, 10) + 1) + ")", e = !1
                        }), $table.find(d).not("." + i.detailCell).addClass(c.className)
                    }
                }
            }, g.bindToggleSelectors = function() {
                var b = a(g.table);
                g.hasAnyBreakpointColumn() && (b.find(h.toggleSelector).unbind(k.toggleRow).bind(k.toggleRow, function(b) {
                    var c = a(this).is("tr") ? a(this) : a(this).parents("tr:first");
                    g.toggleDetail(c)
                }), b.find(h.toggleSelector).unbind("click.footable").bind("click.footable", function(c) {
                    b.is(".breakpoint") && a(c.target).is("td,." + i.toggle) && a(this).trigger(k.toggleRow)
                }))
            }, g.parse = function(a, b) {
                return (h.parsers[b.type] || h.parsers.alpha)(a)
            }, g.getColumnData = function(b) {
                var c = a(b),
                    d = c.data("hide"),
                    e = c.index();
                d = d || "", d = jQuery.map(d.split(","), function(a) {
                    return jQuery.trim(a)
                });
                var f = {
                    index: e,
                    hide: {},
                    type: c.data("type") || "alpha",
                    name: c.data("name") || a.trim(c.text()),
                    ignore: c.data("ignore") || !1,
                    toggle: c.data("toggle") || !1,
                    className: c.data("class") || null,
                    matches: [],
                    names: {},
                    group: c.data("group") || null,
                    groupName: null
                };
                if (null !== f.group) {
                    var i = a(g.table).find('> thead > tr.footable-group-row > th[data-group="' + f.group + '"], > thead > tr.footable-group-row > td[data-group="' + f.group + '"]').first();
                    f.groupName = g.parse(i, {
                        type: "alpha"
                    })
                }
                var k = parseInt(c.prev().attr("colspan") || 0, 10);
                l += k > 1 ? k - 1 : 0;
                var m = parseInt(c.attr("colspan") || 0, 10),
                    n = f.index + l;
                if (m > 1) {
                    var o = c.data("names");
                    o = o || "", o = o.split(",");
                    for (var p = 0; p < m; p++) f.matches.push(p + n), p < o.length && (f.names[p + n] = o[p])
                } else f.matches.push(n);
                f.hide.default = "all" === c.data("hide") || a.inArray("default", d) >= 0;
                var q = !1;
                for (var r in h.breakpoints) f.hide[r] = "all" === c.data("hide") || a.inArray(r, d) >= 0, q = q || f.hide[r];
                return f.hasBreakpoint = q, g.raise(j.columnData, {
                    column: {
                        data: f,
                        th: b
                    }
                }).column.data
            }, g.getViewportWidth = function() {
                return window.innerWidth || (document.body ? document.body.offsetWidth : 0)
            }, g.calculateWidth = function(a, b) {
                return jQuery.isFunction(h.calculateWidthOverride) ? h.calculateWidthOverride(a, b) : (b.viewportWidth < b.width && (b.width = b.viewportWidth), b.parentWidth < b.width && (b.width = b.parentWidth), b)
            }, g.hasBreakpointColumn = function(a) {
                for (var b in g.columns)
                    if (g.columns[b].hide[a]) {
                        if (g.columns[b].ignore) continue;
                        return !0
                    }
                return !1
            }, g.hasAnyBreakpointColumn = function() {
                for (var a in g.columns)
                    if (g.columns[a].hasBreakpoint) return !0;
                return !1
            }, g.resize = function() {
                var b = a(g.table);
                if (b.is(":visible") && g.hasAnyBreakpointColumn()) {
                    var c = {
                        width: b.width(),
                        viewportWidth: g.getViewportWidth(),
                        parentWidth: b.parent().width()
                    };
                    c = g.calculateWidth(b, c);
                    var d = b.data("footable_info");
                    if (b.data("footable_info", c), g.raise(j.resizing, {
                            old: d,
                            info: c
                        }), !d || d && d.width && d.width !== c.width) {
                        for (var f, e = null, h = 0; h < g.breakpoints.length; h++)
                            if ((f = g.breakpoints[h]) && f.width && c.width <= f.width) {
                                e = f;
                                break
                            }
                        var i = null === e ? "default" : e.name,
                            l = g.hasBreakpointColumn(i),
                            m = b.data("breakpoint");
                        b.data("breakpoint", i).removeClass("default breakpoint").removeClass(g.breakpointNames).addClass(i + (l ? " breakpoint" : "")), i !== m && (b.trigger(k.redraw), g.raise(j.breakpoint, {
                            breakpoint: i,
                            info: c
                        }))
                    }
                    g.raise(j.resized, {
                        old: d,
                        info: c
                    })
                }
            }, g.redraw = function() {
                g.addRowToggle(), g.bindToggleSelectors(), g.setColumnClasses();
                var b = a(g.table),
                    c = b.data("breakpoint"),
                    d = g.hasBreakpointColumn(c);
                b.find("> tbody > tr:not(." + i.detail + ")").data("detail_created", !1).end().find("> thead > tr:last-child > th").each(function() {
                    var d = g.columns[a(this).index()],
                        e = "",
                        f = !0;
                    a.each(d.matches, function(a, b) {
                        f || (e += ", ");
                        var c = b + 1;
                        e += "> tbody > tr:not(." + i.detail + ") > td:nth-child(" + c + ")", e += ", > tfoot > tr:not(." + i.detail + ") > td:nth-child(" + c + ")", e += ", > colgroup > col:nth-child(" + c + ")", f = !1
                    }), e += ', > thead > tr[data-group-row="true"] > th[data-group="' + d.group + '"]';
                    var h = b.find(e).add(this);
                    if (!1 === d.hide[c] ? h.show() : h.hide(), 1 === b.find("> thead > tr.footable-group-row").length) {
                        var j = b.find('> thead > tr:last-child > th[data-group="' + d.group + '"]:visible, > thead > tr:last-child > th[data-group="' + d.group + '"]:visible'),
                            k = b.find('> thead > tr.footable-group-row > th[data-group="' + d.group + '"], > thead > tr.footable-group-row > td[data-group="' + d.group + '"]'),
                            l = 0;
                        a.each(j, function() {
                            l += parseInt(a(this).attr("colspan") || 1, 10)
                        }), l > 0 ? k.attr("colspan", l).show() : k.hide()
                    }
                }).end().find("> tbody > tr." + i.detailShow).each(function() {
                    g.createOrUpdateDetailRow(this)
                }), b.find("> tbody > tr." + i.detailShow + ":visible").each(function() {
                    var b = a(this).next();
                    b.hasClass(i.detail) && (d ? b.show() : b.hide())
                }), b.find("> thead > tr > th.footable-last-column, > tbody > tr > td.footable-last-column").removeClass("footable-last-column"), b.find("> thead > tr > th.footable-first-column, > tbody > tr > td.footable-first-column").removeClass("footable-first-column"), b.find("> thead > tr, > tbody > tr").find("> th:visible:last, > td:visible:last").addClass("footable-last-column").end().find("> th:visible:first, > td:visible:first").addClass("footable-first-column"), g.raise(j.redrawn)
            }, g.toggleDetail = function(b) {
                var c = b.jquery ? b : a(b),
                    d = c.next();
                c.hasClass(i.detailShow) ? (c.removeClass(i.detailShow), d.hasClass(i.detail) && d.hide(), g.raise(j.rowCollapsed, {
                    row: c[0]
                })) : (g.createOrUpdateDetailRow(c[0]), c.addClass(i.detailShow).next().show(), g.raise(j.rowExpanded, {
                    row: c[0]
                }), a.event.trigger("footableRowOpened"))
            }, g.removeRow = function(b) {
                var c = b.jquery ? b : a(b);
                c.hasClass(i.detail) && (c = c.prev());
                var d = c.next();
                !0 === c.data("detail_created") && d.remove(), c.remove(), g.raise(j.rowRemoved)
            }, g.appendRow = function(b) {
                var c = b.jquery ? b : a(b);
                a(g.table).find("tbody").append(c), g.redraw()
            }, g.getColumnFromTdIndex = function(b) {
                var c = null;
                for (var d in g.columns)
                    if (a.inArray(b, g.columns[d].matches) >= 0) {
                        c = g.columns[d];
                        break
                    }
                return c
            }, g.createOrUpdateDetailRow = function(b) {
                var e, c = a(b),
                    d = c.next(),
                    f = [];
                if (!0 === c.data("detail_created")) return !0;
                if (c.is(":hidden")) return !1;
                if (g.raise(j.rowDetailUpdating, {
                        row: c,
                        detail: d
                    }), c.find("> td:hidden").each(function() {
                        var b = a(this).index(),
                            c = g.getColumnFromTdIndex(b),
                            d = c.name;
                        return !0 === c.ignore || (b in c.names && (d = c.names[b]), f.push({
                            name: d,
                            value: g.parse(this, c),
                            display: a.trim(a(this).html()),
                            group: c.group,
                            groupName: c.groupName
                        }), !0)
                    }), 0 === f.length) return !1;
                var k = c.find("> td:visible").length,
                    l = d.hasClass(i.detail);
                return l || (d = a('<tr class="' + i.detail + '"><td class="' + i.detailCell + '"><div class="' + i.detailInner + '"></div></td></tr>'), c.after(d)), d.find("> td:first").attr("colspan", k), e = d.find("." + i.detailInner).empty(), h.createDetail(e, f, h.createGroupedDetail, h.detailSeparator, i), c.data("detail_created", !0), g.raise(j.rowDetailUpdated, {
                    row: c,
                    detail: d
                }), !l
            }, g.raise = function(b, c) {
                !0 === g.options.debug && a.isFunction(g.options.log) && g.options.log(b, "event"), c = c || {};
                var d = {
                    ft: g
                };
                a.extend(!0, d, c);
                var e = a.Event(b, d);
                return e.ft || a.extend(!0, e, d), a(g.table).trigger(e), e
            }, g.reset = function() {
                var b = a(g.table);
                b.removeData("footable_info").data("breakpoint", "").removeClass(i.loading).removeClass(i.loaded), b.find(h.toggleSelector).unbind(k.toggleRow).unbind("click.footable"), b.find("> tbody > tr").removeClass(i.detailShow), b.find("> tbody > tr." + i.detail).remove(), g.raise(j.reset)
            }, g.init(), g
        }
        b.footable = {
            options: {
                delay: 100,
                breakpoints: {
                    w410: 410,
                    w480: 480,
                    w580: 580,
                    w768: 768,
                    w980: 980,
                    w1000: 1e3
                },
                parsers: {
                    alpha: function(b) {
                        return a(b).data("value") || a.trim(a(b).text())
                    },
                    numeric: function(b) {
                        var c = a(b).data("value") || a(b).text().replace(/[^0-9.\-]/g, "");
                        return c = parseFloat(c), isNaN(c) && (c = 0), c
                    }
                },
                addRowToggle: !0,
                calculateWidthOverride: null,
                toggleSelector: " > tbody > tr:not(.footable-row-detail)",
                columnDataSelector: "> thead > tr:last-child > th, > thead > tr:last-child > td",
                detailSeparator: ":",
                toggleHTMLElement: "<span />",
                createGroupedDetail: function(a) {
                    for (var b = {
                            _none: {
                                name: null,
                                data: []
                            }
                        }, c = 0; c < a.length; c++) {
                        var d = a[c].group;
                        null !== d ? (d in b || (b[d] = {
                            name: a[c].groupName || a[c].group,
                            data: []
                        }), b[d].data.push(a[c])) : b._none.data.push(a[c])
                    }
                    return b
                },
                createDetail: function(a, b, c, d, e) {
                    var f = c(b);
                    for (var g in f)
                        if (0 !== f[g].data.length) {
                            "_none" !== g && a.append('<div class="' + e.detailInnerGroup + '">' + f[g].name + "</div>");
                            for (var h = 0; h < f[g].data.length; h++) {
                                var i = f[g].data[h].name ? d : "";
                                a.append('<div class="' + e.detailInnerRow + '"><div class="' + e.detailInnerName + '">' + f[g].data[h].name + i + '</div><div class="' + e.detailInnerValue + '">' + f[g].data[h].display + "</div></div>")
                            }
                        }
                },
                classes: {
                    main: "footable",
                    loading: "footable-loading",
                    loaded: "footable-loaded",
                    toggle: "footable-toggle",
                    disabled: "footable-disabled",
                    detail: "footable-row-detail",
                    detailCell: "footable-row-detail-cell",
                    detailInner: "footable-row-detail-inner",
                    detailInnerRow: "footable-row-detail-row",
                    detailInnerGroup: "footable-row-detail-group",
                    detailInnerName: "footable-row-detail-name",
                    detailInnerValue: "footable-row-detail-value",
                    detailShow: "footable-detail-show"
                },
                triggers: {
                    initialize: "footable_initialize",
                    resize: "footable_resize",
                    redraw: "footable_redraw",
                    toggleRow: "footable_toggle_row",
                    expandFirstRow: "footable_expand_first_row",
                    expandAll: "footable_expand_all",
                    collapseAll: "footable_collapse_all"
                },
                events: {
                    alreadyInitialized: "footable_already_initialized",
                    initializing: "footable_initializing",
                    initialized: "footable_initialized",
                    resizing: "footable_resizing",
                    resized: "footable_resized",
                    redrawn: "footable_redrawn",
                    breakpoint: "footable_breakpoint",
                    columnData: "footable_column_data",
                    rowDetailUpdating: "footable_row_detail_updating",
                    rowDetailUpdated: "footable_row_detail_updated",
                    rowCollapsed: "footable_row_collapsed",
                    rowExpanded: "footable_row_expanded",
                    rowRemoved: "footable_row_removed",
                    reset: "footable_reset"
                },
                debug: !1,
                log: null
            },
            version: {
                major: 0,
                minor: 5,
                toString: function() {
                    return b.footable.version.major + "." + b.footable.version.minor
                },
                parse: function(a) {
                    return version = /(\d+)\.?(\d+)?\.?(\d+)?/.exec(a), {
                        major: parseInt(version[1], 10) || 0,
                        minor: parseInt(version[2], 10) || 0,
                        patch: parseInt(version[3], 10) || 0
                    }
                }
            },
            plugins: {
                _validate: function(c) {
                    if (!a.isFunction(c)) return !0 === b.footable.options.debug && console.error('Validation failed, expected type "function", received type "{0}".', typeof c), !1;
                    var d = new c;
                    return "string" != typeof d.name ? (!0 === b.footable.options.debug && console.error('Validation failed, plugin does not implement a string property called "name".', d), !1) : a.isFunction(d.init) ? (!0 === b.footable.options.debug && console.log('Validation succeeded for plugin "' + d.name + '".', d), !0) : (!0 === b.footable.options.debug && console.error('Validation failed, plugin "' + d.name + '" does not implement a function called "init".', d), !1)
                },
                registered: [],
                register: function(c, d) {
                    b.footable.plugins._validate(c) && (b.footable.plugins.registered.push(c), "object" == typeof d && a.extend(!0, b.footable.options, d))
                },
                load: function(a) {
                    var d, e, c = [];
                    for (e = 0; e < b.footable.plugins.registered.length; e++) try {
                        d = b.footable.plugins.registered[e], c.push(new d(a))
                    } catch (a) {
                        !0 === b.footable.options.debug && console.error(a)
                    }
                    return c
                },
                init: function(a) {
                    for (var c = 0; c < a.plugins.length; c++) try {
                        a.plugins[c].init(a)
                    } catch (a) {
                        !0 === b.footable.options.debug && console.error(a)
                    }
                }
            }
        };
        var d = 0;
        a.fn.footable = function(c) {
            c = c || {};
            var e = a.extend(!0, {}, b.footable.options, c);
            return this.each(function() {
                d++;
                var b = new f(this, e, d);
                a(this).data("footable", b)
            })
        }
    }(jQuery, window);