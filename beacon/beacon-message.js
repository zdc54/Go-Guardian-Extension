const DEFAULT_MESSAGE =
  "It seems like you might be having thoughts of suicide. We want you to know we care about you and want to help. If you’d like to speak with someone right now, just call the suicide prevention hotline: 1-800-273-8255 or text HOME to 741741. You can also <a target='_blank' href='https://suicidepreventionlifeline.org/'>visit this website for more resources.</a> Please consider reaching out to your parents, school counselors, friends, or someone else you trust as well.";

function setMessage(msg) {
  const messageNode = document.getElementById('message');
  messageNode.innerHTML = msg;

  // Ensure that links do not open in the iframe, but in a new tab. Ignore
  // this if the message's anchors already have "target" attributes.
  // target="_blank" will force the link to pop open a new tab rather than
  // redirecting the iframe src to the specified href
  Array.from(messageNode.getElementsByTagName('a')).forEach((a) => {
    if (!a.attributes.target) {
      a.setAttribute('target', '_blank');
    }
  });
  messageNode.className = 'show';
}

function load() {
  chrome.runtime.sendMessage(
    {
      type: 'GET_BEACON_MESSAGE',
    },
    (response) => {
      if (chrome.runtime.lastError || !response.message) {
        setMessage(DEFAULT_MESSAGE);
      } else {
        setMessage(response.message);
      }
    }
  );

  this.focus();

  const close = document.getElementById('close');
  if (close) {
    close.addEventListener('click', () => {
      chrome.runtime.sendMessage({
        type: 'BEACON_MESSAGE_CLOSED',
        byUser: true,
      });
    });
  }
}

load();
