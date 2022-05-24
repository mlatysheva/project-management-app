export const addTask
 = (title: string) => {
  return {
    type: "add_task",
    payload: {title: title},
  }
}