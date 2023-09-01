import { shallowMount } from "@vue/test-utils";
import DropDown from "@/components/DropDown.vue";

describe("DropDown.vue", () => {
  it("displays available options in dropdown menus", () => {
    const availableClasses = [
      {
        instructor: "Cris",
        type: "Semanal",
        name: "LPF",
        modality: "ONLINE",
        price: 100,
        duration: 55,
        dateTimes: [
          {
            date: "2023-08-31",
            startTime: "03:00",
            endTime: "21:00",
          },
        ],
      },
    ];

    const availableDate = ["2023-08-31"];
    const availableTime = ["03:00"];

    const wrapper = shallowMount(DropDown, {
      props: {
        availableClasses: availableClasses,
        availableDate: availableDate,
        availableTime: availableTime,
      },
    });

    const classOptions = wrapper.findAll("#class option");
    const dateOptions = wrapper.findAll("#date option");
    const timeOptions = wrapper.findAll("#time option");

    expect(classOptions.length).toBe(1);
    expect(dateOptions.length).toBe(1);
    expect(timeOptions.length).toBe(1);

    expect(classOptions[0].text()).toBe("LPF");
    expect(dateOptions[0].text()).toBe("2023-08-31");
    expect(timeOptions[0].text()).toBe("03:00");
  });

  it("emits 'change' event when handleDropdownChange is called", async () => {
    const wrapper = shallowMount(DropDown);

    wrapper.vm.handleDropdownChange("class", "Class B");

    expect(wrapper.emitted("change")).toBeTruthy();
    expect(wrapper.emitted("change")[0]).toEqual(["class", "Class B"]);
  });
});
