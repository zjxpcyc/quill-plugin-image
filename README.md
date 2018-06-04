# quill-plugin-image

Change quill default actions when insert images.

[Quill](https://quilljs.com/docs/quickstart/) 是很不错的富文本编辑器。

自带的图片插入功能默认是自动插入 Base64 图片字串，这个 plugin 或者叫拓展修改了这种默认行为，而是将插入的行为 通过 Promise 暴露出来, 自己主导上传行为。
