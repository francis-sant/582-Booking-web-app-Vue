import { shallowMount } from "@vue/test-utils";
import PersonalInfo from "@/components/PersonalInfo.vue";

describe("PersonalInfo.vue", () => {
  it("emits a booking-confirmed event when the Confirm Booking button is clicked", async () => {
    const wrapper = shallowMount(PersonalInfo);
    await wrapper.setData({
      firstName: "John",
      lastName: "Vanier",
      phone: "11111111111",
      email: "john@test.com",
    });

    await wrapper.find("button").trigger("click");

    expect(wrapper.emitted("booking-confirmed")).toBeTruthy();
    expect(wrapper.emitted("booking-confirmed")[0]).toEqual([
      {
        firstName: "John",
        lastName: "Vanier",
        phone: "11111111111",
        email: "john@test.com",
      },
    ]);
  });

  it("does not emit a booking-confirmed when the Confirm Booking button is clicked with an empty form", async () => {
    const wrapper = shallowMount(PersonalInfo);
    await wrapper.setData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    });

    await wrapper.find("button").trigger("click");

    expect(wrapper.emitted("booking-confirmed")).toBeFalsy();
  });
});
