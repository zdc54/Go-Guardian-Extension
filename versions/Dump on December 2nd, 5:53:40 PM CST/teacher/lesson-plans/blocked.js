var STARS_HEIGHT = 467;
var MOUNTAINS_HEIGHT = 220;

var starsNode = document.getElementById('stars');
var contentNode = document.getElementById('content-wrapper');
var mountainsNode = document.getElementById('mountains');

/**
 * Changes number into num + "px" (string)
 * @param num
 * @returns {string}
 */
function toPX(num) {
  return num.toString() + 'px';
}

/**
 * Places nodes in correct distributions
 */
function place() {
  var windowHeight = window.innerHeight;
  var contentHeight = contentNode.clientHeight;

  contentNode.style.marginTop = toPX(-contentHeight / 2);

  var contentTop = windowHeight / 2 - contentHeight / 2;
  var contentBottom = contentTop + contentHeight;

  // if the distance between the content and the bottom of the screen is large enough for the full range,
  // then just attach to bottom of window
  // else, attach to bottom of content
  if (windowHeight - contentBottom >= MOUNTAINS_HEIGHT) {
    mountainsNode.style.bottom = 0;
  } else {
    mountainsNode.style.bottom = toPX(
      windowHeight - contentBottom - MOUNTAINS_HEIGHT
    );
  }

  if (contentTop >= STARS_HEIGHT) {
    starsNode.style.top = 0;
  } else {
    starsNode.style.top = toPX(contentTop - STARS_HEIGHT);
  }
}

function getURLParams(name) {
  var url = location.href;
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regexS = '[\\?&]' + name + '=([^&#]*)';
  var regex = new RegExp(regexS);
  var results = regex.exec(url);
  return results == null ? null : results[1];
}

function showText() {
  var anchor = document.getElementById('content');
  var scParam = getURLParams('cs');
  var sessionJSON = JSON.parse(decodeURIComponent(scParam));
  var html;

  if (sessionJSON && sessionJSON.length > 1) {
    html = returnMultiLessonPlanHTML(sessionJSON);
  } else {
    html = returnSingleLessonPlanHTML();
  }

  anchor.innerHTML = html;
}

function returnSingleLessonPlanHTML() {
  var html = [
    '<h1>Hey there!</h1>',
    '<p>It looks like you’ve reached a website your teacher doesn’t want you to browse right now.</p>',
    '<p>If you think this is a mistake,<br/>please let your teacher know.</p>',
  ].join('');
  return html;
}

function returnMultiLessonPlanHTML(sessionJSON) {
  var html = [
    '<h1>You’re popular!</h1>',
    '<p>It looks like you’re currently enrolled in multiple classroom sessions, which may limit which websites you can visit.</p>',
    '<p>You’re currently enrolled in:</p>',
  ];
  var classes = [];

  sessionJSON.forEach((session) => {
    if (session && session.name)
      classes.push('A class managed by ' + session.name);
  });

  html.push(classes.join('<br/>'));
  html.push(
    '<p>If you think this is a mistake,<br/>please let your teacher know.</p>'
  );
  return html.join('');
}

window.onresize = function () {
  place();
};

/**
 * Add reveal class to nodes
 */
function reveal() {
  contentNode.className = 'show';
}

showText();
place();
reveal();
