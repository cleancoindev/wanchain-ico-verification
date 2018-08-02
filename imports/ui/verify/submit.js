import { Session } from 'meteor/session';

import { stripHexPrefix } from '../../utils/hex';
import { wanAddressChecksum } from '../../utils/wanAddressChecksum';

export function submit(event, template) {
  event.preventDefault();

  const address = $(event.target).find('[name="address"]').val();
  const action = $(event.target).find('button').attr('action');

  const hash = stripHexPrefix(address);

  if (! address) {
    alert('You must enter an address!');
    return false;
  }
  else if (hash.length !== 40) {
    sweetAlert({
      title: "Invalid Address Length",
      text: "The address you entered is not valid.",
      type: "warning",
      button: "Try Again",
    });
    return false;
  }

  const wanAddress = wanAddressChecksum(address);

  if (action === "verify") {
    Session.set('verifyAttempt', true);

    if (Session.get('wanchainAddress') == wanAddress) {
      Session.set('verified', true);
    }
    else {
      Session.set('verified', false);
      Session.set('wanchainAddress', false);
    }
  }
  else {
    Session.set('verifyAttempt', false);
    Session.set('verified', false);
    Session.set('wanchainAddress', wanAddress);
  }
}
