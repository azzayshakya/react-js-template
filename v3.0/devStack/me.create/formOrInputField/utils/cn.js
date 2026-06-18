// For utility files like the cn.js function (which handles conditional class name concatenation).

export function cn(...args) {
    return args.filter(Boolean).join(' ');
  }