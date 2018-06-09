'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = uploadImage;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _quill = require('quill');

var _quill2 = _interopRequireDefault(_quill);

var _quillDelta = require('quill-delta');

var _quillDelta2 = _interopRequireDefault(_quillDelta);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function uploadImage(quill, upload) {
  (0, _invariant2.default)(quill instanceof _quill2.default, '[quill-plugin-image]: Param quill should be Quill instance');
  (0, _invariant2.default)(typeof upload === 'function', '[quill-plugin-image]: Param upload should be function, but got ' + (typeof upload === 'undefined' ? 'undefined' : _typeof(upload)));

  quill.getModule('toolbar').addHandler('image', function () {
    var input = window.document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('multiple', false);
    input.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');

    input.addEventListener('change', function () {
      if (input.files != null && input.files[0] != null) {
        var range = quill.getSelection(true);

        upload(input.files[0]).then(function (data) {
          var _ref = typeof data === 'string' ? { src: data } : data,
              image = _ref.src,
              attributes = _objectWithoutProperties(_ref, ['src']);

          quill.updateContents(new _quillDelta2.default().retain(range.index).delete(range.length).insert({ image: image }, attributes), 'user');

          // APIs causing text to change may also be called with a "silent" source,
          // in which case text-change will not be emitted. 
          quill.setSelection(range.index + 1, 'silent');
          input.value = "";
        });
      }
    });

    input.click();
  });
}