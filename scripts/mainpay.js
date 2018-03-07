(function(window) {
  "use strict";
  var PAY_FORM_SELECTOR = "[data-payment=\"form\"]";
  var App = window.App;
  var $ = window.jQuery;
  var FormHandler = App.FormHandler;
  var payFormHandler = new FormHandler(PAY_FORM_SELECTOR);

  payFormHandler.addSubmitHandler(function(data) {
    var $div = $("<div></div>", {
      "class": "modal"
    });

    var $p = $("<p></p>");

    var $a = $("<a></a", {
      href: "#",
      rel: "modal:close"
    });

    var description = "Thank you for your payment, ";

    description += data.title + " ";
    description += data.username + ".";

    $p.append(description);
    $div.append($p);
    $div.append($a);
    $div.modal();

    /* eslint-disable no-console*/
    console.log(payFormHandler);
  });
})(window);
