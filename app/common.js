export function getData({ student_id, category_id }) {
  const student = global.data.find((s) => s.id === student_id);
  if (category_id) {
    const category = student.category.find((c) => c.id === category_id);
    return { student, category };
  }
  return { student };
}

export function getScore(answers) {
  return (getNumCorrect(answers) / answers.length) * 100;
}

export function getNumCorrect(answers) {
  return answers.filter((answer) => answer === true).length;
}

export function defaultRoute(student_id) {
  return {
    routes: [
      { name: "Gatehouse" },
      student_id
        ? {
            name: "Campus",
            params: { student_id },
          }
        : {},
    ],
    index: 1,
  };
}
