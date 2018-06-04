import Quill from 'react-quill';

const BlockEmbed = Quill.import('blots/block/embed');
class ImageBlot extends BlockEmbed {
  static create(value) {
    let node = super.create();

    if (typeof value === 'object') {
      node.setAttribute('alt', value.alt);
      node.setAttribute('src', value.src);
    } else {
      node.setAttribute('alt', '');
      node.setAttribute('src', value);
    }

    return node;
  }

  static value(node) {
    return {
      alt: node.getAttribute('alt'),
      url: node.getAttribute('src')
    };
  }
}
ImageBlot.blotName = 'image';
ImageBlot.tagName = 'img';
Quill.register(ImageBlot);

export default function uploadImage(quill, upload) {
  quill.getModule('toolbar').addHandler('image', () => {
    const input = window.document.createElement('input');
    input.type = 'file';
    input.accept = 'image/jpeg,image/png,image/gif,image/webp';
    input.multiple = false;

    input.onchange = (e) => {
      const file = e.target.files[0];
      upload(file).then((image) => {
        const range = quill.getSelection();
        if (range) {
          quill.insertEmbed(range.index, 'image', image);
        }
      });
    }

    input.click();
  });
}
