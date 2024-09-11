import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TheWelcome from '../TheWelcome.vue';

describe('TheWelcome.vue', () => {
  it('renders documentation section', () => {
    const wrapper = mount(TheWelcome);
    expect(wrapper.text()).toContain('Documentation');
  });

  it('renders tooling section', () => {
    const wrapper = mount(TheWelcome);
    expect(wrapper.text()).toContain('Tooling');
  });

  it('renders ecosystem section', () => {
    const wrapper = mount(TheWelcome);
    expect(wrapper.text()).toContain('Ecosystem');
  });

  it('renders community section', () => {
    const wrapper = mount(TheWelcome);
    expect(wrapper.text()).toContain('Community');
  });

  it('renders support section', () => {
    const wrapper = mount(TheWelcome);
    expect(wrapper.text()).toContain('Support Vue');
  });
});
