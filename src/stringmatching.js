require(["algorithms"], function (algorithms) {
  function ascii_only(s) {
    var c,
      ordc,
      filtered = "";
    for (var i = 0; i < s.length; i++) {
      c = s[i];
      ordc = c.charCodeAt(0);
      if (ordc >= 32 && ordc < 256) {
        filtered += c;
      }
    }
    return filtered;
  }

  var app = new Vue({
    el: "#app",

    data: {
      textInput: "the mathematical theory",
      patternInput: "thema",
      text: "",
      pattern: "",
      comparisons: [],
      comparisonIndex: -1,
      comparisonIndexString: "", // Slider controls this (it's a string!)
      matches: [],
      algorithm: "simpleboyermoore",
      toggledescription: false,
      togglestats: true,
      togglegraphblurb: false,
    },

    created: function () {
      this.start();
    },

    watch: {
      textInput: function () {
        this.start();
      },
      patternInput: function () {
        this.start();
      },
      comparisonIndexString: function () {
        this.comparisonIndex = parseInt(this.comparisonIndexString);
      },
      comparisonIndex: function () {
        this.comparisonIndexString = "" + this.comparisonIndex;
      },
    },

    methods: {
      start: function () {
        var searchRecord;
        this.text = this.textInput;
        this.pattern = this.patternInput;
        if (this.algorithm.includes("oyer")) {
          this.text = ascii_only(this.text);
          this.pattern = ascii_only(this.pattern);
        }
        searchRecord = algorithms.run(this.algorithm, this.pattern, this.text);
        this.comparisons = searchRecord.comparisons;
        this.matches = searchRecord.matches;
        this.comparisonIndex = 0;
      },
      textClass: function (iPlus1) {
        var i = iPlus1 - 1,
          style = "table-char";
        if (i === this.i) {
          style += " current";
          if (this.text[i] == this.pattern[i - this.patternPos]) {
            style += " match";
          }
        }
        return style;
      },
      patternClass: function (iPlus1) {
        var i = iPlus1 - 1,
          style = "table-char";
        if (i - this.patternPos === this.j) {
          style += " current";
          if (this.text[i] == this.pattern[i - this.patternPos]) {
            style += " match";
          }
        }
        return style;
      },
      patternChar: function (i) {
        // The character in the pattern corresponding to i in text.
        // Blank if no such character
        if (i >= this.patternPos && i < this.patternPos + this.pattern.length) {
          return this.pattern[i - this.patternPos];
        } else {
          return " ";
        }
      },
      next: function () {
        if (this.comparisonIndex < this.comparisons.length - 1) {
          this.comparisonIndex += 1;
        }
      },
      previous: function () {
        if (this.comparisonIndex > 0) {
          this.comparisonIndex -= 1;
        }
      },
    },

    computed: {
      n: function () {
        return this.text.length;
      },
      m: function () {
        return this.pattern.length;
      },
      i: function () {
        if (this.comparisons.length > 0 && this.comparisonIndex >= 0) {
          return this.comparisons[this.comparisonIndex][0];
        } else {
          return 0;
        }
      },
      j: function () {
        if (this.comparisons.length > 0 && this.comparisonIndex >= 0) {
          return this.comparisons[this.comparisonIndex][1];
        } else {
          return 0;
        }
      },
      patternPos: function () {
        return this.i - this.j;
      },
      nextDisabled: function () {
        if (
          this.comparisonIndex >= 0 &&
          this.comparisonIndex < this.comparisons.length - 1
        ) {
          return false;
        } else {
          return true;
        }
      },
      previousDisabled: function () {
        if (this.comparisonIndex > 0) {
          return false;
        } else {
          return true;
        }
      },
      comparisonsMax: function () {
        return this.comparisons.length - 1;
      },
      algorithmList: function () {
        return algorithms.list;
      },
      sourceurl: function () {
        return "./src/" + this.algorithm + ".js";
      },
    },
  });
});
