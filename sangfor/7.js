console.log((function(v) {
   return v && arguments.callee(v-1)+v || 1;
})(10));