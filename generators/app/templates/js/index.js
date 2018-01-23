var win, doc, index, ieMode, isIE, isIE9;

win = $(window);
doc = $(document);
// 兼容判断变量
ieMode = document.documentMode;
isIE = !!window.ActiveXObject || "ActiveXObject" in window;
isIE9 = isIE && ieMode == 9;

index = (function() {
  /**
   * [datePicker 日期选择组件]
   * @param {Obj} opts    调用时传入的参数对象
   * @param {Str} opt.el  点击输入框对象类名
   * 预览地址：https://codepen.io/17khba/pen/Eodgee
   */
  var datePicker = (function() {
    /* 时间点参数配置 */
    var singleOpt = {
      singleDatePicker: true,
      showDropdowns: true,
      separator: " - ",
      applyLabel: "确认",
      cancelLabel: "取消",
      customRangeLabel: "Custom",
      weekLabel: "W",
      locale: {
        format: "YYYY/MM/DD",
        separator: " - ",
        applyLabel: "确认",
        cancelLabel: "取消",
        fromLabel: "From",
        toLabel: "To",
        customRangeLabel: "Custom",
        weekLabel: "W",
        daysOfWeek: ["日", "一", "二", "三", "四", "五", "六"],
        monthNames: [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "十二月"
        ],
        firstDay: 1
      }
    };

    /* 时间区间参数配置 */
    var multiOpt = function() {
      var opt = {
        showDropdowns: true,
        startDate: moment().subtract(7, "days"),
        endDate: moment(),
        separator: " - ",
        applyLabel: "确认",
        cancelLabel: "取消",
        customRangeLabel: "Custom",
        weekLabel: "W",
        locale: {
          format: "YYYY/MM/DD",
          separator: " - ",
          applyLabel: "确认",
          cancelLabel: "取消",
          fromLabel: "From",
          toLabel: "To",
          customRangeLabel: "Custom",
          weekLabel: "W",
          daysOfWeek: ["日", "一", "二", "三", "四", "五", "六"],
          monthNames: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月"
          ],
          firstDay: 1
        }
      };

      return opt;
    };

    /* 初始为空时间区间参数配置 */
    var emptyOpt = {
      autoUpdateInput: false,
      showDropdowns: true,
      separator: " - ",
      applyLabel: "确认",
      cancelLabel: "取消",
      customRangeLabel: "Custom",
      weekLabel: "W",
      locale: {
        format: "YYYY/MM/DD",
        separator: " - ",
        applyLabel: "确认",
        cancelLabel: "取消",
        fromLabel: "From",
        toLabel: "To",
        customRangeLabel: "Custom",
        weekLabel: "W",
        daysOfWeek: ["日", "一", "二", "三", "四", "五", "六"],
        monthNames: [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "十二月"
        ],
        firstDay: 1
      }
    };

    /* 时间点选择 */
    function initSingle(opts) {
      var $el, $iconCalendar;

      $el = $(opts.el);
      $iconCalendar = $(opts.icon);

      if ($el.get(0)) {
        $el.daterangepicker(singleOpt);
      } else {
        console.warn("时间选择组件el参数不存在！");
      }

      if (!$iconCalendar.get(0)) return false;
      $iconCalendar.click(function() {
        $(this)
          .parent()
          .find("input")
          .click();
      });
    }

    /* 时间区间选择 */
    function initMultiple(opts) {
      var $el, $iconCalendar;

      $el = $(opts.el);
      $iconCalendar = $(opts.icon);

      if ($el.get(0)) {
        $el.daterangepicker(multiOpt());
      } else {
        console.warn("时间选择组件el参数不存在！");
      }

      if (!$iconCalendar.get(0)) return false;
      $iconCalendar.click(function() {
        $(this)
          .parent()
          .find("input")
          .click();
      });
    }

    /* 初始为空时间区间选择 */
    function initEmpty(opts) {
      var $el, $iconCalendar;

      $el = $(opts.el);
      $iconCalendar = $(opts.icon);

      if ($el.get(0)) {
        $el.daterangepicker(emptyOpt);
        $el.on("apply.daterangepicker", function(ev, picker) {
          $(this).val(
            picker.startDate.format("YYYY/MM/DD") +
              " - " +
              picker.endDate.format("YYYY/MM/DD")
          );
        });

        $el.on("cancel.daterangepicker", function(ev, picker) {
          $(this).val("");
        });
      } else {
        console.warn("时间选择组件el参数不存在！");
      }

      if (!$iconCalendar.get(0)) return false;
      $iconCalendar.click(function() {
        $(this)
          .parent()
          .find("input")
          .click();
      });
    }

    return {
      initSingle: initSingle,
      initMultiple: initMultiple,
      initEmpty: initEmpty
    };
  })();

  /**
   * [CheckAll 复选框多选组件]
   * @param {Obj} opts        调用时传入的参数对象
   * @param {Str} opt.root    全选组件顶层包裹元素类名
   * @param {Str} opt.allBot  全选组件底部全选元素类名（可选参）
   * 预览地址：https://codepen.io/17khba/pen/JMarRo
   */
  var CheckAll = (function() {
    function Fn(opts) {
      var defaults, setting, Root, allBot, botName;

      defaults = {
        root: null,
        allBot: null
      };

      setting = $.extend({}, defaults, opts);

      Root = setting.root;
      allBot = setting.allBot;
      botName = setting.allBot;

      this.root = $(Root);
      this.allBot = $(allBot);
      this.botName = botName;

      this.init();
    }

    Fn.prototype = {
      constractor: Fn,
      init: function() {
        var Root, hasRoot, allBot, hasAllBot, checkHandle;

        Root = this.root;
        hasRoot = Root.length;
        allBot = $(this.allBot);
        hasAllBot = allBot.length;

        if (!hasRoot) {
          console.warn("全选组件root参数不存在！");
          return false;
        }

        checkHandle = this.checkHandle;

        Root.on("click", ".checkbox-wrapper", { self: this }, checkHandle);

        if (!hasAllBot) return false;

        allBot.on("click", ".checkbox-wrapper", { self: this }, checkHandle);
      },
      checkHandle: function(e) {
        var self,
          Root,
          botName,
          btn,
          isAllTop,
          isAllBot,
          btnAll,
          nextBtnAll,
          curBox,
          isChecked,
          btnLen,
          btnCheckedLen;

        self = e.data.self;
        Root = self.root;
        botName = self.botName;

        btn = Root.find('tbody [type="checkbox"]');

        isAllTop = $(this).parents("th").length;
        isAllBot = $(this).parents(botName).length;

        btnAll = Root.find('thead [type="checkbox"]');
        nextBtnAll = $(botName).find('[type="checkbox"]');

        curBox = $(this).find('[type="checkbox"]');
        isChecked = !curBox.prop("checked");

        curBox.prop("checked", isChecked);

        if (isAllTop || isAllBot) {
          btnAll.prop("checked", isChecked);
          nextBtnAll.prop("checked", isChecked);
          btn.prop("checked", isChecked);
        } else {
          btnLen = btn.length;
          btnCheckedLen = Root.find('tbody [type="checkbox"]:checked').length;

          isChecked = btnLen === btnCheckedLen;

          btnAll.prop("checked", isChecked);
          nextBtnAll.prop("checked", isChecked);
        }
      }
    };

    function checkAll(opts) {
      return new Fn(opts);
    }

    return checkAll;
  })();

  /**
   * [DropDown 下拉组件封装]
   * @param {Obj} opt                 调用时传入的参数对象
   * @param {Str} opt.el              触发包裹层标签类名
   * @param {Fun} opt.cb              回调函数
   * @param {Str} opt.listName        下拉列表类名（可选参）
   * @param {Str} opt.nameSpace       事件命名空间（可选参）
   * @param {Boolean} opt.isReplace   是否替换输入框文字（可选参）
   * @param {Str} opt.activeName      列表展开时添加的类名（可选参）
   * 预览地址：https://codepen.io/17khba/pen/aEjjxK
   */
  var DropDown = (function() {
    function fn(opt) {
      var el, defaults, cb, listName, activeName, isReplace, nameSpace, setting;

      /* 默认参数 */
      defaults = {
        listName: ".dropDown_list",
        cb: null,
        activeName: "active",
        isReplace: true,
        nameSpace: ""
      };

      setting = $.extend({}, defaults, opt);

      el = setting.el;
      cb = setting.cb;
      listName = setting.listName;
      activeName = setting.activeName;
      isReplace = setting.isReplace;
      nameSpace = setting.nameSpace;

      this.wrap = $(el);
      this.target = this.wrap.children("p");
      this.cb = cb;
      this.listEl = this.wrap.find(listName);
      this.activeName = activeName;
      this.isReplace = isReplace;
      this.nameSpace = nameSpace;

      this.init();
    }

    fn.prototype = {
      constractor: fn,
      init: function() {
        var self,
          target,
          hasTarget,
          listEl,
          nameSpace,
          docEventName,
          toggleStatus,
          selectItem,
          docHide;

        self = this;
        target = this.target;
        hasTarget = target.get(0);

        /* 不存在target元素直接退出函数 */
        if (!hasTarget) {
          console.warn("下拉组件类名为dropdown_area的子标签p不存在！");
        }

        listEl = this.listEl;
        nameSpace = this.nameSpace;
        docEventName = nameSpace ? "mouseup" + "." + nameSpace : "mouseup";

        toggleStatus = this.toggleStatus;
        selectItem = this.selectItem;
        docHide = this.docHide;

        target.on(
          "click",
          {
            self: this
          },
          toggleStatus
        );

        listEl.on(
          "click",
          "li",
          {
            self: this
          },
          selectItem
        );

        listEl.on("animationend", function() {
          var isShow = $(this).hasClass("in");

          if (!isShow) {
            $(this).hide();
          }
        });

        doc.on(
          docEventName,
          {
            self: this
          },
          docHide
        );
      },
      /* 列表展开收缩 */
      toggleStatus: function(event) {
        var self, target, listEl, activeName, isShow;

        self = event.data.self;
        target = self.target;
        listEl = self.listEl;
        activeName = self.activeName;

        isShow = target.hasClass("active");

        if (isShow) {
          target.removeClass(activeName);
          if (isIE9) listEl.hide();
          listEl.removeClass("in").addClass("out");
          return false;
        } else {
          target.addClass(activeName);
          requestAnimationFrame(function() {
            listEl.show();
            listEl.removeClass("out").addClass("in");
          });
        }

        return false;
      },
      selectItem: function(e) {
        var self, txt;

        self = e.data.self;

        txt = $(this)
          .text()
          .trim();
        self.setValue(txt);

        return false;
      },
      docHide: function(e) {
        var self, listEl, isHide, activeName, contAreaObj;

        self = e.data.self;

        listEl = self.listEl;
        isHide = listEl.is(":hidden");

        /* 监听点击空白，如果列表已隐藏，直接退出函数 */
        if (isHide) return false;

        activeName = self.activeName;
        contAreaObj = self.wrap;

        if (
          !contAreaObj.is(e.target) &&
          contAreaObj.has(e.target).length === 0
        ) {
          self.hideList();
        }

        return false;
      },
      setValue: function(txt) {
        var target, listEl, activeName, isReplace;

        target = this.target;
        cb = this.cb;
        listEl = this.listEl;
        activeName = this.activeName;
        isReplace = this.isReplace;

        if (txt && isReplace) target.find("span").text(txt);
        if (cb) cb(txt);

        this.hideList();

        return false;
      },
      hideList: function() {
        var target, listEl, activeName, isActive;

        target = this.target;
        listEl = this.listEl;
        activeName = this.activeName;
        isActive = target.hasClass("active");

        if (isActive) {
          target.removeClass(activeName);
          listEl.removeClass("in").addClass("out");
        }

        if (isIE9) {
          listEl.hide();
        }
      }
    };

    function Fn(opt) {
      return new fn(opt);
    }

    return Fn;
  })();

  /**
   * [DropDownMulti 级联下拉组件封装]
   * @param {Obj} opt 					     调用时传入的参数对象
   * @param {Str} opt.wrap 			     触发对象包裹层
   * @param {Obj} opt.cb           回调函数
   * @param {Fun} cb.getVal				    用户选择值后的回调
   * @param {Fun} cb.secondListReq 		 异步获取二级菜单的数据
   * @param {Fun} cb。thirdListReq 	  异步获取三级菜单的数据
   * @param {Str} opt.joiner 		     级联文字拼接符
   * @param {Str} opt.nameSpace      事件命名空间（可选参）
   * @param {Str} opt.activeName     列表展开时添加的类名（可选参）
   * 预览地址：https://codepen.io/17khba/pen/Gyrxrp
   */
  var DropDownMulti = (function() {
    function fn(opt) {
      var wrap,
        defaults,
        cb,
        listWrapClass,
        listWrap,
        activeName,
        nameSpace,
        setting,
        wrapClass,
        firstList,
        secondList,
        thirdList,
        joiner;

      /* 默认参数 */
      defaults = {
        wrapClass: ".dropdown_area_multi", // 触发区域包裹层类名
        listWrapClass: ".dropDown_list_wrap", // 列表区域包裹层类名
        firstList: ".dropDown_list.first", // 第一级列表类名
        secondList: ".dropDown_list.second", // 第二级列表类名
        thirdList: ".dropDown_list.third", // 第三级列表类名
        cb: null, // 回调函数
        activeName: "active", // 下拉触发标识类名
        joiner: "/", // 级联文字拼接符
        nameSpace: "" // 命名空间
      };

      setting = $.extend({}, defaults, opt);

      wrap = setting.wrap;
      wrapClass = setting.wrapClass;
      listWrapClass = setting.listWrapClass;
      cb = setting.cb;
      activeName = setting.activeName;
      nameSpace = setting.nameSpace;
      firstList = setting.firstList;
      secondList = setting.secondList;
      thirdList = setting.thirdList;
      joiner = setting.joiner;

      this.wrap = $(wrap);
      this.target = this.wrap.children("p");
      this.wrapClass = $(wrapClass);
      this.index = this.wrapClass.index(this.wrap);
      this.listWrap = $(listWrapClass).eq(this.index);
      this.firstList = this.listWrap.find(firstList);
      this.secondList = this.listWrap.find(secondList);
      this.thirdList = this.listWrap.find(thirdList);
      this.joiner = joiner;
      this.firstTxt = "";
      this.secondTxt = "";
      this.result = [];
      this.cb = cb;

      this.activeName = activeName;
      this.nameSpace = nameSpace;

      // 列表位置信息初始化
      this.top = 0;
      this.left = 0;

      this.init();
    }

    fn.prototype = {
      constractor: fn,
      init: function() {
        var self,
          wrap,
          hasWrap,
          target,
          listWrap,
          firstList,
          secondList,
          thirdList,
          showSecond,
          showThird,
          nameSpace,
          docEventName,
          toggleStatus,
          hideListWrap,
          selectItem,
          docHide;

        self = this;
        wrap = this.wrap;
        target = this.target;
        hasWrap = wrap.get(0);

        /* 不存在wrap元素直接退出函数 */
        if (!hasWrap) return false;

        listWrap = this.listWrap;
        firstList = this.firstList.get(0) ? this.firstList : null;
        secondList = this.secondList.get(0) ? this.secondList : null;
        thirdList = this.thirdList.get(0) ? this.thirdList : null;

        nameSpace = this.nameSpace;
        docEventName = nameSpace ? "mouseup" + "." + nameSpace : "mouseup";

        toggleStatus = this.toggleStatus;
        clearTxt = this.clearTxt;
        hideListWrap = this.hideListWrap;
        showSecond = this.showSecond;
        showThird = this.showThird;
        selectItem = this.selectItem;
        docHide = this.docHide;

        target.on(
          "click",
          {
            self: this
          },
          toggleStatus
        );

        target.on(
          "click",
          ".icon_clear",
          {
            self: this
          },
          clearTxt
        );

        listWrap.on(
          "animationend",
          {
            self: this
          },
          hideListWrap
        );

        if (firstList) firstList.on("click", "li", { self: this }, showSecond);
        if (secondList) secondList.on("click", "li", { self: this }, showThird);
        if (thirdList) thirdList.on("click", "li", { self: this }, selectItem);

        doc.on(
          docEventName,
          {
            self: this
          },
          docHide
        );
      },
      /* 列表展开收缩 */
      toggleStatus: function(event) {
        var self, target, listWrap, activeName, isShow;

        self = event.data.self;
        target = self.target;
        listWrap = self.listWrap;
        activeName = self.activeName;

        isShow = target.hasClass("active");

        if (isShow) {
          target.removeClass(activeName);

          if (isIE9) listWrap.hide();

          listWrap.removeClass("in").addClass("out");
          return false;
        } else {
          target.addClass(activeName);

          requestAnimationFrame(function() {
            listWrap.show();

            // 重新设置下拉列表位置
            self.resetPos();

            listWrap.removeClass("out").addClass("in");
          });
        }

        return false;
      },
      clearTxt: function(e) {
        var self, target, oSpan, oInp;

        self = e.data.self;
        target = self.target;
        oSpan = target.children("span");
        oInp = target.children("input");

        oSpan.text("");
        oInp.attr("placeholder", "请选择");
        $(this).remove();

        return false;
      },
      docHide: function(e) {
        var self, wrap, listWrap, isHide, activeName, targetArea, listArea;

        self = e.data.self;

        listWrap = self.listWrap;
        isHide = listWrap.is(":hidden");

        /* 监听点击空白，如果列表已隐藏，直接退出函数 */
        if (isHide) return false;

        activeName = self.activeName;
        targetArea = self.wrap;
        listArea = self.listWrap;

        // 点击触发区域不做处理
        if (targetArea.is(e.target) || targetArea.has(e.target).length !== 0)
          return false;

        if (!listArea.is(e.target) && listArea.has(e.target).length === 0) {
          self.hideList();
        }

        return false;
      },
      // 动画结束隐藏列表
      hideListWrap: function(e) {
        var self, isShow, secondList, thirdList;

        self = e.data.self;
        isShow = $(this).hasClass("in");
        secondList = self.secondList;
        thirdList = self.thirdList;

        if (!isShow) {
          $(this).hide();
          secondList.hide();
          thirdList.hide();
        }

        return false;
      },
      showSecond: function(e) {
        var self,
          txt,
          listWrap,
          secondList,
          thirdList,
          cb,
          setSecondVal,
          result;

        self = e.data.self;
        listWrap = self.listWrap;
        secondList = self.secondList;
        thirdList = self.thirdList;
        result = self.result;
        cb = self.cb;
        txt = $(this)
          .text()
          .trim();
        self.firstTxt = txt;

        // 触发一级条目，隐藏三级菜单
        thirdList.hide();

        setSecondVal = (function() {
          function fn(data) {
            secondList.html(data);
            secondList.css("display", "inline-block");

            self.resetPos();
          }

          return fn;
        })();

        result[0] = txt;

        cb.secondListReq && cb.secondListReq(txt, setSecondVal);

        return false;
      },
      showThird: function(e) {
        var self,
          thirdList,
          firstTxt,
          secondTxt,
          joiner,
          txt,
          cb,
          setThirdVal,
          result;

        self = e.data.self;
        thirdList = self.thirdList;
        firstTxt = self.firstTxt;
        secondTxt = self.secondTxt;
        joiner = self.joiner;
        result = self.result;
        cb = self.cb;
        txt = $(this)
          .text()
          .trim();
        self.secondTxt = txt;

        result[1] = txt;

        if (!thirdList.get(0)) {
          self.setValue(firstTxt + joiner + txt);
          return false;
        }

        setThirdVal = (function() {
          function fn(data) {
            thirdList.html(data);
            thirdList.css("display", "inline-block");

            self.resetPos();
          }

          return fn;
        })();

        cb.thirdListReq && cb.thirdListReq(txt, setThirdVal);

        return false;
      },
      selectItem: function(e) {
        var self, thirdList, firstTxt, secondTxt, joiner, txt, result;

        self = e.data.self;
        thirdList = self.thirdList;
        firstTxt = self.firstTxt;
        secondTxt = self.secondTxt;
        joiner = self.joiner;
        result = self.result;

        txt = $(this)
          .text()
          .trim();
        result[2] = txt;
        self.setValue(firstTxt + joiner + secondTxt + joiner + txt);

        return false;
      },
      setValue: function(txt) {
        var target, oSpan, oInp, hasBtnClear, cb, result;

        target = this.target;
        oSpan = target.children("span");
        oInp = target.children("input");
        hasBtnClear = target.find(".icon_clear").get(0);
        cb = this.cb;
        result = this.result;

        oSpan.text(txt);
        oInp.attr("placeholder", "");
        if (!hasBtnClear) target.append('<i class="icon_clear"></i>');
        if (cb.getVal) cb.getVal(result);

        this.hideList();

        return false;
      },
      hideList: function() {
        var target, listWrap, activeName, isActive;

        target = this.target;
        listWrap = this.listWrap;
        secondList = this.secondList;
        thirdList = this.thirdList;
        activeName = this.activeName;
        isActive = target.hasClass("active");

        if (isActive) {
          target.removeClass(activeName);
          listWrap.removeClass("in").addClass("out");
        }

        if (isIE9) {
          listWrap.hide();
          secondList.hide();
          thirdList.hide();
        }
      },
      getPosition: function(el) {
        var _doc, _width, _height, _top, _left, winWidth, winHeight;

        _doc = document.documentElement || document.body;
        winWidth = _doc.clientWidth;
        winHeight = _doc.clientHeight;

        _width = el.offsetWidth;
        _height = el.offsetHeight;
        _top = 0;
        _left = 0;

        while (el.offsetParent) {
          _top += el.offsetTop;
          _left += el.offsetLeft;
          el = el.offsetParent;
        }

        return {
          w: _width,
          h: _height,
          l: _left,
          t: _top,
          winWidth: winWidth,
          winHeight: winHeight
        };
      },
      resetPos: function() {
        var target, listWrap, pos, top, left, winWidth, listWrapWidth, diff;

        target = this.target;
        listWrap = this.listWrap;
        pos = this.getPosition(target.get(0));
        top = pos.t + pos.h;
        left = pos.l;
        winWidth = pos.winWidth;
        listWrapWidth = 0;

        listWrap.find(".dropDown_list:visible").each(function(index, el) {
          var current = $(el);
          listWrapWidth += current.outerWidth();
        });

        listWrapWidth = listWrapWidth + left;
        diff = listWrapWidth - winWidth;

        if (diff > 0) left = left - diff;

        listWrap.css({
          top: top,
          left: left
        });
      }
    };

    function Fn(opt) {
      return new fn(opt);
    }

    return Fn;
  })();

  /**
   * [Modal 模态框组件封装]
   * @param {Obj} opt          调用时传入的参数对象
   * @param {Str} opt.modal      模态框id名
   * @param {Str} opt.openBtn    触发按钮
   * @param {Str} opt.backDrop    遮罩层名称（可选参）
   * @param {Str} opt.iconClose   模态框关闭按钮名称（可选参）
   * @param {Str} opt.btnCancel   是否替换输入框文字（可选参）
   * @param {Str} opt.btnConfirm  列表展开时添加的类名（可选参）
   * @param {Fun} opt.cb        回调函数（可选参）
   * 预览地址：https://codepen.io/17khba/pen/VyPZpE
   */
  var Modal = (function() {
    function fn(opt) {
      var defaults,
        options,
        modal,
        openBtn,
        backDrop,
        iconClose,
        btnCancel,
        btnConfirm,
        cb;

      defaults = {
        modal: null,
        openBtn: null,
        backDrop: ".modal_backdrop",
        iconClose: ".modal_close",
        btnCancel: ".btn_cancel",
        btnConfirm: ".btn_confirm",
        cb: null
      };

      options = $.extend({}, defaults, opt);

      modal = options.modal;
      openBtn = options.openBtn;
      backDrop = options.backDrop;
      iconClose = options.iconClose;
      btnCancel = options.btnCancel;
      btnConfirm = options.btnConfirm;
      cb = options.cb;

      this.modal = $(modal);
      this.openBtn = $(openBtn);
      this.backDrop = $(backDrop);
      this.iconClose = this.modal.find(iconClose);
      this.btnCancel = this.modal.find(btnCancel);
      this.btnConfirm = this.modal.find(btnConfirm);
      this.cb = cb;
      this.init();
    }

    fn.prototype = {
      constractor: fn,
      init: function() {
        var modal,
          openBtn,
          iconClose,
          backDrop,
          btnCancel,
          btnConfirm,
          showModal,
          hideModal,
          modalHide,
          backDropHide;

        modal = this.modal;
        if (!modal) {
          console.warn("模态窗组件modal对象不存在！");
          return false;
        }

        openBtn = this.openBtn;
        iconClose = this.iconClose;
        backDrop = this.backDrop;
        btnCancel = this.btnCancel;
        btnConfirm = this.btnConfirm;
        showModal = this.showModal;
        hideModal = this.hideModal;

        // 隐藏modal、遮罩层
        modalHide = this.modalHide;
        backDropHide = this.backDropHide;

        openBtn.on("click", { self: this }, showModal);
        iconClose.on("click", { self: this }, hideModal);
        btnCancel.on("click", { self: this }, hideModal);
        btnConfirm.on("click", { self: this }, hideModal);

        modal.on("animationend", { self: this }, modalHide);
        backDrop.on("animationend", { self: this }, backDropHide);
      },
      showModal: function(e) {
        var self, modal, backDrop;

        self = e.data.self;
        modal = self.modal;
        backDrop = self.backDrop;

        requestAnimationFrame(function() {
          modal.show().addClass("open");
          backDrop.show().addClass("open");
        });
      },
      hideModal: function(e) {
        var self, modal, backDrop, isConfirm, isCancel, cb;

        self = e.data.self;
        modal = self.modal;
        backDrop = self.backDrop;
        cb = self.cb;

        modal.removeClass("open");
        backDrop.removeClass("open");

        isConfirm = $(this).hasClass("btn_confirm");
        isCancel = $(this).hasClass("btn_cancel");

        if (isConfirm) cb && cb("confirm");
        if (isCancel) cb && cb("cancel");
      },
      backDropHide: function(e) {
        var self, backDrop, isOpen;

        isOpen = $(this).hasClass("open");
        if (isOpen) return false;

        self = e.data.self;
        backDrop = self.backDrop;

        backDrop.hide();
      },
      modalHide: function(e) {
        var self, modal, isOpen;

        isOpen = $(this).hasClass("open");
        if (isOpen) return false;

        self = e.data.self;
        modal = self.modal;

        modal.hide();
      }
    };

    function modal(opt) {
      return new fn(opt);
    }

    return modal;
  })();

  return {
    datePicker: datePicker,
    checkAll: CheckAll,
    dropDown: DropDown,
    dropDownMulti: DropDownMulti,
    modal: Modal
  };
})(win, doc);

