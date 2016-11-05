export default function enumerable(obj, key) {
  if (!obj || typeof obj !== 'object') return;
  // console.log(typeof obj, Array.isArray(obj));
  if (Array.isArray(obj)) {
    obj.forEach(o => {
      // console.log(o);
      enumerable(o);
    });
  } else {
    console.log(obj);
    // Object.keys(obj).forEach(o => {
    //   if (typeof obj[o] === 'object') {
    //     enumerable(obj[o]);
    //   }
    // });
    Object.defineProperty(obj, key || 'password', {
      enumerable: false
    });
  }
}
