// ==UserScript==
// @name         Cat News Network
// @version      0.1
// @description  Replaces images on CNN with images from www.thecatapi.com
// @author       Jordan Neufeld <jordan@neufeldtech.com>
// @updateURL    https://raw.githubusercontent.com/neufeldtech/userscripts/master/cat-news-network.user.js
// @match        http://www.cnn.com/*
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// ==/UserScript==


function doit() {
  var images = document.querySelectorAll('img');
  for (var image of images) {
    console.log(image);
    image.src = `https://thecatapi.com/api/images/get?format=src&type=jpg&_=${Math.random()}`;
  }
}
$(document).ready(function () {
  $('body').prepend('<button id="kittykat" style="position:fixed; top:50px; right:0px; z-index:10000000" >This is too sad</button>');
  $('#kittykat').click(function () {
    doit();
  });
});
