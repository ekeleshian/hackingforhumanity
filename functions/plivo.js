'use strict';

const plivo = require('plivo');

module.exports = ({ auth_id, auth_token }, { our_message_sender }) => ({
  send_message_plivo({ dest_phone_number, message, override_source = null }) {
    const client = new plivo.Client(auth_id, auth_token);
    const src_phone_number = our_message_sender;
    console.info({ msg: 'Sent', dest_phone_number, src_phone_number });
    return client.messages.create(src_phone_number, dest_phone_number, message);
  },
});