import { Injectable } from '@angular/core';

@Injectable()
export class CookiesHelperService {
  constructor() {}

  setCookie(name: string, value: string | number, days = 7) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(
      value
    )}; expires=${expires}; path=/`;
  }

  getCookie(name: string) {
    const match = document.cookie.match(
      new RegExp('(^| )' + name + '=([^;]+)')
    );
    return match ? decodeURIComponent(match[2]) : null;
  }

  removeCookie(name: string) {
    document.cookie = `${name}=; Max-Age=0; path=/`;
  }
}
