btcxrate
========

BItcoin Zero Config Xrate Javascript

The easiest way to show BTC pricing on your website. Currently supports USD, EUR and GBP to BTC conversion (and the other way around!). Uses Coindesk data (http://www.coindesk.com/price/)

Simply include the script on any page and use standard HTML5 data attributes to tell that script what you want.

Shows the current value of $100 in BTC:

<h2>$100 in BTC: <span data-btcxrate data-btcxrate-from="USD" data-btcxrate-to="BTC" data-btcxrate-value="100" data-btcxrate-tofixed="6">.,..</span></h2>

Show the current value of 1 BTC in USD: 

<span data-btcxrate data-btcxrate-from="BTC" data-btcxrate-to="USD" data-btcxrate-value="1">[this gets replaced by the script]</span>

.. or in EUR or in GBP

<span data-btcxrate data-btcxrate-from="BTC" data-btcxrate-to="EUR" data-btcxrate-value="1">[this gets replaced by the script]</span>

<span data-btcxrate data-btcxrate-from="BTC" data-btcxrate-to="GBP" data-btcxrate-value="1">[this gets replaced by the script]</span>

You can also show the last updated time from the API:

<span data-btcxrate data-btcxrate-lastupdated>[shows the last updated date in format: Feb 24, 2014 at 15:09 GMT]</span>

Basic use data attributes (works on any HTML element, so span, div h1 h2, p ... anything really):

"data-btcxrate"         - REQUIRED. This attribute always has to be on your element, it triggers the script.
"data-btcxrate-from"    - REQUIRED. This attribute indicates the currency you would like to convert FROM. Options: USD, EUR, GBP or BTC.
"data-btcxrate-to"      - REQUIRED. This attribute indicates the currency you would like to convert TO. Options: USD, EUR, GBP or BTC.
"data-btcxrate-value"   - OPTIONAL. Default value is 1. Use this attribute to convert for example a dollar price on your website to the BTC price. So the following example will show the BTC value of a product costing $199.99:

<div>This pair of shoes costs $199.99! (or approx. <span data-btcxrate data-btcxrate-from="USD" data-btcxrate-to="BTC" data-btcxrate-value="199.99">...</span> bitcoins)</div>

Advanced data attributes (all optional):

"data-btcxrate-tofixed"   - takes any integer string (data-btcxrate-tofixed="6"). It will round to the given number of decimals. The default value the script uses is 2 decimals for fiat currencies (i.e. USD, EUR) and NON for BTC. So the normal use would really be for x-rates from 'normal' currency to BTC and to prevent the script from showing like 15 decimals for the calculated BTC value (breaking your sites layout). 

