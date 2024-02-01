export function getData({ student_id, category_id }) {
  //student_id, category_id = null) {
  const student = global.data.find((s) => s.id === student_id);
  if (category_id) {
    const category = student.category.find((c) => c.id === category_id);
    return { student, category };
  }
  return { student };
}
