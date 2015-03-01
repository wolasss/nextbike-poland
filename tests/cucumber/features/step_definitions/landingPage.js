module.exports = function () {

  this.Given(/^I am a new visitor$/, function (callback) {
    callback.pending();
  });

  this.When(/^I navigate to the landing page$/, function (callback) {
    helper.world.browser.
      url(helper.world.mirrorUrl).
      call(callback);
  });

  this.Then(/^I see the city picker$/, function (arg1, callback) {
    callback.pending();
  });
};