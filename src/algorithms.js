define(["simpleboyermoore"], function (f_simplebm) {
  var algorithms = {
    simpleboyermoore: function (pattern, text) {
      return f_simplebm(pattern, text);
    },
  };

  return {
    list: [["simpleboyermoore", "Boyer-Moore-Horspool"]],
    run: function (algorithm_name, pattern, text) {
      return algorithms[algorithm_name](pattern, text);
    },
  };
});
