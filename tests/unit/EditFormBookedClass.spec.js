import { shallowMount } from "@vue/test-utils";
import EditFormBookedClass from "@/components/EditFormBookedClass.vue";

describe("EditFormBookedClass.vue", () => {
  it("displays the props in the form correctly", () => {
    const studentData = {
      _id: "64f10bca80c92e27547a00c7",
      className: "LPF",
      classType: "Semanal",
      duration: 55,
      email: "test@test.ca",
      firstName: "Peter",
      instructor: "Cris",
      isRescheduled: true,
      lastName: "Ng",
      phone: "55555555",
      selectedDate: "2023-08-31",
      selectedTime: "5:00",
    };

    const wrapper = shallowMount(EditFormBookedClass, {
      props: {
        student: studentData,
      },
    });

    expect(wrapper.find("[data-testid='firstName']").element.value).toBe(
      studentData.firstName
    );
    expect(wrapper.find("[data-testid='email']").element.value).toBe(
      studentData.email
    );
    expect(wrapper.find("[data-testid='selectedTime']").element.value).toBe(
      studentData.selectedTime
    );
    expect(wrapper.find("[data-testid='selectedDate']").element.value).toBe(
      studentData.selectedDate
    );
  });
});

it("receives props properly", async () => {
  const studentData = {
    _id: "64f10bca80c92e27547a00c7",
    className: "LPF",
    classType: "Semanal",
    duration: 55,
    email: "test@test.ca",
    firstName: "Peter",
    instructor: "Cris",
    isRescheduled: true,
    lastName: "Ng",
    phone: "55555555",
    selectedDate: "2023-08-31",
    selectedTime: "5:00",
  };

  const wrapper = shallowMount(EditFormBookedClass, {
    props: {
      student: studentData,
    },
  });

  expect(wrapper.props("student")).toEqual(studentData);
});

it("emits 'save' and the value in handleSubmit", async () => {
  const wrapper = shallowMount(EditFormBookedClass, {
    props: {
      student: { firstName: "Juliana", email: "ju@test.com" },
    },
  });

  await wrapper.vm.handleSubmit();
  expect(wrapper.emitted("save")).toBeTruthy();
  expect(wrapper.emitted("save")[0]).toEqual([
    { firstName: "Juliana", email: "ju@test.com" },
  ]);
});

it("emits 'cancel' event when Cancel button is clicked", async () => {
  const wrapper = shallowMount(EditFormBookedClass, {
    props: {
      student: { firstName: "John", email: "john@example.com" },
    },
  });

  wrapper.vm.cancelEdit();
  await wrapper.vm.$nextTick();
  await wrapper.find("[data-testid='cancelbtn']").trigger("click");
  expect(wrapper.emitted("cancel")).toBeTruthy();
});
