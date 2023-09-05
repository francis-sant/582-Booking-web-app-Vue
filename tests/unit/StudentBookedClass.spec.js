// import { shallowMount } from "@vue/test-utils";
// import StudentBookedClass from "@/components/StudentBookedClass.vue";
// import EditFormBookedClass from "@/components/EditFormBookedClass.vue";
// import { ref } from "vue";

// describe("StudentBookedClass.vue", () => {
//     it("displays student class information", () => {
//       const student = {
//         _id: "1",
//         firstName: "John",
//          email: "john@test.com",
//         className: "Framework",
//         selectedDate: "2023-09-10",
//         selectedTime: "09:00 AM",
//       };

//       const wrapper = shallowMount(StudentBookedClass, {
//         props: {
//           bookedClass: ref([student]),
//           availableClasses: ref([]),
//         },
//       });

//       const studentInfo = wrapper.find(".studentdetails");

//       expect(studentInfo.find("h3").text()).toBe("My Classes Information");
//       // expect(studentInfo.text()).toContain("First Name: John");
//       // expect(studentInfo.text()).toContain("Email: john@example.com");
//       // expect(studentInfo.text()).toContain("Class Name: Math");
//       // expect(studentInfo.text()).toContain("Selected Date: 2023-09-10");
//       // expect(studentInfo.text()).toContain("Selected Time: 09:00 AM");
//     });

//     it("emits editBooking event when the Reschedule My Class button is clicked", async () => {
//       const student = {
//         _id: "1",
//         firstName: "John",
//           email: "john@test.com",
//         className: "Framework",
//         selectedDate: "2023-09-10",
//         selectedTime: "09:00 AM",
//       };

//       const wrapper = shallowMount(StudentBookedClass, {
//         props: {
//           bookedClass: ref({ 0: [student] }),
//           availableClasses: ref([]),
//         },
//       });

//       await wrapper.vm.$nextTick();

//       const rescheduleButton = wrapper.find("button");
//       await rescheduleButton.trigger("click");

//       expect(wrapper.emitted("editBooking")).toBeTruthy();
//       expect(wrapper.emitted("editBooking")[0][0]).toEqual(student);
//     });

//   it("displays the EditFormBookedClass component when a student is selected for editing", () => {
//     const student = {
//       _id: "111",
//       firstName: "John",
//       email: "john@test.com",
//       className: "IT",
//       selectedDate: "2023-09-10",
//       selectedTime: "09:00 AM",
//     };

//     const wrapper = shallowMount(StudentBookedClass, {
//       props: {
//         bookedClass: ref({ 0: [] }),
//         availableClasses: ref([]),
//       },
//     });

//     wrapper.setData({ selectedStudent: student });

//     expect(wrapper.findComponent(EditFormBookedClass).exists()).toBe(true);
//   });

// });
