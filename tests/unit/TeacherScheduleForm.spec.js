import { shallowMount } from "@vue/test-utils";
import TeacherScheduleForm from "@/components/TeacherScheduleForm.vue";

describe("TeacherScheduleForm.vue", () => {
  it("renders the form elements", () => {
    const wrapper = shallowMount(TeacherScheduleForm);

    expect(wrapper.find("label[for='teacher']").exists()).toBe(true);
    expect(wrapper.find("input[id='teacher']").exists()).toBe(true);
    expect(wrapper.find("label[for='type']").exists()).toBe(true);
    expect(wrapper.find("input[id='type']").exists()).toBe(true);
  });

  //   it('displays success message when a service is added successfully', async () => {
  //     const wrapper = shallowMount(TeacherScheduleForm);

  //     await wrapper.setData({
  //         teacher: 'Juliana',
  //       type: 'Yoga',
  //       name: 'Yoga Class',
  //       modality: 'Online',
  //       price: 50,
  //       duration: 60,
  //       dateTimes: [{ date: '2023-09-10', startTime: '09:00', endTime: '10:00' }],
  //       breaks: 15,
  //     });
  //     await wrapper.find('form').trigger('submit.prevent');

  //     expect(wrapper.find('.successMessage').text()).toContain('Service Added Successfully!');
  //   });
});
