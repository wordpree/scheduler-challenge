"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _bryntum$scheduler = bryntum.schedulerpro,
    BrowserHelper = _bryntum$scheduler.BrowserHelper,
    Popup = _bryntum$scheduler.Popup,
    DomHelper = _bryntum$scheduler.DomHelper,
    Toast = _bryntum$scheduler.Toast;

var TrialPanel = /*#__PURE__*/function (_Popup) {
  _inherits(TrialPanel, _Popup);

  var _super = _createSuper(TrialPanel);

  function TrialPanel() {
    _classCallCheck(this, TrialPanel);

    return _super.apply(this, arguments);
  }

  _createClass(TrialPanel, [{
    key: "construct",
    value: function construct() {
      _get(_getPrototypeOf(TrialPanel.prototype), "construct", this).apply(this, arguments);

      this.widgetMap.productField.value = this.productId;
    }
  }, {
    key: "onSubmitClick",
    value: function onSubmitClick() {
      if (!this.isValid) {
        return;
      }

      this.addToMailList();
      this.triggerDownload();
    }
  }, {
    key: "addToMailList",
    value: function addToMailList() {
      var _this$widgetMap = this.widgetMap,
          trackingField = _this$widgetMap.trackingField,
          redirectField = _this$widgetMap.redirectField,
          listNameField = _this$widgetMap.listNameField,
          companyField = _this$widgetMap.companyField,
          productId = this.values.productId;
      trackingField.value = BrowserHelper.getCookie('aw');
      redirectField.value = location.href;
      companyField.input.name = 'custom company';

      switch (productId) {
        case 'gantt':
          listNameField.value = 'awlist5314739';
          break;

        case 'schedulerpro':
        case 'schedulerpro':
          listNameField.value = 'awlist5074881';
          break;

        case 'grid':
          listNameField.value = 'awlist5074883';
          break;
      }

      this.bodyElement.submit();
    }
  }, {
    key: "onCancelClick",
    value: function onCancelClick() {
      this.hide();
    }
  }, {
    key: "triggerDownload",
    value: function triggerDownload() {
      var me = this,
          _me$values = me.values,
          name = _me$values.name,
          email = _me$values.email,
          company = _me$values.company;
      var productId = me.values.productId;

      switch (productId) {
        case 'gantt':
        case 'schedulerpro':
        case 'calendar':
          productId = "".concat(productId, "-vanilla");
          break;
      }

      var a = DomHelper.createElement({
        parent: document.body,
        tag: 'a',
        download: "bryntum-".concat(productId, "-trial.zip"),
        href: "/do_download.php?product_id=".concat(productId, "&thename=").concat(name, "&email=").concat(email, "&company=").concat(company)
      });
      DomHelper.createElement({
        parent: document.head,
        tag: 'script',
        async: 'true',
        src: 'https://www.googletagmanager.com/gtag/js?id=UA-11046863-1',
        onload: me.trackDownload
      });
      a.click();
      a.parentElement.removeChild(a);
      me.hide();
      Toast.show({
        html: 'Download starting, please wait...',
        timeout: 10000
      });

      if (!me.gaScript) {
        me.gaScript = DomHelper.createElement({
          parent: document.head,
          tag: 'script',
          async: 'true',
          src: 'https://www.googletagmanager.com/gtag/js?id=UA-11046863-1',
          onload: me.trackDownload
        });
      }
    } // Google Analytics

  }, {
    key: "bodyConfig",
    get: function get() {
      return Object.assign(_get(_getPrototypeOf(TrialPanel.prototype), "bodyConfig", this), {
        tag: 'form',
        method: 'post',
        target: 'aweberFrame',
        action: 'https://www.aweber.com/scripts/addlead.pl'
      });
    }
  }], [{
    key: "trackDownload",
    value: function trackDownload() {
      window.dataLayer = window.dataLayer || [];

      function gtag() {
        window.dataLayer.push(arguments);
      }

      gtag('event', 'conversion', {
        send_to: 'AW-1042491458/eweSCPibpAEQwtCM8QM',
        value: 1.0,
        currency: 'USD'
      });
    }
  }, {
    key: "type",
    // Factoryable type name
    get: function get() {
      return 'trialpanel';
    }
  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        width: 400,
        anchor: true,
        title: 'Please complete fields',
        defaults: {
          labelWidth: 100
        },
        items: [{
          type: 'textfield',
          label: 'Name <sup>*</sup>',
          name: 'name',
          ref: 'nameField',
          required: true
        }, {
          type: 'textfield',
          inputType: 'email',
          label: 'Email <sup>*</sup>',
          name: 'email',
          ref: 'emailField',
          required: true
        }, {
          type: 'textfield',
          label: 'Company <sup>*</sup>',
          name: 'company',
          ref: 'companyField',
          required: true
        }, {
          type: 'combo',
          label: 'Product',
          editable: false,
          ref: 'productField',
          name: 'productId',
          style: 'margin-bottom : 0',
          items: [{
            id: 'calendar',
            downloadId: 'calendar-vanilla',
            text: 'Bryntum Calendar'
          }, {
            id: 'gantt',
            downloadId: 'gantt-vanilla',
            text: 'Bryntum Gantt'
          }, {
            id: 'grid',
            downloadId: 'grid',
            text: 'Bryntum Grid'
          }, {
            id: 'schedulerpro',
            downloadId: 'schedulerpro-vanilla',
            text: 'Bryntum Scheduler'
          }, {
            id: 'schedulerpro',
            downloadId: 'schedulerpro',
            text: 'Bryntum Scheduler Pro'
          }],
          required: true
        }, {
          type: 'textfield',
          inputType: 'hidden',
          ref: 'listNameField',
          name: 'listname'
        }, {
          type: 'textfield',
          inputType: 'hidden',
          ref: 'trackingField',
          name: 'custom meta_adtracking'
        }, {
          type: 'textfield',
          inputType: 'hidden',
          ref: 'redirectField',
          name: 'redirect'
        }, {
          type: 'textfield',
          inputType: 'hidden',
          name: 'meta_message',
          value: '1'
        }, {
          type: 'textfield',
          inputType: 'hidden',
          name: 'meta_required',
          value: 'name,email,custom company'
        }, {
          type: 'textfield',
          inputType: 'hidden',
          name: 'meta_forward_vars',
          value: '0'
        }],
        bbar: [{
          type: 'widget',
          flex: 1
        }, {
          text: 'Cancel',
          width: 100,
          onClick: 'up.onCancelClick'
        }, {
          text: 'Submit',
          width: 100,
          cls: 'b-blue',
          onClick: 'up.onSubmitClick'
        }]
      };
    }
  }]);

  return TrialPanel;
}(Popup);

; // Register this widget type with its Factory

TrialPanel.initClass();