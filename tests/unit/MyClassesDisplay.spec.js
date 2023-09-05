import { shallowMount } from "@vue/test-utils";
import MyClassesDisplay from "@/components/MyClassesDisplay.vue";

describe("MyClassesDisplay.vue", () => {
  it("displays myClasses properly", () => {
    const GetAvClasses = [
      {
        instructor: "Cris",
        type: "Semanal",
        name: "LPF",
        modality: "ONLINE",
        duration: "55",
        dateTimes: [
          {
            date: "2023-08-31",
            startTime: "03:00",
            endTime: "21:00",
          },
        ],
        price: 100,
      },
    ];

    const wrapper = shallowMount(MyClassesDisplay, {
      data() {
        return {
          myClasses: GetAvClasses,
        };
      },
    });

    const displayedClasses = wrapper.findAll(".classesDisplay");
    expect(displayedClasses.length).toBe(GetAvClasses.length);

    GetAvClasses.forEach((classData, index) => {
      const displayedClass = displayedClasses[index];
      expect(displayedClass.text()).toContain(classData.instructor);
      expect(displayedClass.text()).toContain(classData.type);
      expect(displayedClass.text()).toContain(classData.name);
      expect(displayedClass.text()).toContain(classData.modality);
      expect(displayedClass.text()).toContain(classData.duration);
      expect(displayedClass.text()).toContain(
        `${classData.dateTimes[0].date} - ${classData.dateTimes[0].startTime} até ${classData.dateTimes[0].endTime}`
      );
      expect(displayedClass.text()).toContain(`Price: $ ${classData.price}`);
    });
  });
});
