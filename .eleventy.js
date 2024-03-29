const htmlmin = require("html-minifier");
const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const pluginTOC = require("eleventy-plugin-nesting-toc");
const debug = require("debug")("Eleventy:TsDevEleventyLog");
const jsdom = require("jsdom");
const sass = require("sass");

// code-prettify-google is typically ran in the DOM env, so we need to
// create a virtual DOM for it.
window = new jsdom.JSDOM().window;
document = window.document;
navigator = window.navigator;

const prettify = require("code-prettify-google/src/node_prettify");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginTOC);
  eleventyConfig.addTemplateFormats("scss");

  // Creates the extension for use
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css", // optional, default: "html"

    // `compile` is called once per .scss file in the input directory
    compile: async function(inputContent) {
      let result = sass.compileString(inputContent);

      // This is the render function, `data` is the full data cascade
      return async (data) => {
        return result.css;
      };
    }
  });

  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addWatchTarget("./_tmp/style.css");
  eleventyConfig.addWatchTarget("./js/");

  eleventyConfig.addPassthroughCopy({ "./_tmp/style.css": "./style.css" });
  eleventyConfig.addPassthroughCopy("svg");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("js");

  eleventyConfig.addShortcode("version", function () {
    return String(Date.now());
  });

  eleventyConfig.setLibrary(
    "md",
    markdownIt({
      html: true,
      breaks: false,
      linkify: true,
      highlight: highlighter,
    }).use(markdownItAttrs, {
      allowedAttributes: [], // empty array = all attributes are allowed
    })
  );

  // eleventyConfig.addMarkdownHighlighter(markdownPrismJs());

  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (
      process.env.ELEVENTY_PRODUCTION &&
      outputPath &&
      outputPath.endsWith(".html")
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });
};

function highlighter(str, language, attrs) {
  if (!language) {
    // empty string means defer to the upstream escaping code built into markdown lib.
    return "";
  }
  
  const safeStr = str.replace('<', '&lt;').replace('>', '&gt;');
  html = prettify.prettyPrintOne(safeStr, "ts");
  // wrap with a div, so we can style code with .good and .bad
  return `<div>${html}</div>`;
}
