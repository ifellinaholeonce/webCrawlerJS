var expect = require("chai").expect;
var converter = require("../app/crawler");



//This isn't quite right because crawler doesn't receive the link it receives the body. Must adjust.

describe("Crawl Links and index them", function() {
  describe("Get links from seed page", function() {
  	it("indexes the links", function() {
      var seed = 'http://econpy.pythonanywhere.com/ex/001.html';
      var links = crawler.crawl(seed);

      expect(links).to.equal("");


    });
  });

