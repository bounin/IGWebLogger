(function() {
  var WebLogger;

  WebLogger = (function() {

    function WebLogger() {}

    WebLogger.prototype.setConnected = function(connected) {
      this.connected = connected;
      if (connected) {
        return $("#status").text("connected").removeClass("warning");
      } else {
        return $("#status").text("disconnected").addClass("warning");
      }
    };

    WebLogger.prototype.log = function(message, level) {
      var div, html;
      if (level == null) {
        level = 'info';
      }
      html = $("<div/>").text(message).html();
      $("#logger").append("<p class='" + level + " log'>" + html + "</p>");
      div = $("#logger")[0];
      return div.scrollTop = div.scrollHeight;
    };

    WebLogger.prototype.setFilter = function(level) {
      $("#logger").removeClass("level-error level-warn level-info level-verbose level-all");
      if (level) {
        return $("#logger").addClass("level-" + level);
      }
    };

    return WebLogger;

  })();

  $(document).ready(function() {
    var logger, ws;
    logger = new WebLogger();
    $("#clear").on('click', function() {
      $("#logger").html("");
      return false;
    });
    $("#level li a").on('click', function(e) {
      var level;
      level = $(this).data("level");
      if (level) {
        console.log("set filter to " + level);
        $("#level li").removeClass("active");
        $(this).parent().addClass("active").addClass("level-" + level);
        logger.setFilter(level);
      }
      return false;
    });
    if (("WebSocket" in window)) {
      ws = new WebSocket("%%WEBSOCKET_URL%%");
      ws.onopen = function() {
        console.log("connection open");
        return logger.setConnected(true);
      };
      ws.onclose = function() {
        console.log("connection closed");
        return logger.setConnected(false);
      };
      return ws.onmessage = function(evt) {
        var data;
        data = $.parseJSON(evt.data);
        if (data.message && data.level) {
          return logger.log(data.message, data.level);
        } else {
          return console.log("unexpected data: ", evt.data);
        }
      };
    } else {
      return alert("Your browser doesn't support WebSocket!");
    }
  });

}).call(this);
