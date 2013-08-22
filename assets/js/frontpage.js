var Frontpage = function()
{
  var exports = {};

  var interval;
  var timer = 0;

  var timer_template_html = $('#timer-template').html();
  var timer_template = Handlebars.compile(timer_template_html);

  function update_timer() {
    var minutes = Math.floor(timer / 60);
    var seconds = timer % 60;

    var html = timer_template({
      minutes: minutes,
      seconds: seconds
    });

    $('#timer').html(html);
  }

  function set_timer(duration) {
    timer = parseInt(duration)*60;

    $('#timer').show();
    update_timer();

    interval = setInterval(function() {
      timer -= 1;
      update_timer();

      if (!timer) {
        clearInterval(interval);
        $('#timer').hide();
        unbind_keys();
        show_results();
      }
    }, 1000);
  }

  var results_template_html = $('#results-template').html();
  var results_template = Handlebars.compile(results_template_html);

  var keys_duration = {};
  function show_results() {
    var results = [];
    for (var key in keys_duration) {
      var time = keys_duration[key];
      results.push({
        key: String.fromCharCode(key),
        seconds: time / 1000
      });
    }
    console.log(results);
    var html = results_template({
      key_presses: results
    });
    $('#results').html(html);
    $('#results').show();
  }

  var current_keys_pressed = {};
  function log_key_time(key, duration) {
    if (!keys_duration[key]) {
      keys_duration[key] = 0;
    }

    keys_duration[key] += duration;
  }

  function bind_keys() {
    $(document).keydown(function (e) {
      if (current_keys_pressed[e.which]) return;

      current_keys_pressed[e.which] = (new Date()).getTime();
    });

    $(document).keyup(function (e) {
      var duration =
        (new Date()).getTime() - current_keys_pressed[e.which];

      log_key_time(e.which, duration);

      delete current_keys_pressed[e.which];
    });
  }

  function unbind_keys() {
    $(document).unbind('keydown');
    $(document).unbind('keyup');

    var current_time = (new Date()).getTime();

    for (var key in current_keys_pressed) {
      var start = current_keys_pressed[key];
      var duration = current_time - start;

      log_key_time(key, duration);

      delete current_keys_pressed[key];
    }
  }

  function init()
  {
    $('#duration-form').submit(function() {
      var duration = $('#duration', this).val();
      $(this).hide();
      bind_keys();
      set_timer(duration);
      return false;
    });
  }
  exports.init = init;

  return exports;
};
