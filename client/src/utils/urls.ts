export const BASE_URL = import.meta.env.VITE_BE_BASE_URL as string
export const LOGIN_URL = BASE_URL + import.meta.env.VITE_BE_LOGIN_URL
export const SIGNUP_URL = BASE_URL + import.meta.env.VITE_BE_REGISTER_URL
export const LOGOUT_URL = BASE_URL + import.meta.env.VITE_BE_LOGOUT_URL
export const REFRESH_TOKEN_URL =
  BASE_URL + import.meta.env.VITE_BE_REFRESH_TOKEN

export const INBOXES_URL = BASE_URL + import.meta.env.VITE_BE_INBOXES_URL
export const CHAT_URL = BASE_URL + import.meta.env.VITE_BE_CHAT_URL
export const RESET_UNREAD_MESSAGES_URL =
  BASE_URL + import.meta.env.VITE_BE_RESET_UNREAD_MESSAGES_URL
export const USERS_BY_EMAIL =
  BASE_URL + import.meta.env.VITE_BE_USERS_BY_EMAIL_URL
