const htmlmin = require("html-minifier");
const markdownIt = require("markdown-it");
const markdownItAttrs = require('markdown-it-attrs');
const pluginTOC = require('eleventy-plugin-nesting-toc');

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(pluginTOC);
    eleventyConfig.setUseGitIgnore(false);
  
    eleventyConfig.addWatchTarget("./_tmp/style.css");
  
    eleventyConfig.addPassthroughCopy({ "./_tmp/style.css": "./style.css" });
    eleventyConfig.addPassthroughCopy("svg");
    eleventyConfig.addPassthroughCopy("img");
  
    eleventyConfig.addShortcode("version", function () {
      return String(Date.now());
    });

    eleventyConfig.setLibrary("md", markdownIt({
        html: true,
        breaks: true,
        linkify: true
      }).use(markdownItAttrs, {
        allowedAttributes: []  // empty array = all attributes are allowed
      }));

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