// requestAnimationFrame兼容
(function() {
  var lastTime,
    prefixes,
    prefix,
    requestAnimationFrame,
    cancelAnimationFrame,
    lastTime = 0;
  prefixes = "webkit moz ms".split(" ");
  requestAnimationFrame = window.requestAnimationFrame;
  cancelAnimationFrame = window.cancelAnimationFrame;

  for (var i = 0; i < prefixes.length; i++) {
    if (requestAnimationFrame && cancelAnimationFrame) {
      break;
    }
    prefix = prefixes[i];
    requestAnimationFrame =
      requestAnimationFrame || window[prefix + "RequestAnimationFrame"];
    cancelAnimationFrame =
      cancelAnimationFrame ||
      window[prefix + "CancelAnimationFrame"] ||
      window[prefix + "CancelRequestAnimationFrame"];
  }

  if (!requestAnimationFrame || !cancelAnimationFrame) {
    requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

    cancelAnimationFrame = function(id) {
      window.clearTimeout(id);
    };
  }

  window.requestAnimationFrame = requestAnimationFrame;
  window.cancelAnimationFrame = cancelAnimationFrame;
})();

/**
 * >>>>>>>>>>>>>>>>>>>> 日期选择调用示例 <<<<<<<<<<<<<<<<<<
 */
