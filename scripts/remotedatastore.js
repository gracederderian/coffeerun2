(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error("No remote URL supplied.");
    }

    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function(key, val) {
    /*$.post(this.serverUrl, val, function(serverResponse) {
      console.log(serverResponse);
    });*/

    $.ajax({
      url: this.serverUrl,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(val),
      success: function(serverResponse) {
        console.log(serverResponse);
      },
      error: function(xhr) {
        alert(xhr.responseText);
      }
    });

  };

  RemoteDataStore.prototype.getAll = function(cb) {
    /*$.get(this.serverUrl, function(serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });*/

    $.ajax({
      url: this.serverUrl + "coffeeorders/",
      type: "GET",
      success: function(serverResponse) {
        console.log(serverResponse);
        cb(serverResponse);
      },
      error: function(xhr) {
        alert(xhr.responseText);
      }
    });

  };

  RemoteDataStore.prototype.get = function(key, cb) {
    /*$.get(this.serverUrl + "/" + key, function(serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });*/

    $.ajax({
      url: this.serverUrl + "/" + key,
      type: "GET",
      success: function(serverResponse) {
        console.log(serverResponse);
        cb(serverResponse);
      },
      error: function(xhr) {
        alert(xhr.responseText);
      }
    });

  };

  RemoteDataStore.prototype.remove = function(key) {
    $.ajax({
      url: this.serverUrl + "?emailAddress=" + key,
      type: "GET",
      success: function(serverResponse) {
        $.ajax({
          url: "http://localhost:2403/coffeeorders" + "/" + serverResponse[0].id,
          type: "DELETE",
          error: function(xhr) {
            alert(xhr.responseText);
          }
        });
      },
      error: function(xhr) {
        alert(xhr.responseText);
      }
    });
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
