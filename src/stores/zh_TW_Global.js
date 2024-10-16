/**
 * 定義自定義的訊息 for VeeValidate
 *
 */
export const customMessages = {
  names: {
    title: '標題',
    content: '內文',
    name: '暱稱',
    password: '密碼',
    password_confirm: '確認密碼',
    oldpassword: '舊密碼',
  },
  messages: {
    required: '{field} 不可空白。',
    email: '請輸入有效的 {field}',
    min: '{field} 至少需要有 0:{length} 個字',
    confirmed: '兩次密碼不一致',
  },
  fields: {
    comment: {
      required: '留言內容不可空白。',
    },
  },
};