/* index.datePicker.initSingle({
  el: "#single"
});

index.datePicker.initMultiple({
  el: "#multiple"
});

index.datePicker.initEmpty({
  el: "#emptyInp"
}); */

/**
 * >>>>>>>>>>>>>>>>>>>> 多选调用示例 <<<<<<<<<<<<<<<<<<
 */
/* index.checkAll({
	root: ".multi-select",
	allBot: "#checkAllBot"
}); */

/**
 * >>>>>>>>>>>>>>>>>>>> 下拉组件调用示例 <<<<<<<<<<<<<<<<<<
 */
/* index.dropDown({
  el: '#myDropDown',
  cb: function (txt) {
    console.log(txt);
  }
}); */

/**
 * >>>>>>>>>>>>>>>>>>>> 级联下拉调用示例 <<<<<<<<<<<<<<<<<<
 */
// var getVal, secondListReq, thirdListReq;

// 获取用户选择的值
/* getVal = function(txt) {
  console.log(txt);
}; */

// 异步获取二级菜单数据
/* secondListReq = function(txt, cb) {
  var data, html;

  data = [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月"
  ];
  html = "";

  for (var i = 0; i < data.length; i++) {
    data[i] = "<li>" + txt + "-" + data[i] + "</li>";
    html += data[i];
  }

  cb(html);
}; */

// 异步获取三级菜单数据
/* thirdListReq = function(txt, cb) {
  var data, html;

  data = [];
  html = "";

  for (var i = 1; i <= 31; i++) {
    data[i] = "<li>" + i + "号</li>";
    html += data[i];
  }

  cb(html);
}; */

/* index.dropDownMulti({
  wrap: "#myDropDown",
  cb: {
    getVal: getVal,
    secondListReq: secondListReq,
    thirdListReq: thirdListReq
  }
});

index.dropDownMulti({
  wrap: "#my",
  cb: {
    getVal: getVal,
    secondListReq: secondListReq
  }
}); */

/**
 * >>>>>>>>>>>>>>>>>>>> 模态窗调用示例 <<<<<<<<<<<<<<<<<<
 */
/* index.modal({
  modal: '#set_price',
  openBtn: '#btn',
  cb: modalCb
});

function modalCb (cb) {
  if (cb === 'confirm') modalConfirm && modalConfirm();
  if (cb === 'cancel') modalCancel && modalCancel();
}

function modalConfirm() {
  alert('您点击了确定按钮');
}

function modalCancel() {
  alert('您点击了取消按钮');
} */
