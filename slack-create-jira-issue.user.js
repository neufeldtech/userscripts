// ==UserScript==
// @name         Create Jira Issue From PrairieTech Slack
// @updateURL
// @namespace    *://prairietech.slack.com
// @match        *://prairietech.slack.com/*
// @connect      jira.neufeldtech.com
// @version      0.0.1
// @description  Create a Jira Issue directly from Slack
// @author       Jordan Neufeld <jordan@neufeldtech.com>
// @grant        GM_xmlhttpRequest
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAYAAADnRuK4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RURGRkFFNDMyQ0MzMTFFNEIyOEZENUFCNUVGM0NEN0YiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RURGRkFFNDQyQ0MzMTFFNEIyOEZENUFCNUVGM0NEN0YiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1RjdERTc1QzJDQzIxMUU0QjI4RkQ1QUI1RUYzQ0Q3RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFREZGQUU0MjJDQzMxMUU0QjI4RkQ1QUI1RUYzQ0Q3RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuWzsQ8AAAr2SURBVHja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
// ==/UserScript==
var jiraURL = "http://jira.neufeldtech.com:8888";
var jiraIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAYAAADnRuK4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RURGRkFFNDMyQ0MzMTFFNEIyOEZENUFCNUVGM0NEN0YiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RURGRkFFNDQyQ0MzMTFFNEIyOEZENUFCNUVGM0NEN0YiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1RjdERTc1QzJDQzIxMUU0QjI4RkQ1QUI1RUYzQ0Q3RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFREZGQUU0MjJDQzMxMUU0QjI4RkQ1QUI1RUYzQ0Q3RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuWzsQ8AAAr2SURBVHja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";
(function () {
  'use strict';
  $(document).ready(function () {
    function populateForm(issueReporter, issueReporterUsername, issueText) {
      $('#jira-form-container').show();
      var issueChannel = $('#channel_title').text();
      var issueDescription = 'Issue reported in ' +
        issueChannel +
        ' by ' +
        issueReporter +
        '.\n{quote}\n' +
        issueText +
        '{quote}';
      var issueSummary = 'Issue reported by: ' + issueReporter;
      $("#jira-form input[name='jira-issue-username']").val(function () { return issueReporterUsername; });
      $("#jira-form input[name='jira-issue-summary']").val(function () { return issueSummary; });
      $("#jira-form textarea[name='jira-issue-description']").val(function () { return issueDescription; });
      $("#jira-form input[name='jira-issue-summary']").focus();
    }
    function createIssue(issueType, issueSummary, issueDescription, issueReporterUsername, issueCategory) {
      var issueObject = {};
      issueObject.fields = { 'project': { key: 'OPS' }, 'summary': '', 'description': '', 'issuetype': { 'name': issueType || 'Task' } };
      issueObject.fields.summary = issueSummary || 'Issue reported in Slack';
      issueObject.fields.description = issueDescription || 'Issue description goes here';
      if (issueCategory) {
        issueObject.fields.customfield_10501 = { "id": issueCategory };
      }
      GM_xmlhttpRequest({
        method: "POST",
        url: jiraURL + "/rest/api/latest/issue/",
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Accept": "application/json",
          "content-type": "application/json",
          "cache-control": "no-cache",
        },
        data: JSON.stringify(issueObject),
        onload: function (response) {
          if (response.status === 201) {
            var responseObject = JSON.parse(response.responseText);
            var issueNumber = responseObject.key;
            $('#msg_input > .ql-editor > p')[0].innerHTML = '@' + issueReporterUsername +
              ' Thank-you, ' +
              issueNumber +
              ' has been created for tracking your issue';
            $('#jira-form-container').hide();
            $('#msg_input').focus();
            $("#jira-issue-category").prop('selectedIndex', 0); //reset issue category
            $("#jira-issue-category").attr("disabled", false); //reset disabled property
            $("#jira-issue-type").prop('selectedIndex', 0); //reset issue type

          } else {
            TS.generic_dialog.alert("An error occurred. Please make sure you are logged into " + jiraURL, "Oops!", "Ok");
            TS.error('Response: ' + JSON.stringify(response));
          }
        },
        onerror: function (response) {
          TS.generic_dialog.alert("An error occurred connecting to " + jiraURL, "Oops!", "Ok");
          TS.error('Response: ' + JSON.stringify(response));
        }
      });
    }
    //Inject jira form and bind events
    var jiraFormHtml = `
<div id='jira-form-container'>
<style>
#jira-form-container {
display: none;
}

#jira-form {
position: absolute;
left: 120px;
right: 0px;
top: 60px;
margin-left: auto;
margin-right: auto;
z-index: 1050;
width: 300px;
background-color: rgba(200, 200, 200, 0.85);
border-radius: 7px;
padding: 6px;
}

button.jira-form {
float: right;
}

a.jira-form {
float: left;
}

input.jira-form,
textarea.jira-form,
select.jira-form {
font-size: .8em;
width: 300px;
}
</style>
<form id='jira-form'>
<select id='jira-issue-type' tabindex='2' class='jira-form' name='jira-issue-type'>
<option value='Task'>Task</option>
<option value='Bug'>Bug</option>
</select>
<input class='jira-form' type='hidden' name='jira-issue-username'>
<input tabindex='3' required='true' class='jira-form' type='text' name='jira-issue-summary'>
<textarea tabindex='4' required='true' class='jira-form' name='jira-issue-description' rows='2'>
</textarea>
<button tabindex='5' type='submit' name='submit' class='jira-form btn ladda-button'>Submit</button>
<a tabindex='6' class='jira-form btn btn_outline cancel'>Cancel</a>
</form>
</div>`;
    $('body').prepend(jiraFormHtml);
    $('#jira-form').submit(function (event) {
      event.preventDefault();
      var issueType = $("#jira-form select[name='jira-issue-type']").val();
      var issueSummary = $("#jira-form input[name='jira-issue-summary']").val();
      var issueDescription = $("#jira-form textarea[name='jira-issue-description']").val();
      var issueReporterUsername = $("#jira-form input[name='jira-issue-username']").val();
      var issueCategory = null;
      createIssue(issueType, issueSummary, issueDescription, issueReporterUsername, issueCategory);
    });
    $('#jira-form a.jira-form').click(function () {
      $('#jira-form-container').hide();
    });
    //handling 'enter' on textarea in jira form
    $('#jira-form').on('keydown', function (event) {
      if (event.keyCode == 13)
        if (!event.shiftKey) {
          event.preventDefault();
          $('#jira-form').submit();
        }
    });
    //modified function injection to add jira button to hover divs
    // Original Function definition was found here https://a.slack-edge.com/bv1-1/rollup-secondary_a_required.913460653bc05f44b9e4.min.js
    TS.ui.messages.updateMessageHoverContainer = function (t) {
      t.removeClass("dirty_hover_container");
      var n = t.data("model-ob-id");
      var r = n ? TS.shared.getModelObById(n) : TS.shared.getActiveModelOb();
      if (!r) return;
      var i = t.attr("data-ts");
      var a = TS.utility.msgs.getMsg(i, r.msgs);
      if (!a && r._archive_msgs) a = TS.utility.msgs.getMsg(i, r._archive_msgs);
      if (!a && TS.model.unread_view_is_showing) a = TS.client.unread.getMessage(r, i);
      if (!a) a = TS.ui.replies.getActiveMessage(r, i);
      if (!a) a = TS.client.threads.getMessage(r, i);
      if (!a) {
        TS.error(i + " not found in " + n);
        return;
      }
      var s = t.find("[data-js=action_hover_container]");
      var o = t.closest("ts-conversation").length > 0;
      var l = t.closest("#threads_msgs").length > 0;
      var u = TS.boot_data.feature_sli_briefing && t.closest("#sli_briefing").length > 0;
      var d = o || l;
      var c = !a.thread_ts || a.thread_ts === a.ts;
      var _ = a.subtype === "tombstone" && r.is_channel && !r.is_member;
      s.html(TS.templates.action_hover_items({
        msg: a,
        actions: TS.utility.msgs.getMsgActions(a, r),
        ts_tip_delay_class: "ts_tip_delay_60",
        is_in_threads_view: l,
        is_in_thread: d,
        is_root_msg: c,
        is_briefing_msg: u,
        hide_actions_menu: _,
        show_rxn_action: !!s.data("show_rxn_action"),
        show_reply_action: !!s.data("show_reply_action"),
        show_comment_action: !!s.data("show_comment_action"),
        abs_permalink: s.data("abs_permalink")
      }));
      s.toggleClass("narrow_buttons", s.children().length > 3);

      /////////////// inject jira button
      var jiraHtml = "<button style='padding:4px 0px 4px 0px' class='jira_html btn_msg_action btn_unstyle ts_icon ts_tip ts_tip_top ts_tip_float ts_tip_delay_60 ts_tip_hidden'><img style='width:20px;height:20px;' src='" +
        jiraIcon +
        "'/><span class='ts_tip_tip'>Create Jira Issue</span></button>";
      $('#' + t[0].id + ' div.action_hover_container').prepend(jiraHtml);
      var issueText = '';
      if ($('#' + t[0].id).hasClass('first')) {
        $('#' + t[0].id).nextUntil('ts-message.first')
          .andSelf()
          .find('span.message_body')
          .each(function (i, text) {
            issueText += $(text).text() + '\n';
          });
      } else {
        var $firstMessage = $('#' + t[0].id).prevAll('ts-message.first').first();
        $firstMessage.nextUntil('ts-message.first')
          .andSelf()
          .find('span.message_body')
          .each(function (i, text) {
            issueText += $(text).text() + '\n';
          });
      }
      var issueReporter = $('#' + t[0].id + ' div.message_content_header a').first().text();
      var issueReporterId = $('#' + t[0].id + ' div.message_content_header a').attr('href').split('/')[2];
      var issueReporterUsername = TS.members.getMemberById(issueReporterId).name;
      $('#' + t[0].id + ' div.action_hover_container button.jira_html').unbind().click(function () { populateForm(issueReporter, issueReporterUsername, issueText); });
      /////////////// end jira button
    };
  });
})();