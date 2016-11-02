export default function(obj, key) {
  Object.defineProperty(obj, key || "password", {
    enumerable: false
  });
}
