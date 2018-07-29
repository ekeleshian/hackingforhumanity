'use strict';

const fetch = require('node-fetch');

const {
  Headers
} = fetch;

const make_headers = api_key =>
  new Headers({
    Accept: 'application/json',
    Authorization: api_key,
    'Content-Type': 'application/json',
  });

module.exports = ({
    api_key,
    base_url,
    do_handle_intl_prefix
  }) => ({
      SEND_LIMIT: 200,
      // validityPeriod is in minutes, to: Array<string>
      send_message({
        content,
        to,
        validityPeriod = 40
      }) {
        const handled_intl_codes = to.map(s => {
          if (do_handle_intl_prefix === false) return s;
          else {
            const do_start_with_am_prefix = /\+?374/.test(s);
            if (do_start_with_am_prefix) {
              const [, phone_number] = s.match(/\+?374(\d*)/);
              return phone_number;
            } else {
              return s;
            }
          }
        });
        return fetch(`${base_url}/messages`, {
          method: 'POST',
          headers: make_headers(api_key),
          body: JSON.stringify({
            content,
            to: handled_intl_codes,
            validityPeriod
          }),
        }).then(r => r.json());
      },