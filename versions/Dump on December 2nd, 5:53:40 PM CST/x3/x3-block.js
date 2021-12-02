const DEFAULT_MESSAGE = 'This content has been blocked.';

function setMessage(msg) {
  const messageNode = document.getElementById('message');
  messageNode.textContent = msg;
  messageNode.className = 'show';
}

function load() {
  const triggerIdStr = window.location.hash;

  if (!triggerIdStr) {
    setMessage(DEFAULT_MESSAGE);
    return;
  }

  const triggerId = parseInt(triggerIdStr.replace('#', ''), 10);

  if (isNaN(triggerId) || triggerId <= 0) {
    setMessage(DEFAULT_MESSAGE);
    return;
  }

  chrome.runtime.sendMessage(
    {
      type: 'GET_BLOCK_TRIGGER_MESSAGE',
      payload: {
        triggerId,
      },
    },
    function (response) {
      console.dir(response);

      if (chrome.runtime.lastError || !response.message) {
        setMessage(DEFAULT_MESSAGE);
      } else {
        setMessage(response.message);
      }
    }
  );
}

load();
