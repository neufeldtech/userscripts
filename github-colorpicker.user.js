// ==UserScript==
// @name         Github colorpicker
// @namespace    github.com
// @version      0.3.0
// @description  Change colour bar in Github
// @author       Jordan Neufeld <jordan@neufeldtech.com>
// @match        https://*.github.com/*
// @updateURL    https://raw.githubusercontent.com/neufeldtech/userscripts/master/github-colorpicker.user.js
// @grant        none
// @require      https://code.jquery.com/jquery-3.1.0.min.js
// ==/UserScript==

$(document).ready(function(){
  function invertHex(hexnum){
    hexnum = hexnum.replace('#','');
    hexnum = hexnum.toUpperCase();
    var splitnum = hexnum.split("");
    var resultnum = "";
    var simplenum = "FEDCBA9876".split("");
    var complexnum = [];
    complexnum.A = "5";
    complexnum.B = "4";
    complexnum.C = "3";
    complexnum.D = "2";
    complexnum.E = "1";
    complexnum.F = "0";

    for(i=0; i<6; i++){
      if(!isNaN(splitnum[i])) {
        resultnum += simplenum[splitnum[i]];
      } else if(complexnum[splitnum[i]]){
        resultnum += complexnum[splitnum[i]];
      } else {
        return false;
      }
    }
    return resultnum;
  }

  function applyColors(color){
    $('a.header-logo-invertocat, a.header-nav-link').css('color', '#' + invertHex(color));
    $('header').css('background-color', color);
  }

  $('ul.dropdown-menu').append('<li><a class="dropdown-item colorpicker-button" href="#/">🎨 Change color</a></li><input id="cpicker" style="display:none" type="color">');
  $('a.colorpicker-button').click(function(){
    document.getElementById('cpicker').focus();
    document.getElementById('cpicker').value = localStorage.getItem('savedColor')|| '#000000';
    document.getElementById("cpicker").click();

  });

  $('#cpicker').on('input', function() {
    var color = document.getElementById('cpicker').value;
    applyColors(color);
    localStorage.setItem('savedColor',color);
  });

  function initColor(){
    var color = localStorage.getItem('savedColor');
    if (color){
      applyColors(color);
    }
  }
  initColor();
});

