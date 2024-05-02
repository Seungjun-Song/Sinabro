import styled from 'styled-components'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const StyledEditor = styled.div`
  width: 100%; // CKEditor 컨테이너 너비를 100%로 설정
  .ck.ck-editor {
    width: 100%; // 에디터 자체의 너비를 100%로 설정
    margin: auto;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f8f8f8;
  }

  .ck.ck-content {
    min-height: 500px;
  }
`;

const CkEditor = ({ setContent }) => {

    const edrtorConfiguration = {
		toolbar: {
			items: [
				'heading',
				'|',
				'bold',
				'italic',
				'link',
				'bulletedList',
				'numberedList',
				'|',
				'outdent',
				'indent',
				'|',
				'blockQuote',
				'undo',
				'redo'
			]
		},
		language: 'ko',
		image: {
			toolbar: [
				'imageTextAlternative',
				'toggleImageCaption',
				'imageStyle:inline',
				'imageStyle:block',
				'imageStyle:side',
				'linkImage'
			]
		},
		table: {
			contentToolbar: [
				'tableColumn',
				'tableRow',
				'mergeTableCells',
				'tableCellProperties',
				'tableProperties'
			]
		}
    };

    return(
        <StyledEditor>
        <CKEditor
            editor={ClassicEditor}
            config={edrtorConfiguration}
            placeholder={"프로젝트를 설명해 주세요!"}
            
            onReady={editor => {
                // You can store the "editor" and use when it is needed.

            }}
            onChange={(event, editor) => {
                setContent(editor.getData());
            }}
        />

        </StyledEditor>
    )
}

export default CkEditor;