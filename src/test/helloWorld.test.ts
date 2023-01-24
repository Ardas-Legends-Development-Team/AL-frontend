import { mount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";

test("mount component", async () => {
  expect(HelloWorld).toBeTruthy();

  const wrapper = mount(HelloWorld, {
    props: {
      msg: "Hello World Test",
    },
  });

  expect(wrapper.text()).toContain("Hello World Test");
});

test("increment button", async () => {
  const wrapper = mount(HelloWorld, {
    props: {
      msg: "Hello World Test",
    },
  });

  expect(wrapper.text()).toContain("0");
  await wrapper.find("#increment-button").trigger("click");
  expect(wrapper.text()).toContain("1");
  await wrapper.find("#increment-button").trigger("click");
  expect(wrapper.text()).toContain("2");
});
