import { later } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit, find, findAll } from '@ember/test-helpers';

module('Acceptance | Main', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /75', async function(assert) {
    await visit('/75');

    assert.equal(await findAll('.loading-slider').length, 1, "The component's element exists");
    assert.equal(await findAll('.loading-slider span').length, 1, 'The component has inserted one span');
    assert.equal(await find('.loading-slider span').clientWidth, 0, 'The stripe has finished animating and is width 0');
  });

  test('testing animation', async function(assert) {
    assert.expect(2);

    await visit('/');

    // use the jQuery click rather than the promise observing click
    await findAll('button')[1].click();

    later(async () => {
      assert.equal(await findAll('.loading-slider span')[1].clientWidth > 0, true, 'The slider has animated');
    }, 500);

    later(async () => {
      assert.equal(await findAll('.loading-slider span').length === 0, true, 'The slider has reset');
    }, 1500);
  });

  test('testing multi-color centered animation', async function(assert) {
    await visit('/');

    // use the jQuery click rather than the promise observing click
    await findAll('button')[2].click();

    later(async () => {
      assert.equal(await findAll('.loading-slider span')[1].clientWidth > 0, true, 'The slider has animated');
    }, 1000);

    later(() => {
      assert.equal(findAll('.loading-slider span').length > 2, true, 'There are multiple sliders');
    }, 1500);

    later(() => {
      assert.equal(findAll('.loading-slider span').length === 0, true, 'The slider has reset');
    }, 5500);
  });
});

