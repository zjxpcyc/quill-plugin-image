# quill-plugin-image

Change quill default actions when insert images.

[Quill](https://quilljs.com/docs/quickstart/) 是很不错的富文本编辑器。

自带的图片插入功能默认是自动插入 Base64 图片字串，这个 plugin 或者叫拓展修改了这种默认行为，而是将插入的行为 通过 Promise 暴露出来, 自己主导上传行为。

如果，这个扩展的功能对您来说太少，可以去试试  [NextBoy/quill-image-extend-module](https://github.com/NextBoy/quill-image-extend-module)

## Install 安装

```bash
npm install quill-plugin-image --save
```

## Useage 使用
```javascript
// es6 引入
import uploadImage from 'quill-plugin-image';

// var quill = new Quill();

// param: quill - the quill instance
// param: function -  file => Promise
uploadImage(quill, ((file) => {
  // 菊花转
  // loadding.start();

  // 1. 直接转 base64
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        base64String = e.target.result;

        
        // loadding.stop();

        // or resolve({ src: base64String, alt: file.name });
        resolve(base64String);
    };
    reader.readAsDataURL(file);
  });

  // 2. ajax 或者 fetch 远程上传
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('any-name', file);

    fetch(
      'http://somedomain/path/to/your/upload/api',
      {
        body: formData,
        method: 'POST',
      }
    ).then(data => {
      // loadding.stop();

      // resolve 可以是 string 图片地址
      // 也可以是对象, 属性值是同 html img 元素一致
      resolve({ src: data.url, alt: data.alt || file.name });
    });
  });

  // 3. 获取其他的控制
  // 比如 jquery/zepto 上传, 进度条显示等
  // TODO:
}));
```