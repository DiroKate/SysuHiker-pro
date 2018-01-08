import { EditorState, ContentState, convertToRaw } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';

const { createFromBlockArray } = ContentState;
const { createWithContent, createEmpty } = EditorState;

export const htmlToEditorState = (htmlContent) => {
  if (htmlContent) {
    const blocksFromHtml = htmlToDraft(htmlContent);
    const { contentBlocks } = blocksFromHtml;
    const contentState = createFromBlockArray(contentBlocks);
    return createWithContent(contentState);
  } else {
    return createEmpty();
  }
};

/**
 * 提取编辑器内容，并作空值判断
 * @param  {object} editorState [编辑器状态]
 * @return {object}             [返回值包括contentValue，和isEmpty]
 */
export const editorStateToHtml = (editorState) => {
  return {
    contentValue: editorState ? draftToHtml(convertToRaw(editorState.getCurrentContent())) : null,
    isEmpty: editorState.getCurrentContent().getPlainText().length < 1,
  };
};

export const uploadImageCallBack = (file) => {
  return new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://api.imgur.com/3/image');
      xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
      const data = new FormData();
      data.append('image', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    }
  );
};
