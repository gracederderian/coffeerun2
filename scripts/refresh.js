(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  var CheckList = App.CheckList;
  var CHECKLIST_SELECTOR = "[data-coffee-order=\"checklist\"]";
  var checkList = new CheckList(CHECKLIST_SELECTOR);

  function Refresh(url) {
    if (!url) {
      throw new Error("No remote URL supplied.");
    }
    this.serverUrl = url;
  }

  Refresh.prototype.refresh = function() {
    $.ajax(this.serverUrl, {
      type: "GET",
      dataType: "json",
      success: function(serverResponse) {
        console.log(serverResponse);
        for (var i = 0; i < serverResponse.length; i++) {
          var coffeeorder = {
            "coffee": serverResponse[i].coffee,
            "emailAddress": serverResponse[i].emailAddress,
            "flavor": serverResponse[i].flavor,
            "size": serverResponse[i].size,
            "strength": serverResponse[i].strength
          };
          checkList.addRow.call(checkList, coffeeorder);
        }
      },
      error: function(xhr) {
        alert(xhr.responseText);
      }
    });
  };

  App.Refresh = Refresh;
  window.App = App;
})(window);
