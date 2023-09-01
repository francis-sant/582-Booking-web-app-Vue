import { shallowMount } from "@vue/test-utils";
import WelcomeBooking from "@/components/WelcomeBooking.vue";

describe("WelcomeBooking.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(WelcomeBooking, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
