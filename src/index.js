import invariant from 'invariant';
import Quill from 'quill';
import Delta from 'quill-delta';

export default function uploadImage(quill, upload) {
  invariant(quill instanceof Quill, '[quill-plugin-image]: Param quill should be Quill instance');
  invariant(typeof upload === 'function', `[quill-plugin-image]: Param upload should be function, but got ${typeof upload}`);

  quill.getModule('toolbar').addHandler('image', () => {
    const input = window.document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('multiple', false);
    input.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');

    input.addEventListener('change', () => {
      if (input.files != null && input.files[0] != null) {
        let range = quill.getSelection(true);

        upload(input.files[0]).then((data) => {
          const { src: image, ...attributes } = typeof data === 'string' ? { src: data } : data;

          quill.updateContents(
            new Delta()
              .retain(range.index)
              .delete(range.length)
              .insert({ image }, attributes),
            'user',
          );

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
