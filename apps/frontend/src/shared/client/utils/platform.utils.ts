export const Platform = {
  get isMac() {
    return /Mac/i.test(navigator.userAgent) && !/iPhone|iPad|iPod/i.test(navigator.userAgent);
  },

  get isWindows() {
    return /Win/i.test(navigator.userAgent);
  },

  get isLinux() {
    return /Linux/i.test(navigator.userAgent) && !/Android/i.test(navigator.userAgent);
  },

  get isIOS() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  },

  get isAndroid() {
    return /Android/i.test(navigator.userAgent);
  },

  get isApple() {
    return this.isMac || this.isIOS;
  },

  get isMobile() {
    return this.isIOS || this.isAndroid;
  },

  get modifierKey() {
    return this.isMac ? '⌘' : 'Ctrl';
  },
};
